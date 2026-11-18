import { describe, expect, it } from 'vitest';
import { parseWuwaGuideMarkdown } from '../scripts/fetch-notion-data.js';

const page = (weapons: string) => `패치 버전 3.8\n\n무기\n${weapons}\n\n에코 세트\n찬란한 광휘 5세트\n`;

describe('WW guide weapon parsing', () => {
  it('keeps a following sentence as part of the previous weapon note', () => {
    const guide = parseWuwaGuideMarkdown('릴리 세팅 공략', page([
      '럴러바이 1순위 : 첫 문장.',
      '둘째 문장도 같은 무기 설명이다.',
      '화려한 악곡 2순위 : 다른 무기.',
    ].join('\n')));
    expect(guide.weapons).toEqual([
      { name: '럴러바이', rank: 1, note: '첫 문장. 둘째 문장도 같은 무기 설명이다.' },
      { name: '화려한 악곡', rank: 2, note: '다른 무기.' },
    ]);
  });

  it('keeps a weapon written without a rank and does not invent one', () => {
    const guide = parseWuwaGuideMarkdown('양양 세팅 공략', page([
      '솟아오르는 화염 1순위',
      '**영원의 붕괴** : 공격력 세팅 시 사용',
    ].join('\n')));
    expect(guide.weapons).toEqual([
      { name: '솟아오르는 화염', rank: 1, note: undefined },
      { name: '영원의 붕괴', rank: undefined, note: '공격력 세팅 시 사용' },
    ]);
  });

  it('splits several weapons written on one line with commas', () => {
    const guide = parseWuwaGuideMarkdown('방랑자 (회절)', page([
      '천공의 광경 2순위 : 주력 무기',
      '야귀의 신념,상승의 서녘, 영원의 붕괴 3순위 : 대체제',
    ].join('\n')));
    expect(guide.weapons).toEqual([
      { name: '천공의 광경', rank: 2, note: '주력 무기' },
      { name: '야귀의 신념', rank: 3, note: '대체제' },
      { name: '상승의 서녘', rank: 3, note: '대체제' },
      { name: '영원의 붕괴', rank: 3, note: '대체제' },
    ]);
  });
});
