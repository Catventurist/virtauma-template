<script setup lang="ts">
import { Motion } from 'motion-v'

withDefaults(defineProps<{
  name: string
  role?: string
  bio?: string
  avatar?: string
  github?: string
  index?: number
}>(), {
  role: undefined,
  bio: undefined,
  avatar: undefined,
  github: undefined,
  index: 0
})

const reduced = ref(false)
onMounted(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduced.value = mq.matches
  mq.addEventListener('change', (e: MediaQueryListEvent) => {
    reduced.value = e.matches
  })
})
</script>

<template>
  <Motion
    class="h-full"
    :initial="reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.7, delay: (index ?? 0) * 0.1, ease: [0.16, 1, 0.3, 1] }"
    :while-hover="reduced ? undefined : { y: -4 }"
  >
    <div
      class="group relative h-full rounded-sm p-6 overflow-hidden
      bg-vesi-400/10 backdrop-blur-lg backdrop-saturate-150
      border border-vesi-300/20 shadow-lg shadow-primary
      hover:border-vesi-300/40 hover:bg-vesi-300/10 hover:shadow-xl
      transition-colors duration-300"
    >
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(255,255,255,0.07),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div class="relative flex flex-col items-center text-center gap-4">
        <div class="relative">
          <div
            v-if="!reduced"
            class="avatar-ring ring-1"
          />
          <div
            v-if="!reduced"
            class="avatar-ring ring-2"
          />
          <div
            v-if="!reduced"
            class="avatar-ring ring-3"
          />
          <UAvatar
            :src="avatar"
            :alt="name"
            size="xl"
            class="relative z-10 ring-2 ring-vesi-400/30"
          />
        </div>

        <div class="flex flex-col gap-1">
          <p class="font-semibold text-highlighted">
            {{ name }}
          </p>
          <p
            v-if="role"
            class="text-xs uppercase tracking-widest text-muted"
          >
            {{ role }}
          </p>
        </div>

        <p
          v-if="bio"
          class="text-sm text-muted leading-relaxed"
        >
          {{ bio }}
        </p>

        <a
          v-if="github"
          :href="`https://github.com/${github}`"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors duration-200"
        >
          <UIcon
            name="i-lucide-github"
            class="size-3.5"
          />
          {{ github }}
        </a>
      </div>
    </div>
  </Motion>
</template>

<style scoped>
.avatar-ring {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  border: 1px solid color-mix(in srgb, var(--color-vesi-400) 40%, transparent);
  animation: ripple 3s ease-out infinite;
}

.ring-2 { animation-delay: 1s; }
.ring-3 { animation-delay: 2s; }

@keyframes ripple {
  0%   { transform: scale(1);   opacity: 0.6; }
  100% { transform: scale(2.2); opacity: 0; }
}
</style>
