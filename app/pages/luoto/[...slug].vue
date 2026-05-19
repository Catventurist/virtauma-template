<script setup lang="ts">
const { collectionKey, currentPath, slug, locale } = useLuotoNav()

const { data: page } = useAsyncData(
  `page-luoto-${locale.value}-${slug.value}`,
  async () => {
    try {
      return await queryCollection(collectionKey.value).path(currentPath.value).first() ?? null
    } catch {
      return null
    }
  }
)

const { data: surround } = useAsyncData(
  `surround-luoto-${locale.value}-${slug.value}`,
  async () => {
    try {
      return await queryCollectionItemSurroundings(collectionKey.value, currentPath.value)
    } catch {
      return null
    }
  }
)

definePageMeta({ layout: 'luoto' })

const localePath = useLocalePath()
const fixedSurround = computed(() =>
  surround.value?.map(item =>
    item ? { ...item, path: localePath(`/${item.path.split('/').slice(2).join('/')}`) } : item
  )
)

const title = computed(() => page.value?.seo?.title || page.value?.title)
const description = computed(() => page.value?.seo?.description || page.value?.description)

useSeoMeta({
  title,
  description,
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
        <UContentSurround :surround="fixedSurround || undefined" />
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
          class="top-28 print:hidden"
        />
      </template>
    </UPage>
  </div>
</template>
