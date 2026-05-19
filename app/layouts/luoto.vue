<script setup lang="ts">
const { t, locale } = useI18n()
const open = useCookie('luoto-sidebar', { default: () => true })
const { luotoNav, breadcrumb, selectedValue, handleSelect } = useLuotoNav()
</script>

<template>
  <div>
    <VHeader />
    <div class="flex">
      <USidebar
        v-model:open="open"
        collapsible="icon"
        :style="{ '--sidebar-width': '15rem' }"
        :ui="{
          header: 'flex items-center gap-1.5 overflow-hidden px-4 min-h-[calc(var(--ui-header-height)/2)]',
          gap: 'pt-(--ui-header-height)',
          container: 'top-(--ui-header-height) h-[calc(100svh-var(--ui-header-height))]'
        }"
      >
        <template #header="{ state }">
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
        </template>

        <template #default="{ state }">
          <div class="flex flex-col gap-2 p-2">
            <UContentSearchButton
              id="locale"
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
                  :icon="(item.icon as string) || 'i-lucide-file-text'"
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
              @select="(e, item) => { handleSelect(e, item); if (!item.children?.length) open = false }"
            />
          </div>
        </template>
      </USidebar>

      <div class="flex-1 flex flex-col min-w-0">
        <VLuotoHeader
          :open="open"
          :breadcrumb="breadcrumb"
          @toggle="open = !open"
        />
        <UContainer>
          <slot />
        </UContainer>
      </div>
    </div>
  </div>
</template>
