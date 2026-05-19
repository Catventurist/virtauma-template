---
title: Sukellus
description: Sukeltava keskustelukomponentti yhteisön viesteille
navigation:
  icon: i-lucide-message-circle-more
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