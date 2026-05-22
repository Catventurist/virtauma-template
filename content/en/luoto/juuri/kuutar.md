---
title: Kuutar
description: The moon maiden who reveals the seven energies, one per day.
navigation:
  title: Kuutar
  icon: i-lucide-moon-star
kind: component
level: surface
author: Virtauma
avatar: /cat.png
tag: Component
tagColor: primary
time: daily
likes: 0
replies: 0
publishedAt: 2026-05-22
tags: [component, chakra, kalevala, i18n, motion]
---

## Kuutar

A daily chakra companion rooted in Finnish folklore. Each of the seven chakras is paired with a character from the Kalevala, rotating automatically by day of the week.

### Usage

```vue
<Kuutar />
```

### How it works

The active chakra is determined by `new Date().getDay()`, mapping each weekday to a chakra via the `useKuutar` composable. The app theme updates to match.

| Day | Chakra | Character |
|-----|--------|-----------|
| Sunday | Crown | Ukko |
| Monday | Third Eye | Louhi |
| Tuesday | Throat | Väinämöinen |
| Wednesday | Heart | Mielikki |
| Thursday | Solar Plexus | Ilmarinen |
| Friday | Sacral | Lemminkäinen |
| Saturday | Root | Tapio |

### Interaction

- Click the central icon to open the detail panel
- Click any of the seven buttons to manually switch chakras
- Press `Escape` or click outside to close the panel
- The reset button returns to today's chakra when browsing manually

### i18n

Supports `en` and `fi`. Locale files live in `i18n/locales/`.

### Dependencies

- `motion-v`, animations
- `@vueuse/core`, `onClickOutside`, `onKeyStroke`
- `@nuxtjs/i18n`, translations
---