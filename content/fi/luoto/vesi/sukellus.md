---
title: Sukellus - Säikeet
description: Sukeltava keskustelukomponentti yhteisön säikeille.
navigation:
  title: Sukellus - Säikeet
  icon: i-lucide-message-circle-more
author: Kissa
avatar: /cat.png
tag: Opas
tagColor: primary
kind: guide
level: current
time: 3min
likes: 0
replies: 0
publishedAt: 2026-05-25
tags: [opas, saikeet, keskustelu, yhteiso, animaatio]
---

## Sukellus

Mukaansatempaava keskustelukomponentti. Klikkaa viestiä sukeltaaksesi syvemmälle, katso vastausten uivan sivuilta esiin.

## Käyttö

::Sukellus
---
title: Sammon taonta
thread:
  - id: 1
    author: Väinämöinen
    text: Mitä rakentaisimme vesistä?
    replies:
      - id: 2
        author: Ilmarinen
        text: Jotain mitä maailma ei ole koskaan nähnyt
        replies:
          - id: 3
            author: Louhi
            text: Silloin se maksaa teille kaiken
            replies:
              - id: 4
                author: Väinämöinen
                text: Olkoon niin
---
::

## Ominaisuudet

| Ominaisuus | Tyyppi | Kuvaus |
|--------|--------|--------|
| `title` | `string` | Otsikko näytetään pinnalla |
| `thread` | `Message[]` | Juuritason viestit |

## Viestirakenne

| Kenttä | Tyyppi | Kuvaus |
|--------|--------|--------|
| `id` | `number` | Yksilöllinen tunniste |
| `author` | `string` | Viestin kirjoittaja |
| `text` | `string` | Viestin sisältö |
| `replies` | `Message[]` | Sisäkkäiset vastaukset, rajaton syvyys |