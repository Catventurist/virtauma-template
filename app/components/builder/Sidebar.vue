<script setup lang="ts">
import { Motion, AnimatePresence } from 'motion-v'
import { registry, categories } from '~/utils/mdcRegistry'
import type { ComponentDef } from '~/utils/mdcRegistry'

const emit = defineEmits<{ add: [component: ComponentDef] }>()
const { t } = useI18n()
const search = ref('')
const activeCategory = ref<string | null>(null)

const filtered = computed(() => {
  const q = search.value.toLowerCase()
  return registry.filter((c) => {
    const matchesSearch = c.name.includes(q) || c.labelKey.toLowerCase().includes(q)
    const matchesCategory = !activeCategory.value || c.category === activeCategory.value
    return matchesSearch && matchesCategory
  })
})
</script>

<template>
  <div class="flex flex-col h-full gap-3 p-3 border-r border-default bg-default/40 backdrop-blur-sm w-56">
    <UInput
      id="sidebar-search"
      v-model="search"
      :placeholder="t('builder.sidebar.search')"
      icon="i-lucide-search"
      size="sm"
    />

    <div class="flex flex-wrap gap-1">
      <UBadge
        :label="t('builder.sidebar.all')"
        :variant="activeCategory === null ? 'outline' : 'subtle'"
        size="xs"
        class="cursor-pointer"
        @click="activeCategory = null"
      />
      <UBadge
        v-for="cat in categories"
        :key="cat"
        :label="t(`builder.categories.${cat}`)"
        :variant="activeCategory === cat ? 'outline' : 'subtle'"
        size="xs"
        class="cursor-pointer"
        @click="activeCategory = activeCategory === cat ? null : cat"
      />
    </div>

    <div class="flex flex-col gap-1.5 overflow-y-auto flex-1">
      <AnimatePresence>
        <Motion
          v-for="(component, i) in filtered"
          :key="component.name"
          as="div"
          :initial="{ opacity: 0, x: -10 }"
          :animate="{ opacity: 1, x: 0 }"
          :exit="{ opacity: 0, x: -10 }"
          :transition="{ delay: i * 0.03, type: 'spring', stiffness: 300, damping: 30 }"
          :while-hover="{ x: 4 }"
          :while-press="{ scale: 0.97 }"
          class="flex items-center gap-2.5 p-2 rounded-lg cursor-pointer border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-colors"
          @click="emit('add', component)"
        >
          <UIcon
            :name="component.icon"
            class="w-4 h-4 text-primary shrink-0"
          />
          <span class="text-sm text-default">{{ t(component.labelKey) }}</span>
          <UBadge
            :label="String(component.props.length)"
            variant="subtle"
            size="xs"
            class="ml-auto"
          />
        </Motion>
      </AnimatePresence>

      <div
        v-if="filtered.length === 0"
        class="text-center text-muted text-sm py-8"
      >
        {{ t('builder.sidebar.empty') }}
      </div>
    </div>
  </div>
</template>
