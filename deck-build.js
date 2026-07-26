const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.layout = "LAYOUT_WIDE";               // 13.3 x 7.5
const W = 13.3, H = 7.5;

/* ---------- palette: night sky + sun ---------- */
const NIGHT = "1B2A4A", DEEP = "21304F", LIGHT = "F4F7FB", WHITE = "FFFFFF";
const GOLD  = "FFC24A", SKY  = "5B8DEF", MUTED = "6B7B92", INK = "1F2A37";
const SUNNY = "FFCF4A", OKAY = "FFD98A", CLOUD = "B9C4D4", RAIN = "7FA8D9", STORM = "8B7FD9";
const ALERT = "E06666", GOOD = "3BB27A", SOFTBG = "E8F0FE";

const HEAD = "Cambria", BODY = "Calibri";
const shadow = () => ({ type: "outer", color: "0B1220", blur: 14, offset: 3, angle: 90, opacity: 0.16 });

/* ---------- helpers ---------- */
function titleSlide(s, txt, sub, dark) {
  s.addText(txt, { x: 0.75, y: 0.5, w: W - 1.5, h: 0.85, fontFace: HEAD, fontSize: 38, bold: true,
    color: dark ? WHITE : INK, margin: 0 });
  if (sub) s.addText(sub, { x: 0.75, y: 1.33, w: W - 1.5, h: 0.4, fontFace: BODY, fontSize: 15,
    color: dark ? "9FB3D0" : MUTED, margin: 0 });
}
// the repeating motif: a filled circle holding a short label
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

/* ================= 1 · TITLE ================= */
{
  const s = p.addSlide();
  s.background = { color: NIGHT };
  // sun motif
  s.addShape(p.ShapeType.ellipse, { x: 9.95, y: 1.55, w: 2.6, h: 2.6, fill: { color: GOLD }, shadow: shadow() });
  s.addShape(p.ShapeType.ellipse, { x: 9.60, y: 1.2,  w: 3.3, h: 3.3, fill: { color: GOLD, transparency: 82 }, line: { type: "none" } });
  s.addShape(p.ShapeType.ellipse, { x: 9.25, y: 0.85, w: 4.0, h: 4.0, fill: { color: GOLD, transparency: 91 }, line: { type: "none" } });

  s.addText("Sunny", { x: 0.9, y: 1.75, w: 8, h: 1.25, fontFace: HEAD, fontSize: 66, bold: true, color: WHITE, margin: 0 });
  s.addText("Classroom Mood Check-in", { x: 0.95, y: 2.98, w: 8, h: 0.5, fontFace: BODY, fontSize: 22, color: GOLD, margin: 0 });
  s.addText("The quiet kid gets noticed —\nwithout a machine guessing how they feel.",
    { x: 0.95, y: 3.75, w: 7.6, h: 1.1, fontFace: BODY, fontSize: 16, color: "9FB3D0", lineSpacing: 26, margin: 0 });

  // weather scale strip = the product in one glance
  const cols = [SUNNY, OKAY, CLOUD, RAIN, STORM];
  cols.forEach((c, i) => s.addShape(p.ShapeType.ellipse,
    { x: 0.95 + i * 0.62, y: 5.35, w: 0.44, h: 0.44, fill: { color: c }, line: { type: "none" } }));
  s.addText("five taps · twenty seconds · once a day",
    { x: 4.25, y: 5.35, w: 5, h: 0.44, fontFace: BODY, fontSize: 12, color: "6B84AB", valign: "middle", margin: 0 });

  foot(s, "ICL Hackathon 2026  ·  Sustainable Business Innovation & AI Challenge  ·  Education Technology", true);
  s.addNotes(`[0:00-0:15] Open on the title. Say it slowly.

"Every classroom has a child who is struggling quietly. This is a tool that helps a teacher notice them — without a machine ever guessing how that child feels."

Don't read the slide. Let the sun sit there.`);
}

/* ================= 2 · PROBLEM ================= */
{
  const s = p.addSlide();
  s.background = { color: LIGHT };
  titleSlide(s, "26 students. One teacher. Six hours.", "A teacher cannot read 26 inner states at once — and the children who most need noticing are the hardest to see.");

  const items = [
    ["Masking", "Kids who have learned to perform “fine” because it is easier than explaining.", CLOUD],
    ["No words yet", "Neurodivergent kids who feel it clearly but cannot name it on demand.", RAIN],
    ["Won't say it aloud", "Kids who would never raise a hand in front of 25 classmates.", STORM],
  ];
  items.forEach(([h, d, c], i) => {
    const x = 0.75 + i * 4.03;
    card(s, x, 2.35, 3.72, 2.5, WHITE, "E2EAF4");
    orb(s, x + 0.35, 2.7, 0.62, c, null);
    s.addText(h, { x: x + 1.12, y: 2.78, w: 2.4, h: 0.4, fontFace: HEAD, fontSize: 19, bold: true, color: INK, margin: 0 });
    s.addText(d, { x: x + 0.35, y: 3.55, w: 3.05, h: 1.1, fontFace: BODY, fontSize: 13, color: MUTED, lineSpacing: 19, margin: 0 });
  });

  card(s, 0.75, 5.2, 11.8, 0.95, DEEP);
  s.addText("By the time a struggling child is obvious, they have usually been struggling for weeks.",
    { x: 1.1, y: 5.2, w: 11.1, h: 0.95, fontFace: HEAD, fontSize: 18, italic: true, color: WHITE, valign: "middle", margin: 0 });
  foot(s, "The problem");
  s.addNotes(`[0:15-0:40] The problem.

"Twenty-six students, one teacher, six hours a day. The kids who most need noticing are the hardest to see — the ones who mask, the ones who feel it but can't name it yet, the ones who'd never say it in front of twenty-five classmates."

Land the bottom line: "By the time it's obvious, it's usually been weeks."

Arthur — this is where your Skill Samurai experience earns credibility. One sentence, not a story.`);
}

/* ================= 3 · SOLUTION ================= */
{
  const s = p.addSlide();
  s.background = { color: WHITE };
  titleSlide(s, "Meet Sunny", "One tap from the child. One calm dashboard for the teacher.");

  // kid side
  card(s, 0.75, 2.15, 5.75, 3.75, LIGHT, "E2EAF4");
  orb(s, 1.15, 2.55, 0.55, GOLD, "1", DEEP, 18);
  s.addText("The child", { x: 1.88, y: 2.6, w: 4, h: 0.42, fontFace: HEAD, fontSize: 21, bold: true, color: INK, margin: 0 });
  s.addText("“How's your weather today?”", { x: 1.15, y: 3.2, w: 5, h: 0.35, fontFace: BODY, fontSize: 14, italic: true, color: SKY, margin: 0 });
  const cols = [SUNNY, OKAY, CLOUD, RAIN, STORM];
  cols.forEach((c, i) => s.addShape(p.ShapeType.ellipse,
    { x: 1.15 + i * 0.78, y: 3.72, w: 0.58, h: 0.58, fill: { color: c }, line: { type: "none" }, shadow: shadow() }));
  s.addText([
    { text: "Weather, not words — no vocabulary needed", options: { bullet: true, breakLine: true } },
    { text: "Optional reason tag, including “rather not say”", options: { bullet: true, breakLine: true } },
    { text: "The child can see their own history any time", options: { bullet: true } },
  ], { x: 1.15, y: 4.55, w: 5, h: 1.2, fontFace: BODY, fontSize: 12.5, color: MUTED, paraSpaceAfter: 5, margin: 0 });

  // teacher side
  card(s, 6.8, 2.15, 5.75, 3.75, LIGHT, "E2EAF4");
  orb(s, 7.2, 2.55, 0.55, SKY, "2", WHITE, 18);
  s.addText("The teacher", { x: 7.93, y: 2.6, w: 4, h: 0.42, fontFace: HEAD, fontSize: 21, bold: true, color: INK, margin: 0 });
  s.addText("Class at a glance, plus soft signals", { x: 7.2, y: 3.2, w: 5, h: 0.35, fontFace: BODY, fontSize: 14, italic: true, color: SKY, margin: 0 });
  // mini class grid
  const grid = [SUNNY, SUNNY, RAIN, SUNNY, OKAY, SUNNY, SUNNY, OKAY, SUNNY, STORM, RAIN, SUNNY];
  grid.forEach((c, i) => {
    const gx = 7.2 + (i % 6) * 0.42, gy = 3.72 + Math.floor(i / 6) * 0.42;
    s.addShape(p.ShapeType.ellipse, { x: gx, y: gy, w: 0.32, h: 0.32, fill: { color: c }, line: { type: "none" } });
  });
  s.addText([
    { text: "Soft signals, never red alarms", options: { bullet: true, breakLine: true } },
    { text: "Patterns over time a grid scan would miss", options: { bullet: true, breakLine: true } },
    { text: "Every signal ends in a human decision", options: { bullet: true } },
  ], { x: 9.9, y: 3.68, w: 2.5, h: 1.3, fontFace: BODY, fontSize: 11.5, color: MUTED, paraSpaceAfter: 5, margin: 0 });
  foot(s, "The solution");
  s.addNotes(`[0:40-1:05] The solution. Move fast here.

"The child taps their weather. Five options, twenty seconds, once a day. No vocabulary needed — that matters enormously for neurodivergent kids."

"The teacher gets the class at a glance, plus soft signals. Never red alarms."

Point at 'the child can see their own history' — it pre-empts the surveillance question.`);
}

/* ================= 4 · DEMO MOMENT ================= */
{
  const s = p.addSlide();
  s.background = { color: LIGHT };
  titleSlide(s, "The moment that matters", "Cody, Room 6 — bright all week, then this.");

  card(s, 0.75, 2.2, 7.1, 3.75, WHITE, "E2EAF4");
  const week = [
    ["Mon", 4, OKAY], ["Tue", 4, OKAY], ["Wed", 4, OKAY], ["Thu", 2, RAIN], ["Fri", 1, STORM],
  ];
  const baseY = 5.25, unit = 0.52;
  week.forEach(([d, v, c], i) => {
    const bx = 1.35 + i * 1.28, bh = v * unit;
    s.addShape(p.ShapeType.roundRect, { x: bx, y: baseY - bh, w: 0.72, h: bh, rectRadius: 0.06,
      fill: { color: c }, line: { type: "none" } });
    s.addText(d, { x: bx - 0.1, y: baseY + 0.08, w: 0.92, h: 0.28, align: "center",
      fontFace: BODY, fontSize: 11, bold: true, color: MUTED, margin: 0 });
  });
  // his own baseline, drawn where it actually sits
  s.addShape(p.ShapeType.line, { x: 1.15, y: baseY - 4.2 * unit, w: 6.3, h: 0,
    line: { color: SKY, width: 1.75, dashType: "dash" } });
  s.addText("Cody's own 30-day baseline  4.2", { x: 5.05, y: baseY - 4.2 * unit - 0.34, w: 2.6, h: 0.3,
    fontFace: BODY, fontSize: 10.5, bold: true, color: SKY, align: "right", margin: 0 });
  s.addText("Every rule measures distance from this line — never from the class.",
    { x: 1.15, y: 5.62, w: 6.3, h: 0.28, fontFace: BODY, fontSize: 10.5, italic: true, color: MUTED, margin: 0 });

  card(s, 8.15, 2.2, 4.4, 3.75, DEEP);
  orb(s, 8.55, 2.6, 0.5, ALERT, "!", WHITE, 18);
  s.addText("Sudden change", { x: 9.22, y: 2.63, w: 3, h: 0.42, fontFace: HEAD, fontSize: 18, bold: true, color: WHITE, margin: 0 });
  s.addText("rule R1", { x: 9.22, y: 3.0, w: 3, h: 0.25, fontFace: BODY, fontSize: 10.5, color: GOLD, margin: 0 });
  s.addText("Two consecutive days two or more steps below his own 30-day median.",
    { x: 8.55, y: 3.55, w: 3.6, h: 0.85, fontFace: BODY, fontSize: 13, color: "C7D6EC", lineSpacing: 19, margin: 0 });
  s.addShape(p.ShapeType.line, { x: 8.55, y: 4.5, w: 3.6, h: 0, line: { color: "3B5480", width: 1 } });
  s.addText("Sunny did not decide Cody is sad.\nIt noticed a number moved, and told a human.",
    { x: 8.55, y: 4.68, w: 3.6, h: 1.0, fontFace: BODY, fontSize: 13, italic: true, color: WHITE, lineSpacing: 20, margin: 0 });
  foot(s, "Live demo");
  s.addNotes(`[1:05-1:35] SWITCH TO THE LIVE DEMO. This is the moment.

Open the prototype, teacher view, click Cody.

"Cody was bright all week. Then this."

Walk the four steps on screen: the data, the rule that fired, what it does NOT mean, then the AI's suggestion.

Say: "Sunny did not decide Cody is sad. It noticed a number moved, and it told a human."

If the demo fails, this slide carries it alone. Don't panic — the chart is right here.`);
}

/* ================= 5 · THE HARD QUESTION ================= */
{
  const s = p.addSlide();
  s.background = { color: NIGHT };
  s.addText("“How do you know\nthe child is sad?”", { x: 0.9, y: 1.55, w: 7.5, h: 2.2,
    fontFace: HEAD, fontSize: 44, bold: true, color: WHITE, lineSpacing: 54, margin: 0 });
  s.addText("We don't.", { x: 0.95, y: 4.0, w: 7.5, h: 0.75, fontFace: HEAD, fontSize: 40, bold: true, color: GOLD, margin: 0 });
  s.addText("And Sunny says so, on screen, every single time.",
    { x: 0.95, y: 4.85, w: 7.5, h: 0.5, fontFace: BODY, fontSize: 17, color: "9FB3D0", margin: 0 });

  card(s, 8.7, 1.9, 3.85, 3.6, DEEP);
  s.addText("What Sunny actually detects", { x: 9.05, y: 2.25, w: 3.2, h: 0.35, fontFace: BODY, fontSize: 11,
    bold: true, color: GOLD, margin: 0 });
  s.addText("A number a child chose\nfor themselves has moved\naway from their own normal.",
    { x: 9.05, y: 2.75, w: 3.2, h: 1.1, fontFace: HEAD, fontSize: 16, color: WHITE, lineSpacing: 24, margin: 0 });
  s.addShape(p.ShapeType.line, { x: 9.05, y: 4.0, w: 3.15, h: 0, line: { color: "3B5480", width: 1 } });
  s.addText("That is the entire claim.\nNothing about feelings.\nNothing about why.",
    { x: 9.05, y: 4.2, w: 3.2, h: 1.0, fontFace: BODY, fontSize: 12.5, color: "9FB3D0", lineSpacing: 20, margin: 0 });
  foot(s, "The question every judge asks", true);
  s.addNotes(`[1:35-1:50] The pivot. Pause before you speak.

"You're about to ask me — how do you know the child is sad?"

Beat.

"We don't. And Sunny says so, on screen, every single time."

This is the slide that answers the judge's feedback head-on. Own it rather than defending.`);
}

/* ================= 6 · PIPELINE ================= */
{
  const s = p.addSlide();
  s.background = { color: WHITE };
  titleSlide(s, "How a signal is produced", "Detection is arithmetic. AI only writes the wording. The two are never mixed.");

  const steps = [
    ["1", "Input", "Five numbers from this week, plus this child's own 30-day median.", "No AI", SKY],
    ["2", "Detection", "Three fixed arithmetic rules. Deterministic, reproducible, auditable.", "No AI", DEEP],
    ["3", "Wording", "Turns a fired rule into a plain-English suggestion for the teacher.", "AI", GOLD],
    ["4", "Decision", "The teacher decides. Always. Sunny never contacts anyone.", "No AI", SKY],
  ];
  steps.forEach(([n, h, d, tag, c], i) => {
    const x = 0.75 + i * 3.03;
    const isAI = tag === "AI";
    card(s, x, 2.3, 2.78, 3.1, isAI ? SOFTBG : LIGHT, isAI ? GOLD : "E2EAF4");
    orb(s, x + 0.3, 2.6, 0.52, c, n, c === GOLD ? DEEP : WHITE, 17);
    s.addText(h, { x: x + 0.3, y: 3.28, w: 2.2, h: 0.35, fontFace: HEAD, fontSize: 18, bold: true, color: INK, margin: 0 });
    s.addText(d, { x: x + 0.3, y: 3.72, w: 2.2, h: 1.15, fontFace: BODY, fontSize: 12, color: MUTED, lineSpacing: 18, margin: 0 });
    s.addText(tag, { x: x + 0.3, y: 4.92, w: 2.2, h: 0.3, fontFace: BODY, fontSize: 11, bold: true,
      color: isAI ? "A6761D" : GOOD, margin: 0 });
    if (i < 3) s.addText("›", { x: x + 2.78, y: 3.5, w: 0.25, h: 0.4, align: "center",
      fontFace: BODY, fontSize: 22, color: CLOUD, margin: 0 });
  });

  card(s, 0.75, 5.65, 11.8, 0.85, DEEP);
  s.addText("Remove the AI entirely and Sunny flags exactly the same children.",
    { x: 1.1, y: 5.65, w: 11.1, h: 0.85, fontFace: HEAD, fontSize: 18, bold: true, color: GOLD, valign: "middle", margin: 0 });
  foot(s, "Our answer");
  s.addNotes(`[1:50-2:15] The architecture. Your strongest slide.

"Detection is arithmetic. The AI only writes the wording. We never mix the two."

"The AI receives a rule name and five numbers. No child's name, no reason tags, no history. It returns a sentence."

Then the line at the bottom, slowly: "Remove the AI entirely and Sunny flags exactly the same children."

That sentence is the whole pitch. Let it land before moving on.`);
}

/* ================= 7 · THE RULES ================= */
{
  const s = p.addSlide();
  s.background = { color: LIGHT };
  titleSlide(s, "The three rules, in full", "Printed here because a parent should be able to check the maths by hand.");

  const rules = [
    ["R1", "Sudden change", "At least 2 steps below their own 30-day median, for 2 or more consecutive days.", ALERT],
    ["R2", "Sustained drift", "At least 1.5 steps below their own median, for 3 or more consecutive days.", "E8A13A"],
    ["R3", "Repeating cycle", "The same weekday at least 1.5 steps below their own median, in 4 of the last 6.", SKY],
  ];
  rules.forEach(([id, h, d, c], i) => {
    const y = 2.3 + i * 1.13;
    card(s, 0.75, y, 11.8, 0.95, WHITE, "E2EAF4");
    orb(s, 1.05, y + 0.16, 0.62, c, id, WHITE, 15);
    s.addText(h, { x: 1.95, y: y + 0.13, w: 2.5, h: 0.35, fontFace: HEAD, fontSize: 18, bold: true, color: INK, margin: 0 });
    s.addText(d, { x: 1.95, y: y + 0.5, w: 8.6, h: 0.35, fontFace: BODY, fontSize: 13, color: MUTED, margin: 0 });
  });

  card(s, 0.75, 5.78, 11.8, 0.95, DEEP);
  s.addText("Every rule compares a child only to themselves — never to a classmate, never to a class average.",
    { x: 1.1, y: 5.78, w: 11.1, h: 0.95, fontFace: HEAD, fontSize: 17, bold: true, color: WHITE, valign: "middle", margin: 0 });
  foot(s, "Transparency");
  s.addNotes(`[2:15-2:30] The rules. Go quickly — the point is that they FIT ON A SLIDE.

"Three rules. That's all of them. A parent could check the maths by hand."

Then the bottom line: "Every rule compares a child only to themselves."

Don't read all three aloud. Gesture at them and move.`);
}

/* ================= 8 · BASELINE / INCLUSION ================= */
{
  const s = p.addSlide();
  s.background = { color: WHITE };
  titleSlide(s, "A cloudy day is not a signal", "Only change from a child's own normal counts. This is the whole design.");

  card(s, 0.75, 2.25, 5.75, 3.3, LIGHT, "E2EAF4");
  s.addText("Ana checks in “cloudy” most days", { x: 1.15, y: 2.62, w: 5, h: 0.4, fontFace: HEAD, fontSize: 19, bold: true, color: INK, margin: 0 });
  [CLOUD, CLOUD, RAIN, CLOUD, CLOUD].forEach((c, i) =>
    s.addShape(p.ShapeType.ellipse, { x: 1.15 + i * 0.72, y: 3.2, w: 0.52, h: 0.52, fill: { color: c }, line: { type: "none" } }));
  s.addText("Never flagged.", { x: 1.15, y: 4.0, w: 5, h: 0.4, fontFace: HEAD, fontSize: 20, bold: true, color: GOOD, margin: 0 });
  s.addText("That is her normal, and normal is not a problem. Sunny has nothing to say about Ana, and says nothing.",
    { x: 1.15, y: 4.45, w: 5, h: 0.85, fontFace: BODY, fontSize: 13, color: MUTED, lineSpacing: 19, margin: 0 });

  card(s, 6.8, 2.25, 5.75, 3.3, LIGHT, "E2EAF4");
  s.addText("Ben checks in “sunny” most days", { x: 7.2, y: 2.62, w: 5, h: 0.4, fontFace: HEAD, fontSize: 19, bold: true, color: INK, margin: 0 });
  [SUNNY, SUNNY, SUNNY, RAIN, RAIN].forEach((c, i) =>
    s.addShape(p.ShapeType.ellipse, { x: 7.2 + i * 0.72, y: 3.2, w: 0.52, h: 0.52, fill: { color: c }, line: { type: "none" } }));
  s.addText("Flagged.", { x: 7.2, y: 4.0, w: 5, h: 0.4, fontFace: HEAD, fontSize: 20, bold: true, color: ALERT, margin: 0 });
  s.addText("Same two “rainy” days as Ana — but for Ben they are a departure. Change is the signal, not the level.",
    { x: 7.2, y: 4.45, w: 5, h: 0.85, fontFace: BODY, fontSize: 13, color: MUTED, lineSpacing: 19, margin: 0 });

  card(s, 0.75, 5.78, 11.8, 0.95, SOFTBG, GOLD);
  s.addText("This protects quiet and neurodivergent kids from being flagged for simply being themselves.",
    { x: 1.1, y: 5.78, w: 11.1, h: 0.95, fontFace: HEAD, fontSize: 17, bold: true, color: DEEP, valign: "middle", margin: 0 });
  foot(s, "Inclusion by design");
  s.addNotes(`[2:30-2:45] Inclusion. This is the slide that wins the EdTech track.

"Ana is cloudy most days. She is never flagged — that's her normal, and normal is not a problem."

"Ben is sunny most days. The same two rainy days get flagged, because for Ben they're a departure."

"Change is the signal, not the level. That protects quiet and neurodivergent kids from being flagged for simply being themselves."

If you only get one extra sentence in Q&A, use this one.`);
}

/* ================= 9 · SAFEGUARDING ================= */
{
  const s = p.addSlide();
  s.background = { color: NIGHT };
  titleSlide(s, "What Sunny never does", "The list a principal will ask for before signing anything.", true);

  const never = [
    "Diagnose, or suggest any clinical or developmental label",
    "Rank children against each other, or against a class average",
    "Claim to know why a child feels something",
    "Notify parents or counsellors automatically",
    "Train any model on children's data, or share it with a third party",
    "Keep raw check-ins beyond 30 days",
  ];
  never.forEach((t, i) => {
    const x = 0.75 + (i % 2) * 6.05, y = 2.3 + Math.floor(i / 2) * 1.03;
    card(s, x, y, 5.75, 0.85, DEEP);
    orb(s, x + 0.28, y + 0.17, 0.5, "3A2233", "✕", ALERT, 15);
    s.addText(t, { x: x + 0.95, y, w: 4.6, h: 0.85, fontFace: BODY, fontSize: 12.5, color: "C7D6EC", valign: "middle", lineSpacing: 17, margin: 0 });
  });

  s.addText("One tap. No free text, no camera, no microphone, no behavioural tracking.",
    { x: 0.75, y: 5.72, w: 11.8, h: 0.5, fontFace: HEAD, fontSize: 17, bold: true, color: GOLD, align: "center", margin: 0 });
  s.addText("A teacher can dismiss any signal. We keep dismissals so we can publish an honest false-positive rate.",
    { x: 0.75, y: 6.2, w: 11.8, h: 0.4, fontFace: BODY, fontSize: 12.5, color: "8AA3C4", align: "center", margin: 0 });
  foot(s, "Safeguarding", true);
  s.addNotes(`[2:45-2:55] Safeguarding. Fast — this is a reassurance slide, not a teaching slide.

"Here's what Sunny never does." Gesture at the list.

"One tap. No free text, no camera, no microphone."

Then: "Teachers can dismiss any signal, and we keep the dismissals so we can publish an honest false-positive rate."

That last line signals intellectual honesty. Judges notice.`);
}

/* ================= 10 · ROADMAP ================= */
{
  const s = p.addSlide();
  s.background = { color: LIGHT };
  titleSlide(s, "Where this goes", "Built today, honest about tomorrow.");

  const levels = [
    ["Level 1", "Today", "Working prototype. Both views, all three rules, full transparency panel. Runs anywhere, no install.", GOOD, "Done"],
    ["Level 2", "Next", "Real check-in storage, live Claude API for wording, teacher login. One school, one term, measured.", GOLD, "This term"],
    ["Level 3", "Product", "Student accounts, privacy and safeguarding compliance, escalation routing to counsellors.", SKY, "2027"],
  ];
  levels.forEach(([lv, ph, d, c, when], i) => {
    const x = 0.75 + i * 4.03;
    card(s, x, 2.3, 3.72, 3.35, WHITE, "E2EAF4");
    orb(s, x + 0.35, 2.62, 0.58, c, String(i + 1), c === GOLD ? DEEP : WHITE, 17);
    s.addText(lv, { x: x + 1.1, y: 2.66, w: 2.4, h: 0.35, fontFace: HEAD, fontSize: 20, bold: true, color: INK, margin: 0 });
    s.addText(ph, { x: x + 1.1, y: 3.0, w: 2.4, h: 0.28, fontFace: BODY, fontSize: 11, color: MUTED, margin: 0 });
    s.addText(d, { x: x + 0.35, y: 3.55, w: 3.05, h: 1.5, fontFace: BODY, fontSize: 12.5, color: MUTED, lineSpacing: 19, margin: 0 });
    s.addText(when, { x: x + 0.35, y: 5.08, w: 3.05, h: 0.35, fontFace: BODY, fontSize: 12, bold: true, color: c, margin: 0 });
  });

  card(s, 0.75, 5.9, 11.8, 0.8, DEEP);
  s.addText("Detection stays rule-based at every level. Scaling adds reach, never opacity.",
    { x: 1.1, y: 5.9, w: 11.1, h: 0.8, fontFace: HEAD, fontSize: 16, italic: true, color: WHITE, valign: "middle", margin: 0 });
  foot(s, "Roadmap");
  s.addNotes(`[2:55-3:05] Roadmap. Be honest about what's built.

"Level one is built and running — you just saw it. Level two is a real backend and one school for one term. Level three is compliance and escalation routing."

Critical: "Detection stays rule-based at every level. Scaling adds reach, never opacity."

Never claim the prototype is more than it is. Simulated data, real logic. Say that if asked.`);
}

/* ================= 11 · BUSINESS ================= */
{
  const s = p.addSlide();
  s.background = { color: WHITE };
  titleSlide(s, "Who pays, and why", "Sold into wellbeing and pastoral care budgets — not IT budgets.");

  const facts = [
    ["Buyer", "The wellbeing lead or principal, not the IT department. This is a pastoral tool that happens to be software."],
    ["Model", "Per-classroom annual licence, priced so a single school can start with one class and expand."],
    ["Why now", "Schools are under real pressure on student wellbeing, and are rightly wary of AI that makes claims about children."],
    ["Our wedge", "We are the option a school can actually defend to parents — because the detection is auditable arithmetic."],
  ];
  facts.forEach(([h, d], i) => {
    const y = 2.3 + i * 1.05;
    card(s, 0.75, y, 11.8, 0.88, i === 3 ? SOFTBG : LIGHT, i === 3 ? GOLD : "E2EAF4");
    s.addText(h, { x: 1.15, y, w: 2.0, h: 0.88, fontFace: HEAD, fontSize: 16, bold: true,
      color: i === 3 ? DEEP : SKY, valign: "middle", margin: 0 });
    s.addText(d, { x: 3.15, y, w: 9.1, h: 0.88, fontFace: BODY, fontSize: 13, color: i === 3 ? DEEP : MUTED, valign: "middle", margin: 0 });
  });
  s.addText("Sustainability angle: better early support costs a school far less — in staff time and in outcomes — than late intervention.",
    { x: 0.75, y: 6.5, w: 11.8, h: 0.4, fontFace: BODY, fontSize: 12, italic: true, color: MUTED, margin: 0 });
  foot(s, "Business model");
  s.addNotes(`[3:05-3:15] Business model.

"This sells into wellbeing and pastoral budgets, not IT. Per-classroom licence — a school can start with one class."

The wedge line is the one that matters: "We're the option a school can actually defend to parents, because the detection is auditable arithmetic."

Keep pricing vague unless asked. If pressed, say it's indicative and depends on the pilot.`);
}

/* ================= 12 · CLOSE ================= */
{
  const s = p.addSlide();
  s.background = { color: NIGHT };
  s.addShape(p.ShapeType.ellipse, { x: 10.4, y: 4.6, w: 2.2, h: 2.2, fill: { color: GOLD }, shadow: shadow() });
  s.addShape(p.ShapeType.ellipse, { x: 10.1, y: 4.3, w: 2.8, h: 2.8, fill: { color: GOLD, transparency: 85 }, line: { type: "none" } });

  s.addText("Sunny didn't diagnose Cody.", { x: 0.9, y: 2.1, w: 9.2, h: 0.85,
    fontFace: HEAD, fontSize: 36, bold: true, color: WHITE, margin: 0 });
  s.addText("It did arithmetic on five numbers,\nshowed its working,\nand made sure a caring adult noticed.",
    { x: 0.95, y: 3.15, w: 9.2, h: 1.7, fontFace: HEAD, fontSize: 26, color: GOLD, lineSpacing: 40, margin: 0 });
  s.addText("That is the only kind of AI a school should ever point at a child.",
    { x: 0.95, y: 5.15, w: 9.2, h: 0.45, fontFace: BODY, fontSize: 16, color: "9FB3D0", margin: 0 });

  const cols = [SUNNY, OKAY, CLOUD, RAIN, STORM];
  cols.forEach((c, i) => s.addShape(p.ShapeType.ellipse,
    { x: 0.95 + i * 0.62, y: 5.95, w: 0.44, h: 0.44, fill: { color: c }, line: { type: "none" } }));
  foot(s, "Sunny  ·  Classroom Mood Check-in  ·  ICL Hackathon 2026", true);
  s.addNotes(`[3:15-3:30] Close. Stop talking after this. Do not add anything.

"Sunny didn't diagnose Cody. It did arithmetic on five numbers, showed its working, and made sure a caring adult noticed."

Beat.

"That's the only kind of AI a school should ever point at a child."

Then stop. Let the silence do the work.

--- LIKELY Q&A ---
Q: How do you know the child is sad?
A: We don't, and we say so on screen. We detect that a self-reported number moved from that child's own baseline. Step 3 of every signal lists the innocent explanations.

Q: What if the AI gets it wrong?
A: The AI cannot get WHO is flagged wrong — it never makes that call. If the wording is unhelpful, the teacher dismisses it, and we keep dismissals to publish a real false-positive rate.

Q: What about a kid who's always low?
A: Never flagged for their baseline. Only change counts. That's the point.

Q: Is this real data?
A: Simulated data, real logic. The rules run exactly as shown.

Q: Privacy / parents?
A: One tap, no free text, deleted after 30 days, never trains a model, never auto-notifies anyone.`);
}

p.writeFile({ fileName: "Sunny-Pitch-Deck.pptx" }).then(f => console.log("wrote", f));
