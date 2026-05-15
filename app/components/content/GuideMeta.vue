<script setup lang="ts">
import { Motion } from 'motion-v'

const props = withDefaults(defineProps<{
  readingTime?: number
  difficulty?: 'matala' | 'keski' | 'syvä'
  updatedAt?: string
  author?: string
}>(), {
  readingTime: undefined,
  difficulty: undefined,
  updatedAt: undefined,
  author: undefined
})

const { t, locale } = useI18n()

const formattedDate = computed(() => {
  if (!props.updatedAt) return undefined
  return new Date(props.updatedAt).toLocaleDateString(
    locale.value === 'fi' ? 'fi-FI' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )
})

const difficultyColor: Record<string, string> = {
  matala: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  keski: 'text-primary bg-primary/10 border-primary/20',
  syvä: 'text-violet-400 bg-violet-400/10 border-violet-400/20'
}
</script>

<template>
  <Motion
    :initial="{ opacity: 0, y: -8 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }"
    as="div"
  >
    <div class="flex flex-row w-full items-center justify-around gap-3 py-4 mb-8">
      <span
        v-if="difficulty"
        class="inline-flex items-center gap-1.5 text-sm font-medium px-2.5 py-1 rounded-sm"
        :class="difficultyColor[difficulty]"
      >
        <UIcon
          name="i-lucide-gauge"
          class="size-3"
        />
        {{ t(`guide.difficulty.${difficulty}`) }}
      </span>

      <span
        v-if="readingTime"
        class="inline-flex items-center gap-1.5 text-sm text-muted"
      >
        <UIcon
          name="i-lucide-clock"
          class="size-3.5"
        />
        {{ t('guide.readingTime', { n: readingTime }) }}
      </span>

      <span
        v-if="updatedAt"
        class="inline-flex items-center gap-1.5 text-sm text-muted"
      >
        <UIcon
          name="i-lucide-calendar"
          class="size-3.5"
        />
        {{ t('guide.updatedAt', { date: formattedDate }) }}
      </span>

      <span
        v-if="author"
        class="inline-flex items-center gap-1.5 text-sm text-muted"
      >
        <UIcon
          name="i-lucide-feather"
          class="size-3.5"
        />
        {{ author }}
      </span>
    </div>
  </Motion>
</template>
