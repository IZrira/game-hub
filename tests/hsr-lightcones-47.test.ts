import { describe, expect, it } from 'vitest';
import { SORTED_LIGHTCONE_DATA } from '../hsr-hub/data/lightcones';

const fixtures = [
  {
    name: '「아하」가 처음 울리는 순간', rarity: 5,
    stats: [[43,26,24],[166,102,92],[283,173,157],[417,255,232],[551,337,306],[685,418,380],[819,500,455],[953,582,529]],
  },
  {
    name: '세상 끝에서 만나자!', rarity: 4,
    stats: [[38,22,18],[148,83,69],[252,141,118],[371,208,174],[490,275,230],[609,342,285],[728,409,341],[847,476,397]],
  },
];

describe('user supplied 4.7 elation lightcones', () => {
  for (const fixture of fixtures) it(`${fixture.name}: retains every growth row and confirmed materials`, () => {
    const matches = SORTED_LIGHTCONE_DATA.filter(cone => cone.name === fixture.name);
    expect(matches).toHaveLength(1);
    const cone = matches[0];
    expect(cone).toMatchObject({ rarity: fixture.rarity, path: '환락', releaseVersion: '4.7', folderName: fixture.name, story: '추후 추가' });
    for (const [index, level] of [1,20,30,40,50,60,70,80].entries()) {
      expect(cone.baseStats?.[`lv${level}`]).toEqual(Object.fromEntries(['기초 HP','기초 공격력','기초 방어력'].map((key,i) => [key,fixture.stats[index][i]])));
    }
    expect(cone.ascensionMaterials?.map(step => step.level)).toEqual([20,30,40,50,60,70,80]);
    expect(cone.ascensionMaterials?.find(step => step.level === 60)?.items).toEqual(expect.arrayContaining([expect.objectContaining({name:'꿈을 그리는 붓',count:'6'})]));
    expect(cone.ascensionMaterials?.[6].items).toEqual(cone.ascensionMaterials?.[5].items);
  });

  it('keeps the five superimposition values and fixed activation conditions', () => {
    const first = SORTED_LIGHTCONE_DATA.find(cone => cone.name === fixtures[0].name)!;
    const second = SORTED_LIGHTCONE_DATA.find(cone => cone.name === fixtures[1].name)!;
    expect(first.skill?.descriptions).toHaveLength(5);
    expect(second.skill?.descriptions).toHaveLength(5);
    for (let rank = 0; rank < 5; rank++) {
      const effect = first.skill!.descriptions![rank];
      expect(effect).toContain(`기본 속도가 ${12+rank*2}pt`);
      expect(effect).toContain(`웃음 포인트를 ${10+rank*2}pt`);
      expect(effect).toContain(`방어력을 ${16+rank*2}%`);
      expect(effect).toContain('다른 단일 아군에게 전투 스킬 발동 시');
      expect(effect).toContain('발동 후 1턴 동안 다시 발동할 수 없으며');
      expect(effect).toContain('이번 전투');
      expect(effect).toContain('중첩할 수 없다');
      expect(second.skill!.descriptions![rank]).toBe(`파티 내 「환락」 운명의 길 캐릭터 1명당 장착한 캐릭터의 치명타 피해가 ${6+rank}% 증가하고, 에이언즈★아하가 필드에 있을 시 장착한 캐릭터의 치명타 피해가 추가로 ${12+rank*2}% 증가한다`);
    }
    expect(first.skill?.description).toBe(first.skill?.descriptions?.[0]);
    expect(second.skill?.description).toBe(second.skill?.descriptions?.[0]);
  });
});
