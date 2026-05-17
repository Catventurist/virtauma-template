<script setup lang="ts">
import { Motion } from 'motion-v'
import type { ColOr, PresenceSignal } from '~/types/resource'
import { presenceMeta } from '~/composables/useRanta'

const props = defineProps<{
  userId: string
}>()

const { active, myPresence, signal, leave, depth } = useRanta()
const { t } = useI18n()

const signals: PresenceSignal[] = ['saapuva', 'syvalla', 'kuuntelee', 'etsii', 'lepaa']

const others = computed(() =>
  active.value.filter(p => p.userId !== props.userId)
)

const note = ref('')
const showNote = ref(false)

const castSignal = (s: PresenceSignal) => {
  signal(props.userId, s, {
    note: note.value.trim() || undefined,
    displayName: undefined,
    visibility: 'members'
  })
  note.value = ''
  showNote.value = false
}
</script>

<template>
  <Motion
    as="div"
    :initial="{ opacity: 0, y: 16 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.8, ease: 'easeOut' }"
    class="flex flex-col gap-8"
  >
    <div class="flex flex-col gap-4">
      <span class="text-xs text-muted uppercase tracking-widest">{{ t('ranta.your_signal') }}</span>

      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="s in signals"
          :key="s"
          :icon="presenceMeta[s].icon"
          :tooltip="t(`ranta.signal.${s}`)"
          :color="myPresence?.signal === s ? (presenceMeta[s].color as ColOr) : 'neutral'"
          :variant="myPresence?.signal === s ? 'subtle' : 'ghost'"
          size="sm"
          square
          @click="castSignal(s)"
        />
        <UButton
          icon="i-lucide-message-square"
          :color="showNote ? 'primary' : 'neutral'"
          variant="ghost"
          size="sm"
          square
          :tooltip="t('ranta.add_note')"
          @click="showNote = !showNote"
        />
        <UButton
          v-if="myPresence"
          icon="i-lucide-log-out"
          color="neutral"
          variant="ghost"
          size="sm"
          square
          :tooltip="t('ranta.leave')"
          @click="leave(userId)"
        />
      </div>

      <Motion
        v-if="showNote"
        as="div"
        :initial="{ opacity: 0, y: 4 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.3 }"
        class="flex gap-2"
      >
        <UInput
          v-model="note"
          :placeholder="t('ranta.note_placeholder')"
          class="flex-1"
          @keydown.enter="myPresence && castSignal(myPresence.signal)"
          @keydown.escape="showNote = false"
        />
      </Motion>

      <Motion
        v-if="myPresence"
        as="div"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 0.5 }"
        class="flex items-center gap-2"
      >
        <UIcon
          :name="presenceMeta[myPresence.signal].icon"
          class="size-4"
          :class="`text-${presenceMeta[myPresence.signal].color}`"
        />
        <span class="text-sm text-toned">{{ t(`ranta.signal.${myPresence.signal}`) }}</span>
        <span
          v-if="myPresence.note"
          class="text-sm text-muted"
        >· {{ myPresence.note }}</span>
      </Motion>
    </div>

    <USeparator color="neutral" />

    <div class="flex flex-col gap-4">
      <span class="text-xs text-muted uppercase tracking-widest">
        {{ others.length }} {{ t('ranta.others') }}
      </span>

      <Motion
        v-if="others.length"
        as="div"
        class="flex flex-col divide-y divide-default"
      >
        <Motion
          v-for="(p, i) in others"
          :key="p.userId"
          as="div"
          :initial="{ opacity: 0, y: 6 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: i * 0.04, duration: 0.4, ease: 'easeOut' }"
          class="flex items-center gap-3 py-3"
        >
          <Motion
            as="div"
            :animate="{ opacity: [0.4, 1, 0.4] }"
            :transition="{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }"
          >
            <UIcon
              :name="presenceMeta[p.signal].icon"
              class="size-4 shrink-0"
              :class="`text-${presenceMeta[p.signal].color}`"
            />
          </Motion>

          <div class="flex flex-col gap-0.5 flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-sm text-toned">
                {{ p.displayName ?? t('ranta.anonymous') }}
              </span>
              <span class="text-xs text-muted">
                {{ t(`ranta.signal.${p.signal}`) }}
              </span>
            </div>
            <span
              v-if="p.note"
              class="text-xs text-muted truncate"
            >{{ p.note }}</span>
          </div>

          <span class="text-xs text-muted shrink-0">
            {{ depth(p) }}{{ t('paatos.hour_unit') }}
          </span>
        </Motion>
      </Motion>

      <Motion
        v-else
        as="p"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ delay: 0.3, duration: 0.6 }"
        class="text-sm text-muted"
      >
        {{ t('ranta.empty') }}
      </Motion>
    </div>
  </Motion>
</template>
