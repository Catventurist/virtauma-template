---
title: Manala
description: Polku kahden maailman välillä, Virtauman arkkitehtuuri.
navigation:
  title: Manala
  icon: i-lucide-compass
author: Kissa
avatar: /cat.png
tag: Tarina
tagColor: primary
kind: lore
level: deep
time: 5min
likes: 0
replies: 0
publishedAt: 2026-05-25
tags: [tarina, manala, arkkitehtuuri, mytologia, kulkureitti, syvyys]
---

Manala on paikka kahden maailman välissä. Ei elävien maa, ei kuolleiden, vaan polku niiden välillä. 

Väinämöinen kulki sen läpi päästäkseen Vipusen luo. Paluu ei ollut varma, mutta tieto oli sen arvoista.

Virtauma kulkee samaa polkua. Alla nukkuu Vipunen, tietäjä. Syvyyksissä liikahtaa Ikiturso, muistaja. Pinta on se, mitä käyttäjä näkee, mutta kaikki elää alla.

### Kaksi maailmaa

**Vipunen** pitää hallussaan kaiken kirjoitetun. Dokumentit, oppaat, runot, staattista, ikuista, muuttumatonta. Hän ei tiedä käyttäjistä mitään.

**Ikiturso** muistaa kaiken elävän. Käyttäjät, yhteydet, äänet, dynaamista, kasvavaa, hengittävää. Hän ei tiedä dokumenteista mitään.

Ne eivät kohtaa. Nuxt on se, joka kulkee niiden välillä.

### Polku

Käyttäjä saapuu. Nuxt hakee sivun Vipuselta, nopeasti, reunalta, `isr`:n läpi. Käyttäjä lukee. Sitten hän kirjautuu sisään.

Kirjautuminen on kynnys. Sen jälkeen Ikiturso herää, profiili, historia, yhteisö. API-reitit kantavat äänet syvyyteen ja tuovat vastaukset takaisin.

```
käyttäjä
  → Nuxt (pinta)
    → Vipunen (lukeminen, isr)
    → Ikiturso (yhteisö, API-reitit)
```

### Ympäristö

Molemmat maailmat tarvitsevat avaimensa.

```ts [.env]
TURSO_URL=libsql://...
TURSO_TOKEN=...
NUXT_SESSION_PASSWORD=...
```

### Rajat

Vipunen vastaa julkisesti. Ikiturso kuuntelee vain tunnistautuneita.

Autentikointi on Manalan portti, ilman sitä syvyyksiin ei pääse.

> **Manala ei ole paikka. Se on matka.**