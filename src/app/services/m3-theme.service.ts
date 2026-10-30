import { Injectable, computed, effect, signal } from '@angular/core';
import {
  Contrast,
  Hct,
  TonalPalette,
  argbFromHex,
  hexFromArgb,
} from '@material/material-color-utilities';

export type ThemeMode = 'light' | 'dark';
export type ContrastLevel = 'standard' | 'medium' | 'high';
export type MotionScheme = 'expressive' | 'standard';
export type TypographyMode = 'baseline' | 'emphasized';
export type DensityScale = 0 | -1 | -2 | -3;

export interface SeedPreset {
  name: string;
  subtitle: string;
  hex: string;
  badge: string;
}

export interface ColorRoleInfo {
  role: string;
  cssVar: string;
  palette: string;
  tone: number;
  hex: string;
  pairedWith?: string;
  pairedHex?: string;
  deltaTone?: number;
  contrastRatio?: number;
  category: 'accent' | 'surface' | 'outline-inverse' | 'fixed';
  description: string;
}

export interface PaletteStrip {
  name: string;
  key: string;
  hue: number;
  chroma: number;
  tones: { tone: number; hex: string; textColor: string }[];
}

export const M3_TONES = [
  0, 4, 6, 10, 12, 17, 20, 22, 24, 30, 40, 50, 60, 70, 80, 87, 90, 92, 94, 95, 96, 98, 99, 100,
] as const;

@Injectable({ providedIn: 'root' })
export class M3ThemeService {
  readonly presets: SeedPreset[] = [
    {
      name: 'Terracotta Clay',
      subtitle: 'Signature Anodized Bronze',
      hex: '#9C4131',
      badge: 'Flagship Finish',
    },
    {
      name: 'Celadon Sage',
      subtitle: 'Glazed Botanical Ceramic',
      hex: '#2E6C36',
      badge: 'Atelier Edition',
    },
    {
      name: 'Warm Ochre Brass',
      subtitle: 'Milled Champagne Brass',
      hex: '#7A5900',
      badge: 'Limited Series',
    },
    {
      name: 'Glacial Cobalt',
      subtitle: 'Reference Acoustic Lab',
      hex: '#005AC1',
      badge: 'Studio Reference',
    },
    {
      name: 'Lagoon Titanium',
      subtitle: 'Bead-Blasted Cyan-Teal',
      hex: '#006874',
      badge: 'Field Series',
    },
    {
      name: 'Spatial Violet',
      subtitle: 'Dolby & Android XR Edition',
      hex: '#6442D6',
      badge: 'Spatial Audio',
    },
  ];

  readonly seedColor = signal<string>('#9C4131');
  readonly themeMode = signal<ThemeMode>('light');
  readonly contrastLevel = signal<ContrastLevel>('standard');
  readonly motionScheme = signal<MotionScheme>('expressive');
  readonly typographyMode = signal<TypographyMode>('emphasized');
  readonly density = signal<DensityScale>(0);
  readonly isRtl = signal<boolean>(false);

  readonly seedHct = computed(() => {
    const argb = argbFromHex(this.seedColor());
    const hct = Hct.fromInt(argb);
    return {
      hue: Math.round(hct.hue),
      chroma: Math.round(hct.chroma),
      tone: Math.round(hct.tone),
    };
  });

  readonly palettes = computed(() => {
    const argb = argbFromHex(this.seedColor());
    const sourceHct = Hct.fromInt(argb);
    const h = sourceHct.hue;
    const c = Math.max(48, sourceHct.chroma);

    const pMap = {
      primary: TonalPalette.fromHueAndChroma(h, c),
      secondary: TonalPalette.fromHueAndChroma(h, 16),
      tertiary: TonalPalette.fromHueAndChroma((h + 60) % 360, 24),
      neutral: TonalPalette.fromHueAndChroma(h, 4),
      'neutral-variant': TonalPalette.fromHueAndChroma(h, 8),
      error: TonalPalette.fromHueAndChroma(25, 84),
    };

    const strips: PaletteStrip[] = Object.entries(pMap).map(([key, pal]) => ({
      name: key.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      key,
      hue: Math.round(pal.hue),
      chroma: Math.round(pal.chroma),
      tones: M3_TONES.map((t) => ({
        tone: t,
        hex: hexFromArgb(pal.tone(t)).toUpperCase(),
        textColor: t >= 60 ? '#1D1B20' : '#FFFFFF',
      })),
    }));

    return { pMap, strips };
  });

  readonly colorRoles = computed<ColorRoleInfo[]>(() => {
    const { pMap } = this.palettes();
    const isLight = this.themeMode() === 'light';
    const contrastMode = this.contrastLevel();

    // Tone selection per M3 Light / Dark / Medium Contrast / High Contrast spec
    const tPrimary = isLight
      ? contrastMode === 'high' ? 15 : contrastMode === 'medium' ? 26 : 40
      : contrastMode === 'high' ? 94 : contrastMode === 'medium' ? 85 : 80;
    const tOnPrimary = isLight
      ? 100
      : contrastMode === 'high' ? 0 : contrastMode === 'medium' ? 14 : 20;
    const tPrimaryContainer = isLight
      ? contrastMode === 'high' ? 26 : contrastMode === 'medium' ? 40 : 90
      : contrastMode === 'high' ? 85 : contrastMode === 'medium' ? 60 : 30;
    const tOnPrimaryContainer = isLight
      ? contrastMode === 'standard' ? 30 : 100
      : contrastMode === 'standard' ? 90 : 0;

    const tSurface = isLight ? 98 : 6;
    const tSurfaceDim = isLight ? (contrastMode === 'high' ? 74 : contrastMode === 'medium' ? 80 : 87) : 6;
    const tSurfaceBright = isLight ? 98 : (contrastMode === 'high' ? 36 : contrastMode === 'medium' ? 30 : 24);
    const tSurfLowest = isLight ? 100 : (contrastMode === 'high' ? 0 : contrastMode === 'medium' ? 2 : 4);
    const tSurfLow = isLight
      ? contrastMode === 'high' ? 92 : contrastMode === 'medium' ? 94 : 96
      : contrastMode === 'high' ? 12 : contrastMode === 'medium' ? 11 : 10;
    const tSurf = isLight
      ? contrastMode === 'high' ? 87 : contrastMode === 'medium' ? 90 : 94
      : contrastMode === 'high' ? 18 : contrastMode === 'medium' ? 16 : 12;
    const tSurfHigh = isLight
      ? contrastMode === 'high' ? 82 : contrastMode === 'medium' ? 86 : 92
      : contrastMode === 'high' ? 24 : contrastMode === 'medium' ? 21 : 17;
    const tSurfHighest = isLight
      ? contrastMode === 'high' ? 77 : contrastMode === 'medium' ? 82 : 90
      : contrastMode === 'high' ? 30 : contrastMode === 'medium' ? 26 : 22;

    const tOnSurface = isLight
      ? contrastMode === 'standard' ? 10 : 0
      : contrastMode === 'standard' ? 90 : 100;
    const tOnSurfaceVar = isLight
      ? contrastMode === 'high' ? 0 : contrastMode === 'medium' ? 20 : 30
      : contrastMode === 'high' ? 100 : contrastMode === 'medium' ? 88 : 80;
    const tOutline = isLight
      ? contrastMode === 'high' ? 20 : contrastMode === 'medium' ? 35 : 50
      : contrastMode === 'high' ? 88 : contrastMode === 'medium' ? 72 : 60;
    const tOutlineVar = isLight
      ? contrastMode === 'high' ? 35 : contrastMode === 'medium' ? 55 : 80
      : contrastMode === 'high' ? 72 : contrastMode === 'medium' ? 52 : 30;

    const raw: {
      role: string;
      pal: keyof typeof pMap;
      tone: number;
      pairRole?: string;
      cat: ColorRoleInfo['category'];
      desc: string;
    }[] = [
      { role: 'primary', pal: 'primary', tone: tPrimary, pairRole: 'on-primary', cat: 'accent', desc: 'High-emphasis fills, active controls, links' },
      { role: 'on-primary', pal: 'primary', tone: tOnPrimary, pairRole: 'primary', cat: 'accent', desc: 'Text & icons on primary' },
      { role: 'primary-container', pal: 'primary', tone: tPrimaryContainer, pairRole: 'on-primary-container', cat: 'accent', desc: 'Default FAB, vibrant toolbar, key callouts' },
      { role: 'on-primary-container', pal: 'primary', tone: tOnPrimaryContainer, pairRole: 'primary-container', cat: 'accent', desc: 'Text & icons on primary-container' },

      { role: 'secondary', pal: 'secondary', tone: tPrimary, pairRole: 'on-secondary', cat: 'accent', desc: 'Selected tonal toggles, 3dp focus ring, active nav label' },
      { role: 'on-secondary', pal: 'secondary', tone: tOnPrimary, pairRole: 'secondary', cat: 'accent', desc: 'Text & icons on secondary' },
      { role: 'secondary-container', pal: 'secondary', tone: tPrimaryContainer, pairRole: 'on-secondary-container', cat: 'accent', desc: 'Tonal buttons, active nav pill, selected chips, inactive track' },
      { role: 'on-secondary-container', pal: 'secondary', tone: tOnPrimaryContainer, pairRole: 'secondary-container', cat: 'accent', desc: 'Text & icons on secondary-container' },

      { role: 'tertiary', pal: 'tertiary', tone: tPrimary, pairRole: 'on-tertiary', cat: 'accent', desc: 'Complementary accents, vibrant menu selection' },
      { role: 'on-tertiary', pal: 'tertiary', tone: tOnPrimary, pairRole: 'tertiary', cat: 'accent', desc: 'Text & icons on tertiary' },
      { role: 'tertiary-container', pal: 'tertiary', tone: tPrimaryContainer, pairRole: 'on-tertiary-container', cat: 'accent', desc: 'Search FAB, AM/PM selector, vibrant menu, list reorder' },
      { role: 'on-tertiary-container', pal: 'tertiary', tone: tOnPrimaryContainer, pairRole: 'tertiary-container', cat: 'accent', desc: 'Text & icons on tertiary-container' },

      { role: 'error', pal: 'error', tone: tPrimary, pairRole: 'on-error', cat: 'accent', desc: 'Invalid input borders, notification badges, destructive alerts' },
      { role: 'on-error', pal: 'error', tone: tOnPrimary, pairRole: 'error', cat: 'accent', desc: 'Badge text & icons on error' },
      { role: 'error-container', pal: 'error', tone: tPrimaryContainer, pairRole: 'on-error-container', cat: 'accent', desc: 'Error callout container' },
      { role: 'on-error-container', pal: 'error', tone: tOnPrimaryContainer, pairRole: 'error-container', cat: 'accent', desc: 'Text & icons on error-container' },

      { role: 'surface', pal: 'neutral', tone: tSurface, pairRole: 'on-surface', cat: 'surface', desc: 'Default app background, flat app bar, outlined card' },
      { role: 'surface-dim', pal: 'neutral', tone: tSurfaceDim, pairRole: 'on-surface', cat: 'surface', desc: 'Dimmed canvas backdrop on large viewports' },
      { role: 'surface-bright', pal: 'neutral', tone: tSurfaceBright, pairRole: 'on-surface', cat: 'surface', desc: 'Brightened surface emphasis' },
      { role: 'surface-container-lowest', pal: 'neutral', tone: tSurfLowest, pairRole: 'on-surface', cat: 'surface', desc: 'Recessed wells below surface' },
      { role: 'surface-container-low', pal: 'neutral', tone: tSurfLow, pairRole: 'on-surface', cat: 'surface', desc: 'Elevated cards, elevated buttons, bottom/side sheets, menus' },
      { role: 'surface-container', pal: 'neutral', tone: tSurf, pairRole: 'on-surface', cat: 'surface', desc: 'Default contained area: Nav bar, scrolled app bar, toolbar' },
      { role: 'surface-container-high', pal: 'neutral', tone: tSurfHigh, pairRole: 'on-surface', cat: 'surface', desc: 'Dialogs, date/time pickers, search bar (Level 3)' },
      { role: 'surface-container-highest', pal: 'neutral', tone: tSurfHighest, pairRole: 'on-surface', cat: 'surface', desc: 'Filled cards, filled text fields, unselected switch track' },
      { role: 'on-surface', pal: 'neutral', tone: tOnSurface, pairRole: 'surface', cat: 'surface', desc: 'Primary headlines, titles, body copy' },
      { role: 'on-surface-variant', pal: 'neutral-variant', tone: tOnSurfaceVar, pairRole: 'surface-container', cat: 'surface', desc: 'Subtitles, supporting text, inactive icons, outlined button text' },

      { role: 'outline', pal: 'neutral-variant', tone: tOutline, pairRole: 'surface', cat: 'outline-inverse', desc: '3:1 functional border: Outlined text fields, unselected switch' },
      { role: 'outline-variant', pal: 'neutral-variant', tone: tOutlineVar, pairRole: 'surface', cat: 'outline-inverse', desc: '1dp dividers, outlined cards, flat chips, Expressive outlined buttons' },
      { role: 'inverse-surface', pal: 'neutral', tone: isLight ? 20 : 90, pairRole: 'inverse-on-surface', cat: 'outline-inverse', desc: 'Snackbars, plain tooltips, selected outlined toggle' },
      { role: 'inverse-on-surface', pal: 'neutral', tone: isLight ? 95 : 20, pairRole: 'inverse-surface', cat: 'outline-inverse', desc: 'Text & icons on inverse-surface' },
      { role: 'inverse-primary', pal: 'primary', tone: isLight ? 80 : 40, pairRole: 'inverse-surface', cat: 'outline-inverse', desc: 'Action button label inside snackbars' },

      { role: 'primary-fixed', pal: 'primary', tone: 90, pairRole: 'on-primary-fixed', cat: 'fixed', desc: 'Fixed primary container (invariant across Light/Dark)' },
      { role: 'primary-fixed-dim', pal: 'primary', tone: 80, pairRole: 'on-primary-fixed', cat: 'fixed', desc: 'Dimmed fixed primary container' },
      { role: 'on-primary-fixed', pal: 'primary', tone: 10, pairRole: 'primary-fixed', cat: 'fixed', desc: 'Text on primary-fixed' },
      { role: 'on-primary-fixed-variant', pal: 'primary', tone: 30, pairRole: 'primary-fixed', cat: 'fixed', desc: 'Secondary text/icons on primary-fixed' },
      { role: 'secondary-fixed', pal: 'secondary', tone: 90, pairRole: 'on-secondary-fixed', cat: 'fixed', desc: 'Fixed secondary container' },
      { role: 'Tertiary-fixed'.toLowerCase(), pal: 'tertiary', tone: 90, pairRole: 'on-tertiary-fixed', cat: 'fixed', desc: 'Fixed tertiary container' },
      { role: 'on-secondary-fixed', pal: 'secondary', tone: 10, pairRole: 'secondary-fixed', cat: 'fixed', desc: 'Text on secondary-fixed' },
      { role: 'on-tertiary-fixed', pal: 'tertiary', tone: 10, pairRole: 'tertiary-fixed', cat: 'fixed', desc: 'Text on tertiary-fixed' },
    ];

    const byRole = new Map<string, { tone: number; argb: number; hex: string }>();
    for (const r of raw) {
      const argb = pMap[r.pal].tone(r.tone);
      byRole.set(r.role, { tone: r.tone, argb, hex: hexFromArgb(argb).toUpperCase() });
    }

    return raw.map((r) => {
      const self = byRole.get(r.role)!;
      const pair = r.pairRole ? byRole.get(r.pairRole) : undefined;
      const ratio = pair ? Number(Contrast.ratioOfTones(self.tone, pair.tone).toFixed(2)) : undefined;
      return {
        role: r.role,
        cssVar: `--md-sys-color-${r.role}`,
        palette: r.pal,
        tone: self.tone,
        hex: self.hex,
        pairedWith: r.pairRole,
        pairedHex: pair?.hex,
        deltaTone: pair ? Math.abs(self.tone - pair.tone) : undefined,
        contrastRatio: ratio,
        category: r.cat,
        description: r.desc,
      };
    });
  });

  constructor() {
    effect(() => {
      if (typeof document === 'undefined') return;
      const root = document.documentElement;
      for (const role of this.colorRoles()) {
        root.style.setProperty(role.cssVar, role.hex);
      }
      for (const strip of this.palettes().strips) {
        for (const t of strip.tones) {
          root.style.setProperty(`--md-ref-palette-${strip.key}${t.tone}`, t.hex);
        }
      }
      root.setAttribute('data-theme', this.themeMode());
      root.setAttribute('data-contrast', this.contrastLevel());
      root.setAttribute('data-motion', this.motionScheme());
      root.setAttribute('data-typography', this.typographyMode());
      root.setAttribute('dir', this.isRtl() ? 'rtl' : 'ltr');
      root.style.setProperty('--md-density-offset', `${this.density() * 4}px`);
    });
  }

  setHue(hue: number): void {
    const cur = this.seedHct();
    const argb = Hct.from(hue, Math.max(24, cur.chroma), cur.tone || 50).toInt();
    this.seedColor.set(hexFromArgb(argb).toUpperCase());
  }

  setChroma(chroma: number): void {
    const cur = this.seedHct();
    const argb = Hct.from(cur.hue, chroma, cur.tone || 50).toInt();
    this.seedColor.set(hexFromArgb(argb).toUpperCase());
  }

  exportCssTokens(): string {
    const lines = [
      `/* ==========================================================================`,
      `   Generated by M3 Expressive Design Studio`,
      `   Seed: ${this.seedColor()} | Mode: ${this.themeMode()} | Contrast: ${this.contrastLevel()}`,
      `   ========================================================================== */`,
      `:root {`,
    ];
    for (const r of this.colorRoles()) {
      lines.push(`  ${r.cssVar}: ${r.hex}; /* ${r.palette} T${r.tone} (${r.contrastRatio}:1 vs ${r.pairedWith}) */`);
    }
    lines.push(`}`);
    return lines.join('\n');
  }

  exportAngularMaterialScss(): string {
    const lines = [
      `// Angular Material 21 + M3 Expressive System Tokens`,
      `// Seed: ${this.seedColor()} (${this.themeMode()} / ${this.contrastLevel()} contrast)`,
      `@use '@angular/material' as mat;`,
      ``,
      `:root {`,
    ];
    for (const r of this.colorRoles()) {
      lines.push(`  --mat-sys-${r.role}: ${r.hex};`);
    }
    lines.push(`}`);
    return lines.join('\n');
  }

  exportComposeKotlin(): string {
    const toCamel = (s: string) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const fnName = this.themeMode() === 'light' ? 'lightColorScheme' : 'darkColorScheme';
    const lines = [
      `// Jetpack Compose Material 3 ColorScheme (Seed: ${this.seedColor()})`,
      `val AppColorScheme = ${fnName}(`,
    ];
    for (const r of this.colorRoles().filter((x) => x.category !== 'fixed')) {
      const hexClean = r.hex.replace('#', '');
      lines.push(`    ${toCamel(r.role)} = Color(0xFF${hexClean}),`);
    }
    lines.push(`)`);
    return lines.join('\n');
  }

  exportW3cJson(): string {
    const obj: Record<string, unknown> = {
      $metadata: {
        generator: 'M3 Expressive Design Studio',
        seed: this.seedColor(),
        themeMode: this.themeMode(),
        contrastLevel: this.contrastLevel(),
      },
      md: {
        sys: {
          color: Object.fromEntries(
            this.colorRoles().map((r) => [
              r.role,
              {
                $type: 'color',
                $value: r.hex,
                $extensions: {
                  palette: r.palette,
                  tone: r.tone,
                  contrastRatio: r.contrastRatio,
                },
              },
            ])
          ),
        },
      },
    };
    return JSON.stringify(obj, null, 2);
  }
}
