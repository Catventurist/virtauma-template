<script setup lang="ts">
import { Motion } from 'motion-v'
import type { KaivoEnCollectionItem, KaivoFiCollectionItem } from '@nuxt/content'
import type { ColOr } from '~/types/resource'

type KaivoItem = KaivoEnCollectionItem | KaivoFiCollectionItem

const { t } = useI18n()

const { data: intents } = await useCollection<KaivoItem>('kaivo')

const stateColor = {
  ripple: 'info',
  flowing: 'primary',
  settled: 'success',
  dissolved: 'neutral'
} as const

const kindColor = {
  act: 'primary',
  make: 'success',
  release: 'warning',
  learn: 'info',
  give: 'secondary',
  tend: 'teal'
} as const

const stateLabel = computed(() => ({
  ripple: t('dashboard.kaivo.state.ripple'),
  flowing: t('dashboard.kaivo.state.flowing'),
  settled: t('dashboard.kaivo.state.settled'),
  dissolved: t('dashboard.kaivo.state.dissolved')
}))

const kindLabel = computed(() => ({
  act: t('dashboard.kaivo.kind.act'),
  make: t('dashboard.kaivo.kind.make'),
  release: t('dashboard.kaivo.kind.release'),
  learn: t('dashboard.kaivo.kind.learn'),
  give: t('dashboard.kaivo.kind.give'),
  tend: t('dashboard.kaivo.kind.tend')
}))

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay }
})
</script>

<template>
  <div class="min-h-screen bg-default">
    <div class="max-w-3xl mx-auto px-6 py-12 space-y-10">
      <Motion
        as="div"
        v-bind="fadeUp(0)"
        class="space-y-4"
      >
        <div class="space-y-1">
          <h1 class="text-3xl font-semibold text-highlighted">
            {{ t('dashboard.sections.hot_threads') }}
          </h1>
          <p class="text-sm text-muted">
            {{ t('dashboard.kaivo.subtitle') }}
          </p>
        </div>
        <UButton
          icon="i-lucide-circle-dot"
          :label="t('dashboard.kaivo.cast')"
          color="primary"
          size="sm"
        />
      </Motion>

      <div class="space-y-4">
        <Motion
          v-for="(intent, i) in intents"
          :key="intent.path"
          as="div"
          v-bind="fadeUp(0.05 + i * 0.07)"
          :while-hover="{ x: 3 }"
          :transition="{ duration: 0.4, delay: 0.05 + i * 0.07 }"
        >
          <UCard>
            <div class="flex flex-col gap-3">
              <div class="flex items-start justify-between gap-3">
                <p class="font-medium text-highlighted leading-snug">
                  {{ intent.title }}
                </p>
                <UBadge
                  :label="stateLabel[intent.state]"
                  :color="stateColor[intent.state]"
                  variant="soft"
                  size="sm"
                  class="shrink-0"
                />
              </div>

              <UCollapsible v-if="intent.body">
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
                    :value="intent"
                    class="text-sm text-toned leading-relaxed pt-2"
                  />
                </template>
              </UCollapsible>

              <div class="flex items-center gap-3 pt-1 border-t border-default">
                <UBadge
                  :label="kindLabel[intent.kind]"
                  :color="(kindColor[intent.kind] as ColOr)"
                  variant="subtle"
                  size="sm"
                />
                <div class="flex items-center gap-3 ml-auto text-xs text-muted">
                  <UButton
                    icon="i-lucide-eye"
                    :label="t('dashboard.kaivo.witnesses', { n: intent.witness })"
                    variant="ghost"
                    color="neutral"
                    size="sm"
                  />
                  <UButton
                    icon="i-lucide-message-circle"
                    :label="t('dashboard.actions.replies', { n: intent.replies })"
                    variant="ghost"
                    color="neutral"
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </UCard>
        </Motion>
      </div>
    </div>
  </div>
</template>
