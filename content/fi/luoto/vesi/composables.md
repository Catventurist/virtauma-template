---
title: Komposiitit - Väreet
description: Opi tässä projektissa käytettävissä olevista komposiiteista.
navigation:
  title: Komposiitit - Väreet
  icon: i-lucide-waves-vertical
author: Kissa
avatar: /cat.png
tag: Tarina
tagColor: primary
kind: lore
level: surface
time: 5min
likes: 0
replies: 0
publishedAt: 2026-05-25
tags: [tarina, komposiitit, nuxt, i18n]
---

## Väreet

Nuxtissa komposiitti on funktio, joka kantaa tilaa mukanaan. Ei työkalu jota pidät kädessä, vaan virta johon astut.

Se tietää missä se on. Se muistaa mitä se on nähnyt. Se jakaa tietonsa kaikkien kanssa, jotka liittyvät mukaan.

Virtauma on rakennettu tämän periaatteen varaan. Logiikka ei asu komponenteissa. Se asuu niiden alla olevassa vedessä.

## Miten ne liikkuvat

Nuxtin komposiitti suoritetaan Vuen komposisiokontekstissa. Se voi pitää reaktiivista tilaa, tarkkailla muutoksia, kutsua muita komposiitteja ja kurkottaa palvelimelle tarvittaessa. Se elää niin kauan kuin sitä kutsuva komponentti, ja joskus kauemmin, jos se jaetaan sovellustasolla.

```ts
const { user, isLoggedIn } = useAuth()
```

Sitä ei rakenneta. Sitä kutsutaan, ja se saapuu.

## Mitä täällä virtaa

**`useAuth`** kantaa nykyisen käyttäjän, heidän roolinsa ja portit, jotka avautuvat tai sulkeutuvat heille.

**`useDocs`** tuntee dokumentaation muodon, miten siinä navigoidaan ja mikä kokoelma puhuu nykyistä kieltä.

**`useLuotoNav`** pitää hallussaan Luoto-sisältöpuun, muotoilee sen läpikäytäväksi ja kääntää raa'at sisältöpolut reiteiksi.

**`useI18n`** on sovelluksen kieli. Kaikki täällä puhuttu kulkee sen kautta.

**`useLocalePath`** varmistaa että jokainen reitti kantaa kieltään mukanaan, hiljaa, ilman että sitä tarvitsee pyytää.

## Huomio kielestä

Jokainen Virtauman komposiitti on kielitietoinen. Kun kieli vaihtuu, virrat vaihtuvat sen mukana. 

Navigaatio rakentuu uudelleen. Haku indeksoidaan uudelleen. Kyselyt ajetaan uudelleen. Mitään ei tarvitse kertoa kahdesti.

## Syvyys

Virtauman komposiitit on järjestetty syvyyden mukaan, kuten vesi.

| Taso | Merkitys |
|---|---|
| `surface` | Käytettävissä tietämättä mitä on alla |
| `current` | Vaatii jonkin verran ymmärrystä virrasta |
| `deep` | Koskettaa perustuksia |

Useimmat komposiitit tässä ovat `surface`-tasolla. Muutamat virtaavat syvemmälle.