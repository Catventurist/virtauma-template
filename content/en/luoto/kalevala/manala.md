---
title: Manala
description: The path between two worlds, Virtauma's architecture.
navigation:
  icon: i-lucide-compass
---

## Manala

Manala is the place between two worlds. Not the land of the living, not the land of the dead, but the passage between them. 

Väinämöinen walked it to reach Vipunen. Return was not certain, but the knowledge was worth it.

Virtauma walks the same path. Below sleeps Vipunen, the sage. In the depths stirs Ikiturso, the rememberer. 

The surface is what the user sees, but everything lives underneath.

### Two Worlds

**Vipunen** holds all that is written. Docs, guides, runes, static, eternal, unchanging. He knows nothing of users.

**Ikiturso** remembers all that is living. Users, connections, voices, dynamic, growing, breathing. He knows nothing of documents.

They do not meet. Nuxt is the one that walks between them.

### The Path

A user arrives. Nuxt fetches the page from Vipunen, fast, from the edge, through `isr`. 

The user reads. Then they sign in.

Signing in is the threshold. After that Ikiturso stirs, profile, history, community. 

API routes carry voices into the deep and bring answers back.

```md
user
  → Nuxt (surface)
    → Vipunen (reading, isr)
    → Ikiturso (community, API routes)
```

### Environment

Both worlds need their keys.

```ts [.env]
TURSO_URL=libsql://...
TURSO_TOKEN=...
NUXT_SESSION_PASSWORD=...
```

### Boundaries

Vipunen answers publicly. Ikiturso listens only to those who are known.

Authentication is the gate of Manala, without it, the depths cannot be reached.

> **Manala is not a place. It is a journey.**