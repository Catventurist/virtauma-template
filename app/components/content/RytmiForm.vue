<script setup lang="ts">
import { Motion } from 'motion-v'
import { rytmiMeta } from '~/composables/useRytmi'
import type { RytmiType, RytmiCadence, TilaState, ColOr } from '~/types/resource'

const emit = defineEmits<{
  created: [id: string]
}>()

const { add } = useRytmi()
const { t } = useI18n()

const types: RytmiType[] = ['aalto', 'vuorovesi', 'kaiku', 'hiljaisuus']
const cadences: RytmiCadence[] = ['daily', 'weekly', 'monthly', 'seasonal', 'lunar', 'custom']
const tilaStates: TilaState[] = ['tyyni', 'laskuvesi', 'levossa', 'virtaava', 'nousuvesi', 'myrskyinen', 'padottu']

const type = ref<RytmiType>('aalto')
const cadence = ref<RytmiCadence>('weekly')
const name = ref('')
const description = ref('')
const ritual = ref('')
const customDays = ref(7)
const tilaShift = ref<TilaState | undefined>(undefined)

const submit = () => {
  if (!name.value.trim()) return
  const id = add({
    name: name.value.trim(),
    description: description.value.trim() || undefined,
    ritual: ritual.value.trim() || undefined,
    type: type.value,
    cadence: cadence.value,
    tendedBy: [],
    customCadenceDays: cadence.value === 'custom' ? customDays.value : undefined,
    tilaShift: tilaShift.value
  })
  emit('created', id)
  name.value = ''
  description.value = ''
  ritual.value = ''
  type.value = 'aalto'
  cadence.value = 'weekly'
  tilaShift.value = undefined
}
</script>

<template>
  <Motion
    as="form"
    :initial="{ opacity: 0, y: 16 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.8, ease: 'easeOut' }"
    class="flex flex-col gap-6"
    @submit.prevent="submit"
  >
    <div class="flex flex-col gap-2">
      <span class="text-xs text-muted uppercase tracking-widest">{{ t('rytmi.form.type') }}</span>
      <div class="flex gap-2">
        <UButton
          v-for="rt in types"
          :key="rt"
          :icon="rytmiMeta[rt].icon"
          :tooltip="t(`rytmi.type.${rt}`)"
          :color="type === rt ? rytmiMeta[rt].color as ColOr : 'neutral'"
          :variant="type === rt ? 'subtle' : 'ghost'"
          size="sm"
          square
          type="button"
          @click="type = rt"
        />
      </div>
      <span class="text-xs text-muted/60">{{ t(`rytmi.type_description.${type}`) }}</span>
    </div>

    <USeparator color="neutral" />

    <UFormField name="name">
      <UInput
        v-model="name"
        name="name"
        :placeholder="t('rytmi.form.name_placeholder')"
        size="lg"
        autofocus
        autocomplete="off"
        class="w-full"
      />
    </UFormField>

    <UFormField name="description">
      <UTextarea
        v-model="description"
        name="description"
        :placeholder="t('rytmi.form.description_placeholder')"
        autoresize
        autocomplete="off"
        class="w-full"
      />
    </UFormField>

    <UFormField name="ritual">
      <UTextarea
        v-model="ritual"
        name="ritual"
        :placeholder="t('rytmi.form.ritual_placeholder')"
        autoresize
        autocomplete="off"
        class="w-full"
      />
    </UFormField>

    <div class="flex flex-col gap-2">
      <span class="text-xs text-muted uppercase tracking-widest">{{ t('rytmi.form.cadence') }}</span>
      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="c in cadences"
          :key="c"
          :label="t(`rytmi.cadence.${c}`)"
          :color="cadence === c ? 'primary' : 'neutral'"
          :variant="cadence === c ? 'subtle' : 'ghost'"
          size="sm"
          type="button"
          @click="cadence = c"
        />
      </div>
      <UInput
        v-if="cadence === 'custom'"
        v-model="customDays"
        name="customDays"
        type="number"
        :min="1"
        :placeholder="t('rytmi.form.custom_days')"
        class="w-32"
      />
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-xs text-muted uppercase tracking-widest">{{ t('rytmi.form.tila_shift') }}</span>
      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="s in tilaStates"
          :key="s"
          :tooltip="t(`tila.state.${s}`)"
          :icon="tilaMeta[s].icon"
          :color="tilaShift === s ? tilaMeta[s].color as ColOr : 'neutral'"
          :variant="tilaShift === s ? 'subtle' : 'ghost'"
          size="sm"
          square
          type="button"
          @click="tilaShift = tilaShift === s ? undefined : s"
        />
      </div>
    </div>

    <UButton
      type="submit"
      :label="t('rytmi.form.cast')"
      color="primary"
      variant="subtle"
      block
      leading-icon="i-lucide-waves"
      :disabled="!name.trim()"
    />
  </Motion>
</template>
