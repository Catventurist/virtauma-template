<script setup lang="ts">
import { AnimatePresence, Motion } from 'motion-v'

definePageMeta({ layout: 'luoto' })

const { breadcrumb, currentPath, page, surround, toRoutePath } = useLuotoNav()
const { t } = useI18n()
const localePath = useLocalePath()

const copied = ref(false)
async function copyPath() {
  await navigator.clipboard.writeText(toRoutePath(currentPath.value))
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

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
  <div class="relative flex flex-col flex-1 min-h-0 overflow-y-auto">
    <AnimatePresence mode="wait">
      <Motion
        v-if="page"
        :key="currentPath"
        class="flex flex-col flex-1"
        :initial="{ opacity: 0, y: 10, filter: 'blur(4px)' }"
        :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :exit="{ opacity: 0, y: -6, filter: 'blur(4px)' }"
        :transition="{ duration: 0.3, ease: 'easeOut' }"
      >
        <div class="sticky top-0 z-10 h-16 flex items-center gap-2 px-5 py-2.5 text-sm backdrop-blur-md bg-lake-400/10 border-b border-lake-300/40">
          <UButton
            :to="localePath('/')"
            icon="i-lucide-home"
            variant="ghost"
            color="neutral"
            size="xs"
          />

          <USeparator
            orientation="vertical"
            class="h-4"
          />

          <UBreadcrumb
            :items="breadcrumb"
            separator-icon="i-lucide-chevron-right"
            class="min-w-0 flex-1"
          />
          <Motion
            :initial="{ opacity: 0, x: 24 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.4, ease: 'easeOut', delay: 0.2 }"
            class="flex items-center gap-2"
          >
            <LocaleSel />
            <ColorModeButton />
            <UTooltip :text="copied ? t('luoto.copied') : t('luoto.copy')">
              <UButton
                :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
                variant="ghost"
                size="sm"
                :color="copied ? 'success' : 'neutral'"
                @click="copyPath"
              />
            </UTooltip>
          </Motion>
        </div>

        <div class="p-8 max-w-3xl mx-auto w-full">
          <ContentRenderer
            :value="page"
            class="prose dark:prose-invert max-w-none"
          />

          <UContentSurround
            v-if="surround"
            :surround="surround"
            class="mt-12"
          />
        </div>
      </Motion>

      <Motion
        v-else
        key="empty"
        class="flex flex-col items-center justify-center flex-1 gap-3 bg-radial-[at_50%_60%] from-lake-400/8 to-transparent to-70%"
        :initial="{ opacity: 0, scale: 0.95 }"
        :animate="{ opacity: 1, scale: 1 }"
        :exit="{ opacity: 0, scale: 0.95 }"
        :transition="{ duration: 0.3, ease: 'easeOut' }"
      >
        <UIcon
          name="i-lucide-droplets"
          class="size-12 text-primary opacity-25"
        />
        <p class="text-muted text-xs">
          {{ t('luoto.prompt') }}
        </p>
      </Motion>
    </AnimatePresence>
  </div>
</template>
