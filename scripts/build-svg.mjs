// Builds the animated SVGs used in the profile README (Phantom HUD style).
//   node scripts/build-svg.mjs
// SVGs shown on GitHub are images: no external fonts or scripts, so this only
// uses system font stacks, inline CSS animations and SMIL.
import { writeFileSync, mkdirSync } from 'node:fs';

const INK = '#140b0d';
const RED = '#e31837';
const DEEP = '#8a1021';
const PAPER = '#f5eeee';
const DISPLAY = "'Arial Black', 'Helvetica Neue', Arial, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";
const MONO = "'JetBrains Mono', Consolas, 'SF Mono', Menlo, monospace";
const KANA = "'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Noto Sans JP', 'Meiryo', sans-serif";

mkdirSync('assets', { recursive: true });
const out = (name, svg) => writeFileSync(`assets/${name}`, svg.replace(/\n\s+/g, '\n').trim() + '\n');

// ---------------------------------------------------------------- header
{
  const letters = [...'XDUKUNX'];
  const styles = [
    { bg: PAPER, fg: INK, font: DISPLAY, r: -4 },
    { bg: RED, fg: '#fff', font: SERIF, r: 3, italic: true },
    { bg: INK, fg: RED, font: DISPLAY, r: -2, stroke: PAPER },
    { bg: PAPER, fg: INK, font: MONO, r: 5 },
    { bg: RED, fg: INK, font: DISPLAY, r: -5 },
    { bg: INK, fg: PAPER, font: SERIF, r: 2, stroke: RED },
    { bg: PAPER, fg: RED, font: DISPLAY, r: -3 },
  ];
  const W = 104;
  const x0 = 70;
  const tiles = letters
    .map((ch, i) => {
      const s = styles[i];
      const x = x0 + i * (W + 8);
      return `
      <g class="l" style="animation-delay:${0.35 + i * 0.07}s">
        <g transform="rotate(${s.r} ${x + W / 2} 132)">
          <rect x="${x + 6}" y="${78 + 6}" width="${W}" height="112" fill="${s.bg === RED ? INK : RED}"/>
          <rect x="${x}" y="78" width="${W}" height="112" fill="${s.bg}" ${s.stroke ? `stroke="${s.stroke}" stroke-width="3"` : ''}/>
          <text x="${x + W / 2}" y="168" text-anchor="middle" font-family="${s.font}" font-size="92" font-weight="900" ${s.italic ? 'font-style="italic"' : ''} fill="${s.fg}">${ch}</text>
        </g>
      </g>`;
    })
    .join('');

  out(
    'header.svg',
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 330" width="1200" height="330" role="img" aria-label="xDukunx — Muhammad Alesha Fadhana, computational chemist and multimedia maker">
    <title>xDukunx — Muhammad Alesha Fadhana</title>
    <style>
      .slash { animation: slash .55s cubic-bezier(.7,0,.2,1) both; }
      .l { animation: drop .45s cubic-bezier(.2,.9,.2,1.25) both; transform-box: fill-box; transform-origin: center; }
      .fade { animation: fade .6s ease-out both; }
      .spin { animation: spin 6s linear infinite; transform-origin: 1035px 135px; }
      .spin2 { animation: spin 9s linear infinite reverse; transform-origin: 1035px 135px; }
      .cursor { animation: blink 1s steps(1) infinite; }
      .stripes { animation: crawl 1.2s linear infinite; }
      .burst { animation: pulse 2.4s ease-in-out infinite; transform-origin: 1035px 135px; }
      @keyframes slash { from { transform: translateX(-110%); } }
      @keyframes drop { from { opacity: 0; transform: translateY(-60px) rotate(-14deg); } }
      @keyframes fade { from { opacity: 0; transform: translateY(8px); } }
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes blink { 50% { opacity: 0; } }
      @keyframes crawl { to { transform: translateX(-36px); } }
      @keyframes pulse { 50% { transform: scale(1.06) rotate(8deg); } }
      @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
    </style>
    <defs>
      <pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="${PAPER}" opacity=".07"/></pattern>
      <clipPath id="frame"><rect width="1200" height="330"/></clipPath>
    </defs>
    <g clip-path="url(#frame)">
      <rect width="1200" height="330" fill="${INK}"/>
      <rect width="1200" height="330" fill="url(#dots)"/>
      <polygon class="slash" points="0,250 1200,30 1200,120 0,330" fill="${DEEP}" opacity=".55"/>
      <polygon class="slash" points="0,282 1200,92 1200,118 0,306" fill="${RED}" style="animation-delay:.1s"/>

      <!-- unit code -->
      <g class="fade" style="animation-delay:.2s">
        <rect x="70" y="34" width="184" height="26" fill="${PAPER}"/>
        <text x="80" y="53" font-family="${MONO}" font-size="15" font-weight="700" fill="${INK}">UNIT DH-2022</text>
        <text x="268" y="53" font-family="${MONO}" font-size="15" fill="${PAPER}" opacity=".75">PILOT · xDukunx</text>
        <text x="440" y="54" font-family="${KANA}" font-size="17" font-weight="700" fill="${RED}">ダナ</text>
      </g>

      ${tiles}

      <!-- subtitle -->
      <g class="fade" style="animation-delay:1s">
        <text x="70" y="236" font-family="${MONO}" font-size="19" fill="${PAPER}">MUHAMMAD ALESHA FADHANA · COMPUTATIONAL CHEMIST · MULTIMEDIA MAKER</text>
        <rect class="cursor" x="838" y="221" width="11" height="20" fill="${RED}"/>
      </g>

      <!-- atom + starburst -->
      <g class="burst">
        <polygon fill="${RED}" points="${Array.from({ length: 24 }, (_, i) => {
          const r = i % 2 ? 62 : 96;
          const a = (Math.PI / 12) * i;
          return `${(1035 + r * Math.cos(a)).toFixed(1)},${(135 + r * Math.sin(a)).toFixed(1)}`;
        }).join(' ')}"/>
      </g>
      <circle cx="1035" cy="135" r="58" fill="${INK}" stroke="${PAPER}" stroke-width="3"/>
      <g class="spin">
        <ellipse cx="1035" cy="135" rx="46" ry="16" fill="none" stroke="${PAPER}" stroke-width="2.5"/>
        <circle cx="1081" cy="135" r="4.5" fill="${RED}"/>
      </g>
      <g class="spin2">
        <ellipse cx="1035" cy="135" rx="46" ry="16" fill="none" stroke="${RED}" stroke-width="2.5" transform="rotate(60 1035 135)"/>
      </g>
      <g class="spin" style="animation-duration:7.5s">
        <ellipse cx="1035" cy="135" rx="46" ry="16" fill="none" stroke="${PAPER}" stroke-width="1.5" transform="rotate(120 1035 135)" opacity=".7"/>
      </g>
      <circle cx="1035" cy="135" r="8" fill="${RED}"/>

      <!-- caution stripe -->
      <rect x="0" y="300" width="1200" height="30" fill="${INK}"/>
      <g class="stripes">
        ${Array.from({ length: 40 }, (_, i) => `<polygon points="${i * 36},330 ${i * 36 + 18},330 ${i * 36 + 36},300 ${i * 36 + 18},300" fill="${RED}"/>`).join('')}
      </g>
      <rect x="0" y="298" width="1200" height="3" fill="${PAPER}"/>
    </g>
  </svg>`,
  );
}

// ---------------------------------------------------------------- element tiles
const elements = [
  ['Rs', 'Research', 1],
  ['Cd', 'Code', 2],
  ['Pj', 'Projects', 3],
  ['Vs', 'Visuals', 4],
  ['Ds', 'Design', 5],
  ['Hb', 'Hobbies', 6],
  ['Ld', 'Loadout', 7],
  ['Me', 'About', 8],
];
for (const [sym, name, n] of elements) {
  const dur = 4 + n * 0.7;
  out(
    `tile-${sym.toLowerCase()}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108" width="108" height="108" role="img" aria-label="${sym} — ${name}">
    <title>${sym} · ${name}</title>
    <style>
      .ring { animation: spin ${dur}s linear infinite; transform-origin: 86px 88px; }
      .pop { animation: pop .5s ${0.1 * n}s cubic-bezier(.2,.9,.2,1.3) both; transform-origin: 50px 50px; }
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes pop { from { transform: scale(.85) rotate(-6deg); } }
      @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
    </style>
    <g class="pop">
      <rect x="7" y="7" width="98" height="98" fill="${RED}"/>
      <rect x="1.5" y="1.5" width="98" height="98" fill="#fff" stroke="${INK}" stroke-width="3"/>
      <g class="ring">
        <circle cx="86" cy="88" r="34" fill="none" stroke="${RED}" stroke-width="1.5" opacity=".55"/>
        <circle cx="120" cy="88" r="3.5" fill="${RED}"/>
      </g>
      <rect x="1.5" y="1.5" width="98" height="98" fill="none" stroke="${INK}" stroke-width="3"/>
      <text x="10" y="20" font-family="${MONO}" font-size="11" fill="${INK}">${n}</text>
      <text x="10" y="66" font-family="${DISPLAY}" font-size="40" font-weight="900" letter-spacing="-2" fill="${INK}">${sym}</text>
      <text x="10" y="88" font-family="${DISPLAY}" font-size="11" font-weight="700" fill="${INK}">${name}</text>
    </g>
  </svg>`,
  );
}

// ---------------------------------------------------------------- footer
out(
  'footer.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 130" width="1200" height="130" role="img" aria-label="Be greater, be yourself.">
  <title>Be greater, be yourself.</title>
  <style>
    .stripes { animation: crawl 1.2s linear infinite; }
    .quote { animation: in .6s cubic-bezier(.2,.9,.2,1.2) both; transform-origin: 600px 60px; }
    @keyframes crawl { to { transform: translateX(-36px); } }
    @keyframes in { from { opacity: 0; transform: scale(1.3) skewX(-8deg); } }
    @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
  </style>
  <clipPath id="c"><rect width="1200" height="130"/></clipPath>
  <g clip-path="url(#c)">
    <rect x="0" y="100" width="1200" height="30" fill="${INK}"/>
    <g class="stripes">
      ${Array.from({ length: 40 }, (_, i) => `<polygon points="${i * 36},130 ${i * 36 + 18},130 ${i * 36 + 36},100 ${i * 36 + 18},100" fill="${RED}"/>`).join('')}
    </g>
    <g class="quote">
      <g transform="skewX(-8) translate(80 0)">
        <rect x="318" y="20" width="560" height="62" fill="${RED}"/>
        <rect x="310" y="12" width="560" height="62" fill="${INK}"/>
        <text x="590" y="54" text-anchor="middle" font-family="${DISPLAY}" font-size="26" font-weight="900" fill="#fff" letter-spacing="1">BE <tspan fill="${RED}">GREATER</tspan>, BE YOURSELF.</text>
      </g>
    </g>
  </g>
</svg>`,
);

console.log('built', ['header.svg', 'footer.svg', ...elements.map(([s]) => `tile-${s.toLowerCase()}.svg`)].join(', '));
