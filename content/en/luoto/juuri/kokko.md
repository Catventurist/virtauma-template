---
title: Kokko
description: The great eagle whose old name was Zeit. He carries your work across the sky and time folds behind him.
date: 2026-05-20
navigation:
  title: Kokko
  icon: i-lucide-globe
---

> **His old name was Zeit. Time. He ate it.**


Kokko is the great eagle of the upper world. He lives where the sky thins into
nothing and sees everything below. When you give him something to carry, it arrives
before you have finished watching him go.

Vercel was once called Zeit. The name was not an accident.

## Ennen kuin aloitat - Before you begin

You will need a Vercel account and your repository on GitHub, GitLab, or Bitbucket.
Kokko reads the project and knows what to do with it. You do not need to teach him.

## Askeleet - Steps

::steps
### Anna Kokolle pääsy - Give Kokko access

Go to [vercel.com/new](https://vercel.com/new). Import your repository. Kokko detects Nuxt automatically and sets the build command and output directory without
being asked.

### Kerro Karun nimet - Speak Karhu's names

Before you deploy, add your environment variables under the Environment Variables
section. What lives in your `.env` and should not be seen by strangers belongs here,
not in your code, not in your repository.

::callout{icon="i-lucide-shield" color="warning"}
Karhu's names are never spoken in the open. Secrets go into Vercel's environment.
If a stranger could read it, it does not belong in the repository.
::

### Päästä irti - Let go

Press deploy. Kokko lifts the work, carries it across the edge network, and sets
it down in front of the world. He gives you a URL. Zeit has passed. The portti
is open.

### Kiinnitä kotisi - Fix your home

Under Domains in your project settings, add your own domain and follow the DNS
instructions. Kokko handles the certificate. It takes a few minutes. Then the
address is yours.

### Palaa rakentamaan - Return to building

From here, every push to your main branch wakes Kokko again. He lifts the new
version and carries it without being asked. Rahko keeps the schedule. 

The tonttu rebuilds. Zeit folds.
::

::callout{icon="i-lucide-sparkles" color="primary"}
Every branch and pull request gets its own preview deployment. A place to see the work before Kokko carries it to the main portti. Use it.
::

**Kokko carries. You build. Time folds.**