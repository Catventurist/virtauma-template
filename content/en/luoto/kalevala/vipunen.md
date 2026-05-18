---
title: Vipunen
description: The ancient sage, content and knowledge in Virtauma.
navigation:
  icon: i-lucide-book-open-text
---

## Vipunen

Antero Vipunen lies beneath the earth, ancient beyond memory. Trees grow from his shoulders, moss covers his face. 

But inside him lives all knowledge, runes, stories, instructions. Väinämöinen journeyed into his mouth to retrieve words no one else knew.

Vipunen is Virtauma's content layer. He does not change unless stirred. He forgets nothing.

### Collections

Knowledge organizes itself into locale-prefixed collections. If a translation is missing, Vipunen answers in English.

```ts [content.config.ts]
export const collections = {
  docs_fi: defineCollection({
    source: 'fi/docs/**/*',
    type: 'page',
  }),
  docs_en: defineCollection({
    source: 'en/docs/**/*',
    type: 'page',
  }),
}
```

### Querying

Vipunen answers in the right tongue. If the words are not found, he falls back to English.

```ts
import { withLeadingSlash } from 'ufo'
import type { DocsEnCollectionItem, DocsFiCollectionItem, PageCollections } from '@nuxt/content'

const route = useRoute()
const { locale } = useI18n()

const slug = computed(() =>
  Array.isArray(route.params.slug)
    ? withLeadingSlash(String(route.params.slug.join('/')))
    : withLeadingSlash(String(route.params.slug))
)

const currentPath = computed(() => {
  const slug = route.params.slug as string[]
  const sub = slug?.length ? `/${slug.join('/')}` : ''
  return `/${locale.value}/docs${sub}`
})

const { data: page } = await useAsyncData('docs-' + slug.value, async () => {
  const content = await queryCollection('docs_' + locale.value as keyof PageCollections)
    .path(currentPath.value)
    .first()
  if (!content && locale.value !== 'en') {
    return await queryCollection('docs_en').first()
  }
  return content as DocsEnCollectionItem | DocsFiCollectionItem
}, {
  watch: [locale]
})
```

### Surfacing

Surround fetches the page's neighbors, previous and next. `description` is enough for navigation, no need to load full content.

```ts
const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryCollectionItemSurroundings(
    ('docs_' + locale.value) as keyof PageCollections,
    route.path,
    { fields: ['description'] }
  )
)
```

### Cache

Vipunen wakes once an hour. Content does not change often, `isr` keeps response times fast without unnecessary revalidations.

```ts
routeRules: {
  '/docs/**': { isr: 3600 },
}
```

> **Knowledge does not disappear. It only waits for the one who asks.**