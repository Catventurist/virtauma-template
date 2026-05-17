<script setup lang="ts">
import { Motion } from 'motion-v'
import type { DecisionType, DecisionOption } from '~/types/resource'
import { decisionMeta } from '~/composables/usePaatos'

const props = defineProps<{
  userId?: string
}>()

const emit = defineEmits<{
  created: [id: string]
}>()

const { add } = usePaatos()
const { t } = useI18n()

const type = ref<DecisionType>('kaste')
const title = ref('')
const description = ref('')
const options = ref<DecisionOption[]>([])
const newOption = ref('')
const recurringInterval = ref<'weekly' | 'monthly' | 'seasonal'>('monthly')

const types: DecisionType[] = ['kaste', 'haara', 'vuoksi', 'pato', 'tulva', 'karikko', 'pyorre']

const addOption = () => {
  if (!newOption.value.trim()) return
  options.value.push({
    id: crypto.randomUUID(),
    label: newOption.value.trim(),
    votes: 0
  })
  newOption.value = ''
}

const removeOption = (id: string) => {
  options.value = options.value.filter(o => o.id !== id)
}

const submit = () => {
  if (!title.value.trim()) return
  const id = add(type.value, {
    title: title.value.trim(),
    description: description.value.trim() || undefined,
    options: type.value === 'haara' ? options.value : undefined,
    recurringInterval: type.value === 'pyorre' ? recurringInterval.value : undefined
  }, props.userId as string)
  emit('created', id)
  title.value = ''
  description.value = ''
  options.value = []
  type.value = 'kaste'
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
    <div class="flex flex-wrap gap-2">
      <UButton
        v-for="dt in types"
        :key="dt"
        :icon="decisionMeta[dt].icon"
        :tooltip="t(`paatos.type.${dt}`)"
        :color="type === dt ? decisionMeta[dt].color : 'neutral'"
        :variant="type === dt ? 'subtle' : 'ghost'"
        size="sm"
        square
        type="button"
        @click="type = dt"
      />
    </div>

    <div class="flex flex-col gap-1">
      <p class="text-xs text-muted">
        {{ t(`paatos.description.${type}`) }}
      </p>
      <span class="text-xs text-muted">
        {{ t('paatos.closes_in') }} {{ decisionMeta[type].defaultClosingHours }}{{ t('paatos.hour_unit') }}
        <template v-if="decisionMeta[type].defaultCoolingPeriod">
          · {{ t('paatos.cooling') }} {{ decisionMeta[type].defaultCoolingPeriod }}{{ t('paatos.hour_unit') }}
        </template>
      </span>
    </div>

    <USeparator color="neutral" />

    <UFormField name="title">
      <UInput
        id="title"
        v-model="title"
        name="title"
        :placeholder="t('paatos.title_placeholder')"
        size="lg"
        autocomplete="off"
        autofocus
        class="w-full"
      />
    </UFormField>

    <UFormField name="description">
      <UTextarea
        id="description"
        v-model="description"
        name="description"
        :placeholder="t('paatos.description_placeholder')"
        autoresize
        autocomplete="off"
        class="w-full"
      />
    </UFormField>

    <div
      v-if="type === 'haara'"
      class="flex flex-col gap-3"
    >
      <div
        v-for="option in options"
        :key="option.id"
        class="flex items-center gap-2"
      >
        <span class="flex-1 text-sm text-toned px-3 py-2 rounded-lg bg-elevated">{{ option.label }}</span>
        <UButton
          icon="i-lucide-x"
          color="neutral"
          variant="ghost"
          size="xs"
          square
          type="button"
          @click="removeOption(option.id)"
        />
      </div>

      <div class="flex gap-2">
        <UInput
          v-model="newOption"
          :placeholder="t('paatos.option_placeholder')"
          class="flex-1"
          @keydown.enter.prevent="addOption"
          @keydown.escape="newOption = ''"
        />
        <UButton
          icon="i-lucide-plus"
          color="neutral"
          variant="ghost"
          square
          type="button"
          :disabled="!newOption.trim()"
          @click="addOption"
        />
      </div>
    </div>

    <div
      v-if="type === 'pyorre'"
      class="flex gap-2"
    >
      <UButton
        v-for="interval in (['weekly', 'monthly', 'seasonal'] as const)"
        :key="interval"
        :label="t(`paatos.interval.${interval}`)"
        :color="recurringInterval === interval ? 'primary' : 'neutral'"
        :variant="recurringInterval === interval ? 'subtle' : 'ghost'"
        size="sm"
        type="button"
        @click="recurringInterval = interval"
      />
    </div>

    <UButton
      :label="t('paatos.cast')"
      type="submit"
      color="primary"
      block
      :disabled="!title.trim() || (type === 'haara' && options.length < 2)"
    />
  </Motion>
</template>
