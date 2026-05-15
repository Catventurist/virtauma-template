<script setup lang="ts">
import { Motion } from 'motion-v'

defineProps<{
  statements?: string[]
  quote?: string
  quoteAttribution?: string
  paragraphs?: string[]
}>()
</script>

<template>
  <section class="relative py-24 overflow-hidden">
    <Motion
      as="div"
      class="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/5 blur-3xl"
      :animate="{ scale: [1, 1.1, 1], y: [0, 30, 0] }"
      :transition="{ duration: 14, repeat: Infinity, ease: 'easeInOut' }"
    />

    <UContainer>
      <div class="max-w-3xl mx-auto flex flex-col gap-16">
        <div
          v-if="statements?.length"
          class="flex flex-col gap-6"
        >
          <Motion
            v-for="(statement, i) in statements"
            :key="i"
            as="p"
            class="text-2xl md:text-3xl font-semibold text-highlighted leading-snug"
            :initial="{ opacity: 0, y: 24 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true, margin: '-60px' }"
            :transition="{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }"
          >
            {{ statement }}
          </Motion>
        </div>

        <Motion
          v-if="quote"
          as="blockquote"
          class="relative border-l-2 border-primary/40 pl-8 py-2"
          :initial="{ opacity: 0, x: -16 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :viewport="{ once: true, margin: '-60px' }"
          :transition="{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }"
        >
          <Motion
            as="div"
            class="absolute -left-px top-0 bottom-0 w-0.5 bg-primary origin-top"
            :initial="{ scaleY: 0 }"
            :while-in-view="{ scaleY: 1 }"
            :viewport="{ once: true }"
            :transition="{ duration: 0.9, ease: 'easeOut' }"
          />
          <p class="text-xl md:text-2xl text-muted italic leading-relaxed">
            {{ quote }}
          </p>
          <p
            v-if="quoteAttribution"
            class="mt-4 text-sm text-muted/60 not-italic"
          >
            — {{ quoteAttribution }}
          </p>
        </Motion>

        <div
          v-if="paragraphs?.length"
          class="flex flex-col gap-6"
        >
          <Motion
            v-for="(paragraph, i) in paragraphs"
            :key="i"
            as="p"
            class="text-base text-toned leading-relaxed"
            :initial="{ opacity: 0, y: 16 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true, margin: '-40px' }"
            :transition="{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }"
          >
            {{ paragraph }}
          </Motion>
        </div>
      </div>
    </UContainer>
  </section>
</template>
