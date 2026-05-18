---
title: Composables - Väreet
description: Learn about the composables available in this project.
navigation:
  icon: i-lucide-waves-vertical
---

## useAuth

Handles user authentication, session management and role checking.

```ts
const { user, isLoggedIn, isAdmin, isMember, login, logout, fetchUser } = useAuth()
```

| Property/Method | Type | Description |
|----------------|------|-------------|
| `user` | `Ref<User \| null>` | Current user object |
| `isLoggedIn` | `ComputedRef<boolean>` | Whether a user is authenticated |
| `isAdmin` | `ComputedRef<boolean>` | Whether user has admin role |
| `isMember` | `ComputedRef<boolean>` | Whether user has member or admin role |
| `login` | `Function` | Authenticate with email and password |
| `logout` | `Function` | Clear session and redirect |
| `fetchUser` | `Function` | Restore session from cookie |

## useDocs

Handles documentation navigation, search and content queries with full i18n support.

```ts
const { slug, navigation, navi, files, docsCollection } = useDocs()
```

| Property | Type | Description |
|----------|------|-------------|
| `slug` | `ComputedRef<string>` | Current page slug from route |
| `navigation` | `Ref` | Full docs navigation tree |
| `navi` | `ComputedRef` | Filtered navigation for docs section |
| `files` | `Ref` | Search index for current locale |
| `docsCollection` | `ComputedRef<string>` | Active collection key e.g. `docs_fi` |

## useLuotoNav

Handles navigation, search and tree rendering for the Luoto content section.

```ts
const { lnavigation, searchFiles, collectionKey, treeItems, toRoutePath, getFileIcon } = useLuotoNav()
```

| Property/Method | Type | Description |
|----------------|------|-------------|
| `lnavigation` | `Ref` | Full Luoto navigation tree |
| `searchFiles` | `Ref` | Search index for current locale |
| `collectionKey` | `ComputedRef<string>` | Active collection key e.g. `content_fi` |
| `treeItems` | `ComputedRef<TreeItem[]>` | Navigation tree formatted for `UTree` |
| `toRoutePath` | `Function` | Strips locale prefix from content path |
| `getFileIcon` | `Function` | Returns icon name based on file extension |

## i18n

All composables are fully locale-aware. Navigation, search and content queries automatically update when the locale changes — no manual refresh needed.

```ts
const { locale, t } = useI18n()
const localePath = useLocalePath()
```

Use `localePath` when linking to internal routes to ensure the correct locale prefix is applied:

```ts
localePath('/docs/getting-started')
```