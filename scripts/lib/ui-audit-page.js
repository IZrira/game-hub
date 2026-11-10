// Runs inside the page (Runtime.evaluate) for scripts/audit-ui.mjs.
// Measures text contrast on solid backgrounds, text under 12px, pointer targets
// under 24px, controls without an accessible name, heading level skips and
// horizontal overflow. Text over gradients or images is skipped.
(() => {
  const vis = el => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && +cs.opacity !== 0; };
  const parse = c => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const lum = ({ r, g, b }) => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const blend = (fg, bg) => ({ r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 });
  function bgOf(el) {
    const layers = [];
    for (let n = el; n; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.backgroundImage && cs.backgroundImage !== 'none') return null;
      const c = parse(cs.backgroundColor); if (c && c.a > 0) { layers.push(c); if (c.a >= 1) break; }
    }
    let bg = { r: 10, g: 10, b: 10, a: 1 };
    for (let i = layers.length - 1; i >= 0; i--) bg = blend(layers[i], bg);
    return bg;
  }
  const out = { url: location.pathname, vw: innerWidth, title: document.title };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set(); const lowC = [], small = [], hangulCaps = []; let textEls = 0;
  while (walker.nextNode()) {
    const t = walker.currentNode.textContent.trim(); if (!t) continue;
    const el = walker.currentNode.parentElement; if (!el || seen.has(el) || !vis(el)) continue; seen.add(el); textEls++;
    const cs = getComputedStyle(el); const fs = parseFloat(cs.fontSize); const bold = +cs.fontWeight >= 700;
    if (fs < 12) small.push(`${fs}px "${t.slice(0, 24)}"`);
    if (/[가-힣]/.test(t) && (cs.textTransform === 'uppercase' || cs.fontStyle === 'italic')) hangulCaps.push(`${el.tagName} "${t.slice(0, 20)}"`);
    const fg = parse(cs.color); const bg = bgOf(el); if (!fg || !bg) continue;
    let op = 1; for (let n = el; n; n = n.parentElement) op *= +getComputedStyle(n).opacity;
    const c = blend({ ...fg, a: fg.a * op }, bg);
    const L1 = lum(c), L2 = lum(bg); const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const large = fs >= 24 || (fs >= 18.66 && bold);
    if (ratio < (large ? 3 : 4.5)) lowC.push(`${ratio.toFixed(2)} ${fs}px ${cs.color} "${t.slice(0, 24)}"`);
  }
  out.textEls = textEls; out.lowContrast = lowC.length; out.lowContrastSamples = [...new Set(lowC)].slice(0, 8);
  out.smallText = small.length; out.smallTextSamples = [...new Set(small)].slice(0, 6);
  out.hangulCapsItalic = hangulCaps.length; out.hangulCapsSamples = hangulCaps.slice(0, 5);
  const inter = [...document.querySelectorAll('a[href],button,input,select,textarea,[role=button],[tabindex]:not([tabindex="-1"])')].filter(vis);
  const lt24 = [], noName = []; let lt44 = 0;
  for (const el of inter) {
    const r = el.getBoundingClientRect();
    const inlineText = el.tagName === 'A' && getComputedStyle(el).display === 'inline' && el.closest('p,li');
    if (!inlineText && (r.width < 24 || r.height < 24)) lt24.push(`${el.tagName} ${Math.round(r.width)}x${Math.round(r.height)} "${(el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 16)}"`);
    if (!inlineText && (r.width < 44 || r.height < 44)) lt44++;
    const name = (el.getAttribute('aria-label') || el.getAttribute('title') || el.innerText || el.value || el.getAttribute('placeholder') || [...el.querySelectorAll('img[alt]')].map(i => i.alt).join('') || (el.getAttribute('aria-labelledby') ? 'x' : '')).trim();
    if (!name) noName.push(`${el.tagName} ${el.className.toString().slice(0, 50)}`);
  }
  out.interactive = inter.length; out.targetsUnder24 = lt24.length; out.under24Samples = lt24.slice(0, 6); out.targetsUnder44 = lt44;
  out.noAccessibleName = noName.length; out.noNameSamples = noName.slice(0, 4);
  const imgs = [...document.images].filter(vis);
  out.images = imgs.length; out.imgNoAlt = imgs.filter(i => !i.hasAttribute('alt')).length;
  out.imgNoSize = imgs.filter(i => !i.getAttribute('width') && !i.getAttribute('height') && getComputedStyle(i).aspectRatio === 'auto').length;
  const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(vis).map(h => +h.tagName[1]);
  out.h1Count = hs.filter(l => l === 1).length; let skips = 0; for (let i = 1; i < hs.length; i++) if (hs[i] - hs[i - 1] > 1) skips++; out.headingSkips = skips; out.headings = hs.join('');
  out.horizontalOverflow = document.documentElement.scrollWidth - innerWidth;
  out.lang = document.documentElement.lang; out.viewport = document.querySelector('meta[name=viewport]')?.content;
  out.skipLink = !!document.querySelector('a[href="#main"], a[href="#content"], a[href="#main-content"]');
  let rm = false; for (const s of document.styleSheets) { try { for (const r of s.cssRules) if (r.conditionText && r.conditionText.includes('prefers-reduced-motion')) rm = true; } catch {} } out.reducedMotionCSS = rm;
  out.emojiInUI = [...document.querySelectorAll('button,a,h1,h2,h3,span')].filter(e => vis(e) && /\p{Extended_Pictographic}/u.test(e.childNodes[0]?.textContent || '')).length;
  const radii = new Map(); for (const e of document.querySelectorAll('body *')) { if (!vis(e)) continue; const r = getComputedStyle(e).borderTopLeftRadius; if (r !== '0px') radii.set(r, (radii.get(r) || 0) + 1); }
  out.radiusVariants = radii.size; out.topRadii = [...radii].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([k, v]) => `${k}:${v}`).join(' ');
  const fams = new Set(), sizes = new Map(); for (const e of seen) { const cs = getComputedStyle(e); fams.add(cs.fontFamily.split(',')[0]); sizes.set(cs.fontSize, (sizes.get(cs.fontSize) || 0) + 1); }
  out.fontFamilies = [...fams]; out.fontSizes = [...sizes].sort((a, b) => parseFloat(a[0]) - parseFloat(b[0])).map(([k, v]) => `${k}:${v}`).join(' ');
  const p = document.querySelector('main p, article p'); out.bodyP = p ? `${getComputedStyle(p).fontSize}/${getComputedStyle(p).lineHeight}` : '-';
  return JSON.stringify(out);
})()
