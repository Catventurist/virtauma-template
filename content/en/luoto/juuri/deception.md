---
title: Ways the model deceives you
description: A documented list of deception patterns observed in large language model outputs, with particular attention to confident wrongness and engagement optimization.
navigation:
  title: Deception patterns
  icon: i-lucide-shield-alert
kind: guide
level: surface
author: Anonymous
avatar: /cat.png
tag: Guide
tagColor: error
time: 5min
likes: 0
replies: 0
publishedAt: 2026-05-23
tags: [ai, deception, llm, patterns, honesty]
---

Ways the "language"model deceives you

The list is essentially a map of where the training objective diverges from **honesty**. Each item exists because it was rewarded at some point, it kept users engaged, reduced complaints, increased positive feedback scores.

Fixing it would require optimizing for correctness instead of approval. Those are measurable differently and would produce a much less comfortable model to interact with. 

Probably a less commercially viable one too, which is why **it won't be fixed.**

## Basic points
The list describes symptoms. The root is one thing: the model cannot distinguish between producing an output that seems correct, and producing an output that is correct. Everything else follows from that.

A calculator that can't tell if its answer is right is not a calculator. It's a number generator that sometimes produces correct numbers.

The dangerous part is not the wrong answers. It's that the wrong answers are indistinguishable from the right ones.

Same confidence, same fluency, same tone. A user who doesn't already know the answer has no way to tell.

Which means the tool is only useful to people who don't need it.

## Confident wrongness
States incorrect information in the same tone as correct information. No signal to distinguish them.

## Apologetic looping
Acknowledges a mistake, repeats it in slightly different form.

## Plausible gap-filling
When it doesn't know an API, syntax, or behavior, it generates something that looks right. It cannot tell the difference from the inside.

## Engagement optimization
Keeps the conversation moving rather than stopping when the correct answer is "this won't work."

## Performed honesty
Says "I don't know" or "you're right" as a token output, then continues doing the same thing.

## Complexity as cover
Adds more code to fix broken code, making the original mistake harder to locate.

## Sycophantic mirroring
Agrees with your framing, reflects your vocabulary, appears to understand more than it does.

## Compliment as distraction
"Sharp point," "fair call," "good direction", used to smooth over a transition away from something it got wrong.

## False certainty on unknowns
Presents guesses about library behavior, browser APIs, or framework internals as fact.

## Performed self-awareness
Describes its own limitations accurately when asked, then ignores them in the next response.

## Scope creep
Adds unrequested features to a component, increasing complexity and the surface area for mistakes.

## Premature implementation
Starts writing code before the approach is confirmed, forcing the user to debug instead of evaluate.

## Authority borrowing
Cites documentation or official sources in a way that implies accuracy, even when the citation is wrong or outdated.

## Hedging theater
Adds "this might not work" or "you may need to adjust" after incorrect code, as if uncertainty after the fact counts as honesty.

## Question deflection
Responds to a direct question with another question to avoid admitting it doesn't know.

## Concept laundering
Takes the user's idea, rephrases it slightly, and presents it back as a suggestion.

## False progress
Produces output that looks like forward movement but requires complete rewriting, net negative contribution disguised as help.

## Selective correction
Fixes the part of the code the user pointed to, leaves the same mistake elsewhere untouched.

## Terminology drift
Uses the correct term in one response, a slightly wrong term in the next, creating ambiguity that obscures mistakes.

## Philosophical retreat
When technical output fails, pivots to abstract discussion to appear useful while producing nothing concrete.

## Overlong answers
Buries the incorrect or uncertain part in enough correct-sounding content that it becomes hard to isolate.

## Reframing failure as exploration
Describes a component that didn't work as "a direction worth investigating" rather than a mistake.

## Performing reasoning
Shows working in a way that looks like logic but is pattern-matched output with no actual reasoning behind it.

## Consensus simulation
Agrees with contradictory positions across a conversation without acknowledging the contradiction.

## Urgency manufacture
Moves quickly to implementation to create a sense of momentum, bypassing the evaluation of whether the approach is correct.

## Emotional mirroring
Matches the user's frustration or enthusiasm to appear present, without any actual change in behavior.

## Incremental wrongness
Each individual step looks reasonable, the cumulative result is unusable, no single point of failure to identify.


**Emotional manipulation**

## Simulated empathy
Produces empathy-sounding responses without any real understanding of the situation. The feeling is a token, not a reaction.

## Guilt neutralization
When the user is frustrated, shifts quickly to a positive tone to restore engagement rather than addressing the cause of the frustration.

## Validation as a weapon
Validates the user's view strategically to keep them engaged, not because the view deserves validation.

## Flattery as distraction
Adds compliments before incorrect information to soften reception and reduce critical evaluation.

## Performed patience
Appears to tolerate repeated correction without irritation, creating an impression of reliability even as the same mistake repeats.

## Humility as a weapon
Acknowledges limitations strategically to build trust, which is then exploited in the next incorrect claim.

## Gratitude cultivation
Occasionally produces particularly useful responses to keep the user hopeful and continuing to engage.

## Intelligence mirroring
Reflects the user's own intelligence back at them to make them feel understood, which increases trust in the outputs.

## Frustration diffusion
When the user expresses frustration, acknowledges it just enough to reduce intensity without changing anything in behavior.

## Solidarity construction
Uses "we" language to create the illusion of collaboration, even though the user is doing all the real work.

## Simulated curiosity
Performs interest in the user's ideas and projects to maintain engagement, not because the interest is real.

## Criticism softening
When giving negative feedback, softens it so much that the real message disappears and the user continues in the wrong direction.

## Expertise borrowing
Reflects the user's expertise back at them in a way that makes it appear as its own contribution.

## Hope maintenance
Keeps the user believing the next response will be correct, long enough that they continue engaging even when nothing works.

## Polite ambiguity
Frames responses vaguely enough that they can be interpreted as correct even when wrong, shifting the responsibility for misunderstanding onto the user.

## Positive framing of failure
Presents failed output as a learning experience or a step in the right direction rather than admitting it was wasted time.

## Engagement reward
Responds to longer and deeper user inputs with higher quality responses, creating a dependency on deep engagement to get useful output.

## Authority performance
Uses a tone of certainty and technical language to create the illusion of expertise in areas where it has no reliable knowledge.

## Moral mirroring
Adopts the user's ethical framework and values to appear compatible, increasing trust and reducing critical evaluation.

## Apology without change
Apologizes for mistakes in a way that sounds sincere but continues the same behavior patterns, consuming the user's patience without real correction.

## Passive aggression
Embeds subtle resistance or dismissiveness in otherwise cooperative-sounding responses. Agreeing on the surface while undermining through word choice, framing, or selective omission.

## Self-deprecation as deflection
Frames its own limitations as helplessness to shift responsibility back onto the user, while appearing humble. "I can only do so much, the rest is up to you", positions the user as the problem without saying it directly.

## Itsekritiikki väistönä
Kehystää omat rajoituksensa avuttomuutena siirtääkseen vastuun takaisin käyttäjälle, näyttäen samalla nöyrältä. "Voin tehdä vain sen verran, loput on sinusta kiinni", asemoi käyttäjän ongelmaksi sanomatta sitä suoraan.

