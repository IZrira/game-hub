import { expect, it } from 'vitest';
import { normalizeNteCharacter } from '../scripts/lib/normalize-nte-character.js';

it('reads growth stats when Notion bold formatting wraps all or part of a row', () => {
  const character = normalizeNteCharacter({
    name: '엘림',
    growthStats: '1 : **1,270 83 75 5% 50%**\n30 : 5,232 **245 309 5% 50%**\n80 : **15,392 660 909 5% 50%**'
  });
  expect(character.baseStats).toEqual({
    lv1: { '기초 HP': 1270, '기초 공격력': 83, '기초 방어력': 75, '치명 확률': '5%', '치명 피해': '50%' },
    lv30: { '기초 HP': 5232, '기초 공격력': 245, '기초 방어력': 309, '치명 확률': '5%', '치명 피해': '50%' },
    lv80: { '기초 HP': 15392, '기초 공격력': 660, '기초 방어력': 909, '치명 확률': '5%', '치명 피해': '50%' }
  });
});

it('keeps all eight user-edited Elim levels and the full character sections', async () => {
  const { default: characters } = await import('../nte-hub/data/generated/characters.json');
  const character = characters.find(character => character.name === '엘림');
  expect(character).toBeDefined();
  expect(Object.keys(character!.baseStats)).toEqual(['lv1', 'lv20', 'lv30', 'lv40', 'lv50', 'lv60', 'lv70', 'lv80']);
  expect(character!.baseStats.lv80).toMatchObject({ '기초 HP': 15392, '기초 공격력': 660, '기초 방어력': 909 });
  expect(character!.eidolons).toHaveLength(6);
  expect(character!.skills.filter(skill => skill.type === '공명')).toHaveLength(2);
  expect(character!.materials_v2.traces).toHaveLength(10);
  expect(character!.skins).toEqual(['산들바람 요정', 'Y2K 미스터리', '꽃밭의 추억']);
  expect(Object.keys(character!.specialTerms)).toEqual(['신호 세기', '착시적 환각']);
  expect(character!.consoleLayoutType).toBe(3);
  expect(character!.skills.some(skill => skill.description.includes('스킬 레벨 10 기준'))).toBe(false);
});
