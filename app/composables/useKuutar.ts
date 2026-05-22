const CHAKRAS = [
  { key: 'crown', day: 0, icon: 'i-lucide-crown', primary: 'violet', neutral: 'mauve' },
  { key: 'eye', day: 1, icon: 'i-lucide-eye', primary: 'indigo', neutral: 'slate' },
  { key: 'throat', day: 2, icon: 'i-lucide-mic', primary: 'sky', neutral: 'mist' },
  { key: 'heart', day: 3, icon: 'i-lucide-heart', primary: 'emerald', neutral: 'olive' },
  { key: 'solar', day: 4, icon: 'i-lucide-sun', primary: 'amber', neutral: 'taupe' },
  { key: 'sacral', day: 5, icon: 'i-lucide-droplets', primary: 'orange', neutral: 'stone' },
  { key: 'root', day: 6, icon: 'i-lucide-mountain', primary: 'red', neutral: 'stone' }
]

export function useKuutar() {
  const appConfig = useAppConfig()
  const todayKey = CHAKRAS[new Date().getDay()]!.key
  const activeKey = ref(todayKey)
  const active = computed(() => CHAKRAS.find(c => c.key === activeKey.value)!)

  function setKuutar(key: string) {
    const chakra = CHAKRAS.find(c => c.key === key)
    if (!chakra) return
    activeKey.value = key
    appConfig.ui.colors.primary = chakra.primary
    appConfig.ui.colors.neutral = chakra.neutral
  }

  function resetToToday() {
    setKuutar(todayKey)
  }

  setKuutar(todayKey)

  return { chakras: CHAKRAS, active, activeKey, todayKey, setKuutar, resetToToday }
}
