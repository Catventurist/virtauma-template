<script setup lang="ts">
import { AnimatePresence, Motion } from 'motion-v'
import type { Want, Member, ViewContext, ResourceType } from '~/types/resource'

const props = defineProps<{
  wants: Want[]
  members: Member[]
  context: ViewContext
}>()

const emit = defineEmits<{
  post: [description: string, type: ResourceType | undefined]
  fulfill: [wantId: string]
}>()

const { t } = useI18n()

const showForm = ref(false)
const description = ref('')
const type = ref<ResourceType | undefined>(undefined)

const types: ResourceType[] = ['physical', 'digital', 'skill', 'financial', 'knowledge']

function getMember(id: string) {
  return props.members.find(m => m.id === id)
}

function onPost() {
  if (!description.value.trim()) return
  emit('post', description.value, type.value)
  description.value = ''
  type.value = undefined
  showForm.value = false
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <p class="text-xs font-medium text-muted uppercase tracking-wide">
        {{ t('pool.wants.title') }}
      </p>
      <UButton
        v-if="context.canOffer"
        :label="t('pool.wants.post')"
        size="xs"
        icon="i-lucide-plus"
        variant="ghost"
        @click="showForm = !showForm"
      />
    </div>

    <AnimatePresence>
      <Motion
        v-if="showForm"
        as="div"
        :initial="{ opacity: 0, height: 0 }"
        :animate="{ opacity: 1, height: 'auto' }"
        :exit="{ opacity: 0, height: 0 }"
        :transition="{ type: 'spring', stiffness: 300, damping: 30 }"
        class="overflow-hidden"
      >
        <UCard
          :ui="{ root: 'overflow-hidden' }"
          class="mb-2"
        >
          <div class="flex flex-col gap-3">
            <UFormField
              :label="t('pool.wants.description')"
              name="want-description"
            >
              <UTextarea
                id="want-description"
                v-model="description"
                :rows="2"
                :placeholder="t('pool.wants.descriptionPlaceholder')"
              />
            </UFormField>

            <UFormField
              :label="t('pool.wants.type')"
              name="want-type"
            >
              <USelect
                id="want-type"
                v-model="type"
                :items="[
                  { label: t('pool.wants.anyType'), value: undefined },
                  ...types.map(type => ({ label: t(`pool.type.${type}`), value: type }))
                ]"
              />
            </UFormField>

            <div class="flex justify-end gap-2">
              <UButton
                :label="t('pool.form.cancel')"
                color="neutral"
                variant="ghost"
                size="xs"
                @click="showForm = false"
              />
              <UButton
                :label="t('pool.wants.submit')"
                size="xs"
                icon="i-lucide-send"
                @click="onPost"
              />
            </div>
          </div>
        </UCard>
      </Motion>
    </AnimatePresence>

    <div
      v-if="wants.length === 0"
      class="text-sm text-dimmed text-center py-4"
    >
      {{ t('pool.wants.empty') }}
    </div>

    <div class="flex flex-col gap-2">
      <WateryMotion
        v-for="(want, i) in wants"
        :key="want.id"
        :index="i"
      >
        <div class="flex items-start gap-3 p-3 rounded-xl border border-default bg-default/40">
          <UIcon
            name="i-lucide-search"
            class="w-4 h-4 text-muted mt-0.5 shrink-0"
          />

          <div class="flex-1 min-w-0">
            <p class="text-sm text-highlighted">
              {{ want.description }}
            </p>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-xs text-dimmed">{{ getMember(want.memberId)?.name }}</span>
              <UBadge
                v-if="want.type"
                :label="t(`pool.type.${want.type}`)"
                size="xs"
                variant="subtle"
                color="neutral"
              />
              <span class="text-xs text-dimmed">{{ new Date(want.createdAt).toLocaleDateString() }}</span>
            </div>
          </div>

          <UButton
            v-if="context.canModerate"
            icon="i-lucide-check"
            size="xs"
            color="success"
            variant="ghost"
            @click="emit('fulfill', want.id)"
          />
        </div>
      </WateryMotion>
    </div>
  </div>
</template>
