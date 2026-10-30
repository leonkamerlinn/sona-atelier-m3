# Color System

Material 3's algorithmic, perceptually accurate color system built on the HCT (Hue, Chroma, Tone) color space, 5 key tonal palettes, 26+ standard and add-on semantic color roles, dynamic color extraction, and 3 user-controlled contrast levels.

**Sources:**
- https://m3.material.io/styles/color/system/overview
- https://m3.material.io/styles/color/system/how-the-system-works
- https://m3.material.io/styles/color/roles
- https://m3.material.io/styles/color/choosing-a-scheme
- https://m3.material.io/styles/color/dynamic/choosing-a-source
- https://m3.material.io/styles/color/dynamic/user-generated-source
- https://m3.material.io/styles/color/dynamic/content-based-source
- https://m3.material.io/styles/color/static/baseline
- https://m3.material.io/styles/color/static/custom-brand
- https://m3.material.io/styles/color/advanced/overview
- https://m3.material.io/styles/color/advanced/apply-colors
- https://m3.material.io/styles/color/advanced/define-new-colors
- https://m3.material.io/styles/color/advanced/adjust-existing-colors
- https://m3.material.io/styles/color/resources
- https://m3.material.io/foundations/designing/color-contrast

---

## When to Use / When Not to Use

| Scheme / Feature | When to Use | When Not to Use |
|---|---|---|
| **Static Baseline Scheme** | Default purple-neutral M3 palette; prototyping to verify semantic role mappings; migrating from M2 without breaking visual expectations; iOS or enterprise apps that do not use personalization. | Apps where strong custom brand identity or wallpaper/content-driven personalization is primary. |
| **Static Custom Brand Scheme** | Products requiring consistent, uniform brand colors across all devices and platforms. | When user-controlled wallpaper theming is desired as the primary aesthetic. |
| **Dynamic User-Generated Scheme** | Consumer Android/Material You apps where personal expression, OS cohesion (wallpaper extraction), and user-controlled contrast settings (Standard, Medium, High) are prioritized. | Strict brand-locked UIs or semantic indicators where hue changes would confuse meaning (use static/harmonized colors for those elements instead). |
| **Dynamic Content-Based Scheme** | Media players, album views, book readers, photo editors, or feed cards where UI chrome should adapt to visible in-app imagery (logos, thumbnails, artwork). | Global app navigation or screens where the source image is not visible on screen. Never use >2 color schemes on a single screen. |
| **Add-On Roles (`*-fixed`, `surface-dim`, `surface-bright`)** | Special surfaces or accents that must maintain identical tone or relative brightness across both Light and Dark themes (e.g., persistent media banners, split-pane dark/bright contrast). | General UI components. Most apps only need the 26 standard color roles; `*-fixed` roles can break contrast if paired with standard inverting surfaces. |

---

## HCT Color Space (Hue, Chroma, Tone)

Material 3 defines all colors using **HCT**, a perceptually accurate 3D color space combining **CAM16** (Hue and Chroma) with **CIE L\*a\*b\*** (Tone / Lightness $L^*$). Unlike HSL or RGB, HCT allows manipulating a color's Hue and Chroma without altering its perceived lightness (Tone) or contrast ratio.

| Dimension | Range | Underlying Model | Behavior & Accessibility Impact |
|---|---|---|---|
| **Hue ($H$)** | `0` – `360` (circular; `0` = `360`) | CAM16 Hue | Angle on the color wheel (`0°` red, `60°` yellow, `120°` green, `240°` blue, `300°` violet). Determines color family and warm/cool temperature. |
| **Chroma ($C$)** | `0` – `~120+` | CAM16 Chroma | Colorfulness / saturation purity from `0` (pure neutral grey, black, or white) to `~120` (maximum vibrancy). Maximum achievable chroma varies by Hue and Tone due to human biology and sRGB/display gamut limits (e.g., yellows peak at high tones; blues peak at lower tones). |
| **Tone ($T$)** | `0` – `100` | CIE $L^*$ (Luminance) | Perceived lightness from `0` (100% pure black, `#000000`) to `100` (100% pure white, `#FFFFFF`). Directly governs WCAG contrast ratios regardless of Hue or Chroma. |

### Tone Difference ($\Delta T$) & Guaranteed Contrast

Because Tone measures perceptual luminance uniformly across all hues:
- **$\Delta T \ge 40$** between two colors guarantees a **$\ge 3.0:1$ contrast ratio** (WCAG AA for large text $\ge 18\text{pt}$ regular / $\ge 14\text{pt}$ bold, and non-text UI boundaries/graphics). Example: Tone `50` vs Tone `98` or Tone `40` vs Tone `80`.
- **$\Delta T \ge 50$** between two colors guarantees a **$\ge 4.5:1$ contrast ratio** (WCAG AA for small text). Example: Tone `40` vs Tone `90` or Tone `30` vs Tone `90` ($\Delta T = 60$).
- **$\Delta T \ge 68$** between two colors guarantees a **$\ge 7.0:1$ contrast ratio** (WCAG AAA / M3 High Contrast mode). Example: Tone `30` vs Tone `98` ($\Delta T = 68$).
- **HCT vs HSL warning**: Never substitute HSL lightness for HCT tone. Three colors sharing HCT Tone `78` (identical perceived brightness) can have wildly different HSL lightness values (e.g., `83%`, `65%`, `77%`), and HSL Lightness `50%` spans HCT tones from `33` to `96`.

---

## Dynamic Color Pipeline & Key Colors

Material Color Utilities (**MCU**) generates a complete, accessible theme in 6 steps:
1. **Source Color Extraction**:
   - **Wallpaper (User-generated)** or **In-App Imagery (Content-based)**: Image pixels are quantized using M. Emre Celebi's quantizer (`QuantizerCelebi`), then scored by chroma and pixel population while filtering out near-monochrome colors.
   - **Hand-Picked Seed**: Designer specifies one or more hex seed colors.
2. **Algorithm Selection**:
   - **User-generated (`SchemeTonalSpot` / default)**: Moderate chroma, predictable tonal relationships.
   - **Content-based (`SchemeContent` / `SchemeFidelity`)**: Adjusts tones and chroma to stay faithful to the source image's appearance and vibrancy.
   - **Custom variants**: `SchemeVibrant`, `SchemeExpressive`, `SchemeNeutral`, `SchemeMonochrome`, `SchemeRainbow`, `SchemeFruitSalad`.
3. **Key Color Generation**: Manipulates source Hue and Chroma to derive **5 key colors** (plus static semantic **Error**).
4. **Tonal Palettes**: Generates tonal ramps (`0`–`100`) for each key color.
5. **Color Role Mapping**: Maps specific tones to the 26+ semantic color roles across Light/Dark and Standard/Medium/High contrast.
6. **UI Application**: Components consume `md.sys.color.*` tokens rather than raw hex or palette tokens.

### The 6 Key Colors (5 Dynamic + 1 Static Error)

| Key Color | Palette Prefix | Default Chroma (TonalSpot) | Hue Relationship | Purpose & Baseline Seed / Tone 40 Hex |
|---|---|---|---|---|
| **Primary** | `md.ref.palette.primary*` | `36` – `48` (Baseline: `48`) | Matches source hue | High-emphasis fills, active states, FABs, primary buttons. Baseline Tone 40: `#6750A4` |
| **Secondary** | `md.ref.palette.secondary*` | `16` | Matches primary hue | Lower-emphasis accents, filter chips, tonal buttons, nav indicators. Baseline Tone 40: `#625B71` |
| **Tertiary** | `md.ref.palette.tertiary*` | `24` | Shifted `+60°` (complementary) | Contrasting accent to balance primary/secondary, badges, input highlights. Baseline Tone 40: `#7D5260` |
| **Neutral** | `md.ref.palette.neutral*` | `6` (updated from `4` in Feb 2023) | Matches primary hue | Surfaces, backgrounds, sheet/card/dialog containers, and `on-surface` text. Baseline Tone 10: `#1D1B20` |
| **Neutral Variant** | `md.ref.palette.neutral-variant*` | `8` | Matches primary hue | Medium-emphasis text (`on-surface-variant`), outlines, and dividers. Baseline Tone 30: `#49454F` |
| **Error** | `md.ref.palette.error*` | `84` (Static) | Fixed red hue (`~25°`) | Semantic urgency, invalid input, destructive states. Does not shift with dynamic wallpaper. Baseline Tone 40: `#B3261E` |

---

## Tonal Palettes (`md.ref.palette.*`)

Each key color expands into **13 standard tones** (`0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100`) plus tone `98`.
The **Neutral** palette additionally defines **11 surface container tones** (`4, 6, 12, 17, 22, 24` for Dark theme; `87, 92, 94, 96, 98` for Light theme) to support tone-based surface hierarchy without opacity overlays.

### Baseline Reference Palette Hex Table

Values marked with `*` are directly referenced by component tokens in `tokens/sys-tokens.md` (DSDB v38.x); remaining steps are standard M3 baseline palette tones.

| Tone | `primary` | `secondary` | `tertiary` | `neutral` | `neutral-variant` | `error` |
|---|---|---|---|---|---|---|
| **0** | `#000000`* | `#000000`* | `#000000`* | `#000000`* | `#000000`* | `#000000`* |
| **4** *(Dark surface-lowest)* | — | — | — | `#0F0D13` | — | — |
| **6** *(Dark surface)* | — | — | — | `#141218`* | — | — |
| **10** | `#21005D`* | `#1D192B`* | `#31111D`* | `#1D1B20`* | `#1D1A22` | `#410E0B`* |
| **12** *(Dark container)* | — | — | — | `#211F26`* | — | — |
| **17** *(Dark container-high)* | — | — | — | `#2B2930`* | — | — |
| **20** | `#381E72`* | `#332D41`* | `#492532`* | `#322F35`* | `#322F37`* | `#601410`* |
| **22** *(Dark container-highest)* | — | — | — | `#36343B`* | — | — |
| **24** *(Dark surface-bright)* | — | — | — | `#3B383E` | — | — |
| **30** | `#4F378B`* | `#4A4458`* | `#633B48`* | `#48464C` | `#49454F`* | `#8C1D18`* |
| **40** | `#6750A4`* | `#625B71`* | `#7D5260`* | `#605D64` | `#605D66` | `#B3261E`* |
| **50** | `#7F67BE`* | `#7A7289` | `#986977` | `#79767D` | `#79747E`* | `#DC362E` |
| **60** | `#9A82DB`* | `#958DA5`* | `#B58392`* | `#938F96` | `#938F99`* | `#E46962` |
| **70** | `#B69DF8` | `#B0A7C0` | `#D29DAC` | `#AEA9B1` | `#AEA9B4`* | `#EC928E` |
| **80** | `#D0BCFF`* | `#CCC2DC`* | `#EFB8C8`* | `#CAC5CD` | `#CAC4D0`* | `#F2B8B5`* |
| **87** *(Light surface-dim)* | — | — | — | `#DED8E1` | — | — |
| **90** | `#EADDFF`* | `#E8DEF8`* | `#FFD8E4`* | `#E6E0E9`* | `#E7E0EC`* | `#F9DEDC`* |
| **92** *(Light container-high)* | — | — | — | `#ECE6F0`* | — | — |
| **94** *(Light container)* | — | — | — | `#F3EDF7`* | — | — |
| **95** | `#F6EDFF`* | `#F6EDFF`* | `#FFECF1`* | `#F5EFF7`* | `#F5EEFA`* | `#FCEEEE`* |
| **96** *(Light container-low)* | — | — | — | `#F7F2FA`* | — | — |
| **98** *(Light surface)* | `#FEF7FF` | `#FEF7FF` | `#FFF8F9` | `#FEF7FF`* | `#FEF7FF` | `#FFF8F7` |
| **99** | `#FFFBFE` | `#FFFBFE` | `#FFFBFA` | `#FFFBFE` | `#FFFBFE` | `#FFFBF9` |
| **100** | `#FFFFFF`* | `#FFFFFF`* | `#FFFFFF`* | `#FFFFFF`* | `#FFFFFF`* | `#FFFFFF`* |

---

## Complete Color Roles (`md.sys.color.*`)

Material 3 defines **26 standard color roles** across 6 groups (Primary, Secondary, Tertiary, Error, Surface, Outline + Inverse/Utility) plus **16 add-on roles** (12 Fixed Accent roles + 2 Bright/Dim Surface roles + Scrim/Shadow) and legacy compatibility tokens.

### Naming Conventions
- **`surface`**: Neutral backgrounds and large low-emphasis screen regions.
- **`primary` / `secondary` / `tertiary`**: Accent roles ordered by visual prominence and emphasis.
- **`*-container`**: Fill color for foreground components (buttons, FABs, chips, active nav indicators). **Never** use container roles for text or icons.
- **`on-*`**: Text and icon color guaranteed to maintain accessible contrast *on top of* its paired parent fill (`on-primary` on `primary`, `on-surface` on any `surface*`).
- **`*-variant`**: Lower-emphasis alternative (`on-surface-variant` for secondary text/icons; `outline-variant` for decorative dividers).
- **`inverse-*`**: Reversed theme roles for high-contrast floating elements like Snackbars or Tooltips (`inverse-surface`, `inverse-on-surface`, `inverse-primary`).

### Master Color Role Mapping Table (Light, Dark, Medium & High Contrast)

> **Aug 2024 Update ("More colorful text and icons")**: In Light Standard contrast, `on-primary-container`, `on-secondary-container`, `on-tertiary-container`, and `on-error-container` were updated from **Tone 10** to **Tone 30** so text and icons inside tonal containers appear more chromatic while retaining $\ge 4.5:1$ contrast against Tone 90 containers ($\Delta T = 60$).

| System Token (`md.sys.color.*`) | Palette | Light Tone (Std) | Dark Tone (Std) | Light Hex (Baseline) | Dark Hex (Baseline) | Light Med / High Tone | Dark Med / High Tone | Intended UI Usage |
|---|---|---|---|---|---|---|---|---|
| **Primary Group** | | | | | | | | |
| `primary` | `primary` | **40** | **80** | `#6750A4` | `#D0BCFF` | `30` / `20` | `85` / `95` | High-emphasis fills (Filled Button), active controls, links |
| `on-primary` | `primary` | **100** | **20** | `#FFFFFF` | `#381E72` | `100` / `100` | `10` / `0` | Text & icons on `primary` |
| `primary-container` | `primary` | **90** | **30** | `#EADDFF` | `#4F378B` | `40` / `30` | `60` / `80` | Standout container fill (Primary FAB, selected states) |
| `on-primary-container` | `primary` | **30** *(was 10)* | **90** | `#4F378B` | `#EADDFF` | `100` / `100` | `0` / `0` | Text & icons on `primary-container` |
| **Secondary Group** | | | | | | | | |
| `secondary` | `secondary` | **40** | **80** | `#625B71` | `#CCC2DC` | `30` / `20` | `85` / `95` | Less prominent fills, text, and icons against surface |
| `on-secondary` | `secondary` | **100** | **20** | `#FFFFFF` | `#332D41` | `100` / `100` | `10` / `0` | Text & icons on `secondary` |
| `secondary-container` | `secondary` | **90** | **30** | `#E8DEF8` | `#4A4458` | `40` / `30` | `60` / `80` | Recessive tonal fills (Tonal Button, Filter Chip, Nav indicator) |
| `on-secondary-container` | `secondary` | **30** *(was 10)* | **90** | `#4A4458` | `#E8DEF8` | `100` / `100` | `0` / `0` | Text & icons on `secondary-container` |
| **Tertiary Group** | | | | | | | | |
| `tertiary` | `tertiary` | **40** | **80** | `#7D5260` | `#EFB8C8` | `30` / `20` | `85` / `95` | Complementary accent fills, badges, secondary links |
| `on-tertiary` | `tertiary` | **100** | **20** | `#FFFFFF` | `#492532` | `100` / `100` | `10` / `0` | Text & icons on `tertiary` |
| `tertiary-container` | `tertiary` | **90** | **30** | `#FFD8E4` | `#633B48` | `40` / `30` | `60` / `80` | Complementary container fill (badges, highlighted inputs) |
| `on-tertiary-container` | `tertiary` | **30** *(was 10)* | **90** | `#633B48` | `#FFD8E4` | `100` / `100` | `0` / `0` | Text & icons on `tertiary-container` |
| **Error Group (Static)** | | | | | | | | |
| `error` | `error` | **40** | **80** | `#B3261E` | `#F2B8B5` | `30` / `20` | `85` / `95` | Urgent error text, icons, outlines, and high-emphasis fills |
| `on-error` | `error` | **100** | **20** | `#FFFFFF` | `#601410` | `100` / `100` | `10` / `0` | Text & icons on `error` |
| `error-container` | `error` | **90** | **30** | `#F9DEDC` | `#8C1D18` | `40` / `30` | `60` / `80` | Error state container fills |
| `on-error-container` | `error` | **30** *(was 10)* | **90** | `#8C1D18` | `#F9DEDC` | `100` / `100` | `0` / `0` | Text & icons on `error-container` (and error hover states) |
| **Surface Group** | | | | | | | | |
| `surface` | `neutral` | **98** | **6** | `#FEF7FF` | `#141218` | `98` / `98` | `6` / `6` | Default main page/body background |
| `surface-dim` *(add-on)* | `neutral` | **87** | **6** | `#DED8E1` | `#141218` | `80` / `75` | `6` / `6` | Dimmest surface in both Light & Dark themes |
| `surface-bright` *(add-on)* | `neutral` | **98** | **24** | `#FEF7FF` | `#3B383E` | `98` / `98` | `30` / `35` | Brightest surface in both Light & Dark themes |
| `surface-container-lowest` | `neutral` | **100** | **4** | `#FFFFFF` | `#0F0D13` | `100` / `100` | `2` / `0` | Lowest-emphasis container against `surface` |
| `surface-container-low` | `neutral` | **96** | **10** | `#F7F2FA` | `#1D1B20` | `94` / `92` | `11` / `12` | Low-emphasis container (Elevated Card, Elevated Button, Sheets) |
| `surface-container` | `neutral` | **94** | **12** | `#F3EDF7` | `#211F26` | `90` / `87` | `16` / `17` | Default container (Navigation Bar, Top/Bottom App Bar, Menu) |
| `surface-container-high` | `neutral` | **92** | **17** | `#ECE6F0` | `#2B2930` | `86` / `82` | `21` / `23` | High-emphasis container (Dialogs, Date/Time Pickers, Search Bar) |
| `surface-container-highest`| `neutral` | **90** | **22** | `#E6E0E9` | `#36343B` | `82` / `77` | `26` / `29` | Highest-emphasis container (Filled Card, Filled TextField, Switch off) |
| `on-surface` | `neutral` | **10** | **90** | `#1D1B20` | `#E6E0E9` | `5` / `0` | `95` / `100` | Primary text and icons against any `surface*` role |
| `on-surface-variant` | `neutral-variant`| **30** | **80** | `#49454F` | `#CAC4D0` | `20` / `10` | `85` / `95` | Secondary/medium-emphasis text, labels, and icons on `surface*` |
| **Outline Group** | | | | | | | | |
| `outline` | `neutral-variant`| **50** | **60** | `#79747E` | `#938F99` | `40` / `25` | `70` / `85` | Functional 3:1 boundaries (Outlined TextField, Outlined Button/Chip) |
| `outline-variant` | `neutral-variant`| **80** | **30** | `#CAC4D0` | `#49454F` | `60` / `45` | `45` / `60` | Decorative borders, dividers, Outlined Card borders |
| **Inverse & Utility** | | | | | | | | |
| `inverse-surface` | `neutral` | **20** | **90** | `#322F35` | `#E6E0E9` | `20` / `15` | `90` / `95` | Contrasting background fill (Snackbar, Plain Tooltip) |
| `inverse-on-surface` | `neutral` | **95** | **20** | `#F5EFF7` | `#322F35` | `95` / `100` | `15` / `5` | Text & icons on `inverse-surface` |
| `inverse-primary` | `primary` | **80** | **40** | `#D0BCFF` | `#6750A4` | `80` / `85` | `40` / `30` | Action buttons/links inside `inverse-surface` (Snackbar action) |
| `scrim` | `neutral` | **0** | **0** | `#000000` | `#000000` | `0` / `0` | `0` / `0` | Modal backdrop overlay (typically applied at `32%` opacity) |
| `shadow` | `neutral` | **0** | **0** | `#000000` | `#000000` | `0` / `0` | `0` / `0` | Elevation drop shadow color |
| **Fixed Accent Add-Ons** | | | | | | | | |
| `primary-fixed` | `primary` | **90** | **90** | `#EADDFF` | `#EADDFF` | `40` / `30` | `40` / `30` | Primary container fill that stays Tone 90 in both Light & Dark |
| `primary-fixed-dim` | `primary` | **80** | **80** | `#D0BCFF` | `#D0BCFF` | `30` / `20` | `30` / `20` | Deeper fixed primary fill (Tone 80 in both Light & Dark) |
| `on-primary-fixed` | `primary` | **10** | **10** | `#21005D` | `#21005D` | `100` / `100` | `100` / `100` | High-emphasis text/icons on `primary-fixed` / `primary-fixed-dim` |
| `on-primary-fixed-variant` | `primary` | **30** | **30** | `#4F378B` | `#4F378B` | `90` / `95` | `90` / `95` | Medium-emphasis text/icons on `primary-fixed` / `primary-fixed-dim` |
| `secondary-fixed` | `secondary` | **90** | **90** | `#E8DEF8` | `#E8DEF8` | `40` / `30` | `40` / `30` | Fixed secondary container fill (Tone 90 in both Light & Dark) |
| `secondary-fixed-dim` | `secondary` | **80** | **80** | `#CCC2DC` | `#CCC2DC` | `30` / `20` | `30` / `20` | Deeper fixed secondary fill (Tone 80 in both Light & Dark) |
| `on-secondary-fixed` | `secondary` | **10** | **10** | `#1D192B` | `#1D192B` | `100` / `100` | `100` / `100` | High-emphasis text/icons on `secondary-fixed` |
| `on-secondary-fixed-variant`| `secondary` | **30** | **30** | `#4A4458` | `#4A4458` | `90` / `95` | `90` / `95` | Medium-emphasis text/icons on `secondary-fixed` |
| `tertiary-fixed` | `tertiary` | **90** | **90** | `#FFD8E4` | `#FFD8E4` | `40` / `30` | `40` / `30` | Fixed tertiary container fill (Tone 90 in both Light & Dark) |
| `tertiary-fixed-dim` | `tertiary` | **80** | **80** | `#EFB8C8` | `#EFB8C8` | `30` / `20` | `30` / `20` | Deeper fixed tertiary fill (Tone 80 in both Light & Dark) |
| `on-tertiary-fixed` | `tertiary` | **10** | **10** | `#31111D` | `#31111D` | `100` / `100` | `100` / `100` | High-emphasis text/icons on `tertiary-fixed` |
| `on-tertiary-fixed-variant` | `tertiary` | **30** | **30** | `#633B48` | `#633B48` | `90` / `95` | `90` / `95` | Medium-emphasis text/icons on `tertiary-fixed` |
| **Deprecated / Legacy** | | | | | | | | |
| `surface-variant` *(depr.)* | `neutral-variant`| **90** | **30** | `#E7E0EC` | `#49454F` | — | — | **Deprecated**: Replace with `surface-container-highest` |
| `surface-tint` *(depr.)* | `primary` | **40** | **80** | `#6750A4` | `#D0BCFF` | — | — | **Deprecated**: Opacity tint overlay replaced by `surface-container-*` |
| `background` *(legacy)* | `neutral` | **98** | **6** | `#FEF7FF` | `#141218` | — | — | Legacy alias for `surface` |
| `on-background` *(legacy)* | `neutral` | **10** | **90** | `#1D1B20` | `#E6E0E9` | — | — | Legacy alias for `on-surface` |

---

## Tone-Based Surface Hierarchy & Migration

In Feb 2023, Material 3 replaced the opacity-based `primary` tint overlay model (surfaces at `+1` to `+5` elevation) with **tone-based surface container roles** decoupled from z-axis elevation.

| Legacy Elevation / Role | Replacement Role (`md.sys.color.*`) | Default Component Mappings |
|---|---|---|
| *(New role)* | `surface-container-lowest` (Light T100 / Dark T4) | Deepest recessed wells or low-emphasis cards on `surface` |
| Surface at `+1` elevation (`1dp`) | `surface-container-low` (Light T96 / Dark T10) | Elevated Button, Elevated Card, Elevated Chip, Modal Bottom Sheet, Modal Side Sheet, Modal Navigation Drawer |
| Surface at `+2` elevation (`3dp`) | `surface-container` (Light T94 / Dark T12) | Navigation Bar, Top App Bar (scrolled), Bottom App Bar, Menu, Navigation Rail (or `surface`) |
| Surface at `+3` elevation (`6dp`) | `surface-container-high` (Light T92 / Dark T17) | Basic Dialog, Date Picker, Time Picker, Search Bar / Search View, Surface FAB, Rich Tooltip |
| Surface at `+4` / `+5` (`8dp` / `12dp`) | `surface-container-highest` (Light T90 / Dark T22) *(or `surface-container-high` / `surface-dim`)* | Filled Card, Filled TextField container, Switch unselected track |
| `surface-variant` | `surface-container-highest` (Light T90 / Dark T22) | Replaced `surface-variant` for container fills |

### Surface Bright & Surface Dim Behavior
- Standard `surface` **inverts** relative brightness between themes: it is the brightest background in Light theme (Tone `98`) and near-dimmest in Dark theme (Tone `6`).
- `surface-bright` (Light Tone `98`, Dark Tone `24`) and `surface-dim` (Light Tone `87`, Dark Tone `6`) **preserve their relative brightness** across both Light and Dark themes. A pane mapped to `surface-bright` alongside a navigation rail mapped to `surface-dim` remains the brighter region in both Light and Dark modes.
- **Cross-breakpoint consistency**: Keep surface role mappings identical for layout regions across mobile, foldable, and desktop breakpoints (e.g., body pane = `surface`, navigation region = `surface-container`), adding supplementary `surface-container-*` roles only when multi-pane hierarchy requires nested containment.

---

## Interaction State Layers (`md.sys.state.*`)

Interactive state changes (hover, focus, press, drag) are rendered by placing a semi-transparent **state layer** between the **container** (1) and the **content** (3).
- **State layer color**: Always uses the **content ("On") color role** (e.g., on a `secondary-container` button with `on-secondary-container` text, the state layer color is `on-secondary-container`; on a `surface` button with `primary` text, the state layer color is `primary`).
- **Only one state layer** is shown at a time.

| State | Opacity Token | Opacity / Value | Notes |
|---|---|---|---|
| **Hover** | `md.sys.state.hover.state-layer-opacity` | `0.08` (`8%`) | Cursor pause over interactive action/selection/input element |
| **Focus** | `md.sys.state.focus.state-layer-opacity` | `0.10` (`10%`) | Plus keyboard focus ring: thickness `3dp`, outer offset `2dp`, inner offset `-3dp` |
| **Pressed** | `md.sys.state.pressed.state-layer-opacity` | `0.10` (`10%`) | Ripple / pressed overlay on tap, click, or Enter/Space |
| **Dragged** | `md.sys.state.dragged.state-layer-opacity` | `0.16` (`16%`) | Applied to draggable cards, chips, list items, sliders |
| **Disabled (Content)** | `md.sys.state.disabled.state-layer-opacity` | `0.38` (`38%`) | Disabled text/icons use `on-surface` at `38%` opacity |
| **Disabled (Container)**| *(Component-level token)* | `0.12` (`12%`) | Disabled container fills/outlines typically use `on-surface` at `12%` opacity (0dp elevation) |

---

## Three Contrast Levels & Accessibility Rules

1. **Standard Contrast (Default)**: Uses mixed high and low contrast pairings to establish visual hierarchy and reduce cognitive load.
2. **Medium Contrast**: Guarantees a minimum **3:1** contrast ratio on container boundaries and raises text contrast for users who need stronger separation without suffering from halation (light bleed from extreme contrast).
3. **High Contrast**: Enforces **$\ge 7:1$** contrast on essential foreground content and interactive controls while keeping non-essential outer containers subtle to minimize distraction.

### Contrast Requirements (WCAG & M3)
- **Small text** ($< 18\text{pt}$ regular or $< 14\text{pt}$ bold): **$\ge 4.5:1$** against its background.
- **Large text** ($\ge 18\text{pt}$ regular or $\ge 14\text{pt}$ bold) & **essential icons/graphics**: **$\ge 3.0:1$** against its background.
- **Clustered non-text components** (e.g., a row or group of adjacent buttons or chips): Each container **must achieve $\ge 3.0:1$ contrast** against the underlying surface so users can distinguish individual targets.
- **Standalone prominent components** (e.g., a single floating FAB with shadow): Exempt from the 3:1 container-to-surface requirement because spatial isolation and elevation already distinguish the target (its inner icon/label still must meet contrast against the FAB container).
- **Disabled elements & decorative graphics**: Exempt from minimum contrast ratios.

---

## Advanced Customizations: Custom Colors, Fidelity & Harmonization

### 1. Defining Static (Custom / Extended) Colors
For semantic states beyond Error (e.g., `success` green, `warning` yellow/orange) or locked brand accents:
- Input a seed color into Material Theme Builder or MCU to generate **4 derived roles** matching standard accent conventions:
  - `<name>` (Light Tone `40` / Dark Tone `80`)
  - `on-<name>` (Light Tone `100` / Dark Tone `20`)
  - `<name>-container` (Light Tone `90` / Dark Tone `30`)
  - `on-<name>-container` (Light Tone `30` / Dark Tone `90`)
- Never use raw single hex values on surfaces; always use the 4-role group so Light/Dark mode and Medium/High contrast work automatically.

### 2. Color Fidelity ("Color Match")
- Standard tonal algorithms clamp chroma and force fixed tones, which can make a dark purple or bright yellow brand seed look washed out or shifted in container slots.
- Enabling **Color Fidelity** (`SchemeFidelity` / "Match color" in MTB) dynamically adjusts the tones of container and accent roles to closely match the input color's actual tone and chroma while dynamically shifting the paired `on-*` role to preserve required contrast.

### 3. Color Harmonization (`Blend.harmonize`)
- When static semantic colors (e.g., green `success`, orange `warning`) appear alongside a dynamic user-generated scheme, their raw hues may visually clash with the user's wallpaper color.
- **Harmonization** shifts the hue of the static color slightly toward the dynamic `primary` hue on the 360° HCT wheel (making it slightly warmer or cooler) while clamping the maximum hue rotation (max `15°` in MCU `Blend.harmonize`) so the color never loses its semantic identity (yellow stays yellow and never becomes green; red stays red and never becomes purple).
- **Exception**: Do **not** harmonize colors tied to literal real-world signage (e.g., official subway line colors) or strict trademarked logos.

### 4. Defining Custom Color Roles
- If the 26+ standard roles and 4-role static extensions are insufficient, define a `DynamicColor` role in MCU by specifying:
  1. Reference `TonalPalette` (`primary`, `secondary`, `tertiary`, `neutral`, `neutralVariant`, `error`).
  2. Reference tone function for Light and Dark themes (e.g., `primary` Tone `50`).
  3. Background pairing relationship and minimum contrast curve (`ContrastCurve`) so user-controlled contrast adjusts it automatically.

---

## Do / Don't / Caution Rules

- **✅ Do** pair every container/surface role strictly with its corresponding `on-*` role (e.g., `primary` + `on-primary`, `secondary-container` + `on-secondary-container`, `surface-container-*` + `on-surface` / `on-surface-variant`). This guarantees legibility across Light, Dark, Medium Contrast, and High Contrast modes.
- **❌ Don't** mix mismatched roles (e.g., placing `primary-container` text on `primary`, or `on-surface` text on `secondary-container`). Mismatched pairs become illegible when contrast levels or dynamic schemes change.
- **✅ Do** use `outline` (Tone 50 Light / Tone 60 Dark, $\ge 3:1$ contrast) for important interactive boundaries like Outlined TextFields, Input Chips, and Filter Chips.
- **❌ Don't** use `outline` for decorative dividers or multi-element containers like Outlined Cards — use `outline-variant` (Tone 80 Light / Tone 30 Dark) instead.
- **❌ Don't** use `outline-variant` as the sole boundary of interactive targets unless the inner text/icons already provide $\ge 4.5:1$ contrast (⚠️ **Caution**: `outline-variant` is acceptable on chip/button borders *only* when inner content meets 4.5:1 contrast).
- **❌ Don't** use `*-fixed` roles (like `primary-fixed`) for buttons or elements where high contrast against `surface` is required in both themes, because `*-fixed` does not invert in Dark mode.
- **✅ Do** keep the source image visible on screen whenever applying a content-based dynamic color scheme, and limit any screen to **at most 2 color schemes** (e.g., 1 user-generated base scheme + 1 content-based local scheme).
- **❌ Don't** replace semantic colors (such as red `error` or green `success` states) with content-based dynamic colors.

---

## Implementation Notes

### Jetpack Compose (`androidx.compose.material3`)
```kotlin
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext

@Composable
fun AppTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        darkTheme -> darkColorScheme()
        else -> lightColorScheme()
    }
    MaterialTheme(colorScheme = colorScheme, content = content)
}
// Access roles via MaterialTheme.colorScheme.primary, .surfaceContainerHigh, .onPrimaryContainer, etc.
// Never use deprecated ColorScheme.surfaceColorAtElevation(); use surfaceContainerLowest..surfaceContainerHighest.
```

### Flutter (`material` & `dynamic_color`)
```dart
// Seed-based static or content scheme (uses HCT / MCU under the hood):
final lightScheme = ColorScheme.fromSeed(
  seedColor: const Color(0xFF6750A4),
  brightness: Brightness.light,
  dynamicSchemeVariant: DynamicSchemeVariant.tonalSpot, // or .fidelity, .vibrant, .expressive
);

// Wallpaper dynamic color via `dynamic_color` package:
DynamicColorBuilder(
  builder: (ColorScheme? lightDynamic, ColorScheme? darkDynamic) {
    return MaterialApp(
      theme: ThemeData(colorScheme: lightDynamic ?? lightScheme, useMaterial3: true),
      darkTheme: ThemeData(colorScheme: darkDynamic ?? darkScheme, useMaterial3: true),
      home: const HomeScreen(),
    );
  },
);
```

### Material Web & CSS Custom Properties (`--md-sys-color-*`)
```css
:root, :host {
  /* Primary */
  --md-sys-color-primary: #6750A4;
  --md-sys-color-on-primary: #FFFFFF;
  --md-sys-color-primary-container: #EADDFF;
  --md-sys-color-on-primary-container: #4F378B;
  /* Secondary */
  --md-sys-color-secondary: #625B71;
  --md-sys-color-on-secondary: #FFFFFF;
  --md-sys-color-secondary-container: #E8DEF8;
  --md-sys-color-on-secondary-container: #4A4458;
  /* Tertiary */
  --md-sys-color-tertiary: #7D5260;
  --md-sys-color-on-tertiary: #FFFFFF;
  --md-sys-color-tertiary-container: #FFD8E4;
  --md-sys-color-on-tertiary-container: #633B48;
  /* Error */
  --md-sys-color-error: #B3261E;
  --md-sys-color-on-error: #FFFFFF;
  --md-sys-color-error-container: #F9DEDC;
  --md-sys-color-on-error-container: #8C1D18;
  /* Surfaces */
  --md-sys-color-surface: #FEF7FF;
  --md-sys-color-surface-dim: #DED8E1;
  --md-sys-color-surface-bright: #FEF7FF;
  --md-sys-color-surface-container-lowest: #FFFFFF;
  --md-sys-color-surface-container-low: #F7F2FA;
  --md-sys-color-surface-container: #F3EDF7;
  --md-sys-color-surface-container-high: #ECE6F0;
  --md-sys-color-surface-container-highest: #E6E0E9;
  --md-sys-color-on-surface: #1D1B20;
  --md-sys-color-on-surface-variant: #49454F;
  /* Outline, Inverse, Utility */
  --md-sys-color-outline: #79747E;
  --md-sys-color-outline-variant: #CAC4D0;
  --md-sys-color-inverse-surface: #322F35;
  --md-sys-color-inverse-on-surface: #F5EFF7;
  --md-sys-color-inverse-primary: #D0BCFF;
  --md-sys-color-scrim: #000000;
  --md-sys-color-shadow: #000000;
}

@media (prefers-color-scheme: dark) {
  :root, :host {
    --md-sys-color-primary: #D0BCFF;
    --md-sys-color-on-primary: #381E72;
    --md-sys-color-primary-container: #4F378B;
    --md-sys-color-on-primary-container: #EADDFF;
    --md-sys-color-secondary: #CCC2DC;
    --md-sys-color-on-secondary: #332D41;
    --md-sys-color-secondary-container: #4A4458;
    --md-sys-color-on-secondary-container: #E8DEF8;
    --md-sys-color-tertiary: #EFB8C8;
    --md-sys-color-on-tertiary: #492532;
    --md-sys-color-tertiary-container: #633B48;
    --md-sys-color-on-tertiary-container: #FFD8E4;
    --md-sys-color-error: #F2B8B5;
    --md-sys-color-on-error: #601410;
    --md-sys-color-error-container: #8C1D18;
    --md-sys-color-on-error-container: #F9DEDC;
    --md-sys-color-surface: #141218;
    --md-sys-color-surface-dim: #141218;
    --md-sys-color-surface-bright: #3B383E;
    --md-sys-color-surface-container-lowest: #0F0D13;
    --md-sys-color-surface-container-low: #1D1B20;
    --md-sys-color-surface-container: #211F26;
    --md-sys-color-surface-container-high: #2B2930;
    --md-sys-color-surface-container-highest: #36343B;
    --md-sys-color-on-surface: #E6E0E9;
    --md-sys-color-on-surface-variant: #CAC4D0;
    --md-sys-color-outline: #938F99;
    --md-sys-color-outline-variant: #49454F;
    --md-sys-color-inverse-surface: #E6E0E9;
    --md-sys-color-inverse-on-surface: #322F35;
    --md-sys-color-inverse-primary: #6750A4;
  }
}
```

---

**Further reading:** `docs/pages/color.md`, `docs/pages/color-roles.md`, `docs/pages/choosing-a-scheme.md`, `docs/pages/dynamic.md`, `docs/pages/static.md`, `docs/pages/advanced.md`, `docs/pages/color-resources.md`, `docs/pages/designing.md`, `docs/blog/tone-based-surface-color-m3.md`, `docs/blog/science-of-color-design.md`, `docs/blog/dynamic-color-harmony.md`, `tokens/sys-tokens.md`.
