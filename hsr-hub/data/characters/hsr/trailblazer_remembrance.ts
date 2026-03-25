import { Character } from '../../../../common-hub/types';

const trailblazerRemembrance: Character = {
  id: "trailblazer_remembrance",
  name: "개척자 (기억)",
  folderName: "개척자 (기억)",
  gameId: "hsr",
  attribute: "얼음",
  path: "기억",
  rarity: 5,
  affiliation: "은하열차",
  briefInfo: "은하열차에 탑승한 {F#소녀}{M#소년}.\n스텔라론이 가져온 위기를 해결하기 위해, 은하열차와의 동행을 선택한다",
  version: "3.0",
  releaseVersion: "3.0",
  languageNames: "🇰🇷 개척자 / 🇺🇸 Trailblazer / 🇨🇳 开拓者 / 🇯🇵 開拓者",
  voiceActors: "🇰🇷 김명준 & 김하루 / 🇺🇸 케일럽 옌 & 레이첼 차우 / 🇨🇳 친체거 & 천팅팅 / 🇯🇵 에노키 준야 & 이시카와 유이",
  metadata: {
    name: "개척자 (기억)",
    language: "🇰🇷 개척자 / 🇺🇸 Trailblazer / 🇨🇳 开拓者 / 🇯🇵 開拓者",
    element: "얼음",
    path: "기억",
    rarity: 5,
    affiliation: "은하열차",
    cv: "🇰🇷 김명준 & 김하루 / 🇺🇸 케일럽 옌 & 레이첼 차우 / 🇨🇳 친체거 & 천팅팅 / 🇯🇵 에노키 준야 & 이시카와 유이",
    releaseVersion: "3.0",
    brief: "은하열차에 탑승한 {F#소녀}{M#소년}.\n스텔라론이 가져온 위기를 해결하기 위해, 은하열차와의 동행을 선택한다"
  },
  baseStats: {
    lv1: { "기초 HP": 143, "기초 공격력": 74, "기초 방어력": 86 },
    lv20: { "기초 HP": 278, "기초 공격력": 144, "기초 방어력": 167 },
    lv30: { "기초 HP": 406, "기초 공격력": 211, "기초 방어력": 245 },
    lv40: { "기초 HP": 535, "기초 공격력": 277, "기초 방어력": 322 },
    lv50: { "기초 HP": 663, "기초 공격력": 344, "기초 방어력": 399 },
    lv60: { "기초 HP": 791, "기초 공격력": 410, "기초 방어력": 476 },
    lv70: { "기초 HP": 920, "기초 공격력": 477, "기초 방어력": 553 },
    lv80: { "기초 HP": 1048, "기초 공격력": 543, "기초 방어력": 631 },
    speed: 103,
    taunt: 100,
    energy: 160
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "깊은 별의 외형질", count: "65", rarity: 4 },
      { name: "약탈의 본능", count: "15", rarity: 2 },
      { name: "변조된 야망", count: "15", rarity: 3 },
      { name: "짓밟힌 의지", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "8", rarity: 5 },
      { name: "길광편우", count: "12", rarity: 4 },
      { name: "사량의 씨앗", count: "18", rarity: 2 },
      { name: "말나 새싹", count: "69", rarity: 3 },
      { name: "아뢰야 꽃", count: "139", rarity: 4 },
      { name: "약탈의 본능", count: "41", rarity: 2 },
      { name: "변조된 야망", count: "56", rarity: 3 },
      { name: "짓밟힌 의지", count: "58", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "나한테 맡겨!",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 개척자 공격력의 100%만큼 얼음 속성 피해를 가한다",
      icon: "basic_atk_1"
    },
    {
      name: "내일을, 함께 써내려 가자!",
      tag: "일반 공격 | 범위 공격",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "약점 격파 범위 10",
      spRecovery: "0",
      description: "[서사시]를 1스택 소모하고, 미미가 빠진 모든 제어류 디버프 상태를 해제한다. 개척자와 미미가 연계 공격을 발동하고, 모든 적에게 각각 개척자 공격력의 n%와 미미 공격력의 120%만큼 얼음 속성 피해를 가하며, 이후 미미가 충전을 10% 획득한다",
      icon: "basic_atk_2"
    },
    {
      name: "너로 정했다!",
      tag: "전투 스킬 | 소환",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "0",
      spRecovery: "-1",
      description: "기억 정령 미미를 소환한다. 미미가 필드에 있을 시 미미의 HP를 미미 HP 최대치의 60%만큼 회복하고, 미미가 충전을 10% 획득한다",
      icon: "skill_1"
    },
    {
      name: "가자, 미미!",
      tag: "필살기 | 범위 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 범위 20",
      spRecovery: "0",
      description: "기억 정령 미미를 소환한다. 미미가 충전을 40% 획득하고 모든 적에게 미미 공격력의 240%만큼 얼음 속성 피해를 가한다",
      icon: "ultimate_1"
    },
    {
      name: "만능 파트너",
      tag: "특성 | 강화",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "기억 정령 미미의 기본 속도는 130pt이며, 기본 HP 최대치는 개척자 HP 최대치의 80% + 640이다. 모든 아군이 에너지를 10pt 누적 회복할 때마다 미미가 충전을 1% 획득한다",
      icon: "talent_1"
    },
    {
      name: "되살아난 기억",
      tag: "비술 | 방해",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "비술 사용 후 10초 동안 지속되는 특수 영역을 만든다. 특수 영역 내에 있는 적은 시간 정지 상태에 빠진다. 시간 정지 상태의 적은 움직일 수 없다.\n시간 정지 상태의 적과 전투에 진입하면 모든 적의 행동 게이지가 50% 감소하고, 모든 적에게 개척자 공격력의 100%만큼 얼음 속성 피해를 가한다.\n아군이 만든 영역 효과는 최대 1개만 존재할 수 있다",
      icon: "technique_1"
    },
    {
      name: "미미",
      tag: "기억 정령 | 정보",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "",
      icon: "memo"
    },
    {
      name: "나쁜 녀석! 성가셔!",
      tag: "기억 정령 스킬 | 범위 공격",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "피해를 4회 가하고, 1회마다 랜덤 단일 적에게 미미 공격력의 36%만큼 얼음 속성 피해를 가한다. 이후 모든 적에게 미미 공격력의 90%만큼 얼음 속성 피해를 가한다",
      icon: "memo_skill_1"
    },
    {
      name: "내가! 도와줄게!",
      tag: "기억 정령 스킬 | 서포트",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "지정된 단일 아군의 행동 게이지를 100% 증가시키고 [미미의 응원]을 부여한다, 지속 시간: 3턴.\n[미미의 응원]을 보유한 목표가 피해를 1회 가할 때마다 추가로 기존 피해의 28%만큼 확정 피해를 1회 가한다.\n자신에게 해당 스킬 발동 시 행동 게이지 증가 효과를 발동할 수 없다",
      icon: "memo_skill_2"
    },
    {
      name: "파트너! 함께!",
      tag: "기억 정령 특성 | 서포트",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "모든 아군의 치명타 피해가 미미 치명타 피해의 12% + 24%를 더한 값만큼 증가한다.\n충전이 100% 미만일 시 미미가 행동하면 자동으로 [나쁜 녀석! 성가셔!]를 발동한다. 충전 100% 도달 시 미미가 즉시 행동하고, 다음번 행동 시 단일 아군을 선택해 [내가! 도와줄게!]를 발동할 수 있다",
      icon: "memo_talent_1"
    },
    {
      name: "미미, 파이팅!",
      tag: "기억 정령 특성 | 강화",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "미미가 소환될 시 즉시 충전을 50% 획득한다",
      icon: "memo_talent_1"
    },
    {
      name: "아쉬움… 남기지 마",
      tag: "기억 정령 특성 | 강화",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "미미가 사라질 시 개척자의 행동 게이지가 25% 증가한다",
      icon: "memo_talent_1"
    }
  ],
  additionalAbilities: [
    { name: "추념의 지팡이", description: "전투 시작 시 개척자의 행동 게이지가 30% 증가한다. 미미를 처음 소환할 시 미미는 충전을 40% 획득한다", icon: "bonus_1" },
    { name: "자그마한 서사시", description: "미미가 [나쁜 녀석! 성가셔!] 발동 시 즉시 충전을 5% 획득한다", icon: "bonus_2" },
    { name: "자석과 사슬", description: "[미미의 응원] 효과를 보유한 아군의 에너지 최대치가 100pt보다 높을 경우, 10pt를 초과할 때마다 [미미의 응원]으로 가하는 확정 피해 배율이 추가로 2% 증가하고, 최대 20% 증가한다", icon: "bonus_3" },
    { name: "미완의 에필로그", description: "필살기 발동 후 [서사시]를 1스택 획득하며, 최대 2스택 보유할 수 있다. [서사시]를 보유한 상태에서 미미가 필드에 있을 시 일반 공격이 [내일을, 함께 써내려 가자!]로 강화된다", icon: "bonus_4" }
  ],
  attributeBonuses: [
    { type: "치명타 피해", value: "37.3%", icon: "crit_dmg" },
    { type: "공격력", value: "14.4%", icon: "atk" },
    { type: "HP", value: "10%", icon: "hp" }
  ],
  eidolons: [
    { rank: "E01", name: "현재의 서술자", description: "[미미의 응원]을 보유한 아군의 치명타 확률이 10% 증가한다. 아군이 [미미의 응원] 보유 시 해당 목표의 기억 정령/기억 마스터에게도 [미미의 응원] 효과가 적용되며, 해당 효과는 중첩되지 않는다", icon: "eidolon_1", icon_f: "eidolon_1_f", icon_m: "eidolon_1_m" },
    { rank: "E02", name: "과거의 습득자", description: "미미를 제외한 아군 기억 정령이 행동 시 개척자가 에너지를 8pt 회복한다. 해당 효과는 턴마다 최대 1회 발동하며, 개척자의 턴 시작 시 발동 가능 횟수가 초기화된다", icon: "eidolon_2", icon_f: "eidolon_2_f", icon_m: "eidolon_2_m" },
    { rank: "E03", name: "미래의 영창자", description: "전투 스킬 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15. 기억 정령 특성 레벨+1, 최대 Lv.10", icon: "eidolon_3", icon_f: "eidolon_3_f", icon_m: "eidolon_3_m" },
    { rank: "E04", name: "뮤즈의 새 댄스 파트너", description: "에너지 최대치가 0인 아군이 직접 스킬을 발동하면 미미도 충전을 3% 획득하고, 해당 목표가 [미미의 응원]을 통해 가하는 확정 피해 배율이 추가로 6% 증가한다", icon: "eidolon_4", icon_f: "eidolon_4_f", icon_m: "eidolon_4_m" },
    { rank: "E05", name: "시편의 재봉사", description: "필살기 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10. 기억 정령 스킬 레벨+1, 최대 Lv.10", icon: "eidolon_5", icon_f: "eidolon_5_f", icon_m: "eidolon_5_m" },
    { rank: "E06", name: "계시의 전달자", description: "필살기의 치명타 확률이 100%로 고정된다", icon: "eidolon_6", icon_f: "eidolon_6_f", icon_m: "eidolon_6_m" }
  ],
  specialTerms: {
    "제어류 디버프": "빙결, 얽힘, 속박, 도발, 강제, 제어불가 등 캐릭터의 행동을 직접적으로 방해하는 상태 이상.",
    "행동 게이지 감소": "목표의 다음 행동 전 대기 간격을 연장한다.",
    "행동 게이지 증가": "행동 게이지가 일정 비율 증가하여 행동 순서가 앞당겨진다.",
    "즉시 행동": "행동 게이지가 100% 증가하여 즉시 턴을 획득한다.",
    "기억 정령": "기억의 운명의 길 캐릭터가 소환하는 독립적인 개체. 자체적인 속도와 스킬을 보유하고 행동 서열에 등록되어 행동한다.",
    "[서사시]": "개척자가 획득하는 스택. 보유 시 일반 공격이 강화된다.",
    "[미미의 응원]": "기억 정령 미미가 아군에게 부여하는 버프. 피해를 가할 때마다 추가 확정 피해를 발생시킨다."
  },
  isTrailblazer: true
};

export default trailblazerRemembrance;
