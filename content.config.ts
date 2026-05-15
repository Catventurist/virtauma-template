import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/**',
        exclude: ['en/docs/**']
      }
    }),
    content_fi: defineCollection({
      type: 'page',
      source: {
        include: 'fi/**',
        exclude: ['fi/docs/**']
      }
    }),
    docs_en: defineCollection({
      source: 'en/docs/**/*',
      type: 'page'
    }),
    docs_fi: defineCollection({
      source: 'fi/docs/**/*',
      type: 'page'
    }),
    luoto_en: defineCollection({
      source: 'en/luoto/**/*',
      type: 'page'
    }),
    luoto_fi: defineCollection({
      source: 'fi/luoto/**/*',
      type: 'page'
    })
  }
})
