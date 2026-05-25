---
title: Heijastus
description: Every page casts a reflection outward. Heijastus shapes what the world sees before it arrives.
navigation:
  title: Heijastus
  icon: i-lucide-image
author: Cat
avatar: /cat.png
tag: Guide
tagColor: secondary
kind: guide
level: surface
time: 10min
likes: 0
replies: 0
publishedAt: 2026-05-25
tags: [og, meta, heijastus, vipunen, seo]
---

::tip
Future feature
::

When a page from Virtauma is shared, it casts a reflection into the world before the visitor arrives. 

Heijastus is that reflection. The image that travels ahead.

This guide walks through installing the module, previewing the image in DevTools, and crafting a template that speaks in Virtauma's colours.

## Gather the Tools

```bash
npx nuxi module add nuxt-og-image
```

Enable Nuxt DevTools if you have not already, you will need it to preview the reflection as you shape it.

## Cast the First Reflection

Open any page and call `defineOgImage` to let the module generate something. 

Use the default template first, just to see it breathe.

```vue
<script setup lang="ts">
defineOgImage('NuxtSeo.takumi')
</script>
```

Visit the page, open DevTools with `Shift + Alt + D`, then open the
command palette with `Ctrl + K` and type `og`. You should see the image.

Play with what the default template accepts before moving on.

```vue
<script setup lang="ts">
defineOgImage('NuxtSeo.takumi', {
  title: 'Virtauma',
  description: 'Suomalainen kansanperinteen yhteisö',
  colorMode: 'dark',
})
</script>
```

## Shape Your Own Template

Community templates are for development only. For Virtauma, we carve
our own.

Create `components/OgImage/Heijastus.takumi.vue`. The module registers
any component inside an `OgImage` folder automatically. The `.takumi`
suffix tells it which renderer to use.

```vue
<script setup lang="ts">
const {
  title = 'Virtauma',
  description = '',
  kind = 'lore',
  level = 'surface',
} = defineProps<{
  title?: string
  description?: string
  kind?: 'guide' | 'reference' | 'ritual' | 'lore'
  level?: 'surface' | 'current' | 'deep'
}>()

const kindLabel: Record<string, string> = {
  guide: 'Opas',
  reference: 'Viite',
  ritual: 'Rituaali',
  lore: 'Tarina',
}

const levelColor: Record<string, string> = {
  surface: '#6dc2b5',
  current: '#268a7f',
  deep:    '#133b36',
}
</script>

<template>
  <div
    class="h-full w-full flex flex-col justify-between bg-[#f0f9f7]"
    :style="{ borderTop: `12px solid ${levelColor[level]}` }"
  >
    <div class="flex flex-col gap-6 p-20">
      <span class="text-2xl font-semibold text-[#1e6e65] uppercase tracking-widest">
        {{ kindLabel[kind] }}
      </span>
      <h1 class="text-[72px] font-bold text-[#133b36] leading-tight">
        {{ title }}
      </h1>
      <p class="text-3xl text-[#195850]">
        {{ description }}
      </p>
    </div>
    <div class="flex items-center justify-between px-20 pb-12">
      <span class="text-2xl text-[#268a7f]">virtauma.fi</span>
      <span
        class="text-xl px-6 py-2 rounded-full text-white"
        :style="{ background: levelColor[level] }"
      >
        {{ level }}
      </span>
    </div>
  </div>
</template>
```

## Use the Reflection

Pass your frontmatter fields through. In a content page this is straightforward with `useRoute` or your content query result.

```vue
<script setup lang="ts">
const { data: page } = await useAsyncData(() => queryCollection('content_' + locale.value as keyof PageCollections).path(route.path).first())

defineOgImage('Heijastus.takumi', {
  title:       page.value?.title,
  description: page.value?.description,
  kind:        page.value?.kind,
  level:       page.value?.level,
})
</script>
```

Check DevTools. Each page now casts a reflection in Virtauma's colours, shaped by what it is and how deep it runs.

## A Note on Dynamic Classes

The module processes CSS at build time. Dynamic Tailwind class names such as `:class="['text-' + color]"` will not resolve. 

Use `:style` bindings for anything driven by props, as shown in the template above.

Static Tailwind classes, CSS variables, and Nuxt UI colours all work without any extra configuration.