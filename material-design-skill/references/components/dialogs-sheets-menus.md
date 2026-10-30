# Dialogs, Bottom Sheets, Side Sheets & Menus

Distilled Material Design 3 (M3 & M3 Expressive) specifications, tokens, layout metrics, adaptive rules, XR spatial behavior, and accessibility guidelines for **Dialogs**, **Bottom Sheets**, **Side Sheets**, and **Menus**.

Sources: `https://m3.material.io/components/dialogs/{overview,specs,guidelines,xr,accessibility}`, `https://m3.material.io/foundations/xr/components/dialogs`, `https://m3.material.io/components/bottom-sheets/{overview,specs,guidelines,accessibility}`, `https://m3.material.io/components/side-sheets/{overview,specs,guidelines,accessibility}`, `https://m3.material.io/components/menus/{overview,specs,guidelines,accessibility}`

---

## When to Use / When Not to Use

| Component | When to Use | When Not to Use |
|---|---|---|
| **Dialogs** | High-importance blocking prompts requiring an explicit decision, confirmation of high-risk actions (e.g., deleting data), or multi-step mobile forms (**Full-screen dialog** on compact screens). | Low/medium-priority messages that don't require blocking action (use a **Snackbar** or inline tooltip), or simple option selection that shouldn't interrupt flow (use a **Menu**). |
| **Bottom Sheets** | Supplementary content or long action lists/grids on **compact and medium** breakpoints (`≤ 640dp` sheet width): **Standard** for co-planar persistent tools (music player, map details); **Modal** as a mobile alternative to menus or simple dialogs. | Main app content, or on desktop/expanded screens where a **Side Sheet**, **Menu**, or **Basic Dialog** is more ergonomic. |
| **Side Sheets** | Contextual filters, settings, or supplementary details anchored to the trailing edge (right in LTR, left in RTL): **Standard** (co-planar, shrinks main body) on **medium/expanded** screens; **Modal** (with scrim) on **compact** screens. | Content requiring horizontal scrolling (narrow `256–400dp` width forbids horizontal scroll), or primary app content. |
| **Menus** | Temporary sets of actions or options triggered from buttons, icon buttons, split buttons, text fields (dropdown/autocomplete), or secondary/right-click (**Context menus**). | Actions that must remain visible at all times (use a **Toolbar**), or long mobile option lists with verbose labels (adapt to a **Bottom Sheet** on compact screens). |

---

## 1. Dialogs

### Variants: Basic vs. Full-Screen

| Attribute | Basic Dialog (`md.comp.dialog`) | Full-Screen Dialog (`md.comp.full-screen-dialog`) |
|---|---|---|
| **Use Cases** | Urgent alerts, confirmations, single-task decisions, date/time pickers, short selectable lists (all breakpoints). | Multi-field forms requiring keyboard input (e.g., calendar event), non-instant saves, or flows that spawn sub-dialogs (**compact breakpoints only**; swap to Basic Dialog on medium/expanded). |
| **Width & Height** | Width: **`280dp` min, `560dp` max**. Height: Dynamic (respect `56dp` screen edge margin on desktop). | Width: Full window width (`max 560dp` in specs table). Height: Full screen (`100%`). |
| **Corner Radius** | `28dp` (`md.sys.shape.corner.extra-large`) | `0dp` (`md.sys.shape.corner.none`) |
| **Container Color** | `surface-container-high` (`#ECE6F0` Light / `#2B2930` Dark), tint `surface-tint` | Tokens: `surface` (`#FEF7FF` / `#141218`); Header on scroll: `surface-container` (`#F3EDF7` / `#211F26`). *(Specs diagram lists `surface-container-high`)* |
| **Elevation & Scrim** | `level3` (`6dp`), over `scrim` (`#000000` @ `32%` opacity) | `level0` (`0dp`) resting, `level2` (`3dp`) header/action-bar on scroll; **no scrim** (resets elevation so child Basic Dialogs can float over it). |
| **Padding & Gaps** | Outer padding: `24dp` all sides. Icon → Title: `16dp`. Title → Body: `16dp`. Body → Actions: `24dp`. Between buttons: `8dp`. | Header height: `56dp`. Bottom action bar height: `56dp`. Padding: `24dp` top/left/right. Between elements: `8dp`. |
| **Alignment** | **With top icon (`24dp`)**: Icon & Headline **center-aligned**.<br>**Without icon**: Headline **start-aligned**. | Leading close icon (`24dp` "X"), start-aligned headline, trailing confirm text button (e.g., "Save", "Create"). |

### Color & Typography Tokens

| Element | Basic Dialog (`md.comp.dialog`) | Full-Screen Dialog (`md.comp.full-screen-dialog`) |
|---|---|---|
| **Icon (`24dp`)** | `with-icon.icon`: `secondary` (`#625B71` / `#CCC2DC`) | `header.icon` (Close "X"): `on-surface` (`#1D1B20` / `#E6E0E9`) |
| **Headline** | `on-surface` (`#1D1B20` / `#E6E0E9`), `headline-small` (`24pt/32pt`, w400, `0pt`) | `header.headline`: `on-surface`, `title-large` (`22pt/28pt`, w400, `0pt`) |
| **Supporting Text** | `on-surface-variant` (`#49454F` / `#CAC4D0`), `body-medium` (`14pt/20pt`, w400, `0.25pt`) | Standard body typography inside content area |
| **Action Buttons** | `primary` (`#6750A4` / `#D0BCFF`), `label-large` (`14pt/20pt`, w500, `0.1pt`); state layers `primary` (Hover `0.08`, Focus/Pressed `0.10`) | `header.action` & `action-bar`: `primary` (`#6750A4` / `#D0BCFF`), `label-large` (`14pt/20pt`, w500) |
| **Divider (`1dp`)** | `outline` (`#79747E` / `#938F99`) | `surface-variant` (`#E7E0EC` / `#49454F`) |

### Button Ordering, Behavior & XR Adaptation

- **Action button order & rules**:
  - Align buttons to the **trailing edge** (right in LTR, left in RTL). Place the **confirming action** closest to the trailing edge (rightmost in LTR) and the **dismissive action** to its left. When stacked vertically for long labels, place the **confirming action above** the dismissive action.
  - Disable confirming actions until required selections are made; **never disable dismissive actions**.
  - **Max 2 actions**: 1 action for acknowledgement (*OK*), 2 for confirm + dismiss. Avoid a 3rd navigation button like *Learn more* (use inline expansion instead).
  - **Headlines**: Pose a specific question or statement (e.g., *"Use location service?"*); avoid apologies, alarm, or ambiguous titles like *"Are you sure?"*. In full-screen dialogs, move long/variable-length headlines into the body area to avoid truncation.
  - **Full-screen confirmation/dismissal**: Use explicit verbs (**Save**, **Create**, **Send**; never *Done*/*OK*/*Close*; never disable). Confirming saves directly without a second confirmation dialog (only show a Basic Dialog on network/system failure; show field validation errors **inline**). Clicking Close ("X") with unsaved changes **must** trigger a Basic Dialog to confirm discarding changes. Use a **container transform** when launching a full-screen dialog from a FAB.
  - **Scrolling**: Pin headline at top and buttons at bottom with `1dp` dividers when body content scrolls.
- **Android XR Spatial Dialogs (`docs/pages/xr-components.md`)**:
  - **Basic dialogs only**: Never use Full-screen dialogs in XR (actions fall outside field of view). Spatial overrides apply in **Full Space** (use standard 2D dialogs in Home Space).
  - **Color & Z-Elevation**: Use `surface-container-high` or `surface-container-highest` — the dialog **must** have the highest surface luminance/elevation in the app (if using `surface-container-high`, no other orbiter/panel may use `surface-container-highest`). Always include a `scrim` at the app panel's Z-depth (`scrim` only fades in/out while the dialog rises on the Z-axis to the **highest resting level**).
  - **Motion & Placement**: Scale uniformly + fade in/out along the Z-axis using `standard` easing and `long` duration tokens to prevent motion sickness. Center in the user's field of view (with lazy-follow head tracking when supported).
- **Accessibility**: `alertdialog` / `dialog` role; label matches headline. Keep headlines within **4 lines at 200% text size** on Android. Initial focus lands on the first interactive element; `Tab`/`Shift+Tab` cycles inside dialog; `Space`/`Enter` activates; `Escape` closes.

---

## 2. Bottom Sheets

### Standard vs. Modal Variants (`md.comp.sheet.bottom`)

Both variants share identical container, shape, and drag-handle tokens; only **Modal** bottom sheets render a blocking `scrim`.

| Attribute | Standard Bottom Sheet (`docked.standard`) | Modal Bottom Sheet (`docked.modal`) |
|---|---|---|
| **Interaction Model** | Co-planar and non-blocking; users simultaneously view and scroll/pan the primary UI behind it (e.g., music player, map exploration). | Blocking modal surface over a `scrim`; disables underlying UI until confirmed or dismissed (mobile alternative to menus/dialogs). |
| **Color & Elevation** | `surface-container-low` (`#F7F2FA` / `#1D1B20`), tint `surface-tint`, `level1` (`1dp`) | `surface-container-low` (`#F7F2FA` / `#1D1B20`), tint `surface-tint`, `level1` (`1dp`) |
| **Corner Radius** | Docked/Expanded: `28dp` top corners (`md.sys.shape.corner.extra-large.top`, `0dp` bottom). Minimized: `0dp` (`none`). | `28dp` top corners (`md.sys.shape.corner.extra-large.top`, `0dp` bottom) |
| **Drag Handle (Optional)** | `32dp` × `4dp` (`on-surface-variant` `#49454F` / `#CAC4D0` @ `0.40` opacity), centered horizontally with `22dp` top/bottom padding (reserves top **`48dp`** of sheet as accessible touch target). | Same (`32×4dp`, `on-surface-variant` @ `40%`, `22dp` top/bottom padding, `48×48dp` hit target). |
| **Width & Margins** | **Compact (`≤ 640dp`)**: Full window width (`100%`), `72dp` min top margin.<br>**Medium / Expanded (`> 640dp`)**: Max-width **`640dp`**, `56dp` top margin, `56dp` start/end margins (or swap to **Side Sheet** on desktop). | Same width/margin specs (Guidelines note Modal bottom sheets are used primarily on mobile/compact screens). |
| **Focus Indicator** | `secondary` (`#625B71` / `#CCC2DC`), `3dp` thickness, `2dp` outer offset | Same |

### Detents, Scrolling & Accessibility
- **Detents (Peek / Half-expanded / Expanded)**:
  - **Modal initial cap**: Initial vertical position of a modal bottom sheet **must not exceed `50%` of screen height** so top actions remain reachable; taller content can be pulled to full screen and scrolled internally.
  - **Full-screen affordance**: At full-screen height, include a collapse/close icon in the sheet's app bar.
  - **Single-pointer resizing**: Selecting/tapping the drag handle (or pressing `Space`/`Enter` when focused) **must** cycle through preset heights or close the sheet without dragging. If no drag handle is used on a multi-detent sheet, provide an explicit button to toggle height.
- **Dismissal & Predictive Back**: Dismiss modal sheets by tapping an action, tapping the `scrim`, swiping down, clicking the close icon, or using Android **Predictive Back** (sheet detaches from left/right screen edges and scales down to preview the previous screen).
- **Accessibility**: Label only the drag handle (`role="button"`). `Tab` focuses the drag handle; `Space`/`Enter` toggles between available preset heights.

---

## 3. Side Sheets

### Variants & Measurements (`md.comp.sheet.side`)

Side sheets anchor to the **trailing edge** of the window (**right edge in LTR**, **left edge in RTL** with all internal icons/buttons reversed) to avoid colliding with left-edge navigation rails/drawers.

| Variant / Attachment | Container Color & Elevation | Corner Radius (`shape`) | Scrim & Relationship to Main UI |
|---|---|---|---|
| **Standard (Docked / Attached)** | `surface` (`#FEF7FF` / `#141218`), `level0` (`0dp`), optional `1dp` divider (`outline` `#79747E` / `#938F99` in tokens; `outline-variant` in specs diagram) | `0dp` (`md.sys.shape.corner.none`) | No scrim. Co-planar; opening shrinks the main body area width on medium/expanded breakpoints. |
| **Modal (Docked / Attached)** | `surface-container-low` (`#F7F2FA` / `#1D1B20`), `level1` (`1dp`), tint `surface-tint` | `16dp` start corners (`md.sys.shape.corner.large.start`: `topLeft=16dp, bottomLeft=16dp, right=0dp`) *(Note: `28dp` start corners appear in some expressive kits)* | Renders over a blocking `scrim`; preferred on compact screens or when blocking focus is required. |
| **Detached (Floating)** | Same as Standard (`surface`) or Modal (`surface-container-low`) | `16dp` all corners (`md.sys.shape.corner.large` in `detached.container.shape`; `28dp` in some expressive kits) | Inset **`16dp`** from top, bottom, and trailing screen edges (never inset far beyond `16dp`). |

- **Anatomy & Dimensions**:
  - **Width & Height**: Default width `256dp` (`docked.container.width`), **`400dp` max-width**; height `100%` (or `100% - 32dp` when detached with `16dp` margins).
  - **Header**: Optional leading Back icon button (`24dp`, `on-surface-variant`, `16dp` start padding when present), Headline (`on-surface-variant` `#49454F` / `#CAC4D0`, `title-large` `22pt/28pt` w400), and **mandatory Close ("X") icon button** (`24dp`, `on-surface-variant`). Padding: `24dp` start/end, `12dp` between top elements.
  - **Bottom Action Bar (optional)**: Separated by optional `1dp` horizontal divider; `72dp` height (`16dp` top padding, `24dp` bottom padding, `24dp` start/end padding), buttons horizontally **start/left-aligned** (`primary` action tokens).
- **Behavior & Accessibility**:
  - Scrolls vertically independent of the main page; **never allow horizontal scrolling**.
  - **Predictive back (Android)**: Swiping back detaches the side sheet from the **top and bottom** screen edges and scales it in the gesture direction.
  - **Role & Focus**: `role="dialog"`. A visible Close ("X") icon button is **required** in all side sheets so users know whether the surface is transient and can dismiss it via keyboard/AT. Focus order: Headline → Close button → Content → Bottom actions (Cancel, Save).

---

## 4. Menus

### M3 Expressive Vertical Menus vs. Baseline Menus (November 2025 Update)

M3 Expressive introduces **Vertical menus** (`md.comp.menus`) with **Standard** and **Vibrant** color styles, **Grouped** layouts with `2dp` gaps, dynamic corner morphing across submenus, and horizontal icon-only bars.

| Feature | Expressive Vertical Menu (`md.comp.menus`) | Baseline Menu (`md.comp.menu`) |
|---|---|---|
| **Color Styles** | **Standard** (`surface-container-low` fill, `tertiary-container` selected) or **Vibrant** (`tertiary-container` fill, `tertiary` selected; use sparingly for high emphasis). | Surface-based (`surface-container` `#F3EDF7` / `#211F26`, `secondary-container` `#E8DEF8` / `#4A4458` selected). |
| **Container Shape & Submenu Morphing** | Active menu container: `16dp` (`large`).<br>Inactive parent menu (while submenu is focused): morphs to `8dp` (`small`).<br>Grouped section shape: `8dp` (`small`), `2dp` group padding, `2dp` gap (`md.comp.menus.gap`). | `4dp` (`extra-small`), width `112dp` min – `280dp` max. |
| **Menu Item Shape** | Middle item: `4dp` (`extra-small`).<br>First/Last child in group: `12dp` (`medium`) outer corners, `4dp` (`extra-small`) inner corners.<br>Selected item: `12dp` (`medium`). | `0dp` (rectangular row inside `4dp` container). |
| **Item Height, Padding & Icons** | Height: **`44dp`** (`8dp` top/bottom, `16dp` leading/trailing, `12dp` between elements). Icons: **`20dp`**. | Height: **`48dp`** (`12dp` left/right, `12dp` between elements). Icons: **`24dp`**. |
| **Elevation** | `level2` (`3dp`) | `level2` (`3dp`) |

### Expressive Menu Color Tokens (`md.comp.menus.standard` vs `md.comp.menus.vibrant`)

| Element / State | Standard Expressive (`md.comp.menus.standard`) | Vibrant Expressive (`md.comp.menus.vibrant`) |
|---|---|---|
| **Menu & Item Container** | `surface-container-low` (`#F7F2FA` / `#1D1B20`) | `tertiary-container` (`#FFD8E4` / `#633B48`) |
| **Unselected Label Text** | `on-surface` (`#1D1B20` / `#E6E0E9`) | `on-tertiary-container` (`#633B48` / `#FFD8E4`) |
| **Unselected Supporting / Trailing Text & Section Label** | `on-surface-variant` (`#49454F` / `#CAC4D0`) | `on-tertiary-container` (`#633B48` / `#FFD8E4`) |
| **Unselected Leading / Trailing Icons** | `on-surface-variant` (`#49454F` / `#CAC4D0`) | Rest: `on-tertiary-container`; Hover/Focus/Pressed: `tertiary` (`#7D5260` / `#EFB8C8`) |
| **Unselected State Layer** | `on-surface` (Hover/Active `0.08`, Focus/Pressed `0.10`) | `on-tertiary-container` (Hover/Active `0.08`, Focus/Pressed `0.10`) |
| **Selected Item Container** | `tertiary-container` (`#FFD8E4` / `#633B48`) | `tertiary` (`#7D5260` / `#EFB8C8`) |
| **Selected Label, Supporting Text & Icons** | `on-tertiary-container` (`#633B48` / `#FFD8E4`) | `on-tertiary` (`#FFFFFF` / `#492532`) |
| **Selected State Layer** | `on-tertiary-container` (Hover `0.08`, Focus/Pressed `0.10`) | `on-tertiary` (Hover `0.08`, Focus/Pressed `0.10`) |
| **Disabled Item** | `0.38` opacity on `on-surface` (`on-tertiary-container` if selected) | `0.38` opacity on `on-tertiary-container` (`on-tertiary` if selected) |
| **Focus Indicator** | `secondary` (`#625B71` / `#CCC2DC`), `3dp` thickness, `-3dp` inner offset | Same |

- **Typography**: Label text & Trailing supporting text (keyboard shortcuts): `label-large` (`14pt/20pt`, w500, `0.1pt`); Supporting text: `body-small` (`12pt/16pt`, w400, `0.4pt`).
- **Horizontal Icon-Only Menu Bar (`md.comp.menus.horizontal`)**: `full` circular container (`8dp` top/bottom space); icon-only items use `16dp` padding around icons, `4dp` gap, `12dp` (`medium`) hover/focus/pressed shape, and `full` circular selected shape.

### Grouping, Submenus, Behavior & Accessibility
- **Gaps (`2dp`) vs. Dividers (`1dp`, `8dp` top/bottom padding)**:
  - Use **gaps** (`2dp`) to divide expressive vertical menus into distinct rounded groups (max **1–2 gaps** per menu; never resize gap; **never use gaps in scrollable menus**; not supported on Web).
  - Use **dividers** (`1dp` `surface-variant` `#E7E0EC` / `#49454F`) for **scrollable menus** (which must show a persistent scrollbar), text-field dropdowns, and Web menus.
- **Cascading Submenus**: Open **next to** the parent item without overlapping it (reposition automatically near screen edges). Best on large screens (not supported in Jetpack Compose; consider swapping menus for **Bottom Sheets** on compact screens).
- **Selection & Availability**: Single-select closes on selection; Multi-select stays open until dismissed. Show unavailable actions as **disabled** rather than removing them. Never place buttons, switches, or secondary actions inside custom menu slots (`48×48dp` min targets).
- **Accessibility**:
  - Maintain **3:1 contrast** between selected and unselected items and pair color/shape changes with a **checkmark icon**. Mark icons next to text as **decorative** (`aria-hidden="true"`).
  - **Keyboard**: Initial focus lands on the first item. **Disabled items receive focus** (not selectable); **dividers and gaps never receive focus**. `Up`/`Down` arrows navigate items (or open closed menu); `Left`/`Right` arrows open/close submenus; **Letters** jump to matching items; `Space`/`Enter` selects; `Escape` closes.

---

## Implementation Notes

- **Jetpack Compose (`androidx.compose.material3`)**: `AlertDialog`, `BasicAlertDialog`, `Dialog`; `ModalBottomSheet`, `BottomSheetScaffold`; `SupportingPaneScaffold` (side sheet); `DropdownMenu`, `DropdownMenuItem`, `ExposedDropdownMenuBox`.
- **Flutter (`package:flutter/material.dart`)**: `AlertDialog`, `Dialog`, `Dialog.fullscreen`; `showModalBottomSheet` (`showDragHandle: true`), `BottomSheet`; `MenuAnchor`, `MenuItemButton`, `SubmenuButton`, `DropdownMenu`.
- **Material Web (`@material/web`)**: `md-dialog`; `md-menu`, `md-menu-item`, `md-sub-menu`.

```css
/* Basic Dialog */
.md3-dialog { min-width: 280px; max-width: 560px; padding: 24px; border-radius: var(--md-sys-shape-corner-extra-large, 28px); background: var(--md-sys-color-surface-container-high, #ECE6F0); color: var(--md-sys-color-on-surface, #1D1B20); box-shadow: var(--md-sys-elevation-level3); }
.md3-dialog::backdrop { background: rgb(0 0 0 / 0.32); }

/* Bottom Sheet & Drag Handle */
.md3-bottom-sheet { width: 100%; max-width: 640px; background: var(--md-sys-color-surface-container-low, #F7F2FA); border-radius: 28px 28px 0 0; box-shadow: var(--md-sys-elevation-level1); }
.md3-bottom-sheet__handle-target { display: flex; justify-content: center; padding-block: 22px; }
.md3-bottom-sheet__handle { width: 32px; height: 4px; border-radius: 9999px; background: var(--md-sys-color-on-surface-variant, #49454F); opacity: 0.4; }

/* Expressive Vertical Menu */
.md3-menu { padding: 2px; border-radius: var(--md-sys-shape-corner-large, 16px); background: var(--md-sys-color-surface-container-low, #F7F2FA); box-shadow: var(--md-sys-elevation-level2); }
.md3-menu--vibrant { background: var(--md-sys-color-tertiary-container, #FFD8E4); color: var(--md-sys-color-on-tertiary-container, #633B48); }
.md3-menu-item { display: flex; align-items: center; gap: 12px; min-height: 44px; padding: 8px 16px; border-radius: var(--md-sys-shape-corner-extra-small, 4px); }
.md3-menu-item[aria-checked="true"] { border-radius: var(--md-sys-shape-corner-medium, 12px); background: var(--md-sys-color-tertiary-container, #FFD8E4); color: var(--md-sys-color-on-tertiary-container, #633B48); }
.md3-menu--vibrant .md3-menu-item[aria-checked="true"] { background: var(--md-sys-color-tertiary, #7D5260); color: var(--md-sys-color-on-tertiary, #FFFFFF); }
```

Further reading: [docs/pages/dialogs.md](file:///Users/leon/Desktop/Leon/material-design-skill/docs/pages/dialogs.md), [docs/pages/xr-components.md](file:///Users/leon/Desktop/Leon/material-design-skill/docs/pages/xr-components.md), [tokens/components/dialogs.md](file:///Users/leon/Desktop/Leon/material-design-skill/tokens/components/dialogs.md), [docs/pages/bottom-sheets.md](file:///Users/leon/Desktop/Leon/material-design-skill/docs/pages/bottom-sheets.md), [tokens/components/bottom-sheets.md](file:///Users/leon/Desktop/Leon/material-design-skill/tokens/components/bottom-sheets.md), [docs/pages/side-sheets.md](file:///Users/leon/Desktop/Leon/material-design-skill/docs/pages/side-sheets.md), [tokens/components/side-sheets.md](file:///Users/leon/Desktop/Leon/material-design-skill/tokens/components/side-sheets.md), [docs/pages/menus.md](file:///Users/leon/Desktop/Leon/material-design-skill/docs/pages/menus.md), [tokens/components/menus.md](file:///Users/leon/Desktop/Leon/material-design-skill/tokens/components/menus.md)
