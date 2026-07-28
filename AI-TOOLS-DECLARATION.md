# AI & Tools Declaration

**Team:** Team Sunny
**Members:** Arthur Chaves (300006351) · Ayra Inciong (111580) · Ben Harley (111816)
**Project:** Sunny — Classroom Mood Check-in
**Domain:** Education Technology
**ICL Sustainable Business Innovation & AI Hackathon 2026**

All work was produced between 27 and 29 July 2026. Nothing was prepared before the event
start. Every AI tool, library, dataset and third-party resource used is listed below.

---

## 1. Generative AI

| Tool | Version | What it was used for |
|---|---|---|
| **Claude** (Anthropic), via Claude Code | Opus 4.8 / Opus 5 | Development partner across the whole project: writing and reviewing the application code, the demo server, the deck generator and the written submission items; design critique of the check-in scale and dashboard; testing and debugging. |
| **Claude** (Anthropic), via the Claude API | `claude-opus-5` | Runtime use, optional: generates the teacher-facing wording for a fired rule. See §2. |

**How we used it.** Claude was used conversationally — we set the direction, made the
product and design decisions, and acted on judge feedback; Claude implemented, tested and
challenged. Several design choices came out of that dialogue and are documented in the
repository README, including the decision to separate rule-based detection from AI-written
wording, and the choice of a thumbs-down rather than a crying face at the bottom of the
scale.

Claude also found defects we had missed, including a mobile layout bug that clipped the
lowest option on the scale, and a privacy leak where the sign-in list exposed every
classmate's mood.

---

## 2. Important — what is *not* AI in the delivered product

We are declaring this explicitly because the distinction is the core of our design, and
we do not want to overstate what the prototype does.

**Detection makes no model calls. Wording optionally does.**

- **Detection is deterministic arithmetic.** Five fixed rules compare each child's
  check-in to their own 30-day median. This is plain maths, runs in the browser, and is
  fully auditable. No model is involved in deciding which child is flagged, and none of
  this changes when the item below is switched on.
- **The "suggested next step" shown to teachers can be a live Claude call.** When an
  `ANTHROPIC_API_KEY` is set on the machine running the demo server, that one step —
  and only that step — sends a request to Claude (`claude-opus-5`) consisting of a rule
  name, its threshold, the child's own 30-day median, and their last five check-in
  scores. No child's name, no free-text reason, no history beyond those five numbers.
  The model returns one or two sentences of suggested wording for the teacher; it never
  sees, and cannot influence, which child was flagged. Without a key set — including the
  version graders receive if they run it themselves without configuring one — this step
  falls back to a pre-written template per rule, and every failure path (no key, no
  network, a timeout, a policy refusal) degrades to that same template silently, so the
  panel can never render empty.

Generative AI was therefore used **to build** this project, extensively, rather than
being called by the finished prototype.

---

## 3. Libraries and packages

| Package | Version | Licence | Used for |
|---|---|---|---|
| Node.js | 20.20.2 | MIT | Runtime for the live-demo server |
| `pptxgenjs` | latest (npm) | MIT | Generating the pitch deck programmatically |
| `sharp` | latest (npm) | Apache-2.0 | Rasterising our SVG face scale to PNG for the deck |
| `cloudflared` | 2026.7.3 | Apache-2.0 | Public HTTPS tunnel for the live audience demo |
| `poppler` | 26.07.0 | GPL-2.0 | Reading the guideline PDF during preparation |

**The delivered application itself has zero third-party dependencies.** `index.html` is a
single self-contained file, and `server.js` uses only Node built-in modules. No frameworks,
no CDN scripts, no external fonts.

---

## 4. Data

**No real data of any kind was used. No real child was involved at any point.**

- The 24-pupil class, their 30 days of check-in history, and the three support plans are
  **synthetic data we invented**, generated deterministically in the browser so the demo is
  identical on every machine.
- Names were chosen to reflect an Auckland classroom. They are not real pupils.
- No public dataset, no scraped data, no third-party data source.
- The live demo stores voluntary check-ins from audience members in memory only. Nothing
  is written to disk, nothing is logged, and everything is destroyed when the process stops.

---

## 5. Assets

| Asset | Source |
|---|---|
| The five-point face scale | Original SVG, drawn by us as path data — not an icon library |
| Sign-in avatars | Original SVG, generated from the person's initial |
| Fonts | System fonts only (Segoe UI / system-ui stack; Cambria and Calibri in the deck) |
| Emoji in interface labels | Standard Unicode, rendered by the operating system |

No stock images, icon packs or third-party illustrations were used.

---

## 6. Declaration

Everything submitted is our team's own original work. Where generative AI contributed, it
did so under our direction and with our review, and its use is described above. All
open-source components are listed with their licences.

**Signed:**

- Arthur Chaves — 300006351
- Ayra Inciong — 111580
- Ben Harley — 111816

**Date:** 29 July 2026
