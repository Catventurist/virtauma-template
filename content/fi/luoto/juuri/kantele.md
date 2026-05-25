---
title: Kantele
description: Haukijoen leuan muotoon veistetty viisikielinen kantele. Jokainen kieli värähtää omalla taajuudellaan.
navigation:
  title: Kantele
  icon: i-lucide-music
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
tags: [komponentti, svg, animaatio, musiikki, kalevala]
---

# Kantele

Hauki nielaisi soittimen kokonaan. Takaisin tuli jotain hänen leukaluunsa muotoista. Viisi kieltä, viisi taajuutta, yksi runko veistetty sanojen välisestä hiljaisuudesta.

## Käyttö

Aseta komponentti minne tahansa. Se ei tarvitse propseja. Se kuuntelee.

```vue
<Kantele />
```

## Näppäimistö

Paina numeronäppäintä näppäilläksesi vastaavan kielen.

| Näppäin | Kieli | Luonne |
|---|---|---|
| `1` | Diskant | Lyhin, nopein, korkein |
| `2` | Toinen | Nopea sammuminen |
| `3` | Keski | Tasapainoinen |
| `4` | Neljäs | Hidas, leveä |
| `5` | Basso | Pisin, hitain, matalin |

## Kielet

Jokaisella kielellä on oma fysiikkansa.

| Kieli | Taajuus | Amplitudi | Kesto |
|---|---|---|---|
| 1 | 12 | 8 | 0.6s |
| 2 | 10 | 9 | 0.7s |
| 3 | 8 | 10 | 0.8s |
| 4 | 6 | 11 | 0.9s |
| 5 | 4 | 12 | 1.1s |

## Napsautus

Jokaisella kielellä on näkymätön osuma-alue kaksitoista yksikköä leveä. Sinun ei tarvitse olla tarkka. Hauki on kärsivällinen.

## Symboli

Kielten alla olevat neljä aaltoa ovat Vellamolle kuuluvat. Hän hallitsee tyyntä vettä ja sen alla olevaa. Kantele oli aina hänen.

::kantele
::