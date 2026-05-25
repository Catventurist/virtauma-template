<script setup lang="ts">
import { Motion } from 'motion-v'
import type { TalkooEnCollectionItem, TalkooFiCollectionItem } from '@nuxt/content'

type TalkooItem = TalkooEnCollectionItem | TalkooFiCollectionItem

const { t } = useI18n()

const { data: events } = await useCollection<TalkooItem>('talkoo')

const stateColor = {
  upcoming: 'primary',
  ongoing: 'success',
  past: 'neutral'
} as const

const kindColor = {
  gathering: 'primary',
  workshop: 'secondary',
  reading: 'info',
  ritual: 'warning'
} as const

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay }
})

const title = t('pages.talkoo.title')
const description = t('pages.talkoo.description')

useSeoMeta({
  title: title,
  description: description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description
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
            {{ t('dashboard.sections.gatherings') }}
          </h1>
          <p class="text-sm text-muted">
            {{ t('dashboard.talkoo.subtitle') }}
          </p>
        </div>
      </Motion>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Motion
          v-for="(event, i) in events"
          :key="event.path"
          as="div"
          v-bind="fadeUp(0.05 + i * 0.06)"
          :while-hover="{ y: -3 }"
          :transition="{ duration: 0.4, delay: 0.05 + i * 0.06 }"
        >
          <UCard class="h-full">
            <div class="flex flex-col gap-4">
              <div class="flex items-start justify-between gap-3">
                <div class="flex flex-col items-center justify-center bg-primary/10 text-primary rounded px-3 py-2 text-center min-w-14">
                  <span class="text-lg font-bold leading-none">{{ event.day }}</span>
                  <span class="text-[10px] uppercase tracking-wide mt-0.5">{{ event.month }}</span>
                  <span
                    v-if="event.year"
                    class="text-[10px] text-muted"
                  >{{ event.year }}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-highlighted leading-snug">
                    {{ event.title }}
                  </p>
                  <p class="text-xs text-muted mt-0.5">
                    {{ event.desc }}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-2 flex-wrap">
                <UBadge
                  :label="t(`dashboard.talkoo.kind.${event.kind}`)"
                  :color="kindColor[event.kind]"
                  variant="soft"
                  size="sm"
                />
                <UBadge
                  :label="t(`dashboard.talkoo.state.${event.state}`)"
                  :color="stateColor[event.state]"
                  variant="subtle"
                  size="sm"
                />
              </div>

              <UCollapsible v-if="event.body">
                <template #default="{ open }">
                  <UButton
                    variant="ghost"
                    color="neutral"
                    size="sm"
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
                    :value="event"
                    class="text-sm text-toned leading-relaxed pt-2"
                  />
                </template>
              </UCollapsible>

              <div class="flex items-center gap-3 text-xs text-muted pt-1 border-t border-default">
                <span v-if="event.host">{{ t('dashboard.talkoo.host') }} {{ event.host }}</span>
                <span
                  v-if="event.capacity"
                  class="ml-auto"
                >{{ event.capacity }} {{ t('dashboard.talkoo.spots') }}</span>
                <UButton
                  v-if="event.url"
                  :to="event.url"
                  target="_blank"
                  variant="ghost"
                  color="primary"
                  size="sm"
                  :label="event.location ?? event.url"
                  trailing-icon="i-lucide-arrow-up-right"
                  class="ml-auto"
                />
              </div>
            </div>
          </UCard>
        </Motion>
      </div>
    </div>
  </div>
</template>
