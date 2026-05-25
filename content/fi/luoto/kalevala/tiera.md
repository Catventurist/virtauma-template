---
title: Tiera
description: Uskollinen kumppani, navigointi Virtaumassa.
navigation:
  title: Tiera
  icon: i-lucide-map
author: Kissa
avatar: /cat.png
tag: Tarina
tagColor: primary
kind: lore
level: current
time: 5min
likes: 0
replies: 0
publishedAt: 2026-05-25
tags: [tarina, tiera, navigointi, mytologia, kalevala, kumppani]
---

## Tiera
::UCard
Hiukasta on hevosen synty,
Varsan synty vaahteresta.
Hiki on tiera, mieran poika,
Ukotiera, äijön poika,
Perin tuuleen makasi,
Päin päiväpaisteeseen,
Siinä teki lumisukan,
Lumisukan, luukavion.
::

Tiera ei johda. Hän muodostuu matkan ympärille, kuin lumi hevosen kavion alle, joka tarttuu polkuun kulkijaa kantaessaan. 

Navigointi ei ole erillinen asia reitistä. Se on mitä kertyy, kun liikut.

Virtaumassa Tiera elää kahdessa muodossa. Ylhäällä kulkee `NavigationMenu`, joka tietää mihin kuulut. 

Sivuilla kulkevat `useDocs` ja `useLuotoNav`, syvemmät oppaat, jotka muodostuvat jokaiselle polulle erikseen.

### Otsikko

`NavigationMenu` elää headerissa. Se tietää mihin sinä kuulut, dokumentit, yhteisö, oppaat. Kieli vaihtuu, polut pysyvät.

### Dokumentit

`useDocs` rakentaa dokumenttien sivupalkin. Se hakee navigaation lokalisoidusta kokoelmasta ja palaa englantiin jos käännöstä ei löydy. 

Polku on aina oikea, kielestä riippumatta.

### Luoto

`useLuotoNav` tuntee Luodon maaston syvemmin. Se rakentaa puurakenteen, muistaa missä olet ja tietää mistä tulit. Muruset, valittu solmu, avoimet haarat.

### Yhteinen rytmi

Molemmat seuraavat kieltä. Kun `locale` vaihtuu, Tiera muodostuu uudelleen, ilman sivun uudelleenlatausta, ilman eksymistä.

> **Tiera ei ole paikka. Se on mitä kertyy, kun kuljet.**