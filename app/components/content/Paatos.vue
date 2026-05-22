<script setup lang="ts">
import { Motion } from 'motion-v'
import {
  PaatosCurrentBranch,
  decisionMeta
} from '~/composables/usePaatos'
import type { DecisionType, PaatosStatus } from '~/types/resource'

const props = withDefaults(defineProps<{
  type?: DecisionType | string
  status?: PaatosStatus | string
  threshold?: number | string
  deadline?: string
  rhythm?: string
  closesAt?: string
}>(), {
  type: 'kaste',
  status: 'open'
})

const { t } = useI18n()

provide(PaatosCurrentBranch, 'root')

const meta = computed(() => decisionMeta[props.type as DecisionType])
const threshold = computed(() => props.threshold ? Number(props.threshold) : null)

const isActive = computed(() => ['open', 'discussion'].includes(props.status as string))
const isSettled = computed(() => ['closed', 'resolved', 'dissolved'].includes(props.status as string))

const tulvaDuration = computed(() => {
  if (!props.closesAt) return 30
  const diff = new Date(props.closesAt).getTime() - Date.now()
  return diff > 0 ? Math.floor(diff / 1000) : 0
})
</script>

<template>
  <Motion
    :initial="{ opacity: 0, y: 12 }"
    :animate="{ opacity: isSettled ? 0.75 : 1, y: 0 }"
    :transition="{ duration: 0.5, ease: 'easeOut' }"
    :while-hover="{ y: -2, boxShadow: '0 8px 32px -4px color-mix(in srgb, var(--ui-primary) 15%, transparent)' }"
    :transition-hover="{ duration: 0.2 }"
    class="my-8 rounded-xl overflow-hidden border border-default bg-elevated shadow-sm cursor-default"
  >
    <Motion
      v-if="isActive"
      class="absolute inset-0 rounded-xl pointer-events-none border border-default"
      :animate="{ opacity: [0.3, 0.6, 0.3] }"
      :transition="{ duration: 3, repeat: Infinity, ease: 'easeInOut' }"
    />

    <div class="flex items-center justify-between px-5 py-3 border-b border-default">
      <div class="flex items-center gap-3 text-xs">
        <Motion
          :while-hover="{ scale: 1.2, rotate: 5 }"
          :transition="{ duration: 0.2 }"
        >
          <UIcon
            :name="meta?.icon"
            :class="`text-${meta?.color ?? 'primary'}`"
          />
        </Motion>
        <span :class="['font-semibold', `text-${meta?.color ?? 'primary'}`]">
          {{ t(`paatos.type.${type}`) }}
        </span>
        <span class="text-muted">{{ t(`paatos.description.${type}`) }}</span>
        <span
          v-if="threshold"
          class="font-mono text-muted"
        >{{ threshold }}%</span>
        <span
          v-if="deadline"
          class="text-error"
        >{{ deadline }}</span>
        <span
          v-if="rhythm"
          class="text-toned"
        >{{ rhythm }}</span>
      </div>
      <Motion
        :animate="isActive
          ? { opacity: [0.7, 1, 0.7] }
          : { opacity: 1 }"
        :transition="{ duration: 2, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }"
        :class="['text-xs font-medium', `text-${meta?.color ?? 'primary'}`]"
      >
        {{ t(`paatos.status.${status}`) }}
      </Motion>
    </div>

    <Motion
      v-if="type === 'tulva'"
      class="h-0.5 bg-error origin-left"
      :animate="{ scaleX: [1, 0] }"
      :transition="{ duration: tulvaDuration, ease: 'linear' }"
    />

    <div class="divide-y divide-default">
      <slot />
    </div>
  </Motion>
</template>
