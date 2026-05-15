---
title: Tietoa lyhyesti
navigation:
  icon: i-lucide-info
description: Toiminnot ja teknologia
date: 2026-01-01
---


## Teknologiat

| Teknologia | Käyttötarkoitus |
|------------|-----------------|
| Nuxt | Sovelluskehys |
| Nuxt Content | Markdown-sisällönhallinta |
| Nuxt UI | Komponenttikirjasto |
| Nuxt I18n | Kaksikielisyys (fi/en) |
| Nuxt Studio | Sisällönmuokkaus tuotannossa |
| Motion-v | Animaatiot |
| Zod | Lomakevalidointi |

## Ominaisuudet

- **Kaksikielinen sisältö** — kaikki sivut saatavilla suomeksi ja englanniksi
- **Dokumentaatio** — hakutoiminnolla varustettu navigoitava dokumentaatio
- **Luoto-osio** — erillinen sisältöosio omalla puunavigaatiolla
- **Tunnistautuminen** — mallikäyttäjiin perustuva kirjautumisjärjestelmä, laajennettavissa oikeaan backendiin
- **Profiilisivu** — animoitu käyttäjäprofiili vesiaiheisella ulkoasulla
- **Sisällönmuokkaus** — Nuxt Studion kautta suoraan tuotannossa
- **Väreet** — uudelleenkäytettävät mallikoodit navigaatiolle, haulle ja tunnistautumiselle

## Arkkitehtuuri

Sisältö elää Git-repositoriossa ja sitä hallitaan Nuxt Studion kautta. Dynaaminen data kuten RSVP:t ja kommentit voidaan myöhemmin lisätä Turso-tietokannan avulla ilman suurempia muutoksia olemassaolevaan rakenteeseen.