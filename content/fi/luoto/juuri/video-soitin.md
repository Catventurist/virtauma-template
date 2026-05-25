---
title: VideoLazy
description: Laiska video-komponentti, joka lataa sisällön vasta kun se tulee näkyviin. Tukee YouTube-upotusta ilman seurantaevästeitä.
navigation:
  title: VideoLazy
  icon: i-lucide-video
kind: component
level: surface
author: Kissa
avatar: /cat.png
tag: Komponentti
tagColor: primary
time: interactive
likes: 0
replies: 0
publishedAt: 2026-05-21
tags: [komponentti, video, youtube, laiska-lataus, saavutettavuus]
---

Video nukkuu, kunnes käyttäjä lähestyy. Vasta silloin se herää ja lataa sisältönsä. YouTube-upotus pysyy unessa, kunnes käyttäjä painaa play. Seurantaevästeet eivät lataudu lainkaan ennen sitä.

## Käyttö

::code-preview
```vue
<VideoLazy src="/videos/demo.mp4" poster="/images/poster.jpg" />
```
::

## Ominaisuudet

| Ominaisuus | Tyyppi | Oletus | Kuvaus |
|------------|--------|--------|--------|
| `src` | `string` | - | Videotiedoston polku |
| `poster` | `string` | - | Esikatselukuva |
| `youtube` | `string` | - | YouTube-URL tai video-ID |
| `title` | `string` | - | Videon otsikko, käytetään saavutettavuudessa |
| `ratio` | `string` | `16/9` | Kuvasuhde |
| `autoplay` | `boolean` | `false` | Toistaa automaattisesti |
| `loop` | `boolean` | `false` | Toistaa silmukassa |
| `muted` | `boolean` | `false` | Mykistää äänen |
| `controls` | `boolean` | `true` | Näyttää ohjaimet |
| `preload` | `string` | `none` | Esilataustaso: `none`, `metadata`, `auto` |
| `eager` | `boolean` | `false` | Lataa heti ilman laiskaa latausta |

## Esimerkki

```mdc
::video-lazy{src="/videos/demo.mp4" poster="/images/poster.jpg"}
::

::video-lazy{youtube="https://youtu.be/155E3fSZHy0" title="Esittelyvideo"}
::

::video-lazy{src="/videos/hero.mp4" eager muted autoplay loop}
::
```

## Saavutettavuus

Komponentti sisältää `aria-label`-attribuutin ja kunnioittaa `prefers-reduced-motion`-asetusta. 

YouTube-upotus ei lataa seurantaevästeitä ennenkuin käyttäjä painaa play.