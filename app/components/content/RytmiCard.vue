<script setup lang="ts">
import { Motion } from 'motion-v'
import { rytmiMeta } from '~/composables/useRytmi'
import type { Rytmi } from '~/types/resource'
import type { Transition } from 'motion-v'

interface WaveAnimation {
  animate: Record<string, number | number[]>
  transition: Transition
}

const props = defineProps<{
  rhythm: Rytmi
}>()

const { status, timeUntil, complete } = useRytmi()
const { t } = useI18n()

const meta = computed(() => rytmiMeta[props.rhythm.type])
const currentStatus = computed(() => status(props.rhythm))
const remaining = computed(() => timeUntil(props.rhythm))

const fillPercent = computed(() => {
  if (currentStatus.value === 'active') return 100
  if (currentStatus.value === 'passed') return 0
  const next = new Date(props.rhythm.nextAt).getTime()
  const created = new Date(props.rhythm.createdAt).getTime()
  const now = Date.now()
  const total = next - created
  const elapsed = now - created
  return Math.min(100, Math.max(0, (elapsed / total) * 100))
})

const waveAnimations: Record<string, WaveAnimation> = {
  aalto: {
    animate: { y: [0, -8, 0] },
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
  },
  vuorovesi: {
    animate: { scaleY: [1, 1.08, 1] },
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
  },
  kaiku: {
    animate: { scale: [1, 1.04, 1] },
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
  },
  hiljaisuus: {
    animate: { opacity: [0.4, 0.7, 0.4] },
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' }
  }
}

const anim = computed((): WaveAnimation =>
  waveAnimations[props.rhythm.type] ?? waveAnimations.aalto!
)
</script>

<template>
  <Motion
    as="div"
    :initial="{ opacity: 0, y: 12 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.7, ease: 'easeOut' }"
    class="relative overflow-hidden rounded-2xl border border-primary/10 bg-primary/5 hover:bg-primary/10 transition-all duration-500 cursor-default"
  >
    <div
      class="absolute bottom-0 left-0 right-0 bg-primary/5 transition-all duration-1000"
      :style="{ height: `${fillPercent}%` }"
    />

    <div
      v-for="i in Math.min(rhythm.occurrences, 5)"
      :key="i"
      class="absolute inset-0 rounded-2xl border border-primary/5"
      :style="{ margin: `${i * 3}px` }"
    />

    <div class="relative z-10 flex flex-col gap-5 p-6">
      <div class="flex items-start justify-between gap-4">
        <div class="flex items-center gap-3">
          <Motion
            as="div"
            :animate="anim.animate"
            :transition="anim.transition"
          >
            <UIcon
              :name="meta.icon"
              class="size-6"
              :class="`text-${meta.color}`"
            />
          </Motion>
          <div class="flex flex-col">
            <span class="text-sm font-semibold text-highlighted">{{ rhythm.name }}</span>
            <span class="text-xs text-muted">{{ t(`rytmi.type.${rhythm.type}`) }} · {{ t(`rytmi.cadence.${rhythm.cadence}`) }}</span>
          </div>
        </div>

        <div class="flex flex-col items-end gap-1 shrink-0">
          <UBadge
            :label="t(`rytmi.status.${currentStatus}`)"
            :color="currentStatus === 'active' ? meta.color : 'neutral'"
            :variant="currentStatus === 'active' ? 'subtle' : 'soft'"
            size="xs"
          />
          <span
            v-if="remaining"
            class="text-xs text-muted"
          >{{ remaining }}</span>
        </div>
      </div>

      <p
        v-if="rhythm.ritual"
        class="text-base text-toned italic leading-relaxed"
      >
        {{ rhythm.ritual }}
      </p>

      <p
        v-if="rhythm.description"
        class="text-sm text-muted leading-relaxed"
      >
        {{ rhythm.description }}
      </p>

      <USeparator color="neutral" />

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-repeat"
            class="size-3 text-muted"
          />
          <span class="text-xs text-muted">
            {{ rhythm.occurrences }} {{ t('rytmi.occurrences') }}
          </span>
        </div>

        <UButton
          v-if="currentStatus === 'active'"
          :label="t('rytmi.complete')"
          :color="meta.color"
          variant="subtle"
          size="xs"
          leading-icon="i-lucide-check"
          @click="complete(rhythm.id)"
        />
      </div>
    </div>
  </Motion>
</template>
