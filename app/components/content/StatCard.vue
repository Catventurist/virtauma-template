<script setup lang="ts">
import { Motion, useInView, useMotionValue, useTransform, animate, RowValue } from 'motion-v'

const props = defineProps<{
  value: number
  suffix: string
  decimals: number
  label: string
  description: string
  delay: number
}>()

const el = ref<HTMLElement | null>(null)
const inView = useInView(el, { once: true, margin: '-80px' })

const count = useMotionValue(0)
const displayed = useTransform(() =>
  props.decimals > 0
    ? count.get().toFixed(props.decimals)
    : Math.round(count.get()).toLocaleString('en')
)

let controls: ReturnType<typeof animate> | undefined

watch(inView, (val) => {
  if (!val) return
  controls = animate(count, props.value, {
    duration: 2,
    ease: [0.16, 1, 0.3, 1],
    delay: props.delay
  })
})

onUnmounted(() => controls?.stop())
</script>

<template>
  <Motion
    ref="el"
    as="div"
    :initial="{ opacity: 0, y: 32 }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :while-hover="{ y: -4, scale: 1.02 }"
    :while-press="{ scale: 0.97 }"
    :viewport="{ once: true, margin: '-80px' }"
    :transition="{
      opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
      y: { type: 'spring', stiffness: 300, damping: 20 },
      scale: { type: 'spring', stiffness: 400, damping: 20 }
    }"
    class="cursor-pointer"
  >
    <UCard
      variant="subtle"
      class="text-center h-full"
    >
      <div class="flex flex-col items-center gap-2 py-4">
        <div class="text-5xl font-bold text-primary tabular-nums">
          <ClientOnly>
            <RowValue :value="displayed" />{{ suffix }}
            <template #fallback>
              {{ decimals > 0 ? value.toFixed(decimals) : value }}{{ suffix }}
            </template>
          </ClientOnly>
        </div>

        <p class="text-base font-semibold text-highlighted">
          {{ label }}
        </p>
        <p class="text-sm text-muted">
          {{ description }}
        </p>

        <Motion
          as="div"
          class="mt-2 h-0.5 bg-primary/20 rounded-full"
          :initial="{ width: '0%' }"
          :while-in-view="{ width: '60%' }"
          :viewport="{ once: true }"
          :transition="{ duration: 1, ease: 'easeOut', delay: delay + 0.3 }"
        />
      </div>
    </UCard>
  </Motion>
</template>
