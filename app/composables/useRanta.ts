import { useLocalStorage } from '@vueuse/core'
import type { Presence, PresenceSignal, PresenceMeta } from '~/types/resource'

export const presenceMeta: Record<PresenceSignal, PresenceMeta> = {
  saapuva: { signal: 'saapuva', icon: 'i-lucide-waves', color: 'info', expiryHours: 1 },
  syvalla: { signal: 'syvalla', icon: 'i-lucide-anchor', color: 'primary', expiryHours: 8 },
  kuuntelee: { signal: 'kuuntelee', icon: 'i-lucide-ear', color: 'secondary', expiryHours: 4 },
  etsii: { signal: 'etsii', icon: 'i-lucide-search', color: 'warning', expiryHours: 2 },
  lepaa: { signal: 'lepaa', icon: 'i-lucide-moon', color: 'neutral', expiryHours: 12 }
}

export const useRanta = () => {
  const presence = useLocalStorage<Presence[]>('ranta:presence', [])
  const myPresence = useLocalStorage<Presence | null>('ranta:mine', null)

  const active = computed(() =>
    presence.value.filter(p => new Date(p.expiresAt).getTime() > Date.now())
  )

  const public_ = computed(() =>
    active.value.filter(p => p.visibility === 'public')
  )

  const members = computed(() =>
    active.value.filter(p => p.visibility === 'members')
  )

  const depth = (p: Presence) => {
    const hours = (Date.now() - new Date(p.updatedAt).getTime()) / 3600000
    return Math.floor(hours)
  }

  const signal = (
    userId: string,
    s: PresenceSignal,
    options?: Partial<Omit<Presence, 'userId' | 'signal' | 'updatedAt' | 'expiresAt'>>
  ) => {
    const now = new Date()
    const meta = presenceMeta[s]
    const expiresAt = new Date(now.getTime() + meta.expiryHours * 3600000).toISOString()
    const entry: Presence = {
      userId,
      signal: s,
      updatedAt: now.toISOString(),
      expiresAt,
      visibility: 'members',
      ...options
    }
    const index = presence.value.findIndex(p => p.userId === userId)
    if (index !== -1) {
      presence.value[index] = entry
    } else {
      presence.value.push(entry)
    }
    myPresence.value = entry
  }

  const leave = (userId: string) => {
    presence.value = presence.value.filter(p => p.userId !== userId)
    myPresence.value = null
  }

  const clear = () => {
    presence.value = presence.value.filter(p =>
      new Date(p.expiresAt).getTime() > Date.now()
    )
  }

  return {
    presence,
    myPresence,
    active,
    public_,
    members,
    depth,
    signal,
    leave,
    clear
  }
}
