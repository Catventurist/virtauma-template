---
title: Vipunen
description: Muinainen tietäjä, sisältö ja tieto Virtaumassa.
navigation:
  icon: i-lucide-book-open-text
---

## Vipunen

Antero Vipunen makaa maan alla, vuosituhansia vanha. Puut kasvavat hänen hartioillaan, sammalet peittävät hänen kasvonsa. Mutta hänessä elää kaikki tieto, runot, tarinat, ohjeet. Väinämöinen matkasi hänen luokseen hakemaan sanoja, joita kukaan muu ei tiennyt.

Vipunen on Virtauman sisältökerros. Hän ei muutu, ellei häntä herätellä. Hän ei unohda mitään.

### Kokoelmat

Tieto järjestyy lokalisoituihin kokoelmiin. Jos käännöstä ei löydy, Vipunen vastaa englanniksi.

```ts
// content.config.ts
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

### Hakeminen

Vipunen vastaa oikealla kielellä. Jos sanoja ei löydy, hän turvautuu englantiin.

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

### Pintaan nouseminen

Surround hakee sivun naapurit, edellisen ja seuraavan. `description` riittää navigointiin, ei tarvita kaikkea sisältöä.

```ts
const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryCollectionItemSurroundings(
    ('docs_' + locale.value) as keyof PageCollections,
    route.path,
    { fields: ['description'] }
  )
)
```

### Välimuisti

Vipunen herää kerran tunnissa. Sisältö ei muutu usein, `isr` pitää vastausajat nopeina ilman turhia herättelyitä.

```ts
routeRules: {
  '/docs/**': { isr: 3600 },
}
```

> **Tieto ei katoa. Se vain odottaa kysyjäänsä.**