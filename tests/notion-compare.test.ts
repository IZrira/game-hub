import { describe, expect, it } from 'vitest';
import { textKind, norm, fnv, onlyRoundingDiffs } from '../scripts/notion-compare/lib/text.js';
import { createItemList } from '../scripts/notion-compare/lib/items.js';
import { parseLightconePages } from '../scripts/notion-compare/hubs/hsr/lightcones.js';
import { parseRelicPage } from '../scripts/notion-compare/hubs/hsr/relics.js';
import { parsePartyPage, compareParties } from '../scripts/notion-compare/hubs/hsr/parties.js';
import { buildReviewPage } from '../scripts/notion-compare/index.js';

const p = (text: string, depth = 0, type = 'paragraph') => ({ depth, type, text });

describe('notion compare text helpers', () => {
  it('classifies differences by what changed', () => {
    expect(textKind('공격력 10% 증가', '공격력  10% 증가')).toBeNull();
    expect(textKind('지속 시간: 2턴', '지속 시간, 2턴')).toBe('띄어쓰기·문장부호');
    expect(textKind('피해가 10% 증가한다', '피해량이 10% 늘어난다')).toBe('표현(수치 같음)');
    expect(textKind('피해가 10% 증가한다', '피해가 12% 증가한다')).toBe('수치 다름');
  });

  it('ignores markup the site uses to highlight numbers', () => {
    expect(norm('공격력의 <span class="highlight">100%</span>만큼')).toBe('공격력의 100%만큼');
  });

  it('recognises rounding-only stat differences', () => {
    expect(onlyRoundingDiffs('Lv80 Notion 953/476/331 · 사이트 952/476/330')).toBe(true);
    expect(onlyRoundingDiffs('Lv60 Notion 685/342/285 · 사이트 685/304/285')).toBe(false);
  });
});

describe('review item ids', () => {
  it('keep a decision attached when only the compared text changes', () => {
    const a = createItemList('hsr');
    const b = createItemList('hsr');
    const first = a.add({ db: '광추', target: '앰버', cat: '효과 문구', notion: 'A', site: 'B' });
    const second = b.add({ db: '광추', target: '앰버', cat: '효과 문구', notion: 'A', site: 'C' });
    expect(first.id).toBe(second.id);
    expect(first.hash).not.toBe(second.hash);
    expect(first.id).toMatch(/^[A-Za-z0-9_\-.~:@+]+$/);
  });

  it('reproduces the first hand-run review ids for HSR', () => {
    const list = createItemList('hsr');
    const it0 = list.add({ db: '캐릭터', target: '펄', cat: 'Notion 형식', text: 'x' });
    expect(it0.legacyId).toBe(fnv(['캐릭터', '펄', 'Notion 형식', '', '', '', 'x'].join('|')));
  });
});

describe('notion page parsers', () => {
  it('splits light cone pages on dividers and reads unlabeled names', () => {
    const [a, b] = parseLightconePages([{ title: '기억 광추 데이터', blocks: [
      p('이름 : 꽃은 잊지 않는다 / Flowers Never Forget'), p('운명의 길 : 기억'), p('성급 : 4성'),
      p('효과 : 기억의 향기\n치명타 피해가 24% 증가한다'), p('스토리'), p('이야기'),
      p('', 0, 'divider'),
      p('불타는 그림자'), p('운명의 길 : 기억'), p('성급 : 3성'),
    ] }]);
    expect(a).toMatchObject({ name: '꽃은 잊지 않는다', en: 'Flowers Never Forget', path: '기억', rarity: 4, skillName: '기억의 향기', story: ['이야기'] });
    expect(b).toMatchObject({ name: '불타는 그림자', noLabel: true, rarity: 3 });
  });

  it('reads relic set pages including versions without a colon', () => {
    const set = parseRelicPage({ title: '신의 순간의 환락', blocks: [
      p('세트 이름 : 신의 순간의 환락'), p('종류 : 장신구'), p('출시 버전 4.7'), p('세트 효과'), p('2세트'),
      p('속도가 6% 증가한다'), p('파츠 이름'), p('순간의 환락의 영원한 무대'), p('순간의 환락의 마술 도구'),
    ] });
    expect(set).toMatchObject({ name: '신의 순간의 환락', kind: '장신구', version: '4.7', effect2: '속도가 6% 증가한다' });
    expect(set.pieces).toEqual(['순간의 환락의 영원한 무대', '순간의 환락의 마술 도구']);
  });

  it('reads party members and substitutes, and flags a missing colon', () => {
    const page = { title: '에바네시아 파티', blocks: [
      p('구분 환락 파티'), p('에바네시아 / 효광 / 곽향', 0, 'bulleted_list_item'),
      p('곽향 대체제 : 단항 등황, 히아킨', 1, 'bulleted_list_item'),
    ] };
    const party = parsePartyPage(page);
    expect(party.members).toEqual(['에바네시아', '효광', '곽향']);
    expect(party.subs['곽향']).toEqual(['단항 등황', '히아킨']);
    expect(party.formatIssues).toHaveLength(1);

    const list = createItemList('hsr');
    compareParties({ pages: [page], add: list.add, parties: [{
      name: '에바네시아 파티 (1순위)', mainDPS: '에바네시아',
      members: [{ name: '에바네시아' }, { name: '효광' }, { name: '곽향', substitutes: [{ name: '단항•등황' }, { name: '히아킨' }] }],
    }] });
    // Same members and substitutes (middle dot ignored): only the format issue remains.
    expect(list.items.map((i: { cat: string }) => i.cat)).toEqual(['Notion 형식']);
  });
});

describe('review page build', () => {
  it('embeds the payload without closing the script tag early', () => {
    const html = buildReviewPage('<script type="application/json" id="data">__DATA__</script>', { items: [{ text: '</script><b>' }] });
    expect(html).not.toContain('</script><b>');
    expect(html).toContain('\\u003c/script>');
  });
});
