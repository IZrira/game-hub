
import { Character } from '../../../../common-hub/types';

const bailu: Character = {
  id: "bailu",
  name: "백로",
  folderName: "백로",
  gameId: "hsr",
  attribute: "번개",
  path: "풍요",
  rarity: 5,
  affiliation: "선주 「나부」",
  briefInfo: "선주 「나부」 비디아다라족의 큰어른, 「약을 품은 용왕의 딸」 이라 불리는 의사\n독자적인 의학 이론과 용맥만이 실행할 수 있는 「의료 수단」 으로 생명을 구하고 치료한다",
  version: "1.0",
  releaseVersion: "1.0",
  languageNames: "🇰🇷 백로 / 🇺🇸 Bailu / 🇨🇳 도도poi / 🇯🇵 白露",
  voiceActors: "🇰🇷 조현정 / 🇺🇸 수 링 찬 / 🇨🇳 도도poi / 🇯🇵 카토 에미리",
  metadata: {
    name: "백로",
    language: "🇰🇷 백로 / 🇺🇸 Bailu / 🇨🇳 도도poi / 🇯🇵 白露",
    element: "번개",
    path: "풍요",
    rarity: 5,
    affiliation: "선주 「나부」",
    cv: "🇰🇷 조현정 / 🇺🇸 수 링 찬 / 🇨🇳 도도poi / 🇯🇵 카토 에미리",
    releaseVersion: "1.0",
    brief: "선주 「나부」 비디아다라족의 큰어른, 「약을 품은 용왕의 딸」 이라 불리는 의사\n독자적인 의학 이론과 용맥만이 실행할 수 있는 「의료 수단」 으로 생명을 구하고 치료한다"
  },
  baseStats: {
    lv1: { "기초 HP": 180, "기초 공격력": 77, "기초 방어력": 66 },
    lv20: { "기초 HP": 350, "기초 공격력": 149, "기초 방어력": 129 },
    lv30: { "기초 HP": 512, "기초 공격력": 218, "기초 방어력": 188 },
    lv40: { "기초 HP": 673, "기초 공격력": 287, "기초 방어력": 248 },
    lv50: { "기초 HP": 835, "기초 공격력": 356, "기초 방어력": 307 },
    lv60: { "기초 HP": 996, "기초 공격력": 425, "기초 방어력": 366 },
    lv70: { "기초 HP": 1158, "기초 공격력": 494, "기초 방어력": 426 },
    lv80: { "기초 HP": 1319, "기초 공격력": 563, "기초 방어력": 485 },
    speed: 98,
    taunt: 100,
    energy: 100
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "과거 그림자의 번개 왕관", count: "65", rarity: 4 },
      { name: "소멸된 코어", count: "15", rarity: 2 },
      { name: "희미한 빛의 코어", count: "15", rarity: 3 },
      { name: "꿈틀대는 코어", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "8", rarity: 5 },
      { name: "수호자의 비원(悲願)", count: "12", rarity: 4 },
      { name: "풍요의 씨앗", count: "18", rarity: 2 },
      { name: "생명의 새싹", count: "69", rarity: 3 },
      { name: "영원의 꽃", count: "139", rarity: 4 },
      { name: "소멸된 코어", count: "41", rarity: 2 },
      { name: "희미한 빛의 코어", count: "56", rarity: 3 },
      { name: "꿈틀대는 코어", count: "58", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "보고 듣고 묻고… 아뵤!",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 백로 공격력 100%만큼 번개 속성 피해를 준다.",
      icon: "basic_atk_1"
    },
    {
      name: "구름의 노래 속 떨어지는 이슬",
      tag: "전투 스킬 | 회복",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "0",
      spRecovery: "-1",
      description: "즉시 지정된 단일 아군의 HP를 백로 HP 최대치 11.7%+312만큼 회복한 다음 백로는 랜덤으로 단일 아군을 2회 치유한다. \n1회 치유할 때마다 다음 치유로 회복하는 HP는 15% 감소한다",
      icon: "skill_1"
    },
    {
      name: "천둥이 알리는 교룡의 도약",
      tag: "필살기 | 범위 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "0",
      description: "모든 아군이 백로 HP 최대치 13.5%+360만큼의 HP를 회복한다.\n백로는 [생명] 효과가 없는 아군에게 [생명] 효과를 부여하며, [생명] 효과를 보유한 아군에게는 [생명] 효과 지속 시간을 1턴 늘려준다. [생명] 지속 시간: 2턴. 해당 효과는 중첩될 수 없다",
      icon: "ultimate_1"
    },
    {
      name: "발로 뛰는 구원의 의술",
      tag: "특성 | 회복",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "[생명] 효과를 보유한 아군은 피격 후 백로 HP 최대치의 5.4%+144만큼 회복한다. 해당 효과는 2회 발동할 수 있다.\n백로의 동료는 치명적인 공격을 받아도 전투 불능 상태에 빠지지 않고, 백로가 즉시 대상에게 치유를 제공해 HP를 백로 HP 최대치의 18%+480만큼 회복한다.\n해당 효과는 단일 전투에서 1회 발동할 수 있다.",
      icon: "talent_1"
    },
    {
      name: "빗속을 걷는 자",
      tag: "비술",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "비술 발동 후 다음 전투 시작 시 모든 아군에게 [생명] 효과를 부여한다. 지속 시간: 2턴",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "의술의 이치", description: "백로가 아군에게 초과 치유할 시 대상 HP 최대치가 10% 증가한다. 지속 시간: 2턴", icon: "bonus_1" },
    { name: "비디아다라 용맥", description: "[생명] 효과 발동 횟수가 1회 증가한다", icon: "bonus_2" },
    { name: "인연못 은혜", description: "[생명]을 보유한 캐릭터가 받는 피해가 10% 감소한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "HP", value: "28%", icon: "hp" },
    { type: "방어력", value: "22.5%", icon: "def" },
    { type: "효과 저항", value: "10%", icon: "res" }
  ],
  eidolons: [
    { rank: "E01", name: "맥을 가라앉히는 감로", description: "[생명] 효과 종료 시 아군의 현재 HP가 HP 최대치면, 추가로 해당 아군의 에너지를 8pt 회복한다", icon: "eidolon_1" },
    { rank: "E02", name: "항아리 속 동천에는 운룡이 잠든다", description: "필살기 발동 후 백로의 치유량이 15% 증가한다. 지속 시간: 2턴", icon: "eidolon_2" },
    { rank: "E03", name: "건곤을 깨우치고 통현하다", description: "전투 스킬 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_3" },
    { rank: "E04", name: "눈이 맑아지는 비급", description: "전투 스킬이 제공하는 치유를 받을 때마다 치유를 받는 아군은 가하는 피해가 추가로 10% 증가한다. 최대 중첩수: 3스택. 지속 시간: 2턴", icon: "eidolon_4" },
    { rank: "E05", name: "속세의 먼지를 씻는 단비", description: "필살기 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_5" },
    { rank: "E06", name: "영험한 용의 침방울", description: "백로가 단일 전투에서 치명적인 공격을 받은 아군에게 제공하는 치유 효과 발동 횟수가 1회 증가한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "[생명]": "백로가 아군에게 부여하는 특수 치유 효과. 피격 시 HP를 회복하며 치명적인 피해를 받을 시 전투 불능 상태를 1회 막아준다."
  }
};

export default bailu;
