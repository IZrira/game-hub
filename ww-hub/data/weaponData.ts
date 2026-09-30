import wwWeaponsKo from '../../common-hub/locales/ww/ww_weapons_ko.json';
import generatedWeapons from './generated/weapons.json';
import { WEAPON_DATA } from './weapons';
import type { WuwaWeapon } from './weapon';

type ExtendedWeapon = WuwaWeapon & {
  folderName?: string;
  i18nKey?: string;
  ascensionMaterials?: string;
  growthStats?: string;
  weaponStory?: string;
};

const weaponMap = new Map<string, ExtendedWeapon>();

WEAPON_DATA.forEach(weapon => {
  const resolvedName = (wwWeaponsKo as Record<string, string>)[weapon.name] || weapon.name;
  weaponMap.set(resolvedName, {
    ...weapon,
    name: resolvedName,
    folderName: resolvedName,
    i18nKey: weapon.name
  });
});

(generatedWeapons as ExtendedWeapon[]).forEach(weapon => {
  const key = weapon.name.trim();
  const existing = weaponMap.get(key);
  if (!existing) {
    weaponMap.set(key, weapon);
    return;
  }

  weaponMap.set(key, {
    ...existing,
    ...weapon,
    id: existing.id || weapon.id,
    name: key,
    folderName: key,
    i18nKey: existing.i18nKey,
    rarity: weapon.rarity || existing.rarity,
    type: weapon.type || existing.type,
    releaseVersion: weapon.releaseVersion || existing.releaseVersion,
    obtain: weapon.obtain && weapon.obtain !== '노션 연동' ? weapon.obtain : existing.obtain || weapon.obtain,
    stats: weapon.stats?.atk ? weapon.stats : existing.stats,
    skill: weapon.skill?.name && weapon.skill.name !== '노션 연동 스킬' ? weapon.skill : existing.skill,
    description: weapon.description && !weapon.description.includes('노션에서 연동된') ? weapon.description : existing.description || weapon.description,
    ascensionMaterials: weapon.ascensionMaterials || existing.ascensionMaterials,
    growthStats: weapon.growthStats || existing.growthStats,
    weaponStory: weapon.weaponStory || existing.weaponStory || weapon.description,
    isNotion: true
  });
});

export const WW_WEAPON_DATA = Array.from(weaponMap.values()).sort((a, b) => {
  const versionDiff = Number.parseFloat(b.releaseVersion || '0') - Number.parseFloat(a.releaseVersion || '0');
  if (versionDiff) return versionDiff;
  if (b.rarity !== a.rarity) return b.rarity - a.rarity;
  return a.name.localeCompare(b.name, 'ko-KR');
});
