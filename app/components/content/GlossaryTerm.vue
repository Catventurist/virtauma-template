<script setup lang="ts">
import { Motion, useMotionValue, animate } from 'motion-v'

defineProps<{
  word: string
  translation: string
  description: string
  delay?: number
  featured?: boolean
}>()

const hovered = ref(false)

const waveA = 'M -10,85 C 10,75 30,95 50,85 C 70,75 90,95 110,85 L 110,200 L -10,200 Z'
const waveB = 'M -10,85 C 10,95 30,75 50,85 C 70,95 90,75 110,85 L 110,200 L -10,200 Z'

const waveY = useMotionValue(0)
let levelControls: ReturnType<typeof animate> | undefined

watch(hovered, (val) => {
  levelControls?.stop()
  levelControls = animate(waveY, val ? -50 : 0, {
    duration: 0.9,
    ease: [0.16, 1, 0.3, 1]
  })
})

onUnmounted(() => levelControls?.stop())
</script>

<template>
  <Motion
    as="div"
    :initial="{ opacity: 0, y: 24 }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :while-hover="{ y: -4 }"
    :while-tap="{ scale: 0.98 }"
    :viewport="{ once: true, margin: '-40px' }"
    :transition="{
      opacity: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay },
      y: { type: 'spring', stiffness: 300, damping: 22 },
      scale: { type: 'spring', stiffness: 400, damping: 20 }
    }"
    class="relative rounded-xl overflow-hidden ring ring-default bg-elevated/50 cursor-default"
    :class="featured ? 'col-span-2 row-span-2' : 'col-span-1'"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div class="absolute inset-0 overflow-hidden">
      <ClientOnly>
        <svg
          class="absolute bottom-0 left-0 w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          overflow="hidden"
          style="height: 100%"
          focusable="false"
          aria-hidden="true"
        >
          <Motion
            as="g"
            :style="{ y: waveY }"
          >
            <Motion
              as="path"
              class="fill-primary/10"
              :animate="{ d: [waveA, waveB] }"
              :transition="{ duration: 3, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }"
            />
            <Motion
              as="path"
              class="fill-primary/20"
              :animate="{ d: [waveB, waveA] }"
              :transition="{ duration: 2.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 0.1 }"
            />
          </Motion>
        </svg>
      </ClientOnly>
    </div>

    <div
      class="relative z-10 flex flex-col gap-2 p-6"
      :class="featured ? 'p-8' : ''"
    >
      <Motion
        as="span"
        class="font-bold text-primary"
        :class="featured ? 'text-5xl' : 'text-3xl'"
        :animate="{ x: hovered ? 4 : 0 }"
        :transition="{ type: 'spring', stiffness: 300, damping: 22 }"
      >
        {{ word }}
      </Motion>
      <span class="text-xs font-medium uppercase tracking-widest text-muted">{{ translation }}</span>
      <p class="text-sm text-toned leading-relaxed mt-1">
        {{ description }}
      </p>
    </div>
  </Motion>
</template>
