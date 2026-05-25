---
title: Authentication
description: Learn how authentication works in this project.
navigation:
  title: Authentication
  icon: i-lucide-shield-check
author: Cat
avatar: /cat.png
tag: Guide
tagColor: primary
kind: guide
level: surface
time: 5min
likes: 0
replies: 0
publishedAt: 2026-05-25
tags: [guide, authentication, composable, middleware]
---

## Overview

Authentication is handled client-side using a mock `useAuth` composable. It is designed to be easily swapped for a real backend later without changing any components or middleware.

## Mock Users

Two mock users are available for development:

| Email | Password | Role |
|-------|----------|------|
| `admin@example.com` | `password` | admin |
| `member@example.com` | `password` | member |

## Usage

```ts
const { user, isLoggedIn, isAdmin, isMember, login, logout, fetchUser } = useAuth()
```

### Properties

- `user` the current user object or `null`
- `isLoggedIn` `true` if a user is authenticated
- `isAdmin` `true` if the user has the `admin` role
- `isMember` `true` if the user has the `member` or `admin` role

### Methods

- `login(email, password)` authenticate a user
- `logout()` clear the session and redirect to `/`
- `fetchUser()` restore session from cookie on page load

## Session

Sessions are stored in a cookie (`auth-token`) with a 7 day expiry. This works on both client and server, making it compatible with SSR and edge deployments.

## Protecting Routes

Use the included middleware to protect pages:

```ts
// pages/profile.vue
definePageMeta({ middleware: 'auth' })
```

```ts
// pages/admin.vue
definePageMeta({ middleware: 'admin' })
```

- `auth` redirects to `/login` if not authenticated
- `admin` redirects to `/` if not an admin

## Extending to Real Auth

When ready to replace the mock with a real backend, only the internals of `login` and `fetchUser` in `useAuth.ts` need to change, all components, middleware and pages stay the same.

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