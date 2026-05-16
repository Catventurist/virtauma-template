---
title: Vesikomponentit
description: Kokoelma vesiteemaisia animaatiokomponentteja
---

Joukko komponentteja jotka on rakennettu veden, syvyyden ja nestemäisen liikkeen ympärille. 

Jokainen käyttää jousifysiikkaa ja SVG-animaatiota luodakseen jotain joka tuntuu elävältä, eikä mekaaniselta.

## WateryMotion

Kääre, joka lisää nestemäiset jousianimaatiot mihin tahansa. 

Saapuu alta kuin nousisi veden läpi, reagoi osoitin- ja painallustoimintoihin pintajännitysfysiikalla. 

Käytä `index`-proppia porrastaaksesi useita kohteita luonnollisesti.

::watery-motion
---
index: 0
---
Tämä kortti kelluu sisään alta ja reagoi osoittimeen sekä painalluksiin.
::

::watery-motion
---
index: 1
---
Tämä seuraa pienellä viiveellä, kuin eri nopeuksilla nousevat kuplat.
::

## WaterySeparator

SVG-osionjako, jossa kolme aaltotasoa muuntuu jatkuvasti. Käytä sitä sivuosioiden välillä luomaan syvyyden tunnetta.

::watery-separator
---
height: 80
---
::

Käännä suunta osioiden välillä:

::watery-separator
---
height: 80
flip: true
---
::

## WateryBadge

Merkki joka käyttäytyy kuin kupla, ponnahtaa esiin, leijuu, räjähtää klikkauksesta ja lähettää hiukkassirpaleita. 

Tukee sonaripulssirenkaita ja arvomuutosanimaatioita.

::watery-badge
---
value: 12
color: primary
float: true
pulse: true
---
::

::watery-badge
---
value: 99
color: error
variant: chip
size: lg
---
::

::watery-badge
---
variant: dot
color: success
pulse: true
float: true
---
::

## WateryFlow

Pystysuora aikajana, jossa hohtava viiva virtaa sivua pitkin alaspäin. 

Solmut leijuvat kuin kuplat, kortit vuorottelevat puolia. Klikkaa solmua valitaksesi sen.

::watery-flow
---
variant: stream
gap: md
items:
  - id: 1
    label: Lähde
    description: Sieltä missä joki alkaa
    date: Tam 2026
    icon: i-lucide-droplets
    type: event
  - id: 2
    label: Virta
    description: Virtaa alavirtaan
    date: Maa 2026
    icon: i-lucide-waves
    type: status
    color: info
  - id: 3
    label: Kosket
    description: Liikkuu nyt nopeasti
    date: Kes 2026
    icon: i-lucide-zap
    type: event
    color: warning
  - id: 4
    label: Delta
    description: Saavuttaa meren
    date: Jou 2026
    icon: i-lucide-anchor
    type: event
    color: success
---
::
