<script setup lang="ts">
import { Motion } from 'motion-v'
import type { StepperItem } from '@nuxt/ui'

defineProps<{
  items: StepperItem[]
}>()
</script>

<template>
  <div class="w-full p-4 my-8 flex flex-col gap-6">
    <Motion
      v-for="(item, index) in items"
      :key="item.title"
      :initial="{ opacity: 0, x: -12, filter: 'blur(4px)' }"
      :animate="{ opacity: 1, x: 0, filter: 'blur(0px)' }"
      :transition="{ delay: index * 0.15, duration: 0.5, ease: 'easeOut' }"
      :while-hover="{ translateX: 4 }"
    >
      <div class="flex gap-4 items-start group">
        <div class="flex flex-col items-center shrink-0">
          <Motion
            :animate="{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }"
            :transition="{ duration: 3 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }"
          >
            <div class="size-12 rounded-full bg-primary/5 ring-2 ring-primary/20 ring-offset-2 shadow-lg shadow-primary flex items-center justify-center">
              <UIcon
                :name="item.icon"
                class="size-6 text-primary"
              />
            </div>
          </Motion>
          <Motion
            v-if="index < items.length - 1"
            :initial="{ scaleY: 0, opacity: 0 }"
            :animate="{ scaleY: 1, opacity: 1 }"
            :transition="{ delay: index * 0.15 + 0.3, duration: 0.6, ease: 'easeOut' }"
            class="origin-top"
          >
            <div class="w-px h-10 bg-linear-to-b from-primary/40 via-primary/20 to-primary/5 mt-1" />
          </Motion>
        </div>
        <div class="pb-2 pt-1">
          <p class="font-semibold tracking-tight text-highlighted text-base">
            {{ item.title }}
          </p>
          <p class="text-muted text-sm leading-relaxed mt-0.5">
            {{ item.description }}
          </p>
        </div>
      </div>
    </Motion>
  </div>
</template>

<!-- ::WaterStepper
---
items:
  - title: Tavoite muodostuu
    description: Yhteinen suunta antaa vedelle paikan, johon virrata.
    icon: i-lucide-mountain
  - title: Pisarat syntyvät
    description: Tietoa aletaan kantaa. Jokainen pisara on elävä.
    icon: i-lucide-droplets
  - title: Virtaus tulee näkyväksi
    description: Julkiset signaalit muodostavat kuvan virtauksesta.
    icon: i-lucide-waves-horizontal
  - title: Haihtuminen havaitaan
    description: Pysähtynyt pisara tulee näkyväksi ajoissa.
    icon: i-lucide-wind
  - title: Pisara saapuu mereen
    description: Tavoite saavutettu. Tieto on valmis.
    icon: i-lucide-anchor
  - title: Uudet virrat syntyvät
    description: Vesikierto jatkuu. Uudet tavoitteet muodostuvat.
    icon: i-lucide-git-branch
---
:: -->
