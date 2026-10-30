# Typography

Material 3 and M3 Expressive typography system featuring 30 type scale styles (15 baseline + 15 emphasized across 5 semantic roles × 3 sizes), variable font axes, script-aware language height adaptation, editorial treatments, and accessible typesetting rules.

**Sources:**
- https://m3.material.io/styles/typography/overview
- https://m3.material.io/styles/typography/fonts
- https://m3.material.io/styles/typography/type-scale-tokens
- https://m3.material.io/styles/typography/applying-type
- https://m3.material.io/styles/typography/editorial-treatments
- https://m3.material.io/foundations/writing/best-practices
- https://m3.material.io/foundations/writing/text-truncation
- https://m3.material.io/foundations/writing/text-resizing
- https://m3.material.io/foundations/content-design/style-guide/ux-writing-best-practices

---

## When to Use / When Not to Use

| Role / Feature | When to Use | When Not to Use |
|---|---|---|
| **Display (`Large`, `Medium`, `Small`)** | Short, high-impact text or numerals on large/expanded screens; hero moments and editorial treatments. Supports expressive/brand fonts. | Long-form passages, dense mobile lists, or small containers where wrapping degrades scannability. |
| **Headline (`Large`, `Medium`, `Small`)** | Primary section headers, dialog titles, and short high-emphasis text on compact/mobile screens. | Multi-paragraph copy or secondary component labels. |
| **Title (`Large`, `Medium`, `Small`)** | Medium-emphasis structural dividers: top app bar titles (`title-large`), card titles, list subheaders, tab/menu headers. | Long paragraphs or tiny captions. Avoid overly decorative/handwritten fonts here. |
| **Body (`Large`, `Medium`, `Small`)** | Long-form reading, descriptions, list supporting text, text field inputs (`body-large`), dialog body copy (`body-medium`). | Hero numerals or primary action triggers where stronger weight is required. Never use decorative fonts. |
| **Label (`Large`, `Medium`, `Small`)** | Utilitarian component text: button labels (`label-large`), navigation bar labels (`label-medium`), badges, captions, and timecodes (`label-small`). | Multi-sentence paragraphs. |
| **Emphasized Styles (`md.sys.typescale.emphasized.*`)** | M3 Expressive active/selected states (selected nav/list/menu items), unread messages, primary buttons, extended FABs, badges, and key hierarchy moments. | Every text element simultaneously — overuse flattens hierarchy. Components use baseline tokens by default unless swapped. |
| **Editorial Treatments (Variable Fonts)** | Standalone hero moments celebrating content (album covers), expressing user voice/emotion (messaging), or bespoke interactive feedback (brightness/volume sliders). | Functional utility labels, standard form inputs, or mixing multiple clashing editorial styles on one screen. |

---

## Typeface Tokens & Default Font Stack (`md.ref.typeface.*`)

Material 3 separates typeface references into two semantic slots so brands can pair an expressive display font with a high-legibility UI font:

| Token | Default Value | Mapped Type Scale Roles | Purpose |
|---|---|---|---|
| `md.ref.typeface.brand` | `Roboto` | `display-large/medium/small`, `headline-large/medium/small`, `title-large` | Larger, expressive styles (`22sp`–`57sp`) communicating brand identity. |
| `md.ref.typeface.plain` | `Roboto` | `title-medium/small`, `body-large/medium/small`, `label-large/medium/small` | Smaller, utilitarian styles (`11sp`–`16sp`) optimized for high legibility. |
| `md.ref.typeface.weight-regular` | `400` | Baseline Display, Headline, Title Large, Body | Standard reading stroke weight. |
| `md.ref.typeface.weight-medium` | `500` | Baseline Title Medium/Small, Label; Emphasized Display, Headline, Title Large, Body | Medium emphasis weight. |
| `md.ref.typeface.weight-bold` | `700` | Emphasized Title Medium/Small, Emphasized Label (`*.weight.prominent`) | High emphasis / selected state weight. |

### Supported Font Families & Fallback Order
- **Roboto**: Default static typeface for Android and M3 (`3,300+` glyphs).
- **Roboto Flex**: Variable sans-serif (`900+` glyphs; Latin, Greek, Cyrillic) with 13 customizable axes (`wght`, `wdth`, `opsz`, `GRAD`, `slnt`, plus 8 parametric axes).
- **Roboto Serif**: Variable serif family designed for comfortable long-form reading across optical sizes.
- **Roboto Mono**: Monospaced family for code, technical data, and vertically aligned numerals.
- **Google Sans Flex**: Google's variable brand font with 6 axes (including Roundness `ROND`) that echoes M3 shape geometry.
- **Noto Sans**: Global fallback family covering `150+` scripts and `1,000+` languages.
- **Mandatory Fallback Stack**: When using a variable font like `Roboto Flex`, always configure the CSS/platform fallback stack in this exact order to preserve visual harmony across unsupported scripts:
  1. `Roboto Flex` (or custom brand variable font)
  2. `Roboto`
  3. `Noto Sans` (`sans-serif`)

---

## Complete M3 Type Scale (`md.sys.typescale.*`)

The M3 type scale is anchored on a **Major Second (`1.125`)** progression with **`14sp` (`body-medium`)** as the base size. It contains **30 styles**: **15 Baseline** (`md.sys.typescale.<role>-<size>`) and **15 Emphasized** (`md.sys.typescale.emphasized.<role>-<size>`, introduced in M3 Expressive, May 2025).

### Master Type Scale Table (Baseline & Emphasized)

| Role & Size | Baseline Token (`md.sys.typescale.*`) | Typeface Token | Baseline Weight | Emphasized Weight (`emphasized.*`) | Size (`sp`/`pt`) | Size (`rem`) | Line Height (`sp`/`pt`) | Line Height Ratio | Tracking (`pt`/`px`) | Tracking (`em`) |
|---|---|---|---|---|---|---|---|---|---|---|
| **Display Large** | `display-large` | `brand` (Roboto) | `400` (Regular) | `500` (Medium) | `57` | `3.5625rem` | `64` | `1.12×` | `-0.25` | `-0.0044em` |
| **Display Medium** | `display-medium` | `brand` (Roboto) | `400` (Regular) | `500` (Medium) | `45` | `2.8125rem` | `52` | `1.16×` | `0` | `0em` |
| **Display Small** | `display-small` | `brand` (Roboto) | `400` (Regular) | `500` (Medium) | `36` | `2.25rem` | `44` | `1.22×` | `0` | `0em` |
| **Headline Large** | `headline-large` | `brand` (Roboto) | `400` (Regular) | `500` (Medium) | `32` | `2.0rem` | `40` | `1.25×` | `0` | `0em` |
| **Headline Medium**| `headline-medium` | `brand` (Roboto) | `400` (Regular) | `500` (Medium) | `28` | `1.75rem` | `36` | `1.29×` | `0` | `0em` |
| **Headline Small** | `headline-small` | `brand` (Roboto) | `400` (Regular) | `500` (Medium) | `24` | `1.5rem` | `32` | `1.33×` | `0` | `0em` |
| **Title Large** | `title-large` | `brand` (Roboto) | `400` (Regular) | `500` (Medium) | `22` | `1.375rem` | `28` | `1.27×` | `0` | `0em` |
| **Title Medium** | `title-medium` | `plain` (Roboto) | `500` (Medium) | `700` (Bold) | `16` | `1.0rem` | `24` | `1.50×` | `+0.15` | `+0.0094em` |
| **Title Small** | `title-small` | `plain` (Roboto) | `500` (Medium) | `700` (Bold) | `14` | `0.875rem` | `20` | `1.43×` | `+0.1` | `+0.0071em` |
| **Body Large** | `body-large` | `plain` (Roboto) | `400` (Regular) | `500` (Medium) | `16` | `1.0rem` | `24` | `1.50×` | `+0.5` | `+0.03125em`|
| **Body Medium** | `body-medium` | `plain` (Roboto) | `400` (Regular) | `500` (Medium) | `14` | `0.875rem` | `20` | `1.43×` | `+0.25` | `+0.0179em` |
| **Body Small** | `body-small` | `plain` (Roboto) | `400` (Regular) | `500` (Medium) | `12` | `0.75rem` | `16` | `1.33×` | `+0.4` | `+0.0333em` |
| **Label Large** | `label-large` | `plain` (Roboto) | `500` (Medium) | `700` (Bold)* | `14` | `0.875rem` | `20` | `1.43×` | `+0.1` | `+0.0071em` |
| **Label Medium** | `label-medium` | `plain` (Roboto) | `500` (Medium) | `700` (Bold)* | `12` | `0.75rem` | `16` | `1.33×` | `+0.5` | `+0.0417em` |
| **Label Small** | `label-small` | `plain` (Roboto) | `500` (Medium) | `700` (Bold) | `11` | `0.6875rem` | `16` | `1.45×` | `+0.5` | `+0.0455em` |

*\*Note: `md.sys.typescale.label-large.weight.prominent` and `md.sys.typescale.label-medium.weight.prominent` also resolve to `md.ref.typeface.weight-bold` (`700`) in baseline component tokens.*

### Sub-Property Token Structure
Every style exposes 5 granular sub-tokens:
- `md.sys.typescale.<role>-<size>.font` → `md.ref.typeface.brand` or `md.ref.typeface.plain`
- `md.sys.typescale.<role>-<size>.weight` → `400`, `500`, or `700`
- `md.sys.typescale.<role>-<size>.size` → Font size in `pt`/`sp`
- `md.sys.typescale.<role>-<size>.line-height` → Line height in `pt`/`sp`
- `md.sys.typescale.<role>-<size>.tracking` → Letter spacing in `pt`/`sp`

### Platform Unit Conversions
- **Font Size**: Android uses `sp` (`1.0` ratio); Web uses `rem` (`0.0625` ratio assuming `16px` root: $\text{rem} = \text{sp} / 16$). Examples: `10sp = 0.625rem`, `12sp = 0.75rem`, `14sp = 0.875rem`, `16sp = 1rem`, `24sp = 1.5rem`, `60sp = 3.75rem`.
- **Letter Spacing (Tracking)**:
  - **CSS / Android `em`**: $\text{letter-spacing (em)} = \frac{\text{tracking (px/pt)}}{\text{font-size (sp/px)}}$. Example: `0.2px` tracking at `16sp` = `0.0125em`.
  - **CSS `rem`**: $\text{letter-spacing (rem)} = \frac{\text{tracking (px/pt)}}{16}$.

---

## Variable Font Axes (`Roboto Flex`, `Google Sans Flex`, `Roboto Serif`)

Variable fonts provide continuous interpolation across stylistic and optical axes for fine-grained hierarchy, dark-mode compensation, and expressive editorial moments.

| Axis Tag | Name | Roboto Flex Range | Default | Behavior & Design Guidance |
|---|---|---|---|---|
| `wght` | **Weight** | `100` – `1000` | `400` | Stroke thickness. Avoid very light weights (`<300`) on body text or low-DPI screens; avoid excessive weight (`>700`) on small nav labels (`11sp`–`12sp`). |
| `GRAD` | **Grade** | `-200` – `+150` | `0` | Granular optical weight adjustment that **never changes character width or line breaks** (zero text reflow). Use `+grade` for selected filter chips/tabs without layout shift; use negative grade (e.g., `-25` to `-50`) in Dark theme to counteract halation/light bleed. |
| `wdth` | **Width** | `25` – `151` | `100` | Horizontal character condensation/expansion (`25` ultra-condensed to `150` extended). Use narrower widths (`75`–`90`) to fit longer labels in compact bottom navigation bars; avoid wide widths in constrained Top App Bars. |
| `opsz` | **Optical Size** | `8` – `144` (`pt`) | Auto / matches size | Adjusts stroke contrast, x-height, internal counters, and tracking for the target point size. Always match `opsz` to the rendered font size (`font-optical-sizing: auto`). Never apply a large optical size (`72pt`) to small body text (`12pt`). |
| `slnt` | **Slant** | `-10` – `0` (`deg`) | `0` | Continuous oblique slant angle. Use sparingly (single word or short phrase); never italicize/slant full sentences or paragraphs. |
| `ROND` | **Roundness** *(Google Sans Flex)* | `0` – `100` | `0` | Softens stroke terminals and letter geometry from crisp/square (`0`) to fully rounded (`100`) to harmonize with M3 rounded shapes. |
| **Parametric Axes** *(Roboto Flex)* | `XOPQ` (Thick stroke), `YOPQ` (Thin stroke), `XTRA` (Counter width), `YTUC` (Uppercase height), `YTLC` (Lowercase height), `YTAS` (Ascender height), `YTDE` (Descender depth), `YTFI` (Figure height) | Per-axis ranges | Font defaults | Used for advanced algorithmic or editorial typography (e.g., dynamically scaling `wght` + `wdth` as a user drags a brightness slider). |

---

## Language Script Height Support (Aug 2026 Update)

Non-Latin scripts have taller ascenders, descenders, or stacked diacritics that clip or overlap if forced into Latin ("Small") line heights. Material 3 categorizes scripts into **4 language height tiers** that automatically scale line-height tokens:

| Category | Line-Height Multiplier | Scripts Included | Implementation Rule |
|---|---|---|---|
| **Small (Base)** | `1.00×` (Base table above) | Latin (except Vietnamese), Cyrillic, Greek, Hebrew | Used by fixed-height legacy components by default. |
| **Medium (Recommended Default)** | `~1.07×` (`+7%` taller) | Arabic, Amharic, Armenian, Bangla, Chinese (Simplified/Traditional), Gujarati, Hindi, Japanese, Kannada, Khmer, Korean, Lao, Malayalam, Odia, Punjabi, Sinhala, Tamil, Thai, Vietnamese, and most other global scripts | **Recommended default** for multi-lingual apps; switch dynamically when another script is detected. |
| **Large** | `~1.30×` (`+30%` taller) | Burmese, Telugu | Requires vertical padding (not fixed container heights) so components expand cleanly. |
| **Extra Large** | `~2.00×` (`+100%` taller)| Nastaliq (Urdu/Persian Nastaliq script) | Requires flexible multi-line vertical containers. |

---

## Readability, Line Length, Typesetting & UX Writing Rules

### Line Length (Measure) & Line Height
- **Body text line length**: **40–60 characters per line** (ideal for comfortable multi-line scanning; up to `60–75` characters maximum on wide desktop articles).
- **Short text / labels / cards**: **20–40 characters per line**.
- **Line height ratios**:
  - **Display, Headline, Title**: **`~1.12×` to `1.33×`** (recommended target **`1.2×`** of font size) so multi-line headings stay visually cohesive.
  - **Body & Label**: **`~1.33×` to `1.50×`** (recommended target **`1.5×`** of font size) for effortless line-to-line eye tracking.
- **Tabular Numerals**: Always apply `font-variant-numeric: tabular-nums` (or `tnum` OpenType feature) to clocks, timers, financial tables, counters, and live-updating metrics so digits occupy equal horizontal width and never jitter layouts.

### Vertical Typesetting: Web/iOS vs Android
- **Web & iOS (Bounding Box + Half-Leading)**: Line height equals the bounding box height; text is centered vertically inside the bounding box with equal half-leading above and below. Specify spacing using container **padding** and **bounding box edges**.
- **Android (Baseline-Relative)**: Specify vertical alignment and spacing relative to the invisible **text baseline** (distance from container edge to first baseline, and baseline-to-baseline distance for line height), or use vertical padding tokens so containers adapt automatically to **Language Script Height**.

### Text Resizing, Truncation & Adaptive Reflow
- **200% Text Scaling Requirement**: All UIs must support OS/user text scaling up to **at least `200%` (`2x`)** without loss of content or functionality.
- **Preserve `1x` Padding & Gaps**: When text scales from `1x` to `2x`, **only font size and line height multiply** (e.g., `14pt` → `28pt`). Component internal padding (e.g., `8dp` vertical, `24dp` horizontal on buttons) and inter-element gaps **remain constant at `1x`**.
- **Do Not Scale Non-Text Controls**: Icons (`24dp`), checkboxes, radio buttons, switches, and progress indicators do **not** scale up during text-only resizing.
- **Reflow Before Truncating**:
  1. Allow containers to grow vertically and wrap text across multiple lines.
  2. Stack side-by-side buttons vertically when `2x` text exceeds horizontal width.
  3. Enable **vertical scrolling** (never require simultaneous horizontal + vertical scrolling).
  4. **Touch-and-Hold Tooltips for Fixed Chrome**: In space-constrained components (`TopAppBar`, `NavigationBar`, `NavigationRail`, fixed `Tabs`), keep the component label at `1x` or ellipsized and display the **enlarged `2x` label inside a Tooltip on touch-and-hold / hover**.
  5. Never truncate text with an ellipsis (`...`) unless the full text is accessible via expansion, link, or tooltip.

### Capitalization & UX Writing Style
- **Sentence case everywhere**: Capitalize **only the first letter of the first word** (and proper nouns/brand names) across all UI text — including titles, headings, buttons, tabs, menu items, dialogs, and navigation labels.
- **Never use ALL CAPS (`caps block`)**: All-caps text reduces word-shape recognition and fails M3 accessibility guidance.
- **Skip trailing periods** on single sentences in labels, tooltips, snackbars, bulleted lists, dialog body text, and hyperlinks.
- **Use en-dashes without spaces** (`9 AM–Noon`) for ranges; avoid em-dashes (`—`) in UI copy.

### Typography Color & Contrast
- **Default text color**: `md.sys.color.on-surface` (primary hierarchy) and `md.sys.color.on-surface-variant` (secondary/supporting text).
- **Minimum contrast**: **`4.5:1`** for small text (`<18pt` regular / `<14pt` bold); **`3.0:1`** for large text (`≥18pt` regular / `≥14pt` bold).
- **Hyperlinks**: Must use `md.sys.color.primary` (or `md.sys.color.tertiary` for lower emphasis) on surface backgrounds and **must always be underlined** (`text-decoration: underline`).

---

## Do / Don't / Caution Rules

- **✅ Do** use `md.sys.typescale.emphasized.*` tokens selectively for active/selected states, unread items, primary actions, and hero headlines to create crisp hierarchy alongside baseline styles.
- **✅ Do** create reusable design tokens for custom editorial treatments so similar hero moments remain consistent across the product.
- **⚠️ Caution** when mixing multiple custom editorial type treatments on the same screen — clashing widths/weights create visual chaos.
- **⚠️ Caution** with very light weights (`wght < 300`) on body text or bold weights (`wght >= 700`) on small navigation labels (`11sp`–`12sp`), which degrade legibility on low-resolution displays or in dark mode.
- **✅ Do** use the `GRAD` (Grade) axis to emphasize selected states (e.g., filter chips) without causing text width reflow, and apply negative `GRAD` (`-25` to `-50`) in Dark theme to prevent optical thickening.
- **✅ Do** use narrower `wdth` values on variable fonts when fitting labels into compact navigation bars.
- **❌ Don't** use wide/extended `wdth` styles in constrained spaces like Top App Bars.
- **✅ Do** match the variable font's optical size (`opsz`) to its rendered point size; **❌ Don't** apply large display optical sizes (`72pt`) to small paragraph text.
- **✅ Do** align Material Symbols with adjacent text by matching both font size and optical weight, and shifting the symbol's baseline down by **`~11.5%` of the text size** (when centering via baseline).
- **❌ Don't** scale icons or selection controls when the user increases OS text size to `200%`, and **❌ Don't** scale up container padding when text scales.
- **❌ Don't** use Title Case or ALL CAPS for buttons, headings, or labels; always use sentence case.

---

## Implementation Notes

### Jetpack Compose (`androidx.compose.material3.Typography`)
```kotlin
import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

val AppTypography = Typography(
    displayLarge = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal, // Use FontWeight.Medium (500) for Emphasized
        fontSize = 57.sp,
        lineHeight = 64.sp,
        letterSpacing = (-0.25).sp
    ),
    headlineMedium = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 28.sp,
        lineHeight = 36.sp,
        letterSpacing = 0.sp
    ),
    titleLarge = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 22.sp,
        lineHeight = 28.sp,
        letterSpacing = 0.sp
    ),
    bodyLarge = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 16.sp,
        lineHeight = 24.sp,
        letterSpacing = 0.5.sp
    ),
    labelLarge = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Medium, // Use FontWeight.Bold (700) for Emphasized
        fontSize = 14.sp,
        lineHeight = 20.sp,
        letterSpacing = 0.1.sp
    )
)
// Access in UI via MaterialTheme.typography.bodyLarge, .titleMedium, .labelLarge, etc.
// Note: Expressive Typography APIs in Compose 1.4+ (ExperimentalMaterial3ExpressiveApi) add emphasized styles.
```

### Flutter (`TextTheme` / `Typography.material2021`)
```dart
final textTheme = Typography.material2021().black.copyWith(
  displayLarge: const TextStyle(fontSize: 57, height: 64 / 57, letterSpacing: -0.25, fontWeight: FontWeight.w400),
  titleMedium: const TextStyle(fontSize: 16, height: 24 / 16, letterSpacing: 0.15, fontWeight: FontWeight.w500),
  bodyLarge: const TextStyle(fontSize: 16, height: 24 / 16, letterSpacing: 0.5, fontWeight: FontWeight.w400),
  labelLarge: const TextStyle(fontSize: 14, height: 20 / 14, letterSpacing: 0.1, fontWeight: FontWeight.w500),
);
// Access via Theme.of(context).textTheme.bodyLarge, .titleMedium, .labelLarge
```

### Material Web & CSS Custom Properties (`--md-sys-typescale-*`)
```css
:root {
  --md-ref-typeface-brand: 'Roboto Flex', 'Roboto', 'Noto Sans', sans-serif;
  --md-ref-typeface-plain: 'Roboto Flex', 'Roboto', 'Noto Sans', sans-serif;
  --md-ref-typeface-weight-regular: 400;
  --md-ref-typeface-weight-medium: 500;
  --md-ref-typeface-weight-bold: 700;

  /* Display (Large / Medium / Small) */
  --md-sys-typescale-display-large-font: var(--md-ref-typeface-brand);
  --md-sys-typescale-display-large-size: 3.5625rem;     /* 57px */
  --md-sys-typescale-display-large-line-height: 4rem;   /* 64px */
  --md-sys-typescale-display-large-weight: 400;         /* Emphasized: 500 */
  --md-sys-typescale-display-large-tracking: -0.015625rem; /* -0.25px */

  /* Headline Large */
  --md-sys-typescale-headline-large-size: 2rem;         /* 32px */
  --md-sys-typescale-headline-large-line-height: 2.5rem;/* 40px */
  --md-sys-typescale-headline-large-weight: 400;        /* Emphasized: 500 */

  /* Title Large & Medium */
  --md-sys-typescale-title-large-size: 1.375rem;        /* 22px */
  --md-sys-typescale-title-large-line-height: 1.75rem;  /* 28px */
  --md-sys-typescale-title-large-weight: 400;           /* Emphasized: 500 */
  --md-sys-typescale-title-medium-size: 1rem;           /* 16px */
  --md-sys-typescale-title-medium-line-height: 1.5rem;  /* 24px */
  --md-sys-typescale-title-medium-weight: 500;          /* Emphasized: 700 */
  --md-sys-typescale-title-medium-tracking: 0.009375rem;/* 0.15px */

  /* Body Large & Medium */
  --md-sys-typescale-body-large-size: 1rem;             /* 16px */
  --md-sys-typescale-body-large-line-height: 1.5rem;    /* 24px */
  --md-sys-typescale-body-large-weight: 400;            /* Emphasized: 500 */
  --md-sys-typescale-body-large-tracking: 0.03125rem;   /* 0.5px */
  --md-sys-typescale-body-medium-size: 0.875rem;        /* 14px */
  --md-sys-typescale-body-medium-line-height: 1.25rem;  /* 20px */
  --md-sys-typescale-body-medium-weight: 400;           /* Emphasized: 500 */
  --md-sys-typescale-body-medium-tracking: 0.015625rem; /* 0.25px */

  /* Label Large, Medium, Small */
  --md-sys-typescale-label-large-size: 0.875rem;        /* 14px */
  --md-sys-typescale-label-large-line-height: 1.25rem;  /* 20px */
  --md-sys-typescale-label-large-weight: 500;           /* Emphasized: 700 */
  --md-sys-typescale-label-large-tracking: 0.00625rem;  /* 0.1px */
}

/* Variable font dark-mode grade compensation & tabular numbers */
@media (prefers-color-scheme: dark) {
  body { font-variation-settings: 'GRAD' -25; }
}
.numeric-metric { font-variant-numeric: tabular-nums; }
```

---

**Further reading:** `docs/pages/typography.md`, `docs/pages/writing-and-text.md`, `docs/pages/style-guide.md`, `docs/pages/designing.md`, `docs/blog/designing-text-visual-acuity-research.md`, `docs/blog/how-to-make-text-more-accessible.md`, `tokens/sys-tokens.md`.
