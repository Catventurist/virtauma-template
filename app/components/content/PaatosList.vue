<script setup lang="ts">
import { Motion } from 'motion-v'
import { decisionMeta } from '~/composables/usePaatos'

const { open, closed, timeRemaining, isQuorate } = usePaatos()
const { t } = useI18n()

const all = computed(() => [...open.value, ...closed.value]
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
)
</script>

<template>
  <Motion
    as="div"
    :initial="{ opacity: 0, y: 16 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.8, ease: 'easeOut' }"
    class="flex flex-col divide-y divide-default"
  >
    <Motion
      v-for="(decision, i) in all"
      :key="decision.id"
      as="article"
      :initial="{ opacity: 0, y: 8 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ delay: i * 0.04, duration: 0.5, ease: 'easeOut' }"
      class="group grid grid-cols-[2.5rem_1fr_auto] gap-4 py-5 hover:bg-elevated transition-colors cursor-pointer px-2"
    >
      <div class="flex flex-col items-center gap-2 pt-0.5">
        <UIcon
          :name="decisionMeta[decision.type].icon"
          class="size-5"
          :class="`text-${decisionMeta[decision.type].color}`"
        />
        <div
          v-if="decision.status === 'open'"
          class="w-px flex-1 bg-default group-hover:bg-primary/30 transition-colors"
        />
      </div>

      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-sm font-medium text-highlighted">{{ decision.title }}</span>
          <UBadge
            :label="t(`paatos.type.${decision.type}`)"
            :color="decisionMeta[decision.type].color"
            variant="soft"
            size="xs"
          />
          <UBadge
            v-if="decision.status !== 'open'"
            :label="t(`paatos.status.${decision.status}`)"
            color="neutral"
            variant="subtle"
            size="xs"
          />
        </div>

        <p
          v-if="decision.description"
          class="text-sm text-toned leading-relaxed"
        >
          {{ decision.description }}
        </p>

        <div class="flex items-center gap-3 mt-1">
          <span class="text-xs text-muted">
            {{ decision.responses.length }} {{ t('paatos.responses') }}
          </span>
          <span
            v-if="!isQuorate(decision)"
            class="text-xs text-muted"
          >
            · {{ t('paatos.not_quorate') }}
          </span>
        </div>
      </div>

      <div class="flex flex-col items-end gap-2 shrink-0">
        <span
          v-if="decision.status === 'open'"
          class="text-xs font-medium"
          :class="timeRemaining(decision) ? 'text-muted' : 'text-error'"
        >
          {{ timeRemaining(decision) ?? t('paatos.closing') }}
        </span>
        <div
          v-if="decision.type === 'pato' && decision.stones?.length"
          class="flex items-center gap-1"
        >
          <UIcon
            name="i-lucide-shield"
            class="size-3 text-warning"
          />
          <span class="text-xs text-warning">
            {{ decision.stones.filter(s => !s.withdrawnAt).length }}
          </span>
        </div>
      </div>
    </Motion>

    <Motion
      v-if="!all.length"
      as="div"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ delay: 0.3, duration: 0.6 }"
      class="flex flex-col items-center gap-3 py-16 text-center"
    >
      <UIcon
        name="i-lucide-waves"
        class="size-8 text-muted animate-sink"
      />
      <p class="text-sm text-muted">
        {{ t('paatos.empty') }}
      </p>
    </Motion>
  </Motion>
</template>

<style scoped>
@keyframes sink {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(5px); }
}
.animate-sink { animation: sink 4s ease-in-out infinite; }
</style>
