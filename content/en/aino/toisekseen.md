---
title: Virtaus syvenee
description: The current finds its depth. What was foundation becomes form.
date: 2026-05-20
version: 0.2.0
badge: Tide
milestone: form
navigation:
  icon: i-lucide-waves
builders:
  - name: Catventurist
    avatar:
      src: /cat.png
    to: https://github.com/Catventurist
---

## Metsässä

- Vipunen learns to breathe in two languages. Locale fallback now flows through
  the collection without dropping to a blank page
- Tiera finds its footing. Navigation tree builds correctly from nested collections
  and no longer loses its place on deep routes
- Etsi opens its eye. First pass of search indexing wired to Vipunen's collection,
  `queryCollection` feeding the index at build time
- Välimuisti watches the door. Cache strategy defined for collection queries,
  stale entries no longer survive a fresh push
- Kielet and Vipunen introduced. The two worlds now speak to each other
- Kokko reclaimed his old name. The deployment pipeline is connected. Every push to the main branch wakes him. Zeit folds.

## Rannalla

- Manala shifted beneath the floor. The content directory structure changed from
  `content/docs/` to `content/`. Update your collection paths accordingly
- Tiera's prop renamed. `navi` is now `navigation` across all layout components.
  Find and replace before you push
- Vipunen now requires explicit locale in collection queries when `i18n` is active.
  Calls without a locale will return the default but log a warning

## Vedessä

- Fixed Etsi returning stale results after content update without rebuild
- Fixed Tiera losing active state on page refresh in nested routes
- Fixed Välimuisti holding expired entries across deployments
- Aino's first entry now renders correctly in all supported locales

> **The current does not ask permission. It finds the way.**