<script setup lang="ts">
import { Motion } from 'motion-v'

const { locales, locale } = useI18n()
const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})
</script>

<template>
  <Motion
    v-for="local in availableLocales"
    :key="local.code"
    as-child
    :while-hover="{ scale: 1.1 }"
    :while-press="{ scale: 0.9 }"
    class="flex mb-1 items-center justify-center"
  >
    <SwitchLocalePathLink
      :locale="local.code"
      :title="local.name"
      as-child
    >
      {{ local.flag }}
    </SwitchLocalePathLink>
  </Motion>
</template>
