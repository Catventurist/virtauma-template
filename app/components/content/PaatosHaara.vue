<script setup lang="ts">
import { Motion } from 'motion-v'
import { PaatosCurrentBranch } from '~/composables/usePaatos'

const props = withDefaults(defineProps<{
  id?: string
  from?: string
  status?: string
  trigger?: string
  winner?: boolean
}>(), {
  id: () => crypto.randomUUID(),
  from: 'root',
  status: 'open',
  winner: false
})

provide(PaatosCurrentBranch, props.id!)

const borderClass = computed(() => {
  if (props.winner) return 'border-l-success'
  return {
    open: 'border-l-primary',
    pending: 'border-l-warning',
    closed: 'border-l-accented'
  }[props.status] ?? 'border-l-accented'
})
</script>

<template>
  <Motion
    :initial="{ opacity: 0, x: -8 }"
    :animate="{ opacity: 1, x: 0 }"
    :transition="{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }"
    :while-hover="{ x: 2, y: -1 }"
    :while-press="{ y: 1, x: 0 }"
    :transition-hover="{ duration: 0.15 }"
    :class="['px-5 py-4 border-l-2 ml-2 relative', borderClass]"
  >
    <Motion
      class="absolute left-0 top-0 bottom-0 w-0.5 origin-left"
      :class="borderClass.replace('border-l-', 'bg-')"
      :while-hover="{ scaleX: 2 }"
      :transition="{ duration: 0.15 }"
    />
    <div class="flex items-center gap-2 mb-3">
      <span class="text-xs font-mono text-muted">{{ id }}</span>
      <span
        v-if="trigger"
        class="text-xs text-warning"
      >← {{ trigger }}</span>
      <Motion
        v-if="winner"
        :initial="{ opacity: 0, scale: 0.8 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.3, delay: 0.2 }"
        class="text-xs text-success ml-auto"
      >
        {{ $t('paatos.result') }}
      </Motion>
    </div>
    <div class="space-y-3">
      <slot />
    </div>
  </Motion>
</template>
