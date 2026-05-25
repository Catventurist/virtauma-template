---
title: Hämy
description: A local-first media archive for Finnish folklore recordings, images and documents.
navigation:
  title: Hämy
  icon: i-lucide-archive
kind: component
level: surface
author: Virtauma
avatar: /cat.png
tag: Component
tagColor: primary
time: daily
likes: 0
replies: 0
publishedAt: 2026-05-25
tags: [component, archive, folklore, i18n, motion]
---

Hämy is the threshold hour, neither day nor night. It is in this light that things half-forgotten become visible again. The archive does not create knowledge, it recovers it.

## What is kept here

Recordings made before living memory. Images of things that no longer exist. Documents written by hands long still. Each entry carries a region, a year, a trace of the person who collected it and the person who gave it.

## Entering the archive

```vue
  <HamyArchive />
```

Place the component in any content page. It opens to the browse view. Click any entry to descend into it.

## The shape of an entry

| Field | What it holds |
|---|---|
| title | The name given to the recording or object |
| type | audio, image or document |
| region | Where it was gathered |
| date | When it was gathered |
| tags | Words that connect it to other things |
| description | A short account |
| public | Whether others may see it |

## Visibility

Some things are kept in the open. Others remain in shadow until the keeper decides otherwise. Public entries are visible to all who pass through. Private entries belong to those with permission.

## Search

The search does not reach into the content of recordings or images. It moves through titles and tags only. What is unnamed remains unfound.

## Translations

Keys live under `hamy` in both locale files.

## What is not yet here

The media itself does not yet play. The preview space is held open, waiting. Audio, image and document rendering will come in a later season.

## Example

::HamyArchive
::