"use client";

import { useEffect } from "react";

const LINES = [
  "BLURRD studio likes to create dope shit with code.",
  "function buildSomethingCool() { return true; }",
  "console.log('Pixels are our playground.');",
  "const mindset = 'bold + intentional';",
  "while (inspired) { create(); }",
  "BLURRD !== boring;",
  "// clean. intentional. custom.",
];

export default function GlowCode() {
  useEffect(() => {
    const container = document.getElementById("glowCode");
    if (!container) return;

    const isSmall = window.matchMedia("(max-width:640px)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const REPEAT = isSmall ? 220 : 500;
    const RADIUS = isSmall ? 16 : 20;
    const CELL_SIZE = isSmall ? 18 : 22;
    const COLOR_ON = "#3BF8FB";
    const COLOR_OFF = "#EDEDED";
    const GLOW_ON_SPEED = 0.85;
    const GLOW_OFF_SPEED = 0.22;
    const MIN_ACTIVE_GLOW = 0.01;

    const code = Array.from({ length: REPEAT }, () => {
      const line = LINES[(Math.random() * LINES.length) | 0];
      return line + "\n";
    }).join("");

    container.style.cssText = `
    position: fixed; inset: 0;
    display: flex; flex-wrap: wrap;
    white-space: pre-wrap;
    font-size: ${isSmall ? 14 : 16}px;
    line-height: 1.4;
    color: ${COLOR_OFF};
    font-family: 'JetBrains Mono', monospace;
    background-color: #FBFAF6;
    pointer-events: none;
    z-index: 0;
  `;

    const frag = document.createDocumentFragment();
    const spans: HTMLSpanElement[] = [];
    for (let i = 0; i < code.length; i++) {
      const span = document.createElement("span");
      span.textContent = code[i];
      span.dataset.glow = "0";
      frag.appendChild(span);
      spans.push(span);
    }
    container.textContent = "";
    container.appendChild(frag);

    const centersX = new Float32Array(spans.length);
    const centersY = new Float32Array(spans.length);
    const glows = new Float32Array(spans.length);
    const cellMap = new Map<string, number[]>();
    const radiusSq = RADIUS * RADIUS;
    const neighborOffsets = [-1, 0, 1];

    const getCellKey = (x: number, y: number) =>
      `${Math.floor(x / CELL_SIZE)}:${Math.floor(y / CELL_SIZE)}`;

    const applyGlowStyle = (index: number, glow: number) => {
      const span = spans[index];
      if (!span) return;

      if (glow <= MIN_ACTIVE_GLOW) {
        if (span.style.color !== COLOR_OFF) {
          span.style.color = COLOR_OFF;
          span.style.textShadow = "none";
        }
        return;
      }

      span.style.color = COLOR_ON;
      span.style.textShadow = `0 0 ${8 * glow}px ${COLOR_ON}`;
    };

    const recalcCenters = () => {
      cellMap.clear();
      spans.forEach((s, idx) => {
        const r = s.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        centersX[idx] = cx;
        centersY[idx] = cy;

        const key = getCellKey(cx, cy);
        const existing = cellMap.get(key);
        if (existing) existing.push(idx);
        else cellMap.set(key, [idx]);
      });
    };

    requestAnimationFrame(recalcCenters);

    const debounce = (fn: () => void, d = 120) => {
      let t: ReturnType<typeof setTimeout>;
      return () => {
        clearTimeout(t);
        t = setTimeout(() => fn(), d);
      };
    };
    const debouncedRecalc = debounce(
      () => requestAnimationFrame(recalcCenters),
      120
    );
    window.addEventListener("resize", debouncedRecalc, { passive: true });
    window.addEventListener("orientationchange", debouncedRecalc, {
      passive: true,
    });
    window.addEventListener("scroll", debouncedRecalc, { passive: true });

    const pointer = { x: -9999, y: -9999 };
    const setPointer = (e: PointerEvent | TouchEvent) => {
      const p = "touches" in e ? e.touches[0] : e;
      pointer.x = p.clientX;
      pointer.y = p.clientY;
    };
    window.addEventListener("pointermove", setPointer, { passive: true });
    window.addEventListener("pointerdown", setPointer, { passive: true });

    let rafId = 0;
    let activeIndices = new Set<number>();
    function animate() {
      if (prefersReduced) {
        for (let i = 0; i < spans.length; i += 40) {
          const s = spans[i];
          if (!s) continue;
          s.style.color = COLOR_ON;
          s.style.textShadow = `0 0 2px ${COLOR_ON}`;
        }
        return;
      }

      const nextActive = new Set<number>();
      const cx = Math.floor(pointer.x / CELL_SIZE);
      const cy = Math.floor(pointer.y / CELL_SIZE);

      for (const ox of neighborOffsets) {
        for (const oy of neighborOffsets) {
          const indices = cellMap.get(`${cx + ox}:${cy + oy}`);
          if (!indices) continue;

          for (let i = 0; i < indices.length; i++) {
            const idx = indices[i];
            const dx = pointer.x - centersX[idx];
            const dy = pointer.y - centersY[idx];
            const inside = dx * dx + dy * dy <= radiusSq;
            if (!inside) continue;

            const nextGlow = glows[idx] + (1 - glows[idx]) * GLOW_ON_SPEED;
            glows[idx] = nextGlow;
            applyGlowStyle(idx, nextGlow);
            nextActive.add(idx);
          }
        }
      }

      for (const idx of activeIndices) {
        if (nextActive.has(idx)) continue;

        const nextGlow = glows[idx] - glows[idx] * GLOW_OFF_SPEED;
        glows[idx] = nextGlow;
        applyGlowStyle(idx, nextGlow);
        if (nextGlow > MIN_ACTIVE_GLOW) {
          nextActive.add(idx);
        }
      }

      activeIndices = nextActive;
      rafId = requestAnimationFrame(animate);
    }
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", debouncedRecalc);
      window.removeEventListener("orientationchange", debouncedRecalc);
      window.removeEventListener("scroll", debouncedRecalc);
      window.removeEventListener("pointermove", setPointer);
      window.removeEventListener("pointerdown", setPointer);
    };
  }, []);

  return (
    <div className="glow-test">
      <div className="code-embed w-embed">
        <div id="glowCode" />
      </div>
    </div>
  );
}
