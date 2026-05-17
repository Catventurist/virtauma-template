<script setup lang="ts">
import { Motion } from 'motion-v'
import type { CanvasNode } from '~/composables/useMdcBuilder'

defineProps<{
  node: CanvasNode
  selected: boolean
  dragging: boolean
}>()

const { t } = useI18n()
const emit = defineEmits<{
  select: []
  remove: []
  duplicate: []
  collapse: []
  dragStart: [e: PointerEvent]
}>()

const formatLabel = (name: string) => t(`builder.props.names.${name}`, name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()))
</script>

<template>
  <Motion
    as="div"
    layout
    :animate="{
      scale: dragging ? 1.02 : 1,
      opacity: dragging ? 0.85 : 1
    }"
    :transition="{ type: 'spring', stiffness: 300, damping: 30 }"
    :initial="{ opacity: 0, y: 20, scale: 0.95 }"
    :exit="{ opacity: 0, scale: 0.9, y: -10 }"
    class="relative rounded-xl border backdrop-blur-sm cursor-pointer transition-colors"
    :class="selected
      ? 'border-primary/60 bg-primary/5'
      : 'border-default bg-default/60 hover:border-primary/30'"
    :style="dragging ? { boxShadow: '0 0 24px var(--ui-color-primary-400)40' } : {}"
    @click="emit('select')"
  >
    <div class="flex items-center gap-3 p-3">
      <div
        class="cursor-grab active:cursor-grabbing p-1 text-muted hover:text-default touch-none"
        @pointerdown.stop="emit('dragStart', $event)"
      >
        <UIcon
          name="i-lucide-grip-vertical"
          class="w-4 h-4"
        />
      </div>

      <UIcon
        :name="node.component.icon"
        class="w-4 h-4 text-primary"
      />

      <span class="font-medium text-sm text-highlighted flex-1">{{ t(node.component.labelKey) }}</span>

      <UBadge
        :label="t(`builder.categories.${node.component.category}`)"
        variant="subtle"
        size="xs"
      />

      <div class="flex items-center gap-1">
        <UButton
          icon="i-lucide-copy"
          size="xs"
          color="neutral"
          variant="ghost"
          @click.stop="emit('duplicate')"
        />
        <UButton
          :icon="node.collapsed ? 'i-lucide-chevron-down' : 'i-lucide-chevron-up'"
          size="xs"
          color="neutral"
          variant="ghost"
          @click.stop="emit('collapse')"
        />
        <UButton
          icon="i-lucide-x"
          size="xs"
          color="error"
          variant="ghost"
          @click.stop="emit('remove')"
        />
      </div>
    </div>

    <Motion
      v-if="!node.collapsed"
      as="div"
      :initial="{ height: 0, opacity: 0 }"
      :animate="{ height: 'auto', opacity: 1 }"
      :exit="{ height: 0, opacity: 0 }"
      :transition="{ type: 'spring', stiffness: 300, damping: 30 }"
      class="overflow-hidden"
    >
      <div class="px-3 pb-3 flex flex-wrap gap-2">
        <template
          v-for="(val, key) in node.props"
          :key="key"
        >
          <UBadge
            v-if="val !== '' && val !== false"
            :label="`${t(`builder.props.names.${key}`, formatLabel(String(key)))}: ${val}`"
            variant="outline"
            size="xs"
            color="neutral"
          />
        </template>
        <span
          v-if="node.component.hasContent"
          class="text-xs text-dimmed italic truncate max-w-xs"
        >
          {{ t(node.content) || node.content }}
        </span>
      </div>
    </Motion>

    <Motion
      as="div"
      class="absolute inset-0 rounded-[inherit] pointer-events-none"
      :animate="selected ? { opacity: [0.3, 0.6, 0.3] } : { opacity: 0 }"
      :transition="{ duration: 2, repeat: Infinity, ease: 'easeInOut' }"
      :style="{ background: `radial-gradient(ellipse at 50% 0%, var(--ui-color-primary-500)15, transparent 70%)` }"
    />
  </Motion>
</template>
