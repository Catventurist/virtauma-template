<script setup lang="ts">
const { bookmarks, remove } = useBookmarks()
</script>

<template>
  <UPopover>
    <UTooltip :text="$t('bookmarks.title')">
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-lucide-bookmark"
      />
    </UTooltip>

    <template #content>
      <div class="p-2 w-64">
        <p class="text-xs font-medium text-muted px-2 py-1.5">
          {{ $t('bookmarks.title') }}
        </p>

        <div
          v-if="bookmarks.length"
          class="flex flex-col gap-0.5 mt-1"
        >
          <div
            v-for="bookmark in bookmarks"
            :key="bookmark.path"
            class="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-elevated group"
          >
            <NuxtLink
              :to="bookmark.path"
              class="text-sm text-default truncate flex-1 hover:text-primary transition-colors"
            >
              {{ bookmark.label }}
            </NuxtLink>
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-x"
              size="xs"
              class="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
              @click.prevent="remove(bookmark.path)"
            />
          </div>
        </div>

        <p
          v-else
          class="text-sm text-muted px-2 py-3 text-center"
        >
          {{ $t('bookmarks.empty') }}
        </p>
      </div>
    </template>
  </UPopover>
</template>
