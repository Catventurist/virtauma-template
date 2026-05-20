---
title: Revontulet
description: The lights that serve no purpose except to make the sky worth looking at.
date: 2026-05-20
navigation:
  title: Revontulet
  icon: i-lucide-sparkles
---

> **The northern lights do not warm. They do not light the path. They exist because the sky deserves to be looked at.**

The old Finns said the northern lights were a fox running across the sky, his tail
brushing the snow from the mountaintops and sending it up in sparks. **Revontulet.**
Fox fires. Nobody asked what purpose the fox served. The lights were enough.

Animation is the same. Not every motion needs to earn its place through function.
Some of it is there because a thing that arrives well is a different thing from a
thing that simply appears. 

Presence is not decoration. It is the difference between a door that opens and a door that was always open.

## Kaksi maailmaa - Two worlds

Revontulet moves through two tools and they are not the same tool.

**Tailwind** handles what is already known at build time. A color that shifts on
hover. A shadow that deepens on focus. A transition that runs because a class was added or removed. 

Fast, declarative, stateless. The lights that are always in the sky, waiting for the right conditions.

**motion-v** handles what is known only at runtime. An element entering the page
for the first time. A list that reorders itself. A component that leaves before
the next one arrives. It needs JavaScript because it needs to know what is
happening, not just what class is present.

The line between them is the line between *state* and *event*. Tailwind responds
to state. motion-v responds to events. Use the wrong one and you are either
writing JavaScript you did not need or asking CSS to remember something it cannot.

::callout{icon="i-lucide-zap" color="primary"}
If a class change can do it, let Tailwind do it. If something needs to know it is
entering, leaving, or reordering, that is motion-v's sky.
::

## Tailwind — Pysyvä valo - Persistent light

Tailwind transitions belong on things that change state without mounting or
unmounting. Buttons that shift color. Inputs that reveal a border on focus.
Navigation items that brighten when active.

Keep durations short. `duration-150` for interactive elements, `duration-300`
for larger surfaces. Anything longer starts to feel like the interface is thinking.
`ease-out` for things arriving, `ease-in` for things leaving, `ease-in-out` for
things that do both.

The `transition-colors` and `transition-opacity` utilities cover most cases.
Reach for `transition-all` rarely — it is expensive and often animates things
you did not mean to animate.

## motion-v — Elävä valo - Living light

motion-v handles the things that breathe. Page transitions, elements that enter
the viewport, components that leave before the next arrives.

The `animate` prop carries the target state. The `initial` prop carries where
the element comes from. The `exit` prop carries where it goes when it leaves.
Wrap leaving elements in `AnimatePresence` so motion-v knows to wait for the
exit before unmounting.

Keep enter animations subtle. An element sliding up `8px` while fading in from
zero opacity is enough. The user should feel the arrival without watching a
performance.

::callout{icon="i-lucide-sparkles" color="secondary"}
Revontulet does not announce herself. The lights are simply there when you look up.
Motion that draws attention to itself has already failed.
::

## Ajatar ja Aino - In Ajatar and Aino

The roadmap rings in Ajatar use motion-v SVG animation. Concentric circles that
pulse gently, that highlight on interaction, that communicate depth without a single word. 

The outermost ring moves slowest. The innermost fastest. Distance from the center is distance from now.

Aino's changelog entries arrive with a fade and a small upward drift. Each version
surfaces from below as you scroll, the way a memory surfaces. Not dramatic. Just
present in a way that a static list is not.

These are not the same animation. They serve different purposes and use different
tools. What they share is restraint. Revontulet does not fill the whole sky. She
leaves room for the stars.

**Motion is presence. Not performance.**