<script setup lang="ts">
import { Motion } from 'motion-v'
import type { LuotoEnCollectionItem, LuotoFiCollectionItem, VakiEnCollectionItem, VakiFiCollectionItem, TalkooEnCollectionItem, TalkooFiCollectionItem, KaivoEnCollectionItem, KaivoFiCollectionItem } from '@nuxt/content'
import type { ColOr } from '~/types/resource'

type LuotoItem = LuotoEnCollectionItem | LuotoFiCollectionItem
type VakiItem = VakiEnCollectionItem | VakiFiCollectionItem
type TalkooItem = TalkooEnCollectionItem | TalkooFiCollectionItem
type KaivoItem = KaivoEnCollectionItem | KaivoFiCollectionItem

const { t } = useI18n()

const [
  { data: stories },
  { data: members },
  { data: events },
  { data: threads }
] = await Promise.all([
  useCollection<LuotoItem>('luoto'),
  useCollection<VakiItem>('vaki'),
  useCollection<TalkooItem>('talkoo'),
  useCollection<KaivoItem>('kaivo')
])

const stats = computed(() => [
  { label: t('dashboard.stats.members'), value: members.value?.length ?? 0, icon: 'i-lucide-users' },
  { label: t('dashboard.stats.stories'), value: stories.value?.length ?? 0, icon: 'i-lucide-book-open' },
  { label: t('dashboard.stats.gatherings'), value: events.value?.filter(e => e.state === 'upcoming').length ?? 0, icon: 'i-lucide-calendar' },
  { label: t('dashboard.stats.online'), value: members.value?.filter(m => m.state === 'flowing').length ?? 0, icon: 'i-lucide-radio' }
])

const upcomingEvents = computed(() => events.value?.filter(e => e.state !== 'past').slice(0, 3))
const recentStories = computed(() => stories.value?.slice(0, 3))
const topMembers = computed(() => members.value?.slice(0, 4))
const hotThreads = computed(() => threads.value?.slice(0, 4))

const ripples = ref(3)
const openRipples = () => {
  ripples.value = 0
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay }
})

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4, delay }
})

const localePath = useLocalePath()
</script>

<template>
  <div class="min-h-screen bg-default">
    <Motion
      as="header"
      v-bind="fadeIn()"
      class="border-b border-default bg-elevated px-6 py-4"
    >
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <UIcon
            name="i-lucide-waves"
            class="size-6 text-primary"
          />
          <span class="text-lg font-semibold text-highlighted tracking-wide">{{ t('dashboard.nav.title') }}</span>
          <UBadge
            :label="t('dashboard.nav.badge')"
            variant="soft"
            color="primary"
            size="sm"
          />
        </div>

        <UChip
          :text="ripples"
          color="primary"
          size="lg"
          :show="ripples > 0"
        >
          <Motion
            as="button"
            :animate="ripples > 0 ? { scale: [1, 1.15, 1] } : { scale: 1 }"
            :transition="ripples > 0 ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } : {}"
            class="flex items-center justify-center size-9 rounded-md text-muted hover:text-primary hover:bg-primary/10 transition-colors"
            @click="openRipples"
          >
            <UIcon
              name="i-lucide-droplets"
              class="size-5"
            />
          </Motion>
        </UChip>
      </div>
    </Motion>

    <div class="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <Motion
        as="div"
        v-bind="fadeUp(0.05)"
      >
        <UCard>
          <div class="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p class="text-sm text-muted mb-1">
                {{ t('dashboard.welcome.greeting', { name: 'Aino' }) }}
              </p>
              <h1 class="text-2xl font-semibold text-highlighted">
                {{ t('dashboard.welcome.title') }}
              </h1>
              <p class="text-sm text-toned mt-1">
                {{ t('dashboard.welcome.subtitle', { count: recentStories?.length ?? 0 }) }}
              </p>
            </div>
            <div class="flex gap-2">
              <UButton
                icon="i-lucide-feather"
                :label="t('dashboard.buttons.share_story')"
                color="primary"
                :to="localePath('/')"
              />
              <UButton
                icon="i-lucide-map"
                :label="t('dashboard.buttons.explore_lore')"
                color="secondary"
                :to="localePath('/luoto/kalevala')"
              />
            </div>
          </div>
        </UCard>
      </Motion>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Motion
          v-for="(stat, i) in stats"
          :key="stat.label"
          as="div"
          v-bind="fadeUp(0.1 + i * 0.07)"
          :while-hover="{ scale: 1.02 }"
          :transition="{ duration: 0.5, delay: 0.1 + i * 0.07 }"
        >
          <UCard class="h-full">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-xs text-muted uppercase tracking-widest mb-1">
                  {{ stat.label }}
                </p>
                <p class="text-2xl font-semibold text-highlighted">
                  {{ stat.value }}
                </p>
              </div>
              <UIcon
                :name="stat.icon"
                class="size-5 text-primary opacity-60 mt-0.5"
              />
            </div>
          </UCard>
        </Motion>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-4">
          <Motion
            as="div"
            v-bind="fadeIn(0.3)"
            class="flex items-center justify-between"
          >
            <h2 class="font-semibold text-highlighted">
              {{ t('dashboard.sections.recent_stories') }}
            </h2>
            <UButton
              :label="t('dashboard.buttons.see_all')"
              variant="link"
              color="primary"
              trailing-icon="i-lucide-arrow-right"
              size="sm"
              :to="localePath('/luoto')"
            />
          </Motion>

          <Motion
            v-for="(story, i) in recentStories"
            :key="story.path"
            as="div"
            v-bind="fadeUp(0.35 + i * 0.1)"
            :while-hover="{ x: 3 }"
            :transition="{ duration: 0.5, delay: 0.35 + i * 0.1 }"
          >
            <UCard>
              <div class="flex gap-4">
                <UAvatar
                  :src="story.avatar"
                  :alt="story.author"
                  size="md"
                />
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 flex-wrap mb-1">
                    <span class="font-medium text-sm text-highlighted">{{ story.author }}</span>
                    <UBadge
                      :label="story.tag"
                      variant="soft"
                      :color="(story.tagColor as ColOr)"
                      size="xs"
                    />
                    <span class="text-xs text-muted ml-auto">{{ story.time }}</span>
                  </div>
                  <p class="text-sm text-default italic leading-relaxed line-clamp-2">
                    {{ story.description }}
                  </p>
                  <div class="flex items-center gap-4 mt-3">
                    <UButton
                      :label="String(story.likes)"
                      icon="i-lucide-heart"
                      variant="ghost"
                      color="neutral"
                      size="xs"
                    />
                    <UButton
                      :label="t('dashboard.actions.replies', { n: story.replies })"
                      icon="i-lucide-message-circle"
                      variant="ghost"
                      color="neutral"
                      size="xs"
                    />
                    <UButton
                      :label="t('dashboard.buttons.share')"
                      icon="i-lucide-share-2"
                      variant="ghost"
                      color="neutral"
                      size="xs"
                      class="ml-auto"
                    />
                  </div>
                </div>
              </div>
            </UCard>
          </Motion>
        </div>

        <div class="space-y-6">
          <Motion
            as="div"
            v-bind="fadeUp(0.4)"
          >
            <UCard>
              <template #header>
                <div class="flex items-center justify-between">
                  <span class="font-semibold text-sm text-highlighted">{{ t('dashboard.sections.spirit_keepers') }}</span>
                  <UButton
                    :label="t('dashboard.buttons.see_all')"
                    variant="link"
                    color="primary"
                    size="xs"
                    :to="localePath('/vaki')"
                  />
                </div>
              </template>
              <div class="space-y-3">
                <Motion
                  v-for="(member, i) in topMembers"
                  :key="member.path"
                  as="div"
                  v-bind="fadeIn(0.5 + i * 0.08)"
                  class="flex items-center gap-3"
                >
                  <UAvatar
                    :src="member.avatar"
                    :alt="member.name"
                    size="sm"
                  />
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-highlighted truncate">
                      {{ member.name }}
                    </p>
                    <p class="text-xs text-muted">
                      {{ member.role }}
                    </p>
                  </div>
                  <UBadge
                    :label="String(member.stories)"
                    variant="soft"
                    color="primary"
                    size="xs"
                  />
                </Motion>
              </div>
            </UCard>
          </Motion>

          <Motion
            as="div"
            v-bind="fadeUp(0.5)"
          >
            <UCard>
              <template #header>
                <div class="flex items-center justify-between">
                  <span class="font-semibold text-sm text-highlighted">{{ t('dashboard.sections.gatherings') }}</span>
                  <UButton
                    :label="t('dashboard.buttons.see_all')"
                    variant="link"
                    color="primary"
                    size="xs"
                    :to="localePath('/talkoo')"
                  />
                </div>
              </template>
              <div class="space-y-3">
                <div
                  v-for="event in upcomingEvents"
                  :key="event.path"
                  class="flex gap-3"
                >
                  <div class="flex flex-col items-center justify-center bg-primary/10 text-primary rounded px-2 py-1 text-center min-w-10">
                    <span class="text-xs font-bold leading-none">{{ event.day }}</span>
                    <span class="text-[10px] uppercase tracking-wide">{{ event.month }}</span>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-highlighted">
                      {{ event.title }}
                    </p>
                    <p class="text-xs text-muted">
                      {{ event.desc }}
                    </p>
                  </div>
                </div>
              </div>
              <template #footer>
                <UButton
                  :label="t('dashboard.buttons.all_gatherings')"
                  variant="ghost"
                  color="primary"
                  size="sm"
                  block
                  trailing-icon="i-lucide-arrow-right"
                  :to="localePath('/talkoo')"
                />
              </template>
            </UCard>
          </Motion>

          <Motion
            as="div"
            v-bind="fadeUp(0.6)"
          >
            <UCard>
              <template #header>
                <span class="font-semibold text-sm text-highlighted">{{ t('dashboard.sections.hot_threads') }}</span>
              </template>
              <div class="space-y-2">
                <Motion
                  v-for="(thread, i) in hotThreads"
                  :key="thread.path"
                  as="div"
                  v-bind="fadeIn(0.65 + i * 0.07)"
                  :while-hover="{ x: 4 }"
                  :transition="{ duration: 0.4, delay: 0.65 + i * 0.07 }"
                  class="flex items-center justify-between gap-2 py-1.5 border-b border-default last:border-0 cursor-pointer"
                >
                  <p class="text-sm text-default truncate">
                    {{ thread.title }}
                  </p>
                  <UBadge
                    :label="t('dashboard.actions.replies', { n: thread.replies })"
                    variant="soft"
                    color="neutral"
                    size="xs"
                  />
                </Motion>
              </div>
            </UCard>
          </Motion>
        </div>
      </div>
    </div>
  </div>
</template>
