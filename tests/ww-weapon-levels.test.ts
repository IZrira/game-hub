// @vitest-environment node
import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getWwWeaponLevelOptions } from '../ww-hub/utils/weaponLevels';

const weapons = JSON.parse(fs.readFileSync(new URL('../ww-hub/data/generated/weapons.json', import.meta.url), 'utf8'));

describe('WW low-rarity weapon levels', () => {
  it('uses the exact 70-level growth values of 태초의 권갑', () => {
    const weapon = weapons.find((w: { name: string }) => w.name === '태초의 권갑');
    const options = getWwWeaponLevelOptions(weapon);
    expect(options.levels).toEqual([1, 20, 40, 50, 60, 70]);
    expect(options.rows).toEqual([
      { level: 1, atk: 22, subStatValue: '3.3%' },
      { level: 20, atk: 57, subStatValue: '5.9%' },
      { level: 40, atk: 109, subStatValue: '8.4%' },
      { level: 50, atk: 142, subStatValue: '9.7%' },
      { level: 60, atk: 175, subStatValue: '11%' },
      { level: 70, atk: 209, subStatValue: '12.3%' },
    ]);
  });

  it('matches every low-rarity endpoint to the existing source without mutating data', () => {
    const low = weapons.filter((w: { rarity: number }) => w.rarity <= 2);
    expect(low.length).toBeGreaterThan(0);
    const original = JSON.stringify(low);
    for (const weapon of low) {
      const options = getWwWeaponLevelOptions(weapon);
      expect(options.rows, weapon.name).not.toBeNull();
      expect(options.levels.at(-1), weapon.name).toBe(70);
      expect(options.rows!.at(-1)!.atk, weapon.name).toBe(weapon.stats.atk);
      expect(options.rows!.at(-1)!.subStatValue, weapon.name).toBe(weapon.stats.subStatValue);
    }
    expect(JSON.stringify(low)).toBe(original);
  });

  it('preserves the existing 3–5 star calculation path', () => {
    for (const rarity of [3, 4, 5]) {
      expect(getWwWeaponLevelOptions({ rarity, growthStats: '1 : 공격력 1 / 공격력 1%\n70 : 공격력 2 / 공격력 2%' }))
        .toEqual({ levels: [1, 20, 40, 50, 60, 70, 80, 90], rows: null });
    }
  });

  it.each([undefined, '', 'invalid', '70 : 공격력 209 / 공격력 12.3%', '1 : 공격력 22 / 공격력 3.3%\n1 : 공격력 22 / 공격력 3.3%'])('keeps a valid legacy model for unsupported data: %s', growthStats => {
    const result = getWwWeaponLevelOptions({ rarity: 2, growthStats });
    expect(result.rows).toBeNull();
    expect(result.levels).toHaveLength(8);
  });
});
