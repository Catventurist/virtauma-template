import { z } from 'zod/v4'

export const welcomeSchema = z.object({
  locale: z.enum(['en', 'fi'])
})

export const identitySchema = z.object({
  name: z.string().min(2).max(32),
  address: z.string().min(10).max(64)
})

export const freezeSchema = z.object({
  amount: z.number().min(0).max(100)
})

export const communitySchema = z.object({
  communityId: z.string().min(1)
})

export type WelcomeData = z.infer<typeof welcomeSchema>
export type IdentityData = z.infer<typeof identitySchema>
export type FreezeData = z.infer<typeof freezeSchema>
export type CommunityData = z.infer<typeof communitySchema>

export const mockCommunities = [
  {
    id: 'vesisto',
    name: 'Vesistö',
    description: 'Water stewardship and lake ecology',
    members: 142,
    icon: 'i-lucide-waves-horizontal',
    cost: 10
  },
  {
    id: 'kaupunki',
    name: 'Kaupunki',
    description: 'Urban commons and city infrastructure',
    members: 389,
    icon: 'i-lucide-building-2',
    cost: 10
  },
  {
    id: 'metsä',
    name: 'Metsä',
    description: 'Forest governance and land care',
    members: 217,
    icon: 'i-lucide-trees',
    cost: 10
  },
  {
    id: 'rannikko',
    name: 'Rannikko',
    description: 'Coastal communities and archipelago',
    members: 95,
    icon: 'i-lucide-anchor',
    cost: 10
  }
]

export function useOnboarding() {
  const step = ref(0)

  const welcome = reactive<WelcomeData>({ locale: 'fi' })
  const identity = reactive<IdentityData>({ name: '', address: '' })
  const freeze = reactive<FreezeData>({ amount: 20 })
  const community = reactive<CommunityData>({ communityId: '' })

  const initialSula = 100

  const steps = computed(() => [
    { title: 'Tervetuloa', icon: 'i-lucide-droplets' },
    { title: 'Identiteetti', icon: 'i-lucide-user' },
    { title: 'SULA', icon: 'i-lucide-waves-horizontal' },
    { title: 'Jäädytä', icon: 'i-lucide-snowflake' },
    { title: 'Yhteisö', icon: 'i-lucide-users' },
    { title: 'Valmis', icon: 'i-lucide-check' }
  ])

  function next() {
    step.value = Math.min(step.value + 1, steps.value.length - 1)
  }
  function prev() {
    step.value = Math.max(step.value - 1, 0)
  }

  function generateAddress() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    identity.address = '0x' + Array.from({ length: 16 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('')
  }

  const result = computed(() => ({
    locale: welcome.locale,
    name: identity.name,
    address: identity.address,
    sula: initialSula - freeze.amount,
    jaa: freeze.amount,
    communityId: community.communityId
  }))

  return {
    step,
    steps,
    welcome,
    identity,
    freeze,
    community,
    initialSula,
    mockCommunities,
    next,
    prev,
    generateAddress,
    result
  }
}
