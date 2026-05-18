<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core'

const { t, locale } = useI18n()

const open = useCookie('luoto-sidebar', { default: () => true })
const { socialLinks } = useSocialLinks()
const { searchFiles, lnavigation, luotoNav, selectedValue, breadcrumb, handleSelect } = useLuotoNav()
const breakpoints = useBreakpoints({ mobile: 768 })
const isMobile = breakpoints.smaller('mobile')

watch(isMobile, (mobile) => {
  if (mobile) open.value = false
}, { immediate: true })
</script>

<template>
  <div class="flex h-dvh overflow-hidden">
    <LazyUContentSearch
      :files="searchFiles"
      :navigation="lnavigation"
    />

    <USidebar
      v-model:open="open"
      collapsible="icon"
      :style="{ '--sidebar-width': '15rem' }"
    >
      <template #header="{ state }">
        <div class="flex items-center gap-2 w-full">
          <NuxtLinkLocale
            to="/luoto"
            class="flex items-center ms-1.5 gap-2 font-semibold text-highlighted min-w-0"
          >
            <UIcon
              name="i-lucide-droplets"
              class="size-4 text-primary shrink-0"
            />
            <span
              v-if="state !== 'collapsed'"
              class="truncate"
            >
              {{ t('luoto.title') }}
            </span>
          </NuxtLinkLocale>
        </div>
      </template>

      <template #default="{ state }">
        <div class="flex flex-col gap-2 p-2">
          <UContentSearchButton
            :key="locale"
            :collapsed="state === 'collapsed'"
            size="sm"
            class="-ms-1.5"
          />
          <template v-if="state === 'collapsed'">
            <UTooltip
              v-for="item in luotoNav"
              :key="item.path"
              :text="item.title"
              :delay-duration="0"
            >
              <UButton
                :icon="item.icon || 'i-lucide-file-text'"
                color="neutral"
                variant="ghost"
                size="sm"
                block
                @click="handleSelect(undefined, item)"
              />
            </UTooltip>
          </template>
          <UTree
            v-else
            :items="luotoNav"
            :model-value="selectedValue"
            :get-key="(item) => item.path"
            :label-key="'title'"
            color="primary"
            size="md"
            @select="handleSelect"
          />
        </div>
      </template>
    </USidebar>

    <div class="flex-1 min-w-0 mx-2 overflow-y-auto bg-linear-to-b from-primary/10 to-transparent to-25%">
      <div class="flex items-center gap-2 px-4 h-16 border-b border-default sticky top-0 bg-background/75 backdrop-blur z-10">
        <UButton
          color="neutral"
          variant="ghost"
          :icon="isMobile ? 'i-lucide-menu' : 'i-lucide-panel-left'"
          @click="open = !open"
        />
        <USeparator
          orientation="vertical"
          class="h-4"
        />
        <NuxtLinkLocale
          to="/"
          class="items-center"
        >
          <UIcon
            name="i-lucide-home"
            class="mt-1"
          />
        </NuxtLinkLocale>
        <UBreadcrumb
          v-if="breadcrumb?.length"
          :items="breadcrumb"
          separator-icon="i-lucide-chevron-right"
          class="min-w-0 flex-1 hidden sm:flex"
        />
        <div class="flex-1 sm:hidden" />
        <USeparator
          orientation="vertical"
          class="h-4"
        />
        <div class="flex gap-2 items-center">
          <div class="hidden sm:flex">
            <LocaleSel />
          </div>
          <ColorModeButton />
          <VSocialLinks
            :links="socialLinks"
            class="hidden sm:flex"
          />
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>
