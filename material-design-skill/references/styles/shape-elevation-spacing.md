# Shape, Elevation, and Spacing

Material 3 and M3 Expressive structural style systems: the 10-step corner radius scale, 35-shape expressive library and shape morphing, 6-level z-axis elevation and tonal containment, and the `8dp`-multiplier (`space100`) spacing, grid, and density scales.

**Sources:**
- https://m3.material.io/styles/shape/overview-principles
- https://m3.material.io/styles/shape/corner-radius-scale
- https://m3.material.io/styles/shape/shape-morph
- https://m3.material.io/styles/elevation/overview
- https://m3.material.io/styles/elevation/applying-elevation
- https://m3.material.io/styles/elevation/tokens
- https://m3.material.io/styles/spacing/overview
- https://m3.material.io/styles/spacing/applying-spacing
- https://m3.material.io/styles/spacing/tokens
- https://m3.material.io/foundations/layout/grids-spacing/overview
- https://m3.material.io/foundations/layout/grids-spacing/grids
- https://m3.material.io/foundations/layout/grids-spacing/spacing
- https://m3.material.io/foundations/layout/grids-spacing/density

---

## When to Use / When Not to Use

| System / Feature | When to Use | When Not to Use |
|---|---|---|
| **Corner Radius Scale (`none` – `full`)** | All rectangular UI containers (buttons, cards, sheets, dialogs, text fields, carousels, menus). | Non-rectangular decorative avatars or badges that use the 35-shape expressive library. |
| **Asymmetric / Inner Corners (`.top`, `.start`, `.end`, `corner-value.*`)** | Bottom/side sheets anchored to screen edges (`.top` / `.start`), and closely grouped segments in Split Buttons, Button Groups, Segmented Buttons, and Menus. | Standalone floating containers that are not docked or grouped. |
| **35-Shape Library & Shape Morphing** | M3 Expressive hero moments, image/avatar masks, decorative badges, Loading Indicators, and interactive press/select morphing in Button Groups and Split Buttons. | Text-heavy or information-dense containers (e.g., multi-line cards or dialogs) where irregular edges clip content or impair legibility. |
| **Tonal Surface Elevation (`surface-container-*`)** | Default method in M3 to separate containment regions (app bars, nav bars, cards, dialogs) across Light and Dark themes. | Over busy photographic backgrounds where tonal difference alone lacks sufficient edge contrast (add a shadow or scrim). |
| **Drop Shadows (`md.sys.elevation.level1–5`)** | Protecting interactive elements (FABs, Elevated Buttons/Cards/Chips) over busy/patterned backgrounds, or signaling temporary lift on hover, focus, press, or drag. | Every surface by default. Overusing shadows creates visual noise; M3 reserves visible shadows for specific functional separation. |
| **Spacing Tokens (`md.sys.measurement.space*`)** | Container `padding` and inter-element `gap` across components and layout panes; layout-level `margin` and `spacer` values. | Child-element margins inside simple components (prefer parent container `padding` and `gap`). |
| **High Density (`-1` to `-4`)** | Opt-in desktop/data-heavy views (tables, spreadsheets, dense lists) where users scan large volumes of information with a mouse/keyboard. | Default mobile layouts, focused task menus, dialogs, or snackbars. Never scale default touch targets below `48×48dp`. |

---

## 1. Shape System (`md.sys.shape.*`)

### 10-Step Corner Radius Scale

In M3 Expressive (May 2025), Material expanded the corner scale from 7 to **10 steps** by adding `large-increased` (`20dp`), `extra-large-increased` (`32dp`), and `extra-extra-large` (`48dp`), and standardizing pill corners on `full` instead of `50%`.

Material provides two token sets for the scale:
- **Composite shape tokens (`md.sys.shape.corner.*`)**: Define all 4 corners of a rectangular container (`rounded <N>dp`).
- **Individual corner-value tokens (`md.sys.shape.corner-value.*`)**: Raw `dp` scalars (`<N>dp`) used to configure individual corners or **inner corners** in grouped components.

| Step | Shape Token (`md.sys.shape.corner.*`) | Value Token (`md.sys.shape.corner-value.*`) | Radius Value | Typical Component Mappings |
|---|---|---|---|---|
| **1. None** | `corner.none` | `corner-value.none` | **`0dp`** (`0px`) | Full-screen dialogs, Top/Bottom app bars (flat), dividers, full-bleed banners |
| **2. Extra Small** | `corner.extra-small` | `corner-value.extra-small` | **`4dp`** (`0.25rem`) | Menus, Snackbars, Plain Tooltips, Outlined TextField, Checkbox, inner corners of Split/Grouped buttons |
| **3. Small** | `corner.small` | `corner-value.small` | **`8dp`** (`0.5rem`) | Chips (Assist, Filter, Input, Suggestion), Rich Tooltips, Small FAB (legacy) |
| **4. Medium** | `corner.medium` | `corner-value.medium` | **`12dp`** (`0.75rem`) | Cards (Elevated, Filled, Outlined), Small FAB |
| **5. Large** | `corner.large` | `corner.large` / `corner-value.large` | **`16dp`** (`1rem`) | FAB (`56dp`), Extended FAB, Navigation Drawer, Modal Side Sheet |
| **6. Large Increased** *(M3 Expressive)* | `corner.large-increased` | `corner-value.large-increased` | **`20dp`** (`1.25rem`) | Medium/Large expressive containers, medium FABs/toolbars |
| **7. Extra Large** | `corner.extra-large` | `corner-value.extra-large` | **`28dp`** (`1.75rem`) | Basic Dialogs, Date/Time Pickers, Large FAB (`96dp`), Bottom Sheet top corners, Carousel items |
| **8. Extra Large Increased** *(M3 Expressive)* | `corner.extra-large-increased` | `corner-value.extra-large-increased`| **`32dp`** (`2rem`) | Expressive large dialogs, hero cards, expanded sheets |
| **9. Extra Extra Large** *(M3 Expressive)* | `corner.extra-extra-large` | `corner-value.extra-extra-large` | **`48dp`** (`3rem`) | Extra-large hero containers, expressive feature cards |
| **10. Full** | `corner.full` | *(Use `9999px` / `50%`)* | **Fully rounded (circular / pill)** | Common Buttons (Filled, Tonal, Outlined, Elevated, Text), Icon Buttons, Segmented Buttons, Search Bar, Badges, Sliders, Switches, Navigation Bar active indicator, Floating Toolbar |

### Asymmetric Corner Tokens
Asymmetric tokens round specific edges while keeping anchored/adjacent edges at `0dp` (note that `.start` and `.end` automatically mirror in RTL layouts):

| Asymmetric Token | Top-Left | Top-Right | Bottom-Right | Bottom-Left | Primary Usage |
|---|---|---|---|---|---|
| `md.sys.shape.corner.extra-small.top` | `4dp` | `4dp` | `0dp` | `0dp` | Filled TextField container (top corners rounded above bottom active indicator line) |
| `md.sys.shape.corner.large.top` | `16dp` | `16dp` | `0dp` | `0dp` | Bottom sheets / top-rounded panels |
| `md.sys.shape.corner.large.start` | `16dp` | `0dp` | `0dp` | `16dp` | End-docked Modal Side Sheet (`right` edge anchored in LTR) |
| `md.sys.shape.corner.large.end` | `0dp` | `16dp` | `16dp` | `0dp` | Start-docked Modal Navigation Drawer (`left` edge anchored in LTR) |
| `md.sys.shape.corner.extra-large.top` | `28dp` | `28dp` | `0dp` | `0dp` | Modal Bottom Sheet (`bottom` edge anchored to screen bottom) |

### Optical Roundness (Concentric Nested Corners)
When nesting one rounded container inside another with padding between them, using the identical corner radius on both makes the inner curve look pinched and unbalanced. Always calculate concentric **optical roundness**:

$$\text{Inner Radius} = \max(0,\; \text{Outer Radius} - \text{Padding})$$
$$\text{Outer Radius} = \text{Inner Radius} + \text{Padding}$$

- **Example**: An outer card with `extra-extra-large` radius (`48dp`) and `14dp` internal padding requires an inner image/container radius of $48\text{dp} - 14\text{dp} = 34\text{dp}$ (or closest token `extra-large-increased` `32dp`).

### Shape Families: Rounded vs Cut
- **Rounded (`rounded`)**: Default M3 shape family across all components.
- **Cut (`cut`)**: Straight diagonal chamfered corners. When customizing a theme to use `cut` corners on information-dense components (such as Cards), **increase internal padding** so diagonal corners do not clip text or media.

### M3 Expressive 35-Shape Library & Shape Morphing
- **35 Expressive Shapes (`MaterialShapes`)**: M3 Expressive provides 35 predefined abstract polygon/rounded shapes (e.g., Clover, Cookie, Sunny, Burst, Flower, Pill, Square, Slanted, Arch, Pentagon, Oval, Ghostish, Pixel, etc.) in the Figma Design Kit and Jetpack Compose `androidx.compose.material3.MaterialShapes`.
- **Built-in Shape Morphing**:
  - Any shape in the library can seamlessly morph into any other shape via vertex-matched cubic Bézier interpolation (`Morph(startShape, endShape)` in `androidx.graphics.shapes`).
  - **Interactive Morphing**: Pressing, selecting, or toggling a button in a **Button Group**, **Split Button**, or **Icon Button** morphs its corner radii (e.g., from pill `full` to square-ish `small`/`medium` on press/selection, while adjacent buttons in a Button Group reactively compress/bump).
  - **Progress Morphing**: **Loading Indicator** continuously morphs through expressive shapes while rotating to communicate indeterminate progress.
  - **Default Motion**: Shape morphing uses the **Expressive motion scheme** (`md.sys.motion.spring.fast.spatial`: damping `0.9` / `0.6`, stiffness `1400`) by default.
- **Shape Principles**:
  1. **Harmonize shape and typography**: Pair rounded shapes with rounded variable font axes (e.g., Google Sans Flex `ROND`).
  2. **Embrace shape tension**: Contrast rounded shapes with sharp/square shapes to signal state changes (e.g., unselected round button morphing to a square-cornered selected button) or highlight focal points.
  3. **Shape is versatile, not semantic**: Never assign rigid literal meaning to a single abstract shape (e.g., a wavy shape is not exclusively "audio" or "loading"; a starburst is not exclusively "new").
  4. **Use abstract shapes sparingly**: Restrict decorative shapes to avatars, photo masks, badges, and hero moments; never apply irregular polygons to text-heavy containers.

---

## 2. Elevation System (`md.sys.elevation.*`)

Elevation measures the relative distance between two surfaces along the **z-axis** in `dp`. In Material 3, elevation tokens define z-order and shadow depth only — **they carry no intrinsic color or opacity tint**.

### 6 Elevation Levels (`level0` – `level5`)

| Level | Token (`md.sys.elevation.*`) | Z-Depth (`dp`) | State Assignment | Default Resting Components |
|---|---|---|---|---|
| **Level 0** | `md.sys.elevation.level0` | **`0dp`** | Resting | App Bar (unscrolled), Buttons (Filled, Tonal, Outlined, Text), Button Groups, Cards (Filled, Outlined), Carousel, Chips (Flat/Outlined), Dialog (Full-screen), FAB / Extended FAB (inside Navigation Rail), FAB Menu list items, Icon Buttons, Lists, Navigation Rail, Segmented Buttons, Side Sheet (Docked), Sliders, Split Buttons, Tabs |
| **Level 1** | `md.sys.elevation.level1` | **`1dp`** | Resting / Hovered (+1 from L0) | Banner, Bottom Sheet (Modal), Elevated Button, Elevated Card, Elevated Chips, Navigation Drawer (Modal), Side Sheet (Modal) |
| **Level 2** | `md.sys.elevation.level2` | **`3dp`** | Resting / Hovered (+1 from L1) | App Bar (scrolled), Menu, Navigation Bar, Rich Tooltip, Toolbar |
| **Level 3** | `md.sys.elevation.level3` | **`6dp`** | Resting | Date Pickers, Dialogs (Modal), Extended FAB, FAB, FAB Menu (close button), Search Bar / View, Time Pickers |
| **Level 4** | `md.sys.elevation.level4` | **`8dp`** | **Interaction only** (Hover / Dragged) | *(Not assigned as a resting level)* — Used when a Level 3 component (e.g., FAB or Extended FAB) is hovered (`+1` level) or when cards/chips are dragged |
| **Level 5** | `md.sys.elevation.level5` | **`12dp`** | **Interaction only** (Dragged / Pressed) | *(Not assigned as a resting level)* — Reserved for high-elevation active interaction states |

### Three Ways to Depict Elevation & Separation
1. **Tonal Surface Difference (Default)**:
   - Assign distinct `surface-container-*` roles (`lowest` → `low` → `container` → `high` → `highest`) to adjacent or overlapping regions (e.g., `surface` for body content, `surface-container` for Navigation Bar).
   - **Deprecation**: `md.sys.color.surface-tint` opacity overlays are **deprecated**. Never compute surface color from elevation `dp`.
2. **Shadows (Selective Use)**:
   - Use visible drop shadows (`md.sys.color.shadow`, `#000000`) **only** when:
     - **Protecting elements** (Elevated Buttons, Cards, Chips, FABs) over busy, photographic, or patterned backgrounds where tonal fills or hairline outlines lack contrast.
     - **Encouraging interaction**: Lifting a component on hover (`+1` level), focus, press, or swipe/drag (e.g., sliding an email card to delete, or hovering a FAB from `6dp` Level 3 to `8dp` Level 4).
   - **Shadow physics**: Smaller, sharper shadows indicate close z-proximity (`1dp`–`3dp`); larger, more diffused shadows indicate greater separation (`6dp`–`12dp`).
3. **Scrims**:
   - Place a modal scrim (`md.sys.color.scrim`, `#000000` at **`32%` opacity**; `40%` in some navigation drawer specs) behind modal dialogs, bottom/side sheets, and expanded navigation drawers to dim background content and direct focus to the elevated layer.

---

## 3. Spacing, Grids, and Density (`md.sys.measurement.*`)

### System Spacing Scale (`md.sys.measurement.space*`)

Material 3's spacing system uses a linear scale anchored on **`8dp` (`1x`), where `md.sys.measurement.space100 = 8dp`**. Token numbers represent percentage multipliers of `8dp` ($\text{Value} = 8\text{dp} \times \frac{\text{TokenNumber}}{100}$).

| Token (`md.sys.measurement.*`) | Multiplier of `8dp` | Resolved Value (`dp`) | Resolved Value (`rem` at `16px`) | Category | Typical Usage |
|---|---|---|---|---|---|
| `space0` | `0×` | **`0dp`** | `0rem` | Base | Zero padding / flush edge |
| `space25` | `0.25×` | **`2dp`** | `0.125rem` | Nested unit | Tight micro-gaps (e.g., Split Button inner gap, badge offset) |
| `space50` | `0.5×` | **`4dp`** | `0.25rem` | Nested unit | Tight icon-to-label gaps, dense padding increments |
| `space75` | `0.75×` | **`6dp`** | `0.375rem` | Nested unit | Small button vertical padding, compact chip gaps |
| `space100` | **`1.0×` (Base)** | **`8dp`** | `0.5rem` | **Base unit** | Standard button icon-label gap, minimum target separation, search padding |
| `space125` | `1.25×` | **`10dp`** | `0.625rem` | Nested unit | Default button vertical padding (`10dp` top/bottom) |
| `space150` | `1.5×` | **`12dp`** | `0.75rem` | Nested unit | Focused search horizontal margin (`12dp`), compact card padding |
| `space175` | `1.75×` | **`14dp`** | `0.875rem` | Nested unit | Intermediate container padding |
| `space200` | `2.0×` | **`16dp`** | `1.0rem` | `8dp` multiple | Standard mobile screen margin (`16dp`), card padding, list horizontal padding |
| `space250` | `2.5×` | **`20dp`** | `1.25rem` | Nested unit | Medium button/dialog padding, text field label-to-input distance |
| `space300` | `3.0×` | **`24dp`** | `1.5rem` | `8dp` multiple | Standard button horizontal padding (`24dp`), Dialog padding, Search margin, Expanded screen margin |
| `space400` | `4.0×` | **`32dp`** | `2.0rem` | `8dp` multiple | Large button padding, desktop pane gaps |
| `space500` | `5.0×` | **`40dp`** | `2.5rem` | `8dp` multiple | Large section spacing |
| `space600` | `6.0×` | **`48dp`** | `3.0rem` | `8dp` multiple | Extra-large button leading/trailing padding, hero negative space |
| *(Scale step)* | `7.0×` | **`56dp`** | `3.5rem` | `8dp` multiple | Extended layout spacing |
| `space800` | `8.0×` | **`64dp`** | `4.0rem` | `8dp` multiple | Large screen editorial spacing |
| `space900` | `9.0×` | **`72dp`** | `4.5rem` | `8dp` multiple | Maximum system spacing unit |

*Custom spacing rule*: If an intermediate token is needed, follow the multiplier formula: e.g., `space225` = $8\text{dp} \times 2.25 = 18\text{dp}$.

### Parts of Spacing & Token Naming
1. **Padding**: Space *inside* a container between its border and content (`vertical`, `top`, `bottom`, `horizontal`, `leading`, `trailing`).
2. **Gap**: Space *between* sibling elements inside a container or grid (`horizontal gap`, `vertical gap`, or element-pair named like `icon-label gap`). **Spacer** is the layout-level gap between two panes (e.g., `24dp` between primary and supporting panes).
3. **Margin**: Space *outside* a component or between layout panes and the window edge.
   - **Rule**: Define `padding` and `gap` on the **parent container** rather than setting non-uniform `margin` values on child elements.
   - **Token naming migration**: Modern M3 component tokens use `padding`, `gap`, and `margin` with `leading`/`trailing`/`top`/`bottom`/`horizontal`/`vertical` (replacing legacy `leading-space`, `trailing-space`, `between-space`).

### Layout Grids, Scaffold & Global Rulers
- **Layout Scaffold Assembly Order**:
  1. **Grid Columns**: Compact screens use **4 columns** (`16dp` margins); Medium/Expanded/Large screens scale to **8–12 columns** (`24dp`+ margins).
  2. **Bars & Rails**: Place edge-anchored navigation and action chrome first (`TopAppBar`, `NavigationBar` on compact; `NavigationRail` or `Toolbar` in the rail region).
  3. **Panes**: Populate remaining space with `1–3` content panes (`Primary pane`, `Supporting pane`) separated by a `Spacer` or `Drag Handle`.
- **Global Rulers**: Align elements consistently across screens using 4 ruler types:
  - **Bar & Safety Rulers**: Reserve top/bottom system UI zones (status bar, gesture navigation bar) so interactive app bars never collide with OS chrome.
  - **Margin Rulers**: Left/right content bounds (can be widened for negative space or narrowed to `0dp` for full-bleed media grids).
  - **Title Ruler**: Globally aligns the screen title with app bar icons and controls.
  - **Content Rulers (`Content 1–4`)**: Anchor primary hero blocks (`Content 1`) and secondary text/actions (`Content 2+`).

### Density Scale, Touch Targets & `dp` Formula
- **Component Density Scale (`0` to `-4`)**:
  - `0` is default density. Each negative step (`-1`, `-2`, `-3`, `-4`) reduces a component's vertical padding/height by **`4dp`** (e.g., a `40dp` button at `-1` becomes `36dp`, at `-2` becomes `32dp`).
  - **Text size never shrinks** when component density increases, and spacing tokens do not scale up when text scales to `200%`.
- **Minimum Target Sizes**:
  - **Touch target minimum**: **`48×48dp`** (`~9mm` physical size; `44×44pt` on iOS), even if the visual icon (`24×24dp`) or dense button (`36dp` tall) is smaller.
  - **Pointer (mouse/stylus) target minimum**: **`44×44dp`** (or `40×40dp` for `20dp` desktop icons).
  - **Target spacing**: Separate adjacent interactive targets by at least **`8dp`** (`space100`).
- **`dp` to Pixel Formula**:
  $$\text{dp} = \frac{\text{pixels} \times 160}{\text{screen dpi}} \quad \Longleftrightarrow \quad \text{pixels} = \text{dp} \times \frac{\text{screen dpi}}{160}$$
  At baseline `160 dpi` (`1x`), `1dp = 1px`.

---

## Do / Don't / Caution Rules

- **✅ Do** calculate concentric optical roundness ($\text{Inner Radius} = \text{Outer Radius} - \text{Padding}$) when nesting rounded containers.
- **❌ Don't** apply the identical corner radius to both an outer card and a padded inner image/container.
- **⚠️ Caution** when applying `large`, `extra-large`, or `full` corner radii (or `cut` corners) to information-dense components like multi-line Cards — large corners clip content unless extra padding is added.
- **⚠️ Caution** against using multiple different abstract shapes from the 35-shape library on adjacent icons/buttons without clear purpose — arbitrary shape variety creates visual clutter.
- **✅ Do** ensure floating elements (like FABs) have sufficient contrast against underlying surfaces by using shadows or distinct tonal container roles.
- **❌ Don't** change the default resting elevation of Material 3 components or apply drop shadows to all elevation levels indiscriminately.
- **✅ Do** apply spacing via `padding` and `gap` on parent containers; **❌ Don't** use asymmetric `margin` tokens on internal child elements (such as button icons).
- **✅ Do** preserve `1x` default padding and gap tokens when text scales up to `200%`.
- **❌ Don't** enable high component density (`-1` to `-3`) by default if it reduces interactive targets below `48×48dp`, and **❌ Don't** apply high density to focused task menus, dialogs, or snackbars.

---

## Implementation Notes

### Jetpack Compose (`Shapes`, `MaterialShapes`, `Elevation`, `Arrangement`)
```kotlin
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.ui.unit.dp

// 1. Standard M3 Shape Theme (with asymmetric/concentric support)
val AppShapes = Shapes(
    extraSmall = RoundedCornerShape(4.dp),
    small = RoundedCornerShape(8.dp),
    medium = RoundedCornerShape(12.dp),
    large = RoundedCornerShape(16.dp),
    extraLarge = RoundedCornerShape(28.dp)
)
// Asymmetric top-only shape (e.g. ModalBottomSheet):
val SheetTopShape = RoundedCornerShape(topStart = 28.dp, topEnd = 28.dp, bottomEnd = 0.dp, bottomStart = 0.dp)
// Concentric optical roundness (Outer = 48.dp, Padding = 14.dp -> Inner = 34.dp):
val InnerConcentricShape = RoundedCornerShape((48 - 14).dp)

// 2. M3 Expressive MaterialShapes & Morphing (Compose Material3 1.4+)
// Use MaterialShapes.Cookie9Sided, MaterialShapes.Sunny, MaterialShapes.Clover4Leaf, etc.
// Convert RoundedPolygon to Compose Shape via .toShape() or animate Morph(startPolygon, endPolygon, progress).

// 3. Elevation & Parent Padding/Gap (space200 = 16.dp, space100 = 8.dp)
// Prefer Surface(color = MaterialTheme.colorScheme.surfaceContainerLow, shadowElevation = 1.dp)
```

### Flutter (`ShapeBorder`, `EdgeInsets`, `VisualDensity`)
```dart
// Corner radius & optical roundness
final outerBorder = RoundedRectangleBorder(borderRadius: BorderRadius.circular(28));
final sheetTopBorder = const RoundedRectangleBorder(
  borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
);
// Cut corners: BeveledRectangleBorder(borderRadius: BorderRadius.circular(12))

// Density configuration (-1, -2, etc. for desktop opt-in):
final theme = ThemeData(
  useMaterial3: true,
  visualDensity: VisualDensity.standard, // or VisualDensity(horizontal: -1, vertical: -1)
);
```

### Material Web & CSS Custom Properties (`--md-sys-shape-*`, `--md-sys-elevation-*`, `--md-sys-measurement-*`)
```css
:root {
  /* 10-Step Shape Corner Radius Scale */
  --md-sys-shape-corner-none: 0px;
  --md-sys-shape-corner-extra-small: 4px;
  --md-sys-shape-corner-small: 8px;
  --md-sys-shape-corner-medium: 12px;
  --md-sys-shape-corner-large: 16px;
  --md-sys-shape-corner-large-increased: 20px;       /* M3 Expressive */
  --md-sys-shape-corner-extra-large: 28px;
  --md-sys-shape-corner-extra-large-increased: 32px; /* M3 Expressive */
  --md-sys-shape-corner-extra-extra-large: 48px;     /* M3 Expressive */
  --md-sys-shape-corner-full: 9999px;

  /* asymmetric helpers */
  --md-sys-shape-corner-extra-large-top: 28px 28px 0px 0px;
  --md-sys-shape-corner-large-top: 16px 16px 0px 0px;

  /* 6 Elevation Levels (z-depth & ambient/key shadow approximations) */
  --md-sys-elevation-level0: none;
  --md-sys-elevation-level1: 0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 1px 3px 1px rgba(0, 0, 0, 0.15); /* 1dp */
  --md-sys-elevation-level2: 0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 2px 6px 2px rgba(0, 0, 0, 0.15); /* 3dp */
  --md-sys-elevation-level3: 0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15); /* 6dp */
  --md-sys-elevation-level4: 0px 2px 3px 0px rgba(0, 0, 0, 0.30), 0px 6px 10px 4px rgba(0, 0, 0, 0.15);/* 8dp */
  --md-sys-elevation-level5: 0px 4px 4px 0px rgba(0, 0, 0, 0.30), 0px 8px 12px 6px rgba(0, 0, 0, 0.15);/* 12dp */

  /* Spacing System Tokens (space100 = 8px base) */
  --md-sys-measurement-space0: 0px;
  --md-sys-measurement-space25: 2px;
  --md-sys-measurement-space50: 4px;
  --md-sys-measurement-space75: 6px;
  --md-sys-measurement-space100: 8px;
  --md-sys-measurement-space125: 10px;
  --md-sys-measurement-space150: 12px;
  --md-sys-measurement-space175: 14px;
  --md-sys-measurement-space200: 16px;
  --md-sys-measurement-space250: 20px;
  --md-sys-measurement-space300: 24px;
  --md-sys-measurement-space400: 32px;
  --md-sys-measurement-space500: 40px;
  --md-sys-measurement-space600: 48px;
  --md-sys-measurement-space800: 64px;
  --md-sys-measurement-space900: 72px;
}

/* Concentric optical roundness utility */
.card-outer {
  --outer-radius: var(--md-sys-shape-corner-extra-extra-large); /* 48px */
  --card-padding: var(--md-sys-measurement-space175);           /* 14px */
  border-radius: var(--outer-radius);
  padding: var(--card-padding);
}
.card-inner-media {
  border-radius: calc(var(--outer-radius) - var(--card-padding)); /* 34px */
}
```

---

**Further reading:** `docs/pages/shape.md`, `docs/pages/elevation.md`, `docs/pages/spacing.md`, `docs/pages/grids-spacing.md`, `docs/pages/layout-overview.md`, `docs/blog/tone-based-surface-color-m3.md`, `docs/blog/design-material-theme-shape.md`, `tokens/sys-tokens.md`.
