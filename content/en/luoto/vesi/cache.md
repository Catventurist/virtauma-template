---
title: Cache Strategy
description: A water-inspired mental model for choosing the right caching strategy in Virtauma.
navigation:
  title: Cache Strategy
  icon: i-lucide-waves-horizontal
author: Cat
avatar: /cat.png
tag: Reference
tagColor: primary
kind: reference
level: current
time: 8min
likes: 0
replies: 0
publishedAt: 2026-05-25
tags: [reference, cache, strategy, architecture]
---

## Cache Strategy

A water-inspired mental model for choosing the right caching strategy.

```ts
routeRules: {
  '/': { prerender: true },
  '/blog/**': { isr: 3600 },
  '/feed/**': { swr: 60 },
  '/api/**': { cache: { maxAge: 60 } },
}
```

### Jää - Ice (`prerender: true`)

Completely frozen at build time. Never changes until the next deployment.

Best for static pages that rarely update, like `'/'`.

### Vuorovesi - Tide (`isr`)

Refreshes on a predictable cycle in the background.

Best for docs or blogs where content changes occasionally. `'/blog/**': { isr: 3600 }` revalidates every hour.

### Joki - River (`swr`)

Always flowing. Serves stale content while fetching fresh in the background.

Best for frequently updated data where speed matters more than freshness. `'/feed/**': { swr: 60 }` keeps things flowing.

### Tekojärvi - Reservoir (`cache`)

Stored and dispensed on demand. Empties after `maxAge`.

Best for API routes with predictable data lifetimes. `'/api/**': { cache: { maxAge: 60 } }` refills every minute.

### Sade - Rainfall (SSR, no cache)

Fresh every single time, straight from the source.

Best for highly dynamic, user-specific or real-time data. `/profile` needs no rule, SSR is the default.

> **Choose your waters wisely, not every page needs rain.**