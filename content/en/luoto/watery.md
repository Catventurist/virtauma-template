---
title: Water Components
description: A collection of water-themed animation components
navigation:
  icon: i-lucide-glass-water
---

A set of components built around water, depth and fluid motion. Each one uses spring physics and SVG animation to create something that feels alive rather than mechanical.

## WateryMotion

A wrapper that adds fluid spring animations to anything. Enters from below like rising through water, reacts to hover and press with surface tension physics. Use the `index` prop to stagger multiple items naturally.

::watery-motion
---
index: 0
---
This card floats in from below and responds to hover and press.
::

::watery-motion
---
index: 1
---
This one follows with a slight delay, like bubbles rising at different speeds.
::

## WaterySeparator

An SVG section divider where three wave layers morph continuously between states. Use it between page sections to create a sense of depth.

::watery-separator
---
height: 80
---
::

Flip it to reverse direction between sections:

::watery-separator
---
height: 80
flip: true
---
::

## WateryBadge

A badge that behaves like a bubble — pops in on mount, floats idly, bursts on click and sends out particle fragments. Supports sonar pulse rings and value change animations.

::watery-badge
---
value: 12
color: primary
float: true
pulse: true
---
::

::watery-badge
---
value: 99
color: error
variant: chip
size: lg
---
::

::watery-badge
---
variant: dot
color: success
pulse: true
float: true
---
::

## WateryFlow

A vertical timeline where a glowing line flows down as you scroll. Nodes float like bubbles, cards alternate sides and each item has a caustic light shimmer. Click a node to select it.

::watery-flow
---
variant: stream
gap: md
items:
  - id: 1
    label: Source
    description: Where the river begins
    date: Jan 2026
    icon: i-lucide-droplets
    type: event
  - id: 2
    label: Current
    description: Flowing downstream
    date: Mar 2026
    icon: i-lucide-waves
    type: status
    color: info
  - id: 3
    label: Rapids
    description: Moving fast now
    date: Jun 2026
    icon: i-lucide-zap
    type: event
    color: warning
  - id: 4
    label: Delta
    description: Reaching the ocean
    date: Dec 2026
    icon: i-lucide-anchor
    type: event
    color: success
---
::
