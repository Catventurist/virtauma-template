<script setup lang="ts">
import { Motion } from 'motion-v'
import type { TabsItem } from '@nuxt/ui'

const { t } = useI18n()

const { upcoming, active, passed } = useRytmi()

const showForm = ref(false)
const activeTab = ref('upcoming')

const tabs = computed<TabsItem[]>(() => [
  {
    label: t('rytmi.tabs.upcoming'),
    icon: 'i-lucide-waves',
    value: 'upcoming',
    slot: 'upcoming',
    badge: upcoming.value.length || undefined
  },
  {
    label: t('rytmi.tabs.active'),
    icon: 'i-lucide-activity',
    value: 'active',
    slot: 'active',
    badge: active.value.length || undefined
  },
  {
    label: t('rytmi.tabs.passed'),
    icon: 'i-lucide-anchor',
    value: 'passed',
    slot: 'passed',
    badge: passed.value.length || undefined
  }
])

const onCreated = (_id: string) => {
  showForm.value = false
  activeTab.value = 'upcoming'
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
        :label="showForm ? t('rytmi.cancel') : t('rytmi.new')"
        :icon="showForm ? 'i-lucide-x' : 'i-lucide-plus'"
        :color="showForm ? 'neutral' : 'primary'"
        variant="subtle"
        size="sm"
        @click="showForm = !showForm"
      />
    </div>

    <Motion
      v-if="showForm"
      as="div"
      :initial="{ opacity: 0, y: 8 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.4, ease: 'easeOut' }"
    >
      <RytmiForm @created="onCreated" />
    </Motion>

    <UTabs
      v-else
      v-model="activeTab"
      :items="tabs"
    >
      <template #upcoming>
        <div class="flex flex-col gap-4 pt-4">
          <RytmiCard
            v-for="r in upcoming"
            :key="r.id"
            :rhythm="r"
          />
          <Motion
            v-if="!upcoming.length"
            as="p"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :transition="{ delay: 0.3, duration: 0.6 }"
            class="text-center text-sm text-muted py-16"
          >
            {{ t('rytmi.empty.upcoming') }}
          </Motion>
        </div>
      </template>

      <template #active>
        <div class="flex flex-col gap-4 pt-4">
          <RytmiCard
            v-for="r in active"
            :key="r.id"
            :rhythm="r"
          />
          <Motion
            v-if="!active.length"
            as="p"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :transition="{ delay: 0.3, duration: 0.6 }"
            class="text-center text-sm text-muted py-16"
          >
            {{ t('rytmi.empty.active') }}
          </Motion>
        </div>
      </template>

      <template #passed>
        <div class="flex flex-col gap-4 pt-4">
          <RytmiCard
            v-for="r in passed"
            :key="r.id"
            :rhythm="r"
          />
          <Motion
            v-if="!passed.length"
            as="p"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :transition="{ delay: 0.3, duration: 0.6 }"
            class="text-center text-sm text-muted py-16"
          >
            {{ t('rytmi.empty.passed') }}
          </Motion>
        </div>
      </template>
    </UTabs>
  </Motion>
</template>
