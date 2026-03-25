import { Character } from '../../../../common-hub/types';

const hyacine: Character = {
  id: "hyacine",
  name: "히아킨",
  folderName: "히아킨",
  gameId: "hsr",
  attribute: "바람",
  path: "기억",
  rarity: 5,
  affiliation: "엠포리어스",
  briefInfo: "구름 속 도시 국가 세월을 따라 분열되었으나, 놀빛 정원은 다시금 문을 열어 영원한 밤에 희미한 빛을 가져다주었다.\n의사 히아킨티아는 「하늘」 불씨를 수호하는 황금의 후예다. 선조의 의지를 계승하여 찢어진 조석을 메꾼다.\n——무지갯빛이 쏟아져 원한을 녹이고, 여명이 대지에 다시 돌아오기를",
  version: "3.3",
  releaseVersion: "3.3",
  languageNames: "🇰🇷 히아킨 / 🇺🇸 Hyacine / 🇨🇳 风堇 / 🇯🇵 ヒアンシー ",
  voiceActors: "🇰🇷 김연우 / 🇺🇸 홀리 얼 / 🇨🇳 징천 / 🇯🇵 요우미야 히나",
  metadata: {
    name: "히아킨",
    language: "🇰🇷 히아킨 / 🇺🇸 Hyacine / 🇨🇳 风堇 / 🇯🇵 ヒアンシー ",
    element: "바람",
    path: "기억",
    rarity: 5,
    affiliation: "엠포리어스",
    cv: "🇰🇷 김연우 / 🇺🇸 홀리 얼 / 🇨🇳 징천 / 🇯🇵 요우미야 히나",
    releaseVersion: "3.3",
    brief: "구름 속 도시 국가 세월을 따라 분열되었으나, 놀빛 정원은 다시금 문을 열어 영원한 밤에 희미한 빛을 가져다주었다.\n의사 히아킨티아는 「하늘」 불씨를 수호하는 황금의 후예다. 선조의 의지를 계승하여 찢어진 조석을 메꾼다.\n——무지갯빛이 쏟아져 원한을 녹이고, 여명이 대지에 다시 돌아오기를"
  },
  baseStats: {
    lv1: { "기초 HP": 148, "기초 공격력": 53, "기초 방어력": 86 },
    lv20: { "기초 HP": 288, "기초 공격력": 103, "기초 방어력": 167 },
    lv30: { "기초 HP": 421, "기초 공격력": 151, "기초 방어력": 245 },
    lv40: { "기초 HP": 554, "기초 공격력": 198, "기초 방어력": 322 },
    lv50: { "기초 HP": 687, "기초 공격력": 246, "기초 방어력": 399 },
    lv60: { "기초 HP": 821, "기초 공격력": 293, "기초 방어력": 476 },
    lv70: { "기초 HP": 954, "기초 공격력": 341, "기초 방어력": 553 },
    lv80: { "기초 HP": 1087, "기초 공격력": 388, "기초 방어력": 631 },
    speed: 110,
    taunt: 100,
    energy: 140
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "만취의 시대 한잔", count: "65", rarity: 4 },
      { name: "공포에 짓밟힌 육신", count: "15", rarity: 2 },
      { name: "용기에 찢긴 가슴", count: "15", rarity: 3 },
      { name: "영광의 세례를 받은 육신", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "8", rarity: 5 },
      { name: "공동의 염원의 유음", count: "12", rarity: 4 },
      { name: "사량의 씨앗", count: "18", rarity: 2 },
      { name: "말나 새싹", count: "69", rarity: 3 },
      { name: "아뢰야 꽃", count: "139", rarity: 4 },
      { name: "공포에 짓밟힌 육신", count: "41", rarity: 2 },
      { name: "용기에 찢긴 가슴", count: "56", rarity: 3 },
      { name: "영광의 세례를 받은 육신", count: "58", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "산들바람이 구름을 스치는 순간",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 히아킨 HP 최대치의 50%만큼 바람 속성 피해를 가한다",
      icon: "basic_atk_1"
    },
    {
      name: "무지갯빛이 쏟아질 때의 사랑",
      tag: "전투 스킬 | 회복",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "0",
      spRecovery: "-1",
      description: "기억 정령 이카를 소환하며, 이카를 제외한 모든 아군의 HP를 히아킨 HP 최대치의 8%+160만큼 회복하고, 이카의 HP를 히아킨 HP 최대치의 10%+200만큼 회복한다",
      icon: "skill_1"
    },
    {
      name: "조석 속으로 날아가는 우리",
      tag: "필살기 | 서포트",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "기억 정령 이카를 소환하며, 이카를 제외한 모든 아군의 HP를 히아킨 HP 최대치의 10%+200만큼 회복하고, 이카의 HP를 히아킨 HP 최대치의 12%+240만큼 회복한다. 히아킨이 [비 온 뒤 맑음] 상태에 진입한다, 지속 시간: 3턴. 히아킨의 턴이 시작될 때마다 지속 턴 수가 1 감소한다. [비 온 뒤 맑음] 상태일 시 모든 아군의 HP 최대치가 30%+600pt 증가한다",
      icon: "ultimate_1"
    },
    {
      name: "세상을 치유하는 아침햇살",
      tag: "특성 | 강화",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "기억 정령 이카는 기본 상태에서 히아킨 HP 최대치의 50%만큼 HP를 보유한다. 히아킨 또는 이카가 치유 제공 시 이카가 가하는 피해가 80% 증가한다, 지속 시간: 2턴, 최대 중첩수: 3스택",
      icon: "talent_1"
    },
    {
      name: "날씨 좋고, 모든 게 귀엽고!",
      tag: "비술",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "다음 전투 시작 시 모든 아군이 히아킨 HP 최대치의 30%+600만큼 HP를 회복하고, HP 최대치가 20% 증가한다, 지속 시간: 2턴",
      icon: "technique_1"
    },
    {
      name: "이카",
      tag: "기억 정령 | 정보",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "",
      icon: "memo"
    },
    {
      name: "먹구름, 저리 가!",
      tag: "기억 정령 스킬 | 범위 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 범위 10",
      spRecovery: "0",
      description: "모든 적에게 이번 전투 중 히아킨과 이카 누적 치유 수치의 20%만큼 바람 속성 피해를 가하고, 누적 치유 수치의 50%를 초기화한다",
      icon: "memo_skill_1"
    },
    {
      name: "맑은 하늘의 손을 잡고",
      tag: "기억 정령 특성 | 회복",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "이카의 속도가 0으로 유지되고 디버프 효과에 면역되며, 행동 서열에 나타나지 않는다.\n이카를 제외한 아군의 HP가 감소하면, 이카는 임의 목표의 턴 시작 시 또는 행동 후 자신의 HP 최대치의 4%만큼 HP를 소모하고, HP가 감소한 아군의 HP를 히아킨 HP 최대치의 2%+20만큼 회복시킨다.\n히아킨이 [비 온 뒤 맑음] 상태일 시 이카는 히아킨이 스킬을 발동한 후 즉시 보너스 턴을 1개 획득하고 자동으로 [먹구름, 저리 가!]를 발동하며, 이카가 특성의 치유 효과 발동 시 추가로 모든 아군의 HP를 히아킨 HP 최대치의 2%+20만큼 회복시킨다. 이카가 스킬을 발동하면 자신의 모든 지속 효과 지속 턴 수가 1 감소한다",
      icon: "memo_talent_1"
    },
    {
      name: "날개를 펼쳐, 태양을 향해",
      tag: "기억 정령 특성 | 강화",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "소환될 시 히아킨의 에너지를 15pt 회복한다. 처음으로 소환될 시 추가로 에너지를 30pt 회복한다",
      icon: "memo_talent_1"
    },
    {
      name: "",
      tag: "기억 정령 특성 | 강화",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "사라질 시 히아킨의 행동 게이지가 30% 증가한다",
      icon: "memo_talent_1"
    }
  ],
  additionalAbilities: [
    { name: "미소 짓는 먹구름", description: "히아킨과 이카의 치명타 확률이 100% 증가한다. 현재 HP가 자신의 HP 최대치의 50% 이하인 아군에게 치유 제공 시, 히아킨과 이카의 치유량이 25% 증가한다", icon: "bonus_1" },
    { name: "부드러운 뇌우", description: "히아킨의 효과 저항이 50% 증가한다. 전투 스킬과 필살기 발동 시 모든 아군의 디버프 효과를 1개 해제한다", icon: "bonus_2" },
    { name: "잔잔해진 폭풍", description: "히아킨의 속도가 200보다 높을 시 히아킨과 이카의 HP 최대치가 20% 증가하고, 이후 속도가 1pt 초과할 때마다 히아킨과 이카가 제공하는 치유량이 1% 증가한다. 초과한 속도는 최대 200pt까지 계산된다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "속도", value: "14", icon: "spd" },
    { type: "효과 저항", value: "18%", icon: "res" },
    { type: "HP", value: "10%", icon: "hp" }
  ],
  eidolons: [
    { rank: "E01", name: "어두운 밤의 촛불을 지키며", description: "히아킨이 [비 온 뒤 맑음] 상태일 시 모든 아군의 HP 최대치가 추가로 50% 증가하고, 공격 발동 후 즉시 히아킨 HP 최대치의 8%만큼 HP를 회복한다", icon: "eidolon_1" },
    { rank: "E02", name: "제 정원에 앉았다 가세요", description: "아군의 HP가 감소하면 속도가 30% 증가한다, 지속 시간: 2턴", icon: "eidolon_2" },
    { rank: "E03", name: "출발! 태양을 향한 모험", description: "필살기 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10. 기억 정령 스킬 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "햇빛 호박을 그대에게", description: "행적 [잔잔해진 폭풍]이 강화된다. 속도가 1pt 초과할 때마다 히아킨과 이카의 치명타 피해가 추가로 2% 증가한다", icon: "eidolon_4" },
    { rank: "E05", name: "바다의 뒷면에 비치는 붉은 노을", description: "전투 스킬 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15. 기억 정령 특성 레벨+1, 최대 Lv.10", icon: "eidolon_5" },
    { rank: "E06", name: "하늘이… 나의 기도에 응답하리", description: "이카가 기억 정령 스킬을 발동하고 초기화되는 누적 치유 수치가 12%로 변경된다. 이카가 필드에 있을 시 모든 아군의 모든 속성 저항 관통이 20% 증가한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "기억 정령": "기억의 운명의 길 캐릭터가 소환하는 독립적인 개체. 자체적인 속도와 스킬을 보유하고 행동 서열에 등록되어 행동한다.",
    "보너스 턴": "일반적인 턴 순서와 상관없이 즉시 행동할 수 있는 추가 턴을 획득한다.",
    "행동 게이지 증가": "행동 게이지가 일정 비율 증가하여 행동 순서가 앞당겨진다.",
    "디버프 효과": "전투 중 디버프 효과가 있는 모든 지속 상태는 특별 설명이 없다면 해제할 수 있다.",
    "[비 온 뒤 맑음]": "히아킨이 필살기 발동 시 진입하는 상태. 모든 아군의 HP 최대치가 증가한다."
  }
};

export default hyacine;
