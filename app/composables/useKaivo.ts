import { useLocalStorage } from '@vueuse/core'
import type { Intent, IntentState, IntentKind } from '~/types/resource'

const defaultIntent = (): Intent => ({
  id: '',
  title: '',
  kind: 'act',
  state: 'ripple',
  visibility: 'private',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  witness: 0
})

export const useKaivo = () => {
  const intents = useLocalStorage<Intent[]>('kaivo:intents', [])
  const witnessed = useLocalStorage<string[]>('kaivo:witnessed', [])

  const filterKindPersonal = ref<IntentKind | null>(null)
  const filterKindCommunity = ref<IntentKind | null>(null)
  const filterStatePersonal = ref<IntentState | null>(null)
  const filterStateCommunity = ref<IntentState | null>(null)

  const allPersonal = computed(() => intents.value.filter(i => i.visibility === 'private'))
  const allCommunity = computed(() => intents.value.filter(i => i.visibility === 'community'))

  const personal = computed(() =>
    allPersonal.value
      .filter(i => !filterKindPersonal.value || i.kind === filterKindPersonal.value)
      .filter(i => !filterStatePersonal.value || i.state === filterStatePersonal.value)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  )

  const community = computed(() =>
    allCommunity.value
      .filter(i => !filterKindCommunity.value || i.kind === filterKindCommunity.value)
      .filter(i => !filterStateCommunity.value || i.state === filterStateCommunity.value)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  )

  const personalEmptyKey = computed(() =>
    filterKindPersonal.value || filterStatePersonal.value
      ? 'kaivo.empty.filtered'
      : 'kaivo.empty.personal'
  )

  const communityEmptyKey = computed(() =>
    filterKindCommunity.value || filterStateCommunity.value
      ? 'kaivo.empty.filtered'
      : 'kaivo.empty.community'
  )

  const add = (data: Partial<Omit<Intent, 'id' | 'createdAt' | 'updatedAt' | 'witness'>>) => {
    const now = new Date().toISOString()
    const intent: Intent = {
      ...defaultIntent(),
      ...data,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now
    }
    intents.value.push(intent)
  }

  const update = (id: string, data: Partial<Omit<Intent, 'id'>>) => {
    const index = intents.value.findIndex(i => i.id === id)
    if (index === -1) return
    const updated: Intent = {
      ...intents.value[index]!,
      ...data,
      id,
      updatedAt: new Date().toISOString()
    }
    intents.value[index] = updated
  }

  const transition = (id: string, state: IntentState) => {
    const extra: Partial<Intent> = { state }
    if (state === 'dissolved') extra.dissolvedAt = new Date().toISOString()
    if (state === 'settled') extra.settledAt = new Date().toISOString()
    update(id, extra)
  }

  const remove = (id: string) => {
    intents.value = intents.value.filter(i => i.id !== id)
  }

  const witness = (id: string) => {
    if (witnessed.value.includes(id)) return
    const current = intents.value.find(i => i.id === id)
    if (!current) return
    witnessed.value.push(id)
    update(id, { witness: current.witness + 1 })
  }

  const hasWitnessed = (id: string) => witnessed.value.includes(id)

  const exportIntents = () => {
    const data = JSON.stringify(intents.value, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `kaivo-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return {
    intents,
    allPersonal,
    allCommunity,
    personal,
    community,
    filterKindPersonal,
    filterKindCommunity,
    filterStatePersonal,
    filterStateCommunity,
    personalEmptyKey,
    communityEmptyKey,
    add,
    update,
    transition,
    remove,
    witness,
    hasWitnessed,
    exportIntents
  }
}
