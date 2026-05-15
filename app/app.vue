<script setup lang="ts">
import colors from 'tailwindcss/colors'
import * as locales from '@nuxt/ui/locale'

const { locale, t } = useI18n()
const lang = computed(() => locales[locale.value].code)
const dir = computed(() => locales[locale.value].dir)

const appConfig = useAppConfig()
const colorMode = useColorMode()
const color = computed(() => colorMode.value === 'dark' ? (colors as never)[appConfig.ui.colors?.neutral as string][900] : 'white')

const { navi, files } = useDocs()
const title = t('site.title')
const description = t('site.description')
const loading = ref(true)

provide('navigation', navi)

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang,
    dir,
    style: 'scroll-behavior: smooth'
  }
})

onMounted(() => {
  loading.value = false
})

useSeoMeta({
  titleTemplate: '%s - ' + t('site.title'),
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp :locale="locales[locale]">
    <NuxtLoadingIndicator />
    <VLoader v-if="loading" />
    <VCursorRipple />
    <NuxtLayout>
      <NuxtPage
        :transition="{
          name: 'page',
          mode: 'out-in'
        }"
      />
    </NuxtLayout>
    <ClientOnly>
      <LazyUContentSearch
        :files="files ?? []"
        shortcut="meta_k"
        :navigation="navi ?? []"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
