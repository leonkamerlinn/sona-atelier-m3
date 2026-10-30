# App Bars & Toolbars

Top-level page headers and navigation controls (**App Bars**) and bottom or floating action containers (**Toolbars**, replacing the legacy Bottom App Bar in M3 Expressive).

**Sources:** `https://m3.material.io/components/app-bars/{overview,specs,guidelines,xr,accessibility}`, `https://m3.material.io/components/toolbars/{overview,specs,guidelines,xr,accessibility}`, `https://m3.material.io/foundations/xr/components/{app-bars,toolbars}`

---

## When to Use / When Not to Use

| Component | When to Use | When NOT to Use |
|---|---|---|
| **App Bar** (`md.comp.app-bar`) | At the top of the screen to describe the current page (headline, optional subtitle, or brand logo), provide leading navigation (**Back** or **Menu**), and expose **1–2 essential page-level actions** (e.g., *Save*, *Send*, *Edit*). | When a screen has 3+ actions or complex formatting controls—move those actions to a **Toolbar** instead of crowding the App Bar or adding an overflow menu. |
| **Search App Bar** (`md.comp.app-bar.small.search`) | On home or primary screens where global or section-wide search is a primary entry point (opens **Search View** when selected). | As a scroll-collapsed target for Medium/Large flexible app bars (never transform a standard app bar into a Search app bar on scroll). |
| **Docked Toolbar** (`md.comp.toolbar.docked`) | Full-width at the bottom of the window for **global actions** that persist across multiple pages. Replaces the baseline **Bottom App Bar**. | Simultaneously with a **Navigation Bar** (both occupy the bottom edge). Show Navigation Bar on top-level destinations and Toolbars on secondary/subsequent pages. |
| **Floating Toolbar** (`md.comp.toolbar.floating`) | Floating above body content (horizontal at the bottom, or vertical along the side on Medium+ breakpoints) for **contextual actions** specific to the current page/content, or as local sub-page navigation. | With a bottom **Navigation Bar** when the floating toolbar contains navigation controls; or vertically in Compact windows with complex layouts. |
| **Baseline Medium / Large Top App Bar & Bottom App Bar** | Legacy M3 maintenance only. | New M3 Expressive designs—use **Medium Flexible** / **Large Flexible** App Bars and **Docked** / **Floating** Toolbars instead. |

---

## Part 1: App Bars (`md.comp.app-bar`)

### M3 Expressive Changes (May 2025)
- **Renamed:** **Top app bar** (`md.comp.top-app-bar.*`, deprecated) is now **App bar** (`md.comp.app-bar.*`).
- **New Search App Bar:** Dedicated variant (`md.comp.app-bar.small.search.*`) supporting centered or leading-aligned hint text and action icons both inside and outside the search pill.
- **Merged Center-Aligned Variant:** The standalone `center-aligned` top app bar is merged into the **Small** app bar via a text-alignment configuration (`leading-edge` default vs `centered`).
- **Flexible Variants Replace Baseline Medium & Large:** **Medium flexible** (`md.comp.app-bar.medium-flexible`) and **Large flexible** (`md.comp.app-bar.large-flexible`) replace baseline Medium and Large top app bars. All three text variants (Small, Medium flexible, Large flexible) now support:
  - Optional **subtitle** (hugging text contents so Medium/Large flexible grow taller when a subtitle is present).
  - **Leading-edge** or **centered** text alignment.
  - **2-line text wrapping** on Medium flexible and Large flexible (with shorter base container heights and larger typography).
  - Flexible slots for **brand imagery/logos** and a **single filled or tonal trailing icon button** (default or wide width).

### Variants & Configurations

| Variant | Token Prefix | Container Height | Headline Typography | Subtitle Typography | Text Alignment | Wrapping | Status (M3 Expressive) |
|---|---|---|---|---|---|---|---|
| **Search App Bar** | `md.comp.app-bar.small` + `.search` | `64dp` (search pill: `56dp`) | `body-large` (`16sp` / `24sp` line-height, weight `400`) | None | Leading (default) or Centered | Single-line | **Recommended** (Home/Global search) |
| **Small** | `md.comp.app-bar.small` | `64dp` (with or without subtitle) | `title-large` (`22sp` / `28sp`, weight `400`) | `label-medium` (`12sp` / `16sp`, weight `500`) | Leading (default) or Centered | Single-line only (never wrap) | **Recommended** (Dense layouts / collapsed state) |
| **Medium Flexible** | `md.comp.app-bar.medium-flexible` | `112dp` (no subtitle)<br>`136dp` (with subtitle) | `headline-medium` (`28sp` / `36sp`, weight `400`) | `label-large` (`14sp` / `20sp`, weight `500`) | Leading (default) or Centered | Up to 2 lines (never truncate) | **Recommended** (Replaces baseline Medium) |
| **Large Flexible** | `md.comp.app-bar.large-flexible` | `120dp` (no subtitle)<br>`152dp` (with subtitle) | `display-small` (`36sp` / `44sp`, weight `400`) | `title-medium` (`16sp` / `24sp`, weight `500`) | Leading (default) or Centered | Up to 2 lines (never truncate) | **Recommended** (Emphasized page headline) |
| *Medium (Baseline)* | `md.comp.app-bar.medium` | `112dp` | `headline-small` (`24sp` / `32sp`, weight `400`) | `label-large` (`14sp` / `20sp`, weight `500`) | Leading | Single-line | **Not recommended** (Use Medium Flexible) |
| *Large (Baseline)* | `md.comp.app-bar.large` | `152dp` | `headline-medium` (`28sp` / `36sp`, weight `400`) | `title-medium` (`16sp` / `24sp`, weight `500`) | Leading | Single-line | **Not recommended** (Use Large Flexible) |

### Anatomy

1. **Container:** Spans 100% of window/pane width with straight corners (`md.sys.shape.corner.none`, `0dp`).
2. **Leading Button:** Navigation icon button (`24dp` icon), typically a **Back** arrow or **Menu** icon (to open a modal expanded navigation rail). In a **Search app bar**, the leading slot can hold a product logo (purely cosmetic or triggering home/refresh—never use a logo to open a navigation rail).
3. **Headline:** Describes the current page, section, or product. In Small app bars, a high-quality brand image/logo can replace the headline text entirely; in Medium/Large flexible app bars, a logo appears above the headline text.
4. **Subtitle (Optional):** Adds secondary context below the headline; matches the headline's horizontal alignment (leading or centered).
5. **Trailing Elements:**
   - **Standard App Bars:** 1 action icon button (2 maximum if necessary), aligned to the trailing edge, ordered **most-used on the left (closest to leading edge) to least-used on the right**, plus an optional `32dp` avatar. Prefer **filled icons** for maximum legibility; use outlined icons for unselected toggle states. To emphasize a single primary action (e.g., *Save*, *Send*), style it as a **single filled or tonal icon button** (default or wide width)—never place multiple filled/tonal buttons in an app bar.
   - **Search App Bar:** Includes the `56dp`-tall pill search container (`md.sys.shape.corner.full`), hinted search text (must always start with the word **"Search"**, e.g., *"Search"*, *"Search inbox"*, *"Search Photos"*), and trailing icons placed **inside and/or outside** the search pill. Supports up to **2 trailing icons + 1 avatar on mobile (Compact)**, and dynamically expands to support up to **4 trailing icons on large screens**.

### Color & Elevation Tokens (`md.comp.app-bar`)

Unlike M2 (which used drop shadows on scroll), M3 separates scrolled app bars from body content using a **container color fill transition** (`surface` → `surface-container`).

| Element / State | Token | Role (`md.sys.*`) | Light Baseline | Dark Baseline |
|---|---|---|---|---|
| **Container (Flat / Resting)** | `md.comp.app-bar.container.color` | `color.surface` | `#FEF7FF` | `#141218` |
| **Container Elevation (Flat)** | `md.comp.app-bar.container.elevation` | `elevation.level0` | `0dp` | `0dp` |
| **Container (On Scroll)** | `md.comp.app-bar.on-scroll.container.color` | `color.surface-container` | `#F3EDF7` | `#211F26` |
| **Container Elevation (On Scroll)** | `md.comp.app-bar.on-scroll.container.elevation` | `elevation.level2` | `3dp` | `3dp` |
| **Leading Icon** | `md.comp.app-bar.leading-icon.color` | `color.on-surface` | `#1D1B20` | `#E6E0E9` |
| **Title (Headline)** | `md.comp.app-bar.title.color` | `color.on-surface` | `#1D1B20` | `#E6E0E9` |
| **Subtitle** | `md.comp.app-bar.subtitle.color` | `color.on-surface-variant` | `#49454F` | `#CAC4D0` |
| **Trailing Icon(s)** | `md.comp.app-bar.trailing-icon.color` | `color.on-surface-variant` | `#49454F` | `#CAC4D0` |
| **Search Pill Container (Flat)** | `md.comp.app-bar.search.container.color` | `color.surface-container` | `#F3EDF7` | `#211F26` |
| **Search Pill Container (On Scroll)** | `md.comp.app-bar.search.on-scroll.container.color` | `color.surface-container-highest` | `#E6E0E9` | `#36343B` |
| **Search Pill Label (Hint)** | `md.comp.app-bar.search.label.color` | `color.on-surface-variant` | `#49454F` | `#CAC4D0` |

> **Alternate Search Pill Colors:** On darker app bar backgrounds, the search pill container can use `surface-bright` instead of `surface-container`. Any custom color mapping must maintain at least a **3:1 contrast ratio** between the search label text and search container, and between the search container and surrounding app bar.

### Measurements & Spacing Tokens

| Attribute | Token | Value | Notes |
|---|---|---|---|
| **Container Shape** | `md.comp.app-bar.container.shape` | `0dp` (`corner.none`) | Always straight corners; spans 100% width |
| **Small / Search Height** | `md.comp.app-bar.small.container.height` | `64dp` | Fixed height with or without subtitle |
| **Search Pill Height & Shape** | `md.comp.app-bar.small.search.container.{height,shape}` | `56dp`, `corner.full` | Pill inside the `64dp` Search app bar |
| **Medium Flexible Height** | `md.comp.app-bar.medium-flexible.container.height` | `112dp` (`136dp` w/ subtitle) | Hugs text vertically when wrapped/subtitled |
| **Large Flexible Height** | `md.comp.app-bar.large-flexible.container.height` | `120dp` (`152dp` w/ subtitle) | Hugs text vertically when wrapped/subtitled |
| **Leading / Trailing Edge Space** | `md.comp.app-bar.{leading,trailing}-space` | `4dp` (`space50`) | Outer padding to 48dp icon button targets |
| **Search Leading / Trailing Space** | `md.comp.app-bar.search.{leading,trailing}-space` | `8dp` (`space100`) | Outer padding when search pill is at edge |
| **Gap Between Icon Buttons** | `md.comp.app-bar.icon-button-space` | `0dp` (`space0`) | Between adjacent `48×48dp` button targets |
| **Icon Size** | `md.comp.app-bar.icon.size` | `24dp` | Leading and trailing icons |
| **Avatar Size** | `md.comp.app-bar.avatar.size` | `32dp` (`corner.full`) | Updated from `30dp` in deprecated centered bar |

### Scroll & Adaptive Behavior

- **Scroll States:**
  1. **Pinned with Color Fill:** Remains visible at the top; transitions from `surface` to `surface-container` when content scrolls underneath.
  2. **Compress (Flexible → Small):** On upward content scroll, **Medium flexible** and **Large flexible** app bars compress into a **Small** app bar (`64dp`) and stay small until the user scrolls all the way back to the top of the page.
  3. **Hide on Scroll:** Can scroll offscreen when scrolling down the page and reappear immediately when scrolling up (can animate in tandem with an attached row of chips or secondary controls).
  4. **Transparent Floating Overlay:** To maximize focus on body media/content, the app bar container can stay **transparent** on scroll while internal actions transform into **filled icon buttons** (e.g., narrow-width filled Back button) floating above content.
- **Responsive Resizing:**
  - Container always spans **100% of the window or pane width**.
  - Trailing action buttons can collapse into a trailing overflow menu at smaller breakpoints and re-expand as width increases.
  - **Search App Bar Width Scaling:** The search pill fills **100%** of the horizontal space between leading and trailing elements until it reaches **`312dp`**; beyond `312dp`, it grows to fill **50%** of that available space.
  - **RTL Support:** Layout automatically mirrors in right-to-left (RTL) languages.

### XR Adaptation: App Bar Orbiter
- **Full Space vs Home Space:** In **Full Space**, the app bar adapts into a floating **App Bar Orbiter** (closely matching the **Small** app bar, configured as center-aligned or left-aligned) elevated on the Z-axis above the spatial panel. In **Home Space**, use a standard 2D coplanar app bar.
- **Spatial Elevation Colors:** Communicates Z-depth using `surface-container`, `surface-container-high`, or `surface-container-highest`.
- **Context & Placement Rules:**
  - Prefer a **single App Bar Orbiter in global context** (centered and anchored to the top of the app across layout changes). Local panel-anchored app bar orbiters should only be used if actions strictly affect that single panel.
  - **Vertical Position:** Either **offset `20dp`** above the top edge of the spatial panel (for clear separation) or **inset up to `12dp`** overlapping the top edge of the spatial panel (never overlap >`12dp` or obstruct panel content).
  - **Width & Field of View:** Must never exceed the width of the adjacent spatial panel or extend outside the user's natural **field of view (FOV)**.

---

## Part 2: Toolbars (`md.comp.toolbar`)

### M3 Expressive Changes
- **Replaces Bottom App Bar:** The baseline **Bottom app bar** (`md.comp.bottom-app-bar`, `80dp` height / `72dp` with embedded FAB) is no longer recommended. Replace it with the shorter, more flexible **Docked toolbar** (`64dp`) or **Floating toolbar** (`64dp`).
- **Two Variants:**
  - **Docked Toolbar (`md.comp.toolbar.docked`):** Full-width bottom container (`0dp` corners on mobile) for global actions across pages.
  - **Floating Toolbar (`md.comp.toolbar.floating`):** Pill-shaped container (`corner.full`, `64dp` height horizontal or `64dp` width vertical) floating over content for page-contextual actions or local sub-page navigation.
- **Two Color Schemes:** **Standard** (`surface-container` low-emphasis) and **Vibrant** (`primary-container` high-emphasis).

### Anatomy & Slot Architecture
A toolbar is a container of configurable **slots** that can hold icon buttons, text buttons, filled/tonal icon buttons, text fields, images, or dividers.
- **Emphasizing a Key Action:** Visually emphasize **at most one** action per toolbar by:
  1. Styling one icon button as **filled** (`primary` / `on-primary`) or **tonal**,
  2. Using a **wide** icon button for the primary action, or
  3. Pairing a **Floating toolbar** with an adjacent **FAB** (`md.comp.toolbar.floating.fab`).
  - *Never* combine a bold primary button inside the toolbar with an adjacent FAB at the same time.
- **Button Shape Rules:**
  - **Never** place square filled icon buttons inside a rounded **Floating toolbar** (visual shape conflict). Square icon buttons are permitted inside a **Docked toolbar**.
  - **Never** use wide icon buttons inside a **Vertical floating toolbar** (use narrow or default `48dp` icon buttons so the vertical rail stays compact at `64dp` width).

### Color Configurations: Standard vs Vibrant

| Element / State | Standard Toolbar (`md.comp.toolbar.standard`) | Vibrant Toolbar (`md.comp.toolbar.vibrant`) |
|---|---|---|
| **Visual Intent** | Low-emphasis; keeps focus on body content | High-emphasis; highlights controls or mode changes (e.g., Edit mode) |
| **Toolbar Container** | `surface-container` (`#F3EDF7` / `#211F26`) | `primary-container` (`#EADDFF` / `#4F378B`) |
| **Unselected Button Container** | `surface-container` (`#F3EDF7` / `#211F26`) | `primary-container` (`#EADDFF` / `#4F378B`) |
| **Unselected Icon & Label** | `on-surface-variant` (`#49454F` / `#CAC4D0`) | `on-primary-container` (`#4F378B` / `#EADDFF`) |
| **Unselected State Layer (Hover 8%, Focus/Press 10%)** | `on-surface-variant` (`#49454F` / `#CAC4D0`) | `on-primary-container` (`#4F378B` / `#EADDFF`) |
| **Selected Toggle Button Container** | `secondary-container` (`#E8DEF8` / `#4A4458`) | `surface-container` (`#F3EDF7` / `#211F26`) |
| **Selected Toggle Icon, Label & State Layer** | `on-secondary-container` (`#4A4458` / `#E8DEF8`) | `on-surface` (`#1D1B20` / `#E6E0E9`) |
| **Embedded High-Emphasis Filled Button** | Container: `primary` (`#6750A4` / `#D0BCFF`), Icon: `on-primary` | Container: `primary` (`#6750A4` / `#D0BCFF`), Icon: `on-primary` |
| **Disabled Icon & Label** | `on-surface` at `38%` opacity | `on-surface` at `38%` opacity |
| **Paired Floating FAB Container** | `secondary-container` (`#E8DEF8` / `#4A4458`) | `tertiary-container` (`#FFD8E4` / `#633B48`) |
| **Paired Floating FAB Icon** | `on-secondary-container` (`#4A4458` / `#E8DEF8`) | `on-tertiary-container` (`#633B48` / `#FFD8E4`) |

### Measurements & Tokens (`md.comp.toolbar.*`)

| Variant / Element | Token | Value | Notes |
|---|---|---|---|
| **Docked Height** | `md.comp.toolbar.docked.container.height` | `64dp` | Replaces `80dp` (`72dp` w/ FAB) Bottom App Bar |
| **Docked Shape** | `md.comp.toolbar.docked.container.shape` | `0dp` (`corner.none`) | Full window width; can be rounded on web/large screens |
| **Docked Leading / Trailing Padding** | `md.comp.toolbar.docked.container.{leading,trailing}-space` | `16dp` (`space200`) | Minimum outer padding on left and right edges |
| **Docked Item Spacing** | `md.comp.toolbar.docked.container.{min,max}-spacing` | Min `4dp`, Default/Max `32dp` | `8dp` gap often used when center-aligned |
| **Floating Height (Horizontal)** | `md.comp.toolbar.floating.horizontal.container.height` | `64dp` | Hugs items horizontally |
| **Floating Width (Vertical)** | `md.comp.toolbar.floating.vertical.container.width` | `64dp` | Hugs items vertically |
| **Floating Shape** | `md.comp.toolbar.floating.container.shape` | `corner.full` (pill) | Fully rounded ends |
| **Floating Elevation** | `md.comp.toolbar.floating.container.elevation` | `level3` (`6dp`) | Can be `0dp` if background beneath is visually distinct |
| **Floating Internal Ends Padding** | `md.comp.toolbar.floating.container.{leading,trailing}-space` | `8dp` (`space100`) | Padding before first and after last item |
| **Floating Between-Item Gap** | `md.comp.toolbar.floating.container.between-space` | `4dp` (`space50`) | Space between slot items |
| **Floating Horizontal Margin** | `md.comp.toolbar.floating.horizontal.container.external-space` | `16dp` (`space200`) | Minimum margin from window edges |
| **Floating Vertical Margin** | `md.comp.toolbar.floating.vertical.container.external-space` | `24dp` (`space300`) | Minimum margin from side window edge |
| **Floating FAB Gap** | `md.comp.toolbar.floating.fab.between-space` | `8dp` (`space100`) | Space between floating toolbar and paired FAB |
| **Paired FAB (Default Size)** | `md.comp.toolbar.floating.fab.container.{width,height,shape,elevation}` | `56×56dp`, `corner.large` (`16dp`), `level1` (`1dp`) | Icon size: `24dp` |
| **Paired FAB (Medium Size)** | `md.comp.toolbar.floating.fab.medium.container.{width,height,shape,elevation}` | `80×80dp`, `corner.large-increased` (`20dp`), `level2` (`3dp`) | Icon size: `28dp` |
| **Interactive Touch Target** | — | `48×48dp` minimum | Required for all controls inside any toolbar |

### Placement, Adaptive Design & Scroll Behavior
- **Docked Toolbar Adaptation:**
  - Always spans **100% of window width** at the bottom of the screen (never combine with a bottom Navigation Bar).
  - **Compact:** Space items evenly across the width.
  - **Medium+:** Center all elements (e.g., with `8dp`–`32dp` gaps), or center a key primary action while pushing secondary actions to the leading and trailing edges for easier tablet thumb reach.
  - **Web / Desktop:** Docked toolbars can adopt rounded corners, use vertical dividers to group up to ~15 actions (e.g., rich text editors), and shrink height with extra-small buttons only when vertical space is constrained.
- **Floating Toolbar Adaptation:**
  - **Width & Overflow:** Container must hug its items and never exceed the window width minus the `16dp` outer margin. Collapse excess trailing actions into an overflow menu on smaller breakpoints and reveal them as the window expands.
  - **Vertical Orientation & Navigation Rail Pairing:** Use vertical floating toolbars on **Medium+ breakpoints** with at least a **`24dp` margin** from the window edge. When a **Navigation Rail** is present on the leading edge, place the vertical floating toolbar on the **opposite (trailing) edge** to balance the layout, and set the Navigation Rail to **center-aligned** items.
  - **Multiple Floating Toolbars:** On expanded/large screens, two floating toolbars can be placed on opposite edges with distinct styles (e.g., Standard for undo/redo, Vibrant for active drawing tools). Never use multiple toolbars in Compact windows.
- **Scroll Behavior:**
  - **Docked:** Remains pinned at the bottom or animates offscreen on scroll down.
  - **Floating:** Can remain pinned, animate offscreen on scroll, or **collapse into a single FAB / key action** on scroll (supported natively in Jetpack Compose). **Never** collapse a floating toolbar into a single action *and* scroll it offscreen at the same time.

### XR Adaptation: Toolbar Orbiter
- **Full Space vs Home Space:** In **Full Space**, adapts into a floating **Toolbar Orbiter** (matching the **Floating toolbar**, horizontal or vertical, with `12dp` internal padding) elevated on the Z-axis. In **Home Space**, use a standard 2D toolbar on the panel plane.
- **Spatial Elevation Colors:** `surface-container`, `surface-container-high`, `surface-container-highest`, or `tertiary-container`.
- **Context & Placement Rules:**
  - **Local Context (Recommended):** Centered and anchored at the bottom (or side) of the specific spatial panel it controls, repositioning with that panel. (Global context at the bottom of the entire app is less common).
  - **Offset / Inset:** Position **offset `20dp`** outside the spatial panel edge, or **inset `12dp`** overlapping the spatial panel edge (never overlap >`12dp`).
  - **Bounds & Multi-Panel:** Must stay within the horizontal (for horizontal toolbars) or vertical (for vertical toolbars) bounds of the adjacent spatial panel. **Never** place a vertical toolbar orbiter *between* two spatial panels. Toolbars with >5 items can expand/collapse within the panel bounds.

---

## Accessibility

| Aspect | App Bars | Toolbars |
|---|---|---|
| **Semantic Role** | Headline uses `Title` / heading role; icon buttons use `Button` role. | Web: container uses `role="toolbar"`. Mobile: generic container; child controls expose their own roles. |
| **Initial Focus** | Lands on the **leading button** (first interactive element). | Lands on the **first interactive control** inside the toolbar. |
| **Keyboard Navigation** | `Tab` moves between interactive elements; `Space` or `Enter` activates. | `Tab` or `Arrow` keys move between toolbar controls; `Space` or `Enter` activates. |
| **Labels & Contrast** | Title label matches visible text (with optional context). Action buttons require explicit action labels (e.g., *"View on map"*). Search pill container/text must maintain **≥3:1** contrast. | Each icon button must have a clear accessibility label. Maintain access to toolbar controls even when content is scrolled or collapsed. |
| **Target Size** | Minimum **`48×48dp`** tap targets for all icon buttons and avatars. | Minimum **`48×48dp`** tap targets for all slotted controls. |

---

## Do / Don't / Caution Guidelines

| Status | Rule | Context |
|---|---|---|
| ✅ **Do** | Use straight (`0dp`) corners and default heights (`64dp` / `112dp` / `120dp`) for App Bars and Docked Toolbars. | App Bars & Docked Toolbars |
| ❌ **Don't** | Apply rounded corners to an App Bar or mobile Docked Toolbar (implies the container expands on tap) or reduce container height below default. | App Bars & Docked Toolbars |
| ✅ **Do** | Use a single filled or tonal icon button (or a single paired FAB on a Floating Toolbar) to emphasize the primary action. | App Bars & Toolbars |
| ❌ **Don't** | Place two filled/tonal buttons side by side in an App Bar, or combine a primary-colored button inside a Floating Toolbar with an adjacent FAB. | App Bars & Toolbars |
| ✅ **Do** | Wrap long headlines up to **2 lines maximum** using a **Medium flexible** or **Large flexible** App Bar. | App Bars |
| ❌ **Don't** | Wrap headline text in a **Small** App Bar, or truncate App Bar headlines with ellipses. | App Bars |
| ❌ **Don't** | Use more than 2 trailing icons + avatar in a mobile Search App Bar (or >4 on large screens)—move extra actions to a Toolbar. | Search App Bar |
| ❌ **Don't** | Show a **Toolbar** and a bottom **Navigation Bar** at the same time on the same screen. | Toolbars & Navigation Bar |
| ❌ **Don't** | Use square filled icon buttons inside a rounded **Floating Toolbar**, or use wide icon buttons inside a **Vertical Floating Toolbar**. | Floating Toolbars |
| ❌ **Don't** | Add extra empty padding to a Floating Toolbar beyond its items, let it extend past the `16dp` window margin, or use multiple toolbars on Compact screens. | Floating Toolbars |
| ❌ **Don't** | Collapse a Floating Toolbar to a single action *and* animate it offscreen on scroll at the same time. | Floating Toolbars |
| ✅ **Do** | In XR Full Space, position App Bar and Toolbar Orbiters **offset `20dp`** or **inset `≤12dp`** within the adjacent spatial panel's width/height and user's FOV. | XR Orbiters |
| ❌ **Don't** | Overlap an XR Orbiter by more than `12dp`, exceed the adjacent spatial panel's dimensions, or place a vertical Toolbar Orbiter between two spatial panels. | XR Orbiters |
| ⚠️ **Caution** | Outlined icons in App Bars have lower visual weight; prefer filled icons for actions, reserving outlined icons for unselected toggle buttons. | App Bars |
| ⚠️ **Caution** | Avoid vertical Floating Toolbars in Compact windows—they can cover content unless the screen is very simple and controls are few. | Floating Toolbars |

---

## Implementation Notes

### Jetpack Compose (`androidx.compose.material3`)
- **App Bars:**
  - `TopAppBar` (Small), `CenterAlignedTopAppBar` (Small centered), `MediumTopAppBar`, `LargeTopAppBar`.
  - *M3 Expressive (1.4.0-alpha+):* `TopAppBar`, `MediumFlexibleTopAppBar` / `TwoRowsTopAppBar` (with `subtitle` slot and `titleHorizontalAlignment`), `AppBarWithSearch`.
  - Scroll behaviors via `TopAppBarDefaults`: `pinnedScrollBehavior()`, `enterAlwaysScrollBehavior()`, `exitUntilCollapsedScrollBehavior()`, connected via `Modifier.nestedScroll(scrollBehavior.nestedScrollConnection)`.
- **Toolbars:**
  - *M3 Expressive (1.4.0-alpha+):* `HorizontalFloatingToolbar` (with `expanded` state and optional `floatingActionButton` slot), `VerticalFloatingToolbar`, `DockedToolbar` (and legacy `BottomAppBar`).
  - Color helpers: `FloatingToolbarDefaults.standardFloatingToolbarColors()`, `FloatingToolbarDefaults.vibrantFloatingToolbarColors()`.
  - *XR (`androidx.xr.compose.material3`):* `HorizontalFloatingToolbar` orbiter override via `EnableXrComponentOverrides`.

### Flutter (`package:flutter/material.dart`)
- **App Bars:** `AppBar` (`toolbarHeight: 64`, `centerTitle: true/false`, `scrolledUnderElevation: 3`), `SliverAppBar`, `SliverAppBar.medium`, `SliverAppBar.large`.
- **Toolbars:** `BottomAppBar` (for docked bottom bars); custom `Material(shape: StadiumBorder(), elevation: 6, color: colorScheme.surfaceContainer)` or ` colorScheme.primaryContainer` for M3 Expressive Floating Toolbars.

### Material Web (`@material/web`)
- No dedicated `<md-top-app-bar>` or `<md-toolbar>` in `@material/web` 1.x/2.x; compose using semantic `<header>` / `<div role="toolbar">` with `<md-icon-button>` and `--md-sys-*` CSS tokens.

### Minimal CSS Sketch

```css
/* Small App Bar (64dp) with on-scroll color fill */
.md-app-bar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 64px;
  padding-inline: 4px;
  background-color: var(--md-sys-color-surface, #FEF7FF);
  color: var(--md-sys-color-on-surface, #1D1B20);
  transition: background-color 200ms cubic-bezier(0.2, 0, 0, 1);
}
.md-app-bar.is-scrolled {
  background-color: var(--md-sys-color-surface-container, #F3EDF7);
}
.md-app-bar__title {
  flex: 1;
  font: 400 22px/28px var(--md-sys-typescale-title-large-font, Roboto, sans-serif);
  color: var(--md-sys-color-on-surface, #1D1B20);
  white-space: nowrap;
}
.md-app-bar__subtitle {
  font: 500 12px/16px var(--md-sys-typescale-label-medium-font, Roboto, sans-serif);
  color: var(--md-sys-color-on-surface-variant, #49454F);
}

/* Floating Toolbar (64dp pill, Standard & Vibrant) */
.md-floating-toolbar {
  display: inline-flex;
  align-items: center;
  height: 64px;
  padding-inline: 8px;
  gap: 4px;
  margin: 16px;
  border-radius: 9999px;
  background-color: var(--md-sys-color-surface-container, #F3EDF7);
  color: var(--md-sys-color-on-surface-variant, #49454F);
  box-shadow: var(--md-sys-elevation-level3, 0 4px 8px 3px rgba(0,0,0,0.15));
}
.md-floating-toolbar--vibrant {
  background-color: var(--md-sys-color-primary-container, #EADDFF);
  color: var(--md-sys-color-on-primary-container, #4F378B);
}
```

---

**Further reading:** `docs/pages/app-bars.md`, `docs/pages/toolbars.md`, `docs/pages/xr-components.md`, `tokens/components/app-bars.md`, `tokens/components/toolbars.md`.
