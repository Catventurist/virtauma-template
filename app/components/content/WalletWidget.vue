<script setup lang="ts">
withDefaults(defineProps<{
  compact?: boolean
}>(), {
  compact: false
})
</script>

<template>
  <VWallet :compact="compact" />
</template>
