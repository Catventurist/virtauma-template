---
title: Kajastus
description: A gallery that wakes when approached. Items surface from darkness one by one, rippling outward from where you stand.
navigation:
  title: Kajastus
  icon: i-lucide-gallery-horizontal
kind: component
level: surface
author: Cat
avatar: /cat.png
tag: Component
tagColor: primary
time: interactive
likes: 0
replies: 0
publishedAt: 2026-05-24
tags: [component, gallery, video, image, lazy-loading, animation]
---

Items sleep until you approach. When they wake, they surface from darkness in ripples outward from your cursor.

Never in rows, never on a timer. Click one and it rises. Navigate with arrows or keyboard.

## Usage

::code-preview
```vue
<Kajastus :items="items" />
```
::

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `KajastusItem[]` | | Gallery items |
| `cols` | `number` | `3` | Number of columns |

## KajastusItem

| Field | Type | Description |
|-------|------|-------------|
| `src` | `string` | Video or image path, type inferred from extension |
| `youtube` | `string` | YouTube URL or video ID |
| `poster` | `string` | Preview image |
| `title` | `string` | Used for accessibility |

## MDC

```mdc
::kajastus
---
cols: 3
items:
  - src: /videos/one.mp4
    poster: /catbirchdark.webp
    title: First light
  - youtube: https://youtu.be/155E3fSZHy0
    title: Ancient song
  - src: /catbirch.webp
    title: Forest floor
---
::
```

::kajastus
---
cols: 3
items:
  - src: /videos/one.mp4
    poster: /catbirchdark.webp
    title: Ensimmäinen valo
  - youtube: https://youtu.be/155E3fSZHy0
    title: Muinainen laulu
  - src: /catbirch.webp
    title: Metsän pohja
---
::

## Keyboard

| Key | Action |
|-----|--------|
| `Enter` | Open item |
| `←` `→` | Navigate between items |
| `Escape` | Close |

## Accessibility

Each item has a `role="button"`, `tabindex` and `aria-label`. Navigation respects keyboard and screen readers.