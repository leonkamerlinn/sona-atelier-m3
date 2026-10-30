# Selection Controls, Chips, and Sliders

Material Design 3 (M3 & M3 Expressive) reference for binary, single-select, multi-select, contextual action/filter chips, and continuous/discrete range sliders.

Sources:
- `https://m3.material.io/components/checkbox/{overview,specs,guidelines,accessibility}`
- `https://m3.material.io/components/radio-button/{overview,specs,guidelines,accessibility}`
- `https://m3.material.io/components/switch/{overview,specs,guidelines,accessibility}`
- `https://m3.material.io/components/chips/{overview,specs,guidelines,accessibility}`
- `https://m3.material.io/components/sliders/{overview,specs,guidelines,accessibility}`

---

## When to Use / Selection Control Decision Matrix

| Component | Selection Type | Typical Option Count | Immediate Effect? | Primary Use Case & When to Choose |
| :--- | :--- | :--- | :--- | :--- |
| **Checkbox** | Multi-select (or tri-state parent) | 2+ related list items (or 1 on desktop) | Desktop: Yes; Forms: On submit | Selecting one or more related options from a list, nested sub-selections, or agreeing to terms. Takes less visual space than switches. |
| **Radio Button** | Single-select (mutually exclusive) | 2–5 options (use Dropdown if >5) | Settings: Yes; Dialogs/Forms: On save | Selecting exactly one option from a mutually exclusive set where all choices should be visible upfront. |
| **Switch** | Binary (On/Off, True/False) | Standalone per setting row | **Always immediate** (never require Save) | Toggling independent system/app settings on or off. **Never** use for opposing non-binary choices (e.g., *List* vs *Map* — use Segmented/Connected Button Group). |
| **Filter Chip** | Single-select or Multi-select | 2+ dynamic tags in a row/group | Immediate filter update | Filtering collections or search results via compact horizontal tags where checkboxes or radio lists would consume too much vertical space. |
| **Assist / Suggestion Chip** | Contextual action / prompt | 2+ dynamic chips in a set | Immediate action / query | Surfacing context-aware smart actions (**Assist**) or product-generated quick replies/queries (**Suggestion**). **Never** use a single chip alone or replace primary navigation/final form buttons (*Save*/*Cancel*). |
| **Input Chip** | User-entered discrete token | 1+ tokens inside or below a field | Immediate token creation/removal | Representing user-authored entities (e.g., email recipients, custom tags) with inline editing and a required remove (`×`) affordance. |
| **Slider** | Continuous or discrete numeric value / range | Single value, centered ±value, or min–max range | **Always immediate** (real-time feedback) | Adjusting continuous intensities or stepped scales (volume, brightness, price range) where relative position matters. |

---

## 1. Checkbox (`md.comp.checkbox`)

Checkboxes let users select one or more items from a set, manage parent-child sub-selections, or toggle a single option in desktop environments.

### Anatomy & Measurements

1. **Container**: Square box (`18×18dp`) with `2dp` rounded corners; `2dp` outline when unselected, filled (`0dp` outline) when selected or indeterminate.
2. **Icon**: `18×18dp` center-aligned checkmark (selected) or horizontal dash (indeterminate).
3. **State Layer**: `40×40dp` circular (`md.sys.shape.corner.full`) overlay centered on the container.
4. **Touch Target**: `48×48dp` minimum interactive area.

| Attribute | Token | Value |
| :--- | :--- | :--- |
| Container width / height | `md.comp.checkbox.container.{width,height,size}` | `18dp` |
| Container corner radius | `md.comp.checkbox.container.shape` | `2dp` |
| Unselected outline width | `md.comp.checkbox.unselected.outline.width` | `2dp` |
| Selected / Indeterminate outline width | `md.comp.checkbox.selected.outline.width` | `0dp` |
| Icon size | `md.comp.checkbox.icon.size` | `18dp` (center-aligned) |
| State-layer size & shape | `md.comp.checkbox.state-layer.{size,shape}` | `40dp`, `md.sys.shape.corner.full` |
| Focus indicator thickness & offset | `md.comp.checkbox.focus.indicator.{thickness,outline.offset}` | `3dp` thickness, `2dp` outer offset |
| Minimum touch target | — | `48×48dp` |

### States & Color Roles

Adjacent text labels **always** use `on-surface` (`#1D1B20` Light / `#E6E0E9` Dark) regardless of whether the checkbox is selected, unselected, or hovered.

| State | Unselected Outline | Selected / Indeterminate Container | Selected / Indeterminate Icon | State Layer Color & Opacity |
| :--- | :--- | :--- | :--- | :--- |
| **Enabled (Rest)** | `on-surface-variant` (`#49454F` / `#CAC4D0`), `2dp` | `primary` (`#6750A4` / `#D0BCFF`) | `on-primary` (`#FFFFFF` / `#381E72`) | None (`0`) |
| **Hovered** | `on-surface` (`#1D1B20` / `#E6E0E9`), `2dp` | `primary` (`#6750A4` / `#D0BCFF`) | `on-primary` (`#FFFFFF` / `#381E72`) | Unselected: `on-surface` @ `0.08`<br>Selected: `primary` @ `0.08` |
| **Focused** | `on-surface` (`#1D1B20` / `#E6E0E9`), `2dp` | `primary` (`#6750A4` / `#D0BCFF`) | `on-primary` (`#FFFFFF` / `#381E72`) | Unselected: `on-surface` @ `0.10`<br>Selected: `primary` @ `0.10`<br>Focus ring: `secondary` (`#625B71` / `#CCC2DC`) |
| **Pressed** | `on-surface` (`#1D1B20` / `#E6E0E9`), `2dp` | `primary` (`#6750A4` / `#D0BCFF`) | `on-primary` (`#FFFFFF` / `#381E72`) | Unselected: `primary` @ `0.10`<br>Selected: `on-surface` @ `0.10` |
| **Error (Rest / Hover / Focus / Press)** | `error` (`#B3261E` / `#F2B8B5`), `2dp` | `error` (`#B3261E` / `#F2B8B5`) | `on-error` (`#FFFFFF` / `#601410`) | `error` (`#B3261E` / `#F2B8B5`) @ `0.08` (hover) / `0.10` (focus, press) |
| **Disabled** | `on-surface` @ `0.38` opacity, `2dp` | `on-surface` @ `0.38` opacity (`0dp` outline) | `surface` (`#FEF7FF` / `#141218`) | None (`0`) |

### Behavior & Parent–Child Tri-State Logic

- **Independent Multi-Select**: Any number of sibling checkboxes in a group can be checked or unchecked independently.
- **Tri-State Hierarchy**:
  - Checking a **parent** checkbox checks **all** child checkboxes.
  - Unchecking a **parent** checkbox unchecks **all** child checkboxes.
  - When **some (but not all)** child checkboxes are checked, the parent displays the **indeterminate** state (`aria-checked="mixed"`).
  - Activating an **indeterminate** parent checkbox checks **all** child items.
- **Responsive Layout**: On expanded breakpoints, group related filter checkboxes inside a contained region such as a side sheet.

### Accessibility

- **Click/Tap Area**: Both the `48×48dp` checkbox target and its adjacent text label must toggle the selection.
- **Density**: Never apply high density to checkboxes by default (which drops targets below `48×48` CSS px). If a user-selectable dense mode is offered, the control to revert density must keep a minimum `48×48` CSS px target.
- **Keyboard & Screen Reader**:
  - Role: `checkbox` (`aria-checked="true" | "false" | "mixed"`).
  - Accessibility label: Matches the linked adjacent UI text label.
  - Keys: `Tab` moves focus between checkboxes; `Space` toggles the focused checkbox.

### Do / Don't

- **✅ Do**: Use checkboxes when multiple related items can be chosen from a list, and use a parent checkbox for bulk select/deselect.
- **❌ Don't**: Use multiple switches in a list of related multi-select options — switches take up more visual space and imply independent system settings.

---

## 2. Radio Button (`md.comp.radio-button`)

Radio buttons allow users to select a single mutually exclusive option from a visible list of 2 to 5 options.

### Anatomy & Measurements

1. **Unselected Icon**: `20×20dp` circular outer ring (`2dp` stroke).
2. **Selected Icon**: `20×20dp` outer ring containing a centered `10dp` filled inner dot.
3. **Adjacent Label Text**: Required inline text (`on-surface`) describing each choice.
4. **State Layer & Target**: `40×40dp` circular state layer inside a `48×48dp` touch target.

| Attribute | Token | Value |
| :--- | :--- | :--- |
| Icon size (outer ring diameter) | `md.comp.radio-button.icon.size` | `20dp` (`10dp` inner dot when selected) |
| State-layer size | `md.comp.radio-button.state-layer.size` | `40dp` (circular) |
| Minimum touch target | — | `48×48dp` |

### States & Color Roles

| State | Unselected Icon Color | Selected Icon Color | State Layer Color & Opacity |
| :--- | :--- | :--- | :--- |
| **Enabled (Rest)** | `on-surface-variant` (`#49454F` / `#CAC4D0`) | `primary` (`#6750A4` / `#D0BCFF`) | None (`0`) |
| **Hovered** | `on-surface` (`#1D1B20` / `#E6E0E9`) | `primary` (`#6750A4` / `#D0BCFF`) | Unselected: `on-surface` @ `0.08`<br>Selected: `primary` @ `0.08` |
| **Focused** | `on-surface` (`#1D1B20` / `#E6E0E9`) | `primary` (`#6750A4` / `#D0BCFF`) | Unselected: `on-surface` @ `0.10`<br>Selected: `primary` @ `0.10` |
| **Pressed** | `on-surface` (`#1D1B20` / `#E6E0E9`) | `primary` (`#6750A4` / `#D0BCFF`) | Unselected: `primary` @ `0.10`<br>Selected: `on-surface` @ `0.10` |
| **Disabled** | `on-surface` @ `0.38` opacity | `on-surface` @ `0.38` opacity | None (`0`) |

### Placement, Behavior & Accessibility

- **Vertical Stacking**: Always stack radio buttons vertically with one option pre-selected by default.
- **Opting Out**: Once a radio button in a group is selected, the user cannot deselect all buttons by clicking a radio button again. If opting out is required, include an explicit **"None"** / **"Not applicable"** radio option or a separate **"Clear selection"** button.
- **Keyboard Navigation**:
  - `Tab`: Moves focus into the `radiogroup` directly onto the **selected** radio button (or the **first** radio button if none are selected).
  - `Shift + Tab`: Moves focus into the group onto the **selected** radio button (or the **last** radio button if none are selected).
  - `Arrow Keys` (Up/Down/Left/Right): Moves focus **and** selects the previous/next radio button, wrapping continuously between the first and last items.
  - `Space`: Selects the focused radio button if not already selected.
- **Screen Reader Labeling**: Group container uses role `radiogroup` labeled by the category title; each item uses role `radio` labeled by its adjacent text.

### Do / Don't / Caution

- **✅ Do**: Use radio buttons when there are 5 or fewer mutually exclusive options, and pre-select a sensible default.
- **✅ Do**: Consider a dropdown menu instead of radio buttons when screen space is tightly constrained.
- **⚠️ Caution**: Avoid placing radio buttons horizontally side-by-side (harder to scan which label belongs to which button).
- **❌ Don't**: Never nest radio buttons inside other radio buttons, and never allow multiple radio buttons in a group to be selected simultaneously.

---

## 3. Switch (`md.comp.switch`)

Switches toggle the state of a single standalone setting on or off with immediate effect.

### Anatomy, Configurations & Measurements

1. **Track**: `52×32dp` pill (`md.sys.shape.corner.full`), with a `2dp` inner outline when unselected.
2. **Handle (formerly thumb)**: Circular (`md.sys.shape.corner.full`) indicator that slides across the track and dynamically morphs in diameter based on state and icon presence:
   - Unselected without icon: `16×16dp`
   - Unselected with icon: `24×24dp`
   - Selected (with or without icon): `24×24dp`
   - Pressed (selected or unselected): `28×28dp`
3. **Icon (Optional)**: `16×16dp` centered inside the handle. Three valid configurations:
   - No icons
   - Icon on selected state only (checkmark `✓`)
   - Icon on both selected (`✓`) and unselected (`×`) states

| Element | Attribute | Token | Value |
| :--- | :--- | :--- | :--- |
| **Track** | Width × Height | `md.comp.switch.track.{width,height}` | `52dp × 32dp` |
| | Corner shape | `md.comp.switch.track.shape` | `md.sys.shape.corner.full` (pill) |
| | Unselected outline width | `md.comp.switch.track.outline.width` | `2dp` (`0dp` when selected) |
| **Handle** | Unselected size (no icon) | `md.comp.switch.unselected.handle.{width,height}` | `16×16dp` |
| | Unselected size (with icon) | `md.comp.switch.with-icon.handle.{width,height}` | `24×24dp` |
| | Selected size | `md.comp.switch.selected.handle.{width,height}` | `24×24dp` |
| | Pressed size (on tap/drag) | `md.comp.switch.pressed.handle.{width,height}` | `28×28dp` |
| | Elevation | `md.comp.switch.handle.elevation` | `md.sys.elevation.level1` (`1dp`; `0dp` disabled) |
| **Icon** | Size (selected & unselected) | `md.comp.switch.{selected,unselected}.icon.size` | `16×16dp` |
| **State Layer** | Size & shape | `md.comp.switch.state-layer.{size,shape}` | `40×40dp`, `md.sys.shape.corner.full` |
| **Target** | Minimum touch target | — | `48×48dp` |

### Color Roles per State

Adjacent primary label uses `on-surface`; optional secondary supporting description uses `on-surface-variant`.

| State | Unselected (Off) | Selected (On) |
| :--- | :--- | :--- |
| **Track Fill** | `surface-container-highest` (`#E6E0E9` / `#36343B`) | `primary` (`#6750A4` / `#D0BCFF`) |
| **Track Outline (2dp)** | `outline` (`#79747E` / `#938F99`) | None (`0dp`) |
| **Handle Fill (Rest)** | `outline` (`#79747E` / `#938F99`) | `on-primary` (`#FFFFFF` / `#381E72`) |
| **Handle Fill (Hover / Focus / Press)** | `on-surface-variant` (`#49454F` / `#CAC4D0`) | `primary-container` (`#EADDFF` / `#4F378B`) |
| **Icon Color** | `surface-container-highest` (`#E6E0E9` / `#36343B`) | `on-primary-container` (`#4F378B` / `#EADDFF`) in specs / `primary` (`#6750A4` / `#D0BCFF`) in tokens |
| **State Layer** | `on-surface` (`0.08` hover, `0.10` focus/press) | `primary` (`0.08` hover, `0.10` focus/press) |
| **Disabled Track** | `surface-container-highest` fill + `on-surface` outline, both @ `0.12` | `on-surface` (`#1D1B20` / `#E6E0E9`) @ `0.12` |
| **Disabled Handle & Icon** | Handle: `on-surface` @ `0.38`; Icon: `surface-container-highest` @ `0.38` | Handle: `surface` (`#FEF7FF` / `#141218`) @ `1.0`; Icon: `on-surface` @ `0.38` |

### Behavior & Accessibility

- **Immediate Execution**: Toggling a switch must take effect immediately without requiring a "Save" button.
- **Touch & Cursor Feedback**: Tapping, clicking, or dragging grows the handle to `28×28dp` while pressed; hovering displays the `40×40dp` state layer.
- **Keyboard & Focus**: Initial focus (`Tab`) lands directly on the switch handle (`3dp` `secondary` focus ring, `2dp` offset). `Space` or `Enter` toggles the switch.
- **Labeling**: Pair every switch with a concise inline label describing what the control does when **on**. If the visible label is brief (e.g., *"Photo album"*), provide a clarified accessibility label (e.g., *"Photo album access"*).

### Do / Don't

- **✅ Do**: Use unambiguous binary icons inside the handle (such as `✓` for on and `×` for off).
- **❌ Don't**: Use switches for opposing options like *List View* vs *Map View* (use a connected button group / segmented button).
- **❌ Don't**: Use a switch as a call-to-action button, or use switches in a multi-select list that requires a Save button.
- **❌ Don't**: Put text ("ON"/"OFF") inside the switch track or handle; use an icon instead.
- **❌ Don't**: Use ambiguous or non-binary handle icons (such as a moon vs a pencil).

---

## 4. Chips (`md.comp.{assist,filter,input,suggestion}-chip`)

Chips are compact, contextual elements arranged in sets (never a single standalone chip) that let users trigger smart actions, filter views, enter discrete entities, or pick dynamic suggestions.

### Variants & Styles

| Variant | Token Prefix | Author & Purpose | Leading Element | Trailing Element | Selectable? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Assist Chip** | `md.comp.assist-chip` | App-authored smart/contextual action spanning apps (begins with verb: *"Add to itinerary"*). | Optional `18dp` icon or logo (`primary` or `on-surface-variant`) | None | No (triggers action/modal) |
| **Filter Chip** | `md.comp.filter-chip` | App-authored category/tag filter (positive noun: *"Slides"*, never *"Exclude..."*). | Appends `18dp` checkmark (`✓`) when selected (or custom leading icon) | Optional `18dp` dropdown arrow (`▼`) or remove (`×`) on medium/expanded screens | Yes (single-select or multi-select) |
| **Input Chip** | `md.comp.input-chip` | User-authored discrete input converted from text (e.g., contact in *To:* field). | Optional `24dp` circular avatar or `18dp` icon | **Required** `18dp` remove (`×`) icon (optional on mobile if `Delete` key removes) | Yes (selectable & editable back to text) |
| **Suggestion Chip** | `md.comp.suggestion-chip` | Product-generated dynamic suggestion (quick reply, search prompt). | Optional `18dp` icon (`primary`) | None | No (applies suggestion) |

Each variant (except Input Chip, which is always flat) supports two container styles:
- **Flat (default)**: `0dp` elevation (`md.sys.elevation.level0`), transparent background when unselected with a `1dp` `outline-variant` (`#CAC4D0` / `#49454F`) stroke (softened from `outline` in Aug 2024; Note: `md.comp.input-chip.outline.color` base token still references `outline`, while `unselected.outline.color` references `outline-variant`).
- **Elevated**: `1dp` elevation (`md.sys.elevation.level1`, `3dp` on hover, `8dp` when dragged), `surface-container-low` (`#F7F2FA` / `#1D1B20`) container fill, `0dp` stroke. Use **only** over images or complex backgrounds where visual separation is required.

### Measurements & Padding

| Attribute | Value / Token | Notes |
| :--- | :--- | :--- |
| **Container height** | `32dp` (`*.container.height`) | Visual height of all chip variants |
| **Minimum touch target** | `48dp` height (`× 48dp` min width) | Extends `8dp` above and below the `32dp` container |
| **Container corner shape** | `8dp` (`md.sys.shape.corner.small`) | Avatar input chips may also be styled as full pills in some implementations |
| **Typography** | `label-large` (`14pt` size / `20pt` line-height / `500` weight / `0.1pt` tracking) | Keep labels `≤ 20` characters; skip articles ("a", "the") |
| **Leading / Trailing icon size** | `18dp` | Center-aligned vertically |
| **Avatar size & shape (Input chip)** | `24×24dp`, `md.sys.shape.corner.full` (`12dp` radius) | Larger than icons to preserve photo detail |
| **Horizontal padding (text only)** | `16dp` start, `16dp` end | Assist, Filter, Suggestion without icons |
| **Horizontal padding (with 18dp icon)** | `8dp` on icon side (`16dp` on text-only side) | `8dp` gap between icon and label text |
| **Horizontal padding (with 24dp avatar)** | `4dp` start (before avatar), `8dp` gap after avatar | `8dp` end padding after trailing `×` icon |
| **Spacing between chips in a set** | `8dp` min horizontal gap, `8dp` min vertical row gap | Never list chips vertically as a single column |
| **Min width for 2-action chip** | `88dp` container min-width (or `42dp` label min-width) | Ensures primary action (e.g., *Edit*/*Select*) and trailing *Remove* (`×`) each get a non-overlapping `48×48dp` touch target |

### Color Roles Summary

| Element | Assist Chip | Suggestion Chip | Filter Chip (Unselected → Selected) | Input Chip (Unselected → Selected) |
| :--- | :--- | :--- | :--- | :--- |
| **Flat Container Fill** | Transparent | Transparent | Transparent → `secondary-container` (`#E8DEF8` / `#4A4458`) | Transparent → `secondary-container` (`#E8DEF8` / `#4A4458`) |
| **Elevated Container Fill** | `surface-container-low` (`#F7F2FA` / `#1D1B20`) | `surface-container-low` | `surface-container-low` → `secondary-container` | N/A (Flat only) |
| **Flat Outline (1dp)** | `outline-variant` (`#CAC4D0` / `#49454F`); `on-surface` on focus | `outline-variant`; `on-surface-variant` on focus | `outline-variant` (`0dp` when selected) | `outline-variant` (`0dp` when selected) |
| **Label Text** | `on-surface` (`#1D1B20` / `#E6E0E9`) | `on-surface-variant` (`#49454F` / `#CAC4D0`) | `on-surface-variant` → `on-secondary-container` (`#4A4458` / `#E8DEF8`) | `on-surface-variant` → `on-secondary-container` |
| **Leading Icon** | `primary` (`#6750A4` / `#D0BCFF`) (or `on-surface-variant`) | `primary` | `primary` (unselected) → `on-secondary-container` (selected checkmark) | `on-surface-variant` (`primary` on hover/focus/selected) |
| **Trailing Icon** | N/A | N/A | `on-surface-variant` → `on-secondary-container` | `on-surface-variant` → `on-secondary-container` |
| **Disabled** | Label/Icon: `on-surface` @ `0.38`; Flat outline or Elevated fill: `on-surface` @ `0.12` | Same as Assist | Same + Selected fill: `on-surface` @ `0.12` | Same + Avatar @ `0.38` opacity |

### Layout, Overflow & Accessibility

- **Horizontal Scroll vs Row Wrap**: Chips flow inline in a row. When overflowing, either scroll horizontally or wrap up to 2 rows (if >2 rows, prefer horizontal scrolling or a side sheet).
- **Accessible Overflow Alternatives**: For keyboard/low-vision users, provide a way to view all overflowing chips without horizontal scrolling:
  1. **Reflow method**: A leading *"Show all"* filter chip expands the row to wrap all chips and pushes content below down.
  2. **Menu method**: A leading button opens a dropdown menu of all chip options without shifting page content. (**Never** use the menu method if chips have a secondary action like a remove icon).
- **Secondary Interactivity Indicator**: Because flat chips use `outline-variant` (under 3:1 contrast), M3 requires a secondary cue to show chips are interactive: a group header (e.g., *"Select type"*), page context (*"Filter results"*), overriding stroke to `outline` (≥3:1 contrast), or an action verb/icon.
- **Focus & Keyboard**:
  - `Tab`: Focuses chip or chip group. If a chip has only a remove action, the whole chip is one focusable stop; if it has **both** select/edit and remove actions, the chip body and remove icon are **two separate focusable stops** (requiring the `88dp` min chip width).
  - `Space` / `Enter`: Activates, selects, or deselects the focused chip.
  - `Backspace` / `Delete`: Removes a focused input chip (when typing in a text field after an input chip, first `Backspace` selects the chip, second `Backspace` deletes it).
  - `Arrow Keys`: Moves focus between chips in a set.

### Do / Don't / Caution

- **✅ Do**: Keep chip sets consistent on a page (all filter chip groups either single-select or multi-select).
- **⚠️ Caution**: On compact (mobile) screens, if a filter chip has a trailing menu icon, tapping the **entire chip** must open the menu because the trailing icon target alone is too small.
- **❌ Don't**: Use chips for final task steps or dialog confirmations (*Save*, *Cancel*) — always use buttons.
- **❌ Don't**: Display a single chip by itself, or elevate chips when placed directly on a plain surface.
- **❌ Don't**: Increase elevation to show a chip's pressed state (use the state-layer ripple instead).

---

## 5. Sliders (`md.comp.slider`)

Sliders let users make immediate selections from a continuous or discrete range of values along a horizontal or vertical track.

### Variants & M3 Expressive Update (May 2025)

M3 Expressive unified slider naming and introduced 5 track sizes, vertical orientation, and an optional inset icon:
1. **Standard Slider** (formerly *Continuous*): Selects a single value starting from the leading edge (minimum/zero). Active track fills from start to handle.
2. **Centered Slider**: Selects a positive or negative value starting from zero in the center of the track.
3. **Range Slider**: Uses two handles to select a minimum and maximum value; active track fills between the two handles. **Horizontal only** — never orient range sliders vertically.
4. **Stops Configuration** (formerly *Discrete*): Adds equally spaced `4dp` stop indicator dots along the track; the handle snaps to the closest stop.

### Anatomy & M3 Expressive 5-Size Specifications

1. **Active Track & Inactive Track**: Same height (`16dp` to `96dp`). Outer ends are rounded (`8dp` to `28dp`); inner track corners adjacent to the handle have a sharp `2dp` corner radius (`topRight=2dp, bottomRight=2dp`) with a `6dp` gap (`md.comp.slider.active.handle.leading-space` / `trailing-space`) separating the track segments from the handle.
2. **Handle**: Vertical pill (`md.sys.shape.corner.full`), `4dp` wide at rest/hover, narrowing to **`2dp` wide** when focused or pressed (`md.comp.slider.{focus,pressed}.handle.width`).
3. **Stop Indicators**: `4dp` circular dots (`4dp` trailing space). Placed at each discrete step and at the **end(s) of the inactive track** to guarantee ≥3:1 non-text contrast with the background.
4. **Inset Icon (Optional)**: Placed inside the start of the active track on **Standard** sliders of size **M, L, or XL** only. Automatically shifts to the inactive track when the handle is near zero and active track space is too narrow.
5. **Value Indicator (Optional)**: Floating pill/bubble (`inverse-surface`, `44dp` height × `48dp` width in specs; `28dp` label container token height, `12dp` bottom offset above handle) showing the numeric value while pressed/dragged.

| Attribute | XS (Default) | S | M | L | XL (Hero) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Token Namespace** | `md.comp.slider.xsmall` | `md.comp.slider.small` | `md.comp.slider.medium` | `md.comp.slider.large` | `md.comp.slider.xlarge` |
| **Track Height** | `16dp` | `24dp` | `40dp` | `56dp` | `96dp` |
| **Track Outer Corner Radius** | `8dp` | `8dp` | `12dp` | `16dp` | `28dp` |
| **Handle Height** | `44dp` | `44dp` | `52dp` (specs) / `44dp` (token) | `68dp` | `108dp` |
| **Handle Width (Rest → Press/Focus)** | `4dp` → `2dp` | `4dp` → `2dp` | `4dp` → `2dp` | `4dp` → `2dp` | `4dp` → `2dp` |
| **Handle Leading/Trailing Space** | `6dp` | `6dp` | `6dp` | `6dp` | `6dp` |
| **Inset Icon Size (Padding)** | *Not supported* | *Not supported* | `24dp` (`6dp` pad) | `24dp` (`6dp` pad) | `32dp` (`8dp` pad) |

### Color Roles

| Element | Enabled (Rest / Hover / Focus / Press) | Disabled |
| :--- | :--- | :--- |
| **Active Track** | `primary` (`#6750A4` / `#D0BCFF`) | `on-surface` (`#1D1B20` / `#E6E0E9`) @ `0.38` |
| **Inactive Track** | `secondary-container` (`#E8DEF8` / `#4A4458`) | `on-surface` (`#1D1B20` / `#E6E0E9`) @ `0.12` |
| **Handle** | `primary` (`#6750A4` / `#D0BCFF`), `level1` (`1dp`) elevation (`1dp` `on-primary` outline if overlapping) | `on-surface` @ `0.38`, `level0` (`0dp`) elevation |
| **Stop Indicator (Active Track)** | `on-primary` (`#FFFFFF` / `#381E72`) | `inverse-on-surface` (`#F5EFF7` / `#322F35`) |
| **Stop Indicator (Inactive Track)** | `on-secondary-container` (`#4A4458` / `#E8DEF8`) | `on-surface` @ `0.38` |
| **Inset Icon** | `on-primary` (on active track) / `on-secondary-container` (on inactive track) | `on-surface` @ `0.38` |
| **Value Indicator Bubble** | Container: `inverse-surface` (`#322F35` / `#E6E0E9`)<br>Text: `inverse-on-surface` (`#F5EFF7` / `#322F35`), `label-large` (`14pt`/`20pt`) | N/A |
| **State Layer (40dp)** | `primary` @ `0.08` (hover), `0.10` (focus, press) | None |

### Behavior & Accessibility

- **Immediate Effect**: Slider changes must apply in real time.
- **Range Slider Value Display**: When dragging a range slider, display the value indicator bubble on **only one handle at a time** (the active handle).
- **Orientation & RTL**: Horizontal sliders increase left-to-right in LTR and right-to-left in RTL. Vertical sliders place minimum/zero at the bottom and maximum at the top.
- **Non-Text Contrast**: Because `secondary-container` inactive tracks may have <3:1 contrast against the surface, keep the `4dp` end stop indicator (or place external `±` icons/labels with ≥3:1 contrast at the track ends).
- **Keyboard Navigation** (Role `slider`, labeled by adjacent UI text):
  - `Tab`: Moves focus directly to the slider handle (and then to an external linked text field if present).
  - `Arrow Keys`: Increases/decreases value by 1 unit or 1 stop indicator.
  - `Space + Arrow Keys`: Increases/decreases value by a larger interval or stop indicator.
  - `Home` / `End`: Jumps to the minimum or maximum value.

### Do / Don't

- **✅ Do**: Reserve `XL` (`96dp`) sliders for hero moments where the slider is the primary focus of the screen (e.g., thermostat/lighting control).
- **✅ Do**: Swap the inset icon at zero when appropriate (e.g., volume speaker icon morphing to mute icon).
- **❌ Don't**: Use vertical orientation for Range sliders (adds excessive cognitive load).
- **❌ Don't**: Add an inset icon to `XS` (`16dp`) or `S` (`24dp`) sliders (icon will clip), or to Centered or Range sliders (obscures where the start point is).

---

## Implementation Notes

### Platform API Mapping

| Component | Jetpack Compose (`androidx.compose.material3`) | Flutter (`material`) | Material Web (`@material/web`) |
| :--- | :--- | :--- | :--- |
| **Checkbox** | `Checkbox`, `TriStateCheckbox` | `Checkbox`, `CheckboxListTile` (`tristate: true`) | `<md-checkbox>` |
| **Radio Button** | `RadioButton` | `Radio<T>`, `RadioListTile<T>` | `<md-radio>` |
| **Switch** | `Switch` (`thumbContent` for `16dp` icon) | `Switch`, `SwitchListTile` (`thumbIcon`) | `<md-switch>` (`icons`, `show-only-selected-icon`) |
| **Chips** | `AssistChip`, `ElevatedAssistChip`, `FilterChip`, `ElevatedFilterChip`, `InputChip`, `SuggestionChip`, `ElevatedSuggestionChip` | `ActionChip`, `FilterChip`, `ChoiceChip`, `InputChip` | `<md-assist-chip>`, `<md-filter-chip>`, `<md-input-chip>`, `<md-suggestion-chip>`, `<md-chip-set>` |
| **Sliders** | `Slider`, `RangeSlider` | `Slider`, `RangeSlider` | `<md-slider>` (`range`, `ticks`, `labeled`) |

### Minimal CSS Sketch (`--md-sys-*` Custom Properties)

```css
/* Switch Track & Morphing Handle */
.md3-switch-track {
  width: 52px;
  height: 32px;
  border-radius: 9999px;
  box-sizing: border-box;
  background: var(--md-sys-color-surface-container-highest, #E6E0E9);
  border: 2px solid var(--md-sys-color-outline, #79747E);
  display: inline-flex;
  align-items: center;
  padding: 0 6px;
  transition: background-color 150ms cubic-bezier(0.2, 0, 0, 1), border-color 150ms cubic-bezier(0.2, 0, 0, 1);
}
.md3-switch-track[aria-checked="true"] {
  background: var(--md-sys-color-primary, #6750A4);
  border-width: 0;
  padding: 0 4px;
}
.md3-switch-handle {
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  background: var(--md-sys-color-outline, #79747E);
  transition: width 150ms cubic-bezier(0.2, 0, 0, 1), height 150ms cubic-bezier(0.2, 0, 0, 1), transform 150ms cubic-bezier(0.2, 0, 0, 1);
}
.md3-switch-track[data-has-icon="true"] .md3-switch-handle,
.md3-switch-track[aria-checked="true"] .md3-switch-handle {
  width: 24px;
  height: 24px;
}
.md3-switch-track[aria-checked="true"] .md3-switch-handle {
  background: var(--md-sys-color-on-primary, #FFFFFF);
  transform: translateX(20px);
}
.md3-switch-track:active .md3-switch-handle {
  width: 28px;
  height: 28px;
}

/* Filter Chip */
.md3-filter-chip {
  height: 32px;
  border-radius: var(--md-sys-shape-corner-small, 8px);
  padding: 0 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font: 500 14px/20px var(--md-sys-typescale-label-large-font, Roboto, sans-serif);
  letter-spacing: 0.1px;
  color: var(--md-sys-color-on-surface-variant, #49454F);
  border: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
  background: transparent;
}
.md3-filter-chip[aria-selected="true"] {
  padding-inline-start: 8px;
  background: var(--md-sys-color-secondary-container, #E8DEF8);
  color: var(--md-sys-color-on-secondary-container, #4A4458);
  border-color: transparent;
}
```

---

## Further Reading

- Pages: [docs/pages/checkbox.md](file:///Users/leon/Desktop/Leon/material-design-skill/docs/pages/checkbox.md), [docs/pages/radio-button.md](file:///Users/leon/Desktop/Leon/material-design-skill/docs/pages/radio-button.md), [docs/pages/switch.md](file:///Users/leon/Desktop/Leon/material-design-skill/docs/pages/switch.md), [docs/pages/chips.md](file:///Users/leon/Desktop/Leon/material-design-skill/docs/pages/chips.md), [docs/pages/sliders.md](file:///Users/leon/Desktop/Leon/material-design-skill/docs/pages/sliders.md)
- Tokens: [tokens/components/checkbox.md](file:///Users/leon/Desktop/Leon/material-design-skill/tokens/components/checkbox.md), [tokens/components/radio-button.md](file:///Users/leon/Desktop/Leon/material-design-skill/tokens/components/radio-button.md), [tokens/components/switch.md](file:///Users/leon/Desktop/Leon/material-design-skill/tokens/components/switch.md), [tokens/components/chips.md](file:///Users/leon/Desktop/Leon/material-design-skill/tokens/components/chips.md), [tokens/components/sliders.md](file:///Users/leon/Desktop/Leon/material-design-skill/tokens/components/sliders.md)
