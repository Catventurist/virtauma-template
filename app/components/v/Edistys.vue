<script setup lang="ts">
const progress = ref(0)

function update() {
  const el = document.documentElement
  progress.value = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
}

onMounted(() => window.addEventListener('scroll', update, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', update))
</script>

<template>
  <div class="fixed top-0 inset-x-0 z-50 h-[2px]">
    <div
      class="h-full bg-linear-to-r from-vesi-700 via-vesi-400 to-cyan-400 transition-[width] duration-75 ease-out"
      :style="{ width: `${progress}%` }"
    />
    <div
      class="absolute right-0 top-0 h-[2px] w-8 bg-linear-to-r from-transparent to-cyan-400 blur-sm"
      :style="{ right: `${100 - progress}%` }"
    />
  </div>
</template>
