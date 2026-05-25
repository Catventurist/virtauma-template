---
title: Hämy
description: Paikallinen media-arkisto suomalaisille kansanperinteen äänityksille, kuville ja asiakirjoille.
navigation:
  title: Hämy
  icon: i-lucide-archive
kind: component
level: surface
author: Virtauma
avatar: /cat.png
tag: Komponentti
tagColor: primary
time: daily
likes: 0
replies: 0
publishedAt: 2026-05-25
tags: [komponentti, arkisto, kansanperinne, i18n, motion]
---

Hämy on kynnystunti, ei päivä eikä yö. Tässä valossa puoliksi unohdetut asiat tulevat taas näkyviin. Arkisto ei luo tietoa, se palauttaa sen.

## Mitä täällä säilytetään

Äänitteitä ennen elävää muistia. Kuvia asioista joita ei enää ole. Asiakirjoja käsien kirjoittamina jotka ovat jo kauan levänneet. Jokaisella tallenteella on alue, vuosi, jälki kerääjästä ja antajasta.

## Arkistoon astuminen

    <HamyArchive />

Aseta komponentti mihin tahansa sisältösivulle. Se avautuu selausnäkymään. Klikkaa mitä tahansa tallennetta laskeutuaksesi siihen.

## Tallenteen muoto

| Kenttä | Mitä se pitää sisällään |
|---|---|
| title | Äänitykselle tai esineelle annettu nimi |
| type | audio, kuva tai asiakirja |
| region | Mistä se kerättiin |
| date | Milloin se kerättiin |
| tags | Sanat jotka yhdistävät sen muihin asioihin |
| description | Lyhyt kuvaus |
| public | Voivatko muut nähdä sen |

## Näkyvyys

Jotkut asiat pidetään avoimina. Toiset pysyvät varjossa kunnes haltija päättää toisin. Julkiset tallenteet ovat kaikkien nähtävillä jotka kulkevat läpi. Yksityiset tallenteet kuuluvat niille joilla on lupa.

## Haku

Haku ei ulotu äänitysten tai kuvien sisältöön. Se liikkuu vain otsikoiden ja avainsanojen läpi. Mitä ei ole nimetty, pysyy löytymättä.

## Käännökset

Avaimet sijaitsevat `hamy`-nimiavaruudessa molemmissa käännöstiedostoissa.

## Mitä täällä ei vielä ole

Media ei vielä toista. Esikatselutila on avoinna, odottaa. Äänen, kuvan ja asiakirjojen näyttäminen tulee myöhemmällä kaudella.

## Esimerkki

::HamyArchive
::