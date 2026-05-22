<script setup lang="ts">
import { Motion } from 'motion-v'

const props = withDefaults(defineProps<{
  cols?: number
  rows?: number
  items?: unknown[]
  cellSize?: number
}>(), {
  cols: 5,
  rows: 5,
  items: () => [],
  cellSize: 80
})

const emit = defineEmits<{
  select: [item: unknown, col: number, row: number]
  change: [item: unknown, col: number, row: number]
}>()

const { move, select, isActive, itemIndex, cells, current, canMove } = useSilmukka(
  toRef(props, 'cols'),
  toRef(props, 'rows')
)

const grid = computed(() => cells(props.items))

watch(current, ({ col, row }) => {
  emit('change', props.items[itemIndex(col, row)], col, row)
})

function onSelect(col: number, row: number) {
  select(col, row)
  emit('select', props.items[itemIndex(col, row)], col, row)
}

defineExpose({ move, canMove })
</script>

<template>
  <div
    class="grid gap-1"
    :style="{
      gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
      gridTemplateRows: `repeat(${rows}, ${cellSize}px)`
    }"
  >
    <div
      v-for="cell in grid"
      :key="`${cell.col}-${cell.row}`"
      class="octagon cursor-pointer transition-all duration-200 flex items-center justify-center"
      :class="isActive(cell.col, cell.row)
        ? 'bg-primary text-inverted shadow-lg shadow-primary/50'
        : 'bg-elevated text-muted hover:bg-accented hover:text-default'"
      :style="{ width: `${cellSize}px`, height: `${cellSize}px` }"
      @click="onSelect(cell.col, cell.row)"
    >
      <Motion
        :key="`${cell.col}-${cell.row}-${isActive(cell.col, cell.row)}`"
        :initial="{ scale: 0.85, opacity: 0 }"
        :animate="{ scale: 1, opacity: 1 }"
        :transition="{ duration: 0.15 }"
        as="div"
        class="flex items-center justify-center w-full h-full"
      >
        <slot
          name="cell"
          :item="cell.item"
          :active="isActive(cell.col, cell.row)"
          :col="cell.col"
          :row="cell.row"
        >
          <span class="text-xs text-muted">{{ cell.col }},{{ cell.row }}</span>
        </slot>
      </Motion>
    </div>
  </div>
</template>
