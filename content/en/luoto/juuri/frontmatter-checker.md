---
title: Frontmatter Checker
description: A tool for finding and completing missing frontmatter in Luoto content.
navigation:
  title: Frontmatter Checker
  icon: i-lucide-file-search
author: Cat
avatar: /cat.png
tag: Tool
tagColor: primary
kind: reference
level: surface
time: 3min
likes: 0
replies: 0
publishedAt: 2026-05-25
tags: [reference, frontmatter, content, tool]
---

A surface tool for finding content that has not yet been given a keeper.

## Usage
```vue
  <VFrontmatterChecker />
```

## What it finds

Scans the active locale collection and surfaces any entry missing an `author` field. Each result shows the title, description and path of the orphaned document.

## Filling the gaps

Click the edit button on any entry to open a form with all frontmatter fields. Known values are prefilled from existing content. The `author` field is marked for attention.

Once filled, the preview shows the complete frontmatter block ready to copy and paste into the file.

## Fields

| Field | Default |
|---|---|
| `kind` | Selected from `guide`, `reference`, `ritual`, `lore` |
| `level` | Selected from `surface`, `current`, `deep` |
| `publishedAt` | Today |
| `likes` | 0 |
| `replies` | 0 |

## Notes

This tool reads only. It does not write to any file. Changes must be applied manually.

## Example FM

```md
---
title: Frontmatter Checker
description: A tool for finding and completing missing frontmatter in Luoto content.
navigation:
  title: Frontmatter Checker
  icon: i-lucide-file-search
author: Cat
avatar: /cat.png
tag: Tool
tagColor: primary
kind: reference
level: surface
time: 3min
likes: 0
replies: 0
publishedAt: 2026-05-25
tags: [reference, frontmatter, content, tool]
---
```