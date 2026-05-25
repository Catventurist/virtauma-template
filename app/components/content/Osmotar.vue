<script setup lang="ts">
import { Motion, AnimatePresence } from 'motion-v'

interface OsmotarItem {
  id: string
  title: string
  description: string
  depth: 'pinta' | 'virta' | 'syvyys' | 'pohja' | 'kaiku'
  kind: 'feature' | 'fix' | 'ritual' | 'lore'
  eta?: string
  tags: string[]
}

const items: OsmotarItem[] = [
  {
    id: '1',
    title: 'Hämy Upload',
    description: 'Full upload flow for the media archive with metadata editor.',
    depth: 'syvyys',
    kind: 'feature',
    eta: 'Kesä 2026',
    tags: ['archive', 'upload', 'media']
  },
  {
    id: '2',
    title: 'LocalStorage Persistence',
    description: 'Persist Teemaus settings across page refreshes.',
    depth: 'virta',
    kind: 'fix',
    eta: 'Toukokuu 2026',
    tags: ['theme', 'storage']
  },
  {
    id: '3',
    title: 'Kaivo Public Wells',
    description: 'Allow intentions to be shared publicly within a community.',
    depth: 'pohja',
    kind: 'feature',
    eta: 'Syksy 2026',
    tags: ['kaivo', 'community', 'intentions']
  },
  {
    id: '4',
    title: 'Token Exchange',
    description: 'SULA to JÄÄ exchange with full wallet integration.',
    depth: 'syvyys',
    kind: 'feature',
    eta: 'Kesä 2026',
    tags: ['wallet', 'tokens', 'sula', 'jaa']
  },
  {
    id: '5',
    title: 'Päivätär & Kuutar',
    description: 'Lore pages for the sun and moon maidens referenced in Vellamo.',
    depth: 'virta',
    kind: 'lore',
    eta: 'Toukokuu 2026',
    tags: ['lore', 'paivatar', 'kuutar']
  },
  {
    id: '6',
    title: 'Koski Dissolution',
    description: 'Automatic 24h content expiry for Koski posts.',
    depth: 'pinta',
    kind: 'ritual',
    eta: 'Toukokuu 2026',
    tags: ['koski', 'ephemeral', 'ritual']
  },
  {
    id: '7',
    title: 'Community Creation',
    description: 'Guided flow for bringing a new community into existence.',
    depth: 'pohja',
    kind: 'feature',
    eta: 'Talvi 2026',
    tags: ['community', 'onboarding']
  },
  {
    id: '8',
    title: '404 Mythology Page',
    description: 'A not-found page in the voice of the platform.',
    depth: 'kaiku',
    kind: 'lore',
    tags: ['lore', 'error', 'ui']
  },
  {
    id: '9',
    title: 'Rytmi Scheduler',
    description: 'Recurring ritual scheduling with calendar integration.',
    depth: 'syvyys',
    kind: 'ritual',
    eta: 'Syksy 2026',
    tags: ['rytmi', 'calendar', 'ritual']
  },
  {
    id: '10',
    title: 'Notification System',
    description: 'Activity alerts for community events and decisions.',
    depth: 'pohja',
    kind: 'feature',
    eta: 'Talvi 2026',
    tags: ['notifications', 'community']
  }
]

const depths: OsmotarItem['depth'][] = ['pinta', 'virta', 'syvyys', 'pohja', 'kaiku']
const kinds: OsmotarItem['kind'][] = ['feature', 'fix', 'ritual', 'lore']
const { t } = useI18n()

const depthGradients: Record<OsmotarItem['depth'], string> = {
  pinta: 'bg-gradient-to-r from-sky-300/10 via-sky-200/5 to-sky-300/10',
  virta: 'bg-gradient-to-r from-sky-500/15 via-sky-400/10 to-sky-500/15',
  syvyys: 'bg-gradient-to-r from-blue-700/20 via-blue-600/15 to-blue-700/20',
  pohja: 'bg-gradient-to-r from-blue-900/25 via-blue-800/20 to-blue-900/25',
  kaiku: 'bg-gradient-to-r from-slate-800/20 via-slate-700/15 to-slate-800/20'
}

const depthBorders: Record<OsmotarItem['depth'], string> = {
  pinta: 'border-sky-400/20',
  virta: 'border-sky-500/20',
  syvyys: 'border-blue-700/20',
  pohja: 'border-blue-900/30',
  kaiku: 'border-slate-700/20'
}

const kindColors: Record<OsmotarItem['kind'], 'primary' | 'success' | 'warning' | 'info'> = {
  feature: 'primary',
  fix: 'success',
  ritual: 'warning',
  lore: 'info'
}

const activeFilter = ref<OsmotarItem['kind'] | null>(null)
const selected = ref<OsmotarItem | null>(null)
const visible = ref(false)

onMounted(() => {
  visible.value = true
})

function filteredAtDepth(depth: OsmotarItem['depth']): OsmotarItem[] {
  return items.filter(i =>
    i.depth === depth
    && (activeFilter.value === null || i.kind === activeFilter.value)
  )
}

function select(item: OsmotarItem) {
  selected.value = selected.value?.id === item.id ? null : item
}

function toggleFilter(kind: OsmotarItem['kind']) {
  activeFilter.value = activeFilter.value === kind ? null : kind
  selected.value = null
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap items-center gap-2">
      <Motion
        v-for="kind in kinds"
        :key="kind"
        :while-hover="{ scale: 1.05 }"
        :while-tap="{ scale: 0.95 }"
        :transition="{ duration: 0.12 }"
      >
        <UButton
          :label="t(`osmotar.kinds.${kind}`)"
          :variant="activeFilter === kind ? 'soft' : 'ghost'"
          :color="kindColors[kind]"
          size="sm"
          @click="toggleFilter(kind)"
        />
      </Motion>

      <UButton
        v-if="activeFilter !== null"
        icon="i-lucide-x"
        :label="t('osmotar.all')"
        color="neutral"
        variant="ghost"
        size="sm"
        @click="activeFilter = null"
      />
    </div>

    <div class="overflow-hidden rounded-lg border border-default">
      <template v-if="visible">
        <AnimatePresence>
          <Motion
            v-for="(depth, index) in depths"
            :key="depth"
            :initial="{ opacity: 0, x: -16 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ type: 'spring', stiffness: 280, damping: 24, delay: index * 0.08 }"
            class="flex flex-col sm:flex-row items-stretch border-b last:border-b-0"
            :class="depthBorders[depth]"
          >
            <div
              class="w-full sm:w-24 shrink-0 flex sm:flex-col items-center justify-center border-b sm:border-b-0 sm:border-r text-xs font-medium text-toned uppercase tracking-widest py-2 sm:py-4 px-3 sm:px-0"
              :class="[depthGradients[depth], depthBorders[depth]]"
            >
              {{ t(`osmotar.depths.${depth}`) }}
            </div>

            <div
              class="flex-1 overflow-x-auto"
              :class="depthGradients[depth]"
            >
              <div class="flex gap-3 p-3 min-h-24 min-w-max">
                <template v-if="filteredAtDepth(depth).length > 0">
                  <AnimatePresence>
                    <Motion
                      v-for="(item, itemIndex) in filteredAtDepth(depth)"
                      :key="item.id"
                      :initial="{ opacity: 0, scale: 0.95, y: 8 }"
                      :animate="{ opacity: 1, scale: 1, y: 0 }"
                      :exit="{ opacity: 0, scale: 0.95, y: 8 }"
                      :while-hover="{ scale: 1.03, y: -3 }"
                      :while-tap="{ scale: 0.97 }"
                      :transition="{ type: 'spring', stiffness: 300, damping: 25 }"
                      class="drift shrink-0 w-44"
                      :style="{ '--delay': `${itemIndex * 1.3}s` }"
                    >
                      <UCard
                        class="cursor-pointer h-full"
                        :class="selected?.id === item.id ? 'ring-1 ring-primary' : ''"
                        @click="select(item)"
                      >
                        <div class="flex flex-col gap-2">
                          <div class="flex items-start justify-between gap-1">
                            <span class="text-xs font-medium text-highlighted leading-snug">
                              {{ item.title }}
                            </span>
                            <UBadge
                              :color="kindColors[item.kind]"
                              variant="subtle"
                              size="sm"
                              :label="t(`osmotar.kinds.${item.kind}`)"
                            />
                          </div>
                          <p
                            v-if="item.eta"
                            class="text-xs text-dimmed"
                          >
                            {{ item.eta }}
                          </p>
                        </div>
                      </UCard>
                    </Motion>
                  </AnimatePresence>
                </template>

                <div
                  v-else
                  class="flex items-center px-2 text-xs text-dimmed italic"
                >
                  {{ t('osmotar.empty') }}
                </div>
              </div>
            </div>
          </Motion>
        </AnimatePresence>
      </template>

      <AnimatePresence>
        <Motion
          v-if="selected"
          :initial="{ opacity: 0, y: 12 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0, y: 12 }"
          :transition="{ type: 'spring', stiffness: 280, damping: 24 }"
          class="border-t border-default bg-elevated"
        >
          <div class="flex items-start justify-between gap-4 p-4">
            <div class="flex flex-col gap-2">
              <div class="flex flex-wrap items-center gap-2">
                <UBadge
                  :color="kindColors[selected.kind]"
                  variant="subtle"
                  :label="t(`osmotar.kinds.${selected.kind}`)"
                />
                <UBadge
                  color="neutral"
                  variant="soft"
                  :label="t(`osmotar.depths.${selected.depth}`)"
                />
                <span
                  v-if="selected.eta"
                  class="text-xs text-dimmed"
                >
                  {{ t('osmotar.eta') }}: {{ selected.eta }}
                </span>
              </div>

              <h3 class="text-sm font-semibold text-highlighted">
                {{ selected.title }}
              </h3>
              <p class="text-sm text-muted">
                {{ selected.description }}
              </p>

              <div class="flex flex-wrap gap-1">
                <UBadge
                  v-for="tag in selected.tags"
                  :key="tag"
                  color="primary"
                  variant="subtle"
                  size="sm"
                  :label="tag"
                />
              </div>
            </div>

            <UButton
              icon="i-lucide-x"
              color="neutral"
              variant="ghost"
              size="xs"
              @click="selected = null"
            />
          </div>
        </Motion>
      </AnimatePresence>
    </div>
  </div>
</template>

<style scoped>
@keyframes drift {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(4px); }
}

.drift {
  animation: drift 6s ease-in-out infinite;
  animation-delay: var(--delay, 0s);
}
</style>
