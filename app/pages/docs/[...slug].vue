<script setup lang="ts">
import { withLeadingSlash } from 'ufo'
import type { DocsEnCollectionItem, DocsFiCollectionItem, PageCollections } from '@nuxt/content'

const route = useRoute()
const { locale } = useI18n()
const slug = computed(() => Array.isArray(route.params.slug) ? withLeadingSlash(String(route.params.slug.join('/'))) : withLeadingSlash(String(route.params.slug)))

const currentPath = computed(() => {
  const slug = route.params.slug as string[]
  const sub = slug?.length ? `/${slug.join('/')}` : ''
  return `/${locale.value}/docs${sub}`
})

const { data: page } = await useAsyncData('docs-' + slug.value, async () => {
  const content = await queryCollection('docs_' + locale.value as keyof PageCollections).path(currentPath.value).first()
  if (!content && locale.value !== 'en') {
    return await queryCollection('docs_en').first()
  }
  return content as DocsEnCollectionItem | DocsFiCollectionItem
}, {
  watch: [locale]
})

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings(('docs_' + locale.value) as keyof PageCollections, route.path, {
    fields: ['description']
  })
})

definePageMeta({
  layout: 'docs'
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
    <UPage v-if="page">
      <UPageHeader
        :title="page.title"
        :description="page.description"
      />
      <UPageBody>
        <ContentRenderer
          v-if="page.body"
          :value="page"
        />
        <USeparator v-if="surround?.length" />
        <UContentSurround :surround="surround" />
      </UPageBody>
      <template
        v-if="page?.body?.toc?.links?.length"
        #right
      >
        <UContentToc
          :links="page.body.toc.links"
          highlight
          highlight-color="primary"
          highlight-variant="circuit"
        />
      </template>
    </UPage>
    <!-- <UError
      v-else
      :error="{ statusCode: 404, message: 'Page not found' }"
    /> -->
  </div>
</template>
