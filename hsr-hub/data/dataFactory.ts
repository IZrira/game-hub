import { HsrLightConeStat } from '../types';

/**
 * @fileoverview HSR 도메인 전용 데이터 생성 팩토리 유틸리티
 * @description 캐릭터, 광추 등의 반복되는 스탯 및 재료 구조 생성을 최적화하여 하드코딩을 방지합니다.
 */

/**
 * 레벨별 HSR 기초 스탯 객체를 생성합니다.
 * @param hp lv1 ~ lv80 까지의 기초 HP 배열 (크기 8)
 * @param atk lv1 ~ lv80 까지의 기초 공격력 배열 (크기 8)
 * @param def lv1 ~ lv80 까지의 기초 방어력 배열 (크기 8)
 * @returns HSR Character/Lightcone BaseStats 객체
 */
export const createHsrBaseStats = (
  hp: number[], atk: number[], def: number[], speed: number, taunt: number, energy: number
) => ({
  lv1: { "기초 HP": hp[0], "기초 공격력": atk[0], "기초 방어력": def[0] },
  lv20: { "기초 HP": hp[1], "기초 공격력": atk[1], "기초 방어력": def[1] },
  lv30: { "기초 HP": hp[2], "기초 공격력": atk[2], "기초 방어력": def[2] },
  lv40: { "기초 HP": hp[3], "기초 공격력": atk[3], "기초 방어력": def[3] },
  lv50: { "기초 HP": hp[4], "기초 공격력": atk[4], "기초 방어력": def[4] },
  lv60: { "기초 HP": hp[5], "기초 공격력": atk[5], "기초 방어력": def[5] },
  lv70: { "기초 HP": hp[6], "기초 공격력": atk[6], "기초 방어력": def[6] },
  lv80: { "기초 HP": hp[7], "기초 공격력": atk[7], "기초 방어력": def[7] },
  speed, taunt, energy
});

/**
 * 레벨 80 기준의 단일 기초 스탯 객체를 생성합니다.
 * @param {number} hp 기초 HP
 * @param {number} atk 기초 공격력
 * @param {number} def 기초 방어력
 * @returns {Object} 단일 레벨 스탯 객체
 */
export const createLv80Stats = (hp: number, atk: number, def: number) => ({
  lv80: { "기초 HP": hp, "기초 공격력": atk, "기초 방어력": def }
});

/**
 * 전 스텝(1, 20, 30, 40, 50, 60, 70, 80) 기초 스탯 객체를 생성합니다.
 * 두 가지 형식을 지원합니다:
 * 1. 단일 인수: HsrLightConeStat 객체 배열 (추천)
 * 2. 세 개 인수: HP, 공격력, 방어력 각각의 숫자 배열 (레거시)
 */
export function createDetailedBaseStats(statsArr: HsrLightConeStat[]): any;
export function createDetailedBaseStats(hpArr: number[], atkArr: number[], defArr: number[]): any;
export function createDetailedBaseStats(arg1: any, arg2?: any, arg3?: any): any {
  // 단일 배열 인수 (HsrLightConeStat[]) 처리
  if (Array.isArray(arg1) && arg1.length > 0 && typeof arg1[0] === 'object' && '기초 HP' in arg1[0]) {
    const s = arg1 as HsrLightConeStat[];
    return {
      lv1: s[0],
      lv20: s[1],
      lv30: s[2],
      lv40: s[3],
      lv50: s[4],
      lv60: s[5],
      lv70: s[6],
      lv80: s[7],
    };
  }

  // 레거시 3배열 인수 (hp[], atk[], def[]) 처리
  if (Array.isArray(arg1) && Array.isArray(arg2) && Array.isArray(arg3)) {
    return {
      lv1: { "기초 HP": arg1[0], "기초 공격력": arg2[0], "기초 방어력": arg3[0] },
      lv20: { "기초 HP": arg1[1], "기초 공격력": arg2[1], "기초 방어력": arg3[1] },
      lv30: { "기초 HP": arg1[2], "기초 공격력": arg2[2], "기초 방어력": arg3[2] },
      lv40: { "기초 HP": arg1[3], "기초 공격력": arg2[3], "기초 방어력": arg3[3] },
      lv50: { "기초 HP": arg1[4], "기초 공격력": arg2[4], "기초 방어력": arg3[4] },
      lv60: { "기초 HP": arg1[5], "기초 공격력": arg2[5], "기초 방어력": arg3[5] },
      lv70: { "기초 HP": arg1[6], "기초 공격력": arg2[6], "기초 방어력": arg3[6] },
      lv80: { "기초 HP": arg1[7], "기초 공격력": arg2[7], "기초 방어력": arg3[7] },
    };
  }

  throw new Error('createDetailedBaseStats: Invalid arguments provided.');
}

/**
 * 캐릭터 및 광추의 재료 객체를 생성합니다.
 * @param {string} name 재료 이름
 * @param {string|number} count 필요 수량
 * @param {number} rarity 재료 등급 (별 갯수)
 * @returns {Object} Material 객체
 */
export const createMaterial = (name: string, count: string | number, rarity: number) => ({
  name,
  count: count.toString(),
  rarity
});

/**
 * HSR 캐릭터 스킬 객체를 생성합니다.
 * @param {string} name 스킬명
 * @param {string} tag 스킬 태그 (예: 일반 공격 | 단일 공격)
 * @param {string} energyRegen 에너지 회복량
 * @param {string} toughnessDMG 강인성 피해량
 * @param {string} spRecovery 전투 스킬 포인트 회복량
 * @param {string} description 스킬 설명
 * @param {string} icon 스킬 아이콘 식별자
 * @returns {Object} HSR Skill 객체
 */
export const createSkill = (name: string, tag: string, energyRegen: string, toughnessDMG: string, spRecovery: string, description: string, icon: string) => ({
  name, tag, energyRegen, toughnessDMG, spRecovery, description, icon
});