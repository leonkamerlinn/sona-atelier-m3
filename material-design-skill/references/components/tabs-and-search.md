# Tabs & Search

In-page content categorization (**Primary & Secondary Tabs**) and query-based navigation (**Search Bar & Search View**, featuring the M3 Expressive **Contained** style).

**Sources:** `https://m3.material.io/components/tabs/{overview,specs,guidelines,accessibility}`, `https://m3.material.io/components/search/{overview,specs,guidelines,accessibility}`

---

## When to Use / When Not to Use

| Component | When to Use | When NOT to Use |
|---|---|---|
| **Primary Tabs** (`md.comp.primary-navigation-tab`) | Placed directly below an App Bar to organize **peer categories of related content** within a single top-level destination (or when only 2 top-level views exist, where a Navigation Bar is too heavy). | For top-level app navigation across 3–5 unrelated destinations (use a **Navigation Bar** or **Navigation Rail**), or for sequential content meant to be read in order (e.g., *Chapter 1, Chapter 2*). |
| **Secondary Tabs** (`md.comp.secondary-navigation-tab`) | Placed inside a content pane **below Primary Tabs** when a second level of categorization is required. | As the sole tab bar at the top of a screen (use **Primary Tabs** first) or above Primary Tabs. |
| **Search Bar & Search View** (`md.comp.search-bar`, `md.comp.search-view`) | When users need to query large collections (messages, files, catalogs) within a specific view or across the app, displaying autocomplete suggestions and results in a list. | When global search is the primary entry point inside the top header itself—use the **Search App Bar** variant (`md.comp.app-bar.small.search`) which opens **Search View** on tap. |

---

## Part 1: Tabs (`md.comp.primary-navigation-tab` & `md.comp.secondary-navigation-tab`)

### Variants & Configurations

| Variant / Mode | Height | Active Indicator | Active Text & Icon Color | Icon Support | Best For |
|---|---|---|---|---|---|
| **Primary Tabs** (Label only or Icon only) | **`48dp`** | **`3dp`** height, `primary` (`#6750A4`/`#D0BCFF`), rounded top pill (`3, 3, 0, 0dp`), inset `2dp` on each side of content (min length `24dp`) | `primary` (`#6750A4` / `#D0BCFF`) | Optional `24dp` icon (stacked or inline; icon-only requires globally recognized glyphs) | Main content categories under an App Bar |
| **Primary Tabs** (Stacked Icon + Label) | **`64dp`** | Same `3dp` top-rounded `primary` indicator under stacked icon + label | `primary` (`#6750A4` / `#D0BCFF`) | `24dp` icon stacked above `title-small` label | High-visibility category switching |
| **Secondary Tabs** | **`48dp`** | **`2dp`** height, `primary` (`#6750A4`/`#D0BCFF`), straight `0dp` corners spanning full tab width | **`on-surface`** (`#1D1B20` / `#E6E0E9`) | Usually label-only; optional inline `24dp` icon (`8dp` gap to text) | Sub-categorizing content below Primary Tabs |

#### Fixed vs Scrollable Layout
- **Fixed Tabs:** Divides the full-width (`100%`) container into **equal-width segments** (each tab's width matches the widest tab in the set). Recommended for **2–4 tabs maximum** (at 5+ tabs, fixed containers become cramped).
- **Scrollable Tabs:** Used for **5+ tabs** or longer labels. Each tab's width hugs its text label with consistent horizontal padding. **Crucial rule:** Offset the **first visible scrollable tab by `52dp`** from the leading window edge (on both mobile and web) so users visually understand that the tab strip scrolls. **Never** loop scrollable tabs infinitely (traps linear screen reader navigation).

### Anatomy
1. **Container:** Spans 100% of the pane/window width (`surface`, `0dp` elevation, `0dp` corners). Icons and labels are vertically centered inside the container.
2. **Icon (Optional, `24dp`):** Must be applied consistently—either **all** tabs in a bar have icons, or **none** do.
3. **Label (`title-small`, `14sp`/`20sp`, weight `500`):** Short, succinct single-row text (can wrap to a 2nd line with truncation only if unavoidable, though switching to scrollable tabs is preferred).
4. **Badges (Optional):** Small (`6dp` dot) or Large (`16dp` height, max **4 characters** including `+`, e.g., `999+`).
   - On stacked icon + label tabs: badge overlaps the upper-right corner of the icon by **`6dp`**.
   - On inline label tabs: badge sits **`4dp`** to the trailing side of the label text.
   - Badges must update or disappear once the user views the tab's content.
5. **Bottom Divider (`1dp`):** Placed *inside* the container height along the bottom edge to separate tabs from scrolling content underneath.
6. **Active Indicator:** `3dp` content-hugging top-rounded bar on Primary Tabs; `2dp` full-tab-width bar on Secondary Tabs.

### Tokens, Colors & Measurements (`md.comp.*-navigation-tab`)

| Attribute / Element | Primary Tabs (`md.comp.primary-navigation-tab.*`) | Secondary Tabs (`md.comp.secondary-navigation-tab.*`) | Light / Dark Baseline |
|---|---|---|---|
| **Container Color & Elev.** | `surface`, `level0` (`0dp`), `corner.none` (`0dp`) | `surface`, `level0` (`0dp`), `corner.none` (`0dp`) | `#FEF7FF` / `#141218` |
| **Container Height** | `48dp` (label-only / icon-only)<br>**`64dp`** (`with-icon-and-label-text`) | **`48dp`** | — |
| **Active Indicator** | `3dp` height, shape `3, 3, 0, 0dp`, min width `24dp`, `primary` | `2dp` height, full tab width (`0dp` radius), `primary` | `#6750A4` / `#D0BCFF` |
| **Active Label & Icon Color** | **`primary`** | **`on-surface`** | Primary: `#6750A4` / `#D0BCFF`<br>On-surface: `#1D1B20` / `#E6E0E9` |
| **Inactive Label & Icon Color** | `on-surface-variant` (Resting)<br>`on-surface` (Hover / Focus / Press) | `on-surface-variant` (Resting)<br>`on-surface` (Hover / Focus / Press) | Resting: `#49454F` / `#CAC4D0`<br>Interactive: `#1D1B20` / `#E6E0E9` |
| **Active State Layer** | `primary` (`8%` hover, `10%` focus/press) | `on-surface` (`8%` hover, `10%` focus/press) | — |
| **Inactive State Layer** | `on-surface` (`8%` hover, `10%` focus)<br>**`primary`** (`10%` press) | `on-surface` (`8%` hover, `10%` focus/press) | — |
| **Label Typography** | `title-small` (`14sp` / `20sp` line-height, weight `500`, tracking `0.1pt`) | `title-small` (`14sp` / `20sp` line-height, weight `500`, tracking `0.1pt`) | Font: Roboto |
| **Bottom Divider (`1dp`)** | Token: `surface-variant` (`#E7E0EC`/`#49454F`)<br>Specs diagram: `outline-variant` (`#CAC4D0`/`#49454F`) | Token: `surface-variant` (`#E7E0EC`/`#49454F`)<br>Specs diagram: `outline-variant` (`#CAC4D0`/`#49454F`) | `1dp` height inside container |
| **Focus Ring** | `secondary` (`#625B71`/`#CCC2DC`), `3dp` thick, `-3dp` inner offset | `secondary` (`#625B71`/`#CCC2DC`), `3dp` thick, `-3dp` inner offset | — |
| **Key Internal Spacings** | Inline icon-to-text: `8dp` \| Inline text-to-badge: `4dp` \| Stacked icon badge overlap: `6dp` \| Scrollable first-tab leading offset: `52dp` | Inline icon-to-text: `8dp` \| Inline text-to-badge: `4dp` \| Scrollable first-tab leading offset: `52dp` | — |

### Behavior & Gestures
- **Content Area Swiping:** Users can switch between fixed tabs either by tapping a tab header or by **swiping left/right across the content area**.
- **Gesture Conflicts:** Avoid placing horizontally swipeable child components (such as swipe-to-dismiss list items, carousels, or interactive maps) inside a swipeable tab content area, as users may accidentally trigger the wrong gesture.
- **Vertical Page Scrolling:** Tabs can stay pinned below the App Bar or scroll offscreen when scrolling down (returning when scrolling up). When attached to an App Bar, the App Bar and Tabs must move as a **single unified unit**—never scroll tabs *behind* the App Bar.

---

## Part 2: Search (`md.comp.search-bar` & `md.comp.search-view`)

### M3 Expressive Changes (February 2025)
- **Unified Naming:** Search bar and search view are now collectively documented as **Search**.
- **Contained Style (Recommended) vs Divided Style (Baseline):**
  - **Contained Style (`md.comp.search-bar.contained.*` / `md.comp.search-view.contained.*`):** Features a persistent, filled `56dp` pill search bar (`surface-container-high`, `corner.full`) in both unfocused and focused states. In **Full-screen** focused mode, the background behind the pill and results list is `surface-container-low` (`#F7F2FA` / `#1D1B20`). In **Docked** focused mode, a **`2dp` gap** separates the `corner.full` search bar pill from a `12dp` rounded (`corner.medium`) results card below.
  - **Divided Style (Baseline, Not Recommended):** Uses a `1dp` `outline` divider between the header (`72dp` full-screen / `56dp` docked) and results list inside a single `surface-container-high` sheet (`0dp` full-screen / `28dp` `corner.extra-large` docked).
- **Expressive Expanding Motion:** When a Contained search bar is focused, it expands horizontally using `md.sys.motion.spring.fast.spatial` (damping `0.9`, stiffness `1400`), reducing its outer horizontal margins from **`24dp` (unfocused)** to **`12dp` (focused)**.
- **Grouped Results with Gaps:** Search suggestion/result lists can use vertical gaps to separate distinct groups (e.g., recent queries vs contact avatars).

### Entry Points & Layouts
- **Four Search Entry Points:**
  1. **Search Bar (`md.comp.search-bar`):** Standalone `56dp` pill placed at the top of a page's content pane (e.g., *"Search your messages"*).
  2. **Search App Bar (`md.comp.app-bar.small.search`):** Integrated into the `64dp` top App Bar for global product search.
  3. **Search Icon Button:** `24dp` magnifying glass icon button when search is a secondary action.
  4. **Navigation Bar Destination:** Dedicated top-level Search tab that opens Focused Search directly.
- **Two Focused Search Layouts:**
  1. **Full-Screen Layout (Default on Compact `<600dp`):** Expands to `100%` width × `100%` height. Supports Android **predictive back** gesture (swiping back detaches and scales the search surface toward the gesture direction to preview the underlying screen).
  2. **Docked Layout (Recommended on Medium & Expanded `≥600dp`):** Opens a modal dropdown list directly below the search bar (width: **`360dp`–`720dp`**; height: **`240dp` min to `2/3` screen height max**) with a scrim over the rest of the page. Automatically morphs between Full-Screen on Compact and Docked on Medium+ breakpoints.

### Anatomy
1. **Search Bar Container:** `56dp` height, `corner.full` pill shape, `surface-container-high` (`#ECE6F0` / `#2B2930`), `level3` (`6dp`) elevation.
   - **Tonal Contrast Rule:** `surface-container-high` contrasts clearly against a default `surface` background, but **do not** place a `surface-container-high` search bar directly on a `surface-container` background (only 1 step apart). Always keep the search bar and its parent background **more than one surface-container step apart**.
2. **Leading Icon (`24dp`, `on-surface`):**
   - *Unfocused:* Either a non-functional decorative search icon or a functional navigation icon button (e.g., Menu).
   - *Focused:* Morphs into a **Back** arrow icon button that releases focus, dismisses suggestions/results, and returns the search bar to its unfocused state.
3. **Supporting (Hinted) Text & Input Text (`body-large`, `16sp`/`24sp`):**
   - Hinted text (`on-surface-variant`, e.g., *"Search replies"*) is replaced by input text (`on-surface`) as the user types. When a query is executed, the input text remains visible in the bar while focus moves to the results.
4. **Trailing Elements (Optional):**
   - Up to **2 trailing icon buttons** (`24dp`, `on-surface-variant`, e.g., voice microphone + overflow menu, or a **Clear `X`** button when text is entered), **OR** up to **1 trailing icon button + 1 Avatar** (`30dp` visual diameter, `48×48dp` touch target).
5. **Suggestions & Results Container:** Uses the **List** component (`md.comp.list`). Can display historical queries before typing, autocomplete suggestions while typing, category headers (*Recent*, *Contacts*, *Quick results*), filter chips, avatar carousels, and group gaps.

### Tokens, Colors & Measurements (`md.comp.search-bar` & `md.comp.search-view`)

| Element / Attribute | Unfocused Search Bar (`md.comp.search-bar.*`) | Focused Search View (`md.comp.search-view.*`) | Light / Dark Baseline |
|---|---|---|---|
| **Bar Container Color & Elev.** | `surface-container-high`, `level3` (`6dp`) | `surface-container-high`, `level3` (`6dp`) | `#ECE6F0` / `#2B2930` |
| **Full-Screen Background (Contained)** | — | `contained.background.color`: **`surface-container-low`** | `#F7F2FA` / `#1D1B20` |
| **Bar Height & Shape** | **`56dp`**, `corner.full` (pill) | Contained: **`56dp`**, `corner.full`<br>Divided: `72dp` (full-screen, `0dp` radius) / `56dp` (docked, `28dp` `corner.extra-large`) | — |
| **Container Width** | Min **`360dp`**, Max **`720dp`** | Full-screen: **`100%` width × `100%` height**<br>Docked: Width **`360dp–720dp`**, Height **`240dp` to `2/3` screen** | — |
| **Outer Horizontal Margins (Contained)** | **`24dp`** (`contained.leading-margin` / `trailing-margin`) | **`12dp`** (`contained.leading-margin` / `trailing-margin`) | Animates via `spring.fast.spatial` |
| **Internal Padding (Contained)** | With actions: `4dp` (`space50`) to `48dp` target<br>No actions: `16dp` (`space200`)<br>Icon-target to label gap: `4dp` (`space50`)<br>Between trailing actions: `0dp` (`space0`) | Leading/trailing padding: `16dp` (`space200`)<br>Icon-target to label gap: `4dp` (`space50`) | — |
| **Docked Bar-to-Results Gap & Shape** | — | Contained gap: **`2dp`** (`space25`), Results shape: **`12dp`** (`corner.medium`)<br>Divided: `1dp` `outline` (`#79747E`/`#938F99`) divider | — |
| **Leading Icon (`24dp`)** | `on-surface` | `on-surface` | `#1D1B20` / `#E6E0E9` |
| **Trailing Icon (`24dp`)** | `on-surface-variant` | `on-surface-variant` | `#49454F` / `#CAC4D0` |
| **Supporting (Hint) Text** | `on-surface-variant`, `body-large` (`16sp`/`24sp`, weight `400`, tracking `0.5pt`) | `on-surface-variant`, `body-large` (`16sp`/`24sp`, weight `400`, tracking `0.5pt`) | `#49454F` / `#CAC4D0` |
| **Input Text** | `on-surface`, `body-large` (`16sp`/`24sp`, weight `400`) | `on-surface`, `body-large` (`16sp`/`24sp`, weight `400`) | `#1D1B20` / `#E6E0E9` |
| **Avatar Size & Target** | **`30dp`** diameter (`corner.full`), **`48dp`** target | — | — |
| **Focus Indicator & State Layers** | Focus ring: `secondary` (`3dp` thick, `2dp` outer offset)<br>State layer: `on-surface` (`8%` hover, `10%` press) | Individual internal elements (Back, Clear, list items) show their own focus/hover/press states | — |

---

## Accessibility

| Component | Focus, Roles & Keyboard Navigation | Announcements, Labels & Targets |
|---|---|---|
| **Tabs** | `Tab` / `Arrow` keys move focus across tabs; **`Space` or `Enter` activates** the focused tab (never use `Space`/`Enter` to move focus). Do **not** loop scrollable tabs infinitely. | Provide descriptive labels for icon-only or ambiguous tabs (e.g., video camera icon → *"Video format media content"*). **Never** apply high density by default (keeps targets `≥48×48 CSS px`); any density toggle must remain `≥48×48 CSS px`. |
| **Search** | Initial focus lands on the **leading icon button** (if interactive) or directly on the **text field**. `Tab` / `Shift+Tab` moves between controls; `Space` or `Enter` activates input; `Up` / `Down` `Arrow` keys navigate suggestion/result list items. | Input role: **Text field** (Android) / **Search field** (iOS) / `role="searchbox"` or `combobox` (Web), using the hinted search text as the accessibility label. Screen readers **must announce** when autocomplete suggestions or results appear (`aria-live="polite"`), and focused search must display a clear status indicator (e.g., *"Quick results"* header or search icon). |

---

## Do / Don't / Caution Guidelines

| Status | Rule | Component |
|---|---|---|
| ✅ **Do** | Use Tabs to group peer categories of related content, and place Secondary Tabs below Primary Tabs. | Tabs |
| ❌ **Don't** | Use Tabs for sequential content (e.g., *Chapter 1, 2, 3*), mix icon+label tabs with text-only tabs in the same bar, or use >4 Fixed Tabs. | Tabs |
| ✅ **Do** | Offset the first visible tab in a **Scrollable Tab** bar by **`52dp`** from the leading edge, and use globally recognized icons if using icon-only tabs. | Tabs |
| ❌ **Don't** | Truncate tab labels when scrollable tabs can be used, loop scrollable tabs infinitely, or apply compact density to tabs by default. | Tabs |
| ✅ **Do** | Move attached App Bars and Tabs together as a single unit on scroll, and separate horizontal tab-swipe gestures from vertical content scrolling. | Tabs |
| ❌ **Don't** | Scroll Tabs *behind* an App Bar independently, or place swipe-to-delete list items inside a horizontally swipeable tab content pane. | Tabs |
| ✅ **Do** | Use the **Contained** search style (`56dp` pill, `24dp` → `12dp` margin expansion on focus), Full-screen results on Compact, and Docked results on Medium+. | Search |
| ❌ **Don't** | Use more than 2 trailing icons (or >1 trailing icon + 1 avatar) in a Search Bar, or alter the persistent `corner.full` shape of a Contained search bar. | Search |
| ⚠️ **Caution** | Avoid placing a `surface-container-high` Search Bar directly on a `surface-container` background (insufficient tonal contrast; keep surface roles >1 step apart). | Search |

---

## Implementation Notes

### Jetpack Compose (`androidx.compose.material3`)
- **Tabs:**
  - `PrimaryTabRow` & `PrimaryScrollableTabRow` (`edgePadding = 52.dp`), `SecondaryTabRow` & `SecondaryScrollableTabRow`.
  - Child items: `Tab` (supports stacked `icon` + `text`) or `LeadingIconTab` (inline `icon` + `text`). Pair with `HorizontalPager` (`androidx.compose.foundation.pager`) for swipeable tab content.
- **Search:**
  - `SearchBar` (Full-screen expanding search view) and `DockedSearchBar` (Medium/Expanded dropdown search view), using `SearchBarDefaults.InputField` (with `expanded` state, `onExpandedChange`, `leadingIcon`, `trailingIcon`).
  - *M3 Expressive (1.4.0-alpha+):* State-driven `SearchBar(state = rememberSearchBarState(), inputField = ...)` and `ExpandedFullScreenSearchBar` / `ExpandedDockedSearchBar` supporting Contained style (`24dp` → `12dp` margin spring animation).

### Flutter (`package:flutter/material.dart`)
- **Tabs:** `TabBar` (`isScrollable: false/true`, `tabAlignment: TabAlignment.fill` or `TabAlignment.startOffset` which applies the `52dp` start offset) + `TabBar.secondary` (for `2dp` full-width indicator and `onSurface` active text) + `Tab` + `TabBarView`.
- **Search:** `SearchBar` (`constraints: BoxConstraints(minWidth: 360, maxWidth: 720, minHeight: 56)`) and `SearchAnchor` / `SearchAnchor.bar` (`isFullScreen: true/false` for Compact vs Medium+ breakpoints).

### Material Web (`@material/web`)
- **Tabs:** `<md-tabs>` wrapping `<md-primary-tab>` (`inline-icon` attribute optional) or `<md-secondary-tab>`.
- **Search:** Compose using `<input type="search">` inside a pill container with `<md-icon>`, `<md-icon-button>`, and `<md-list>` / `<md-list-item>`.

### Minimal CSS Sketch

```css
/* Primary & Secondary Tabs */
.md-tabs {
  display: flex;
  width: 100%;
  background-color: var(--md-sys-color-surface, #FEF7FF);
  border-bottom: 1px solid var(--md-sys-color-surface-variant, #E7E0EC);
}
.md-tabs--scrollable {
  overflow-x: auto;
  padding-inline-start: 52px; /* 52dp leading offset for scrollable tabs */
}
.md-tab {
  position: relative;
  flex: 1;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding-inline: 16px;
  font: 500 14px/20px var(--md-sys-typescale-title-small-font, Roboto, sans-serif);
  color: var(--md-sys-color-on-surface-variant, #49454F);
}
.md-tab--with-icon { min-height: 64px; }
.md-tab--primary.is-active { color: var(--md-sys-color-primary, #6750A4); }
.md-tab--primary.is-active::after {
  content: "";
  position: absolute;
  bottom: 0;
  min-width: 24px;
  width: calc(100% - 32px);
  height: 3px;
  border-radius: 3px 3px 0 0;
  background-color: var(--md-sys-color-primary, #6750A4);
}
.md-tab--secondary.is-active { color: var(--md-sys-color-on-surface, #1D1B20); }
.md-tab--secondary.is-active::after {
  content: "";
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: 2px;
  background-color: var(--md-sys-color-primary, #6750A4);
}

/* M3 Expressive Contained Search Bar (56dp pill, 24dp -> 12dp margin on focus) */
.md-search-bar {
  display: flex;
  align-items: center;
  height: 56px;
  min-width: 360px;
  max-width: 720px;
  margin-inline: 24px;
  padding-inline: 4px;
  gap: 4px;
  border-radius: 9999px;
  background-color: var(--md-sys-color-surface-container-high, #ECE6F0);
  color: var(--md-sys-color-on-surface, #1D1B20);
  transition: margin-inline 250ms cubic-bezier(0.2, 0, 0, 1);
}
.md-search-bar:focus-within {
  margin-inline: 12px;
}
.md-search-bar__input {
  flex: 1;
  border: 0;
  background: transparent;
  font: 400 16px/24px var(--md-sys-typescale-body-large-font, Roboto, sans-serif);
  color: var(--md-sys-color-on-surface, #1D1B20);
}
.md-search-bar__input::placeholder {
  color: var(--md-sys-color-on-surface-variant, #49454F);
}
```

---

**Further reading:** `docs/pages/tabs.md`, `docs/pages/search.md`, `tokens/components/tabs.md`, `tokens/components/search.md`.
