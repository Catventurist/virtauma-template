<script setup lang="ts">
import { Motion } from 'motion-v'
import type { Resource, MemberRole } from '~/types/resource'
import { useResourcePool } from '~/composables/useResources'

const props = defineProps<{
  role: MemberRole
  memberId?: string
}>()

const { t } = useI18n()

const {
  resources, members, stats,
  filtered, activeWants, pendingRequests,
  filters, resetFilters, createViewContext,
  offerResource, approveRequest, declineRequest,
  returnResource, flagResource,
  retireResource, postWant, fulfillWant
} = useResourcePool()

const context = computed(() => createViewContext(props.role, props.memberId))

const activeTab = ref('resources')
const showOfferForm = ref(false)
const selectedResource = ref<Resource | null>(null)
const showRequestModal = ref(false)

const tabs = computed(() => [
  { label: t('pool.tabs.resources'), value: 'resources' },
  { label: t('pool.tabs.wants'), value: 'wants' },
  ...(context.value.canViewAnalytics ? [{ label: t('pool.tabs.stats'), value: 'stats' }] : []),
  ...(context.value.canModerate ? [{ label: t('pool.tabs.requests'), value: 'requests', badge: pendingRequests.value.length }] : [])
])

const types = ['physical', 'digital', 'skill', 'financial', 'knowledge'] as const
const toast = useToast()

function onRequest(resource: Resource) {
  selectedResource.value = resource
  showRequestModal.value = true
}

function onReturn(resource: Resource) {
  if (!props.memberId) return
  returnResource(resource.id, props.memberId)
  toast.add({ title: t('pool.toast.returned'), color: 'success' })
}

function onFlag(resource: Resource) {
  if (!props.memberId) return
  flagResource(resource.id, props.memberId, '')
  toast.add({ title: t('pool.toast.flagged'), color: 'warning' })
}

function onRetire(resource: Resource) {
  if (!props.memberId) return
  retireResource(resource.id, props.memberId)
  toast.add({ title: t('pool.toast.retired'), color: 'neutral' })
}

function onOffer(data: Partial<Resource>) {
  if (!props.memberId || !data.name || !data.type || !data.trustLevel) return
  offerResource({
    name: data.name,
    description: data.description ?? '',
    type: data.type,
    trustLevel: data.trustLevel,
    conditions: data.conditions,
    tags: data.tags,
    ownerId: props.memberId
  })
  showOfferForm.value = false
  toast.add({ title: t('pool.toast.offered'), color: 'success' })
}

function onApprove(resourceId: string, requestId: string) {
  if (!props.memberId) return
  approveRequest(resourceId, requestId, props.memberId)
  toast.add({ title: t('pool.toast.approved'), color: 'success' })
}

function onDecline(resourceId: string, requestId: string) {
  if (!props.memberId) return
  declineRequest(resourceId, requestId, props.memberId)
  toast.add({ title: t('pool.toast.declined'), color: 'neutral' })
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between flex-wrap gap-3">
      <div>
        <h2 class="text-xl font-bold text-highlighted">
          {{ t('pool.title') }}
        </h2>
        <p class="text-sm text-muted">
          {{ t('pool.subtitle') }}
        </p>
      </div>

      <UButton
        v-if="context.canOffer"
        :label="t('pool.offer')"
        icon="i-lucide-plus"
        @click="showOfferForm = true"
      />
    </div>

    <ResourcePoolStats
      :stats="stats"
      :context="context"
    />

    <UTabs
      v-model="activeTab"
      :items="tabs"
    >
      <template #content="{ item }">
        <div class="mt-4">
          <template v-if="item.value === 'resources'">
            <div class="flex flex-wrap gap-3 mb-4">
              <UInput
                id="pool-search"
                v-model="filters.search"
                :placeholder="t('pool.search')"
                icon="i-lucide-search"
                class="w-64"
              />

              <USelect
                id="pool-type"
                v-model="filters.type"
                :items="[
                  { label: t('pool.filter.allTypes'), value: null },
                  ...types.map(type => ({ label: t(`pool.type.${type}`), value: type }))
                ]"
                class="w-40"
              />

              <UButton
                :label="t('pool.filter.reset')"
                color="neutral"
                variant="ghost"
                size="sm"
                @click="resetFilters"
              />
            </div>

            <div
              v-if="filtered.length === 0"
              class="flex flex-col items-center justify-center py-16 gap-3 text-center"
            >
              <Motion
                as="div"
                :animate="{ y: [0, -6, 0] }"
                :transition="{ duration: 3, repeat: Infinity, ease: 'easeInOut' }"
              >
                <UIcon
                  name="i-lucide-package-open"
                  class="w-12 h-12 text-dimmed"
                />
              </Motion>
              <p class="font-medium text-highlighted">
                {{ t('pool.empty') }}
              </p>
              <p class="text-sm text-muted">
                {{ t('pool.emptyHint') }}
              </p>
              <UButton
                v-if="context.canOffer"
                :label="t('pool.offer')"
                icon="i-lucide-plus"
                variant="outline"
                @click="showOfferForm = true"
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ResourceCard
                v-for="resource in filtered"
                :key="resource.id"
                :resource="resource"
                :context="context"
                @request="onRequest"
                @return="onReturn"
                @flag="onFlag"
                @retire="onRetire"
              />
            </div>
          </template>

          <template v-if="item.value === 'wants'">
            <ResourceWantBoard
              :wants="activeWants"
              :members="members"
              :context="context"
              @post="(description, type) => props.memberId && postWant(props.memberId, description, type)"
              @fulfill="fulfillWant"
            />
          </template>

          <template v-if="item.value === 'stats'">
            <ResourcePoolStats
              :stats="stats"
              :context="context"
            />
          </template>

          <template v-if="item.value === 'requests'">
            <div class="flex flex-col gap-3">
              <div
                v-if="pendingRequests.length === 0"
                class="text-center py-12 text-muted"
              >
                <UIcon
                  name="i-lucide-inbox"
                  class="w-10 h-10 mx-auto mb-2 text-dimmed"
                />
                <p>{{ t('pool.requests.empty') }}</p>
              </div>

              <WateryMotion
                v-for="(request, i) in pendingRequests"
                :key="request.id"
                :index="i"
              >
                <UCard>
                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <p class="font-medium text-highlighted">
                        {{ resources.find(r => r.id === request.resourceId)?.name }}
                      </p>
                      <p class="text-sm text-muted">
                        {{ members.find(m => m.id === request.requesterId)?.name }}
                        · {{ new Date(request.from).toLocaleDateString() }} — {{ new Date(request.to).toLocaleDateString() }}
                      </p>
                      <p
                        v-if="request.reason"
                        class="text-sm text-muted mt-1 italic"
                      >
                        {{ request.reason }}
                      </p>
                    </div>

                    <div class="flex gap-2">
                      <UButton
                        icon="i-lucide-check"
                        size="xs"
                        color="success"
                        @click="onApprove(request.resourceId, request.id)"
                      />
                      <UButton
                        icon="i-lucide-x"
                        size="xs"
                        color="error"
                        variant="outline"
                        @click="onDecline(request.resourceId, request.id)"
                      />
                    </div>
                  </div>
                </UCard>
              </WateryMotion>
            </div>
          </template>
        </div>
      </template>
    </UTabs>

    <UModal
      v-model:open="showOfferForm"
      :ui="{ content: 'overflow-y-auto max-h-[90vh]' }"
    >
      <template #content>
        <div class="p-4">
          <ResourceForm
            :context="context"
            @submit="onOffer"
            @cancel="showOfferForm = false"
          />
        </div>
      </template>
    </UModal>

    <UModal
      v-model:open="showRequestModal"
      :ui="{ content: 'overflow-y-auto max-h-[90vh]' }"
    >
      <template #content>
        <div
          v-if="selectedResource"
          class="p-4"
        >
          <ResourceHistory
            :resource="selectedResource"
            :members="members"
          />
        </div>
      </template>
    </UModal>
  </div>
</template>
