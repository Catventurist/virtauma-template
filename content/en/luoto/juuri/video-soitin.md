---
title: VideoSoitin
description: A lazy video component that loads content only when it enters the viewport. Supports YouTube embeds without tracking cookies.
navigation:
  title: VideoSoitin
  icon: i-lucide-video
kind: component
level: surface
author: Cat
avatar: /cat.png
tag: Component
tagColor: primary
time: interactive
likes: 0
replies: 0
publishedAt: 2026-05-24
tags: [component, video, youtube, lazy-loading, accessibility]
---

The video sleeps until the user approaches — only then it wakes and loads. 

YouTube embeds stay dormant until the user hits play, meaning no tracking cookies are loaded until that moment.

## Usage

::code-preview
```vue
<VideoLazy src="/videos/demo.mp4" poster="/images/poster.jpg" />
```
::

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | | Video file path |
| `poster` | `string` | | Preview image |
| `youtube` | `string` | | YouTube URL or video ID |
| `title` | `string` | | Video title, used for accessibility |
| `ratio` | `string` | `16/9` | Aspect ratio |
| `autoplay` | `boolean` | `false` | Plays automatically |
| `loop` | `boolean` | `false` | Loops the video |
| `muted` | `boolean` | `false` | Mutes audio |
| `controls` | `boolean` | `true` | Shows controls |
| `preload` | `string` | `none` | Preload level: `none`, `metadata`, `auto` |
| `eager` | `boolean` | `false` | Skips lazy loading |

## MDC

```mdc
::video-lazy{src="/videos/demo.mp4" poster="/images/poster.jpg"}
::

::video-lazy{youtube="https://youtu.be/155E3fSZHy0" title="Demo video"}
::

::video-lazy{src="/videos/hero.mp4" eager muted autoplay loop}
::
```

## Accessibility

The component includes `aria-label` and respects `prefers-reduced-motion`. 

YouTube embeds load no tracking cookies until the user hits play.