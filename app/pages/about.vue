<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'

const { locale } = useI18n()

const { data: page } = await useAsyncData(`about-${locale.value}`, () =>
  queryCollection('content_' + locale.value as keyof PageCollections).path(`/${locale.value}/about`).first()
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
