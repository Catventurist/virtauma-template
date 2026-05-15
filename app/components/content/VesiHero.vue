<script setup lang="ts">
import { Motion } from 'motion-v'

const props = withDefaults(defineProps<{
  headline?: string
  title?: string
  description?: string
  ctaPrimary?: string
  ctaPrimaryTo?: string
  ctaSecondary?: string
  ctaSecondaryTo?: string
}>(), {
  headline: () => useI18n().t('hero.headline'),
  title: () => useI18n().t('hero.title'),
  description: () => useI18n().t('hero.description'),
  ctaPrimary: () => useI18n().t('hero.cta.primary'),
  ctaPrimaryTo: '/',
  ctaSecondary: () => useI18n().t('hero.cta.secondary'),
  ctaSecondaryTo: '/vesi'
})

const localePath = useLocalePath()
</script>

<template>
  <div class="relative overflow-hidden">
    <Motion
      as="div"
      class="pointer-events-none absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl"
      :animate="{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, 20, 0] }"
      :transition="{ duration: 10, repeat: Infinity, ease: 'easeInOut' }"
    />
    <Motion
      as="div"
      class="pointer-events-none absolute top-10 -right-32 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-3xl"
      :animate="{ scale: [1, 1.2, 1], x: [0, -40, 0], y: [0, 30, 0] }"
      :transition="{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }"
    />
    <Motion
      as="div"
      class="pointer-events-none absolute -bottom-20 left-1/2 w-[400px] h-[400px] rounded-full bg-info/10 blur-3xl"
      :animate="{ scale: [1, 1.1, 1], y: [0, -20, 0] }"
      :transition="{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }"
    />

    <UPageHero>
      <template #headline>
        <Motion
          :initial="{ opacity: 0, y: -10 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, ease: 'easeOut' }"
        >
          <UBadge
            variant="subtle"
            color="primary"
            :label="props.headline"
          />
        </Motion>
      </template>

      <template #title>
        <Motion
          :initial="{ opacity: 0, y: 24 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.1 }"
        >
          {{ props.title }}
        </Motion>
      </template>

      <template #description>
        <Motion
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.2 }"
        >
          {{ props.description }}
        </Motion>
      </template>

      <template #links>
        <Motion
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.35 }"
          class="flex flex-wrap gap-3 justify-center"
        >
          <UButton
            size="lg"
            :to="localePath(props.ctaPrimaryTo)"
            :label="props.ctaPrimary"
          />
          <UButton
            size="lg"
            color="neutral"
            variant="subtle"
            :to="localePath(props.ctaSecondaryTo)"
            :label="props.ctaSecondary"
          />
        </Motion>
      </template>

      <Motion
        :initial="{ opacity: 0, scale: 0.9 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.8, ease: 'easeOut', delay: 0.4 }"
      >
        <div class="relative flex items-center justify-center w-80 h-80 mx-auto rounded-full">
          <Motion
            v-for="(_, i) in 5"
            :key="i"
            as="div"
            class="absolute rounded-full border border-primary/30"
            :style="{ width: `${(i + 1) * 18}%`, height: `${(i + 1) * 18}%` }"
            :animate="{ scale: [1, 1.08, 1], opacity: [0.6, 0.15, 0.6] }"
            :transition="{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }"
          />
          <Motion
            as="div"
            class="w-4 h-4 rounded-full bg-primary"
            :animate="{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }"
            :transition="{ duration: 3, repeat: Infinity, ease: 'easeInOut' }"
          />
        </div>
      </Motion>
    </UPageHero>
  </div>
</template>
