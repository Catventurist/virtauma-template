<script setup lang="ts">
import { Motion } from 'motion-v'

const { t } = useI18n()

const props = withDefaults(defineProps<{
  headline?: string
  stats?: { key: string, value: number, suffix: string, decimals: number }[]
}>(), {
  headline: () => useI18n().t('stats.headline'),
  stats: () => [
    { key: 'lakes', value: 188000, suffix: '+', decimals: 0 },
    { key: 'forest', value: 75, suffix: '%', decimals: 0 },
    { key: 'saunas', value: 3, suffix: 'M', decimals: 1 },
    { key: 'water', value: 100, suffix: '%', decimals: 0 }
  ]
})
</script>

<template>
  <section class="relative py-24 overflow-hidden">
    <Motion
      as="div"
      class="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
      :animate="{ scale: [1, 1.1, 1], x: [0, 20, 0] }"
      :transition="{ duration: 10, repeat: Infinity, ease: 'easeInOut' }"
    />
    <Motion
      as="div"
      class="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-secondary/10 blur-3xl"
      :animate="{ scale: [1, 1.15, 1], x: [0, -20, 0] }"
      :transition="{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }"
    />

    <UContainer>
      <Motion
        as="div"
        class="flex flex-col items-center text-center gap-4 mb-12"
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
      </Motion>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          v-for="(stat, i) in props.stats"
          :key="stat.key"
          :value="stat.value"
          :suffix="stat.suffix"
          :decimals="stat.decimals"
          :label="t(`stats.${stat.key}.label`)"
          :description="t(`stats.${stat.key}.description`)"
          :delay="i * 0.1"
        />
      </div>
    </UContainer>
  </section>
</template>
