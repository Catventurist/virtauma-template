export type ColOr = 'error' | 'neutral' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | undefined

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

export type EpitaphKind
  = | 'person'
    | 'concept'
    | 'idea'
    | 'place'
    | 'era'
    | 'creature'
    | 'language'
    | 'belief'
    | 'emotion'
    | 'memory'
    | 'dream'
    | 'empire'
    | 'art'
    | 'science'
    | 'myth'
    | 'relationship'
    | 'technology'
    | 'species'
    | 'sound'
    | 'word'

export interface KindMeta {
  kind: EpitaphKind
  icon: string
  anchor: string
}

export interface EpitaphItem {
  name?: string
  kind?: EpitaphKind
  birth?: string
  death?: string
  age?: number
  location?: string
  inscription?: string
  portrait?: string
  depth?: string
  born?: string
  dissolved?: string
}

export type IntentState = 'ripple' | 'flowing' | 'settled' | 'dissolved'

export type IntentKind = 'act' | 'make' | 'release' | 'learn' | 'give' | 'tend'

export type IntentVisibility = 'private' | 'community'

export interface Intent {
  id: string
  title: string
  kind: IntentKind
  state: IntentState
  visibility: IntentVisibility
  createdAt: string
  updatedAt: string
  dissolvedAt?: string
  settledAt?: string
  witness: number
}

export type DecisionType = 'kaste' | 'haara' | 'vuoksi' | 'pato' | 'tulva' | 'karikko' | 'pyorre'

export type DecisionStatus = 'open' | 'closed' | 'resolved' | 'dissolved'

export type ResponseValue
  = | boolean
    | string
    | 'consent'
    | 'objection'
    | 'acknowledge'

export interface DecisionResponse {
  userId: string
  value: ResponseValue
  weight: number
  note?: string
  createdAt: string
}

export interface DecisionStone {
  userId: string
  text: string
  createdAt: string
  withdrawnAt?: string
}

export interface DecisionOption {
  id: string
  label: string
  votes: number
}

export interface Decision {
  id: string
  type: DecisionType
  title: string
  description?: string
  status: DecisionStatus
  visibility: 'public' | 'private'
  tags?: string[]
  linkedTo?: string

  createdBy: string
  createdAt: string
  updatedAt: string
  closesAt: string

  options?: DecisionOption[]
  responses: DecisionResponse[]
  stones?: DecisionStone[]

  threshold: number
  requiredParticipation: number
  coolingPeriod?: number
  urgencyLevel?: 1 | 2 | 3

  trialEndsAt?: string
  trialReviewAt?: string

  recurringInterval?: 'weekly' | 'monthly' | 'seasonal'
  nextAt?: string
  history?: string[]
}

export interface DecisionMeta {
  type: DecisionType
  icon: string
  color: ColOr
  defaultThreshold: number
  defaultParticipation: number
  defaultCoolingPeriod?: number
  defaultClosingHours: number
}

export type PresenceSignal = 'saapuva' | 'syvalla' | 'kuuntelee' | 'etsii' | 'lepaa'

export interface Presence {
  userId: string
  displayName?: string
  signal: PresenceSignal
  note?: string
  updatedAt: string
  expiresAt: string
  visibility: 'public' | 'members'
  linkedIntentId?: string
  linkedDecisionId?: string
  depth?: number
}

export interface PresenceMeta {
  signal: PresenceSignal
  icon: string
  color: string
  expiryHours: number
}

export type TilaState
  = | 'tyyni'
    | 'laskuvesi'
    | 'levossa'
    | 'virtaava'
    | 'nousuvesi'
    | 'myrskyinen'
    | 'padottu'

export interface Tila {
  state: TilaState
  note?: string
  setBy: string
  setAt: string
  memberSignals: TilaSignal[]
}

export interface TilaSignal {
  userId: string
  state: TilaState
  createdAt: string
}

export interface TilaMeta {
  state: TilaState
  icon: string
  color: ColOr
  expiryHours?: number
}

export type RytmiType = 'aalto' | 'vuorovesi' | 'kaiku' | 'hiljaisuus'

export type RytmiCadence = 'daily' | 'weekly' | 'monthly' | 'seasonal' | 'lunar' | 'custom'

export type RytmiStatus = 'upcoming' | 'active' | 'passed'

export interface Rytmi {
  id: string
  name: string
  description?: string
  type: RytmiType
  cadence: RytmiCadence
  ritual?: string
  tendedBy: string[]
  nextAt: string
  lastAt?: string
  occurrences: number
  createdAt: string
  updatedAt: string
  tilaShift?: TilaState
  customCadenceDays?: number
}

export interface RytmiMeta {
  type: RytmiType
  icon: string
  color: ColOr
}

export type PaatosStatus = 'open' | 'discussion' | 'resolution' | 'pending' | 'closed' | 'resolved' | 'dissolved'

export interface BranchData {
  id: string
  from: string
  status: string
  index: number
}

export interface VoiceData {
  author: string
  role: string
  weight: number
  type: string
  branchId: string
  index: number
}
