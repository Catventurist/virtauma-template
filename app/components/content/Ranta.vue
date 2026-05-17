<script setup lang="ts">
import { Motion } from 'motion-v'

defineProps<{
  userId?: string
}>()
</script>

<template>
  <Motion
    as="div"
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :transition="{ duration: 0.8, ease: 'easeOut' }"
  >
    <RantaVisit v-if="!userId" />
    <RantaMember
      v-else
      :user-id="userId"
    />
  </Motion>
</template>
