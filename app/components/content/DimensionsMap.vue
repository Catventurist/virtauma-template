<script setup lang="ts">
import { Motion } from 'motion-v'

const emit = defineEmits<{
  select: [zone: XZone]
}>()

const W = 1200
const H = 460
const SURFACE_Y = 188
const UNDERGROUND_Y = 372
const POHJA_Y = 402

interface XZone { id: string, label: string, x: number, w: number, desc: string }
interface YLayer { id: string, label: string, yPct: number }

const id = useId()
const uid = (name: string) => `${id}-${name}`

const xZones: XZone[] = [
  { id: 'lahde', label: 'Lähde', x: 0, w: 200, desc: 'Water rises from the earth' },
  { id: 'virta', label: 'Virta', x: 200, w: 200, desc: 'Steady downstream current' },
  { id: 'suvanto', label: 'Suvanto & Pyörre', x: 400, w: 200, desc: 'Still pool and swirling eddy' },
  { id: 'koski', label: 'Koski', x: 600, w: 200, desc: 'Turbulent crashing rapids' },
  { id: 'vesiraja', label: 'Vesiraja', x: 800, w: 200, desc: 'The edge of land and sea' },
  { id: 'meri', label: 'Meri', x: 1000, w: 200, desc: 'The open sea' }
]

const yLayers: YLayer[] = [
  { id: 'pilvi', label: 'Pilvi', yPct: 13 },
  { id: 'pinta', label: 'Pinta', yPct: 42 },
  { id: 'pohjavesi', label: 'Pohjavesi', yPct: 75 },
  { id: 'pohja', label: 'Pohja', yPct: 91 }
]

const activeZone = ref<string | null>(null)

function selectZone(zone: XZone) {
  activeZone.value = activeZone.value === zone.id ? null : zone.id
  emit('select', zone)
}

const activeZoneData = computed(() => xZones.find(z => z.id === activeZone.value) ?? null)

const terrainD = [
  'M 0,162',
  'C 30,150 70,148 110,162',
  'C 130,170 145,182 165,202',
  'C 185,222 220,250 270,260',
  'C 310,268 360,268 400,268',
  'C 440,268 480,266 520,254',
  'C 550,244 580,220 615,200',
  'C 638,185 655,162 680,158',
  'C 700,155 720,162 745,178',
  'C 768,194 798,228 840,250',
  'C 875,268 920,278 970,292',
  'C 1010,302 1060,318 1110,328',
  'C 1150,336 1180,340 1200,342',
  `L 1200,${UNDERGROUND_Y} L 0,${UNDERGROUND_Y} Z`
].join(' ')

function makeWave(y: number, amp: number, period: number): string {
  const extra = period * 6
  const c = period * 0.3642
  let d = `M ${-extra},${y}`
  for (let x = -extra; x < W + extra; x += period) {
    const m = x + period / 2
    d += ` C ${x + c},${y - amp} ${m - c},${y - amp} ${m},${y}`
    d += ` C ${m + c},${y + amp} ${x + period - c},${y + amp} ${x + period},${y}`
  }
  d += ` L ${W + extra},${H} L ${-extra},${H} Z`
  return d
}

const wave = makeWave(SURFACE_Y, 6, 120)

const flowParticles = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  cy: UNDERGROUND_Y + 8 + (i % 5) * 5,
  r: 1.5 + (i % 2),
  duration: 8 + (i % 4) * 1.5,
  delay: -((8 + (i % 4) * 1.5) * i / 14)
}))

const whirlpoolArcs = [
  { rx: 40, ry: 14, pathLen: 0.5, duration: 3.2 },
  { rx: 26, ry: 9, pathLen: 0.38, duration: 2.2 },
  { rx: 13, ry: 5, pathLen: 0.25, duration: 1.4 }
]

const WHIRL_CX = 500
const WHIRL_CY = 224

const koskiBubbles = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  cx: 632 + i * 22,
  cy: SURFACE_Y - 3 - (i % 3) * 4,
  amp: 5 + (i % 3) * 3,
  duration: 0.7 + (i % 4) * 0.25,
  delay: -(i * 0.2)
}))

const koskiLines = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  x1: 625 + i * 18,
  y1: SURFACE_Y - 8 - (i % 3) * 5,
  len: 8 + (i % 3) * 6,
  duration: 0.5 + (i % 3) * 0.2,
  delay: -(i * 0.15)
}))
</script>

<template>
  <Motion
    class="vd-root relative w-full overflow-hidden rounded-xl border border-default"
    :initial="{ opacity: 0, y: 12 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.5, ease: 'easeOut' }"
  >
    <div
      class="relative w-full"
      style="padding-top: 38.33%"
    >
      <div class="absolute inset-0">
        <svg
          :viewBox="`0 0 ${W} ${H}`"
          class="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          role="img"
          :aria-label="`Virtauma water world cross-section showing ${xZones.map(z => z.label).join(', ')}`"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Virtauma Dimensions</title>
          <desc>Animated cross-section of a Finnish water world from spring source to open sea.</desc>

          <defs>
            <linearGradient
              :id="uid('sky')"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stop-color="var(--vd-sky-1)"
              />
              <stop
                offset="100%"
                stop-color="var(--vd-sky-2)"
              />
            </linearGradient>
            <linearGradient
              :id="uid('water')"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stop-color="var(--vd-water-1)"
                stop-opacity="0.9"
              />
              <stop
                offset="100%"
                stop-color="var(--vd-water-2)"
              />
            </linearGradient>
            <linearGradient
              :id="uid('terrain')"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stop-color="var(--vd-terrain-1)"
              />
              <stop
                offset="100%"
                stop-color="var(--vd-terrain-2)"
              />
            </linearGradient>
            <linearGradient
              :id="uid('underground')"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stop-color="var(--vd-underground-1)"
              />
              <stop
                offset="100%"
                stop-color="var(--vd-underground-2)"
              />
            </linearGradient>
          </defs>

          <rect
            x="0"
            y="0"
            :width="W"
            :height="H"
            :fill="`url(#${uid('sky')})`"
          />
          <rect
            x="0"
            :y="SURFACE_Y"
            :width="W"
            :height="H - SURFACE_Y"
            :fill="`url(#${uid('water')})`"
          />
          <rect
            x="0"
            :y="UNDERGROUND_Y"
            :width="W"
            :height="H - UNDERGROUND_Y"
            :fill="`url(#${uid('underground')})`"
          />
          <rect
            x="0"
            :y="POHJA_Y"
            :width="W"
            :height="H - POHJA_Y"
            fill="var(--vd-pohja)"
          />

          <line
            x1="0"
            :y1="UNDERGROUND_Y"
            :x2="W"
            :y2="UNDERGROUND_Y"
            stroke="var(--vd-sep)"
            stroke-opacity="0.4"
            stroke-width="1"
          />

          <Motion
            v-if="activeZoneData"
            as="rect"
            :x="activeZoneData.x"
            y="0"
            :width="activeZoneData.w"
            :height="H"
            fill="var(--vd-highlight)"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :exit="{ opacity: 0 }"
            :transition="{ duration: 0.2 }"
          />

          <Motion
            v-for="p in flowParticles"
            :key="p.id"
            as="circle"
            :cx="-4"
            :cy="p.cy"
            :r="p.r"
            fill="var(--vd-particle)"
            opacity="0.45"
            :animate="{ cx: W + 10 }"
            :transition="{ duration: p.duration, repeat: Infinity, ease: 'linear', delay: p.delay, repeatType: 'loop' }"
          />

          <g class="vd-wave">
            <path
              :d="wave"
              fill="var(--vd-wave)"
              opacity="0.45"
            />
          </g>

          <path
            :d="terrainD"
            :fill="`url(#${uid('terrain')})`"
          />

          <Motion
            v-for="(arc, i) in whirlpoolArcs"
            :key="`arc-${i}`"
            as="ellipse"
            :cx="WHIRL_CX"
            :cy="WHIRL_CY"
            :rx="arc.rx"
            :ry="arc.ry"
            fill="none"
            stroke="var(--vd-whirl)"
            stroke-width="1.5"
            :initial="{ pathLength: arc.pathLen, pathOffset: 0 }"
            :animate="{ pathOffset: 1 }"
            :transition="{ duration: arc.duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }"
          />

          <Motion
            v-for="b in koskiBubbles"
            :key="`bubble-${b.id}`"
            as="circle"
            :cx="b.cx"
            :cy="b.cy"
            r="2.5"
            fill="var(--vd-bubble)"
            opacity="0.7"
            :animate="{ cy: [b.cy, b.cy - b.amp, b.cy] }"
            :transition="{ duration: b.duration, repeat: Infinity, ease: 'easeInOut', delay: b.delay }"
          />

          <Motion
            v-for="l in koskiLines"
            :key="`spray-${l.id}`"
            as="line"
            :x1="l.x1"
            :y1="l.y1"
            :x2="l.x1 + l.len"
            :y2="l.y1 - 3"
            stroke="var(--vd-bubble)"
            stroke-width="1"
            :animate="{ opacity: [0.8, 0, 0.8] }"
            :transition="{ duration: l.duration, repeat: Infinity, ease: 'easeOut', delay: l.delay }"
          />

          <Motion
            as="circle"
            cx="158"
            :cy="SURFACE_Y + 4"
            r="9"
            fill="var(--vd-spring)"
            :animate="{ r: [9, 17, 9], opacity: [0.55, 0.08, 0.55] }"
            :transition="{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }"
          />

          <Motion
            as="g"
            :animate="{ x: [0, 55, 0] }"
            :transition="{ duration: 20, repeat: Infinity, ease: 'easeInOut' }"
          >
            <ellipse
              cx="130"
              cy="62"
              rx="50"
              ry="17"
              :fill="'var(--vd-cloud)'"
            />
            <ellipse
              cx="175"
              cy="52"
              rx="30"
              ry="12"
              :fill="'var(--vd-cloud)'"
              opacity="0.8"
            />
            <ellipse
              cx="96"
              cy="57"
              rx="26"
              ry="10"
              :fill="'var(--vd-cloud)'"
              opacity="0.7"
            />
          </Motion>

          <Motion
            as="g"
            :animate="{ x: [0, -38, 0] }"
            :transition="{ duration: 26, repeat: Infinity, ease: 'easeInOut' }"
          >
            <ellipse
              cx="790"
              cy="68"
              rx="42"
              ry="14"
              :fill="'var(--vd-cloud)'"
              opacity="0.75"
            />
            <ellipse
              cx="830"
              cy="58"
              rx="26"
              ry="10"
              :fill="'var(--vd-cloud)'"
              opacity="0.6"
            />
          </Motion>

          <Motion
            as="g"
            :animate="{ x: [0, 28, 0] }"
            :transition="{ duration: 24, repeat: Infinity, ease: 'easeInOut' }"
          >
            <ellipse
              cx="1080"
              cy="55"
              rx="46"
              ry="16"
              :fill="'var(--vd-cloud)'"
              opacity="0.8"
            />
            <ellipse
              cx="1118"
              cy="46"
              rx="28"
              ry="11"
              :fill="'var(--vd-cloud)'"
              opacity="0.65"
            />
          </Motion>

          <line
            v-for="zone in xZones.slice(1)"
            :key="`div-${zone.id}`"
            :x1="zone.x"
            y1="0"
            :x2="zone.x"
            :y2="H"
            stroke="var(--vd-divider)"
            stroke-opacity="0.25"
            stroke-width="1"
            stroke-dasharray="5 5"
          />
        </svg>

        <div class="absolute inset-0 pointer-events-none select-none">
          <UTooltip
            v-for="zone in xZones"
            :key="zone.id"
            :text="zone.desc"
            class="pointer-events-auto absolute"
            :style="{
              left: `${(zone.x / W) * 100}%`,
              width: `${(zone.w / W) * 100}%`,
              top: '6px'
            }"
          >
            <div
              class="flex justify-center"
              @click="selectZone(zone)"
            >
              <UBadge
                :label="zone.label"
                :color="activeZone === zone.id ? 'primary' : 'neutral'"
                :variant="activeZone === zone.id ? 'outline' : 'subtle'"
                size="sm"
                class="cursor-pointer font-semibold transition-colors"
              />
            </div>
          </UTooltip>

          <UBadge
            v-for="layer in yLayers"
            :key="layer.id"
            :label="layer.label"
            color="neutral"
            variant="outline"
            size="sm"
            class="pointer-events-none absolute right-2"
            :style="{ top: `${layer.yPct}%`, transform: 'translateY(-50%)' }"
          />
        </div>
      </div>
    </div>
  </Motion>
</template>

<style scoped>
.vd-root {
  --vd-sky-1:         var(--color-lake-100);
  --vd-sky-2:         var(--color-lake-200);
  --vd-water-1:       var(--color-lake-400);
  --vd-water-2:       var(--color-lake-700);
  --vd-wave:          var(--color-lake-300);
  --vd-terrain-1:     var(--ui-color-slate-400);
  --vd-terrain-2:     var(--ui-color-slate-600);
  --vd-underground-1: var(--color-lake-800);
  --vd-underground-2: var(--color-lake-900);
  --vd-pohja:         var(--color-lake-950);
  --vd-sep:           var(--color-lake-600);
  --vd-divider:       var(--color-lake-300);
  --vd-particle:      var(--color-lake-300);
  --vd-whirl:         var(--color-lake-100);
  --vd-bubble:        var(--color-lake-100);
  --vd-spring:        var(--color-lake-200);
  --vd-cloud:         rgba(255, 255, 255, 0.9);
  --vd-highlight:     color-mix(in srgb, var(--color-lake-300) 15%, transparent);
}

.dark .vd-root {
  --vd-sky-1:         var(--color-lake-950);
  --vd-sky-2:         var(--color-lake-900);
  --vd-water-1:       var(--color-lake-700);
  --vd-water-2:       var(--color-lake-900);
  --vd-wave:          var(--color-lake-500);
  --vd-terrain-1:     var(--ui-color-slate-600);
  --vd-terrain-2:     var(--ui-color-slate-800);
  --vd-underground-1: var(--color-lake-900);
  --vd-underground-2: var(--color-lake-950);
  --vd-pohja:         #03080f;
  --vd-sep:           var(--color-lake-700);
  --vd-divider:       var(--color-lake-700);
  --vd-particle:      var(--color-lake-500);
  --vd-whirl:         var(--color-lake-400);
  --vd-bubble:        var(--color-lake-300);
  --vd-spring:        var(--color-lake-400);
  --vd-cloud:         rgba(255, 255, 255, 0.12);
  --vd-highlight:     color-mix(in srgb, var(--color-lake-500) 18%, transparent);
}

@keyframes vd-wave {
  to { transform: translateX(-120px); }
}

.vd-wave {
  animation: vd-wave 4s linear infinite;
}
</style>
