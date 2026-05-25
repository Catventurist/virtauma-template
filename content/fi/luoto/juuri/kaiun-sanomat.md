---
title: Kaiun Sanomat
description: Klassinen sanomalehtiasettelu Nuxt Content MDC:lle, moderneilla suomalaisilla kansantaru-vaikutteilla.
navigation:
  title: Kaiun Sanomat
  icon: i-lucide-newspaper
kind: component
level: surface
author: Cat
avatar: /cat.png
tag: Komponentti
tagColor: primary
time: interactive
likes: 0
replies: 0
publishedAt: 2026-05-23
tags: [komponentti, asettelu, kalevala, sanomalehti, mdc]
---

## Käyttö

Tarinat ensin, `#breaking`-slot viimeisenä:

```md
::kaiunSanomat
---
edition: 1
tagline: Totuus on vapaana
---

:::kaiunStory
---
priority: lead
columnSpan: 3
image: /catbirchdark.webp
section: Kansallinen
byline: Aino Virtanen
publishedAt: 2026-05-21
title: Väinämöinen nähtiin Saimaalla
---
Vaka vanha Väinämöinen, tietäjä iältä ikuinen. Nousi kesken järven selän, aaltojen yli asteli.
:::

:::kaiunStory
---
columnSpan: 1
section: Kulttuuri
byline: Louhi Pohjanmies
publishedAt: 2026-05-21
title: Kantele-myynti kasvoi 400%
---
Kansa soittaa, kansa laulaa. Kalevalan henki elää.
:::

:::kaiunStory
---
columnSpan: 2
section: Luonto
byline: Ilmarinen
publishedAt: 2026-05-21
title: Koivut kukkivat aikaisin tänä vuonna
---
Koivut kukkivat aikaisin. Kevät tuli ennen aikaansa.
:::

#breaking
Väinämöinen nähtiin Saimaalla · Kantele-myynti kasvoi 400% · Koivut kukkivat aikaisin

::
```

## KaiunSanomat-propsit

| Propsi | Tyyppi | Oletus | Kuvaus |
|--------|--------|--------|--------|
| `name` | `string` | `Kaiun Sanomat` | Mastheadin nimi |
| `edition` | `string \| number` | `1` | Lehden numero |
| `tagline` | `string` | `Totuus on vapaana` | Iskulause nimen alla |

## KaiunStory-propsit

| Propsi | Tyyppi | Oletus | Kuvaus |
|--------|--------|--------|--------|
| `title` | `string` | — | Jutun otsikko |
| `priority` | `lead \| secondary \| minor` | `secondary` | Jutun koko |
| `columnSpan` | `string \| number` | `1` | Ruudukon sarakeleveys |
| `image` | `string` | — | Kuva, näytetään vain lead-jutuissa |
| `section` | `string` | — | Osastotunnus |
| `byline` | `string` | — | Kirjoittajan nimi |
| `publishedAt` | `string` | — | ISO-päivämäärä |

## Toiminta

- Pieni masthead ilmestyy vierittäessä
- Uutisvilkku `#breaking`-slotin kautta `UMarquee`-komponentilla
- Jutut animoituvat näkyviin vierittäessä `useElementVisibility`-hookilla
- Klikkaamalla jutun otsikkoa se avautuu tai sulkeutuu
- Viimeinen rivi tasapainottaa automaattisesti yksittäiset sarakkeet
- Pyyhkäisy vasemmalle tai oikealle mobiilissa siirtyy osioiden välillä

## Esimerkki

::kaiunSanomat
---
edition: 1
tagline: Totuus on vapaana
---

:::kaiunStory
---
priority: lead
columnSpan: 3
image: /catbirchdark.webp
section: Kansallinen
byline: Aino Virtanen
publishedAt: 2026-05-21
title: Väinämöinen nähtiin Saimaalla
---
Vaka vanha Väinämöinen, tietäjä iältä ikuinen. Nousi kesken järven selän, aaltojen yli asteli.
:::

:::kaiunStory
---
columnSpan: 1
section: Kulttuuri
byline: Louhi Pohjanmies
publishedAt: 2026-05-21
title: Kantele-myynti kasvoi 400%
---
Kansa soittaa, kansa laulaa. Kalevalan henki elää.
:::

:::kaiunStory
---
columnSpan: 2
section: Luonto
byline: Ilmarinen
publishedAt: 2026-05-21
title: Koivut kukkivat aikaisin tänä vuonna
---
Koivut kukkivat aikaisin. Kevät tuli ennen aikaansa.
:::

#breaking
Väinämöinen nähtiin Saimaalla · Kantele-myynti kasvoi 400% · Koivut kukkivat aikaisin

::