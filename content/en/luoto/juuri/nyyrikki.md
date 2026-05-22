---
title: Nyyrikki
description: Tapion poika, metsästäjä joka löytää reitin jossa ei ole polkua.
navigation:
  title: Nyyrikki
  icon: i-lucide-move
kind: component
level: surface
author: Virtauma
avatar: /cat.png
tag: Component
tagColor: primary
time: interactive
likes: 0
replies: 0
publishedAt: 2026-05-21
tags: [component, navigation, gesture, motion, touch]
---

## Nyyrikki

Tilanavigaatiokomponentti, joka toimii kuin oikea ohjain. Vedä nuppia suuntaan ja se navigoi sisältöpuuta vastaavasti.

### Käyttö

```vue
<Nyyrikki @navigate="onNavigate" />
```

### Koko

```vue
<Nyyrikki :size="120" />
<Nyyrikki :size="200" />
<Nyyrikki :size="320" />
```

### Suunnat

Tukee kahdeksaa suuntaa.

| Suunta | Merkitys |
|--------|----------|
| up | Ylös hierarkiassa |
| down | Alas hierarkiassa |
| left | Edellinen sibling |
| right | Seuraava sibling |
| up-right | Ylös ja oikealle |
| down-right | Alas ja oikealle |
| down-left | Alas ja vasemmalle |
| up-left | Ylös ja vasemmalle |

### Vuorovaikutus

- Vedä nuppia haluamaasi suuntaan
- Nuoli syttyy, kun suunta on valittu
- Vapauta navigoidaksesi
- Nuppi palaa keskelle jousen lailla

### Rekvisiitta

| Nimi | Tyyppi | Oletus | Kuvaus |
|------|--------|--------|--------|
| size | number | 200 | Komponentin koko pikseleinä |

### Tapahtumat

| Nimi | Tyyppi | Kuvaus |
|------|--------|--------|
| navigate | Direction | Laukeaa kun käyttäjä vapauttaa nupin valitssa suunnassa |

### Riippuvuudet

- `motion-v` animaatiot ja pan-eleet