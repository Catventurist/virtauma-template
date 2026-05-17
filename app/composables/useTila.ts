import { useLocalStorage } from '@vueuse/core'
import type { Tila, TilaState, TilaMeta, TilaSignal } from '~/types/resource'

const SIGNAL_THRESHOLD = 0.4

export const tilaMeta: Record<TilaState, TilaMeta> = {
  tyyni: { state: 'tyyni', icon: 'i-lucide-waves', color: 'info' },
  laskuvesi: { state: 'laskuvesi', icon: 'i-lucide-arrow-down', color: 'secondary' },
  levossa: { state: 'levossa', icon: 'i-lucide-moon', color: 'neutral' },
  virtaava: { state: 'virtaava', icon: 'i-lucide-wind', color: 'primary' },
  nousuvesi: { state: 'nousuvesi', icon: 'i-lucide-arrow-up', color: 'success' },
  myrskyinen: { state: 'myrskyinen', icon: 'i-lucide-cloud-lightning', color: 'warning' },
  padottu: { state: 'padottu', icon: 'i-lucide-shield', color: 'error' }
}

const defaultTila = (): Tila => ({
  state: 'tyyni',
  setBy: 'system',
  setAt: new Date().toISOString(),
  memberSignals: []
})

export const useTila = () => {
  const tila = useLocalStorage<Tila>('tila', defaultTila())

  const meta = computed(() => tilaMeta[tila.value.state])

  const dominantSignal = computed(() => {
    const total = tila.value.memberSignals.length
    if (total === 0) return undefined
    const counts = tila.value.memberSignals.reduce((acc, s) => {
      acc[s.state] = (acc[s.state] ?? 0) + 1
      return acc
    }, {} as Record<TilaState, number>)
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
    const [topState, topCount] = sorted[0]!
    if (topCount / total < SIGNAL_THRESHOLD) return undefined
    return topState as TilaState
  })

  const setState = (state: TilaState, setBy: string, note?: string) => {
    tila.value = {
      ...tila.value,
      state,
      note,
      setBy,
      setAt: new Date().toISOString()
    }
  }

  const signal = (userId: string, state: TilaState) => {
    const existing = tila.value.memberSignals.findIndex(s => s.userId === userId)
    const entry: TilaSignal = {
      userId,
      state,
      createdAt: new Date().toISOString()
    }
    if (existing !== -1) {
      tila.value.memberSignals[existing] = entry
    } else {
      tila.value.memberSignals.push(entry)
    }
  }

  const withdrawSignal = (userId: string) => {
    tila.value.memberSignals = tila.value.memberSignals.filter(s => s.userId !== userId)
  }

  const userSignal = (userId: string) =>
    tila.value.memberSignals.find(s => s.userId === userId)

  return {
    tila,
    meta,
    dominantSignal,
    setState,
    signal,
    withdrawSignal,
    userSignal
  }
}
