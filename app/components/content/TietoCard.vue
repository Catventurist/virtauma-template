<script setup lang="ts">
import { Motion } from 'motion-v'

const props = withDefaults(defineProps<{
  value: number
  label: string
  suffix?: string
  prefix?: string
  fill?: number
  trend?: 'up' | 'down'
}>(), {
  suffix: '',
  prefix: '',
  fill: undefined,
  trend: undefined
})

const { t } = useI18n()
const displayed = ref(0)
const el = useTemplateRef('root')

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (!entry?.isIntersecting) return
    observer.disconnect()
    const start = performance.now()
    const duration = 1400
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      displayed.value = Math.round(easeOut(progress) * props.value)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, { threshold: 0.4 })

  if (el.value) observer.observe(el.value)
})
</script>

<template>
  <Motion
    :while-hover="{ y: -4 }"
    :transition="{ type: 'spring', stiffness: 400, damping: 20 }"
    class="h-full"
  >
    <div
      ref="root"
      class="group relative h-full rounded-sm p-6 overflow-hidden
      bg-vesi-400/10 backdrop-blur-lg backdrop-saturate-150
      border border-vesi-300/40
      shadow-lg shadow-secondary hover:border-vesi-300/40 hover:bg-vesi-300/10 hover:shadow-xl
      transition-colors duration-300"
    >
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div
        v-if="fill !== undefined"
        class="absolute bottom-0 inset-x-0 h-[3px] bg-vesi-900/40"
      >
        <Motion
          class="h-full bg-linear-to-r from-vesi-600 via-vesi-400 to-cyan-400"
          :initial="{ width: '0%' }"
          :animate="{ width: `${fill}%` }"
          :transition="{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }"
        />
      </div>

      <div class="relative flex flex-col gap-2">
        <p class="text-xs uppercase tracking-widest text-muted">
          {{ label }}
        </p>
        <Motion
          as="p"
          class="text-4xl flex items-center font-bold text-highlighted tabular-nums"
          :while-hover="{ scale: 1.04 }"
          :transition="{ type: 'spring', stiffness: 300, damping: 18 }"
        >
          <span
            v-if="prefix"
            class="text-2xl text-muted mr-1"
          >{{ prefix }}</span>
          {{ displayed.toLocaleString() }}
          <span
            v-if="suffix"
            class="text-2xl text-muted ml-1"
          >{{ suffix }}</span>
        </Motion>
        <div
          v-if="trend"
          class="flex items-center gap-1"
        >
          <UIcon
            :name="trend === 'up' ? 'i-lucide-trending-up' : 'i-lucide-trending-down'"
            class="size-4"
            :class="trend === 'up' ? 'text-success' : 'text-error'"
          />
          <span
            class="text-xs"
            :class="trend === 'up' ? 'text-success' : 'text-error'"
          >
            {{ trend === 'up' ? t('tieto.ascending') : t('tieto.descending') }}
          </span>
        </div>
      </div>
    </div>
  </Motion>
</template>
