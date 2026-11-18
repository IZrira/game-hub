import { describe, expect, it } from 'vitest';
import { getNoticeDescription } from '../common-hub/utils/noticeSeo.js';
import { generatePartyListBody, generateTierListBody } from '../scripts/lib/hub-list-prerender.js';

describe('notice meta description', () => {
  it('leads a short body with the title and ends with date and kind', () => {
    const text = getNoticeDescription({ title: '별의 선물 이벤트', category: 'Event', createdAt: '2024-03-20', content: '- 로그인만 해도 성옥을 드립니다.' });
    expect(text).toBe('별의 선물 이벤트: 로그인만 해도 성옥을 드립니다. 2024-03-20 등록된 RIRA ARCHIVE 이벤트 공지입니다.');
  });

  it('drops list markers and Markdown escapes', () => {
    const text = getNoticeDescription({ title: 'T', category: 'Update', createdAt: '2026-09-13', content: '- \\- 1.0 \\~ 3.6 버전' });
    expect(text).toContain('1.0 ~ 3.6 버전');
    expect(text).not.toContain('\\');
  });

  it('keeps a long body as is and caps it at 155 characters', () => {
    const body = '가'.repeat(200);
    const text = getNoticeDescription({ title: 'T', category: 'Update', createdAt: '2026-01-01', content: body });
    expect([...text].length).toBe(155);
    expect(text.startsWith('가')).toBe(true);
  });
});

describe('tier and party initial HTML', () => {
  const routeFor = (name: string) => (name === '아케론' ? '/gallery/hsr/character/acheron' : null);

  it('renders every tier row and links only published characters', () => {
    const html = generateTierListBody(
      [{ id: 'chaos', name: '혼돈 12층', description: '와류 반영 O' }, { id: 'empty', name: '빈 분류' }],
      { chaos: [{ tier: 'OP', label: 'OP', characters: [{ name: '아케론', role: '메인 딜러' }, { name: '<b>', role: '서포터' }] }], empty: [] },
      routeFor,
    );
    expect(html).toContain('<a href="/gallery/hsr/character/acheron">아케론</a>(메인 딜러)');
    expect(html).toContain('&lt;b&gt;(서포터)');
    expect(html).toContain('평가 캐릭터 2명');
    expect(html).not.toContain('빈 분류');
  });

  it('renders party members, roles and substitutes', () => {
    const html = generatePartyListBody([
      { name: '추가 공격 파티', description: '설명', category: '추가 공격', mainDPS: '아케론',
        members: [{ name: '아케론', role: '메인 딜러', substitutes: [{ name: '트리비', breakthrough: '1돌+' }] }] },
    ], routeFor);
    expect(html).toContain('<h2>등록된 추천 파티 1개</h2>');
    expect(html).toContain('(대체: 트리비 1돌+)');
    expect(html).toContain('<strong>주력 캐릭터:</strong> <a href="/gallery/hsr/character/acheron">아케론</a>');
  });

  it('returns nothing for an empty snapshot so the build can refuse it', () => {
    expect(generatePartyListBody([], routeFor)).toBe('');
    expect(generateTierListBody([{ id: 'chaos', name: '혼돈' }], {}, routeFor)).toBe('');
  });
});
