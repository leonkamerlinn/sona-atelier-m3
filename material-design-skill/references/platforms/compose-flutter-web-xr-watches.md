# Platforms Overview, Material for XR & Material for Watches (Wear OS)

Platform implementation status across Jetpack Compose, MDC-Android, Flutter, and Web, plus complete design and component specifications for **Material for XR (Android XR)** and **Material for Watches (Wear OS)**.

Sources: `https://m3.material.io/develop`, `https://m3.material.io/develop/android/jetpack-compose`, `https://m3.material.io/develop/android/mdc-android`, `https://m3.material.io/develop/flutter`, `https://m3.material.io/develop/web`, `https://m3.material.io/foundations/xr/design`, `https://m3.material.io/foundations/xr/components`, `https://m3.material.io/foundations/watches`

---

## 1. Platform Implementation Overview & Status

Material Android is officially **Compose-first**. Choose your target framework based on the official maintenance and feature support matrix below:

| Platform / Library | Package / Artifact | Official Status | M3 Baseline Support | M3 Expressive Support | Key Notes & Migration Guidance |
|---|---|---|---|---|---|
| **Jetpack Compose** (Android, Wear OS, XR) | `androidx.compose.material3`<br>`androidx.wear.compose.material3`<br>`androidx.xr.compose.material3` | **Primary / Active Reference Implementation** | ✅ Full | ✅ **Full (First-party)** | Built in-house by the Material team; receives all new M3 Expressive components, spring motion tokens, Styles API, and `Navigation3` adaptive layouts first. |
| **Flutter** (Multi-platform) | `package:flutter/material.dart`<br>(`ThemeData(useMaterial3: true)`) | **Actively Maintained** (by Flutter team) | ✅ Full | ❌ **Not available** | Best M3 support for cross-platform apps. Supports original M3 components, dynamic color, and `flutter_adaptive_scaffold`, but does **not** include M3 Expressive. |
| **Android Views (MDC-Android)** | `com.google.android.material:material` | **Maintenance Mode** (`v1.14` is final release) | ✅ Full | ⚠️ Partial / Frozen at `1.14` | **MDC-Android 1.14 is the final stable release.** Receives critical bug fixes only—no new features. Migrate existing View apps to Jetpack Compose. |
| **Material Web (MWC)** | `@material/web` (`<md-*>`) | **Maintenance Mode** | ✅ Core set | ❌ **Not available** | No feature updates are being made to Material Web Components. *(Note: Angular Material `@angular/material` actively supports M3 on web, though specs may differ slightly).* |

---

## 2. Material for XR (Extended Reality / Android XR)

### Spatial Modes: Home Space vs. Full Space

| Mode | Environment & Multitasking | Spatial Capabilities Supported | Component Behavior |
|---|---|---|---|
| **Home Space** | Multiple apps run side-by-side in **passthrough** (blended physical environment). | Standard 2D windowing only. **No spatial panels, no orbiters, no Z-axis spatial elevation, no 3D models.** | Use standard 2D M3 components (co-planar App bar, Navigation bar/rail, Toolbar, Basic dialog). |
| **Full Space** | Single app takes center stage in **passthrough** or a **360° 3D virtual environment**. | Full spatial UI: **Spatial panels**, **Orbiters**, **Z-axis spatial elevation**, **3D models**, and **spatial audio**. | Navigation and action chrome detach into floating **Orbiters**; dialogs elevate along the Z-axis. |

### Spatial Panels: Exact Measurements, Ergonomics & Placement

Spatial panels are the fundamental 3D containers for UI and media in **Full Space**:

| Property | Specification | Design & Engineering Rules |
|---|---|---|
| **Default launch dimensions** | **`1024 × 720dp`** | Launches at `1024×720dp` with **`32dp` rounded corners**. |
| **Size limits (Full Space)** | **Min**: None<br>**Max**: **`2560 × 1800dp`** | Users can resize panels freely with one-handed gestures; Android XR automatically scales panel size with distance so legibility stays constant. |
| **Default launch distance** | **`1.75 meters`** | Optimal resting distance from the user on launch. |
| **Depth movement limits** | **Min**: **`0.75 meters`**<br>**Max**: **`5.0 meters`** | Keep interactive panels between `0.75m` and `5.0m` to prevent system UI conflicts and eye strain. |
| **Vertical eye-level offset** | **`5°` below eye level** | Place the vertical center of the primary spatial panel **`5°` below the user's horizon/eye level** for neck comfort across seated, standing, and reclined postures. |
| **Horizontal Field of View (FOV)** | **Center `41°` of FOV** | Place primary content and global orbiters within the **center `41°` of the user's field of view** so they can be seen without turning the head. |
| **Panel grouping layouts** | **Flat**, **Curved**, **Arbitrary** | • **Flat**: Straight horizontal line (best for side-by-side comparison).<br>• **Curved**: Angled around user (best for immersive media / wide dashboards).<br>• **Arbitrary**: Freely positioned in 3D space (best for multitasking). |
| **World-locked vs. Head-locked** | **World-locked** or **Lazy follow** | • **World-locked**: Anchored to a physical location (e.g., table in passthrough).<br>• **❌ Don't hard head-lock**: Never lock UI rigidly to head movement (causes discomfort). Use **lazy follow** (gently drifts to recenter) when head-tracking is needed. |
| **Containment, Contrast & Typography** | **`14dp` min body text**<br>`surface-container*` roles | Always use explicit containment with standard **`surface`** / **`surface-container*`** tokens so Android XR **automatically dims** bright passthrough backgrounds. Support both Light and Dark themes. |

### XR Multimodal Inputs, Targets, Motion & Feedback
- **Target Size Minimums in XR**:
  - **Interactive target**: **`56 × 56dp` minimum** (larger than the `48×48dp` 2D baseline to accommodate ray-casting and eye-tracking jitter).
  - **Visual affordance**: **`48 × 48dp` minimum**.
  - **Target offset**: **`4dp` offset** around each target (`8dp` total gap between adjacent targets; never overlap targets).
- **Hand & Eye Tracking**:
  - **Direct hand tracking**: Touch, grab, or push virtual objects within arm's reach.
  - **Ray-based hand tracking**: Laser ray extends from the hand to target distant UI; **index-finger + thumb pinch** selects.
  - **System navigation gesture**: **Turn palm up + pinch index finger and thumb** to summon the Android XR system menu (`Go back`, `Launcher`, `Recents`) anytime.
  - **Eye tracking**: Gaze triggers `Hover` state (`8%` state layer); dwell control selects.
  - **One-handed rule (`✅ Do` / `❌ Don't`)**: Every action must be achievable with **one hand**, voice, or eye tracking. **Never require two-handed gestures or repetitive large arm movements.**
- **Voice, Keyboard, Mouse & 6DoF Controllers**: Support voice dictation and commands (`"Open Settings"`, `"Go back"`), Bluetooth keyboard/mouse for text-heavy work, and 6DoF controllers (with user-toggleable haptics).
- **Preventing Motion Sickness**:
  - Use **`md.sys.motion.easing.standard`** and **`md.sys.motion.duration.long1–long4` (`450–600ms`)** tokens for spatial transitions.
  - Maintain a **stable horizon line** at all times.
  - **Avoid continuous camera motion** (`⚠️ Caution`); use **teleportation / instant jump** to change locations, or apply **tunnel vision / vignetting** to narrow FOV during movement.
- **Feedback**: Combine visual cues (focus rings, hover state layers, Z-axis spatial elevation), **3D spatial audio** (positional click emitters on buttons), and **haptics**.

---

## 3. Material XR Component Adaptations (Full Space Specs)

In **Full Space**, five M3 components adapt into 3D **Orbiters** or **Spatially Elevated** surfaces (`androidx.xr.compose.material3`).

### Master XR Component Specification Table

| XR Component | Variants & Alignment | Allowed Container Color Roles (Spatial Elevation) | Context & Anchoring | Offset vs. Inset & Placement Rules |
|---|---|---|---|---|
| **1. App Bar Orbiter** | **1 variant** (matches Small App Bar):<br>• `Center-aligned` (default)<br>• `Left-aligned` (or `Right-aligned` in RTL) | • `surface-container`<br>• `surface-container-high`<br>• `surface-container-highest` | **Global context (Recommended)**: 1 orbiter centered at top of app.<br>**Local context (`⚠️ Caution`)**: Centered at top of a specific panel (only if actions affect solely that panel). | • **Offset**: **`20dp`** gap above spatial panel.<br>• **Inset**: **`12dp`** overlap with panel (**❌ never overlap `> 12dp`**).<br>• **Width**: Must stay within adjacent panel width and user's `41°` FOV (**❌ never exceed panel width**). |
| **2. Spatial Dialog** | **Basic dialog only** (`✅ Do`).<br>**❌ Never use Full-screen dialogs** in XR (actions fall outside FOV). | • `surface-container-high`<br>• `surface-container-highest`<br>*(Must be the brightest/highest element in the app; manual color override required in Compose).* | **Highest Z-axis resting level** above all panels and orbiters + **mandatory Scrim** at the app panel plane (`✅ Do`). | • **Motion**: Scales uniformly + fades in/out while rising on Z-axis using **`standard` easing + `long` duration**; scrim stays flat on panel plane and only fades.<br>• **FOV**: Centered in user's FOV (use **lazy follow** if head-tracked). |
| **3. Navigation Bar Orbiter** | **1 horizontal bottom orbiter** (Container, Icon, Active indicator, Small/Large badge, Label text). | • `surface-container`<br>• `surface-container-high`<br>• `surface-container-highest`<br>• `tertiary-container` | **Global context**: Centered at bottom of app.<br>**Local context (`⚠️ Caution`)**: Centered at bottom of a single panel.<br>*Use Nav Bar instead of Nav Rail when layout spans `> 2` spatial panels.* | • **Offset (Global)**: **`20dp`** below spatial panel.<br>• **Inset (Local)**: **`12dp`** overlap (**❌ never overlap `> 50%` of orbiter height**).<br>• **❌ Never** place at top of panel; **❌ never** exceed panel width. |
| **4. Navigation Rail Orbiter** | **2 FAB variants**:<br>1. **Contained FAB rail** (FAB inside rail)<br>2. **Spatialized FAB rail** (FAB becomes its own separate orbiter **`20dp`** above/below rail) | 4 paired combinations:<br>1. `surface-container` + `tertiary` FAB<br>2. `surface-container-high` + `tertiary-fixed-dim` FAB<br>3. `surface-container-highest` + `tertiary-fixed-dim` FAB<br>4. `tertiary-container` + `primary` FAB | **Global context ONLY (`✅ Do`)**: Centered along leading (left in LTR, right in RTL) outer edge of the app.<br>**❌ Never** place in local context or **between two spatial panels**. | • **Offset (Global)**: **`20dp`** from panel edge.<br>• **Inset**: **`12dp`** overlap (**❌ never overlap `> 50%` of rail width**).<br>• **Vertical alignment**: Top, middle, or center; **❌ never exceed panel height** (including Spatialized FAB). |
| **5. Toolbar Orbiter** | **1 floating toolbar orbiter**:<br>• `HorizontalFloatingToolbar`<br>• `VerticalFloatingToolbar`<br>Internal padding: **`12dp`** | • `surface-container`<br>• `surface-container-high`<br>• `surface-container-highest`<br>• `tertiary-container` | **Local context (Recommended)**: Centered at bottom (or edge) of the panel it controls.<br>**Global context (`⚠️ Caution`)**: Centered at bottom of app.<br>Can expand/collapse when **`> 5 items`** (e.g., `5` → `10` items). | • **Offset**: **`20dp`** from panel.<br>• **Inset**: **`12dp`** overlap (**❌ never overlap `> 12dp`**).<br>• **Bounds**: Must stay within panel width/height even when expanded.<br>• **❌ Never** place a vertical toolbar between two spatial panels. |

---

## 4. Material for Watches / Wear OS (M3 Expressive)

Material for Wear OS (`androidx.wear.compose.material3`) brings **M3 Expressive** to round smartwatch displays with edge-hugging shapes, physics-based springs, pure-black battery-saving themes, and curved typography.

### Watch Hardware & Surface Anatomy

| Watch Element | Function & Design Rules |
|---|---|
| **Watch Face, Complications & Ongoing Activities** | • **Watch face**: Primary home screen showing time and app/tile entry points.<br>• **Complications**: Glanceable data slots on the watch face (heart rate, weather, date, progress).<br>• **Ongoing activities**: Live indicator on the watch face linking directly to an active workout, timer, or media session. |
| **Physical Buttons (3 Types)** | 1. **Rotating side button (Crown)**: Scrolls lists/options or adjusts volume (pair with subtle haptics).<br>2. **System button**: Reserved for OS power/system actions (cannot be overridden by apps).<br>3. **Multifunction button**: App-customizable physical trigger (e.g., start/lap/stop a stopwatch). |
| **Standard App Screen Anatomy** | 1. **Time text** (curved at top edge on almost all screens)<br>2. **Page title**<br>3. **Scroll indicator** (curved along bezel on scrolling screens)<br>4. **Edge-hugging action button** (conforms to bottom circular bezel) |
| **Non-Scrolling Layouts** | Single-screen focused interactions where all controls fit without scrolling: **media players, timers, pickers/switchers, fitness readouts, confirmation dialogs**. |
| **Scrolling Layouts** | Vertically scrolling lists for content exceeding screen height: **message threads, contact lists, settings menus**. Place the most important content at the top. |
| **Tiles** | Fast, swipe-accessible widgets adjacent to the watch face. **Fixed screen height—never scroll.** Use for glanceable status or 1–3 quick actions + an edge-hugging "More" button. |
| **Always-On Display (AOD) / Ambient Mode** | Keeps ongoing timers/workouts visible when the wrist drops. **Minimize illuminated pixels** and animations to prevent burn-in and battery drain. |

### Adaptive Design for Round Watch Screens (`192dp` vs. `225dp+`)
1. **Design for small watches first (`192dp` diameter)**: Baseline layouts must fit comfortably on a **`192dp`** circular screen (e.g., displaying 3 quick-alarm buttons `5, 10, 15 min` + an edge-hugging `More` button).
2. **Reveal more content on large watches (`> 225dp` diameter)**: On watches larger than **`225dp`**, take advantage of the extra area to reveal additional controls, text lines, or data (e.g., displaying 5 quick-alarm buttons `5, 10, 15, 20, 30 min` + `More`).
3. **Use percentage-based margins and padding**: Always specify outer margins and padding as **percentages of screen dimensions** rather than fixed `dp` values so content stays centered and never clips against the curved bezel as screen sizes or accessibility font scales change.
4. **Keep interactions brief & offline-ready**: Limit screens to 1–2 focused tasks (never build multi-column calendar grids), and support offline caching with clear offline indicators/dialogs.

### Watch Color System ("Build from Black")
- **Pure Black Background (`#000000`)**: Wear OS apps always build from a **`#000000` black background** (never tinted light/dark surfaces) to maximize OLED battery life and blend seamlessly with the physical watch bezel.
- **Contrast-Safe Pairing Rules**:
  - **✅ Do**: Pair **`on-primary`** content on **`primary`** containers, and **`on-primary-container`** content on **`primary-container`** containers.
  - **❌ Don't**: **Never place `primary-dim` text/icons on `primary` or `primary-container` backgrounds**—it becomes illegible as contrast levels shift.
- **Recommended Multi-Control Color Pairings on Wear OS**:
  - **Primary emphasis + Tap feedback**: Use **`primary-dim`** for resting buttons (e.g., keypad keys) and **`tertiary`** for active/pressed state feedback (or **`primary`** center button flanked by **`primary-dim`** side buttons).
  - **Three distinct actions** (e.g., Call / Open / Open on phone): Pair **`tertiary`** + **`primary`** + **`secondary-container`** (or **`primary`** + **`tertiary`** + **`primary-container`**).
  - **Two equally important options/containers**: Pair **`secondary`** + **`primary-container`**, **`primary`** + **`tertiary-dim`**, or **`primary-dim`** + **`tertiary-dim`**.

### Watch Typography (`Roboto Flex`: Arc & Numeral Styles)
In addition to the round-screen-optimized baseline type scale, M3 Expressive on Wear OS introduces two specialized type roles:
1. **Arc Text (`Arc Large`, etc.)**: Curved typography rendered along the top or bottom bezel of a circular screen with custom character tracking for legibility along an arc. Use for **curved page titles, time readouts, confirmation overlays, and edge-hugging CTAs** (e.g., `"Check your phone"`).
2. **Numeral Text (`Numeral Large`, etc.)**: Oversized, expressive display styles using `Roboto Flex` for short numeric strings (**time, heart rate BPM, countdown timers, workout stats**). Because digits don't expand during localization, Numeral roles can use much larger scale and weight than translatable text.

### Watch Motion, Shape Morphing & Haptics
- **Edge-hugging shapes & Shape morphing**: Buttons and containers hug the circular screen perimeter and **morph corner radii on press/selection** (e.g., number pad keys morphing from pill/rounded to squarish when tapped).
- **Haptics**: Pair system haptic tokens with spring motion and audio:
  - **Strong haptics**: High-importance completions (e.g., NFC payment accepted, workout completed).
  - **Subtle haptics**: High-frequency precision ticks (e.g., scrolling a list or adjusting volume with the rotating side button).

---

## 5. Implementation Notes

### Jetpack Compose for Android, XR & Wear OS
- **Android Mobile / Large Screen (`androidx.compose.material3`)**:
  - `MaterialTheme` (or `MaterialExpressiveTheme`), `Scaffold`, `NavigationSuiteScaffold`, `ListDetailPaneScaffold`, `SupportingPaneScaffold`.
- **Android XR (`androidx.xr.compose.material3` & `androidx.xr.compose`)**:
  - Wrap your `MaterialTheme` with `EnableXrComponentOverrides` so standard M3 `TopAppBar`, `NavigationBar`, `NavigationRail`, `HorizontalFloatingToolbar`, and `AlertDialog` automatically elevate into **Orbiters** and **Spatial Dialogs** when running in **Full Space**.
  - Use `SpatialPanel(modifier = SubspaceModifier.width(1024.dp).height(720.dp).movable().resizable())` and `Orbiter(position = OrbiterEdge.Top, offset = 20.dp)`.
- **Wear OS (`androidx.wear.compose.material3`)**:
  - Use `AppScaffold` + `ScreenScaffold` (manages `TimeText` at top and `ScrollIndicator` on bezel), `TransformingLazyColumn` (scales/morphs items along the curved bezel), `EdgeButton` (edge-hugging bottom CTA), `CurvedText` (Arc typography), and `Button` / `FilledTonalButton` with shape morphing.

### Flutter (Material 3)
```dart
MaterialApp(
  theme: ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: const Color(0xFF6750A4),
      brightness: Brightness.light,
    ),
  ),
  home: const MyAdaptiveHomePage(),
);
```

### Material Web (Maintenance Mode) / CSS Custom Properties
```html
<!-- Material Web (Maintenance Mode): uses --md-sys-* custom properties -->
<md-filled-button>Start session</md-filled-button>
<md-outlined-text-field label="Email"></md-outlined-text-field>
```

---

Further reading: `docs/pages/develop.md`, `docs/pages/jetpack-compose.md`, `docs/pages/mdc-android.md`, `docs/pages/flutter.md`, `docs/pages/web.md`, `docs/pages/xr-design.md`, `docs/pages/xr-components.md`, `docs/pages/watches.md`.
