# Layout, Adaptive Design, Spacing & Bidirectionality

Material Design 3 (M3) adaptive layout system: scaffold architecture (bars, rails, panes, drag handles, rulers), five window width breakpoints, three canonical layouts, the 8dp spacing token scale, visual density rules, foldable/hardware considerations, and right-to-left (RTL) bidirectionality.

Sources: `https://m3.material.io/foundations/layout/layout-overview`, `https://m3.material.io/foundations/layout/breakpoints`, `https://m3.material.io/foundations/layout/scaffold`, `https://m3.material.io/foundations/layout/canonical-examples`, `https://m3.material.io/foundations/layout/grids-spacing`, `https://m3.material.io/styles/spacing`, `https://m3.material.io/foundations/layout/bidirectionality-rtl`

---

## When to Use / Core Principles

- **Design for breakpoints, not device categories**: Available window space changes dynamically at runtime due to multi-window mode, split-screen, free-form desktop window resizing, device rotation, and folding/unfolding. Never hardcode or cache screen dimensions.
- **Start from the Layout Scaffold & Canonical Layouts**: Assemble every screen from **Bars**, **Rails**, and **Panes** (1–3 visible panes), starting from a **Feed**, **List-detail**, or **Supporting pane** canonical layout.
- **Design across three experience tiers**: Start with **mobile** (phones, foldables, tablets), scale fluidly to **desktop** (free-form windows, pointer/keyboard), and extend to **spatial (XR)** (disconnected 3D spatial panels and orbiters).
- **Use logical directions (`leading` / `trailing`)**: Build bidirectional layouts out of the box so LTR and RTL languages mirror automatically without separate layout trees.

---

## 1. Parts of Layout & The Layout Scaffold

M3 structures every application window into a **Layout Scaffold** surrounded by system **Safety regions** and aligned to a responsive **Grid** and global **Rulers**.

| Element | Role & Behavior |
|---|---|
| **Window** | Frames and contains the application. Supports **full-screen** (mobile default), **split-screen** (2+ apps side-by-side), **bubbles** (floating multitasking windows), and **free-form resizable windows** (desktop/tablet). |
| **Safety region** | System-reserved zones at window edges (status bar, gesture navigation bar, display cutouts/camera holes). Never place primary content or interactive targets inside safety regions. |
| **Bars** | Frame the window adjacent to safety regions to provide app-level navigation and key actions. Typically house the **Top App Bar** (title + 1–2 essential actions like search/back) or **Bottom Navigation Bar** (3–5 primary destinations on `compact`/`medium`). Can span a single pane or the full window width. |
| **Rails** | Perimeter space immediately inside bars (or floating above panes).<ul><li>**Compact/Mobile**: Top/bottom rail regions hold floating **toolbars**, chat inputs, **FABs**, and screen-specific primary controls.</li><li>**Medium/Expanded/Large/XL**: Leading side rail holds the **Navigation Rail** (`72dp` collapsed, `256dp` expanded/drawer); trailing side rail holds a companion rail or vertical toolbar.</li><li>**Spatial (XR)**: In full space, rail components detach into floating **orbiters** outside the spatial panel.</li></ul> |
| **Panes** | Primary layout containers holding all screen content and components (`1–3` visible panes per window). Every layout must have **at least one flexible pane**. Panes can be **permanent** or **temporary** (dismissible). |
| **Spacer** | The `24dp` gap separating two co-planar panes (or aligning with a physical hinge/fold on foldable devices). |
| **Drag handle** | Interactive control placed inside the spacer between panes to resize flexible panes or collapse/expand fixed panes between 1-pane and 2-pane views. |
| **Column** | Vertical blocks organizing content *within* a pane (columns are scoped to panes, not the window). |
| **Rulers** | Global alignment lines across all scaffold layers: **Bar & safety rulers** (system UI boundaries), **Title ruler** (aligns app bar title/icons), **Content rulers** (1st ruler anchors hero media/headlines; secondary rulers align body text/actions), and **Margin rulers** (adjustable to tighten/loosen negative space or allow full-bleed media alongside inset components). |

> **Note on Legacy M3 Terminology**: Earlier M3 documentation referred to the three top-level regions as **Body**, **Navigation** (`72dp` rail / `256dp` drawer / `80dp` bottom bar), and **App bars**, and called Breakpoints **Window Size Classes**. In May 2026, M3 unified these under the **Layout Scaffold** (`Bars`, `Rails`, `Panes`) and renamed Window Size Classes to **Breakpoints** and Responsive Layout to **Adaptive Design**.

---

## 2. Breakpoints (Window Size Classes)

All devices and window states map to five width breakpoints. Across all breakpoints, constrain text containers or adjust typography so body copy remains between **40–60 characters per line**.

### Master Breakpoint Specification Table

| Breakpoint | Width Range | Typical Devices / Window Modes | Margins (Leading/Trailing) | Pane Spacer | Recommended Panes (Allowed) | Recommended Navigation | Dialogs & Supplemental Actions |
|---|---|---|---|---|---|---|---|
| **Compact** | `< 600dp` (`0–599dp`) | Phone in portrait, closed foldable, narrow split-screen | `16dp` (`space200`) | N/A (1 pane) | **1** (`1` only) | **Navigation bar** (bottom) or **Modal expanded navigation rail** | Basic or Full-screen dialog; **Bottom sheet** |
| **Medium** | `600–839dp` | Tablet in portrait, unfolded foldable in portrait, large split-screen | `24dp` (`space300`) | `24dp` (`space300`) | **1** (`2` for low-density only) | 1-pane: **Collapsed navigation rail** (or modal expanded rail)<br>2-pane: **Navigation bar** (preserves horizontal width) | Basic dialog; **Menu** |
| **Expanded** | `840–1199dp` | Phone in landscape, tablet in landscape, unfolded foldable in landscape, desktop window | `24dp` (`space300`) | `24dp` (`space300`) | **2** (`1` for dense/immersive media) | **Collapsed** or **Standard expanded navigation rail** | Basic dialog; **Menu** |
| **Large** | `1200–1599dp` | Laptop, desktop | `24dp` (`space300`) | `24dp` (`space300`) | **2** (`1` for dense/immersive media) | **Collapsed** or **Standard expanded navigation rail** | Basic dialog; **Menu** |
| **Extra-large** | `≥ 1600dp` | Desktop, ultra-wide monitor | `24dp` (`space300`) | `24dp` (`space300`) | **2** (`1`, or `3` with standard side sheet) | **Standard expanded navigation rail** (collapse on deep hierarchy or 3-pane) | Basic dialog; **Menu** |

### Height Breakpoints
Android also provides **Compact** (`<480dp`), **Medium** (`480–899dp`), and **Expanded** (`≥900dp`) height window size classes. Because most UIs scroll vertically, height breakpoints are rarely needed except when vertical space is abnormally constrained (e.g., phone in landscape).

### Five Questions for Adapting Across Breakpoints
When scaling a design from one breakpoint to the next, evaluate:
1. **What should be revealed?** Reveal hidden UI or secondary destinations (e.g., expand a collapsed navigation rail by default; reveal a conversation detail pane alongside an inbox list).
2. **How should the screen be divided?** Use 1 pane on `compact`/`medium` (reserve 2 panes on `medium` strictly for low-density views like settings toggles; reserve 1 pane on `expanded`+ for immersive media, games, video calls, or dense creative tools).
3. **What should be resized?** Scale cards, feeds, lists, and panes to highlight imagery and maintain 40–60 chars/line.
4. **What should be repositioned?** Reflow single-column stacks into multi-column grids, introduce negative space, and shift controls from bottom edge (`compact`) to leading edge (`medium`+) for reachability. Keep internal button icons and labels anchored together at the center when buttons stretch horizontally.
5. **What should be swapped?** Exchange functionally equivalent components for ergonomics:
   - **✅ Do**: Swap a bottom `NavigationBar` (`compact`) for a `NavigationRail` (`medium`/`expanded`), and expand the `NavigationRail` on `large`/`extra-large`.
   - **✅ Do**: Swap a full-screen dialog (`compact`) for a basic modal dialog (`medium`+), or a modal bottom sheet (`compact`) for a context menu (`medium`+).
   - **❌ Don't**: Never swap components that are not functionally equivalent (e.g., never swap a Button for a Chip or a Menu). Use caution when changing between list items and cards.

### Component-Level Adaptation Strategies
Individual components adapt via three mechanisms:
- **Resizing**: Grow/shrink with container width or hug contents while maintaining start/end alignment.
- **Showing & hiding**: Reveal additional metadata (e.g., list item secondary descriptions or timestamps appear on tablet/desktop).
- **Presentation changes**: Reorient internal layout (vertical card → horizontal card) or change configuration (standard FAB → Extended FAB; collapsed rail → expanded rail).

### Ergonomic Reachability (`Medium` / Tablet & Unfolded Foldable)
When users hold a tablet or unfolded foldable in two hands:
1. **Top 25% of screen (Challenging / Out of reach)**: Avoid placing frequent interactive controls in the upper quarter of the screen, as reaching it requires adjusting grip.
2. **Middle region (Comfortable / Convenient)**: Optimal zone for primary thumb/finger interactions and navigation rails.
3. **Bottom-most edge (Inconvenient for large hands)**: Avoid crowding essential targets flush against the bottom bezel on large handheld devices.

---

## 3. Panes: Widths, Containment, Presentation & Resizing

### Pane Width Configurations

| Configuration | Applicable Breakpoints | Width Rules |
|---|---|---|
| **Single-pane** | All (Recommended for `compact`, `medium`) | **1 flexible pane** filling `100%` of available body width (window width minus margins and rail). |
| **Two-pane: Split-pane** | `Medium` (low-density), `Expanded`, `Large`, `Extra-large`, Foldables | **2 flexible panes** with the `24dp` spacer **visually centered** at `50%` of the window width.<br>• With bottom nav bar or no nav: Pane 1 = `50%`, Pane 2 = `50%`.<br>• With leading nav rail (collapsed or expanded): **Nav rail + Pane 1 = `50%` of window width**; **Pane 2 = `50%` of window width** (the nav rail shrinks only the leading pane so the center spacer remains aligned with the window center/hinge). |
| **Two-pane: Fixed-and-flexible** | `Expanded`, `Large`, `Extra-large` | **1 fixed-width pane + 1 flexible pane** (in either leading-fixed or trailing-fixed order).<br>• **`Expanded` (`840–1199dp`)**: Fixed pane = **`360dp`** default width.<br>• **`Large` & `Extra-large` (`≥1200dp`)**: Fixed pane = **`412dp`** default width.<br>• Flexible pane fills remaining width. |
| **Three-pane** | `Extra-large` (`≥1600dp`) only | **2 panes + 1 standard side sheet** acting as a third pane.<br>• Fixed pane = **`412dp`**, Flexible pane = remaining width, Standard side sheet max width = **`400dp`**.<br>• When the 3rd pane opens, the expanded nav rail can stay visible, collapse, or hide.<br>• **Never exceed 3 visible panes.** |

### Pane Containment
- **Implicit grouping**: Panes share the same background color (`surface`) and rely on proximity and the `24dp` spacer to show relationship.
- **Explicit grouping**: Panes use distinct container colors (`surface-container-low`, `surface-container`, `surface-container-high`), outlines (`outline-variant`), or elevation shadows to establish clear visual boundaries.
- **Spatial (XR) requirement**: Disconnected spatial panels in XR **must** use explicit containment (an opaque/semi-transparent surface container color) to separate UI from passthrough or virtual environments; content *inside* the spatial panel can then use implicit grouping.

### Multi-Pane Presentation Modes & Adaptive Strategies

| Presentation Mode | Description & Best Use Cases | Focus & Accessibility Rules |
|---|---|---|
| **Co-planar** | Side-by-side panes on the same Z-plane. Best for persistent utilities, tool panels, and list-detail views. | Focus order must match the visual reading order of panes on screen (LTR: left-to-right; RTL: right-to-left). |
| **Floating** | Elevated above body content (like a dialog). Default for temporary tasks on large screens; background scrim is optional on large screens. Can be draggable/resizable (must provide accessible keyboard/button controls if so). | **Modal**: Traps focus inside; auto-focuses first element on open; returns focus to trigger on close (or next logical element if auto-triggered); dismisses on outside click.<br>**Non-modal**: Background remains interactive; focus moves freely into/out of pane in logical DOM reading order. |
| **Docked** | Pinned to a window edge above other panes (e.g., bottom sheet). On `medium`/`expanded`/`large` screens, docked panes should adapt into **floating** or **co-planar** panes. | Follows modal or non-modal floating focus rules depending on whether background is interactive; focus order matches visual arrangement. |

When windows resize or rotate, panes reorganize using three **Adaptive Strategies**:
1. **Show and hide**: Secondary panes enter or exit the screen as space increases or decreases.
2. **Levitate**: A co-planar pane elevates into a floating or docked overlay (or vice versa) relative to its trigger.
3. **Reflow**: Side-by-side panes stack vertically (e.g., supporting pane moves below the primary focus pane in portrait/`compact`/`medium`).

### Drag Handles & Pane Resizing
- **Behavior**: Dragging resizes flexible panes freely or snaps to recommended custom widths (**`360dp`**, **`412dp`**, or **50/50 centered split-pane**). Selecting the drag handle via **tap, double-tap, or long-press** toggles between 2-pane and 1-pane (collapsing/expanding the fixed pane to `100%` width).
- **Persistent pane resizing (Default)**: Remembers the user's chosen pane width across app restarts and across breakpoint/orientation changes (if a user collapses a 2-pane layout to 1 full-width pane, it stays 1-pane even after rotating the tablet).
- **Temporary pane resizing**: Resets to default pane widths whenever the pane or app is closed and reopened. Use for supporting pane layouts where resizing is occasional.

---

## 4. Canonical Layouts

Start every screen design from one of Material's three canonical layouts:

### 1. Feed Layout
- **Purpose**: Configurable grid of cards or list items for rapid browsing and discovery (news, social media, photo galleries, video home).
- **Adaptation across breakpoints**:
  - `Compact`: Single vertical column; cards span `100%` of pane width.
  - `Medium`: Multi-column grid (typically 2–4 columns) or 2 panes with varied card proportions (e.g., 1 hero card + 2 columns of small cards).
  - `Expanded` / `Large` / `Extra-large`: Multi-column grid with increased column count and wider columns. Reflows automatically on rotation, fold/unfold, or multi-window resize.

### 2. List-Detail Layout
- **Purpose**: Parent-child pairings where selecting an item in an explorable list displays its details (messaging conversations, email inbox, file browser, settings categories, music artist/album).
- **Adaptation across breakpoints**:
  - `Compact` (`0–599dp`): **1 pane** (shows either List OR Detail view at a time).
  - `Medium` (`600–839dp`): **1 pane** (recommended for dense content) or **2 panes** (for browsing collections quickly; pair with a bottom `NavigationBar` or modal rail to maximize width).
  - `Expanded`, `Large`, `Extra-large` (`≥840dp`): **2 co-planar panes** (List on leading side, Detail on trailing side).
- **State & Navigation Rules**:
  - **Back button**: Display a back button in the Detail app bar **only in 1-pane layouts**. Never show a detail back button when List and Detail are both visible in a 2-pane layout.
  - **Selected item indicator**: Show a persistent selected state on the active list item **only in 2-pane layouts**.
  - **Unfolding / Expanding (1-pane → 2-pane)**: If an item was open, show List + that item's Detail. If no item was selected, show List + an empty/placeholder state in the Detail pane.
  - **Folding / Shrinking (2-pane → 1-pane)**: If an item is selected, show the **Detail view** (with a back button to return to List), unless the user was performing batch multi-select in the list. Preserve scroll position and read/unread state across transitions.

### 3. Supporting Pane Layout
- **Purpose**: Organizes content into a **Primary focus pane** (~2/3 of space) and a **Secondary supporting pane** (~1/3 of space) whose content is only meaningful in relation to the primary content (video player + "up next" queue, document editor + comments/formatting panel, course details + lesson list).
- **Adaptation across breakpoints**:

| Breakpoint | Supporting Pane Placement | Supporting Pane Width | Notes |
|---|---|---|---|
| **Compact** (`<600dp`) | **Below** focus pane (or docked **Bottom sheet**) | Flexible (`100%` pane width) | Bottom sheet keeps focus on primary content while providing expandable access. |
| **Medium** (`600–839dp`) | **Below** focus pane | Flexible (`100%` pane width) | Supporting content often scrolls horizontally (e.g., row of cards) at bottom. |
| **Expanded** (`840–1199dp`) | **Leading or Trailing** side of focus pane | Fixed **`360dp`** | Co-planar side-by-side; focus pane is flexible. |
| **Large / Extra-large** (`≥1200dp`) | **Leading or Trailing** side of focus pane | Fixed **`412dp`** | Co-planar side-by-side; focus pane is flexible. |

---

## 5. Grids, Spacing System & Tokens

### Gestalt Grouping Principles in Layout
- **Explicit grouping**: Outlines, dividers, cards, and tonal surface containers bound interactive or related items.
- **Implicit grouping**: Close proximity inside a group paired with generous negative space around the group (e.g., carousel items).
- **Rhythm**: Maintain consistent horizontal/vertical gaps between cards even when card heights vary.
- **Similarity**: Use identical thumbnail dimensions, aspect ratios, and type styles for peer list items; always align leading avatars/icons.
- **Proximity**: Place action buttons (`Reply`, `Reply all`) immediately adjacent to the content they affect.
- **Continuity**: Arrange unified controls (e.g., size filter chips) in a single continuous row or column.

### Spacing Categories & Positional Naming
M3 defines three spacing categories using logical positional names (`horizontal`, `vertical`, `leading`, `trailing`, `top`, `bottom`—replacing legacy `*-space` and `between-space` token names):
1. **Padding**: Space *inside* a container boundary to its content.
2. **Gap**: Space *between* sibling elements inside a container or grid (use `horizontal gap` / `vertical gap` for uniform layouts, or element-specific names like `icon-label gap` for complex components).
3. **Margin**: Space *outside* an element to the screen edge or parent container.
   - **✅ Do**: Define uniform **padding** and **gaps** on the parent container.
   - **❌ Don't**: Avoid defining margins on child elements inside components; reserve margins for screen-level layout edges (`16dp`/`24dp`) or search bar insets (`24dp` default, `12dp` focused).
   - **Text scaling rule**: When text scales up to `200%`, **preserve `1x` default padding and gaps**—never multiply container padding by the text scale factor.

### System Spacing Tokens (`md.sys.measurement.space*`)
M3 uses a linear **8dp base scale** where `space100 = 8dp`, plus nested fractional units (`0.25x`, `0.5x`, `0.75x`, `1.25x`, `1.5x`, `1.75x`). Custom tokens follow the same multiplier formula (`space225 = 8dp × 2.25 = 18dp`).

| Token | Multiplier (`× 8dp`) | Resolved Value | Common Usage |
|---|---|---|---|
| `md.sys.measurement.space0` | `0x` | `0dp` | No space / flush edges |
| `md.sys.measurement.space25` | `0.25x` | `2dp` | Micro internal offsets |
| `md.sys.measurement.space50` | `0.5x` | `4dp` | Tight icon/badge/element gaps |
| `md.sys.measurement.space75` | `0.75x` | `6dp` | Nested small component padding/gaps |
| `md.sys.measurement.space100` | `1x` (Base) | `8dp` | Standard target separation, chip/button gaps, compact vertical padding |
| `md.sys.measurement.space125` | `1.25x` | `10dp` | Default button vertical padding |
| `md.sys.measurement.space150` | `1.5x` | `12dp` | Compact container padding, focused search margin, XR inset overlap |
| `md.sys.measurement.space175` | `1.75x` | `14dp` | Intermediate component padding |
| `md.sys.measurement.space200` | `2x` | `16dp` | **Compact breakpoint screen margin**, standard card/list padding |
| `md.sys.measurement.space250` | `2.5x` | `20dp` | Text field label-to-input vertical gap, XR orbiter offset |
| `md.sys.measurement.space300` | `3x` | `24dp` | **Medium/Expanded/Large/XL screen margin & pane spacer**, standard button horizontal padding |
| `md.sys.measurement.space400` | `4x` | `32dp` | Large button vertical padding, section separation |
| `md.sys.measurement.space500` | `5x` | `40dp` | Expressive hero spacing |
| `md.sys.measurement.space600` | `6x` | `48dp` | Large button horizontal padding, major layout separation |
| `md.sys.measurement.space800` | `8x` | `64dp` | Desktop/wide layout negative space |
| `md.sys.measurement.space900` | `9x` | `72dp` | Maximum baseline layout separation |

---

## 6. Visual Density & Pixel Density

### Component Scaling vs. Information Density
- **Information density** is the macro amount of content visible on screen, controlled via layout margins, spacers, and grid column counts (e.g., Cozy / Comfortable / Compact views in an email client or financial dashboard).
- **Component density scale** (`0`, `-1`, `-2`, `-3`, and up to `-4` for list spacing) controls the internal vertical spacing of individual components:
  $$\text{Component Height} = \text{Default Height} + (4\text{dp} \times \text{Density Scale})$$

| Density Level | Scale Value | Height / Vertical Padding Adjustment | Example (40dp Button) | Example (36dp Web Button) |
|---|---|---|---|---|
| **Default** | `0` | `0dp` (baseline) | `40dp` visual (`48dp` target) | `36px` visual (`48px` target) |
| **Comfortable / Medium** | `-1` | `-4dp` (`-2dp` top, `-2dp` bottom) | `36dp` visual (`48dp` target) | `32px` visual |
| **Compact / Small** | `-2` | `-8dp` (`-4dp` top, `-4dp` bottom) | `32dp` visual | `28px` visual |
| **Maximum Dense** | `-3` (or `-4`) | `-12dp` (or `-16dp`) | `28dp` visual | `24px` visual |

### Strict Rules for Applying Density
1. **Vertical-only compression**: Increasing component density reduces **only height / top & bottom padding** by `4dp` per step. **Never shrink font size, horizontal padding, or horizontal icon-to-label gaps.** Keep child elements vertically centered.
2. **Design equilibrium (inverse horizontal rule)**: As component vertical density increases (components get shorter), **increase horizontal layout margins and column gutters** so dense data tables and lists remain legible.
3. **Opt-in only & `48×48dp` target floor**: Never apply component scaling by default if it reduces interactive targets below **`48×48dp` (`48×48 CSS px`)**. Users must opt-in to high density via settings, and the density-switcher UI itself must use default `48×48dp` targets so users can easily revert. Use external invisible touch padding when visual height is `<48dp`.
4. **Do not auto-switch density across breakpoints**: Do not automatically change density when a user rotates their device or resizes a window unless explicitly configured by user preference.
5. **Where NEVER to apply high density (`❌ Don't`)**:
   - **Focused selection tasks**: Dropdown menus, select menus, date pickers, and calendar grids (shrinking selectable rows to e.g. `38dp` causes mis-taps).
   - **Alerts & communication**: Snackbars, dialogs, banners, and critical confirmation prompts (high density makes alerts harder to notice and read).

### Pixel Density & `dp` Calculation
Material specifies dimensions in density-independent pixels (`dp` on Android, `CSS px` on web) normalized to a `160 dpi` baseline screen (`1dp = 1 physical pixel at 160 dpi`):
$$\text{Pixel Density (dpi)} = \frac{\text{Width in physical pixels}}{\text{Width in inches}}, \qquad \text{dp} = \frac{\text{Physical pixels} \times 160}{\text{Screen dpi}}$$
For example, a `1.5 in` physical screen is `240dp` wide across `120 dpi` (`180px`), `160 dpi` (`240px`), and `240 dpi` (`360px`).

---

## 7. Hardware & Foldable Considerations

- **Folds & Hinges**: Foldable devices feature a flexible screen crease or a physical hinge separating two displays. Use a **2-pane split-pane layout** with the `24dp` **spacer** centered on the fold/hinge so neither interactive targets nor text are obstructed by the hinge.
- **Postures**:
  - **Flat unfolded**: Operates as a `medium` (portrait `600–839dp`) or `expanded` (landscape `840–1199dp`) window. Transition from the exterior `compact` screen to the unfolded screen automatically within seconds.
  - **Tabletop posture (horizontal half-fold)**: Place media/video/camera preview in the top half above the hinge and playback/call controls or supporting pane in the bottom flat half.
  - **Book posture (vertical half-fold)**: Place primary list/navigation in the leading pane and detail/reading content in the trailing pane.
- **Display cutouts & cameras**: Always offset the scaffold using **Safety regions** (`WindowInsets` / `safe-area-inset-*`) so front-facing cameras and curved screen corners never obscure app bars, rails, or body content.
- **State continuity**: Never cache display size or orientation. Preserve scroll offsets, text field input, selection states, and media playback position across `screenLayout`, `screenSize`, fold/unfold, and multi-window resize events.

---

## 8. Bidirectionality & Right-to-Left (RTL) Mirroring

Over 2 billion people read and write in RTL scripts (Arabic, Hebrew, Farsi/Persian, Urdu). M3 layouts mirror horizontally in RTL: the reading flow begins at the **top-right corner**, `leading` maps to **right**, and `trailing` maps to **left**.

### Text Rendering Rules
1. **Alignment + Directionality**: RTL text must have both **right alignment** and **RTL directionality** (`dir="rtl"`).
   - **❌ Don't**: Never apply LTR directionality to RTL strings (scrambles word and punctuation order).
   - **❌ Don't**: Never reverse the structural order of LTR identifiers such as email addresses (`username@google.com`—the `@domain.com` must always remain to the right of the username, even if the username is typed in RTL with the cursor moving left).

### Comprehensive RTL Mirroring Reference Table

| UI Element / Category | Mirror in RTL? | Specific Rules & Locale Exceptions |
|---|---|---|
| **Canonical layouts (List-detail, Feed, Supporting pane)** | **Yes (Mirror)** | List pane sits on the right, Detail pane on the left. Supporting pane sits on the left of the primary focus pane. Feed grids flow right-to-left. |
| **Navigation rail & Expanded nav rail / Drawer** | **Yes (Mirror)** | Placed on the **right (leading) edge** of the window in RTL; icons and drawers open from right to left. |
| **App bars & Toolbars** | **Yes (Mirror)** | Leading navigation icon on the right, title right-aligned, trailing action icons on the left. Floating toolbar order reverses (paired FAB sits on the left). |
| **Badges** | **Yes (Mirror)** | Small and large notification badges anchor to the **top-left** of their parent icon in RTL (top-right in LTR). |
| **Text fields & Chips** | **Yes (Mirror)** | Leading icon/signifier on the right; trailing clear/voice/dropdown/error icons on the left. Chip checkmark on the right; remove/trailing icon on the left. |
| **Swipe gestures & Predictive back** | **Yes (Mirror)** | Horizontal tab swipes, list item swipe-to-reveal actions, and Android predictive back gestures mirror their LTR counterparts. |
| **Directional UI icons (Back, Forward, Send, Arrows)** | **Yes (Mirror)** | Back arrow points right (`→`); Forward arrow points left (`←`); Send paper-plane/arrow flips horizontally. |
| **Help / Question mark icon (`?`)** | **Locale-dependent** | **Mirrored** in Arabic, Urdu, and Farsi/Persian (`؟`), but **NOT mirrored** in Hebrew. |
| **Linear progress indicators & Timelines** | **Locale-dependent** | Fill from **right-to-left** in Arabic, Farsi, and Urdu, but remain **left-to-right (LTR) in Hebrew**. |
| **Media player controls & audio/video progress** | **No (Always LTR)** | Play, pause, rewind, fast-forward, and media scrubbers/progress bars **always remain LTR** across all RTL languages (including Hebrew, Arabic, Urdu). |
| **Clocks, Circular progress & Refresh icons** | **No (Always Clockwise)** | Analog clocks, circular progress indicators, and circular refresh arrows **never mirror** (always rotate clockwise). In 12-hour RTL clocks, move `AM/PM` indicators and action buttons to the mirrored side. |
| **Graphs & Charts** | **Locale-dependent** | Maintain **LTR directionality** in Persian (Farsi) and Urdu. |

---

## 9. Implementation Notes

### Jetpack Compose (Material 3 Adaptive)
- **Dependencies**: `androidx.compose.material3:material3-adaptive-navigation-suite`, `androidx.compose.material3.adaptive:adaptive-layout`, `androidx.compose.material3.adaptive:adaptive-navigation`, `androidx.navigation3:navigation3-*`.
- **Composables & APIs**:
  - `NavigationSuiteScaffold`: Automatically swaps between `NavigationBar` (`compact`), `NavigationRail` (`medium`/`expanded`), and `PermanentNavigationDrawer` based on `WindowAdaptiveInfo` (`currentWindowAdaptiveInfo().windowSizeClass`).
  - `ListDetailPaneScaffold` & `SupportingPaneScaffold`: Implement canonical multi-pane layouts with built-in **show/hide**, **levitate**, **reflow**, and `PaneExpansionState` (drag handle with snap anchors).
  - `WindowWidthSizeClass`: `COMPACT` (`<600dp`), `MEDIUM` (`600–839dp`), `EXPANDED` (`≥840dp`), plus large/extra-large tier support.
  - `Ruler` (`VerticalRuler`, `HorizontalRuler` in `androidx.compose.ui.layout`): Global alignment lines across scaffold layers.

### Flutter (Material 3)
- **Widgets & Packages**:
  - `AdaptiveScaffold` (from `package:flutter_adaptive_scaffold`): Implements M3 breakpoints, bottom `NavigationBar` ↔ `NavigationRail` swapping, and primary/secondary body panes.
  - `MediaQuery.sizeOf(context)` / `LayoutBuilder`: Query window width in logical pixels (`<600`, `600–839`, `840–1199`, `1200–1599`, `≥1600`).
  - `VisualDensity`: Configure `ThemeData(visualDensity: VisualDensity(horizontal: 0, vertical: -2))` (`-1` = comfortable, `-2` = compact; each unit = `4dp`).
  - `Directionality` + `EdgeInsetsDirectional.only(start: ..., end: ...)`: Automatic RTL mirroring.

### Web / CSS Sketch
```css
:root {
  /* M3 System Spacing Tokens (8dp scale) */
  --md-sys-measurement-space-50: 4px;
  --md-sys-measurement-space-100: 8px;
  --md-sys-measurement-space-150: 12px;
  --md-sys-measurement-space-200: 16px;
  --md-sys-measurement-space-300: 24px;
  --md-sys-measurement-space-400: 32px;

  /* Breakpoint-aware layout variables (Compact default <600px) */
  --layout-margin: var(--md-sys-measurement-space-200); /* 16px */
  --pane-spacer: var(--md-sys-measurement-space-300);   /* 24px */
}

/* Medium (600-839px), Expanded (840-1199px), Large (1200-1599px), XL (>=1600px) */
@media (min-width: 600px) {
  :root {
    --layout-margin: var(--md-sys-measurement-space-300); /* 24px */
  }
}

/* Adaptive Two-Pane Fixed-and-Flexible Scaffold (Expanded >= 840px) */
.m3-scaffold-panes {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--pane-spacer);
  padding-inline: var(--layout-margin); /* Logical property auto-mirrors in dir="rtl" */
}

@media (min-width: 840px) {
  .m3-scaffold-panes--fixed-flexible {
    grid-template-columns: 360px minmax(0, 1fr);
  }
}

@media (min-width: 1200px) {
  .m3-scaffold-panes--fixed-flexible {
    grid-template-columns: 412px minmax(0, 1fr);
  }
}

@media (min-width: 1600px) {
  .m3-scaffold-panes--three-pane {
    grid-template-columns: 412px minmax(0, 1fr) minmax(0, 400px);
  }
}
```

---

Further reading: `docs/pages/layout-overview.md`, `docs/pages/breakpoints.md`, `docs/pages/scaffold.md`, `docs/pages/canonical-examples.md`, `docs/pages/grids-spacing.md`, `docs/pages/spacing.md`, `docs/pages/bidirectionality-rtl.md`, `tokens/sys-tokens.md`.
