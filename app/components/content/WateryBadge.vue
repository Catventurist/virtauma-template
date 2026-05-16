<script setup lang="ts">
import { Motion, AnimatePresence, animate } from 'motion-v'

const props = withDefaults(defineProps<{
  value?: string | number
  count?: string | number
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral'
  variant?: 'bubble' | 'chip' | 'dot'
  float?: boolean
  pulse?: boolean
  max?: number
  size?: 'sm' | 'md' | 'lg'
  motion?: boolean
}>(), {
  color: 'primary',
  variant: 'bubble',
  float: false,
  pulse: false,
  size: 'md',
  motion: true
})

const emit = defineEmits<{ burst: [value: string | number | undefined] }>()

const resolvedValue = computed(() => props.count ?? props.value)

const displayValue = computed(() => {
  if (props.variant === 'dot' || resolvedValue.value === undefined) return undefined
  if (props.max && Number(resolvedValue.value) > props.max) return `${props.max}+`
  return String(resolvedValue.value)
})

const colorVar = computed(() => `var(--ui-color-${props.color}-500)`)
const badgeSizeMap = { sm: 'xs', md: 'sm', lg: 'md' } as const
const dotSizeMap = { sm: '6px', md: '10px', lg: '14px' }

const visible = ref(true)
const mounted = ref(false)
const particles = ref<{ id: number, angle: number }[]>([])
const badgeEl = ref<HTMLElement | null>(null)

onMounted(() => {
  mounted.value = true
})

watch(resolvedValue, () => {
  if (!mounted.value || !badgeEl.value) return
  animate(badgeEl.value, { scale: [1, 1.3, 0.9, 1.1, 1] }, { duration: 0.4, ease: 'easeInOut' })
})

function onBurst() {
  particles.value = Array.from({ length: 6 }, (_, i) => ({ id: i, angle: (360 / 6) * i }))
  visible.value = false
  emit('burst', resolvedValue.value)
}

function onExitComplete() {
  visible.value = true
  setTimeout(() => particles.value = [], 600)
}
</script>

<template>
  <div class="relative inline-flex items-center justify-center">
    <AnimatePresence @exit-complete="onExitComplete">
      <Motion
        v-if="visible"
        as="div"
        :initial="motion ? { scale: 0, opacity: 0 } : false"
        :animate="{ scale: 1, opacity: 1 }"
        :exit="motion ? { scale: 0, opacity: 0 } : {}"
        :transition="{ type: 'spring', stiffness: 400, damping: 15 }"
        :while-hover="motion ? { scale: 1.15 } : {}"
        :while-press="motion ? { scale: 0.9 } : {}"
        class="cursor-pointer"
        @click="onBurst"
      >
        <Motion
          ref="badgeEl"
          as="div"
          :animate="float && motion ? { y: [0, -4, 0], x: [0, 1.5, -1, 0] } : {}"
          :transition="{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }"
        >
          <div class="relative">
            <div
              v-if="variant === 'dot'"
              class="rounded-full"
              :style="{
                width: dotSizeMap[size],
                height: dotSizeMap[size],
                backgroundColor: colorVar
              }"
            />

            <UBadge
              v-else
              :color="color"
              :size="badgeSizeMap[size]"
              :variant="variant === 'bubble' ? 'subtle' : 'solid'"
              :label="displayValue ?? ''"
              :class="variant === 'bubble' ? 'rounded-full backdrop-blur-sm' : ''"
            />

            <div
              v-if="variant === 'bubble'"
              class="absolute top-0.5 left-1 w-2 h-1 bg-white/30 rounded-full blur-[1px] pointer-events-none"
            />
          </div>
        </Motion>
      </Motion>
    </AnimatePresence>

    <template v-if="pulse && motion">
      <Motion
        as="div"
        class="absolute inset-0 rounded-full pointer-events-none"
        :style="{ border: `2px solid ${colorVar}` }"
        :initial="{ scale: 1, opacity: 0.4 }"
        :animate="{ scale: 2, opacity: 0 }"
        :transition="{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }"
      />
    </template>

    <Motion
      v-for="p in particles"
      :key="p.id"
      as="div"
      class="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
      :style="{ backgroundColor: colorVar }"
      :initial="{ x: 0, y: 0, opacity: 1, scale: 1 }"
      :animate="{
        x: Math.cos(p.angle * Math.PI / 180) * 20,
        y: Math.sin(p.angle * Math.PI / 180) * 20,
        opacity: 0,
        scale: 0
      }"
      :transition="{ duration: 0.5, ease: 'easeOut' }"
    />
  </div>
</template>
