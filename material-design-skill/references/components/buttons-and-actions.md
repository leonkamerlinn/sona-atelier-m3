# Buttons & Action Components

Buttons, icon buttons, split buttons, button groups, and segmented buttons trigger discrete actions, binary toggles, menu options, and view selections across Material Design 3 (M3) and M3 Expressive.

Sources: https://m3.material.io/components/all-buttons, https://m3.material.io/components/buttons/{overview,specs,guidelines,accessibility}, https://m3.material.io/components/icon-buttons/{overview,specs,guidelines,accessibility}, https://m3.material.io/components/split-button/{overview,specs,guidelines,accessibility}, https://m3.material.io/components/button-groups/{overview,specs,guidelines,accessibility}, https://m3.material.io/components/segmented-buttons/{overview,specs,guidelines,accessibility}

---

## 1. All Buttons Overview & Decision Matrix

M3 defines **10 button types** across three emphasis levels, plus legacy **Segmented buttons** (replaced by Connected button groups in M3 Expressive) and **Toolbars** (for multi-control action bars).

### Component Decision Matrix

| Emphasis | Component | When to Use | When NOT to Use | Example Actions |
|---|---|---|---|---|
| **Highest** | **FAB / Extended FAB / FAB menu** | Primary, constructive, screen-level action that persists over scrolling content (`1` per screen). Use Extended FAB when a text label is needed; use FAB menu for `2–6` closely related primary sub-actions. | Destructive/minor actions (`Trash`, `Cut`), inside cards/dialogs, or multiple per screen. | `Create`, `Compose`, `New thread`, `New file` |
| **High** | **Button (Filled)** | Most prominent non-floating action; final or unblocking step in a flow. | More than one primary filled action in the same view/group without clear hierarchy. | `Save`, `Confirm`, `Done`, `Make payment` |
| **High** | **Split button** | Key action that also offers a secondary dropdown menu of related alternative actions. | Actions without secondary options, or when trailing icon is changed from the expand chevron. | `Send` (+ Schedule send), `Add`, `Create` |
| **High / Med** | **Standard button group** | Grouping related buttons/icon buttons that need expressive spring width interaction on press/selection. | Unrelated actions, wrapping multi-line rows, or text/standard icon buttons without containers. | `Back / Play / Next`, `Call controls` |
| **Medium** | **Button (Tonal)** | Secondary color mapping (`secondary-container`); final/unblocking or supporting actions needing less visual weight than Filled. | As the sole hero action when high primary contrast is required. | `Save`, `Next` (onboarding), `Sign in` |
| **Medium** | **Button (Elevated)** | Tonal button with a shadow (`level1`); **only** when visual separation is required over patterned/image/scrim backgrounds. | Flat surfaces where Tonal or Outlined suffices (avoid shadow overuse). | `Reply`, `Add to cart` (over media) |
| **Medium** | **Button (Outlined)** | Important secondary action paired with a Filled button, or an escape/cancel action in a flow. | Visually busy image/video backgrounds without a custom contrasting fill; directly adjacent to chips. | `View all`, `Cancel`, `Reply`, `Take out of trash` |
| **Low** | **Connected button group** *(replaces Segmented button)* | Switching views, sorting, or single/multi-selecting between `2–5` closely related toggle options. | Non-toggleable action buttons, `>5` options (use Chips), or mixed color styles. | `Walk / Bike / Drive`, `Day / Week / Month` |
| **Low** | **Button (Text)** | Lowest-priority supplementary actions in cards, dialogs, and snackbars. | Primary flow actions, toggle states (Text has no toggle variant), or inline body links (use hyperlinks). | `Learn more`, `Cancel` (dialog), `Retry` |
| **Low–High** | **Icon button (Standard / Outlined / Tonal / Filled)** | Compact single-tap actions (`Bookmark`, `Search`, `Close`, `Favorite` toggle) in app bars, toolbars, cards, or groups. | Ambiguous icons without clear system meaning. | `Add to Favorites`, `Print`, `Share` |
| **Container** | **Toolbar (Docked / Floating)** | Persistent or floating cluster of multiple frequent page actions (replaces Bottom app bar). | Single primary action (use FAB) or primary navigation (use Navigation bar/rail). | Text formatting, canvas tools, media controls |

### Visual Hierarchy & Placement Rules
- **One high-emphasis action per screen**: Combine styles to establish hierarchy (e.g., `Extended FAB` for screen hero + `Filled` for card primary + `Text` for card secondary).
- **Pairing order (LTR)**: Place lower-emphasis buttons to the **leading (left)** side of higher-emphasis buttons:
  - **✅ Do**: `Text` (left) + `Filled` (right); `Outlined` (left) + `Filled` (right); `Text` (left) + `Outlined` (right).
  - **❌ Don't**: Stack a filled button vertically above a text button when horizontal space allows side-by-side placement.

---

## 2. Buttons (`common-buttons`)

 Token sets: `md.comp.button.{xsmall,small,medium,large,xlarge}` + `md.comp.button.{elevated,filled,tonal,outlined,text}` (replaces deprecated `md.comp.{elevated,filled,filled-tonal,outlined,text}-button` and baseline `md.comp.button`).

### Variants & Configurations
- **Variants**:
  - **Default**: Triggers an immediate action; returns to rest state after press.
  - **Toggle (selection)** *(M3 Expressive)*: Binary selection (`Save`/`Saved`, `Start`/`Stop`, `Favorite`). Changes color and morphs resting shape between Round and Square when selected. **Not available for Text buttons.**
- **Shapes**: **Round** (`md.sys.shape.corner.full`, default) and **Square** (size-dependent corner radius). Both morph to a sharper corner radius while pressed.

### 5 Sizes & Exact Measurements (M3 Expressive)

| Size | Token Prefix | Height | Horiz. Padding (Lead/Trail) | Icon Size | Icon–Label Gap | Typography Role (Size / Line / Weight / Track) | Outlined Stroke | Round Radius | Square Radius | Pressed Radius | Selected Radius (Round → / Square →) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **XS** | `md.comp.button.xsmall` | `32dp` (`48dp` target) | `12dp` | `20dp` | `4dp` (`space50`) | `label-large` (`14pt` / `20pt` / `500` / `0.1pt`) | `1dp` | `full` | `12dp` (`corner.medium`) | `8dp` (`corner.small`) | `12dp` / `full` |
| **S (Default)** | `md.comp.button.small` | `40dp` (`48dp` target) | `16dp` (`space200`)* | `20dp`† | `8dp` (`space100`) | `label-large` (`14pt` / `20pt` / `500` / `0.1pt`) | `1dp` | `full` | `12dp` (`corner.medium`) | `8dp` (`corner.small`) | `12dp` / `full` |
| **M** | `md.comp.button.medium` | `56dp` | `24dp` (`space300`) | `24dp` | `8dp` (`space100`) | `title-medium` (`16pt` / `24pt` / `500` / `0.15pt`) | `1dp` | `full` | `16dp` (`corner.large`) | `12dp` (`corner.medium`) | `16dp` / `full` |
| **L** | `md.comp.button.large` | `96dp` | `48dp` (`space600`) | `32dp` | `12dp` (`space150`) | `headline-small` (`24pt` / `32pt` / `400` / `0pt`) | `2dp` | `full` | `28dp` (`corner.extra-large`) | `16dp` (`corner.large`) | `28dp` / `full` |
| **XL** | `md.comp.button.xlarge` | `136dp` | `64dp` (`space800`) | `40dp` | `16dp` (`space200`) | `headline-large` (`32pt` / `40pt` / `400` / `0pt`) | `3dp` | `full` | `28dp` (`corner.extra-large`) | `16dp` (`corner.large`) | `28dp` / `full` |

*\*Small button padding change: M3 Expressive recommends `16dp` horizontal padding (`md.comp.button.small.leading/trailing-space`) to align with the new size scale. Legacy baseline M3 `24dp` padding (`md.comp.button.leading/trailing-space`, and `12dp` text button padding) is no longer recommended.*  
*†Legacy deprecated `md.comp.*-button.with-icon.icon.size` was `18dp`; M3 Expressive standardizes XS and S icon size to `20dp`.*

### 5 Color Styles & State Roles

Custom color roles (e.g., `tertiary` / `on-tertiary`) are permitted if container-to-text contrast is at least **3:1**.

| Style | Element | Default (Non-Toggle) | Toggle: Unselected | Toggle: Selected | Elevation (Rest / Hover / Focus / Press / Disabled) |
|---|---|---|---|---|---|
| **Elevated** (`md.comp.button.elevated`) | Container | `surface-container-low` (`#F7F2FA` / `#1D1B20`) | `surface-container-low` (`#F7F2FA` / `#1D1B20`) | `primary` (`#6750A4` / `#D0BCFF`) | `1dp` / `3dp` / `1dp` / `1dp` / `0dp` |
| | Label & Icon | `primary` (`#6750A4` / `#D0BCFF`) | `primary` (`#6750A4` / `#D0BCFF`) | `on-primary` (`#FFFFFF` / `#381E72`) | |
| **Filled** *(default)* (`md.comp.button.filled`) | Container | `primary` (`#6750A4` / `#D0BCFF`) | `surface-container` (`#F3EDF7` / `#211F26`) | `primary` (`#6750A4` / `#D0BCFF`) | `0dp` / `1dp` / `0dp` / `0dp` / `0dp` |
| | Label & Icon | `on-primary` (`#FFFFFF` / `#381E72`) | `on-surface-variant` (`#49454F` / `#CAC4D0`) | `on-primary` (`#FFFFFF` / `#381E72`) | |
| **Tonal** (`md.comp.button.tonal`) | Container | `secondary-container` (`#E8DEF8` / `#4A4458`) | `secondary-container` (`#E8DEF8` / `#4A4458`) | `secondary` (`#625B71` / `#CCC2DC`) | `0dp` / `1dp` / `0dp` / `0dp` / `0dp` |
| | Label & Icon | `on-secondary-container` (`#4A4458` / `#E8DEF8`) | `on-secondary-container` (`#4A4458` / `#E8DEF8`) | `on-secondary` (`#FFFFFF` / `#332D41`) | |
| **Outlined** (`md.comp.button.outlined`)* | Container / Outline | Transparent; stroke `outline-variant` (`#CAC4D0` / `#49454F`) | Transparent; stroke `outline-variant` (`#CAC4D0` / `#49454F`) | Fill `inverse-surface` (`#322F35` / `#E6E0E9`), no stroke | `0dp` all states |
| | Label & Icon | `on-surface-variant` (`#49454F` / `#CAC4D0`) | `on-surface-variant` (`#49454F` / `#CAC4D0`) | `inverse-on-surface` (`#F5EFF7` / `#322F35`) | |
| **Text** (`md.comp.button.text`) | Container | Transparent (visible only on state layer) | *N/A — no toggle variant* | *N/A — no toggle variant* | `0dp` all states |
| | Label & Icon | `primary` (`#6750A4` / `#D0BCFF`) | *N/A* | *N/A* | |

*\*Outlined button token update: M3 Expressive `md.comp.button.outlined` uses `outline-variant` (`#CAC4D0`/`#49454F`) for the stroke and `on-surface-variant` (`#49454F`/`#CAC4D0`) for label/icon. Deprecated `md.comp.outlined-button` used `outline` (`#79747E`/`#938F99`) for the stroke and `primary` (`#6750A4`/`#D0BCFF`) for label/icon.*

### Interaction States & Motion
- **State layer color**: Always matches the current state's label/icon color (`primary`, `on-primary`, `on-secondary-container`, `on-surface-variant`, `inverse-on-surface`).
- **State layer opacity**: Hover `0.08` (`8%`), Focus `0.10` (`10%`), Pressed `0.10` (`10%`), Dragged `0.16` (`16%`, legacy filled).
- **Disabled state**:
  - Container: `on-surface` (`#1D1B20` / `#E6E0E9`) at `0.10` (`10%`) opacity (`0.12` in deprecated token sets); transparent for Outlined (unless selected) and Text.
  - Label & Icon: `on-surface` at `0.38` (`38%`) opacity.
  - Outlined stroke: `outline-variant` (`on-surface` at `0.12` opacity in deprecated `md.comp.outlined-button`).
- **Focus indicator**: `md.sys.color.secondary` (`#625B71` / `#CCC2DC`), thickness `3dp` (`md.sys.state.focus-indicator.thickness`), outer offset `2dp` (`md.sys.state.focus-indicator.outer-offset`).
- **Pressed corner morph spring**: `md.sys.motion.spring.fast.spatial` (`damping: 0.9`, `stiffness: 1400`).

### Anatomy, Behavior & Guidelines
- **Label text**: Keep concise (`1–3` words), sentence case (capitalize first word and proper nouns only, e.g., **Book with Flights**, never `BOOK WITH FLIGHTS`). Must remain on a single line; never wrap or truncate at 100% scale.
- **Icon (optional)**: Leading side only (left in LTR, right in RTL). Toggle buttons use an **outlined** icon when unselected and a **filled** icon (or increased weight) when selected.
- **Adaptive**: Width dynamically hugs label text or stretches to layout grid columns, keeping icon and label grouped and centered together.
- **✅ Do / ❌ Don't / ⚠️ Caution**:
  - **✅ Do**: Keep toggle button labels similar in character count between unselected and selected states (e.g., `Start` / `Reset`).
  - **✅ Do**: Keep icon and label grouped and horizontally centered when a button stretches across a column.
  - **❌ Don't**: Change toggle label length dramatically (e.g., `Start` → `Reset back to beginning`), wrap label text onto multiple lines, allow label text to overflow a fixed-width container, ungroup icon and label to opposite edges, over-stretch buttons across wide screens, vertically stack icon above text, or place two icons in one button.
  - **⚠️ Caution**: Outlined buttons look very similar to chips—prefer Filled or Tonal buttons near chips. Avoid placing Outlined or Text buttons over busy images without a contrasting container fill.

---

## 3. Icon Buttons (`icon-buttons`)

Token sets: `md.comp.icon-button.{xsmall,small,medium,large,xlarge}` + `md.comp.icon-button.{filled,tonal,outlined,standard}` (replaces deprecated `md.comp.{filled,filled-tonal}-icon-button`, `md.outlined-icon-button`, and baseline `md.comp.icon-button`).

### Variants, Shapes & Icon Rules
- **Variants**: **Default** (opens menus, search, dialogs; uses filled icon) and **Toggle (selection)** (binary state like Favorite/Bookmark; uses **outlined** icon when unselected and **filled** icon when selected).
- **Accessibility icon weight rule**: In toggle icon buttons, if a filled version of an icon does not exist for the selected state, increase icon weight to **semibold** (or **bold** if semibold is insufficient) so selection is communicated by at least two visual properties (not color alone).
- **Shapes**: **Round** (`full`, default) and **Square**. Morphs corner radius on press and flips between Round and Square when toggled (`damping: 0.9`, `stiffness: 1400`).

### 5 Sizes × 3 Widths Matrix (M3 Expressive)

Total container width = `leading-space + icon.size + trailing-space`.

| Size | Token Prefix | Height | Icon Size | Narrow Width (Pad) | Default Width (Pad) | Wide Width (Pad) | Outlined Stroke | Round Radius | Square Radius | Pressed Radius | Selected (Round → / Square →) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **XS** | `md.comp.icon-button.xsmall` | `32dp` (`48dp` target) | `20dp` | `28dp` (`4dp`) | `32dp` (`6dp`) | `40dp` (`10dp`) | `1dp` | `full` | `12dp` | `8dp` | `12dp` / `full` |
| **S (Default)** | `md.comp.icon-button.small` | `40dp` (`48dp` target) | `24dp` | `32dp` (`4dp`) | `40dp` (`8dp`) | `52dp` (`14dp`) | `1dp` | `full` | `12dp` | `8dp` | `12dp` / `full` |
| **M** | `md.comp.icon-button.medium` | `56dp` | `24dp` | `48dp` (`12dp`) | `56dp` (`16dp`) | `72dp` (`24dp`) | `1dp` | `full` | `16dp` | `12dp` | `16dp` / `full` |
| **L** | `md.comp.icon-button.large` | `96dp` | `32dp` | `64dp` (`16dp`) | `96dp` (`32dp`) | `128dp` (`48dp`) | `2dp` | `full` | `28dp` | `16dp` | `28dp` / `full` |
| **XL** | `md.comp.icon-button.xlarge` | `136dp` | `40dp` | `104dp` (`32dp`) | `136dp` (`48dp`) | `184dp` (`72dp`) | `3dp` | `full` | `28dp` | `16dp` | `28dp` / `full` |

### 4 Color Styles (in order of emphasis)

| Style | Element | Default (Non-Toggle) | Toggle: Unselected | Toggle: Selected |
|---|---|---|---|---|
| **1. Filled** *(default)* (`md.comp.icon-button.filled`)* | Container | `primary` (`#6750A4` / `#D0BCFF`) | `surface-container` (`#F3EDF7` / `#211F26`) | `primary` (`#6750A4` / `#D0BCFF`) |
| | Icon & State Layer | `on-primary` (`#FFFFFF` / `#381E72`) | `on-surface-variant` (`#49454F` / `#CAC4D0`) | `on-primary` (`#FFFFFF` / `#381E72`) |
| **2. Tonal** (`md.comp.icon-button.tonal`)* | Container | `secondary-container` (`#E8DEF8` / `#4A4458`) | `secondary-container` (`#E8DEF8` / `#4A4458`) | `secondary` (`#625B71` / `#CCC2DC`) |
| | Icon & State Layer | `on-secondary-container` (`#4A4458` / `#E8DEF8`) | `on-secondary-container` (`#4A4458` / `#E8DEF8`) | `on-secondary` (`#FFFFFF` / `#332D41`) |
| **3. Outlined** (`md.comp.icon-button.outlined`)* | Container / Outline | Transparent; stroke `outline-variant` (`#CAC4D0` / `#49454F`) | Transparent; stroke `outline-variant` (`#CAC4D0` / `#49454F`) | Fill `inverse-surface` (`#322F35` / `#E6E0E9`), no stroke |
| | Icon & State Layer | `on-surface-variant` (`#49454F` / `#CAC4D0`) | `on-surface-variant` (`#49454F` / `#CAC4D0`) | `inverse-on-surface` (`#F5EFF7` / `#322F35`) |
| **4. Standard** (`md.comp.icon-button.standard`) | Container | Transparent (state layer visible on interaction) | Transparent | Transparent |
| | Icon & State Layer | `on-surface-variant` (`#49454F` / `#CAC4D0`) | `on-surface-variant` (`#49454F` / `#CAC4D0`) | `primary` (`#6750A4` / `#D0BCFF`) |

*\*Deprecated token differences: Legacy `md.comp.filled-icon-button` used `surface-container-highest` + `primary` when unselected; legacy `md.comp.filled-tonal-icon-button` used `surface-container-highest` + `on-surface-variant` when unselected and `secondary-container` + `on-secondary-container` when selected; legacy `md.outlined-icon-button` used `outline` (`#79747E`/`#938F99`) for the unselected stroke.*

### States, Badges, Tooltips & Accessibility
- **State layers**: Hover `0.08` (`8%`), Focus `0.10` (`10%`), Pressed `0.10` (`10%`). Disabled container: `on-surface` at `0.10` (`10%`) opacity; Disabled icon: `on-surface` at `0.38` (`38%`) opacity; Outlined disabled stroke: `outline-variant`.
- **Tooltips**: Required on web hover/focus; must describe the **action** (e.g., `Add to favorites`), never the icon's literal name (e.g., `Heart`).
- **Badges**: Supported on standard/contained icon buttons inside app bars, toolbars, and navigation components to indicate counts or status.
- **Target size & density**: Must maintain at least a `48x48dp` (`48x48 CSS px`) touch target even when nested inside app bars or cards. **Never apply negative density to icon buttons by default**; only apply density when user-opted via a control that itself maintains a `48x48dp` target.
- **Contrast**: Icon or container must maintain at least **3:1** contrast against the surrounding surface.
- **❌ Don't**: Never use a toggle icon button for actions without a persistent selected state (such as opening an overflow menu).

---

## 4. Split Buttons (`split-button`)

New in M3 Expressive. Token sets: `md.comp.split-button.{xsmall,small,medium,large,xlarge}` + `md.comp.button.{elevated,filled,tonal,outlined}`.

### Anatomy & Configurations
- **Leading action button**: Contains `Label + Icon`, `Label only`, or `Icon only` (`1–2` words max). Uses standard button typography and icon sizes for its size class.
- **Trailing menu button**: Always contains the expand/collapse chevron icon (`keyboard_arrow_down`). **Never replace or modify the trailing icon.**
- **Color styles**: **Elevated**, **Filled**, **Tonal**, **Outlined** (no Text style). Uses `md.comp.button.*` color tokens.
  - **Selection color rule**: Unlike toggle buttons, activating the trailing menu button does **not** swap container/icon color roles—it only applies the `10%` (`0.10`) state layer, centers the icon, morphs the trailing button to a circle (`50%` radius), and rotates the chevron **180° inwards** using the **standard motion scheme** (not expressive).

### 5 Sizes & Asymmetric Corner / Offset Specs

The gap between leading and trailing buttons (`between-space`) is always **`2dp`** (`md.sys.measurement.space25`). Outer corners of the composite split button are always **`full` (`50%`)**.

| Size | Token Prefix | Height | Leading Button Pad (Lead / Trail) | Inner Corner (Rest) | Inner Corner (Hover / Press) | Trailing Pad (Lead & Trail) | Trailing Icon Size | Trailing Width | Trailing Icon Unselected Offset | Trailing Inner Corner (Selected) |
|---|---|---|---|---|---|---|---|---|---|---|
| **XS** | `md.comp.split-button.xsmall` | `32dp` (`48dp` target) | `12dp` / `10dp` | `4dp` (`extra-small`) | `8dp` (`small`) | `13dp` | `22dp` | `48dp` | `-1dp` from center | `50%` (full circle, `0dp` offset) |
| **S (Default)** | `md.comp.split-button.small` | `40dp` (`48dp` target) | `16dp` / `12dp` | `4dp` (`extra-small`) | `12dp` (`medium`) | `13dp` | `22dp` | `48dp` | `-1dp` from center | `50%` (full circle, `0dp` offset) |
| **M** | `md.comp.split-button.medium` | `56dp` | `24dp` / `24dp` | `4dp` (`extra-small`) | `12dp` (`medium`) | `15dp` | `26dp` | `56dp` | `-2dp` from center | `50%` (full circle, `0dp` offset) |
| **L** | `md.comp.split-button.large` | `96dp` | `48dp` / `48dp` | `8dp` (`small`) | `20dp` (`large-increased`) | `29dp` | `38dp` | `96dp` | `-3dp` from center | `50%` (full circle, `0dp` offset) |
| **XL** | `md.comp.split-button.xlarge` | `136dp` | `64dp` / `64dp` | `12dp` (`medium`) | `20dp` (`large-increased`) | `43dp` | `50dp` | `136dp` | `-6dp` from center | `50%` (full circle, `0dp` offset) |

### Menu Placement & Accessibility
- **Menu alignment**: Place the opened menu **`4dp`** away from the split button. Prefer aligning the menu's leading edge to the trailing button's leading edge; if space is tight, align to the trailing edge or top/bottom edges of the split button.
- **RTL**: Mirror component order (trailing menu button appears on the left; icon offset mirrors).
- **Accessibility**:
  - **Two distinct focus stops**: `Tab` focuses the leading button first, then the trailing menu button (`Space`/`Enter` activates the focused button).
  - **Target size**: Both the leading button and the trailing button must independently meet a **`48x48dp`** minimum touch target (XS and S trailing buttons are `48dp` wide by spec and require `48dp` vertical target extension).
  - **Labeling**: Leading button uses its visible text (e.g., `"Watch later"`). Trailing button must expose an contextual label (e.g., `"More watch options"`) plus `aria-expanded` / expanded-collapsed state.

---

## 5. Button Groups (`button-groups`)

New in M3 Expressive. Invisible layout containers that organize buttons and icon buttons in a single horizontal row (never wrap to a second line). Token sets: `md.comp.button-group.standard.{xsmall,small,medium,large,xlarge}` and `md.comp.button-group.connected.{xsmall,small,medium,large,xlarge}`.

### Standard vs. Connected Button Groups

| Property | Standard Button Group (`md.comp.button-group.standard.*`) | Connected Button Group (`md.comp.button-group.connected.*`) |
|---|---|---|
| **Purpose** | Groups related action or toggle buttons with interactive spring physics between neighbors. | Replaces **Segmented buttons** for single-select, multi-select, or selection-required view switching/filtering/sorting. |
| **Container Width** | Hugs the combined width of its child buttons. | Expands to span surface/container width (apply `max-width` on large screens). Min button width: `48dp`. |
| **Allowed Children** | Buttons and/or icon buttons (can mix widths and colors; **avoid Text buttons and Standard icon buttons** which lack containers). Keep same size and resting shape across items except for hero moments. | Toggle buttons or toggle icon buttons only (**never use if no buttons can be toggled**; **never mix color styles**). |
| **Neighbor Motion** | Pressed/selected button expands width by **`15%`** (`pressed.item.width.multiplier`), compressing adjacent buttons via `md.sys.motion.spring.fast.spatial` (`damping: 0.9`, `stiffness: 1400`) without shifting outer group bounds. | **No width interaction** between adjacent buttons; only the pressed/selected button's own corners morph. |

### Measurements & Corner Tokens by Size

| Size | Height | Standard Group Gap (`between-space`) | Connected Group Gap (`between-space`) | Connected Outer Shape (Round / Square) | Connected Inner Corner (Rest)* | Connected Inner Corner (Pressed) | Connected Inner Corner (Selected) |
|---|---|---|---|---|---|---|---|
| **XS** | `32dp` (`48dp` target) | `18dp` | `2dp` (`space25`) | `full` / `4dp` | `8dp` (`corner-value.small`) *(docs diagram: `4dp`)* | `4dp` (`corner-value.extra-small`) | `50%` (pill) |
| **S** | `40dp` (`48dp` target) | `12dp` (`space150`) | `2dp` (`space25`) | `full` / `8dp` | `8dp` (`corner-value.small`) | `4dp` (`corner-value.extra-small`) | `50%` (pill) |
| **M** | `56dp` | `8dp` (`space100`) | `2dp` (`space25`) | `full` / `8dp` | `8dp` (`corner-value.small`) | `4dp` (`corner-value.extra-small`) | `50%` (pill) |
| **L** | `96dp` | `8dp` (`space100`) | `2dp` (`space25`) | `full` / `16dp` | `16dp` (`corner-value.large`) | `12dp` (`corner-value.medium`) | `50%` (pill) |
| **XL** | `136dp` | `8dp` (`space100`) | `2dp` (`space25`) | `full` / `20dp` | `20dp` (`corner-value.large-increased`) | `16dp` (`corner-value.large`) | `50%` (pill) |

*\*Note: For XS Connected button groups, the resolved token `md.comp.button-group.connected.xsmall.inner-corner.corner-size` is `8dp` (`4dp` when pressed), whereas the visual spec diagram in `button-groups.md` annotates `4dp` at rest.*

### Adaptive Behavior & Accessibility
- **Resizing**: Supports **Fixed** (manual width/size/padding per breakpoint) or **Flexible** (buttons grow until reaching max width; do not stretch icon buttons beyond Wide). Trailing items can collapse into an overflow menu button at the trailing end on compact screens.
- **Accessibility**:
  - The group container itself is **not focusable** and needs no label.
  - **Keyboard**: `Tab` lands focus on the first button; **Arrow keys** navigate between buttons inside the group; `Space` or `Enter` activates/toggles the focused button.
  - **Touch targets**: XS (`18dp` gap) and S (`12dp` gap) standard groups use wider inner gaps to guarantee `48x48dp` targets—do not reduce these gaps.

---

## 6. Segmented Buttons (`segmented-buttons` — Legacy)

> **M3 Expressive Deprecation Note (May 2025)**: Segmented buttons (`md.comp.outlined-segmented-button`) are **no longer recommended**. Use **Connected button groups** (`md.comp.button-group.connected.*`) instead for all new M3 Expressive designs. Segmented button specs are retained below for baseline M3 maintenance.

### Variants, Anatomy & Measurements
- **Variants**: **Single-select** (`role="radiogroup"` / radio buttons; selects 1 option) and **Multi-select** (`role="group"` with `role="checkbox"` items; selects `0` to `all` options).
- **Segment count**: **`2–5` segments** (equal width = `container width / total segments`). For `>5` choices, use Chips.
- **Measurements & Tokens (`md.comp.outlined-segmented-button`)**:
  - **Height**: `40dp` (`48dp` touch target height). Each negative density step (`-1`, `-2`, `-3`) reduces height by `4dp` (`36dp`, `32dp`, `28dp`).
  - **Shape & Outline**: Outer container `md.sys.shape.corner.full`; stroke `1dp` `md.sys.color.outline` (`#79747E` / `#938F99`, must have **≥ 3:1** contrast with surface).
  - **Padding & Icons**: Min `12dp` horizontal padding; `8dp` gap between icon and label; icon size `18dp`. When a segment with both an icon and label text is selected, the leading icon is replaced by a **checkmark icon** (`check`).
  - **Typography**: `label-large` (`14pt` / `20pt`, weight `500`, tracking `0.1pt`), sentence case, centered.
  - **Colors**:
    - **Selected**: Container `secondary-container` (`#E8DEF8` / `#4A4458`), label & icon `on-secondary-container` (`#4A4458` / `#E8DEF8`).
    - **Unselected**: Container transparent, label & icon `on-surface` (`#1D1B20` / `#E6E0E9`).
    - **Disabled**: Outline `on-surface` at `0.12` opacity; label & icon `on-surface` at `0.38` opacity.
- **✅ Do / ❌ Don't**:
  - **✅ Do**: Keep labels short and consistent across all segments (all text, all icon-only, or all icon+text). Apply max-width/padding on large screens so segments don't stretch across the entire viewport.
  - **❌ Don't**: Use `>5` segments, wrap segments to a new line, or mix icon-only segments with text-only segments in the same bar.

---

## 7. Implementation Notes

### Platform API Mapping

| Component | Jetpack Compose (`androidx.compose.material3`) | Flutter (`package:flutter/material.dart`) | Material Web (`@material/web`) |
|---|---|---|---|
| **Buttons** | `Button`, `ElevatedButton`, `FilledTonalButton`, `OutlinedButton`, `TextButton`; M3 Expressive: `ToggleButton`, `ElevatedToggleButton`, `FilledTonalToggleButton`, `OutlinedToggleButton`, `ButtonDefaults` | `FilledButton`, `FilledButton.tonal`, `ElevatedButton`, `OutlinedButton`, `TextButton` (`*.icon` constructors) | `<md-filled-button>`, `<md-filled-tonal-button>`, `<md-elevated-button>`, `<md-outlined-button>`, `<md-text-button>` |
| **Icon Buttons** | `IconButton`, `FilledIconButton`, `FilledTonalIconButton`, `OutlinedIconButton`, `IconToggleButton`, `FilledIconToggleButton`, `FilledTonalIconToggleButton`, `OutlinedIconToggleButton` | `IconButton`, `IconButton.filled`, `IconButton.filledTonal`, `IconButton.outlined` (`isSelected` for toggle) | `<md-icon-button>`, `<md-filled-icon-button>`, `<md-filled-tonal-icon-button>`, `<md-outlined-icon-button>` (`toggle` attribute) |
| **Split Button** | `SplitButtonLayout`, `SplitButtonDefaults.LeadingButton`, `SplitButtonDefaults.TrailingButton` *(M3 Expressive)* | *(Custom / composite `Row` with `FilledButton` + `IconButton` in current stable SDK)* | *(Composite pattern)* |
| **Button Group** | `ButtonGroup`, `ConnectedButtonGroup` *(M3 Expressive)* | `SegmentedButton<T>` *(baseline; Connected group via custom theme/row)* | *(Custom container)* |
| **Segmented Button** | `SingleChoiceSegmentedButtonRow`, `MultiChoiceSegmentedButtonRow`, `SegmentedButton` | `SegmentedButton<T>`, `ButtonSegment<T>` | `<md-outlined-segmented-button-set>`, `<md-outlined-segmented-button>` |

### Minimal CSS Sketch (`--md-sys-*` Custom Properties)

```css
/* M3 Expressive Small Filled Button (Default & Toggle) + Press/Select Shape Morph */
.md-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px; /* md.comp.button.small.icon-label-space */
  height: 40px; /* md.comp.button.small.container.height */
  padding-inline: 16px; /* md.comp.button.small.leading/trailing-space (M3 Expressive) */
  border: none;
  border-radius: 9999px; /* md.sys.shape.corner.full (Round default) */
  background-color: var(--md-sys-color-primary, #6750A4);
  color: var(--md-sys-color-on-primary, #FFFFFF);
  font: 500 0.875rem / 1.25rem var(--md-sys-typescale-label-large-font, Roboto, sans-serif);
  letter-spacing: 0.1px;
  white-space: nowrap;
  cursor: pointer;
  position: relative;
  transition: border-radius 200ms cubic-bezier(0.2, 0, 0, 1), background-color 150ms linear;
}

/* Ensure 48x48dp minimum accessible touch target for XS (32dp) and S (40dp) */
.md-button::after {
  content: "";
  position: absolute;
  inset: min(0px, calc((40px - 48px) / 2));
}

/* Pressed shape morph (8dp for XS/S, 12dp for M, 16dp for L/XL) */
.md-button:active {
  border-radius: 8px; /* md.comp.button.small.pressed.container.shape */
}

/* Toggle Button states (Filled) */
.md-button[aria-pressed="false"] {
  background-color: var(--md-sys-color-surface-container, #F3EDF7);
  color: var(--md-sys-color-on-surface-variant, #49454F);
  border-radius: 9999px;
}
.md-button[aria-pressed="true"] {
  background-color: var(--md-sys-color-primary, #6750A4);
  color: var(--md-sys-color-on-primary, #FFFFFF);
  border-radius: 12px; /* md.comp.button.small.selected.container.shape.round */
}

/* Connected Button Group (replaces Segmented Button) */
.md-connected-button-group {
  display: inline-flex;
  gap: 2px; /* md.comp.button-group.connected.*.between-space */
}
.md-connected-button-group > .md-button {
  min-width: 48px;
  border-radius: 8px; /* inner-corner.corner-size (S/M) */
}
.md-connected-button-group > .md-button:first-child {
  border-start-start-radius: 9999px;
  border-end-start-radius: 9999px;
}
.md-connected-button-group > .md-button:last-child {
  border-start-end-radius: 9999px;
  border-end-end-radius: 9999px;
}
.md-connected-button-group > .md-button[aria-pressed="true"] {
  border-radius: 9999px; /* selected.inner-corner.corner-size = 50% */
}
```

---

Further reading: `docs/pages/all-buttons.md`, `docs/pages/common-buttons.md`, `docs/pages/icon-buttons.md`, `docs/pages/split-buttons.md`, `docs/pages/button-groups.md`, `docs/pages/segmented-buttons.md`, `tokens/components/buttons.md`, `tokens/components/icon-buttons.md`, `tokens/components/split-button.md`, `tokens/components/button-groups.md`, `tokens/components/segmented-buttons.md`.
