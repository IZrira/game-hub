
import { Character } from '../../../types';

const moze: Character = {
  id: "moze",
  gameId: "hsr",
  name: "맥택",
  folderName: "맥택",
  attribute: "번개",
  path: "수렵",
  rarity: 4,
  affiliation: "선주 「요청」",
  briefInfo: "선주 「요청」의 그림자 호위, 과묵하고 홀로 움직인다.정보에 관한 일과 공개적으로 처리할 수 없는 일을 전담하며, 사람들 앞에 모습을 드러내는 일이 드물다.\n맥택이 칼끝을 드러내는 순간, 적에게는 죽음의 시간이 임박한 것이다.암살 수단이 다양하고, 청결과 정리 정돈에 대해 남다른 집착을 보인다",
  version: "2.5",
  releaseVersion: "2.5",
  languageNames: "🇰🇷 맥택 / 🇺🇸 Moze / 🇨🇳 貊泽 / 🇯🇵 モゼ",
  voiceActors: "🇰🇷 최현식 / 🇺🇸 벤 발마세다 / 🇨🇳 황진쩌 / 🇯🇵 사카타 쇼고",
  metadata: {
    name: "맥택",
    language: "🇰🇷 맥택 / 🇺🇸 Moze / 🇨🇳 貊泽 / 🇯🇵 モゼ",
    element: "번개",
    path: "수렵",
    rarity: 4,
    affiliation: "선주 「요청」",
    cv: "🇰🇷 최현식 / 🇺🇸 벤 발마세다 / 🇨🇳 황진쩌 / 🇯🇵 사카타 쇼고",
    releaseVersion: "2.5",
    brief: "선주 「요청」의 그림자 호위, 과묵하고 홀로 움직인다.정보에 관한 일과 공개적으로 처리할 수 없는 일을 전담하며, 사람들 앞에 모습을 드러내는 일이 드물다.\n맥택이 칼끝을 드러내는 순간, 적에게는 죽음의 시간이 임박한 것이다.암살 수단이 다양하고, 청결과 정리 정돈에 대해 남다른 집착을 보인다"
  },
  baseStats: {
    lv1: { "기초 HP": 110, "기초 공격력": 82, "기초 방어력": 48 },
    lv20: { "기초 HP": 215, "기초 공격력": 159, "기초 방어력": 94 },
    lv30: { "기초 HP": 315, "기초 공격력": 233, "기초 방어력": 137 },
    lv40: { "기초 HP": 414, "기초 공격력": 306, "기초 방어력": 180 },
    lv50: { "기초 HP": 513, "기초 공격력": 379, "기초 방어력": 223 },
    lv60: { "기초 HP": 613, "기초 공격력": 453, "기초 방어력": 266 },
    lv70: { "기초 HP": 712, "기초 공격력": 526, "기초 방어력": 310 },
    lv80: { "기초 HP": 811, "기초 공격력": 600, "기초 방어력": 353 },
    speed: 111,
    taunt: 75,
    energy: 120
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "수관(獸棺)의 못", count: "50", rarity: 4 },
      { name: "공조 기계 부품", count: "12", rarity: 2 },
      { name: "공조 톱니바퀴", count: "13", rarity: 3 },
      { name: "공조 환류 심장", count: "12", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "5", rarity: 5 },
      { name: "길광편우", count: "12", rarity: 4 },
      { name: "운철 탄환", count: "12", rarity: 2 },
      { name: "숙명적인 사인", count: "54", rarity: 3 },
      { name: "시간을 역행하는 일격", count: "105", rarity: 4 },
      { name: "공조 기계 부품", count: "28", rarity: 2 },
      { name: "공조 톱니바퀴", count: "42", rarity: 3 },
      { name: "공조 환류 심장", count: "42", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "암기 투척",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 맥택 공격력의 100%만큼 번개 속성 피해를 가한다",
      icon: "basic_atk_1"
    },
    {
      name: "맹속 기습",
      tag: "전투 스킬 | 단일 공격",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "약점 격파 단일 공격 20",
      spRecovery: "-1",
      description: "지정된 단일 적을 [사냥감]으로 만들고 해당 목표에게 맥택 공격력의 150%만큼 번개 속성 피해를 가하며, 충전을 9pt 획득한다.\n필드 위에 전투 가능한 다른 캐릭터가 없을 시 맥택은 전투 스킬을 사용할 수 없으며, 적의 [사냥감] 상태는 해제된다",
      icon: "skill_1"
    },
    {
      name: "날렵한 예기, 맹렬한 그림자",
      tag: "필살기 | 단일 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 단일 공격 30",
      description: "지정된 단일 적에게 맥택 공격력의 270%만큼 번개 속성 피해를 가하고, 해당 목표에게 특성의 추가 공격을 발동한다.\n이번 추가 공격 발동 전에 목표가 처치됐을 경우 랜덤 단일 적에게 추가 공격을 발동한다",
      icon: "ultimate_1"
    },
    {
      name: "깃을 꺾어 완성한 칼날",
      tag: "특성 | 단일 공격",
      energyRegen: "에너지 회복 10",
      toughnessDMG: "약점 격파 단일 공격 10",
      description: "필드 위에 [사냥감]이 있을 시 맥택이 퇴장 상태에 진입한다.\n아군이 [사냥감]을 공격하면 맥택은 추가로 자신의 공격력의 30%만큼 번개 속성 추가 피해를 1회 가하고, 충전을 1pt 소모한다.\n충전을 3pt 소모할 때마다 맥택이 [사냥감]에게 추가 공격을 1회 발동하며, 자신의 공격력의 160%만큼 번개 속성 피해를 가한다.\n충전이 0일 시 목표의 [사냥감] 상태를 해제하고,추가 공격발동에 필요한 충전 포인트 계산을 초기화한다. 특성의추가 공격은 충전을 소모하지 않는다",
      icon: "talent_1"
    },
    {
      name: "은닉한 날개",
      tag: "비술",
      energyRegen: "0",
      toughnessDMG: "약점 격파 단일 공격 20",
      description: "비술 사용 후 20초 동안 지속되는 은신 상태에 진입한다. \n은신 상태에선 적에게 들키지 않으며, 맥택이 은신 상태에서 적을 공격해 전투에 진입할 시 피해가 30% 증가한다, 지속 시간: 2턴",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "수묵자객", description: "특성의 추가 공격 발동 후 전투 스킬 포인트 1pt 회복한다. 해당 효과는 1턴 후 다시 발동할 수 있다.", icon: "bonus_1" },
    { name: "비수를 쥔 손", description: "맥택이 퇴장 상태 해제 시 행동 게이지가 20% 증가한다. 웨이브가 시작될 때마다 맥택의 행동 게이지가 30% 증가한다.", icon: "bonus_2" },
    { name: "올곧은 복수심", description: "필살기를 발동해 피해를 가할 시 추가 공격을 발동한 것으로 간주한다. [사냥감]이 받는 추가 공격 피해가 25% 증가한다.", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "치명타 피해", value: "37.3%", icon: "crit_dmg" },
    { type: "공격력", value: "18%", icon: "atk" },
    { type: "HP", value: "10%", icon: "hp" }
  ],
  eidolons: [
    { rank: "E01", name: "다짐", description: "전투 진입 후 맥택은 에너지를 20pt 회복한다. 특성의 추가 피해를 1회 발동할 때마다 맥택은 에너지를 2pt 회복한다", icon: "eidolon_1" },
    { rank: "E02", name: "정벌", description: "모든 아군이 [사냥감]이 된 적에게 피해를 가할 시 치명타 피해가 40% 증가한다", icon: "eidolon_2" },
    { rank: "E03", name: "추격", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_3" },
    { rank: "E04", name: "은폐", description: "필살기 발동 시 맥택이 가하는 피해가 30% 증가한다. 지속 시간: 2턴", icon: "eidolon_4" },
    { rank: "E05", name: "기만", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_5" },
    { rank: "E06", name: "단심", description: "특성의 추가 공격 피해 배율이 25% 증가한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "행동 게이지 증가": "행동 게이지가 일정 비율 증가하여 행동 순서가 앞당겨진다.",
    "[사냥감]": "맥택의 전투 스킬로 지정된 목표 상태.",
    "추가 공격": "조건을 만족하면 자동으로 발동되는 효과. 목표에게 추가로 공격을 발동한다."
  }
};

export default moze;
