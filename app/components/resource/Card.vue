<script setup lang="ts">
import type { Resource, ViewContext } from '~/types/resource'

const props = defineProps<{
  resource: Resource
  context: ViewContext
}>()

const emit = defineEmits<{
  request: [resource: Resource]
  flag: [resource: Resource]
  retire: [resource: Resource]
  return: [resource: Resource]
}>()

const { t } = useI18n()

const statusColor = computed(() => ({
  available: 'success',
  requested: 'warning',
  approved: 'info',
  borrowed: 'error',
  unavailable: 'neutral',
  retired: 'neutral'
}[props.resource.status] as 'success' | 'warning' | 'info' | 'error' | 'neutral'))

const typeIcon = computed(() => ({
  physical: 'i-lucide-package',
  digital: 'i-lucide-monitor',
  skill: 'i-lucide-brain',
  financial: 'i-lucide-coins',
  knowledge: 'i-lucide-book-open'
}[props.resource.type]))

const isOverdue = computed(() =>
  props.resource.returnDate ? new Date() > new Date(props.resource.returnDate) : false
)

const isOwner = computed(() => props.context.memberId === props.resource.ownerId)
const isBorrower = computed(() => props.context.memberId === props.resource.currentBorrowerId)
</script>

<template>
  <WateryMotion>
    <UCard
      :ui="{ root: 'overflow-hidden relative' }"
      class="backdrop-blur-sm bg-default/60"
    >
      <div
        v-if="context.role === 'public'"
        class="absolute inset-0 z-10 backdrop-blur-sm bg-default/60 flex items-center justify-center"
      >
        <div class="text-center p-4">
          <UIcon
            name="i-lucide-lock"
            class="w-6 h-6 text-muted mx-auto mb-2"
          />
          <p class="text-sm text-muted">
            {{ t('pool.joinToAccess') }}
          </p>
        </div>
      </div>

      <div class="flex items-start gap-3">
        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <UIcon
            :name="typeIcon"
            class="w-5 h-5 text-primary"
          />
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <p class="font-semibold text-highlighted truncate">
              {{ resource.name }}
            </p>
            <UBadge
              :color="statusColor"
              :label="t(`pool.status.${resource.status}`)"
              size="xs"
            />
            <UBadge
              v-if="isOverdue"
              color="error"
              :label="t('pool.overdue')"
              size="xs"
              variant="outline"
            />
          </div>

          <p class="text-sm text-muted mt-0.5 line-clamp-2">
            {{ resource.description }}
          </p>

          <div
            v-if="resource.tags?.length"
            class="flex flex-wrap gap-1 max-w-full overflow-hidden"
          >
            <UBadge
              v-for="tag in resource.tags?.slice(0, 3)"
              :key="tag"
              :label="tag"
              variant="subtle"
              size="xs"
              color="neutral"
            />
            <UBadge
              v-if="resource.tags && resource.tags.length > 3"
              :label="`+${resource.tags.length - 3}`"
              variant="outline"
              size="xs"
              color="neutral"
            />
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2 mt-4 pt-3 border-t border-default">
        <UButton
          v-if="context.canRequest(resource)"
          :label="t('pool.request')"
          size="xs"
          icon="i-lucide-hand"
          @click="emit('request', resource)"
        />

        <UButton
          v-if="isBorrower"
          :label="t('pool.return')"
          size="xs"
          color="neutral"
          variant="outline"
          icon="i-lucide-undo"
          @click="emit('return', resource)"
        />

        <div class="ml-auto flex gap-1">
          <UButton
            v-if="context.canModerate && !isOwner"
            icon="i-lucide-flag"
            size="xs"
            color="error"
            variant="ghost"
            @click="emit('flag', resource)"
          />

          <UButton
            v-if="isOwner || context.canModerate"
            icon="i-lucide-archive"
            size="xs"
            color="neutral"
            variant="ghost"
            @click="emit('retire', resource)"
          />
        </div>
      </div>
    </UCard>
  </WateryMotion>
</template>
