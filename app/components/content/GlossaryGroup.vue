<script setup lang="ts">
import { Motion } from 'motion-v'

defineProps<{
  title: string
  terms: {
    word: string
    translation: string
    description: string
    featured?: boolean
  }[]
}>()
</script>

<template>
  <section class="py-16">
    <UContainer>
      <Motion
        as="div"
        class="mb-10 flex items-center gap-4"
        :initial="{ opacity: 0, x: -16 }"
        :while-in-view="{ opacity: 1, x: 0 }"
        :viewport="{ once: true }"
        :transition="{ duration: 0.5, ease: 'easeOut' }"
      >
        <div class="h-px flex-1 bg-linear-to-r from-primary/40 to-transparent" />
        <span class="text-xs font-semibold uppercase tracking-widest text-muted">{{ title }}</span>
        <div class="h-px flex-1 bg-linear-to-l from-primary/40 to-transparent" />
      </Motion>

      <div class="grid grid-cols-2 lg:grid-cols-4 auto-rows-[180px] gap-4">
        <GlossaryTerm
          v-for="(term, i) in terms"
          :key="term.word"
          v-bind="term"
          :delay="i * 0.08"
        />
      </div>
    </UContainer>
  </section>
</template>
