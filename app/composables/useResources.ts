import type { MemberRole, ViewContext, Resource, ResourceEvent, ResourceRequest, Want, Member, PoolStats, PoolRules, ResourceType, ResourceStatus, TrustLevel } from '~/types/resource'

const TRUST_HIERARCHY: Record<string, number> = {
  public: 0,
  member: 1,
  verified: 2,
  trusted: 3,
  steward: 4
}

export function useViewContext(role: MemberRole, memberId?: string): ViewContext {
  function canRequest(resource: Resource): boolean {
    if (role === 'public') return false
    const requiredLevel = TRUST_HIERARCHY[resource.trustLevel]
    const memberLevel = TRUST_HIERARCHY[role]
    return memberLevel! >= requiredLevel! && resource.status === 'available'
  }

  return {
    role,
    memberId,
    canRequest,
    canOffer: role !== 'public',
    canVouch: TRUST_HIERARCHY[role]! >= TRUST_HIERARCHY['verified']!,
    canModerate: TRUST_HIERARCHY[role]! >= TRUST_HIERARCHY['trusted']!,
    canViewAnalytics: role === 'steward',
    canSeeContactDetails: TRUST_HIERARCHY[role]! >= TRUST_HIERARCHY['trusted']!
  }
}

export function useResourcePool() {
  const resources = ref<Resource[]>([])
  const members = ref<Member[]>([])
  const wants = ref<Want[]>([])

  const rules = ref<PoolRules>({
    maxBorrowDays: 14,
    requireReturnNote: false,
    allowDeposits: false,
    nudgeAfterDays: 3,
    autoRetireAfterDays: 365
  })

  function addEvent(resourceId: string, event: Omit<ResourceEvent, 'id'>) {
    const resource = resources.value.find(r => r.id === resourceId)
    if (!resource) return
    resource.history.push({ ...event, id: crypto.randomUUID() })
  }

  function offerResource(resource: Omit<Resource, 'id' | 'history' | 'requests' | 'createdAt' | 'status'>) {
    const newResource: Resource = {
      ...resource,
      id: crypto.randomUUID(),
      status: 'available',
      history: [],
      requests: [],
      createdAt: new Date()
    }
    resources.value.push(newResource)
    addEvent(newResource.id, {
      type: 'offered',
      memberId: resource.ownerId,
      timestamp: new Date()
    })
  }

  function requestResource(resourceId: string, requesterId: string, from: Date, to: Date, reason?: string) {
    const resource = resources.value.find(r => r.id === resourceId)
    if (!resource) return

    const alreadyRequested = resource.requests.some(
      r => r.requesterId === requesterId && r.status === 'pending'
    )
    if (alreadyRequested) return

    const request: ResourceRequest = {
      id: crypto.randomUUID(),
      resourceId,
      requesterId,
      from,
      to,
      reason,
      status: 'pending',
      createdAt: new Date()
    }
    resource.requests.push(request)
    resource.status = 'requested'
    addEvent(resourceId, { type: 'requested', memberId: requesterId, timestamp: new Date(), note: reason })
    return request
  }

  function approveRequest(resourceId: string, requestId: string, approverId: string) {
    const resource = resources.value.find(r => r.id === resourceId)
    if (!resource) return

    const request = resource.requests.find(r => r.id === requestId)
    if (!request) return

    request.status = 'approved'
    resource.status = 'borrowed'
    resource.currentBorrowerId = request.requesterId
    resource.returnDate = request.to
    resource.lastUsedAt = new Date()

    addEvent(resourceId, {
      type: 'approved',
      memberId: approverId,
      timestamp: new Date()
    })
  }

  function declineRequest(resourceId: string, requestId: string, approverId: string, note?: string) {
    const resource = resources.value.find(r => r.id === resourceId)
    if (!resource) return

    const request = resource.requests.find(r => r.id === requestId)
    if (!request) return

    request.status = 'declined'
    resource.status = 'available'

    addEvent(resourceId, {
      type: 'declined',
      memberId: approverId,
      timestamp: new Date(),
      note
    })
  }

  function returnResource(resourceId: string, returnerId: string, note?: string) {
    const resource = resources.value.find(r => r.id === resourceId)
    if (!resource) return

    resource.status = 'available'
    resource.currentBorrowerId = undefined
    resource.returnDate = undefined

    addEvent(resourceId, {
      type: 'returned',
      memberId: returnerId,
      timestamp: new Date(),
      note
    })
  }

  function flagResource(resourceId: string, flaggerId: string, note: string) {
    const resource = resources.value.find(r => r.id === resourceId)
    if (!resource) return

    addEvent(resourceId, {
      type: 'flagged',
      memberId: flaggerId,
      timestamp: new Date(),
      note
    })
  }

  function retireResource(resourceId: string, retirerId: string, note?: string) {
    const resource = resources.value.find(r => r.id === resourceId)
    if (!resource) return

    resource.status = 'retired'

    addEvent(resourceId, {
      type: 'retired',
      memberId: retirerId,
      timestamp: new Date(),
      note
    })
  }

  function postWant(memberId: string, description: string, type?: ResourceType) {
    const similar = wants.value.some(w =>
      !w.fulfilledAt
      && w.memberId === memberId
      && w.description.toLowerCase() === description.toLowerCase()
    )
    if (similar) return

    const matchingResource = resources.value.some(r =>
      r.status === 'available'
      && r.name.toLowerCase().includes(description.toLowerCase())
      && (!type || r.type === type)
    )

    wants.value.push({
      id: crypto.randomUUID(),
      memberId,
      description,
      type,
      createdAt: new Date(),
      fulfilledAt: matchingResource ? new Date() : undefined
    })
  }

  function fulfillWant(wantId: string) {
    const want = wants.value.find(w => w.id === wantId)
    if (!want) return
    want.fulfilledAt = new Date()
  }

  const stats = computed<PoolStats>(() => {
    const active = resources.value.filter(r => r.status !== 'retired')
    const now = new Date()
    const idleThreshold = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)

    return {
      totalResources: active.length,
      availableResources: active.filter(r => r.status === 'available').length,
      activeBorrows: active.filter(r => r.status === 'borrowed').length,
      totalMembers: members.value.length,
      pendingRequests: active.flatMap(r => r.requests).filter(r => r.status === 'pending').length,
      idleResources: active.filter(r => !r.lastUsedAt || r.lastUsedAt < idleThreshold),
      mostBorrowed: [...active].sort((a, b) =>
        b.history.filter(e => e.type === 'borrowed').length
        - a.history.filter(e => e.type === 'borrowed').length
      ).slice(0, 5),
      topContributors: [...members.value].sort((a, b) => b.trustScore - a.trustScore).slice(0, 5)
    }
  })

  const activeResources = computed(() => resources.value.filter(r => r.status !== 'retired'))
  const pendingRequests = computed(() => resources.value.flatMap(r => r.requests).filter(r => r.status === 'pending'))
  const activeWants = computed(() => wants.value.filter(w => !w.fulfilledAt))

  const filters = ref<ResourceFilters>({
    search: '',
    type: null,
    status: null,
    trustLevel: null,
    tags: []
  })

  const filtered = computed(() => {
    return resources.value.filter((r) => {
      if (r.status === 'retired') return false
      const q = filters.value.search.toLowerCase()
      const matchesSearch = !q
        || r.name.toLowerCase().includes(q)
        || r.description.toLowerCase().includes(q)
        || r.tags?.some(t => t.toLowerCase().includes(q))
      const matchesType = !filters.value.type || r.type === filters.value.type
      const matchesStatus = !filters.value.status || r.status === filters.value.status
      const matchesTrust = !filters.value.trustLevel || r.trustLevel === filters.value.trustLevel
      const matchesTags = filters.value.tags.length === 0
        || filters.value.tags.every(t => r.tags?.includes(t))
      return matchesSearch && matchesType && matchesStatus && matchesTrust && matchesTags
    })
  })

  function resetFilters() {
    filters.value = { search: '', type: null, status: null, trustLevel: null, tags: [] }
  }

  function createViewContext(role: MemberRole, memberId?: string): ViewContext {
    const roleLevel = TRUST_HIERARCHY[role] ?? 0

    return {
      role,
      memberId,
      canRequest: (resource: Resource) => {
        if (role === 'public') return false
        const resourceLevel = TRUST_HIERARCHY[resource.trustLevel] ?? 0
        return roleLevel >= resourceLevel && resource.status === 'available'
      },
      canOffer: role !== 'public',
      canVouch: roleLevel >= (TRUST_HIERARCHY['verified'] ?? 0),
      canModerate: roleLevel >= (TRUST_HIERARCHY['trusted'] ?? 0),
      canViewAnalytics: role === 'steward',
      canSeeContactDetails: roleLevel >= (TRUST_HIERARCHY['trusted'] ?? 0)
    }
  }

  return {
    resources, members, wants, rules,
    filters, filtered, resetFilters,
    stats, activeResources, pendingRequests, activeWants,
    createViewContext,
    offerResource, requestResource,
    approveRequest, declineRequest,
    returnResource, flagResource,
    retireResource, postWant, fulfillWant
  }
}

export interface ResourceFilters {
  search: string
  type: ResourceType | null
  status: ResourceStatus | null
  trustLevel: TrustLevel | null
  tags: string[]
}

export function useResourceFilter(resources: Ref<Resource[]>) {
  const filters = ref<ResourceFilters>({
    search: '',
    type: null,
    status: null,
    trustLevel: null,
    tags: []
  })

  const filtered = computed(() => {
    return resources.value.filter((r) => {
      const q = filters.value.search.toLowerCase()
      const matchesSearch = !q
        || r.name.toLowerCase().includes(q)
        || r.description.toLowerCase().includes(q)
        || r.tags?.some(t => t.toLowerCase().includes(q))

      const matchesType = !filters.value.type || r.type === filters.value.type
      const matchesStatus = !filters.value.status || r.status === filters.value.status
      const matchesTrust = !filters.value.trustLevel || r.trustLevel === filters.value.trustLevel
      const matchesTags = filters.value.tags.length === 0
        || filters.value.tags.every(t => r.tags?.includes(t))

      return matchesSearch && matchesType && matchesStatus && matchesTrust && matchesTags
    })
  })

  function reset() {
    filters.value = { search: '', type: null, status: null, trustLevel: null, tags: [] }
  }

  return { filters, filtered, reset }
}
