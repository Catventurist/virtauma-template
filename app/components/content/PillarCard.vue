<script setup lang="ts">
import { Motion } from 'motion-v'

const props = defineProps<{
  icon: string
  title: string
  body: string
  index?: number
}>()

const reduced = ref(false)
onMounted(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduced.value = mq.matches
  mq.addEventListener('change', (e: MediaQueryListEvent) => {
    reduced.value = e.matches
  })
})

const delay = computed(() => (props.index ?? 0) * 0.15)
</script>

<template>
  <Motion
    class="h-full"
    :initial="reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.7, delay: delay, ease: [0.16, 1, 0.3, 1] }"
    :while-hover="reduced ? undefined : { y: -4 }"
  >
    <div
      class="group relative h-full rounded-sm p-6 overflow-hidden cursor-default
      bg-vesi-400/10 backdrop-blur-lg backdrop-saturate-150
      border border-vesi-300/20
      shadow-lg hover:border-vesi-300/40 hover:bg-vesi-300/20 hover:shadow-xl shadow-secondary
      duration-300 ease-out"
    >
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div class="relative flex flex-col gap-4">
        <Motion
          class="inline-flex p-2.5 rounded-sm bg-vesi-400/10 border border-vesi-400/20 w-fit"
          :while-hover="reduced ? undefined : { scale: 1.1 }"
          :transition="{ type: 'spring', stiffness: 400, damping: 20 }"
        >
          <UIcon
            :name="icon"
            class="size-6 text-primary"
          />
        </Motion>
        <p class="text-base font-semibold text-highlighted">
          {{ title }}
        </p>
        <p class="text-sm text-muted leading-relaxed">
          {{ body }}
        </p>
      </div>
    </div>
  </Motion>
</template>
