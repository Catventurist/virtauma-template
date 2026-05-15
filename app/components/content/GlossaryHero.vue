<script setup lang="ts">
import { Motion } from 'motion-v'

defineProps<{
  title?: string
  subtitle?: string
  description?: string
}>()
</script>

<template>
  <div class="relative overflow-hidden py-24">
    <Motion
      as="div"
      class="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/10 blur-3xl"
      :animate="{ scale: [1, 1.1, 1], y: [0, 20, 0] }"
      :transition="{ duration: 10, repeat: Infinity, ease: 'easeInOut' }"
    />

    <UContainer>
      <div class="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
        <Motion
          :initial="{ opacity: 0, y: -10 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5 }"
        >
          <UBadge
            variant="subtle"
            color="primary"
            :label="subtitle"
          />
        </Motion>

        <Motion
          as="h1"
          class="text-5xl font-bold text-highlighted"
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.1 }"
        >
          {{ title }}
        </Motion>

        <Motion
          as="p"
          class="text-muted leading-relaxed"
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.2 }"
        >
          {{ description }}
        </Motion>
      </div>
    </UContainer>
  </div>
</template>
