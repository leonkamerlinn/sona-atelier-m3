# Cards, Carousel, Lists & Divider

Distilled Material Design 3 (M3 & M3 Expressive) specifications, tokens, layout metrics, adaptive rules, and accessibility guidelines for **Cards**, **Carousel**, **Lists**, and **Divider**.

Sources: `https://m3.material.io/components/cards/{overview,specs,guidelines,accessibility}`, `https://m3.material.io/components/carousel/{overview,specs,guidelines,accessibility}`, `https://m3.material.io/components/lists/{overview,specs,guidelines,accessibility}`, `https://m3.material.io/components/divider/{overview,specs,guidelines,accessibility}`

---

## When to Use / When Not to Use

| Component | When to Use | When Not to Use |
|---|---|---|
| **Cards** | Grouping heterogeneous content and actions on a single topic (media + headline + subhead + text + buttons); entry points to detail views in grids, feeds, or carousels. | Homogeneous vertical rows where spacing, headlines, or dividers create a simpler hierarchy (use **Lists** instead, especially on compact screens). |
| **Carousel** | Browsing visual-first collections (photos, media thumbnails, featured hero items, vertical video feeds) where dynamic peeking/squishing invites exploration. | Text-heavy items (>2 lines on compact screens unless using an **Uncontained** layout or **Cards**), or when an accessible "Show all" alternative cannot be provided on vertically scrolling pages. |
| **Lists** | Scannable vertical indexes of discrete, similarly structured items (text, icons, avatars, thumbnails, selection controls) for reading, selection, or action triggering. | Rich multi-block layouts with large varied media and distinct button bars (use **Cards**), or on expanded screens where a grid/carousel better utilizes horizontal space. |
| **Divider** | Grouping sections or separating interactive from non-interactive regions when whitespace alone cannot establish hierarchy. | Separating every item in a repetitive list when margins or M3 Expressive **segmented gaps** (`2dp`) suffice. |

---

## 1. Cards

### Variants & Token Summary

All three variants share identical legibility, shape (`md.sys.shape.corner.medium` = `12dp`), surface tint (`surface-tint` `#6750A4` / `#D0BCFF`), shadow (`#000000`), and icon tokens (`primary` `#6750A4` / `#D0BCFF`, `24dp`).

| Variant | Token Prefix | Container Color (Light / Dark) | Border / Outline | Resting | Hover | Focus / Pressed | Dragged | Disabled |
|---|---|---|---|---|---|---|---|---|
| **Elevated** | `md.comp.elevated-card` | `surface-container-low` (`#F7F2FA` / `#1D1B20`) | None | `level1` (`1dp`) | `level2` (`3dp`) | `level1` (`1dp`) | `level4` (`8dp`) | `surface` (`#FEF7FF` / `#141218`) @ `0.38`, `level1` (`1dp`) |
| **Filled** | `md.comp.filled-card` | `surface-container-highest` (`#E6E0E9` / `#36343B`) | None | `level0` (`0dp`) | `level1` (`1dp`) | `level0` (`0dp`) | `level3` (`6dp`) | `on-surface` (`#1D1B20` / `#E6E0E9`) @ `0.38`, `level0` (`0dp`) |
| **Outlined** | `md.comp.outlined-card` | `surface` (`#FEF7FF` / `#141218`) | `1dp` `outline-variant` (`#CAC4D0` / `#49454F`); Focus: `on-surface` | `level0` (`0dp`) | `level1` (`1dp`) | `level0` (`0dp`) | `level3` (`6dp`) | Outline: `outline` (`#79747E` / `#938F99`) @ `0.12`, `level0` (`0dp`) |

- **State layers**: `on-surface` (`#1D1B20` / `#E6E0E9`) at Hover `0.08`, Focus `0.10`, Pressed `0.10`, Dragged `0.16`.
- **Focus indicator**: `secondary` (`#625B71` / `#CCC2DC`), `3dp` thickness (`md.sys.state.focus-indicator.thickness`), `2dp` outer offset (`md.sys.state.focus-indicator.outer-offset`).
- **Actionability exclusivity**:
  - **Directly actionable card**: Entire card is a single touch target (`button` or `link` role) with hover, focus ring, and ripple; contains **no** inner buttons or links (never nest actionable controls on an actionable surface).
  - **Non-actionable card**: Pure container (no role, no card-level hover/ripple, not a tab stop); holds interactive children (buttons, icon buttons, chips, sliders, links) that receive individual tab stops and ripples.

### Anatomy, Measurements & Behavior

- **Anatomy**: 1. Container (only required element; size adapts to content), 2. Media (thumbnail avatar/logo, image, video), 3. Headline, 4. Subhead, 5. Supporting text, 6. Actions (buttons, icon buttons, chips, sliders, links, overflow menu in upper-right or lower-right corner) & Dividers.
- **Measurements**: Corner radius `12dp` (`medium`), left/right padding `16dp`, max gap between cards `8dp`, start-aligned label text. Cards in a collection are **coplanar** at rest.
- **Dividers inside cards**: Use **full-width (`100%`)** dividers for expandable regions or to separate interactive from non-interactive areas; use **inset** dividers to separate related content blocks.
- **Transitions & Scrolling**:
  - **Expanding**: Use **container transform** to expand a card into a full-screen detail view (reserve for expressive hero moments), or **forward and backward** transition for standard hierarchical navigation.
  - **Scrolling**: On **mobile/compact**, card content taller than max height is truncated and **never scrolls internally** (avoids dual scrollbars); cards expand in height and scroll with the page. On **desktop/expanded**, expanded cards may scroll internally.
- **Gestures**:
  - **Swipe**: Performable anywhere on a card to dismiss or change state (archive/flag/heart). Assign at most **one** swipe action per card. Never place swipeable content (image carousels/pagination) inside a swipeable card, and never detach card portions on swipe.
  - **Pick up & move**: Increases elevation (`level4` `8dp` elevated, `level3` `6dp` filled/outlined) so the dragged card floats in front of all sibling cards (below app bars/navigation) instead of bumping elements without elevation.
- **Collections & Adaptive Rules**:
  - Place filter/sort controls **outside** the card collection; filters must apply to every card.
  - **Compact**: Stretch full-width, orient horizontally, or swap cards for **Lists** while preserving controls.
  - **Medium / Expanded**: Use multi-column grids (uniform, mosaic, staggered), horizontal rows, or carousels; switch horizontal compact cards to vertical cards with larger imagery.

### Accessibility & Do / Don't
- **Single-pointer alternatives**: Every drag-to-reorder or swipe-to-dismiss gesture **must** have a single-pointer alternative (e.g., tap or long-press opens a menu or bottom sheet with Move/Delete options; ensure the menu doesn't obscure the card).
- **Keyboard & Screen Reader**: `Tab` visits directly actionable cards or inner interactive controls in order; `Space`/`Enter` activates. Hide decorative images (`aria-hidden="true"`). Verbalize in order: Heading → Image → Body text → Primary button → Secondary button.
- ✅ **Do**: Group cards in grids, lists, or carousels; expand cards to reveal all content at once on mobile; elevate dragged cards above siblings.
- ❌ **Don't**: Force homogeneous items (e.g., 5 albums in a vertical list) into cards when spacing/dividers suffice; scroll internally inside mobile cards; nest swipeable carousels inside cards.
- ⚠️ **Caution**: Avoid layering text or icons over images; if required, add a translucent scrim or bounding shape behind them for contrast.

---

## 2. Carousel

### Layouts & Measurements

M3 defines **4 primary layouts** plus **2 specialized sub-layouts** (including the Nov 2025 *Uncontained multi-aspect ratio* update). Items dynamically squish/expand as they scroll (except in Uncontained and Full-screen layouts) and feature a **parallax effect** where item visuals move at a different speed than their container.

| Layout | Item Composition | Scrolling Mode | Padding (Lead / Trail / Top-Bottom) | Gap | Item Radius | Best Used For |
|---|---|---|---|---|---|---|
| **Multi-browse** | ≥1 **Large**, 1 **Medium**, 1 **Small** item fully visible | **Snap-scrolling** (recommended) | `16dp` lead/trail, `8dp` top/bottom | `8dp` | `28dp` (`extra-large`) | Browsing many visual items at once (photos, feeds; ~10 items expected). |
| **Uncontained** | Single-size **Large** items bleeding off trailing edge | **Default** (free) or **Snap-scrolling** | `16dp` lead only (`0dp` trail), `8dp` top/bottom | `8dp` | `28dp` (`extra-large`) | Custom or text-heavy items, stacked image + unmasked text, traditional carousels. |
| **Uncontained multi-aspect ratio** *(Nov 2025)* | Items of varying aspect ratios (`9:16` min width to `16:9` max width, `1:1`, `3:4`) bleeding off edge | **Default** or **Snap-scrolling** | `16dp` lead only, `8dp` top/bottom | `8dp` | `28dp` (`extra-large`) | Collections where media naturally has heterogeneous aspect ratios (`9:16`–`16:9`). |
| **Hero** | ≥1 **Large** item + 1 **Small** peeking item on trailing edge | **Snap-scrolling** (1 item at a time) | `16dp` lead/trail, `8dp` top/bottom | `8dp` | `28dp` (`extra-large`) | Spotlighting large visuals (movies, shows, featured apps) with a sneak peek. |
| **Center-aligned hero** | ≥1 centered **Large** item flanked by 2 **Small** items | **Snap-scrolling** | `16dp` lead/trail, `8dp` top/bottom | `8dp` | `28dp` (`extra-large`) | Centered spotlight of large visual items. |
| **Full-screen** | 1 edge-to-edge **Large** item filling window vertically | **Snap-scrolling required** (never free) | `0dp` lead/trail, `0dp` top/bottom | `16dp` | `0dp` (edge-to-edge) | Vertically scrolling portrait video/image feeds on compact/medium only (never landscape). |

### Dynamic Item Widths, Text Adaptation & Tokens (`md.comp.carousel-item`)

- **Large item**: Customizable max width (`dynamic` or user-set); shows full title + label text.
- **Medium item**: Dynamic width based on remaining space; hides title text, shows brief label.
- **Small (squished) item**: Width dynamically ranges from **`40dp` min to `56dp` max** (`48–56dp` when touch target applies); abbreviates or hides label text. Never shrink small items below `40dp` where imagery becomes unrecognizable.
- **Compact breakpoint rules**: Comfortably show up to **3 items** at once on compact screens if they have text; avoid >2 lines of text unless the background is a simple solid color.
- **Tokens**:
  - Container: `surface` (`#FEF7FF` / `#141218`), `md.sys.shape.corner.extra-large` (`28dp`), `level0` (`0dp`), tint `surface-tint`.
  - States: Hover `level1` (`1dp`) + `on-surface` @ `0.08`; Focus `level0` + `on-surface` @ `0.10` + `secondary` focus ring (`3dp` thick, `2dp` outer offset); Pressed `level0` + `on-surface` @ `0.10` (slight shape change + ripple); Disabled `surface` @ `0.38`.
  - Optional outline (`with-outline`): `1dp` `outline` (`#79747E` / `#938F99`), Focus `on-surface`, Disabled `outline` @ `0.12`.

### Accessibility & Reduced Motion
- **Mandatory non-scrolling alternative on vertically scrolling pages**: Every horizontal carousel on a vertically scrolling page (except Full-screen) **must** provide a way to view all items on a dedicated vertically scrolling page:
  - **Without header**: Add a **Show all** button below the carousel (`4dp` padding).
  - **With header**: Place an arrow icon button (`48×48dp` target) on the same row next to the leading-aligned header, and repeat the header on the destination page.
  - ❌ **Don't**: Never place left/right arrow buttons inside, beside (shrinking width), or floating over carousel items.
- **Keyboard & Focus**: Initial `Tab` focus lands on the **first carousel item** (never focus the outer container). `Tab` or `Left`/`Right` arrows move between items; `Up`/`Down` arrows leave the carousel to focus the next page element (e.g., **Show all** button); `Space`/`Enter` activates.
- **Labeling**: Container has `container` role; item labels read current position and total count (e.g., *"1 of 10"*).
- **Reduced motion (`prefers-reduced-motion`)**: Remove parallax and disable dynamic item expansion/squishing so all items stay the same size (in Hero carousels, the small item is partially clipped at the screen edge).

---

## 3. Lists

### M3 Expressive vs. Baseline Lists (December 2025 Update)

M3 Expressive adds the **Expressive list** variant (recommended for new designs; Baseline list remains available).

| Feature | Expressive List (`md.comp.list` + expressive tokens) | Baseline List (`md.comp.list`) |
|---|---|---|
| **Styles** | **Standard** (continuous) or **Segmented** (`2dp` gap `md.comp.list.segmented.gap` between filled items) | **Standard** only |
| **Outer Container Shape** | `16dp` (`md.sys.shape.corner.large`) | `0dp` (`none`) |
| **Item Corner Morphing** | **Unselected**: `4dp` (`extra-small`) inner corners, `16dp` (`large`) outer group corners.<br>**Hovered**: `12dp` (`medium`).<br>**Focused / Pressed / Dragged / Selected**: `16dp` (`large`) all around. | **Unselected**: `0dp` (`none`).<br>**Selected**: `16dp` (`large`). |
| **Leading / Trailing Icon** | `20dp` (`leading-icon.expressive.size`, `trailing-icon.expressive.size`) | `24dp` (`leading-icon.size`, `trailing-icon.size`) |
| **Leading Image Shape** | `8dp` (`md.sys.shape.corner.small`) | `0dp` (`md.sys.shape.corner.none`) |
| **Custom Slots** | `Leading`, `Content` (middle, widest), `Trailing` slots (min `48×48dp` targets; custom code required) | Fixed anatomy |

### Heights, Alignment & Measurements

The tallest element determines item height: **One-line (`56dp`)**, **Two-line (`72dp`)**, or **Three-line (`88dp`)**.

| Attribute | Condition / Token | Value |
|---|---|---|
| **Item Heights** | `one-line` / `two-line` / `three-line.container.height` | `56dp` (1-line), `72dp` (2-line), `88dp` (3-line; limit supporting text to 1–3 lines) |
| **Vertical Alignment** | Height `< 88dp` vs `≥ 88dp` (or `≥ 3` text lines) | **Center-aligned** (middle) when `< 88dp`; **Top-aligned** when `≥ 88dp` (baseline leading icon top padding: `8dp`, or `12dp` when `≥ 88dp`). |
| **Paddings & Gaps** | `leading-space` / `trailing-space` / `between-space` / `top-space` & `bottom-space` | `16dp` leading, `16dp` trailing (`24dp` in baseline table), `12dp` between slots (`16dp` in baseline table), `10dp` top/bottom, `2dp` segmented gap |
| **Touch Target** | Interactive elements | `48×48dp` min (icon button height dynamically adjusts to fill list item height) |

### Leading, Content & Trailing Element Tokens

| Element | Size & Shape | Color Role (Unselected → Selected) | Typography Role |
|---|---|---|---|
| **Leading Icon** | `20dp` (Expressive) / `24dp` (Baseline) | `on-surface-variant` (`#49454F` / `#CAC4D0`) → `on-secondary-container` (`#4A4458` / `#E8DEF8`) | — |
| **Leading Avatar** | `40×40dp`, `full` circular or expressive shape (for people/entities) | Fill: `primary-container` (`#EADDFF` / `#4F378B`)<br>Label: `on-primary-container` (`#4F378B` / `#EADDFF`) | `title-medium` (`16pt/24pt`, weight `500`, tracking `0.15pt`) |
| **Leading Image** | `56×56dp`; `8dp` (`small`) Expressive, `0dp` Baseline | — | — |
| **Leading Video** | **Small**: `100×56dp`; **Large**: `114×64dp`; shape `8dp` (`small`) | — | — |
| **Overline** | Above label text | `on-surface-variant` → `on-secondary-container` | `label-small` (`11pt/16pt`, weight `500`, tracking `0.5pt`) |
| **Label Text** *(req)* | Middle content slot (widest) | `on-surface` (`#1D1B20` / `#E6E0E9`) → `on-secondary-container` (`#4A4458` / `#E8DEF8`) | `body-large` (`16pt/24pt`, weight `400`, tracking `0.5pt`) |
| **Supporting Text** | 1–3 lines below label | `on-surface-variant` → `on-secondary-container` | `body-medium` (`14pt/20pt`, weight `400`, tracking `0.25pt`) |
| **Trailing Text** | Meta info (price, count, date) | `on-surface-variant` → `on-secondary-container` | `label-small` (`11pt/16pt`, weight `500`, tracking `0.5pt`) |
| **Trailing Icon** | `20dp` (Expressive) / `24dp` (Baseline) | `on-surface-variant` (or `on-surface` unselected) → `on-secondary-container` | — |

### States & Specialized Interactions (`md.comp.list.*`)

- **Default (Unselected)**: Container `surface` (`#FEF7FF` / `#141218`), `level0` (`0dp`), state layers `on-surface` (Hover `0.08`, Focus `0.10`, Pressed `0.10`). Focus ring: `secondary` (`#625B71` / `#CCC2DC`), `3dp` thick, `-3dp` inner offset. (Items with leading images can optionally use a content-based dynamic color scheme).
- **Selected**: Container `secondary-container` (`#E8DEF8` / `#4A4458`), shape `16dp` (`large`), text/icons `on-secondary-container` (`#4A4458` / `#E8DEF8`), hover/focus/pressed icon `on-surface`.
- **Disabled**: Text and icons `on-surface` @ `0.38`; selected disabled container `on-surface` @ `0.38`.
- **Reordering**:
  - **Expressive (`md.comp.list.reorder`)**: Active dragged item uses `tertiary-container` (`#FFD8E4` / `#633B48`), text/icons `on-tertiary-container` (`#633B48` / `#FFD8E4`), state layer `0.10`, shape `16dp` (`large`), shadow `#000000`; drop zone uses `surface-container-low` (`#F7F2FA` / `#1D1B20`).
  - **Baseline (`dragged`)**: Container `surface`, `level4` (`8dp`), state layer `on-surface` @ `0.16`.
- **Expand & Collapse (`md.comp.list.expand`)**: Uses a container transform parent-child transition. Container `surface`, shape `16dp` (`large`); circular (`full`) trailing icon container changes from `surface` (collapsed) to `surface-container` (`#F3EDF7` / `#211F26`, expanded) with `on-surface` icon.
- **Swipe to Reveal (`md.comp.list.reveal`, Android Views only)**: Swiping reveals action icon buttons. Primary end-aligned action button uses `primary` (`#6750A4` / `#D0BCFF`) container, `on-primary` (`#FFFFFF` / `#381E72`) icon, `16dp` (`large`) shape; secondary action buttons use `secondary-container` (`#E8DEF8` / `#4A4458`), `on-secondary-container` icon, `full` circular shape. A full swipe triggers the final end-aligned primary action and clears the item. Always provide a single-pointer alternative (More icon, tap, double-tap, or long-press).

### Selection Modes, Adaptive Rules & Accessibility
- **Selection modes (one mode at a time)**:
  - **Single-action**: Whole item is tappable (e.g., navigation); no persistent selection or nested actions.
  - **Multi-action**: Primary action in leading/content + secondary trailing icon buttons; whole item is not selectable.
  - **Single-select**: Pair with **radio buttons**; no checkboxes or nested actions.
  - **Multi-select**: Pair with **checkboxes** or **switches**; no radio buttons or nested actions.
  - **Single selection cue rule**: Never combine multiple selection interactions in one item (e.g., leading checkmark + trailing bookmark). Always indicate selection with **more than color** (e.g., `secondary-container` fill + checkmark/radio/checkbox or underline).
- **Adaptive**: Keep line length to **40–60 chars** (max **120 chars** on large screens; increase line height or switch to a **2-column list**, **list-detail split view**, **Cards**, or **Carousel** on medium/expanded breakpoints).
- **Keyboard & ARIA Roles**:
  - `Tab` focuses the first (or currently selected) item; `Up`/`Left` and `Down`/`Right` arrows cycle through items (or through each inner action in a multi-action list) and wrap around; `Space`/`Enter` activates/selects.
  - **Web**: Container `role="listbox"` (with descriptive `aria-label`), items `role="option"` (`aria-selected`).
  - **Compose / Android Views**: Single-select uses `RadioButton` role (`checked`/`not-checked`); Multi-select uses `Checkbox` role (`checked`/`not-checked`).

---

## 4. Divider

### Variants, Tokens & Measurements (`md.comp.divider`)

- **Thickness & Color**: `1dp` (`md.comp.divider.thickness`), `outline-variant` (`#CAC4D0` Light / `#49454F` Dark; note `md.comp.list.divider.color` references `outline` `#79747E` / `#938F99`).
- **Configurations**:
  1. **Full-width (`100%`)**: `0dp` margins. Separates major sections of unrelated content or interactive from non-interactive areas (e.g., in cards).
  2. **Inset**: `16dp` leading margin, `0dp` trailing margin (`16dp` or `24dp` trailing margin in lists). Separates related items anchored by leading icons, avatars, or thumbnails.
  3. **Middle-inset**: `16dp` leading and `16dp` trailing margins. Separates elements in the middle of a layout (e.g., body text from chips).
  4. **Vertical divider**: `1dp` width spanning height. Separates side-by-side columns on large screens.
- **Additional spacing**: `4dp` between divider and supporting text; `8dp` right/bottom margin when standalone; `0dp` top/bottom space in lists.
- **Accessibility & Usage**: Decorative element with **no contrast minimum**; never focusable. Use full-width + inset dividers together to express parent/child hierarchy, and omit dividers when whitespace or `2dp` segmented list gaps suffice.

---

## Implementation Notes

- **Jetpack Compose (`androidx.compose.material3`)**: `ElevatedCard`, `Card`, `OutlinedCard`; `HorizontalMultiBrowseCarousel`, `HorizontalUncontainedCarousel`, `HorizontalCenteredHeroCarousel`; `ListItem`; `HorizontalDivider`, `VerticalDivider`.
- **Flutter (`package:flutter/material.dart`)**: `Card.elevated`, `Card.filled`, `Card.outlined`; `CarouselView`, `CarouselView.weighted`; `ListTile`, `CheckboxListTile`, `RadioListTile`, `SwitchListTile`, `ReorderableListView`; `Divider`, `VerticalDivider`.
- **Material Web (`@material/web`)**: `md-elevated-card`, `md-filled-card`, `md-outlined-card` *(lab)*; `md-list`, `md-list-item`; `md-divider` (`inset`, `inset-start`, `inset-end`).

```css
/* Cards */
.md3-card { border-radius: var(--md-sys-shape-corner-medium, 12px); padding-inline: 16px; }
.md3-card--elevated { background: var(--md-sys-color-surface-container-low, #F7F2FA); box-shadow: var(--md-sys-elevation-level1); }
.md3-card--elevated:hover { box-shadow: var(--md-sys-elevation-level2); }
.md3-card--filled { background: var(--md-sys-color-surface-container-highest, #E6E0E9); }
.md3-card--outlined { background: var(--md-sys-color-surface, #FEF7FF); border: 1px solid var(--md-sys-color-outline-variant, #CAC4D0); }

/* Expressive Segmented List */
.md3-list--segmented { display: flex; flex-direction: column; gap: 2px; border-radius: var(--md-sys-shape-corner-large, 16px); overflow: hidden; }
.md3-list-item { display: flex; align-items: center; gap: 12px; min-height: 56px; padding: 10px 16px; background: var(--md-sys-color-surface, #FEF7FF); color: var(--md-sys-color-on-surface, #1D1B20); border-radius: var(--md-sys-shape-corner-extra-small, 4px); }
.md3-list-item:hover { border-radius: var(--md-sys-shape-corner-medium, 12px); }
.md3-list-item[aria-selected="true"] { background: var(--md-sys-color-secondary-container, #E8DEF8); color: var(--md-sys-color-on-secondary-container, #4A4458); border-radius: var(--md-sys-shape-corner-large, 16px); }

/* Divider */
.md3-divider { border: 0; border-top: 1px solid var(--md-sys-color-outline-variant, #CAC4D0); margin: 0; }
.md3-divider--inset { margin-inline-start: 16px; }
.md3-divider--middle { margin-inline: 16px; }
```

Further reading: [docs/pages/cards.md](file:///Users/leon/Desktop/Leon/material-design-skill/docs/pages/cards.md), [tokens/components/cards.md](file:///Users/leon/Desktop/Leon/material-design-skill/tokens/components/cards.md), [docs/pages/carousel.md](file:///Users/leon/Desktop/Leon/material-design-skill/docs/pages/carousel.md), [tokens/components/carousel.md](file:///Users/leon/Desktop/Leon/material-design-skill/tokens/components/carousel.md), [docs/pages/lists.md](file:///Users/leon/Desktop/Leon/material-design-skill/docs/pages/lists.md), [tokens/components/lists.md](file:///Users/leon/Desktop/Leon/material-design-skill/tokens/components/lists.md), [docs/pages/divider.md](file:///Users/leon/Desktop/Leon/material-design-skill/docs/pages/divider.md), [tokens/components/divider.md](file:///Users/leon/Desktop/Leon/material-design-skill/tokens/components/divider.md)
