# Navigation Bar, Navigation Rail & Navigation Drawer

Primary navigation components for switching between top-level app destinations across compact, medium, expanded, and XR layouts.

**Sources:** `https://m3.material.io/components/navigation-bar/{overview,specs,guidelines,xr,accessibility}`, `https://m3.material.io/components/navigation-rail/{overview,specs,guidelines,xr,accessibility}`, `https://m3.material.io/components/navigation-drawer/{overview,specs,guidelines,accessibility}`, `https://m3.material.io/foundations/xr/components/{nav-bar,nav-rail}`

---

## Adaptive Navigation Selector (When to Use Which)

Never show two primary navigation components (e.g., Navigation Bar + Navigation Rail, or Navigation Bar + Toolbar) on the same screen simultaneously.

| Window Size Class / Context | Recommended Component | Item Layout & Configuration | Destination Count |
|---|---|---|---|
| **Compact** (`<600dp`, Mobile portrait) | **Flexible Navigation Bar** (`md.comp.nav-bar`)<br>*or* **Modal Expanded Navigation Rail** (if >5 destinations) | **Vertical** stacked items (`64dp` bar height)<br>*or* hidden rail opened via App Bar menu icon | **3–5** (Nav Bar)<br>**5+** (Modal Expanded Rail) |
| **Medium** (`600–839dp`, Tablet / Foldable) | **Flexible Navigation Bar** (`md.comp.nav-bar`)<br>*or* **Collapsed Navigation Rail** (`md.comp.nav-rail.collapsed`) | **Horizontal** inline items (`64dp` bar height)<br>*or* **Vertical** rail items (`80dp`/`96dp` rail width, center-aligned) | **3–5** (Nav Bar)<br>**3–7** (Nav Rail) |
| **Expanded / Large / Extra-Large** (`≥840dp`, Desktop / Tablet landscape) | **Collapsed ↔ Expanded Navigation Rail** (`md.comp.nav-rail.{collapsed,expanded}`) | **Collapsed** (`80dp`/`96dp` width) transitioning via Menu button to **Standard** or **Modal Expanded** (`220–360dp` width) | **3–7** primary (plus secondary destinations when expanded) |
| **Legacy 5+ Destinations / Multi-Level** | *Baseline Navigation Drawer* (`md.comp.navigation-drawer`) | **Deprecated in M3 Expressive** — replace with **Expanded Navigation Rail** (`md.comp.nav-rail.expanded`) | **5+** |
| **Android XR (Full Space)** | **Nav Bar Orbiter** or **Nav Rail Orbiter** | Spatially elevated Z-axis orbiter (`20dp` offset or `12dp` inset) | **3–5** (Bar) / **3–7** (Rail) |

> **When NOT to use:**
> - **< 3 destinations:** Do not use a Navigation Bar for 2 destinations—use **Primary Tabs** instead.
> - **> 5 destinations on Compact:** Do not crowd 6+ items into a Navigation Bar or make it horizontally scrollable—use a **Modal Expanded Navigation Rail** (or Tabs for in-page categories).
> - **Single tasks:** Do not use primary navigation components for single-item actions (e.g., archiving an email)—use a **Toolbar** on secondary screens.

---

## Part 1: Navigation Bar (`md.comp.nav-bar`)

### M3 Expressive Changes (May 2025)
- **Flexible Navigation Bar (`md.comp.nav-bar`) Replaces Baseline (`md.comp.navigation-bar`):**
  - **Shorter Container Height:** Reduced from **`80dp`** (baseline) to **`64dp`** (expressive).
  - **Two Item Orientation Modes:** Supports **Vertical** stacked items (`56×32dp` active indicator, down from `64×32dp` baseline) for Compact screens and **Horizontal** inline items (`40dp`-tall pill hugging icon + label) for Medium screens.
  - **Updated Active Label Color:** Active label text changed to **`secondary`** (`#625B71` / `#CCC2DC`), replacing baseline `on-surface` (`#1D1B20` / `#E6E0E9`).

### Anatomy
1. **Container:** Full-width (`100%`) bottom bar (`64dp` height, `0dp` straight corners) filled with `surface-container`.
2. **Navigation Items (3–5):** Equal-importance top-level destinations that remain consistent across screens:
   - **Vertical Item (Compact):** Active indicator pill (`56×32dp`) behind a `24dp` icon, with `label-medium` text stacked `4dp` below the indicator. Container width is divided into equal segments.
   - **Horizontal Item (Medium):** Active indicator pill (`40dp` height, dynamic width) enclosing both the `24dp` icon and `label-medium` text side by side (`4dp` gap, `16dp` leading/trailing pill padding). Items have fixed width and are centered in the bar with outer margins absorbing excess space.
3. **Icons:** **Filled** `24dp` icon when active; **outlined** `24dp` icon when inactive (if an icon lacks a filled variant, increase stroke weight to **semibold** when active). Minimum **3:1** contrast against container.
4. **Label Text:** Required on all items (never omit labels). Keep to **1–2 words**; never truncate with ellipses, wrap at 1x scale, or shrink font size.
5. **Badges (Optional):** Positioned overlapping the upper-right corner of the icon in both vertical and horizontal layouts:
   - **Small Badge:** `6×6dp` dot (`error`, `3dp` radius) indicating a status update.
   - **Large Badge:** `16dp` height (`error` container, `8dp` radius, `on-error` `label-small` `11sp` text) showing a numeric count.

### Tokens, Colors & Measurements (`md.comp.nav-bar`)

| Element / Attribute | Expressive Token (`md.comp.nav-bar.*`) | Role / Value | Light / Dark Baseline | Baseline Legacy (`md.comp.navigation-bar.*`) |
|---|---|---|---|---|
| **Container Height** | `container.height` | `64dp` | — | `80dp` |
| **Container Color** | `container.color` | `surface-container` | `#F3EDF7` / `#211F26` | `surface-container` (`#F3EDF7` / `#211F26`) |
| **Container Elevation & Shape** | `container.{elevation,shape}` | `level2` (`3dp`), `corner.none` (`0dp`) | — | `level2` (`3dp`), `corner.none` (`0dp`) |
| **Active Indicator Color & Shape** | `item.active.indicator.color`, `shape` | `secondary-container`, `corner.full` | `#E8DEF8` / `#4A4458` | `secondary-container`, `corner.full` |
| **Vertical Indicator Size** | `item.vertical.active-indicator.{width,height}` | **`56dp × 32dp`** | — | `64dp × 32dp` |
| **Vertical Padding & Gaps** | `item.vertical.{container.between-space,active-indicator.icon-label-space}` | Top/bottom: `6dp` (`space75`), Icon-label gap: `4dp` (`space50`) | — | Top: `12dp`, Bottom: `16dp`, Gap: `4dp` |
| **Horizontal Indicator Size** | `item.horizontal.active-indicator.{height,leading-space,trailing-space}` | Height: **`40dp`**, Pill inline padding: `16dp` (`space200`), Icon-label gap: `4dp` | — | *Not available in baseline* |
| **Active Icon Color & Size** | `item.active.icon.color`, `item.icon.size` | `on-secondary-container`, `24dp` | `#4A4458` / `#E8DEF8` | `on-secondary-container`, `24dp` |
| **Active Label Color & Type** | `item.active.label-text.color`, `font` | **`secondary`**, `label-medium` (`12sp`/`16sp`, weight `500` or `700` prominent) | `#625B71` / `#CCC2DC` | `on-surface` (`#1D1B20` / `#E6E0E9`), weight `700` |
| **Inactive Icon & Label Color** | `item.inactive.{icon,label-text}.color` | `on-surface-variant`, `label-medium` (weight `500`) | `#49454F` / `#CAC4D0` | `on-surface-variant` (`#49454F` / `#CAC4D0`) |
| **State Layer (Hover / Focus / Press)** | `item.{active,inactive}.{hovered,focused,pressed}.state-layer` | `on-secondary-container` (`8%` hover, `10%` focus/press) | `#4A4458` / `#E8DEF8` | `on-surface` (`8%` hover, `10%` focus/press) |

### Behavior & Placement
- **Selection & Transitions:** Tapping an inactive item triggers a **top-level transition** pattern; the active indicator expands horizontally on one axis from the center of the icon while the icon switches from outlined to filled. Apps can either **preserve state** (scroll position, selected tab, inline search) or **reset state** per product needs.
- **Re-selection:** Tapping the currently active destination scrolls the page content back to the top.
- **No Swiping:** Swiping horizontally on screen content must **never** switch Navigation Bar destinations.
- **Scrolling:** Can slide offscreen when scrolling down and reappear when scrolling up—**except** when a screen reader (e.g., TalkBack/VoiceOver) is active, in which case the Navigation Bar must remain permanently pinned.
- **FAB & Overlays:** Place any FAB **right-aligned above** the Navigation Bar (never overlapping it). Bottom sheets, dialogs, modal drawers, and the on-screen keyboard may temporarily cover the Navigation Bar.

### XR Adaptation: Navigation Bar Orbiter
- In **Full Space**, adapts into a floating **Navigation Bar Orbiter** centered at the bottom of the spatial panel within the user's immediate field of view (never place at the top of a spatial panel or exceed the panel's width).
- **Spatial Elevation Colors:** `surface-container`, `surface-container-high`, `surface-container-highest`, or `tertiary-container`.
- **Context & Positioning:**
  - **Global Context (Recommended):** Offset **`20dp`** below the spatial panel, anchored to the overall app.
  - **Local Context (Caution):** Inset **`12dp`** overlapping the bottom edge of a specific panel (never overlap by more than `12dp` or more than half the orbiter's height).

---

## Part 2: Navigation Rail (`md.comp.nav-rail`)

### M3 Expressive Changes (May 2025)
- **Unified Collapsed & Expanded Navigation Rails:** Replaces both the baseline **Navigation Rail** (`md.comp.navigation-rail`, `80dp` width) and the baseline **Navigation Drawer** (`md.comp.navigation-drawer`, `360dp` width).
- **Two Variants that Morph into Each Other:**
  1. **Collapsed Navigation Rail (`md.comp.nav-rail.collapsed`):** `96dp` default width (`80dp` narrow option) with **3–7 stacked vertical items**, an optional top **Menu** button, and an optional top **FAB**. Placed along the leading edge on Medium to Extra-Large screens; should **not** be hidden (unless using an immersive hidden-expanded rail).
  2. **Expanded Navigation Rail (`md.comp.nav-rail.expanded`):** `220dp`–`360dp` width with **horizontal inline items** (`56dp` height), opened via the Menu button (which morphs into a collapse icon). Can reveal **secondary destinations** hidden when collapsed, and morphs a regular FAB into an **Extended FAB**.
- **Expanded Modality Configurations:**
  - **Standard (Default):** Coplanar beside body content (`surface`, `0dp` elevation, `0dp` corners); body content resizes to fit. Best for Expanded, Large, and Extra-Large windows.
  - **Modal:** Overlaps body content (`surface-container`, `level2` `3dp` elevation, `16dp` `corner.large` rounding) with a scrim; supports Android **predictive back** gesture (rail detaches from screen edge during back swipe). Use on Compact/Medium screens, dense layouts, or apps with >5 destinations.
  - **Hide When Collapsed:** In immersive experiences or Compact screens, the rail can be completely hidden when collapsed, appearing only as an Expanded Rail when the App Bar's Menu icon is activated.

### Anatomy
1. **Container:** Vertical bar anchored to the leading window edge (left in LTR, right in RTL). Optional `1dp` vertical divider on the inner edge (or `level1` `1dp` elevation) when content scrolls horizontally underneath. Container fill can be made transparent if all items maintain **≥3:1** contrast against the background.
2. **Menu Button (Optional):** Top-aligned `24dp` icon (`on-surface-variant`) that toggles between Collapsed and Expanded states. Never use a brand logo as a button to expand the rail.
3. **FAB / Extended FAB (Optional):** Always **top-aligned** above navigation destinations (never at the bottom). Because it is nested inside the rail container, its resting elevation must be **`level0` (`0dp`)**.
4. **Navigation Items (3–7 Primary):**
   - **Collapsed (Vertical Items):** `56×32dp` pill indicator (`secondary-container`), `24dp` icon (`on-secondary-container` active / `on-surface-variant` inactive), and `label-medium` (`12sp`) text in **`secondary`** when active.
   - **Expanded (Horizontal Items):** `56dp`-tall pill indicator (`secondary-container`) that **visually hugs** the icon and `label-large` (`14sp`) text (`on-secondary-container` when active) by default—or can be overridden to span the full rail width like a legacy Navigation Drawer. **Crucial rule:** Even when the visual indicator hugs the text, the interactive **touch/click target area always spans 100% of the rail width**.
5. **Badges (Optional):** Upper-right corner of the icon in Collapsed rails; inline next to the label text in Expanded rails.

### Tokens, Colors & Measurements (`md.comp.nav-rail`)

| Element / Attribute | Token (`md.comp.nav-rail.*`) | Role / Value | Light / Dark Baseline |
|---|---|---|---|
| **Collapsed Width (Default / Narrow)** | `collapsed.container.width`, `collapsed.narrow.container.width` | **`96dp`** default / **`80dp`** narrow | — |
| **Expanded Width (Min / Max)** | `expanded.container.width.{minimum,maximum}` | **`220dp`** min / **`360dp`** max | — |
| **Collapsed & Standard Expanded Color** | `{collapsed,expanded}.container.color` | `surface` (`level0` `0dp`, `corner.none` `0dp`) | `#FEF7FF` / `#141218` |
| **Modal Expanded Color, Shape & Elev.** | `expanded.modal.container.{color,shape,elevation}` | `surface-container`, `corner.large` (`16dp`), `level2` (`3dp`) | `#F3EDF7` / `#211F26` |
| **Top Space & Header Space** | `{collapsed,expanded}.top-space`, `item.header-space-minimum` | Top space: `44dp`, Header space min: `40dp` (`space500`) | — |
| **Item Container Height** | `item.container.height` (`item.short.container.height`) | `64dp` (`56dp` short) | — |
| **Collapsed Vertical Item Indicator** | `item.vertical.active-indicator.{width,height}` | **`56dp × 32dp`** (`corner.full`, `secondary-container`) | `#E8DEF8` / `#4A4458` |
| **Collapsed Vertical Item Spacing** | `collapsed.item.vertical-space`, `item.vertical.icon-label-space`, `item.vertical.{leading,trailing}-space` | Between items: `4dp`, Icon-label gap: `4dp`, Side padding: `16dp` | — |
| **Expanded Horizontal Item Indicator** | `item.horizontal.active-indicator.height` | **`56dp`** height (`corner.full`, `secondary-container`) | `#E8DEF8` / `#4A4458` |
| **Expanded Horizontal Item Spacing** | `expanded.between-item-space`, `expanded.vertical.trailing-space`, `item.horizontal.icon-label-space`, `item.horizontal.full-width.{leading,trailing}-space` | Between items: `0dp`, Rail trailing: `20dp`, Icon-label gap: `8dp`, Full-width padding: `16dp` | — |
| **Active Icon Color (`24dp`)** | `item.active.icon.color` | `on-secondary-container` (filled glyph) | `#4A4458` / `#E8DEF8` |
| **Active Label (Collapsed Vertical)** | `item.active.label-text.color`, `item.vertical.label-text.font` | **`secondary`**, `label-medium` (`12sp`/`16sp`, weight `500`) | `#625B71` / `#CCC2DC` |
| **Active Label (Expanded Horizontal)** | *(Specs diagram role 4)*, `item.horizontal.label-text.font` | **`on-secondary-container`** (inside pill) / `secondary`, `label-large` (`14sp`/`20sp`, weight `500`) | `#4A4458` / `#E8DEF8` |
| **Inactive Icon & Label** | `item.inactive.{icon,label-text}.color` | `on-surface-variant` (outlined glyph) | `#49454F` / `#CAC4D0` |
| **State Layer (Hover 8%, Focus/Press 10%)** | `item.{active,inactive}.{hovered,focused,pressed}.state-layer.color` | `on-secondary-container` | `#4A4458` / `#E8DEF8` |

### Alignment & Adaptive Behavior
- **Group Vertical Alignment:** Destination items can be **top-aligned** or **center-aligned** as a group (Menu and FAB always remain top-aligned). Use **center alignment** on tablets for easier thumb reach, and whenever a **vertical Floating Toolbar** is displayed on the opposite window edge.
- **Vertical & Horizontal Scrolling:** Rail destinations remain fixed during vertical page scrolling. During horizontal page scrolling, add a `1dp` divider or `level1` (`1dp`) elevation so scrolling content is visually separated underneath.

### XR Adaptation: Navigation Rail Orbiter
- In **Full Space**, adapts into a floating **Navigation Rail Orbiter** anchored in **global context** on the outer left or right edge of the app (never place in local context or *between* two spatial panels; if an XR layout spans >2 spatial panels, use a **Navigation Bar Orbiter** instead).
- **Two FAB Variants:**
  1. **Contained FAB Rail:** FAB remains inside the top of the rail orbiter (compact, familiar).
  2. **Spatialized FAB Rail:** FAB detaches into its own separate orbiter positioned above or below the rail orbiter with a recommended **`20dp` margin** (within the adjacent panel's height) for high spatial emphasis.
- **Spatial Elevation Color Pairings:**
  1. `surface-container` rail + `tertiary` FAB
  2. `surface-container-high` rail + `tertiary-fixed-dim` FAB
  3. `surface-container-highest` rail + `tertiary-fixed-dim` FAB
  4. `tertiary-container` rail + `primary` FAB
- **Placement:** **Offset `20dp`** from the spatial panel edge (global) or **inset `12dp`** (never overlap >half the rail's width, and never exceed the spatial panel's height).

---

## Part 3: Navigation Drawer (`md.comp.navigation-drawer`)

> **⚠️ M3 Expressive Deprecation Notice (May 2025):** The Navigation Drawer is **no longer recommended** in M3 Expressive. Use the **Expanded Navigation Rail** (`md.comp.nav-rail.expanded`, in Standard or Modal configuration) instead. To match the visual look of the baseline Navigation Drawer in an Expanded Navigation Rail, override its active indicator width to fill the container.

### Variants & Usage (Baseline M3)
- **Standard Navigation Drawer:** Coplanar side sheet (`360dp` width, `100%` height) beside body content for **Expanded, Large, and Extra-Large** breakpoints (`surface` `#FEF7FF`/`#141218`, `level0` `0dp` elevation). Can be **permanently visible** or **dismissible** via an App Bar menu icon.
- **Modal Navigation Drawer:** Elevated side sheet (`360dp` width, `100%` height, `surface-container-low` `#F7F2FA`/`#1D1B20`, `level1` `1dp` elevation) blocking background interaction with a **scrim** (`neutral-variant20` `#322F37` at `40%` opacity). Used in **Compact and Medium** breakpoints (on web viewports `<320px` CSS width, swap to a Navigation Bar). Dismissed by selecting an item, tapping the scrim, or swiping toward the anchoring edge.

### Tokens, Colors & Measurements (`md.comp.navigation-drawer`)

| Attribute / Element | Token (`md.comp.navigation-drawer.*`) | Role / Value | Light / Dark Baseline |
|---|---|---|---|
| **Container Dimensions** | `container.{width,height}` | **`360dp`** width × **`100%`** height | — |
| **Container Shape (End Corners)** | `container.shape` | `corner.large.end` (`0, 16, 16, 0dp` radii) | — |
| **Standard Container Color & Elev.** | `standard.container.{color,elevation}` | `surface`, `level0` (`0dp`) | `#FEF7FF` / `#141218` |
| **Modal Container Color & Elev.** | `modal.container.{color,elevation}` | `surface-container-low`, `level1` (`1dp`) | `#F7F2FA` / `#1D1B20` |
| **Modal Scrim** | `scrim.{color,opacity}` | `ref.palette.neutral-variant20` at **`40%`** opacity | `#322F37` (alpha `0.4`) |
| **Active Indicator Size & Shape** | `active-indicator.{width,height,shape}` | **`336dp × 56dp`**, `corner.full` (`28dp` radius), `12dp` side inset | — |
| **Active Indicator Color** | `active-indicator.color` | `secondary-container` | `#E8DEF8` / `#4A4458` |
| **Active Icon, Label & Badge** | `active.{icon,label-text}.color`, `active.label-text.weight` | `on-secondary-container`, `label-large` (`14sp`/`20sp`, weight **`700`**) | `#4A4458` / `#E8DEF8` |
| **Inactive Icon, Label & Badge** | `inactive.{icon,label-text}.color`, `label-text.font` | `on-surface-variant`, `label-large` (`14sp`/`20sp`, weight `500`) | `#49454F` / `#CAC4D0` |
| **Section Headline / Subhead** | `headline.{color,font}` | `on-surface-variant`, `title-small` (`14sp`/`20sp`, weight `500`) | `#49454F` / `#CAC4D0` |
| **Divider Color** | `divider.color` | `outline` (or `outline-variant`), full-width between groups | `#79747E` / `#938F99` |
| **Internal Paddings** | — | Left/Right content padding: **`28dp`** (`12dp` outer + `16dp` inner), Icon-to-label gap: **`12dp`**, Vertical gap between items: **`0dp`** | — |

---

## Accessibility

| Component | Focus & Keyboard Navigation | Visual Indicators, Scaling & Labeling |
|---|---|---|
| **Navigation Bar** | Initial focus lands on the **first navigation item**. `Tab` moves between items; `Space` or `Enter` selects. **Never** hide on scroll when a screen reader is active. | Active item uses **filled icon + bold/secondary label + pill indicator**. Container grows vertically to support up to **2x text scaling** (labels may wrap to 2 lines when scaled; truncate only above 2x). Expand ambiguous labels for screen readers (e.g., visible *"Library"* → `aria-label="Music library"`). |
| **Navigation Rail** | Initial focus lands on the **first interactive element** (Menu, FAB, or first item). `Tab` moves from Menu/FAB to items; `Tab` or `Arrow` keys move between items; `Space` or `Enter` activates. | Target area in Expanded rails **always spans 100% of rail width** even when indicator hugs text. Supports up to **2x text scaling** by growing item height and wrapping text. |
| **Navigation Drawer** | Initial focus lands on the **first navigation item**. `Arrow` keys move between destinations; `Space` or `Enter` selects and moves focus to the newly opened section; tapping scrim dismisses modal drawer. | Destinations announce UI text + `tab` role (except on legacy Android Views). Icons are optional, but must be applied to **all** items in a group or **none**. |

---

## Do / Don't / Caution Guidelines

| Status | Rule | Component |
|---|---|---|
| ✅ **Do** | Use 3–5 destinations in a Navigation Bar (vertical items on Compact, horizontal items on Medium) and 3–7 in a Navigation Rail. | Nav Bar & Rail |
| ❌ **Don't** | Use fewer than 3 or more than 5 items in a Navigation Bar, use horizontal items on a Compact screen, or use a Navigation Bar on desktop/Expanded screens. | Navigation Bar |
| ✅ **Do** | Always include concise 1–2 word text labels on every Navigation Bar and Navigation Rail item, using a filled icon (or semibold weight) for the single active destination. | Nav Bar & Rail |
| ❌ **Don't** | Omit text labels, truncate/wrap/shrink 1x labels on Nav Bars or Rails, show active indicators on multiple items, or use custom low-contrast multi-colored icons. | Nav Bar & Rail |
| ✅ **Do** | Place the FAB right-aligned *above* the Navigation Bar, or top-aligned *above* destinations inside a Navigation Rail (at `0dp` resting elevation). | Nav Bar & Rail |
| ❌ **Don't** | Overlap a Navigation Bar with a FAB, place a FAB at the bottom of a Navigation Rail, or use a brand logo as the Menu button to expand a Navigation Rail. | Nav Bar & Rail |
| ❌ **Don't** | Make a Navigation Rail horizontal, or show two primary navigation components (e.g., Nav Bar + Nav Rail/Drawer) at the same time. | All Navigation |
| ✅ **Do** | In Navigation Drawers, truncate overly long single-line labels with an ellipsis (`...`), use full-width dividers only between *groups*, and apply icons to either all items or none. | Navigation Drawer |
| ❌ **Don't** | Wrap or shrink label text in a Navigation Drawer, place dividers between every individual item, or mix icon and icon-less items. | Navigation Drawer |
| ✅ **Do** | In XR Full Space, place Nav Bar Orbiters at the bottom of the spatial panel and Nav Rail Orbiters on the outer left/right edge in global context. | XR Orbiters |
| ❌ **Don't** | Place a Nav Bar Orbiter at the top of a spatial panel, place a Nav Rail Orbiter between two spatial panels, or overlap an inset orbiter by more than `12dp` (or >50% of its height/width). | XR Orbiters |

---

## Implementation Notes

### Jetpack Compose (`androidx.compose.material3`)
- **Adaptive Scaffold (Recommended):** `NavigationSuiteScaffold` (`androidx.compose.material3.adaptive.navigationsuite`) automatically switches between `NavigationBar`, `NavigationRail`, and `PermanentNavigationDrawer` / `WideNavigationRail` based on `WindowSizeClass`.
- **Navigation Bar:**
  - Baseline: `NavigationBar` + `NavigationBarItem`.
  - *M3 Expressive (1.4.0-alpha+):* `ShortNavigationBar` (`64dp` height) + `ShortNavigationBarItem` (supports `iconPosition = NavigationItemIconPosition.Top` for Compact vertical and `NavigationItemIconPosition.Start` for Medium horizontal).
- **Navigation Rail:**
  - Baseline: `NavigationRail` + `NavigationRailItem`.
  - *M3 Expressive (1.4.0-alpha+):* `WideNavigationRail` + `WideNavigationRailItem` + `ModalWideNavigationRail` (with `WideNavigationRailState` to toggle between collapsed `96dp` and expanded `220–360dp`).
- **Navigation Drawer:** `ModalNavigationDrawer` + `ModalDrawerSheet`, `PermanentNavigationDrawer` + `PermanentDrawerSheet`, `DismissibleNavigationDrawer` + `DismissibleDrawerSheet`, and `NavigationDrawerItem`.

### Flutter (`package:flutter/material.dart`)
- **Navigation Bar:** `NavigationBar` (`height: 64` for Expressive, `destinations: [NavigationDestination(...)]`).
- **Navigation Rail:** `NavigationRail` (`extended: true/false` morphs between collapsed and expanded rail; `leading` slot for Menu + `FloatingActionButton(elevation: 0)`).
- **Navigation Drawer:** `NavigationDrawer` (`children: [NavigationDrawerDestination(...), Divider()]`) used inside `Scaffold.drawer` (modal) or a row layout (standard).

### Material Web (`@material/web`)
- `<md-navigation-bar>` + `<md-navigation-tab>` (experimental/labs in `@material/web/labs/navigationbar/`).
- `<md-navigation-drawer>` + `<md-navigation-drawer-modal>` (in `@material/web/labs/navigationdrawer/`).

### Minimal CSS Sketch

```css
/* M3 Expressive Flexible Navigation Bar (64dp) */
.md-nav-bar {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 64px;
  background-color: var(--md-sys-color-surface-container, #F3EDF7);
}
.md-nav-bar__item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding-block: 6px;
  color: var(--md-sys-color-on-surface-variant, #49454F);
  font: 500 12px/16px var(--md-sys-typescale-label-medium-font, Roboto, sans-serif);
  text-decoration: none;
}
.md-nav-bar__indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 32px;
  border-radius: 9999px;
  transition: background-color 200ms cubic-bezier(0.2, 0, 0, 1);
}
.md-nav-bar__item.is-active {
  color: var(--md-sys-color-secondary, #625B71);
}
.md-nav-bar__item.is-active .md-nav-bar__indicator {
  background-color: var(--md-sys-color-secondary-container, #E8DEF8);
  color: var(--md-sys-color-on-secondary-container, #4A4458);
}

/* Medium Breakpoint: Horizontal Nav Items (40dp pill) */
@media (min-width: 600px) {
  .md-nav-bar__item {
    flex: 0 1 auto;
    flex-direction: row;
  }
  .md-nav-bar__indicator {
    width: auto;
    height: 40px;
    padding-inline: 16px;
    gap: 4px;
  }
}

/* M3 Expressive Collapsed (96dp) & Expanded (220-360dp) Navigation Rail */
.md-nav-rail {
  display: flex;
  flex-direction: column;
  width: 96px;
  height: 100%;
  padding-top: 44px;
  background-color: var(--md-sys-color-surface, #FEF7FF);
  transition: width 300ms cubic-bezier(0.2, 0, 0, 1);
}
.md-nav-rail.is-expanded {
  width: clamp(220px, 28vw, 360px);
  padding-inline-end: 20px;
}
```

---

**Further reading:** `docs/pages/navigation-bar.md`, `docs/pages/navigation-rail.md`, `docs/pages/navigation-drawer.md`, `docs/pages/xr-components.md`, `tokens/components/navigation-bar.md`, `tokens/components/navigation-rail.md`, `tokens/components/navigation-drawer.md`.
