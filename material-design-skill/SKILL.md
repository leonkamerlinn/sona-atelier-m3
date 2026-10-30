---
name: material-design-3
description: Comprehensive Google Material Design 3 (M3) and M3 Expressive design system skill. Activate when designing, building, theming, auditing, or refactoring UIs, components, design tokens, layouts, motion, or accessibility for Web (CSS/HTML/React/Lit), Android (Jetpack Compose / MDC-Android), Flutter, Android XR, or Wear OS, or when replicating the look and engineering of m3.material.io.
---

# Material Design 3 & M3 Expressive — Master Agent Skill

This skill contains the complete, browser-verified specification of **Google Material Design 3 (M3)** and the **M3 Expressive** update (DSDB v38.2.9), extracted directly from all 263 specification pages, 36 interactive component token databases, and 113 engineering blog posts on `https://m3.material.io/`, plus a live DOM/CSS reverse-engineering of how `m3.material.io` itself is built.

---

## 1. Skill Directory & Navigation Map

When working on a Material 3 task, use the quick-reference tables in this `SKILL.md` first, and read the specific reference or token file below when you need deep component anatomy, state tables, or edge-case guidelines:

### Distilled Reference Guides (`references/`)
- **Styles (`references/styles/`)**
  - [`references/styles/color.md`](references/styles/color.md) — HCT color space, tonal palettes, all 40+ color roles (`primary`, `surface-container-*`, `*-fixed`, `outline-variant`, etc.), Light/Dark/Medium/High contrast tone mappings, dynamic vs. static color, custom color harmonization, Do/Don't rules.
  - [`references/styles/typography.md`](references/styles/typography.md) — 15 Baseline + 15 M3 Expressive Emphasized type scale roles (`display`, `headline`, `title`, `body`, `label` × `large`, `medium`, `small`), variable font axes (`wght`, `wdth`, `opsz`, `GRAD`, `ROND`), script height multipliers, line-length & 200% scaling rules.
  - [`references/styles/shape-elevation-spacing.md`](references/styles/shape-elevation-spacing.md) — 10-step corner radius scale (`none` `0dp` to `full` + Expressive `20dp`/`32dp`/`48dp`), 35 `MaterialShapes` & spring shape morphing, concentric corner formula ($R_{\text{inner}} = R_{\text{outer}} - \text{padding}$), Elevation levels 0–5 (`0dp`–`12dp`), spacing scale (`space25`–`space900`), visual density (`0` to `-4`).
  - [`references/styles/motion-and-icons.md`](references/styles/motion-and-icons.md) — M3 Expressive spring physics (`spatial` vs. `effects` springs, `fast`/`default`/`slow` damping & stiffness, Web `cubic-bezier`/`linear()` equivalents), legacy easing/duration tokens, transition patterns (Container transform, Shared axis, Fade through), Material Symbols variable axes (`opsz`, `wght`, `FILL`, `GRAD`), RTL icon mirroring.
- **Foundations (`references/foundations/`)**
  - [`references/foundations/layout-and-adaptive.md`](references/foundations/layout-and-adaptive.md) — 5 Window Size Classes (`compact`, `medium`, `expanded`, `large`, `extra-large`), Scaffold (`Bars`, `Rails`, `Panes`), multi-pane adaptive strategies (Show/Hide, Levitate, Reflow, resizable drag handle), Canonical layouts (Feed, List-detail, Supporting pane), foldables/hinges, RTL bidirectionality.
  - [`references/foundations/tokens-states-interaction.md`](references/foundations/tokens-states-interaction.md) — 3-tier token taxonomy (`md.ref.*` → `md.sys.*` → `md.comp.*`), state layers (Hover `8%`, Focus `10%` + `3dp` ring, Press `10%`, Drag `16%`, Disabled `12%`/`38%`), gestures & Predictive Back, pointer/mouse/keyboard interaction, selection patterns.
  - [`references/foundations/accessibility-and-usability.md`](references/foundations/accessibility-and-usability.md) — WCAG & HCT contrast rules (`4.5:1` text, `3:1` non-text/large text, `7:1` high contrast), `48×48dp` targets, TalkBack/VoiceOver semantics, focus traversal, 200% text resizing without truncation, M3 Expressive eye-tracking usability principles.
  - [`references/foundations/content-design-and-writing.md`](references/foundations/content-design-and-writing.md) — Sentence case rule, voice & tone, punctuation rules, global writing (`1.5×` localization expansion budget), alt text (`≤125 chars`), notification copy limits (`<29`/`<40`/`<80 chars`).
- **Components (`references/components/`)**
  - [`references/components/buttons-and-actions.md`](references/components/buttons-and-actions.md) — Decision matrix for all 9 action components; Buttons (Default & Toggle, 5 color styles, 5 sizes XS–XL, Round/Square + press/select shape morph), Icon Buttons (5 sizes × 3 widths), Split Buttons, Button Groups (Standard 15% press bounce vs. Connected), Segmented Buttons.
  - [`references/components/fabs-and-fab-menu.md`](references/components/fabs-and-fab-menu.md) — FAB & Extended FAB (3 Expressive sizes `56dp`/`80dp`/`96dp`, 6 color styles), FAB Menu (new in M3 Expressive: `56dp` close button + 2–6 stacked `56dp` pill items).
  - [`references/components/app-bars-and-toolbars.md`](references/components/app-bars-and-toolbars.md) — Top App Bars (Search, Small `64dp`, Medium flexible `112/136dp`, Large flexible `120/152dp`), Toolbars (new in M3 Expressive, replacing Bottom App Bar: Docked `64dp` vs. Floating pill `64dp`, Standard vs. Vibrant colors).
  - [`references/components/navigation-bar-rail-drawer.md`](references/components/navigation-bar-rail-drawer.md) — Flexible Navigation Bar (`64dp`, vertical stacked vs. horizontal inline items), Navigation Rail (Collapsed `80–96dp` vs. Expanded `220–360dp` replacing Navigation Drawer), Navigation Drawer (`360dp`, legacy).
  - [`references/components/tabs-and-search.md`](references/components/tabs-and-search.md) — Primary (`48/64dp`, `3dp` pill indicator) & Secondary (`48dp`, `2dp` full underline) Tabs (Fixed vs. Scrollable `52dp` offset); Search Bar (`56dp` pill) & Search View (Full-screen vs. Docked).
  - [`references/components/cards-carousel-lists-divider.md`](references/components/cards-carousel-lists-divider.md) — Cards (Elevated, Filled, Outlined, `12dp` radius), Carousel (6 layouts: Multi-browse, Uncontained, Hero, Center Hero, Full-screen; `28dp` radius, `40–56dp` squished items), Lists (`56/72/88dp` + Expressive Segmented `2dp` gap & shape morph), Divider (`1dp` `outline-variant`).
  - [`references/components/dialogs-sheets-menus.md`](references/components/dialogs-sheets-menus.md) — Basic (`280–560dp`, `28dp` radius) & Full-screen Dialogs; Bottom Sheets (Standard vs. Modal, `28dp` top corners, `32×4dp` drag handle, `640dp` max width); Side Sheets (`256–400dp`, Standard/Modal/Detached); Menus (M3 Expressive Standard vs. Vibrant, `44dp` items, `2dp` group gaps).
  - [`references/components/selection-and-chips-sliders.md`](references/components/selection-and-chips-sliders.md) — Checkbox (`18×18dp`, tri-state), Radio Button (`20×20dp`), Switch (`52×32dp` track, morphing `16→24→28dp` handle), Chips (Assist, Filter, Input, Suggestion; `32dp` height, `8dp` radius), Sliders (M3 Expressive 5 track heights XS `16dp` to XL `96dp`, `4dp` vertical handle).
  - [`references/components/text-fields-and-pickers.md`](references/components/text-fields-and-pickers.md) — Text Fields (Filled vs. Outlined, `56dp` height, floating label, error state), Date Pickers (Docked, Modal Calendar `360×524dp`, Modal Input, Range), Time Pickers (Dial `256dp` 12h/24h vs. Input).
  - [`references/components/feedback-badges-progress-snackbar-tooltips.md`](references/components/feedback-badges-progress-snackbar-tooltips.md) — Badges (`6dp` dot vs. `16dp` pill), Loading Indicator (M3 Expressive 7-shape polygon morph, `48dp`), Progress Indicators (Linear & Circular, Flat vs. Wavy), Snackbar (`48/68dp`, `inverse-surface`), Tooltips (Plain `24dp` vs. Rich `12dp` radius).
- **Platforms & Site Engineering**
  - [`references/platforms/compose-flutter-web-xr-watches.md`](references/platforms/compose-flutter-web-xr-watches.md) — Jetpack Compose (Compose-first M3 Expressive), Flutter, MDC-Android, Material Web, **Android XR** (spatial panels `1024×720dp` at `1.75m`, orbiters, `56×56dp` targets), **Wear OS** (round layouts, `#000000` canvas, curved `Arc` type).
  - [`references/site-architecture.md`](references/site-architecture.md) — Reverse-engineered blueprint of `https://m3.material.io` (`mio-root`, `--mio-theme-*` tokens, `Google Sans` weight `475` hero scale, `linear-gradient` CSS state layers, `88px` nav rail, split hero, sticky pill tab bar, asymmetric Do/Don't callout bars).

### Resolved Token Tables (`tokens/`), Templates (`templates/`), Scripts (`scripts/`) & Raw Docs (`docs/`)
- [`tokens/sys-tokens.md`](tokens/sys-tokens.md) — All resolved `md.sys.*` & `md.ref.*` tokens.
- `tokens/components/<component>.md` — 36 component token tables with Light/Dark hex values, `dp`/`pt` measurements, and `md.sys.*` references.
- [`templates/m3-tokens.css`](templates/m3-tokens.css) & [`templates/m3-components.css`](templates/m3-components.css) — Production CSS custom properties and M3 Expressive component classes.
- [`templates/ComposeThemeTemplate.kt`](templates/ComposeThemeTemplate.kt) & [`templates/flutter_m3_theme.dart`](templates/flutter_m3_theme.dart) — Copy-paste Compose & Flutter theme definitions.
- [`scripts/generate_m3_palette.py`](scripts/generate_m3_palette.py) — Run `python3 scripts/generate_m3_palette.py "#HEX" [--format css|json]` to generate full M3 tonal palettes and Light/Dark tokens from any seed color.
- [`scripts/search_m3.py`](scripts/search_m3.py) — Run `python3 scripts/search_m3.py "<query>" [--scope references|tokens|pages|blog]` to search the entire corpus.
- `docs/pages/*.md` (88 verbatim page dumps) & `docs/blog/*.md` (111 blog articles).

---

## 2. Core M3 & M3 Expressive Architecture

### 2.1 Three-Tier Token Taxonomy
Never hardcode hex colors, pixel sizes, or bezier curves directly in component styles. Always wire through the 3 token tiers:
1. **Reference tokens (`md.ref.*`)**: Context-independent primitives — Tonal palettes (`md.ref.palette.{primary,secondary,tertiary,neutral,neutral-variant,error}{0..100}`) and Typefaces (`md.ref.typeface.{brand,plain,weight-*}`).
2. **System tokens (`md.sys.*`)**: Semantic theme decisions that respond to Light/Dark mode, contrast level, window size class, and motion scheme (`md.sys.color.*`, `md.sys.typescale.*`, `md.sys.shape.corner.*`, `md.sys.elevation.level0..5`, `md.sys.motion.spring.*`, `md.sys.state.*`, `md.sys.measurement.space*`).
3. **Component tokens (`md.comp.*`)**: Element-specific mappings (`md.comp.button.filled.container.color` → `md.sys.color.primary`). In M3 Expressive, component tokens are split into composable **Color token sets** (`md.comp.button.filled`) and **Size token sets** (`md.comp.button.large`).

### 2.2 What Changed in M3 Expressive (2025–2026)
Always apply M3 Expressive rules unless a legacy M3 baseline is explicitly requested:
1. **Physics-Based Spring Motion (`md.sys.motion.spring.*`)** replaces duration+bezier curves as the primary animation model:
   - **Spatial springs** (`damping = 0.9` standard / `~0.6` expressive; overshoots/bounces) animate position, size, layout bounds, and corner/shape morphing.
   - **Effects springs** (`damping = 1.0` critically damped; **never** overshoots) animate color, opacity, state layers, and elevation shadows.
2. **Expanded Shape Scale & Shape Morphing**: Adds `large-increased` (`20dp`), `extra-large-increased` (`32dp`), `extra-extra-large` (`48dp`), and a 35-shape `MaterialShapes` library. Interactive controls (buttons, icon buttons, split buttons, connected button groups, segmented list items, sliders, switches) **morph corner radii** on press and toggle selection (`Round` ↔ `Square`).
3. **5-Size Action Hierarchy (`XS`, `S`, `M`, `L`, `XL`)**: Buttons, Icon Buttons, Split Buttons, Button Groups, and Sliders scale across 5 heights (`32dp`, `40dp`, `56dp`, `96dp`, `136dp` for buttons; `16dp`–`96dp` tracks for sliders). Small button horizontal padding is now **`16dp`** (`24dp` is deprecated).
4. **Emphasized Type Scale**: Every `md.sys.typescale.*` role has an `emphasized` counterpart with one step heavier weight (`400 → 500`, `500 → 700`) for editorial hierarchy and hero moments.
5. **New & Consolidated Components**:
   - **Toolbars** (Docked `64dp` & Floating pill `64dp` in Standard/Vibrant colors) **replace Bottom App Bar**.
   - **App Bars** unify into Small (`64dp`), Medium flexible (`112/136dp`), Large flexible (`120/152dp`), and Search app bar (`64dp`).
   - **Flexible Navigation Bar** reduces height from `80dp` to **`64dp`** and supports both vertical stacked (compact) and horizontal inline (medium) items.
   - **Expanded Navigation Rail** (`220–360dp`) **replaces Navigation Drawer** on large screens.
   - **Connected Button Groups** (`2dp` gap, morphing inner corners) **replace Segmented Buttons**.
   - **FAB Menu** (`56dp` close button + 2–6 pill items) and **Loading Indicator** (7-shape morphing polygon for `<5s` waits) are introduced; `40dp` Small FAB and `Surface` FAB are deprecated (`56dp`, `80dp`, `96dp` are the 3 FAB sizes).
   - **Progress Indicators** add **Wavy** animated sinusoidal tracks alongside Flat tracks (`4dp` gap between active bar and track).

---

## 3. Master Style Tables

### 3.1 Color Roles, Tone Mappings & Baseline Hex Values
In HCT (`Hue 0–360`, `Chroma 0–120+`, `Tone 0–100`), **Tone difference ($\Delta T$) guarantees contrast regardless of Hue or Chroma**:
- $\Delta T \ge 40 \implies \ge 3.0:1$ contrast (large text, icons, active UI boundaries).
- $\Delta T \ge 50 \implies \ge 4.5:1$ contrast (WCAG AA normal text).
- $\Delta T \ge 68 \implies \ge 7.0:1$ contrast (WCAG AAA / High-Contrast mode).

> **Critical Surface Rule**: Opacity-based `surface-tint` elevation overlays are **deprecated**. Always use the 5 tone-based **Surface Container** roles (`surface-container-lowest` through `surface-container-highest`) to express containment and elevation.

| Color Role (`--md-sys-color-*`) | Palette | Light Tone (Hex) | Dark Tone (Hex) | Med / High Contrast (L / D) | Primary Usage |
|---|---|---|---|---|---|
| `primary` | Primary | **T40** (`#6750A4`) | **T80** (`#D0BCFF`) | T26 / T15 (L), T85 / T94 (D) | High-emphasis fills (Filled button, active switch/checkbox/slider), links, active indicator |
| `on-primary` | Primary | **T100** (`#FFFFFF`) | **T20** (`#381E72`) | T100 / T100 (L), T14 / T0 (D) | Text & icons on `primary` |
| `primary-container` | Primary | **T90** (`#EADDFF`) | **T30** (`#4F378B`) | T40 / T26 (L), T60 / T85 (D) | Default FAB, vibrant toolbar, contained loading indicator |
| `on-primary-container` | Primary | **T30** (`#4F378B`) | **T90** (`#EADDFF`) | T100 / T100 (L), T0 / T0 (D) | Text & icons on `primary-container` (T10 `#21005D` in legacy tokens) |
| `secondary` | Secondary | **T40** (`#625B71`) | **T80** (`#CCC2DC`) | T26 / T15 (L), T85 / T94 (D) | Selected tonal toggle button fill, focus ring (`3dp`), active nav label |
| `on-secondary` | Secondary | **T100** (`#FFFFFF`) | **T20** (`#332D41`) | T100 / T100 (L), T14 / T0 (D) | Text & icons on `secondary` |
| `secondary-container` | Secondary | **T90** (`#E8DEF8`) | **T30** (`#4A4458`) | T40 / T26 (L), T60 / T85 (D) | Tonal buttons, active nav pill, selected filter chips, slider/progress inactive track |
| `on-secondary-container` | Secondary | **T30** (`#4A4458`) | **T90** (`#E8DEF8`) | T100 / T100 (L), T0 / T0 (D) | Text & icons on `secondary-container` |
| `tertiary` | Tertiary | **T40** (`#7D5260`) | **T80** (`#EFB8C8`) | T26 / T15 (L), T85 / T94 (D) | Complementary accents, vibrant menu selected item |
| `on-tertiary` | Tertiary | **T100** (`#FFFFFF`) | **T20** (`#492532`) | T100 / T100 (L), T14 / T0 (D) | Text & icons on `tertiary` |
| `tertiary-container` | Tertiary | **T90** (`#FFD8E4`) | **T30** (`#633B48`) | T40 / T26 (L), T60 / T85 (D) | Time picker AM/PM, vibrant menu, vibrant toolbar paired FAB, list reorder |
| `on-tertiary-container` | Tertiary | **T30** (`#633B48`) | **T90** (`#FFD8E4`) | T100 / T100 (L), T0 / T0 (D) | Text & icons on `tertiary-container` |
| `error` | Error | **T40** (`#B3261E`) | **T80** (`#F2B8B5`) | T26 / T15 (L), T85 / T94 (D) | Invalid input states, badges (`#B3261E` / `#F2B8B5`), destructive alerts |
| `on-error` | Error | **T100** (`#FFFFFF`) | **T20** (`#601410`) | T100 / T100 (L), T14 / T0 (D) | Badge text/icons, text on `error` |
| `error-container` | Error | **T90** (`#F9DEDC`) | **T30** (`#8C1D18`) | T40 / T26 (L), T60 / T85 (D) | Error banner / callout container |
| `on-error-container` | Error | **T30** (`#8C1D18`) | **T90** (`#F9DEDC`) | T100 / T100 (L), T0 / T0 (D) | Text & icons on `error-container` |
| `surface` | Neutral | **T98** (`#FEF7FF`) | **T6** (`#141218`) | T98 / T98 (L), T6 / T6 (D) | Default screen background, flat app bar, standard nav rail/drawer, outlined card |
| `surface-dim` | Neutral | **T87** (`#DED8E1`) | **T6** (`#141218`) | T80 / T74 (L), T6 / T6 (D) | Dimmed canvas backdrop on large screens |
| `surface-bright` | Neutral | **T98** (`#FEF7FF`) | **T24** (`#3B383E`) | T98 / T98 (L), T30 / T36 (D) | Brightened surface in dark mode |
| `surface-container-lowest` | Neutral | **T100** (`#FFFFFF`) | **T4** (`#0F0D13`) | T100 / T100 (L), T2 / T0 (D) | Lowest emphasis container below `surface` (e.g., recessed wells) |
| `surface-container-low` | Neutral | **T96** (`#F7F2FA`) | **T10** (`#1D1B20`) | T94 / T92 (L), T11 / T12 (D) | Elevated cards, elevated buttons, bottom/side sheets, standard menus |
| `surface-container` | Neutral | **T94** (`#F3EDF7`) | **T12** (`#211F26`) | T90 / T87 (L), T16 / T18 (D) | **Default contained area**: Nav bar, scrolled app bar, standard toolbar, rich tooltip |
| `surface-container-high` | Neutral | **T92** (`#ECE6F0`) | **T17** (`#2B2930`) | T86 / T82 (L), T21 / T24 (D) | Dialogs, date/time pickers, search bar (`level3`) |
| `surface-container-highest` | Neutral | **T90** (`#E6E0E9`) | **T22** (`#36343B`) | T82 / T77 (L), T26 / T30 (D) | Filled cards, filled text fields, unselected switch track |
| `on-surface` | Neutral | **T10** (`#1D1B20`) | **T90** (`#E6E0E9`) | T0 / T0 (L), T100 / T100 (D) | Primary headlines, titles, body copy, input text |
| `on-surface-variant` | Neutral-Var | **T30** (`#49454F`) | **T80** (`#CAC4D0`) | T20 / T0 (L), T88 / T100 (D) | Supporting text, subtitles, inactive icons, outlined button text |
| `outline` | Neutral-Var | **T50** (`#79747E`) | **T60** (`#938F99`) | T35 / T20 (L), T72 / T88 (D) | **3:1 functional stroke**: Outlined text fields, unselected switches |
| `outline-variant` | Neutral-Var | **T80** (`#CAC4D0`) | **T30** (`#49454F`) | T55 / T35 (L), T52 / T72 (D) | Decorative dividers (`1dp`), outlined cards, flat chips, Expressive outlined buttons |
| `inverse-surface` | Neutral | **T20** (`#322F35`) | **T90** (`#E6E0E9`) | — | Snackbars, plain tooltips, selected outlined toggle button |
| `inverse-on-surface` | Neutral | **T95** (`#F5EFF7`) | **T20** (`#322F35`) | — | Text on `inverse-surface` |
| `inverse-primary` | Primary | **T80** (`#D0BCFF`) | **T40** (`#6750A4`) | — | Action button text inside snackbars |
| `{p,s,t}-fixed` / `*-fixed-dim` | P / S / T | **T90** / **T80** | **T90** / **T80** | — | Invariant across Light & Dark themes (`on-*-fixed` = **T10**, `on-*-fixed-variant` = **T30**) |

### 3.2 Typography Scale (Baseline & M3 Expressive Emphasized)
- **Typefaces**: `md.ref.typeface.brand` (`Roboto` / `Google Sans` for Display, Headline, Title Large) and `md.ref.typeface.plain` (`Roboto` / `Google Sans Text` for Title Medium/Small, Body, Label).
- **Rules**: Always use **sentence case** (never ALL CAPS). Keep body copy **`40–60` characters per line** (`20–40` for short cards/callouts). Apply `font-variant-numeric: tabular-nums` to timers, tables, and live counters.

| Role (`md.sys.typescale.*`) | Font | Size (`sp`/`pt`) | Line Height | Baseline Weight | Emphasized Weight | Tracking (`pt`) | Primary Component Usage |
|---|---|---|---|---|---|---|---|
| `display-large` | Brand | `57` | `64` (`1.12×`) | `400` | **`500`** | `-0.25` | Hero numerals, dial time picker digits (`96×80dp`) |
| `display-medium` | Brand | `45` | `52` (`1.16×`) | `400` | **`500`** | `0` | Input time picker digits, large hero callouts |
| `display-small` | Brand | `36` | `44` (`1.22×`) | `400` | **`500`** | `0` | Large flexible app bar title |
| `headline-large` | Brand | `32` | `40` (`1.25×`) | `400` | **`500`** | `0` | XL button label (`136dp`), modal date picker selection |
| `headline-medium` | Brand | `28` | `36` (`1.29×`) | `400` | **`500`** | `0` | Medium flexible app bar title |
| `headline-small` | Brand | `24` | `32` (`1.33×`) | `400` | **`500`** | `0` | Dialog headline, L button (`96dp`), L Extended FAB |
| `title-large` | Brand | `22` | `28` (`1.27×`) | `400` | **`500`** | `0` | Small app bar title (`64dp`), M Extended FAB (`80dp`) |
| `title-medium` | Plain | `16` | `24` (`1.50×`) | `500` | **`700`** | `+0.15` | M button (`56dp`), S Extended FAB (`56dp`), FAB menu items |
| `title-small` | Plain | `14` | `20` (`1.43×`) | `500` | **`700`** | `+0.1` | Tabs (`48dp`), rich tooltip subhead, nav drawer header |
| `body-large` | Plain | `16` | `24` (`1.50×`) | `400` | **`500`** | `+0.5` (`0` 1P) | List item headline, text field input, search bar text |
| `body-medium` | Plain | `14` | `20` (`1.43×`) | `400` | **`500`** | `+0.25` (`0` 1P) | Dialog body, list supporting text, snackbar, rich tooltip |
| `body-small` | Plain | `12` | `16` (`1.33×`) | `400` | **`500`** | `+0.4` (`0.1` 1P)| Text field floating label & helper text, plain tooltip |
| `label-large` | Plain | `14` | `20` (`1.43×`) | `500` | **`700`** | `+0.1` (`0` 1P) | XS/S buttons (`32/40dp`), chips, menu items, expanded nav rail |
| `label-medium` | Plain | `12` | `16` (`1.33×`) | `500` | **`700`** | `+0.5` (`0.1` 1P)| Navigation bar & collapsed nav rail labels, slider bubble |
| `label-small` | Plain | `11` | `16` (`1.45×`) | `500` | **`700`** | `+0.5` (`0.1` 1P)| Large badges (`16dp` pill), overlines, compact timestamps |

### 3.3 Shape Scale, Concentric Nesting, Elevation & State Layers
- **10-Step Shape Scale (`md.sys.shape.corner.*`)**:
  - `none` = `0dp` | `extra-small` = `4dp` (text fields, snackbars, plain tooltips, inner segmented corners) | `small` = `8dp` (chips, button pressed state) | `medium` = `12dp` (cards, rich tooltips, XS/S square buttons) | `large` = `16dp` (56dp FAB, M square button, nav drawer/modal rail, menus, list outer corners) | **`large-increased` = `20dp`** (80dp Medium FAB) | `extra-large` = `28dp` (96dp Large FAB, L/XL square buttons, dialogs, bottom sheets, date/time pickers, carousel items) | **`extra-large-increased` = `32dp`** (XR spatial panels) | **`extra-extra-large` = `48dp`** (hero surfaces) | `full` = `9999px` (round buttons, pills, search bar, floating toolbar, switch, badges).
- **Concentric / Optical Roundness Formula**: When nesting rounded containers with gap/padding $P$, set $\text{Radius}_{\text{inner}} = \max(0, \text{Radius}_{\text{outer}} - P)$ (e.g., `24dp` outer card with `8dp` padding $\implies$ `16dp` inner image radius).
- **Elevation Levels (`md.sys.elevation.level0..5`)**:
  - `level0` (`0dp`): Flat buttons, filled/outlined cards, standard sheets/rail.
  - `level1` (`1dp`): Elevated cards, elevated buttons, bottom/modal side sheets, banners.
  - `level2` (`3dp`): Scrolled app bar, nav bar, menus, rich tooltips, docked toolbar.
  - `level3` (`6dp`): FABs, dialogs, modal date/time pickers, search bar, floating toolbar, snackbars.
  - `level4` (`8dp`): Hover state for `level3` components (FAB hover), dragged elevated cards.
  - `level5` (`12dp`): Dragged high-elevation surfaces only.
- **State Layers & Focus Indicator (`md.sys.state.*`)**:
  - Overlay uses the element's content (`on-*`) color at: **Hover = `8%`**, **Focus = `10%`**, **Pressed = `10%`**, **Dragged = `16%`**.
  - **Disabled**: Container/border = `on-surface` at **`12%`** (`0dp` elevation); label/icon = `on-surface` at **`38%`**.
  - **Focus Ring**: `3dp` thickness in `md.sys.color.secondary`, with `2dp` outer offset on standalone controls or `-3dp` inner offset on clipped list/menu/tab items.

### 3.4 Motion Physics System (Springs & Web Equivalents)
| Spring Token (`md.sys.motion.spring.*`) | Damping / Stiffness (3P Token DB) | Expressive Web Curve (`ms` + `cubic-bezier`) | Standard Web Curve (`ms` + `cubic-bezier`) | When to Use |
|---|---|---|---|---|
| `fast.spatial` | `damping: 0.9`, `stiffness: 1400` (`~0.6`/`800` Expr.) | `350ms cubic-bezier(0.42, 1.67, 0.21, 0.90)` | `350ms cubic-bezier(0.27, 1.06, 0.18, 1.00)` | Small components: Button press/toggle shape morph, switch thumb, split button chevron, connected button group |
| `default.spatial` | `damping: 0.9`, `stiffness: 700` (`~0.8`/`380` Expr.) | `500ms cubic-bezier(0.38, 1.21, 0.22, 1.00)` | `500ms cubic-bezier(0.27, 1.06, 0.18, 1.00)` | Medium surfaces: FAB menu expansion, bottom/side sheets, dialog entrance, card expand |
| `slow.spatial` | `damping: 0.9`, `stiffness: 300` (`~0.8`/`200` Expr.) | `650ms cubic-bezier(0.39, 1.29, 0.35, 0.98)` | `750ms cubic-bezier(0.27, 1.06, 0.18, 1.00)` | Full-screen transitions, page layout reflows, large hero motions |
| `fast.effects` | `damping: 1.0`, `stiffness: 3800` | `150ms cubic-bezier(0.31, 0.94, 0.34, 1.00)` | `150ms cubic-bezier(0.31, 0.94, 0.34, 1.00)` | Hover/press state layers, icon color swaps, ripple fade |
| `default.effects` | `damping: 1.0`, `stiffness: 1600` | `200ms cubic-bezier(0.34, 0.80, 0.34, 1.00)` | `200ms cubic-bezier(0.34, 0.80, 0.34, 1.00)` | Sheet/dialog scrim opacity, surface container color transitions |
| `slow.effects` | `damping: 1.0`, `stiffness: 800` | `300ms cubic-bezier(0.34, 0.88, 0.34, 1.00)` | `300ms cubic-bezier(0.34, 0.88, 0.34, 1.00)` | Full-screen cross-fades, ambient background color shifts |

---

## 4. Adaptive Layout, Window Size Classes & Canonical Scaffolds

Never design for fixed device names ("phone" vs "tablet"); always switch layouts dynamically based on **Window Size Classes**:

| Window Size Class | Width Breakpoint | Outer Margin | Pane Spacer | Recommended Panes | Fixed Pane Width | Primary Navigation Pattern |
|---|---|---|---|---|---|---|
| **Compact** | `< 600dp` | `16dp` | — | **1 pane** | `100%` | Bottom **Navigation Bar** (`64dp`, vertical items) |
| **Medium** | `600dp – 839dp` | `24dp` | `24dp` | **1 pane** (or 2 low-density `50%/50%`) | `50%` | Bottom **Navigation Bar** (horizontal items) or **Collapsed Navigation Rail** (`80–96dp`) |
| **Expanded** | `840dp – 1199dp` | `24dp` | `24dp` | **2 panes** (1 fixed + 1 flexible) | **`360dp`** | **Collapsed Navigation Rail** (`80–96dp`) or **Expanded Navigation Rail** (`220–360dp`) |
| **Large** | `1200dp – 1599dp` | `24dp` | `24dp` | **2 panes** (1 fixed + 1 flexible) | **`412dp`** | **Expanded Navigation Rail** (`220–360dp`) |
| **Extra-large** | `≥ 1600dp` | `24dp` | `24dp` | **2–3 panes** (3rd = standard side sheet) | **`412dp`** (`≤400dp` 3rd pane) | **Expanded Navigation Rail** (`220–360dp`) |

- **Three Canonical Layouts**:
  1. **List-Detail**: Master list pane (`360dp` on Expanded, `412dp` on Large+) + flexible detail pane (`24dp` spacer). Show a Back button in the detail header **only** in 1-pane mode; show a persistent selected state on the list item **only** in 2-pane mode.
  2. **Feed**: Responsive grid of cards (`16dp` or `24dp` outer margin, `8dp`–`16dp` gap) that scales from 1 column on Compact to 2–4 columns on Expanded/Large.
  3. **Supporting Pane**: Primary workspace (flexible, `~70%`) + contextual supporting pane (`360dp`/`412dp` trailing side pane on Expanded+, reflowing to a bottom sheet or stacked section on Compact/Medium).

---

## 5. Complete 36-Component Cheat Sheet & Decision Matrix

### 5.1 Actions (`buttons-and-actions.md`, `fabs-and-fab-menu.md`)
- **Emphasis Rule**: At most **one** high-emphasis primary action (`Filled` button or `FAB`) per view. Place lower-emphasis buttons (`Text` / `Outlined`) to the **leading (left)** side of the primary button.
- **Buttons (`md.comp.button`) & Icon Buttons (`md.comp.icon-button`) — 5 Sizes**:

| Size | Height | Button H-Pad | Gap | Button Icon | Icon-Btn Widths (Narrow / Default / Wide) | Typography | Square Radius → Pressed Morph |
|---|---|---|---|---|---|---|---|
| **XS** | `32dp` (`48dp` target) | `12dp` | `4dp` | `20dp` | `28dp` / `32dp` / `40dp` (`20dp` icon) | `label-large` (`14sp`) | `12dp` → **`8dp`** |
| **S (Default)** | `40dp` (`48dp` target) | **`16dp`** (`24dp` legacy) | `8dp` | `20dp` (`24dp` icon-btn) | `32dp` / `40dp` / `52dp` (`24dp` icon) | `label-large` (`14sp`) | `12dp` → **`8dp`** |
| **M** | `56dp` | `24dp` | `8dp` | `24dp` | `48dp` / `56dp` / `72dp` (`24dp` icon) | `title-medium` (`16sp`) | `16dp` → **`12dp`** |
| **L** | `96dp` | `48dp` | `12dp` | `32dp` | `64dp` / `96dp` / `128dp` (`32dp` icon) | `headline-small` (`24sp`) | `28dp` → **`16dp`** |
| **XL** | `136dp` | `64dp` | `16dp` | `40dp` | `104dp` / `136dp` / `184dp` (`40dp` icon) | `headline-large` (`32sp`) | `28dp` → **`16dp`** |

- **Toggle Selection Morph**: Unselected toggle buttons are **Round** (`full`, outlined icon) and morph to **Square** (filled icon) when selected (or vice versa).
  - **Filled Toggle**: Unselected `surface-container` + `on-surface-variant` $\to$ Selected `primary` + `on-primary`.
  - **Tonal Toggle**: Unselected `secondary-container` + `on-secondary-container` $\to$ Selected `secondary` + `on-secondary`.
  - **Elevated Toggle**: Unselected `surface-container-low` + `primary` $\to$ Selected `primary` + `on-primary`.
  - **Outlined Toggle**: Unselected `outline-variant` stroke + `on-surface-variant` $\to$ Selected `inverse-surface` + `inverse-on-surface`.
- **Split Button (`md.comp.split-button`)**: Leading action button + `2dp` gap + trailing menu button (`48/48/56/96/136dp` wide). Inner corners (`4/4/4/8/12dp`) morph on hover/press (`8/12/12/20/20dp`); when menu opens, trailing button morphs to a `full` circle and chevron rotates `180°`.
- **Button Groups (`md.comp.button-group`)**:
  - **Standard**: Gaps `18/12/8/8/8dp`; pressing a button expands its width by **`15%`** and compresses adjacent neighbors via `spring.fast.spatial`.
  - **Connected** (replaces Segmented Buttons): `2dp` gap across all sizes, outer ends `full` pill, inner corners `8/8/8/16/20dp` $\to$ pressed `4/4/4/12/16dp` $\to$ selected `full` pill.
- **FAB, Extended FAB & FAB Menu**:
  - **3 FAB Sizes**: Small/Regular `56×56dp` (`16dp` radius, `24dp` icon, `title-medium`), Medium `80×80dp` (`20dp` radius, `28dp` icon, `title-large`), Large `96×96dp` (`28dp` radius, `36dp` icon, `headline-small`). 6 color styles: `{primary,secondary,tertiary}-container` and `{primary,secondary,tertiary}`. Level 3 (`6dp`) $\to$ Level 4 (`8dp` hover).
  - **FAB Menu (`md.comp.fab-menu`)**: Triggered **only** from a FAB (never Extended FAB). Transforms FAB into a `56×56dp` circular close button (`8dp` gap) below 2–6 stacked pill items (`56dp` height, `24dp` h-pad, `4dp` vertical gap, `title-medium`).

### 5.2 Navigation & App Bars (`app-bars-and-toolbars.md`, `navigation-bar-rail-drawer.md`, `tabs-and-search.md`)
- **App Bars (`md.comp.app-bar`)**: Flat `surface` (`level0`) at rest $\to$ `surface-container` (`level2`) on scroll.
  - **Small**: `64dp` height (`title-large` `22sp` + optional `label-medium` `12sp` subtitle).
  - **Medium flexible**: `112dp` (`136dp` w/ subtitle), `headline-medium` `28sp`, collapses to `64dp` on scroll.
  - **Large flexible**: `120dp` (`152dp` w/ subtitle), `display-small` `36sp`, collapses to `64dp` on scroll.
  - **Search app bar**: `64dp` bar housing a `56dp` `full`-pill search container (`surface-container` $\to$ `surface-container-highest` on scroll).
- **Toolbars (`md.comp.toolbar`)** (replaces Bottom App Bar): **Docked** (`64dp` full-width bottom bar, `16dp` padding) or **Floating** (`64dp` horizontal or vertical pill, `level3`, `8dp` end padding, `4dp` item gap, `8dp` gap to optional paired `56dp`/`80dp` FAB). **Standard** (`surface-container`) vs. **Vibrant** (`primary-container`). Never pair with a Navigation Bar on the same screen.
- **Navigation Bar (`md.comp.nav-bar`)**: 3–5 destinations, **`64dp` height**, `surface-container`, active pill `secondary-container` (`56×32dp` for vertical stacked items on Compact; `40dp`-tall inline pill with `16dp` h-pad on Medium), active label `secondary` (`label-medium` `12sp`).
- **Navigation Rail (`md.comp.nav-rail`)**: 3–7 destinations + optional top Menu & `0dp`-elevation FAB. **Collapsed**: `80–96dp` width, vertical items (`56×32dp` pill). **Expanded** (replaces Navigation Drawer): `220–360dp` width, horizontal items (`56dp`-tall pill, `label-large` `14sp`), Standard (`surface`) or Modal (`surface-container`, `16dp` corner radius, `level2`).
- **Tabs**: `48dp` height (`64dp` with icon+label), `title-small` (`14sp`). **Primary** uses `3dp`-tall top-rounded `primary` indicator (min `24dp` wide); **Secondary** uses `2dp` full-width `primary` underline. Scrollable tabs use a **`52dp` leading offset**.
- **Search (`md.comp.search-bar` / `search-view`)**: `56dp`-tall `full` pill (`surface-container-high`, `level3`, `360–720dp` wide); expands into a Full-screen view on Compact or a Docked dropdown card (`12dp` radius, `2dp` gap below bar) on Medium+.

### 5.3 Containment (`cards-carousel-lists-divider.md`, `dialogs-sheets-menus.md`)
- **Cards (`md.comp.card`)**: `12dp` `medium` radius, `16dp` padding, `8dp` max collection gap. **Elevated** (`surface-container-low`, `level1`), **Filled** (`surface-container-highest`, `level0`), **Outlined** (`surface` + `1dp` `outline-variant`, `level0`). Never put interactive buttons inside a card whose entire surface is a single tap target.
- **Carousel (`md.comp.carousel`)**: `28dp` `extra-large` item radius, `8dp` gap, small squished items **`40–56dp` wide**. Layouts: Multi-browse, Uncontained, Uncontained multi-aspect, Hero, Center-aligned Hero, Full-screen. Always provide a keyboard/switch-accessible "Show all" or arrow button (`48×48dp`).
- **Lists (`md.comp.list`)**: Heights: 1-line **`56dp`**, 2-line **`72dp`**, 3-line **`88dp`** (`16dp` h-pad, `12dp` slot gap). **M3 Expressive Segmented Lists** separate items with `2dp` gaps (`16dp` outer list corners, `4dp` inner item corners $\to$ `12dp` hover $\to$ `16dp` selected `secondary-container` with required checkmark/control).
- **Dialogs (`md.comp.dialog`)**: Basic dialog `280–560dp` wide, `28dp` `extra-large` radius, `24dp` padding, `surface-container-high`, `level3` (`6dp`), `scrim` (`#000` @ `32%`). Confirming action goes on the **trailing (right)** edge; dismissive action to its left.
- **Bottom Sheets (`md.comp.sheet.bottom`)**: `surface-container-low`, `level1`, `28dp` top corners, `640dp` max width on large screens, `32×4dp` drag handle (`on-surface-variant` @ `40%`, `48×48dp` hit target). Modal initial peek height $\le 50\%$ of screen.
- **Side Sheets (`md.comp.sheet.side`)**: `256–400dp` width, `24dp` inline padding, mandatory Close (`×`) button. Standard (`surface`, `0dp` radius) vs. Modal (`surface-container-low`, `16dp` start corners, `scrim`) vs. Detached (`16dp` margins, `16dp` all corners).
- **Menus (`md.comp.menus`)**: M3 Expressive **Standard** (`surface-container-low`, selected `tertiary-container`) vs. **Vibrant** (`tertiary-container`, selected `tertiary`), `level2` (`3dp`), `16dp` outer radius, `44dp` item height (`48dp` baseline), `20dp` icons, `2dp` group gaps.

### 5.4 Selection, Inputs & Feedback (`selection-and-chips-sliders.md`, `text-fields-and-pickers.md`, `feedback-badges-progress-snackbar-tooltips.md`)
- **Checkbox / Radio / Switch**: All use `40×40dp` state layer & `48×48dp` touch target.
  - **Checkbox**: `18×18dp` box, `2dp` radius, `2dp` `on-surface-variant` stroke $\to$ `primary` fill (`error` when invalid).
  - **Radio Button**: `20×20dp` outer ring + `10dp` inner dot.
  - **Switch**: `52×32dp` `full` track (`surface-container-highest` + `2dp` `outline` off $\to$ `primary` on); handle morphs **`16dp` (off) / `24dp` (with icon or on) $\to$ `28dp` (pressed)**.
- **Chips (`md.comp.*-chip`)**: `32dp` height (`48dp` target), `8dp` `small` radius, `1dp` `outline-variant` border, `label-large` (`14sp`). 4 types: **Assist**, **Filter** (`secondary-container` + `18dp` leading `✓` when selected), **Input** (`24dp` avatar, trailing `×`), **Suggestion**.
- **Sliders (`md.comp.slider`)**: 5 Expressive track heights: **XS `16dp`**, **S `24dp`**, **M `40dp`** (`24dp` inset icon), **L `56dp`** (`24dp` icon), **XL `96dp`** (`32dp` icon). Vertical pill handle is `4dp` wide (`2dp` on press) × `44/44/52/68/108dp` tall with `6dp` gap to active/inactive tracks (`primary` / `secondary-container`).
- **Text Fields**: `56dp` single-line height, `body-large` (`16sp`) input, `body-small` (`12sp`) floating label & helper text. **Filled** (`surface-container-highest`, `4dp` top corners, `1dp` $\to$ `2dp` bottom indicator) vs. **Outlined** (transparent fill, `4dp` all corners, `1dp` `outline` $\to$ `2dp` `primary` border). **Never mix Filled and Outlined in the same form.**
- **Date & Time Pickers**: `surface-container-high`, `level3`, `28dp` modal radius (`16dp` docked date picker `360×456dp`; `360×524dp` modal calendar). Never apply live input masks while typing dates. Time picker dial is `256dp` with `96×80dp` `display-large` (`57sp`) hour/minute boxes and `tertiary-container` AM/PM toggle.
- **Badges**: `error` fill + `on-error` text. **Small** = `6×6dp` dot; **Large** = `16dp`-tall `full` pill (`label-small` `11sp`, max 4 chars e.g. `999+`).
- **Loading vs. Progress Indicators**:
  - `<200ms`: No indicator.
  - `200ms – 5s` (indeterminate): **Loading Indicator** (`38dp` morphing 7-shape polygon inside `48dp` container; Uncontained `primary` or Contained `on-primary-container` on `primary-container`).
  - `>5s` or determinate `0–100%`: **Progress Indicator** (Linear `4dp`/`8dp` or Circular `40dp`/`52dp`, `4dp` gap between `primary` active bar and `secondary-container` track; **Flat** or **Wavy** `3dp`-amplitude wave).
- **Snackbar**: `48dp` (1-line) or `68dp` (2-line), `inverse-surface`, `inverse-on-surface` `body-medium` text, `inverse-primary` `label-large` action, `4dp` radius, `level3`. Auto-dismisses in `4–10s`; never stack.
- **Tooltips**: **Plain** (`24dp` height, `4dp` radius, `inverse-surface`, `body-small` `12sp`) vs. **Rich** (`surface-container`, `level2`, `12dp` radius, `title-small` subhead + `body-medium` text + action buttons).

---

## 6. Known Official `m3.material.io` Spec vs. Token Discrepancies

When cross-referencing prose/diagrams against DSDB token tables, be aware of these verified discrepancies in Google's source data:
1. **Outlined Button & Icon Button Stroke/Text**: Deprecated `md.comp.outlined-button` used `outline` stroke + `primary` label; M3 Expressive `md.comp.button.outlined` and `md.comp.icon-button.outlined` use `outline-variant` stroke + `on-surface-variant` label/icon.
2. **Connected Button Group XS Inner Corners**: Visual spec diagrams annotate XS inner corners as `4dp`, whereas `md.comp.button-group.connected.xsmall.inner-corner.corner-size` resolves to `8dp` (`4dp` when pressed).
3. **Expanded Navigation Rail Active Label**: Common token `md.comp.nav-rail.item.active.label-text.color` resolves to `secondary` (for vertical items where the label is outside the pill), but horizontal Expanded Rail items place the label *inside* the `secondary-container` pill and therefore require `on-secondary-container`.
4. **Side Sheet Corner Radius**: Token tables (`md.comp.sheet.side.*`) specify `16dp` (`large`) corners for modal/detached side sheets, whereas M3 Expressive design kits frequently pair them with `28dp` (`extra-large`) to match bottom sheets and dialogs.
5. **Slider Medium Handle Height**: Prose table lists `52dp` handle height for Medium (`40dp` track) sliders, while `md.comp.slider.medium.active.handle.height` resolves to `44dp`.
6. **Snackbar 2-Line Height**: Prose guidelines say `64dp`, while `md.comp.snackbar.with-two-lines.container.height` resolves to `68dp`.

---

## 7. Pre-Delivery M3 Audit Checklist

Before finalizing any Material Design 3 UI design or code implementation, verify:
- [ ] **No Legacy Elevation Tints**: Surface hierarchy uses `surface-container-{lowest,low,default,high,highest}` tokens, never opacity overlays on `surface`.
- [ ] **Color Pairing & Contrast**: Every container role (`primary`, `*-container`, `surface-*`, `inverse-surface`) uses its matching `on-*` role for text/icons; normal text has $\ge 4.5:1$ contrast ($\Delta T \ge 50$) and active boundaries/icons have $\ge 3:1$ ($\Delta T \ge 40$).
- [ ] **Single Primary CTA**: At most one high-emphasis filled button or primary FAB per screen; secondary actions use tonal, outlined, or text styles.
- [ ] **Touch Targets & Gaps**: Every interactive element has at least a `48×48dp` hit target (`44×44px` pointer, `56×56dp` XR) with $\ge 8\text{dp}$ separation.
- [ ] **State Layers & Focus Rings**: Hover (`8%`), Focus (`10%` + `3dp` `secondary` focus ring), Press (`10%`), and Disabled (`12%` container / `38%` content) states are wired.
- [ ] **M3 Expressive Motion & Shapes**: Position/size/corner-morph animations use `spatial` springs; color/opacity transitions use critically damped `effects` springs (`damping: 1.0`, zero overshoot); `prefers-reduced-motion: reduce` disables spatial bounce and parallax.
- [ ] **Adaptive & Text Scaling**: Layout adapts cleanly across Compact (`<600dp`), Medium (`600–839dp`), and Expanded+ (`≥840dp`) window classes, and survives `200%` font scaling without text truncation or overlapping controls.
- [ ] **UX Writing**: All labels, headings, buttons, and tabs use **sentence case** (never ALL CAPS), concise verb phrases (`1–3` words on buttons), and logical `inline-start`/`inline-end` properties for automatic RTL mirroring.
