export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/i18n', '@nuxt/content', '@nuxt/image'],

  devtools: {
    enabled: false
  },

  css: ['~/assets/css/main.css'],

  content: {
    experimental: { sqliteConnector: 'native' }
  },

  ui: {
    experimental: {
      componentDetection: true
    }
  },

  /* routeRules: {
    '/': { prerender: true, redirect: '/en' }
  }, */

  compatibilityDate: '2026-05-14',

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/fi']
    }
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vueuse/core',
        'motion-v',
        'tailwindcss/colors',
        'zod/v4'
      ]
    }
  },

  telemetry: false,

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  fonts: {
    provider: 'bunny'
  },

  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix',
    locales: [
      { code: 'en', name: 'English', language: 'en-US', flag: '🇺🇸', dir: 'ltr', file: 'en.yml' },
      { code: 'fi', name: 'Suomi', language: 'fi-FI', flag: '🇫🇮', dir: 'ltr', file: 'fi.yml' }
    ],
    skipSettingLocaleOnNavigate: false,
    detectBrowserLanguage: false
  },

  icon: {
    serverBundle: {
      collections: ['lucide', 'simple-icons', 'vscode-icons']
    }
  }
})
