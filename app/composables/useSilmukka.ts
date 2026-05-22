type Direction = 'up' | 'up-right' | 'right' | 'down-right' | 'down' | 'down-left' | 'left' | 'up-left'

const MOVES: Record<Direction, { col: number, row: number }> = {
  'up': { col: 0, row: -1 },
  'up-right': { col: 1, row: -1 },
  'right': { col: 1, row: 0 },
  'down-right': { col: 1, row: 1 },
  'down': { col: 0, row: 1 },
  'down-left': { col: -1, row: 1 },
  'left': { col: -1, row: 0 },
  'up-left': { col: -1, row: -1 }
}

export function useSilmukka(cols: Ref<number>, rows: Ref<number>) {
  const current = ref({ col: 0, row: 0 })

  const total = computed(() => cols.value * rows.value)

  const currentIndex = computed(() =>
    current.value.row * cols.value + current.value.col
  )

  const canMove = computed(() =>
    Object.fromEntries(
      Object.entries(MOVES).map(([dir, delta]) => [
        dir,
        current.value.col + delta.col >= 0
        && current.value.col + delta.col < cols.value
        && current.value.row + delta.row >= 0
        && current.value.row + delta.row < rows.value
      ])
    ) as Record<Direction, boolean>
  )

  function move(dir: Direction) {
    if (!canMove.value[dir]) return
    const delta = MOVES[dir]
    current.value = {
      col: current.value.col + delta.col,
      row: current.value.row + delta.row
    }
  }

  function select(col: number, row: number) {
    current.value = { col, row }
  }

  function isActive(col: number, row: number) {
    return current.value.col === col && current.value.row === row
  }

  function itemIndex(col: number, row: number) {
    return row * cols.value + col
  }

  function cells<T>(items: T[]) {
    return Array.from({ length: rows.value }, (_, row) =>
      Array.from({ length: cols.value }, (_, col) => ({
        col,
        row,
        item: items[itemIndex(col, row)],
        active: isActive(col, row)
      }))
    ).flat()
  }

  return { current, currentIndex, total, canMove, move, select, isActive, itemIndex, cells }
}
