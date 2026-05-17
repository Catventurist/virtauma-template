import type { PageCollections, ContentNavigationItem } from '@nuxt/content'
import type { NavigationMenuItem, TreeItem } from '@nuxt/ui'
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

  const pageNav = computed<NavigationMenuItem[]>(() => [
    {
      label: t('nav.home'),
      to: localePath('/'),
      active: route.path === localePath('/')
    },
    {
      label: t('nav.about'),
      to: localePath('/about'),
      active: route.path.startsWith(localePath('/about'))
    },
    {
      label: t('nav.glossary'),
      to: localePath('/glossary'),
      active: route.path.startsWith(localePath('/glossary'))
    },
    {
      label: t('nav.vesi'),
      to: localePath('/vesi'),
      active: route.path.startsWith(localePath('/vesi'))
    },
    {
      label: t('nav.luoto'),
      to: localePath('/luoto/'),
      active: route.path.startsWith(localePath('/luoto'))
    },
    {
      label: t('nav.docs'),
      to: localePath('/docs/getting-started/introduction'),
      active: route.path.startsWith(localePath('/docs'))
    }
  ])

  return { pageNav }
}

export function useLuotoNav() {
  const { locale } = useI18n()
  const localePath = useLocalePath()
  const route = useRoute()

  const collectionKey = computed(() =>
    `luoto_${locale.value}` as keyof PageCollections
  )

  const slug = computed(() =>
    Array.isArray(route.params.slug) ? route.params.slug : []
  )

  const currentPath = computed(() => {
    const sub = slug.value.length ? `/${slug.value.join('/')}` : ''
    return `/${locale.value}/luoto${sub}`
  })

  const { data: lnavigation } = useAsyncData(
    () => `nav-luoto-${locale.value}`,
    () => queryCollectionNavigation(collectionKey.value),
    { watch: [locale] }
  )

  const { data: searchFiles } = useAsyncData(
    () => `search-luoto-${locale.value}`,
    () => queryCollectionSearchSections(collectionKey.value),
    { watch: [locale] }
  )

  const { data: page } = useAsyncData(
    () => `page-${locale.value}-${currentPath.value}`,
    () => queryCollection(collectionKey.value).path(currentPath.value).first(),
    { watch: [locale, currentPath] }
  )

  const { data: surround } = useAsyncData(
    () => `surround-${locale.value}-${currentPath.value}`,
    () => queryCollectionItemSurroundings(collectionKey.value, currentPath.value),
    { watch: [locale, currentPath] }
  )

  const luotoNav = computed(() => {
    const localeRoot = lnavigation.value?.find(item => item.path === `/${locale.value}`)
    const luotoRoot = localeRoot?.children?.find(item => item.path === `/${locale.value}/luoto`)
    return luotoRoot?.children?.filter(item => item.path !== `/${locale.value}/luoto`) ?? []
  })

  const breadcrumb = computed(() => {
    const segments = currentPath.value.split('/').filter(Boolean)
    return segments
      .slice(1)
      .map((seg, i) => {
        const contentPath = '/' + segments.slice(0, i + 2).join('/')
        const isLast = i === segments.length - 2
        return {
          label: seg.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()),
          to: isLast ? undefined : localePath(contentPath)
        }
      })
  })

  function toRoutePath(contentPath: string) {
    return contentPath || '/'
  }

  function getFileIcon(title = '') {
    if (!title.includes('.') || title.endsWith('.md')) return 'i-lucide-file-text'
    if (title.endsWith('.ts') || title.endsWith('.vue')) return 'i-lucide-file-code'
    if (title.endsWith('.json')) return 'i-lucide-file-braces'
    return 'i-lucide-file'
  }

  function mapToTree(items: ContentNavigationItem[]): TreeItem[] {
    return items.map(item => ({
      label: item.title ?? item.path.split('/').pop() ?? '',
      path: item.path,
      icon: item.children?.length ? undefined : getFileIcon(item.title ?? ''),
      defaultExpanded: true,
      children: item.children?.length ? mapToTree(item.children) : undefined,
      onSelect: item.children?.length
        ? undefined
        : () => navigateTo(item.path)
    }))
  }

  const treeItems = computed(() => mapToTree(luotoNav.value))

  const selectedValue = computed(() =>
    currentPath.value ? [currentPath.value] : undefined
  )

  return {
    collectionKey,
    currentPath,
    lnavigation,
    searchFiles,
    page,
    surround,
    breadcrumb,
    treeItems,
    selectedValue,
    toRoutePath,
    getFileIcon
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

  const { data: navigation } = useAsyncData(
    `navigation-${locale.value}`,
    async () => {
      const content = await queryCollectionNavigation(collection.value)
      if (!content?.length && locale.value !== 'en') {
        return await queryCollectionNavigation('docs_en')
      }
      return content
    },
    { watch: [locale] }
  )

  const navi = computed(() =>
    findPageChildren(navigation.value ?? [], localePath('/docs'))
  )

  const { data: files } = useLazyAsyncData(
    `search-${locale.value}`,
    async () => {
      const content = await queryCollectionSearchSections(collection.value)
      if (!content?.length && locale.value !== 'en') {
        return await queryCollectionSearchSections('docs_en')
      }
      return content
    },
    { server: false, watch: [locale] }
  )

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
