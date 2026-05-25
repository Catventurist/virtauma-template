<script setup lang="ts">
import { useEventListener } from '@vueuse/core'

const strings = [
  { x1: 47, y1: 95, x2: 338, y2: 98 },
  { x1: 47, y1: 102, x2: 325, y2: 104 },
  { x1: 47, y1: 109, x2: 310, y2: 110 },
  { x1: 47, y1: 116, x2: 290, y2: 116 },
  { x1: 47, y1: 123, x2: 265, y2: 122 }
] as const

const stringProps = [
  { frequency: 12, amplitude: 8, duration: 0.6 },
  { frequency: 10, amplitude: 9, duration: 0.7 },
  { frequency: 8, amplitude: 10, duration: 0.8 },
  { frequency: 6, amplitude: 11, duration: 0.9 },
  { frequency: 4, amplitude: 12, duration: 1.1 }
] as const

const stringColors = [
  'var(--ui-color-primary-400)',
  'var(--ui-color-secondary-400)',
  'var(--ui-color-info-400)',
  'var(--ui-color-success-400)',
  'var(--ui-color-warning-400)'
] as const

const offsets = ref<number[]>([0, 0, 0, 0, 0])

function pluck(index: number) {
  const props = stringProps[index]
  if (!props) return
  const { frequency, amplitude, duration } = props
  const start = performance.now()
  const ms = duration * 1000

  function frame() {
    const progress = Math.min((performance.now() - start) / ms, 1)
    offsets.value[index] = Math.sin(progress * Math.PI * frequency) * amplitude * (1 - progress)
    if (progress < 1) requestAnimationFrame(frame)
    else offsets.value[index] = 0
  }

  requestAnimationFrame(frame)
}

function onKeyDown(e: KeyboardEvent) {
  const index = Number(e.key) - 1
  if (index >= 0 && index <= 4) pluck(index)
}

useEventListener('keydown', onKeyDown)

function stringPath(s: { x1: number, y1: number, x2: number, y2: number }, offset: number) {
  const midX = (s.x1 + s.x2) / 2
  const midY = (s.y1 + s.y2) / 2
  return `M ${s.x1},${s.y1} Q ${midX},${midY + offset} ${s.x2},${s.y2}`
}

const rightDots = [
  { cx: 338, cy: 98 },
  { cx: 325, cy: 104 },
  { cx: 310, cy: 110 },
  { cx: 290, cy: 116 },
  { cx: 265, cy: 122 }
]
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 380 190"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    class="outline-none"
  >
    <path
      stroke-width="2"
      d="M 15,82 C 150,76 280,78 358,88 C 362,90 362,93 358,95 C 280,162 100,165 15,122 C 5,118 5,86 15,82 Z"
    />
    <path
      stroke-width="1.2"
      d="M 70,95 C 66,101 66,107 70,113 C 74,119 74,122 70,124"
    />
    <path
      stroke-width="1.2"
      d="M 79,95 C 75,101 75,107 79,113 C 83,119 83,122 79,124"
    />
    <path
      stroke-width="1.2"
      d="M 88,95 C 84,101 84,107 88,113 C 92,119 92,122 88,124"
    />
    <path
      stroke-width="1.2"
      d="M 97,95 C 93,101 93,107 97,113 C 101,119 101,122 97,124"
    />
    <path
      v-for="(s, i) in strings"
      :key="i"
      :d="stringPath(s, offsets[i] ?? 0)"
      :stroke="stringColors[i]"
      :stroke-width="0.8 + Math.abs(offsets[i] ?? 0) * 0.08"
      :stroke-opacity="0.5 + Math.abs(offsets[i] ?? 0) * 0.05"
      fill="none"
      class="outline-none"
    />
    <path
      v-for="(s, i) in strings"
      :key="`hit${i}`"
      :d="stringPath(s, offsets[i] ?? 0)"
      stroke-width="12"
      stroke="transparent"
      fill="none"
      class="cursor-pointer outline-none"
      @click="pluck(i)"
    />
    <circle
      v-for="(s, i) in strings"
      :key="`l${i}`"
      cx="45"
      :cy="s.y1"
      r="2"
      fill="currentColor"
      stroke="none"
    />
    <circle
      v-for="(d, i) in rightDots"
      :key="`r${i}`"
      :cx="d.cx"
      :cy="d.cy"
      r="2"
      fill="currentColor"
      stroke="none"
    />
  </svg>
</template>
