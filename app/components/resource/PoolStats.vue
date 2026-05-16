<script setup lang="ts">
import type { PoolStats, ViewContext } from '~/types/resource'

const props = defineProps<{
  stats: PoolStats
  context: ViewContext
}>()

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      <WateryMotion :index="0">
        <UCard class="text-center">
          <p class="text-2xl font-bold text-highlighted">
            {{ props.stats.totalResources }}
          </p>
          <p class="text-xs text-muted mt-1">
            {{ t('pool.stats.total') }}
          </p>
        </UCard>
      </WateryMotion>

      <WateryMotion :index="1">
        <UCard class="text-center">
          <p class="text-2xl font-bold text-success">
            {{ stats.availableResources }}
          </p>
          <p class="text-xs text-muted mt-1">
            {{ t('pool.stats.available') }}
          </p>
        </UCard>
      </WateryMotion>

      <WateryMotion :index="2">
        <UCard class="text-center">
          <p class="text-2xl font-bold text-warning">
            {{ stats.activeBorrows }}
          </p>
          <p class="text-xs text-muted mt-1">
            {{ t('pool.stats.borrowed') }}
          </p>
        </UCard>
      </WateryMotion>

      <WateryMotion :index="3">
        <UCard class="text-center">
          <p class="text-2xl font-bold text-primary">
            {{ stats.totalMembers }}
          </p>
          <p class="text-xs text-muted mt-1">
            {{ t('pool.stats.members') }}
          </p>
        </UCard>
      </WateryMotion>

      <WateryMotion :index="4">
        <UCard class="text-center">
          <p class="text-2xl font-bold text-info">
            {{ stats.pendingRequests }}
          </p>
          <p class="text-xs text-muted mt-1">
            {{ t('pool.stats.pending') }}
          </p>
        </UCard>
      </WateryMotion>
    </div>

    <template v-if="context.canViewAnalytics">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <WateryMotion :index="5">
          <UCard>
            <p class="text-xs font-medium text-muted uppercase tracking-wide mb-3">
              {{ t('pool.stats.mostBorrowed') }}
            </p>
            <div class="flex flex-col gap-2">
              <div
                v-for="resource in stats.mostBorrowed"
                :key="resource.id"
                class="flex items-center gap-2"
              >
                <UIcon
                  name="i-lucide-package"
                  class="w-3.5 h-3.5 text-muted shrink-0"
                />
                <span class="text-sm text-default truncate flex-1">{{ resource.name }}</span>
                <UBadge
                  :label="String(resource.history.filter(e => e.type === 'borrowed').length)"
                  size="xs"
                  variant="subtle"
                />
              </div>
              <p
                v-if="stats.mostBorrowed.length === 0"
                class="text-xs text-dimmed"
              >
                {{ t('pool.stats.empty') }}
              </p>
            </div>
          </UCard>
        </WateryMotion>

        <WateryMotion :index="6">
          <UCard>
            <p class="text-xs font-medium text-muted uppercase tracking-wide mb-3">
              {{ t('pool.stats.idle') }}
            </p>
            <div class="flex flex-col gap-2">
              <div
                v-for="resource in stats.idleResources"
                :key="resource.id"
                class="flex items-center gap-2"
              >
                <UIcon
                  name="i-lucide-clock"
                  class="w-3.5 h-3.5 text-warning shrink-0"
                />
                <span class="text-sm text-default truncate flex-1">{{ resource.name }}</span>
              </div>
              <p
                v-if="stats.idleResources.length === 0"
                class="text-xs text-dimmed"
              >
                {{ t('pool.stats.empty') }}
              </p>
            </div>
          </UCard>
        </WateryMotion>

        <WateryMotion :index="7">
          <UCard>
            <p class="text-xs font-medium text-muted uppercase tracking-wide mb-3">
              {{ t('pool.stats.topContributors') }}
            </p>
            <div class="flex flex-col gap-2">
              <div
                v-for="member in stats.topContributors"
                :key="member.id"
                class="flex items-center gap-2"
              >
                <UAvatar
                  :src="member.avatar"
                  :alt="member.name"
                  size="xs"
                />
                <span class="text-sm text-default truncate flex-1">{{ member.name }}</span>
                <UBadge
                  :label="String(member.trustScore)"
                  size="xs"
                  variant="subtle"
                  color="primary"
                />
              </div>
              <p
                v-if="stats.topContributors.length === 0"
                class="text-xs text-dimmed"
              >
                {{ t('pool.stats.empty') }}
              </p>
            </div>
          </UCard>
        </WateryMotion>
      </div>
    </template>
  </div>
</template>
