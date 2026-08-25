#!/usr/bin/env python3
"""Compose ShipNetwork case-study screenshots onto branded 16:9 slide backgrounds.

Canvas stays 3840x2160 so the blue background always fills the case-study image
section width. Screenshot scales up inside that frame with side gutters.
"""
from __future__ import annotations
import argparse, math, os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

NAVY = (4, 12, 51)
SN_BLUE = (0, 160, 246)
BLUE_DARK = (0, 58, 144)
BLUE_MID = (0, 109, 195)
GRAY = (150, 172, 192)
OFF_WHITE = (245, 244, 242)
W, H = 3840, 2160

def load_font(size, bold=False):
    for p in [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()

def make_background(w, h):
    base = Image.new("RGB", (2, 2))
    base.putpixel((0, 0), NAVY)
    base.putpixel((1, 0), BLUE_DARK)
    base.putpixel((0, 1), (2, 8, 40))
    base.putpixel((1, 1), (0, 40, 100))
    bg = base.resize((w, h), Image.Resampling.BICUBIC)
    glow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    for cx, cy, r, col, a in [
        (int(w * 0.55), int(h * 0.45), int(max(w, h) * 0.45), SN_BLUE, 50),
        (int(w * 0.15), int(h * 0.8), int(max(w, h) * 0.35), BLUE_MID, 35),
        (int(w * 0.85), int(h * 0.2), int(max(w, h) * 0.3), BLUE_DARK, 40),
    ]:
        for i in range(12, 0, -1):
            rr = int(r * i / 12)
            aa = int(a * (i / 12) ** 2)
            gd.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], fill=(*col, aa))
    glow = glow.filter(ImageFilter.GaussianBlur(80))
    img = Image.alpha_composite(bg.convert("RGBA"), glow)
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    size = 64
    h_hex = size * math.sqrt(3)
    rows = int(h / (h_hex * 0.75)) + 3
    cols = int(w / (size * 1.5)) + 3
    for row in range(-1, rows):
        for col in range(-1, cols):
            x = col * size * 1.5
            y = row * h_hex * 0.75 + (h_hex * 0.375 if col % 2 else 0)
            pts = [
                (
                    x + size * 0.52 * math.cos(math.radians(60 * i - 30)),
                    y + size * 0.52 * math.sin(math.radians(60 * i - 30)),
                )
                for i in range(6)
            ]
            alpha = 28 if (row + col) % 4 == 0 else 14
            draw.line(pts + [pts[0]], fill=(*SN_BLUE, alpha), width=2)
    img = Image.alpha_composite(img, overlay)
    accent = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    ImageDraw.Draw(accent).rectangle([0, 0, w, 6], fill=(*SN_BLUE, 200))
    return Image.alpha_composite(img, accent).convert("RGB")

def rounded_shadow(shot, radius=20, pad=16, shadow_blur=24, shadow_off=(0, 18)):
    sw, sh = shot.size
    canvas = Image.new("RGBA", (sw + pad * 2, sh + pad * 2 + shadow_blur), (0, 0, 0, 0))
    mask = Image.new("L", (sw, sh), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, sw - 1, sh - 1], radius=radius, fill=255)
    shadow = Image.new("RGBA", (sw, sh), (0, 0, 0, 150))
    shadow.putalpha(mask)
    shadow = shadow.filter(ImageFilter.GaussianBlur(shadow_blur))
    canvas.paste(shadow, (pad + shadow_off[0], pad + shadow_off[1]), shadow)
    out = Image.new("RGBA", (sw, sh), (0, 0, 0, 0))
    out.paste(shot.convert("RGBA"), (0, 0))
    out.putalpha(mask)
    border = Image.new("RGBA", (sw, sh), (0, 0, 0, 0))
    ImageDraw.Draw(border).rounded_rectangle(
        [1, 1, sw - 2, sh - 2], radius=radius, outline=(*SN_BLUE, 200), width=3
    )
    out = Image.alpha_composite(out, border)
    canvas.paste(out, (pad, pad), out)
    return canvas

def compose(shot_path, out_path, number, total, title, caption):
    bg = make_background(W, H)
    shot = Image.open(shot_path).convert("RGBA")
    top_rail, bot_rail = 88, 88
    max_w = int(W * 0.88)
    max_h = H - top_rail - bot_rail
    scale = min(max_w / shot.width, max_h / shot.height)
    shot_r = shot.resize(
        (int(shot.width * scale), int(shot.height * scale)), Image.Resampling.LANCZOS
    )
    framed = rounded_shadow(shot_r)
    fx, fy = framed.size
    x = (W - fx) // 2
    y = top_rail + (max_h - fy) // 2
    canvas = bg.convert("RGBA")
    canvas.paste(framed, (x, y), framed)
    draw = ImageDraw.Draw(canvas)
    font_meta = load_font(32, True)
    font_title = load_font(38, True)
    font_cap = load_font(24, False)
    m = 64
    draw.text((m, 28), "SHIPNETWORK CASE STUDY", font=font_meta, fill=(*SN_BLUE, 255))
    draw.rectangle([m, 28 + 44, m + 110, 28 + 48], fill=(*SN_BLUE, 255))
    label = f"{number:02d} of {total:02d}"
    tw = draw.textbbox((0, 0), label, font=font_meta)[2]
    draw.text((W - m - tw, 28), label, font=font_meta, fill=(*GRAY, 255))
    draw.text((m, H - 68), title, font=font_title, fill=(*OFF_WHITE, 255))
    cw = draw.textbbox((0, 0), caption, font=font_cap)[2]
    draw.text((W - m - cw, H - 60), caption, font=font_cap, fill=(*GRAY, 255))
    os.makedirs(os.path.dirname(out_path) or ".", exist_ok=True)
    canvas.convert("RGB").save(out_path, "JPEG", quality=92, optimize=True)
    print(f"wrote {out_path} ({W}x{H})")

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--in", dest="inp", required=True)
    p.add_argument("--out", required=True)
    p.add_argument("--number", type=int, required=True)
    p.add_argument("--total", type=int, default=17)
    p.add_argument("--title", required=True)
    p.add_argument("--caption", required=True)
    args = p.parse_args()
    compose(args.inp, args.out, args.number, args.total, args.title, args.caption)

if __name__ == "__main__":
    main()
