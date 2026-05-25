<script setup lang="ts">
import { Motion } from 'motion-v'

definePageMeta({ layout: false })

const { t, locale } = useI18n()

const spirits = [
  { name: 'Vipunen', top: '10%', left: '8%', opacity: 0.9, size: 'text-lg' },
  { name: 'Vellamo', top: '35%', left: '18%', opacity: 0.8, size: 'text-2xl' },
  { name: 'Tiera', top: '70%', left: '30%', opacity: 0.7, size: 'text-base' },
  { name: 'Tuonetar', top: '15%', left: '42%', opacity: 0.6, size: 'text-xl' },
  { name: 'Revontulet', top: '60%', left: '54%', opacity: 0.85, size: 'text-3xl' },
  { name: 'Rahko', top: '45%', left: '66%', opacity: 0.5, size: 'text-sm' },
  { name: 'Kielet', top: '80%', left: '76%', opacity: 0.75, size: 'text-base' },
  { name: 'Ikiturso', top: '88%', left: '86%', opacity: 0.15, size: 'text-xs' }
]

const scrollRef = ref<HTMLElement>()
const currentPanel = ref(0)

const scrollTo = (index: number) => {
  if (!scrollRef.value) return
  scrollRef.value.scrollTo({ left: index * window.innerWidth, behavior: 'smooth' })
}

const mouseX = ref(0)
const mouseY = ref(0)

onMounted(() => {
  scrollRef.value?.addEventListener('scroll', () => {
    currentPanel.value = Math.round(scrollRef.value!.scrollLeft / window.innerWidth)
  })
  window.addEventListener('mousemove', (e) => {
    mouseX.value = (e.clientX / window.innerWidth - 0.5) * 20
    mouseY.value = (e.clientY / window.innerHeight - 0.5) * 20
  })
})

const enterPath = computed(() => `/${locale.value}`)
const kaivoPath = computed(() => `/${locale.value}/kaivo`)

const title = t('pages.welcome.title')
const description = t('pages.welcome.description')

useSeoMeta({
  title: title,
  description: description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description
})
</script>

<template>
  <Motion
    as="div"
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :transition="{ duration: 2, ease: 'easeOut' }"
    class="dark overflow-hidden h-screen"
  >
    <div
      ref="scrollRef"
      class="flex h-screen overflow-x-scroll"
      style="scroll-snap-type: x mandatory; scrollbar-width: none;"
    >
      <div
        class="relative shrink-0 flex flex-col items-center justify-center"
        style="scroll-snap-align: start; min-width: 100vw;"
      >
        <div class="absolute inset-0 bg-default" />
        <div class="absolute inset-0 bg-primary/5" />
        <Motion
          as="div"
          :animate="{ y: [0, -8, 0] }"
          :transition="{ duration: 4, repeat: Infinity, ease: 'easeInOut' }"
          class="relative z-10 text-center space-y-6"
        >
          <Motion
            as="h1"
            :initial="{ opacity: 0, y: 30 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 1.2, delay: 0.3 }"
            class="text-8xl font-semibold text-primary tracking-widest"
          >
            Virtauma
          </Motion>
          <Motion
            as="p"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 1.2, delay: 0.8 }"
            class="text-lg tracking-wide font-light italic text-highlighted"
          >
            {{ t('dashboard.welcome.tagline') }}
          </Motion>
          <Motion
            as="div"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :transition="{ duration: 1, delay: 1.4 }"
          >
            <UButton
              :label="t('dashboard.welcome.enter')"
              variant="ghost"
              color="primary"
              trailing-icon="i-lucide-chevron-right"
              @click="scrollTo(1)"
            />
          </Motion>
        </Motion>
        <Motion
          as="div"
          :animate="{ opacity: [0.3, 0.7, 0.3] }"
          :transition="{ duration: 3, repeat: Infinity }"
          class="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <UIcon
            name="i-lucide-chevrons-right"
            class="size-5 text-primary opacity-50"
          />
        </Motion>
      </div>

      <div
        class="relative shrink-0 flex flex-col items-center justify-center px-24"
        style="scroll-snap-align: start; min-width: 100vw;"
      >
        <div class="absolute inset-0 bg-muted" />
        <div class="relative z-10 max-w-2xl space-y-12 text-center">
          <Motion
            as="p"
            :initial="{ opacity: 0, x: -40 }"
            :while-in-view="{ opacity: 1, x: 0 }"
            :transition="{ duration: 1, delay: 0.1 }"
            class="text-4xl font-semibold text-highlighted leading-relaxed"
          >
            {{ t('dashboard.welcome.current.title') }}
          </Motion>
          <Motion
            as="p"
            :initial="{ opacity: 0, x: 40 }"
            :while-in-view="{ opacity: 1, x: 0 }"
            :transition="{ duration: 1, delay: 0.4 }"
            class="text-xl text-default leading-relaxed font-light italic"
          >
            {{ t('dashboard.welcome.current.body') }}
          </Motion>
          <Motion
            as="p"
            :initial="{ opacity: 0 }"
            :while-in-view="{ opacity: 1 }"
            :transition="{ duration: 1, delay: 0.9 }"
            class="text-sm text-primary tracking-widest uppercase"
          >
            {{ t('dashboard.welcome.current.closing') }}
          </Motion>
        </div>
      </div>

      <div
        class="relative shrink-0 flex flex-col items-center justify-center"
        style="scroll-snap-align: start; min-width: 100vw;"
      >
        <div class="absolute inset-0 bg-default" />
        <div class="relative z-10 flex flex-col items-center gap-16">
          <Motion
            as="div"
            :initial="{ opacity: 0, scale: 0.8 }"
            :while-in-view="{ opacity: 1, scale: 1 }"
            :transition="{ duration: 1.2 }"
            class="relative"
          >
            <div class="relative size-64">
              <Motion
                as="div"
                :animate="{ scale: [1, 1.8], opacity: [0.3, 0] }"
                :transition="{ duration: 3, repeat: Infinity, delay: 0, ease: 'easeOut' }"
                class="absolute inset-0 rounded-full border border-primary/40"
              />
              <Motion
                as="div"
                :animate="{ scale: [1, 1.8], opacity: [0.2, 0] }"
                :transition="{ duration: 3, repeat: Infinity, delay: 1, ease: 'easeOut' }"
                class="absolute inset-0 rounded-full border border-primary/30"
              />
              <Motion
                as="div"
                :animate="{ scale: [1, 1.8], opacity: [0.15, 0] }"
                :transition="{ duration: 3, repeat: Infinity, delay: 2, ease: 'easeOut' }"
                class="absolute inset-0 rounded-full border border-primary/20"
              />
              <Motion
                as="div"
                :animate="{ scale: [1, 1.04, 1], opacity: [0.6, 0.9, 0.6] }"
                :transition="{ duration: 5, repeat: Infinity, ease: 'easeInOut' }"
                class="absolute inset-0 rounded-full border border-primary/30 bg-elevated"
              />
              <Motion
                as="div"
                :animate="{ y: [0, -6, 0] }"
                :transition="{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }"
                class="absolute inset-0 flex items-center justify-center"
              >
                <p class="text-default text-center italic text-sm px-8 leading-relaxed">
                  {{ t('dashboard.welcome.well.body') }}
                </p>
              </Motion>
            </div>
            <Motion
              as="div"
              :animate="{ y: [0, -6, 0] }"
              :transition="{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }"
              class="absolute inset-0 flex items-center justify-center"
            >
              <p class="text-default text-center italic text-sm px-8 leading-relaxed">
                {{ t('dashboard.welcome.well.body') }}
              </p>
            </Motion>
          </Motion>
          <Motion
            as="p"
            :initial="{ opacity: 0 }"
            :while-in-view="{ opacity: 1 }"
            :transition="{ duration: 1, delay: 0.6 }"
            class="text-primary text-sm tracking-widest uppercase"
          >
            {{ t('dashboard.welcome.well.closing') }}
          </Motion>
        </div>
      </div>

      <div
        class="relative shrink-0 overflow-hidden"
        style="scroll-snap-align: start; min-width: 100vw; min-height: 100vh;"
      >
        <div class="absolute inset-0 bg-muted" />
        <Motion
          as="div"
          :animate="{ x: mouseX * 0.3, y: mouseY * 0.3 }"
          :transition="{ duration: 0.8, ease: 'easeOut' }"
          class="absolute inset-0 z-0"
        >
          <div class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div class="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        </Motion>

        <Motion
          as="div"
          :animate="{ x: mouseX * 0.6, y: mouseY * 0.6 }"
          :transition="{ duration: 0.6, ease: 'easeOut' }"
          class="absolute inset-0 z-0"
        >
          <div class="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-primary/8 blur-2xl" />
        </Motion>
        <div
          v-for="(spirit, i) in spirits"
          :key="spirit.name"
          class="absolute"
          :style="{ top: spirit.top, left: spirit.left, opacity: spirit.opacity }"
        >
          <Motion
            as="span"
            :initial="{ opacity: 0 }"
            :while-in-view="{ opacity: 1 }"
            :animate="{ y: [0, -(8 + i * 2), 0] }"
            :transition="{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }"
            :class="['font-light italic cursor-pointer hover:text-primary transition-colors text-toned', spirit.size]"
          >
            {{ spirit.name }}
          </Motion>
        </div>
        <Motion
          as="p"
          :initial="{ opacity: 0 }"
          :while-in-view="{ opacity: 1 }"
          :transition="{ duration: 1, delay: 1.2 }"
          class="absolute bottom-12 left-1/2 -translate-x-1/2 text-muted text-xs tracking-widest uppercase whitespace-nowrap"
        >
          {{ t('dashboard.welcome.spirits.closing') }}
        </Motion>
      </div>

      <div
        class="relative shrink-0 flex flex-col items-center justify-center"
        style="scroll-snap-align: start; min-width: 100vw;"
      >
        <div class="absolute inset-0 bg-default" />
        <div class="absolute inset-0 bg-primary/5" />
        <Motion
          as="div"
          :initial="{ opacity: 0, y: 40 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 1.2 }"
          class="relative z-10 text-center space-y-8"
        >
          <Motion
            as="h2"
            :animate="{ y: [0, -6, 0] }"
            :transition="{ duration: 4, repeat: Infinity, ease: 'easeInOut' }"
            class="text-5xl font-semibold text-highlighted"
          >
            {{ t('dashboard.welcome.shore.title') }}
          </Motion>
          <p class="text-lg font-light italic text-muted">
            {{ t('dashboard.welcome.shore.body') }}
          </p>
          <div class="flex items-center justify-center gap-4 pt-4">
            <UButton
              :label="t('dashboard.welcome.shore.enter')"
              color="primary"
              size="xl"
              :to="enterPath"
            />
            <UButton
              :label="t('dashboard.welcome.shore.cast')"
              color="primary"
              variant="ghost"
              size="xl"
              :to="kaivoPath"
            />
          </div>
        </Motion>
      </div>
    </div>

    <div class="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50">
      <Motion
        v-for="i in 5"
        :key="i"
        as="button"
        :animate="{ scale: currentPanel === i - 1 ? 1.4 : 1, opacity: currentPanel === i - 1 ? 1 : 0.4 }"
        :transition="{ duration: 0.3 }"
        class="w-1.5 h-1.5 rounded-full bg-primary"
        @click="scrollTo(i - 1)"
      />
    </div>
  </Motion>
</template>

<style scoped>
div::-webkit-scrollbar { display: none; }
</style>
