<script setup lang="ts">
import type { LuotoEnCollectionItem, LuotoFiCollectionItem } from '@nuxt/content'

type LuotoItem = LuotoEnCollectionItem | LuotoFiCollectionItem

interface MissingItem {
  path: string
  title: string
  description: string
  navigationTitle: string
  navigationIcon: string
  kind: string
  level: string
  author: string
  avatar: string
  tag: string
  tagColor: string
  time: string
  likes: number
  replies: number
  publishedAt: string
  tags: string[]
}

const { collectionKey } = useLuotoNav()
const today = new Date().toISOString().split('T')[0]
const { data: missing, pending } = await useAsyncData('missing-author', async () => {
  return (await queryCollection(collectionKey.value).all() as LuotoItem[])
    .filter(item => !item.author)
    .map(item => ({
      path: item.path,
      title: item.title ?? '',
      description: item.description ?? '',
      navigationTitle: typeof item.navigation === 'object' ? (item.navigation?.title ?? item.title ?? '') : (item.title ?? ''),
      navigationIcon: typeof item.navigation === 'object' ? (item.navigation?.icon ?? '') : '',
      kind: item.kind ?? '',
      level: item.level ?? '',
      author: '',
      avatar: item.avatar ?? '',
      tag: item.tag ?? '',
      tagColor: item.tagColor ?? 'primary',
      time: item.time ?? '',
      likes: item.likes ?? 0,
      replies: item.replies ?? 0,
      publishedAt: item.publishedAt ?? today,
      tags: item.tags ?? []
    }))
}, { watch: [collectionKey] })

const active = ref<MissingItem | null>(null)
const copied = ref(false)
const tagsInput = ref('')

function edit(item: MissingItem) {
  active.value = { ...item }
  tagsInput.value = item.tags.join(', ')
}

function syncTags() {
  if (active.value) {
    active.value.tags = tagsInput.value.split(',').map(t => t.trim()).filter(Boolean)
  }
}

function generate(): string {
  if (!active.value) return ''
  const fm = active.value
  return `---
title: ${fm.title}
description: ${fm.description}
navigation:
  title: ${fm.navigationTitle}
  icon: ${fm.navigationIcon}
kind: ${fm.kind}
level: ${fm.level}
author: ${fm.author}
avatar: ${fm.avatar}
tag: ${fm.tag}
tagColor: ${fm.tagColor}
time: ${fm.time}
likes: ${fm.likes}
replies: ${fm.replies}
publishedAt: ${fm.publishedAt}
tags: [${fm.tags.join(', ')}]
---`
}

async function copy() {
  await navigator.clipboard.writeText(generate())
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <span class="text-highlighted font-semibold">{{ $t('frontmatterChecker.title') }}</span>
      <UBadge
        v-if="missing"
        :color="missing.length === 0 ? 'success' : 'error'"
        variant="soft"
        :label="`${missing.length} items`"
      />
    </div>

    <div
      v-if="pending"
      class="flex flex-col gap-2"
    >
      <USkeleton
        v-for="i in 3"
        :key="i"
        class="h-24 w-full"
      />
    </div>

    <div
      v-else-if="missing?.length === 0"
      class="text-sm text-muted py-4 text-center"
    >
      {{ $t('frontmatterChecker.allGood') }}
    </div>

    <div
      v-else
      class="flex flex-col gap-3"
    >
      <UCard
        v-for="item in missing"
        :key="item.path"
      >
        <div class="flex flex-col gap-3">
          <div class="flex items-start justify-between gap-4">
            <div class="flex flex-col gap-1">
              <span class="text-sm font-medium text-highlighted">
                {{ item.title || $t('frontmatterChecker.noTitle') }}
              </span>
              <span class="text-xs text-muted">
                {{ item.description || $t('frontmatterChecker.noDescription') }}
              </span>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <span class="text-xs text-dimmed">{{ item.path }}</span>
              <UButton
                icon="i-lucide-pencil"
                color="neutral"
                variant="ghost"
                size="xs"
                @click="edit(item)"
              />
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <USlideover
      :open="!!active"
      side="right"
      :ui="{
        content: 'backdrop-blur-2xl bg-default/70 ring ring-primary/20',
        header: 'border-b border-primary/15'
      }"
      @update:open="(val) => { if (!val) active = null }"
    >
      <template #header>
        <div class="flex items-center justify-between w-full">
          <span class="text-highlighted font-semibold">{{ $t('frontmatterChecker.generate') }}</span>
          <UBadge
            color="neutral"
            variant="soft"
            :label="active?.path ?? ''"
          />
        </div>
      </template>

      <template #body>
        <UScrollArea class="h-full">
          <div
            v-if="active"
            class="flex flex-col gap-4 p-1"
          >
            <UFormField
              :label="$t('frontmatterChecker.fields.title')"
              name="title"
            >
              <UInput
                id="title"
                v-model="active.title"
                color="primary"
                class="w-full"
              />
            </UFormField>

            <UFormField
              :label="$t('frontmatterChecker.fields.description')"
              name="description"
            >
              <UTextarea
                id="description"
                v-model="active.description"
                color="primary"
                class="w-full"
              />
            </UFormField>

            <UFormField
              :label="$t('frontmatterChecker.fields.navigationTitle')"
              name="navigationTitle"
            >
              <UInput
                id="navigationTitle"
                v-model="active.navigationTitle"
                color="primary"
                class="w-full"
              />
            </UFormField>

            <UFormField
              :label="$t('frontmatterChecker.fields.navigationIcon')"
              name="navigationIcon"
            >
              <UInput
                id="navigationIcon"
                v-model="active.navigationIcon"
                color="primary"
                class="w-full"
              />
            </UFormField>

            <UFormField
              :label="$t('frontmatterChecker.fields.kind')"
              name="kind"
            >
              <USelect
                id="kind"
                v-model="active.kind"
                :items="['guide', 'reference', 'ritual', 'lore']"
                color="primary"
                class="w-full"
              />
            </UFormField>

            <UFormField
              :label="$t('frontmatterChecker.fields.level')"
              name="level"
            >
              <USelect
                id="level"
                v-model="active.level"
                :items="['surface', 'current', 'deep']"
                color="primary"
                class="w-full"
              />
            </UFormField>

            <UFormField
              :label="$t('frontmatterChecker.fields.author')"
              name="author"
              :ui="{ label: 'text-error' }"
            >
              <UInput
                id="author"
                v-model="active.author"
                color="primary"
                class="w-full"
              />
            </UFormField>

            <UFormField
              :label="$t('frontmatterChecker.fields.avatar')"
              name="avatar"
            >
              <UInput
                id="avatar"
                v-model="active.avatar"
                color="primary"
                class="w-full"
              />
            </UFormField>

            <UFormField
              :label="$t('frontmatterChecker.fields.tag')"
              name="tag"
            >
              <UInput
                id="tag"
                v-model="active.tag"
                color="primary"
                class="w-full"
              />
            </UFormField>

            <UFormField
              :label="$t('frontmatterChecker.fields.tagColor')"
              name="tagColor"
            >
              <UInput
                id="tagColor"
                v-model="active.tagColor"
                color="primary"
                class="w-full"
              />
            </UFormField>

            <UFormField
              :label="$t('frontmatterChecker.fields.time')"
              name="time"
            >
              <UInput
                id="time"
                v-model="active.time"
                color="primary"
                class="w-full"
              />
            </UFormField>

            <UFormField
              :label="$t('frontmatterChecker.fields.publishedAt')"
              name="publishedAt"
            >
              <UInput
                id="publishedAt"
                v-model="active.publishedAt"
                color="primary"
                class="w-full"
              />
            </UFormField>

            <UFormField
              :label="$t('frontmatterChecker.fields.tags')"
              name="tags"
            >
              <UInput
                id="tags"
                v-model="tagsInput"
                color="primary"
                class="w-full"
                :placeholder="$t('frontmatterChecker.tagsPlaceholder')"
                @blur="syncTags"
              />
            </UFormField>

            <USeparator />

            <div class="bg-muted rounded-md p-3">
              <pre class="text-xs text-toned whitespace-pre-wrap">{{ generate() }}</pre>
            </div>
          </div>
        </UScrollArea>
      </template>

      <template #footer>
        <div class="flex justify-end w-full">
          <UButton
            :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
            :color="copied ? 'success' : 'primary'"
            variant="soft"
            :label="copied ? $t('frontmatterChecker.copied') : $t('frontmatterChecker.copy')"
            @click="copy"
          />
        </div>
      </template>
    </USlideover>
  </div>
</template>
