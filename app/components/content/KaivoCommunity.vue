<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'

const { locale } = useI18n()

const { data } = await useAsyncData(`kaivo-community-${locale.value}`, () =>
  queryCollection('content_' + locale.value as keyof PageCollections)
    .path(`/${locale.value}/kaivo/community`)
    .first()
)
</script>

<template>
  <div
    v-if="data"
    class="flex flex-col gap-4"
  >
    <ContentRenderer :value="data" />
  </div>
</template>
