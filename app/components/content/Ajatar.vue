<script setup lang="ts">
import { Motion } from 'motion-v'

type Item = string | {
  label: string
  to: string
  icon: string
  description: string
}

interface Cycle {
  name: string
  items: Item[]
}

const props = defineProps<{
  cycles: Cycle[]
}>()

const localePath = useLocalePath()

const SIZE = 500
const cx = 250
const cy = 250
const baseRadius = 60
const ringGap = 70

const activeRing = ref<number | null>(null)

function ringRadius(index: number) {
  return baseRadius + index * ringGap
}

function itemPositions(count: number, radius: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle)
    }
  })
}

const cyclePositions = computed(() =>
  props.cycles.map((cycle, i) =>
    itemPositions(cycle.items.length, ringRadius(i))
  )
)

function getPos(i: number, j: number) {
  return cyclePositions.value[i]?.[j] ?? { x: 0, y: 0 }
}

function getLabel(item: Item) {
  return typeof item === 'string' ? item : item.label
}

function getTo(item: Item) {
  return typeof item === 'string' ? null : item.to
}

async function handleDotClick(event: MouseEvent, item: Item, i: number) {
  event.stopPropagation()
  if (activeRing.value !== i) {
    activeRing.value = i
    return
  }
  const to = getTo(item)
  if (to) navigateTo(localePath(to))
}

function toggleRing(i: number) {
  activeRing.value = activeRing.value === i ? null : i
}

const ringOpacities = computed(() =>
  props.cycles.map((_, i) => {
    if (activeRing.value === null) return 0.3 + i * 0.2
    return activeRing.value === i ? 1 : 0.1
  })
)

const groupOpacities = computed(() =>
  props.cycles.map((_, i) => {
    if (activeRing.value === null) return 1
    return activeRing.value === i ? 1 : 0.1
  })
)

const dotSizes = computed(() =>
  props.cycles.map((_, i) => activeRing.value === i ? 7 : 4)
)
</script>

<template>
  <Motion
    as="svg"
    :viewBox="`0 0 ${SIZE} ${SIZE}`"
    class="w-full max-w-lg mx-auto my-8 block"
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :transition="{ duration: 0.4 }"
    style="outline: none"
  >
    <Motion
      as="circle"
      :cx="cx"
      :cy="cy"
      r="8"
      :style="{
        fill: 'var(--ui-primary)',
        outline: 'none',
        cursor: activeRing !== null ? 'pointer' : 'default'
      }"
      :animate="{ scale: [1, 1.4, 1] }"
      :transition="{ duration: 2, repeat: Infinity, ease: 'easeInOut' }"
      @click="activeRing = null"
    />

    <Motion
      v-for="(cycle, i) in cycles"
      :key="`ring-${i}`"
      as="circle"
      :cx="cx"
      :cy="cy"
      :r="ringRadius(i)"
      fill="none"
      stroke-width="1.5"
      stroke-dasharray="4 6"
      :style="{
        stroke: 'var(--ui-primary)',
        cursor: 'pointer',
        outline: 'none'
      }"
      :initial="{ pathLength: 0, opacity: 0 }"
      :animate="{ pathLength: 1, opacity: ringOpacities[i] }"
      :transition="{ duration: 1.2, delay: i * 0.4, ease: 'easeOut' }"
      @click="toggleRing(i)"
    />

    <Motion
      v-for="(cycle, i) in cycles"
      :key="`ring-label-${i}`"
      as="text"
      :x="cx"
      :y="cy - ringRadius(i) - 10"
      text-anchor="middle"
      :style="{
        fill: 'var(--ui-text-toned)',
        fontSize: '11px',
        pointerEvents: 'none'
      }"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: groupOpacities[i] }"
      :transition="{ duration: 0.4, delay: i * 0.4 + 0.8 }"
    >
      {{ cycle.name }}
    </Motion>

    <Motion
      v-for="(cycle, i) in cycles"
      :key="`group-${i}`"
      as="g"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: groupOpacities[i] }"
      :transition="{ duration: 0.5, delay: i * 0.4 + 0.8 }"
    >
      <Motion
        v-for="(item, j) in cycle.items"
        :key="`dot-${i}-${j}`"
        as="circle"
        :cx="getPos(i, j).x"
        :cy="getPos(i, j).y"
        :style="{
          fill: 'var(--ui-primary)',
          cursor: activeRing === i && getTo(item) ? 'pointer' : 'default',
          outline: 'none'
        }"
        :animate="{ r: dotSizes[i] }"
        :transition="{ duration: 0.3 }"
        @click="handleDotClick($event, item, i)"
      />

      <Motion
        v-for="(item, j) in cycle.items"
        :key="`dot-ring-${i}-${j}`"
        as="circle"
        :cx="getPos(i, j).x"
        :cy="getPos(i, j).y"
        r="10"
        fill="none"
        stroke-width="1"
        :style="{ stroke: 'var(--ui-primary)', pointerEvents: 'none' }"
        :animate="{
          scale: activeRing === i && getTo(item) ? 1 : 0,
          opacity: activeRing === i && getTo(item) ? 0.5 : 0
        }"
        :transition="{ duration: 0.3, delay: j * 0.05 }"
      />

      <Motion
        v-for="(item, j) in cycle.items"
        :key="`item-label-${i}-${j}`"
        as="text"
        :x="getPos(i, j).x"
        :y="getPos(i, j).y + 18"
        text-anchor="middle"
        :style="{
          fill: activeRing === i ? 'var(--ui-text-highlighted)' : 'var(--ui-text-muted)',
          fontSize: activeRing === i ? '11px' : '9px',
          pointerEvents: 'none'
        }"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 0.3, delay: i * 0.4 + j * 0.08 + 1.1 }"
      >
        {{ getLabel(item) }}
      </Motion>
    </Motion>
  </Motion>
</template>
