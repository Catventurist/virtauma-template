---
title: Kuitti
description: Lokaalisti muotoiltu kuitti-komponentti animaatioilla, valuuttaformatoinnilla ja maksettu-leimalla.
navigation:
  title: Kuitti
  icon: i-lucide-receipt
kind: component
level: surface
author: Kissa
avatar: /cat.png
tag: Komponentti
tagColor: primary
time: interactive
likes: 0
replies: 0
publishedAt: 2026-05-23
tags: [komponentti, animaatio, i18n, kalevala, maksaminen]
---

## Käyttö

```vue
<Kuitti
  :items="[
    { label: 'Mustikkapiirakka', qty: 1, value: 4.50 },
    { label: 'Kahvi', qty: 2, value: 3.00 },
  ]"
  subtitle="Pöytä 7"
  :date="new Date()"
  order-number="0042"
  :tax="1.35"
  :tip="2.00"
  footer="Kiitos!"
  :paid="true"
/>
```

## Ominaisuudet

| Ominaisuus | Tyyppi | Oletus | Kuvaus |
|------|--------|--------|--------|
| `title` | `string` | `t('receipt.title')` | Kuitin otsikko |
| `subtitle` | `string` | — | Alaotsikko |
| `date` | `Date` | — | Muotoillaan lokaalilla |
| `orderNumber` | `string` | — | Tilausnumero |
| `items` | `{ label, qty?, value }[]` | `[]` | Rivit |
| `tax` | `number` | — | Vero |
| `tip` | `number` | — | Tippi |
| `total` | — | laskettu | Rivit + vero + tippi |
| `footer` | `string` | — | Alateksti |
| `paid` | `boolean` | `false` | Näyttää maksettu-leiman |
| `currency` | `string` | `EUR` | ISO 4217 -valuuttakoodi |

## Tulostus

```vue
<script setup lang="ts">
const receipt = useTemplateRef('receipt')
</script>

<template>
  <Kuitti ref="receipt" />
  <UButton @click="receipt?.print()">Tulosta</UButton>
</template>
```

## i18n

```yml
receipt:
  title: KUITTI
  tax: ALV
  tip: TIPPI
  total: YHTEENSÄ
  paid: MAKSETTU
```
