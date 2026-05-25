---
title: Teemaus
description: A live theme switcher slideover for colors, radius, font and color mode.
navigation:
  title: Teemaus
  icon: i-lucide-sparkles
kind: component
level: surface
author: Virtauma
avatar: /cat.png
tag: Component
tagColor: primary
time: persistent
likes: 0
replies: 0
publishedAt: 2026-05-25
tags: [component, theme, i18n, motion, nuxt-ui]
---

## Usage

Drop it anywhere in your layout. It includes its own trigger button.

```vue
  <Teemaus />
```
## What it controls

| Setting | Options |
|---|---|
| Primary color | 17 Tailwind colors |
| Neutral tone | slate, zinc, stone, mauve, mist, olive, taupe |
| Border radius | 0 to 0.5rem in 5 steps |
| Font | Finlandica, Inter, Outfit, Fraunces, Space Grotesk |
| Color mode | Light / Dark / System |

## Dependencies

- `motion-v` for animations
- `@nuxtjs/i18n` for en/fi translations
- `@nuxt/ui` for all UI components
- Bunny Fonts for privacy-friendly font loading

## Translations

Keys live under `themeSettings` in both locale files.

## Composable

`useThemeDOM` handles font and radius changes directly at the DOM level, for changes that cannot be done through `appConfig` alone.

## Notes

- Settings are not persisted and reset on page refresh
- Fonts load dynamically from Bunny Fonts on selection
- Slideover runs without an overlay so changes are visible live

## Example

::teemaus
::