<script setup lang="ts">
import type { Intent, IntentState } from '~/types/resource'
import { Motion } from 'motion-v'

const props = defineProps<{
  intent: Intent
}>()

const { transition, remove, witness, hasWitnessed } = useKaivo()
const { t } = useI18n()

const states: { value: IntentState, icon: string }[] = [
  { value: 'ripple', icon: 'i-lucide-circle-dot' },
  { value: 'flowing', icon: 'i-lucide-waves' },
  { value: 'settled', icon: 'i-lucide-anchor' },
  { value: 'dissolved', icon: 'i-lucide-cloud-fog' }
]

const kindIcons: Record<string, string> = {
  act: 'i-lucide-zap',
  make: 'i-lucide-hammer',
  release: 'i-lucide-wind',
  learn: 'i-lucide-book-open',
  give: 'i-lucide-hand-heart',
  tend: 'i-lucide-sprout'
}

const currentState = computed(() => states.find(s => s.value === props.intent.state)!)
const witnessed = computed(() => hasWitnessed(props.intent.id))
</script>

<template>
  <Motion
    as="div"
    :initial="{ opacity: 0, y: 12 }"
    :animate="{ opacity: 1, y: 0 }"
    :exit="{ opacity: 0, y: 8 }"
    :while-hover="{ scale: 1.01 }"
    :transition="{ duration: 0.5, ease: 'easeOut' }"
  >
    <UCard>
      <div class="flex items-start justify-between gap-4">
        <div class="flex items-center gap-3">
          <UIcon
            :name="kindIcons[intent.kind]"
            class="size-4 text-muted shrink-0"
          />
          <span
            class="text-sm text-highlighted"
            :class="{ 'line-through text-muted': intent.state === 'settled' || intent.state === 'dissolved' }"
          >
            {{ intent.title }}
          </span>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <UDropdownMenu
            :items="states.map(s => ({
              label: t(`kaivo.state.${s.value}`),
              icon: s.icon,
              click: () => transition(intent.id, s.value)
            }))"
          >
            <UButton
              :icon="currentState.icon"
              :color="intent.state === 'settled' ? 'success' : intent.state === 'dissolved' ? 'neutral' : 'primary'"
              variant="ghost"
              size="xs"
              square
            />
          </UDropdownMenu>

          <UButton
            icon="i-lucide-eye"
            :color="witnessed ? 'primary' : 'neutral'"
            variant="ghost"
            size="xs"
            square
            @click="witness(intent.id)"
          >
            <template #trailing>
              <span class="text-xs">{{ intent.witness }}</span>
            </template>
          </UButton>

          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            size="xs"
            square
            @click="remove(intent.id)"
          />
        </div>
      </div>
    </UCard>
  </Motion>
</template>
