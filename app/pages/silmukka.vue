<script setup lang="ts">
import Silmukka from '~/components/content/Silmukka.vue'
import { animate, useMotionValue, useTransform, RowValue, Motion, AnimatePresence } from 'motion-v'

interface Item {
  label: string
  icon: string
}

const items: Item[] = Array.from({ length: 25 }, (_, i) => ({
  label: `${i + 1}`,
  icon: [
    'i-lucide-mountain',
    'i-lucide-droplets',
    'i-lucide-sun',
    'i-lucide-heart',
    'i-lucide-flame',
    'i-lucide-eye',
    'i-lucide-crown',
    'i-lucide-sparkles',
    'i-lucide-moon-star',
    'i-lucide-leaf'
  ][i % 10]!
}))

const grid = ref<InstanceType<typeof Silmukka> | null>(null)
const selected = ref<Item | undefined>(items[0])
const displayValue = useMotionValue(0)
const rounded = useTransform(() => Math.round(displayValue.get()))

onMounted(() => {
  watch(selected, (item) => {
    if (!item) return
    animate(displayValue, parseInt(item.label), { duration: 0.4, ease: 'easeOut' })
  }, { immediate: true })
})

const { t } = useI18n()
const title = t('pages.silmukka.title')
const description = t('pages.silmukka.description')

useSeoMeta({
  title: title,
  description: description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
    <ClientOnly>
      <div
        v-if="selected"
        class="text-center space-y-1"
      >
        <AnimatePresence mode="wait">
          <Motion
            :key="selected.icon"
            as="div"
            :initial="{ opacity: 0, scale: 0.5, rotate: -15 }"
            :animate="{ opacity: 1, scale: 1, rotate: 0 }"
            :exit="{ opacity: 0, scale: 0.5, rotate: 15 }"
            :transition="{ duration: 0.2, ease: 'easeOut' }"
            class="flex justify-center"
          >
            <UIcon
              :name="selected.icon"
              class="size-8 text-primary"
            />
          </Motion>
        </AnimatePresence>
        <p class="text-lg font-semibold text-highlighted">
          <RowValue :value="rounded" />
        </p>
      </div>
    </ClientOnly>
    <ClientOnly>
      <div class="flex items-center gap-12">
        <Silmukka
          ref="grid"
          :cols="5"
          :rows="5"
          :items="items"
          :cell-size="80"
          @select="(item) => selected = (item as Item)"
          @change="(item) => selected = (item as Item)"
        >
          <template #cell="{ item, active }">
            <UIcon
              :name="(item as Item).icon"
              :class="active ? 'text-inverted size-6' : 'text-muted size-5'"
            />
          </template>
        </Silmukka>

        <Nyyrikki
          class="hidden md:block"
          :can-move="grid?.canMove"
          @navigate="grid?.move"
        />
      </div>
    </ClientOnly>
  </div>
</template>
