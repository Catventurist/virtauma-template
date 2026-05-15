<script setup lang="ts">
import { Motion } from 'motion-v'

defineProps<{
  title?: string
  tiers: {
    word: string
    translation: string
    description: string
  }[]
}>()
</script>

<template>
  <section class="py-16">
    <UContainer>
      <Motion
        as="div"
        class="mb-12 flex items-center gap-4"
        :initial="{ opacity: 0, x: -16 }"
        :while-in-view="{ opacity: 1, x: 0 }"
        :viewport="{ once: true }"
        :transition="{ duration: 0.5, ease: 'easeOut' }"
      >
        <div class="h-px flex-1 bg-linear-to-r from-primary/40 to-transparent" />
        <span class="text-xs font-semibold uppercase tracking-widest text-muted">{{ title }}</span>
        <div class="h-px flex-1 bg-linear-to-l from-primary/40 to-transparent" />
      </Motion>

      <div class="flex flex-col-reverse gap-3 max-w-2xl mx-auto">
        <Motion
          v-for="(tier, i) in tiers"
          :key="tier.word"
          as="div"
          class="relative overflow-hidden rounded-xl ring ring-default bg-elevated/50"
          :initial="{ opacity: 0, x: -32 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :viewport="{ once: true, margin: '-40px' }"
          :transition="{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }"
          :style="{ marginLeft: `${i * 5}%`, marginRight: `${(tiers.length - 1 - i) * 2}%` }"
        >
          <Motion
            as="div"
            class="absolute inset-0 bg-primary/10 origin-left"
            :initial="{ scaleX: 0 }"
            :while-in-view="{ scaleX: 1 }"
            :viewport="{ once: true }"
            :transition="{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 + 0.2 }"
          />

          <div class="relative z-10 flex items-center gap-6 px-6 py-4">
            <span class="text-2xl font-bold text-primary w-32 shrink-0">{{ tier.word }}</span>
            <span class="text-xs font-medium uppercase tracking-widest text-muted w-24 shrink-0">{{ tier.translation }}</span>
            <p class="text-sm text-toned leading-relaxed">
              {{ tier.description }}
            </p>
          </div>
        </Motion>
      </div>
    </UContainer>
  </section>
</template>
