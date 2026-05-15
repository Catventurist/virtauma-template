<script setup lang="ts">
import { Motion } from 'motion-v'

const props = withDefaults(defineProps<{
  eyebrow?: string
  title?: string
  subtitle?: string
  quote?: string
  quoteAuthor?: string
  pillars?: { title: string, body: string, icon: string }[]
}>(), {
  eyebrow: undefined,
  title: undefined,
  subtitle: undefined,
  quote: undefined,
  quoteAuthor: undefined,
  pillars: undefined
})

const { t } = useI18n()

const eyebrow = computed(() => props.eyebrow ?? t('home.hero.eyebrow'))
const title = computed(() => props.title ?? t('home.hero.title'))
const subtitle = computed(() => props.subtitle ?? t('home.hero.subtitle'))
const quote = computed(() => props.quote ?? t('home.quote.text'))
const quoteAuthor = computed(() => props.quoteAuthor ?? t('home.quote.author'))

const pillars = computed(() => props.pillars ?? [
  { title: t('home.pillars.folk.title'), body: t('home.pillars.folk.body'), icon: 'i-lucide-scroll-text' },
  { title: t('home.pillars.philosophy.title'), body: t('home.pillars.philosophy.body'), icon: 'i-lucide-tree-pine' },
  { title: t('home.pillars.community.title'), body: t('home.pillars.community.body'), icon: 'i-lucide-users' }
])

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
  <div class="relative min-h-screen overflow-hidden bg-default">
    <div class="water-bg" />

    <div class="relative z-10 flex flex-col items-center px-6">
      <Motion
        class="mt-32 mb-3 text-xs uppercase tracking-widest text-muted"
        :initial="reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.7, delay: 0.1 }"
      >
        {{ eyebrow }}
      </Motion>

      <Motion
        class="text-center text-5xl sm:text-7xl font-bold text-highlighted leading-tight max-w-3xl"
        :initial="reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 1, ease: [0.16, 1, 0.3, 1] }"
      >
        {{ title }}
      </Motion>

      <Motion
        class="mt-6 max-w-lg text-center text-lg text-muted leading-relaxed"
        :initial="reduced ? { opacity: 1 } : { opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 1, delay: 0.4 }"
      >
        {{ subtitle }}
      </Motion>

      <Motion
        class="flex mt-10 gap-4"
        :initial="reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.7, delay: 0.6 }"
      >
        <AaltoButton
          :label="t('home.swim')"
          to="/vesi"
        />
        <JaaButton
          :label="t('home.dive')"
          to="/glossary"
        />
      </Motion>

      <div class="mt-24 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6">
        <PillarCard
          v-for="(pillar, i) in pillars"
          :key="pillar.title"
          :icon="pillar.icon"
          :title="pillar.title"
          :body="pillar.body"
          :index="i"
        />
      </div>

      <Motion
        class="mt-24 mb-32 max-w-2xl text-center"
        :initial="reduced ? { opacity: 1 } : { opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 1.2, delay: 1.4 }"
      >
        <p class="text-2xl sm:text-3xl italic text-toned leading-relaxed">
          "{{ quote }}"
        </p>
        <p class="mt-4 text-sm text-dimmed">
          — {{ quoteAuthor }}
        </p>
      </Motion>
    </div>
  </div>
</template>

<style scoped>
.water-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 20% 80%, color-mix(in srgb, var(--color-vesi-500) 12%, transparent) 0%, transparent 70%),
    radial-gradient(ellipse 60% 50% at 80% 20%, color-mix(in srgb, var(--color-vesi-700) 10%, transparent) 0%, transparent 70%),
    radial-gradient(ellipse 100% 80% at 50% 100%, color-mix(in srgb, var(--color-vesi-400) 8%, transparent) 0%, transparent 60%);
  animation: water-drift 12s ease-in-out infinite alternate;
}

@keyframes water-drift {
  0%   { transform: scale(1) translateY(0); }
  50%  { transform: scale(1.04) translateY(-12px); }
  100% { transform: scale(1) translateY(4px); }
}

@media (prefers-reduced-motion: reduce) {
  .water-bg { animation: none; }
}
</style>
