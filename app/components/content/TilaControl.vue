<script setup lang="ts">
import { Motion } from 'motion-v'
import { tilaMeta } from '~/composables/useTila'
import type { ColOr, TilaState } from '~/types/resource'

const props = defineProps<{
  userId: string
}>()

const { tila, meta, setState } = useTila()
const { t } = useI18n()

const states: TilaState[] = ['tyyni', 'laskuvesi', 'levossa', 'virtaava', 'nousuvesi', 'myrskyinen', 'padottu']

const selected = ref<TilaState>(tila.value.state)
const note = ref(tila.value.note ?? '')

const submit = () => {
  setState(selected.value, props.userId, note.value.trim() || undefined)
  note.value = ''
}
</script>

<template>
  <Motion
    as="div"
    :initial="{ opacity: 0, y: 8 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.6, ease: 'easeOut' }"
    class="flex flex-col gap-6"
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

    <div class="flex flex-col gap-4">
      <span class="text-xs text-muted uppercase tracking-widest">{{ t('tila.set_state') }}</span>

      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="s in states"
          :key="s"
          :icon="tilaMeta[s].icon"
          :tooltip="t(`tila.state.${s}`)"
          :color="selected === s ? tilaMeta[s].color as ColOr : 'neutral'"
          :variant="selected === s ? 'subtle' : 'ghost'"
          size="sm"
          square
          @click="selected = s"
        />
      </div>

      <div class="flex flex-col gap-1">
        <span class="text-xs text-muted">{{ t(`tila.state.${selected}`) }}</span>
        <span class="text-xs text-muted/60">{{ t(`tila.description.${selected}`) }}</span>
      </div>

      <UFormField name="note">
        <UInput
          v-model="note"
          name="note"
          :placeholder="t('tila.note_placeholder')"
          autocomplete="off"
          class="w-full"
        />
      </UFormField>

      <UButton
        :label="t('tila.set')"
        color="primary"
        variant="subtle"
        leading-icon="i-lucide-waves"
        :disabled="selected === tila.state && !note.trim()"
        @click="submit"
      />
    </div>
  </Motion>
</template>
