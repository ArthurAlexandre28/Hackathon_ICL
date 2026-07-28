# Sunny — Target user, the problem, and the evidence

**ICL Hackathon 2026 · Education Technology**

---

## 1. The age group

**Primary target: ages 8–11 (New Zealand Years 4–6).**

Secondary/expansion: ages 12–13 (Years 7–8, intermediate), where a homeroom teacher
still exists but subject rotation begins.

### Why the lower bound is 8, not younger

This is a self-report tool, and self-report has a developmental floor.

- Children **under 8 cannot reliably recall beyond the past 48 hours**, and can only
  reliably use a **dichotomous** (yes/no) response format — not a five-point scale.
  Sunny asks "how are you feeling *today*" (inside the 48-hour window ✓) but uses a
  five-point scale, which puts the floor at 8.
- **Children aged 7–8 and above are able reporters of their own mental health.** The
  *Me and My School* questionnaire — a validated self-report mental health measure — is
  designed for **ages eight and above**.
- Below age 8, the field defaults to **parent or teacher proxy-reporting**, which is
  precisely the thing Sunny exists to supplement rather than replace.

### Why the upper bound is 11 (with 12–13 as expansion)

This is a structural constraint, not a developmental one. Sunny's core premise —
*"one teacher, 26 children, six hours a day"* — depends on a **single class teacher who
sees the same children all day**. That model holds in NZ primary (Years 1–6). At
secondary, a student is seen by six different teachers for an hour each, and nobody
holds the whole picture — which changes the product significantly.

### Why this age band specifically benefits

It is the window where a child **has enough self-awareness to answer honestly, but not
yet enough emotional vocabulary to volunteer it unprompted**. Younger children can't
reliably self-report; older ones have more language and more peer/pastoral structures.
Ages 8–11 is where the gap between "feels it" and "can say it" is widest.

---

## 2. Who the app is for

Sunny has **four distinct users**, and only one of them is the child.

| User | What they do | What they never see |
|---|---|---|
| **The child (8–11)** | One 20-second tap per day. Optional one-tap "why". Can view their own history. | Any classmate's mood. Any rule, flag, or "concern" language about themselves. |
| **The class teacher** | Sees a class grid + 3–5 soft signals. Decides what to do. Can escalate. | Nothing hidden from them about their own class — full context in one panel. |
| **The wellbeing lead** | Receives escalations, only when a teacher chooses to send one. | Anything not explicitly raised. Never auto-notified. |
| **The parent** | Writes short-lived context ("her nan went into hospital Sunday") and a standing support plan ("what helps her"). | **The child's mood data.** Context flows in; nothing flows back out. |

**The buyer is the school** (pastoral/wellbeing budget), not the parent and not the child.

---

## 3. The problem

### The core finding

Teachers are systematically better at spotting the loud child than the quiet one — and
the research quantifies exactly how much.

> Teachers identified only **50%** of students who repeatedly self-reported at-risk levels
> of **depression**, and **40.7%** of those reporting at-risk levels of **anxiety**.
> — *Accuracy of Teachers in Identifying Elementary School Students Who Report At-Risk
> Levels of Anxiety and Depression* (School Mental Health)

Roughly **six in ten anxious children go unidentified** by the adult who sees them every
day. Not through negligence — through the structural impossibility of reading 26 inner
states at once, combined with a well-documented perceptual bias:

- Teachers **accurately identify severe** externalizing *and* internalizing problems, but
  are **markedly less accurate with moderate or subclinical** symptoms — the stage where
  early intervention actually works.
- **Externalizing behaviour** (disruption, acting out) is perceived by teachers as **more
  serious and more concerning** than internalizing behaviour, biasing attention toward
  the child who is loud rather than the child who is struggling quietly.
- Internalizing problems are simply **less observable**.

### The scale of it in New Zealand

- Approximately **8% of NZ children aged 3–14 — about 57,000 children — experience
  significant social, emotional and/or behavioural difficulties** (Ministry of Health,
  2018 survey).
- International prevalence for comparison: **anxiety disorders 5.2%**, **ADHD 4–7%**,
  **mood disorders 1.3%**.
- In a class of 26, roughly **two children** fall into that 8%. If teachers identify
  around half, **one of them is invisible** on any given day.
- The Government announced funding in **September 2024** for a Child and Youth Mental
  Health Study covering ages 5–24, explicitly to address the gap in current NZ prevalence
  data — the most recent detailed figures date to 2018.

### The intervention the research points to

> "Screenings that incorporate **self-report data** have the additional advantage of
> **improved detection of internalizing, or less easily observable emotional problems**."

That sentence is the product thesis. Sunny is not trying to replace teacher judgment —
it adds the one input teachers structurally cannot obtain by observation: **the child's
own report, from every child, every day.**

---

## 4. Evidence that validates specific design decisions

### The face scale

We switched from a weather metaphor to faces on judge feedback, before finding this:

> **"Face scales demonstrate better psychometric properties than visual analogue or
> Likert scales."**
> — *Enhancing validity, reliability and participation in self-reported health outcome
> measurement for children and young people* (Quality of Life Research, systematic review)

The design change we made on instinct is the one the psychometric literature supports.

### Age-adapted instruments are a recognised necessity

Self-report measures for young children must account for **cognitive development, reading
ability, and emotional maturity**, and must provide **concrete support for the answering
process**. Validated instruments for the 6–10 band exist specifically because standard
adult-derived scales fail at this age — e.g. an age-adapted, **video-assisted** version of
KIDSCREEN-27 built for six- to ten-year-olds.

Sunny's design decisions map onto this directly: faces rather than words, no free text,
a single question, a 20-second interaction, and no reading beyond five short labels.

### Why "one bad day" is not the signal

Developmental research notes that school-aged children are **susceptible to response
bias** on abstract or complex wellbeing items. This is the empirical case for Sunny's
core rule design: it never flags a single low tap. It flags **change from a child's own
baseline** sustained across days — which is far more robust to a child having one bad
morning, or misreading the question once.

---

## 5. Honest limitations of this evidence

Stated plainly, because overclaiming here would undercut the whole pitch.

- **The teacher-detection figures (50% / 40.7%) are from a US elementary-school study**,
  not a NZ replication. The mechanism is very likely to transfer; the exact percentages
  should not be presented as NZ figures.
- **The NZ prevalence figure (8%) is from a 2018 Ministry of Health survey** and covers
  ages 3–14, a wider band than our target. Newer NZ-specific data is not yet published —
  the 2024-funded study is intended to fill exactly this gap.
- **No evidence yet that Sunny improves outcomes.** The research above establishes that
  the *problem* is real and that *self-report improves detection*. It does not establish
  that this particular implementation helps any specific child. That requires a pilot with
  a validation study — see the roadmap.
- **Our detection thresholds are not empirically derived.** They were chosen to be legible
  and demonstrable, not validated against clinical outcomes. Establishing the right
  thresholds is a research question, not an engineering one.
- **A chronically severe baseline is currently invisible to us** — see the "Known
  limitation" section in the README. Every rule measures deviation from a child's own
  normal, so a child whose normal is already severe never triggers one.

---

## Sources

- [Accuracy of Teachers in Identifying Elementary School Students Who Report At-Risk Levels of Anxiety and Depression — *School Mental Health*](https://link.springer.com/article/10.1007/s12310-014-9125-9)
- [Teacher Recognition, Concern, and Referral of Children's Internalizing and Externalizing Behavior Problems — *School Mental Health*](https://link.springer.com/article/10.1007/s12310-018-09303-z)
- [Child and Youth Mental Health Study — Ministry of Health NZ](https://www.health.govt.nz/statistics-research/surveys/child-and-youth-mental-health-study)
- [Mental health of children and young people in Aotearoa 2023 — University of Otago](https://ourarchive.otago.ac.nz/esploro/outputs/report/Mental-health-of-children-and-young/9926720061101891)
- [Enhancing validity, reliability and participation in self-reported health outcome measurement for children and young people — *Quality of Life Research*](https://link.springer.com/article/10.1007/s11136-021-02814-4)
- [How young can children reliably and validly self-report their health-related quality of life? — *Health and Quality of Life Outcomes*](https://hqlo.biomedcentral.com/articles/10.1186/1477-7525-5-1)
- [Clinical validity of the Me and My School questionnaire — a self-report mental health measure for children and adolescents](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4067682/)
- [Enabling six- to ten-year-old children to self-report their wellbeing and quality of life — age-adapted KIDSCREEN-27](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12119647/)
