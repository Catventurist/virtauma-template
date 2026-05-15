<script setup lang="ts">
import { Motion } from 'motion-v'
import type { PageFeatureProps } from '@nuxt/ui'

const props = withDefaults(defineProps<{
  headline?: string
  title?: string
  description?: string
  features?: (PageFeatureProps & { large?: boolean })[]
}>(), {
  headline: () => useI18n().t('features.headline'),
  title: () => useI18n().t('features.title'),
  description: () => useI18n().t('features.description'),
  features: () => {
    const { t } = useI18n()
    return [
      { icon: 'i-lucide-droplets', title: t('features.purity.title'), description: t('features.purity.description'), large: true },
      { icon: 'i-lucide-snowflake', title: t('features.cold.title'), description: t('features.cold.description') },
      { icon: 'i-lucide-leaf', title: t('features.nature.title'), description: t('features.nature.description') },
      { icon: 'i-lucide-wind', title: t('features.air.title'), description: t('features.air.description') }
    ]
  }
})
</script>

<template>
  <section class="py-24">
    <UContainer>
      <Motion
        as="div"
        class="flex flex-col items-center text-center gap-4 mb-16"
        :initial="{ opacity: 0, y: 16 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once: true }"
        :transition="{ duration: 0.5, ease: 'easeOut' }"
      >
        <UBadge
          variant="subtle"
          color="primary"
          :label="props.headline"
        />
        <h2 class="text-4xl font-bold text-highlighted">
          {{ props.title }}
        </h2>
        <p class="text-muted max-w-xl">
          {{ props.description }}
        </p>
      </Motion>

      <div class="grid grid-cols-2 lg:grid-cols-4 auto-rows-[200px] gap-4">
        <FeatureCard
          v-for="(feature, i) in props.features"
          :key="i"
          :icon="feature.icon!"
          :title="feature.title!"
          :description="feature.description!"
          :large="feature.large"
          :delay="i * 0.08"
        />
      </div>
    </UContainer>
  </section>
</template>
