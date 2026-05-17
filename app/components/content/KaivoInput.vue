<script setup lang="ts">
import type { IntentKind, IntentVisibility } from '~/types/resource'
import { Motion } from 'motion-v'

const { add } = useKaivo()
const { t } = useI18n()

const title = ref('')
const kind = ref<IntentKind>('act')
const visibility = ref<IntentVisibility>('private')

const kinds: { value: IntentKind, icon: string }[] = [
  { value: 'act', icon: 'i-lucide-zap' },
  { value: 'make', icon: 'i-lucide-hammer' },
  { value: 'release', icon: 'i-lucide-wind' },
  { value: 'learn', icon: 'i-lucide-book-open' },
  { value: 'give', icon: 'i-lucide-hand-heart' },
  { value: 'tend', icon: 'i-lucide-sprout' }
]

const submit = () => {
  if (!title.value.trim()) return
  add({ title: title.value.trim(), kind: kind.value, visibility: visibility.value })
  title.value = ''
}
</script>

<template>
  <Motion
    as="form"
    :initial="{ opacity: 0, y: 12 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.6, ease: 'easeOut' }"
    class="flex flex-col gap-4"
    @submit.prevent="submit"
  >
    <UFormField name="intention">
      <UInput
        id="intention"
        v-model="title"
        name="intention"
        :placeholder="t('kaivo.input.placeholder')"
        size="lg"
        autocomplete="off"
        autofocus
        class="w-60"
        @keydown.escape="title = ''"
      />
    </UFormField>

    <div class="flex items-center justify-between gap-4">
      <div class="flex gap-2">
        <UButton
          v-for="k in kinds"
          :key="k.value"
          :icon="k.icon"
          :tooltip="t(`kaivo.kind.${k.value}`)"
          :color="kind === k.value ? 'primary' : 'neutral'"
          variant="ghost"
          size="sm"
          square
          type="button"
          @click="kind = k.value"
        />
      </div>

      <UButton
        :icon="visibility === 'private' ? 'i-lucide-eye-off' : 'i-lucide-eye'"
        :tooltip="t(`kaivo.visibility.${visibility}`)"
        color="neutral"
        variant="ghost"
        size="sm"
        square
        type="button"
        @click="visibility = visibility === 'private' ? 'community' : 'private'"
      />
    </div>

    <UButton
      :label="t('kaivo.input.cast')"
      type="submit"
      color="primary"
      block
      :disabled="!title.trim()"
    />
  </Motion>
</template>
