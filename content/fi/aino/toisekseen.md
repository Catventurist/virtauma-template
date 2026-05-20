---
title: Virtaus syvenee
description: Virta löytää syvyytensä. Perustasta syntyy muoto.
date: 2026-05-20
version: 0.2.0
badge: Tide
milestone: form
navigation:
  icon: i-lucide-waves
builders:
  - name: Catventurist
    avatar:
      src: /cat.png
    to: https://github.com/Catventurist
---

## Metsässä

- Vipunen oppii hengittämään kahdella kielellä. Kielivarauma virtaa nyt kokoelman läpi ohjaamatta tyhjälle sivulle
- Tiera löytää jalansijansa. Navigaatiopuu rakentuu oikein sisäkkäisistä kokoelmista, eikä enää eksy syvillä reiteillä
- Etsi avautuu. Hakuindeksoinnin ensimmäinen kierros liitetty Vipusen kokoelmaan ja `queryCollection` syöttää indeksiä rakennusaikana
- Välimuisti vartioi ovea. Kokoelmakyselyiden välimuististrategia määritelty, vanhentuneet merkinnät eivät enää selviä tuoreesta työnnöstä
- Kielet ja Vipunen esitelty. Kaksi maailmaa puhuu nyt toisilleen
- Kokko sai nimensä takaisin. Käyttöönottoputki liitetty, jokainen työntö päähaaran päähän herättää hänet

## Rannalla

- Manala siirtyi lattian alla. Sisältöhakemiston rakenne muuttui `content/docs/`  muodosta `content/en/docs` muotoon. Päivitä kokoelmapolkusi ennen päivitystä
- Tieran ominaisuus uudelleennimetty. `navigation` on nyt `navi`kaikissa asettelukomponenteissa. Etsi ja korvaa ennen työntöä
- Vipunen vaatii nyt tarkan lokaalin kokoelmakyselyissä, kun `i18n` on aktiivinen. Kutsut ilman kieltä palauttavat oletuksen, mutta kirjaavat varoituksen

## Vedessä

- Korjattu Etsi palauttamasta vanhentuneita tuloksia sisältöpäivityksen jälkeen ilman uudelleenrakennusta
- Korjattu Tiera menettämästä aktiivitilaa sivun päivityksessä sisäkkäisillä reiteillä
- Korjattu Välimuisti pitämästä vanhentuneita merkintöjä käyttöönottojen välillä
- Ainon ensimmäinen merkintä näyttäytyy nyt oikein kaikilla tuetuilla kielillä

> **Virtaus ei kysy lupaa. Se löytää tien.**