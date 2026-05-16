<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v'

const props = withDefaults(defineProps<{
  index?: number
}>(), {
  index: 0
})

const reduced = ref(false)

onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

const delay = computed(() => props.index * 0.08)
const isHovered = ref(false)
</script>

<template>
  <div class="relative overflow-hidden">
    <AnimatePresence>
      <motion.div
        class="relative"
        style="will-change: transform;"
        :initial="reduced ? false : { opacity: 0, y: 20, filter: 'blur(6px)' }"
        :animate="reduced ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }"
        :exit="reduced ? {} : { opacity: 0, y: 20, filter: 'blur(6px)' }"
        :while-hover="reduced ? {} : { scale: 1.03, filter: 'brightness(1.04)' }"
        :while-press="reduced ? {} : { scale: 0.96, filter: 'brightness(0.97)' }"
        :transition="{
          default: { type: 'spring', stiffness: 80, damping: 20, delay: delay },
          scale: { type: 'spring', stiffness: 200, damping: 30 },
          filter: { type: 'spring', stiffness: 200, damping: 30 }
        }"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
      >
        <slot />

        <AnimatePresence>
          <motion.div
            v-if="isHovered && !reduced"
            class="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :exit="{ opacity: 0 }"
          >
            <motion.div
              class="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
              :initial="{ x: '-100%' }"
              :animate="{ x: '100%' }"
              :transition="{ duration: 0.6, repeat: Infinity, repeatDelay: 0.4, ease: 'easeInOut' }"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
