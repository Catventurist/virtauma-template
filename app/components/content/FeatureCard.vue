<script setup lang="ts">
import { Motion, useMotionValue, animate } from 'motion-v'

defineProps<{
  icon: string
  title: string
  description: string
  delay?: number
  large?: boolean
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
    :initial="{ opacity: 0, y: 32 }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :while-hover="{ y: -4 }"
    :while-tap="{ scale: 0.98 }"
    :viewport="{ once: true, margin: '-60px' }"
    :transition="{
      opacity: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay },
      y: { type: 'spring', stiffness: 300, damping: 22 },
      scale: { type: 'spring', stiffness: 400, damping: 20 }
    }"
    class="relative rounded-xl overflow-hidden ring ring-default bg-elevated/50 cursor-pointer"
    :class="large ? 'col-span-2 row-span-2' : 'col-span-1'"
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
      class="relative z-10 flex flex-col gap-4 p-6"
      :class="large ? 'p-8' : ''"
    >
      <Motion
        as="div"
        class="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 ring ring-primary/20"
        :animate="{ scale: hovered ? 1.1 : 1, rotate: hovered ? -6 : 0 }"
        :transition="{ type: 'spring', stiffness: 300, damping: 18, delay: hovered ? 0.15 : 0 }"
      >
        <UIcon
          :name="icon"
          class="size-6 text-primary"
        />
      </Motion>

      <div class="flex flex-col gap-1.5">
        <Motion
          as="h3"
          class="font-semibold text-highlighted"
          :class="large ? 'text-xl' : 'text-base'"
          :animate="{ x: hovered ? 4 : 0 }"
          :transition="{ type: 'spring', stiffness: 300, damping: 22 }"
        >
          {{ title }}
        </Motion>
        <p class="text-sm text-muted leading-relaxed">
          {{ description }}
        </p>
      </div>
    </div>
  </Motion>
</template>
