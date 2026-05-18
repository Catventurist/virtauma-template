---
title: Tiera
description: The faithful companion, navigation in Virtauma.
navigation:
  icon: i-lucide-map
---

## Tiera
::UCard
The origin of horse is from sand,
The origin of foal from a maple.
Sweat is tiera, son of miera,
Ukotiera, son of äijö,
Lied with his back towards wind,
Facing sunlight,
There created a sock of snow,
A sock of snow, a hoof of bone.
::

Tiera does not lead. He forms around the journey, like snow beneath a horse's hoof, gathering on the path as the traveler moves. 

Navigation is not separate from the route. It is what accumulates as you go.

In Virtauma, Tiera lives in two forms. Above runs the `NavigationMenu`, knowing where you belong. 

At the sides walk `useDocs` and `useLuotoNav`, deeper guides, forming anew for every path.

### Header

`NavigationMenu` lives in the header. It knows where you belong, docs, community, guides. The language changes, the paths remain.

### Docs

`useDocs` builds the docs sidebar. It fetches navigation from the localized collection and falls back to English if no translation is found. 

The path is always right, regardless of language.

### Luoto

`useLuotoNav` knows Luoto's terrain more deeply. It builds a tree, remembers where you are, knows where you came from, breadcrumb, selected node, open branches.

### Shared Rhythm

Both follow the language. When `locale` changes, Tiera forms again, without reloading the page, without getting lost.

> **Tiera is not a place. It is what gathers as you walk.**