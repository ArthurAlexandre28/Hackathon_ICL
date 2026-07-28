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
- **Four transparent rules** spot patterns over time that a human scanning a grid would miss:
  - a sudden drop from a child's *own* normal (Cody — R1)
  - a slow downward drift over several days (Aroha — R2)
  - a repeating weekly cycle (Maia — every Monday — R3)
  - a child who has **stopped checking in at all** (Isla — R4)

### Why silence is a rule

A mood scale cannot express "I have stopped answering". A child who quietly disengages
produces no low scores, so without R4 they become invisible at exactly the point you most
want to see them. A missing day is treated as *missing data, never a low score* — R1–R3
refuse to fire across a gap, because you cannot claim a three-day drift through a day the
child never answered.

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
| 1 · Input | This child's 30 school days of check-ins, and their own median | No |
| 2 · Detection | Four fixed arithmetic rules | **No** |
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

### The rules genuinely run

Detection is not a lookup table. `HISTORY` holds 30 school days per child;
`evaluateAll()` computes each child's own median and runs all four rules against it,
and the arithmetic shown in the panel is generated from those numbers rather than typed
in. Nothing decides which children are flagged except the thresholds.

You can prove it live: switch the kid view to **Noah** (whose previous day already sits
2 below his median) and check in as "Not good". R1 fires, a new signal card appears, and
his tile lights up — computed in the moment, not scripted.

### What helps this child — written by a human

Every child can have a **support plan** written by a parent, a teacher, or both: what
helps, what makes it worse, who they'll talk to, practical notes. It appears as **step 4
of the signal panel — above the AI's suggestion**, which is deliberate. The people who
know the child outrank the model.

This matters most for neurodivergent kids, where the wrong response makes things worse:
one child needs ten minutes alone, another needs a job to do. Maia's plan is the clearest
case — rule R3 reports "5 of her last 6 Mondays are low", and her mum has already written
*"Swimming is Monday, first period. It's the changing rooms she can't stand."* The rule
found the pattern; a human already knew the reason.

### Escalation is manual, previewed, and logged

Every signal ends with a human decision, and one of the options is raising the child to
the wellbeing lead. Before anything is sent the teacher sees **exactly what the package
contains** — the rule and its arithmetic, the child's own median and last five check-ins,
their support plan, and the teacher's own note — alongside what is deliberately excluded:
any diagnosis, any claim about how the child feels, the AI's wording, and any comparison
to another child.

Two deliberate choices: escalation **never requires a rule to have fired**, because a
teacher does not need an algorithm's permission to raise a concern; and the resulting
audit-trail entry is something **the child themselves can ask to see**.

### Two roles, two surfaces

The app opens on a sign-in screen, because the teacher's screen holds 24 other children's
check-ins and a student device must never reach it.

**Students don't get passwords.** Class code, then tap your name. A 20-second check-in
cannot start with a password an 8-year-old has to remember, and schools rarely issue young
children credentials they can manage — tapping your name on a shared classroom device is
how this age group actually signs in. **Teachers get a real PIN** (demo: `2026`).

The sign-in list shows names and initials only — never anyone's check-in face. A child
choosing their name must not learn how 23 classmates feel today.

> **This sign-in secures nothing.** It runs entirely in the browser with no server to check
> anything against, and the app says so on screen. It is there to show the two roles are
> separate surfaces over different data, which is a real product requirement. Real
> deployment would use the school's existing single sign-on.

### The child can see their own data

The kid view has a *"See my check-ins"* button showing that child's own last ten days —
and nothing else. No rule, no flag, no baseline, no comparison to anyone. Being flagged is
information for the adults around a child, not a label to hand the child about themselves.

### Every signal states its own limits

The detail panel walks through five steps — the data, the rule that fired, **what this does
not mean**, the human-written support plan, and only then the AI's suggestion. Step 3 lists alternative explanations for
every flag (a cold, a bad night's sleep, a hard test, nothing at all) because a moved number
is a moved number, not a diagnosis. Opening an *unflagged* child says so too: no signal does
not mean a child is fine.

## What's in here

| File | What it is |
|---|---|
| `index.html` | The whole prototype — sign-in, check-in flow, rule engine, support plans, escalation. Open in any browser; no install, no server. |
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

1. **Sign in as a student** — class code `ROOM6`, then tap **Noah**. Point out that the
   list shows names, not faces, and that nobody typed a password.
2. **Check in** — tap "Not good", tap a reason, send. Note the *"What happens to my
   check-in?"* panel and **See my check-ins**: the child sees their own data and no rules.
3. **Sign out, sign in as the teacher** (PIN `2026`) — Noah's signal is now on the board.
   It did not exist ninety seconds ago, and a different person on a different screen
   produced it. This is the answer to "is it hardcoded?"
4. **Show the class grid** — four other soft signals. Point at the note under the grid:
   *an "okay" day is not a signal.*
5. **Click Maia** — rule R3 finds the Monday pattern; her mum's plan, one step above the
   AI, already says swimming is Monday first period. The machine found it, a human
   explained it.
6. **Click Cody** — this is the moment. Bright all week, then a two-step drop today.
   Walk the four steps: the data → the rule that fired → **what this does not mean** → the
   AI's suggested wording.
7. **Open "How Sunny works"** — the collect / detect / word / decide pipeline, with
   detection marked **NO AI**.
8. **Raise Isla to the wellbeing lead** — show the two columns: what gets sent, and what
   never does. This is the slide judges will remember on safeguarding.
9. **Land the point** — Sunny didn't diagnose Cody, and didn't decide anything. It did
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
- *"Is the detection real or hardcoded?"* — Real. Check in as Noah during the demo and
  watch R1 fire on data that didn't exist a second earlier.
- *"What if the teacher disagrees?"* — They dismiss it. The signal clears, and the
  dismissal is logged so the false-positive rate can be published.

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

Level 1 prototype — front-end only, **simulated history**, no backend or live model calls.
The rule engine, the check-in flow, the support plans and the escalation trail are real
and run in the browser; the sign-in is role separation, not security;
what is simulated is the 30 days of history they operate on, and the AI's suggested
wording is a per-rule template rather than a live API call.

## Roadmap

- **Level 2 (MVP):** real check-in storage, live Claude API pattern analysis, teacher login.
- **Level 3 (Product):** student accounts, privacy/safeguarding compliance, school data
  agreements, real escalation routing to counsellors.

## Business model

Per-classroom or whole-school licence, sold into wellbeing / pastoral care budgets.
