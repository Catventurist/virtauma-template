---
title: Paatokset
description: How to open a decision and let the water settle.
date: 2026-05-21
navigation:
  title: Paatokset
  icon: i-lucide-droplet
---

> **"Cast it in. The water will tell you what it thinks."**

Paatokset includes decisions opened to the community. Not a poll. Not a vote. A structured
conversation with a shape, a weight, and a way to close.

## Opening a Decision

Every paatokset starts with a type. The type determines how it closes, how long it stays
open, and what counts as resolution.

::paatos{type="kaste" status="open"}
:::paatos-heitto{author="Catventurist" role="steward" date="2026-05-20"}
Should the default language on first visit be Finnish or English?
:::
::

A `kaste` is the simplest form. Yes or no, closes by morning. Use it when the question
is clear and the answer is binary.

## Adding Voices

Voices are cast inside a `paatos-haara`. Each voice carries a type and a weight.

- `support`, in favour, the current moves forward
- `concern`, not a block, but something the water should carry
- `amendment`, a change to the proposal itself

## Branching

When a concern opens a new direction, use `paatos-haara` to fork the river. Give it
an `id` so the graph knows where it came from. The `trigger` prop marks what caused
the branch.

::paatos{type="haara" status="discussion"}
:::paatos-heitto{author="Catventurist" role="steward" date="2026-05-20"}
Should Luoto remain the site name after public release?
:::
:::paatos-haara{id="pida" from="root" status="open"}
::::paatos-aani{author="Catventurist" role="steward" weight="3" type="support"}
It is already everywhere. Changing it now costs more than it gains.
::::
::::paatos-aani{author="Tiera" role="trusted" weight="2" type="concern"}
Three out of four users did not know what luoto meant without explanation.
::::
:::
:::paatos-haara{id="vaihda" from="pida" status="open" trigger="concern"}
::::paatos-aani{author="Vellamo" role="trusted" weight="2" type="support"}
Virtauma is already the stronger brand. Luoto could be a feature name instead.
::::
:::
:::paatos-ratkaisu{method="haara" status="pending"}
Both branches remain open. Return before 0.3.0.
:::
::

## Closing

A paatokset closes when the conditions of its type are met. `pato` requires all stones
withdrawn. `karikko` requires near-unanimous consent. `tulva` closes when the window
expires whether or not everyone has responded.

`paatos-ratkaisu` marks where the water settled and why.

::callout{icon="i-lucide-droplet" color="primary"}
A paatokset that nobody responds to is not a failure. It is still water. The question
was asked. The record holds it.
::