---
title: Ikiturso
description: The ancient depth, persisting community data in Virtauma.
navigation:
  title: Ikiturso
  icon: i-lucide-database-zap
author: Cat
avatar: /cat.png
tag: Lore
tagColor: primary
kind: lore
level: deep
time: 3min
likes: 0
replies: 0
publishedAt: 2026-05-25
tags: [lore, ikiturso, database, persistence, mythology, depth]
---

::tip
Future feature
::

Ikiturso sleeps at the bottom of the sea, remembering everything. Users, connections, voices, all sink into the deep and are kept.

```ts
import { createClient } from '@libsql/client'

const db = createClient({
  url: process.env.TURSO_URL,
  authToken: process.env.TURSO_TOKEN,
})
```

### Structure

Ikiturso wakes small. One soul, one table, the community grows in time.

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at INTEGER NOT NULL
);
```

### Reading

Edge nodes peer into the deep. Fast, close, silent.

```ts
const user = await db.execute({
  sql: 'SELECT * FROM users WHERE id = ?',
  args: [id],
})
```

### Writing

An API route carries the voice to the bottom. Ikiturso remembers.

```ts
await db.execute({
  sql: 'INSERT INTO users (id, name, email, created_at) VALUES (?, ?, ?, ?)',
  args: [id, name, email, Date.now()],
})
```

### Growing

Ikiturso is never full. Profiles, comments, discussions, connections, the depth is bottomless.

```sql
ALTER TABLE users ADD COLUMN bio TEXT;

CREATE TABLE comments (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  content TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
```

> **The deep does not fear more.**