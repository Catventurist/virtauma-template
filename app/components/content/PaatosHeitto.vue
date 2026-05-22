<script setup lang="ts">
import { Motion } from 'motion-v'

const props = withDefaults(defineProps<{
  author?: string
  date?: string
}>(), {
  author: 'Väinämöinen'
})
</script>

<template>
  <Motion
    :initial="{ opacity: 0, scale: 0.98, y: 8 }"
    :animate="{ opacity: 1, scale: 1, y: 0 }"
    :transition="{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }"
    :while-hover="{ scaleY: 0.98 }"
    :transition-hover="{ duration: 0.2 }"
    class="px-5 py-5 relative"
  >
    <Motion
      class="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full origin-top"
      :initial="{ scaleY: 0 }"
      :animate="{ scaleY: 1 }"
      :transition="{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }"
    />
    <div class="flex items-center gap-2 mb-3">
      <Motion
        :while-hover="{ scale: 1.05 }"
        :transition="{ duration: 0.15 }"
        class="text-xs font-semibold text-highlighted"
      >
        {{ props.author }}
      </Motion>
      <span
        v-if="date"
        class="text-xs text-muted ml-auto"
      >{{ date }}</span>
    </div>
    <div class="text-sm text-default leading-relaxed">
      <slot />
    </div>
  </Motion>
</template>
