<script setup lang="ts">
import { Motion, AnimatePresence } from 'motion-v'
import { useIntersectionObserver, useMouseInElement, useWindowSize, onKeyStroke } from '@vueuse/core'
import VideoSoitin from './VideoSoitin.vue'

export interface KajastusItem {
  src?: string
  poster?: string
  youtube?: string
  title?: string
}

const props = withDefaults(defineProps<{
  items: KajastusItem[]
  cols?: number
}>(), {
  cols: 3
})

const { t } = useI18n()

const containerRef = ref<HTMLElement>()
const expandedIndex = ref<number | null>(null)
const itemRefs = ref<HTMLElement[]>([])
const soitinRefs = ref<{ pause: () => void }[]>([])
const { elementX, elementY } = useMouseInElement(containerRef)
const { width } = useWindowSize()

const responsiveCols = computed(() => {
  if (width.value < 640) return 1
  if (width.value < 1024) return Math.min(props.cols, 2)
  return props.cols
})

const expanded = computed(() =>
  expandedIndex.value !== null ? props.items[expandedIndex.value] : null
)

const isImage = (item: KajastusItem) =>
  !item.youtube && !!item.src && /\.(jpg|jpeg|png|webp|avif|gif|svg)$/i.test(item.src)

function setRef(el: HTMLElement | null, index: number) {
  if (el) itemRefs.value[index] = el
}

function setSoitinRef(el: unknown, index: number) {
  if (el && typeof (el as { pause: () => void }).pause === 'function') {
    soitinRefs.value[index] = el as { pause: () => void }
  }
}

function getDelay(el: HTMLElement): number {
  if (!containerRef.value) return 0
  const rect = el.getBoundingClientRect()
  const containerRect = containerRef.value.getBoundingClientRect()
  const cx = rect.left + rect.width / 2 - containerRect.left
  const cy = rect.top + rect.height / 2 - containerRect.top
  const dx = cx - elementX.value
  const dy = cy - elementY.value
  return Math.min((Math.sqrt(dx * dx + dy * dy) / 600) * 500, 600)
}

function expand(index: number) {
  soitinRefs.value.forEach(s => s?.pause())
  expandedIndex.value = index
}

function close() {
  expandedIndex.value = null
}

function prev() {
  if (expandedIndex.value === null) return
  expandedIndex.value = (expandedIndex.value - 1 + props.items.length) % props.items.length
}

function next() {
  if (expandedIndex.value === null) return
  expandedIndex.value = (expandedIndex.value + 1) % props.items.length
}

onKeyStroke('Escape', (e: KeyboardEvent) => {
  if (expandedIndex.value !== null) {
    e.preventDefault()
    close()
  }
})

onKeyStroke('ArrowLeft', (e: KeyboardEvent) => {
  if (expandedIndex.value !== null && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
    e.preventDefault()
    prev()
  }
})

onKeyStroke('ArrowRight', (e: KeyboardEvent) => {
  if (expandedIndex.value !== null && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
    e.preventDefault()
    next()
  }
})

onMounted(() => {
  itemRefs.value.forEach((el) => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(24px)'
    el.style.filter = 'grayscale(100%) brightness(0.7)'
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease, filter 0.8s ease'

    const { stop } = useIntersectionObserver(ref(el), (entries) => {
      if (entries[0]?.isIntersecting) {
        setTimeout(() => {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          el.style.filter = 'grayscale(0%) brightness(1)'
        }, getDelay(el))
        stop()
      }
    })
  })
})
</script>

<template>
  <div
    ref="containerRef"
    :style="{ columnCount: responsiveCols, columnGap: '1rem' }"
    class="columns-1"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      :ref="(el) => setRef(el as HTMLElement, index)"
      class="break-inside-avoid mb-4 cursor-pointer"
      :aria-label="item.title"
      role="button"
      :tabindex="0"
      @click="expand(index)"
      @keydown.enter="expand(index)"
    >
      <VideoSoitin
        v-if="!isImage(item)"
        :ref="(el) => setSoitinRef(el, index)"
        v-bind="item"
        preview
      />
      <NuxtImg
        v-else
        :src="item.src"
        :alt="item.title"
        class="w-full rounded-lg object-cover"
      />
    </div>
  </div>

  <AnimatePresence>
    <template v-if="expanded">
      <Teleport to="body">
        <Motion
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :transition="{ duration: 0.4 }"
          class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl bg-black/60"
          @click="close"
        >
          <Motion
            :initial="{ opacity: 0, y: 40, scale: 0.95 }"
            :animate="{ opacity: 1, y: 0, scale: 1 }"
            :exit="{ opacity: 0, y: 40, scale: 0.95 }"
            :transition="{ duration: 0.5, ease: 'easeOut' }"
            class="max-w-4xl w-full max-h-screen p-6"
            @click.stop
          >
            <AnimatePresence mode="wait">
              <Motion
                :key="expandedIndex ?? undefined"
                :initial="{ opacity: 0, x: 20 }"
                :animate="{ opacity: 1, x: 0 }"
                :exit="{ opacity: 0, x: -20 }"
                :transition="{ duration: 0.25, ease: 'easeOut' }"
              >
                <VideoSoitin
                  v-if="!isImage(expanded)"
                  v-bind="expanded"
                  eager
                />
                <img
                  v-else
                  :src="expanded.src"
                  :alt="expanded.title"
                  class="w-full rounded-xl object-cover"
                >
              </Motion>
            </AnimatePresence>

            <div class="flex justify-between items-center mt-4">
              <UButton
                icon="i-lucide-arrow-left"
                variant="ghost"
                color="neutral"
                :aria-label="t('gallery.prev')"
                @click.stop="prev"
              />
              <UButton
                icon="i-lucide-x"
                variant="ghost"
                color="neutral"
                :aria-label="t('gallery.close')"
                @click.stop="close"
              />
              <UButton
                icon="i-lucide-arrow-right"
                variant="ghost"
                color="neutral"
                :aria-label="t('gallery.next')"
                @click.stop="next"
              />
            </div>
          </Motion>
        </Motion>
      </Teleport>
    </template>
  </AnimatePresence>
</template>
