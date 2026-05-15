export interface MockFile {
  path: string
  title: string
  body: string
  children?: MockFile[]
}

export const MOCK_CONTENT: MockFile[] = [
  {
    path: '/welcome',
    title: 'Welcome',
    body: `
# Welcome to Dive

Your collection of user guides, crafted for clarity.

::callout{icon="i-lucide-droplets" color="info"}
Select a guide from the sidebar to get started.
::

## What's inside

- Getting started guides
- Feature walkthroughs
- Troubleshooting references
    `.trim()
  },
  {
    path: '/guides',
    title: 'guides',
    body: '',
    children: [
      {
        path: '/guides/quick-start',
        title: 'quick-start.md',
        body: `
# Quick Start

Get up and running in minutes.

## Step 1 — Install

\`\`\`bash
pnpm add @nuxt/ui @nuxt/content
\`\`\`

## Step 2 — Configure

\`\`\`ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/content']
})
\`\`\`

## Step 3 — Create your first guide

Add a \`.md\` file to your \`content/\` directory and start writing.
        `.trim()
      },
      {
        path: '/guides/writing',
        title: 'writing.md',
        body: `
# Writing Guides

Guides are written in MDC — Markdown with Components.

## Callouts

\`\`\`mdc
::callout{icon="i-lucide-info" color="info"}
This is a callout.
::
\`\`\`

## Code blocks

Annotate code blocks with a filename:

\`\`\`ts [example.ts]
const hello = 'world'
\`\`\`
        `.trim()
      },
      {
        path: '/guides/i18n',
        title: 'i18n.md',
        body: `
# Internationalization

Dive supports multiple languages out of the box.

## Adding a locale

1. Create \`i18n/locales/de.yml\`
2. Add the locale to \`nuxt.config.ts\`

\`\`\`ts
locales: [
  { code: 'de', language: 'de-DE', file: 'de.yml', name: 'Deutsch' }
]
\`\`\`

## Translating content

Keep one \`content/\` folder per locale or use path prefixes.
        `.trim()
      }
    ]
  },
  {
    path: '/troubleshooting',
    title: 'troubleshooting',
    body: '',
    children: [
      {
        path: '/troubleshooting/common-issues',
        title: 'common-issues.md',
        body: `
# Common Issues

## Content not rendering

Make sure \`@nuxt/content\` is registered **after** \`@nuxt/ui\` in your modules array.

## Styles not applying

Add the \`@source\` directive to your CSS:

\`\`\`css [main.css]
@source "../../../content/**/*";
\`\`\`

## Locale not switching

Check that \`strategy\` is set in your i18n config and that \`localePath()\` is used for all internal navigation.
        `.trim()
      }
    ]
  }
]

function flatten(files: MockFile[]): Map<string, MockFile> {
  const map = new Map<string, MockFile>()
  for (const file of files) {
    map.set(file.path, file)
    if (file.children) for (const [k, v] of flatten(file.children)) map.set(k, v)
  }
  return map
}

export function useMockContent() {
  const fileMap = flatten(MOCK_CONTENT)
  const getFile = (path: string) => fileMap.get(path)
  const isFolder = (file: MockFile) => !!file.children?.length
  return { files: MOCK_CONTENT, getFile, isFolder }
}
