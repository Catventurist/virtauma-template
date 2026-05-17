import { useLocalStorage } from '@vueuse/core'
import type { Decision, DecisionType, DecisionResponse, DecisionStone, DecisionMeta } from '~/types/resource'

export const decisionMeta: Record<DecisionType, DecisionMeta> = {
  kaste: { type: 'kaste', icon: 'i-lucide-droplet', color: 'info', defaultThreshold: 0.5, defaultParticipation: 0.3, defaultClosingHours: 24 },
  haara: { type: 'haara', icon: 'i-lucide-git-branch', color: 'primary', defaultThreshold: 0.5, defaultParticipation: 0.4, defaultClosingHours: 72 },
  vuoksi: { type: 'vuoksi', icon: 'i-lucide-waves', color: 'secondary', defaultThreshold: 0.5, defaultParticipation: 0.3, defaultClosingHours: 168 },
  pato: { type: 'pato', icon: 'i-lucide-shield', color: 'warning', defaultThreshold: 1, defaultParticipation: 0.5, defaultClosingHours: 168, defaultCoolingPeriod: 48 },
  tulva: { type: 'tulva', icon: 'i-lucide-zap', color: 'error', defaultThreshold: 0.6, defaultParticipation: 0.6, defaultClosingHours: 12 },
  karikko: { type: 'karikko', icon: 'i-lucide-anchor', color: 'neutral', defaultThreshold: 0.8, defaultParticipation: 0.7, defaultClosingHours: 336, defaultCoolingPeriod: 72 },
  pyorre: { type: 'pyorre', icon: 'i-lucide-refresh-cw', color: 'secondary', defaultThreshold: 0.5, defaultParticipation: 0.4, defaultClosingHours: 168 }
}

const defaultDecision = (type: DecisionType): Omit<Decision, 'id' | 'createdAt' | 'updatedAt' | 'closesAt' | 'createdBy'> => {
  const meta = decisionMeta[type]
  return {
    type,
    title: '',
    status: 'open',
    visibility: 'public',
    responses: [],
    threshold: meta.defaultThreshold,
    requiredParticipation: meta.defaultParticipation,
    coolingPeriod: meta.defaultCoolingPeriod,
    urgencyLevel: undefined,
    options: type === 'haara' ? [] : undefined,
    stones: type === 'pato' ? [] : undefined,
    recurringInterval: type === 'pyorre' ? 'monthly' : undefined
  }
}

export const usePaatos = () => {
  const decisions = useLocalStorage<Decision[]>('decisions', [])

  const open = computed(() => decisions.value.filter(d => d.status === 'open'))
  const closed = computed(() => decisions.value.filter(d => d.status !== 'open'))

  const byType = (type: DecisionType) =>
    computed(() => decisions.value.filter(d => d.type === type))

  const isQuorate = (d: Decision) =>
    d.responses.length / d.requiredParticipation >= 1

  const timeRemaining = (d: Decision) => {
    const diff = new Date(d.closesAt).getTime() - Date.now()
    if (diff <= 0) return null
    const hours = Math.floor(diff / 3600000)
    const mins = Math.floor((diff % 3600000) / 60000)
    if (hours > 24) return `${Math.floor(hours / 24)}d`
    if (hours > 0) return `${hours}h`
    return `${mins}m`
  }

  const canClose = (d: Decision) => {
    if (!isQuorate(d)) return false
    if (d.coolingPeriod) {
      const coolingMs = d.coolingPeriod * 3600000
      if (Date.now() - new Date(d.createdAt).getTime() < coolingMs) return false
    }
    if (d.type === 'pato') {
      return (d.stones ?? []).filter(s => !s.withdrawnAt).length === 0
    }
    return true
  }

  const result = (d: Decision) => {
    const total = d.responses.length
    if (total === 0) return null

    if (d.type === 'kaste') {
      const yes = d.responses.filter(r => r.value === true).length
      return yes / total >= d.threshold ? 'yes' : 'no'
    }

    if (d.type === 'haara') {
      const counts = (d.options ?? []).map(o => ({
        ...o,
        votes: d.responses.filter(r => r.value === o.id).length
      }))
      return counts.sort((a, b) => b.votes - a.votes)[0]?.id ?? null
    }

    if (d.type === 'pato') {
      return (d.stones ?? []).filter(s => !s.withdrawnAt).length === 0
        ? 'consent'
        : 'blocked'
    }

    if (d.type === 'tulva') {
      const acknowledged = d.responses.filter(r => r.value === 'acknowledge').length
      return acknowledged / total >= d.threshold ? 'acknowledged' : 'pending'
    }

    if (d.type === 'vuoksi') {
      const consent = d.responses.filter(r => r.value === 'consent').length
      return consent / total >= d.threshold ? 'try' : 'hold'
    }

    if (d.type === 'karikko') {
      const consent = d.responses.filter(r => r.value === 'consent').length
      return consent / total >= d.threshold ? 'proceed' : 'hold'
    }

    if (d.type === 'pyorre') {
      const consent = d.responses.filter(r => r.value === 'consent').length
      return consent / total >= d.threshold ? 'resolved' : 'continues'
    }

    return null
  }

  const add = (type: DecisionType, data: Partial<Decision>, userId: string) => {
    const now = new Date().toISOString()
    const meta = decisionMeta[type]
    const closesAt = new Date(Date.now() + meta.defaultClosingHours * 3600000).toISOString()
    const decision: Decision = {
      ...defaultDecision(type),
      ...data,
      id: crypto.randomUUID(),
      createdBy: userId,
      createdAt: now,
      updatedAt: now,
      closesAt
    }
    decisions.value.push(decision)
    return decision.id
  }

  const update = (id: string, data: Partial<Omit<Decision, 'id'>>) => {
    const index = decisions.value.findIndex(d => d.id === id)
    if (index === -1) return
    decisions.value[index] = {
      ...decisions.value[index]!,
      ...data,
      id,
      updatedAt: new Date().toISOString()
    }
  }

  const respond = (id: string, response: DecisionResponse) => {
    const decision = decisions.value.find(d => d.id === id)
    if (!decision) return
    const existing = decision.responses.findIndex(r => r.userId === response.userId)
    if (existing !== -1) {
      decision.responses[existing] = response
    } else {
      decision.responses.push(response)
    }
    update(id, { responses: decision.responses })
  }

  const placeStone = (id: string, stone: DecisionStone) => {
    const decision = decisions.value.find(d => d.id === id)
    if (!decision || decision.type !== 'pato') return
    decision.stones = [...(decision.stones ?? []), stone]
    update(id, { stones: decision.stones })
  }

  const withdrawStone = (id: string, userId: string) => {
    const decision = decisions.value.find(d => d.id === id)
    if (!decision || decision.type !== 'pato') return
    const stones = (decision.stones ?? []).map(s =>
      s.userId === userId ? { ...s, withdrawnAt: new Date().toISOString() } : s
    )
    update(id, { stones })
  }

  const close = (id: string) => update(id, { status: 'closed' })
  const dissolve = (id: string) => update(id, { status: 'dissolved' })
  const remove = (id: string) => {
    decisions.value = decisions.value.filter(d => d.id !== id)
  }

  return {
    decisions,
    open,
    closed,
    byType,
    isQuorate,
    timeRemaining,
    canClose,
    result,
    add,
    update,
    respond,
    placeStone,
    withdrawStone,
    close,
    dissolve,
    remove
  }
}
