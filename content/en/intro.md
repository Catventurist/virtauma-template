---
title: Intro
description: App in a nutshell.
navigation:
  icon: i-lucide-waves
date: 2026-01-01
---


**Virtauma**

A community knowledge tool built with Nuxt, Nuxt UI, and motion-v. Water is not a metaphor, it is the actual structure.

## Stack

- **Nuxt**, framework
- **Nuxt UI**, component library
- **@nuxt/content**, MDC-driven pages
- **@nuxtjs/i18n**, Finnish and English
- **motion-v**, animations throughout

## Structure

```md
content/
  en/
    vesi.md
    about.md
    glossary.md
  fi/
    vesi.md
    about.md
    sanasto.md
  navigation.yml
layouts/
  default.vue
pages/
  index.vue
  about.vue
  glossary.vue
error.vue
components/
  VHeader.vue
  VFooter.vue
  WaterLogo.vue
  PageLoader.vue
  CursorRipple.vue
  HeroSection.vue
  StatsSection.vue
  StatCard.vue
  FeaturesSection.vue
  FeatureCard.vue
  ForWhomSection.vue
  ForWhomCard.vue
  ManifestoSection.vue
  GlossaryHero.vue
  GlossaryGroup.vue
  GlossaryTerm.vue
  PhaseFlow.vue
  TokenTiers.vue
i18n/
  locales/
    en.yml
    fi.yml
```

## Content

Pages are MDC-driven. To edit content, touch only the files in `content/`. No Vue files needed. Each section component accepts props from MDC frontmatter and falls back to i18n translations when used standalone.

## i18n

Two locales: `en` and `fi`. Keys live in `i18n/locales/en.yml` and `i18n/locales/fi.yml`. Navigation is driven by `content/navigation.yml`, add a page by adding an entry there.

## Theme

Custom `lake` color palette. Configured in `main.css` and `app.config.ts`.

## Deploying

Run `bun run build` and deploy to Vercel. No additional configuration needed. Set any environment variables in the Vercel dashboard before deploying.

```md
---
title: How Virtauma Works
description: Knowledge flows. This is how.
icon: lucide:waves
date: 2026-01-01
---
```
## Knowledge is not a document

Most tools treat knowledge like a file. You write it down, store it somewhere, and hope someone finds it later. But that is not how knowledge actually lives in communities. It lives in people. It moves between them. And when nobody is carrying it, it does not just sit there waiting. It disappears.

Virtauma is built around a different idea. Knowledge is water.

## Communities form around goals

A community in Virtauma is not something you create and invite people into. It forms naturally around a shared goal. The goal gives the water somewhere to flow. People find themselves moving in the same direction, carrying the same things, and a stream forms.

Nobody declares it. It just becomes visible.

## Pisarat, drops of knowledge

The basic unit in Virtauma is a **pisara**, a droplet. A pisara is a piece of knowledge that someone is carrying. It has a state:

- **Virtaa**, it is moving, being carried, alive
- **Pysähtynyt**, it has gone still, nobody is holding it
- **Haihtunut**, it evaporated, lost before it could complete
- **Meri**, it arrived, the journey is complete

A pisara is not a task. It is not a ticket. It is something real that a real person is holding and moving toward something.

## The flow is readable

Virtauma reads public signals, the natural traces communities leave as they work together. From these it shapes a picture of what is moving and what has gone still. No surveillance, no private data. Just the surface of the water, made meaningful.

You look at a community and you can feel it. Is the water moving? Where has it slowed? What is close to arriving?

## Reaching the meri

When a pisara completes its journey it reaches the **meri**, the sea. The goal has been met. The knowledge has arrived somewhere real. The carriers know it. The community knows it.

This is not just a closed ticket. It is a genuine completion.

And from the meri, new streams form. The people who carried something together and arrived together naturally begin to move toward new goals. The water cycle continues. Nothing is lost, only transformed.

## Why this matters

Communities lose knowledge not because they forget to write things down. They lose it because nobody is holding it.

Virtauma makes that visible. Not to monitor or manage people, but to give communities a way to see themselves honestly. To feel where the flow is healthy and where the water has gone still. To celebrate arrival and let new streams form from it.

The water was always there. Virtauma teaches you to read it.

## Fork the repo

Go to the Virtauma repository on GitHub and fork it. Your stream exists now.

## Write your AIM.md

Open `AIM.md`. What are you flowing toward? Write it down. A sentence is enough, it will sharpen as you go.

## Make it yours

- `locales/en.yml` and `locales/fi.yml`, your language, your words
- `content/`, your docs, your pisarat, your knowledge
- `app.config.ts`, your colors, your identity

Keep what fits. Remove what doesn't.

## Start carrying

A pisara doesn't need a ceremony. Notice something worth carrying. A decision, a lesson, a piece of hard-won understanding, and carry it. Write it down, open a discussion, make a commit.

## Find your people

Share the aim with people already moving in the same direction. Not a launch. Just a conversation. If it resonates, they will carry.

## Reach the meri

When the aim has been met, return to `AIM.md`. Write what arrived. Write what comes next.
