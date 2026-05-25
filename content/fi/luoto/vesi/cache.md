---
title: Välimuississtrategia
description: Vesi-inspiroitunut mentaalimalli oikean välimuississtrategian valitsemiseen Virtaumassa.
navigation:
  title: Välimuississtrategia
  icon: i-lucide-waves-horizontal
author: Kissa
avatar: /cat.png
tag: Viite
tagColor: primary
kind: reference
level: current
time: 8min
likes: 0
replies: 0
publishedAt: 2026-05-25
tags: [viite, valimuisti, strategia, arkkitehtuuri]
---

## Välimuississtrategia

Vesi-inspiroitunut mentaalimalli oikean välimuississtrategian valitsemiseen.

```ts
routeRules: {
  '/': { prerender: true },
  '/blog/**': { isr: 3600 },
  '/feed/**': { swr: 60 },
  '/api/**': { cache: { maxAge: 60 } },
}
```

### Jää (`prerender: true`)

Täysin jäätynyt käännöshetkellä. Ei muutu ennen seuraavaa julkaisua.

Parhaiten soveltuu staattisille sivuille jotka päivittyvät harvoin, kuten `'/'`.

### Vuorovesi (`isr`)

Päivittyy ennustettavalla syklillä taustalla.

Parhaiten soveltuu dokumentaatiolle tai blogeille joiden sisältö muuttuu silloin tällöin. `'/blog/**': { isr: 3600 }` tarkistaa tunnin välein.

### Joki (`swr`)

Virtaa jatkuvasti. Tarjoilee vanhentuneen sisällön samalla kun hakee tuoretta taustalla.

Parhaiten soveltuu tiheästi päivittyvälle datalle jossa nopeus on tärkeämpää kuin tuoreus. `'/feed/**': { swr: 60 }` pitää virran liikkeessä.

### Tekojärvi (`cache`)

Varastoitu ja jaeltu tarpeen mukaan. Tyhjenee `maxAge`n jälkeen.

Parhaiten soveltuu API-reiteille joilla on ennustettava datan elinkaari. `'/api/**': { cache: { maxAge: 60 } }` täyttyy uudelleen minuutin välein.

### Sade (SSR, ei välimuistia)

Tuore joka kerta, suoraan lähteestä.

Parhaiten soveltuu erittäin dynaamiselle, käyttäjäkohtaiselle tai reaaliaikaiselle datalle. `/profile` ei tarvitse sääntöä, SSR on oletusarvo.

> **Valitse vetesi viisaasti, jokainen sivu ei tarvitse sadetta.**