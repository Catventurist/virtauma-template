---
title: Kielet
description: Monet kielet, yksi ääni. Kansainvälistäminen Virtaumassa.
navigation:
  icon: i-lucide-languages
---

## Kielet

Väinämöinen lauloi maailman olemassaoloon. 

Useammilla kielillä sanat muuttivat muotoaan, mutta merkitys pysyi. Sama runo, eri suu.

Virtauma puhuu kahdella kielellä. Englanti on virta josta kaikki alkaa, suomi sen syvempi haara.

### Asetukset

Reititys etuliitteellä, `/en/docs` ja `/fi/docs`. Selain ei päätä, käyttäjä päättää.

```ts [nuxt.config.ts] 
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

### Käännökset

Sanat asuvat yml-tiedostoissa. Yksinkertaisia, luettavia, muutettavia.

```yaml
# i18n/fi.yml
nav:
  docs: Oppaat
  community: Yhteisö
auth:
  login: Kirjaudu sisään
  logout: Kirjaudu ulos
```

### Kielen vaihtaminen

```ts
const { locale, setLocale } = useI18n()

await setLocale('fi')
```

### Vipusen kanssa

Kielet ja Vipunen kulkevat käsi kädessä. 

Kun kieli vaihtuu, Vipunen etsii oikean kokoelman ja palaa englantiin, jos käännöstä ei löydy.

```ts
const { locale } = useI18n()

watch(locale, () => {
  navigateTo(`/${locale.value}${route.path.replace(/^\/(en|fi)/, '')}`)
})
```

> **Sama vesi, eri nimi.**