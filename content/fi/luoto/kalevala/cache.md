---
title: Välimuististrategia
description: Vesiaiheinen malli oikean välimuististrategian valintaan Virtaumassa.
navigation:
  icon: i-lucide-waves-horizontal
---

## Välimuististrategia

Vesiaiheinen malli oikean välimuississtrategian valintaan.

```ts
routeRules: {
  '/': { prerender: true },
  '/blog/**': { isr: 3600 },
  '/feed/**': { swr: 60 },
  '/api/**': { cache: { maxAge: 60 } },
}
```

### Jää - (`prerender: true`)

Jäätynyt rakennushetkellä. Ei muutu ennen seuraavaa julkaisua.

Sopii staattisille sivuille, jotka muuttuvat harvoin, kuten `'/'`.

### Vuorovesi - (`isr`)

Päivittyy säännöllisin väliajoin taustalla.

Sopii dokumentaatiolle tai blogeille, jotka muuttuvat silloin tällöin. `'/blog/**': { isr: 3600 }` tarkistaa tunnin välein.

### Joki - (`swr`)

Virtaa jatkuvasti. Tarjoaa vanhan version samalla kun hakee uuden.

Sopii usein päivittyvälle datalle, jossa nopeus on tärkeämpää kuin tuoreus. `'/feed/**': { swr: 60 }` pitää virran käynnissä.

### Tekojärvi - (`cache`)

Varastoidaan ja jaellaan pyydettäessä. Tyhjenee `maxAge`-ajan jälkeen.

Sopii API-reiteille, joilla on ennustettava elinikä. `'/api/**': { cache: { maxAge: 60 } }` täyttyy minuutin välein.

### Sade - (SSR, ei välimuistia)

Tuoretta joka kerta, suoraan lähteestä.

Sopii dynaamiselle, käyttäjäkohtaiselle datalle. `/profile` ei tarvitse sääntöä, SSR on oletus.

> **Valitse vetesi viisaasti, ei jokainen sivu tarvitse sadetta.**