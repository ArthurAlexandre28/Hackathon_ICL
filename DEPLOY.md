# Running the live demo

The goal: judges open a URL on their phones, sign in as students, check in — and their
faces appear on your projected teacher screen within about a second and a half.

## Read this first — the one thing that will break it

`server.js` keeps the class **in memory**. That is deliberate (a restart is a clean demo),
but it rules out two popular hosts:

| Don't use | Why it breaks |
|---|---|
| **Vercel / Netlify functions** | Stateless. Each request may hit a different instance, so check-ins vanish. |
| **Render free tier, Glitch, Replit free** | They sleep after inactivity. The first judge to tap waits ~50s for a cold start, and the demo dies on stage. |

You need **one persistent process**. Two good ways to get one.

---

## Option A — tunnel from your own laptop *(recommended for a one-off pitch)*

No account, no signup, no deploy. The server runs on the machine you are presenting from,
so there are no cold starts and you control everything.

```bash
node server.js
```

Then in a second terminal:

```bash
cloudflared tunnel --url http://localhost:3000
```

`cloudflared` prints a public `https://something-random.trycloudflare.com` URL. That is
what the judges open. Install it first with `brew install cloudflared`.

**Trade-off:** the URL is random each run, so you cannot put a QR code on a slide in
advance. Read it off the screen, or use Option B.

---

## Option B — deploy for a stable URL *(needed if you want a QR on a slide)*

**Railway** or **Fly.io** both run a persistent Node process on their free allowance.
You will need to create the account yourself — I can't do that for you.

Railway is the shortest path: connect the GitHub repo, and it detects Node and runs
`node server.js`. Set no build command. The only requirement is that it honours the
`PORT` environment variable, which `server.js` already does.

Once you have the URL, generate a QR from it with any free generator and put it on the
slide before "Meet Sunny".

---

## Running the demo

1. Open the URL on the projected machine, sign in as **teacher** (PIN `2026`).
   Check the green **LIVE** badge in the top bar. Amber means it lost the server.
2. Judges open the same URL, tap **I'm a student**, enter class code `ROOM6`, then
   **"visiting today?"** at the bottom — type a first name, join Room 6.
3. They tap a face. Their tile appears on your screen tagged **new**, within ~1.5s.
4. Between runs, hit **Clear visitors & restart demo** on the teacher screen. It asks
   twice before wiping.

Judges join as *extra* students, so Cody, Aroha, Maia and Isla keep their seeded
patterns and all five rules still demonstrate.

## Rehearse these three things

- **Open the URL on your own phone over mobile data**, not the venue wifi. That is the
  path a judge's phone will actually take.
- **Try it on the venue network** if you can get in early. Some guest networks block
  peer traffic or throttle new domains.
- **Hit reset and run it twice.** The state that survives a rehearsal is the state the
  judges will see.

## If the network fails

Open `index.html` directly from the filesystem. It detects that there is no server and
falls back to single-device mode with the full seeded class — every rule, the support
plans, escalation, the lot. Nothing about the pitch depends on the live mode working.

**Have the file open in a second browser tab before you start.** If the tunnel drops
mid-pitch, switch tabs and keep talking.

## What the server does and doesn't do

It stores check-ins and nothing else. **The rule engine stays in the browser** — the
server never decides who is flagged, so "detection is auditable arithmetic" stays true
end to end. It is also why the offline fallback is a complete product rather than a
crippled one.

Names are stripped to letters, numbers, spaces, apostrophes and hyphens on the way in.
There is no database, no logging, and everything disappears when the process stops.
