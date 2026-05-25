---
title: Tapio
description: Metsä vie äänet. Tapio muistaa tien.
navigation:
  title: Tapio
  icon: i-lucide-radio-tower
author: Kissa
avatar: /cat.png
tag: Tarina
tagColor: primary
kind: lore
level: surface
time: 5min
likes: 0
replies: 0
publishedAt: 2026-05-25
tags: [pwa, offline, tapio, vipunen]
---

::tip
Tuleva ominaisuus
::

Suomessa on paikkoja , joissa signaali katoaa ja metsä ottaa vallan.

Virtauman pitää toimia sielläkin.

Tapio on side, joka opettaa selaimen muistamaan. Kun tornit vaikenevat, Vipusen tieto kulkee silti mukanasi.

## Kokoa välineet

```bash
npx nuxi module add @vite-pwa/nuxt
```

## Kudo side

Lisää `nuxt.config.ts`-tiedostoon `pwa`-lohko.

```ts
pwa: {
  registerType: 'autoUpdate',
  manifest: {
    name: 'Virtauma',
    short_name: 'Virtauma',
    theme_color: '#268a7f',
    background_color: '#f0f9f7',
    display: 'standalone',
    icons: [
      { src: '/pwa-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/pwa-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  workbox: {
    navigateFallback: '/',
    globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    runtimeCaching: [
      {
        urlPattern: /\/_content\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'vipunen-content',
          expiration: { maxEntries: 200, maxAgeSeconds: 604800 },
        },
      },
    ],
  },
},
```

`CacheFirst` tarkoittaa, että Vipunen puhuu ensin muististaan
ja tarkistaa joesta vain kun se voi.

## Kun signaali katoaa

Kun yhteys katkeaa, kylän pitää tietää. Lisää
`VirtaumaOfflineBanner.vue` ja aseta se `app.vue`-tiedostossa
`<NuxtPage />`-komponentin yläpuolelle.

```vue
<script setup lang="ts">
const { t } = useI18n()
const online = useOnline()
</script>

<template>
  <Transition name="slide">
    <UBanner
      v-if="!online"
      color="warning"
      icon="i-lucide-wifi-off"
      :title="t('offline.banner')"
    />
  </Transition>
</template>
```

Lisää lokalisaatiot `fi.yaml`- ja `en.yaml`-tiedostoihin:

```yaml
offline:
  banner: 'Yhteys poikki - selaat tallennettua sisältöä'
```

```yaml
offline:
  banner: 'You are offline - browsing cached content'
```

## Kylän merkki

Aseta Virtauman merkki tiedostoina `pwa-192.png` ja `pwa-512.png` kansioon `/public`. `theme_color` on järven väri, `--color-jarvi-500`.