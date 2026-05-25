---
title: Kajastus
description: Galleria, joka herää kun lähestyt. Kohteet nousevat pimeydestä aaltoina siitä, missä seisot.
navigation:
  title: Kajastus
  icon: i-lucide-gallery-horizontal
kind: component
level: surface
author: Kissa
avatar: /cat.png
tag: Komponentti
tagColor: primary
time: interactive
likes: 0
replies: 0
publishedAt: 2026-05-24
tags: [komponentti, galleria, video, kuva, laiska-lataus, animaatio]
---

Kohteet nukkuvat kunnes lähestyt. Herätessään ne nousevat pimeydestä aaltoina kursoristasi ulospäin. 

Ei rivejä tai ajastinta. Klikkaa yhtä ja se kohoaa. Navigoi nuolilla tai näppäimistöllä.

## Käyttö

::code-preview
```vue
<Kajastus :items="items" />
```
::

## Ominaisuudet

| Ominaisuus | Tyyppi | Oletus | Kuvaus |
|------------|--------|--------|--------|
| `items` | `KajastusItem[]` | | Gallerian kohteet |
| `cols` | `number` | `3` | Sarakkeiden määrä |

## KajastusItem

| Kenttä | Tyyppi | Kuvaus |
|--------|--------|--------|
| `src` | `string` | Video tai kuva, tyyppi päätellään tiedostopäätteestä |
| `youtube` | `string` | YouTube-osoite tai video-ID |
| `poster` | `string` | Esikatselukuva |
| `title` | `string` | Saavutettavuutta varten |

## MDC

```mdc
::kajastus
---
cols: 3
items:
  - src: /videos/one.mp4
    poster: /catbirchdark.webp
    title: Ensimmäinen valo
  - youtube: https://youtu.be/155E3fSZHy0
    title: Muinainen laulu
  - src: /catbirch.webp
    title: Metsän pohja
---
::
```
::kajastus
---
cols: 3
items:
  - src: /videos/one.mp4
    poster: /catbirchdark.webp
    title: Ensimmäinen valo
  - youtube: https://youtu.be/155E3fSZHy0
    title: Muinainen laulu
  - src: /catbirch.webp
    title: Metsän pohja
---
::

## Näppäimistö

| Näppäin | Toiminto |
|---------|----------|
| `Enter` | Avaa kohde |
| `←` `→` | Selaa kohteiden välillä |
| `Escape` | Sulje |

## Saavutettavuus

Jokaisella kohteella on `role="button"`, `tabindex` ja `aria-label`. Navigointi toimii näppäimistöllä ja ruudunlukijoilla.