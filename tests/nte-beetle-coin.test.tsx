import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { getItemMeta } from '../common-hub/data/items';
import ItemIcon from '../common-hub/components/ItemIcon';
import { NTE_ITEM_META } from '../nte-hub/data/items';
import fs from 'node:fs';

const coinConsumers = JSON.parse(fs.readFileSync('common-hub/data/notion-data.json', 'utf8'))
  .filter((item: { dbSource?: string; ascensionMaterials?: string; skillMaterials?: string }) =>
    ['nte_characters', 'nte_arcs'].includes(item.dbSource || '') &&
    `${item.ascensionMaterials || ''} ${item.skillMaterials || ''}`.includes('비틀 코인')) as
  Array<{ name: string; dbSource: string; ascensionMaterials: string; skillMaterials: string }>;

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key, i18n: { language: 'ko' } }),
}));

describe('NTE 비틀 코인 육성 재료 성급', () => {
  it('아이템 전용 동기화는 부분 조회·빈 결과에서 덮어쓰지 않는다', () => {
    const script = fs.readFileSync('scripts/fetch-notion-data.js', 'utf8');
    expect(script).toContain("false, 'NTE', null, true");
    expect(script).toContain('if (selectedNames || strict) throw e;');
    expect(script).toContain('NTE item synchronization returned no records; refusing to overwrite.');
    expect(script).toContain('Notion token missing; NTE item synchronization did not run.');
  });
  it('노션 데이터가 없는 경우의 로컬 기본값도 3성이다', () => {
    expect(NTE_ITEM_META['비틀 코인'].rarity).toBe(3);
  });
  it('공통 재료 조회가 3성을 반환한다', () => {
    expect(getItemMeta('비틀 코인')?.rarity).toBe(3);
  });

  it('캐릭터·아크가 공유하는 재료 아이콘에 3성 파란 테마를 적용한다', () => {
    const html = renderToStaticMarkup(<ItemIcon name="비틀 코인" count={525000} gameId="nte" />);
    expect(html).toContain('border-blue-500/30');
    expect(html).not.toContain('border-gray-400/20');
    expect(html).toContain('525,000');
  });

  it('캐릭터 24명과 아크 51개를 검수 대상으로 포함한다', () => {
    expect(coinConsumers.filter(item => item.dbSource === 'nte_characters')).toHaveLength(24);
    expect(coinConsumers.filter(item => item.dbSource === 'nte_arcs')).toHaveLength(51);
  });

  it.each(coinConsumers)('$dbSource / $name의 실제 비틀 코인 수량을 3성으로 렌더링한다', item => {
    let checked = 0;
    for (const material of [item.ascensionMaterials, item.skillMaterials]) {
      const count = material?.match(/비틀 코인\s*[x×]\s*([\d,]+)/)?.[1];
      if (!count) continue;
      checked++;
      const html = renderToStaticMarkup(<ItemIcon name="비틀 코인" count={count} gameId="nte" />);
      expect(html).toContain('border-blue-500/30');
      expect(html).not.toContain('border-gray-400/20');
      expect(html).toContain(count);
    }
    expect(checked).toBeGreaterThan(0);
  });
});
