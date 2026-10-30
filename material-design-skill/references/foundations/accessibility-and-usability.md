# Accessibility, Building for All & Usability (M3 Expressive)

Material Design 3 (M3) accessibility standards, assistive technology support, WCAG color contrast rules and contrast themes, ARIA landmarks and heading hierarchy, focus traversal, target sizes, `200%` text resizing/truncation rules, and M3 Expressive usability tactics.

Sources: `https://m3.material.io/foundations/overview`, `https://m3.material.io/foundations/building-for-all`, `https://m3.material.io/foundations/designing`, `https://m3.material.io/foundations/writing`, `https://m3.material.io/foundations/usability`, `https://m3.material.io/styles/color/system/how-the-system-works`

---

## When to Use / Core Principles

- **Accessibility by default**: Material components bake in WCAG requirements for contrast, target size, focus indicators, and semantics. Treat WCAG minimums as a creative starting point, not a ceiling.
- **Accessibility vs. Usability**:
  - **Accessibility** ensures products are perceivable, operable, understandable, and robust for people with disabilities (permanent, temporary, or situational) and users of assistive technologies.
  - **Usability** ensures products are intuitive, efficient, learnable, memorable, error-tolerant, and satisfying for everyone.
- **Apply M3 Expressive intentionally**: Google eye-tracking research shows M3 Expressive tactics (scale, color contrast, containment, shape morph, emphasized type) help users locate key actions **up to 4× faster**—provided you emphasize **one primary goal per screen** and avoid visual overload.

---

## 1. Building for All: User Needs, Co-Design & Assistive Technology

### Three Principles for Accessible Design
1. **Honor individuals**: Universal defaults rarely fit everyone. Support user customization (contrast themes, dark mode, text scaling up to `200%`, opt-in density, multimodal inputs) to respect shifting daily and lifelong needs.
2. **Learn before, not after**: Include users with diverse abilities early in research and co-design rather than retrofitting accessibility after launch.
3. **Requirements as a starting point**: Constraints like dark theme, captions, and voice input originated as accessibility accommodations and benefit all users.

### User Needs & 13 Dimensions of Lived Experience
Design and test across **7 functional accessibility needs**:
1. **Blindness** (screen readers, braille displays, audio cues)
2. **Low vision** (screen magnification, `200%` text resizing, Medium/High contrast themes, high-contrast boundaries)
3. **Color vision deficiency** (never rely on color alone; pair color with icons, labels, or patterns)
4. **Hearing impairments** (captions, transcripts, visual/haptic alerts alongside audio)
5. **Motor / physical impairments** (`48×48dp` targets, `8dp` target gaps, keyboard/switch/voice navigation, one-handed reachability, no mandatory multi-finger gestures)
6. **Cognitive impairments** (clear hierarchy, plain language, predictable flows, minimal distractions)
7. **Situational & temporary disabilities** (bright sunlight, dark room, broken arm, noisy commute, eyes-free driving/cooking)

Evaluate inclusive product impact and co-design across **13 dimensions of experience**:
`Age` · `Culture` · `Disability` · `Education and literacy` · `Ethnicity` · `Gender` · `Geography and global relevance` · `Physical attributes` · `Race` · `Religion` · `Sexual orientation` · `Socioeconomic status` · `Technology proficiency` (plus mitigating ML/AI bias via Google's People + AI guidelines).

### Assistive Technologies (AT) to Support
| Assistive Technology | How Users Interact | Critical Engineering Requirements |
|---|---|---|
| **Screen readers** (Android **TalkBack**, iOS **VoiceOver**, Desktop **JAWS** / **NVDA**, Braille displays) | Linearly traverses the accessibility tree (DOM/semantics order) or jumps by headings/landmarks; verbalizes roles, names, states, and values. | Logical top-down code order; accurate semantic roles; concise purpose-based labels; `alt=""` on decorative visuals. |
| **Keyboard / D-Pad / Trackball** | Jumps linearly from focusable control to control via `Tab`, `Shift+Tab`, `Arrow` keys, `Enter`, `Space`, `Esc`. | Visible `3dp` focus ring (`md.sys.color.secondary`); logical focus order; focus trapping in modals; return focus on close. |
| **Switch Access** | Scans and highlights interactive items sequentially until the user triggers a physical switch to select. | Keep tab/scan stop count minimal; group composite sub-elements behind a single primary stop where appropriate. |
| **Voice Access / Speech Input** | Triggers actions by speaking visible button labels or numbered overlays; dictates text. | Match accessible names to visible text labels; avoid single-key shortcuts that fire during speech dictation. |
| **Magnification & Zoom** | Enlarges screen regions or scales OS font size up to `200%`. | Keep related actions proximate (e.g., buttons near the content they affect); support `200%` text reflow without clipping. |

---

## 2. Color Contrast & Contrast Themes

### WCAG & M3 Contrast Ratio Requirements

| Element Category | Minimum Contrast Ratio | HCT Tone Delta ($\Delta T$) | Notes & Exceptions |
|---|---|---|---|
| **Small / Normal text** (`< 18pt` regular or `< 14pt` bold) | **`4.5 : 1`** | $\Delta T \ge 50$ | Applies to body copy, labels, captions, and text embedded inside informative images. |
| **Large text** (`≥ 18pt` regular or `≥ 14pt` bold) | **`3.0 : 1`** | $\Delta T \ge 40$ | Applies to headlines, titles, and large display numerals. |
| **Essential graphics & icons** | **`3.0 : 1`** | $\Delta T \ge 40$ | Applies to functional icons, status indicators, and informative chart/illustration elements. |
| **Clustered interactive containers** (e.g., button groups, adjacent buttons/chips) | **`3.0 : 1`** (container vs. surface) | $\Delta T \ge 40$ | When components are clustered together, each container **must** achieve `≥ 3:1` contrast against the background surface so users with low vision can distinguish individual controls. |
| **Standalone prominent containers** (e.g., solitary FAB) | **Exempt** from `3:1` container-to-surface | Any (uses elevation/isolation) | A standalone component like a **FAB** is already distinguishable by its spatial isolation, shape, and shadow; its container does not require `3:1` against the background (its internal icon-to-container still requires `≥ 3:1` / `4.5:1`). |
| **Disabled elements & Decorative graphics** | **Exempt** | N/A | Disabled states (`38%` content / `12%` container opacity) and purely decorative background illustrations have no minimum contrast requirement. |

### Three User-Selectable Contrast Levels
M3's HCT color system supports three contrast levels across both **Light** and **Dark** themes. Custom components automatically inherit these levels when built with semantic pairs (e.g., `primary-container` + `on-primary-container`):
1. **Standard contrast (Default)**: Uses mixed high- and low-contrast surface containers to establish visual hierarchy and reduce cognitive load while meeting WCAG AA (`4.5:1` text, `3:1` large text/graphics).
2. **Medium contrast**: Guarantees at least **`3:1` contrast** on container boundaries and increases text contrast (e.g., tones `50` vs `98`) for users who need stronger separation without the visual discomfort (halation) of extreme contrast.
3. **High contrast**: Maximizes contrast to **`≥ 7:1`** (WCAG AAA, e.g., tones `30` vs `98`) on essential content and interactive controls (such as content inside a card) to minimize visual distractions.

---

## 3. Structure, Hierarchy, Landmarks & Headings

### Linear Reading Order
Screen readers ignore visual CSS positioning and read elements in **top-down source code / DOM order** (LTR: top-left → top-right → bottom-left → bottom-right). Always write HTML/Compose layout trees in the exact logical sequence a user should hear them, and use native platform controls (e.g., native `<dialog>` / M3 `AlertDialog` rather than a custom banner masquerading as a confirmation dialog).

### Web ARIA Landmarks (8 Roles)
Classify top-level page regions using the 8 W3C ARIA landmark roles so screen reader users can jump directly between sections:

| Landmark Role | HTML Equivalent | Cardinality & Labeling Rules |
|---|---|---|
| `banner` | `<header>` (top-level) | **Max 1 per page.** Site-wide header (logo, global nav/toolbar). |
| `navigation` | `<nav>` | **Multiple allowed.** If more than one exists, **each must have a unique accessibility label** (e.g., `aria-label="Primary"` vs. `aria-label="Pagination"`). |
| `main` | `<main>` | **Max 1 per page.** Primary UX content area. |
| `search` | `<search>` / `<form role="search">` | Dedicated search region. |
| `complementary` | `<aside>` | Supporting sidebar that remains meaningful when separated from `main`. |
| `contentinfo` | `<footer>` (top-level) | **Max 1 per page.** Copyright, privacy links, site metadata. |
| `region` | `<section aria-label="...">` | Important content block (can be nested inside `main`). **Must always have a descriptive label.** |
| `form` | `<form aria-label="...">` | User input form collection. |

> **❌ Don't**: Never repeat the landmark role word inside its label (e.g., write `aria-label="Primary"`, **never** `aria-label="Primary navigation"`, which announces as `"Primary navigation navigation"`).

### Heading Hierarchy (`H1`–`H6`)
- **Structure over style**: Assign heading levels (`<h1>` through `<h6>`, or `Modifier.semantics { heading() }`) based on **information architecture**, not visual font size.
- **Single `H1`**: Use a single `H1` for the primary page/screen title.
- **Never skip levels (`❌ Don't`)**: Progress strictly in sequence (`H1` → `H2` → `H3`). Never jump from `H2` directly to `H4` for visual sizing—apply an M3 `title-*` or `label-*` typography token to an `H3` instead.

---

## 4. Focus Order, Key Traversal & Keyboard Shortcuts

### Focus Order & Management
1. **Default DOM traversal**: Follow natural reading order (`Tab` moves forward; `Shift + Tab` moves backward).
2. **Initial focus**: Place initial focus on the element supporting the primary user goal (e.g., the search input on a search home screen).
3. **Modal / Dialog focus cycle**:
   - When a dialog or modal pane opens, move focus **immediately inside the modal** (to the first interactive element or primary input/action).
   - Trap `Tab` focus inside the modal while open.
   - When closed or canceled, **return focus to the exact trigger element** that launched it (or the next logical element if system-triggered).
4. **Composite group traversal**: For dense widget groups (radio groups, segmented buttons, chip rows, menus, grids, carousels), treat the container as **a single `Tab` stop** and use **Arrow keys (`↑ ↓ ← →`)** to traverse sub-elements inside the group.

### Keyboard Shortcut Rules (Protecting Speech & Keyboard Users)
- **Multi-key default**: Custom shortcuts must use **2 or more keys** by default (e.g., `Cmd/Ctrl + Z`) and be documented in an accessible help page or shortcut sheet.
- **Single-key shortcut rule**: Single-character shortcuts (like pressing `c` to compose) can be accidentally triggered by speech-input users dictating text. If you implement any single-key shortcut, you **must** provide at least one of the following (in order of preference):
  1. **(Most preferred)**: Allow the user to **remap the shortcut** to include one or more non-printable modifier keys (`Ctrl`, `Alt`, `Cmd`).
  2. **(Preferred)**: Activate the single-key shortcut **only when the specific target component has focus**.
  3. **(Least preferred / temporary fallback)**: Provide a setting to **turn off** single-key shortcuts.

---

## 5. Accessibility Labels & Roles

### What to Label vs. Hide

| Element Type | Needs Accessibility Label? | Implementation Rule |
|---|---|---|
| **Icon-only buttons / controls** (e.g., pencil icon, mic icon, close `X`) | **Yes (Required)** | Label with the **action/purpose**, never the icon's visual shape. |
| **Generic links & repeated buttons** (`"Learn more"`, multiple `"Save"` buttons) | **Yes (Required)** | Override/append context (e.g., `"Learn more about dynamic color"`, `"Save billing address"`). |
| **Visual cues & status indicators** (progress bars, error icons, badges) | **Yes (Required)** | Expose state/value (`"45% complete"`, `"Error: Invalid email"`, `"3 unread notifications"`). |
| **Informative images, charts & diagrams** | **Yes (Required)** | Provide concise alt text (`≤125–140` chars) describing meaning in context. |
| **Buttons/links with clear visible text** (`"Download image"`) | **No** | Screen reader automatically reads the visible text node. |
| **Non-interactive body text & headings** | **No** | Screen reader reads visible text automatically. |
| **Decorative icons, borders & background illustrations** | **No — Hide from AT** | Mark decorative (`alt=""`, `aria-hidden="true"`, `contentDescription = null`) so screen readers skip them. |

### Critical Labeling Do's and Don'ts
- **✅ Do**: Label a microphone icon button `"Voice search"` (describes the user task + input method).
- **❌ Don't**: Never label an icon by what it looks like (`"Microphone"` or `"Magnifying glass"`).
- **❌ Don't**: Never include the component role/type in the label (`"Got it button"` or `"Settings menu"`). Assigning the semantic role (`Role.Button` / `<button>`) causes the screen reader to announce the role automatically—including it in the label produces `"Got it button, button"`.

---

## 6. Target Sizes & Spacing

Touch targets extend beyond the visual bounds of an element via invisible hit-slop/padding.

| Platform / Input | Minimum Target Size | Visual Element Size | Minimum Gap Between Targets |
|---|---|---|---|
| **Android / Web / Cross-platform Touch** | **`48 × 48dp`** (`48 × 48 CSS px`, ~`9mm` physical; target range `7–10mm`) | Can be smaller (e.g., `24×24dp` icon or `36dp`/`40dp` button height) if padded to `48×48dp` hit area | **`8dp`** (`space100`) minimum separation |
| **Pointer (Mouse / Stylus)** | **`44 × 44dp`** | Matches visual control or padded hit area | **`8dp`** (`space100`) |
| **iOS (Platform convention)** | **`44 × 44pt`** | Padded hit area | `8pt` |
| **Android XR (Spatial UI)** | **`56 × 56dp`** | **`48 × 48dp`** minimum visual affordance | **`4dp` offset** (`8dp` total between targets); never overlap |

---

## 7. Text Resizing (`200%`) & Text Truncation

### `200%` Text Scaling Rules
Users with low vision must be able to scale text up to **`200%` (`2x`)** via OS font-scale settings or in-app multipliers (`1x`, `1.3x`, `1.5x`, `2x`) without losing content or functionality:
1. **What scales**: Multiply `font-size` and `line-height` proportionally by the scale factor (e.g., `14pt` at `1x` → `28pt` at `2x`).
2. **What stays constant at `1x`**: **Container padding** (e.g., `8dp` top/bottom, `24dp` left/right on buttons) and **inter-element gaps** remain fixed at `1x` default size so enlarged text has maximum room before wrapping.
3. **What NEVER scales during text resizing (`❌ Don't`)**: Components without text—such as **checkboxes, radio buttons, switches, progress indicators, and icon-only buttons**—must stay at `1x` size.

### Four Layout Techniques for `200%` Text
1. **Increase container height/width**: Allow cards, buttons, list items, and dialogs to grow vertically as text wraps.
2. **Reflow layout (Horizontal → Vertical stack)**: Stack side-by-side dialog or card action buttons **vertically on top of one another** when enlarged text exceeds horizontal width.
3. **Enable single-axis scrolling**: Add a **vertical scrollbar** to dialogs or panes whose `2x` text exceeds viewport height. **Never require both horizontal and vertical scrolling simultaneously.**
4. **Touch-and-hold Tooltips for fixed-chrome components**: In constrained navigation chrome where growing height would crowd out body content—specifically **Top app bars**, **Navigation bars**, **Navigation rails**, and **fixed top Tabs**—keep the component's visible label at `1x` (or truncated) and display the **enlarged `2x` text inside a Tooltip on touch-and-hold / hover**.

### Text Truncation Rules
- **Wrap critical text first**: Always prefer wrapping over truncation for dialog body text, form labels, and error messages.
- **Accessible ellipsis requirement**: Truncating text with an ellipsis (`…`, no space before `…`) is **only accessible if the user can reveal the full text** via a hover/touch-and-hold tooltip, an "Expand / See more" button, or by opening the linked card/item.
- **❌ Don't**: Never truncate a checkbox label, radio button label, or non-expandable dialog message with no mechanism to read the hidden text.

---

## 8. Usability & Applying M3 Expressive

### Usability Framework (Nielsen Norman Group 5 Aspects)
1. **Efficiency**: How quickly users complete goals (boosted by large primary CTAs and ergonomic bottom placement).
2. **Errors**: Preventing mistakes and enabling easy recovery (clear grouping, `48×48dp` targets, unambiguous labels).
3. **Learnability**: First-time users immediately grasp what is interactive and what to do next.
4. **Memorability**: Returning users remember how the interface works through consistent focal points and color roles.
5. **Satisfaction**: Emotional engagement and visual harmony via expressive shapes, color, and spring physics.

### Six M3 Expressive Design Tactics

| Tactic | How to Apply for Maximum Usability |
|---|---|
| **1. Size & Scale** | Make the screen's single primary CTA the largest interactive element (e.g., **Extra-Large** `136dp` or **Large** `96dp` button). Larger key targets reduce errors and speed up visual scanning by up to **4×**. |
| **2. Color & Contrast** | Pair high-contrast `primary` fills on soft `surface`/`primary-container` backgrounds for primary CTAs, `secondary` roles for supporting settings, and `tertiary` or vibrant accent colors for active/hero state feedback. |
| **3. Containment & Grouping** | Group secondary controls (e.g., duration, sound, haptics settings) into neat list containers or button groups so they don't compete with the primary CTA. |
| **4. Shape & Shape Morph** | Use the **35 Material Shapes** library (e.g., `"flower"`, `"sunny"`, `"soft-burst"`) to frame hero visuals or achievement metrics. Use **shape morphing** (e.g., rounded pill ↔ squarish corners on press/select) to signal live interaction states. |
| **5. Motion (Springs)** | Use `md.sys.motion.spring.*` tokens to guide user pacing (e.g., a breathing flower expanding/contracting). Use motion **sparingly**—only on the hero element—so it guides rather than distracts. |
| **6. Typography** | Pair **Emphasized typography** (`weight-bold` / variable font axes) and oversized display/numeral styles for key metrics (`18`, `3min`, countdown seconds) with smaller supporting labels. |

### Goal-Tiered Expressive Intensity (The "Aura" Pattern)
Match expressive intensity to the screen's goal tier so the product feels cohesive rather than overwhelming:

| Goal Tier | Screen Example | Expressive Tactics Applied |
|---|---|---|
| **1. Primary Goal (Entry / Landing)** | "Start breathing" home screen | • **1 Extra-Large `primary` button** placed near the bottom edge for effortless thumb reachability.<br>• Secondary settings neatly grouped in a list above using `secondary` roles.<br>• Daily welcome message in a soft top container. |
| **2. Hero Moment (Core Interactive Flow)** | Active inhale/hold/exhale session | • Central animating **"flower" / "sunny" Material shape** dominates the canvas using spring motion and vibrant yellow inhale contrast.<br>• Oversized countdown numerals.<br>• **Hide the `NavigationBar`**; place lower-emphasis `Pause`/`Stop` buttons in a bottom button group. |
| **3. Secondary Goal (Completion Summary)** | Post-session breathing report | • Step down CTA to a **Medium `primary` button** (`Finish`) at the bottom.<br>• Frame 4 key metrics inside **uniform, evenly spaced** flower shapes with emphasized numerals (`18`, `3min`). |
| **4. Tertiary Goal (Utility / History)** | Monthly progress & statistics | • Subtle expression: standard `AppBar` + `NavigationBar`.<br>• Key stats in dark `primary` type; completed calendar days highlighted with small `secondary` flower shapes. |

### M3 Expressive Do's & Cautions
- **✅ Do (Hierarchy)**: Establish one unmistakable focal point per screen by contrasting an extra-large primary CTA against smaller, contained supporting settings.
- **⚠️ Caution (Competing Scale)**: Never make every card, setting, and button equally huge and uncontained—when everything is emphasized, nothing is.
- **✅ Do (Color Roles)**: Assign distinct semantic roles (`primary` for main CTA, `secondary` for settings toggles, `secondary-container` for calendar highlights).
- **⚠️ Caution (Monotone Roles)**: Don't assign `primary` and `primary-container` to every button, toggle, and data badge on the same screen.
- **✅ Do (Balanced Shapes & Focused Motion)**: Keep decorative data containers uniform in shape and separated by even negative space; keep text tracking/kerning static while a hero shape morphs.
- **⚠️ Caution (Overlapping Shapes & Simultaneous Animations)**: Never overlap differently shaped containers on a report screen, and never animate variable font condensation, moving arrows, and morphing shapes all at the same time.

---

## 9. Implementation Notes

### Jetpack Compose (Material 3)
- **Semantics & Accessibility**: Use `Modifier.semantics { contentDescription = "Voice search"; role = Role.Button; heading() }`, `Modifier.clearAndSetSemantics {}` for decorative grouping, and `Modifier.minimumInteractiveComponentSize()` (enforces `48.dp × 48.dp` target minimum automatically across M3 interactive composables).
- **Focus Order**: Use `Modifier.focusRequester()`, `Modifier.focusProperties { next = ... }`, and `Modifier.focusGroup()` for arrow-key composite groups.

### Flutter (Material 3)
- **Semantics & Targets**: Use `Semantics(label: 'Voice search', button: true, header: true, excludeSemantics: ...)`, `ExcludeSemantics` for decorative elements, and `MaterialTapTargetSize.padded` (default `48×48` in `ThemeData`).
- **Text Scaling**: Use `MediaQuery.textScalerOf(context)` (`TextScaler.linear(2.0)`) and avoid fixed-height `SizedBox` wrappers around text.

### Web / CSS Sketch (Target Padding, Reduced Motion & High Contrast)
```css
/* Ensure 48x48px touch target on a 24x24px visual icon button */
.m3-icon-btn {
  position: relative;
  width: 40px;
  height: 40px;
  display: inline-grid;
  place-items: center;
}
.m3-icon-btn::after {
  content: "";
  position: absolute;
  inset: -4px; /* Expands 40x40px visual container to 48x48px touch target */
}

/* Support 200% text scaling: fixed 1x padding, flexible height */
.m3-button {
  min-height: 40px;
  height: auto;
  padding-block: 8px;   /* Stays 8px at 1x and 2x text scale */
  padding-inline: 24px; /* Stays 24px at 1x and 2x text scale */
}

/* Respect user motion & contrast preferences */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

@media (prefers-contrast: more) {
  :root {
    --md-sys-color-primary: #21005D;
    --md-sys-color-on-primary: #FFFFFF;
    --md-sys-color-outline: #1D1B20;
  }
}
```

---

Further reading: `docs/pages/overview.md`, `docs/pages/building-for-all.md`, `docs/pages/designing.md`, `docs/pages/writing-and-text.md`, `docs/pages/usability.md`, `docs/pages/color.md`, `docs/blog/m3-a11y.md`.
