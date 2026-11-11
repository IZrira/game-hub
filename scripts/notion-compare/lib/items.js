// Turn comparator findings into review items with stable ids.
import { fnv, norm } from './text.js';

/** Review-page filter group for a finding. */
export function groupOf(cat, kind) {
  if (/형식/.test(cat)) return '형식';
  if (/없음/.test(cat)) return '누락';
  if (/이름|운명의 길|성급|기본 정보|출시 버전|종류/.test(cat)) return '이름·분류';
  if (/스탯/.test(cat)) return '스탯';
  if (/재료/.test(cat)) return '재료';
  if (/속성 보너스/.test(cat)) return '수치';
  if (kind === '수치 다름') return '수치';
  if (kind === '띄어쓰기·문장부호') return '표기';
  return '문구';
}

/**
 * Collects items for one hub.
 *
 * `id` depends only on where the difference is (hub, DB, target, category, label), so a saved
 * decision stays attached while the texts change. `hash` covers the texts, so the page can say
 * when a difference changed after it was decided. `legacyId` reproduces the ids of the first,
 * hand-run HSR review (2026-11-11) so decisions saved there still match.
 */
export function createItemList(hub) {
  const items = [];
  const seen = new Map();
  const legacySeen = new Map();
  const dedupe = (map, base) => {
    const n = (map.get(base) || 0) + 1;
    map.set(base, n);
    return n > 1 ? `${base}-${n}` : base;
  };
  return {
    items,
    add(finding) {
      const it = { hub, ...finding };
      it.group = it.group || groupOf(it.cat, it.kind);
      for (const k of ['notion', 'site', 'text']) if (it[k] !== undefined) it[k] = norm(it[k]);
      it.id = dedupe(seen, fnv([hub, it.db, it.target, it.cat, it.label || ''].join('|')));
      it.hash = fnv([it.notion || '', it.site || '', it.text || ''].join('|'));
      if (hub === 'hsr') {
        it.legacyId = dedupe(legacySeen, fnv([it.db, it.target, it.cat, it.label || '', it.notion || '', it.site || '', it.text || ''].join('|')));
      }
      for (const k of Object.keys(it)) if (it[k] === undefined || it[k] === '' || it[k] === null) delete it[k];
      items.push(it);
      return it;
    },
  };
}
