<script setup lang="ts">
import { Motion } from 'motion-v'

const props = withDefaults(defineProps<{
  flip?: boolean
  height?: number
  speed?: number
  layers?: 1 | 2 | 3
  color?: string
}>(), {
  flip: false,
  height: 80,
  speed: 1,
  layers: 3
})

const reduced = ref(false)
onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

const color = (shade: number) => props.color ?? `var(--ui-color-primary-${shade})`

const waveLayers = computed(() => [
  {
    fill: color(500),
    fillOpacity: 0.3,
    paths: [
      'M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z',
      'M0,40 C360,0 1080,120 1440,40 L1440,120 L0,120 Z',
      'M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z'
    ],
    duration: 8
  },
  {
    fill: color(600),
    fillOpacity: 0.5,
    paths: [
      'M0,80 C480,20 960,120 1440,80 L1440,120 L0,120 Z',
      'M0,50 C480,120 960,20 1440,50 L1440,120 L0,120 Z',
      'M0,80 C480,20 960,120 1440,80 L1440,120 L0,120 Z'
    ],
    duration: 6
  },
  {
    fill: color(700),
    fillOpacity: 1,
    paths: [
      'M0,100 C360,60 1080,120 1440,100 L1440,120 L0,120 Z',
      'M0,70 C360,120 1080,40 1440,70 L1440,120 L0,120 Z',
      'M0,100 C360,60 1080,120 1440,100 L1440,120 L0,120 Z'
    ],
    duration: 10
  }
].slice(0, props.layers))
</script>

<template>
  <div
    inert
    class="relative w-full overflow-hidden leading-none pointer-events-none"
    :class="{ 'scale-y-[-1]': flip }"
    :style="{ height: `${height}px` }"
  >
    <Motion
      as="svg"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      class="w-full h-full"
    >
      <Motion
        v-for="(layer, i) in waveLayers"
        :key="i"
        as="path"
        :fill="layer.fill"
        :fill-opacity="layer.fillOpacity"
        :initial="{ d: layer.paths[0], pathLength: 0, opacity: 0 }"
        :animate="reduced
          ? { d: layer.paths[0], pathLength: 1, opacity: 1 }
          : {
            d: layer.paths,
            pathLength: 1,
            opacity: [0, 1, layer.fillOpacity]
          }"
        :transition="{
          pathLength: { duration: 1.2, delay: i * 0.3 },
          opacity: { duration: 1, delay: i * 0.3 },
          d: { duration: (layer.duration / props.speed), repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }
        }"
      />
    </Motion>
  </div>
</template>
