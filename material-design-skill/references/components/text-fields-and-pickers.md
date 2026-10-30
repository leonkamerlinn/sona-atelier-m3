# Text Fields, Date Pickers, and Time Pickers

Material Design 3 (M3) reference for text entry (Filled, Outlined, Select/Autocomplete), date selection (Docked, Modal Calendar, Modal Input, Date Range), and time selection (Dial and Keyboard Input).

Sources:
- `https://m3.material.io/components/text-fields/{overview,specs,guidelines,accessibility}`
- `https://m3.material.io/components/date-pickers/{overview,specs,guidelines,accessibility}`
- `https://m3.material.io/components/time-pickers/{overview,specs,guidelines,accessibility}`

---

## When to Use / Input & Picker Decision Matrix

| Component / Variant | Target Breakpoint / Context | Primary Use Case & When to Choose |
| :--- | :--- | :--- |
| **Filled Text Field** | All breakpoints | High-emphasis text inputs where the field needs strong visual contrast against a plain surface. |
| **Outlined Text Field** | All breakpoints (preferred in multi-field forms) | Lower-emphasis text inputs that simplify dense forms with many fields. **Never mix Filled and Outlined in the same form/region.** |
| **Multi-line Field vs Text Area** | Mobile (Multi-line) / Web & Desktop (Text Area) | **Multi-line** starts at 1 line (`56dp`) and expands vertically as text wraps. **Text Area** has a fixed multi-line height (preferred on Web to prevent layout shifts). |
| **Docked Date Picker** | Medium & Expanded (Tablet/Desktop) | Dropdown calendar (`360×456dp`) anchored below an outlined text field; supports simultaneous keyboard typing and calendar navigation for near or distant dates. |
| **Modal Date Picker** | Compact (Mobile) or Dialogs | Modal calendar (`360×524dp`) for choosing near-term single dates where visual day-of-week context matters. |
| **Modal Date Range Picker** | Compact (Full-screen) / Medium+ (Dialog) | Selecting a start and end date (e.g., flights, hotels) across vertically scrolling months. |
| **Modal Date Input** | All breakpoints (distant dates / a11y) | Manual keyboard entry (`328×512dp`) for dates in the distant past or future (e.g., Date of Birth) where scrolling a calendar is tedious. |
| **Time Picker Dial** | Portrait (Vertical) / Landscape (Horizontal) | Modal clock-face selector (`256dp` dial) for直观 touch selection of hours, minutes, and AM/PM. |
| **Time Picker Input** | Constrained height / Keyboard-first | Compact modal with `96×72dp` numeric fields; toggled via the keyboard icon or used automatically when viewport height cannot fit the clock dial without scrolling. |

---

## 1. Text Fields (`md.comp.{filled,outlined}-text-field`)

Text fields allow users to enter and edit text. Both variants share identical behavior, typography, and `56dp` base height, differing only in container styling.

### Filled vs Outlined Comparison

| Attribute | Filled Text Field (`md.comp.filled-text-field`) | Outlined Text Field (`md.comp.outlined-text-field`) |
| :--- | :--- | :--- |
| **Container Fill** | `surface-container-highest` (`#E6E0E9` / `#36343B`) | Transparent (matches underlying surface) |
| **Corner Radius** | `4dp` top corners only (`md.sys.shape.corner.extra-small.top`), `0dp` bottom | `4dp` all four corners (`md.sys.shape.corner.extra-small`) |
| **Border / Active Indicator (Rest)** | `1dp` bottom line, `on-surface-variant` (`#49454F` / `#CAC4D0`) | `1dp` full perimeter stroke, `outline` (`#79747E` / `#938F99`) |
| **Border / Active Indicator (Hover)** | `1dp` bottom line, `on-surface` (`#1D1B20` / `#E6E0E9`) + `on-surface` @ `0.08` state layer | `1dp` full perimeter stroke, `on-surface` (`#1D1B20` / `#E6E0E9`) |
| **Border / Active Indicator (Focus)** | `2dp` bottom line (`3dp` focus indicator token), `primary` (`#6750A4` / `#D0BCFF`) | `2dp` (`3dp` in base token) perimeter stroke, `primary` (`#6750A4` / `#D0BCFF`) |
| **Populated Floating Label Position** | Rests inside top of container (`8dp` top padding) | Rests centered in top border cutout (`4dp` left/right cutout padding) |
| **Disabled Container & Stroke** | Fill: `on-surface` @ `0.04`; Bottom line: `1dp` `on-surface` @ `0.38` | Fill: Transparent; Perimeter stroke: `1dp` `on-surface` @ `0.12` |

### Anatomy & Measurements

1. **Container**: `56dp` default height (single-line) and `56dp` touch target height.
2. **Label Text**: Vertically centered when empty (`body-large` `16pt/24pt`); animates to top when focused or populated (`body-small` `12pt/16pt`). Must remain a single line and **never truncate**. If an external adjacent label is placed above the field (start-aligned), the internal label may be omitted.
3. **Input Text, Placeholder, Prefix & Suffix**: All use `body-large` (`16pt` size / `24pt` line-height / `400` weight / `0.5pt` tracking). Input text uses `on-surface`; placeholder, prefix (e.g., `$`), and suffix (e.g., `kg`, `@gmail.com`) use `on-surface-variant`.
4. **Leading & Trailing Icons**: `24×24dp` icons (or `24dp`-high images such as credit card logos), vertically centered.
   - **Leading icon**: Signifies input type (e.g., search magnifier, phone).
   - **Trailing icon**: Provides clear (`×`, shown only when text is present), password visibility toggle, voice input mic, dropdown arrow (`▼`), or validation/error indicator (`!`).
5. **Supporting Text & Character Counter**: Placed below the container (`4dp` top padding) using `body-small` (`12pt` size / `16pt` line-height / `400` weight / `0.4pt` tracking).

| Measurement Attribute | Filled | Outlined |
| :--- | :--- | :--- |
| **Default container height / target size** | `56dp` | `56dp` |
| **Top / bottom container padding** | `8dp` | Vertically centered (label cutout on top border) |
| **Start / end padding (no icons)** | `16dp` | `16dp` |
| **Start / end padding (side with 24dp icon)** | `12dp` | `12dp` |
| **Gap between icon and text** | `16dp` | `16dp` |
| **Populated label cutout horizontal padding** | N/A | `4dp` start, `4dp` end |
| **Supporting text & counter top padding** | `4dp` | `4dp` |
| **Gap between supporting text and character counter** | `16dp` | `16dp` |

### Color Roles Across States (Filled & Outlined)

| Element | Enabled (Rest) | Hovered | Focused | Error (Rest / Focus) | Error (Hovered) | Disabled |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Input Text** | `on-surface` (`#1D1B20` / `#E6E0E9`) | `on-surface` | `on-surface` | `on-surface` | `on-surface` | `on-surface` @ `0.38` |
| **Label Text** | `on-surface-variant` (`#49454F` / `#CAC4D0`) | Filled: `on-surface-variant`<br>Outlined: `on-surface` | `primary` (`#6750A4` / `#D0BCFF`) | `error` (`#B3261E` / `#F2B8B5`) | `on-error-container` (`#8C1D18` / `#F9DEDC`) | `on-surface` @ `0.38` |
| **Caret** | `primary` | `primary` | `primary` | `error` (`#B3261E` / `#F2B8B5`) | `error` | N/A |
| **Leading Icon** | `on-surface-variant` | `on-surface-variant` | `on-surface-variant` | `on-surface-variant` | `on-surface-variant` | `on-surface` @ `0.38` |
| **Trailing Icon** | `on-surface-variant` | `on-surface-variant` | `on-surface-variant` (`primary` on Select) | `error` (`#B3261E` / `#F2B8B5`) | `on-error-container` (`#8C1D18` / `#F9DEDC`) | `on-surface` @ `0.38` |
| **Supporting Text / Counter** | `on-surface-variant` | `on-surface-variant` | `on-surface-variant` | `error` (`#B3261E` / `#F2B8B5`) | `error` | `on-surface` @ `0.38` |
| **Stroke / Indicator** | Filled: `on-surface-variant` (`1dp`)<br>Outlined: `outline` (`1dp`) | `on-surface` (`1dp`) | `primary` (`2dp` / `3dp`) | `error` (`1dp` rest / `2dp`–`3dp` focus) | `on-error-container` | Filled: `on-surface` @ `0.38`<br>Outlined: `on-surface` @ `0.12` |

### Select & Autocomplete Menus (`md.comp.{filled,outlined}-{select,autocomplete}`)

When a text field acts as an exposed dropdown menu (`select`) or `autocomplete`:
- **Menu Container**: `surface-container` (`#F3EDF7` / `#211F26`), `level2` (`3dp`) elevation, `4dp` (`md.sys.shape.corner.extra-small`) corner radius.
- **Menu List Items**: `48dp` height, `label-large` (`14pt/20pt`, weight `500`), `on-surface` text, `24dp` optional leading/trailing icons (`on-surface-variant`), `surface-container-highest` (`#E6E0E9` / `#36343B`) selected item container fill, `1dp` `surface-variant` divider.

### Validation, Adaptive Layout & Accessibility

- **Error Handling**:
  - **Swap, don't stack**: Replace supporting text with error text when an error occurs so the field height does not jump and push content down.
  - **Error Icon**: Always display a trailing error icon (`!`) in the error state as a secondary visual cue for colorblind users.
  - **Live Announcement**: Apply `role="alert"` (or `aria-live="polite"`) to the error message container; if both supporting and error text exist, read supporting text first, then error text.
- **Required Fields**: Append an asterisk (`*`) to the label text (and include `*` in the accessibility label) and explain the asterisk in supporting text or at the top of the form.
- **Adaptive Width**: On compact screens, text fields may span full width. On medium/expanded screens, constrain text field widths with flexible margins or grid columns — **never** stretch a text field across the full width of a tablet/desktop screen.
- **Accessibility Labels**:
  - Text field: `role="textbox"`, labeled by its visible label text.
  - Interactive trailing icons: `role="button"` with state-specific labels (e.g., *"Show password"* vs *"Hide password"*, *"Clear text"*). Non-interactive error icons use label *"Error"*.
  - Prefix / Suffix: Give each a unique `id` with a spoken label (e.g., *"Euro"* for `€`, *"At gmail dot com"* for `@gmail.com`).
  - Character counter: Announce as *"Character count, 5 of 20"*.

### Do / Don't / Caution

- **✅ Do**: Keep Filled and Outlined text fields in separate regions if both appear on the same screen (e.g., Filled in the main form, Outlined inside a modal dialog).
- **✅ Do**: Ensure outlined text field borders maintain at least a **3:1** contrast ratio against the background surface.
- **⚠️ Caution**: If an error message must wrap to 2 lines, reserve sufficient vertical spacing between form fields so wrapped errors don't collide with the field below.
- **❌ Don't**: Truncate label text or allow floating/resting label text to wrap to two lines.
- **❌ Don't**: Apply high density to text fields by default (keep `≥48×48` CSS px targets).

---

## 2. Date Pickers (`md.comp.date-picker.*`, `md.comp.date-input.modal`)

Date pickers let users choose a single date or a date range via a calendar grid, a manual text input, or both.

### Variants, Dimensions & Token Specs

| Attribute | Docked Date Picker (`md.comp.date-picker.docked`) | Modal Date Picker (`md.comp.date-picker.modal`) | Modal Date Range Picker (`*.modal.range-selection`) | Modal Date Input (`md.comp.date-input.modal`) |
| :--- | :--- | :--- | :--- | :--- |
| **Container Width × Height** | `360dp × 456dp` (dropdown below field) | `360dp × 524dp` (dialog) | Full-screen on compact; Dialog on medium+ | `328dp × 512dp` (dialog) |
| **Container Fill & Elevation** | `surface-container-high` (`#ECE6F0` / `#2B2930`), `level3` (`6dp`) | `surface-container-high`, `level3` (`6dp`) | `surface-container-high`, `level0` (`0dp`, full-screen) | `surface-container-high`, `level3` (`6dp`) |
| **Container Corner Shape** | `16dp` (`md.sys.shape.corner.large`) | `28dp` (`md.sys.shape.corner.extra-large`) | `0dp` (`none` on mobile full-screen) | `28dp` (`md.sys.shape.corner.extra-large`) |
| **Header Size** | `64dp` height (contains Month & Year pill buttons + `<` `>` arrows) | `360×120dp` (`1dp` `outline-variant` bottom divider) | `128dp` height (`1dp` `outline-variant` divider) | `328×120dp` (`1dp` `outline-variant` divider) |
| **Header Headline Typography** | N/A (uses `40dp` pill menu buttons, `label-large` `14pt/20pt` + `18dp` icon) | `headline-large` (`32pt/40pt`, weight `400`), `on-surface-variant` | `title-large` (`22pt/28pt`, weight `400`), `on-surface-variant` | `headline-large` (`32pt/40pt`, weight `400`), `on-surface-variant` |
| **Header Supporting Text** | N/A | `label-large` (`14pt/20pt`, weight `500`), `on-surface-variant` | `label-large` (`14pt/20pt`, weight `500`) | `label-large` (`14pt/20pt`, weight `500`) |
| **Date Cell Size & Target** | `48×48dp` container (`40×40dp` circular state layer) | `40×40dp` circular container inside `48×48dp` target | `40×40dp` circular start/end caps; `40dp`-high continuous range band | Outlined text field(s) inside body |
| **Year Selector Item Size** | `48dp` menu list items (`surface-variant` `#E7E0EC`/`#49454F` selected fill, `24dp` check icon) | `72×36dp` pill (`md.sys.shape.corner.full`), `body-large` (`16pt/24pt`) | N/A (scrolls months vertically; `title-small` `14pt` month subheads) | N/A |

### Date & Year Cell Color Roles

| Cell State | Container / Indicator | Label Text (`body-large` `16pt/24pt`) | State Layer (Hover `0.08`, Focus/Press `0.10`) |
| :--- | :--- | :--- | :--- |
| **Selected Date / Year (or Range Start/End)** | `primary` (`#6750A4` / `#D0BCFF`) filled circle/pill | `on-primary` (`#FFFFFF` / `#381E72`) | `on-primary` |
| **Today's Date (Unselected)** | `1dp` circular outline in `primary` (`#6750A4` / `#D0BCFF`), transparent fill | `primary` (`#6750A4` / `#D0BCFF`) | `primary` |
| **In-Range Date (Between Start & End)** | `secondary-container` (`#E8DEF8` / `#4A4458`) continuous `40dp`-high strip | `on-secondary-container` (`#4A4458` / `#E8DEF8`) | `on-primary-container` (`#4F378B` / `#EADDFF`) |
| **Unselected Date (Current Month)** | Transparent | `on-surface` (`#1D1B20` / `#E6E0E9`) | `on-surface-variant` (`#49454F` / `#CAC4D0`) |
| **Unselected Year** | Transparent | `on-surface-variant` (`#49454F` / `#CAC4D0`) | `on-surface-variant` |
| **Outside-Month Date (Docked)** | Transparent | `on-surface` @ `0.38` opacity | None |
| **Weekday Column Headers** | Transparent (non-interactive, hover tooltip only) | `on-surface` (`#1D1B20` / `#E6E0E9`), `body-large` (`16pt/24pt`) | None |

### Behavior, Navigation & Accessibility

- **Switching Between Calendar and Input**: Modal Date Pickers include a header icon button (`edit` pencil icon) to swap to **Modal Date Input**, and Modal Date Input includes a `calendar` icon button to swap back.
- **Month & Year Navigation**:
  - **Docked**: Click `<` / `>` arrows or open the Month / Year dropdown menus (opening the year menu replaces the calendar grid in-place).
  - **Modal Single Date**: Swipe horizontally across the calendar grid (or tap `<` `>`) to change months; tap the year menu button to open the vertically scrollable year grid.
  - **Modal Date Range**: Scroll **vertically** across continuous months.
- **Accessible Date Input Formatting (Critical Rule)**:
  - **Never use live input masks**: Do **not** automatically insert slashes (`/`) or dashes while the user is actively typing, as this mutates input mid-entry and confuses screen reader users.
  - **Format on commit**: Parse and auto-format the date (e.g., `08172023` → `08/17/2023`) **after** the user presses `Enter` or leaves (blurs) the text field. Accept flexible separators (`/`, `-`, `.`, spaces, omitted leading zeros).
  - **Helper Text**: Default supporting text below the date field must state the expected format (e.g., `MM/DD/YYYY`).
- **Screen Reader & Keyboard Navigation**:
  - Verbalize full dates on each grid cell (e.g., *"Monday, August 17, 2026"*, not just *"17"*). Maintain ≥4.5:1 text contrast on date numerals.
  - Omit the optional **Clear** button if not required to reduce tab stops.
  - Expose keyboard shortcuts in button tooltips:
    - `Enter` / `Return`: Confirms selection and closes the calendar.
    - `Page Up` / `Page Down`: Moves to the same day in the previous / next month.
    - `Shift + Page Up` / `Shift + Page Down`: Moves to the same day in the previous / next year.
    - `Home` / `End`: Moves to the first / last day of the current month.
    - `Shift + M` / `Shift + Y`: Moves focus to the Month / Year dropdown button.

### Do / Don't

- **✅ Do**: Default to **Modal Date Input** (or a plain text field with format hint) for dates in the distant past/future like Date of Birth.
- **❌ Don't**: Scale Docked or Modal Date Picker dimensions up fluidly on large screens — keep their fixed container widths (`360dp` / `328dp`).

---

## 3. Time Pickers (`md.comp.time-picker`, `md.comp.time-input`)

Time pickers are modal dialogs above a scrim that let users select hours, minutes, and AM/PM via a circular clock dial or numeric keyboard fields.

### Variants, Layouts & Measurements

| Element | Attribute | Time Picker Dial (`md.comp.time-picker`) | Time Picker Input (`md.comp.time-input`) |
| :--- | :--- | :--- | :--- |
| **Modal Container** | Padding / Shape / Elevation | `24dp` all sides, `28dp` (`extra-large`) radius, `level3` (`6dp`) elevation, dynamic width/height | `24dp` all sides, `28dp` (`extra-large`) radius, `level3` (`6dp`) elevation, dynamic width/height |
| **Headline** | Typography & Alignment | `label-medium` (`12pt/16pt`, weight `500`, `0.5pt` tracking), start-aligned | `label-medium` (`12pt/16pt`, weight `500`, `0.5pt` tracking), start-aligned |
| **Hour / Minute Selector Box** | Size & Shape (12h) | `96dp × 80dp`, `8dp` (`small`) radius | `96dp × 72dp`, `8dp` (`small`) radius |
| | Size (24h Vertical Dial) | `114dp × 80dp` (`96×80dp` in horizontal) | `96dp × 72dp` |
| | Numeral Typography | `display-large` (`57pt/64pt`, weight `400`, `-0.25pt` tracking) | `display-medium` (`45pt/52pt`, weight `400`, `0pt` tracking) |
| | Separator (`:`) Typography | `display-large` (`57pt/64pt`, `on-surface`) | `display-large` (`57pt/64pt`, `on-surface`) |
| | Field Supporting Label | None | `body-small` (`12pt/16pt`, `on-surface-variant`, *"Hour"* / *"Minute"* below field) |
| **AM/PM Period Selector** | Vertical Layout Size | `52dp × 80dp` (to the right of minutes) | `52dp × 72dp` (to the right of minutes) |
| | Horizontal Layout Size | `216dp × 38dp` (stacked below hour/minute boxes) | `52dp × 72dp` |
| | Shape, Border & Type | `8dp` (`small`) radius, `1dp` `outline` border, `title-medium` (`16pt/24pt`, weight `500`) | Same |
| **Clock Dial** | Container Size & Shape | `256dp × 256dp`, `md.sys.shape.corner.full` (circle) | *Not present* |
| | Center Dot & Track | `8dp` center circle + `2dp` track line (`primary`) | *Not present* |
| | Selector Handle Target | `48dp × 48dp` circle (`primary`) | *Not present* |

### Color Roles (Dial & Input)

| Element | Unselected / Rest | Selected / Focused |
| :--- | :--- | :--- |
| **Modal Container** | `surface-container-high` (`#ECE6F0` / `#2B2930`) | — |
| **Headline & Supporting Labels** | `on-surface-variant` (`#49454F` / `#CAC4D0`) | — |
| **Hour / Minute Box** | Fill: `surface-container-highest` (`#E6E0E9` / `#36343B`)<br>Text: `on-surface` (`#1D1B20` / `#E6E0E9`) | Fill: `primary-container` (`#EADDFF` / `#4F378B`)<br>Text: `on-primary-container` (`#4F378B` / `#EADDFF`)<br>Input focus outline: `2dp` `primary` (`#6750A4` / `#D0BCFF`) |
| **AM/PM Period Selector** | Fill: Transparent; Border: `1dp` `outline` (`#79747E` / `#938F99`)<br>Text: `on-surface-variant` (`#49454F` / `#CAC4D0`) | Fill: `tertiary-container` (`#FFD8E4` / `#633B48`)<br>Text: `on-tertiary-container` (`#633B48` / `#FFD8E4`) |
| **Clock Dial Face & Numerals** | Face: `surface-container-highest` (`#E6E0E9` / `#36343B`)<br>Numerals (`body-large` `16pt`): `on-surface` (`#1D1B20` / `#E6E0E9`) | Handle (`48dp`), Track (`2dp`), Center (`8dp`): `primary` (`#6750A4` / `#D0BCFF`)<br>Selected numeral: `on-primary` (`#FFFFFF` / `#381E72`) |
| **Bottom Action Buttons** | Toggle Icon Button (`keyboard` / `schedule`): `on-surface-variant`<br>*Cancel* / *OK* Text Buttons: `primary` | Standard icon/text button state layers |

### 12-Hour vs 24-Hour Clock Rules

- **12-Hour Format**: Displays the AM/PM period selector (`52×80dp` vertical or `216×38dp` horizontal) and places hours `1–12` in a single outer ring on the `256dp` clock dial.
- **24-Hour Format**: Controlled by system locale/settings outside the component. **Omits** the AM/PM period selector (`114×80dp` hour/minute boxes in vertical dial layout) and uses **two concentric rings** on the clock dial (outer ring and inner ring, e.g., `00–11` outer / `12–23` inner).

### Adaptive Design, Behavior & Accessibility

- **Viewport Adaptation & Zero-Scroll Rule**: Time pickers must **never scroll** internally or scroll with background content:
  - Portrait mobile: Use **Vertical Dial** layout (time boxes stacked above the `256dp` dial).
  - Landscape mobile / limited height: Switch to **Horizontal Dial** layout (time boxes and `216×38dp` period selector on the left, `256dp` clock dial on the right).
  - Severely constrained height: Fall back to **Time Picker Input** (`md.comp.time-input`). **Never** apply high density to shrink the clock dial (keeps `48×48dp` dial targets accessible).
- **Dial ↔ Keyboard Toggle**: The bottom-left icon button (`keyboard` icon in Dial view, `schedule` clock icon in Input view) must always allow users to switch between Dial and Input modes.
- **Accessibility & Roles**:
  - Hour and Minute boxes use text input semantics labeled *"Hour"* and *"Minute"*.
  - AM/PM buttons use radio button (Compose/Web) or checkbox (Android Views) list semantics labeled *"AM"* and *"PM"*.
  - Clock dial numbers use button semantics announcing `"{Value} hours of {12|24}"` or `"{Value} minutes of 60"` (e.g., *"Hour 7 of 12"*).
  - `Tab` moves focus between non-disabled time slots/controls; `Space` or `Enter` activates the focused slot.

---

## Implementation Notes

### Platform API Mapping

| Component | Jetpack Compose (`androidx.compose.material3`) | Flutter (`material`) | Material Web (`@material/web`) |
| :--- | :--- | :--- | :--- |
| **Filled Text Field** | `TextField` | `TextField` / `TextFormField` (`InputDecoration(filled: true)`) | `<md-filled-text-field>` |
| **Outlined Text Field** | `OutlinedTextField` | `TextField` (`InputDecoration(border: OutlineInputBorder())`) | `<md-outlined-text-field>` |
| **Select / Autocomplete** | `ExposedDropdownMenuBox` + `TextField` / `OutlinedTextField` | `DropdownMenu<T>`, `Autocomplete<T>` | `<md-filled-select>`, `<md-outlined-select>` |
| **Date Pickers** | `DatePicker`, `DatePickerDialog`, `DateRangePicker` (`DisplayMode.Picker` / `DisplayMode.Input`) | `showDatePicker`, `showDateRangePicker`, `CalendarDatePicker`, `InputDatePickerFormField` | *No built-in `md-date-picker` in Material Web* |
| **Time Pickers** | `TimePicker` (dial), `TimeInput` (keyboard), `rememberTimePickerState` | `showTimePicker` (`TimePickerEntryMode.dial` / `input`) | *No built-in `md-time-picker` in Material Web* |

### Minimal CSS Sketch (`--md-sys-*` Custom Properties)

```css
/* Filled Text Field */
.md3-filled-text-field {
  position: relative;
  height: 56px;
  padding: 8px 16px;
  box-sizing: border-box;
  background: var(--md-sys-color-surface-container-highest, #E6E0E9);
  border-radius: var(--md-sys-shape-corner-extra-small, 4px) var(--md-sys-shape-corner-extra-small, 4px) 0 0;
  border-bottom: 1px solid var(--md-sys-color-on-surface-variant, #49454F);
  font: 400 16px/24px var(--md-sys-typescale-body-large-font, Roboto, sans-serif);
  color: var(--md-sys-color-on-surface, #1D1B20);
}
.md3-filled-text-field:focus-within {
  border-bottom: 2px solid var(--md-sys-color-primary, #6750A4);
}
.md3-filled-text-field[aria-invalid="true"] {
  border-bottom-color: var(--md-sys-color-error, #B3261E);
}

/* Outlined Text Field */
.md3-outlined-text-field {
  height: 56px;
  padding: 0 16px;
  box-sizing: border-box;
  background: transparent;
  border-radius: var(--md-sys-shape-corner-extra-small, 4px);
  border: 1px solid var(--md-sys-color-outline, #79747E);
  color: var(--md-sys-color-on-surface, #1D1B20);
}
.md3-outlined-text-field:focus-within {
  border: 2px solid var(--md-sys-color-primary, #6750A4);
}
```

---

## Further Reading

- Pages: [docs/pages/text-fields.md](file:///Users/leon/Desktop/Leon/material-design-skill/docs/pages/text-fields.md), [docs/pages/date-pickers.md](file:///Users/leon/Desktop/Leon/material-design-skill/docs/pages/date-pickers.md), [docs/pages/time-pickers.md](file:///Users/leon/Desktop/Leon/material-design-skill/docs/pages/time-pickers.md)
- Tokens: [tokens/components/text-fields.md](file:///Users/leon/Desktop/Leon/material-design-skill/tokens/components/text-fields.md), [tokens/components/date-pickers.md](file:///Users/leon/Desktop/Leon/material-design-skill/tokens/components/date-pickers.md), [tokens/components/time-pickers.md](file:///Users/leon/Desktop/Leon/material-design-skill/tokens/components/time-pickers.md)
