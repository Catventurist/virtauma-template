import type { ComponentDef } from '~/utils/mdcRegistry'

export interface CanvasNode {
  id: string
  component: ComponentDef
  props: Record<string, string | boolean | number>
  content: string
  contentIsKey: boolean
  collapsed: boolean
}

export function useMdcBuilder() {
  const nodes = ref<CanvasNode[]>([])
  const selectedId = ref<string | null>(null)
  const history = ref<CanvasNode[][]>([])
  onMounted(() => {
    pushHistory()
  })
  const historyIndex = ref(0)
  const outputMode = ref<'mdc' | 'json'>('mdc')

  const selected = computed(() => nodes.value.find(n => n.id === selectedId.value) ?? null)
  const canUndo = computed(() => historyIndex.value > 0)
  const canRedo = computed(() => historyIndex.value < history.value.length - 1)

  function pushHistory() {
    history.value = history.value.slice(0, historyIndex.value + 1)
    history.value.push(JSON.parse(JSON.stringify(nodes.value)))
    historyIndex.value = history.value.length - 1
  }

  function addNode(component: ComponentDef) {
    const node: CanvasNode = {
      id: crypto.randomUUID(),
      component,
      props: Object.fromEntries(
        component.props.map(p => [p.name, p.default ?? (p.type === 'boolean' ? false : '')])
      ),
      content: component.hasContent ? 'builder.defaultContent' : '',
      contentIsKey: !!component.hasContent,
      collapsed: false
    }
    nodes.value.push(node)
    selectedId.value = node.id
    pushHistory()
  }

  function removeNode(id: string) {
    nodes.value = nodes.value.filter(n => n.id !== id)
    if (selectedId.value === id) selectedId.value = null
    pushHistory()
  }

  function duplicateNode(id: string) {
    const node = nodes.value.find(n => n.id === id)
    if (!node) return
    const clone: CanvasNode = {
      ...node,
      id: crypto.randomUUID(),
      props: { ...node.props }
    }
    const index = nodes.value.findIndex(n => n.id === id)
    nodes.value.splice(index + 1, 0, clone)
    selectedId.value = clone.id
    pushHistory()
  }

  function updateProp(id: string, key: string, value: string | boolean | number) {
    const node = nodes.value.find(n => n.id === id)
    if (!node) return
    node.props[key] = value
  }

  function updateContent(id: string, content: string) {
    const node = nodes.value.find(n => n.id === id)
    if (!node) return
    node.content = content
  }

  function toggleCollapse(id: string) {
    const node = nodes.value.find(n => n.id === id)
    if (!node) return
    node.collapsed = !node.collapsed
  }

  function undo() {
    if (!canUndo.value) return
    historyIndex.value--
    nodes.value = JSON.parse(JSON.stringify(history.value[historyIndex.value]))
  }

  function redo() {
    if (!canRedo.value) return
    historyIndex.value++
    nodes.value = JSON.parse(JSON.stringify(history.value[historyIndex.value]))
  }

  function clearAll() {
    nodes.value = []
    selectedId.value = null
    pushHistory()
  }

  function toMDC(): string {
    return nodes.value.map((node) => {
      const content = node.contentIsKey ? '' : node.content
      const active = Object.entries(node.props).filter(([_, v]) => v !== '' && v !== false)

      if (node.component.hasContent) {
        const frontmatter = active.map(([k, v]) => `${k}: ${v}`).join('\n')
        return `::${node.component.name}${frontmatter ? `\n---\n${frontmatter}\n---` : ''}\n${content}\n::`
      }

      const attrs = active.map(([k, v]) => `${k}="${v}"`).join(' ')
      return `::${node.component.name}${attrs ? `{${attrs}}` : ''}`
    }).join('\n\n')
  }

  function toJSON(): string {
    return JSON.stringify(
      nodes.value.map(n => ({
        component: n.component.name,
        props: Object.fromEntries(Object.entries(n.props).filter(([_, v]) => v !== '' && v !== false)),
        ...(n.component.hasContent ? { content: n.contentIsKey ? '' : n.content } : {})
      })),
      null, 2
    )
  }

  const output = computed(() => outputMode.value === 'mdc' ? toMDC() : toJSON())

  return {
    nodes, selectedId, selected,
    outputMode, output,
    canUndo, canRedo,
    addNode, removeNode, duplicateNode,
    updateProp, updateContent,
    toggleCollapse, undo, redo, clearAll
  }
}
