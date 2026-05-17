<script setup lang="ts">
import { Motion } from 'motion-v'
import { tilaMeta } from '~/composables/useTila'
import type { ColOr, TilaState } from '~/types/resource'

const props = defineProps<{
  userId: string
}>()

const { tila, meta, dominantSignal, signal, withdrawSignal, userSignal } = useTila()
const { t } = useI18n()

const states: TilaState[] = ['tyyni', 'laskuvesi', 'levossa', 'virtaava', 'nousuvesi', 'myrskyinen', 'padottu']

const mine = computed(() => userSignal(props.userId))
</script>

<template>
  <Motion
    as="div"
    :initial="{ opacity: 0, y: 8 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.6, ease: 'easeOut' }"
    class="flex flex-col gap-4"
  >
    <div class="flex flex-col gap-1">
      <span class="text-xs text-muted uppercase tracking-widest">{{ t('tila.current') }}</span>
      <div class="flex items-center gap-2">
        <UIcon
          :name="meta.icon"
          class="size-4"
          :class="`text-${meta.color}`"
        />
        <span class="text-sm text-highlighted">{{ t(`tila.state.${tila.state}`) }}</span>
        <span
          v-if="tila.note"
          class="text-sm text-muted"
        >· {{ tila.note }}</span>
      </div>
    </div>

    <USeparator color="neutral" />

    <div class="flex flex-col gap-2">
      <span class="text-xs text-muted uppercase tracking-widest">{{ t('tila.your_signal') }}</span>
      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="s in states"
          :key="s"
          :icon="tilaMeta[s].icon"
          :tooltip="t(`tila.state.${s}`)"
          :color="mine?.state === s ? (tilaMeta[s].color as ColOr) : 'neutral'"
          :variant="mine?.state === s ? 'subtle' : 'ghost'"
          size="sm"
          square
          @click="mine?.state === s ? withdrawSignal(userId) : signal(userId, s)"
        />
      </div>
    </div>

    <div
      v-if="dominantSignal && dominantSignal !== tila.state"
      class="flex items-center gap-2"
    >
      <UIcon
        :name="tilaMeta[dominantSignal].icon"
        class="size-3 text-muted"
      />
      <span class="text-xs text-muted">
        {{ t('tila.members_sense') }} {{ t(`tila.state.${dominantSignal}`) }}
      </span>
    </div>
  </Motion>
</template>
