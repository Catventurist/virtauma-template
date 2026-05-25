<script setup lang="ts">
import { Motion } from 'motion-v'
import { useWindowScroll, useSwipe } from '@vueuse/core'

const { t, locale } = useI18n()

withDefaults(defineProps<{
  name?: string
  edition?: string | number
  tagline?: string
}>(), {
  name: 'Kaiun Sanomat',
  edition: 1,
  tagline: 'Totuus on vapaana'
})

const date = new Intl.DateTimeFormat(locale.value, { dateStyle: 'full' }).format(new Date())
const { y } = useWindowScroll()
const sticky = computed(() => y.value > 100)
const el = useTemplateRef<HTMLElement>('grid')
const { direction } = useSwipe(el)

watch(direction, (dir) => {
  if (dir === 'left') navigateSection(1)
  if (dir === 'right') navigateSection(-1)
})

const sections = computed(() =>
  Array.from(document.querySelectorAll('[data-section]'))
)

const navigateSection = (offset: number) => {
  const current = sections.value.findIndex(el =>
    el.getBoundingClientRect().top >= 0
  )
  sections.value[current + offset]?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="w-full">
    <Motion
      as="div"
      class="fixed top-0 inset-x-0 z-50 px-6 py-2 bg-elevated border-b border-accented flex items-center justify-center"
      :animate="{ opacity: sticky ? 1 : 0, y: sticky ? 0 : -40 }"
    >
      <span class="text-sm font-bold uppercase tracking-widest text-highlighted">{{ name }}</span>
    </Motion>

    <Motion
      as="header"
      class="w-full py-6 border-b-2 border-highlighted"
      :initial="{ opacity: 0, y: -20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6 }"
    >
      <div class="border-t border-highlighted pt-4">
        <div class="flex items-end justify-between text-xs text-muted mb-3">
          <span>{{ date }}</span>
          <span>{{ tagline }}</span>
          <span>№ {{ edition }}</span>
        </div>
        <h1 class="text-center text-6xl font-bold tracking-tight text-highlighted uppercase">
          {{ name }}
        </h1>
        <div class="border-t border-highlighted mt-4" />
      </div>
    </Motion>

    <div class="border-y border-error py-1.5 flex items-center gap-3">
      <span class="text-xs font-bold uppercase tracking-widest text-error shrink-0 px-3 border-r border-error">
        {{ t('kaiku.breaking') }}
      </span>
      <UMarquee pause-on-hover>
        <slot name="breaking" />
      </UMarquee>
    </div>

    <div
      ref="grid"
      class="grid grid-cols-3 gap-px bg-accented mt-px [&>*:last-child:nth-child(3n-1)]:col-start-2 [&>*:last-child:nth-child(3n-2)]:col-start-2"
    >
      <slot />
    </div>
  </div>
</template>
