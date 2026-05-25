<script setup lang="ts">
import { Motion } from 'motion-v'
import type { ColOr } from '~/types/resource'

type MetaItem = { type: string, value: string | number, avatar?: string }

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  author?: string
  avatar?: string
  tag?: string
  tagColor?: string
  publishedAt?: string
  time?: string
  likes?: number
  replies?: number
  tags?: string[]
}>(), {
  likes: 0,
  replies: 0,
  tags: () => []
})

const { locale } = useI18n()

const formattedDate = computed(() => {
  if (!props.publishedAt) return null
  return new Intl.DateTimeFormat(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(props.publishedAt))
})

const items = computed(() => {
  const raw: (MetaItem | null)[] = [
    props.author ? { type: 'author', value: props.author, avatar: props.avatar } : null,
    props.publishedAt ? { type: 'date', value: formattedDate.value ?? '' } : null,
    props.time ? { type: 'time', value: props.time } : null,
    props.likes !== undefined ? { type: 'likes', value: props.likes } : null,
    props.replies !== undefined ? { type: 'replies', value: props.replies } : null
  ]
  return raw.filter((item): item is MetaItem => item !== null)
})
</script>

<template>
  <header class="relative py-12 overflow-hidden">
    <div class="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />

    <Motion
      :initial="{ opacity: 0, y: -8, filter: 'blur(8px)' }"
      :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
      :transition="{ duration: 0.7, ease: 'easeOut' }"
      class="mb-3"
    >
      <UBadge
        v-if="tag"
        :color="(tagColor as ColOr) ?? 'primary'"
        variant="subtle"
      >
        {{ tag }}
      </UBadge>
    </Motion>

    <Motion
      :initial="{ opacity: 0, y: 16, filter: 'blur(6px)' }"
      :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
      :transition="{ duration: 0.8, delay: 0.1, ease: 'easeOut' }"
    >
      <h1 class="text-4xl font-bold tracking-tight text-highlighted mb-4">
        {{ title }}
      </h1>
    </Motion>

    <Motion
      v-if="description"
      :initial="{ opacity: 0, y: 12, filter: 'blur(4px)' }"
      :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
      :transition="{ duration: 0.8, delay: 0.2, ease: 'easeOut' }"
    >
      <p class="text-lg text-muted mb-6 max-w-2xl">
        {{ description }}
      </p>
    </Motion>

    <div class="flex flex-wrap items-center gap-4">
      <Motion
        v-for="(item, index) in items"
        :key="item.type"
        :initial="{ opacity: 0, y: 8, filter: 'blur(4px)' }"
        :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: 0.3 + index * 0.08, ease: 'easeOut' }"
        class="flex items-center gap-1.5 text-sm text-muted"
      >
        <template v-if="item.type === 'author'">
          <UAvatar
            :src="item.avatar"
            :alt="(item.value as string)"
            size="xs"
          />
          <span>{{ item.value }}</span>
        </template>
        <template v-else-if="item.type === 'date'">
          <UIcon
            name="i-lucide-calendar"
            class="size-4"
          />
          <span>{{ item.value }}</span>
        </template>
        <template v-else-if="item.type === 'time'">
          <UIcon
            name="i-lucide-clock"
            class="size-4"
          />
          <span>{{ item.value }}</span>
        </template>
        <template v-else-if="item.type === 'likes'">
          <UIcon
            name="i-lucide-heart"
            class="size-4"
          />
          <span>{{ item.value }}</span>
        </template>
        <template v-else-if="item.type === 'replies'">
          <UIcon
            name="i-lucide-message-circle"
            class="size-4"
          />
          <span>{{ item.value }}</span>
        </template>
      </Motion>
    </div>

    <Motion
      v-if="tags?.length"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ duration: 0.6, delay: 0.6, ease: 'easeOut' }"
      class="flex flex-wrap gap-2 mt-6"
    >
      <UBadge
        v-for="tagi in tags"
        :key="tagi"
        color="neutral"
        variant="outline"
      >
        {{ tagi }}
      </UBadge>
    </Motion>

    <Motion
      :initial="{ scaleX: 0, opacity: 0 }"
      :animate="{ scaleX: 1, opacity: 1 }"
      :transition="{ duration: 1, delay: 0.7, ease: 'easeOut' }"
      class="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent origin-left"
    />
  </header>
</template>
