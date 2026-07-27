/* Renders the app's exact face scale to PNG buffers so the deck and the
   prototype show the identical artwork. Mirrors faceSVG() in index.html. */
const sharp = require("sharp");

const COLOR = { 5: "#ffc24a", 4: "#ffd98a", 3: "#b9c4d4", 2: "#7fa8d9", 1: "#8b7fd9" };
const INK = "#3a4a5e";
const GRIN = `<path d="M27,52 A23,23 0 0 0 73,52 Z" fill="${INK}"/>`;
const MOUTH = {
  4: "M32,57 Q50,72 68,57",
  3: "M34,63 L66,63",
  2: "M32,70 Q50,54 68,70",
};
const THUMB = '<g transform="rotate(180 50 50)" fill="#fff">'
  + '<rect x="22" y="49" width="11" height="30" rx="3.2"/>'
  + '<path d="M36.5,79 h26.5 c4.6,0 8-2.9 8.9-7.2 l3.9-17.6 c1-4.7-2-8.6-6.8-8.6 h-13.2 '
  + 'c1-3.4 1.5-6.6 1.5-9.5 0-4.6-3.1-7.6-6.8-6.3-2.5.9-2.8,4.4-3.3,8.1 -.8,5.9-3.7,11.1-9.7,14.1 z"/></g>';

const EYES = `<circle cx="36" cy="41" r="5.5" fill="${INK}"/><circle cx="64" cy="41" r="5.5" fill="${INK}"/>`;

function svg(score) {
  const face = score === 1 ? THUMB
    : score === 5 ? EYES + GRIN
    : EYES + `<path d="${MOUTH[score]}" stroke="${INK}" stroke-width="6.5" stroke-linecap="round" fill="none"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="512" height="512">`
    + `<circle cx="50" cy="50" r="48" fill="${COLOR[score]}"/>${face}</svg>`;
}

async function faces() {
  const out = {};
  for (const s of [1, 2, 3, 4, 5]) {
    const buf = await sharp(Buffer.from(svg(s))).png().toBuffer();
    out[s] = "image/png;base64," + buf.toString("base64");
  }
  return out;
}

module.exports = { faces, COLOR };
