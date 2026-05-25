<script setup lang="ts">
import { Motion, AnimatePresence } from 'motion-v'

interface ArchiveEntry {
  slug: string
  title: string
  type: 'audio' | 'image' | 'document'
  region: string
  date: string
  tags: string[]
  description: string
  public: boolean
}

const entries: ArchiveEntry[] = [
  {
    slug: 'kantele-recording-1923',
    title: 'Kanteleensoitto, Sortavala 1923',
    type: 'audio',
    region: 'Karjala',
    date: '1923',
    tags: ['kantele', 'musiikki', 'karjala'],
    description: 'Vanha kanteleensoittoäänitys Sortavalasta.',
    public: true
  },
  {
    slug: 'taikakaava-pohjanmaa',
    title: 'Taikakaava, Pohjanmaa 1887',
    type: 'document',
    region: 'Pohjanmaa',
    date: '1887',
    tags: ['loitsu', 'taikuus', 'pohjanmaa'],
    description: 'Käsinkirjoitettu taikakaava 1800-luvulta.',
    public: true
  },
  {
    slug: 'nakki-kuva',
    title: 'Näkki-aiheinen maalaus',
    type: 'image',
    region: 'Häme',
    date: '1901',
    tags: ['näkki', 'kuvataide', 'häme'],
    description: 'Öljyvärimaalaus vesihengettärestä.',
    public: false
  }
]

const typeIcons: Record<string, string> = {
  audio: 'i-lucide-music',
  image: 'i-lucide-image',
  document: 'i-lucide-file-text'
}

const search = ref('')
const selected = ref<ArchiveEntry | null>(null)
const visible = ref(false)

onMounted(() => {
  visible.value = true
})

const filtered = computed(() =>
  entries.filter(e =>
    e.title.toLowerCase().includes(search.value.toLowerCase())
    || e.tags.some(t => t.includes(search.value.toLowerCase()))
  )
)

function open(entry: ArchiveEntry) {
  selected.value = entry
}

function close() {
  selected.value = null
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <AnimatePresence>
      <Motion
        v-if="visible && !selected"
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :exit="{ opacity: 0, y: -8 }"
        :transition="{ type: 'spring', stiffness: 280, damping: 24 }"
      >
        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-highlighted">
              {{ $t('hamy.title') }}
            </h2>
            <UBadge
              color="neutral"
              variant="soft"
              :label="$t('hamy.entries', { count: filtered.length })"
            />
          </div>

          <UInput
            v-model="search"
            icon="i-lucide-search"
            :placeholder="$t('hamy.search')"
            color="primary"
          />

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <AnimatePresence>
              <Motion
                v-for="entry in filtered"
                :key="entry.slug"
                :initial="{ opacity: 0, scale: 0.96, y: 12 }"
                :animate="{ opacity: 1, scale: 1, y: 0 }"
                :exit="{ opacity: 0, scale: 0.96, y: -8 }"
                :transition="{ type: 'spring', stiffness: 280, damping: 24 }"
                :while-hover="{ scale: 1.01 }"
                :while-tap="{ scale: 0.99 }"
              >
                <UCard
                  class="cursor-pointer h-full"
                  @click="open(entry)"
                >
                  <div class="flex flex-col gap-2">
                    <div class="flex items-start justify-between gap-2">
                      <div class="flex items-center gap-2">
                        <UIcon
                          :name="typeIcons[entry.type]"
                          class="size-4 text-primary shrink-0"
                        />
                        <span class="text-sm font-medium text-highlighted">{{ entry.title }}</span>
                      </div>
                      <UBadge
                        :color="entry.public ? 'success' : 'neutral'"
                        variant="soft"
                        size="sm"
                        :label="entry.public ? $t('hamy.public') : $t('hamy.private')"
                      />
                    </div>

                    <p class="text-xs text-muted">
                      {{ entry.description }}
                    </p>

                    <div class="flex items-center justify-between">
                      <div class="flex flex-wrap gap-1">
                        <UBadge
                          v-for="tag in entry.tags"
                          :key="tag"
                          color="primary"
                          variant="subtle"
                          size="sm"
                          :label="tag"
                        />
                      </div>
                      <span class="text-xs text-dimmed">{{ entry.region }}, {{ entry.date }}</span>
                    </div>
                  </div>
                </UCard>
              </Motion>
            </AnimatePresence>

            <AnimatePresence>
              <Motion
                v-if="filtered.length === 0"
                key="empty"
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                :exit="{ opacity: 0 }"
                :transition="{ duration: 0.2 }"
                class="col-span-2 py-12 text-center text-muted text-sm"
              >
                {{ $t('hamy.empty', { search }) }}
              </Motion>
            </AnimatePresence>
          </div>
        </div>
      </Motion>
    </AnimatePresence>

    <AnimatePresence>
      <Motion
        v-if="selected"
        :initial="{ opacity: 0, x: 20 }"
        :animate="{ opacity: 1, x: 0 }"
        :exit="{ opacity: 0, x: 20 }"
        :transition="{ type: 'spring', stiffness: 280, damping: 24 }"
      >
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <UButton
              icon="i-lucide-arrow-left"
              color="neutral"
              variant="ghost"
              size="sm"
              @click="close"
            />
            <span class="text-xs text-muted">{{ $t('hamy.back') }}</span>
          </div>

          <UCard>
            <div class="flex flex-col gap-4">
              <div class="flex items-start justify-between gap-4">
                <div class="flex items-center gap-2">
                  <UIcon
                    :name="typeIcons[selected.type]"
                    class="size-5 text-primary"
                  />
                  <h3 class="text-lg font-semibold text-highlighted">
                    {{ selected.title }}
                  </h3>
                </div>
                <UBadge
                  :color="selected.public ? 'success' : 'neutral'"
                  variant="soft"
                  :label="selected.public ? $t('hamy.public') : $t('hamy.private')"
                />
              </div>

              <USeparator />

              <div class="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p class="text-toned text-xs uppercase tracking-widest mb-1">
                    {{ $t('hamy.region') }}
                  </p>
                  <p class="text-default">
                    {{ selected.region }}
                  </p>
                </div>
                <div>
                  <p class="text-toned text-xs uppercase tracking-widest mb-1">
                    {{ $t('hamy.year') }}
                  </p>
                  <p class="text-default">
                    {{ selected.date }}
                  </p>
                </div>
                <div class="col-span-2">
                  <p class="text-toned text-xs uppercase tracking-widest mb-1">
                    {{ $t('hamy.description') }}
                  </p>
                  <p class="text-default">
                    {{ selected.description }}
                  </p>
                </div>
                <div class="col-span-2">
                  <p class="text-toned text-xs uppercase tracking-widest mb-1">
                    {{ $t('hamy.tags') }}
                  </p>
                  <div class="flex flex-wrap gap-1 mt-1">
                    <UBadge
                      v-for="tag in selected.tags"
                      :key="tag"
                      color="primary"
                      variant="subtle"
                      :label="tag"
                    />
                  </div>
                </div>
              </div>

              <USeparator />

              <div class="bg-muted rounded-lg h-32 flex items-center justify-center">
                <div class="flex flex-col items-center gap-2 text-muted">
                  <UIcon
                    :name="typeIcons[selected.type]"
                    class="size-8"
                  />
                  <span class="text-xs">{{ $t('hamy.preview') }}</span>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </Motion>
    </AnimatePresence>
  </div>
</template>
