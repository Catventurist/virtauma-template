---
title: Composables - Väreet
description: Information about using composables.
navigation:
  title: Composables - Väreet
  icon: i-lucide-waves-vertical
author: Cat
avatar: /cat.png
tag: Lore
tagColor: primary
kind: lore
level: surface
time: 5min
likes: 0
replies: 0
publishedAt: 2026-05-25
tags: [lore, composables, nuxt, i18n]
---

## Väreet

In Nuxt, a composable is a function that carries state with it. Not a tool you hold, a current you enter. It knows where it is. It remembers what it has seen. It shares what it knows with anything that joins it.

Virtauma is built on this principle. Logic does not live in components. It lives in the water beneath them.

## How they move

A composable in Nuxt runs inside the Vue composition context. It can hold reactive state, watch for changes, call other composables, and reach into the server when needed. It lives for as long as the component that called it, and sometimes longer, if it is shared at the app level.

```ts
const { user, isLoggedIn } = useAuth()
```

You do not construct it. You call it, and it arrives.

## What flows here

**`useAuth`** carries the current user, their roles, and the gates that open or close for them.

**`useDocs`** knows the shape of the documentation, how it is navigated, and which collection speaks the current language.

**`useLuotoNav`** holds the Luoto content tree, formats it for traversal, and translates raw content paths into routes.

**`useI18n`** the tongue of the application. Everything spoken here passes through it.

**`useLocalePath`** ensures every route carries its language with it, silently, without being asked.

## A note on locale

Every composable in Virtauma is locale-aware. When the language shifts, the currents shift with it. Navigation rebuilds. Search reindexes. Queries re-run. Nothing needs to be told twice.

## Depth

Composables in Virtauma are organised by depth, like water.

| Level | Meaning |
|---|---|
| `surface` | Usable without knowing what is beneath |
| `current` | Requires some understanding of the flow |
| `deep` | Touches the foundations |

Most composables here sit at `surface`. A few run deeper.