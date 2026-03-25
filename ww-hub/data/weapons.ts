import { LightCone } from '../../common-hub/types';

export const WEAPON_DATA: LightCone[] = [
  {
    id: "ww_weapon_jiyan",
    gameId: "ww",
    name: "천년의 풍경",
    folderName: "천년의 풍경",
    rarity: 5,
    weaponType: "대검",
    baseStats: {
      lv80: {
        "공격력": 587,
        "HP": 0,
        "방어력": 0
      }
    },
    skill: {
      name: "바람의 맹세",
      description: "공격력이 12% 증가한다. 공명 스킬 발동 시, 공명 해방 피해가 48% 증가한다. 지속 시간: 8초."
    },
    story: "기염의 전용 무기. 수많은 전장을 누비며 다듬어진 대검."
  }
];
