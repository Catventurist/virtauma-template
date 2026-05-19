<script setup lang="ts">
import { Motion, AnimatePresence } from 'motion-v'

interface Message {
  id: string
  author: string
  text: string
  replies?: Message[]
}

const props = defineProps<{
  title: string
  thread?: Message[]
}>()

const stack = ref<Message[]>([])

const currentReplies = computed(() => {
  if (!stack.value.length) return props.thread ?? []
  return stack.value.at(-1)?.replies ?? []
})

const depth = computed(() => stack.value.length)

const bubbles = computed(() =>
  Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: `${10 + i * 11}%`,
    size: `${6 + (i % 3) * 4}px`,
    duration: 3 + (i % 4),
    delay: i * 0.4
  }))
)

function dive(message: Message) {
  stack.value = [...stack.value, message]
}

function back() {
  stack.value = stack.value.slice(0, -1)
}

function surface() {
  stack.value = []
}
</script>

<template>
  <div
    class="relative flex flex-col items-center gap-8 py-12 overflow-hidden rounded-2xl transition-all duration-700"
    :style="{
      minHeight: `${Math.max(384, 384 + depth * 80)}px`,
      background: `linear-gradient(to bottom,
      oklch(0.7 0.12 220 / 0.3) 0%,
      oklch(${Math.max(0.2, 0.5 - depth * 0.06)} ${0.15 + depth * 0.02} ${210 - depth * 5} / 0.9) 100%)`
    }"
  >
    <div class="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
      <svg
        class="absolute top-0 left-0 w-full"
        viewBox="0 0 400 40"
        preserveAspectRatio="none"
      >
        <Motion
          as="path"
          :animate="{
            d: [
              'M0,20 C100,5 200,35 300,20 C350,12 380,28 400,20 L400,0 L0,0 Z',
              'M0,20 C80,35 180,8 300,25 C350,30 380,10 400,20 L400,0 L0,0 Z',
              'M0,20 C100,5 200,35 300,20 C350,12 380,28 400,20 L400,0 L0,0 Z'
            ]
          }"
          :transition="{ duration: 4, repeat: Infinity, ease: 'easeInOut' }"
          fill="oklch(0.75 0.1 220 / 0.4)"
        />
      </svg>

      <Motion
        v-for="bubble in bubbles"
        :key="`${bubble.id}-${depth}`"
        :initial="{ y: '100%', opacity: 0, scale: 0 }"
        :animate="{ y: '-120%', opacity: [0, 0.6, 0.6, 0], scale: [0, 1, 1, 0.5] }"
        :transition="{
          duration: bubble.duration,
          delay: bubble.delay,
          repeat: Infinity,
          ease: 'easeInOut'
        }"
        class="absolute rounded-full border border-white/30 bg-white/10"
        :style="{
          left: bubble.left,
          bottom: '0',
          width: bubble.size,
          height: bubble.size
        }"
      />

      <div
        class="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
        :style="{
          background: 'repeating-linear-gradient(45deg, transparent, transparent 40px, oklch(0.9 0.05 220 / 0.03) 40px, oklch(0.9 0.05 220 / 0.03) 80px)',
          opacity: Math.min(depth * 0.3, 0.8)
        }"
      />
    </div>

    <Motion
      :initial="{ opacity: 0, y: -10 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6 }"
      class="relative z-10 text-center"
    >
      <div class="flex items-center gap-2 justify-center mb-1">
        <UIcon
          name="i-lucide-waves-horizontal"
          class="size-4 text-white/60"
        />
        <p class="text-xs font-medium text-white/60 uppercase tracking-widest">
          {{ title }}
        </p>
        <UIcon
          name="i-lucide-waves-horizontal"
          class="size-4 text-white/60"
        />
      </div>
      <p class="text-xs text-white/40">
        {{ depth === 0 ? $t('sukellus.surface') : $t('sukellus.depth', { depth: depth * 3 }) }}
      </p>
    </Motion>

    <AnimatePresence>
      <Motion
        v-if="depth > 0"
        key="current"
        :initial="{ opacity: 0, y: -30, filter: 'blur(4px)' }"
        :animate="{ opacity: 0.7, y: 0, filter: 'blur(0px)' }"
        :exit="{ opacity: 0, y: -30, filter: 'blur(4px)' }"
        :transition="{ duration: 0.5 }"
        class="relative z-10 text-center px-8 max-w-md"
      >
        <p class="text-xs text-white/50 mb-1">
          {{ stack.at(-1)?.author }}
        </p>
        <p
          class="text-white/70 italic transition-all duration-500"
          :style="{ fontSize: `${Math.max(0.75, 0.95 - depth * 0.04)}rem` }"
        >
          "{{ stack.at(-1)?.text }}"
        </p>
      </Motion>
    </AnimatePresence>

    <AnimatePresence mode="wait">
      <Motion
        :key="depth"
        :initial="{ opacity: 0, y: 40 }"
        :animate="{ opacity: 1, y: 0 }"
        :exit="{ opacity: 0, y: -40 }"
        :transition="{ duration: 0.4 }"
        class="relative z-10 w-full flex flex-col gap-3 px-6"
      >
        <Motion
          v-for="(message, i) in currentReplies"
          :key="message.id"
          :initial="{ opacity: 0, x: i % 2 === 0 ? -100 : 100, filter: 'blur(6px)' }"
          :animate="{ opacity: 1, x: 0, filter: 'blur(0px)' }"
          :transition="{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }"
          class="flex"
          :class="i % 2 === 0 ? 'justify-start' : 'justify-end'"
        >
          <button
            class="max-w-xs text-left group cursor-pointer"
            @click="dive(message)"
          >
            <div class="rounded-2xl px-4 py-3 border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/10 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-black/20">
              <p class="text-xs font-medium text-white/50 mb-1">
                {{ message.author }}
              </p>
              <p class="text-sm text-white/80">
                {{ message.text }}
              </p>
              <div
                v-if="message.replies?.length"
                class="mt-2 flex items-center gap-1 text-xs text-white/30 group-hover:text-white/60 transition-colors"
              >
                <UIcon
                  name="i-lucide-droplets"
                  class="size-3"
                />
                {{ message.replies.length }} {{ $t('sukellus.below') }}
              </div>
            </div>
          </button>
        </Motion>

        <Motion
          v-if="currentReplies.length"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :transition="{ duration: 0.6, delay: 0.3 }"
          class="text-center py-6"
        >
          <UIcon
            name="i-lucide-waves-vertical"
            class="size-5 text-white/20 mx-auto mb-2"
          />
          <p class="text-sm text-white/30 italic">
            {{ $t('sukellus.silence') }}
          </p>
        </Motion>
      </Motion>
    </AnimatePresence>

    <AnimatePresence>
      <Motion
        v-if="depth > 0"
        key="nav"
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :exit="{ opacity: 0, y: 20 }"
        :transition="{ duration: 0.3 }"
        class="relative z-10 flex items-center gap-3"
      >
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-arrow-up"
          size="sm"
          class="text-white/60 hover:text-white"
          @click="back"
        />
        <span class="text-xs text-white/30">{{ depth * 3 }}m</span>
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-waves-arrow-up"
          size="sm"
          class="text-white/60 hover:text-white"
          @click="surface"
        />
      </Motion>
    </AnimatePresence>
  </div>
</template>
