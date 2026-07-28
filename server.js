/* Sunny — live demo server.
 *
 * Deliberately zero-dependency (node: builtins only), so it runs anywhere with
 * `node server.js` and there is no npm install to fail ten minutes before a pitch.
 *
 * It is a dumb store: it holds check-ins and nothing else. The rule engine stays
 * in the browser exactly as it was — the server never decides who is flagged, which
 * keeps the "detection is auditable arithmetic" claim true end to end.
 *
 * State is in memory on purpose. A restart is a clean demo.
 */
const http = require('node:http');
const fs   = require('node:fs');
const path = require('node:path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

/* guests are the people who join live — the 24 seeded children live in the client */
const guests = new Map();          // name -> {name, score, why, at}
const checkins = new Map();        // seeded child name -> {score, why, at}
let epoch = Date.now();            // bumped on reset so clients can resync

const clean = s => String(s || '').replace(/[^\p{L}\p{N} '\-]/gu, '').trim().slice(0, 18);

function send(res, code, body, type = 'application/json') {
  const payload = type === 'application/json' ? JSON.stringify(body) : body;
  res.writeHead(code, {
    'Content-Type': type,
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  });
  res.end(payload);
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', c => {
      raw += c;
      if (raw.length > 4096) { req.destroy(); reject(new Error('too large')); }
    });
    req.on('end', () => { try { resolve(JSON.parse(raw || '{}')); } catch (e) { reject(e); } });
    req.on('error', reject);
  });
}

const state = () => ({
  epoch,
  guests: [...guests.values()],
  checkins: Object.fromEntries(checkins),
});

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'OPTIONS') return send(res, 204, '');

  /* ---- API ---- */
  if (url.pathname === '/api/state' && req.method === 'GET') {
    return send(res, 200, state());
  }

  if (url.pathname === '/api/join' && req.method === 'POST') {
    let body;
    try { body = await readJson(req); } catch { return send(res, 400, { error: 'bad json' }); }
    const name = clean(body.name);
    if (!name) return send(res, 400, { error: 'name required' });
    if (guests.size >= 60 && !guests.has(name)) return send(res, 429, { error: 'class full' });
    if (!guests.has(name)) guests.set(name, { name, score: null, why: null, at: null });
    return send(res, 200, { ok: true, name, epoch });
  }

  if (url.pathname === '/api/checkin' && req.method === 'POST') {
    let body;
    try { body = await readJson(req); } catch { return send(res, 400, { error: 'bad json' }); }
    const name = clean(body.name);
    const score = Number(body.score);
    if (!name || !(score >= 1 && score <= 5)) return send(res, 400, { error: 'bad check-in' });
    const entry = { score, why: body.why ? clean(body.why) : null, at: Date.now() };
    if (guests.has(name)) guests.set(name, { name, ...entry });
    else checkins.set(name, entry);
    return send(res, 200, { ok: true, epoch });
  }

  /* wipes the live guests so the demo can be run again cleanly */
  if (url.pathname === '/api/reset' && req.method === 'POST') {
    guests.clear(); checkins.clear(); epoch = Date.now();
    return send(res, 200, { ok: true, epoch });
  }

  /* ---- static ---- */
  const file = url.pathname === '/' ? 'index.html' : url.pathname.replace(/^\/+/, '');
  const full = path.join(ROOT, path.normalize(file));
  if (!full.startsWith(ROOT)) return send(res, 403, { error: 'nope' });

  fs.readFile(full, (err, data) => {
    if (err) return send(res, 404, { error: 'not found' });
    const ext = path.extname(full);
    const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript',
                    '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml' };
    send(res, 200, data, types[ext] || 'application/octet-stream');
  });
});

server.listen(PORT, () => {
  console.log(`\n  Sunny live demo running\n`);
  console.log(`  Teacher screen : http://localhost:${PORT}/`);
  console.log(`  Students join  : share this machine's address on the same network,`);
  console.log(`                   or the public URL if you have deployed it.\n`);
});
