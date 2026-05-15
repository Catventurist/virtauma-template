<script setup lang="ts">
const { t, locale } = useI18n()

const open = useCookie('luoto-sidebar', { default: () => true })

const { lnavigation, searchFiles, treeItems, selectedValue } = useLuotoNav()
</script>

<template>
  <div class="flex h-dvh overflow-hidden">
    <USidebar
      v-model:open="open"
      collapsible="icon"
      :style="{ '--sidebar-width': '15rem' }"
    >
      <template #header="{ state }">
        <div class="flex items-center gap-2 w-full">
          <NuxtLinkLocale
            to="/luoto"
            class="flex items-center gap-2 font-semibold text-highlighted min-w-0"
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

      <div class="flex flex-col gap-2 p-2">
        <LazyUContentSearch
          :files="searchFiles"
          :navigation="lnavigation"
        />
        <UContentSearchButton
          :key="locale"
          :collapsed="false"
          size="sm"
        />
        <UTree
          :items="treeItems"
          :default-value="selectedValue"
          :get-key="(item) => item.path"
          color="primary"
          size="md"
        />
      </div>
    </USidebar>

    <div class="flex-1 min-w-0 overflow-y-auto bg-linear-to-b from-primary/10 to-transparent to-25%">
      <slot />
    </div>
  </div>
</template>
