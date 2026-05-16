export type MemberRole = 'public' | 'member' | 'verified' | 'trusted' | 'steward'

export type ResourceType = 'physical' | 'digital' | 'skill' | 'financial' | 'knowledge'

export type ResourceStatus
  = | 'available'
    | 'requested'
    | 'approved'
    | 'borrowed'
    | 'unavailable'
    | 'retired'

export type TrustLevel = 'open' | 'member' | 'verified' | 'trusted'

export type EventType
  = | 'offered'
    | 'requested'
    | 'approved'
    | 'declined'
    | 'borrowed'
    | 'returned'
    | 'flagged'
    | 'retired'
    | 'vouched'
    | 'nudged'

export interface Member {
  id: string
  name: string
  avatar?: string
  role: MemberRole
  trustScore: number
  joinedAt: Date
}

export interface ResourceEvent {
  id: string
  type: EventType
  memberId: string
  timestamp: Date
  note?: string
}

export interface ResourceRequest {
  id: string
  resourceId: string
  requesterId: string
  from: Date
  to: Date
  reason?: string
  status: 'pending' | 'approved' | 'declined' | 'cancelled'
  createdAt: Date
}

export interface Want {
  id: string
  memberId: string
  description: string
  type?: ResourceType
  createdAt: Date
  fulfilledAt?: Date
}

export interface Resource {
  id: string
  name: string
  description: string
  type: ResourceType
  ownerId: string
  status: ResourceStatus
  trustLevel: TrustLevel
  conditions?: string
  returnDate?: Date
  currentBorrowerId?: string
  history: ResourceEvent[]
  requests: ResourceRequest[]
  createdAt: Date
  lastUsedAt?: Date
  imageUrl?: string
  tags?: string[]
}

export interface PoolStats {
  totalResources: number
  availableResources: number
  activeBorrows: number
  totalMembers: number
  pendingRequests: number
  idleResources: Resource[]
  mostBorrowed: Resource[]
  topContributors: Member[]
}

export interface ViewContext {
  role: MemberRole
  memberId?: string
  canRequest: (resource: Resource) => boolean
  canOffer: boolean
  canVouch: boolean
  canModerate: boolean
  canViewAnalytics: boolean
  canSeeContactDetails: boolean
}

export interface PoolRules {
  maxBorrowDays: number
  requireReturnNote: boolean
  allowDeposits: boolean
  nudgeAfterDays: number
  autoRetireAfterDays: number
}
