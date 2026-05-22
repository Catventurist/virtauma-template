---
title: Silmukka
description: Kahdeksan suunnan oktagoninen ruudukko, navigoitavissa Nyyrikki-ohjaimella.
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

Dynaaminen oktagoninen ruudukko joka tuntee sijaintinsa. Navigoi `Nyyrikki`-ohjaimella tai klikkaamalla soluja suoraan.

### Käyttö

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

### Rekvisiitta

| Nimi | Tyyppi | Oletus | Kuvaus |
|------|--------|--------|--------|
| cols | number | 5 | Sarakkeiden määrä |
| rows | number | 5 | Rivien määrä |
| items | unknown[] | [] | Solujen data |
| cellSize | number | 80 | Solun koko pikseleinä |

### Tapahtumat

| Nimi | Tyyppi | Kuvaus |
|------|--------|--------|
| select | item, col, row | Laukeaa kun solu valitaan |

### Metodit

| Nimi | Tyyppi | Kuvaus |
|------|--------|--------|
| move | (dir: Direction) => void | Siirtää aktiivisen solun |

### Komposable

`useSilmukka` on käytettävissä myös suoraan tilan nostamiseen ylös.

```typescript
const { current, currentIndex, total, canMove, move, cells } = useSilmukka(cols, rows)
```

| Nimi | Tyyppi | Kuvaus |
|------|--------|--------|
| current | Ref | Aktiivisen solun koordinaatit |
| currentIndex | ComputedRef | Lineaarinen indeksi |
| total | ComputedRef | Solujen kokonaismäärä |
| canMove | ComputedRef | Liikkumismahdollisuudet per suunta |
| cells | (items) => Cell[] | Litistetty solujen taulukko |

### Riippuvuudet

- `Nyyrikki` navigointiin
