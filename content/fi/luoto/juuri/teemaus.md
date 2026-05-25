---
title: Teemaus
description: A live theme switcher slideover for colors, radius, font and color mode.
navigation:
  title: Teemaus
  icon: i-lucide-sparkles
kind: component
level: surface
author: Virtauma
avatar: /cat.png
tag: Component
tagColor: primary
time: persistent
likes: 0
replies: 0
publishedAt: 2026-05-25
tags: [component, theme, i18n, motion, nuxt-ui]
---

## Käyttö

Lisää komponentti mihin tahansa asetelmaan, sisältää oman käynnistyspainikkeen.
```vue
  <Teemaus />
```

## Mitä se ohjaa

| Asetus | Vaihtoehdot |
|---|---|
| Pääväri | 17 Tailwind-väriä |
| Neutraali sävy | slate, zinc, stone, mauve, mist, olive, taupe |
| Reunan pyöristys | 0 - 0.5rem (5 askelta) |
| Fontti | Finlandica, Inter, Outfit, Fraunces, Space Grotesk |
| Väriteema | Vaalea / Tumma / Järjestelmä |

## Riippuvuudet

- `motion-v`, animaatiot
- `@nuxtjs/i18n`, en/fi käännökset
- `@nuxt/ui`, kaikki UI-komponentit
- Bunny Fonts, yksityisyyttä kunnioittava fonttien lataus

## Käännökset

Avaimet sijaitsevat `themeSettings`-nimiavaruudessa molemmissa käännöstiedostoissa.

## Skriptit

`useThemeDOM` käsittelee fontin ja reunan pyöristyksen muutokset suoraan DOM-tasolla. Muutokset jotka eivät onnistu `appConfig`in kautta.

## Huomioita

- Asetuksia ei tallenneta, nollautuvat sivun päivityksellä
- Fontit ladataan dynaamisesti Bunny Fontsista valinnan yhteydessä
- Slideover toimii ilman peittoa jotta muutokset näkyvät reaaliajassa

## Esimerkki

::teemaus
::