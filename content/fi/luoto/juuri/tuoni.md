---
title: Tuoni
description: Tuonelassa olet mitä olet. Mikään muu ei pääse läpi.
navigation:
  title: Tuoni
  icon: i-lucide-shield
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
tags: [tarina, tuoni, validointi, schema, mytologia, tuonela]
---

> **"Hän oli kuullut kaikki selitykset. Mikään niistä ei ollut koskaan toiminut."**

Tuoni hallitsi Tuonelaa niin kuin skeema hallitsee lomaketta. Täysin ilman tunteita,
tarkalla käsityksellä siitä, mikä kuului sinne ja mikä ei. Sankareita saapui elävien
maailmasta luottavaisina ja sanat valmiina, ja hän katsoi mitä he toivat ja kertoi
heille, suoraan, oliko se oikea asia vai ei.

Yleensä ei ollut.

**Tule takaisin, kun sinulla on oikea muoto.**

## Mitä Hän Vaati

TypeScript kertoo mitä jonkin pitäisi olla silloin kun kirjoitat koodia. Zod tarkistaa
että se todella on sitä ajon aikana, kun ulkomaailma antaa sinulle jotain, mitä et itse
tehnyt, taikka voi täysin luottaa.

Skeema on Tuonin lista. Otsikko, joka on ei-tyhjä merkkijono. Päivämäärä ISO-muodossa.
Julkaisulippu joka on oikeasti totuusarvo, ei merkkijono joka sattuu olemaan tosi.
Jokainen kenttä on julistettu kerran, selkeästi ilman epäselvyyttä. 

Siitä julistuksesta
TypeScript-tyyppi johdetaan automaattisesti. Et kirjoita rajapintaa erikseen. Et riskeeraa
tyypin ja validoinnin hiljaista erkaantumista kuukausien aikana kun kukaan ei huomaa.

::callout{icon="i-lucide-shield" color="primary"}
Tämä on syntytieto tiedoillesi. Et vain tarkista onko arvo olemassa. Julistat mitä sille
on sallittua ja minkä muodon sen täytyy pitää, ennen kuin mikään alapuolella oleva
saa koskea siihen. 

TypeScript valvoo tätä käännösaikana. Zod valvoo sitä ajon aikana. Yhdessä ne eivät jätä rakoa väärän muodon livahtamiseen läpi.
::

## Mitä Hän Käännytti Takaisin

Käytä `safeParse`a `parse`n sijaan. Siinä missä `parse` heittää virheen, `safeParse`
palauttaa tuloksen, jossa on onnistumislippu. Kun se epäonnistuu, `error.issues` antaa
sinulle tarkan listan siitä, mikä meni väärin. Ei epämääräistä valitusta. Tarkka
selvitys. Mikä kenttä tai sääntö. Mikä arvo ilmestyi, jonka ei olisi pitänyt.

Virhe nousee esiin portilla, ei kolmen funktion syvyydessä puolenyön jälkeen
paikassa, johon kukaan ei ajatellut varautua. Tuoni ei koskaan päästänyt väärää asiaa
läpi toivoen sen järjestyvän itsekseen myöhemmin. Se ei ollut hänen tapansa.

Nuxt UI:n `UForm` puhuu tätä kieltä jo valmiiksi. Anna Zod-skeemasi `schema`-ominaisuudelle
ja lomake validoi lähetyksen yhteydessä. Kenttä kerrallaan, ilman ylimääräistä kytkentää.

::callout{icon="i-lucide-sparkles" color="secondary"}
Kun muoto on oikea, Tuoni astuu sivuun. Läpi tuleva on puhdasta ja luotettavaa.
TypeScript tietää tyypit, koska Zod todisti ne rajalla.

Ei puolustavia tarkistuksia ympäri koodipohjaa. Ei ihmettelyä.

Vanhat tietäjät kutsuivat sitä syntytiedoksi. Et voi luottaa siihen mitä, et ole nimennyt tarkasti.

**Tuo oikea muoto. Hän avaa.**
::