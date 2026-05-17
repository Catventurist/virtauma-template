<script setup lang="ts">
import { Motion } from 'motion-v'
import type { TabsItem } from '@nuxt/ui'

const {
  allPersonal,
  allCommunity,
  personal,
  community,
  personalEmptyKey,
  communityEmptyKey
} = useKaivo()

const { t } = useI18n()

const activeTab = ref('personal')

const tabs = computed<TabsItem[]>(() => [
  {
    label: t('kaivo.tabs.personal'),
    icon: 'i-lucide-user',
    value: 'personal',
    slot: 'personal',
    badge: allPersonal.value.length || undefined
  },
  {
    label: t('kaivo.tabs.community'),
    icon: 'i-lucide-droplets',
    value: 'community',
    slot: 'community',
    badge: allCommunity.value.length || undefined
  }
])
</script>

<template>
  <Motion
    as="div"
    :initial="{ opacity: 0, y: 24 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.8, ease: 'easeOut' }"
    class="flex flex-col gap-6"
  >
    <KaivoFilter :tab="activeTab" />

    <UTabs
      v-model="activeTab"
      :items="tabs"
    >
      <template #personal>
        <div class="flex flex-col gap-4 pt-4">
          <KaivoInput />

          <template v-if="personal.length">
            <KaivoIntent
              v-for="intent in personal"
              :key="intent.id"
              :intent="intent"
            />
          </template>

          <Motion
            v-else
            as="p"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :transition="{ delay: 0.3, duration: 0.6 }"
            class="text-center text-sm text-muted py-8"
          >
            {{ t(personalEmptyKey) }}
          </Motion>
        </div>
      </template>

      <template #community>
        <div class="flex flex-col gap-4 pt-4">
          <KaivoCommunity />

          <USeparator
            v-if="community.length"
            color="neutral"
          />

          <template v-if="community.length">
            <KaivoIntent
              v-for="intent in community"
              :key="intent.id"
              :intent="intent"
            />
          </template>

          <Motion
            v-else
            as="p"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :transition="{ delay: 0.3, duration: 0.6 }"
            class="text-center text-sm text-muted py-8"
          >
            {{ t(communityEmptyKey) }}
          </Motion>
        </div>
      </template>
    </UTabs>
  </Motion>
</template>
