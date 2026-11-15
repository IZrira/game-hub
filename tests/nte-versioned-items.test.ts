import { expect, it } from 'vitest';
import images from '../nte-hub/data/itemImages.json';
import { getItemUrl, getItemMeta } from '../common-hub/data/items';
import notionItems from '../common-hub/data/generated/notion-items.json';
import { fetchFromDB } from '../scripts/fetch-notion-data.js';

it('connects each of the 84 version 1.5 items to one real code image and registered metadata', () => {
  const paths = Object.values(images);
  expect(paths.filter(path => path.startsWith('1.5/'))).toHaveLength(84);
  expect(new Set(paths).size).toBe(84);
  for (const [name, path] of Object.entries(images)) {
    expect(path).toMatch(/^1\.5\/[A-Za-z0-9_]+$/);
    expect(path).not.toMatch(/fallback|abysspoint_/);
    expect(notionItems.filter(item => item.dbSource === 'nte_items' && item.name === name), name).toHaveLength(1);
    expect(getItemUrl(name, 'nte')).toBe('https://raw.githubusercontent.com/IZrira/riragameinfo/main/nte%20images/items/' + path + '.webp');
  }
});

it('preserves legacy item paths and explicit file overrides', () => {
  expect(getItemUrl('비틀 코인', 'nte')).toContain('/items/%EB%B9%84%ED%8B%80%20%EC%BD%94%EC%9D%B8.webp');
  expect(getItemUrl('속 빈 꽃씨', 'nte', 'custom')).toContain('/items/custom.webp');
});

it('keeps the new food effect, duration, and flavor description visible together', () => {
  const item = getItemMeta('공상 속의 시그니처');
  expect(item?.desc).toContain('체력 회복속도+20%');
  expect(item?.desc).toContain('900초');
  expect(item?.desc).toContain('엘림의 특제 음료');
});

it('reads separate Notion usage and description properties without a second body fetch', async () => {
  const text = (plain_text: string) => ({ type: 'rich_text', rich_text: [{ plain_text }] });
  const page = { id: 'test-item', properties: {
    '이름': text('검증 아이템'), '사용처': text('회복속도+20%. 900초 지속.'), '설명': text('특제 음료 설명.')
  }};
  const client = {
    databases: { retrieve: async () => ({ data_sources: [{ id: 'test-source' }] }) },
    dataSources: { query: async () => ({ results: [page], has_more: false }) }
  };
  const result = await fetchFromDB(client, 'test-db', {}, false, 'NTE', null, true);
  expect(result).toHaveLength(1);
  expect(result[0].skillDescription).toBe('회복속도+20%. 900초 지속.\n\n특제 음료 설명.');
  expect(result[0].content).toBe('');
});
