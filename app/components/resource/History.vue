<script setup lang="ts">
import type { Resource, ResourceEvent, Member } from '~/types/resource'

const props = defineProps<{
  resource: Resource
  members: Member[]
}>()

const { t } = useI18n()

const eventIcon: Record<ResourceEvent['type'], string> = {
  offered: 'i-lucide-plus-circle',
  requested: 'i-lucide-hand',
  approved: 'i-lucide-check-circle',
  declined: 'i-lucide-x-circle',
  borrowed: 'i-lucide-arrow-right-circle',
  returned: 'i-lucide-undo',
  flagged: 'i-lucide-flag',
  retired: 'i-lucide-archive',
  vouched: 'i-lucide-shield',
  nudged: 'i-lucide-bell'
}

const eventColor: Record<ResourceEvent['type'], string> = {
  offered: 'text-success',
  requested: 'text-info',
  approved: 'text-success',
  declined: 'text-error',
  borrowed: 'text-warning',
  returned: 'text-success',
  flagged: 'text-error',
  retired: 'text-muted',
  vouched: 'text-primary',
  nudged: 'text-warning'
}

function getMember(id: string) {
  return props.members.find(m => m.id === id)
}

const sorted = computed(() =>
  [...props.resource.history].sort((a, b) =>
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
)
</script>

<template>
  <div class="flex flex-col gap-3">
    <p class="text-xs font-medium text-muted uppercase tracking-wide">
      {{ t('pool.history.title') }}
    </p>

    <div
      v-if="sorted.length === 0"
      class="text-sm text-dimmed text-center py-4"
    >
      {{ t('pool.history.empty') }}
    </div>

    <div class="flex flex-col gap-2">
      <WateryMotion
        v-for="(event, i) in sorted"
        :key="event.id"
        :index="i"
      >
        <div class="flex items-start gap-3">
          <UIcon
            :name="eventIcon[event.type]"
            class="w-4 h-4 mt-0.5 shrink-0"
            :class="eventColor[event.type]"
          />

          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-sm text-highlighted font-medium">
                {{ getMember(event.memberId)?.name ?? t('pool.history.unknown') }}
              </span>
              <span class="text-sm text-muted">
                {{ t(`pool.events.${event.type}`) }}
              </span>
            </div>

            <p
              v-if="event.note"
              class="text-xs text-muted mt-0.5 italic"
            >
              {{ event.note }}
            </p>

            <p class="text-xs text-dimmed mt-0.5">
              {{ new Date(event.timestamp).toLocaleString() }}
            </p>
          </div>
        </div>
      </WateryMotion>
    </div>
  </div>
</template>
