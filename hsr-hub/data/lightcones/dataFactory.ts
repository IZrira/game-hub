import { LightCone } from '../../../common-hub/types';

/**
 * 광추의 80레벨 기준 기초 스탯 객체를 생성합니다.
 */
export function createLv80Stats(hp: number, atk: number, def: number) {
  return {
    lv80: {
      hp,
      atk,
      def,
      "기초 HP": hp,
      "기초 공격력": atk,
      "기초 방어력": def
    }
  };
}
