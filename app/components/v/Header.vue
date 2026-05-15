<script setup lang="ts">
import { Motion } from 'motion-v'

const { t } = useI18n()
const { pageNav } = useNav()
const { socialLinks } = useSocialLinks()
</script>

<template>
  <UHeader :title="t('site.title')">
    <template #left>
      <Motion
        :initial="{ opacity: 0, x: -24 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.4, ease: 'easeOut' }"
      >
        <NuxtLinkLocale
          to="/"
          class="flex items-center gap-2"
        >
          <VLogo :size="28" />
          <span class="font-semibold text-highlighted">{{ t('site.title') }}</span>
        </NuxtLinkLocale>
      </Motion>
    </template>

    <Motion
      :initial="{ opacity: 0, y: -16 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.4, ease: 'easeOut', delay: 0.1 }"
    >
      <UNavigationMenu :items="pageNav" />
    </Motion>

    <template #right>
      <ClientOnly>
        <Motion
          :initial="{ opacity: 0, x: 24 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.4, ease: 'easeOut', delay: 0.2 }"
          class="flex items-center gap-2"
        >
          <VAvatar />
          <LocaleSel />
          <UContentSearchButton :title="t('nav.search')" />
          <ColorModeButton />
          <VSocialLinks
            :links="socialLinks"
            size="md"
          />
        </Motion>
      </ClientOnly>
    </template>

    <template #body>
      <UNavigationMenu
        :items="pageNav"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
