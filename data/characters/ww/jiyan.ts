
import { Character } from '../../../types';

const jiyan: Character = {
  id: "jiyan",
  gameId: "ww",
  name: "기염",
  folderName: "Jiyan",
  attribute: "기류",
  weaponType: "대검",
  rarity: 5,
  affiliation: "황룡 (금주)",
  briefInfo: "금주 야귀군의 장군. 청룡의 힘을 빌려 바람을 가르는 강력한 공격을 퍼붓는다. 책임감이 강하고 병사들의 신뢰가 두텁다.",
  releaseVersion: "1.0",
  languageNames: "🇰🇷 기염 / 🇺🇸 Jiyan / 🇨🇳 忌炎 / 🇯🇵 忌炎",
  voiceActors: "🇰🇷 표영재 / 🇺🇸 알렉스 조던 / 🇨🇳 쑨예 / 🇯🇵 오노 유우키",
  baseStats: {
    lv1: { "기초 HP": 450, "기초 공격력": 45, "기초 방어력": 38 },
    lv20: { "기초 HP": 1200, "기초 공격력": 120, "기초 방어력": 95 },
    lv30: { "기초 HP": 2350, "기초 공격력": 185, "기초 방어력": 135 },
    lv40: { "기초 HP": 3500, "기초 공격력": 240, "기초 방어력": 180 },
    lv50: { "기초 HP": 4850, "기초 공격력": 295, "기초 방어력": 225 },
    lv60: { "기초 HP": 6200, "기초 공격력": 350, "기초 방어력": 265 },
    lv70: { "기초 HP": 7800, "기초 공격력": 385, "기초 방어력": 310 },
    lv80: { "기초 HP": 10500, "기초 공격력": 420, "기초 방어력": 350 },
    speed: 100,
    taunt: 0,
    energy: 0
  },
  materials_v2: {
    ascension: [
      { name: "조개 코인", count: "170,000", rarity: 3 },
      { name: "포효의 강철", count: "46", rarity: 4 },
      { name: "비명을 지르는 코어", count: "60", rarity: 3 }
    ],
    traces: [
      { name: "조개 코인", count: "2,000,000", rarity: 3 },
      { name: "해룡의 비늘", count: "26", rarity: 4 }
    ]
  },
  skills: [
    { name: "삭풍의 칼날", tag: "공명 스킬 | 단일 공격", description: "전방으로 돌진하며 기류 피해를 입힌다.", icon: "skill_1" },
    { name: "청룡의 현신", tag: "공명 해방 | 강화", description: "청룡 상태에 진입하여 모든 공격이 강력한 기류 추가 피해를 입히는 창술로 변한다.", icon: "ultimate_1" },
    { name: "바람을 타는 창", tag: "공명 회로 | 강화", description: "강공격 명중 시 공명 에너지를 획득한다.", icon: "talent_1" }
  ],
  additionalAbilities: [
    { name: "바람의 가호", description: "기류 피해가 15% 증가한다.", icon: "bonus_1" },
    { name: "용의 맹세", description: "치명타 피해가 20% 증가한다.", icon: "bonus_2" }
  ],
  attributeBonuses: [
    { type: "치명타 확률", value: "8.0%", icon: "crit_rate" },
    { type: "공격력", value: "12.0%", icon: "atk" }
  ],
  eidolons: [
    { rank: "R1", name: "바람의 결의", description: "공명 스킬 사용 횟수가 1회 증가한다.", icon: "eidolon_1" },
    { rank: "R2", name: "청룡의 가호", description: "공명 해방 발동 후 공격력이 30% 증가한다.", icon: "eidolon_2" },
    { rank: "R3", name: "폭풍의 눈", description: "공명 스킬 레벨+2.", icon: "eidolon_3" },
    { rank: "R4", name: "용의 꼬리", description: "강공격 피해 보너스가 50% 증가한다.", icon: "eidolon_4" },
    { rank: "R5", name: "하늘을 가르는 창", description: "공명 해방 레벨+2.", icon: "eidolon_5" },
    { rank: "R6", name: "무한한 바람", description: "모든 기류 피해 보너스가 20% 증가한다.", icon: "eidolon_6" }
  ]
};

export default jiyan;
