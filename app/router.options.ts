import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  async scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp()
    if (nuxtApp.$i18n && to.name !== from.name) {
      await nuxtApp.$i18n.waitForPendingLocaleChange()
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 64
      }
    }
    if (to === from) {
      return {
        left: 0,
        top: 0,
        behavior: 'smooth'
      }
    }
    return savedPosition || { top: 0, behavior: 'smooth' }
  }
}
