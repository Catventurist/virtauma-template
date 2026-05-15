<script setup lang="ts">
import { Motion } from 'motion-v'

defineProps<{
  title?: string
  phases: {
    word: string
    translation: string
    description: string
  }[]
}>()
</script>

<template>
  <section class="py-16 overflow-hidden">
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

      <div class="relative flex flex-col gap-0">
        <Motion
          as="div"
          class="absolute left-[calc(50%-1px)] top-0 bottom-0 w-px bg-linear-to-b from-transparent via-primary/30 to-transparent origin-top"
          :initial="{ scaleY: 0 }"
          :while-in-view="{ scaleY: 1 }"
          :viewport="{ once: true }"
          :transition="{ duration: 1.5, ease: 'easeOut' }"
        />

        <div
          v-for="(phase, i) in phases"
          :key="phase.word"
          class="relative grid grid-cols-2 gap-8 items-center py-8"
        >
          <Motion
            as="div"
            class="flex flex-col gap-1"
            :class="i % 2 === 0 ? 'text-right' : 'order-3'"
            :initial="{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }"
            :while-in-view="{ opacity: 1, x: 0 }"
            :viewport="{ once: true, margin: '-60px' }"
            :transition="{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }"
          >
            <span class="text-3xl font-bold text-primary">{{ phase.word }}</span>
            <span class="text-xs font-medium uppercase tracking-widest text-muted">{{ phase.translation }}</span>
            <p class="text-sm text-toned leading-relaxed mt-1">
              {{ phase.description }}
            </p>
          </Motion>

          <Motion
            as="div"
            class="flex justify-center"
            :class="i % 2 === 0 ? '' : 'order-2'"
            :initial="{ opacity: 0, scale: 0.5 }"
            :while-in-view="{ opacity: 1, scale: 1 }"
            :viewport="{ once: true, margin: '-60px' }"
            :transition="{ type: 'spring', stiffness: 300, damping: 20, delay: 0.05 }"
          >
            <div class="relative flex items-center justify-center">
              <Motion
                as="div"
                class="absolute w-10 h-10 rounded-full bg-primary/10"
                :animate="{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }"
                :transition="{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }"
              />
              <div class="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20 z-10" />
            </div>
          </Motion>
        </div>
      </div>
    </UContainer>
  </section>
</template>
