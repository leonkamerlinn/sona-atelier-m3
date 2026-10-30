# Material 3 system & reference tokens (resolved)

Extracted from the token databases embedded in m3.material.io spec pages (DSDB v38.x, Oct 2026).
Context: **3P (baseline) audience**, default contrast, Android platform. Light / Dark theme columns.
This table contains every `md.sys.*` / `md.ref.*` token referenced by any component token set. For color roles not referenced by components (fixed colors, surface-dim/bright, etc.) see `references/styles/color.md` and `templates/m3-tokens.css`.

## `md.sys.color`

| Token | Reference | Light | Dark |
|---|---|---|---|
| `md.sys.color.error` | `md.ref.palette.error40` | #B3261E | #F2B8B5 |
| `md.sys.color.inverse-on-surface` | `md.ref.palette.neutral95` | #F5EFF7 | #322F35 |
| `md.sys.color.inverse-primary` | `md.ref.palette.primary80` | #D0BCFF | #6750A4 |
| `md.sys.color.inverse-surface` | `md.ref.palette.neutral20` | #322F35 | #E6E0E9 |
| `md.sys.color.on-error` | `md.ref.palette.error100` | #FFFFFF | #601410 |
| `md.sys.color.on-error-container` | `md.ref.palette.error30` | #8C1D18 | #F9DEDC |
| `md.sys.color.on-primary` | `md.ref.palette.primary100` | #FFFFFF | #381E72 |
| `md.sys.color.on-primary-container` | `md.ref.palette.primary30` | #4F378B | #EADDFF |
| `md.sys.color.on-secondary` | `md.ref.palette.secondary100` | #FFFFFF | #332D41 |
| `md.sys.color.on-secondary-container` | `md.ref.palette.secondary30` | #4A4458 | #E8DEF8 |
| `md.sys.color.on-surface` | `md.ref.palette.neutral10` | #1D1B20 | #E6E0E9 |
| `md.sys.color.on-surface-variant` | `md.ref.palette.neutral-variant30` | #49454F | #CAC4D0 |
| `md.sys.color.on-tertiary` | `md.ref.palette.tertiary100` | #FFFFFF | #492532 |
| `md.sys.color.on-tertiary-container` | `md.ref.palette.tertiary30` | #633B48 | #FFD8E4 |
| `md.sys.color.outline` | `md.ref.palette.neutral-variant50` | #79747E | #938F99 |
| `md.sys.color.outline-variant` | `md.ref.palette.neutral-variant80` | #CAC4D0 | #49454F |
| `md.sys.color.primary` | `md.ref.palette.primary40` | #6750A4 | #D0BCFF |
| `md.sys.color.primary-container` | `md.ref.palette.primary90` | #EADDFF | #4F378B |
| `md.sys.color.secondary` | `md.ref.palette.secondary40` | #625B71 | #CCC2DC |
| `md.sys.color.secondary-container` | `md.ref.palette.secondary90` | #E8DEF8 | #4A4458 |
| `md.sys.color.shadow` | `md.ref.palette.neutral0` | #000000 | = |
| `md.sys.color.surface` | `md.ref.palette.neutral98` | #FEF7FF | #141218 |
| `md.sys.color.surface-container` | `md.ref.palette.neutral94` | #F3EDF7 | #211F26 |
| `md.sys.color.surface-container-high` | `md.ref.palette.neutral92` | #ECE6F0 | #2B2930 |
| `md.sys.color.surface-container-highest` | `md.ref.palette.neutral90` | #E6E0E9 | #36343B |
| `md.sys.color.surface-container-low` | `md.ref.palette.neutral96` | #F7F2FA | #1D1B20 |
| `md.sys.color.surface-tint` | `md.sys.color.primary` | #6750A4 | #D0BCFF |
| `md.sys.color.surface-variant` | `md.ref.palette.neutral-variant90` | #E7E0EC | #49454F |
| `md.sys.color.tertiary` | `md.ref.palette.tertiary40` | #7D5260 | #EFB8C8 |
| `md.sys.color.tertiary-container` | `md.ref.palette.tertiary90` | #FFD8E4 | #633B48 |

## `md.ref.palette`

| Token | Reference | Light | Dark |
|---|---|---|---|
| `md.ref.palette.error0` |  | #000000 | = |
| `md.ref.palette.error10` |  | #410E0B | = |
| `md.ref.palette.error100` |  | #FFFFFF | = |
| `md.ref.palette.error20` |  | #601410 | = |
| `md.ref.palette.error30` |  | #8C1D18 | = |
| `md.ref.palette.error40` |  | #B3261E | = |
| `md.ref.palette.error80` |  | #F2B8B5 | = |
| `md.ref.palette.error90` |  | #F9DEDC | = |
| `md.ref.palette.error95` |  | #FCEEEE | = |
| `md.ref.palette.neutral-variant0` |  | #000000 | = |
| `md.ref.palette.neutral-variant100` |  | #FFFFFF | = |
| `md.ref.palette.neutral-variant20` |  | #322F37 | = |
| `md.ref.palette.neutral-variant30` |  | #49454F | = |
| `md.ref.palette.neutral-variant50` |  | #79747E | = |
| `md.ref.palette.neutral-variant60` |  | #938F99 | = |
| `md.ref.palette.neutral-variant70` |  | #AEA9B4 | = |
| `md.ref.palette.neutral-variant80` |  | #CAC4D0 | = |
| `md.ref.palette.neutral-variant90` |  | #E7E0EC | = |
| `md.ref.palette.neutral-variant95` |  | #F5EEFA | = |
| `md.ref.palette.neutral0` |  | #000000 | = |
| `md.ref.palette.neutral10` |  | #1D1B20 | = |
| `md.ref.palette.neutral100` |  | #FFFFFF | = |
| `md.ref.palette.neutral12` |  | #211F26 | = |
| `md.ref.palette.neutral17` |  | #2B2930 | = |
| `md.ref.palette.neutral20` |  | #322F35 | = |
| `md.ref.palette.neutral22` |  | #36343B | = |
| `md.ref.palette.neutral6` |  | #141218 | = |
| `md.ref.palette.neutral90` |  | #E6E0E9 | = |
| `md.ref.palette.neutral92` |  | #ECE6F0 | = |
| `md.ref.palette.neutral94` |  | #F3EDF7 | = |
| `md.ref.palette.neutral95` |  | #F5EFF7 | = |
| `md.ref.palette.neutral96` |  | #F7F2FA | = |
| `md.ref.palette.neutral98` |  | #FEF7FF | = |
| `md.ref.palette.primary0` |  | #000000 | = |
| `md.ref.palette.primary10` |  | #21005D | = |
| `md.ref.palette.primary100` |  | #FFFFFF | = |
| `md.ref.palette.primary20` |  | #381E72 | = |
| `md.ref.palette.primary30` |  | #4F378B | = |
| `md.ref.palette.primary40` |  | #6750A4 | = |
| `md.ref.palette.primary50` |  | #7F67BE | = |
| `md.ref.palette.primary60` |  | #9A82DB | = |
| `md.ref.palette.primary80` |  | #D0BCFF | = |
| `md.ref.palette.primary90` |  | #EADDFF | = |
| `md.ref.palette.primary95` |  | #F6EDFF | = |
| `md.ref.palette.secondary0` |  | #000000 | = |
| `md.ref.palette.secondary10` |  | #1D192B | = |
| `md.ref.palette.secondary100` |  | #FFFFFF | = |
| `md.ref.palette.secondary20` |  | #332D41 | = |
| `md.ref.palette.secondary30` |  | #4A4458 | = |
| `md.ref.palette.secondary40` |  | #625B71 | = |
| `md.ref.palette.secondary60` |  | #958DA5 | = |
| `md.ref.palette.secondary80` |  | #CCC2DC | = |
| `md.ref.palette.secondary90` |  | #E8DEF8 | = |
| `md.ref.palette.secondary95` |  | #F6EDFF | = |
| `md.ref.palette.tertiary0` |  | #000000 | = |
| `md.ref.palette.tertiary10` |  | #31111D | = |
| `md.ref.palette.tertiary100` |  | #FFFFFF | = |
| `md.ref.palette.tertiary20` |  | #492532 | = |
| `md.ref.palette.tertiary30` |  | #633B48 | = |
| `md.ref.palette.tertiary40` |  | #7D5260 | = |
| `md.ref.palette.tertiary60` |  | #B58392 | = |
| `md.ref.palette.tertiary80` |  | #EFB8C8 | = |
| `md.ref.palette.tertiary90` |  | #FFD8E4 | = |
| `md.ref.palette.tertiary95` |  | #FFECF1 | = |

## `md.sys.typescale`

| Token | Reference | Light | Dark |
|---|---|---|---|
| `md.sys.typescale.body-large` |  | typescale(fontName=md.sys.typescale.body-large.font, fontWeight=md.sys.typescale.body-large.weight, fontSize=md.sys.typescale.body-large.size, fontTracking=md.sys.typescale.body-large.tracking, lineHeight=md.sys.typescale.body-large.line-height) | = |
| `md.sys.typescale.body-large.font` | `md.ref.typeface.plain` | font Roboto | = |
| `md.sys.typescale.body-large.line-height` |  | 24pt | = |
| `md.sys.typescale.body-large.size` |  | 16pt | = |
| `md.sys.typescale.body-large.tracking` |  | 0.5pt | = |
| `md.sys.typescale.body-large.weight` | `md.ref.typeface.weight-regular` | weight 400 | = |
| `md.sys.typescale.body-medium.font` | `md.ref.typeface.plain` | font Roboto | = |
| `md.sys.typescale.body-medium.line-height` |  | 20pt | = |
| `md.sys.typescale.body-medium.size` |  | 14pt | = |
| `md.sys.typescale.body-medium.tracking` |  | 0.25pt | = |
| `md.sys.typescale.body-medium.weight` | `md.ref.typeface.weight-regular` | weight 400 | = |
| `md.sys.typescale.body-small.font` | `md.ref.typeface.plain` | font Roboto | = |
| `md.sys.typescale.body-small.line-height` |  | 16pt | = |
| `md.sys.typescale.body-small.size` |  | 12pt | = |
| `md.sys.typescale.body-small.tracking` |  | 0.4pt | = |
| `md.sys.typescale.body-small.weight` | `md.ref.typeface.weight-regular` | weight 400 | = |
| `md.sys.typescale.display-large.font` | `md.ref.typeface.brand` | font Roboto | = |
| `md.sys.typescale.display-large.line-height` |  | 64pt | = |
| `md.sys.typescale.display-large.size` |  | 57pt | = |
| `md.sys.typescale.display-large.tracking` |  | -0.25pt | = |
| `md.sys.typescale.display-large.weight` | `md.ref.typeface.weight-regular` | weight 400 | = |
| `md.sys.typescale.display-medium.font` | `md.ref.typeface.brand` | font Roboto | = |
| `md.sys.typescale.display-medium.line-height` |  | 52pt | = |
| `md.sys.typescale.display-medium.size` |  | 45pt | = |
| `md.sys.typescale.display-medium.tracking` |  | 0pt | = |
| `md.sys.typescale.display-medium.weight` | `md.ref.typeface.weight-regular` | weight 400 | = |
| `md.sys.typescale.display-small` |  | typescale(fontName=md.sys.typescale.display-small.font, fontWeight=md.sys.typescale.display-small.weight, fontSize=md.sys.typescale.display-small.size, fontTracking=md.sys.typescale.display-small.tracking, lineHeight=md.sys.typescale.display-small.line-height) | = |
| `md.sys.typescale.display-small.font` | `md.ref.typeface.brand` | font Roboto | = |
| `md.sys.typescale.display-small.line-height` |  | 44pt | = |
| `md.sys.typescale.display-small.size` |  | 36pt | = |
| `md.sys.typescale.display-small.tracking` |  | 0pt | = |
| `md.sys.typescale.display-small.weight` | `md.ref.typeface.weight-regular` | weight 400 | = |
| `md.sys.typescale.headline-large` |  | typescale(fontName=md.sys.typescale.headline-large.font, fontWeight=md.sys.typescale.headline-large.weight, fontSize=md.sys.typescale.headline-large.size, fontTracking=md.sys.typescale.headline-large.tracking, lineHeight=md.sys.typescale.headline-large.line-height) | = |
| `md.sys.typescale.headline-large.font` | `md.ref.typeface.brand` | font Roboto | = |
| `md.sys.typescale.headline-large.line-height` |  | 40pt | = |
| `md.sys.typescale.headline-large.size` |  | 32pt | = |
| `md.sys.typescale.headline-large.tracking` |  | 0pt | = |
| `md.sys.typescale.headline-large.weight` | `md.ref.typeface.weight-regular` | weight 400 | = |
| `md.sys.typescale.headline-medium` |  | typescale(fontName=md.sys.typescale.headline-medium.font, fontWeight=md.sys.typescale.headline-medium.weight, fontSize=md.sys.typescale.headline-medium.size, fontTracking=md.sys.typescale.headline-medium.tracking, lineHeight=md.sys.typescale.headline-medium.line-height) | = |
| `md.sys.typescale.headline-medium.font` | `md.ref.typeface.brand` | font Roboto | = |
| `md.sys.typescale.headline-medium.line-height` |  | 36pt | = |
| `md.sys.typescale.headline-medium.size` |  | 28pt | = |
| `md.sys.typescale.headline-medium.tracking` |  | 0pt | = |
| `md.sys.typescale.headline-medium.weight` | `md.ref.typeface.weight-regular` | weight 400 | = |
| `md.sys.typescale.headline-small` |  | typescale(fontName=md.sys.typescale.headline-small.font, fontWeight=md.sys.typescale.headline-small.weight, fontSize=md.sys.typescale.headline-small.size, fontTracking=md.sys.typescale.headline-small.tracking, lineHeight=md.sys.typescale.headline-small.line-height) | = |
| `md.sys.typescale.headline-small.font` | `md.ref.typeface.brand` | font Roboto | = |
| `md.sys.typescale.headline-small.line-height` |  | 32pt | = |
| `md.sys.typescale.headline-small.size` |  | 24pt | = |
| `md.sys.typescale.headline-small.tracking` |  | 0pt | = |
| `md.sys.typescale.headline-small.weight` | `md.ref.typeface.weight-regular` | weight 400 | = |
| `md.sys.typescale.label-large` |  | typescale(fontName=md.sys.typescale.label-large.font, fontWeight=md.sys.typescale.label-large.weight, fontSize=md.sys.typescale.label-large.size, fontTracking=md.sys.typescale.label-large.tracking, lineHeight=md.sys.typescale.label-large.line-height) | = |
| `md.sys.typescale.label-large.font` | `md.ref.typeface.plain` | font Roboto | = |
| `md.sys.typescale.label-large.line-height` |  | 20pt | = |
| `md.sys.typescale.label-large.size` |  | 14pt | = |
| `md.sys.typescale.label-large.tracking` |  | 0.1pt | = |
| `md.sys.typescale.label-large.weight` | `md.ref.typeface.weight-medium` | weight 500 | = |
| `md.sys.typescale.label-large.weight.prominent` | `md.ref.typeface.weight-bold` | weight 700 | = |
| `md.sys.typescale.label-medium` |  | typescale(fontName=md.sys.typescale.label-medium.font, fontWeight=md.sys.typescale.label-medium.weight, fontSize=md.sys.typescale.label-medium.size, fontTracking=md.sys.typescale.label-medium.tracking, lineHeight=md.sys.typescale.label-medium.line-height) | = |
| `md.sys.typescale.label-medium.font` | `md.ref.typeface.plain` | font Roboto | = |
| `md.sys.typescale.label-medium.line-height` |  | 16pt | = |
| `md.sys.typescale.label-medium.size` |  | 12pt | = |
| `md.sys.typescale.label-medium.tracking` |  | 0.5pt | = |
| `md.sys.typescale.label-medium.weight` | `md.ref.typeface.weight-medium` | weight 500 | = |
| `md.sys.typescale.label-medium.weight.prominent` | `md.ref.typeface.weight-bold` | weight 700 | = |
| `md.sys.typescale.label-small.font` | `md.ref.typeface.plain` | font Roboto | = |
| `md.sys.typescale.label-small.line-height` |  | 16pt | = |
| `md.sys.typescale.label-small.size` |  | 11pt | = |
| `md.sys.typescale.label-small.tracking` |  | 0.5pt | = |
| `md.sys.typescale.label-small.weight` | `md.ref.typeface.weight-medium` | weight 500 | = |
| `md.sys.typescale.title-large` |  | typescale(fontName=md.sys.typescale.title-large.font, fontWeight=md.sys.typescale.title-large.weight, fontSize=md.sys.typescale.title-large.size, fontTracking=md.sys.typescale.title-large.tracking, lineHeight=md.sys.typescale.title-large.line-height) | = |
| `md.sys.typescale.title-large.font` | `md.ref.typeface.brand` | font Roboto | = |
| `md.sys.typescale.title-large.line-height` |  | 28pt | = |
| `md.sys.typescale.title-large.size` |  | 22pt | = |
| `md.sys.typescale.title-large.tracking` |  | 0pt | = |
| `md.sys.typescale.title-large.weight` | `md.ref.typeface.weight-regular` | weight 400 | = |
| `md.sys.typescale.title-medium` |  | typescale(fontName=md.sys.typescale.title-medium.font, fontWeight=md.sys.typescale.title-medium.weight, fontSize=md.sys.typescale.title-medium.size, fontTracking=md.sys.typescale.title-medium.tracking, lineHeight=md.sys.typescale.title-medium.line-height) | = |
| `md.sys.typescale.title-medium.font` | `md.ref.typeface.plain` | font Roboto | = |
| `md.sys.typescale.title-medium.line-height` |  | 24pt | = |
| `md.sys.typescale.title-medium.size` |  | 16pt | = |
| `md.sys.typescale.title-medium.tracking` |  | 0.15pt | = |
| `md.sys.typescale.title-medium.weight` | `md.ref.typeface.weight-medium` | weight 500 | = |
| `md.sys.typescale.title-small.font` | `md.ref.typeface.plain` | font Roboto | = |
| `md.sys.typescale.title-small.line-height` |  | 20pt | = |
| `md.sys.typescale.title-small.size` |  | 14pt | = |
| `md.sys.typescale.title-small.tracking` |  | 0.1pt | = |
| `md.sys.typescale.title-small.weight` | `md.ref.typeface.weight-medium` | weight 500 | = |

## `md.ref.typeface`

| Token | Reference | Light | Dark |
|---|---|---|---|
| `md.ref.typeface.brand` |  | font Roboto | = |
| `md.ref.typeface.plain` |  | font Roboto | = |
| `md.ref.typeface.weight-bold` |  | weight 700 | = |
| `md.ref.typeface.weight-medium` |  | weight 500 | = |
| `md.ref.typeface.weight-regular` |  | weight 400 | = |

## `md.sys.shape`

| Token | Reference | Light | Dark |
|---|---|---|---|
| `md.sys.shape.corner-value.extra-extra-large` |  | 48dp | = |
| `md.sys.shape.corner-value.extra-large` |  | 28dp | = |
| `md.sys.shape.corner-value.extra-large-increased` |  | 32dp | = |
| `md.sys.shape.corner-value.extra-small` |  | 4dp | = |
| `md.sys.shape.corner-value.large` |  | 16dp | = |
| `md.sys.shape.corner-value.large-increased` |  | 20dp | = |
| `md.sys.shape.corner-value.medium` |  | 12dp | = |
| `md.sys.shape.corner-value.none` |  | 0dp | = |
| `md.sys.shape.corner-value.small` |  | 8dp | = |
| `md.sys.shape.corner.extra-extra-large` |  | rounded 48dp | = |
| `md.sys.shape.corner.extra-large` |  | rounded 28dp | = |
| `md.sys.shape.corner.extra-large-increased` |  | rounded 32dp | = |
| `md.sys.shape.corner.extra-large.top` |  | rounded 0dp topLeft=28dp topRight=28dp | = |
| `md.sys.shape.corner.extra-small` |  | rounded 4dp | = |
| `md.sys.shape.corner.extra-small.top` |  | rounded 0dp topLeft=4dp topRight=4dp | = |
| `md.sys.shape.corner.full` |  | full (circular) | = |
| `md.sys.shape.corner.large` |  | rounded 16dp | = |
| `md.sys.shape.corner.large-increased` |  | rounded 20dp | = |
| `md.sys.shape.corner.large.end` |  | rounded 0dp topRight=16dp bottomRight=16dp | = |
| `md.sys.shape.corner.large.start` |  | rounded 0dp topLeft=16dp bottomLeft=16dp | = |
| `md.sys.shape.corner.large.top` |  | rounded 0dp topLeft=16dp topRight=16dp | = |
| `md.sys.shape.corner.medium` |  | rounded 12dp | = |
| `md.sys.shape.corner.none` |  | rounded 0dp | = |
| `md.sys.shape.corner.small` |  | rounded 8dp | = |

## `md.sys.elevation`

| Token | Reference | Light | Dark |
|---|---|---|---|
| `md.sys.elevation.level0` |  | 0dp | = |
| `md.sys.elevation.level1` |  | 1dp | = |
| `md.sys.elevation.level2` |  | 3dp | = |
| `md.sys.elevation.level3` |  | 6dp | = |
| `md.sys.elevation.level4` |  | 8dp | = |

## `md.sys.state`

| Token | Reference | Light | Dark |
|---|---|---|---|
| `md.sys.state.disabled.state-layer-opacity` |  | opacity 0.38 | = |
| `md.sys.state.dragged.state-layer-opacity` |  | opacity 0.16 | = |
| `md.sys.state.focus-indicator.inner-offset` |  | -3dp | = |
| `md.sys.state.focus-indicator.outer-offset` |  | 2dp | = |
| `md.sys.state.focus-indicator.thickness` |  | 3dp | = |
| `md.sys.state.focus.state-layer-opacity` |  | opacity 0.1 | = |
| `md.sys.state.hover.state-layer-opacity` |  | opacity 0.08 | = |
| `md.sys.state.pressed.state-layer-opacity` |  | opacity 0.1 | = |

## `md.sys.motion`

| Token | Reference | Light | Dark |
|---|---|---|---|
| `md.sys.motion.duration.extra-long1` |  | 700 | = |
| `md.sys.motion.duration.extra-long2` |  | 800 | = |
| `md.sys.motion.duration.extra-long3` |  | 900 | = |
| `md.sys.motion.duration.extra-long4` |  | 1000 | = |
| `md.sys.motion.duration.long1` |  | 450 | = |
| `md.sys.motion.duration.long2` |  | 500 | = |
| `md.sys.motion.duration.long3` |  | 550 | = |
| `md.sys.motion.duration.long4` |  | 600 | = |
| `md.sys.motion.duration.medium1` |  | 250 | = |
| `md.sys.motion.duration.medium2` |  | 300 | = |
| `md.sys.motion.duration.medium3` |  | 350 | = |
| `md.sys.motion.duration.medium4` |  | 400 | = |
| `md.sys.motion.duration.short1` |  | 50 | = |
| `md.sys.motion.duration.short2` |  | 100 | = |
| `md.sys.motion.duration.short3` |  | 150 | = |
| `md.sys.motion.duration.short4` |  | 200 | = |
| `md.sys.motion.easing.emphasized` |  | svgPath: "M 0,0 C 0.05, 0, 0.133333, 0.06, 0.166666, 0.4 C 0.208333, 0.82, 0.25, 1, 1, 1" | = |
| `md.sys.motion.easing.emphasized.accelerate` |  | cubic-bezier(0.3, 0, 0.8, 0.15) | = |
| `md.sys.motion.easing.emphasized.decelerate` |  | cubic-bezier(0.05, 0.7, 0.1, 1) | = |
| `md.sys.motion.easing.legacy` |  | cubic-bezier(0.4, 0, 0.2, 1) | = |
| `md.sys.motion.easing.legacy.accelerate` |  | cubic-bezier(0.4, 0, 1, 1) | = |
| `md.sys.motion.easing.legacy.decelerate` |  | cubic-bezier(0, 0, 0.2, 1) | = |
| `md.sys.motion.easing.linear` |  | cubic-bezier(0, 0, 1, 1) | = |
| `md.sys.motion.easing.standard` |  | cubic-bezier(0.2, 0, 0, 1) | = |
| `md.sys.motion.easing.standard.accelerate` |  | cubic-bezier(0.3, 0, 1, 1) | = |
| `md.sys.motion.easing.standard.decelerate` |  | cubic-bezier(0, 0, 0, 1) | = |
| `md.sys.motion.path` |  | motionPath: {"standardPath": "LINEAR"} | = |
| `md.sys.motion.spring.default.effects` |  | (composite: damping + stiffness) | = |
| `md.sys.motion.spring.default.effects.damping` |  | 1 | = |
| `md.sys.motion.spring.default.effects.stiffness` |  | 1600 | = |
| `md.sys.motion.spring.default.spatial` |  | (composite: damping + stiffness) | = |
| `md.sys.motion.spring.default.spatial.damping` |  | 0.9 | = |
| `md.sys.motion.spring.default.spatial.stiffness` |  | 700 | = |
| `md.sys.motion.spring.fast.effects` |  | (composite: damping + stiffness) | = |
| `md.sys.motion.spring.fast.effects.damping` |  | 1 | = |
| `md.sys.motion.spring.fast.effects.stiffness` |  | 3800 | = |
| `md.sys.motion.spring.fast.spatial` |  | (composite: damping + stiffness) | = |
| `md.sys.motion.spring.fast.spatial.damping` |  | 0.9 | = |
| `md.sys.motion.spring.fast.spatial.stiffness` |  | 1400 | = |
| `md.sys.motion.spring.slow.effects` |  | (composite: damping + stiffness) | = |
| `md.sys.motion.spring.slow.effects.damping` |  | 1 | = |
| `md.sys.motion.spring.slow.effects.stiffness` |  | 800 | = |
| `md.sys.motion.spring.slow.spatial` |  | (composite: damping + stiffness) | = |
| `md.sys.motion.spring.slow.spatial.damping` |  | 0.9 | = |
| `md.sys.motion.spring.slow.spatial.stiffness` |  | 300 | = |

## `md.sys.measurement`

| Token | Reference | Light | Dark |
|---|---|---|---|
| `md.sys.measurement.space0` |  | 0dp | = |
| `md.sys.measurement.space100` |  | 8dp | = |
| `md.sys.measurement.space125` |  | 10dp | = |
| `md.sys.measurement.space150` |  | 12dp | = |
| `md.sys.measurement.space175` |  | 14dp | = |
| `md.sys.measurement.space200` |  | 16dp | = |
| `md.sys.measurement.space25` |  | 2dp | = |
| `md.sys.measurement.space250` |  | 20dp | = |
| `md.sys.measurement.space300` |  | 24dp | = |
| `md.sys.measurement.space400` |  | 32dp | = |
| `md.sys.measurement.space50` |  | 4dp | = |
| `md.sys.measurement.space500` |  | 40dp | = |
| `md.sys.measurement.space600` |  | 48dp | = |
| `md.sys.measurement.space75` |  | 6dp | = |
| `md.sys.measurement.space800` |  | 64dp | = |
| `md.sys.measurement.space900` |  | 72dp | = |
