---
title: Päätökset
description: Kuinka avata päätöksiä ja antaa veden asettua.
date: 2026-05-20
navigation:
  title: Päätökset
  icon: i-lucide-droplet
---

> **"Heitä se veteen. Vesi kertoo mitä mieltä on."**

Päätökset on yhteisölle avattu kysymys. Ei äänestys tai kysely. Rakenteellinen keskustelu, jolla on muoto, paino ja tapa sulkeutua.

## Päätöksen Avaaminen

Jokainen päätös alkaa tyypillä. Tyyppi määrää miten se sulkeutuu, kuinka kauan se
pysyy auki ja mikä lasketaan ratkaisuksi.

::paatos{type="kaste" status="open"}
:::paatos-heitto{author="Catventurist" role="steward" date="2026-05-20"}
Pitäisikö ensikäynnin oletuskielen olla suomi vai englanti?
:::
::

`kaste` on yksinkertaisin muoto. Kyllä tai ei, sulkeutuu aamuun mennessä. Käytä sitä, kun kysymys on selkeä ja vastaus on kaksijakoinen.

## Äänten Lisääminen

Äänet heitetään `paatos-haara`n sisälle. Jokaisella äänellä on tyyppi ja paino.

- `support`, puolesta, virta liikkuu eteenpäin
- `concern`, ei este, mutta jotain jonka veden tulisi kantaa
- `amendment`, muutos itse ehdotukseen

## Haarautuminen

Kun huoli avaa uuden suunnan, käytä `paatos-haara`a joen haarautumiseen. Anna sille
`id`, jotta kaavio tietää mistä se tuli. `trigger`-ominaisuus kuvaa, mikä aiheutti haaran.

::paatos{type="haara" status="discussion"}
:::paatos-heitto{author="Catventurist" role="steward" date="2026-05-20"}
Pitäisikö Luodon pysyä sivuston nimenä julkaisun jälkeen?
:::
:::paatos-haara{id="pida" from="root" status="open"}
::::paatos-aani{author="Catventurist" role="steward" weight="3" type="support"}
Se on jo kaikkialla. Muuttaminen nyt kuluttaa enemmän kuin hyödyttää.
::::
::::paatos-aani{author="Tiera" role="trusted" weight="2" type="concern"}
Kolme neljästä käyttäjästä ei tiennyt, mitä luoto tarkoittaa ilman selitystä.
::::
:::
:::paatos-haara{id="vaihda" from="pida" status="open" trigger="concern"}
::::paatos-aani{author="Vellamo" role="trusted" weight="2" type="support"}
Virtauma on jo vahvempi termi. Luoto voisi olla ominaisuuden nimi.
::::
:::
:::paatos-ratkaisu{method="haara" status="pending"}
Molemmat haarat pysyvät auki. Palataan ennen 0.3.0.
:::
::

## Sulkeminen

Päätös sulkeutuu kun sen tyypin ehdot täyttyvät. `pato` vaatii kaikkien kivien
poistamisen. `karikko` vaatii lähes yksimielisen suostumuksen. `tulva` sulkeutuu
kun aikaikkuna umpeutuu riippumatta, siitä ovatko kaikki vastanneet.

`paatos-ratkaisu` merkitsee, mihin vesi asettui ja miksi.

::callout{icon="i-lucide-droplet" color="primary"}
Päätös johon kukaan ei vastaa, ei ole epäonnistuminen. Se on kuin tyyni vesi. Kysymys
esitettiin, mutta kirjaukset pitävät sen tallessa.
::