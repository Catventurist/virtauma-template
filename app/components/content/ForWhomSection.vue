<script setup lang="ts">
import { Motion } from 'motion-v'

const props = withDefaults(defineProps<{
  headline?: string
  title?: string
  description?: string
  items?: { icon: string, title: string, description: string }[]
}>(), {
  headline: () => useI18n().t('about.forwhom.headline'),
  title: () => useI18n().t('about.forwhom.title'),
  description: () => useI18n().t('about.forwhom.description'),
  items: () => {
    const { t } = useI18n()
    return [
      { icon: 'i-lucide-users-round', title: t('about.forwhom.distributed.title'), description: t('about.forwhom.distributed.description') },
      { icon: 'i-lucide-infinity', title: t('about.forwhom.longterm.title'), description: t('about.forwhom.longterm.description') },
      { icon: 'i-lucide-network', title: t('about.forwhom.network.title'), description: t('about.forwhom.network.description') },
      { icon: 'i-lucide-droplets', title: t('about.forwhom.evaporation.title'), description: t('about.forwhom.evaporation.description') }
    ]
  }
})
</script>

<template>
  <section class="py-16">
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
        <h2 class="text-4xl font-bold text-highlighted">
          {{ props.title }}
        </h2>
        <p class="text-muted max-w-xl">
          {{ props.description }}
        </p>
      </Motion>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ForWhomCard
          v-for="(item, i) in props.items"
          :key="i"
          v-bind="item"
          :delay="i * 0.08"
        />
      </div>
    </UContainer>
  </section>
</template>
