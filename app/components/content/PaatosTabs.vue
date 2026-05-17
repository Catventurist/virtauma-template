<script setup lang="ts">
import { Motion } from 'motion-v'
import type { TabsItem } from '@nuxt/ui'

defineProps<{
  userId: string
}>()

const { t } = useI18n()

const activeTab = ref('stream')
const selectedId = ref<string | null>(null)
const showForm = ref(false)

const { decisions, open, closed } = usePaatos()

const selected = computed(() =>
  selectedId.value ? decisions.value.find(d => d.id === selectedId.value) ?? null : null
)

const tabs = computed<TabsItem[]>(() => [
  {
    label: t('paatos.tabs.stream'),
    icon: 'i-lucide-waves',
    value: 'stream',
    slot: 'stream',
    badge: open.value.length || undefined
  },
  {
    label: t('paatos.tabs.settled'),
    icon: 'i-lucide-anchor',
    value: 'settled',
    slot: 'settled',
    badge: closed.value.length || undefined
  }
])

const onCreated = (id: string) => {
  showForm.value = false
  selectedId.value = id
  activeTab.value = 'stream'
}
</script>

<template>
  <Motion
    as="div"
    :initial="{ opacity: 0, y: 24 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.8, ease: 'easeOut' }"
    class="flex flex-col gap-6"
  >
    <div class="flex items-center justify-between">
      <UButton
        :label="showForm ? t('paatos.cancel') : t('paatos.new')"
        :icon="showForm ? 'i-lucide-x' : 'i-lucide-plus'"
        :color="showForm ? 'neutral' : 'primary'"
        variant="subtle"
        size="sm"
        @click="showForm = !showForm; selectedId = null"
      />
    </div>

    <Motion
      v-if="showForm"
      as="div"
      :initial="{ opacity: 0, y: 8 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.4, ease: 'easeOut' }"
    >
      <PaatosForm
        :user-id="userId"
        @created="onCreated"
      />
    </Motion>

    <Motion
      v-else-if="selected"
      as="div"
      :initial="{ opacity: 0, y: 8 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.4, ease: 'easeOut' }"
      class="flex flex-col gap-4"
    >
      <UButton
        :label="t('paatos.back')"
        icon="i-lucide-chevron-left"
        color="neutral"
        variant="ghost"
        size="sm"
        class="self-start"
        @click="selectedId = null"
      />
      <PaatosCard
        :decision="selected"
        :user-id="userId"
      />
    </Motion>

    <UTabs
      v-else
      v-model="activeTab"
      :items="tabs"
    >
      <template #stream>
        <PaatosList
          :decisions="open"
          @select="selectedId = $event"
        />
      </template>
      <template #settled>
        <PaatosList
          :decisions="closed"
          @select="selectedId = $event"
        />
      </template>
    </UTabs>
  </Motion>
</template>
