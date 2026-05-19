import { Character } from '../../../../common-hub/types';

const yaoguang: Character = {
  id: "yaoguang",
  name: "효광",
  folderName: "효광",
  gameId: "hsr",
  attribute: "물리",
  path: "환락",
  rarity: 5,
  affiliation: "선주 「옥궐」",
  briefInfo: "신비롭고 대담하며, 과감하고 변화를 추구하는 행보는 눈이 휘둥그레질 정도다.\n수렵의 「눈」으로 길흉을 꿰뚫어 보고, 하늘의 뜻을 거스를 수 없다는 걸 알면서도 「융도 장군」은 여전히 홀로 위험에 뛰어든다.\n어떻게 이 최악의 점괘를 뒤집고 운명을 바꿀 수 있을까?",
  version: "4.0",
  releaseVersion: "4.0",
  languageNames: "🇰🇷 효광 / 🇺🇸 Yaoguang / 🇨🇳 爻光 / 🇯🇵 爻光 ",
  voiceActors: "🇰🇷 이슬 / 🇺🇸 아브리아나 스래시 / 🇨🇳 친쯔이 / 🇯🇵 하나자와 카나",
  metadata: {
    name: "효광",
    language: "🇰🇷 효광 / 🇺🇸 Yaoguang / 🇨🇳 爻光 / 🇯🇵 爻光 ",
    element: "물리",
    path: "환락",
    rarity: 5,
    affiliation: "선주 「옥궐」",
    cv: "🇰🇷 이슬 / 🇺🇸 아브리아나 스래시 / 🇨🇳 친쯔이 / 🇯🇵 하나자와 카나",
    releaseVersion: "4.0",
    brief: "신비롭고 대담하며, 과감하고 변화를 추구하는 행보는 눈이 휘둥그레질 정도다.\n수렵의 「눈」으로 길흉을 꿰뚫어 보고, 하늘의 뜻을 거스를 수 없다는 걸 알면서도 「융도 장군」은 여전히 홀로 위험에 뛰어든다.\n어떻게 이 최악의 점괘를 뒤집고 운명을 바꿀 수 있을까?"
  },
  baseStats: {
    lv1: { "기초 HP": 169, "기초 공격력": 63, "기초 방어력": 89 },
    lv20: { "기초 HP": 329, "기초 공격력": 124, "기초 방어력": 174 },
    lv30: { "기초 HP": 482, "기초 공격력": 181, "기초 방어력": 254 },
    lv40: { "기초 HP": 634, "기초 공격력": 238, "기초 방어력": 334 },
    lv50: { "기초 HP": 786, "기초 공격력": 295, "기초 방어력": 414 },
    lv60: { "기초 HP": 938, "기초 공격력": 352, "기초 방어력": 495 },
    lv70: { "기초 HP": 1090, "기초 공격력": 409, "기초 방어력": 575 },
    lv80: { "기초 HP": 1242, "기초 공격력": 466, "기초 방어력": 655 },
    speed: 101,
    taunt: 100,
    energy: 180
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "침략 응괴", count: "65", rarity: 4 },
      { name: "천진난만 크레파스", count: "15", rarity: 2 },
      { name: "꿈을 만드는 딥 펜", count: "15", rarity: 3 },
      { name: "꿈을 그리는 붓", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "2,260,000", rarity: 3 },
      { name: "운명의 발자취", count: "6", rarity: 5 },
      { name: "범람을 끊는 침묵", count: "9", rarity: 4 },
      { name: "≪복슬복슬호≫ 수작업 스토리보드", count: "14", rarity: 2 },
      { name: "≪복슬복슬호≫ 연재 기념호", count: "53", rarity: 3 },
      { name: "≪복슬복슬호≫ 소장판 합본", count: "104", rarity: 4 },
      { name: "천진난만 크레파스", count: "33", rarity: 2 },
      { name: "꿈을 만드는 딥 펜", count: "49", rarity: 3 },
      { name: "꿈을 그리는 붓", count: "36", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "공작의 명적, 대결의 기쁨",
      tag: "일반 공격 | 확산",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "약점 격파 단일 10 확산 5",
      spRecovery: "+1",
      description: "지정된 단일 적에게 효광 공격력의 90%만큼 물리 속성 피해를 가하고, 동시에 인접한 목표에게 효광 공격력의 30%만큼 물리 속성 피해를 가한다. 일반 공격이 회복하는 에너지가 30pt로 증가한다",
      icon: "basic_atk_1"
    },
    {
      name: "십방광영, 만법개명",
      tag: "전투 스킬 | 서포트",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "0",
      spRecovery: "-1",
      description: "결계를 펼친다, 지속 시간: 3턴, 자신의 턴이 시작될 때마다 결계 지속 턴 수가 1 감소한다. 결계 지속 시간 동안 모든 아군의 환락도가 효광 환락도의 20%만큼 증가하며, 효광이 일반 공격, 전투 스킬 발동 후 웃음 포인트를 3pt 획득한다",
      icon: "skill_1"
    },
    {
      name: "무지개를 두른 강철 깃, 육효의 길조",
      tag: "필살기 | 강화",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "웃음 포인트를 5pt 획득한다. 아하가 즉시 웃음 포인트 20pt로 고정 집계되는 보너스 턴을 1개 획득하고, 해당 턴은 웃음 포인트를 소모하지 않으며, 모든 아군의 모든 속성 저항 관통을 20% 증가시킨다, 지속 시간: 3턴",
      icon: "ultimate_1"
    },
    {
      name: "세상을 관통하는 천 개의 눈",
      tag: "특성 | 서포트",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "효광이 [훌륭한 솜씨에는 보상을] 보유 시:\n아군이 공격을 발동하면 [만사형통] 효과를 발동하여, 명중한 랜덤 목표 1기에게 추가로 대응하는 속성의 환락 피해를 20% 가하고, 이번 공격에서 전투 스킬 포인트를 소모하면 추가로 [만사형통] 효과를 1회 발동한다.\n[만사형통] 효과 발동 시 공격자의 환락도가 효광보다 낮을 경우 해당 환락 피해는 효광의 환락도를 사용하여 계산한다.\n[만사형통] 효과 발동은 공격으로 간주하지 않는다",
      icon: "talent_1"
    },
    {
      name: "찰나의 빛, 사라진 금기",
      tag: "비술 | 서포트",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "비술 사용 후, 다음 전투 시작 시 자동으로 전투 스킬을 1회 발동하며, 이번 발동은 전투 스킬 포인트를 소모하지 않는다. 효광이 파티에 있을 시, 파괴 가능한 물체를 파괴하면 즉시 「행운의 봉투」를 획득하며, 지구주마다 최대 8개 획득할 수 있다",
      icon: "technique_1"
    },
    {
      name: "그대에게 주는 점괘, 찬란한 광경",
      tag: "환락 스킬 | 범위 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 단일 10 범위 10",
      spRecovery: "0",
      description: "모든 적을 [흉성의 속삭임] 상태에 빠트린다, 지속 시간: 3턴. [흉성의 속삭임] 상태의 적은 받는 피해가 16% 증가한다. 모든 적에게 물리 속성 환락 피해를 100% 가하고, 이후 랜덤 단일 적에게 물리 속성 환락 피해를 20% 5회 가한다",
      icon: "elation_skill_1"
    }
  ],
  additionalAbilities: [
    { name: "펼쳐서 선물 증정", description: "효광의 속도가 120 이상일 시, 자신의 환락도가 30% 증가하고, 이후 속도가 1pt 초과할 때마다 자신의 환락도가 1% 증가한다(초과한 속도는 최대 200pt까지 계산)", icon: "bonus_1" },
    { name: "여유로운 자태, 흡족한 마음", description: "자신의 치명타 피해가 60% 증가하고, 환락 스킬 발동 후 아군의 전투 스킬 포인트를 1pt 회복한다", icon: "bonus_2" },
    { name: "행운 집결", description: "효광이 [훌륭한 솜씨에는 보상을] 획득 시, 지속 시간이 1턴 증가한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "치명타 확률", value: "18.7%", icon: "crit_rate" },
    { type: "속도", value: "9", icon: "spd" },
    { type: "환락도", value: "10%", icon: "joy" }
  ],
  eidolons: [
    { rank: "E01", name: "옥이 떨어지는 곳에 가득한 웃음소리", description: "필살기로 발동하는 아하의 보너스 턴이 고정으로 집계하는 웃음 포인트가 40pt로 증가한다. 모든 아군이 환락 피해를 가할 시 목표의 방어력을 20% 무시한다", icon: "eidolon_1" },
    { rank: "E02", name: "화살의 눈이 된 푸른 깃", description: "결계 지속 시간 동안 모든 아군의 속도가 12% 증가하고, 환락도가 추가로 16% 증가한다", icon: "eidolon_2" },
    { rank: "E03", name: "십방세계, 부적에 비치는 빛", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10. 환락 스킬 레벨+1, 최대 Lv.15", icon: "eidolon_3" },
    { rank: "E04", name: "비단 같은 운명, 깃으로 찍어낸 색채", description: "효광의 필살기로 발동한 아하의 보너스 턴 동안, 모든 아군 캐릭터의 환락 스킬이 가하는 피해가 기존 피해의 150%가 된다", icon: "eidolon_4" },
    { rank: "E05", name: "화려한 장신구, 티 없는 마음", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15. 환락 스킬 레벨+1, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "실의 인도로 드리운 천성의 무지개", description: "모든 아군의 환락 피해가 25% 증소한다. 효광 환락 스킬의 피해 배율이 기존 배율의 100%만큼 증가한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "환락 스킬": "환락 운명의 길 캐릭터가 사용하는 특수한 스킬. 전용 자원이나 기믹을 통해 발동된다.",
    "[만사형통]": "아군이 공격 시 추가로 환락 피해를 가하는 특별한 효과.",
    "[흉성의 속삭임]": "효광의 환락 스킬로 적에게 부여되는 디버프 상태. 적이 받는 피해가 증가한다."
  }
};

export default yaoguang;
