export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/content'
  ],

  devtools: {
    enabled: false
  },

  css: ['~/assets/css/main.css'],

  /* content: {
    database: {
      type: 'sqlite',
      filename: '.data/content/contents.db'
    }
  },
 */
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
    preset: process.env.VERCEL ? 'vercel' : 'node-server',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/fi']
    }
  },

  vite: {
    optimizeDeps: {
      include: [
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
  }
})
