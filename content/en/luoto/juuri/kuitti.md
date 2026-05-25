---
title: Kuitti
description: A locale-aware receipt component with animations, currency formatting and a paid stamp.
navigation:
  title: Kuitti
  icon: i-lucide-receipt
kind: component
level: surface
author: Cat
avatar: /cat.png
tag: Component
tagColor: primary
time: interactive
likes: 0
replies: 0
publishedAt: 2026-05-21
tags: [component, animation, i18n, kalevala, payments]
---

## Usage

```vue
<Kuitti
  :items="[
    { label: 'Mustikkapiirakka', qty: 1, value: 4.50 },
    { label: 'Kahvi', qty: 2, value: 3.00 },
  ]"
  subtitle="Table 7"
  :date="new Date()"
  order-number="0042"
  :tax="1.35"
  :tip="2.00"
  footer="Kiitos!"
  :paid="true"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `t('receipt.title')` | Receipt title |
| `subtitle` | `string` | — | Subtitle below title |
| `date` | `Date` | — | Formatted with locale |
| `orderNumber` | `string` | — | Displayed next to date |
| `items` | `{ label, qty?, value }[]` | `[]` | Line items |
| `tax` | `number` | — | Tax amount |
| `tip` | `number` | — | Tip amount |
| `total` | — | computed | Sum of items + tax + tip |
| `footer` | `string` | — | Footer message |
| `paid` | `boolean` | `false` | Shows paid stamp |
| `currency` | `string` | `EUR` | ISO 4217 currency code |

## Print

```vue
<script setup lang="ts">
const receipt = useTemplateRef('receipt')
</script>

<template>
  <Kuitti ref="receipt" />
  <UButton @click="receipt?.print()">Print</UButton>
</template>
```

## i18n

```yml
receipt:
  title: RECEIPT
  tax: TAX
  tip: TIP
  total: TOTAL
  paid: PAID
```