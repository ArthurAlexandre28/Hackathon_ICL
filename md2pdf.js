/* Renders a Markdown file to PDF with images embedded, so it reads properly
   in Google Drive (which shows raw text for .md and cannot resolve relative
   image paths). Usage: node md2pdf.js FEATURE-GUIDE.md FEATURE-GUIDE.pdf */
const { marked } = require('marked');
const puppeteer = require('puppeteer-core');
const fs = require('node:fs');
const path = require('node:path');

const [src, out] = process.argv.slice(2);
if (!src || !out) { console.error('usage: node md2pdf.js <in.md> <out.pdf>'); process.exit(1); }

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const root = path.dirname(path.resolve(src));

let html = marked.parse(fs.readFileSync(src, 'utf8'));

/* inline every local image as a data URI so the PDF is self-contained */
html = html.replace(/<img src="([^"]+)"([^>]*)>/g, (m, s, rest) => {
  if (/^(https?:|data:)/.test(s)) return m;
  const file = path.join(root, decodeURIComponent(s));
  if (!fs.existsSync(file)) { console.warn(`  !! missing image: ${s}`); return m; }
  const b64 = fs.readFileSync(file).toString('base64');
  return `<img src="data:image/png;base64,${b64}"${rest}>`;
});

const page = `<!doctype html><meta charset="utf-8"><style>
  @page { margin: 18mm 16mm; }
  body { font: 15px/1.65 -apple-system, "Segoe UI", Roboto, Helvetica, sans-serif;
         color: #1f2a37; max-width: 100%; }
  h1 { font-size: 30px; border-bottom: 3px solid #5b8def; padding-bottom: 8px;
       margin-top: 34px; page-break-after: avoid; }
  h1:first-child { margin-top: 0; }
  h2 { font-size: 22px; margin-top: 30px; color: #21304f; page-break-after: avoid; }
  h3 { font-size: 17px; margin-top: 22px; page-break-after: avoid; }
  img { max-width: 100%; border: 1px solid #e5ecf4; border-radius: 8px;
        margin: 12px 0; page-break-inside: avoid; }
  code { background: #f4f7fb; padding: 2px 5px; border-radius: 4px; font-size: 13px; }
  pre { background: #f4f7fb; padding: 12px; border-radius: 8px; overflow-x: auto;
        page-break-inside: avoid; }
  pre code { background: none; padding: 0; }
  blockquote { border-left: 4px solid #ffc24a; margin: 14px 0; padding: 4px 0 4px 16px;
               color: #4a5568; background: #fffdf7; }
  table { border-collapse: collapse; width: 100%; margin: 14px 0; font-size: 13px;
          page-break-inside: avoid; }
  th, td { border: 1px solid #e5ecf4; padding: 7px 10px; text-align: left; }
  th { background: #f4f7fb; }
  hr { border: 0; border-top: 1px solid #e5ecf4; margin: 28px 0; }
  a { color: #5b8def; }
</style>${html}`;

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const p = await browser.newPage();
  /* Large documents (many inlined images) exceed what setContent can take, so
     write a temp file and navigate to it instead. */
  const tmp = path.join(require('node:os').tmpdir(), `md2pdf-${Date.now()}.html`);
  fs.writeFileSync(tmp, page);
  await p.goto('file://' + tmp, { waitUntil: 'load', timeout: 120000 });
  await new Promise(r => setTimeout(r, 1200));
  await p.pdf({ path: out, format: 'A4', printBackground: true, timeout: 180000 });
  fs.unlinkSync(tmp);
  await browser.close();
  const kb = Math.round(fs.statSync(out).size / 1024);
  console.log(`  ✓ ${out} (${kb} KB)`);
})().catch(e => { console.error(e); process.exit(1); });
