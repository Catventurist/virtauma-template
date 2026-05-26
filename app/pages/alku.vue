<script setup lang="ts">
import { useIntervalFn, useEventListener, useThrottleFn } from '@vueuse/core'
import { Motion, AnimatePresence } from 'motion-v'

const { t } = useI18n()
const localePath = useLocalePath()

type SectionId = 'pinta' | 'virta' | 'syvyys' | 'kaiku' | 'pohja'
const sectionIds: SectionId[] = ['pinta', 'virta', 'syvyys', 'kaiku', 'pohja']

const sections = computed(() => [
  {
    id: 'pinta' as SectionId,
    label: t('alku.depth.pinta'),
    bg: 'bg-linear-to-b from-(--ui-bg) to-(--ui-bg-muted)',
    icon: 'i-lucide-sun',
    link: null,
    gradient: 'bg-linear-to-r from-secondary-400/70 to-secondary-600/70 bg-clip-text text-transparent',
    textColor: 'text-secondary/70'
  },
  {
    id: 'virta' as SectionId,
    label: t('alku.depth.virta'),
    bg: 'bg-linear-to-b from-(--ui-bg-muted) to-(--ui-bg)',
    icon: 'i-lucide-waves-horizontal',
    link: '/luoto',
    gradient: 'bg-linear-to-r from-secondary/60 to-primary/60 bg-clip-text text-transparent',
    textColor: 'text-secondary/60'
  },
  {
    id: 'syvyys' as SectionId,
    label: t('alku.depth.syvyys'),
    bg: 'bg-linear-to-b from-(--ui-bg-elevated) to-(--ui-bg-muted)',
    icon: 'i-lucide-droplets',
    link: '/kaivo',
    gradient: 'bg-linear-to-r from-primary/60 to-secondary/60 bg-clip-text text-transparent',
    textColor: 'text-muted'
  },
  {
    id: 'kaiku' as SectionId,
    label: t('alku.depth.kaiku'),
    bg: 'bg-linear-to-b from-(--ui-bg-accented) to-(--ui-bg-elevated)',
    icon: 'i-lucide-fish',
    link: '/talkoo',
    gradient: 'bg-linear-to-r from-primary-100/70 to-primary-400/70 bg-clip-text text-transparent',
    textColor: 'text-primary/50'
  },
  {
    id: 'pohja' as SectionId,
    label: t('alku.depth.pohja'),
    bg: 'bg-linear-to-b from-(--ui-bg-inverted)/10 to-(--ui-bg-accented)',
    icon: 'i-lucide-anchor',
    link: '/login',
    gradient: 'bg-linear-to-r from-primary-200/70 to-primary-500/70 bg-clip-text text-transparent',
    textColor: 'text-primary/40'
  }
])

const active = ref<SectionId>('syvyys')
const hint = ref(true)
const navVisible = ref(false)
const subsVisible = ref(false)
const progress = ref(0)
const paused = ref(false)
const autoDirection = ref<'up' | 'down'>('down')
const lastScrollY = ref(0)
const mounted = ref(false)
let observer: IntersectionObserver | null = null
let idleTimeout: ReturnType<typeof setTimeout> | null = null

const currentIndex = computed(() => sectionIds.indexOf(active.value))
const prevSection = computed(() => sectionIds[currentIndex.value - 1])
const nextSection = computed(() => sectionIds[currentIndex.value + 1])

const { pause: pauseProgress, resume: resumeProgress } = useIntervalFn(() => {
  if (paused.value) return
  progress.value = Math.min(progress.value + 4, 100)
  if (progress.value >= 100) advance()
}, 200, { immediate: false })

useSeoMeta({
  title: t('nav.home'),
  description: t('site.description'),
  ogTitle: t('nav.home'),
  ogDescription: t('site.description'),
  twitterCard: 'summary_large_image',
  twitterTitle: t('nav.home'),
  twitterDescription: t('site.description')
})

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function advance() {
  pauseProgress()
  progress.value = 0
  subsVisible.value = false
  const next = autoDirection.value === 'down' ? nextSection.value : prevSection.value
  if (next) scrollTo(next)
}

function resetIdle() {
  subsVisible.value = false
  progress.value = 0
  pauseProgress()
  if (idleTimeout) clearTimeout(idleTimeout)
  idleTimeout = setTimeout(() => {
    subsVisible.value = true
    resumeProgress()
  }, 3000)
}

const onScroll = useThrottleFn(() => {
  const currentY = window.scrollY
  if (navVisible.value && currentY !== lastScrollY.value)
    autoDirection.value = currentY > lastScrollY.value ? 'down' : 'up'
  lastScrollY.value = currentY
  hint.value = false
  navVisible.value = true
  resetIdle()
}, 100)

useEventListener('scroll', onScroll, { passive: true })

useEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'ArrowDown' && nextSection.value) scrollTo(nextSection.value)
  if (e.key === 'ArrowUp' && prevSection.value) scrollTo(prevSection.value)
})

onMounted(async () => {
  await nextTick()
  const el = document.getElementById('syvyys')
  if (el) {
    window.scrollTo({ top: el.offsetTop })
    lastScrollY.value = el.offsetTop
  }
  await nextTick()

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const incoming = entry.target.id as SectionId
          if (incoming !== active.value) {
            active.value = incoming
            if (mounted.value) resetIdle()
          }
        }
      })
    },
    { threshold: 0.5 }
  )

  sections.value.forEach((s) => {
    const el = document.getElementById(s.id)
    if (el) observer?.observe(el)
  })

  mounted.value = true
})

onUnmounted(() => {
  observer?.disconnect()
  if (idleTimeout) clearTimeout(idleTimeout)
  pauseProgress()
})
</script>

<template>
  <div class="relative">
    <AnimatePresence>
      <Motion
        v-if="navVisible"
        :initial="{ opacity: 0, x: 16 }"
        :animate="{ opacity: 1, x: 0 }"
        :exit="{ opacity: 0, x: 16 }"
        :transition="{ duration: 0.5, ease: 'easeOut' }"
        class="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3"
        @mouseenter="paused = true"
        @mouseleave="paused = false"
      >
        <div class="flex flex-col items-center gap-1">
          <Motion
            :animate="autoDirection === 'up' && subsVisible ? { scale: 1.2, opacity: 1 } : { scale: 1, opacity: 0.5 }"
            :transition="{ duration: 0.8, repeat: autoDirection === 'up' && subsVisible ? Infinity : 0, repeatType: 'mirror' }"
          >
            <UButton
              icon="i-lucide-chevron-up"
              variant="ghost"
              color="neutral"
              size="sm"
              :disabled="!prevSection"
              @click="prevSection && scrollTo(prevSection)"
            />
          </Motion>
          <div class="w-px h-6 bg-muted/30 relative overflow-hidden">
            <div
              v-if="autoDirection === 'up' && subsVisible"
              class="absolute top-0 w-full bg-primary transition-none"
              :style="{ height: `${progress}%` }"
            />
          </div>
        </div>

        <div class="flex flex-col items-end gap-3">
          <button
            v-for="s in sections"
            :key="s.id"
            class="group flex items-center gap-3 cursor-pointer"
            @click="scrollTo(s.id)"
          >
            <span
              class="text-xs tracking-widest uppercase transition-opacity duration-300"
              :class="active === s.id ? 'opacity-100 text-highlighted' : 'opacity-0 group-hover:opacity-60 text-muted'"
            >
              {{ s.label }}
            </span>
            <UIcon
              :name="s.icon"
              class="transition-all duration-300"
              :class="active === s.id ? 'size-5 text-primary' : 'size-4 text-muted group-hover:text-toned'"
            />
          </button>
        </div>

        <div class="flex flex-col items-center gap-1">
          <div class="w-px h-6 bg-muted/30 relative overflow-hidden">
            <div
              v-if="autoDirection === 'down' && subsVisible"
              class="absolute top-0 w-full bg-primary transition-none"
              :style="{ height: `${progress}%` }"
            />
          </div>
          <Motion
            :animate="autoDirection === 'down' && subsVisible ? { scale: 1.2, opacity: 1 } : { scale: 1, opacity: 0.5 }"
            :transition="{ duration: 0.8, repeat: autoDirection === 'down' && subsVisible ? Infinity : 0, repeatType: 'mirror' }"
          >
            <UButton
              icon="i-lucide-chevron-down"
              variant="ghost"
              color="neutral"
              size="sm"
              :disabled="!nextSection"
              @click="nextSection && scrollTo(nextSection)"
            />
          </Motion>
        </div>
      </Motion>
    </AnimatePresence>

    <section
      v-for="s in sections"
      :id="s.id"
      :key="s.id"
      class="relative h-screen flex flex-col items-center justify-center snap-start px-8 overflow-hidden"
      :class="s.bg"
    >
      <Motion
        v-if="active === s.id"
        :animate="{ y: [-8, 8] }"
        :transition="{ duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }"
        class="absolute inset-0 flex items-center justify-center pointer-events-none select-none blur-md opacity-[0.02]"
      >
        <UIcon
          :name="s.icon"
          class="size-96 text-muted"
        />
      </Motion>

      <AnimatePresence>
        <Motion
          v-if="active === s.id"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0, y: -16 }"
          :transition="{ duration: 0.5 }"
          class="relative z-10 w-full max-w-xl text-center flex flex-col items-center justify-center gap-6 h-64"
        >
          <AnimatePresence>
            <Motion
              v-if="subsVisible && s.id !== 'pinta'"
              :initial="{ opacity: 0, y: -8 }"
              :animate="{ opacity: 1, y: 0 }"
              :exit="{ opacity: 0, y: -8 }"
              :transition="{ duration: 0.3 }"
              class="absolute -top-12 left-0 right-0 flex flex-col items-center gap-1"
            >
              <UButton
                icon="i-lucide-chevron-up"
                variant="ghost"
                color="neutral"
                size="xs"
                :disabled="!prevSection"
                @click="prevSection && scrollTo(prevSection)"
              />
              <span
                class="text-sm italic"
                :class="s.textColor"
              >
                {{ t(`alku.subs.${s.id}.up`) }}
              </span>
            </Motion>
          </AnimatePresence>

          <Motion
            :initial="{ opacity: 0, y: 24 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.7, ease: 'easeOut' }"
          >
            <p
              class="text-5xl font-bold leading-tight"
              :class="s.gradient"
            >
              {{ t(`alku.landing.${s.id}.phrase`) }}
            </p>
          </Motion>

          <Motion
            :initial="{ opacity: 0, y: 16 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.7, delay: 0.15, ease: 'easeOut' }"
          >
            <p
              class="text-base"
              :class="s.textColor"
            >
              {{ t(`alku.landing.${s.id}.sub`) }}
            </p>
          </Motion>

          <Motion
            v-if="s.link"
            :initial="{ opacity: 0, y: 8 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.7, delay: 0.3, ease: 'easeOut' }"
          >
            <ULink
              :to="localePath(s.link)"
              class="text-sm text-primary hover:underline"
            >
              {{ t(`alku.landing.${s.id}.link`) }}
            </ULink>
          </Motion>

          <AnimatePresence>
            <Motion
              v-if="s.id === 'syvyys' && hint"
              :initial="{ opacity: 0 }"
              :animate="{ opacity: 1 }"
              :exit="{ opacity: 0 }"
              :transition="{ duration: 0.6, delay: 0.6 }"
              class="flex flex-col items-center gap-2 text-muted mt-4"
            >
              <Motion
                :animate="{ y: [-3, 0] }"
                :transition="{ duration: 0.8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }"
              >
                <UIcon name="i-lucide-chevron-up" />
              </Motion>
              <span class="text-xs tracking-widest uppercase">{{ t('alku.landing.syvyys.explore') }}</span>
              <Motion
                :animate="{ y: [0, 3] }"
                :transition="{ duration: 0.8, delay: 0.2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }"
              >
                <UIcon name="i-lucide-chevron-down" />
              </Motion>
            </Motion>
          </AnimatePresence>

          <AnimatePresence>
            <Motion
              v-if="subsVisible && s.id !== 'pohja'"
              :initial="{ opacity: 0, y: 8 }"
              :animate="{ opacity: 1, y: 0 }"
              :exit="{ opacity: 0, y: 8 }"
              :transition="{ duration: 0.3 }"
              class="absolute -bottom-12 left-0 right-0 flex flex-col items-center gap-1"
            >
              <span
                class="text-sm italic"
                :class="s.textColor"
              >
                {{ t(`alku.subs.${s.id}.down`) }}
              </span>
              <UButton
                icon="i-lucide-chevron-down"
                variant="ghost"
                color="neutral"
                size="xs"
                :disabled="!nextSection"
                @click="nextSection && scrollTo(nextSection)"
              />
            </Motion>
          </AnimatePresence>

          <Motion
            v-if="s.id === 'pinta'"
            :initial="{ opacity: 0, y: 8 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.7, delay: 0.15, ease: 'easeOut' }"
            class="flex flex-col items-center gap-6 mt-2"
          >
            <p class="text-2xl font-bold text-primary tracking-widest uppercase">
              Virtauma
            </p>
            <div class="flex gap-4">
              <UButton
                :label="t('alku.landing.pinta.enter')"
                :to="localePath('/')"
                size="xl"
              />
              <UButton
                :label="t('alku.landing.pinta.guide')"
                :to="localePath('/luoto')"
                variant="ghost"
                size="lg"
              />
            </div>
          </Motion>
        </Motion>
      </AnimatePresence>
    </section>
  </div>
</template>

<style>
html {
  scroll-snap-type: y proximity;
  overflow-y: scroll;
}
</style>
