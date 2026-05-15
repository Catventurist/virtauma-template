<script setup lang="ts">
import { Motion } from 'motion-v'

interface GuideNode {
  id: string
  title: string
  parents: string[]
}

const props = withDefaults(defineProps<{
  guides?: GuideNode[]
  currentId?: string
}>(), {
  guides: () => [],
  currentId: undefined
})

const NODE_W = 160
const NODE_H = 44
const V_GAP = 130
const H_GAP = 40

const reduced = ref(false)
onMounted(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduced.value = mq.matches
  mq.addEventListener('change', (e: MediaQueryListEvent) => {
    reduced.value = e.matches
  })
})

const allIds = computed(() => new Set(props.guides.map(g => g.id)))

const parentsMap = computed(() =>
  new Map(props.guides.map(g => [g.id, g.parents.filter(p => allIds.value.has(p))]))
)

const generations = computed(() => {
  const gen = new Map<string, number>()

  function getGen(id: string): number {
    if (gen.has(id)) return gen.get(id)!
    const parents = parentsMap.value.get(id) ?? []
    if (!parents.length) {
      gen.set(id, 0)
      return 0
    }
    const g = Math.max(...parents.map(p => getGen(p))) + 1
    gen.set(id, g)
    return g
  }

  props.guides.forEach(g => getGen(g.id))
  return gen
})

const byGeneration = computed(() => {
  const map = new Map<number, string[]>()
  generations.value.forEach((g, id) => {
    if (!map.has(g)) map.set(g, [])
    map.get(g)!.push(id)
  })
  return map
})

const svgWidth = computed(() => {
  const counts = [...byGeneration.value.values()].map(ids => ids.length)
  if (!counts.length) return 600
  return Math.max(600, Math.max(...counts) * (NODE_W + H_GAP))
})

const svgHeight = computed(() => {
  const gens = [...generations.value.values()]
  if (!gens.length) return 200
  return (Math.max(...gens) + 1) * V_GAP + NODE_H + 40
})

const positions = computed(() => {
  const map = new Map<string, { x: number, y: number }>()
  byGeneration.value.forEach((ids, level) => {
    const count = ids.length
    const totalWidth = count * NODE_W + (count - 1) * H_GAP
    const startX = (svgWidth.value - totalWidth) / 2
    ids.forEach((id, i) => {
      map.set(id, {
        x: startX + i * (NODE_W + H_GAP),
        y: level * V_GAP
      })
    })
  })
  return map
})

const layoutNodes = computed(() =>
  props.guides.map(g => ({
    ...g,
    ...(positions.value.get(g.id) ?? { x: 0, y: 0 }),
    isSource: (parentsMap.value.get(g.id) ?? []).length === 0,
    isCurrent: g.id === props.currentId
  }))
)

const edges = computed(() =>
  props.guides.flatMap(g =>
    (parentsMap.value.get(g.id) ?? []).map(p => ({ from: p, to: g.id }))
  )
)

function edgePath(fromId: string, toId: string): string {
  const f = positions.value.get(fromId)
  const t = positions.value.get(toId)
  if (!f || !t) return ''
  const fx = f.x + NODE_W / 2
  const fy = f.y + NODE_H
  const tx = t.x + NODE_W / 2
  const ty = t.y
  const cy = (fy + ty) / 2
  return `M ${fx} ${fy} C ${fx} ${cy} ${tx} ${cy} ${tx} ${ty}`
}

const hovered = ref<string | null>(null)
</script>

<template>
  <div class="overflow-x-auto rounded-sm border border-accented">
    <div
      class="relative"
      :style="{ width: `${svgWidth}px`, height: `${svgHeight}px` }"
    >
      <svg
        class="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
      >
        <defs>
          <linearGradient
            id="pk-edge"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stop-color="var(--color-vesi-300)"
              stop-opacity="0.2"
            />
            <stop
              offset="100%"
              stop-color="var(--color-vesi-500)"
              stop-opacity="0.7"
            />
          </linearGradient>
          <linearGradient
            id="pk-shine"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stop-color="var(--color-cyan-300)"
              stop-opacity="0"
            />
            <stop
              offset="50%"
              stop-color="var(--color-cyan-300)"
              stop-opacity="0.9"
            />
            <stop
              offset="100%"
              stop-color="var(--color-cyan-300)"
              stop-opacity="0"
            />
          </linearGradient>
          <marker
            id="pk-arrow"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="4"
            markerHeight="4"
            orient="auto"
          >
            <path
              d="M 0 0 L 8 4 L 0 8 z"
              fill="var(--color-vesi-400)"
              fill-opacity="0.7"
            />
          </marker>
        </defs>

        <template
          v-for="(edge, i) in edges"
          :key="`edge-${edge.from}-${edge.to}`"
        >
          <Motion
            v-if="edgePath(edge.from, edge.to)"
            as="path"
            :d="edgePath(edge.from, edge.to)"
            fill="none"
            stroke="url(#pk-edge)"
            stroke-width="2"
            marker-end="url(#pk-arrow)"
            :initial="{ pathLength: 0 }"
            :animate="{ pathLength: 1 }"
            :transition="{ duration: 0.8, delay: i * 0.07, ease: 'easeInOut' }"
          />
          <Motion
            v-if="edgePath(edge.from, edge.to) && !reduced"
            as="path"
            :d="edgePath(edge.from, edge.to)"
            fill="none"
            stroke="url(#pk-shine)"
            stroke-width="2"
            stroke-linecap="round"
            :initial="{ pathLength: 0.1, pathOffset: 0 }"
            :animate="{ pathOffset: 0.9 }"
            :transition="{ duration: 2, delay: 1 + i * 0.12, repeat: Infinity, ease: 'linear' }"
          />
        </template>
      </svg>

      <div
        v-for="(n, i) in layoutNodes"
        :key="n.id"
        class="absolute"
        :style="{ left: `${n.x}px`, top: `${n.y}px`, width: `${NODE_W}px` }"
      >
        <Motion
          :initial="{ opacity: 0, scale: 0.85 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }"
          :while-hover="{ scale: 1.05 }"
        >
          <div
            class="relative flex items-center gap-2 px-3 h-11 rounded-sm border
              text-xs font-medium cursor-pointer select-none
              transition-colors duration-200"
            :class="n.isCurrent
              ? 'bg-primary/10 border-primary text-primary'
              : 'bg-elevated border-accented text-default hover:border-primary/50'"
            @mouseenter="hovered = n.id"
            @mouseleave="hovered = null"
          >
            <div
              v-if="n.isCurrent"
              class="absolute inset-0 rounded-sm current-pulse pointer-events-none"
            />

            <UIcon
              :name="n.isSource
                ? 'i-lucide-droplet'
                : n.isCurrent
                  ? 'i-lucide-droplets'
                  : 'i-lucide-git-merge'"
              class="size-3.5 shrink-0"
              :class="n.isCurrent ? 'text-primary' : 'text-muted'"
            />

            <span class="truncate">{{ n.title }}</span>
          </div>
        </Motion>
      </div>
    </div>
  </div>
</template>

<style scoped>
.current-pulse {
  animation: pulse 2.5s ease-out infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--ui-primary) 30%, transparent); }
  50% { box-shadow: 0 0 0 6px color-mix(in srgb, var(--ui-primary) 0%, transparent); }
}
</style>
