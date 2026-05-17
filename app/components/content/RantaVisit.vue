<script setup lang="ts">
import { Motion } from 'motion-v'

const { t } = useI18n()
const localePath = useLocalePath()

const { public_ } = useRanta()
const rippleCount = computed(() => public_.value.length)
</script>

<template>
  <Motion
    as="div"
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :transition="{ duration: 1.4, ease: 'easeOut' }"
    class="flex flex-col items-center gap-8 py-16 text-center"
  >
    <div class="relative flex items-center justify-center">
      <Motion
        v-for="i in 3"
        :key="i"
        as="div"
        :animate="{ scale: [1, 2.4], opacity: [0.15, 0] }"
        :transition="{
          duration: 3.5,
          delay: i * 1.1,
          repeat: Infinity,
          ease: 'easeOut'
        }"
        class="absolute size-16 rounded-full border border-primary"
      />
      <UIcon
        name="i-lucide-waves"
        class="size-8 text-primary relative z-10"
      />
    </div>

    <div class="flex flex-col gap-3 max-w-sm">
      <h2 class="text-2xl font-semibold text-highlighted">
        {{ t('ranta.title') }}
      </h2>
      <p class="text-sm text-toned leading-relaxed">
        {{ t('ranta.description') }}
      </p>
    </div>

    <Motion
      v-if="rippleCount"
      as="p"
      :animate="{ opacity: [0.4, 0.8, 0.4] }"
      :transition="{ duration: 5, repeat: Infinity, ease: 'easeInOut' }"
      class="text-xs text-muted tracking-widest uppercase"
    >
      {{ rippleCount }} {{ t('ranta.present') }}
    </Motion>

    <USeparator
      color="neutral"
      class="max-w-xs w-full"
    />

    <div class="flex flex-col gap-2 max-w-xs w-full">
      <UButton
        :label="t('ranta.enter')"
        color="primary"
        variant="subtle"
        block
        leading-icon="i-lucide-droplet"
        :to="localePath('/profile')"
      />
      <UButton
        :label="t('ranta.learn')"
        color="neutral"
        variant="ghost"
        block
        :to="localePath('/about')"
      />
    </div>
  </Motion>
</template>
