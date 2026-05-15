<script setup lang="ts">
import { Motion, AnimatePresence } from 'motion-v'

interface Ripple {
  id: number
  x: number
  y: number
}

const ripples = ref<Ripple[]>([])
let counter = 0

function onPointerDown(e: PointerEvent) {
  const ripple: Ripple = {
    id: counter++,
    x: e.clientX,
    y: e.clientY
  }
  ripples.value.push(ripple)
  setTimeout(() => {
    ripples.value = ripples.value.filter(r => r.id !== ripple.id)
  }, 1000)
}

onMounted(() => window.addEventListener('pointerdown', onPointerDown))
onUnmounted(() => window.removeEventListener('pointerdown', onPointerDown))
</script>

<template>
  <Teleport to="body">
    <div class="pointer-events-none fixed inset-0 z-9999 overflow-hidden">
      <AnimatePresence>
        <Motion
          v-for="ripple in ripples"
          :key="ripple.id"
          as="div"
          class="absolute -translate-x-1/2 -translate-y-1/2"
          :style="{ left: `${ripple.x}px`, top: `${ripple.y}px` }"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :transition="{ duration: 0.2 }"
        >
          <Motion
            v-for="i in 3"
            :key="i"
            as="div"
            class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40"
            :initial="{ width: '0px', height: '0px', opacity: 0.8 }"
            :animate="{ width: `${i * 60}px`, height: `${i * 60}px`, opacity: 0 }"
            :transition="{ duration: 0.8, ease: 'easeOut', delay: (i - 1) * 0.08 }"
          />
        </Motion>
      </AnimatePresence>
    </div>
  </Teleport>
</template>
