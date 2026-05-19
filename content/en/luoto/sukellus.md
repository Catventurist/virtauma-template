---
title: Sukellus - Threads
description: A diving conversation component for community threads
navigation:
  icon: i-lucide-message-circle-more
---

## Sukellus - Vortex Thread

An immersive threaded discussion component. Click any message to dive deeper, watch replies swim in from the sides.

## Usage

::Sukellus
---
title: The Forging
thread:
  - id: 1
    author: Väinämöinen
    text: What shall we build from the waters?
    replies:
      - id: 2
        author: Ilmarinen
        text: Something the world has never seen
        replies:
          - id: 3
            author: Louhi
            text: Then it shall cost you everything
            replies:
              - id: 4
                author: Väinämöinen
                text: So be it
---
::

## Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Thread title shown at the surface |
| `thread` | `Message[]` | Root level messages |

## Message Structure

| Field | Type | Description |
|-------|------|-------------|
| `id` | `number` | Unique identifier |
| `author` | `string` | Message author |
| `text` | `string` | Message content |
| `replies` | `Message[]` | Nested replies, any depth |