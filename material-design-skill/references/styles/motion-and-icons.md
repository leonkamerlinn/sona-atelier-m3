# Motion and Icons

Material 3 Expressive spring-based motion physics system (`md.sys.motion.spring.*`), legacy easing and duration tokens, screen transition patterns, and Material Symbols variable iconography (`opsz`, `wght`, `FILL`, `GRAD`, `24dp` keylines, and RTL mirroring).

**Sources:**
- https://m3.material.io/styles/motion/overview/how-it-works
- https://m3.material.io/styles/motion/overview/specs
- https://m3.material.io/styles/motion/easing-and-duration/applying-easing-and-duration
- https://m3.material.io/styles/motion/easing-and-duration/tokens-specs
- https://m3.material.io/styles/motion/transitions/transition-patterns
- https://m3.material.io/styles/motion/transitions/applying-transitions
- https://m3.material.io/styles/icons/overview
- https://m3.material.io/styles/icons/designing-icons
- https://m3.material.io/styles/icons/applying-icons
- https://m3.material.io/foundations/layout/bidirectionality-rtl

---

## When to Use / When Not to Use

| System / Pattern | When to Use | When Not to Use |
|---|---|---|
| **Spatial Springs (`md.sys.motion.spring.*.spatial`)** | Animating position (`x`/`y`), scale/size, rotation, corner radius, or shape morphing. Overshoots and bounces into place in the Expressive scheme. | Animating color or opacity (overshooting opacity/color causes visual flickering or invalid clamping). |
| **Effects Springs (`md.sys.motion.spring.*.effects`)** | Animating color fills, state layer alpha, and opacity fades (`damping = 1.0`, zero overshoot). | Moving, scaling, or morphing physical geometry on screen. |
| **Expressive vs Standard Motion Scheme** | Use **Expressive** (bouncy spatial overshoot) for most consumer products, hero moments, and interactive controls; use **Standard** (critically damped / minimal bounce) for utilitarian or dense productivity tools. | Do not apply bouncy expressive springs to frequent full-screen page navigation transitions. |
| **Container Transform Transition** | Expanding a persistent element (card, list item, FAB, search bar, carousel photo) into a detail screen or modal sheet in shallow hierarchies. | Deep utility hierarchies (e.g., multi-level Settings screens) where repeated full-screen expansion feels slow and excessive. |
| **Forward & Backward (Shared Axis)** | Navigating consecutive hierarchy levels (inbox → thread, checkout step 1 → step 2). | Switching between unrelated top-level destinations or peer tabs. |
| **Lateral Transition** | Swiping/tapping between peer views at the same hierarchy level (Tabs, Carousels, photo galleries). | Hierarchical parent-child navigation or top-level navigation bar switching. |
| **Top-Level Transition (Fade Through)** | Switching between unrelated destinations in a `NavigationBar`, `NavigationRail`, or `NavigationDrawer`. | Peer tab swiping or hero card expansion. |
| **Material Symbols (Variable Font)** | All UI actions, navigation indicators, status icons, and text-paired symbols across `20dp`, `24dp`, `40dp`, and `48dp` optical sizes. | Complex multi-color illustrations (use SVG/vector artwork instead). |

---

## 1. M3 Expressive Motion Physics System (`md.sys.motion.spring.*`)

Introduced in May 2025 with M3 Expressive, the **motion physics system** replaces duration-and-bezier curves with **physics springs** governed by three physical parameters: **stiffness**, **damping ratio**, and **initial velocity**. Springs naturally handle gesture velocity, mid-flight interruptions, and dynamic retargeting without sudden velocity jumps.

### Motion Schemes: Expressive vs Standard
- **Product-level scheme selection**: A product selects either the **`Expressive`** (default opinionated scheme with lively bounce) or **`Standard`** (functional scheme with minimal bounce) `MotionScheme` at the theme root (and can override it per-element or per-screen).
- **Scheme-agnostic token names**: Components always reference the same 6 system tokens (`md.sys.motion.spring.{fast,default,slow}.{spatial,effects}`). Most individual component interactions (Buttons, Switches, FAB menus, Toolbars) are driven by just two tokens: **`fast.spatial`** and **`fast.effects`**.

### Spring Token Matrix (`tokens/sys-tokens.md` Baseline & Scheme Behavior)

| Composite Token (`md.sys.motion.spring.*`) | Speed | Style | Stiffness (`*.stiffness`) | Damping Ratio (`*.damping`) | Overshoot / Bounce Behavior | Typical Component & Layout Applications |
|---|---|---|---|---|---|---|
| `spring.fast.spatial` | **Fast** | **Spatial** | **`1400`** | **`0.9`** *(Expressive theme overrides to ~`0.6`–`0.9`)* | Overshoots target and bounces | Small interactive controls: Switches, Buttons, Icon Buttons, Split Buttons, Button Group press morph |
| `spring.default.spatial` | **Default** | **Spatial** | **`700`** | **`0.9`** | Moderate overshoot and settle | Partial-screen animations: Bottom Sheets, Side Sheets, Expanded Navigation Rail, Dialogs |
| `spring.slow.spatial` | **Slow** | **Spatial** | **`300`** | **`0.9`** | Gentle, wide-travel settle | Full-screen spatial animations and large layout reflows |
| `spring.fast.effects` | **Fast** | **Effects** | **`3800`** | **`1.0`** (Critically damped) | **Zero overshoot** | Color & opacity on small controls (Switch thumb/track color, button state layers) |
| `spring.default.effects` | **Default** | **Effects** | **`1600`** | **`1.0`** (Critically damped) | **Zero overshoot** | Partial-screen opacity/color (Navigation rail content fade, sheet scrim fade) |
| `spring.slow.effects` | **Slow** | **Effects** | **`800`** | **`1.0`** (Critically damped) | **Zero overshoot** | Full-screen content refresh fades and ambient background color shifts |

*Device adaptation note*: Spring tokens adapt across form factors (wearables, phones, tablets) so `fast.spatial` always feels appropriately brisk relative to screen travel distance.

### Web Conversion Table: Springs to Cubic-Bézier Curves & Durations

On Web or platforms where a real-time spring solver is unavailable for non-interruptible animations, Material specifies exact `cubic-bezier()` + `duration` equivalents (notice `y2 > 1.0` on spatial curves, which produces the spring overshoot):

| Scheme & Spring Token | CSS `cubic-bezier(x1, y1, x2, y2)` | Equivalent Duration | Peak Overshoot (`y > 1`) |
|---|---|---|---|
| **Expressive fast spatial** | `cubic-bezier(0.42, 1.67, 0.21, 0.90)` | **`350ms`** | Strong bounce (`y1 = 1.67`) |
| **Expressive default spatial** | `cubic-bezier(0.38, 1.21, 0.22, 1.00)` | **`500ms`** | Moderate bounce (`y1 = 1.21`) |
| **Expressive slow spatial** | `cubic-bezier(0.39, 1.29, 0.35, 0.98)` | **`650ms`** | Moderate bounce (`y1 = 1.29`) |
| **Expressive fast effects** | `cubic-bezier(0.31, 0.94, 0.34, 1.00)` | **`150ms`** | No overshoot |
| **Expressive default effects** | `cubic-bezier(0.34, 0.80, 0.34, 1.00)` | **`200ms`** | No overshoot |
| **Expressive slow effects** | `cubic-bezier(0.34, 0.88, 0.34, 1.00)` | **`300ms`** | No overshoot |
| **Standard fast spatial** | `cubic-bezier(0.27, 1.06, 0.18, 1.00)` | **`350ms`** | Minimal overshoot (`y1 = 1.06`) |
| **Standard default spatial** | `cubic-bezier(0.27, 1.06, 0.18, 1.00)` | **`500ms`** | Minimal overshoot (`y1 = 1.06`) |
| **Standard slow spatial** | `cubic-bezier(0.27, 1.06, 0.18, 1.00)` | **`750ms`** | Minimal overshoot (`y1 = 1.06`) |
| **Standard fast effects** | `cubic-bezier(0.31, 0.94, 0.34, 1.00)` | **`150ms`** | No overshoot |
| **Standard default effects** | `cubic-bezier(0.34, 0.80, 0.34, 1.00)` | **`200ms`** | No overshoot |
| **Standard slow effects** | `cubic-bezier(0.34, 0.88, 0.34, 1.00)` | **`300ms`** | No overshoot |

---

## 2. Legacy Easing & Duration System (`md.sys.motion.easing.*`, `md.sys.motion.duration.*`)

While components have migrated to the spring physics system, **screen transitions** and non-Expressive themes still use M3's easing and duration tokens.

### Recommended Easing + Duration Pairs

| Easing Role | Easing Token | Recommended Duration | Transition Trajectory |
|---|---|---|---|
| **Emphasized** | `md.sys.motion.easing.emphasized` | **`500ms`** (`long2`) | **Begin and end on screen** (e.g., card expanding, or drawer exiting temporarily off-screen so it feels retrievable) |
| **Emphasized Decelerate** | `md.sys.motion.easing.emphasized.decelerate` | **`400ms`** (`medium4`) | **Enter the screen** (starts at peak velocity, lands gently at rest — e.g., Modal Bottom Sheet entering) |
| **Emphasized Accelerate** | `md.sys.motion.easing.emphasized.accelerate` | **`200ms`** (`short4`) | **Exit the screen permanently** (starts at rest, exits at peak velocity — e.g., dismissing a sheet/dialog) |
| **Standard** | `md.sys.motion.easing.standard` | **`300ms`** (`medium2`) | **Begin and end on screen** for small utility controls, or Web/iOS fallback for `emphasized` |
| **Standard Decelerate** | `md.sys.motion.easing.standard.decelerate` | **`250ms`** (`medium1`) | **Enter the screen** for small/utility elements |
| **Standard Accelerate** | `md.sys.motion.easing.standard.accelerate` | **`200ms`** (`short4`) | **Exit the screen** for small/utility elements |

### Easing Tokens Table

| Token (`md.sys.motion.easing.*`) | Resolved Curve / Path | Platform Notes |
|---|---|---|
| `emphasized` | `svgPath("M 0,0 C 0.05, 0, 0.133333, 0.06, 0.166666, 0.4 C 0.208333, 0.82, 0.25, 1, 1, 1")` | Two-segment cubic path; in Flutter use `Curves.easeInOutCubicEmphasized`; on CSS/iOS use `standard` (`cubic-bezier(0.2, 0, 0, 1)`) or `linear()` approximation as fallback |
| `emphasized.decelerate` | `cubic-bezier(0.05, 0.7, 0.1, 1.0)` | Snappy entry deceleration |
| `emphasized.accelerate` | `cubic-bezier(0.3, 0.0, 0.8, 0.15)` | Quick permanent exit acceleration |
| `standard` | `cubic-bezier(0.2, 0.0, 0.0, 1.0)` | Utility on-screen movement & CSS/iOS fallback |
| `standard.decelerate` | `cubic-bezier(0.0, 0.0, 0.0, 1.0)` | Utility entry curve |
| `standard.accelerate` | `cubic-bezier(0.3, 0.0, 1.0, 1.0)` | Utility exit curve |
| `linear` | `cubic-bezier(0.0, 0.0, 1.0, 1.0)` | Constant-speed interpolation |
| `legacy` *(M2)* | `cubic-bezier(0.4, 0.0, 0.2, 1.0)` | Legacy M2 `fastOutSlowIn` |
| `legacy.decelerate` *(M2)* | `cubic-bezier(0.0, 0.0, 0.2, 1.0)` | Legacy M2 `linearOutSlowIn` |
| `legacy.accelerate` *(M2)* | `cubic-bezier(0.4, 0.0, 1.0, 1.0)` | Legacy M2 `fastOutLinearIn` |

*(Path token `md.sys.motion.path` resolves to `LINEAR`.)*

### Duration Tokens Table (`md.sys.motion.duration.*`)

| Tier | Token `.1` | Token `.2` | Token `.3` | Token `.4` | Intended Scope |
|---|---|---|---|---|---|
| **Short** (`short1–4`) | **`50ms`** | **`100ms`** | **`150ms`** | **`200ms`** | Micro-interactions, selection controls (`200ms`), permanent exits (`200ms`), quick fades |
| **Medium** (`medium1–4`) | **`250ms`** | **`300ms`** | **`350ms`** | **`400ms`** | Medium screen-area traversal (FAB → Toolbar/Sheet `400ms`, standard transitions `300ms`) |
| **Long** (`long1–4`) | **`450ms`** | **`500ms`** | **`550ms`** | **`600ms`** | Large expressive transitions, full-screen container transforms (`500ms`) |
| **Extra Long** (`extra-long1–4`)| **`700ms`** | **`800ms`** | **`900ms`** | **`1000ms`**| Ambient/automated motion without direct user input (e.g., auto-advancing carousel `1000ms`) |

---

## 3. Screen & Component Transition Patterns

Material 3 organizes navigation and UI choreography into **6 transition patterns**:

| Pattern | MDC / Compose API | Relationship & Choreography | Platform & Direction Rules |
|---|---|---|---|
| **1. Container Transform** | `MaterialContainerTransform` / `SharedTransitionLayout` | Seamlessly morphs a shared persistent container (Card, List item, FAB, Search bar, Sheet, Carousel item) into a detailed view while fading outgoing inner content out before incoming content fades in. | Use for **hero moments** and **shallow hierarchies** (1 level deep). Do **not** use in deep utility Settings trees. |
| **2. Forward & Backward (Shared Axis)** | `MaterialSharedAxis` (`X`, `Y`, or `Z` axis, `forward = true/false`) | Navigates consecutive hierarchy levels (e.g., Inbox → Message thread, Onboarding step 1 → step 2). | **Android default**: Horizontal slide combined with a fade (reduces travel distance). **iOS default**: Full-width parallax slide. Set `transitionGroup="true"` on root containers so child list items don't scatter. |
| **3. Lateral** | Horizontal Pager / Tab slide | Navigates peer views at the **same hierarchy level** (Tabs, Carousels, photo galleries). | Elements slide in unison **without** fade or parallax, signaling horizontal swipeability. Never use for parent-child or top-level nav. |
| **4. Top Level (Fade Through)** | `MaterialFadeThrough` | Switches between unrelated top-level destinations (`NavigationBar`, `NavigationRail`, `NavigationDrawer`). | Outgoing destination **fully fades out** before incoming destination fades in. Never use lateral slide here (conflicts with swipeable lists/carousels). |
| **5. Enter & Exit** | `MaterialFade` / Slide + Expand | Introduces or dismisses contextual components either **within screen bounds** (Dialogs, Menus, Snackbars, FABs, Tooltips) or **beyond screen bounds** (App bars on scroll, Bottom/Side Sheets, Nav Drawers, Notifications). | **Android**: Expands/collapses along X or Y axis away from nearest screen edge (top menu expands down; bottom snackbar expands up; avoids Z-scale). **iOS**: Uniform scale-in + fade-out (within bounds) or rigid slide (beyond bounds). |
| **6. Skeleton Loaders** | Shimmer / Placeholder | Stabilizes layout immediately after launch or navigation before async data arrives. | Subtle pulsing animation sweeps **top-left to bottom-right**; real content quickly fades in over the skeleton without shifting layout coordinates. |

### Transition Quality & Accessibility Guardrails
- **Respect Reduced Motion (`prefers-reduced-motion: reduce`)**: When OS reduced-motion is enabled, replace intense sliding, scaling, parallax, and shape morphing with **short, simple cross-fades**.
- **Clean Fades (No Muddy Cross-Fades)**: Always fade out outgoing content completely before fading in incoming content. Never apply an opacity fade to a sliding Bottom Sheet (causes messy text-over-text transparency).
- **Unified Direction**: Group elements so they move along a single primary axis; do not animate multiple persistent elements along independent diagonal paths.
- **No Bouncy Springs on Full-Screen Transitions**: Keep high-frequency screen transitions smooth and simple; reserve bouncy overshoot springs for component-level interactions.

---

## 4. Material Symbols & Icons

**Material Symbols** is Google's variable icon font (`2,000+` glyphs) superseding static Material Icons. It is available in **3 styles** and exposes **4 continuous variable axes**.

### Three Visual Styles

| Style | Font Family Name | Corner Geometry | Best Paired With |
|---|---|---|---|
| **Outlined** *(Default)* | `Material Symbols Outlined` | `2dp` rounded exterior corners; **`0dp` square interior corners** | Clean, modern, or dense UIs. *(Note: Full-body human icons and proprietary logos remain solid-filled even in Outlined style for legibility.)* |
| **Rounded** | `Material Symbols Rounded` | **`2dp` rounded exterior and interior corners**; rounded terminals | Brands with heavier typography, circular elements, or soft expressive shapes. |
| **Sharp** | `Material Symbols Sharp` | **`0dp` square exterior and interior corners** | Editorial, rectilinear, or brutalist themes using `none`/`extra-small` or `cut` shapes. |

### Four Variable Axes (`wght`, `FILL`, `GRAD`, `opsz`)

| Axis Tag | Name | Range | Default | Rules & State Usage |
|---|---|---|---|---|
| `opsz` | **Optical Size** | `20` – `48` (`dp`/`px`) | **`24`** | Discrete stops: **`20dp`** (dense desktop UIs, dropdowns), **`24dp`** (standard baseline UI), **`40dp`** and **`48dp`** (large screens, display/headline pairings, hero actions). Automatically scales stroke thickness so `48dp` icons don't look bloated. |
| `wght` | **Weight** | `100` – `700` | **`400`** (`2dp` stroke) | Matches adjacent typography weight (`100` Thin to `700` Bold). **Minimum weight at `24dp` is `200`** (never use `100` at `24dp`). Maintain identical weight across all icons in a set. |
| `FILL` | **Fill** | `0` – `1` | **`0`** (Unfilled) | Transitions smoothly from outlined (`0`) to solid filled (`1`). Use `FILL 0 → 1` to signify **unselected → selected** states (e.g., `NavigationBar`, `NavigationRail`, toggle `IconButton`). |
| `GRAD` | **Grade** | `-25` – `+200` | **`0`** (Light UI) / **`-25`** (Dark UI) | Granular stroke thickness tweak that doesn't alter bounding size. Use **`0`** for dark icons on light backgrounds; use **`-25`** for light icons on dark backgrounds to compensate for optical halation/bleed; use **`+200`** for active/high-emphasis states. |

### Icon Design Grid, Live/Trim Area & Keyline Shapes (`24×24dp`)

When drawing custom icons at `100%` scale (`24×24dp` grid), snap all vertices **"on pixel"** (integer X/Y coordinates) and follow these exact geometric boundaries:

| Metric / Keyline | Dimensions (`24×24dp` Grid) | Specification |
|---|---|---|
| **Trim Area (Bounding Box)** | **`24 × 24dp`** | Absolute outer boundary. **Zero pixels may ever extend outside the `24×24dp` trim area.** |
| **Live Area** | **`20 × 20dp`** | Core safe zone centered inside the grid, surrounded by **`2dp` perimeter padding** on all 4 sides. Keep artwork inside the `20×20dp` live area; extend into the `2dp` padding only when optical weight requires it. |
| **Square Keyline** | **`18 × 18dp`** | Centered square guide (`3dp` inset from trim edges). |
| **Circle Keyline** | **`20dp` diameter** | Centered circular guide (`2dp` inset from trim edges). |
| **Vertical Rectangle Keyline** | **`20dp` H × `16dp` W** | Portrait guide (e.g., document/file icons). |
| **Horizontal Rectangle Keyline**| **`16dp` H × `20dp` W** | Landscape guide (e.g., mail envelope/card icons). |
| **Stroke & Counter Stroke** | **`2dp` width** (`400` weight) | Use `2dp` stroke and `2dp` negative-space counter clearance (`1.5dp` optical correction allowed only on complex multi-curve icons like paperclip or ramen bowl). |
| **Corners & Terminals** | **`2dp` exterior / `0dp` interior**| Shapes `≤ 2dp` wide have unrounded corners. Stroke terminals are squared (`90°`) or cut at **`45°`** (e.g., arrowheads, slashes) — never rounded in Outlined/Sharp sets. |
| **Perspective** | **Flat 2D front-facing** | Never tilt, rotate into 3D, or draw isometric depth on icons. |

### Typography Pairing, Target Sizes & Accessibility
- **Pairing with Text**: Match the symbol's `font-size` and optical weight (`wght`/`GRAD`) to the paired text. When aligning by baseline rather than flex-center, **shift the symbol's baseline down by `~11.5%` of the text size**.
- **Touch & Pointer Targets**:
  - Standard **`24dp`** icon → minimum **`48 × 48dp`** touch target (`44 × 44dp` pointer target).
  - Dense desktop **`20dp`** icon → minimum **`40 × 40dp`** pointer target.
- **Labels on Small/Abstract Icons**: Navigation destinations and any complex or key-action icons rendered **below `20dp`** must include an accompanying visible text label (plus descriptive accessibility labels that state the *action/purpose*, e.g., `"Voice search"`, never the visual object `"Microphone"` or role `"Button"`).

### RTL Icon Mirroring Rules (`dir="rtl"`)
- **✅ Mirror in RTL** (`transform: scaleX(-1)` or `autoMirrored = true`):
  - Directional navigation arrows (`arrow_back`, `arrow_forward`, `chevron_left`, `chevron_right`, `first_page`, `last_page`).
  - Communication & directional action icons (`send`, `reply`, `reply_all`, `launch`, `open_in_new`, `exit_to_app`, `redo`, `undo`).
  - Text-flow & list alignment icons (`format_align_left`, `list`, `notes`, `segment`, `short_text`, `toc`).
  - Help question mark (`help`) in **Arabic, Persian (Farsi), and Urdu** *(Note: Do **not** mirror `?` in Hebrew)*.
- **❌ Never Mirror in RTL**:
  - **Media playback controls & timelines**: Play, pause, fast-forward, rewind, skip next/previous, volume sliders, and media progress bars **always remain LTR** in all RTL languages.
  - **Clocks & circular time/refresh**: Analog clock hands (`schedule`), circular refresh arrows (`refresh`, `autorenew`), and circular progress indicators **always rotate clockwise**.
  - **Hebrew linear progress bars**: Non-media linear progress indicators fill right-to-left in Arabic/Persian/Urdu, but remain **LTR in Hebrew**.
  - **Universal / symmetric icons**: Search magnifying glass (`search`), checkmarks (`check` — never mirror checkmarks!), camera, trash, settings gear, lock, star.

---

## Implementation Notes

### Jetpack Compose (`MotionScheme`, `spring`, `Icon`, `autoMirrored`)
```kotlin
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.outlined.ArrowBack
import androidx.compose.material.icons.automirrored.outlined.Send
import androidx.compose.material3.*
import androidx.compose.runtime.Composable

// 1. M3 Expressive MotionScheme (Compose Material3 1.4+)
// MaterialTheme(motionScheme = MotionScheme.expressive()) { ... }
// Inside components, retrieve tokens via:
// val spatialSpec = MaterialTheme.motionScheme.fastSpatialSpec<Float>()
// val effectsSpec = MaterialTheme.motionScheme.fastEffectsSpec<Color>()

// Direct spring token values (from tokens/sys-tokens.md):
val FastSpatialSpring = spring<Float>(dampingRatio = 0.9f, stiffness = 1400f)
val DefaultSpatialSpring = spring<Float>(dampingRatio = 0.9f, stiffness = 700f)
val SlowSpatialSpring = spring<Float>(dampingRatio = 0.9f, stiffness = 300f)
val FastEffectsSpring = spring<Float>(dampingRatio = 1.0f, stiffness = 3800f)
val DefaultEffectsSpring = spring<Float>(dampingRatio = 1.0f, stiffness = 1600f)
val SlowEffectsSpring = spring<Float>(dampingRatio = 1.0f, stiffness = 800f)

// 2. AutoMirrored Directional Icons (automatically flips in RTL LayoutDirection)
@Composable
fun BackNavigationIcon(onClick: () -> Unit) {
    IconButton(onClick = onClick) { // 48.dp minimum touch target handled automatically
        Icon(
            imageVector = Icons.AutoMirrored.Outlined.ArrowBack,
            contentDescription = "Navigate up" // Describe purpose, never "Back arrow button"
        )
    }
}
```

### Flutter (`SpringSimulation`, `Curves`, `Icon`, `matchTextDirection`)
```dart
import 'package:flutter/material.dart';
import 'package:flutter/physics.dart';

// 1. Spring physics (Fast Spatial: stiffness = 1400, dampingRatio = 0.9)
final fastSpatialSpring = SpringDescription.withDampingRatio(
  mass: 1.0,
  stiffness: 1400.0,
  ratio: 0.9,
);

// Legacy M3 Emphasized & Standard easing curves:
const emphasizedCurve = Curves.easeInOutCubicEmphasized;
const emphasizedDecelerate = Cubic(0.05, 0.7, 0.1, 1.0);
const emphasizedAccelerate = Cubic(0.3, 0.0, 0.8, 0.15);

// 2. Material Symbols variable font & RTL auto-mirroring
const sendIcon = Icon(
  Icons.send_outlined,
  size: 24.0,
  opticalSize: 24.0,
  weight: 400.0,
  grade: 0.0, // Use -25.0 in Dark mode
  fill: 0.0,  // Animate 0.0 -> 1.0 on selection
  semanticLabel: 'Send message',
  matchTextDirection: true, // Mirrors in RTL
);
```

### Material Web & CSS Custom Properties (`--md-sys-motion-*`, `.material-symbols-outlined`)
```css
:root {
  /* M3 Expressive Spring-to-Cubic-Bezier Web Tokens */
  --md-sys-motion-spring-fast-spatial: cubic-bezier(0.42, 1.67, 0.21, 0.90);
  --md-sys-motion-spring-fast-spatial-duration: 350ms;
  --md-sys-motion-spring-default-spatial: cubic-bezier(0.38, 1.21, 0.22, 1.00);
  --md-sys-motion-spring-default-spatial-duration: 500ms;
  --md-sys-motion-spring-slow-spatial: cubic-bezier(0.39, 1.29, 0.35, 0.98);
  --md-sys-motion-spring-slow-spatial-duration: 650ms;

  --md-sys-motion-spring-fast-effects: cubic-bezier(0.31, 0.94, 0.34, 1.00);
  --md-sys-motion-spring-fast-effects-duration: 150ms;
  --md-sys-motion-spring-default-effects: cubic-bezier(0.34, 0.80, 0.34, 1.00);
  --md-sys-motion-spring-default-effects-duration: 200ms;
  --md-sys-motion-spring-slow-effects: cubic-bezier(0.34, 0.88, 0.34, 1.00);
  --md-sys-motion-spring-slow-effects-duration: 300ms;

  /* Standard (Non-Bouncy) Spatial Web Tokens */
  --md-sys-motion-spring-standard-fast-spatial: cubic-bezier(0.27, 1.06, 0.18, 1.00);
  --md-sys-motion-spring-standard-default-spatial: cubic-bezier(0.27, 1.06, 0.18, 1.00);

  /* Legacy Easing & Durations (for Screen Transitions) */
  --md-sys-motion-easing-emphasized-decelerate: cubic-bezier(0.05, 0.7, 0.1, 1.0);
  --md-sys-motion-easing-emphasized-accelerate: cubic-bezier(0.3, 0.0, 0.8, 0.15);
  --md-sys-motion-easing-standard: cubic-bezier(0.2, 0.0, 0.0, 1.0);
  --md-sys-motion-easing-standard-decelerate: cubic-bezier(0.0, 0.0, 0.0, 1.0);
  --md-sys-motion-easing-standard-accelerate: cubic-bezier(0.3, 0.0, 1.0, 1.0);
  --md-sys-motion-duration-short4: 200ms;
  --md-sys-motion-duration-medium2: 300ms;
  --md-sys-motion-duration-medium4: 400ms;
  --md-sys-motion-duration-long2: 500ms;
}

/* Reduced Motion Accessibility Override */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-timing-function: linear !important;
    transition-duration: 150ms !important;
  }
}

/* Material Symbols Variable Icon Font Setup */
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-size: 24px;
  line-height: 1;
  display: inline-block;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  transition: font-variation-settings var(--md-sys-motion-spring-fast-effects-duration)
              var(--md-sys-motion-spring-fast-effects);
}
.material-symbols-outlined.is-selected {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
@media (prefers-color-scheme: dark) {
  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' -25, 'opsz' 24;
  }
}
[dir="rtl"] .icon-directional {
  transform: scaleX(-1);
}
```

---

**Further reading:** `docs/pages/motion-overview.md`, `docs/pages/motion-easing-and-duration.md`, `docs/pages/motion-transitions.md`, `docs/pages/icons.md`, `docs/pages/bidirectionality-rtl.md`, `docs/blog/introducing-symbols.md`, `docs/blog/android-material-motion.md`, `docs/blog/motion-research-container-transform.md`, `tokens/sys-tokens.md`.
