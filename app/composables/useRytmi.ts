import { useLocalStorage } from '@vueuse/core'
import type { Rytmi, RytmiType, RytmiMeta, RytmiStatus, TilaState } from '~/types/resource'

export const rytmiMeta: Record<RytmiType, RytmiMeta> = {
  aalto: { type: 'aalto', icon: 'i-lucide-waves', color: 'primary' },
  vuorovesi: { type: 'vuorovesi', icon: 'i-lucide-arrow-up', color: 'info' },
  kaiku: { type: 'kaiku', icon: 'i-lucide-repeat', color: 'secondary' },
  hiljaisuus: { type: 'hiljaisuus', icon: 'i-lucide-moon', color: 'neutral' }
}

const nextOccurrence = (r: Rytmi): Date => {
  const last = r.lastAt ? new Date(r.lastAt) : new Date(r.createdAt)
  switch (r.cadence) {
    case 'daily': return new Date(last.getTime() + 86400000)
    case 'weekly': return new Date(last.getTime() + 7 * 86400000)
    case 'monthly': return new Date(last.setMonth(last.getMonth() + 1))
    case 'seasonal':return new Date(last.setMonth(last.getMonth() + 3))
    case 'lunar': return new Date(last.getTime() + 29.5 * 86400000)
    case 'custom': return new Date(last.getTime() + (r.customCadenceDays ?? 7) * 86400000)
  }
}

export const useRytmi = () => {
  const rhythms = useLocalStorage<Rytmi[]>('rytmi:rhythms', [])

  const status = (r: Rytmi): RytmiStatus => {
    const next = new Date(r.nextAt).getTime()
    const now = Date.now()
    const window = 3600000 * 2
    if (now >= next - window && now <= next + window) return 'active'
    if (now > next + window) return 'passed'
    return 'upcoming'
  }

  const upcoming = computed(() =>
    rhythms.value
      .filter(r => status(r) === 'upcoming')
      .sort((a, b) => new Date(a.nextAt).getTime() - new Date(b.nextAt).getTime())
  )

  const active = computed(() =>
    rhythms.value.filter(r => status(r) === 'active')
  )

  const passed = computed(() =>
    rhythms.value.filter(r => status(r) === 'passed')
  )

  const timeUntil = (r: Rytmi) => {
    const diff = new Date(r.nextAt).getTime() - Date.now()
    if (diff <= 0) return null
    const days = Math.floor(diff / 86400000)
    const hours = Math.floor((diff % 86400000) / 3600000)
    if (days > 0) return `${days}d`
    return `${hours}h`
  }

  const add = (data: Omit<Rytmi, 'id' | 'createdAt' | 'updatedAt' | 'occurrences' | 'nextAt'>) => {
    const now = new Date().toISOString()
    const rhythm: Rytmi = {
      ...data,
      id: crypto.randomUUID(),
      occurrences: 0,
      nextAt: nextOccurrence({ ...data, id: '', createdAt: now, updatedAt: now, occurrences: 0, nextAt: now }).toISOString(),
      createdAt: now,
      updatedAt: now
    }
    rhythms.value.push(rhythm)
    return rhythm.id
  }

  const update = (id: string, data: Partial<Omit<Rytmi, 'id'>>) => {
    const index = rhythms.value.findIndex(r => r.id === id)
    if (index === -1) return
    rhythms.value[index] = {
      ...rhythms.value[index]!,
      ...data,
      id,
      updatedAt: new Date().toISOString()
    }
  }

  const complete = (id: string) => {
    const rhythm = rhythms.value.find(r => r.id === id)
    if (!rhythm) return
    const now = new Date().toISOString()
    const next = nextOccurrence({ ...rhythm, lastAt: now })
    update(id, {
      lastAt: now,
      occurrences: rhythm.occurrences + 1,
      nextAt: next.toISOString()
    })
  }

  const remove = (id: string) => {
    rhythms.value = rhythms.value.filter(r => r.id !== id)
  }

  const activeTilaShift = computed((): TilaState | undefined =>
    active.value.find(r => r.tilaShift)?.tilaShift
  )

  return {
    rhythms,
    status,
    upcoming,
    active,
    passed,
    timeUntil,
    add,
    update,
    complete,
    remove,
    activeTilaShift
  }
}
