---
title: Tunnistautuminen
description: Opi miten tunnistautuminen toimii tässä projektissa.
---

## Yleiskatsaus

Tunnistautuminen hoidetaan asiakaspuolella käyttäen mallipohjaista `useAuth`-värettä _composable_. 
Se on suunniteltu niin, että se voidaan helposti vaihtaa oikeaan backendiin myöhemmin muuttamatta yhtään komponenttia tai väliohjelmistoa.

## Mallikäyttäjät

Kehitystä varten on saatavilla kaksi mallikäyttäjää:

| Sähköposti | Salasana | Rooli |
|------------|----------|-------|
| `admin@example.com` | `password` | admin |
| `member@example.com` | `password` | member |

## Käyttö

```ts
const { user, isLoggedIn, isAdmin, isMember, login, logout, fetchUser } = useAuth()
```

### Ominaisuudet

- `user` nykyinen käyttäjäobjekti tai `null`
- `isLoggedIn` `true` jos käyttäjä on kirjautunut sisään
- `isAdmin` `true` jos käyttäjällä on `admin`-rooli
- `isMember` `true` jos käyttäjällä on `member`- tai `admin`-rooli

### Metodit

- `login(email, password)` kirjaa käyttäjän sisään
- `logout()` tyhjentää istunnon ja ohjaa `/`-osoitteeseen
- `fetchUser()` palauttaa istunnon evästeestä sivun latauksen yhteydessä

## Istunto

Istunnot tallennetaan evästeeseen (`auth-token`) seitsemän päivän vanhenemisajalla. Tämä toimii sekä asiakaspuolella että palvelimella, tehden siitä yhteensopivan SSR- ja edge-käyttöönottojen kanssa.

## Reittien suojaaminen

Käytä sisällytettyjä väliohjelmistoja sivujen suojaamiseen:

```ts
// pages/profile.vue
definePageMeta({ middleware: 'auth' })
```

```ts
// pages/admin.vue
definePageMeta({ middleware: 'admin' })
```

- `auth` ohjaa `/login`-osoitteeseen jos käyttäjä ei ole kirjautunut
- `admin` ohjaa `/`-osoitteeseen jos käyttäjä ei ole ylläpitäjä

## Laajentaminen oikeaan tunnistautumiseen

Kun mock halutaan korvata oikealla backendilla, ainoastaan `useAuth.ts`-tiedoston `login`- ja `fetchUser`-funktioiden sisältö täytyy muuttaa, kaikki komponentit, väliohjelmistot ja sivut pysyvät ennallaan.

```ts
async function login(email: string, password: string) {
  await $fetch('/api/auth/login', {
    method: 'POST',
    body: { email, password }
  })
  await fetchUser()
}

async function fetchUser() {
  user.value = await $fetch('/api/auth/me').catch(() => null)
  return user.value
}
```