# Badges, Loading & Progress Indicators, Snackbars, and Tooltips

Material Design 3 (M3 & M3 Expressive) reference for notification badges, short morphing loading indicators, linear/circular flat and wavy progress indicators, transient snackbars, and plain/rich tooltips.

Sources:
- `https://m3.material.io/components/badges/{overview,specs,guidelines,accessibility}`
- `https://m3.material.io/components/loading-indicator/{overview,specs,guidelines,accessibility}`
- `https://m3.material.io/components/progress-indicators/{overview,specs,guidelines,accessibility}`
- `https://m3.material.io/components/snackbar/{overview,specs,guidelines,accessibility}`
- `https://m3.material.io/components/tooltips/{overview,specs,guidelines,accessibility}`

---

## When to Use / Feedback & Status Decision Matrix

### 1. Wait-Time & Loading Decision Rule

| Expected Wait Time | Process Type | Recommended Component | Rationale |
| :--- | :--- | :--- | :--- |
| **Instant (`< 200ms`)** | Any | **No indicator** | Render content immediately; showing a spinner for <200ms causes visual flicker. |
| **Short (`200ms – 5s`)** | Indeterminate wait or **Pull-to-Refresh** | **Loading Indicator** (`md.comp.loading-indicator`) | M3 Expressive 7-shape morphing polygon grabs attention and mitigates perceived latency. **Never** transition it into a determinate bar. |
| **Long (`> 5s`) or Known %** | Determinate (`0–100%`) or Indeterminate → Determinate | **Progress Indicator** (`md.comp.progress-indicator`) | Linear (container edge) or Circular (centered/button), Flat or Wavy. Supports transitioning from indeterminate to determinate. |

### 2. Messaging, Counts & Contextual Help Decision Matrix

| Component | Priority & Persistence | User Action | Primary Use Case & When to Choose |
| :--- | :--- | :--- | :--- |
| **Small Badge (`6dp`)** | Persistent until destination viewed | None (informational) | Unread status dot on Navigation Bar, Navigation Rail, or constrained App Bar icons. |
| **Large Badge (`16dp` height)** | Persistent until count cleared | None (informational) | Quantifiable item count (`1` to `999+`, max 4 chars) on navigation destinations or trailing tab labels. |
| **Snackbar** | Low priority; 4–10s auto-dismiss (or persistent with action) | Optional single text button (e.g., *Undo*) | Brief, non-blocking confirmation of an app process at the bottom of the screen. Use a **Dialog** instead if user action is required to proceed. |
| **Plain Tooltip** | Transient (1.5s fade after hover/focus/long-press) | None | Single-line label (`24dp` tall) identifying unlabeled **icon-only buttons**. Never duplicate visible button text. |
| **Rich Tooltip** | Transient (hover/focus) or Persistent (click / page-load) | Optional (up to 2 text buttons + links) | Multi-line explanation, feature value callout, or onboarding tip. Never put destructive warnings inside a tooltip. |

---

## 1. Badges (`md.comp.badge`)

Badges convey dynamic notification status or item counts anchored to the upper-trailing edge of icons inside navigation components, app bars, and tabs.

### Variants, Measurements & Tokens

| Attribute | Small Badge | Large Badge (1 Digit) | Large Badge (Max 4 Characters, e.g. `999+`) |
| :--- | :--- | :--- | :--- |
| **Dimensions (H × W)** | `6dp × 6dp` (`md.comp.badge.size`) | `16dp × 16dp` (`md.comp.badge.large.size`) | `16dp × 34dp` (`4dp` start/end internal padding) |
| **Corner Shape** | `3dp` radius (`md.sys.shape.corner.full`) | `8dp` radius (`md.sys.shape.corner.full`) | `8dp` radius (`md.sys.shape.corner.full` pill) |
| **Container Color** | `error` (`#B3261E` Light / `#F2B8B5` Dark) | `error` (`#B3261E` / `#F2B8B5`) | `error` (`#B3261E` / `#F2B8B5`) |
| **Label Text Color** | *No text* | `on-error` (`#FFFFFF` Light / `#601410` Dark) | `on-error` (`#FFFFFF` / `#601410`) |
| **Typography** | *No text* | `label-small` (`11pt/16pt`, weight `500`, `0.5pt` tracking) | `label-small` (`11pt/16pt`, weight `500`, `0.5pt` tracking) |
| **Anchor Offset from Icon Top-Trailing Corner** | **`6dp × 6dp`** (from icon top-trailing corner to badge bottom-leading corner) | **`14dp × 12dp`** (from icon top-trailing corner to badge bottom-leading corner) | **`14dp × 12dp`** (bottom-leading corner stays fixed; width expands outward toward trailing edge) |

### Placement, Behavior & Accessibility

- **Component-Specific Placement**:
  - **Navigation Bar & Navigation Rail**: Anchor inside the `24×24dp` icon bounding box at the top-trailing corner (top-right in LTR, top-left in RTL). Hide unread notification badges immediately once the user selects that destination.
  - **App Bars / Constrained Icon Buttons**: Prefer a **Small badge** (`6dp`) so the badge does not collide with adjacent actions or clip at the screen edge.
  - **Tabs**: When a tab contains both an icon and text, place a **Large badge** inline at the **trailing edge after the text** — never overlap a large badge between the icon and label.
- **Character Limit**: Never exceed **4 characters** (condense 4+ digit numbers to `999+`).
- **Color Contrast**: Keep the default `error` / `on-error` color mapping so badges stand out against primary/secondary navigation indicators. If custom colors are used, maintain at least **3:1** contrast against the surface.
- **Screen Reader Announcement**: Read after the destination's name — numeric badges announce their count (e.g., *"Mail, 3 unread"*), while small non-counting badges announce *"New notification"*.

---

## 2. Loading Indicator (`md.comp.loading-indicator`)

Introduced in **M3 Expressive (May 2025)**, the Loading Indicator replaces indeterminate circular progress indicators for short wait times (`200ms–5s`) and pull-to-refresh gestures.

### Anatomy, Configurations & Tokens

The active indicator is a continuous looping animation that morphs through **7 unique Material 3 polygon shapes**.

| Configuration | Active Indicator Size & Color | Container Size, Shape & Color | When to Use |
| :--- | :--- | :--- | :--- |
| **Default (Uncontained)** | `38×38dp`, `primary` (`#6750A4` / `#D0BCFF`) | `48×48dp` bounding box (provides `5dp` margin around the `38dp` shape; no visible fill) | Directly on a plain surface (e.g., empty page state, inside a tab or button). |
| **Contained** | `38×38dp`, `on-primary-container` (`#4F378B` / `#EADDFF`) | `48×48dp` circle (`md.sys.shape.corner.full`), `primary-container` (`#EADDFF` / `#4F378B`) *(Note: base token `container.color` also lists `secondary-container` `#E8DEF8`/`#4A4458`)* | Over existing content/images for stronger contrast, and **always for pull-to-refresh**. |

### Sizing, Pull-to-Refresh & Accessibility Rules

- **Flexible Scaling**: Default size is `48dp` (`38dp` active shape). May scale proportionally between **`24dp` minimum and `240dp` maximum** while preserving the `38:48` shape-to-container ratio. Reserve large sizes (`>96dp`) for expanded desktop viewports.
- **No Determinate Transition**: **Never** transition a Loading Indicator into a determinate Progress Indicator. If a task may switch from indeterminate to determinate, start with an Indeterminate Progress Indicator.
- **Pull-to-Refresh Behavior** (Jetpack Compose / Android):
  - Appears at the top of dynamic lists/grids; requires passing a pull distance/time threshold before triggering a refresh (reversing the gesture before release cancels it).
  - Must remain visible in view until the refresh finishes and new content renders — **never** allow the loading indicator to scroll off-screen while refreshing.
  - **Single-Pointer Accessibility**: Because swipe gestures aren't accessible to all users, always provide a single-pointer refresh alternative (e.g., a *Refresh* action button in the Top App Bar or overflow menu).
- **Contrast & Labeling**:
  - The active indicator shape (not the container) must maintain at least **3:1** contrast against its background.
  - Use accessibility role `progressbar` with a descriptive label explaining what is loading (e.g., *"Loading news article"*, *"Refreshing page"*).

---

## 3. Progress Indicators (`md.comp.progress-indicator.*`)

Progress indicators display the status of processes taking **over 5 seconds** or processes with a measurable `0–100%` completion rate.

### Variants & M3 Expressive Configurations (Aug 2024)

1. **Linear (`md.comp.progress-indicator.linear`)**: Horizontal bar placed at the edge of a loading container (e.g., top of screen, bottom/expanding edge of a card) or spanning full container width (minimum container width `40dp`, inset `4dp` from screen edges). Mirrors horizontally (flows right-to-left) in RTL languages.
2. **Circular (`md.comp.progress-indicator.circular`)**: Ring centered in a container, empty space, or button (animates clockwise from 12 o'clock; does not mirror in RTL). Scales between **`24dp` and `240dp`**.
3. **Flat vs Wavy Shape**:
   - **Flat (default)**: Straight linear bar or smooth circular arc with rounded ends (`md.sys.shape.corner.full`).
   - **Wavy (M3 Expressive)**: Sinusoidal animated wave along the active indicator to make longer waits feel dynamic. Avoid wavy shape on very small indicators (such as inside compact buttons) where the wave is illegible.

### Exact Token Measurements & Wave Specs

*(Note: Legacy `md.comp.circular-progress-indicator` and `md.comp.linear-progress-indicator` token sets with `0dp` corners and `surface-container-highest` tracks are **deprecated**.)*

| Attribute | Token | Linear Default (`4dp`) | Linear Thick (`8dp`) | Circular Default (`4dp`) | Circular Thick (`8dp`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Active Indicator Thickness** | `*.active-indicator.thickness` | `4dp` | `8dp` | `4dp` | `8dp` |
| **Track Thickness** | `*.track.thickness` | `4dp` | `8dp` | `4dp` | `8dp` |
| **Active-to-Track Gap** | `*.track-active-indicator-space` | `4dp` | `4dp` | `4dp` | `4dp` |
| **Overall Size / Height (Flat)** | `*.height` / `*.size` | `4dp` tall | `8dp` tall | `40×40dp` diameter | `52×52dp` diameter |
| **Overall Size / Height (Wavy)** | `*.with-wave.{height,size}` | `10dp` tall | `14dp` tall | `48×48dp` diameter | Scales proportionally |
| **Wave Amplitude** (center to peak) | `*.wave.amplitude` | `3dp` | `3dp` (scales) | `1.6dp` | `1.6dp` (scales) |
| **Wave Wavelength** (peak to peak) | `*.wave.wavelength` | `40dp` (det.) / `20dp` (indet.) | `40dp` / `20dp` | `15dp` | `15dp` |
| **Stop Indicator Size & Space** | `*.stop-indicator.{size,trailing-space}` | `4dp` dot, `0dp` trailing space | `4dp` dot, `2dp` trailing space | *Not used on Circular* | *Not used on Circular* |

### Color Roles & Accessibility Rules

- **Colors**:
  - Active Indicator & Stop Indicator: `primary` (`#6750A4` Light / `#D0BCFF` Dark), `md.sys.shape.corner.full`.
  - Track: `secondary-container` (`#E8DEF8` Light / `#4A4458` Dark), `md.sys.shape.corner.full`.
- **1% Minimum Dot**: As soon as a determinate process begins (`>0%`), render the active indicator at least as a circular dot so the user immediately sees progress has started.
- **Stop Indicator Contrast Rule**: Linear determinate indicators include a `4dp` `primary` stop indicator dot at the trailing end of the track. This stop indicator is **mandatory** whenever the `secondary-container` track has `< 3:1` contrast with its surrounding surface. Never use a stop indicator on circular or indeterminate indicators.
- **In-Button Circular Indicator**: When embedding a circular progress indicator inside a button, **remove the track** and set the active indicator color to match the button's label/icon color (guaranteeing `≥ 3:1` contrast).
- **Single Indicator per Group**: When multiple items load together on a screen, show **one** progress indicator for the group rather than separate spinners on every card/row.
- **Accessibility Label**: Use `role="progressbar"` with a label specifying both the action and target content (e.g., *"Loading my episodes"*).

---

## 4. Snackbar (`md.comp.snackbar`)

Snackbars provide brief, non-interruptive updates about app processes at the bottom of the screen.

### Anatomy, Configurations & Measurements

1. **Container**: Solid opaque rectangle (`inverse-surface`) with `4dp` (`extra-small`) rounded corners and `level3` (`6dp`) elevation.
2. **Supporting Text**: 1 line (preferred) or up to 2 lines on compact screens (`body-medium`).
3. **Action (Optional)**: A single text button (`inverse-primary`, `label-large`, e.g., *"Undo"*). If the action label is long on a two-line snackbar, it wraps onto a **third line** below the supporting text.
4. **Close Icon (Optional)**: `24×24dp` `×` icon button (`inverse-on-surface`) at the trailing end. (Avoid adding a text *"Dismiss"* button since snackbars auto-dismiss or have a close icon).

| Attribute | Token | Value |
| :--- | :--- | :--- |
| **Single-line container height** | `md.comp.snackbar.with-single-line.container.height` | `48dp` |
| **Two-line container height** | `md.comp.snackbar.with-two-lines.container.height` | `68dp` *(guidelines text also cites `64dp` on compact)* |
| **Container fill & elevation** | `md.comp.snackbar.container.{color,elevation}` | `inverse-surface` (`#322F35` / `#E6E0E9`), `level3` (`6dp`) |
| **Container corner radius** | `md.comp.snackbar.container.shape` | `4dp` (`md.sys.shape.corner.extra-small`) |
| **Supporting text color & type** | `md.comp.snackbar.supporting-text.*` | `inverse-on-surface` (`#F5EFF7` / `#322F35`), `body-medium` (`14pt/20pt`, weight `400`, `0.25pt` tracking) |
| **Action button text color & type** | `md.comp.snackbar.action.label-text.*` | `inverse-primary` (`#D0BCFF` / `#6750A4`), `label-large` (`14pt/20pt`, weight `500`, `0.1pt` tracking) |
| **Action state layer** | `md.comp.snackbar.action.{hover,focus,pressed}.*` | `inverse-primary` @ `0.08` (hover) / `0.10` (focus, press) |
| **Close icon size & color** | `md.comp.snackbar.icon.{size,color}` | `24dp`, `inverse-on-surface` (`#F5EFF7` / `#322F35`) |

### Placement, Duration & Accessibility Rules

- **Concurrency**: Display **only one snackbar at a time**. Never stack snackbars vertically or place them side-by-side. A newer snackbar with updated status may replace an outdated one.
- **Placement & Z-Order**:
  - Float near the bottom of the screen in front of body content, maintaining fixed margins from leading, trailing, and bottom edges on compact screens.
  - **Above FABs & Navigation**: Always position snackbars **above** Floating Action Buttons (FABs), Bottom Navigation Bars, and Docked Toolbars — never overlap navigation bars or place a snackbar behind or in front of a FAB. Do not animate the FAB when a snackbar appears (unless the snackbar spans full width on a screen without persistent navigation).
  - **Medium & Expanded Screens**: Expand width horizontally to fit longer text (target 40–60 characters per line); align consistently to the start (left) or center — **never** place flush against the screen edge.
- **Auto-Dismiss vs Persistent Duration**:
  - **No action**: Auto-dismisses after **4 to 10 seconds**.
  - **With action**: Must **not** auto-dismiss; remains on screen until the user takes the action or dismisses it.
  - **Web Accessibility Requirement**: Auto-dismissing snackbars on Web are inaccessible to low-vision users unless you either (1) **also show persistent inline feedback** near the trigger (e.g., changing a *"Save"* button label to *"Saved"*) OR (2) **include an action** on the snackbar so it stays on screen until dismissed.
- **Focus & Screen Reader Announcements**:
  - Announce via a **polite** live region (`aria-live="polite"`) — **never** steal or trap keyboard focus when a snackbar appears.
  - On Web, provide a documented keyboard shortcut (such as `Alt + G`) to jump focus into an actionable snackbar.
  - When focused, `Tab` moves between interactive elements inside the snackbar, and `Esc` dismisses the snackbar and returns focus to the triggering element (or next logical page element).

### Do / Don't / Caution

- **✅ Do**: Keep snackbar labels concise (1 line preferred, max 2 lines on mobile) and use a colored text button (`inverse-primary`) for actions like *"Undo"*.
- **⚠️ Caution**: Avoid adding leading icons to snackbars (use a Dialog if an icon is needed).
- **❌ Don't**: Use a filled or elevated button inside a snackbar, make the action text the same color as the body text, or include bold/hyperlinked inline text.

---

## 5. Tooltips (`md.comp.{plain,rich}-tooltip`)

Tooltips display brief informative labels (Plain) or supplemental feature descriptions and actions (Rich) anchored near a target element.

### Plain vs Rich Tooltip Specifications

| Attribute | Plain Tooltip (`md.comp.plain-tooltip`) | Rich Tooltip (`md.comp.rich-tooltip`) |
| :--- | :--- | :--- |
| **Primary Purpose** | Labels unlabeled **icon-only buttons** or controls | Explains a feature's value, defines terms, or introduces new UI |
| **Container Fill & Elevation** | `inverse-surface` (`#322F35` / `#E6E0E9`), `level0` (`0dp`) | `surface-container` (`#F3EDF7` / `#211F26`), `level2` (`3dp`) |
| **Container Shape** | `4dp` (`md.sys.shape.corner.extra-small`) | `12dp` (`md.sys.shape.corner.medium`) |
| **Container Height & Padding** | `24dp` min height; `8dp` left/right padding | Dynamic height; `12dp` top, `8dp` bottom, `16dp` left/right padding |
| **Subhead (Optional)** | *Not supported* | `title-small` (`14pt/20pt`, weight `500`, `0.1pt` tracking), `on-surface-variant` (`#49454F` / `#CAC4D0`), single line |
| **Supporting Text (Required)** | `body-small` (`12pt/16pt`, weight `400`, `0.4pt` tracking), `inverse-on-surface` (`#F5EFF7` / `#322F35`), single line | `body-medium` (`14pt/20pt`, weight `400`, `0.25pt` tracking), `on-surface-variant` (`#49454F` / `#CAC4D0`), multi-line |
| **Action Buttons (Optional)** | *Not supported* | Up to **2 side-by-side text buttons**: `label-large` (`14pt/20pt`, weight `500`), `primary` (`#6750A4` / `#D0BCFF`) |
| **Default Placement & Offset** | Centered **above** target (`4dp` gap from visible button boundary; `8dp` gap from borderless text; placed `4dp` **below** target when inside an App Bar) | **Bottom-trailing** (bottom-right) of target (or centered below on desktop); shifts in `8dp` increments to stay on-screen without covering target |

### Rich Tooltip Configurations

Rich tooltips support 5 valid combinations:
1. Subhead + supporting text + 2 text buttons
2. Subhead + supporting text + 1 text button
3. Subhead + supporting text
4. Supporting text + 1 text button
5. Supporting text + 2 text buttons

### Trigger, Persistence & Accessibility Rules

- **Transient by Default**: Plain and standard Rich tooltips appear on pointer hover (desktop), keyboard focus, or tap-and-hold (mobile). They remain visible while within the target region and disappear **1.5 seconds** after the pointer/focus leaves. Opening any new tooltip immediately closes any existing tooltip (never show 2 tooltips simultaneously).
- **Persistent Rich Tooltips**: Triggered either by **clicking/tapping** the parent element or **automatically on page load** (to onboard users to a new feature — always include a **Subhead** when triggered on page load). They ignore hover and stay open until the user interacts with another UI element. **Never** attach a persistent rich tooltip to an icon button.
- **Focus Order & Keyboard (`role="tooltip"`)**:
  - Do not trap keyboard or screen reader focus inside a Rich Tooltip.
  - Focus order moves linearly top-to-bottom: `1. Parent element` → `2. Inline link (if any)` → `3. Text button(s)` → continues through the page.
  - `Tab` moves focus onto available buttons/links inside the tooltip; `Space` or `Enter` activates them.

### Do / Don't / Caution

- **✅ Do**: Use Plain tooltips on every icon-only button so sighted mouse/touch users can discover its label.
- **⚠️ Caution**: Keep Rich Tooltip action buttons short so they sit side-by-side rather than stacking vertically, and avoid wrapping Plain tooltips to multiple lines.
- **❌ Don't**: Add a Plain tooltip to a button that already displays that exact text label.
- **❌ Don't**: Hide critical or destructive warnings (e.g., *"Permanently deletes files"*) inside a tooltip — use an interruptive Dialog instead.

---

## Implementation Notes

### Platform API Mapping

| Component | Jetpack Compose (`androidx.compose.material3`) | Flutter (`material`) | Material Web (`@material/web`) |
| :--- | :--- | :--- | :--- |
| **Badges** | `BadgedBox`, `Badge` | `Badge`, `Badge.count` | *Custom / CSS (no `<md-badge>`)* |
| **Loading Indicator** | `LoadingIndicator`, `ContainedLoadingIndicator`, `PullToRefreshBox` *(M3 Expressive)* | `RefreshIndicator` *(M3 Expressive morphing indicator via `material` updates)* | *Not yet in `@material/web`* |
| **Progress Indicators** | `LinearProgressIndicator`, `CircularProgressIndicator`, `LinearWavyProgressIndicator`, `CircularWavyProgressIndicator` | `LinearProgressIndicator`, `CircularProgressIndicator` (`year2023: false` for M3 track gap & stop dot) | `<md-linear-progress>`, `<md-circular-progress>` |
| **Snackbar** | `SnackbarHost`, `SnackbarHostState`, `Snackbar` | `ScaffoldMessenger.of(context).showSnackBar`, `SnackBar` | *Custom (Material Web has no `<md-snackbar>`)* |
| **Tooltips** | `TooltipBox`, `PlainTooltip`, `RichTooltip` | `Tooltip` | *Custom / Popover API* |

### Minimal CSS Sketch (`--md-sys-*` Custom Properties)

```css
/* Large Badge anchored on a 24dp Icon */
.md3-icon-badge-wrapper {
  position: relative;
  width: 24px;
  height: 24px;
  display: inline-flex;
}
.md3-badge-small {
  position: absolute;
  top: 0;
  inset-inline-end: 0;
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: var(--md-sys-color-error, #B3261E);
}
.md3-badge-large {
  position: absolute;
  bottom: 14px; /* 14dp from top-trailing icon corner (24 - 10) */
  inset-inline-start: 12px; /* 12dp from trailing edge */
  min-width: 16px;
  max-width: 34px;
  height: 16px;
  padding: 0 4px;
  box-sizing: border-box;
  border-radius: 9999px;
  background: var(--md-sys-color-error, #B3261E);
  color: var(--md-sys-color-on-error, #FFFFFF);
  font: 500 11px/16px var(--md-sys-typescale-label-small-font, Roboto, sans-serif);
  letter-spacing: 0.5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Snackbar */
.md3-snackbar {
  min-height: 48px;
  padding: 0 16px;
  border-radius: var(--md-sys-shape-corner-extra-small, 4px);
  background: var(--md-sys-color-inverse-surface, #322F35);
  color: var(--md-sys-color-inverse-on-surface, #F5EFF7);
  box-shadow: var(--md-sys-elevation-level3, 0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.3));
  font: 400 14px/20px var(--md-sys-typescale-body-medium-font, Roboto, sans-serif);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.md3-snackbar__action {
  color: var(--md-sys-color-inverse-primary, #D0BCFF);
  font: 500 14px/20px var(--md-sys-typescale-label-large-font, Roboto, sans-serif);
  background: transparent;
  border: none;
  cursor: pointer;
}
```

---

## Further Reading

- Pages: [docs/pages/badges.md](file:///Users/leon/Desktop/Leon/material-design-skill/docs/pages/badges.md), [docs/pages/loading-indicator.md](file:///Users/leon/Desktop/Leon/material-design-skill/docs/pages/loading-indicator.md), [docs/pages/progress-indicators.md](file:///Users/leon/Desktop/Leon/material-design-skill/docs/pages/progress-indicators.md), [docs/pages/snackbar.md](file:///Users/leon/Desktop/Leon/material-design-skill/docs/pages/snackbar.md), [docs/pages/tooltips.md](file:///Users/leon/Desktop/Leon/material-design-skill/docs/pages/tooltips.md)
- Tokens: [tokens/components/badges.md](file:///Users/leon/Desktop/Leon/material-design-skill/tokens/components/badges.md), [tokens/components/loading-indicator.md](file:///Users/leon/Desktop/Leon/material-design-skill/tokens/components/loading-indicator.md), [tokens/components/progress-indicators.md](file:///Users/leon/Desktop/Leon/material-design-skill/tokens/components/progress-indicators.md), [tokens/components/snackbar.md](file:///Users/leon/Desktop/Leon/material-design-skill/tokens/components/snackbar.md), [tokens/components/tooltips.md](file:///Users/leon/Desktop/Leon/material-design-skill/tokens/components/tooltips.md)
