<script setup lang="ts">
import { Motion } from 'motion-v'

const props = defineProps<{
  members: { name: string, avatar?: string, role?: string }[]
}>()

const containerRef = useTemplateRef<HTMLElement>('containerRef')
const containerWidth = ref(800)

const RIVER_HEIGHT = 130
const SVG_HEIGHT = 170
const RIVER_TOP = 20
const WAVE_AMP = 7
const WAVE_STEPS = 32
const riverCenter = RIVER_TOP + RIVER_HEIGHT / 2

const reduced = ref(false)
const hoveredIndex = ref<number | null>(null)
const popupPos = ref({ x: 0, y: 0 })

onMounted(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduced.value = mq.matches
  mq.addEventListener('change', (e: MediaQueryListEvent) => {
    reduced.value = e.matches
  })
  if (containerRef.value) containerWidth.value = containerRef.value.clientWidth
})

function onEnter(i: number, e: MouseEvent) {
  hoveredIndex.value = i
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  popupPos.value = { x: rect.left + rect.width / 2, y: rect.top }
}

function onLeave() {
  hoveredIndex.value = null
}

function wave(baseY: number, phase: number, steps: number, width: number): string {
  let d = `M 0 ${baseY}`
  for (let i = 1; i <= steps; i++) {
    const x = (i / steps) * width
    const y = baseY + Math.sin((i / steps) * Math.PI * 4 + phase) * WAVE_AMP
    const px = ((i - 1) / steps) * width
    const py = baseY + Math.sin(((i - 1) / steps) * Math.PI * 4 + phase) * WAVE_AMP
    const mx = (px + x) / 2
    const my = (py + y) / 2
    d += i === 1 ? ` Q ${px} ${py} ${mx} ${my}` : ` T ${x} ${y}`
  }
  return d
}

const riverFill = computed(() => {
  const cw = containerWidth.value
  const bottomY = RIVER_TOP + RIVER_HEIGHT
  let d = wave(RIVER_TOP, 0, WAVE_STEPS, cw)
  for (let i = WAVE_STEPS; i >= 0; i--) {
    const x = (i / WAVE_STEPS) * cw
    const y = bottomY + Math.sin((i / WAVE_STEPS) * Math.PI * 4 + Math.PI) * WAVE_AMP
    d += ` L ${x} ${y}`
  }
  return d + ' Z'
})

const topWave = computed(() => wave(RIVER_TOP, 0, WAVE_STEPS, containerWidth.value))
const bottomWave = computed(() => wave(RIVER_TOP + RIVER_HEIGHT, Math.PI, WAVE_STEPS, containerWidth.value))

const positions = computed(() =>
  props.members.map((m, i) => ({
    ...m,
    x: ((i + 1) / (props.members.length + 1)) * containerWidth.value,
    bobDuration: 2.2 + (i % 4) * 0.35,
    bobDelay: i * 0.28
  }))
)

const hoveredMember = computed(() =>
  hoveredIndex.value !== null ? props.members[hoveredIndex.value] : null
)
</script>

<template>
  <div
    ref="containerRef"
    class="relative w-full"
    :style="{ height: `${SVG_HEIGHT}px` }"
  >
    <svg class="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <linearGradient
          id="jokinen-fill"
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop
            offset="0%"
            stop-color="var(--color-vesi-700)"
            stop-opacity="0.5"
          />
          <stop
            offset="45%"
            stop-color="var(--color-vesi-500)"
            stop-opacity="0.45"
          />
          <stop
            offset="100%"
            stop-color="var(--color-cyan-600)"
            stop-opacity="0.4"
          />
        </linearGradient>
        <linearGradient
          id="jokinen-shine"
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop
            offset="0%"
            stop-color="transparent"
          />
          <stop
            offset="50%"
            stop-color="var(--color-cyan-300)"
            stop-opacity="0.25"
          />
          <stop
            offset="100%"
            stop-color="transparent"
          />
        </linearGradient>
        <clipPath id="jokinen-clip">
          <path :d="riverFill" />
        </clipPath>
      </defs>

      <path
        :d="riverFill"
        fill="url(#jokinen-fill)"
      />

      <Motion
        as="path"
        :d="topWave"
        fill="none"
        stroke="var(--color-vesi-300)"
        stroke-width="1.5"
        stroke-opacity="0.4"
        stroke-dasharray="8 6"
        :animate="reduced ? {} : { strokeDashoffset: [-80, 0] }"
        :transition="{ duration: 3, repeat: Infinity, ease: 'linear' }"
      />

      <Motion
        as="path"
        :d="bottomWave"
        fill="none"
        stroke="var(--color-vesi-400)"
        stroke-width="1"
        stroke-opacity="0.25"
        stroke-dasharray="6 8"
        :animate="reduced ? {} : { strokeDashoffset: [0, -80] }"
        :transition="{ duration: 4, repeat: Infinity, ease: 'linear' }"
      />

      <Motion
        as="rect"
        x="0"
        :y="RIVER_TOP"
        :width="containerWidth"
        :height="RIVER_HEIGHT"
        fill="url(#jokinen-shine)"
        clip-path="url(#jokinen-clip)"
        :animate="reduced ? {} : { attrX: [-containerWidth, containerWidth] }"
        :transition="{ duration: 5, repeat: Infinity, ease: 'linear' }"
      />
    </svg>

    <div class="absolute inset-0">
      <Motion
        v-for="(member, i) in positions"
        :key="member.name"
        class="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 cursor-pointer"
        :style="{ left: `${member.x}px`, top: `${riverCenter}px` }"
        :animate="reduced ? {} : { y: [-5, 5] }"
        :transition="{
          duration: member.bobDuration,
          delay: member.bobDelay,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut'
        }"
        :while-hover="reduced ? undefined : { scale: 1.2 }"
        @mouseenter="onEnter(i, $event)"
        @mouseleave="onLeave"
      >
        <UAvatar
          :src="member.avatar"
          :alt="member.name"
          size="md"
          class="ring-2 ring-vesi-300/40 shadow-lg shadow-secondary"
        />
        <span class="text-xs text-white/80 font-medium whitespace-nowrap drop-shadow">
          {{ member.name }}
        </span>
      </Motion>
    </div>
  </div>

  <Teleport to="body">
    <Motion
      v-if="hoveredMember"
      class="fixed z-50 pointer-events-none -translate-x-1/2"
      :style="{ left: `${popupPos.x}px`, top: `${popupPos.y - 12}px` }"
      :initial="{ opacity: 0, y: 8, scale: 0.95 }"
      :animate="{ opacity: 1, y: 0, scale: 1 }"
      :transition="{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }"
    >
      <div class="rounded-sm p-3 -translate-y-full bg-elevated/80 border border-vesi-300/40 shadow-md shadow-secondary">
        <UUser
          :name="hoveredMember.name"
          :description="hoveredMember.role"
          :avatar="{ src: hoveredMember.avatar, alt: hoveredMember.name }"
          size="sm"
        />
      </div>
    </Motion>
  </Teleport>
</template>
