---
title: Kaiun Sanomat
description: A classic newspaper layout component built for Nuxt Content MDC, with a modern Finnish folklore twist.
navigation:
  title: Kaiun Sanomat
  icon: i-lucide-newspaper
kind: component
level: surface
author: Cat
avatar: /cat.png
tag: Component
tagColor: primary
time: interactive
likes: 0
replies: 0
publishedAt: 2026-05-23
tags: [component, layout, kalevala, newspaper, mdc]
---

## Usage

Stories first, `#breaking` slot last:

```md
::kaiunSanomat
---
edition: 1
tagline: Totuus on vapaana
---

:::kaiunStory
---
priority: lead
columnSpan: 3
image: /catbirchdark.webp
section: Kansallinen
byline: Aino Virtanen
publishedAt: 2026-05-21
title: Väinämöinen Spotted on Lake Saimaa
---
Vaka vanha Väinämöinen, tietäjä iältä ikuinen. Nousi kesken järven selän, aaltojen yli asteli.
:::

:::kaiunStory
---
columnSpan: 1
section: Kulttuuri
byline: Louhi Pohjanmies
publishedAt: 2026-05-21
title: Kantele Sales Up 400%
---
Kansa soittaa, kansa laulaa. Kalevalan henki elää.
:::

:::kaiunStory
---
columnSpan: 2
section: Luonto
byline: Ilmarinen
publishedAt: 2026-05-21
title: Birch Trees Blooming Early This Year
---
Koivut kukkivat aikaisin. Kevät tuli ennen aikaansa.
:::

#breaking
Väinämöinen spotted on Lake Saimaa · Kantele sales up 400% · Birch trees blooming early

::
```

## KaiunSanomat Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | `Kaiun Sanomat` | Masthead name |
| `edition` | `string \| number` | `1` | Edition number |
| `tagline` | `string` | `Totuus on vapaana` | Tagline below name |

## KaiunStory Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Story headline |
| `priority` | `lead \| secondary \| minor` | `secondary` | Story size |
| `columnSpan` | `string \| number` | `1` | Grid column span |
| `image` | `string` | — | Hero image, lead only |
| `section` | `string` | — | Section label |
| `byline` | `string` | — | Author name |
| `publishedAt` | `string` | — | ISO date string |

## Behaviour

- Sticky minimal masthead appears on scroll
- Breaking news ticker via `#breaking` slot using `UMarquee`
- Stories animate in on scroll via `useElementVisibility`
- Click any story to expand/collapse content
- Last row auto-balances orphaned columns
- Swipe left/right on mobile to navigate between sections

## Live Example

::kaiunSanomat
---
edition: 1
tagline: Totuus on vapaana
---

:::kaiunStory
---
priority: lead
columnSpan: 3
image: /catbirchdark.webp
section: Kansallinen
byline: Aino Virtanen
publishedAt: 2026-05-21
title: Väinämöinen Spotted on Lake Saimaa
---
Vaka vanha Väinämöinen, tietäjä iältä ikuinen. Nousi kesken järven selän, aaltojen yli asteli.
:::

:::kaiunStory
---
columnSpan: 1
section: Kulttuuri
byline: Louhi Pohjanmies
publishedAt: 2026-05-21
title: Kantele Sales Up 400%
---
Kansa soittaa, kansa laulaa. Kalevalan henki elää.
:::

:::kaiunStory
---
columnSpan: 2
section: Luonto
byline: Ilmarinen
publishedAt: 2026-05-21
title: Birch Trees Blooming Early This Year
---
Koivut kukkivat aikaisin. Kevät tuli ennen aikaansa.
:::

#breaking
Väinämöinen spotted on Lake Saimaa · Kantele sales up 400% · Birch trees blooming early

::