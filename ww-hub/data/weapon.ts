export type WuwaWeaponType = '직검' | '대검' | '권총' | '권갑' | '증폭기';

export interface WuwaWeapon {
  id: string;
  name: string;
  rarity: 1 | 2 | 3 | 4 | 5;
  type: WuwaWeaponType;
  releaseVersion?: string;
  obtain?: string;
  stats: {
    atk: number;     // 90레벨 기준 공격력
    subStatName: string; 
    subStatValue: string; // 90레벨 기준 수치
  };
  skill: {
    name: string;
    description: string; // renderRichText 적용 대상
  };
  description: string; // 무기 플레이버 텍스트
}