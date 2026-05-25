---
title: Kielet
description: Many tongues, one voice. Internationalization in Virtauma.
navigation:
  title: Kielet
  icon: i-lucide-languages
author: Cat
avatar: /cat.png
tag: Lore
tagColor: primary
kind: lore
level: surface
time: 3min
likes: 0
replies: 0
publishedAt: 2026-05-25
tags: [lore, i18n, languages, vainamoinen, mythology, finnish]
---

Väinämöinen sang the world into existence. Not in one language, the words changed shape, but the meaning held. 

The same rune, a different mouth.

Virtauma speaks two tongues. English is the current from which everything begins, Finnish its deeper branch.

### Configuration

Prefix routing, `/en/docs` and `/fi/docs`. The browser does not decide, the user does.

```ts
// nuxt.config.ts
i18n: {
  defaultLocale: 'en',
  strategy: 'prefix',
  locales: [
    { code: 'en', name: 'English', language: 'en-US', file: 'en.yml' },
    { code: 'fi', name: 'Suomi', language: 'fi-FI', file: 'fi.yml' }
  ],
  detectBrowserLanguage: false,
}
```

### Translations

Words live in yml files. Simple, readable, changeable.

```yaml [i18n/en.yml]
nav:
  docs: Docs
  community: Community
auth:
  login: Sign in
  logout: Sign out
```

### Switching

```ts
const { locale, setLocale } = useI18n()

await setLocale('fi')
```

### With Vipunen

Kielet and Vipunen walk hand in hand. When the tongue changes, Vipunen searches the right collection, and falls back to English if no translation is found.

```ts
const { locale } = useI18n()

watch(locale, () => {
  navigateTo(`/${locale.value}${route.path.replace(/^\/(en|fi)/, '')}`)
})
```

> **Same water, different name.**