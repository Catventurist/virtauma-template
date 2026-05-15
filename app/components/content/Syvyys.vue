<script setup lang="ts">
import { Motion } from 'motion-v'

const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  primary?: string
  secondary?: string
}>(), {
  title: undefined,
  subtitle: undefined,
  primary: undefined,
  secondary: undefined
})

const { t } = useI18n()

const title = computed(() => props.title ?? t('home.cta.title'))
const subtitle = computed(() => props.subtitle ?? t('home.cta.subtitle'))
const primary = computed(() => props.primary ?? t('home.cta.primary'))
const secondary = computed(() => props.secondary ?? t('home.cta.secondary'))

const reduced = ref(false)
onMounted(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduced.value = mq.matches
  mq.addEventListener('change', (e: MediaQueryListEvent) => {
    reduced.value = e.matches
  })
})

const bubbles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: 5 + i * 8,
  size: [2, 3, 2, 4, 2, 3, 2, 4, 3, 2, 3, 2][i],
  duration: 4 + (i % 5),
  delay: i * 0.4
}))
</script>

<template>
  <section class="relative overflow-hidden">
    <div class="depth-bg" />

    <div class="caustic">
      <div class="caustic-1" />
      <div class="caustic-2" />
      <div class="caustic-3" />
    </div>

    <div
      v-if="!reduced"
      class="absolute inset-0 pointer-events-none"
    >
      <Motion
        v-for="b in bubbles"
        :key="b.id"
        class="absolute rounded-full border border-vesi-300/30 bg-vesi-300/5"
        :style="{ width: `${b.size}px`, height: `${b.size}px`, left: `${b.x}%`, bottom: '0' }"
        :animate="{ y: [0, -400], opacity: [0, 0.6, 0] }"
        :transition="{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: 'linear' }"
      />
    </div>

    <div class="relative z-10 flex flex-col items-center text-center px-6 py-32 gap-8">
      <Motion
        :initial="reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 1, ease: [0.16, 1, 0.3, 1] }"
        class="text-4xl sm:text-6xl font-bold leading-tight max-w-2xl title-glow"
      >
        {{ title }}
      </Motion>

      <Motion
        :initial="reduced ? { opacity: 1 } : { opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 1, delay: 0.3 }"
        class="text-base sm:text-lg text-muted max-w-lg leading-relaxed"
      >
        {{ subtitle }}
      </Motion>

      <Motion
        :initial="reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.7, delay: 0.5 }"
        class="flex flex-wrap items-center justify-center gap-4"
      >
        <AaltoButton :label="primary" />
        <JaaButton :label="secondary" />
      </Motion>
    </div>
  </section>
</template>

<style scoped>
.depth-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent,
    color-mix(in srgb, var(--color-vesi-950) 60%, var(--ui-bg)) 30%,
    color-mix(in srgb, var(--color-vesi-950) 85%, black) 100%
  );
}

.caustic {
  position: absolute;
  inset: 0;
  mix-blend-mode: screen;
  opacity: 0.35;
  pointer-events: none;
}

.caustic-1 {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 35% 25% at 25% 35%, var(--color-vesi-400), transparent);
  animation: drift-1 9s ease-in-out infinite;
}

.caustic-2 {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 25% 30% at 70% 60%, var(--color-cyan-400), transparent);
  animation: drift-2 11s ease-in-out infinite;
}

.caustic-3 {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 40% 20% at 50% 20%, var(--color-vesi-300), transparent);
  animation: drift-3 7s ease-in-out infinite;
}

@keyframes drift-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(40px, 20px) scale(1.15); }
  66%       { transform: translate(-20px, 40px) scale(0.9); }
}

@keyframes drift-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  40%       { transform: translate(-50px, -30px) scale(1.2); }
  70%       { transform: translate(30px, 20px) scale(0.85); }
}

@keyframes drift-3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%       { transform: translate(20px, 50px) scale(1.1); }
}

.title-glow {
  color: white;
  text-shadow:
    0 0 40px color-mix(in srgb, var(--color-vesi-400) 60%, transparent),
    0 0 80px color-mix(in srgb, var(--color-vesi-500) 30%, transparent);
}

@media (prefers-reduced-motion: reduce) {
  .caustic-1, .caustic-2, .caustic-3 { animation: none; }
}
</style>
