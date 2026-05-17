<script setup lang="ts">
import { Motion, useInView } from 'motion-v'
import { useMediaQuery } from '@vueuse/core'
import type { KindMeta, EpitaphItem } from '~/types/resource'

const kinds: KindMeta[] = [
  { kind: 'person', icon: 'i-lucide-waves', anchor: 'i-lucide-anchor' },
  { kind: 'concept', icon: 'i-lucide-brain', anchor: 'i-lucide-infinity' },
  { kind: 'idea', icon: 'i-lucide-lightbulb', anchor: 'i-lucide-sparkles' },
  { kind: 'place', icon: 'i-lucide-map-pin', anchor: 'i-lucide-compass' },
  { kind: 'era', icon: 'i-lucide-hourglass', anchor: 'i-lucide-clock' },
  { kind: 'creature', icon: 'i-lucide-fish', anchor: 'i-lucide-shell' },
  { kind: 'language', icon: 'i-lucide-scroll-text', anchor: 'i-lucide-feather' },
  { kind: 'belief', icon: 'i-lucide-sun', anchor: 'i-lucide-flame' },
  { kind: 'emotion', icon: 'i-lucide-heart', anchor: 'i-lucide-droplet' },
  { kind: 'memory', icon: 'i-lucide-image', anchor: 'i-lucide-wind' },
  { kind: 'dream', icon: 'i-lucide-moon', anchor: 'i-lucide-cloud' },
  { kind: 'empire', icon: 'i-lucide-landmark', anchor: 'i-lucide-columns' },
  { kind: 'art', icon: 'i-lucide-palette', anchor: 'i-lucide-brush' },
  { kind: 'science', icon: 'i-lucide-flask-conical', anchor: 'i-lucide-atom' },
  { kind: 'myth', icon: 'i-lucide-stars', anchor: 'i-lucide-eye' },
  { kind: 'relationship', icon: 'i-lucide-link', anchor: 'i-lucide-unlink' },
  { kind: 'technology', icon: 'i-lucide-cpu', anchor: 'i-lucide-circuit-board' },
  { kind: 'species', icon: 'i-lucide-dna', anchor: 'i-lucide-leaf' },
  { kind: 'sound', icon: 'i-lucide-music', anchor: 'i-lucide-waves' },
  { kind: 'word', icon: 'i-lucide-type', anchor: 'i-lucide-quote' }
]

const props = withDefaults(defineProps<EpitaphItem & {
  to?: string
  compact?: boolean
  inViewAmount?: number
}>(), {
  kind: 'person',
  compact: false,
  inViewAmount: 0.2
})

const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)')

const meta = computed(() => kinds.find(k => k.kind === props.kind)!)

const dateRange = computed(() => {
  if (props.birth && props.death) return `${props.birth} — ${props.death}`
  if (props.born && props.dissolved) return `${props.born} — ${props.dissolved}`
  if (props.born) return `${props.born} —`
  if (props.birth) return props.birth
  return null
})

const root = ref<HTMLElement | null>(null)
const inView = useInView(root, { once: true, amount: props.inViewAmount })
</script>

<template>
  <div
    ref="root"
    class="epitaph-card"
  >
    <Motion
      as="div"
      :initial="{ opacity: 0, y: prefersReduced ? 0 : 32 }"
      :animate="inView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 32 }"
      :exit="{ opacity: 0, y: prefersReduced ? 0 : 16 }"
      :while-hover="prefersReduced ? {} : { scale: 1.01 }"
      :while-press="prefersReduced ? {} : { scale: 0.99 }"
      :transition="{ duration: 1.1, ease: 'easeOut' }"
    >
      <UCard
        class="max-w-md mx-auto text-center relative overflow-hidden cursor-pointer"
        :to="to"
      >
        <div :class="['flex flex-col items-center gap-6', compact ? 'py-3' : 'py-6']">
          <UIcon
            :name="meta.icon"
            class="size-10 text-primary"
            :class="{ 'animate-sink': !prefersReduced }"
          />

          <Motion
            v-if="portrait"
            as="div"
            :initial="{ opacity: 0, scale: 0.9 }"
            :animate="inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }"
            :transition="{ delay: 0.2, duration: 0.8, ease: 'easeOut' }"
          >
            <UAvatar
              :src="portrait"
              :alt="name"
              size="2xl"
            />
          </Motion>

          <slot name="header">
            <Motion
              as="div"
              class="flex flex-col gap-1"
              :initial="{ opacity: 0, y: prefersReduced ? 0 : 12 }"
              :animate="inView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 12 }"
              :transition="{ delay: 0.3, duration: 0.7, ease: 'easeOut' }"
            >
              <span
                v-if="kind !== 'person'"
                class="text-xs text-muted uppercase tracking-widest"
              >{{ kind }}</span>
              <span
                v-if="name"
                class="text-2xl font-semibold text-highlighted tracking-wide"
              >{{ name }}</span>
              <span
                v-if="dateRange"
                class="text-sm text-muted"
              >{{ dateRange }}</span>
              <span
                v-if="age"
                class="text-xs text-muted"
              >{{ age }} {{ $t('epitaph.years') }}</span>
            </Motion>
          </slot>

          <template v-if="!compact">
            <USeparator
              v-if="inscription"
              color="neutral"
            />

            <Motion
              v-if="inscription"
              as="span"
              class="text-xs text-muted uppercase tracking-widest"
              :initial="{ opacity: 0, y: prefersReduced ? 0 : 12 }"
              :animate="inView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 12 }"
              :transition="{ delay: 0.45, duration: 0.7, ease: 'easeOut' }"
            >
              {{ inscription }}
            </Motion>
          </template>

          <USeparator color="neutral" />

          <Motion
            as="div"
            class="text-base text-toned italic leading-relaxed px-2 prose prose-sm dark:prose-invert"
            :initial="{ opacity: 0, y: prefersReduced ? 0 : 12 }"
            :animate="inView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 12 }"
            :transition="{ delay: 0.6, duration: 0.7, ease: 'easeOut' }"
          >
            <slot />
          </Motion>

          <template v-if="!compact && $slots.verse">
            <USeparator color="neutral" />
            <Motion
              as="div"
              class="text-sm text-muted italic leading-relaxed px-2 prose prose-sm dark:prose-invert"
              :initial="{ opacity: 0, y: prefersReduced ? 0 : 12 }"
              :animate="inView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 12 }"
              :transition="{ delay: 0.75, duration: 0.7, ease: 'easeOut' }"
            >
              <slot name="verse" />
            </Motion>
          </template>

          <USeparator color="neutral" />

          <Motion
            as="div"
            class="flex flex-col items-center gap-1"
            :initial="{ opacity: 0, y: prefersReduced ? 0 : 12 }"
            :animate="inView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 12 }"
            :transition="{ delay: compact ? 0.45 : 0.9, duration: 0.7, ease: 'easeOut' }"
          >
            <span
              v-if="location"
              class="text-xs text-muted tracking-widest uppercase"
            >{{ location }}</span>
            <span
              v-if="depth"
              class="text-xs text-muted/60 tracking-widest"
            >{{ depth }}</span>
          </Motion>

          <UIcon
            :name="meta.anchor"
            class="size-4 text-muted"
            :class="{ 'animate-sink-slow': !prefersReduced }"
          />
        </div>
      </UCard>
    </Motion>
  </div>
</template>

<style scoped>
@keyframes sink {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(5px); }
}

.animate-sink      { animation: sink 4s ease-in-out infinite; }
.animate-sink-slow { animation: sink 7s ease-in-out infinite; }

.epitaph-card :deep(.card) {
  transition: box-shadow 0.4s ease;
}

.epitaph-card:hover :deep(.card) {
  box-shadow: 0 8px 32px -8px color-mix(in srgb, var(--ui-primary) 20%, transparent);
}
</style>
