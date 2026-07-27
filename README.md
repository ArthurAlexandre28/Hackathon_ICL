# Sunny — Classroom Mood Check-in

**ICL Hackathon 2026 · Education Technology track**

A 20-second visual emotional check-in for primary school kids (ages ~8–12), with a calm,
private pattern dashboard for the teacher.

## The problem

Kids in distress — especially those who mask, or who are neurodivergent and find it hard to
put feelings into words — go unnoticed until things escalate. A teacher with 26 students
cannot read 26 inner states at once.

## The solution

- **Kids** tap a face (Great → Really bad) instead of naming an emotion. Optional one-tap
  "why", including *"I'd rather not say."*
- **Teachers** get an at-a-glance class grid plus **soft signals** — not alarms.
- **Three transparent rules** spot patterns over time that a human scanning a grid would miss:
  - a sudden drop from a child's *own* normal (Cody — R1)
  - a slow downward drift over several days (Aroha — R2)
  - a repeating weekly cycle (Maia — every Monday — R3)

### Why faces, and why a thumbs-down at the bottom

The scale was originally a weather metaphor (sunny → stormy). Judge feedback was that a
child shouldn't have to translate a feeling into weather before they can answer — the
metaphor adds a step between the question and the child. Faces remove it.

The bottom of the scale is a **thumbs-down rather than a crying face**, on the same
reasoning: a crying face is a big thing for a child to claim about themselves and is easy to
avoid pressing, while a thumbs-down is unmistakable and low-stakes. A thumbs-down is a
gesture rather than a face, so every option sits in the same circular badge — the row still
reads as one scale, not four faces and a hand.

The faces are inline SVG, not emoji, so they render identically on every school device
rather than shifting with the platform's emoji font. The palette runs warm-to-cool and
never uses red: a low day is not a failure, and the colours should never imply it is.

## How the analysis works — and why that matters

Judge feedback at the pitch stage was direct: *be careful making assumptions about a
child's mood, and explain how the data is analysed and how the AI uses it.* That drove the
core architectural decision:

**Detection is deterministic arithmetic. AI only writes the wording.**

| Stage | What happens | AI involved? |
|---|---|---|
| 1 · Input | 5 numbers (this week) + this child's 30-day median | No |
| 2 · Detection | Three fixed arithmetic rules | **No** |
| 3 · Wording | Turns a fired rule into a plain-English suggestion | Yes |
| 4 · Decision | The teacher decides | No |

The AI receives only a rule name and five numbers — no child's name, no reason tags, no
history. **Remove the AI entirely and Sunny flags exactly the same children.** Detection is
reproducible and auditable; a parent could check the maths by hand.

### Every rule compares a child only to themselves

A child who checks in "okay" most days is never flagged for it — that is their
normal, and normal is not a problem. Only *change from their own 30-day baseline* counts.
This is deliberate: it stops quiet and neurodivergent kids being pathologised for their
baseline, which is the single biggest risk in a tool like this.

### Every signal states its own limits

The detail panel walks through four steps — the data, the rule that fired, **what this does
not mean**, and only then the AI's suggestion. Step 3 lists alternative explanations for
every flag (a cold, a bad night's sleep, a hard test, nothing at all) because a moved number
is a moved number, not a diagnosis. Opening an *unflagged* child says so too: no signal does
not mean a child is fine.

## What's in here

| File | What it is |
|---|---|
| `index.html` | The prototype. Open in any browser — no install, no server, no accounts. |
| `Sunny-Pitch-Deck.pptx` | 12-slide pitch deck, with timed speaker notes and prepared Q&A on every slide. |
| `deck-build.js` | The pptxgenjs generator for the deck — edit and re-run rather than hand-editing the .pptx. |
| `faces.js` | Renders the face scale to PNG so the deck shows the same artwork as the app. |
| `dedupe.py` | Post-build step: pptxgenjs writes one media part per image *use*, so this collapses them (889K → 367K). |

```bash
open index.html
```

To regenerate the deck after editing `deck-build.js`:

```bash
npm install pptxgenjs sharp && node deck-build.js && python3 dedupe.py Sunny-Pitch-Deck.pptx Sunny-Pitch-Deck.pptx
```

## Demo script (3 minutes)

1. **Kid view** — tap "Not good", tap a reason, send. Note the warm response and the
   *"What happens to my check-in?"* panel — the child can see the rules too.
2. **Teacher view** — show the class grid. Mostly bright, three soft signals. Point at the
   note under the grid: *an "okay" day is not a signal.*
3. **Click Cody** — this is the moment. Bright all week, then a two-step drop today.
   Walk the four steps: the data → the rule that fired → **what this does not mean** → the
   AI's suggested wording.
4. **Open "How Sunny works"** — the collect / detect / word / decide pipeline, with
   detection marked **NO AI**.
5. **Land the point** — Sunny didn't diagnose Cody, and didn't decide anything. It did
   arithmetic on five numbers, showed its working, and made sure a caring adult noticed.

### Expect these questions

- *"How do you know the child is sad?"* — We don't, and we say so on screen. We detect that
  a self-reported number moved away from that child's own baseline. Step 3 of every signal
  lists the innocent explanations.
- *"What if the AI gets it wrong?"* — The AI cannot get *who is flagged* wrong; it never
  makes that call. If its wording is unhelpful the teacher dismisses it, and we keep
  dismissals to publish a real false-positive rate.
- *"What about a kid who's always low?"* — Never flagged for their baseline. Only change
  counts. That's the point.

## Safeguarding by design

This is the core of the pitch, not a disclaimer bolted on:

- **Never a diagnosis.** Sunny surfaces signals for a trusted adult to act on.
- **Human in the loop, always.** Every insight ends in a suggested human next step.
- **Kids can opt out** of explaining — "I'd rather not say" is a first-class choice.
- **Kids can see what the teacher sees** — their own history, on request, nothing hidden.
- **Minimal data** — one tap. No free text, no camera, no microphone, no behavioural
  tracking. Raw check-ins deleted after 30 days, never used to train a model.
- **Never ranked against classmates**, or against a class average.
- **Clear escalation** to the school's wellbeing lead — only when a teacher chooses it.
  Sunny never contacts anyone automatically.

## Status

Level 1 prototype — front-end only, **simulated data**, no backend or live model calls.
Built to prove the concept and the flow.

## Roadmap

- **Level 2 (MVP):** real check-in storage, live Claude API pattern analysis, teacher login.
- **Level 3 (Product):** student accounts, privacy/safeguarding compliance, school data
  agreements, real escalation routing to counsellors.

## Business model

Per-classroom or whole-school licence, sold into wellbeing / pastoral care budgets.
