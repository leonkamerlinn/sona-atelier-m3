#!/usr/bin/env python3
"""
generate_m3_palette.py — Generate a complete Material Design 3 tonal palette and
Light/Dark `--md-sys-color-*` CSS custom properties or JSON tokens from any seed hex color.

Usage:
  python3 scripts/generate_m3_palette.py "#006874"
  python3 scripts/generate_m3_palette.py "#6750A4" --format json
"""

import argparse
import json
import math
import sys

TONES = [0, 4, 6, 10, 12, 17, 20, 22, 24, 30, 40, 50, 60, 70, 80, 87, 90, 92, 94, 95, 96, 98, 99, 100]


def hex_to_srgb(h: str):
    h = h.strip().lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    return tuple(int(h[i : i + 2], 16) / 255.0 for i in (0, 2, 4))


def srgb_to_hex(rgb):
    return "#" + "".join(f"{max(0, min(255, round(c * 255))):02X}" for c in rgb)


def srgb_to_linear(c: float) -> float:
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def linear_to_srgb(c: float) -> float:
    c = max(0.0, min(1.0, c))
    return 12.92 * c if c <= 0.0031308 else 1.055 * (c ** (1.0 / 2.4)) - 0.055


def rgb_to_lch(r: float, g: float, b: float):
    lr, lg, lb = srgb_to_linear(r), srgb_to_linear(g), srgb_to_linear(b)
    x = (0.4124564 * lr + 0.3575761 * lg + 0.1804375 * lb) / 0.95047
    y = (0.2126729 * lr + 0.7151522 * lg + 0.0721750 * lb) / 1.00000
    z = (0.0193339 * lr + 0.1191920 * lg + 0.9503041 * lb) / 1.08883

    def f(t):
        return t ** (1 / 3) if t > 0.008856 else 7.787 * t + 16 / 116

    fx, fy, fz = f(x), f(y), f(z)
    L = 116 * fy - 16
    a = 500 * (fx - fy)
    b_val = 200 * (fy - fz)
    C = math.hypot(a, b_val)
    H = math.degrees(math.atan2(b_val, a)) % 360.0
    return L, C, H


def lch_to_rgb_in_gamut(L: float, C: float, H: float):
    if L <= 0.0:
        return (0.0, 0.0, 0.0)
    if L >= 100.0:
        return (1.0, 1.0, 1.0)
    rad = math.radians(H)

    def to_linear_rgb(chroma):
        a = chroma * math.cos(rad)
        b_val = chroma * math.sin(rad)
        fy = (L + 16.0) / 116.0
        fx = a / 500.0 + fy
        fz = fy - b_val / 200.0

        def finv(t):
            return t**3 if t**3 > 0.008856 else (t - 16.0 / 116.0) / 7.787

        x, y, z = 0.95047 * finv(fx), 1.00000 * finv(fy), 1.08883 * finv(fz)
        lr = 3.2404542 * x - 1.5371385 * y - 0.4985314 * z
        lg = -0.9692660 * x + 1.8760108 * y + 0.0415560 * z
        lb = 0.0556434 * x - 0.2040259 * y + 1.0572252 * z
        return lr, lg, lb

    lo, hi = 0.0, C
    best = to_linear_rgb(0.0)
    for _ in range(18):
        mid = (lo + hi) / 2.0
        lr, lg, lb = to_linear_rgb(mid)
        if -1e-4 <= lr <= 1.0001 and -1e-4 <= lg <= 1.0001 and -1e-4 <= lb <= 1.0001:
            best = (lr, lg, lb)
            lo = mid
        else:
            hi = mid
    return tuple(linear_to_srgb(c) for c in best)


def build_tonal_palette(hue: float, chroma: float):
    return {t: srgb_to_hex(lch_to_rgb_in_gamut(float(t), chroma, hue)) for t in TONES}


def generate_scheme(seed_hex: str):
    r, g, b = hex_to_srgb(seed_hex)
    _, seed_c, seed_h = rgb_to_lch(r, g, b)
    primary_c = max(48.0, seed_c)
    palettes = {
        "primary": build_tonal_palette(seed_h, primary_c),
        "secondary": build_tonal_palette(seed_h, 16.0),
        "tertiary": build_tonal_palette((seed_h + 60.0) % 360.0, 24.0),
        "neutral": build_tonal_palette(seed_h, 4.0),
        "neutral-variant": build_tonal_palette(seed_h, 8.0),
        "error": build_tonal_palette(25.0, 84.0),
    }

    p, s, t, n, nv, e = (
        palettes["primary"],
        palettes["secondary"],
        palettes["tertiary"],
        palettes["neutral"],
        palettes["neutral-variant"],
        palettes["error"],
    )

    light = {
        "primary": p[40],
        "on-primary": p[100],
        "primary-container": p[90],
        "on-primary-container": p[30],
        "primary-fixed": p[90],
        "primary-fixed-dim": p[80],
        "on-primary-fixed": p[10],
        "on-primary-fixed-variant": p[30],
        "secondary": s[40],
        "on-secondary": s[100],
        "secondary-container": s[90],
        "on-secondary-container": s[30],
        "secondary-fixed": s[90],
        "secondary-fixed-dim": s[80],
        "on-secondary-fixed": s[10],
        "on-secondary-fixed-variant": s[30],
        "tertiary": t[40],
        "on-tertiary": t[100],
        "tertiary-container": t[90],
        "on-tertiary-container": t[30],
        "tertiary-fixed": t[90],
        "tertiary-fixed-dim": t[80],
        "on-tertiary-fixed": t[10],
        "on-tertiary-fixed-variant": t[30],
        "error": e[40],
        "on-error": e[100],
        "error-container": e[90],
        "on-error-container": e[30],
        "surface": n[98],
        "surface-dim": n[87],
        "surface-bright": n[98],
        "surface-container-lowest": n[100],
        "surface-container-low": n[96],
        "surface-container": n[94],
        "surface-container-high": n[92],
        "surface-container-highest": n[90],
        "on-surface": n[10],
        "on-surface-variant": nv[30],
        "outline": nv[50],
        "outline-variant": nv[80],
        "inverse-surface": n[20],
        "inverse-on-surface": n[95],
        "inverse-primary": p[80],
        "scrim": "#000000",
        "shadow": "#000000",
    }

    dark = {
        "primary": p[80],
        "on-primary": p[20],
        "primary-container": p[30],
        "on-primary-container": p[90],
        "primary-fixed": p[90],
        "primary-fixed-dim": p[80],
        "on-primary-fixed": p[10],
        "on-primary-fixed-variant": p[30],
        "secondary": s[80],
        "on-secondary": s[20],
        "secondary-container": s[30],
        "on-secondary-container": s[90],
        "secondary-fixed": s[90],
        "secondary-fixed-dim": s[80],
        "on-secondary-fixed": s[10],
        "on-secondary-fixed-variant": s[30],
        "tertiary": t[80],
        "on-tertiary": t[20],
        "tertiary-container": t[30],
        "on-tertiary-container": t[90],
        "tertiary-fixed": t[90],
        "tertiary-fixed-dim": t[80],
        "on-tertiary-fixed": t[10],
        "on-tertiary-fixed-variant": t[30],
        "error": e[80],
        "on-error": e[20],
        "error-container": e[30],
        "on-error-container": e[90],
        "surface": n[6],
        "surface-dim": n[6],
        "surface-bright": n[24],
        "surface-container-lowest": n[4],
        "surface-container-low": n[10],
        "surface-container": n[12],
        "surface-container-high": n[17],
        "surface-container-highest": n[22],
        "on-surface": n[90],
        "on-surface-variant": nv[80],
        "outline": nv[60],
        "outline-variant": nv[30],
        "inverse-surface": n[90],
        "inverse-on-surface": n[20],
        "inverse-primary": p[40],
        "scrim": "#000000",
        "shadow": "#000000",
    }
    return {"seed": seed_hex, "palettes": palettes, "light": light, "dark": dark}


def main():
    parser = argparse.ArgumentParser(description="Generate M3 tonal palettes and color schemes from a seed hex color")
    parser.add_argument("seed", help="Seed hex color, e.g. '#006874'")
    parser.add_argument("--format", choices=["css", "json"], default="css")
    args = parser.parse_args()
    data = generate_scheme(args.seed)
    if args.format == "json":
        print(json.dumps(data, indent=2))
    else:
        print(f"/* Generated M3 Color Scheme for seed {args.seed} */")
        print(":root {")
        for k, v in data["light"].items():
            print(f"  --md-sys-color-{k}: {v};")
        print("}\n\n[data-theme=\"dark\"], .dark-theme {")
        for k, v in data["dark"].items():
            print(f"  --md-sys-color-{k}: {v};")
        print("}")


if __name__ == "__main__":
    main()
