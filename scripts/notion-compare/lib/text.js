// Text helpers shared by every comparator: normalisation, difference kinds and stable ids.

/** Strip markup and collapse whitespace so formatting alone never counts as a difference. */
export const norm = s => String(s ?? '')
  .replace(/<[^>]+>/g, '')
  .replace(/\*/g, '')
  .replace(/[ \t ]+/g, ' ')
  .replace(/\s*\n\s*/g, '\n')
  .trim();

/** Comparison key for names: ignores spacing, case and the three middle-dot variants. */
export const nameKey = s => norm(s).replace(/[•·・]/g, '•').replace(/\s+/g, '').toLowerCase();

const numbers = s => (norm(s).match(/\d+(?:[.,]\d+)*/g) || []).map(n => String(parseFloat(n.replace(/,/g, ''))));

export const KIND = {
  spacing: '띄어쓰기·문장부호',
  wording: '표현(수치 같음)',
  number: '수치 다름',
};

/**
 * How two texts differ: null when equal apart from whitespace,
 * otherwise punctuation-only, wording-only (same numbers) or a number difference.
 */
export function textKind(a, b) {
  const A = norm(a);
  const B = norm(b);
  if (A.replace(/\s+/g, '') === B.replace(/\s+/g, '')) return null;
  const strip = s => s.replace(/[\s,.·:;!?"'「」『』()[\]~\-]/g, '');
  if (strip(A) === strip(B)) return KIND.spacing;
  if (numbers(A).join('|') === numbers(B).join('|')) return KIND.wording;
  return KIND.number;
}

/** Short FNV-1a hash in base 36; ids must stay within the artifact store's path characters. */
export function fnv(text) {
  let h = 0x811c9dc5;
  for (const byte of Buffer.from(String(text), 'utf8')) {
    h ^= byte;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(36);
}

/** Parse "name x123" material lines into {name: count}. */
export function parseMaterialLines(lines) {
  const out = {};
  for (const line of lines) {
    const m = String(line).match(/^(.+?)\s*[x×]\s*([\d,]+)\s*$/);
    if (m) out[m[1].trim()] = Number(m[2].replace(/,/g, ''));
  }
  return out;
}

/** Parse a run of "name x 4, other x12" text (light cone ascension rows) into {name: count}. */
export function parseMaterialRun(text) {
  const out = {};
  const re = /([^\d,x×]+?)\s*[x×]\s*([\d,]+)/g;
  let m;
  while ((m = re.exec(text))) out[m[1].replace(/^[\s,]+|[\s,]+$/g, '').trim()] = Number(m[2].replace(/,/g, ''));
  return out;
}

/** List the keys whose counts differ between two material maps. */
export function materialDiffs(notion, site) {
  const keys = new Set([...Object.keys(notion), ...Object.keys(site)]);
  return [...keys]
    .filter(k => notion[k] !== site[k])
    .map(k => `${k} Notion ${notion[k] ?? '없음'} · 사이트 ${site[k] ?? '없음'}`);
}

/** True when every "Notion a/b/c · 사이트 x/y/z" pair in the text differs by at most one per value. */
export function onlyRoundingDiffs(text) {
  const pairs = [...String(text).matchAll(/Notion ([\d/.]+) · 사이트 ([\d/.]+)/g)];
  return pairs.length > 0 && pairs.every(p => {
    const a = p[1].split('/').map(Number);
    const b = p[2].split('/').map(Number);
    return a.length === b.length && a.every((v, i) => Math.abs(v - b[i]) <= 1);
  });
}
