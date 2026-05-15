<script setup lang="ts">
import { Motion, AnimatePresence } from 'motion-v'
</script>

<template>
  <AnimatePresence>
    <Motion
      as="div"
      class="fixed inset-0 z-50 flex items-center justify-center bg-default"
      :initial="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
      :transition="{ duration: 0.6, ease: 'easeOut' }"
    >
      <VLogo :size="96" />
    </Motion>
  </AnimatePresence>
</template>
