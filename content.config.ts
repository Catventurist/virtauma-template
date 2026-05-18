import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod/v4'

const ainoSchema = z.object({
  date: z.string(),
  badge: z.string().optional(),
  version: z.string().optional(),
  image: z.string().optional(),
  to: z.string().optional(),
  target: z.string().optional(),
  tags: z.array(z.enum(['feat', 'fix', 'docs', 'breaking', 'perf', 'refactor'])).optional(),
  milestone: z.enum(['foundation', 'community', 'life']).optional(),
  builders: z.array(z.object({
    name: z.string(),
    avatar: z.object({
      src: z.string()
    }).optional(),
    to: z.string().optional()
  })).optional()
})

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
    }),
    aino_fi: defineCollection({
      source: 'fi/aino/**/*.md',
      type: 'page',
      schema: ainoSchema
    }),
    aino_en: defineCollection({
      source: 'en/aino/**/*.md',
      type: 'page',
      schema: ainoSchema
    })
  }
})
