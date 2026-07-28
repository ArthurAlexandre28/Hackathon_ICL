/* Sunny — ICL Hackathon 2026 pitch deck.
 *
 * Constraints from the participant guidelines:
 *   - maximum 10 slides
 *   - 10 minute pitch + 5 minute Q&A
 *   - every team member should speak
 *   - Technical Execution is 25 points and breaks ties: the live demo leads.
 *
 * Judges join the class on their own phones during slide 1, so by slide 4 the
 * teacher screen already holds their own check-ins.
 */
const pptxgen = require("pptxgenjs");
const { faces } = require("./faces");
const p = new pptxgen();
p.layout = "LAYOUT_WIDE";               // 13.3 x 7.5
const W = 13.3, H = 7.5;

/* ---------- palette: night sky + sun ---------- */
const NIGHT = "1B2A4A", DEEP = "21304F", LIGHT = "F4F7FB", WHITE = "FFFFFF";
const GOLD  = "FFC24A", SKY  = "5B8DEF", MUTED = "6B7B92", INK = "1F2A37";
const M5 = "FFC24A", M4 = "FFD98A", M3 = "B9C4D4", M2 = "7FA8D9", M1 = "8B7FD9";
const ALERT = "E06666", GOOD = "3BB27A", SOFTBG = "E8F0FE";

const HEAD = "Cambria", BODY = "Calibri";
const shadow = () => ({ type: "outer", color: "0B1220", blur: 14, offset: 3, angle: 90, opacity: 0.16 });

let FACE;

/* ---------- helpers ---------- */
function titleSlide(s, txt, sub, dark) {
  s.addText(txt, { x: 0.75, y: 0.5, w: W - 1.5, h: 0.85, fontFace: HEAD, fontSize: 36, bold: true,
    color: dark ? WHITE : INK, margin: 0 });
  if (sub) s.addText(sub, { x: 0.75, y: 1.31, w: W - 1.5, h: 0.42, fontFace: BODY, fontSize: 15,
    color: dark ? "9FB3D0" : MUTED, margin: 0 });
}
function orb(s, x, y, d, fill, label, labelColor, fs) {
  s.addShape(p.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: fill }, shadow: shadow() });
  if (label) s.addText(label, { x, y, w: d, h: d, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: fs || 16, bold: true, color: labelColor || WHITE, margin: 0 });
}
function card(s, x, y, w, h, fill, line) {
  s.addShape(p.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.12,
    fill: { color: fill }, line: line ? { color: line, width: 1 } : { type: "none" }, shadow: shadow() });
}
function foot(s, txt, dark) {
  s.addText(txt, { x: 0.75, y: H - 0.78, w: W - 1.5, h: 0.3, fontFace: BODY, fontSize: 10,
    color: dark ? "6B84AB" : MUTED, margin: 0 });
}

async function main() {
FACE = await faces();

/* ================= 1 · TITLE + JOIN ================= */
{
  const s = p.addSlide();
  s.background = { color: NIGHT };
  s.addShape(p.ShapeType.ellipse, { x: 9.95, y: 1.05, w: 2.2, h: 2.2, fill: { color: GOLD }, shadow: shadow() });

  s.addText("Sunny", { x: 0.9, y: 1.15, w: 8, h: 1.15, fontFace: HEAD, fontSize: 60, bold: true, color: WHITE, margin: 0 });
  s.addText("Classroom Mood Check-in", { x: 0.95, y: 2.28, w: 8, h: 0.45, fontFace: BODY, fontSize: 21, color: GOLD, margin: 0 });
  s.addText("The quiet kid gets noticed —\nwithout a machine guessing how they feel.",
    { x: 0.95, y: 2.95, w: 7.6, h: 1.0, fontFace: BODY, fontSize: 15, color: "9FB3D0", lineSpacing: 25, margin: 0 });

  /* the join panel — judges start joining now, so slide 4 has their data */
  card(s, 0.9, 4.25, 11.5, 1.85, DEEP);
  s.addText("Join our classroom — right now, on your phone", { x: 1.3, y: 4.45, w: 7.4, h: 0.4,
    fontFace: HEAD, fontSize: 19, bold: true, color: GOLD, margin: 0 });
  s.addText([
    { text: "1.  Scan the QR code    ", options: { color: WHITE } },
    { text: "2.  Tap “I'm a student”    ", options: { color: WHITE } },
    { text: "3.  Class code ROOM6    ", options: { color: WHITE } },
    { text: "4.  Type your first name", options: { color: WHITE } },
  ], { x: 1.3, y: 4.95, w: 7.5, h: 0.9, fontFace: BODY, fontSize: 13.5, lineSpacing: 22, margin: 0 });
  s.addText("It takes twenty seconds. You'll see why in three minutes.",
    { x: 1.3, y: 5.62, w: 7.5, h: 0.35, fontFace: BODY, fontSize: 12, italic: true, color: "8AA3C4", margin: 0 });

  s.addShape(p.ShapeType.roundRect, { x: 9.35, y: 4.45, w: 1.45, h: 1.45, rectRadius: 0.08,
    fill: { color: WHITE }, line: { type: "none" } });
  s.addText("QR", { x: 9.35, y: 4.45, w: 1.45, h: 1.45, align: "center", valign: "middle",
    fontFace: BODY, fontSize: 11, bold: true, color: MUTED, margin: 0 });
  s.addText("or type the short link\non the whiteboard", { x: 10.95, y: 4.7, w: 1.5, h: 0.9,
    fontFace: BODY, fontSize: 10.5, color: "8AA3C4", lineSpacing: 15, margin: 0 });

  foot(s, "ICL Sustainable Business Innovation & AI Hackathon 2026  ·  Education Technology", true);
  s.addNotes(`SPEAKER 1  ·  [0:00–1:00]

REPLACE THE QR PLACEHOLDER before you present — generate it from the cloudflared URL and
paste it over the white box.

Open by getting them joining. Do not explain the product yet.

"Before we start — everyone please take out your phone and scan that code. It takes twenty
seconds. Tap 'I'm a student', class code ROOM6, and type your first name. Do it now, and
I'll explain why in a moment."

WAIT. Actually wait. Watch the room, not the slides. Let them finish.

"Right. Every classroom has a child who is struggling quietly. This is a tool that helps a
teacher notice them — without a machine ever guessing how that child feels."

Then move on. Don't reveal what their check-in does yet — slide 4 is the payoff.`);
}

/* ================= 2 · PROBLEM ================= */
{
  const s = p.addSlide();
  s.background = { color: LIGHT };
  titleSlide(s, "26 students. One teacher. Six hours.", "The children who most need noticing are the hardest to see.");

  const items = [
    ["Masking", "Kids who have learned to perform “fine” because it is easier than explaining.", M3],
    ["No words yet", "Neurodivergent kids who feel it clearly but cannot name it on demand.", M2],
    ["Won't say it aloud", "Kids who would never raise a hand in front of 25 classmates.", M1],
  ];
  items.forEach(([h, d, c], i) => {
    const x = 0.75 + i * 4.03;
    card(s, x, 2.2, 3.72, 2.45, WHITE, "E2EAF4");
    orb(s, x + 0.35, 2.52, 0.6, c, null);
    s.addText(h, { x: x + 1.1, y: 2.6, w: 2.4, h: 0.4, fontFace: HEAD, fontSize: 18, bold: true, color: INK, margin: 0 });
    s.addText(d, { x: x + 0.35, y: 3.32, w: 3.05, h: 1.1, fontFace: BODY, fontSize: 12.5, color: MUTED, lineSpacing: 18, margin: 0 });
  });

  card(s, 0.75, 5.0, 11.8, 0.9, DEEP);
  s.addText("By the time a struggling child is obvious, they have usually been struggling for weeks.",
    { x: 1.1, y: 5.0, w: 11.1, h: 0.9, fontFace: HEAD, fontSize: 17, italic: true, color: WHITE, valign: "middle", margin: 0 });
  s.addText("Existing tools ask children to name a feeling in words, or ask teachers to notice 26 people at once. Both fail the same children.",
    { x: 0.75, y: 6.05, w: 11.8, h: 0.4, fontFace: BODY, fontSize: 12, color: MUTED, margin: 0 });
  foot(s, "The problem");
  s.addNotes(`SPEAKER 1  ·  [1:00–2:30]

This slide is worth 20 points — Problem definition & relevance. Judges want a real,
significant problem with an identified stakeholder. Name the stakeholder explicitly.

"Twenty-six students, one teacher, six hours a day. The stakeholder here is the classroom
teacher — and behind them, the child nobody has got to yet."

Take each card slowly:
 · Masking — kids who perform "fine" because it's easier than explaining
 · No words yet — neurodivergent kids who feel it clearly but can't name it on demand
 · Won't say it aloud — kids who'd never raise a hand in front of 25 classmates

ARTHUR: this is where your Skill Samurai experience earns credibility. One specific
sentence about working with this age group — not a story, one sentence.

Land the dark bar: "By the time a struggling child is obvious, they've usually been
struggling for weeks."

Then the line underneath: existing tools either ask a child to name a feeling in words, or
ask a teacher to watch 26 people at once. Both fail the same children.`);
}

/* ================= 3 · MEET SUNNY ================= */
{
  const s = p.addSlide();
  s.background = { color: WHITE };
  titleSlide(s, "Meet Sunny", "One tap from the child. One calm dashboard for the teacher.");

  card(s, 0.75, 2.0, 5.75, 3.9, LIGHT, "E2EAF4");
  orb(s, 1.15, 2.35, 0.55, GOLD, "1", DEEP, 18);
  s.addText("The child", { x: 1.88, y: 2.4, w: 4, h: 0.42, fontFace: HEAD, fontSize: 20, bold: true, color: INK, margin: 0 });
  s.addText("“How are you feeling today?”", { x: 1.15, y: 2.98, w: 5, h: 0.35, fontFace: BODY, fontSize: 13.5, italic: true, color: SKY, margin: 0 });
  [5, 4, 3, 2, 1].forEach((sc, i) =>
    s.addImage({ data: FACE[sc], x: 1.15 + i * 0.78, y: 3.45, w: 0.62, h: 0.62 }));
  s.addText([
    { text: "Faces, not words — nothing to spell, nothing to decode", options: { bullet: true, breakLine: true } },
    { text: "The bottom of the scale is a thumbs-down, not a crying face", options: { bullet: true, breakLine: true } },
    { text: "Optional reason tag, including “rather not say”", options: { bullet: true } },
  ], { x: 1.15, y: 4.3, w: 5, h: 1.3, fontFace: BODY, fontSize: 12, color: MUTED, paraSpaceAfter: 5, margin: 0 });

  card(s, 6.8, 2.0, 5.75, 3.9, LIGHT, "E2EAF4");
  orb(s, 7.2, 2.35, 0.55, SKY, "2", WHITE, 18);
  s.addText("The teacher", { x: 7.93, y: 2.4, w: 4, h: 0.42, fontFace: HEAD, fontSize: 20, bold: true, color: INK, margin: 0 });
  s.addText("A separate sign-in, on a separate screen", { x: 7.2, y: 2.98, w: 5, h: 0.35, fontFace: BODY, fontSize: 13.5, italic: true, color: SKY, margin: 0 });
  const grid = [5, 5, 2, 5, 4, 5, 5, 4, 5, 1, 2, 5];
  grid.forEach((sc, i) => {
    const gx = 7.2 + (i % 6) * 0.42, gy = 3.45 + Math.floor(i / 6) * 0.42;
    s.addImage({ data: FACE[sc], x: gx, y: gy, w: 0.34, h: 0.34 });
  });
  s.addText([
    { text: "Soft signals, never red alarms", options: { bullet: true, breakLine: true } },
    { text: "Patterns over time a grid scan would miss", options: { bullet: true, breakLine: true } },
    { text: "A child's screen can never reach this one", options: { bullet: true } },
  ], { x: 9.9, y: 3.4, w: 2.5, h: 1.4, fontFace: BODY, fontSize: 11, color: MUTED, paraSpaceAfter: 5, margin: 0 });
  foot(s, "The solution");
  s.addNotes(`SPEAKER 2  ·  [2:30–3:30]

Fast. This is orientation before the demo, not the demo itself.

"The child taps a face. Five options, twenty seconds. No password, no vocabulary — and no
metaphor to decode first."

Worth saying, because it came from judge feedback yesterday: "Our first version used a
weather scale. We were told a child shouldn't have to translate a feeling into weather
before they can answer — so we rebuilt it as faces. The bottom is a thumbs-down rather than
a crying face, because a crying face is a big thing for a child to claim about themselves,
and it's easy to avoid pressing."

That sentence shows you act on feedback. Judges notice.

Then the right-hand side: "The teacher gets the class at a glance plus soft signals — never
red alarms. Two separate sign-ins, because the teacher's screen holds 24 other children's
check-ins and a student device must never reach it."

Now hand over for the demo.`);
}

/* ================= 4 · LIVE DEMO ================= */
{
  const s = p.addSlide();
  s.background = { color: NIGHT };
  s.addText("You are the class.", { x: 0.9, y: 1.0, w: 9, h: 1.0, fontFace: HEAD, fontSize: 46, bold: true, color: WHITE, margin: 0 });
  s.addText("Switch to the live teacher screen now.", { x: 0.95, y: 2.05, w: 9, h: 0.45,
    fontFace: BODY, fontSize: 17, color: GOLD, margin: 0 });

  const beats = [
    ["Your faces", "Every one of you who checked in is on that board, tagged new. Nobody typed a password."],
    ["Four signals", "Isla, Cody, Aroha, Maia — flagged by four different rules, computed live from 30 days of data."],
    ["Check in again", "Watch the board change while you look at it. Nothing here is pre-recorded."],
  ];
  beats.forEach(([h, d], i) => {
    const y = 2.85 + i * 1.15;
    card(s, 0.9, y, 11.5, 0.98, DEEP);
    orb(s, 1.25, y + 0.19, 0.6, GOLD, String(i + 1), DEEP, 17);
    s.addText(h, { x: 2.1, y: y + 0.12, w: 2.6, h: 0.35, fontFace: HEAD, fontSize: 17, bold: true, color: WHITE, margin: 0 });
    s.addText(d, { x: 2.1, y: y + 0.5, w: 9.9, h: 0.35, fontFace: BODY, fontSize: 12.5, color: "9FB3D0", margin: 0 });
  });

  s.addText("This slide is a safety net. If the network fails, the offline build has the same class and the same four signals.",
    { x: 0.9, y: 6.28, w: 11.5, h: 0.33, fontFace: BODY, fontSize: 11, italic: true, color: "6B84AB", margin: 0 });
  foot(s, "Live demonstration", true);
  s.addNotes(`SPEAKER 2  ·  [3:30–6:00]  ·  THE BIG ONE

Technical Execution is 25 points and breaks ties. This is where you win it. Get off the
slides and onto the actual teacher screen.

BEFORE YOU START: turn on "Big screen" (top bar) so the back row can read it.

Beat 1 — their own faces
"Everyone who scanned that code is on this board right now. Those tiles marked 'new' are
you." Point at two or three by name. Let them react.

Beat 2 — the four signals
"These four were flagged before any of you arrived. Isla stopped checking in four days ago.
Cody dropped two steps below his own normal. Aroha has drifted for three days. Maia is low
every Monday. Four different rules, computed from thirty days of data."

Beat 3 — do it live
"Someone check in again now — pick the thumbs-down." Wait for the board to update.
"That's not pre-recorded. The rules just re-ran."

IF THE NETWORK DIES: switch to the offline tab and say so plainly — "we've lost the tunnel,
here's the same thing running locally." Do not apologise twice and do not fiddle. The
offline build has the identical class and all four signals.

Leave time. Do not rush this to protect later slides — later slides matter less than this.`);
}

/* ================= 5 · THE HARD QUESTION ================= */
{
  const s = p.addSlide();
  s.background = { color: WHITE };
  s.addText("“How do you know\nthe child is sad?”", { x: 0.9, y: 1.5, w: 7.5, h: 2.1,
    fontFace: HEAD, fontSize: 40, bold: true, color: INK, lineSpacing: 50, margin: 0 });
  s.addText("We don't.", { x: 0.95, y: 3.85, w: 7.5, h: 0.75, fontFace: HEAD, fontSize: 38, bold: true, color: SKY, margin: 0 });
  s.addText("And Sunny says so, on screen, every single time.",
    { x: 0.95, y: 4.68, w: 7.5, h: 0.5, fontFace: BODY, fontSize: 16, color: MUTED, margin: 0 });

  card(s, 8.7, 1.7, 3.85, 3.9, DEEP);
  s.addText("What Sunny actually detects", { x: 9.05, y: 2.05, w: 3.2, h: 0.35, fontFace: BODY, fontSize: 11,
    bold: true, color: GOLD, margin: 0 });
  s.addText("A number a child chose\nfor themselves has moved\naway from their own normal.",
    { x: 9.05, y: 2.55, w: 3.2, h: 1.15, fontFace: HEAD, fontSize: 16, color: WHITE, lineSpacing: 24, margin: 0 });
  s.addShape(p.ShapeType.line, { x: 9.05, y: 3.85, w: 3.15, h: 0, line: { color: "3B5480", width: 1 } });
  s.addText("That is the entire claim.\nNothing about feelings.\nNothing about why.",
    { x: 9.05, y: 4.05, w: 3.2, h: 1.1, fontFace: BODY, fontSize: 12.5, color: "9FB3D0", lineSpacing: 20, margin: 0 });

  s.addText("A judge asked us this yesterday. Rebuilding the answer became the product.",
    { x: 0.9, y: 5.9, w: 11.5, h: 0.4, fontFace: BODY, fontSize: 13, italic: true, color: MUTED, margin: 0 });
  foot(s, "The question every judge asks");
  s.addNotes(`SPEAKER 3  ·  [6:00–6:45]

Pause before you speak. Let the question sit on screen.

"You're about to ask me — how do you know the child is sad?"

Beat.

"We don't. And Sunny says so, on screen, every single time."

Then be honest about where this came from: "A judge asked us exactly this yesterday. The
answer changed our architecture, and it's now the strongest thing about the product."

Read the right-hand panel out loud — it's the whole claim: a number a child chose for
themselves has moved away from their own normal. Nothing about feelings. Nothing about why.

Do not rush off this slide. It sets up the next two.`);
}

/* ================= 6 · PIPELINE ================= */
{
  const s = p.addSlide();
  s.background = { color: LIGHT };
  titleSlide(s, "How a signal is produced", "Detection is arithmetic. AI only writes the wording. The two are never mixed.");

  const steps = [
    ["1", "Input", "This child's 30 school days, and their own median.", "No AI", SKY],
    ["2", "Detection", "Four fixed arithmetic rules. Deterministic and auditable.", "No AI", DEEP],
    ["3", "Wording", "Turns a fired rule into a plain-English suggestion.", "AI", GOLD],
    ["4", "Decision", "The teacher decides. Always. Sunny contacts nobody.", "No AI", SKY],
  ];
  steps.forEach(([n, h, d, tag, c], i) => {
    const x = 0.75 + i * 3.03;
    const isAI = tag === "AI";
    card(s, x, 2.2, 2.78, 3.0, isAI ? SOFTBG : WHITE, isAI ? GOLD : "E2EAF4");
    orb(s, x + 0.3, 2.5, 0.52, c, n, c === GOLD ? DEEP : WHITE, 17);
    s.addText(h, { x: x + 0.3, y: 3.15, w: 2.2, h: 0.35, fontFace: HEAD, fontSize: 17, bold: true, color: INK, margin: 0 });
    s.addText(d, { x: x + 0.3, y: 3.58, w: 2.2, h: 1.1, fontFace: BODY, fontSize: 11.5, color: MUTED, lineSpacing: 17, margin: 0 });
    s.addText(tag, { x: x + 0.3, y: 4.72, w: 2.2, h: 0.3, fontFace: BODY, fontSize: 11, bold: true,
      color: isAI ? "A6761D" : GOOD, margin: 0 });
    if (i < 3) s.addText("›", { x: x + 2.78, y: 3.4, w: 0.25, h: 0.4, align: "center",
      fontFace: BODY, fontSize: 22, color: M3, margin: 0 });
  });

  card(s, 0.75, 5.45, 11.8, 0.85, DEEP);
  s.addText("Remove the AI entirely and Sunny flags exactly the same children.",
    { x: 1.1, y: 5.45, w: 11.1, h: 0.85, fontFace: HEAD, fontSize: 18, bold: true, color: GOLD, valign: "middle", margin: 0 });
  foot(s, "Our answer  ·  Innovation");
  s.addNotes(`SPEAKER 3  ·  [6:45–7:45]

Your strongest architectural slide. Worth real time.

"Detection is arithmetic. The AI only writes the wording. We never mix the two."

"Step three receives a rule name and five numbers. No child's name, no reason tags, no
history. It returns one sentence for a teacher to read."

Then the gold bar, slowly: "Remove the AI entirely and Sunny flags exactly the same
children."

BE HONEST IF ASKED — and expect it: in this prototype step 3 is a written template, not a
live model call. Say so. It is in our AI declaration. The architecture is built for a model
there, and the point stands either way: the model never decides who is flagged.

That honesty is worth more than the claim. Do not bluff it.`);
}

/* ================= 7 · RULES + BASELINE ================= */
{
  const s = p.addSlide();
  s.background = { color: WHITE };
  titleSlide(s, "Four rules, printed in full", "Because a parent should be able to check the maths by hand.");

  const rules = [
    ["R1", "Sudden change", "≥2 steps below their own 30-day median, 2 days running.", ALERT],
    ["R2", "Sustained drift", "≥1.5 steps below their own median, 3 days running.", "E8A13A"],
    ["R3", "Repeating cycle", "The same weekday low in 4 of the last 6 occurrences.", SKY],
    ["R4", "Stopped checking in", "A child who normally answers has missed 3 days.", "8B7FD9"],
  ];
  rules.forEach(([id, h, d, c], i) => {
    const y = 2.08 + i * 0.81;
    card(s, 0.75, y, 11.8, 0.72, LIGHT, "E2EAF4");
    orb(s, 1.02, y + 0.08, 0.58, c, id, WHITE, 14);
    s.addText(h, { x: 1.85, y: y + 0.06, w: 2.7, h: 0.32, fontFace: HEAD, fontSize: 16, bold: true, color: INK, margin: 0 });
    s.addText(d, { x: 4.6, y: y + 0.09, w: 7.7, h: 0.32, fontFace: BODY, fontSize: 12.5, color: MUTED, margin: 0 });
  });

  card(s, 0.75, 5.55, 5.75, 0.95, SOFTBG, GOLD);
  s.addText("Compared only to themselves", { x: 1.1, y: 5.66, w: 5.1, h: 0.3, fontFace: HEAD, fontSize: 14, bold: true, color: DEEP, margin: 0 });
  s.addText("A child who is always “okay” is never flagged for it.",
    { x: 1.1, y: 5.98, w: 5.1, h: 0.4, fontFace: BODY, fontSize: 12, color: DEEP, margin: 0 });
  card(s, 6.8, 5.55, 5.75, 0.95, SOFTBG, GOLD);
  s.addText("Silence is a signal too", { x: 7.15, y: 5.66, w: 5.1, h: 0.3, fontFace: HEAD, fontSize: 14, bold: true, color: DEEP, margin: 0 });
  s.addText("A mood scale cannot say “I have stopped answering”. R4 can.",
    { x: 7.15, y: 5.98, w: 5.1, h: 0.4, fontFace: BODY, fontSize: 12, color: DEEP, margin: 0 });
  foot(s, "Transparency  ·  Innovation");
  s.addNotes(`SPEAKER 3  ·  [7:45–8:30]

Don't read all four aloud — gesture at them. The point is that they FIT ON ONE SLIDE.

"Four rules. That's all of them. A parent could check this maths by hand."

Then the two boxes, which are the ones that matter:

LEFT — "Every rule compares a child only to themselves. A child who checks in 'okay' most
days is never flagged for it. That's their normal, and normal is not a problem. This is
deliberate — it stops quiet and neurodivergent kids being pathologised for their baseline."

RIGHT — "R4 is the one we're proudest of. A mood scale cannot express 'I have stopped
answering.' A child who quietly disengages produces no low scores at all — so without R4
they're invisible at exactly the point you most want to see them."

If you only get one extra sentence in Q&A, use the left-hand one.`);
}

/* ================= 8 · HUMAN PLAN + SAFEGUARDING ================= */
{
  const s = p.addSlide();
  s.background = { color: LIGHT };
  titleSlide(s, "The machine found the pattern.", "A human already knew why — support plans, written by the people who know the child, rank above the AI.");

  card(s, 0.75, 2.15, 6.4, 3.05, WHITE, GOOD);
  s.addText("Rule R3 reports", { x: 1.15, y: 2.4, w: 5.6, h: 0.3, fontFace: BODY, fontSize: 11, bold: true, color: MUTED, margin: 0 });
  s.addText("“Every one of Maia's last 6 Mondays sits below her own median.”",
    { x: 1.15, y: 2.72, w: 5.6, h: 0.65, fontFace: HEAD, fontSize: 15, color: INK, lineSpacing: 21, margin: 0 });
  s.addShape(p.ShapeType.line, { x: 1.15, y: 3.55, w: 5.6, h: 0, line: { color: "E2EAF4", width: 1 } });
  s.addText("Her mum wrote, months ago", { x: 1.15, y: 3.7, w: 5.6, h: 0.3, fontFace: BODY, fontSize: 11, bold: true, color: GOOD, margin: 0 });
  s.addText("“Swimming is Monday, first period. It's the changing rooms she can't stand, not the swimming.”",
    { x: 1.15, y: 4.02, w: 5.6, h: 0.95, fontFace: HEAD, fontSize: 15, italic: true, color: INK, lineSpacing: 21, margin: 0 });

  const cols = [
    ["Never a diagnosis", "Sunny detects a moved number. It never labels a child."],
    ["Human in the loop", "Every signal ends in a person's decision."],
    ["Escalation is manual", "The teacher sees what gets sent, and what never does."],
    ["Minimal data", "One tap, no free text. Deleted after 30 days."],
  ];
  cols.forEach(([h, d], i) => {
    const y = 2.15 + i * 0.78;
    card(s, 7.45, y, 5.1, 0.68, WHITE, "E2EAF4");
    s.addText(h, { x: 7.75, y: y + 0.04, w: 4.6, h: 0.28, fontFace: HEAD, fontSize: 13, bold: true, color: INK, margin: 0 });
    s.addText(d, { x: 7.75, y: y + 0.33, w: 4.6, h: 0.3, fontFace: BODY, fontSize: 10.5, color: MUTED, margin: 0 });
  });

  card(s, 0.75, 5.5, 11.8, 0.85, DEEP);
  s.addText("The people who know the child outrank the model. That ordering is on screen, not just in our heads.",
    { x: 1.1, y: 5.5, w: 11.1, h: 0.85, fontFace: HEAD, fontSize: 16, italic: true, color: WHITE, valign: "middle", margin: 0 });
  foot(s, "Safeguarding by design");
  s.addNotes(`SPEAKER 4  ·  [8:30–9:15]

This is the most human slide in the deck. Slow down.

"Every child can have a support plan — what helps, what makes it worse, who they'll talk
to — written by a parent or a teacher. It appears above the AI's suggestion in the panel.
That ordering is deliberate."

Then the Maia example, which is the best thing we have:

"Rule R3 told us every one of Maia's last six Mondays is low. It has no idea why. But her
mum wrote this months ago — swimming is Monday first period, and it's the changing rooms
she can't stand, not the swimming."

Beat.

"The machine found the pattern. A human already knew the reason. Neither is much use
without the other."

Right-hand column, quickly — it's the list a principal asks for before signing anything.
Don't read all four; say "never a diagnosis, human in the loop, escalation is manual and
previewed, and one tap of data that's deleted after thirty days."`);
}

/* ================= 9 · BUSINESS + ROADMAP ================= */
{
  const s = p.addSlide();
  s.background = { color: WHITE };
  titleSlide(s, "Who pays, and where it goes", "Sold into wellbeing and pastoral budgets — not IT budgets.");

  const facts = [
    ["Buyer", "The wellbeing lead or principal. A pastoral tool that happens to be software."],
    ["Model", "Per-classroom annual licence. A school can start with one class and expand."],
    ["Why us", "The option a school can defend to parents, because the detection is auditable arithmetic."],
  ];
  facts.forEach(([h, d], i) => {
    const y = 2.15 + i * 0.85;
    card(s, 0.75, y, 6.4, 0.72, i === 2 ? SOFTBG : LIGHT, i === 2 ? GOLD : "E2EAF4");
    s.addText(h, { x: 1.1, y, w: 1.3, h: 0.72, fontFace: HEAD, fontSize: 14, bold: true,
      color: i === 2 ? DEEP : SKY, valign: "middle", margin: 0 });
    s.addText(d, { x: 2.45, y, w: 4.5, h: 0.72, fontFace: BODY, fontSize: 11.5, color: i === 2 ? DEEP : MUTED, valign: "middle", margin: 0 });
  });

  const levels = [
    ["Level 1", "Today", "Working prototype — you just used it.", GOOD],
    ["Level 2", "This term", "Real storage, live model, one school for a term.", GOLD],
    ["Level 3", "2027", "Accounts, compliance, escalation routing.", SKY],
  ];
  levels.forEach(([lv, when, d, c], i) => {
    const y = 2.15 + i * 0.85;
    card(s, 7.45, y, 5.1, 0.72, LIGHT, "E2EAF4");
    orb(s, 7.72, y + 0.11, 0.5, c, String(i + 1), c === GOLD ? DEEP : WHITE, 14);
    s.addText(`${lv} · ${when}`, { x: 8.42, y: y + 0.03, w: 3.9, h: 0.28, fontFace: HEAD, fontSize: 12.5, bold: true, color: INK, margin: 0 });
    s.addText(d, { x: 8.42, y: y + 0.32, w: 3.9, h: 0.32, fontFace: BODY, fontSize: 10.5, color: MUTED, margin: 0 });
  });

  card(s, 0.75, 4.95, 11.8, 0.9, DEEP);
  s.addText("Detection stays rule-based at every level. Scaling adds reach, never opacity.",
    { x: 1.1, y: 4.95, w: 11.1, h: 0.9, fontFace: HEAD, fontSize: 16, bold: true, color: GOLD, valign: "middle", margin: 0 });
  s.addText("Sustainability: early, low-cost pastoral support costs a school far less — in staff time and in outcomes — than late intervention.",
    { x: 0.75, y: 6.05, w: 11.8, h: 0.4, fontFace: BODY, fontSize: 12, italic: true, color: MUTED, margin: 0 });
  foot(s, "Business impact & feasibility");
  s.addNotes(`SPEAKER 4  ·  [9:15–9:45]

Worth 20 points — Business impact & feasibility. Judges want to know it could really exist.

"This sells into wellbeing and pastoral budgets, not IT. Per-classroom licence, so a school
can start with one class."

The wedge line matters most: "We're the option a school can actually defend to parents,
because the detection is auditable arithmetic rather than a model's opinion."

Roadmap — be honest about what's built: "Level one is running, you just used it. Level two
is real storage and a live model for the wording, in one school for one term. Level three
is compliance and escalation routing."

Then: "Detection stays rule-based at every level. Scaling adds reach, never opacity."

Close with the sustainability line — early support costs a school far less than late
intervention, in staff time and in outcomes.

Keep pricing vague unless asked. If pressed: indicative, depends on the pilot.`);
}

/* ================= 10 · CLOSE ================= */
{
  const s = p.addSlide();
  s.background = { color: NIGHT };
  s.addShape(p.ShapeType.ellipse, { x: 10.4, y: 4.5, w: 2.2, h: 2.2, fill: { color: GOLD }, shadow: shadow() });

  s.addText("Sunny didn't diagnose anyone.", { x: 0.9, y: 1.85, w: 9.2, h: 0.85,
    fontFace: HEAD, fontSize: 34, bold: true, color: WHITE, margin: 0 });
  s.addText("It did arithmetic on five numbers,\nshowed its working,\nand made sure a caring adult noticed.",
    { x: 0.95, y: 2.9, w: 9.2, h: 1.7, fontFace: HEAD, fontSize: 25, color: GOLD, lineSpacing: 38, margin: 0 });
  s.addText("That is the only kind of AI a school should ever point at a child.",
    { x: 0.95, y: 4.85, w: 9.2, h: 0.45, fontFace: BODY, fontSize: 16, color: "9FB3D0", margin: 0 });

  [5, 4, 3, 2, 1].forEach((sc, i) =>
    s.addImage({ data: FACE[sc], x: 0.95 + i * 0.62, y: 5.6, w: 0.5, h: 0.5 }));
  foot(s, "Sunny  ·  github.com/ArthurAlexandre28/Hackathon_ICL  ·  ICL Hackathon 2026", true);
  s.addNotes(`SPEAKER 4  ·  [9:45–10:00]  ·  STOP TALKING AFTER THIS

"Sunny didn't diagnose anyone. It did arithmetic on five numbers, showed its working, and
made sure a caring adult noticed."

Beat.

"That's the only kind of AI a school should ever point at a child."

Then STOP. Do not add anything. Let the silence do the work. You will be tempted to fill
it — don't.

═══════════════════════════════════════════
Q&A — 5 MINUTES. Whoever knows the answer takes it; judges score whole-team contribution.

Q: How do you know the child is sad?
A: We don't, and we say so on screen. We detect that a self-reported number moved from that
   child's own baseline. Step 3 of every signal lists the innocent explanations.

Q: Is the AI real, or is it hardcoded?
A: The detection is real and you watched it run. The wording step is currently a written
   template, not a live model call — that's stated in our AI declaration. The architecture
   puts a model there, and either way the model never decides who is flagged.

Q: What about a kid who's always low?
A: Never flagged for their baseline. Only change counts. That's the whole design.

Q: What if the teacher disagrees?
A: They dismiss it. The signal clears and the dismissal is logged, so we can publish a real
   false-positive rate rather than guess at one.

Q: Privacy? Parents?
A: One tap. No free text, no camera, no microphone. Deleted after 30 days, never trains a
   model, never auto-notifies anyone. Escalation is always a human choice.

Q: Is this real data?
A: Entirely synthetic — no real child was involved. The rules are real and you just watched
   them run on your own check-ins.

Q: What would you do next?
A: One school, one term, and publish the false-positive rate honestly.
═══════════════════════════════════════════`);
}

await p.writeFile({ fileName: "Sunny-Pitch-Deck.pptx" });
console.log("wrote Sunny-Pitch-Deck.pptx (10 slides)");
}
main().catch(e => { console.error(e); process.exit(1); });
