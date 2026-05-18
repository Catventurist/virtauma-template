<script setup lang="ts">
import { Motion } from 'motion-v'
import type { AinoEnCollectionItem, AinoFiCollectionItem, PageCollections } from '@nuxt/content'
import type { UserProps } from '@nuxt/ui'

const { locale, t } = useI18n()

const title = t('aino.title')
const description = t('aino.description')

const { data: entries } = await useAsyncData<(AinoEnCollectionItem | AinoFiCollectionItem)[]>(
  `aino-${locale.value}`,
  async () => {
    const content = await queryCollection(`aino_${locale.value}` as keyof PageCollections).all() as (AinoEnCollectionItem | AinoFiCollectionItem)[]
    if (!content?.length && locale.value !== 'en') {
      return await queryCollection('aino_en').all() as AinoEnCollectionItem[]
    }
    return content.sort((a, b) =>
      new Date(b.date as string).getTime() - new Date(a.date as string).getTime()
    )
  },
  { watch: [locale] }
)

function formatDate(date: unknown) {
  return new Intl.DateTimeFormat(locale.value, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }).format(new Date(String(date)))
}

function entryBadge(entry: AinoEnCollectionItem | AinoFiCollectionItem) {
  return entry.version ? `v${entry.version}` : entry.badge
}

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description
})
</script>

<template>
  <UContainer>
    <UChangelogVersions>
      <UChangelogVersion
        v-for="(entry, index) in entries"
        :key="entry.path"
        :title="entry.title"
        :description="entry.description"
        :date="String(entry.date)"
        :image="entry.image"
        :to="entry.to"
        :target="entry.target"
        :authors="(entry.builders as UserProps[])"
      >
        <template #badge>
          <Motion
            as="span"
            :while-hover="{ scale: 1.05 }"
            :while-tap="{ scale: 0.95 }"
            :transition="{ duration: 0.15 }"
          >
            <UBadge
              :label="entryBadge(entry)"
              variant="soft"
            />
          </Motion>
        </template>

        <template #title>
          <Motion
            as="span"
            :while-hover="{ x: 4 }"
            :transition="{ duration: 0.2 }"
          >
            {{ entry.title }}
          </Motion>
        </template>

        <template #date>
          {{ formatDate(entry.date) }}
        </template>

        <template #body>
          <Motion
            as="div"
            :initial="{ opacity: 0, y: 16 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.4, delay: index * 0.1 }"
            :viewport="{ once: true }"
          >
            <ContentRenderer :value="entry" />
          </Motion>
        </template>
      </UChangelogVersion>
    </UChangelogVersions>
  </UContainer>
</template>
