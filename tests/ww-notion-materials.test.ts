import { describe, expect, it } from 'vitest';
import notionData from '../common-hub/data/notion-data.json';
import { parseWwNotionMaterials } from '../ww-hub/utils/notionMaterials';

describe('WW Notion material names and quantities', () => {
  it('preserves numbered Jiyan materials and separates their actual quantities', () => {
    const source = notionData.find(item => item.id === '35595fae-3dc7-802b-bc16-fc93764fd817')!;
    expect(parseWwNotionMaterials(source.skillMaterials).slice(-4)).toEqual([
      { name: '비명 이상 키메라 210', count: 25 },
      { name: '비명 이상 키메라 226', count: 28 },
      { name: '비명 이상 키메라 235', count: 55 },
      { name: '비명 이상 키메라 239', count: 67 },
    ]);
    expect(parseWwNotionMaterials(source.skillMaterials)[0]).toEqual({ name: '클램 코인', count: 2030000 });
    expect(parseWwNotionMaterials(source.ascensionMaterials)).toContainEqual({ name: '공작화', count: 60 });
  });

  it.each(['x', '×', '*'])('supports %s quantity separators without consuming name digits', marker => {
    expect(parseWwNotionMaterials(`비명 이상 키메라 210 ${marker} 25`)).toEqual([
      { name: '비명 이상 키메라 210', count: 25 },
    ]);
  });

  it('preserves names without quantities, Latin letters, blank lines and comma-formatted counts', () => {
    expect(parseWwNotionMaterials(' \r\n비명 이상 키메라 210\r\nBox 2x1,200\n')).toEqual([
      { name: '비명 이상 키메라 210', count: 1 },
      { name: 'Box 2', count: 1200 },
    ]);
    expect(parseWwNotionMaterials()).toEqual([]);
  });
});
