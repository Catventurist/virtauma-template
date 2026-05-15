---
title: Väreet
description: Pienet liikkeet, jotka kantavat toiminnallisuuden läpi sovelluksen.
---

::tip
EN: **Composables**
::

## useAuth

Hallitsee käyttäjän tunnistautumista, istunnonhallintaa ja roolien tarkistusta.

```ts
const { user, isLoggedIn, isAdmin, isMember, login, logout, fetchUser } = useAuth()
```

| Ominaisuus/Metodi | Tyyppi | Kuvaus |
|-------------------|--------|--------|
| `user` | `Ref<User \| null>` | Nykyinen käyttäjäobjekti |
| `isLoggedIn` | `ComputedRef<boolean>` | Onko käyttäjä kirjautunut sisään |
| `isAdmin` | `ComputedRef<boolean>` | Onko käyttäjällä admin-rooli |
| `isMember` | `ComputedRef<boolean>` | Onko käyttäjällä member- tai admin-rooli |
| `login` | `Function` | Kirjaudu sisään sähköpostilla ja salasanalla |
| `logout` | `Function` | Tyhjennä istunto ja ohjaa eteenpäin |
| `fetchUser` | `Function` | Palauta istunto evästeestä |

## useDocs

Hallitsee dokumentaation navigaatiota, hakua ja sisältökyselyjä täydellä i18n-tuella.

```ts
const { slug, navigation, navi, files, docsCollection } = useDocs()
```

| Ominaisuus | Tyyppi | Kuvaus |
|------------|--------|--------|
| `slug` | `ComputedRef<string>` | Nykyinen sivun slug reitistä |
| `navigation` | `Ref` | Täydellinen dokumentaation navigaatiopuu |
| `navi` | `ComputedRef` | Suodatettu navigaatio docs-osiolle |
| `files` | `Ref` | Hakuindeksi nykyiselle kielelle |
| `docsCollection` | `ComputedRef<string>` | Aktiivinen kokoelma-avain esim. `docs_fi` |

## useLuotoNav

Hallitsee navigaatiota, hakua ja puurakennetta Luoto-sisältöosiolle.

```ts
const { lnavigation, searchFiles, collectionKey, treeItems, toRoutePath, getFileIcon } = useLuotoNav()
```

| Ominaisuus/Metodi | Tyyppi | Kuvaus |
|-------------------|--------|--------|
| `lnavigation` | `Ref` | Täydellinen Luoto-navigaatiopuu |
| `searchFiles` | `Ref` | Hakuindeksi nykyiselle kielelle |
| `collectionKey` | `ComputedRef<string>` | Aktiivinen kokoelma-avain esim. `content_fi` |
| `treeItems` | `ComputedRef<TreeItem[]>` | `UTree`-komponentille muotoiltu navigaatiopuu |
| `toRoutePath` | `Function` | Poistaa kieliprefiksin sisältöpolusta |
| `getFileIcon` | `Function` | Palauttaa kuvakkeenimen tiedostopäätteen perusteella |

## i18n

Kaikki väreet ovat täysin kielitietoisia. Navigaatio, haku ja sisältökyselyt päivittyvät automaattisesti kielen vaihtuessa, manuaalista päivitystä ei tarvita.

```ts
const { locale, t } = useI18n()
const localePath = useLocalePath()
```

Käytä `localePath`-funktiota sisäisiin linkkeihin varmistaaksesi oikean kieliprefiksin:

```ts
localePath('/docs/getting-started')
```
