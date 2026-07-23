/**
 * @fileoverview WW 도메인 전용 데이터 생성 팩토리 유틸리티
 * @description 캐릭터, 무기 등의 반복되는 스탯 및 재료 구조 생성을 최적화하여 하드코딩을 방지합니다.
 */

/**
 * WW 캐릭터 기초 스탯 객체를 생성합니다.
 * @param {number[]} lv1 lv1 기초 HP, 공격력, 방어력 [HP, ATK, DEF]
 * @param {number[]} lv80 lv80 기초 HP, 공격력, 방어력 [HP, ATK, DEF]
 * @param {number} speed 속도 (기본값 100)
 * @returns WW Character BaseStats 객체
 */
/**
 * WW 캐릭터 기초 스탯 객체를 생성합니다.
 * @param {number[][]} levels 각 레벨별 기초 HP, 공격력, 방어력, 조화도 파괴 증폭 [HP, ATK, DEF, BREAK]
 * @returns WW Character BaseStats 객체
 */
export const createWwBaseStats = (...levels: number[][]) => {
  const STEPS = [1, 20, 30, 40, 50, 60, 70, 80, 90];
  const stats: any = {
    speed: 100,
    taunt: 0,
    energy: 0
  };

  levels.forEach((lv, i) => {
    if (i < STEPS.length) {
      stats[`lv${STEPS[i]}`] = {
        "기초 HP": lv[0],
        "기초 공격력": lv[1],
        "기초 방어력": lv[2],
        "조화도 파괴 증폭": lv[3] || 0
      };
    }
  });

  return stats;
};

/**
 * 캐릭터 및 무기의 재료 객체를 생성합니다.
 * @param {string} name 재료 이름
 * @param {string|number} count 필요 수량
 * @param {number} rarity 재료 등급
 * @returns Material 객체
 */
export const createMaterial = (name: string, count: string | number, rarity: number) => ({
  name,
  count: count.toString(),
  rarity
});

/**
 * WW 캐릭터 스킬 객체를 생성합니다.
 * @param {string} name 스킬명 (i18n 키)
 * @param {string} tag 스킬 태그
 * @param {string} description 스킬 설명 (i18n 키)
 * @param {string} icon 스킬 아이콘 식별자
 * @returns WW Skill 객체
 */
export const createWwSkill = (name: string, tag: string, description: string, icon: string) => ({
  name, tag, description, icon
});

/**
 * WW 무기 객체를 생성합니다.
 * @param id 무기 ID
 * @param name 무기명 (i18n 키)
 * @param rarity 레어도
 * @param type 무기 종류
 * @param atk 90레벨 기본 공격력
 * @param subStatName 부옵션 이름
 * @param subStatValue 부옵션 수치
 * @param releaseVersion 출시 버전
 * @returns WuwaWeapon 객체
 */
export const createWwWeapon = (
  id: string,
  name: string,
  rarity: 1 | 2 | 3 | 4 | 5,
  type: '직검' | '대검' | '권총' | '권갑' | '증폭기',
  atk: number,
  subStatName: string,
  subStatValue: string,
  releaseVersion?: string
) => {
  const weaponTypeMapping: Record<string, string> = {
    '직검': 'sw',
    '대검': 'bb',
    '권총': 'pi',
    '권갑': 'ga',
    '증폭기': 're'
  };
  const typeKey = weaponTypeMapping[type] || 'ot';
  const baseKey = `weapon.${typeKey}.${id}`;

  return {
    id,
    name,
    rarity,
    type,
    releaseVersion,
    stats: {
      atk,
      subStatName,
      subStatValue
    },
    skill: {
      name: `${baseKey}.skillName`,
      description: `${baseKey}.skillDescription`
    },
    description: `${baseKey}.description`
  };
};
