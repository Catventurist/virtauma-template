<script setup lang="ts">
import { Motion } from 'motion-v'

const { tila, meta } = useTila()
const { t } = useI18n()
</script>

<template>
  <Motion
    as="div"
    :animate="{ opacity: [0.6, 1, 0.6] }"
    :transition="{
      duration: tila.state === 'myrskyinen' ? 2 : tila.state === 'tyyni' ? 6 : 4,
      repeat: Infinity,
      ease: 'easeInOut'
    }"
  >
    <UTooltip :text="t(`tila.state.${tila.state}`)">
      <UButton
        :icon="meta.icon"
        :color="meta.color"
        variant="ghost"
        size="sm"
        square
      />
    </UTooltip>
  </Motion>
</template>
