<script setup lang="ts">
import { AnimatePresence, Motion } from 'motion-v'
import type { CanvasNode } from '~/composables/useMdcBuilder'

const props = defineProps<{ node: CanvasNode | null }>()
const emit = defineEmits<{
  update: [key: string, value: string | boolean | number]
  updateContent: [value: string]
}>()

const { t } = useI18n()
const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral']
const fieldId = (name: string) => `field-${props.node?.id}-${name.replace(/-/g, '_')}`
const formatLabel = (name: string) => t(`builder.props.names.${name}`, name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()))
function onPropUpdate(name: string, value: string | boolean | number) {
  emit('update', name, value)
}
</script>

<template>
  <div class="w-64 border-l border-default bg-default/40 backdrop-blur-sm flex flex-col">
    <AnimatePresence>
      <Motion
        v-if="!node"
        key="empty"
        as="div"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        class="flex-1 flex items-center justify-center text-center p-6"
      >
        <div>
          <UIcon
            name="i-lucide-mouse-pointer-click"
            class="w-8 h-8 text-muted mx-auto mb-2"
          />
          <p class="text-sm text-muted">
            {{ t('builder.props.empty') }}
          </p>
        </div>
      </Motion>

      <Motion
        v-else
        :key="node.id"
        as="div"
        :initial="{ opacity: 0, x: 10 }"
        :animate="{ opacity: 1, x: 0 }"
        :exit="{ opacity: 0, x: 10 }"
        :transition="{ type: 'spring', stiffness: 300, damping: 30 }"
        class="flex-1 flex flex-col overflow-hidden"
      >
        <div class="p-3 border-b border-default flex items-center gap-2">
          <UIcon
            :name="node.component.icon"
            class="w-4 h-4 text-primary"
          />
          <span class="font-semibold text-sm text-highlighted">{{ t(node.component.labelKey) }}</span>
        </div>

        <div class="flex-1 overflow-y-auto p-3 flex flex-col gap-4">
          <template
            v-for="prop in node.component.props"
            :key="prop.name"
          >
            <div
              v-if="prop.type === 'color'"
              class="flex flex-col gap-1.5"
            >
              <span
                :id="`label-${fieldId(prop.name)}`"
                class="text-xs font-medium text-muted capitalize"
              >
                {{ formatLabel(prop.name) }}
              </span>
              <div
                class="flex flex-wrap gap-1"
                role="radiogroup"
                :aria-labelledby="`label-${fieldId(prop.name)}`"
              >
                <div
                  v-for="color in colors"
                  :key="color"
                  class="w-5 h-5 rounded-full cursor-pointer ring-offset-1 transition-all"
                  :class="[`bg-${color}`, node.props[prop.name] === color ? `ring-2 ring-${color}` : '']"
                  role="radio"
                  :aria-label="color"
                  :aria-checked="node.props[prop.name] === color"
                  tabindex="0"
                  @click="emit('update', prop.name, color)"
                  @keydown.enter="emit('update', prop.name, color)"
                  @keydown.space.prevent="emit('update', prop.name, color)"
                />
              </div>
            </div>

            <UFormField
              v-else
              :label="prop.name"
              :name="fieldId(prop.name)"
            >
              <template #label>
                <span class="text-xs font-medium text-muted">{{ formatLabel(prop.name) }}</span>
              </template>
              <USwitch
                v-if="prop.type === 'boolean'"
                :id="fieldId(prop.name)"
                :model-value="Boolean(node.props[prop.name])"
                @update:model-value="onPropUpdate(prop.name, $event)"
              />

              <USelect
                v-else-if="prop.type === 'enum'"
                :id="fieldId(prop.name)"
                :model-value="String(node.props[prop.name] ?? '')"
                :items="prop.options ?? []"
                size="sm"
                class="w-full"
                @update:model-value="onPropUpdate(prop.name, $event)"
              />

              <UInput
                v-else
                :id="fieldId(prop.name)"
                :model-value="String(node.props[prop.name] ?? '')"
                :placeholder="prop.placeholderKey ? t(`builder.placeholders.${prop.placeholderKey}`) : formatLabel(prop.name)"
                size="sm"
                class="w-full"
                @update:model-value="onPropUpdate(prop.name, $event)"
              />
            </UFormField>
          </template>
        </div>
      </Motion>
    </AnimatePresence>
  </div>
</template>
