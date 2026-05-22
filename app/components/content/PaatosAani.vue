<script setup lang="ts">
import { Motion } from 'motion-v'
import type { MemberRole } from '~/types/resource'

const props = withDefaults(defineProps<{
  author: string
  role?: MemberRole
  weight?: number | string
  type?: string
  branchId?: string
}>(), {
  role: 'member',
  weight: 1,
  type: 'support'
})

const { t } = useI18n()

const weight = computed(() => Number(props.weight) || 1)

const typeColor: Record<string, string> = {
  support: 'text-success',
  concern: 'text-warning',
  amendment: 'text-info'
}

const typeBorder: Record<string, string> = {
  support: 'bg-success',
  concern: 'bg-warning',
  amendment: 'bg-info'
}
</script>

<template>
  <Motion
    :initial="{ opacity: 0, x: -4 }"
    :animate="{ opacity: 1, x: 0 }"
    :transition="{ duration: 0.3 }"
    :while-hover="{ scale: 1.02 }"
    :while-press="{ scale: 0.98 }"
    :transition-hover="{ duration: 0.15 }"
    class="px-5 py-3 relative"
  >
    <Motion
      class="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
      :class="typeBorder[type] ?? 'bg-default'"
      :initial="{ scaleY: 0, opacity: 0 }"
      :animate="{ scaleY: 1, opacity: 0.6 }"
      :transition="{ duration: 0.3, delay: 0.1 }"
      :while-hover="{ opacity: 1, scaleX: 2 }"
    />
    <div class="flex items-center gap-2 mb-2">
      <span :class="['text-xs font-medium', typeColor[type] ?? 'text-default']">
        {{ t(`paatos.${type}`) }}
      </span>
      <span class="text-xs font-medium text-highlighted">{{ author }}</span>
      <span
        v-if="role"
        class="text-xs text-toned"
      >{{ t(`paatos.roles.${role}`) }}</span>
      <Motion
        :while-hover="{ opacity: 1 }"
        :animate="{ opacity: 0.5 }"
        :transition="{ duration: 0.15 }"
        class="text-xs text-muted ml-auto tabular-nums"
      >
        {{ weight }}
      </Motion>
    </div>
    <div class="text-sm text-default leading-relaxed">
      <slot />
    </div>
  </Motion>
</template>
