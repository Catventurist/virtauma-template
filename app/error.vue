<script setup lang="ts">
import { Motion } from 'motion-v'
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const localePath = useLocalePath()

const is404 = computed(() => props.error.statusText === 404 as unknown as string | undefined)
const title = String(props.error.status ?? 'Error')
const description = props.error.statusText

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
  <UApp>
    <VHeader />

    <UError
      :error="error"
      :redirect="localePath('/')"
      :clear="{
        label: t('error.cta'),
        size: 'lg'
      }"
    >
      <template #leading>
        <Motion
          :initial="{ opacity: 0, scale: 0.8 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.6, ease: 'easeOut' }"
        >
          <VLogo :size="72" />
        </Motion>
      </template>

      <template #status>
        <Motion
          :initial="{ opacity: 0, y: -16 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, ease: 'easeOut', delay: 0.1 }"
        >
          <span class="text-6xl font-bold text-primary">
            {{ error.statusText }}
          </span>
        </Motion>
      </template>

      <template #title>
        <Motion
          :initial="{ opacity: 0, y: 12 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, ease: 'easeOut', delay: 0.2 }"
        >
          {{ is404 ? t('error.404.title') : t('error.500.title') }}
        </Motion>
      </template>

      <template #description>
        <Motion
          :initial="{ opacity: 0, y: 12 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, ease: 'easeOut', delay: 0.3 }"
        >
          {{ is404 ? t('error.404.description') : t('error.500.description') }}
        </Motion>
      </template>
    </UError>
    <VFooter />
  </UApp>
</template>
