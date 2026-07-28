# Technical cheat sheet — Arthur

For Q&A. You will not need most of this; you need to be *unbothered* by all of it.

---

## The numbers, if you're asked

| | |
|---|---|
| Scale | 5 = Great, 4 = Good, 3 = Okay, 2 = Not good, 1 = thumbs-down. Stored as 1–5. |
| History | 30 school days per child |
| Baseline | That child's **median** over those 30 days. Median, not mean — one terrible day shouldn't move a baseline. |
| Poll interval | Teacher screen refreshes every 1.5 seconds |
| Class in the demo | 24 seeded children + however many visitors join |

## The four rules, exactly

- **R1 · Sudden change** — ≥2 steps below their own median, 2 consecutive days.
- **R2 · Sustained drift** — ≥1.5 steps below their own median, 3 consecutive days.
- **R3 · Repeating cycle** — same weekday ≥1.5 below their own median, in ≥4 of the last 6 occurrences.
- **R4 · Stopped checking in** — ≥3 consecutive school days missed, by a child who was answering before.

**Why the thresholds differ:** R1 catches a fast drop, so it demands a bigger gap over a
shorter window. R2 catches a slow slide, so a smaller gap over longer. R3 needs repetition
before it will claim a pattern.

**Worked example — Cody.** Median 4. Thursday 2 (2.0 below), Friday 1 (3.0 below). Two
consecutive days at or beyond 2.0 → R1 fires. The panel prints that arithmetic on screen.

**Worked example — Aroha.** Median 3.5. Three days at 2, each exactly 1.5 below. R2 fires;
R1 does not, because 1.5 < 2. That's the thresholds doing real work, not decoration.

## The one question you must answer honestly

> **"Is the AI real, or is it hardcoded?"**

"The detection is real — you watched it run on your own check-in. The wording step is
currently a written template, not a live model call. That's stated in our AI declaration.
The architecture puts a model there and it receives only a rule name and five numbers —
but either way, the model never decides who is flagged."

**Do not bluff this.** Your entire pitch is about not overclaiming; getting caught
overclaiming would be fatal in a way the honest answer never is. The honest answer is also
*more* impressive, because it means your detection doesn't depend on a model at all.

## Architecture, if pushed

- **Client:** one self-contained `index.html`. No framework, no dependencies, no CDN. The
  rule engine runs in the browser.
- **Server:** ~120 lines of Node using only built-in modules. It stores check-ins and
  nothing else — **it never runs a rule**. That's deliberate: it keeps "detection is
  auditable arithmetic" true end to end, and it's why the offline build is a complete
  product rather than a crippled one.
- **State:** in memory. A restart is a clean demo. No database, no logging, nothing on disk.
- **Live demo transport:** Cloudflare quick tunnel — outbound connection from this laptop,
  so no ports opened and no venue firewall to fight.
- **Faces:** inline SVG path data we drew, not emoji — so they render identically on every
  school device instead of shifting with the platform's emoji font.

## Design decisions you can defend

**Why median, not mean.** A mean is dragged by outliers. One awful Tuesday shouldn't
redefine a child's normal.

**Why compare a child only to themselves.** A class average would flag every quiet child
for being quiet. Comparing to their own baseline means a consistently "okay" child is never
flagged for being okay — which is the whole point for neurodivergent kids.

**Why a missing day isn't a low score.** You cannot claim a three-day drift through a day
the child never answered. R1–R3 refuse to fire across a gap; R4 covers the absence itself.

**Why the child is never told a rule fired.** Being flagged is information for the adults
around a child, not a label to hand the child about themselves. The child's own view shows
their history and nothing else — no rule, no flag, no baseline.

**Why the thumbs-down.** Judge feedback. A crying face is a big thing for a child to claim
about themselves and easy to avoid pressing; a thumbs-down is unmistakable and low-stakes.

## Things you should volunteer before you're caught

- The sign-in **secures nothing** — it's client-side, the PIN is in the source. It
  demonstrates role separation, which is a real requirement. The app says so on screen.
- All class data is **synthetic**. No real child was involved.
- It's a **prototype**, not a product. Level 2 is a real backend and one school for one term.

## Questions to hand back to a colleague

If a judge asks about schools, parents, cost, or rollout — **hand it over**. Those are
better answered by whoever presented slides 8 and 9, and the handoff shows a team rather
than a soloist. "That's [name]'s part — [name]?"

## If the demo dies mid-pitch

Switch to the offline tab and say so plainly: *"we've just lost the tunnel — here's the
same build running locally."* Then keep going. Same class, same four signals, every
feature. Do not apologise twice and do not start debugging in front of judges.
