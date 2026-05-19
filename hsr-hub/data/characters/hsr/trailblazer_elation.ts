import { Character } from '../../../../common-hub/types';

const trailblazerElation: Character = {
  id: "trailblazer_elation",
  name: "개척자 (환락)",
  folderName: "개척자 (환락)",
  gameId: "hsr",
  attribute: "번개",
  path: "환락",
  rarity: 5,
  affiliation: "은하열차",
  briefInfo: "은하열차에 탑승한 {F#소녀}{M#소년}.\n스텔라론이 가져온 위기를 해결하기 위해, 은하열차와의 동행을 선택한다",
  version: "4.2",
  releaseVersion: "4.2",
  languageNames: "🇰🇷 개척자 (환락) / 🇺🇸 Trailblazer / 🇨🇳 开拓者 / 🇯🇵 開拓者",
  voiceActors: "🇰🇷 김명준 & 김하루 / 🇺🇸 케일럽 옌 & 레이첼 차우 / 🇨🇳 친체거 & 천팅팅 / 🇯🇵 에노키 준야 & 이시카와 유이",
  metadata: {
    name: "개척자 (환락)",
    language: "🇰🇷 개척자 (환락) / 🇺🇸 Trailblazer / 🇨🇳 开拓者 / 🇯🇵 開拓者",
    element: "번개",
    path: "환락",
    rarity: 5,
    affiliation: "은하열차",
    cv: "🇰🇷 김명준 & 김하루 / 🇺🇸 케일럽 옌 & 레이첼 차우 / 🇨🇳 친체거 & 천팅팅 / 🇯🇵 에노키 준야 & 이시카와 유이",
    releaseVersion: "4.2",
    brief: "은하열차에 탑승한 {F#소녀}{M#소년}.\n스텔라론이 가져온 위기를 해결하기 위해, 은하열차와의 동행을 선택한다"
  },
  baseStats: {
    lv1: { "기초 HP": 86, "기초 공격력": 148, "기초 방어력": 63 },
    lv20: { "기초 HP": 167, "기초 공격력": 288, "기초 방어력": 124 },
    lv30: { "기초 HP": 245, "기초 공격력": 421, "기초 방어력": 181 },
    lv40: { "기초 HP": 322, "기초 공격력": 554, "기초 방어력": 238 },
    lv50: { "기초 HP": 399, "기초 공격력": 687, "기초 방어력": 295 },
    lv60: { "기초 HP": 476, "기초 공격력": 821, "기초 방어력": 352 },
    lv70: { "기초 HP": 553, "기초 공격력": 954, "기초 방어력": 409 },
    lv80: { "기초 HP": 631, "기초 공격력": 1087, "기초 방어력": 466 },
    speed: 106,
    taunt: 100,
    energy: 160
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "246,400", rarity: 3 },
      { name: "광뢰의 스트로크", count: "28", rarity: 4 },
      { name: "천진난만 크레파스", count: "12", rarity: 2 },
      { name: "꿈을 만드는 딥 펜", count: "13", rarity: 3 },
      { name: "꿈을 그리는 붓", count: "12", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "1,808,000", rarity: 3 },
      { name: "운명의 발자취", count: "3", rarity: 5 },
      { name: "범람을 끊는 침묵", count: "9", rarity: 4 },
      { name: "≪복슬복슬호≫ 수작업 스토리보드", count: "9", rarity: 2 },
      { name: "≪복슬복슬호≫ 연재 기념호", count: "40", rarity: 3 },
      { name: "≪복슬복슬호≫ 소장판 합본", count: "79", rarity: 4 },
      { name: "약탈의 본능", count: "23", rarity: 2 },
      { name: "변조된 야망", count: "37", rarity: 3 },
      { name: "짓밟힌 의지", count: "24", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "이게 바로 응원이지",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 개척자 공격력의 100%만큼 번개 속성 피해를 가한다",
      icon: "basic_atk_1"
    },
    {
      name: "폭풍이 소란스럽군",
      tag: "전투 스킬 | 범위 공격",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "약점 격파 범위 20",
      spRecovery: "-1",
      description: "모든 적에게 개척자 공격력의 60%만큼 번개 속성 피해를 가하고, [훌륭한 솜씨에는 보상을]을 20pt 획득한다",
      icon: "skill_1"
    },
    {
      name: "마음껏 날아, 개척이 함께할 테니!",
      tag: "필살기 | 서포트",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 범위 0",
      description: "웃음 포인트를 5pt 획득하고, 지정된 단일 아군의 치명타 피해를 50%증가시킨다, 지속 시간: 3턴. 또한 해당 목표의 제어류 디버프 상태를 해제한다.\n목표가 환락 스킬을 보유하고 있다면, 목표는 추가로 [훌륭한 솜씨에는 보상을]을 10pt 획득하고, 즉시 웃음 포인트 20pt로 고정 집계되는 환락 스킬을 1회 발동한다. 환락 스킬 발동 전 적이 처치될 경우 새로 등장한 적에게 환락 스킬을 발동한다.\n목표가 환락 스킬을 보유하고 있지 않으면, 목표의 행동 게이지를 50% 증가시킨다",
      icon: "ultimate_1"
    },
    {
      name: "영웅의 웃음은 칼바람의 전조",
      tag: "특성 | 서포트",
      description: "공격 발동 후 에너지를 고정으로 10pt 회복하고, 웃음 포인트를 3pt 획득한다.\n개척자가 [훌륭한 솜씨에는 보상을] 보유 시, 전투 스킬이 모든 적에게 추가로 번개 속성 환락 피해를 30%가하며, 해당 피해는 아군 중 가장 높은 [훌륭한 솜씨에는 보상을] 수치를 사용하여 계산한다",
      icon: "talent_1"
    },
    {
      name: "불타오른다!",
      tag: "비술 | 강화",
      description: "비술 사용 후 랜덤으로 다음 중 1가지 효과를 획득한다.\n낮은 확률로 [함박웃음] 획득: 환락도가 30% 증가한다.\n높은 확률로 [참을 수 없는 웃음] 획득: 환락도가 20% 증가한다.\n다음 전투 시작 시, 모든 아군의 환락도가 해당 수치만큼 증가한다, 지속 시간: 3턴",
      icon: "technique_1"
    },
    {
      name: "내가 환락이라고 했잖아!",
      tag: "환락 스킬 | 범위 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 범위 20",
      description: "피해를 8회 가하며, 회당 랜덤 단일 적에게 번개 속성 환락 피해를 20% 가한다. 마지막으로 번개 속성 환락 피해를 60% 가하며, 해당 피해는 모든 적이 균등 분담한다",
      icon: "elation_skill_1"
    }
  ],
  additionalAbilities: [
    { name: "통쾌하다, 통쾌해!", description: "개척자의 공격력이 1000pt보다 높으면, 초과한 공격력 200pt당 자신의 환락도가 10% 증가하며, 최대 60% 증가한다", icon: "bonus_1" },
    { name: "끝장을 보자!", description: "자신의 치명타 확률이 15% 증가한다. 필살기 발동 후 아군의 전투 스킬 포인트를 1pt 회복한다", icon: "bonus_2" },
    { name: "아하, 물어!", description: "아군이 환락 스킬을 발동한 후, 개척자가 다음번 전투 스킬 발동 시 추가로 [훌륭한 솜씨에는 보상을]을 2pt 획득한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "공격력", value: "28%", icon: "atk" },
    { type: "치명타 확률", value: "12%", icon: "crit_rate" },
    { type: "치명타 피해", value: "13.3%", icon: "crit_dmg" }
  ],
  eidolons: [
    { rank: "E01", name: "빛을 믿는 시간", description: "전투 스킬 발동 후, 다음번 필살기로 아군이 획득하는 [훌륭한 솜씨에는 보상을]이 2pt 증가한다. 해당 효과 최대 중첩수: 3스택", icon: "eidolon_1", icon_f: "eidolon_1_f", icon_m: "eidolon_1_m" },
    { rank: "E02", name: "명장면 탄생 중……", description: "필살기가 추가로 지정된 단일 아군의 환락도를 12% 증가시킨다, 지속 시간: 2턴", icon: "eidolon_2", icon_f: "eidolon_2_f", icon_m: "eidolon_2_m" },
    { rank: "E03", name: "화제의 중심은, 바로 나!", description: "전투 스킬 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15. 환락 스킬 레벨+1, 최대 Lv.15", icon: "eidolon_3", icon_f: "eidolon_3_f", icon_m: "eidolon_3_m" },
    { rank: "E04", name: "세상을 구하는 데 이유는 필요 없어", description: "환락 스킬 발동 시, 적이 받는 피해를 10% 증가시킨다, 지속 시간: 2턴", icon: "eidolon_4", icon_f: "eidolon_4_f", icon_m: "eidolon_4_m" },
    { rank: "E05", name: "사랑과 용기는 결코 유행을 타지 않아", description: "필살기 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10. 환락 스킬 레벨+1, 최대 Lv.15", icon: "eidolon_5", icon_f: "eidolon_5_f", icon_m: "eidolon_5_m" },
    { rank: "E06", name: "은하 전설, 등장!", description: "환락 스킬 발동 시, 자신의 치명타 피해를 100% 증가시킨다, 지속 시간: 3턴", icon: "eidolon_6", icon_f: "eidolon_6_f", icon_m: "eidolon_6_m" }
  ],
  specialTerms: {
    "훌륭한 솜씨에는 보상을": "아하 타임에 참가한 캐릭터가 [훌륭한 솜씨에는 보상을] 상태를 획득하게 하며, 이번 아하 타임의 웃음 포인트를 해당 상태에 집계한다, 지속 시간: 2턴. [훌륭한 솜씨에는 보상을] 상태가 생성하는 스킬 효과와 환락 피해는 [훌륭한 솜씨에는 보상을]에 집계된 웃음 포인트에 따라 계산한다.\n여러 [훌륭한 솜씨에는 보상을]에 집계된 웃음 포인트는 합산하여 계산된다.\n각각의 [훌륭한 솜씨에는 보상을] 지속 시간은 각자 독립적으로 계산된다",
    "행동 게이지 증가": "목표의 다음 행동 전 대기 간격을 줄인다",
    "제어류 디버프 상태": "빙결, 얽힘, 속박, 지배, 노발대발, 강렬한 진탕, 이몽, 감금, 공포, 행동 고정, 행복 꼭두각시",
    "웃음 포인트": "웃음 포인트는 모든 파티원이 공유한다. 환락 피해를 가할 시, 집계된 웃음 포인트가 많을수록 환락 피해가 증가한다",
    "환락 피해": "집계된 웃음 포인트가 많을수록, 환락도 및 캐릭터 레벨이 높을수록 가하는 환락 피해가 증가한다. 환락 피해는 피해 증가류 효과의 영향을 받지 않는다"
  },
  isTrailblazer: true
};

export default trailblazerElation;
