---
title: Tuoni
description: In Tuonela, you are what you are. Nothing else passes.
navigation:
  title: Tuoni
  icon: i-lucide-shield
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
tags: [lore, tuoni, validation, schema, mythology, tuonela]
---

> **"He had heard every excuse. None of them had ever worked."**

Tuoni ruled Tuonela the way a schema rules a form. Completely, without sentiment, with
a precise idea of what belonged and what did not. Heroes arrived from the living world
with their confidence and their clever words and he looked at what they brought and told
them, flatly, whether it was the right thing or not.

Usually it was not.

**Come back when you have the right shape.**

## What He Required

TypeScript tells you what a thing is supposed to be while you write the code. Zod
checks that it actually is at runtime, when the outside world hands you something you
did not make and cannot fully trust.

A schema is Tuoni's list. A title that is a non-empty string. A date in ISO format.
A published flag that is truly boolean, not a string that happens to say true. Each
field declared once, clearly, without ambiguity. 

From that declaration the TypeScript type is inferred automatically. You do not write the interface separately. You do not
risk the type and the validation drifting apart quietly over months while nobody notices.

::callout{icon="i-lucide-shield" color="primary"}
This is syntytieto for your data. You are not just checking whether a value exists. You
are declaring what it is allowed to be and what shape it must hold before anything
downstream is permitted to touch it. 

TypeScript enforces this at compile time. Zod enforces it at runtime. Together they leave no gap for the wrong shape to slip through.
::

## What He Turned Back

Use `safeParse` rather than `parse`. Where `parse` throws, `safeParse` returns a result
with a success flag. When it fails, `error.issues` gives you a precise list of what was
wrong. Not a vague complaint. A specific accounting. Which field. Which rule. Which
value arrived that should not have.

The error surfaces here, at the portti, not three functions deep at midnight in a place
nobody thought to guard. Tuoni never let a wrong thing through hoping it would sort
itself out further along. That is not how he operated.

Nuxt UI's `UForm` already speaks this language natively. Pass your Zod schema to the
`schema` prop and the form validates on submit, field by field, with no extra wiring.

::callout{icon="i-lucide-sparkles" color="secondary"}
When the shape is right, Tuoni steps aside. What comes through is clean and trusted.
TypeScript knows the types because Zod proved them at the boundary. No defensive checks
scattered through the codebase. No wondering.

The old wizards called it knowing the true name. You cannot trust what you have not
named precisely.

**Bring the right shape. He will open.**
::