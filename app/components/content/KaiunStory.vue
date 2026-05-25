<script setup lang="ts">
import { Motion, AnimatePresence } from 'motion-v'
import { useElementVisibility } from '@vueuse/core'

const { locale } = useI18n()

const props = withDefaults(defineProps<{
  title?: string
  priority?: 'lead' | 'secondary' | 'minor'
  columnSpan?: string | number
  image?: string
  section?: string
  byline?: string
  publishedAt?: string
}>(), {
  priority: 'secondary',
  columnSpan: '1'
})

const spanClass = computed(() => ({
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3'
}[props.priority === 'lead' ? 3 : Number(props.columnSpan)] ?? 'col-span-1'))

const fmtDate = (d: string) => new Intl.DateTimeFormat(locale.value, {
  dateStyle: 'medium'
}).format(new Date(d))

const el = useTemplateRef<HTMLDivElement>('story')
const isVisible = useElementVisibility(el)
const expanded = ref(true)
</script>

<template>
  <div
    ref="story"
    :class="spanClass"
    data-section
  >
    <Motion
      as="article"
      class="bg-elevated p-5 flex flex-col gap-3 cursor-pointer h-full"
      :initial="{ opacity: 0, y: 24 }"
      :animate="isVisible ? { opacity: 1, y: 0 } : {}"
      :transition="{ duration: 0.5, ease: 'easeOut' }"
      @click="expanded = !expanded"
    >
      <div
        v-if="section"
        class="text-xs font-bold uppercase tracking-widest text-primary border-b border-primary pb-1 w-fit"
      >
        {{ section }}
      </div>

      <NuxtImg
        v-if="image && priority === 'lead'"
        :src="image"
        class="w-full object-cover max-h-96 grayscale-25 hover:grayscale-50 transition-all"
      />

      <div class="text-highlighted font-bold text-lg leading-tight">
        {{ title }}
      </div>

      <AnimatePresence>
        <Motion
          v-if="expanded"
          as="div"
          class="text-default text-justify hyphens-auto leading-relaxed text-sm"
          :class="priority === 'lead' ? 'columns-3 gap-6' : ''"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :transition="{ duration: 0.3 }"
        >
          <slot />
        </Motion>
      </AnimatePresence>

      <footer
        v-if="byline || publishedAt"
        class="flex justify-between text-xs text-dimmed border-t border-accented pt-2 mt-auto"
      >
        <span
          v-if="byline"
          class="uppercase tracking-wide"
        >{{ byline }}</span>
        <span v-if="publishedAt">{{ fmtDate(publishedAt) }}</span>
      </footer>
    </Motion>
  </div>
</template>
