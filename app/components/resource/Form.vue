<script setup lang="ts">
import type { Resource, ResourceType, TrustLevel, ViewContext } from '~/types/resource'

const props = defineProps<{
  context: ViewContext
  resource?: Resource
}>()

const emit = defineEmits<{
  submit: [data: Partial<Resource>]
  cancel: []
}>()

const { t } = useI18n()

const form = ref({
  name: props.resource?.name ?? '',
  description: props.resource?.description ?? '',
  type: props.resource?.type ?? 'physical' as ResourceType,
  trustLevel: props.resource?.trustLevel ?? 'member' as TrustLevel,
  conditions: props.resource?.conditions ?? '',
  tags: props.resource?.tags?.join(', ') ?? ''
})

const type = ref<ResourceType>(props.resource?.type ?? 'physical')
const trustLevel = ref<TrustLevel>(props.resource?.trustLevel ?? 'member')
const trustLevels: TrustLevel[] = ['open', 'member', 'verified', 'trusted']

function onSubmit() {
  emit('submit', {
    name: form.value.name,
    description: form.value.description,
    type: type.value,
    trustLevel: trustLevel.value,
    conditions: form.value.conditions,
    tags: form.value.tags.split(',').map(tag => tag.trim()).filter(Boolean)
  })
}
</script>

<template>
  <UCard :ui="{ root: 'overflow-hidden' }">
    <div class="flex flex-col gap-4">
      <UFormField
        :label="t('pool.form.name')"
        name="name"
      >
        <UInput
          id="name"
          v-model="form.name"
          :placeholder="t('pool.form.namePlaceholder')"
          class="w-full"
        />
      </UFormField>

      <UFormField
        :label="t('pool.form.description')"
        name="description"
      >
        <UTextarea
          id="description"
          v-model="form.description"
          :rows="3"
          :placeholder="t('pool.form.descriptionPlaceholder')"
          class="w-full"
        />
      </UFormField>

      <div class="grid grid-cols-2 gap-4">
        <UFormField
          :label="t('pool.form.type')"
          name="type"
        >
          <USelect
            id="trustLevel"
            v-model="trustLevel"
            :items="trustLevels.map(level => ({ label: t(`pool.trust.${level}`), value: level }))"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="t('pool.form.trustLevel')"
          name="trustLevel"
        >
          <USelect
            id="trustLevel"
            v-model="form.trustLevel"
            :items="trustLevels.map(l => ({ label: t(`pool.trust.${l}`), value: l }))"
            class="w-full"
          />
        </UFormField>
      </div>

      <UFormField
        :label="t('pool.form.conditions')"
        name="conditions"
      >
        <UTextarea
          id="conditions"
          v-model="form.conditions"
          :rows="2"
          :placeholder="t('pool.form.conditionsPlaceholder')"
          class="w-full"
        />
      </UFormField>

      <UFormField
        :label="t('pool.form.tags')"
        name="tags"
      >
        <UInput
          id="tags"
          v-model="form.tags"
          :placeholder="t('pool.form.tagsPlaceholder')"
          class="w-full"
        />
      </UFormField>

      <div class="flex justify-end gap-2 pt-2 border-t border-default">
        <UButton
          :label="t('pool.form.cancel')"
          color="neutral"
          variant="ghost"
          @click="emit('cancel')"
        />
        <UButton
          :label="t('pool.form.submit')"
          icon="i-lucide-check"
          @click="onSubmit"
        />
      </div>
    </div>
  </UCard>
</template>
