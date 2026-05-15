<script setup lang="ts">
import { Motion } from 'motion-v'

interface FeedItem {
  id: string
  type: 'joined' | 'published' | 'voted' | 'updated' | 'commented'
  actor: { name: string, avatar?: string }
  target?: string
  timestamp: Date | string
  isNew?: boolean
}

const props = withDefaults(defineProps<{
  items: FeedItem[]
  maxHeight?: number
}>(), {
  maxHeight: 480
})

const { t, locale } = useI18n()

const reduced = ref(false)
onMounted(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduced.value = mq.matches
  mq.addEventListener('change', (e: MediaQueryListEvent) => {
    reduced.value = e.matches
  })
})

const icons: Record<FeedItem['type'], string> = {
  joined: 'i-lucide-user-plus',
  published: 'i-lucide-book-open',
  voted: 'i-lucide-check-circle',
  updated: 'i-lucide-pencil',
  commented: 'i-lucide-message-circle'
}

const colors: Record<FeedItem['type'], string> = {
  joined: 'text-success',
  published: 'text-primary',
  voted: 'text-info',
  updated: 'text-warning',
  commented: 'text-secondary'
}

function relativeTime(date: Date | string): string {
  const d = new Date(date)
  const diff = (Date.now() - d.getTime()) / 1000
  if (diff < 60) return t('feed.time.now')
  if (diff < 3600) return t('feed.time.minutes', { n: Math.floor(diff / 60) })
  if (diff < 86400) return t('feed.time.hours', { n: Math.floor(diff / 3600) })
  return d.toLocaleDateString(locale.value === 'fi' ? 'fi-FI' : 'en-GB', { day: 'numeric', month: 'short' })
}
</script>

<template>
  <div
    class="relative overflow-y-auto overflow-x-hidden"
    :style="{ maxHeight: `${props.maxHeight}px` }"
  >
    <div class="stream-line" />

    <div class="flex flex-col">
      <Motion
        v-for="(item, i) in items"
        :key="item.id"
        class="relative flex items-start gap-3 pl-8 py-3 pr-4"
        :initial="reduced ? { opacity: 1 } : item.isNew
          ? { opacity: 0, y: -16, filter: 'blur(4px)' }
          : { opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: item.isNew ? 0.5 : 0.4, delay: item.isNew ? 0 : i * 0.06, ease: [0.16, 1, 0.3, 1] }"
        :while-hover="{ translateX: -4 }"
        :while-press="{ translateX: 4 }"
      >
        <div class="relative shrink-0">
          <Motion
            v-if="item.isNew && !reduced"
            class="absolute inset-0 rounded-full border border-primary/40"
            :animate="{ scale: [1, 1.8], opacity: [0.6, 0] }"
            :transition="{ duration: 1, repeat: 2 }"
          />
          <UAvatar
            :src="item.actor.avatar"
            :alt="item.actor.name"
            size="xs"
            class="relative z-10"
          />
        </div>

        <div class="flex-1 min-w-0">
          <p class="text-sm text-default leading-snug">
            <span class="font-medium text-highlighted">{{ item.actor.name }}</span>
            {{ ' ' }}
            <span class="text-muted">{{ t(`feed.action.${item.type}`) }}</span>
            {{ ' ' }}
            <span
              v-if="item.target"
              class="font-medium text-highlighted"
            >{{ item.target }}</span>
          </p>
          <p class="text-xs text-dimmed mt-0.5 flex items-center gap-1">
            <UIcon
              :name="icons[item.type]"
              class="size-3"
              :class="colors[item.type]"
            />
            {{ relativeTime(item.timestamp) }}
          </p>
        </div>

        <div
          v-if="item.isNew"
          class="shrink-0 size-1.5 rounded-full bg-primary mt-1.5"
        />
      </Motion>
    </div>
  </div>
</template>

<style scoped>
.stream-line {
  position: absolute;
  left: 1.45rem;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent,
    var(--color-vesi-500) 10%,
    var(--color-cyan-400) 50%,
    var(--color-vesi-500) 90%,
    transparent
  );
  background-size: 100% 200%;
  animation: flow 4s linear infinite;
}

@keyframes flow {
  0%   { background-position: 0% 0%; }
  100% { background-position: 0% 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .stream-line { animation: none; }
}
</style>
