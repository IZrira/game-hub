// HSR recommended parties: Notion "hsr 추천 파티 db" pages against hsr-hub/data/parties (HSR_PARTIES).
// Notion keeps a party as one bullet "a / b / c / d" with nested "X 대체제 : a, b" bullets.
import { norm } from '../../lib/text.js';

const memberKey = s => norm(s).replace(/[•·・\s]/g, '').toLowerCase();

export function parsePartyPage(page) {
  const party = { title: norm(page.title), members: [], subs: {}, formatIssues: [] };
  for (const b of page.blocks) {
    const t = norm(b.text);
    if (!t) continue;
    let m;
    if ((m = t.match(/^구분\s*([:：])?\s*(.+)$/))) {
      party.category = m[2].trim();
      if (!m[1]) party.formatIssues.push(`"구분 ${party.category}"에 콜론이 없음`);
      continue;
    }
    if (b.type === 'bulleted_list_item' && b.depth === 0 && t.includes('/')) { party.members = t.split('/').map(x => x.trim()).filter(Boolean); continue; }
    if (b.type === 'bulleted_list_item' && (m = t.match(/^(.+?)\s*대체제?\s*[:：]\s*(.+)$/))) {
      party.subs[m[1].trim()] = m[2].split(/[,，]/).map(x => x.trim()).filter(Boolean);
    }
  }
  return party;
}

const describe = (members, subs) => [
  members.join(' / '),
  ...members.filter(n => subs[n]?.length).map(n => `${n} 대체: ${subs[n].join(', ')}`),
].join('\n');

export function compareParties({ pages, parties, add }) {
  for (const page of pages) {
    const n = parsePartyPage(page);
    const lead = n.members[0];
    const candidates = parties.filter(p => lead && memberKey(p.mainDPS || p.members?.[0]?.name || '') === memberKey(lead));
    const s = candidates.find(p => /1순위/.test(p.name)) || candidates[0];
    const base = { db: '추천 파티', target: n.title, sub: s ? `사이트 "${s.name}"` : undefined };
    for (const issue of n.formatIssues) add({ ...base, cat: 'Notion 형식', text: issue, hint: 'Notion만 정리' });
    if (!s) { add({ ...base, cat: '사이트에 없음', text: `"${lead || n.title}"이 메인 딜러인 파티가 사이트에 없음`, hint: '새 항목 추가 대상' }); continue; }
    const siteMembers = (s.members || []).map(m => m.name);
    const siteSubs = Object.fromEntries((s.members || []).map(m => [m.name, (m.substitutes || []).map(x => x.name)]));
    // Notion may name a member shortly in its substitute line ("개척자 대체제"); attach it to the member it starts.
    const notionSubs = {};
    for (const [k, v] of Object.entries(n.subs)) {
      const member = n.members.find(x => memberKey(x) === memberKey(k)) || n.members.find(x => memberKey(x).startsWith(memberKey(k)));
      notionSubs[member || k] = v;
    }
    const sameList = (a, b) => a.length === b.length && a.every((x, i) => memberKey(x) === memberKey(b[i]));
    const subsSame = n.members.every(m => {
      const sm = siteMembers.find(x => memberKey(x) === memberKey(m));
      return sameList(notionSubs[m] || [], (sm && siteSubs[sm]) || []);
    });
    if (!sameList(n.members, siteMembers) || !subsSame) {
      add({ ...base, cat: '파티 구성', notion: describe(n.members, notionSubs), site: describe(siteMembers, siteSubs), hint: page.edited ? `Notion 수정일 ${page.edited.slice(0, 10)}` : undefined });
    }
  }
}
