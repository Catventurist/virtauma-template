<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'

const { locale } = useI18n()

const { data: page } = await useAsyncData(`vesi-${locale.value}`, () =>
  queryCollection('content_' + locale.value as keyof PageCollections).path(`/${locale.value}/vesi`).first()
)

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
  ogTitle: page.value?.title,
  ogDescription: page.value?.description,
  twitterCard: 'summary_large_image',
  twitterTitle: page.value?.title,
  twitterDescription: page.value?.description
})
</script>

<template>
  <div>
    <ContentRenderer
      v-if="page"
      :value="page"
    />
  </div>
</template>
