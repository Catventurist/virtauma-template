---
title: Tuonetar
description: Tuonelan emäntä, todennus ja roolit Virtaumassa.
navigation:
  title: Tuonetar
  icon: i-lucide-lock-keyhole
author: Kissa
avatar: /cat.png
tag: Tarina
tagColor: primary
kind: lore
level: current
time: 5min
likes: 0
replies: 0
publishedAt: 2026-05-25
tags: [tarina, tuonetar, todennus, roolit, mytologia, token]
---

Tuonetar seisoo Tuonenjoen rannalla. Hän ei päästä ketään ohi kysymättä. Ei väkivalloin tai ei huijaamalla. 

Jokainen, joka haluaa ylittää, tarvitsee veneen. Ilman sitä virta vie takaisin.

Virtaumassa vene on merkki. Tuonetar tarkistaa sen joka kerta.

### Vene - Merkki

Merkki tallennetaan evästeeseen. Se kantaa sinut joelta toiselle, seitsemän päivää ennen kuin se hajoaa.

```ts
const token = useCookie('auth-token', { maxAge: 60 * 60 * 24 * 7 })
```

### Ylitys - Kirjautuminen

Tuonetar tunnistaa sinut sähköpostistasi. Väärä vene tai väärä sana, virta vie takaisin.

```ts
async function login(email: string, password: string) {
  const found = mockUsers.find(u => u.email === email)
  if (!found || password !== 'password') {
    throw new Error('Invalid credentials')
  }
  user.value = found
  token.value = `mock-token-${found.id}`
}
```

### Syvyys - Roolit

Tuonetar päättää kuinka syvälle saat mennä.

- **Muukalainen** (`guest`), seisoo rannalla, lukee Vipusen sanoja
- **Tietäjä** (`member`), ylittää joen, pääsee yhteisöön
- **Väinämöinen** (`admin`), kulkee vapaasti, koskettaa pohjaa

```ts
const isLoggedIn = computed(() => !!user.value)
const isMember = computed(() => user.value?.role === 'member' || isAdmin.value)
const isAdmin = computed(() => user.value?.role === 'admin')
```

### Virta - Middleware

Virta vetää takaisin ne, jotka eivät kuulu. `auth.ts` suojaa yhteisön, `admin.ts` suojaa pohjan.

```ts [middleware/auth.ts]
export default defineNuxtRouteMiddleware(() => {
  const { isLoggedIn } = useAuth()
  if (!isLoggedIn.value) return navigateTo('/login')
})
```

```ts [middleware/admin.ts]
export default defineNuxtRouteMiddleware(() => {
  const { isAdmin } = useAuth()
  if (!isAdmin.value) return navigateTo('/')
})
```

### Tulevaisuus

Nyt Tuonetar tunnistaa sinut pilvipalvelusta. Myöhemmin hän kysyy Ikitursoalta.

```ts
// Nyt
const id = token.value.replace('mock-token-', '')
user.value = mockUsers.find(u => u.id === id) ?? null

// Myöhemmin
user.value = await $fetch('/api/auth/me')
```

> **Kukaan ei ylitä Tuonelaa ilman lupaa.**