---
title: Silmukka
description: An eight-direction octagonal grid, navigable with the Nyyrikki controller.
navigation:
  title: Silmukka
  icon: i-lucide-grid-2x2
kind: component
level: surface
author: Virtauma
avatar: /cat.png
tag: Component
tagColor: primary
time: interactive
likes: 0
replies: 0
publishedAt: 2026-05-21
tags: [component, grid, navigation, gesture, octagon]
---

## Silmukka

A dynamic octagonal grid that knows its position. Navigate with the `Nyyrikki` controller or click cells directly.

### Usage

```vue
<Silmukka
  ref="grid"
  :cols="5"
  :rows="5"
  :items="items"
  :cell-size="80"
  @select="onSelect"
>
  <template #cell="{ item, active }">
    <UIcon :name="item.icon" :class="active ? 'text-inverted' : 'text-muted'" />
  </template>
</Silmukka>

<Nyyrikki @navigate="grid?.move" />
```

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| cols | number | 5 | Number of columns |
| rows | number | 5 | Number of rows |
| items | unknown[] | [] | Cell data |
| cellSize | number | 80 | Cell size in pixels |

### Events

| Name | Type | Description |
|------|------|-------------|
| select | item, col, row | Fires when a cell is selected |

### Methods

| Name | Type | Description |
|------|------|-------------|
| move | (dir: Direction) => void | Moves the active cell |

### Composable

`useSilmukka` is also available directly for lifting state up.

```typescript
const { current, currentIndex, total, canMove, move, cells } = useSilmukka(cols, rows)
```

| Name | Type | Description |
|------|------|-------------|
| current | Ref | Active cell coordinates |
| currentIndex | ComputedRef | Linear index of active cell |
| total | ComputedRef | Total cell count |
| canMove | ComputedRef | Movement availability per direction |
| cells | (items) => Cell[] | Flattened cell array |

### Dependencies

- `Nyyrikki` for navigation
