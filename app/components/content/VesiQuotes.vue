<script setup lang="ts">
import { Motion } from 'motion-v'

const props = withDefaults(defineProps<{
  duration?: number
  reverse?: boolean
  count?: number
  offset?: number
}>(), {
  duration: 30,
  reverse: false,
  count: 20,
  offset: 0
})

const { t } = useI18n()

const icons = [
  'i-lucide-waves',
  'i-lucide-droplets',
  'i-lucide-fish',
  'i-lucide-mountain-snow',
  'i-lucide-music',
  'i-lucide-anchor',
  'i-lucide-infinity',
  'i-lucide-flame'
]

const all = computed(() =>
  Array.from({ length: props.count }, (_, i) => {
    const text = t(`water.quotes.${i}.text`)
    const source = t(`water.quotes.${i}.source`)
    if (text === `water.quotes.${i}.text`) return null
    return { text, source, icon: icons[i % icons.length] }
  }).filter((q): q is NonNullable<typeof q> => q !== null)
)

const doubled = computed(() => [...all.value, ...all.value])

const isPaused = ref(false)
const track = ref<HTMLElement | null>(null)

const ready = ref(false)

onMounted(() => {
  ready.value = true
})

const animationDelay = computed(() => {
  if (!ready.value || !track.value) return '0s'
  const totalWidth = track.value.scrollWidth
  const cardWidth = totalWidth / doubled.value.length
  const offsetPx = props.offset * cardWidth
  const fraction = offsetPx / (totalWidth / 2)
  return `-${fraction * props.duration}s`
})

const trackStyle = computed(() => ({
  animationDuration: `${props.duration}s`,
  animationDirection: props.reverse ? 'reverse' : 'normal',
  animationPlayState: isPaused.value ? 'paused' : 'running',
  animationDelay: animationDelay.value
}))
</script>

<template>
  <div
    class="overflow-hidden relative"
    @mouseenter="isPaused = true"
    @mouseleave="isPaused = false"
  >
    <div class="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-default to-transparent z-10 pointer-events-none" />
    <div class="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-default to-transparent z-10 pointer-events-none" />

    <div
      ref="track"
      class="flex gap-4 py-8 w-max marquee-track"
      :style="trackStyle"
    >
      <Motion
        v-for="(quote, i) in doubled"
        :key="i"
        :while-hover="{ scale: 1.03, y: -4 }"
        :while-tap="{ scale: 0.97 }"
        :transition="{ type: 'spring', stiffness: 300, damping: 20 }"
        class="flex flex-col gap-3 bg-elevated border border-default rounded-lg p-4 w-80 shrink-0 cursor-default"
      >
        <UIcon
          :name="quote.icon"
          class="size-5 text-primary"
        />
        <p class="text-sm text-highlighted italic leading-relaxed">
          "{{ quote.text }}"
        </p>
        <span class="text-xs text-muted mt-auto">— {{ quote.source }}</span>
      </Motion>
    </div>
  </div>
</template>

<style scoped>
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.marquee-track {
  animation-name: marquee;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform;
}
</style>
