import type { PageCollections, ContentNavigationItem } from '@nuxt/content'
import type { NavigationMenuItem } from '@nuxt/ui'
import { withLeadingSlash } from 'ufo'
import { findPageChildren } from '@nuxt/content/utils'

export interface SocialLink {
  platform: 'discord' | 'x' | 'github' | 'gitlab' | 'telegram' | 'signal' | 'instagram' | 'youtube' | 'hive' | 'facebook' | 'website'
  url: string
  label?: string
}

export function useSocialLinks() {
  const socialLinks: SocialLink[] = [
    { platform: 'telegram', url: 'https://t.me/virtauma' },
    { platform: 'signal', url: 'https://signal.group/#CjQKIOS5Xb-Xdjil-AMmcVKC5glaJYqHpFZuLxe20Q99h8d_EhALzvkPUFWZqt7GliNDiLcL' },
    { platform: 'github', url: 'https://github.com/Catventurist/virtauma-template' }
  ]

  return { socialLinks }
}

export function useNav() {
  const { t } = useI18n()
  const localePath = useLocalePath()
  const route = useRoute()
  const { isLoggedIn } = useAuth()

  const pageNav = computed<NavigationMenuItem[]>(() => [
    {
      label: t('nav.pages'),
      icon: 'i-lucide-book-open',
      children: [
        {
          label: t('nav.luoto'),
          icon: 'i-lucide-map',
          to: localePath('/luoto/'),
          active: route.path.startsWith(localePath('/luoto'))
        },
        {
          label: t('nav.docs'),
          icon: 'i-lucide-file-text',
          to: localePath('/docs/getting-started/introduction'),
          active: route.path.startsWith(localePath('/docs'))
        },
        {
          label: t('nav.aino'),
          icon: 'i-lucide-scroll-text',
          to: localePath('/aino'),
          active: route.path.startsWith(localePath('/aino'))
        },
        {
          label: t('nav.vaki'),
          icon: 'i-lucide-users',
          to: localePath('/vaki'),
          active: route.path.startsWith(localePath('/vaki'))
        },
        {
          label: t('nav.talkoo'),
          icon: 'i-lucide-users-round',
          to: localePath('/talkoo'),
          active: route.path.startsWith(localePath('/talkoo'))
        },
        {
          label: t('nav.kaivo'),
          icon: 'i-lucide-lightbulb',
          to: localePath('/kaivo'),
          active: route.path.startsWith(localePath('/kaivo'))
        }
      ]
    },
    {
      label: t('nav.examples'),
      icon: 'i-lucide-layers',
      children: [
        {
          label: t('nav.alku'),
          icon: 'i-lucide-anchor',
          to: localePath('/alku'),
          active: route.path.startsWith(localePath('/alku'))
        },
        {
          label: t('nav.welcome'),
          icon: 'i-lucide-door-open',
          to: localePath('/welcome'),
          active: route.path.startsWith(localePath('/welcome'))
        },
        {
          label: t('nav.dash'),
          icon: 'i-lucide-layout-dashboard',
          to: localePath('/dash'),
          active: route.path.startsWith(localePath('/dash'))
        },
        {
          label: t('nav.silmukka'),
          icon: 'i-lucide-octagon',
          to: localePath('/silmukka'),
          active: route.path.startsWith(localePath('/silmukka'))
        }
      ]
    },
    {
      label: t('nav.watery'),
      icon: 'i-lucide-waves-horizontal',
      children: [
        /* {
          label: t('nav.home'),
          icon: 'i-lucide-waves-ladder',
          to: localePath('/home'),
          active: route.path.startsWith(localePath('/home'))
        }, */
        {
          label: t('nav.about'),
          icon: 'i-lucide-info',
          to: localePath('/about'),
          active: route.path.startsWith(localePath('/about'))
        },
        {
          label: t('nav.glossary'),
          icon: 'i-lucide-book',
          to: localePath('/glossary'),
          active: route.path.startsWith(localePath('/glossary'))
        },
        {
          label: t('nav.vesi'),
          icon: 'i-lucide-waves-horizontal',
          to: localePath('/vesi'),
          active: route.path.startsWith(localePath('/vesi'))
        }
      ]
    },
    ...(isLoggedIn.value
      ? [{
          label: t('nav.members'),
          icon: 'i-lucide-user',
          children: [
            { label: t('nav.profile'), icon: 'i-lucide-user', to: localePath('/profile'), active: route.path.startsWith(localePath('/profile')) },
            { label: t('nav.login'), icon: 'i-lucide-lock-keyhole', to: localePath('/login'), active: route.path.startsWith(localePath('/login')) }
          ]
        }]
      : [])
  ])
  return { pageNav }
}

export function useLuotoNav() {
  const { locale } = useI18n()
  const route = useRoute()
  const router = useRouter()

  const slug = computed(() =>
    Array.isArray(route.params.slug)
      ? withLeadingSlash(String(route.params.slug.join('/')))
      : withLeadingSlash(String(route.params.slug))
  )

  const collectionKey = computed(() =>
    `luoto_${locale.value}` as keyof PageCollections
  )

  const currentPath = computed(() => {
    const s = route.params.slug as string[]
    const sub = s?.length ? `/${s.join('/')}` : ''
    return `/${locale.value}/luoto${sub}`
  })

  const { data: lnavigation } = useAsyncData(
    `nav-luoto-${locale.value}`,
    () => queryCollectionNavigation(collectionKey.value),
    { watch: [locale] }
  )

  const { data: searchFiles } = useLazyAsyncData(
    `search-luoto-${locale.value}`,
    () => queryCollectionSearchSections(collectionKey.value),
    { server: false, watch: [locale] }
  )

  const luotoNav = computed(() => {
    const localeRoot = lnavigation.value?.find(item => item.path === `/${locale.value}`)
    const luotoRoot = localeRoot?.children?.find(item => item.path === `/${locale.value}/luoto`)
    return luotoRoot?.children?.filter(item => item.path !== `/${locale.value}/luoto`) ?? []
  })

  const localePath = useLocalePath()
  const breadcrumb = computed(() => {
    const segments = currentPath.value.split('/').filter(Boolean)
    if (segments.length <= 1) return []
    return segments
      .slice(1)
      .map((seg, i) => {
        const routePath = '/' + segments.slice(1, i + 2).join('/')
        const isLast = i === segments.length - 2
        return {
          label: seg.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()),
          to: isLast ? undefined : localePath(routePath)
        }
      })
  })

  const selectedValue = computed(() => {
    const pathWithoutHash = currentPath.value.split('#')[0]
    const findItem = (items: ContentNavigationItem[]): ContentNavigationItem | undefined => {
      for (const item of items) {
        if (item.path === pathWithoutHash) return item
        if (item.children?.length) {
          const found = findItem(item.children)
          if (found) return found
        }
      }
    }
    return findItem(luotoNav.value)
  })

  function handleSelect(_: unknown, item: ContentNavigationItem) {
    if (!item.children?.length) {
      nextTick(() => router.push(item.path))
    }
  }

  return {
    slug,
    locale,
    collectionKey,
    currentPath,
    lnavigation,
    luotoNav,
    searchFiles,
    breadcrumb,
    selectedValue,
    handleSelect
  }
}

export const useDocs = () => {
  const { locale } = useI18n()
  const localePath = useLocalePath()
  const route = useRoute()

  const slug = computed(() =>
    Array.isArray(route.params.slug)
      ? withLeadingSlash(route.params.slug.join('/'))
      : withLeadingSlash(String(route.params.slug))
  )

  const collection = computed(() =>
    `docs_${locale.value}` as keyof PageCollections
  )

  const { data: files } = useLazyAsyncData(
    () => `search-${locale.value}`,
    async () => {
      const content = await queryCollectionSearchSections(collection.value)
      if (!content?.length && locale.value !== 'en') {
        return await queryCollectionSearchSections('docs_en')
      }
      return content
    },
    { server: false, watch: [locale] }
  )

  const { data: navigation } = useAsyncData(
    () => `navigation-${locale.value}`,
    async () => {
      const content = await queryCollectionNavigation(collection.value)
      if (!content?.length && locale.value !== 'en') {
        return await queryCollectionNavigation('docs_en')
      }
      return content
    },
    { watch: [locale] }
  )
  /* const { data: navigation } = useAsyncData(
    `navigation-${locale.value}`,
    async () => {
      const content = await queryCollectionNavigation(collection.value)
      if (!content?.length && locale.value !== 'en') {
        return await queryCollectionNavigation('docs_en')
      }
      return content
    },
    { watch: [locale] }
  ) */

  const navi = computed(() =>
    findPageChildren(navigation.value ?? [], localePath('/docs'))
  )

  /*   const { data: files } = useLazyAsyncData(
    `search-${locale.value}`,
    async () => {
      const content = await queryCollectionSearchSections(collection.value)
      if (!content?.length && locale.value !== 'en') {
        return await queryCollectionSearchSections('docs_en')
      }
      return content
    },
    { server: false, watch: [locale] }
  ) */

  return {
    slug,
    collection,
    navigation,
    navi,
    files
  }
}

export function useFooterLinks() {
  const { t } = useI18n()
  const localePath = useLocalePath()
  const footerLinks = computed<NavigationMenuItem[]>(() => [
    { label: t('nav.conduct'), to: localePath('/docs/development/conduct') },
    { label: t('nav.cookie'), to: localePath('/docs/development/cookie') },
    { label: t('nav.tos'), to: localePath('/docs/development/tos') },
    { label: t('nav.privacy'), to: localePath('/docs/development/privacy') },
    { label: t('nav.security'), to: localePath('/docs/development/security') }
  ])

  return { footerLinks }
}
