<script setup lang="ts">
const { t, locale } = useI18n()

const { socialLinks } = useSocialLinks()
const { searchFiles, lnavigation, luotoNav, selectedValue, breadcrumb, handleSelect } = useLuotoNav()
</script>

<template>
  <div>
    <LazyUContentSearch
      :files="searchFiles"
      :navigation="lnavigation"
    />

    <VHeader>
      <template #left>
        <UBreadcrumb
          v-if="breadcrumb?.length"
          :items="breadcrumb"
          separator-icon="i-lucide-chevron-right"
          class="min-w-0 flex-1 hidden sm:flex"
        />
      </template>
      <template #right>
        <UContentSearchButton
          :key="locale"
          size="sm"
        />
        <ClientOnly>
          <div class="hidden sm:flex">
            <LocaleSel />
          </div>
        </ClientOnly>
        <ColorModeButton />
        <VSocialLinks
          :links="socialLinks"
          class="hidden sm:flex"
        />
      </template>
    </VHeader>

    <UMain class="bg-linear-to-b from-primary/10 to-transparent to-25%">
      <UContainer>
        <UPage>
          <template #left>
            <ClientOnly>
              <UPageAside>
                <template #top>
                  <NuxtLinkLocale
                    to="/luoto"
                    class="flex items-center gap-2 font-semibold text-highlighted min-w-0 mb-2"
                  >
                    <UIcon
                      name="i-lucide-droplets"
                      class="size-4 text-primary shrink-0"
                    />
                    <span class="truncate">{{ t('luoto.title') }}</span>
                  </NuxtLinkLocale>
                  <UContentSearchButton
                    :key="locale"
                    :collapsed="false"
                    size="sm"
                  />
                </template>
                <UTree
                  :items="luotoNav"
                  :model-value="selectedValue"
                  :get-key="(item) => item.path"
                  :label-key="'title'"
                  color="primary"
                  size="md"
                  @select="handleSelect"
                />
              </UPageAside>
            </ClientOnly>
          </template>
          <slot />
        </UPage>
      </UContainer>
    </UMain>
  </div>
</template>
