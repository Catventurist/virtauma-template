---
title: Etusivutarkistin
description: Työkalu puuttuvien etusivujen löytämiseen ja täydentämiseen Luoto-sisällössä.
navigation:
  title: Etusivutarkistin
  icon: i-lucide-file-search
author: Kissa
avatar: /cat.png
tag: Työkalu
tagColor: primary
kind: reference
level: surface
time: 3min
likes: 0
replies: 0
publishedAt: 2026-05-25
tags: [viite, etusivu, sisalto, tyokalu]
---

Työkalu sisällön löytämiseen, jolle ei ole vielä annettu haltijaa.

## Käyttö
```vue
  <VFrontmatterChecker />
```

## Mitä se löytää

Skannaa aktiivisen kielikokoelman ja nostaa pintaan kaikki merkinnät, joista puuttuu `author`-kenttä. Jokainen tulos näyttää orvon dokumentin otsikon, kuvauksen ja polun.

## Aukkojen täyttäminen

Klikkaa muokkauspainiketta missä tahansa merkinnässä

## Esimerkki

```md
---
title: Etusivutarkistin
description: Työkalu puuttuvien etusivujen löytämiseen ja täydentämiseen Luoto-sisällössä.
navigation:
  title: Etusivutarkistin
  icon: i-lucide-file-search
author: Kissa
avatar: /cat.png
tag: Työkalu
tagColor: primary
kind: reference
level: surface
time: 3min
likes: 0
replies: 0
publishedAt: 2026-05-25
tags: [viite, etusivu, sisalto, tyokalu]
---
```