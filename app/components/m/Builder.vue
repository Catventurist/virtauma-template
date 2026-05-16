<script setup lang="ts">
import { Motion, AnimatePresence } from 'motion-v'
import { useMdcBuilder } from '~/composables/useMdcBuilder'

const {
  nodes, selectedId, selected,
  outputMode, output,
  canUndo, canRedo,
  addNode, removeNode, duplicateNode,
  updateProp, updateContent,
  toggleCollapse, undo, redo, clearAll
} = useMdcBuilder()

const { t } = useI18n()
const canvasSearch = ref('')

const filteredNodes = computed(() => {
  const q = canvasSearch.value.toLowerCase()
  return q ? nodes.value.filter(n => n.component.name.includes(q)) : nodes.value
})

const draggingIndex = ref<number | null>(null)

function startDrag(e: PointerEvent, index: number) {
  draggingIndex.value = index
  const startY = e.clientY

  const onMove = (e: PointerEvent) => {
    if (draggingIndex.value === null) return
    const delta = e.clientY - startY
    const newIndex = Math.max(0, Math.min(
      nodes.value.length - 1,
      index + Math.round(delta / 64)
    ))
    const current = draggingIndex.value
    if (newIndex !== current) {
      const item = nodes.value.splice(current, 1)[0]
      if (item) {
        nodes.value.splice(newIndex, 0, item)
        draggingIndex.value = newIndex
      }
    }
  }

  const onUp = () => {
    draggingIndex.value = null
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerup', onUp)
  }

  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onUp)
}

function onUpdateProp(key: string, val: string | boolean | number) {
  if (selected.value) updateProp(selected.value.id, key, val)
}

function onUpdateContent(val: string) {
  if (selected.value) updateContent(selected.value.id, val)
}

defineShortcuts({
  meta_z: undo,
  meta_shift_z: redo
})
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden bg-default">
    <div class="flex items-center gap-3 px-4 py-2 border-b border-default bg-default/80 backdrop-blur-sm">
      <div class="flex items-center gap-1.5">
        <UIcon
          name="i-lucide-blocks"
          class="w-4 h-4 text-primary"
        />
        <span class="font-semibold text-sm text-highlighted">{{ t('builder.title') }}</span>
      </div>

      <USeparator
        orientation="vertical"
        class="h-4"
      />

      <div class="flex items-center gap-1">
        <UButton
          icon="i-lucide-undo"
          size="xs"
          color="neutral"
          variant="ghost"
          :disabled="!canUndo"
          @click="undo"
        />
        <UButton
          icon="i-lucide-redo"
          size="xs"
          color="neutral"
          variant="ghost"
          :disabled="!canRedo"
          @click="redo"
        />
      </div>

      <UInput
        id="canvas-search"
        v-model="canvasSearch"
        :placeholder="t('builder.search')"
        icon="i-lucide-search"
        size="xs"
        class="w-48"
      />

      <div class="ml-auto">
        <UButton
          icon="i-lucide-trash-2"
          :label="t('builder.clear')"
          size="sm"
          color="error"
          variant="ghost"
          :disabled="nodes.length === 0"
          @click="clearAll"
        />
      </div>
    </div>

    <div class="flex flex-1 overflow-hidden">
      <MBuilderSidebar @add="addNode" />

      <div class="flex-1 flex flex-col overflow-hidden">
        <div class="flex-1 overflow-y-auto p-4 relative">
          <Motion
            as="div"
            class="absolute inset-0 pointer-events-none opacity-5"
            :animate="{ backgroundPosition: ['0% 0%', '100% 100%'] }"
            :transition="{ duration: 12, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }"
            style="background-image: radial-gradient(ellipse at 20% 30%, var(--ui-color-primary-500) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, var(--ui-color-primary-400) 0%, transparent 50%); background-size: 200% 200%;"
          />

          <div
            v-if="nodes.length === 0"
            class="flex flex-col items-center justify-center h-full gap-3 text-center"
          >
            <Motion
              as="div"
              :animate="{ y: [0, -6, 0] }"
              :transition="{ duration: 3, repeat: Infinity, ease: 'easeInOut' }"
            >
              <UIcon
                name="i-lucide-layers"
                class="w-10 h-10 text-dimmed"
              />
            </Motion>
            <p class="text-muted text-sm">
              {{ t('builder.empty') }}
            </p>
          </div>

          <div class="flex flex-col gap-2 relative z-10">
            <AnimatePresence>
              <MBuilderNode
                v-for="(node, i) in filteredNodes"
                :key="node.id"
                :node="node"
                :selected="selectedId === node.id"
                :dragging="draggingIndex === i"
                @select="selectedId = node.id"
                @remove="removeNode(node.id)"
                @duplicate="duplicateNode(node.id)"
                @collapse="toggleCollapse(node.id)"
                @drag-start="startDrag($event, i)"
              />
            </AnimatePresence>
          </div>
        </div>

        <MBuilderOutput
          :output="output"
          :mode="outputMode"
          @update:mode="outputMode = $event"
        />
      </div>

      <MBuilderPropEditor
        :node="selected"
        @update="onUpdateProp"
        @update-content="onUpdateContent"
      />
    </div>
  </div>
</template>
