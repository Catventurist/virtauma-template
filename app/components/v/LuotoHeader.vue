<script setup lang="ts">
import { Motion, AnimatePresence } from 'motion-v'
import { useWindowScroll } from '@vueuse/core'

const props = defineProps<{
  open: boolean
  breadcrumb: { label: string, to?: string }[]
}>()

defineEmits<{
  toggle: []
}>()

const route = useRoute()
const { github } = useAppConfig()

const copied = ref(false)
const { y } = useWindowScroll()

const { isBookmarked, toggle } = useBookmarks()
const bookmarked = computed(() => isBookmarked(route.path))

const currentLabel = computed(() => {
  const last = props.breadcrumb.at(-1)
  return last?.label ?? route.path
})

function toggleBookmark() {
  toggle(route.path, currentLabel.value)
}

const editUrl = computed(() =>
  github
    ? `https://github.com/${github.owner}/${github.repo}/edit/${github.branch}/${github.dir}${route.path}.md`
    : null
)

async function copyLink() {
  await navigator.clipboard.writeText(window.location.origin + route.path)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function printPage() {
  window.print()
}
</script>

<template>
  <header class="sticky top-(--ui-header-height) z-10 flex items-center gap-3 px-4 h-(--ui-header-height)/2 border-b border-primary/20 bg-linear-to-r from-primary/5 via-background/80 to-secondary/5 backdrop-blur-md">
    <UButton
      color="neutral"
      variant="ghost"
      icon="i-lucide-panel-left"
      @click="$emit('toggle')"
    />
    <ClientOnly>
      <Motion
        :initial="{ opacity: 0, y: -8 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4 }"
        as="div"
        class="flex items-center gap-3 flex-1 min-w-0"
      >
        <div class="flex items-center gap-1.5 min-w-0 flex-1">
          <span
            v-for="(item, i) in breadcrumb"
            :key="item.label"
            class="flex items-center gap-1.5 min-w-0"
          >
            <UIcon
              v-if="i > 0"
              name="i-lucide-chevron-right"
              class="size-3 text-muted shrink-0"
            />
            <NuxtLink
              v-if="item.to"
              :to="item.to"
              class="text-sm text-muted hover:text-primary transition-colors truncate"
            >
              {{ item.label }}
            </NuxtLink>
            <span
              v-else
              class="text-sm font-medium bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent truncate"
            >
              {{ item.label }}
            </span>
          </span>
        </div>
      </Motion>
    </ClientOnly>

    <div class="flex items-center gap-2 shrink-0">
      <AnimatePresence>
        <Motion
          v-if="y > 100"
          key="scroll-top"
          :initial="{ opacity: 0, scale: 0.8 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0, scale: 0.8 }"
          :transition="{ duration: 0.15 }"
        >
          <UTooltip :text="$t('header.link.top')">
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-arrow-up"
              @click="scrollToTop"
            />
          </UTooltip>
        </Motion>
      </AnimatePresence>

      <Motion
        :initial="{ opacity: 0, y: -6 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.3, delay: 0.05 }"
      >
        <UTooltip :text="$t('header.link.print')">
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-printer"
            @click="printPage"
          />
        </UTooltip>
      </Motion>

      <Motion
        v-if="editUrl"
        :initial="{ opacity: 0, y: -6 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.3, delay: 0.1 }"
      >
        <UTooltip :text="$t('header.link.edit')">
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-pencil"
            :to="editUrl"
            target="_blank"
          />
        </UTooltip>
      </Motion>

      <Motion
        :initial="{ opacity: 0, y: -6 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.3, delay: 0.15 }"
      >
        <UTooltip :text="bookmarked ? $t('header.link.bookmarked') : $t('header.link.bookmark')">
          <UButton
            color="neutral"
            variant="ghost"
            :icon="bookmarked ? 'i-lucide-bookmark-check' : 'i-lucide-bookmark'"
            :class="{ 'text-primary': bookmarked }"
            @click="toggleBookmark"
          />
        </UTooltip>
      </Motion>

      <Motion
        :initial="{ opacity: 0, y: -6 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.3, delay: 0.2 }"
      >
        <UTooltip :text="copied ? $t('header.link.copied') : $t('header.link.copy')">
          <UButton
            color="neutral"
            variant="ghost"
            :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
            :class="{ 'text-success': copied }"
            @click="copyLink"
          />
        </UTooltip>
      </Motion>

      <slot name="right" />
    </div>

    <div class="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
  </header>
</template>

<style scoped>
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.3s ease;
}
.breadcrumb-enter-from {
  opacity: 0;
  transform: translateX(-8px);
}
.breadcrumb-leave-to {
  opacity: 0;
  transform: translateX(8px);
}
</style>
