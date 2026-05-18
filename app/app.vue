<script setup lang="ts">
import colors from 'tailwindcss/colors'
import { en, fi } from '@nuxt/ui/locale'

const { locale, t } = useI18n()
const uiLocale = computed(() => locale.value === 'fi' ? fi : en)
const lang = computed(() => uiLocale.value.code)
const dir = computed(() => uiLocale.value.dir)

const appConfig = useAppConfig()
const colorMode = useColorMode()
const color = computed(() => colorMode.value === 'dark' ? (colors as never)[appConfig.ui.colors?.neutral as string][900] : 'white')

const { navi, files } = useDocs()
const title = t('site.title')
const description = t('site.description')
const loading = ref(true)

const route = useRoute()
const isLuoto = computed(() => route.path.includes('/luoto'))

const { searchFiles: luotoFiles, lnavigation: luotoNavigation } = useLuotoNav()

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
  <UApp :locale="uiLocale">
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
        :files="isLuoto ? (luotoFiles ?? []) : (files ?? [])"
        :navigation="isLuoto ? (luotoNavigation ?? []) : (navi ?? [])"
        shortcut="meta_k"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
