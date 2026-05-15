<script setup lang="ts">
import { withLeadingSlash } from 'ufo'
import type { PageCollections } from '@nuxt/content'

const route = useRoute()
const { locale } = useI18n()
const slug = computed(() => Array.isArray(route.params.slug) ? withLeadingSlash(String(route.params.slug.join('/'))) : withLeadingSlash(String(route.params.slug)))

const { data: page } = await useAsyncData('page-' + slug.value, async () => {
  const collection = ('content_' + locale.value)
  const content = await queryCollection(collection as keyof PageCollections).path(route.path).first()
  if (!content && locale.value !== 'en') {
    return await queryCollection('content_en').path(route.path).first()
  }

  return content
}, {
  watch: [locale]
})

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

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
  <div>
    <ContentRenderer
      v-if="page"
      :value="page"
    />
  </div>
</template>
