import type { PageCollections } from '@nuxt/content'

export const useCollection = async <T>(
  name: string,
  key?: string
) => {
  const { locale } = useI18n()

  return useAsyncData<T[]>(
    key ?? `${name}-${locale.value}`,
    async () => {
      const collection = `${name}_${locale.value}` as keyof PageCollections
      const result = await queryCollection(collection).all()
      if (!result?.length && locale.value !== 'en') {
        return await queryCollection(`${name}_en` as keyof PageCollections).all() as T[]
      }
      return result as T[]
    },
    { watch: [locale] }
  )
}

export const useCollectionPath = async <T>(path: string) => {
  const { locale } = useI18n()
  const route = useRoute()

  return useAsyncData<T>(
    `page-${path}`,
    async () => {
      const collection = `content_${locale.value}` as keyof PageCollections
      const result = await queryCollection(collection).path(route.path).first()
      if (!result && locale.value !== 'en') {
        return await queryCollection('content_en').path(route.path).first() as T
      }
      return result as T
    },
    { watch: [locale] }
  )
}
