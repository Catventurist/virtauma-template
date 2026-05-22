import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod/v4'

const luotoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  author: z.string().min(1),
  avatar: z.string(),
  tag: z.string(),
  tagColor: z.string(),
  kind: z.enum(['guide', 'reference', 'ritual', 'lore']),
  level: z.enum(['surface', 'current', 'deep']).default('surface'),
  time: z.string(),
  likes: z.number().int().nonnegative().default(0),
  replies: z.number().int().nonnegative().default(0),
  tags: z.array(z.string()).default([]),
  publishedAt: z.iso.date()
})

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

const vakiSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  avatar: z.url(),
  bio: z.string().optional(),
  location: z.string().optional(),
  joined: z.iso.date(),
  stories: z.number().int().nonnegative(),
  offerings: z.number().int().nonnegative().default(0),
  state: z.enum(['flowing', 'still', 'deep']).default('still')
})

const talkooSchema = z.object({
  title: z.string().min(1),
  desc: z.string().min(1),
  day: z.string(),
  month: z.string(),
  year: z.string().optional(),
  kind: z.enum(['gathering', 'workshop', 'reading', 'ritual']),
  state: z.enum(['upcoming', 'ongoing', 'past']).default('upcoming'),
  location: z.string().optional(),
  host: z.string().optional(),
  capacity: z.number().int().positive().optional(),
  url: z.url().optional()
})

const kaivoSchema = z.object({
  title: z.string().min(1),
  kind: z.enum(['act', 'make', 'release', 'learn', 'give', 'tend']),
  state: z.enum(['ripple', 'flowing', 'settled', 'dissolved']).default('ripple'),
  visibility: z.enum(['community', 'private']).default('community'),
  replies: z.number().int().nonnegative().default(0),
  witness: z.number().int().nonnegative().default(0),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime().optional()
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
      type: 'page',
      schema: luotoSchema
    }),
    luoto_fi: defineCollection({
      source: 'fi/luoto/**/*',
      type: 'page',
      schema: luotoSchema
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
    }),
    vaki_en: defineCollection({ type: 'page', source: 'en/vaki/*.md', schema: vakiSchema }),
    vaki_fi: defineCollection({ type: 'page', source: 'fi/vaki/*.md', schema: vakiSchema }),
    talkoo_en: defineCollection({ type: 'page', source: 'en/talkoo/*.md', schema: talkooSchema }),
    talkoo_fi: defineCollection({ type: 'page', source: 'fi/talkoo/*.md', schema: talkooSchema }),
    kaivo_en: defineCollection({ type: 'page', source: 'en/kaivo/*.md', schema: kaivoSchema }),
    kaivo_fi: defineCollection({ type: 'page', source: 'fi/kaivo/*.md', schema: kaivoSchema })
  }
})
