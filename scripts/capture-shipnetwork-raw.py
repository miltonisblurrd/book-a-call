#!/usr/bin/env python3
"""Capture ShipNetwork case-study raw screenshots via Chrome CDP (stdlib only)."""

from __future__ import annotations

import base64
import json
import os
import socket
import struct
import subprocess
import sys
import time
import urllib.request
from hashlib import sha1
from pathlib import Path

RAW = Path("/Users/blurrd/Desktop/bookaCall/content/case-studies/shipnetwork/raw")
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT = 9333
USER_DATA = Path("/tmp/shipnetwork-chrome-capture-profile")


class WebSocketClient:
    def __init__(self, url: str):
        assert url.startswith("ws://")
        rest = url[5:]
        host_port, path = rest.split("/", 1)
        path = "/" + path
        if ":" in host_port:
            host, port_s = host_port.split(":")
            port = int(port_s)
        else:
            host, port = host_port, 80
        self.sock = socket.create_connection((host, port), timeout=30)
        key = base64.b64encode(os.urandom(16)).decode()
        req = (
            f"GET {path} HTTP/1.1\r\n"
            f"Host: {host_port}\r\n"
            f"Upgrade: websocket\r\n"
            f"Connection: Upgrade\r\n"
            f"Sec-WebSocket-Key: {key}\r\n"
            f"Sec-WebSocket-Version: 13\r\n"
            f"\r\n"
        )
        self.sock.sendall(req.encode())
        resp = b""
        while b"\r\n\r\n" not in resp:
            chunk = self.sock.recv(4096)
            if not chunk:
                raise RuntimeError("WebSocket handshake failed")
            resp += chunk
        if b"101" not in resp.split(b"\r\n", 1)[0]:
            raise RuntimeError(f"WebSocket handshake rejected: {resp[:200]!r}")
        expected = base64.b64encode(
            sha1((key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11").encode()).digest()
        )
        if expected not in resp:
            # Some servers omit exact formatting; continue if 101
            pass
        self._buf = b""

    def send_json(self, obj: dict) -> None:
        data = json.dumps(obj).encode()
        frame = bytearray([0x81])
        mask_bit = 0x80
        n = len(data)
        if n < 126:
            frame.append(mask_bit | n)
        elif n < 65536:
            frame.append(mask_bit | 126)
            frame.extend(struct.pack("!H", n))
        else:
            frame.append(mask_bit | 127)
            frame.extend(struct.pack("!Q", n))
        mask = os.urandom(4)
        frame.extend(mask)
        frame.extend(bytes(b ^ mask[i % 4] for i, b in enumerate(data)))
        self.sock.sendall(frame)

    def recv_json(self, timeout: float = 30.0) -> dict:
        self.sock.settimeout(timeout)
        while True:
            while len(self._buf) < 2:
                self._buf += self.sock.recv(65536)
            b1, b2 = self._buf[0], self._buf[1]
            opcode = b1 & 0x0F
            masked = bool(b2 & 0x80)
            length = b2 & 0x7F
            idx = 2
            if length == 126:
                while len(self._buf) < idx + 2:
                    self._buf += self.sock.recv(65536)
                length = struct.unpack("!H", self._buf[idx : idx + 2])[0]
                idx += 2
            elif length == 127:
                while len(self._buf) < idx + 8:
                    self._buf += self.sock.recv(65536)
                length = struct.unpack("!Q", self._buf[idx : idx + 8])[0]
                idx += 8
            mask = b""
            if masked:
                while len(self._buf) < idx + 4:
                    self._buf += self.sock.recv(65536)
                mask = self._buf[idx : idx + 4]
                idx += 4
            while len(self._buf) < idx + length:
                self._buf += self.sock.recv(65536)
            payload = self._buf[idx : idx + length]
            self._buf = self._buf[idx + length :]
            if masked:
                payload = bytes(b ^ mask[i % 4] for i, b in enumerate(payload))
            if opcode == 0x8:
                raise RuntimeError("WebSocket closed")
            if opcode == 0x9:  # ping
                # pong
                continue
            if opcode == 0x1:
                return json.loads(payload.decode())
            # ignore binary / continuation for our use

    def close(self) -> None:
        try:
            self.sock.close()
        except Exception:
            pass


class CDP:
    def __init__(self, ws_url: str):
        self.ws = WebSocketClient(ws_url)
        self._id = 0

    def call(self, method: str, params: dict | None = None, timeout: float = 60.0) -> dict:
        self._id += 1
        msg_id = self._id
        payload = {"id": msg_id, "method": method}
        if params:
            payload["params"] = params
        self.ws.send_json(payload)
        deadline = time.time() + timeout
        while True:
            remaining = max(0.1, deadline - time.time())
            msg = self.ws.recv_json(timeout=remaining)
            if msg.get("id") == msg_id:
                if "error" in msg:
                    raise RuntimeError(f"{method}: {msg['error']}")
                return msg.get("result", {})

    def close(self) -> None:
        self.ws.close()


def wait_for_debugger(port: int, attempts: int = 40) -> None:
    for _ in range(attempts):
        try:
            with urllib.request.urlopen(f"http://127.0.0.1:{port}/json/version", timeout=1) as r:
                if r.status == 200:
                    return
        except Exception:
            time.sleep(0.25)
    raise RuntimeError("Chrome remote debugging did not start")


def new_page(port: int) -> CDP:
    req = urllib.request.Request(
        f"http://127.0.0.1:{port}/json/new?about:blank",
        method="PUT",
    )
    with urllib.request.urlopen(req, timeout=10) as r:
        info = json.loads(r.read().decode())
    return CDP(info["webSocketDebuggerUrl"])


def dismiss_cookies(cdp: CDP) -> None:
    # Try common cookie consent buttons via DOM click
    js = r"""
(() => {
  const texts = ['Accept Cookies', 'Accept all', 'Accept All', 'Accept'];
  const buttons = Array.from(document.querySelectorAll('button, a, [role="button"]'));
  for (const t of texts) {
    const el = buttons.find(b => (b.innerText || b.textContent || '').trim() === t);
    if (el) { el.click(); return 'clicked:' + t; }
  }
  // OneTrust / common ids
  for (const sel of ['#onetrust-accept-btn-handler', '.onetrust-accept-btn-handler',
                     '[id*="accept"][id*="cookie" i]', 'button[aria-label*="Accept" i]']) {
    const el = document.querySelector(sel);
    if (el) { el.click(); return 'clicked-sel:' + sel; }
  }
  return 'not-found';
})()
"""
    for _ in range(8):
        result = cdp.call(
            "Runtime.evaluate",
            {"expression": js, "returnByValue": True, "awaitPromise": True},
        )
        val = (result.get("result") or {}).get("value")
        if isinstance(val, str) and val.startswith("clicked"):
            time.sleep(0.6)
            return
        time.sleep(0.5)


def set_viewport(cdp: CDP, width: int, height: int, mobile: bool = False, scale: float = 1.0) -> None:
    cdp.call(
        "Emulation.setDeviceMetricsOverride",
        {
            "width": width,
            "height": height,
            "deviceScaleFactor": scale,
            "mobile": mobile,
        },
    )


def navigate(cdp: CDP, url: str, settle: float = 2.5) -> None:
    cdp.call("Page.enable")
    cdp.call("Runtime.enable")
    cdp.call("Network.enable")
    cdp.call("Page.navigate", {"url": url})
    # Wait for load event via polling readyState
    for _ in range(60):
        result = cdp.call(
            "Runtime.evaluate",
            {"expression": "document.readyState", "returnByValue": True},
        )
        if (result.get("result") or {}).get("value") == "complete":
            break
        time.sleep(0.25)
    time.sleep(settle)
    dismiss_cookies(cdp)
    time.sleep(0.4)


def screenshot(cdp: CDP, path: Path) -> tuple[int, int]:
    result = cdp.call("Page.captureScreenshot", {"format": "png", "fromSurface": True})
    data = base64.b64decode(result["data"])
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)
    # Read PNG IHDR for dimensions
    w = int.from_bytes(data[16:20], "big")
    h = int.from_bytes(data[20:24], "big")
    print(f"Wrote {path} ({w}x{h}, {len(data)} bytes)")
    return w, h


def scroll_by(cdp: CDP, y: int) -> None:
    cdp.call(
        "Runtime.evaluate",
        {"expression": f"window.scrollBy(0, {int(y)})", "returnByValue": True},
    )
    time.sleep(0.8)


def scroll_to(cdp: CDP, y: int) -> None:
    cdp.call(
        "Runtime.evaluate",
        {"expression": f"window.scrollTo(0, {int(y)})", "returnByValue": True},
    )
    time.sleep(0.8)


def scroll_into_view(cdp: CDP, expression: str) -> bool:
    js = f"""
(() => {{
  const el = {expression};
  if (!el) return false;
  el.scrollIntoView({{block: 'start', behavior: 'instant'}});
  return true;
}})()
"""
    result = cdp.call("Runtime.evaluate", {"expression": js, "returnByValue": True})
    ok = bool((result.get("result") or {}).get("value"))
    time.sleep(0.8)
    return ok


def find_service_links(cdp: CDP) -> list[str]:
    js = r"""
(() => {
  const anchors = Array.from(document.querySelectorAll('a[href]'));
  const hrefs = anchors.map(a => a.href).filter(Boolean);
  const prefer = [
    /ecommerce|e-commerce|fulfillment/i,
    /return/i,
    /subscription/i,
    /kitting/i,
    /freight/i,
    /edi/i,
  ];
  const uniq = [];
  const seen = new Set();
  for (const re of prefer) {
    for (const h of hrefs) {
      if (seen.has(h)) continue;
      if (!h.includes('shipnetwork.com')) continue;
      if (h.includes('/3pl-services') && h.rstrip('/').endswith('3pl-services')) continue;
      if (re.test(h) || re.test((anchors.find(a => a.href === h) || {}).innerText || '')) {
        seen.add(h);
        uniq.push(h);
      }
    }
  }
  // Also pick card-looking service links under /3pl-services/ or similar paths
  for (const h of hrefs) {
    if (seen.has(h)) continue;
    try {
      const u = new URL(h);
      if (u.hostname.includes('shipnetwork.com') &&
          (u.pathname.includes('fulfill') || u.pathname.includes('3pl') ||
           u.pathname.includes('return') || u.pathname.includes('subscription') ||
           u.pathname.includes('service'))) {
        if (u.pathname !== '/3pl-services' && u.pathname !== '/3pl-services/') {
          seen.add(h);
          uniq.push(h);
        }
      }
    } catch (e) {}
  }
  return uniq.slice(0, 8);
})()
"""
    result = cdp.call("Runtime.evaluate", {"expression": js, "returnByValue": True})
    return list((result.get("result") or {}).get("value") or [])


def main() -> int:
    RAW.mkdir(parents=True, exist_ok=True)
    USER_DATA.mkdir(parents=True, exist_ok=True)

    chrome = subprocess.Popen(
        [
            CHROME,
            f"--remote-debugging-port={PORT}",
            f"--user-data-dir={USER_DATA}",
            "--no-first-run",
            "--no-default-browser-check",
            "--disable-gpu",
            "--headless=new",
            "--window-size=1440,900",
            "about:blank",
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    try:
        wait_for_debugger(PORT)
        cdp = new_page(PORT)
        results = []

        # --- Section 7 ---
        set_viewport(cdp, 1440, 900)
        navigate(cdp, "https://www.shipnetwork.com/3pl-services")
        results.append(("07-services-hub.png", *screenshot(cdp, RAW / "07-services-hub.png")))

        links = find_service_links(cdp)
        print("Service candidate links:", links)
        # Prefer known representative paths if present; else first 3 distinct
        preferred_order = []
        for key in ("ecommerce", "fulfillment", "return", "subscription", "kitting"):
            for link in links:
                if key in link.lower() and link not in preferred_order:
                    preferred_order.append(link)
        for link in links:
            if link not in preferred_order:
                preferred_order.append(link)
        # Fallback hard-coded likely URLs if discovery weak
        fallbacks = [
            "https://www.shipnetwork.com/services/order-fulfillment",
            "https://www.shipnetwork.com/services/return-management",
            "https://www.shipnetwork.com/services/subscription-boxes",
            "https://www.shipnetwork.com/services/kitting",
            "https://www.shipnetwork.com/services/ecommerce-freight-service",
        ]
        chosen = preferred_order[:3]
        if len(chosen) < 3:
            for fb in fallbacks:
                if fb not in chosen:
                    chosen.append(fb)
                if len(chosen) >= 3:
                    break
        print("Chosen service pages:", chosen[:3])

        for name, url in zip(["07-service-a.png", "07-service-b.png", "07-service-c.png"], chosen[:3]):
            set_viewport(cdp, 1440, 900)
            navigate(cdp, url)
            # Verify we didn't 404 badly — still screenshot
            results.append((name, *screenshot(cdp, RAW / name)))
            # Record URL sidecar for summary
            (RAW / (name.replace(".png", ".url.txt"))).write_text(url + "\n")

        # --- Section 9 responsive homepage ---
        navigate(cdp, "https://www.shipnetwork.com/")
        set_viewport(cdp, 1440, 900, mobile=False)
        time.sleep(0.5)
        dismiss_cookies(cdp)
        results.append(("09-desktop.png", *screenshot(cdp, RAW / "09-desktop.png")))

        set_viewport(cdp, 768, 1024, mobile=True)
        time.sleep(0.8)
        dismiss_cookies(cdp)
        results.append(("09-ipad.png", *screenshot(cdp, RAW / "09-ipad.png")))

        set_viewport(cdp, 390, 844, mobile=True)
        time.sleep(0.8)
        dismiss_cookies(cdp)
        results.append(("09-mobile.png", *screenshot(cdp, RAW / "09-mobile.png")))

        # Reset desktop
        set_viewport(cdp, 1440, 900, mobile=False)

        # --- Section 10 resources ---
        navigate(cdp, "https://www.shipnetwork.com/resources")
        results.append(("10-hero.png", *screenshot(cdp, RAW / "10-hero.png")))
        # Scroll to resource grid — try headings / card grids
        found = scroll_into_view(
            cdp,
            "document.querySelector('[class*=\"grid\"], .resource-grid, section:nth-of-type(2), main section:nth-of-type(2)')",
        )
        if not found:
            scroll_by(cdp, 900)
        else:
            # nudge a bit so hero is mostly out
            scroll_by(cdp, 80)
        results.append(("10-grid.png", *screenshot(cdp, RAW / "10-grid.png")))

        # --- Section 11 Andie ---
        set_viewport(cdp, 1440, 900)
        navigate(
            cdp,
            "https://www.shipnetwork.com/resources/how-andie-scaled-multi-channel-fulfillment-with-a-focus-on-customer-experience",
        )
        results.append(("11-hero.png", *screenshot(cdp, RAW / "11-hero.png")))
        scroll_by(cdp, 900)
        results.append(("11-body.png", *screenshot(cdp, RAW / "11-body.png")))

        # --- Section 12 content page ---
        navigate(cdp, "https://www.shipnetwork.com/3pl-101/3pl")
        results.append(("12-page.png", *screenshot(cdp, RAW / "12-page.png")))
        scroll_by(cdp, 1000)
        results.append(("12-page-below.png", *screenshot(cdp, RAW / "12-page-below.png")))

        print("\n=== SUMMARY ===")
        for name, w, h in results:
            print(f"{name}: {w}x{h} -> {RAW / name}")
        return 0
    finally:
        try:
            chrome.terminate()
            chrome.wait(timeout=5)
        except Exception:
            chrome.kill()


if __name__ == "__main__":
    sys.exit(main())
