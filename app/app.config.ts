export default defineAppConfig({
  ui: {
    colors: {
      primary: 'lake',
      secondary: 'aurora',
      neutral: 'mist',
      success: 'teal',
      info: 'sky',
      warning: 'amber',
      error: 'rose'
    },
    button: {
      defaultVariants: {
        variant: 'subtle'
      }
    },
    sidebar: {
      slots: {
        container: 'bg-[color-mix(in_srgb,var(--color-lake-500)_5%,var(--ui-bg))] backdrop-blur-md',
        header: 'border-b border-[color-mix(in_srgb,var(--color-lake-300)_25%,var(--ui-border))]',
        footer: 'border-t border-[color-mix(in_srgb,var(--color-lake-300)_25%,var(--ui-border))]'
      }
    },
    github: {
      owner: 'Catventurist',
      repo: 'virtauma-template',
      branch: 'main',
      dir: 'content'
    }
  }
})

declare module '@nuxt/schema' {
  interface AppConfig {
    github?: {
      owner: string
      repo: string
      branch: string
      dir: string
    }
  }
}
