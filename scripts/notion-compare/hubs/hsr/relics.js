// HSR relic and planar ornament sets: Notion "유물 장신구" pages against hsr-hub/data/relics.ts and ornaments.ts.
import { nameKey, norm, textKind } from '../../lib/text.js';

/** One set per page: "세트 이름 : …", "종류 : 유물|장신구", "출시 버전 4.7", "2세트"/"4세트" effects, then piece names. */
export function parseRelicPage(page) {
  const set = { page: page.title, pieces: [] };
  let mode = null;
  for (const b of page.blocks) {
    const t = norm(b.text);
    if (!t) continue;
    let m;
    if ((m = t.match(/^세트 이름\s*[:：]\s*(.+)$/))) { set.name = m[1].trim(); continue; }
    if ((m = t.match(/^종류\s*[:：]\s*(.+)$/))) { set.kind = m[1].trim(); continue; }
    if ((m = t.match(/^출시 버전\s*[:：]?\s*([\d.]+)/))) { set.version = m[1]; continue; }
    if (t === '세트 효과') { mode = null; continue; }
    if ((m = t.match(/^([24])세트$/))) { mode = `effect${m[1]}`; continue; }
    if (t === '파츠 이름') { mode = 'pieces'; continue; }
    if (mode === 'effect2' && !set.effect2) { set.effect2 = t; continue; }
    if (mode === 'effect4' && !set.effect4) { set.effect4 = t; continue; }
    if (mode === 'pieces') set.pieces.push(t);
  }
  set.name = set.name || page.title;
  return set;
}

export function compareRelics({ pages, relics, ornaments, add }) {
  const site = [
    ...relics.map(r => ({ ...r, isOrnament: false, effect2: r['2piece'] ?? r.setEffect?.['2piece'], effect4: r['4piece'] ?? r.setEffect?.['4piece'] })),
    ...ornaments.map(o => ({ ...o, isOrnament: true, effect2: o.setEffect?.['2piece'] ?? o['2piece'] })),
  ].filter(s => !s.gameId || s.gameId === 'hsr');
  for (const page of pages) {
    const n = parseRelicPage(page);
    const isOrnament = /장신구/.test(n.kind || '');
    const s = site.find(x => nameKey(x.name) === nameKey(n.name));
    const base = { db: '유물·장신구', target: n.name, sub: `${isOrnament ? '차원 장신구' : '터널 유물'}${n.version ? ` · ${n.version}` : ''}` };
    if (!s) { add({ ...base, cat: '사이트에 없음', text: `Notion에만 있는 ${isOrnament ? '차원 장신구' : '유물'} 세트 (파츠: ${n.pieces.join(', ')})`, hint: '새 항목 추가 대상' }); continue; }
    if (s.isOrnament !== isOrnament) add({ ...base, cat: '종류', text: `Notion "${n.kind}" / 사이트 "${s.type}"` });
    if (!s.isOrnament && n.version && s.releaseVersion && n.version !== s.releaseVersion) add({ ...base, cat: '출시 버전', text: `Notion ${n.version} / 사이트 ${s.releaseVersion}` });
    for (const [label, a, b] of [['2세트 효과', n.effect2, s.effect2], ['4세트 효과', n.effect4, s.effect4]]) {
      if (a === undefined && b === undefined) continue;
      const kind = textKind(a, b);
      if (kind) add({ ...base, cat: label, kind, notion: a || '', site: b || '' });
    }
    const sitePieces = (s.pieces || []).map(p => (typeof p === 'string' ? p : p.name));
    const onlyN = n.pieces.filter(p => !sitePieces.some(q => nameKey(q) === nameKey(p)));
    const onlyS = sitePieces.filter(q => !n.pieces.some(p => nameKey(p) === nameKey(q)));
    const spacing = sitePieces.filter(q => n.pieces.some(p => nameKey(p) === nameKey(q) && norm(p) !== norm(q)));
    if (onlyN.length || onlyS.length) add({ ...base, cat: '파츠 이름', notion: n.pieces.join('\n'), site: sitePieces.join('\n') });
    else if (spacing.length) add({ ...base, cat: '파츠 이름', kind: '띄어쓰기·문장부호', notion: n.pieces.join('\n'), site: sitePieces.join('\n'), hint: '이미지 파일 이름과 맞는지 확인' });
  }
}
