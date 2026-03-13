
import { Character } from '../../../types';

const march7thHunt: Character = {
  id: "march_7th_hunt",
  gameId: "hsr",
  name: "Mar. 7th (수렵)",
  folderName: "Mar. 7th (수렵)",
  attribute: "허수",
  path: "수렵",
  rarity: 4,
  affiliation: "은하열차",
  briefInfo: "선주 의상을 입은 Mar. 7th. 검을 든 무협 소녀다.\n운리와 연경의 가르침을 받고 선주에서 좋은 「기억」을 더 많이 남길 생각에 의욕이 넘친다",
  version: "2.4",
  releaseVersion: "2.4",
  languageNames: "🇰🇷 Mar. 7th / 🇺🇸 March 7th / 🇨🇳 三月七 / 🇯🇵 三月なのか",
  voiceActors: "🇰🇷 정혜원 / 🇺🇸 스카일러 데이븐포트 / 🇨🇳 노아 / 🇯🇵 오구라 유이",
  metadata: {
    name: "Mar. 7th (수렵)",
    language: "🇰🇷 Mar. 7th / 🇺🇸 March 7th / 🇨🇳 三月七 / 🇯🇵 三月なのか",
    element: "허수",
    path: "수렵",
    rarity: 4,
    affiliation: "은하열차",
    cv: "🇰🇷 정혜원 / 🇺🇸 스카일러 데이븐포트 / 🇨🇳 노아 / 🇯🇵 오구라 유이",
    releaseVersion: "2.4",
    brief: "선주 의상을 입은 Mar. 7th. 검을 든 무협 소녀다.\n운리와 연경의 가르침을 받고 선주에서 좋은 「기억」을 더 많이 남길 생각에 의욕이 넘친다"
  },
  baseStats: {
    lv1: { "기초 HP": 144, "기초 공격력": 77, "기초 방어력": 60 },
    lv20: { "기초 HP": 281, "기초 공격력": 150, "기초 방어력": 117 },
    lv30: { "기초 HP": 410, "기초 공격력": 219, "기초 방어력": 171 },
    lv40: { "기초 HP": 540, "기초 공격력": 288, "기초 방어력": 225 },
    lv50: { "기초 HP": 670, "기초 공격력": 357, "기초 방어력": 279 },
    lv60: { "기초 HP": 799, "기초 공격력": 426, "기초 방어력": 333 },
    lv70: { "기초 HP": 929, "기초 공격력": 495, "기초 방어력": 387 },
    lv80: { "기초 HP": 1058, "기초 공격력": 564, "기초 방어력": 441 },
    speed: 102,
    taunt: 75,
    energy: 110
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "눈보라의 뿔", count: "50", rarity: 4 },
      { name: "약탈의 본능", count: "12", rarity: 2 },
      { name: "변조된 야망", count: "13", rarity: 3 },
      { name: "짓밟힌 의지", count: "12", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "5", rarity: 5 },
      { name: "파멸자의 말로", count: "12", rarity: 4 },
      { name: "운철 탄환", count: "12", rarity: 2 },
      { name: "숙명적인 사인", count: "54", rarity: 3 },
      { name: "시간을 역행하는 일격", count: "105", rarity: 4 },
      { name: "약탈의 본능", count: "28", rarity: 2 },
      { name: "변조된 야망", count: "42", rarity: 3 },
      { name: "짓밟힌 의지", count: "42", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "요사를 씻어내는 유리검",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 Mar. 7th 공격력의 100%만큼 허수 속성 피해를 가하고, 충전을 1pt 획득한다",
      icon: "basic_atk_1"
    },
    {
      name: "일격에 미간, 이격에 심장",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "약점 격파 단일 공격 5",
      spRecovery: "0",
      description: "기본 상태에서 3단 피해를 가한다. 단수마다 지정된 단일 적에게 Mar. 7th 공격력의 80%만큼 허수 속성 피해를 가한다.\n마지막 1단 피해를 가할 때마다 60%의 고정 확률로 다시 1단 피해를 가하고, 추가로 최대 3단 피해를 가한다.\n강화된 일반 공격을 발동해 회복하는 에너지는 단수에 따라 증가하지 않는다. 강화된 일반 공격은 전투 스킬 포인트를 회복할 수 없다",
      icon: "basic_atk_2"
    },
    {
      name: "사부, 차 마셔!",
      tag: "전투 스킬 | 서포트",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "0",
      spRecovery: "-1",
      description: "자신 이외의 지정된 단일 아군을 [사부]로 만들고, [사부]의 속도가 10% 증가한다.\n최근 전투 스킬의 대상이 된 아군만이 Mar. 7th의 [사부]로 간주된다.\n일반 공격을 발동하거나 강화된 일반 공격 피해를 1단 가할 시, 필드 위에 지정된 운명의 길의 [사부]가 존재하면 상응하는 효과를 발동한다.\n「지식」, 「파멸」, 「수렵」: [사부] 속성에 따른 추가 피해를 Mar. 7th 공격력의 20%만큼 추가로 가한다.\n「화합」, 「공허」, 「보존」, 「풍요」: 이번 피해의 강인성 감소 수치가 100% 증가한다",
      icon: "skill_1"
    },
    {
      name: "절세의 여협, Mar. 7th",
      tag: "필살기 | 단일 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 단일 공격 30",
      description: "지정된 단일 적에게 Mar. 7th 공격력의 240% 만큼 허수 속성 피해를 가한다.\n다음번 강화된 일반 공격의 기본 상태 단수가 2단 증가하고, 추가로 피해를 가할 고정 확률이 20% 증가한다",
      icon: "ultimate_1"
    },
    {
      name: "사부, 나 깨달았어!",
      tag: "특성 | 강화",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "0",
      description: "[사부]가 공격 또는 필살기 발동 후 Mar. 7th가 매번 충전을 최대 1pt 획득한다.\n충전이 7pt 이상일 시 Mar. 7th가 즉시 행동하고 가하는 피해가 80% 증가하며, 일반 공격이 강화되고 전투 스킬을 발동할 수 없다.\n강화된 일반 공격 발동 후 충전을 7pt 소모한다. 충전 상한: 10pt",
      icon: "talent_1"
    },
    {
      name: "운기화삼찬",
      tag: "비술",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "Mar. 7th가 파티에 있으면 동료가 비술을 1회 발동할 때마다 다음번 전투 시작 시 Mar. 7th는 충전을 1pt 획득한다. 최대 3pt 획득한다.\n비술 사용 후 다음번 전투 시작 시 Mar. 7th가 에너지를 30pt 회복한다",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "경홍", description: "전투 시작 시 Mar. 7th의 행동 게이지가 25% 증가한다", icon: "bonus_1" },
    { name: "영롱", description: "Mar. 7th는 [사부] 속성 약점을 보유한 적의 강인성을 소모할 수 있다. 약점 격파 시 허수 속성의 약점 격파를 발동한다", icon: "bonus_2" },
    { name: "파랑", description: "강화된 일반 공격 발동 후 [사부]의 치명타 피해가 60% 증가하고, 격파 특수효과가 36% 증가한다. 지속 시간: 2턴", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "공격력", value: "28%", icon: "atk" },
    { type: "치명타 피해", value: "24%", icon: "crit_dmg" },
    { type: "방어력", value: "12.5%", icon: "def" }
  ],
  eidolons: [
    { rank: "E01", name: "별처럼 빛나는 초화의 검광", description: "필드 위에 [사부]가 있을 시 Mar. 7th의 속도가 10% 증가한다", icon: "eidolon_1" },
    { rank: "E02", name: "파도처럼 춤추는 백설검", description: "[사부]가 일반 공격 또는 전투 스킬을 발동해 적을 공격할 때마다 Mar. 7th가 즉시 추가 공격을 발동하고, 이번 공격의 주목표에게 Mar. 7th 공격력의 60%만큼 허수 속성 피해를 가하며, [사부]의 운명의 길에 따라 상응하는 효과를 발동한 후 충전을 1pt 획득한다. 공격 가능한 주목표가 없는 경우 랜덤 단일 적을 공격한다. 해당 효과는 턴마다 최대 1회 발동한다", icon: "eidolon_2" },
    { rank: "E03", name: "영리한 두뇌, 뛰어난 실력", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "물러서지 않는 용봉의 기세", description: "턴 시작 시 에너지를 5pt 회복한다", icon: "eidolon_4" },
    { rank: "E05", name: "훈련은 많이, 단것은 조금", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "천하제일은 바로 이 몸", description: "필살기 발동 후 다음번 강화된 일반 공격이 가하는 치명타 피해가 50% 증가한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "행동 게이지 증가": "행동 게이지가 25% 증가하여 행동 순서가 앞당겨진다.",
    "즉시 행동": "행동 게이지가 100% 증가하여 즉시 턴을 획득한다.",
    "고정 확률": "어떤 요인에도 영향을 받지 않는 고정 확률이다.",
    "[사부]": "Mar. 7th (수렵)의 전투 스킬로 지정된 단일 아군. 사부의 운명의 길에 따라 추가 효과가 발동된다.",
    "추가 공격": "조건을 만족하면 자동으로 발동되는 효과. 목표에게 추가로 공격을 1회 발동한다."
  }
};

export default march7thHunt;
