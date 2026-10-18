// @vitest-environment node
import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getWwWeaponSeo } from '../common-hub/utils/wwWeaponSeo.js';

const weapons = JSON.parse(fs.readFileSync(new URL('../ww-hub/data/generated/weapons.json', import.meta.url), 'utf8'));

describe('WW weapon metadata', () => {
  it.each(['전우의 의리', '태초의 권갑'])('describes the actual %s DB without promising nonexistent recommendations', name => {
    const weapon = weapons.find((item: { name: string }) => item.name === name);
    expect(weapon).toBeTruthy();
    const seo = getWwWeaponSeo(weapon);
    expect(seo.title).toBe(`${name} 상세 정보 및 스탯 | 명조 아카이브`);
    expect(seo.heading).toBe(name);
    expect(seo.description).toBe(`명조 (Wuthering Waves) ${weapon.rarity}성 ${weapon.type} ${name}의 상세 스탯, 무기 스킬, 획득처 및 스토리를 확인하세요.`);
    expect(seo.description).not.toMatch(/완벽|추천|90Lv/);
  });

  it('does not invent a classification when source fields are missing', () => {
    expect(getWwWeaponSeo({ name: '무기' }).description).toBe('명조 (Wuthering Waves) 무기의 상세 스탯, 무기 스킬, 획득처 및 스토리를 확인하세요.');
  });

  it('preserves the translation boundary and source data', () => {
    const weapon = { name: '무기', rarity: 2, type: '권갑' };
    const original = JSON.stringify(weapon);
    const seo = getWwWeaponSeo(weapon, (text: string) => `T(${text})`);
    expect(seo.heading).toBe('T(무기)');
    expect(seo.description).toContain('2T(성) T(권갑) T(무기)');
    expect(JSON.stringify(weapon)).toBe(original);
  });
});
