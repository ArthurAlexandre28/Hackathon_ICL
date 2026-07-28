/* Drives the running Sunny server in headless Chrome and saves a PNG per feature. */
const puppeteer = require('puppeteer-core');
const path = require('node:path');
const fs = require('node:fs');

const OUT = process.argv[2] || './docs/screenshots';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = 'http://localhost:3000';

fs.mkdirSync(OUT, { recursive: true });

const wait = ms => new Promise(r => setTimeout(r, ms));

async function shot(page, name, opts = {}) {
  await wait(opts.settle ?? 350);
  const file = path.join(OUT, `${name}.png`);
  if (opts.el) {
    const handle = await page.$(opts.el);
    if (!handle) { console.log(`  !! ${name}: selector ${opts.el} not found`); return; }
    await handle.screenshot({ path: file });
  } else {
    await page.screenshot({ path: file, fullPage: !!opts.full });
  }
  console.log(`  ✓ ${name}.png`);
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--force-color-profile=srgb', '--hide-scrollbars'],
  });

  /* ---------- DESKTOP: teacher-facing ---------- */
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });

  await page.goto(BASE, { waitUntil: 'networkidle0' });
  await wait(900);
  await shot(page, '01-role-choice');

  // student sign-in
  await page.evaluate(() => pickRole('student'));
  await wait(250);
  await shot(page, '02-class-code');
  await page.evaluate(() => { document.getElementById('classCode').value = 'ROOM6'; enterClass(); });
  await wait(400);
  await shot(page, '03-find-your-name');

  // teacher dashboard
  await page.evaluate(() => { signOut(); pickRole('teacher'); });
  await wait(250);
  await shot(page, '04-teacher-pin');
  await page.evaluate(() => { document.getElementById('pin').value = '2026'; enterTeacher(); });
  await wait(700);
  await shot(page, '05-teacher-dashboard', { full: true });
  await shot(page, '05b-stats-row', { el: '#statsGrid' });
  await shot(page, '05c-signals-list', { el: '.signals' });
  await shot(page, '05d-class-grid', { el: '.class-grid' });

  // detail panel, step by step
  await page.evaluate(() => openDetail('Cody'));
  await wait(1800);                                   // let live wording land
  await shot(page, '06-detail-full', { el: '#detailPanel' });

  const steps = await page.$$('.detail .step');
  const names = ['07-step1-data', '08-step2-rule', '09-step3-not-mean',
                 '10-step4-human', '11-step5-ai'];
  for (let i = 0; i < steps.length && i < names.length; i++) {
    await steps[i].screenshot({ path: path.join(OUT, `${names[i]}.png`) });
    console.log(`  ✓ ${names[i]}.png`);
  }

  // R3 + a parent note + peer concerns
  await page.evaluate(() => openDetail('Maia'));
  await wait(1600);
  await shot(page, '12-maia-monday-pattern', { el: '#detailPanel' });
  await page.evaluate(() => openDetail('Isla'));
  await wait(1400);
  await shot(page, '13-isla-stopped-checking-in', { el: '#detailPanel' });
  await shot(page, '14-peer-concerns', { el: '#peerBox' });
  await page.evaluate(() => openDetail('Aroha'));
  await wait(1200);
  await shot(page, '15-note-from-home', { el: '#homeBox' });
  await page.evaluate(() => openDetail('Ben'));
  await wait(1200);
  await shot(page, '16-r5-data-quality', { el: '#detailPanel' });

  // escalation
  await page.evaluate(() => { openDetail('Isla'); });
  await wait(700);
  await page.evaluate(() => escalate('Isla'));
  await wait(500);
  await shot(page, '17-escalation-preview', { el: '#escBox' });
  await page.evaluate(() => {
    document.getElementById('escNote').value =
      'Not been in class since Wednesday. Rang home twice, no answer yet.';
    confirmEscalate('Isla');
  });
  await wait(500);
  await shot(page, '18-escalation-audit-trail', { el: '#escBox' });

  // transparency modal
  await page.evaluate(() => { closeDetail(); openHow(); });
  await wait(500);
  await shot(page, '19-how-sunny-works', { el: '.modal' });
  await page.evaluate(() => closeHow());

  // big screen
  await page.evaluate(() => { toggleBig(); window.scrollTo(0, 0); });
  await wait(500);
  await shot(page, '20-big-screen-mode');
  await page.evaluate(() => toggleBig());

  /* ---------- MOBILE: child-facing ---------- */
  const m = await browser.newPage();
  await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true });
  await m.goto(BASE, { waitUntil: 'networkidle0' });
  await wait(900);

  await m.evaluate(() => { pickRole('student'); document.getElementById('classCode').value = 'ROOM6'; enterClass(); });
  await wait(400);
  await shot(m, '21-mobile-join', { full: true });

  await m.evaluate(() => signInStudent('Mia'));
  await wait(500);
  await shot(m, '22-mobile-face-scale');

  await m.evaluate(() => document.querySelectorAll('.m-btn')[3].click());
  await wait(400);
  await shot(m, '23-mobile-why-tags', { full: true });

  await m.evaluate(() => { pickedWhy = '😴 Tired'; submitCheckin(); });
  await wait(700);
  await shot(m, '24-mobile-thanks');

  await m.evaluate(() => { resetKid(); showMine(); });
  await wait(500);
  await shot(m, '25-mobile-my-checkins', { el: '.mine' });

  await m.evaluate(() => openWorry());
  await wait(500);
  await shot(m, '26-mobile-worried-about-someone', { el: '#worryBox' });

  await browser.close();
  console.log('\nDone.');
})().catch(e => { console.error(e); process.exit(1); });
