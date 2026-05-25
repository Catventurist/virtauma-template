---
title: Tuonetar
description: Mistress of Tuonela, authentication and roles in Virtauma.
navigation:
  title: Tuonetar
  icon: i-lucide-lock-keyhole
author: Cat
avatar: /cat.png
tag: Lore
tagColor: primary
kind: lore
level: current
time: 5min
likes: 0
replies: 0
publishedAt: 2026-05-25
tags: [lore, tuonetar, authentication, roles, mythology, token]
---

Tuonetar stands on the bank of the Tuoni river. She lets no one pass without asking. Not by force, not by trickery, everyone who wants to cross needs a vessel. Without one, the current carries you back.

In Virtauma, the vessel is the token. Tuonetar checks it every time.

### The Vessel - Token

The token is stored in a cookie. It carries you from one bank to the other, seven days before it falls apart.

```ts
const token = useCookie('auth-token', { maxAge: 60 * 60 * 24 * 7 })
```

### The Crossing - Login

Tuonetar recognizes you by your email. Wrong vessel or wrong word, the current carries you back.

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

### The Depth - Roles

Tuonetar decides how deep you may go.

- **Muukalainen** (`guest`), stands on the bank, reads Vipunen's words
- **Tietäjä** (`member`), crosses the river, enters the community
- **Väinämöinen** (`admin`), moves freely, touches the bottom

```ts
const isLoggedIn = computed(() => !!user.value)
const isMember = computed(() => user.value?.role === 'member' || isAdmin.value)
const isAdmin = computed(() => user.value?.role === 'admin')
```

### The Current - Middleware

The current pulls back those who do not belong. `auth.ts` guards the community, `admin.ts` guards the bottom.

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

### The Future

Now Tuonetar recognizes you from a mock list. Later she will ask Ikiturso.

```ts
// Now
const id = token.value.replace('mock-token-', '')
user.value = mockUsers.find(u => u.id === id) ?? null

// Later
user.value = await $fetch('/api/auth/me')
```

> **No one crosses Tuonela without permission.**