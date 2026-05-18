---
title: Ikiturso
description: Muinainen syvyys, yhteisödatan pysyvyydestä.
navigation:
  icon: i-lucide-database-zap
---

::tip
Tuleva ominaisuus
::

## Ikiturso

Ikiturso nukkuu meren pohjassa, muistaen kaiken. Käyttäjät, yhteydet, äänet, kaikki vajoaa syvyyteen ja säilyy.

```ts
import { createClient } from '@libsql/client'

const db = createClient({
  url: process.env.TURSO_URL,
  authToken: process.env.TURSO_TOKEN,
})
```

### Rakenne

Ikiturso herää pienestä. Yksi sielu, yksi taulu, yhteisö kasvaa ajan myötä.

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at INTEGER NOT NULL
);
```

### Lukeminen

Reunasolmut kurkistavat syvyyteen. Nopea, lähellä, hiljainen.

```ts
const user = await db.execute({
  sql: 'SELECT * FROM users WHERE id = ?',
  args: [id],
})
```

### Kirjoittaminen

API-reitti vie äänen pohjaan. Ikiturso muistaa.

```ts
await db.execute({
  sql: 'INSERT INTO users (id, name, email, created_at) VALUES (?, ?, ?, ?)',
  args: [id, name, email, Date.now()],
})
```

### Kasvaminen

Ikiturso ei ole koskaan täynnä. Profiilit, kommentit, keskustelut, yhteydet, syvyys on pohjaton.

```sql
ALTER TABLE users ADD COLUMN bio TEXT;

CREATE TABLE comments (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  content TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
```

> **Syvyys ei pelkää lisää.**