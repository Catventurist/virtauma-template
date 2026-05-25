---
title: Kantele
description: A pluckable five-string kantele, shaped after the jaw of Hauki. Each string vibrates at its own frequency.
navigation:
  title: Kantele
  icon: i-lucide-music
kind: component
level: surface
author: Hauki
avatar: /cat.png
tag: Component
tagColor: primary
time: interactive
likes: 0
replies: 0
publishedAt: 2026-05-21
tags: [component, svg, animation, music, kalevala]
---

Hauki swallowed the instrument whole. What came back was shaped like his jaw. Five strings, five frequencies, one body carved from the silence between words.

## Usage

Place the component anywhere. It needs no props. It listens.

```vue
<Kantele />
```

## Keyboard

Press a number key to pluck the corresponding string.

| Key | String | Character |
|---|---|---|
| `1` | Treble | Shortest, fastest, highest |
| `2` | Second | Quick decay |
| `3` | Middle | Balanced |
| `4` | Fourth | Slow, wide |
| `5` | Bass | Longest, slowest, lowest |

## Strings

Each string has its own physics.

| String | Frequency | Amplitude | Duration |
|---|---|---|---|
| 1 | 12 | 8 | 0.6s |
| 2 | 10 | 9 | 0.7s |
| 3 | 8 | 10 | 0.8s |
| 4 | 6 | 11 | 0.9s |
| 5 | 4 | 12 | 1.1s |

## Click

Each string has an invisible hit area twelve units wide. You do not need to be precise. Hauki is patient.

## Symbol

The four waves beneath the strings are Vellamo's mark. She governs still water and what lies beneath it. The kantele was always hers.

::kantele
::