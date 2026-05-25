---
title: Heijastus
description: Jokainen sivu heijastaa itsensä maailmaan. Heijastus muokkaa sen, mitä maailma näkee ennen saapumistaan.
navigation:
  title: Heijastus
  icon: i-lucide-image
author: Kissa
avatar: /cat.png
tag: Opas
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
Tuleva ominaisuus
::

Kun Virtauman sivu jaetaan, se heijastaa itsensä maailmaan ennen kuin vierailija saapuu. Heijastus on kuva, joka matkaa edellä.

Tämä opas käy läpi moduulin asennuksen, kuvan esikatselun DevToolsissa ja Virtauman väreissä puhuvan pohjan rakentamisen.

## Kokoa välineet

```bash
npx nuxi module add nuxt-og-image
```

Ota Nuxt DevTools käyttöön jos et ole vielä tehnyt niin — tarvitset
sitä heijastuksen muokkaamiseen.

## Luo ensimmäinen heijastus

Avaa jokin sivu ja kutsu `defineOgImage` antaaksesi moduulin tuottaa
jotain. Käytä ensin oletuspohjaa, jotta näet sen hengittävän.

```vue
<script setup lang="ts">
defineOgImage('NuxtSeo.takumi')
</script>
```

Avaa sivu selaimessa, avaa DevTools näppäinyhdistelmällä `Shift + Alt + D`,
siirry komentovalikkoon `Ctrl + K` ja kirjoita `og`. Näet kuvan.

Kokeile oletuspohjan asetuksia ennen kuin jatkat eteenpäin.

```vue
<script setup lang="ts">
defineOgImage('NuxtSeo.takumi', {
  title: 'Virtauma',
  description: 'Suomalainen kansanperinteen yhteisö',
  colorMode: 'dark',
})
</script>
```

## Veistä oma pohja

Yhteisöpohjat on tarkoitettu vain kehityskäyttöön. Virtaumalle
veistämme oman.

Luo `components/OgImage/Heijastus.takumi.vue`. Moduuli rekisteröi
automaattisesti kaikki `OgImage`-kansioon lisätyt komponentit. Pääte
`.takumi` kertoo moduulille, mitä renderöijää käytetään.

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

## Ota heijastus käyttöön

Välitä sivun metatiedot pohjan propseina. Kokoelman avain rakennetaan
aktiivisesta kielestä, jotta Vipunen lukee aina oikealta kieleltä.

```vue
<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()

const { data: page } = await useAsyncData(() =>
  queryCollection('content_' + locale.value as keyof PageCollections)
    .path(route.path)
    .first()
)

defineOgImage('Heijastus.takumi', {
  title:       page.value?.title,
  description: page.value?.description,
  kind:        page.value?.kind,
  level:       page.value?.level,
})
</script>
```

Tarkista DevTools. Jokainen sivu heijastaa itsensä Virtauman väreissä, muokattuna sen luonteen ja syvyyden mukaan.

## Huomio dynaamisista luokista

Moduuli käsittelee CSS-luokat käännösaikana. Dynaamiset Tailwind-luokat, kuten `:class="['text-' + color]"` eivät toimi. 

Käytä `:style`-sidontaa kaikille ominaisuuksista johdetuille arvoille, kuten yllä olevassa pohjassa.

Staattiset Tailwind-luokat, CSS-muuttujat ja Nuxt UI:n värit toimivat ilman lisämäärittelyjä.