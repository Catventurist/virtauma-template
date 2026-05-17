<script setup lang="ts">
import { Motion } from 'motion-v'

const { t } = useI18n()
const { footerLinks } = useFooterLinks()
</script>

<template>
  <Motion
    :initial="{ opacity: 0, y: 14 }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.5, ease: 'easeOut' }"
    :viewport="{ once: true }"
  >
    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          © {{ new Date().getFullYear() }} {{ t('site.title') }}
        </p>
      </template>

      <UNavigationMenu :items="footerLinks" />

      <template #right>
        <ColorModeButton />
      </template>
    </UFooter>
  </Motion>
</template>
