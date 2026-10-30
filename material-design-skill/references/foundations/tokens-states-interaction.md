# Design Tokens, Interaction States, Gestures, Inputs & Selection

Material Design 3 (M3) token architecture (`md.ref.*` → `md.sys.*` → `md.comp.*`), resolved baseline system tokens, interaction states and state layers, focus rings, gestures (including predictive back), multimodal inputs, and selection patterns.

Sources: `https://m3.material.io/foundations/design-tokens`, `https://m3.material.io/foundations/customization`, `https://m3.material.io/foundations/glossary`, `https://m3.material.io/foundations/interaction/states`, `https://m3.material.io/foundations/interaction/gestures`, `https://m3.material.io/foundations/interaction/inputs`, `https://m3.material.io/foundations/interaction/selection`

---

## When to Use / Core Principles

- **Never hardcode style values**: Reference M3 design tokens (`md.sys.*` and `md.comp.*`) for colors, typography, corner radii, elevations, state opacities, motion springs/easings, and spacing so themes (Light/Dark, Standard/Medium/High contrast, Dynamic Color, Density) propagate automatically.
- **Layer states systematically**: Every interactive state (Hover, Focus, Pressed, Dragged) renders a single **state layer** between the container and content using the content's `on-*` color at a fixed token opacity (`8%`, `10%`, `10%`, `16%`), plus a `3dp` focus ring on keyboard/voice focus.
- **Support all input modalities simultaneously**: Users connect mice, trackpads, and physical keyboards to phones, foldables, tablets, and XR headsets. Build every screen for touch, pointer, and keyboard out of the box.

---

## 1. Design Token Architecture

### Token Anatomy
Every M3 token name uses dot-separated hierarchy from general to specific:
$$\underbrace{\text{md}}_{\text{1. System prefix}} . \underbrace{\text{sys} \mid \text{ref} \mid \text{comp}}_{\text{2. Token class}} . \underbrace{\text{category.role.element.property}}_{\text{3. Semantic role / element descriptor}}$$
Example: `md.comp.fab.primary.container.color` → points to `md.sys.color.primary-container` → points to `md.ref.palette.primary90` (`#EADDFF` in Light, `primary30` `#4F378B` in Dark).

### Three Classes of Tokens

| Token Class | Prefix | Purpose & Behavior | Example |
|---|---|---|---|
| **1. Reference tokens** | `md.ref.*` | Static menu of all available style primitives (13-tone palettes, typefaces, font weights). **Context-independent**—never changes between light/dark themes. | `md.ref.palette.secondary90` = `#E8DEF8`<br>`md.ref.typeface.plain` = `Roboto`<br>`md.ref.typeface.weight-medium` = `500` |
| **2. System tokens** | `md.sys.*` | Semantic roles and decisions that define the theme's character (color roles, type scale, shape corners, elevation levels, state opacities, motion springs/easings, spacing scale). **Context-aware**—points to different reference tokens based on theme/context tags. | `md.sys.color.secondary-container`<br>`md.sys.typescale.label-large`<br>`md.sys.shape.corner.large` (`16dp`)<br>`md.sys.state.hover.state-layer-opacity` (`0.08`) |
| **3. Component tokens** | `md.comp.*` | Design properties assigned to specific anatomical elements of a component, organized by **state** (`enabled`, `disabled`, `hover`, `focus`, `pressed`, `dragged`) and **element** (`container`, `label-text`, `icon`, `outline`, `state-layer`, `focus.indicator`). Always points to `md.sys.*` or `md.ref.*` tokens when possible. | `md.comp.filled-button.enabled.container.color` → `md.sys.color.primary`<br>`md.comp.filled-button.hover.state-layer.opacity` → `md.sys.state.hover.state-layer-opacity` |

### Context Tags & Dynamic Color Pipeline
- **Contexts**: Conditions that override default token mappings, including **Light vs. Dark theme**, **Contrast level** (`Standard`, `Medium` ≥3:1, `High` ≥7:1), **Device form factor** (mobile, desktop, watch, XR), **Visual density** (`0` to `-4`), and **Directionality** (`LTR` vs `RTL`).
- **Dynamic Color Pipeline (HCT & Material Color Utilities)**:
  1. **Source color**: Extracted via quantization from user wallpaper (User-generated scheme), extracted from in-app media/artwork (Content-based scheme), or hand-picked by a brand designer (Baseline/Custom scheme).
  2. **Five Key Colors**: Algorithm transforms source hue and chroma into `Primary`, `Secondary`, `Tertiary`, `Neutral`, and `Neutral Variant` key colors (plus `Error` and optional `Extended` semantic/brand colors).
  3. **Tonal Palettes**: Each key color generates a 13-tone HCT (Hue `0–360`, Chroma `0–~120`, Tone/Luminance `0–100`) palette (`0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100`, plus surface-specific neutral tones `4, 6, 12, 17, 22, 24, 87, 92, 94, 96`).
  4. **Color Roles**: Tones map to 26+ semantic `md.sys.color.*` roles with guaranteed contrast (in HCT, a **tone difference of `≥40` guarantees `≥3.0:1` WCAG contrast**; a **tone difference of `≥50` guarantees `≥4.5:1` WCAG contrast**).

### Resolved System Token Quick Reference (`tokens/sys-tokens.md`)

#### Core Color Roles (`md.sys.color.*` — Baseline 3P Theme)
| Role Token | Light Ref → Hex | Dark Ref → Hex | Primary Pairing / Usage |
|---|---|---|---|
| `primary` / `on-primary` | `primary40` `#6750A4` / `primary100` `#FFFFFF` | `primary80` `#D0BCFF` / `primary20` `#381E72` | High-emphasis fills (Filled button, active controls) |
| `primary-container` / `on-primary-container` | `primary90` `#EADDFF` / `primary30` `#4F378B` | `primary30` `#4F378B` / `primary90` `#EADDFF` | FABs, prominent tonal containers |
| `secondary` / `on-secondary` | `secondary40` `#625B71` / `secondary100` `#FFFFFF` | `secondary80` `#CCC2DC` / `secondary20` `#332D41` | Focus indicator ring, secondary accents |
| `secondary-container` / `on-secondary-container` | `secondary90` `#E8DEF8` / `secondary30` `#4A4458` | `secondary30` `#4A4458` / `secondary90` `#E8DEF8` | Tonal buttons, selected chips, nav active indicator |
| `tertiary` / `on-tertiary` | `tertiary40` `#7D5260` / `tertiary100` `#FFFFFF` | `tertiary80` `#EFB8C8` / `tertiary20` `#492532` | Contrasting accents, badges, input highlights |
| `tertiary-container` / `on-tertiary-container` | `tertiary90` `#FFD8E4` / `tertiary30` `#633B48` | `tertiary30` `#633B48` / `tertiary90` `#FFD8E4` | Complementary containers |
| `error` / `on-error` | `error40` `#B3261E` / `error100` `#FFFFFF` | `error80` `#F2B8B5` / `error20` `#601410` | Invalid states, destructive indicators |
| `error-container` / `on-error-container` | `error90` `#F9DEDC` / `error30` `#8C1D18` | `error30` `#8C1D18` / `error90` `#F9DEDC` | Error banners/containers |
| `surface` / `on-surface` | `neutral98` `#FEF7FF` / `neutral10` `#1D1B20` | `neutral6` `#141218` / `neutral90` `#E6E0E9` | Default page background & primary text/icons |
| `on-surface-variant` | `neutral-variant30` `#49454F` | `neutral-variant80` `#CAC4D0` | Secondary text, unselected icons, supporting labels |
| `surface-container-low` / `surface-container` | `neutral96` `#F7F2FA` / `neutral94` `#F3EDF7` | `neutral10` `#1D1B20` / `neutral12` `#211F26` | Elevated cards, sheets, navigation bar/rail |
| `surface-container-high` / `highest` | `neutral92` `#ECE6F0` / `neutral90` `#E6E0E9` | `neutral17` `#2B2930` / `neutral22` `#36343B` | Dialogs, menus, filled text fields, highest containers |
| `outline` / `outline-variant` | `neutral-variant50` `#79747E` / `nv80` `#CAC4D0` | `neutral-variant60` `#938F99` / `nv30` `#49454F` | `outline`: 3:1 control borders; `outline-variant`: decorative dividers |
| `inverse-surface` / `inverse-on-surface` / `inverse-primary` | `n20` `#322F35` / `n95` `#F5EFF7` / `p80` `#D0BCFF` | `n90` `#E6E0E9` / `n20` `#322F35` / `p40` `#6750A4` | Snackbars, tooltips |

#### Shape (`md.sys.shape.corner.*`) & Elevation (`md.sys.elevation.*`)
- **Shape Corner Scale**: `none` (`0dp`), `extra-small` (`4dp`), `small` (`8dp`), `medium` (`12dp`), `large` (`16dp`), `large-increased` (`20dp`), `extra-large` (`28dp`), `extra-large-increased` (`32dp`), `extra-extra-large` (`48dp`), `full` (circular/pill `9999px`). Asymmetric variants: `.top`, `.start`, `.end`.
- **Elevation Levels**: `level0` (`0dp`), `level1` (`1dp`), `level2` (`3dp`), `level3` (`6dp`), `level4` (`8dp`), `level5` (`12dp`).

#### Motion Springs, Easings & Durations (`md.sys.motion.*`)
- **M3 Expressive Springs**:
  - **Spatial springs** (movement, size, shape morph — slight overshoot, `damping = 0.9`): `fast.spatial` (`stiffness = 1400`), `default.spatial` (`stiffness = 700`), `slow.spatial` (`stiffness = 300`).
  - **Effects springs** (color, opacity — critically damped, `damping = 1.0`, never overshoots): `fast.effects` (`stiffness = 3800`), `default.effects` (`stiffness = 1600`), `slow.effects` (`stiffness = 800`).
- **Easing Curves**: `emphasized` (SVG path; `decelerate`: `cubic-bezier(0.05, 0.7, 0.1, 1)`, `accelerate`: `cubic-bezier(0.3, 0, 0.8, 0.15)`), `standard` (`cubic-bezier(0.2, 0, 0, 1)`; `decelerate`: `cubic-bezier(0, 0, 0, 1)`, `accelerate`: `cubic-bezier(0.3, 0, 1, 1)`), `linear` (`cubic-bezier(0, 0, 1, 1)`).
- **Durations (ms)**: `short1–4` (`50, 100, 150, 200`), `medium1–4` (`250, 300, 350, 400`), `long1–4` (`450, 500, 550, 600`), `extra-long1–4` (`700, 800, 900, 1000`).

### How to Customize Tokens
1. **Global Theme Level (`md.sys.*`)**: Use the **Material Theme Builder** (Figma plugin or web tool) to generate custom `md.ref.palette.*` and `md.sys.color.*` / `md.sys.typescale.*` tokens from 1–3 brand colors, exporting to Jetpack Compose (`Color.kt`, `Theme.kt`, `Type.kt`), Android Views XML, Flutter, Web CSS, or **Design System Package (DSP)** JSON.
2. **Component Level (`md.comp.*`)**: Override specific component token mappings (e.g., remapping `button.top-padding` from `space125` `10dp` to `space200` `16dp`) so the change cascades to every instance of that component across the product.

---

## 2. Interaction States & State Layers

### State Layer Architecture
A **state layer** is a semi-transparent overlay rendered **between the Container (Layer 1) and the Content (Layer 3)**:
$$\text{Layer 1: Container} \longrightarrow \text{Layer 2: State Layer (content color at state opacity)} \longrightarrow \text{Layer 3: Content (icon / label)}$$
- **Color**: Derived from the component's **content color** (the icon color, or the label text color if no icon is present—typically an `on-*` role like `on-secondary-container` or `primary`).
- **Shape & Size**: Matches the full container bounds, or renders as a `40×40dp` circle centered inside a `48×48dp` touch target for compact icon controls.
- **Single-layer rule**: Only **one** state layer is applied to an element at any given time, even when states combine (e.g., `Selected + Hover` applies the selected container/content colors plus the `8%` hover state layer).

### Complete Interaction States & Token Specifications

| State | System Token(s) | Resolved Value | Visual & Behavioral Rules |
|---|---|---|---|
| **Enabled** | Component default tokens | `0%` state layer | Default interactive appearance. High contrast between container and content. |
| **Disabled** | `md.sys.state.disabled.state-layer-opacity`<br>`*.disabled.label-text.opacity`<br>`*.disabled.icon.opacity`<br>`*.disabled.container.opacity`<br>`*.disabled.outline.opacity`<br>`*.disabled.container.elevation` | **`38%` (`0.38`)** content<br>**`12%` (`0.12`)** container/outline<br>`0dp` (`level0`) elevation | Uses `md.sys.color.on-surface` at **`12%` opacity** for filled/elevated containers and outlines, and `on-surface` at **`38%` opacity** for labels and icons. Elevation drops to `0dp`.<br>• **Exempt from WCAG contrast ratios.**<br>• **Inoperable**: Cannot be focused, hovered, pressed, or dragged.<br>• **Multiple allowed**: Any number of disabled elements can appear on screen.<br>• **❌ Don't**: Never show a disabled **FAB**—if a FAB's action is unavailable, hide the FAB completely. |
| **Hover** | `md.sys.state.hover.state-layer-opacity` | **`8%` (`0.08`)** state layer | Triggered when a pointer cursor pauses over an element (or via eye-tracking gaze in XR). Appears/disappears with a fast fade (`effects` spring).<br>• Can combine with `Focused`, `Activated`, `Selected`, or `Pressed`.<br>• **Singleton**: Only **1 element** in a layout can be hovered at a time. |
| **Focused** | `md.sys.state.focus.state-layer-opacity`<br>`md.sys.state.focus-indicator.thickness`<br>`md.sys.state.focus-indicator.outer-offset`<br>`md.sys.state.focus-indicator.inner-offset`<br>`*.focus.indicator.color` | **`10%` (`0.10`)** state layer<br>**`3dp`** ring thickness<br>**`2dp`** outer offset<br>**`-3dp`** inner offset<br>`md.sys.color.secondary` | Triggered by keyboard (`Tab` / `Arrow` keys), switch device, or voice navigation.<br>• Renders both the **`10%` state layer** AND a **`3dp` keyboard focus indicator ring** (`md.sys.color.secondary`).<br>• Use **`2dp` outer offset** (`outer-offset`) on standalone bounded controls (buttons, chips, cards, checkboxes, switches, FABs).<br>• Use **`-3dp` inner offset** (`inner-offset`) on edge-to-edge or parent-clipped items (list items, menu items, navigation bar/drawer items, tabs).<br>• Can combine with `Hover`, `Activated`, or `Selected`.<br>• **Singleton**: Only **1 element** in a layout can be focused at a time. |
| **Pressed** | `md.sys.state.pressed.state-layer-opacity` | **`10%` (`0.10`)** state layer / ripple | Triggered by finger tap, mouse click, keyboard `Enter`/`Space`, or voice command. Renders a high-emphasis **`10%` ripple/state layer** (plus optional shape morph or elevation shift).<br>• Can combine with `Hover`, `Focus`, `Activated`, or `Selected`.<br>• **Singleton**: Only **1 element** in a layout can be in pressed state at a time. |
| **Dragged** | `md.sys.state.dragged.state-layer-opacity` | **`16%` (`0.16`)** state layer | Triggered when a user presses/long-presses and moves an element (cards, chips, list items, slider thumbs). Uses a **`16%` state layer** and often increases elevation (e.g., `level3`/`level4`) to float above peers.<br>• **Singleton**: Only **1 element** in a layout can be dragged at a time. |

### Selected vs. Activated States
- **Selected State**: Communicates user choice on **action, input, and selection components** (Cards, Checkboxes, Filter/Input Chips, Data table rows, Toggle Icon buttons, List items, Menu items, Pickers, Radio buttons, Segmented buttons, Sliders, Switches). Signaled by a **checkmark icon**, **checkbox**, **container color change** (e.g., `secondary-container` or `primary`), **shape morph** (e.g., rounded → squarish or vice versa in M3 Expressive), or a combination. Supports single or multiple selections depending on component.
- **Activated State (Active Indicator)**: Communicates the current destination in **navigation components** (**Navigation bar**, **Navigation drawer**, **Navigation rail**, **Tabs**) via a pill-shaped or underline **active indicator**. Only **one** item can be active at a time within a navigation group.

### Component State Inheritance Matrix

> **Critical Rule (`❌ Don't`)**: Composite container and navigation components (App bars, Navigation bars/rails/drawers, Dialogs, Menus, Sheets, Tabs) **never inherit whole-container Disabled, Hover, Focus, Pressed, or Dragged states**. Only the individual interactive child items *inside* them inherit states.

| Component / Category | Disabled | Hover | Focus | Pressed | Dragged | Selected / Active |
|---|:---:|:---:|:---:|:---:|:---:|---|
| **Buttons, Icon buttons, Segmented buttons** | ✅ | ✅ | ✅ (`+2dp`) | ✅ | ❌ | Toggle Icon & Segmented: **Selected** |
| **FAB & Extended FAB** | ❌ (Hide instead) | ✅ | ✅ (`+2dp`) | ✅ | ❌ | FAB Menu trigger: **Selected/Expanded** |
| **Cards & Chips** | ✅ | ✅ | ✅ (`+2dp`) | ✅ | ✅ | **Selected** |
| **List items** | ✅ | ✅ | ✅ (`-3dp`) | ✅ | ✅ | **Selected** |
| **Checkboxes, Radio buttons, Switches** | ✅ | ✅ | ✅ (`+2dp`) | ✅ | ❌ (Switch thumb drags) | **Selected** |
| **Sliders** | ✅ | ✅ | ✅ (`+2dp`) | ✅ | ✅ (Thumb) | **Selected** (Value) |
| **Text fields, Date & Time pickers** | ✅ | ✅ | ✅ | ✅ | ❌ | Pickers: **Selected** |
| **Menu items** (inside Menu) | ✅ | ✅ | ✅ (`-3dp`) | ✅ | ❌ | **Selected** |
| **Tabs, Nav bar/rail/drawer items** | ❌ (Whole bar) | ✅ (Item only) | ✅ (`-3dp` item) | ✅ (Item only) | ❌ | **Active indicator** (1 at a time) |
| **App bars, Dialogs, Sheets, Badges, Banners, Tooltips** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ (Only child actions have states) |

---

## 3. Gestures & Predictive Back

UI elements must respond to gestures in real time using physics-based spring tokens (`md.sys.motion.spring.*`).

| Gesture Category | Gesture | Mechanics & Standard M3 Behavior |
|---|---|---|
| **Navigation & Action** | **Tap** | Single touch/click activates buttons, opens cards into detail views, or toggles controls. |
| **Transform** | **Double tap** | Two quick taps zoom in/out of media (photos, maps) or expand an image to full screen. |
| **Selection & Context** | **Long press** | Touch and hold enters **selection mode** on lists/grids, reveals tooltips on icon-only controls, or opens context menus. |
| **Navigation** | **Scroll & Pan** | Vertical, horizontal, or omnidirectional surface sliding to browse feeds, lists, or canvases. |
| **Navigation & Action** | **Swipe** | Horizontal flick switches between peer views (e.g., Tabs, Carousels) or reveals behind-item actions on list items (e.g., archive/delete/favorite). Must mirror in RTL. |
| **Navigation (Android)** | **Predictive back** | Edge swipe (left or right) previews the previous destination before the user commits or cancels the gesture.<br>• **Compatible M3 components**: **Bottom sheet**, **Navigation bar**, **Navigation rail**, **Search bar**, **Side sheet**.<br>• Must mirror in RTL contexts. |
| **Transform / Reorder** | **Drag** | Press and move to slide sheets/drawers or reorder items in a list. |
| **Reorder** | **Pick up and move** | **Long press + drag** elevates an item (`16%` dragged state layer + shadow) to move it to a new slot (e.g., rescheduling a calendar event or reordering cards). |
| **Transform / Navigation** | **Pinch** | Two-finger spread/pinch scales content (zooming maps/photos) or transitions a photo between thumbnail grid and full-screen view. |
| **Multimodal** | **Compound gestures** | Fluid transition between gestures without lifting fingers (e.g., panning + pinching simultaneously in a map view). |

---

## 4. Multimodal Inputs (Touch, Mouse, Trackpad, Stylus, Keyboard)

### Pointer (Mouse, Trackpad & Stylus) Rules
Always display a cursor when an external mouse or trackpad is connected to any device (phone, foldable, tablet, desktop).
- **Primary click**: Triggers the same feedback as touch (`Pressed` state layer / ripple).
- **Secondary click** (right-click or two-finger trackpad tap): Opens a **Context Menu** (`md-menu`) with object-specific actions.
- **Hover**: Triggers `8%` hover state layer and invokes **Tooltips** after a brief delay.
- **Wheel & Two-finger trackpad scroll**: Scrolls the specific pane or carousel **directly underneath the stationary cursor** (vertical or horizontal).
- **Drag behavior difference (Touch vs. Mouse)**:
  - **Touch drag** inside a text area **scrolls** the viewport.
  - **Mouse drag** inside a text area **highlights/selects text and images**.
- **Text Selection Controls**:
  - When selecting text via **mouse, trackpad, or stylus**: Highlight text with a single color and use the **right-click context menu**. **Do not show touch teardrop handles.**
  - When selecting text via **touchscreen**: Always show **touch selection handles and floating toolbar**, even if a physical mouse and keyboard are currently connected.
- **Stylus**: Do not render a cursor for stylus input unless communicating brush/tool size and shape (e.g., a circle cursor in a drawing canvas).

### Standard Cursor Types
| Cursor Type | When to Display | Interaction Mechanics |
|---|---|---|
| **Pointer (Arrow)** | Default over background and standard UI controls (buttons, switches). | Click to activate. |
| **Hand (Pointer finger)** | Hovering over hyperlinks (`<a>`) and linked/clickable images. | Click to navigate. |
| **Resize arrows (`↔` / `↕`)** | Hovering over window edges, resizable floating panes, or **pane drag handles**. | Drag to resize pane/window. |
| **I-beam (`I`)** | Hovering over selectable or editable text. | • **1 click**: Places caret / deselects text<br>• **2 clicks**: Selects word<br>• **3 clicks**: Selects paragraph |
| **Circle / Tool** | Stylus hovering over a creative canvas. | Indicates brush diameter/shape. |

### Physical Keyboard Interactions
- **Virtual keyboard suppression (`✅ Do`)**: Automatically **hide the on-screen virtual keyboard** whenever a physical keyboard is connected; automatically restore the virtual keyboard when disconnected.
- **Standard Key Bindings**:

| Key | Expected M3 Behavior |
|---|---|
| **`Tab` / `Shift + Tab`** | Moves focus forward / backward through interactive elements in logical DOM reading order (LTR: left-to-right, top-to-bottom; RTL: right-to-left, top-to-bottom) and displays the **`3dp` focus indicator ring**. |
| **`Arrow` keys (`↑ ↓ ← →`)** | Navigates *within* composite components (radio groups, tabs, menu items, segmented buttons, data table cells, sliders) where the group acts as a single `Tab` stop. |
| **`Enter`** | Activates focused links/buttons, submits forms, or **sends a message** in chat inputs. |
| **`Spacebar`** | Toggles checkboxes/switches/buttons, or **plays/pauses media** (audio/video players). |
| **`Escape` (`Esc`)** | Three-tier dismissal behavior:<br>1. **Dismisses open modals** (menus, dialogs, bottom sheets, expanded search).<br>2. **Removes visible focus indicator** from focused elements and resets focus order to `0`.<br>3. **Removes the active text caret** when typing in a text field **without deleting already-typed text**. |

---

## 5. Selection Patterns

| Modality / Scenario | Entering Selection | Multi-Selection Mechanics | Exiting Selection |
|---|---|---|---|
| **Touch (Lists & Feeds)** | **Long press**, **two-finger touch**, or **tap item avatar** (selection shortcut). | Once in selection mode, **single-tap** additional items to toggle selection. | Unselect all items one-by-one, tap the toolbar close/clear button, or press `Esc`/Back. |
| **Touch Batch Selection (Grids / Photos)** | **Long press + drag** across multiple items in a grid/feed. | Dragging across rows/columns selects a contiguous range in batches.<br>**`❌ Don't`**: Never bind **long press + drag** to batch selection if it is already used for **pick-up-and-move** card reordering. | Tap clear/close on contextual app bar/toolbar. |
| **Desktop / Pointer (Primary selection, e.g., Data Table)** | **Checkboxes are always visible** by default on every row. | Click checkboxes to select/deselect rows (`Shift+Click` for range). | Uncheck rows or click header "Select all / Clear" checkbox. |
| **Desktop / Pointer (Secondary selection, e.g., Email / Photo grid)** | Hovering over an item reveals a **single checkbox on that hovered item**. | Clicking that checkbox selects the item and **reveals checkboxes on all peer items** so subsequent items can be clicked directly. | Uncheck all selected items or click toolbar dismiss action. |

---

## 6. Implementation Notes

### Jetpack Compose (Material 3)
- **Interaction & State**: Use `MutableInteractionSource` with `collectIsHoveredAsState()`, `collectIsFocusedAsState()`, `collectIsPressedAsState()`, `collectIsDraggedAsState()`. Material 3 composables (`Button`, `Card`, `ListItem`, `FilterChip`, `NavigationBarItem`) automatically apply `md.sys.state.*` layer opacities (`0.08f`, `0.10f`, `0.16f`) and `ripple()` (M3 ripple API).
- **Predictive Back**: Use `BackHandler` or `PredictiveBackHandler` from `androidx.activity.compose`; M3 `ModalBottomSheet`, `SearchBar`, and `ModalNavigationDrawer` support predictive back scaling out of the box.

### Flutter (Material 3)
- **State Layers & Focus**: Use `WidgetStateProperty.resolveWith` (formerly `MaterialStateProperty`) for `overlayColor`, `backgroundColor`, `foregroundColor`, and `elevation` across `WidgetState.hovered`, `WidgetState.focused`, `WidgetState.pressed`, `WidgetState.dragged`, `WidgetState.selected`, `WidgetState.disabled`.

### Web / CSS Sketch (State Layers & Focus Indicator)
```css
:root {
  --md-sys-color-primary: #6750A4;
  --md-sys-color-on-primary: #FFFFFF;
  --md-sys-color-secondary: #625B71;
  --md-sys-color-on-surface: #1D1B20;
  --md-sys-state-hover-opacity: 0.08;
  --md-sys-state-focus-opacity: 0.10;
  --md-sys-state-pressed-opacity: 0.10;
  --md-sys-state-dragged-opacity: 0.16;
  --md-sys-state-disabled-content-opacity: 0.38;
  --md-sys-state-disabled-container-opacity: 0.12;
  --md-sys-state-focus-ring-thickness: 3px;
  --md-sys-state-focus-ring-outer-offset: 2px;
  --md-sys-state-focus-ring-inner-offset: -3px;
}

.m3-interactive {
  position: relative;
  isolation: isolate;
  background-color: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
  cursor: pointer;
}

/* State layer sandwiched between container and content */
.m3-interactive::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background-color: currentColor; /* Uses content (on-*) color */
  opacity: 0;
  pointer-events: none;
  z-index: 0;
  transition: opacity 100ms linear;
}

.m3-interactive:hover::before   { opacity: var(--md-sys-state-hover-opacity); }
.m3-interactive:focus-visible::before { opacity: var(--md-sys-state-focus-opacity); }
.m3-interactive:active::before  { opacity: var(--md-sys-state-pressed-opacity); }
.m3-interactive.is-dragged::before { opacity: var(--md-sys-state-dragged-opacity); }

/* 3dp Keyboard Focus Indicator Ring (2dp outer offset for bounded controls) */
.m3-interactive:focus-visible {
  outline: var(--md-sys-state-focus-ring-thickness) solid var(--md-sys-color-secondary);
  outline-offset: var(--md-sys-state-focus-ring-outer-offset);
}

/* -3dp inner offset for edge-to-edge list/menu/tab items */
.m3-list-item:focus-visible {
  outline: var(--md-sys-state-focus-ring-thickness) solid var(--md-sys-color-secondary);
  outline-offset: var(--md-sys-state-focus-ring-inner-offset);
}

/* Disabled State (12% container, 38% content, 0dp elevation) */
.m3-interactive:disabled {
  background-color: color-mix(in srgb, var(--md-sys-color-on-surface) 12%, transparent);
  color: color-mix(in srgb, var(--md-sys-color-on-surface) 38%, transparent);
  box-shadow: none;
  pointer-events: none;
}
```

---

Further reading: `docs/pages/design-tokens.md`, `docs/pages/customizing-material.md`, `docs/pages/material-a-z.md`, `docs/pages/interaction-states.md`, `docs/pages/gestures.md`, `docs/pages/inputs.md`, `docs/pages/selection.md`, `tokens/sys-tokens.md`.
