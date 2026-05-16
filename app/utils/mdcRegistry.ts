export type MdcFieldType = 'string' | 'boolean' | 'number' | 'enum' | 'icon' | 'color'

export interface PropDef {
  name: string
  type: MdcFieldType
  default?: string | boolean | number
  options?: string[]
  placeholderKey?: string
}

export interface ComponentDef {
  name: string
  labelKey: string
  category: 'layout' | 'feedback' | 'navigation' | 'data' | 'form'
  icon: string
  props: PropDef[]
  hasContent?: boolean
}

export const registry: ComponentDef[] = [
  {
    name: 'alert',
    labelKey: 'builder.components.alert',
    category: 'feedback',
    icon: 'i-lucide-alert-circle',
    props: [
      { name: 'title', type: 'string', placeholderKey: 'title' },
      { name: 'description', type: 'string', placeholderKey: 'description' },
      { name: 'color', type: 'color' },
      { name: 'variant', type: 'enum', options: ['solid', 'outline', 'soft', 'subtle'], default: 'solid' },
      { name: 'icon', type: 'icon' },
      { name: 'close', type: 'boolean' }
    ]
  },
  {
    name: 'callout',
    labelKey: 'builder.components.callout',
    category: 'feedback',
    icon: 'i-lucide-megaphone',
    props: [
      { name: 'color', type: 'color' },
      { name: 'icon', type: 'icon' }
    ],
    hasContent: true
  },
  {
    name: 'card',
    labelKey: 'builder.components.card',
    category: 'layout',
    icon: 'i-lucide-square',
    props: [
      { name: 'title', type: 'string', placeholderKey: 'title' },
      { name: 'description', type: 'string', placeholderKey: 'description' }
    ],
    hasContent: true
  },
  {
    name: 'badge',
    labelKey: 'builder.components.badge',
    category: 'data',
    icon: 'i-lucide-tag',
    props: [
      { name: 'label', type: 'string' },
      { name: 'color', type: 'color' },
      { name: 'variant', type: 'enum', options: ['solid', 'outline', 'soft', 'subtle'] },
      { name: 'size', type: 'enum', options: ['xs', 'sm', 'md', 'lg'] }
    ]
  },
  {
    name: 'button',
    labelKey: 'builder.components.button',
    category: 'form',
    icon: 'i-lucide-mouse-pointer-click',
    props: [
      { name: 'label', type: 'string' },
      { name: 'color', type: 'color' },
      { name: 'variant', type: 'enum', options: ['solid', 'outline', 'soft', 'subtle', 'ghost', 'link'] },
      { name: 'size', type: 'enum', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
      { name: 'icon', type: 'icon' },
      { name: 'trailing-icon', type: 'icon' },
      { name: 'loading', type: 'boolean' },
      { name: 'disabled', type: 'boolean' },
      { name: 'block', type: 'boolean' }
    ]
  },
  {
    name: 'separator',
    labelKey: 'builder.components.separator',
    category: 'layout',
    icon: 'i-lucide-minus',
    props: [
      { name: 'label', type: 'string' },
      { name: 'color', type: 'color' },
      { name: 'icon', type: 'icon' },
      { name: 'type', type: 'enum', options: ['solid', 'dashed', 'dotted'] }
    ]
  },
  {
    name: 'tabs',
    labelKey: 'builder.components.tabs',
    category: 'navigation',
    icon: 'i-lucide-layout-panel-top',
    props: [
      { name: 'color', type: 'color' },
      { name: 'variant', type: 'enum', options: ['pill', 'link'] },
      { name: 'size', type: 'enum', options: ['xs', 'sm', 'md', 'lg'] }
    ],
    hasContent: true
  },
  {
    name: 'accordion',
    labelKey: 'builder.components.accordion',
    category: 'layout',
    icon: 'i-lucide-chevrons-down-up',
    props: [
      { name: 'color', type: 'color' },
      { name: 'variant', type: 'enum', options: ['solid', 'ghost', 'subtle', 'soft', 'outline', 'link'] },
      { name: 'collapsible', type: 'boolean', default: true }
    ],
    hasContent: true
  },
  {
    name: 'code',
    labelKey: 'builder.components.code',
    category: 'data',
    icon: 'i-lucide-code',
    props: [
      { name: 'lang', type: 'string', placeholderKey: 'lang' },
      { name: 'filename', type: 'string' },
      { name: 'highlights', type: 'string', placeholderKey: 'highlights' }
    ],
    hasContent: true
  },
  {
    name: 'steps',
    labelKey: 'builder.components.steps',
    category: 'navigation',
    icon: 'i-lucide-list-ordered',
    props: [
      { name: 'color', type: 'color' },
      { name: 'size', type: 'enum', options: ['xs', 'sm', 'md', 'lg'] }
    ],
    hasContent: true
  }
]

export const categories = [...new Set(registry.map(c => c.category))] as const
