<script setup lang="ts">
import { Motion } from 'motion-v'

const { size = 32 } = defineProps<{ size?: number }>()

const hovered = ref(false)

const waveA = 'M -10,58 C 10,48 30,68 50,58 C 70,48 90,68 110,58 L 110,110 L -10,110 Z'
const waveB = 'M -10,58 C 10,68 30,48 50,58 C 70,68 90,48 110,58 L 110,110 L -10,110 Z'
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 100 100"
    fill="none"
    focusable="false"
    aria-hidden="true"
    class="cursor-pointer"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <defs>
      <clipPath id="logo-clip">
        <circle
          cx="50"
          cy="50"
          r="38"
        />
      </clipPath>
    </defs>

    <g clip-path="url(#logo-clip)">
      <Motion
        as="g"
        :initial="{ y: 60 }"
        :animate="{ y: hovered ? -15 : 0 }"
        :transition="{ duration: 0.8, ease: 'easeOut' }"
      >
        <Motion
          as="path"
          class="fill-primary/20"
          :animate="{ d: [waveA, waveB] }"
          :transition="{ duration: 2.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }"
        />
        <Motion
          as="path"
          class="fill-primary/60"
          :animate="{ d: [waveB, waveA] }"
          :transition="{ duration: 2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 0.1 }"
        />
      </Motion>
    </g>

    <Motion
      as="circle"
      cx="50"
      cy="50"
      r="38"
      class="stroke-primary"
      stroke-width="2"
      :initial="{ pathLength: 0, opacity: 0 }"
      :animate="{ pathLength: 1, opacity: 1, scale: hovered ? 1.06 : 1 }"
      :transition="{ pathLength: { duration: 1.2, ease: 'easeOut' }, scale: { duration: 0.4 } }"
    />
  </svg>
</template>
