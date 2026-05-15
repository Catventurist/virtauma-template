<script setup lang="ts">
const { t } = useI18n()
const title = t('nav.home')
const description = t('site.description')

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
    <ClientOnly>
      <HomeHero />
      <Syvyys />
    </ClientOnly>
  </div>
</template>
