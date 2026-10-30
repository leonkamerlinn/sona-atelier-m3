# Floating Action Buttons (FAB), Extended FAB & FAB Menu

Floating action buttons (FABs), Extended FABs, and FAB menus represent the highest-emphasis, primary constructive action(s) on a screen in Material Design 3 (M3) and M3 Expressive.

Sources: https://m3.material.io/components/floating-action-button/{overview,specs,guidelines,accessibility}, https://m3.material.io/components/extended-fab/{overview,specs,guidelines,accessibility}, https://m3.material.io/components/fab-menu/{overview,specs,guidelines,accessibility}

---

## 1. Choosing Between FAB, Extended FAB, and FAB Menu

| Component | When to Use | When NOT to Use |
|---|---|---|
| **FAB** (`56dp`, `80dp`, `96dp`) | Single primary, constructive action (`Create`, `Compose`, `Edit`, `Share`) when a clear, unambiguous system icon suffices. Can pair with a **Floating toolbar** or **Navigation rail**. | Minor, overflow, unclear, or destructive actions (`Archive`, `Trash`, `Cut`, `Volume`), multiple FABs on one screen, inside individual cards, or disabled states. |
| **Extended FAB** (`56dp`, `80dp`, `96dp`) | Single primary action when a `1–2` word text label is needed to clarify an icon or add visual emphasis, especially over long-scrolling views (e.g., `Checkout`, `Find flights`, `Publish`). Can be text-only (no icon). | Icon-only (use a FAB), as one option in a button group (use a Filled button), paired with a Floating toolbar, overlaid on a Docked toolbar/app bar/dialog/card, or to open a FAB menu. |
| **FAB Menu** (`2–6` items) *(M3 Expressive)* | Replaces M2 speed dials and stacked small FABs. Opens from any size **FAB** to reveal `2–6` closely related actions under one theme (e.g., `Share` → *Link, Email, Message*). | With **1 item** (use a single FAB), `>6` items, unrelated actions, opened from an **Extended FAB**, or when the FAB is paired with a **Toolbar** or **Navigation rail**. |

---

## 2. Floating Action Button (FAB)

Token sets: `md.comp.fab` (Regular/Small `56dp`), `md.comp.fab.medium` (`80dp`), `md.comp.fab.large` (`96dp`) + color sets `md.comp.fab.{primary-container,secondary-container,tertiary-container,primary,secondary,tertiary}`.

### M3 Expressive Changes (May 2025)
- **Sizes aligned with Extended FAB**: Added **Medium FAB (`80dp`)** as the recommended default for most layouts. Retained **FAB (`56dp`)** (referred to as expressive Small/Regular FAB) and **Large FAB (`96dp`)**.
- **Deprecated Small FAB (`40dp`)**: Baseline `md.comp.fab.small` (`40x40dp`) is no longer recommended; use a `56dp`+ FAB or a **FAB menu** instead of stacked small FABs.
- **Colors**: Renamed existing tonal styles (`primary` → `primary-container`, `secondary` → `secondary-container`, `tertiary` → `tertiary-container`) and added 3 high-contrast tone styles (`primary`, `secondary`, `tertiary`). **Surface (`md.comp.fab.surface`)** and **Branded (`md.comp.fab.branded`)** FABs are no longer recommended.

### Sizes & Measurements

| Variant | Token Prefix | Status | Container Size (W × H) | Corner Radius (`shape`) | Icon Size | Implicit Icon Padding | Recommended Breakpoint / Context |
|---|---|---|---|---|---|---|---|
| **FAB (Regular / Expressive Small)** | `md.comp.fab` | Active | `56 × 56dp` | `16dp` (`md.sys.shape.corner.large`) | `24dp` | `16dp` all sides | Compact windows where other actions are present on screen. |
| **Medium FAB** *(Recommended)* | `md.comp.fab.medium` | **M3 Expressive** | `80 × 80dp` | `20dp` (`md.sys.shape.corner.large-increased`) | `28dp` | `26dp` all sides | Most situations; compact and medium windows. |
| **Large FAB** | `md.comp.fab.large` | Active | `96 × 96dp` | `28dp` (`md.sys.shape.corner.extra-large`) | `36dp` | `30dp` all sides | Expanded/large screens (tablets/desktop), or hero primary actions on compact screens. |
| **Small FAB (Baseline)** | `md.comp.fab.small` | **Deprecated** | `40 × 40dp` (`48dp` target) | `12dp` (`md.sys.shape.corner.medium`) | `24dp` | `8dp` all sides | *Not recommended in M3 Expressive.* |

### 6 Color Styles & Legacy Styles (Shared by FAB & Extended FAB)

All 6 active styles provide equivalent contrast (≥ 3:1 icon-to-container); select based on visual hierarchy and palette preference.

| Color Style | Token Suffix | Container Color Role (Light / Dark) | Icon, Label & State Layer Role (Light / Dark)* | Status |
|---|---|---|---|---|
| **Primary container** *(Default)* | `*.primary-container` | `primary-container` (`#EADDFF` / `#4F378B`) | `on-primary-container` (`#4F378B` / `#EADDFF`) | Active (Tonal) |
| **Secondary container** | `*.secondary-container` | `secondary-container` (`#E8DEF8` / `#4A4458`) | `on-secondary-container` (`#4A4458` / `#E8DEF8`) | Active (Tonal) |
| **Tertiary container** | `*.tertiary-container` | `tertiary-container` (`#FFD8E4` / `#633B48`) | `on-tertiary-container` (`#633B48` / `#FFD8E4`) | Active (Tonal) |
| **Primary** | `*.primary` | `primary` (`#6750A4` / `#D0BCFF`) | `on-primary` (`#FFFFFF` / `#381E72`) | **M3 Expressive** (Tone) |
| **Secondary** | `*.secondary` | `secondary` (`#625B71` / `#CCC2DC`) | `on-secondary` (`#FFFFFF` / `#332D41`) | **M3 Expressive** (Tone) |
| **Tertiary** | `*.tertiary` | `tertiary` (`#7D5260` / `#EFB8C8`) | `on-tertiary` (`#FFFFFF` / `#492532`) | **M3 Expressive** (Tone) |
| **Surface** *(Legacy)* | `*.surface` | `surface-container-high` (`#ECE6F0` / `#2B2930`) + `surface-tint`; lowered: `surface-container-low` (`#F7F2FA` / `#1D1B20`) | `primary` (`#6750A4` / `#D0BCFF`) | **Not recommended** |
| **Branded** *(Legacy)* | `*.branded` | `surface-container-high` (`#ECE6F0` / `#2B2930`) + `surface-tint`; lowered: `surface-container-low` | Multicolor logo (`36dp` regular, `48dp` large); state layer `primary` | **Not recommended** |

*\*State layer rule: The state layer color must always match the icon/label color (`on-primary` for `primary` container, `on-primary-container` for `primary-container`, etc.).*

### Elevation & Interaction States (FAB & Extended FAB)

- **Never disabled**: FABs and Extended FABs have **no disabled state**. If the primary action is unavailable, hide the FAB completely.
- **State layer opacities**: Hover `0.08` (`8%`), Focus `0.10` (`10%`), Pressed `0.10` (`10%`).
- **Focus indicator**: `md.sys.color.secondary` (`#625B71` / `#CCC2DC`), thickness `3dp`, outer offset `2dp`.
- **Elevation**:
  - **Standard (Floating)**: Rest `level3` (`6dp`), Hover `level4` (`8dp`), Focused `level3` (`6dp`), Pressed `level3` (`6dp`), Shadow `#000000`.
  - **Lowered** *(when nested inside a Navigation rail or legacy Bottom app bar)*: Rest `level1` (`1dp`), Hover `level2` (`3dp`), Focused `level1` (`1dp`), Pressed `level1` (`1dp`).

### Placement, Adaptive Layout & Behavior
- **Margins**: **`16dp`** from screen edges on compact and medium windows; **`24dp`** on large and extra-large windows.
- **Position by breakpoint**:
  - **Compact / Medium**: Bottom-trailing corner (`bottom-right` in LTR, `bottom-left` in RTL), or center/left aligned above the Navigation bar.
  - **Expanded / Large**: Upper-left region inside the **Navigation rail** (so it is among the first interactive elements encountered by screen readers and visual users), or bottom-right corner.
- **Icons**: Always use a **filled** system icon (not outlined) with a clear, universal meaning (`Add`, `Edit`, `Message`, `Navigate`). Never place badges or notification dots on a FAB container.
- **Scrolling & Transitions**:
  - **Scrolling**: Remains fixed in place over scrolling content.
  - **Tab switching**: When switching between tabs/pages, the FAB must **briefly disappear (scale out) and reappear (scale in)** from its center point once the new content settles. **Never** slide/animate the FAB horizontally along with tab body content.
  - **Container transform**: Can morph and expand into a new surface, bottom sheet, full-screen dialog, Extended FAB, or FAB menu.

---

## 3. Extended FAB (`extended-fab`)

Token sets: `md.comp.extended-fab.small` (`56dp`), `md.comp.extended-fab.medium` (`80dp`), `md.comp.extended-fab.large` (`96dp`) + color sets `md.comp.extended-fab.{primary-container,secondary-container,tertiary-container,primary,secondary,tertiary}`.

### M3 Expressive Changes (May 2025)
- **3 Sizes (`Small 56dp`, `Medium 80dp`, `Large 96dp`)**: Replaces the single baseline `md.comp.extended-fab` (`56dp`). Heights and corner radii match the 3 FAB sizes (`56dp`/`16dp`, `80dp`/`20dp`, `96dp`/`28dp`) for seamless scroll collapse/expand transitions.
- **Larger typography & tighter small padding**: Small Extended FAB updates typography from `label-large` (`14pt`) to **`title-medium` (`16pt`)**, reduces icon–label gap from `12dp` to **`8dp`**, and equalizes trailing padding from `20dp` to **`16dp`**.

### Sizes, Typography & Measurements

| Variant | Token Prefix | Status | Height | Width | Corner Radius | Icon Size | Horiz. Padding (Lead / Trail) | Icon–Label Gap | Typography Role (Size / Line / Weight / Track) |
|---|---|---|---|---|---|---|---|---|---|
| **Small Extended FAB** | `md.comp.extended-fab.small` | **M3 Expressive** | `56dp` | Dynamic (hugs content) | `16dp` (`corner.large`) | `24dp` | `16dp` / `16dp` (`space200`) | `8dp` (`space100`) | `title-medium` (`16pt` / `24pt` / `500` / `0.15pt`) |
| **Medium Extended FAB** | `md.comp.extended-fab.medium` | **M3 Expressive** | `80dp` | Dynamic (hugs content) | `20dp` (`corner.large-increased`) | `28dp` | `26dp` / `26dp` | `12dp` (`space150`) | `title-large` (`22pt` / `28pt` / `400` / `0pt`) |
| **Large Extended FAB** | `md.comp.extended-fab.large` | **M3 Expressive** | `96dp` | Dynamic (hugs content) | `28dp` (`corner.extra-large`) | `36dp` | `28dp` / `28dp` | `16dp` (`space200`) | `headline-small` (`24pt` / `32pt` / `400` / `0pt`) |
| **Baseline Extended FAB** | `md.comp.extended-fab` | **Deprecated** | `56dp` | Dynamic (`80dp` min) | `16dp` (`corner.large`) | `24dp` | `16dp` / `20dp` (`space200`/`250`) | `12dp` (`space150`) | `label-large` (`14pt` / `20pt` / `500` / `0.1pt`) |

### Anatomy, Behavior & Placement Rules
- **Anatomy**:
  1. **Container**: Rounded rectangle that dynamically hugs its text and optional icon.
  2. **Label text (Required)**: `1–2` words max, sentence case, single line (never wrap or truncate).
  3. **Icon (Optional)**: Leading side (left in LTR, right in RTL). **Unlike standard FABs, an Extended FAB can be text-only (no icon), but can NEVER be icon-only.**
- **Scroll & Rail Collapse Behavior**:
  - When scrolling down a page (or when an expanded Navigation rail collapses), an Extended FAB can morph into a standard **FAB** of the same height: the label fades out, the icon shifts to center, and the width contracts to a square (`56×56dp`, `80×80dp`, or `96×96dp`).
  - When scrolling up or reaching the bottom of the view (or expanding the Navigation rail), it expands back into an Extended FAB (shape widens, icon moves to leading side, label fades in).
- **Breakpoint Alignment**:
  - **Compact / Medium**: Placed at the bottom of the screen (`16dp` margin), either **center-aligned** or **trailing-aligned** (right in LTR, left in RTL).
  - **Expanded / Large**: Placed either at the top of an expanded **Navigation rail** (`upper-left`) or at the **bottom-right edge** of the window in **both LTR and RTL languages** (`24dp` margin on large screens).
- **✅ Do / ❌ Don't**:
  - **✅ Do**: Place above the Navigation bar with `16dp` margin; allow it to collapse to a FAB on scroll; use without an icon if a short text label (`Save draft`) is clearer alone.
  - **❌ Don't**: Place on top of a Docked toolbar or below a Top app bar in the upper half of a mobile screen; pair on the same screen with a Floating toolbar; place inside cards or dialogs; use multiple Extended FABs on one screen; or use as an action next to a "Back" button (use a Filled button instead).

---

## 4. FAB Menu (`fab-menu`)

New in M3 Expressive (`md.comp.fab-menu.*`). Replaces M2 speed dials and stacked small FABs.

### Overview & Rules
- Opens **only** from a **FAB** (Regular `56dp`, Medium `80dp`, or Large `96dp`)—**never** from an Extended FAB.
- Displays **`2–6` closely related actions** stacked vertically above a `56×56dp` circular **Close button** (`close` / `×` icon).
- **Universal menu size**: A single FAB menu item size (`56dp` height, matching Medium button specs) pairs with all three FAB sizes.
- **No toolbar/rail pairing**: Never use a FAB menu when the FAB is paired with a Floating toolbar, Docked toolbar, or Navigation rail.

### Measurements & Common Tokens (`md.comp.fab-menu`)

| Element | Attribute | Token | Value |
|---|---|---|---|
| **Close Button** | Size (W × H) | `md.comp.fab-menu.close-button.container.{width,height}` | `56 × 56dp` |
| | Shape | `md.comp.fab-menu.close-button.container.shape` | `full` (`md.sys.shape.corner.full`, circular) |
| | Icon size | `md.comp.fab-menu.close-button.icon.size` | `20dp` |
| | Elevation | `md.comp.fab-menu.close-button.{container,hovered.container}.elevation` | `6dp` (`level3`) at rest/focus/press; `8dp` (`level4`) on hover |
| | Gap to first menu item | `md.comp.fab-menu.close-button.between-space` | `8dp` (`md.sys.measurement.space100`) |
| **Menu Item** *(2–6 items)* | Height & Width | `md.comp.fab-menu.menu-item.container.height` | `56dp` height; **dynamic width** hugging content (`min 48dp`) |
| | Shape | `md.comp.fab-menu.menu-item.container.shape` | `full` (`md.sys.shape.corner.full`, pill—never square) |
| | Horiz. padding (Lead / Trail) | `md.comp.fab-menu.menu-item.{leading,trailing}-space` | `24dp` / `24dp` (`md.sys.measurement.space300`) |
| | Icon size & gap | `md.comp.fab-menu.menu-item.{icon.size,icon-label-space}` | `24dp` icon; `8dp` (`space100`) gap to label |
| | Typography | `md.comp.fab-menu.menu-item.label-text` | `title-medium` (`16pt` / `24pt`, weight `500`, tracking `0.15pt`) |
| | Gap between menu items | `md.comp.fab-menu.menu-item.between-space` | `4dp` (`md.sys.measurement.space50`) |
| | Elevation | `md.comp.fab-menu.menu-item.container.elevation` | `0dp` (`level0`) at rest; `6dp` (`level3`) focus/press; `8dp` (`level4`) hover |

### 3 Color Sets (Contrasting Close Button + Tonal Menu Items)

Match the FAB menu color set to the triggering FAB's palette family (`Primary`, `Secondary`, or `Tertiary`—works whether the FAB itself uses the tonal `*-container` or vivid `*` style):

| Color Set | Pair with FAB Style | Close Button Container | Close Button Icon & State Layer | Menu Item Container | Menu Item Label, Icon & State Layer |
|---|---|---|---|---|---|
| **Primary Set** | `primary-container` or `primary` | `primary` (`#6750A4` / `#D0BCFF`) | `on-primary` (`#FFFFFF` / `#381E72`) | `primary-container` (`#EADDFF` / `#4F378B`) | `on-primary-container` (`#4F378B` / `#EADDFF`) |
| **Secondary Set** | `secondary-container` or `secondary` | `secondary` (`#625B71` / `#CCC2DC`) | `on-secondary` (`#FFFFFF` / `#332D41`) | `secondary-container` (`#E8DEF8` / `#4A4458`) | `on-secondary-container` (`#4A4458` / `#E8DEF8`) |
| **Tertiary Set** | `tertiary-container` or `tertiary` | `tertiary` (`#7D5260` / `#EFB8C8`) | `on-tertiary` (`#FFFFFF` / `#492532`) | `tertiary-container` (`#FFD8E4` / `#633B48`) | `on-tertiary-container` (`#633B48` / `#FFD8E4`) |

*State layer opacities for both Close button and Menu items: Hover `0.08` (`8%`), Focus `0.10` (`10%`), Pressed `0.10` (`10%`).*

### Anchoring, Margin Math & Platform Behavior
- **Trailing alignment**: Always align menu items and the close button to the **trailing edge** (`right` in LTR, `left` in RTL; mirror icon/text order in RTL).
- **Top-trailing corner anchor rule**: To ensure a smooth morph animation when opening, the `56dp` Close button shares the **top-trailing corner** of the FAB that opened it. Consequently, larger FABs place the Close button higher above the bottom edge of the screen:
  - **Opened from Regular `56dp` FAB** (`16dp` margin): Close button bottom margin = **`16dp`** (`16 + 56 - 56`).
  - **Opened from Medium `80dp` FAB** (`16dp` margin): Close button bottom margin = **`40dp`** (`16 + 80 - 56`).
  - **Opened from Large `96dp` FAB** (`16dp` margin): Close button bottom margin = **`56dp`** (`16 + 96 - 56`).
  - **Large / Extra-large windows**: Increase base FAB and FAB menu outer margins from `16dp` to **`24dp`**.
- **Web / Desktop adaptation**: On web, a FAB menu opens a standard M3 **Menu** component (`4dp` recommended gap from the FAB) rather than floating pill items, inheriting standard Menu states and keyboard behavior.
- **Scrolling in short viewports**: In landscape or short windows where all `2–6` items cannot fit, menu items scroll vertically **behind** the `56dp` Close button so the Close button remains fixed and unobstructed in front.
- **Container transform**: Selecting any FAB menu item can expand that pill item via a container transform into a full-screen dialog or new view.
- **✅ Do / ❌ Don't / ⚠️ Caution**:
  - **✅ Do**: Include both an icon and concise label text in every menu item; let each pill hug its own text width.
  - **⚠️ Caution**: Only remove icons from menu items if strictly necessary; icons differentiate items at a glance.
  - **❌ Don't**: Remove label text (never use icon-only FAB menu items), stretch all menu items to equal fixed widths, change menu item shapes from round to square, use a 1-item FAB menu, or let scrolling items pass in front of the Close button.

---

## 5. Accessibility (FAB, Extended FAB & FAB Menu)

### Focus Order & Keyboard Navigation
- **Focus priority**: Prioritize the FAB / Extended FAB in the screen's focus order—on mobile, focus typically moves `Top App Bar` → `Navigation Bar` → `FAB` (skipping long scrolling body content) for rapid assistive-tech access.
- **FAB Menu focus order**:
  1. When the FAB is activated and transforms into the FAB menu, **initial focus remains on the Close button (`#1`)** at the bottom.
  2. Pressing `Tab` moves focus to the **topmost menu item (`#2`)**, then sequentially **top-to-bottom** (`#3`, `#4`, ...) through the remaining items.
- **Keyboard keys**: `Tab` moves focus to the FAB, Extended FAB, or next FAB menu item; `Space` or `Enter` activates the focused button/item.
- **Focus indicator visibility**: A floating FAB, Extended FAB, or open FAB menu may partially overlap background content, but must **never completely obscure an actionable element AND its focus indicator** simultaneously.

### Labels, Roles & Tooltips
- **FAB**:
  - Role: `Button`. Label: Action description (e.g., `"Compose a new message"`, never `"Pencil"` or `"Plus"`).
  - **Tooltip required on web**: Display a tooltip with the action label on both **hover** and **keyboard focus**.
  - **Contrast**: Icon-to-container contrast must be at least **3:1**.
- **Extended FAB**:
  - Role: `Button` (icon and visible label are grouped as **one single focusable element**).
  - **First-word label rule**: If an extended accessibility label is provided, it **must begin with the exact same first word** as the visible text label (e.g., visible `"Create"` → accessibility label `"Create a new invite"`).
  - **No tooltip**: Do **not** show a redundant tooltip on hover or focus since the text label is already visible.
- **FAB Menu**:
  - **Android Close Button**: `Label`: `"Toggle menu"`, `Role`: `Button`, `State`: `Expanded` / `Collapsed`.
  - **Android Menu Items**: `Label`: Matches visible UI text (e.g., `"Reply all"`), `Role`: `Button`.
  - **Web**: Follow standard FAB (`aria-haspopup="menu"`, `aria-expanded`) + Menu (`role="menu"`, `role="menuitem"`) accessibility semantics.

---

## 6. Implementation Notes

### Platform API Mapping

| Component | Jetpack Compose (`androidx.compose.material3`) | Flutter (`package:flutter/material.dart`) | Material Web (`@material/web`) |
|---|---|---|---|
| **FAB** | `FloatingActionButton`, `MediumFloatingActionButton` *(M3 Expressive)*, `LargeFloatingActionButton`, `SmallFloatingActionButton` *(deprecated)* | `FloatingActionButton`, `FloatingActionButton.large`, `FloatingActionButton.small` *(legacy)* | `<md-fab size="medium\|large" variant="primary\|secondary\|tertiary">` |
| **Extended FAB** | `ExtendedFloatingActionButton`, `SmallExtendedFloatingActionButton`, `MediumExtendedFloatingActionButton`, `LargeExtendedFloatingActionButton` *(M3 Expressive)* | `FloatingActionButton.extended` (`isExtended` property toggles collapse to FAB) | `<md-fab label="Compose">` |
| **FAB Menu** | `FloatingActionButtonMenu`, `FloatingActionButtonMenuItem`, `ToggleFloatingActionButton` *(M3 Expressive)* | *(Custom overlay / `MenuAnchor` on web)* | `<md-fab>` paired with `<md-menu>` (web spec) |

### Minimal CSS Sketch (`--md-sys-*` Custom Properties)

```css
/* M3 Expressive Medium FAB (80dp) & Small Extended FAB (56dp) */
.md-fab-medium {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px; /* md.comp.fab.medium.container.width */
  height: 80px; /* md.comp.fab.medium.container.height */
  border-radius: 20px; /* md.comp.fab.medium.container.shape (corner.large-increased) */
  background-color: var(--md-sys-color-primary-container, #EADDFF);
  color: var(--md-sys-color-on-primary-container, #4F378B);
  box-shadow: var(--md-sys-elevation-level3, 0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.3));
  border: none;
  cursor: pointer;
}
.md-fab-medium > .md-icon {
  width: 28px; /* md.comp.fab.medium.icon.size */
  height: 28px;
}

.md-extended-fab-small {
  display: inline-flex;
  align-items: center;
  gap: 8px; /* md.comp.extended-fab.small.icon-label-space */
  height: 56px; /* md.comp.extended-fab.small.container.height */
  padding-inline: 16px; /* md.comp.extended-fab.small.leading/trailing-space */
  border-radius: 16px; /* md.comp.extended-fab.small.container.shape (corner.large) */
  background-color: var(--md-sys-color-primary-container, #EADDFF);
  color: var(--md-sys-color-on-primary-container, #4F378B);
  font: 500 1rem / 1.5rem var(--md-sys-typescale-title-medium-font, Roboto, sans-serif);
  letter-spacing: 0.15px;
  white-space: nowrap;
  border: none;
  cursor: pointer;
}

/* M3 Expressive FAB Menu (Primary Set) */
.md-fab-menu {
  position: fixed;
  inset-block-end: 16px; /* 16dp from 56dp FAB; 40dp from 80dp FAB; 56dp from 96dp FAB */
  inset-inline-end: 16px; /* 24px on large/extra-large screens */
  display: flex;
  flex-direction: column-reverse; /* Close button at bottom (#1 focus), items stacked above */
  align-items: flex-end;
}
.md-fab-menu__close {
  width: 56px;
  height: 56px;
  margin-block-start: 8px; /* md.comp.fab-menu.close-button.between-space */
  border-radius: 9999px; /* corner.full */
  background-color: var(--md-sys-color-primary, #6750A4);
  color: var(--md-sys-color-on-primary, #FFFFFF);
  z-index: 2; /* Items scroll behind close button in short viewports */
}
.md-fab-menu__items {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px; /* md.comp.fab-menu.menu-item.between-space */
}
.md-fab-menu__item {
  display: inline-flex;
  align-items: center;
  gap: 8px; /* md.comp.fab-menu.menu-item.icon-label-space */
  height: 56px; /* md.comp.fab-menu.menu-item.container.height */
  padding-inline: 24px; /* md.comp.fab-menu.menu-item.leading/trailing-space */
  border-radius: 9999px; /* corner.full */
  background-color: var(--md-sys-color-primary-container, #EADDFF);
  color: var(--md-sys-color-on-primary-container, #4F378B);
  font: 500 1rem / 1.5rem var(--md-sys-typescale-title-medium-font, Roboto, sans-serif);
}
```

---

Further reading: `docs/pages/fab.md`, `docs/pages/extended-fab.md`, `docs/pages/fab-menu.md`, `tokens/components/floating-action-button.md`, `tokens/components/extended-fab.md`, `tokens/components/fab-menu.md`.
