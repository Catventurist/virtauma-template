---
title: Tapio
description: The forest takes the signal. Tapio remembers the way.
navigation:
  title: Tapio
  icon: i-lucide-radio-tower
author: Cat
avatar: /cat.png
tag: Lore
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
Future feature
::

There are places in Finland where the signal dies and the forest takes over.

Virtauma should still work there.

Tapio is the binding that teaches the browser to remember. When the towers fall silent, Vipunen's knowledge travels with you still.

## Gather the Tools

```bash
npx nuxi module add @vite-pwa/nuxt
```

## Weave the Binding

In `nuxt.config.ts`, add the `pwa` block.

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

`CacheFirst` on `/_content/*` means Vipunen speaks from memory first,
checking the river only when it can.

## When the Signal Fades

When the connection drops, the village should know. Add
`VirtaumaOfflineBanner.vue` and place it in `app.vue` above `<NuxtPage />`.

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

Locale entries in `fi.yaml` and `en.yaml`:

```yaml
offline:
  banner: 'Yhteys poikki - selaat tallennettua sisältöä'
```

```yaml
offline:
  banner: 'You are offline - browsing cached content'
```

## The Mark of the Village

Place your Virtauma mark as `pwa-192.png` and `pwa-512.png` in `/public`.
The `theme_color` is drawn from the lake, `--color-jarvi-500`.