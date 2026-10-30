# How `m3.material.io` Is Engineered — Live Browser & DOM Architecture Analysis

A complete reverse-engineering reference of Google's official Material Design 3 documentation site (`https://m3.material.io`), captured via headless Chrome inspection of its DOM, Web Components, Angular bundles, CSS custom properties, and network payloads. Use this file when asked to build documentation portals, design-system showcase sites, or M3-styled web applications that match the look, feel, and engineering of `m3.material.io`.

Sources: `https://m3.material.io/`, `https://m3.material.io/components/buttons/overview`, `https://m3.material.io/components/buttons/specs`, `https://m3.material.io/components/buttons/guidelines`

---

## 1. Tech Stack & Content Delivery Architecture

`m3.material.io` is a hybrid **Angular + Lit / Material Web Components (`mwc-*`)** Single-Page Application backed by Google's internal **Carbon Design System Manager (`_dsm` / `_cdm` / `dsdb`)**:

1. **Application Shell (Angular)**:
   - Root element `<mio-root class="light-mode play-mode">` (toggles `.dark-mode` and `.pause-mode` on both `<body>` and `<mio-root>`).
   - Routes pages into `<router-outlet>` → `<mio-article-page>` (or `<mio-landing-page>`).
2. **CMS Content Payloads (`/_dsm/content/m3/<release-timestamp>/<pageCanonId>.json`)**:
   - Every page (including all of its tabs: Overview, Specs, Guidelines, XR, Accessibility) is fetched as a single JSON document keyed by `pageCanonId`.
   - Structure: `page.sections[]` (each tab is a section) → `contentBlocks[]` (layout rows: 1-column full-width, squeezed prose column, or 2/3/4-column side-by-side grid via `flex`) → `contentChunks[]`.
   - Chunk types (`contentChunkType`):
     - `TEXT`: HTML prose (`htmlValue`) rendered inside `<mio-carbon-component>`.
     - `IMAGE` / `VIDEO`: Rendered via `<mio-figure>` and `<mio-image>` with `altText`, `footer` (Markdown/HTML caption), and `captionModifier` (`"DO"`, `"DON'T"`, `"CAUTION"`).
     - `RESOURCE`: Dynamic data modules rendered by `<mio-carbon-data-module>` (`TOKEN_TABLE`, `STATUS_TABLE`, `TYPOGRAPHY`, `MEASUREMENT`).
3. **Design System Database (`/_dsm/data/dsdb-m3/<release-timestamp>/...`) & `<token-viewer>`**:
   - When a `TOKEN_TABLE` chunk scrolls into the viewport, `<mio-carbon-data-module>` instantiates a `<token-viewer>` custom element and populates its `design-system-data` attribute with a resolved snapshot of the Google Material 3 Design System Database (`designSystems/20543ce18892f7d9`, DSDB v38.2.9).
   - The payload contains `tokenSets`, `tokens`, `values`, `contextTagGroups` (`theme`, `contrast`, `platform`, `audience`, `font`, `motion.scheme`, `language.height`), and `contextualReferenceTrees`.

---

## 2. Responsive Viewport Breakpoints & Page Grid

`m3.material.io` uses four primary viewport breakpoints in its stylesheets:

| Tier | Media Query | Navigation Pattern | Content Layout |
|---|---|---|---|
| **Compact (Mobile)** | `screen and (max-width: 600px)` | Top bar + modal `<mio-navigation-drawer>` (`mwc-drawer`) | Single column, full-width cards, stacked hero (`--mio-theme-v2-hero-sm-font-size: 60px`) |
| **Medium (Tablet)** | `screen and (min-width: 601px) and (max-width: 960px)` | Persistent `<mio-left-nav-rail>` (`88px` wide) + flyout drawer | Single content column, medium hero (`--mio-theme-v2-hero-md-font-size: 72px`), TOC hidden |
| **Expanded (Small Desktop)** | `screen and (min-width: 961px) and (max-width: 1294px)` | Persistent `<mio-left-nav-rail>` (`88px` wide) + hover flyout drawer | 2-column split hero (`96px` title), `1032px` content area, TOC hidden |
| **Large Desktop** | `screen and (min-width: 1295px)` | Persistent `<mio-left-nav-rail>` (`88px` wide) + hover flyout drawer | 2-column split hero + main column (`1032px` / `944px` squeezed) + sticky right `<mio-toc>` (`156px` wide, `24px` margin) |
| **Forced Colors** | `(forced-colors: active)` | High-contrast system colors & explicit outlines | Replaces surface tints with `1px solid CanvasText` borders |

---

## 3. Complete `m3.material.io` CSS Custom Properties (`--mio-theme-*`)

Unlike baseline Material 3 apps (which use `#6750A4` purple), the `m3.material.io` website uses a bespoke **electric violet / warm neutral** brand theme defined on `mio-root` (Light) and `mio-root.dark-mode` (Dark):

### 3.1 Color Tokens (`mio-root` vs `mio-root.dark-mode`)

| CSS Custom Property | Light Mode Value | Dark Mode Value | Usage on `m3.material.io` |
|---|---|---|---|
| `--mio-theme-color-background` | `#fefbff` | `#141314` | Page `<body>` / `<main>` canvas background |
| `--mio-theme-color-on-background` | `#1c1b1d` | `#e6e1e3` | Primary body copy on canvas |
| `--mio-theme-color-surface-0` | `#ffffff` | `#0f0e0f` | Pure surface / lowest container |
| `--mio-theme-color-surface-1` | `#f8f1f6` | `#1c1b1d` | Hero text card, `<mio-card>` resting fill, nav rail background |
| `--mio-theme-color-surface-2` | `#f2ecee` | `#211f21` | Section tab bar track, secondary containers |
| `--mio-theme-color-surface-3` | `#ece7e9` | `#2b292b` | Code blocks, table headers, elevated cards |
| `--mio-theme-color-surface-4` | `#e6e1e3` | `#363436` | Dividers, tag pills, high-emphasis containers |
| `--mio-theme-color-surface-5` | `#e6e1e3` | `#363436` | Highest surface tone |
| `--mio-theme-color-surface-variant` | `#e8e0e8` | `#4d4256` | Media borders, outlined card strokes, table borders |
| `--mio-theme-color-on-surface` | `#1c1b1d` | `#e6e1e3` | Headings (`h1`–`h3`), primary text |
| `--mio-theme-color-on-surface-variant` | `#4d4256` | `#cbc4cc` | Subtitles, body paragraphs, inactive tab labels, captions |
| `--mio-theme-color-primary` | `#6442d6` | `#9f86ff` | Links, active indicators, primary interactive accents |
| `--mio-theme-color-primary-20` | `#340098` | `#340097` | Deep primary accent |
| `--mio-theme-color-primary-30` | `#4b21bd` | `#4c20bd` | Primary container dark / hover accent |
| `--mio-theme-color-primary-80` | `#cbbeff` | `#ccbeff` | Light violet accent |
| `--mio-theme-color-primary-container` | `#9f86ff` | `#4b21bd` | Prominent callout fills |
| `--mio-theme-color-on-primary` | `#ffffff` | `#1a0056` | Text/icons on `--mio-theme-color-primary` |
| `--mio-theme-color-on-primary-container` | `#1e0060` | `#e7deff` | Text/icons on primary container |
| `--mio-theme-color-secondary` | `#5d5d74` | `#a1a1ba` | Secondary accents |
| `--mio-theme-color-secondary-container` | `#dcdaf5` | `#45455a` | Active section tab pill, active nav rail pill, resource badges |
| `--mio-theme-color-on-secondary-container` | `#21182b` | `#e2e0fb` | Text/icons inside active tabs and resource badges |
| `--mio-theme-color-tertiary-container` | `#f1d3f9` | `#553f5d` | Top-left Search FAB (`56×56px`, `16px` radius) |
| `--mio-theme-color-on-tertiary-container` | `#271430` | `#f7d8ff` | Icon inside Search FAB |
| `--mio-theme-color-inverse-surface` | `#303030` | `#e6e1e3` | Snackbars, cookie banner, tooltips |
| `--mio-theme-color-inverse-on-surface` | `#f5eff1` | `#323032` | Text inside snackbars/tooltips |
| `--mio-theme-color-utility-outline` | `#787579` | `#928f94` | Icon button borders, input outlines |
| `--mio-theme-color-on-surface-2` | `linear-gradient(0deg, rgb(31 25 35 / 8%), rgb(31 25 35 / 8%)), var(--mio-theme-color-secondary-container)` | `linear-gradient(0deg, rgb(242 236 238 / 8%), rgb(242 236 238 / 8%)), var(--mio-theme-color-secondary-container)` | Hover state surface for interactive cards & buttons (CSS state-layer composition via `linear-gradient`!) |
| `--mio-theme-color-on-surface-4` | `linear-gradient(0deg, rgb(31 25 35 / 12%), rgb(31 25 35 / 12%)), var(--mio-theme-color-secondary-container)` | `linear-gradient(0deg, rgb(242 236 238 / 12%), rgb(242 236 238 / 12%)), var(--mio-theme-color-secondary-container)` | Pressed/focus state surface (12% state layer) |

> **Engineering Insight — Pure-CSS State Layers via `linear-gradient`**:
> Notice how `m3.material.io` implements M3 state layers without extra DOM overlay elements: it defines `--mio-theme-color-on-surface-2` as a 2-stop `linear-gradient(0deg, rgba(onSurface, 0.08), rgba(onSurface, 0.08)), var(--base-container-color)`. Because CSS `background` stacks gradients on top of solid `background-color`, a single `background: var(--mio-theme-color-on-surface-2)` composites an exact 8% state-layer tint over any container token!

### 3.2 Semantic Callout Extension Tokens (Do / Don't / Caution)

| Token | Light Mode | Dark Mode | Purpose |
|---|---|---|---|
| `--mio-theme-color-extensions-do-container` | `#34be4d` | `#36c450` | "✅ Do" callout bar fill |
| `--mio-theme-color-extensions-on-do-container` | `#11371d` | `#093413` | "✅ Do" label & icon color |
| `--mio-theme-color-extensions-dont-container` | `#ff6240` | `#ff6e4e` | "❌ Don't" callout bar fill |
| `--mio-theme-color-extensions-on-dont-container` | `#490909` | `#490909` | "❌ Don't" label & icon color |
| `--mio-theme-color-extensions-caution-container` | `#ffce22` | `#ffce22` | "⚠️ Caution" callout bar fill |
| `--mio-theme-color-extensions-on-caution-container` | `#3a2900` | `#3a2900` | "⚠️ Caution" label & icon color |

### 3.3 Typography Tokens (`--mio-theme-v2-*`)

`m3.material.io` pairs three Google Variable Fonts (`Google Sans` for Display/Headline/Hero, `Google Sans Text` for Title/Body/Label, and `Google Sans Mono` for Code) with explicit `font-variation-settings: "GRAD" 0, "opsz" 17|18`:

| Scale Token Prefix | Font Family | Weight | Size | Line Height | Letter Spacing | `opsz` |
|---|---|---|---|---|---|---|
| `--mio-theme-v2-hero` | `Google Sans` | `475` | `96px` | `96px` (`1`) | `0` | `18` |
| `--mio-theme-v2-hero-md` | `Google Sans` | `475` | `72px` | `80px` | `0` | `18` |
| `--mio-theme-v2-hero-sm` | `Google Sans` | `475` | `60px` | `65px` | `0` | `18` |
| `--mio-theme-v2-display-xl` | `Google Sans` | `475` | `88px` | `96px` | `0` | `18` |
| `--mio-theme-v2-display-l` | `Google Sans` | `475` | `57px` | `64px` | `0` | `18` |
| `--mio-theme-v2-display-m` | `Google Sans` | `475` | `45px` | `52px` | `0` | `18` |
| `--mio-theme-v2-display-s` | `Google Sans` | `475` | `36px` | `44px` | `0` | `18` |
| `--mio-theme-v2-headline-l` | `Google Sans` | `475` | `32px` | `40px` | `0` | `18` |
| `--mio-theme-v2-headline-m` | `Google Sans` | `475` | `28px` | `36px` | `0` | `18` |
| `--mio-theme-v2-headline-s` | `Google Sans` | `475` | `24px` | `32px` | `0` | `18` |
| `--mio-theme-v2-title-l` | `Google Sans Text` | `400` | `22px` | `30px` | `0` | `17` |
| `--mio-theme-v2-title-m` | `Google Sans Text` | `500` | `16px` | `24px` | `0` | `17` |
| `--mio-theme-v2-title-s` | `Google Sans Text` | `500` | `14px` | `20px` | `0` | `17` |
| `--mio-theme-v2-body-l` | `Google Sans Text` | `400` | `16px` | `24px` | `0` | `17` |
| `--mio-theme-v2-body-m` | `Google Sans Text` | `400` | `14px` | `20px` | `0` | `17` |
| `--mio-theme-v2-body-s` | `Google Sans Text` | `400` | `12px` | `16px` | `0.1px` | `17` |
| `--mio-theme-v2-label-l` | `Google Sans Text` | `500` | `14px` | `20px` | `0` | `17` |
| `--mio-theme-v2-label-m` | `Google Sans Text` | `500` | `12px` | `16px` | `0.1px` | `17` |
| `--mio-theme-v2-label-s` | `Google Sans Text` | `500` | `11px` | `16px` | `0.1px` | `17` |
| `--mio-theme-v2-code-l` | `Google Sans Mono` | `400` | `16px` | `24px` | `0` | `0` |
| `--mio-theme-v2-code-m` | `Google Sans Mono` | `400` | `14px` | `20px` | `0` | `0` |
| `--mio-theme-v2-code-snippet` | `Google Sans Mono` | `500` | `15px` | `32px` | `0` | `0` |

> **Note**: Notice the variable font weight `475` used across all Display, Headline, and Hero styles — slightly heavier than Regular (`400`) and lighter than Medium (`500`) to give large Google Sans headlines optical balance without feeling bold.

### 3.4 Elevation Shadow Tokens

- `--mio-theme-elevation-1`: `0px 1px 2px 0px rgb(0 0 0 / 30%), 0px 1px 3px 1px rgb(0 0 0 / 15%)`
- `--mio-theme-elevation-2`: `0px 1px 2px 0px rgb(0 0 0 / 30%), 0px 2px 6px 2px rgb(0 0 0 / 15%)`
- `--mio-theme-elevation-3`: `0px 1px 3px 0px rgb(0 0 0 / 30%), 0px 4px 8px 3px rgb(0 0 0 / 15%)`

---

## 4. Signature UI Component Patterns on `m3.material.io`

### 4.1 Left Navigation Rail (`<mio-left-nav-rail>`) & Hover Drawer (`<mio-navigation-drawer>`)
- Fixed left rail: `width: 88px`, `height: 100vh`, `background: var(--mio-theme-color-surface-1)`.
- **Top Search FAB** (`a.section-fab`): `56×56px`, `border-radius: 16px`, `background: var(--mio-theme-color-tertiary-container)`, `margin: 20px 16px 24px`.
- **Destination Links** (`a.section-link`): `80×60px` vertical stack (icon inside `56×32px` pill indicator + `12px/16px` label). Active item gets `background: var(--mio-theme-color-secondary-container)` on the pill and `font-weight: 500` on the label.
- **Hover Flyout Drawer**: Hovering any section with children slides out `<mio-navigation-drawer>` (`width: 256px`, `left: 88px`, `border-right: 1px solid var(--mio-theme-color-surface-variant)`) containing collapsible topic groups and `48px`-tall pill links (`border-radius: 24px`).
- **Bottom Utility Controls** (`<mio-navbar-toggle-buttons>`): Two `48×48px` circular outlined icon buttons (`border: 1px solid var(--mio-theme-color-utility-outline)`, `border-radius: 50%`) for pausing/playing motion videos and toggling Light/Dark theme.

### 4.2 Split Hero Banner (`<mio-header>`)
- Located at the top of `<main>` (`margin-left: 88px`, `padding: 8px`).
- On desktop (`≥961px`), a 2-column CSS grid (`gap: 8px`, `min-height: 456px`):
  - **Left Title Card**: `background: var(--mio-theme-color-surface-1)`, `border-radius: 24px`, `padding: 56px`, flex column `justify-content: center`. Houses `<h1>` (`--mio-theme-v2-hero`, `96px/96px`, weight `475`), description `<p>` (`--mio-theme-v2-title-l`, `22px/30px`), and `<mio-resource-badges>` (`height: 40px` pill in `--mio-theme-color-secondary-container`).
  - **Right Artwork Card**: `border-radius: 24px`, `overflow: hidden`, displaying a full-bleed component preview illustration or autoplay loop video.

### 4.3 Sticky Section Tab Bar (`nav.article-tab-list`)
- Positioned immediately below the hero (`position: sticky; top: 0; z-index: 10`), `height: 88px`, `margin: 0 8px`.
- Outer track (`.navigation-container`): `background: var(--mio-theme-color-surface-2)`, `border-radius: 24px` (morphs to `border-radius: 0 0 40px 40px` when stuck to the top viewport edge, with `transition: max-width 0.3s cubic-bezier(0.2, 0, 0, 1), margin 0.3s cubic-bezier(0.2, 0, 0, 1)`).
- Individual Tab (`a.tab`): Equal-width flex items, `height: 79px`, `border-radius: 40px` (full pill), centered icon + `16px` medium label. Active tab receives `background: var(--mio-theme-color-secondary-container)` and filled Material Symbol icon (`font-variation-settings: 'FILL' 1`).

### 4.4 Do / Don't / Caution Figure Callouts (`<mio-figure>`)
- Pairs an upper media container (`border-radius: 16px 16px 2px 2px`, `overflow: hidden`) with a lower status bar (`span.caption-label.do|dont|caution`) separated by a `4px` vertical gap (`margin-top: 4px`):
  - Status bar uses **asymmetric corners** (`border-radius: 2px 2px 16px 16px`, `padding: 8px 12px`, `height: 36px`, `font: 500 14px/20px "Google Sans Text"`) so the media and the callout bar visually form a single cohesive `16px`-rounded card split by a `4px` seam.
  - Caption text sits below the status bar in `14px/20px` `--mio-theme-color-on-surface-variant`.

### 4.5 Interactive Bento Card Grid (`<mio-card-set>` & `<mio-card>`)
- Uses a 6-column CSS grid (`grid-template-columns: repeat(6, 1fr)`, `gap: 8px`, `max-width: 1200px`) where cards span 2, 3, or 6 columns (`col-2`, `col-3`, `stretch`).
- Each `<mio-card>` has `border-radius: 24px`, `background: var(--mio-theme-color-surface-1)`, `padding: 24px`, and transitions its background to `var(--mio-theme-color-on-surface-2)` (`#dcdaf5` + 8% tint) on `:hover` and `var(--mio-theme-color-on-surface-4)` on `:active`.
