<script setup lang="ts">
import { useRafFn } from '@vueuse/core'
import { Motion } from 'motion-v'

export interface IkuisuusItem {
  id: string
  content: string
  age?: number
}

const props = withDefaults(defineProps<{
  items: IkuisuusItem[]
  speed?: number
  cycles?: number
  height?: number
}>(), {
  speed: 0.6,
  cycles: 4,
  height: 400
})

const emit = defineEmits<{ forgotten: [item: IkuisuusItem] }>()

interface LiveItem {
  id: string
  content: string
  y: number
  age: number
  frozen: boolean
  remove?: boolean
}

const containerRef = ref<HTMLElement | null>(null)
const itemRefs = ref<HTMLElement[]>([])
const isHovered = ref(false)
const frozenId = ref<string | null>(null)

const ITEM_HEIGHT = 72
const liveItems: LiveItem[] = []
const visibleItems = shallowRef<LiveItem[]>([])

onMounted(() => {
  const h = containerRef.value?.offsetHeight ?? props.height

  props.items.forEach((item, i) => {
    liveItems.push({
      id: item.id,
      content: item.content,
      y: (h / props.items.length) * i,
      age: item.age ?? 0,
      frozen: false
    })
  })

  visibleItems.value = [...liveItems]
})

const currentSpeed = computed(() => isHovered.value ? props.speed * 0.15 : props.speed)

useRafFn(() => {
  const h = containerRef.value?.offsetHeight ?? props.height
  let changed = false

  liveItems.forEach((item, i) => {
    if (item.frozen) return
    item.y -= currentSpeed.value

    if (item.y < -ITEM_HEIGHT) {
      item.age++
      if (item.age >= props.cycles) {
        item.remove = true
        emit('forgotten', { id: item.id, content: item.content })
        changed = true
        return
      }
      item.y = h + ITEM_HEIGHT
      changed = true
    }

    const el = itemRefs.value[i]
    if (el) {
      el.style.transform = `translateY(${item.y}px)`
      el.style.opacity = String(getOpacity(item.age))
      el.style.filter = getBlur(item.age)
    }
  })

  if (changed) {
    const toRemove = liveItems.filter(i => i.remove)
    toRemove.forEach(i => liveItems.splice(liveItems.indexOf(i), 1))
    visibleItems.value = [...liveItems]
  }
})

function getOpacity(age: number) {
  return Math.max(0.05, 1 - (age / props.cycles) * 0.9)
}

function getBlur(age: number) {
  return `blur(${age * 0.4}px)`
}

function getContent(item: LiveItem): string {
  if (item.age === 0) return item.content
  if (item.age === 1) return item.content.replace(/\b(is|are|am)\b/g, 'was')
  if (item.age === 2) return item.content.split(' ').map(w => w.length > 4 ? w[0] + '·'.repeat(w.length - 2) + w[w.length - 1] : w).join(' ')
  return '· · · · ·'
}

function getTextClass(age: number) {
  if (age === 0) return 'text-highlighted'
  if (age === 1) return 'text-default'
  if (age === 2) return 'text-muted'
  return 'text-dimmed'
}

function toggleFreeze(id: string) {
  const item = liveItems.find(i => i.id === id)
  if (!item) return
  item.frozen = !item.frozen
  frozenId.value = item.frozen ? id : null
}
</script>

<template>
  <div
    ref="containerRef"
    class="relative overflow-hidden bg-linear-to-b from-default/50 to-primary/5"
    :style="{ height: `${height}px` }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-default to-transparent z-10 pointer-events-none" />
    <div class="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-default to-transparent z-10 pointer-events-none" />

    <div
      v-for="(item, i) in visibleItems"
      :key="item.id"
      :ref="el => { if (el) itemRefs[i] = el as HTMLElement }"
      class="absolute left-0 right-0 px-8 cursor-pointer will-change-transform"
      :style="{
        transform: `translateY(${item.y}px)`,
        opacity: getOpacity(item.age),
        filter: getBlur(item.age),
        height: `${ITEM_HEIGHT}px`
      }"
      @click="toggleFreeze(item.id)"
    >
      <div
        class="h-full flex items-center border-l-2 pl-4 transition-all duration-700"
        :class="item.frozen ? 'border-primary' : 'border-primary/20'"
      >
        <div class="flex flex-col gap-0.5">
          <p
            class="text-sm transition-colors duration-700"
            :class="getTextClass(item.age)"
          >
            {{ getContent(item) }}
          </p>
          <p
            v-if="item.age > 0"
            class="text-xs text-dimmed"
          >
            {{ item.age === 1 ? 'remembered' : item.age === 2 ? 'fading' : 'almost gone' }}
          </p>
        </div>

        <Motion
          v-if="item.frozen"
          as="div"
          class="ml-auto mr-2"
          :animate="{ opacity: [1, 0.3, 1] }"
          :transition="{ duration: 2, repeat: Infinity }"
        >
          <UIcon
            name="i-lucide-anchor"
            class="w-3 h-3 text-primary"
          />
        </Motion>
      </div>
    </div>
  </div>
</template>

<!-- import type { IkuisuusItem } from '~/components/m/Ikuisuus.vue'

const items = [
  { id: '1', content: 'The river remembers every stone it has touched' },
  { id: '2', content: 'Time is not a line but a current returning to itself' },
  { id: '3', content: 'What is forgotten was never truly lost' },
  { id: '4', content: 'The depth holds what the surface cannot' },
  { id: '5', content: 'Every wave has crossed this shore before' }
]

function onForgotten(item: IkuisuusItem) {
  console.log('returned to the waters:', item.content)
} -->
