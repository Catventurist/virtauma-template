<script setup lang="ts">
import { Motion } from 'motion-v'
import type { VakiEnCollectionItem, VakiFiCollectionItem } from '@nuxt/content'

type VakiItem = VakiEnCollectionItem | VakiFiCollectionItem

const { t } = useI18n()

const { data: members } = await useCollection<VakiItem>('vaki')

const stateColor = {
  flowing: 'primary',
  still: 'neutral',
  deep: 'secondary'
} as const

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay }
})
</script>

<template>
  <div class="min-h-screen bg-default">
    <div class="max-w-7xl mx-auto px-6 py-12 space-y-10">
      <Motion
        as="div"
        v-bind="fadeUp(0)"
      >
        <div class="space-y-1">
          <h1 class="text-3xl font-semibold text-highlighted">
            {{ t('dashboard.sections.spirit_keepers') }}
          </h1>
          <p class="text-sm text-muted">
            {{ t('dashboard.vaki.subtitle') }}
          </p>
        </div>
      </Motion>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Motion
          v-for="(member, i) in members"
          :key="member.path"
          as="div"
          v-bind="fadeUp(0.05 + i * 0.06)"
          :while-hover="{ y: -3 }"
          :transition="{ duration: 0.4, delay: 0.05 + i * 0.06 }"
        >
          <UCard class="h-full">
            <div class="flex flex-col gap-4">
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3">
                  <UAvatar
                    :src="member.avatar"
                    :alt="member.name"
                    size="lg"
                  />
                  <div>
                    <p class="font-semibold text-highlighted">
                      {{ member.name }}
                    </p>
                    <p class="text-xs text-muted">
                      {{ member.role }}
                    </p>
                  </div>
                </div>
                <UBadge
                  :label="t(`dashboard.vaki.state.${member.state}`)"
                  :color="stateColor[member.state]"
                  variant="soft"
                  size="sm"
                />
              </div>

              <p
                v-if="member.bio"
                class="text-sm text-toned italic leading-relaxed"
              >
                {{ member.bio }}
              </p>

              <UCollapsible v-if="member.body">
                <template #default="{ open }">
                  <UButton
                    variant="ghost"
                    color="neutral"
                    size="xs"
                    class="w-full justify-between"
                    :label="t('dashboard.vaki.read_more')"
                  >
                    <template #trailing>
                      <Motion
                        as="span"
                        :animate="{ rotate: open ? 180 : 0 }"
                        :transition="{ duration: 0.3 }"
                      >
                        <UIcon
                          name="i-lucide-chevron-down"
                          class="size-3"
                        />
                      </Motion>
                    </template>
                  </UButton>
                </template>
                <template #content>
                  <ContentRenderer
                    :value="member"
                    class="text-sm text-toned leading-relaxed pt-2"
                  />
                </template>
              </UCollapsible>

              <div class="flex items-center gap-4 text-xs text-muted pt-1 border-t border-default">
                <span>{{ member.stories }} {{ t('dashboard.vaki.stories') }}</span>
                <span>{{ member.offerings }} {{ t('dashboard.vaki.offerings') }}</span>
                <span
                  v-if="member.location"
                  class="ml-auto truncate"
                >{{ member.location }}</span>
              </div>
            </div>
          </UCard>
        </Motion>
      </div>
    </div>
  </div>
</template>
