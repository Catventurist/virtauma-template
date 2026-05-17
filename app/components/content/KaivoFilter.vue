<script setup lang="ts">
import { Motion } from 'motion-v'
import type { IntentKind, IntentState } from '~/types/resource'

const {
  filterKindPersonal,
  filterKindCommunity,
  filterStatePersonal,
  filterStateCommunity,
  exportIntents
} = useKaivo()

const { t } = useI18n()

const props = defineProps<{
  tab: string
}>()

const filterKind = computed({
  get: () => props.tab === 'personal' ? filterKindPersonal.value : filterKindCommunity.value,
  set: v => props.tab === 'personal' ? filterKindPersonal.value = v : filterKindCommunity.value = v
})

const filterState = computed({
  get: () => props.tab === 'personal' ? filterStatePersonal.value : filterStateCommunity.value,
  set: v => props.tab === 'personal' ? filterStatePersonal.value = v : filterStateCommunity.value = v
})

const kinds: { value: IntentKind, icon: string }[] = [
  { value: 'act', icon: 'i-lucide-zap' },
  { value: 'make', icon: 'i-lucide-hammer' },
  { value: 'release', icon: 'i-lucide-wind' },
  { value: 'learn', icon: 'i-lucide-book-open' },
  { value: 'give', icon: 'i-lucide-hand-heart' },
  { value: 'tend', icon: 'i-lucide-sprout' }
]

const states: { value: IntentState, icon: string }[] = [
  { value: 'ripple', icon: 'i-lucide-circle-dot' },
  { value: 'flowing', icon: 'i-lucide-waves' },
  { value: 'settled', icon: 'i-lucide-anchor' },
  { value: 'dissolved', icon: 'i-lucide-cloud-fog' }
]
</script>

<template>
  <Motion
    as="div"
    :initial="{ opacity: 0, y: 8 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.5, ease: 'easeOut' }"
    class="flex items-center justify-between gap-4 flex-wrap"
  >
    <div class="flex gap-2">
      <UButton
        v-for="k in kinds"
        :key="k.value"
        :icon="k.icon"
        :tooltip="t(`kaivo.kind.${k.value}`)"
        :color="filterKind === k.value ? 'primary' : 'neutral'"
        variant="ghost"
        size="sm"
        square
        @click="filterKind = filterKind === k.value ? null : k.value"
      />
    </div>

    <div class="flex gap-2">
      <UButton
        v-for="s in states"
        :key="s.value"
        :icon="s.icon"
        :tooltip="t(`kaivo.state.${s.value}`)"
        :color="filterState === s.value ? 'primary' : 'neutral'"
        variant="ghost"
        size="sm"
        square
        @click="filterState = filterState === s.value ? null : s.value"
      />

      <UButton
        icon="i-lucide-download"
        :tooltip="t('kaivo.export')"
        color="neutral"
        variant="ghost"
        size="sm"
        square
        @click="exportIntents"
      />
    </div>
  </Motion>
</template>
