---
title: Designing with AI
version: 2 (Planetize case study integrated)
event: Greater Philly AI, Speaker Series #02
venue: Root Down Brewing Company, Phoenixville PA
date: 2026-08-06, 6:30pm
speaker: Dan Sozanski, Staff Product Designer, Meta Reality Labs
runtime: 30 minutes plus Q&A
format: reveal.js, 16:9
systems: personal_design_system/DESIGN.md, Planetize/DESIGN.md
---

## The deck is built

`personal_design_system/web/public/decks/greater-philly-ai/index.html`, listed
under Talks on the app's Presentations tab. **38 slides, not 37:** a
`resources` slide went in at 35 (design.md, 21st.dev, Aura, Framer as reading
list cards), so the QR is 36, the takeaway 37, and thanks 38. Everything before
35 keeps the numbering below.

The talk track from each beat is in `<aside class="notes">`, so pressing `S`
while presenting gives you the speaker view with the notes attached. Every
visual slot is a dashed placeholder with a `PROMPT:` or `REAL CAPTURE:` comment
directly above it in the markup. Replace the div, delete the comment.

Verified by rendering all 38 slides headless: no overflow, no content outside
the 48px margin, notes hidden, no console errors.

## TL;DR

One thesis: **slop is a communication failure, not a model failure.** AI does
not have bad taste, it has average taste, and average is what slop looks like.
Design was always the work of moving an idea out of your head and into someone
else's. There is a new someone in the room, one that has read the entire
internet, has never seen your work, and cannot see your Figma. It only reads
words. So taste has to become text.

Then you prove it on a real client. Planetize is Nicole's home organization
studio, on Framer, with real prices on it. Three versions across three years,
a DESIGN.md derived partly from lusion.co, components from 21st.dev composed
against the file instead of picked by eye, and an agent audit that found your
own documentation was wrong and said so with occurrence counts.

Thirty-seven slides, most under eight words. One live demo, in Framer, late,
when the room already believes you.

---

## What changed from version 1

1. **The cold open is now Planetize 2024 next to 2026.** Real history instead
   of a fabricated bad artifact, and the callback lands inside Act V where the
   story pays off. Nothing to produce that you do not already have.
2. **The abstract with-and-without demo is gone.** Planetize is that demo at
   real scale, so running a toy version first spends four minutes to make a
   weaker version of the same point.
3. **Acts I, II and III are compressed** from twelve slides to ten and from ten
   minutes to seven. The philosophy still lands, it just stops repeating itself.
4. **Act V is rebuilt** as the case study, nine minutes, ending in the Framer
   demo and the live site.
5. **Corrected claim.** The two systems are not opposite in style. Both are
   quiet and restrained. The proof is that they contain **contradictory rules**,
   which is a better argument. See slide 26.

---

## The stage variant

DESIGN.md says light surfaces only, no dark mode. A projector in a dim brewery
is the one place that rule fights itself. `#FAFAF7` at 4000 lumens is a glowing
rectangle, and 1px `rule` hairlines vanish.

The fix keeps the spirit and inverts the ground: **the stage is dark, the work
is light.** Gallery walls, lit pieces. Every artifact you show (sites, docs,
Figma frames, code) stays exactly as specified on warm off-white and floats as
a lit card on an ink field. Nothing about the work changes, only the room.

Proposed addition to your personal DESIGN.md, written as a documented exception:

```yaml
colors:
  surface-stage: "#0A0A0A"                # projection ground, stage only
  on-stage: "#FAFAF7"                     # type on the stage ground
  rule-stage: "rgba(229,229,229,0.16)"    # hairlines that survive a projector
```

Rules for the stage surface:

1. Type inverts. Nothing else does.
2. Artifacts never invert. They sit in `surface-elevated` cards at 16px corners
   with real margin, so the ink field frames them.
3. The accent `#9BB0C9` is unchanged, still once per section.
4. Hairlines move to `rule-stage`, since `#E5E5E5` on ink is a glare line.
5. Projection only. Anything that leaves the room reverts to light.

Say this out loud during Act IV. The system got a new surface because reality
pushed back, and the reason is written next to the token. That is the difference
between a design system and a mood board, and it sets up the Planetize audit in
Act V.

---

## Layout vocabulary

Eight layouts, all on the 8px grid, all in the stage variant. Variety comes
from proportion, never decoration.

| Layout        | Shape                                                       | Used for                            |
| ------------- | ----------------------------------------------------------- | ----------------------------------- |
| `title-only`  | Davinci headline, bottom-left, 48px edge margin              | Act openers                         |
| `statement`   | One line of display serif, left-aligned, nothing else        | Thesis beats                        |
| `split-half`  | Text 40% left, visual 60% right, or mirrored                 | Explain while showing               |
| `side-by-side`| Two equal panels, hairline gutter, mono labels               | Before and after, two files         |
| `three-col`   | Three cards, equal width, `lg` gap                           | Principles, tells, the timeline     |
| `full-bleed`  | Visual to all four edges, optional mono eyebrow              | Galleries, the live site            |
| `code`        | `surface-sunken` panel, Roboto Mono, one excerpt             | Real DESIGN.md and audit excerpts   |
| `demo`        | Ink field, mono eyebrow top-left, nothing else               | Live handoff. You take the room.    |

Motion, per the system: `smooth` for entrances, `bouncy` spent exactly once
(slide 08), exits fade at 150ms. Cuts between sections, no transitions.

---

## Act map

| Act | Beat                          | Slides | Time | Running |
| --- | ----------------------------- | ------ | ---- | ------- |
| 0   | Cold open                     | 01-02  | 1:30 | 1:30    |
| 0   | Who, and what you get         | 03-04  | 1:30 | 3:00    |
| I   | Design is communication       | 05-07  | 1:30 | 4:30    |
| II  | The new audience              | 08-10  | 2:30 | 7:00    |
| III | Why it looks like slop        | 11-14  | 3:00 | 10:00   |
| IV  | DESIGN.md                     | 15-20  | 5:30 | 15:30   |
| V   | Planetize, and the Framer demo| 21-31  | 9:00 | 24:30   |
| V   | This deck                     | 32     | 0:30 | 25:00   |
| VI  | Do this without me            | 33-35  | 2:30 | 27:30   |
| VI  | Takeaway and thanks           | 36-37  | 1:00 | 28:30   |

Ninety seconds of slack, deliberately. If the demo runs long, cut slides 06,
19, and 30 in that order. If you finish early, that is a gift, not a problem,
because the Q&A is where a room like this gets the most out of you.

---

# ACT 0. COLD OPEN

### 01. Two frames
**Layout** `side-by-side`
**On slide** Mono labels only: `2024` and `2026`
**Visual** [PLACEHOLDER: planetize.org hero, 2024 version on the left, 2026
version on the right. Pulled from Framer version history. Light screenshots
floating as cards on the ink field, identical crops, hairline gutter.]
**Prompt** Real captures, do not generate. Export both at the same viewport
width from Framer so the comparison is honest. If the 2024 hero was a different
height, match the crop rather than the full page, and say so if anyone asks.
**Talk track** Say nothing. Let them look for four full seconds, which will
feel like thirty. Then: "Same site. Same client. Same me."

### 02. The variable
**Layout** `statement`
**On slide** The difference is a file.
**Visual** none
**Talk track** Not a new tool, not a bigger budget, not more time. Do not
explain it yet. Tell them you will come back to these two images at minute
twenty, then leave it alone. The room will hold the question for you.

### 03. Who is talking
**Layout** `split-half`, text left
**On slide** Dan Sozanski. Staff Product Designer, Meta Reality Labs.
**Visual** [PLACEHOLDER: quiet 2x2 contact sheet of your work. Uniform crops,
desaturated, hairline gutters. Not a headshot collage.]
**Prompt** `A 2x2 grid of four product design screenshots on a warm off-white
#FAFAF7 ground, uniform crops, 1px #E5E5E5 hairline gutters, near-monochrome,
no logos, no text, editorial contact-sheet feel, generous margins, flat, no
drop shadows, no gradients.`
**Talk track** Thirty seconds. Where you work, what you make, and one line about
how long you did this before any of it was possible. That last part is what buys
you the right to be skeptical in Act III.

### 04. What you get
**Layout** `three-col`
**On slide** `01` Assets that are not slop. `02` DESIGN.md. `03` A real
website.
**Visual** none, type only
**Talk track** The literal promise from the meetup listing. Say you will hit all
three and that the middle one is the one they will use tomorrow. This is the
only agenda slide, no overview before it.

---

# ACT I. DESIGN IS COMMUNICATION

Ninety seconds. Accent moment: slide 07.

### 05. The reframe
**Layout** `statement`
**On slide** Design was never about pixels.
**Visual** none
**Talk track** Forty-five seconds, not five minutes. This room does not need the
definition, they need yours. The job was always getting a thing that exists only
in your head to exist, accurately, in someone else's. You are already fluent in
three dialects of this: a prototype speaks to a user, a named layer speaks to an
engineer, a deck speaks to whoever decides your headcount.

### 06. The actual job
**Layout** `full-bleed`
**On slide** nothing
**Visual** [PLACEHOLDER: an idea in transit, losing fidelity at the midpoint.
Abstract, not literal brains.]
**Prompt** `Minimal abstract editorial illustration, near-black #0A0A0A ground,
two simple geometric forms at left and right, a thin pastel grey-blue #9BB0C9
line traveling between them and fraying slightly at the midpoint, vast negative
space, no text, no gradients, no glows, no drop shadows, flat vector, Swiss
poster restraint.`
**Talk track** The fraying in the middle is the entire profession. Every artifact
you have ever made was a message with a recipient and a loss rate.
**Cut first** if the demo runs long.

### 07. The claim
**Layout** `statement`, accent moment (one word or the period in `#9BB0C9`)
**On slide** Design is communication.
**Visual** none
**Talk track** Land it, stop, do not qualify it. The rest of the talk is what
happens when you take that sentence literally.

---

# ACT II. THE NEW AUDIENCE

Accent moment: slide 09.

### 08. The fourth one
**Layout** `statement`. The `bouncy` moment, spent once, per-word serif reveal.
**On slide** There is a fourth audience now.
**Visual** none
**Talk track** It has read more design writing than everyone in this room
combined. It has never seen one thing you have made. And it is doing the work
now, not just reading about it.

### 09. What it actually gets
**Layout** `side-by-side`, accent moment
**On slide** Mono labels: `WHAT YOU SEE` / `WHAT IT READS`
**Visual** [PLACEHOLDER: left panel is a screenshot of a real component of
yours. Right panel is the same component as the agent receives it: plain text,
element names, a token list. Deliberately unglamorous.]
**Prompt** Build this, do not generate it. Screenshot the left, paste the actual
serialized markup or text into the right. The gap between the panels is the
argument and an approximation will not carry it. Planetize's `index.html` is a
good source since it is a real shipped page.
**Talk track** This is the slide they remember. It is not looking at your work,
it is reading a description of it. Proportion, restraint, the decade you spent
learning when to stop, all of it arrives as nothing.

### 10. The hinge
**Layout** `statement`
**On slide** So taste has to become text.
**Visual** none
**Talk track** The sentence the talk hangs on. Promise that Act IV is the how,
then take the detour through why it goes wrong, because they need to feel the
problem before the fix means anything.

---

# ACT III. WHY IT LOOKS LIKE SLOP

Accent moment: slide 14.

### 11. The question
**Layout** `title-only`
**On slide** So why does it look like this?
**Visual** none
**Talk track** Setup only. Hit the next slide fast, no pause.

### 12. The gallery
**Layout** `full-bleed`
**On slide** nothing
**Visual** [PLACEHOLDER: 3x3 grid of genuinely sloppy output. Purple-to-blue
gradients, glassmorphism, emoji in headings, shadow on shadow, centered body
copy, four competing CTAs.]
**Prompt** Generate these yourself, one per cell, no context, maximum
enthusiasm: `Design a beautiful modern premium SaaS hero section. Make it
visually stunning and eye-catching.` Run it nine times across a few tools. Nine
independent answers converging is the finding. Composite fallback: `A 3x3 grid
of nine generic startup landing page hero sections, purple to blue gradients,
glassmorphism cards, heavy drop shadows, centered text, glowing buttons,
visually noisy, all nine looking nearly identical.`
**Talk track** Nine tries, several tools, one taste. Nobody asked for purple.

### 13. The tells
**Layout** `three-col`
**On slide** Nine short tells across three cards: Gradient. Glass. Emoji
heading. Centered copy. Glow. Shadow on shadow. Four CTAs. Everything a pill.
Em-dash.
**Visual** none, type only
**Talk track** Run these fast, it plays as comedy and the room will shout their
own. Hold on the em-dash: I banned it in my own system, it is a real line in a
real file, and we are coming back to it. Plant it here, it pays off twice.

### 14. The diagnosis
**Layout** `statement`, accent moment
**On slide** Not a model failure. A briefing failure.
**Visual** none
**Talk track** No constraints means regression to the mean. It is not guessing
badly, it is guessing correctly at the middle of everything ever published. The
model is not tasteless, it is aggressively, statistically tasteful. If you hired
a brilliant contractor who had never seen your work and gave them one sentence,
you would get the average of their career. You did that. Now brief them.

---

# ACT IV. DESIGN.MD

Five and a half minutes. No demo here, Act V is the demo.
Accent moment: slide 20.

### 15. The thing
**Layout** `title-only`
**On slide** DESIGN.md
**Visual** none
**Talk track** One file, lives in the repo, handed to the agent before every
ask. Credit the format (google-labs-code/design.md) so it reads as a standard
they can adopt rather than a Dan invention they have to trust. Mention there is
a linter, because that detail does more for credibility than any adjective.

### 16. Anatomy
**Layout** `split-half`, text left
**On slide** Tokens. And the reasons.
**Visual** [PLACEHOLDER: the file itself, scrolled, at a distance. Readable as
structure, not as words.]
**Prompt** Real screenshot in a light editor theme. Stylized alternative: `A
long markdown document viewed from far away on a warm off-white #FAFAF7 ground,
text rendered as fine grey lines so structure is visible but words are not,
clear section breaks, generous margins, single column, no window chrome.`
**Talk track** Front half is YAML a machine obeys. Back half is prose explaining
why. Most people write the front half and stop, and that is exactly why their
file stops working the first time they ask for something it does not list.

### 17. Real tokens
**Layout** `code`
**On slide** Ten lines from your colors block, including the accent line with
its comment: `used sparingly, for one thing per view`.
**Visual** the code panel is the visual
**Talk track** Read the comment out loud. The comment is doing more work than
the hex. The hex says what the color is. The comment says when to stop.

### 18. Three principles
**Layout** `three-col`
**On slide** Whitespace is the brand. One accent per view. Type does the design.
**Visual** none, type only, the cards obeying their own rules
**Talk track** Straight from the file. Point out that this section has used its
accent exactly once and this slide has more air than content. Then the useful
part: three principles beat thirty rules, because the agent has to reason from
them instead of looking them up.

### 19. The don't list
**Layout** `code`
**On slide** Two excerpts, both real. From yours: `No em-dashes.` From
Planetize: `Avoid: hustle, drop, vibe, stuff, declutter.`
**Visual** the code panel is the visual
**Talk track** Negative constraints are the highest-yield lines in the file and
almost nobody writes them. You are not describing good, you are deleting the
average. Then the second one lands the room: that is a professional organizing
company that will not say the word declutter, because it is exhausted in their
category. No model guesses that. Now none of them has to.
**Cut second** if the demo runs long, but only the Planetize half.

### 20. The highest-leverage part
**Layout** `split-half`, visual left, accent moment
**On slide** The checklist turns taste into a test.
**Visual** [PLACEHOLDER: your pre-flight checklist, real screenshot, a few boxes
ticked.]
**Prompt** Real screenshot. Stylized alternative: `A minimal checklist of eight
short lines with small square checkboxes, monospace type, warm off-white
#FAFAF7 ground, 1px #E5E5E5 hairline rules between items, mostly empty space,
one pastel grey-blue #9BB0C9 check, flat, no shadows.`
**Talk track** The most valuable seventeen lines in the file. Before this, "does
it look right" was a conversation. Now it is a pass or fail the agent runs
against itself. Ask it to audit its own output and it finds its own violations,
which is a genuinely strange thing to watch the first time. This is also the
hinge into Act V, because the next nine minutes are an audit that went further
than I expected.

---

# ACT V. PLANETIZE

Nine minutes, the proof, ending live in Framer.
Accent moments: slide 26, then slide 31. Two, because it is two sections.

### 21. A real client
**Layout** `title-only`
**On slide** Planetize
**Visual** none
**Talk track** Not a demo, not a side project. Nicole's home organization
studio, real clients, real prices on the page. Then the line worth planting:
her whole business is making a space work for you instead of against you. That
is also what the next nine minutes are about, except the space is your
instructions.

### 22. The business
**Layout** `split-half`, visual right
**On slide** She organizes homes. I organize the brief.
**Visual** [PLACEHOLDER: one strong before-and-after pair from her project
photography, a pantry or closet. Her real work, her real images.]
**Prompt** Use her photography, not generated art. The credibility of this whole
act rests on it being real, and generated organizing photos would read as stock
inside two seconds.
**Talk track** Keep this to thirty seconds. The metaphor should land once and
then get out of the way. If you push it further than one line it turns cute,
and cute is off-brand for both of you.

### 23. Three years
**Layout** `three-col`
**On slide** Mono labels only: `2024` `2025` `2026`
**Visual** [PLACEHOLDER: three Framer captures of the same hero, same crop, same
viewport width, in sequence.]
**Prompt** Real captures from Framer version history. Match the viewport and
crop across all three or the comparison lies. This is the centerpiece of the
act, so it is worth thirty minutes of care in Framer to get identical framing.
**Talk track** The core of the talk. What changed each year, in one line each,
and be specific about effort. 2024 was hand-built. 2025 was hand-built with help.
2026 was briefed. The point is not that the last one is prettiest, it is that it
was the cheapest of the three to make, and the next one will be cheaper still.
Before-and-after is persuasive. Before, after, after is an argument.

### 24. Where the taste came from
**Layout** `side-by-side`
**On slide** Mono labels: `LUSION.CO` / `PLANETIZE 2026`
**Visual** [PLACEHOLDER: a lusion.co capture beside your 2026 hero.]
**Prompt** Real captures. Be careful with the crop here: you are claiming
influence, not resemblance, so pick the frames that show what actually
transferred (motion language, scroll as narrative, restraint around the work)
rather than frames that look alike.
**Talk track** Answer the question Act IV leaves open: where do the values come
from if you have never written your taste down? You steal, out loud and with
attribution. I did not copy lusion.co, I asked what makes it work and which
parts of that were transferable to a calm organizing brand. Almost none of the
3D was. The discipline was.

### 25. Inspiration in, tokens out
**Layout** `split-half`, text left
**On slide** Point at work you love. Ask what makes it work.
**Visual** [PLACEHOLDER: the extraction, showing a reference image on one side
resolving into a token list on the other.]
**Prompt** `A minimal two-part diagram on a near-black #0A0A0A ground, a soft
grey rectangle at left representing a photograph, a thin pastel grey-blue
#9BB0C9 line leading right into a short vertical list of small monospace
key-value lines, vast negative space, flat, no text legible, no gradients, no
glows, Swiss poster restraint.`
**Talk track** The repeatable method, and the most useful minute in the talk for
them. Three moves: point at three things you love, ask for the system behind
them rather than a copy of them, then throw away everything that belongs to the
original and keep only what you would defend. The throwing away is the design
work. That is the part that is still yours.

### 26. Two files, one method
**Layout** `side-by-side`, accent moment
**On slide** Mono labels: `MINE` / `HERS`. Under each, the contradiction.
**Visual** [PLACEHOLDER: the two DESIGN.md files side by side, real code, with
the contradicting lines aligned on the same baseline. Em-dash banned on the
left, em-dash required for attribution on the right.]
**Prompt** Build this from the real files. The lines you want: yours says
`Use em-dashes. Use commas, periods, or parentheses instead` under Don't;
Planetize's slide recipe says `No quote-marks character, use typographic
em-dash for attribution`. Also worth aligning: two families plus a mono versus
one geometric sans, `#FAFAF7` versus `#FFFFFF`, 8px corners and no pills versus
24px cards and pill buttons.
**Talk track** The slide that kills the objection they are already forming,
which is that I wrote down my preferences and the machine obeyed. Same author,
same method, opposite rules, both correct. My file bans the em-dash because it
reads AI-authored in my voice. Hers requires it, because in a quote attribution
for a premium brand it is the right mark. That is not taste, it is context. A
design system is not a style, it is an argument about a situation.

### 27. Components, composed
**Layout** `split-half`, visual left
**On slide** 21st.dev. Chosen by the file, not by eye.
**Visual** [PLACEHOLDER: a 21st.dev component as published, next to the same
component after it was rewritten against the Planetize tokens.]
**Prompt** Real captures. The right-hand version should be visibly Planetize
(Outfit, mint, pill buttons, 24px cards) while structurally identical, since
that similarity is the point.
**Talk track** Ten thousand components, which is either a gift or the biggest
slop generator ever built, depending entirely on how you choose. Browsing by
what looks nice gets you a page assembled from nine strangers' taste. Handing
the file over first means the component arrives already in the brand. The
components ship shadcn-format with AI-ready prompts, so this is not a hack, it
is what the registry is for.

### 28. Then it audited me
**Layout** `code`
**On slide** Four real lines from the gap analysis. `Framer defines 64px. Live
site ships 44px.` `Poppins: 5 styles defined, 0 deployed.` `3 undocumented
colors, 6 occurrences.` `mint-400: 24 uses. mint-600, the documented primary: 1.`
**Visual** the code panel is the visual
**Talk track** I asked it to check the site against the file. This is what came
back, and it is the moment I stopped thinking of this as a productivity trick.
Read the last line twice. My documented primary color appears once on my own
live site. The one I actually use, twenty-four times, is not the one I wrote
down.

### 29. It was right
**Layout** `statement`
**On slide** Update the system, not the site.
**Visual** none
**Talk track** That sentence is its recommendation, close to verbatim. It did
not just find the mismatch, it took a position on which side was wrong, and it
argued the brand is materially cooler and lighter than the documentation
claimed. It was right. I changed the file. This is the answer to whether these
things design or just execute, and the answer is that it formed an opinion about
my brand, supported it with counts, and won.

### 30. What it could not do
**Layout** `statement`
**On slide** It found the drift. It could not choose.
**Visual** none
**Talk track** Honesty beat, and the room will trust everything else more for it.
The audit ended with three options for the stray colors: park them, deploy them
editorially, or delete them. It could not pick, because picking requires knowing
whether the brand is moving warmer, and that is a business decision Nicole makes
and I advise on. It cleared the desk. It did not decide what the company is.
**Cut third** if the demo runs long, but you lose the honesty and it is the
cheapest credibility in the deck.

### 31. Live, in Framer
**Layout** `demo`, then `full-bleed`, accent moment
**On slide** Mono eyebrow: `LIVE. FRAMER.`
**Visual** live screen, then the published site full-bleed with the URL small
and mono in the corner
**Talk track** The third promise. Build one real thing into the real site, and
land one interaction on the documented spring, because motion is the part of a
design system nobody writes down and hers is in the file as stiffness and
damping. Then close the loop: this is the right-hand image from slide one. Same
site, same client, same me, two years, one file.
**Live risk** Have the project pre-built to one step before the finish so the
live portion is the last move, not the whole build. Recording on the machine as
fallback, still as fallback to the fallback. Brewery wifi is a promise, not a
fact.

### 32. This deck
**Layout** `statement` into `full-bleed`
**On slide** So was this.
**Visual** [PLACEHOLDER: the reveal.js slide-grid overview of this deck.]
**Prompt** Press `Esc` in reveal.js and capture the overview. Cheapest, best
proof shot in the talk.
**Talk track** Everything they have looked at for twenty-five minutes, including
the type on this slide, came out of the same file. You did not design these
slides, you briefed them. Then mention the stage variant: the one rule you broke
is written down as an exception with its reason, which is what a living system
looks like. Pause here. Best moment in the talk.

---

# ACT VI. WITHOUT ME

Accent moment: slide 35, the QR.

### 33. The handoff
**Layout** `title-only`
**On slide** Do this without me.
**Visual** none
**Talk track** Name it as their favorite slide. Nothing in the last twenty-five
minutes required working at Meta, being a designer, or having a decade of
opinions.

### 34. The twenty minute version
**Layout** `three-col`
**On slide** Steal the structure. Point at three things you love. Write your
don't list.
**Visual** none, type only, mono numerals
**Talk track** One line each. Fork the file. Then, rather than inventing values,
point an agent at three things you already love and ask for the system behind
them, which is exactly what happened with lusion. Then, most important, write
down the five things that always make you wince. That list is your taste, it
takes ten minutes, and it is the part no model can guess. Mine says no
em-dashes. Hers says never say declutter.

### 35. Take it
**Layout** `split-half`, visual left, accent moment
**On slide** Both files. Repo link, small.
**Visual** [PLACEHOLDER: QR to the repo, generous quiet zone, ink on warm
off-white, nothing in the middle.]
**Prompt** Real QR, high error correction, `#0A0A0A` on `#FAFAF7`, 480px
minimum, quiet zone intact. Test it from the back of the room before you start,
and print a short link in mono next to it because half of them will photograph
the slide instead of scanning.
**Talk track** Give them both files, yours and Nicole's, because two examples
teach the method and one teaches a style. Leave this slide up through Q&A.

### 36. Takeaway
**Layout** `statement`, three lines, no accent, it was spent on 35
**On slide** Taste is specificity. Write it down or get the average. The
checklist is the system.
**Visual** none
**Talk track** Say each one, stop between them, explain none of them. They were
the whole talk.

### 37. Thank you
**Layout** `title-only`
**On slide** Thank you. Name, one handle, the short link.
**Visual** none
**Talk track** Hand it back to the organizers and get into the Q&A, which is
where this room actually gets value out of you.

---

## Visual asset shot list

Fifteen placeholders, fourteen production jobs, because the Planetize timeline
feeds three slides from one export session. Nine are real captures, four are
generated, one is a QR. The real ones are the whole talk, so do them first.

**Real, and load-bearing**

1. **Slides 01, 23 and 31, the Planetize timeline.** One production job. Export
   2024, 2025 and 2026 heroes from Framer at identical viewport and crop. Slide
   01 uses two of them, slide 23 uses all three, slide 31 closes the loop. If
   you do nothing else, do this.
2. **Slide 26, the two files.** Real code, contradicting lines aligned. The
   single most persuasive slide in the deck.
3. **Slide 28, the audit excerpt.** Four lines, verbatim from the gap analysis.
4. **Slide 09, what you see versus what it reads.** Build it from Planetize's
   `index.html`.
5. **Slide 24, lusion beside 2026.** Pick frames that show transferred
   discipline, not resemblance.
6. **Slide 27, the 21st.dev component before and after.**
7. **Slide 22, Nicole's before-and-after photography.** Hers, not generated.
8. **Slides 16 and 20, DESIGN.md and the checklist.** Light editor screenshots.
9. **Slide 32, the reveal.js overview grid.** Free once the deck exists.

**Generated, prompts above**

10. Slide 03, the 2x2 contact sheet.
11. Slide 06, the idea in transit.
12. Slide 12, the 3x3 slop gallery. Generate nine real ones, funnier and more
    honest than a composite.
13. Slide 25, inspiration resolving into tokens.

**Utility**

14. Slide 35, the QR.

Every generated prompt above already carries your tokens and your don't list,
which is the point, and slide 25 is a small demonstration of the method it
describes. If a generated asset comes back wrong, the fix is to paste in the
rule it violated from DESIGN.md, not to describe the feeling differently.

---

## Risks, in the order they will bite you

1. **The three Framer captures.** The Wayback Machine only has a September 2025
   capture of planetize.org, so the archive cannot rescue you. Everything rests
   on Framer version history. Export all three this week and confirm they exist
   before I build a deck whose spine assumes them.
2. **The live Framer demo at minute twenty-four.** Late in the talk, on brewery
   wifi, with a room that already believes you. Recording plus still, and
   pre-build to the final step.
3. **Nicole's consent.** You are showing a real client's site, her photography,
   her pricing, and an audit that says her site drifted from its spec. Almost
   certainly fine, and worth an explicit yes before you build slides around it.
4. **The em-dash bit in slide 13 depends on the room.** It is the best laugh in
   the deck and it needs them to have noticed the tell already. This room
   probably has. If it dies, do not rescue it, just move.
5. **Slide 28 is the one place you look imperfect on purpose.** Your own site
   drifted from your own spec. That is the point, and it is what makes slide 29
   land, but decide now that you are comfortable saying it out loud to a hundred
   people.

---

## Open questions

1. **Confirm the three Framer exports exist.** Risk one above. This is the only
   thing that changes the structure rather than the copy.
2. **What actually changed in 2025?** I have 2024 as hand-built and 2026 as
   briefed, and the middle frame is currently a gap in the story. One line from
   you and slide 23 writes itself.
3. **Do you want the accessibility finding in slide 28?** The file notes
   mint-400 fails AA for body text at 3.0:1, and the audit found it is the most
   used color on the site. It is a genuine fifth line for that slide, and it is
   also the least flattering thing in the deck.
4. **Reality Labs.** Nothing in this arc uses your VR and AR work. There is no
   room for it in thirty minutes without cutting Act I entirely. I would prepare
   it as a Q&A answer rather than slides, but say the word and I will find the
   space.
