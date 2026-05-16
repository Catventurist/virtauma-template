<script setup lang="ts">
import { motion } from 'motion-v'

const { t } = useI18n()
const { socialLinks } = useSocialLinks()
const bubbles = ref<{ id: number, size: number, left: number, delay: number, duration: number }[]>([])

onMounted(() => {
  bubbles.value = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 6,
    left: Math.random() * 90 + 5,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 5
  }))
})
</script>

<template>
  <div class="relative overflow-hidden bg-linear-to-b from-default to-primary/80 dark:to-primary/30 min-h-20">
    <motion.div
      class="absolute inset-0 opacity-10 pointer-events-none"
      :animate="{ backgroundPosition: ['0% 0%', '100% 100%'] }"
      :transition="{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }"
      style="background-image: radial-gradient(ellipse at 20% 30%, var(--ui-color-primary-300) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, var(--ui-color-primary-400) 0%, transparent 60%); background-size: 200% 200%;"
    />

    <div
      v-for="b in bubbles"
      :key="b.id"
      class="bubble absolute rounded-full border-2 border-white/30 bg-white/10 pointer-events-none z-10"
      :style="{
        width: `${b.size}px`,
        height: `${b.size}px`,
        left: `${b.left}%`,
        bottom: '-20px',
        animationDuration: `${b.duration}s`,
        animationDelay: `${b.delay}s`
      }"
    />

    <UFooter :ui="{ root: 'bg-transparent relative z-20' }">
      <template #left>
        <p class="text-muted text-sm">
          {{ new Date().getFullYear() }} {{ t('site.title') }}
        </p>
      </template>
      <template #right>
        <VSocialLinks :links="socialLinks" />
      </template>
    </UFooter>

    <div class="absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-primary/80 dark:from-primary/30 to-transparent pointer-events-none z-10" />
  </div>
</template>

<style scoped>
@keyframes rise {
  0%   { transform: translateY(0);    opacity: 0; }
  10%  { opacity: 0.8; }
  90%  { opacity: 0.4; }
  100% { transform: translateY(-160px); opacity: 0; }
}

.bubble {
  animation: rise linear infinite;
}
</style>
