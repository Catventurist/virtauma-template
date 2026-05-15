<script setup lang="ts">
import { Motion } from 'motion-v'

const props = defineProps<{
  members: { name: string, role?: string, bio?: string, avatar?: string, github?: string }[]
}>()

const containerRef = useTemplateRef<HTMLElement>('containerRef')
const containerWidth = ref(600)
const drawn = ref(false)

const ROW_HEIGHT = 280
const AMPLITUDE = 0.08
const cardWidth = computed(() => Math.min(280, containerWidth.value * 0.38))

const reduced = ref(false)

onMounted(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduced.value = mq.matches
  mq.addEventListener('change', (e: MediaQueryListEvent) => {
    reduced.value = e.matches
  })
  if (containerRef.value) containerWidth.value = containerRef.value.clientWidth
  nextTick(() => {
    drawn.value = true
  })
})

const containerHeight = computed(() => props.members.length * ROW_HEIGHT + 120)

const positions = computed(() =>
  props.members.map((_, i) => ({
    x: containerWidth.value * (i % 2 === 0 ? 0.26 : 0.74),
    y: 80 + i * ROW_HEIGHT
  }))
)

const riverPoints = computed(() =>
  props.members.map((_, i) => ({
    x: containerWidth.value * (0.5 + Math.sin(i * 1.4) * AMPLITUDE),
    y: 80 + i * ROW_HEIGHT
  }))
)

const pathD = computed(() => {
  const cw = containerWidth.value
  const pts = [
    { x: cw * 0.5, y: 0 },
    ...riverPoints.value,
    { x: riverPoints.value.at(-1)?.x ?? cw * 0.5, y: containerHeight.value }
  ]
  let d = `M ${pts[0]!.x} ${pts[0]!.y}`
  for (let i = 1; i < pts.length - 1; i++) {
    const prev = pts[i - 1]!
    const curr = pts[i]!
    const next = pts[i + 1]!
    d += ` C ${(prev.x + curr.x) / 2} ${(prev.y + curr.y) / 2}, ${curr.x} ${curr.y}, ${(curr.x + next.x) / 2} ${(curr.y + next.y) / 2}`
  }
  d += ` L ${pts.at(-1)!.x} ${pts.at(-1)!.y}`
  return d
})
</script>

<template>
  <div
    ref="containerRef"
    class="relative hidden sm:block"
    :style="{ height: `${containerHeight}px` }"
  >
    <svg class="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
      <defs>
        <linearGradient
          id="riverGradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="0"
          :y2="containerHeight"
        >
          <stop
            offset="0%"
            stop-color="transparent"
          />
          <stop
            offset="15%"
            stop-color="var(--color-vesi-500)"
          />
          <stop
            offset="55%"
            stop-color="var(--color-cyan-400)"
          />
          <stop
            offset="90%"
            stop-color="var(--color-vesi-500)"
          />
          <stop
            offset="100%"
            stop-color="transparent"
          />
        </linearGradient>
        <linearGradient
          id="shineGradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="0"
          :y2="containerHeight"
        >
          <stop
            offset="0%"
            stop-color="transparent"
          />
          <stop
            offset="50%"
            stop-color="var(--color-cyan-300)"
          />
          <stop
            offset="100%"
            stop-color="transparent"
          />
        </linearGradient>
      </defs>

      <Motion
        as="path"
        :d="pathD"
        fill="none"
        stroke="var(--color-vesi-400)"
        stroke-width="90"
        stroke-linecap="round"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 0.06 }"
        :transition="{ duration: 1.5 }"
      />

      <Motion
        as="path"
        :d="pathD"
        fill="none"
        stroke="var(--color-vesi-300)"
        stroke-width="93"
        stroke-linecap="round"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 0.03 }"
        :transition="{ duration: 1.5 }"
      />

      <Motion
        as="path"
        :d="pathD"
        fill="none"
        stroke="url(#riverGradient)"
        stroke-width="2"
        stroke-linecap="round"
        :initial="{ pathLength: 0 }"
        :animate="{ pathLength: 1 }"
        :transition="{ duration: 2.5, ease: 'easeInOut' }"
      />

      <Motion
        v-if="!reduced"
        as="path"
        :d="pathD"
        fill="none"
        stroke="url(#shineGradient)"
        stroke-width="3"
        stroke-linecap="round"
        :initial="{ pathLength: 0.06, pathOffset: 0, opacity: 0 }"
        :animate="{ pathOffset: 0.95, opacity: [0, 0.7, 0.7, 0] }"
        :transition="{ duration: 4, repeat: Infinity, ease: 'linear', delay: 2.5 }"
      />
    </svg>

    <div
      v-for="(member, i) in members"
      :key="member.name"
      class="absolute"
      :style="{
        left: `${(positions[i]?.x ?? 0) - cardWidth / 2}px`,
        top: `${(positions[i]?.y ?? 0) - 90}px`,
        width: `${cardWidth}px`
      }"
    >
      <Motion
        :initial="reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.6, delay: 2 + i * 0.2, ease: [0.16, 1, 0.3, 1] }"
        :while-hover="reduced ? undefined : { scale: 1.03 }"
      >
        <Jasen
          v-bind="member"
          :index="i"
        />
      </Motion>
    </div>
  </div>

  <div class="flex flex-col gap-6 sm:hidden">
    <Jasen
      v-for="(member, i) in members"
      :key="member.name"
      v-bind="member"
      :index="i"
    />
  </div>
</template>
