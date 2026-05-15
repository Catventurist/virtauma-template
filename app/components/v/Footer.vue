<script setup lang="ts">
import { Motion } from 'motion-v'

const { t } = useI18n()
const localePath = useLocalePath()

const links = computed(() => [
  { label: t('nav.home'), to: localePath('/') },
  { label: t('nav.about'), to: localePath('/about') },
  { label: t('nav.docs'), to: localePath('/docs') },
  { label: t('nav.glossary'), to: localePath('/glossary') },
  { label: t('nav.vesi'), to: localePath('/vesi') }

])
</script>

<template>
  <Motion
    :initial="{ opacity: 0, y: 14 }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.5, ease: 'easeOut' }"
    :viewport="{ once: true }"
  >
    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          © {{ new Date().getFullYear() }} {{ t('site.title') }}
        </p>
      </template>

      <UNavigationMenu :items="links" />

      <template #right>
        <UColorModeButton />
      </template>
    </UFooter>
  </Motion>
</template>
