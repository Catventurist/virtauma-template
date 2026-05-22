---
title: Kuutar
description: Kuunkuoro paljastaa seitsemän energiaa, päivä kerrallaan.
navigation:
  title: Kuutar
  icon: i-lucide-moon-star
kind: component
level: surface
author: Virtauma
avatar: /cat.png
tag: Component
tagColor: primary
time: daily
likes: 0
replies: 0
publishedAt: 2026-05-21
tags: [component, chakra, kalevala, i18n, motion]
---

## Kuutar

Päivittäinen shakrakumppani, juurtunut suomalaiseen kansanperinteeseen. Jokainen seitsemästä shakrasta on yhdistetty Kalevalan hahmoon, joka vaihtuu automaattisesti viikonpäivän mukaan.

### Käyttö

```vue
<Kuutar />
```

### Toiminta

Aktiivinen shakra määräytyy `new Date().getDay()` avulla, joka yhdistää viikonpäivän shakraan `useKuutar`-skriptin kautta. 

Sovelluksen teema päivittyy vastaamaan sitä.

| Päivä | Shakra | Hahmo |
|-------|--------|-------|
| Sunnuntai | Kruunu | Ukko |
| Maanantai | Kolmas silmä | Louhi |
| Tiistai | Kurkku | Väinämöinen |
| Keskiviikko | Sydän | Mielikki |
| Torstai | Aurinkopunos | Ilmarinen |
| Perjantai | Sakraali | Lemminkäinen |
| Lauantai | Juuri | Tapio |

### Vuorovaikutus

- Klikkaa keskeistä kuvaketta avataksesi paneelin
- Klikkaa mitä tahansa seitsemästä painikkeesta vaihtaaksesi shakraa manuaalisesti
- Paina `Escape` tai klikkaa ulkopuolelle sulkeaksesi paneelin
- Palaa tämän päivän shakraan nollausnapilla

### i18n

Tukee kieliä `en` ja `fi`. Käännökset sijaitsevat `i18n/locales/`-kansiossa.

### Riippuvuudet

- `motion-v`, animaatiot
- `@vueuse/core`, `onClickOutside`, `onKeyStroke`
- `@nuxtjs/i18n`, käännökset