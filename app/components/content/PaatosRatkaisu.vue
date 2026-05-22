<script setup lang="ts">
import { Motion } from 'motion-v'

const props = withDefaults(defineProps<{
  method?: string
  status?: string
  mediator?: string
}>(), {
  method: 'sovittelu',
  status: 'pending'
})

const { t } = useI18n()

const statusColor: Record<string, string> = {
  pending: 'text-warning',
  resolved: 'text-success',
  dissolved: 'text-muted'
}

const isResolved = computed(() => props.status === 'resolved')
</script>

<template>
  <Motion
    :initial="{ opacity: 0, y: 16 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }"
    class="px-5 py-5 bg-accented relative overflow-hidden"
  >
    <Motion
      v-if="isResolved"
      class="absolute inset-0 pointer-events-none"
      :initial="{ opacity: 0, x: '-100%' }"
      :animate="{ opacity: [0, 0.08, 0], x: ['−100%', '100%', '100%'] }"
      :transition="{ duration: 1.5, delay: 0.8, ease: 'easeInOut' }"
      style="background: linear-gradient(90deg, transparent, var(--ui-success), transparent)"
    />
    <div class="flex items-center gap-2 mb-3">
      <span class="text-xs font-mono text-muted">{{ t('paatos.result') }}</span>
      <span class="text-xs font-semibold text-highlighted">{{ method }}</span>
      <span
        v-if="mediator"
        class="text-xs text-toned"
      >{{ mediator }}</span>
      <span :class="['text-xs font-medium ml-auto', statusColor[status] ?? 'text-muted']">
        {{ t(`paatos.status.${status}`) }}
      </span>
    </div>
    <div class="text-sm text-default leading-relaxed">
      <slot />
    </div>
  </Motion>
</template>
