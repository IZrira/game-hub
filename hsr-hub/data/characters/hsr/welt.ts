import { Character } from '../../../../common-hub/types';

const welt: Character = {
  id: "welt",
  gameId: "hsr",
  name: "웰트",
  folderName: "웰트",
  attribute: "허수",
  path: "공허",
  rarity: 5,
  affiliation: "은하열차",
  briefInfo: "의젓하고 진중한 열차팀의 선배\n오랜만의 모험을 즐기자 가슴 깊은 곳의 뜨거운 피가 다시금 끓어오른다\n가끔 공책에 모험 여정을 그린다",
  version: "1.0",
  releaseVersion: "1.0",
  languageNames: "🇰🇷 웰트 / 🇺🇸 Welt / 🇨🇳 瓦尔特 / 🇯🇵 ヴェルト",
  voiceActors: "🇰🇷 한신 / 🇺🇸 코리 렌디스 / 🇨🇳 펑보 / 🇯🇵 호소야 요시마사",
  metadata: {
    name: "웰트",
    language: "🇰🇷 웰트 / 🇺🇸 Welt / 🇨🇳 瓦尔特 / 🇯🇵 ヴェルト",
    element: "허수",
    path: "공허",
    rarity: 5,
    affiliation: "은하열차",
    cv: "🇰🇷 한신 / 🇺🇸 코리 렌디스 / 🇨🇳 펑보 / 🇯🇵 호소야 요시마사",
    releaseVersion: "1.0",
    brief: "의젓하고 진중한 열차팀의 선배\n오랜만의 모험을 즐기자 가슴 깊은 곳의 뜨거운 피가 다시금 끓어오른다\n가끔 공책에 모험 여정을 그린다"
  },
  baseStats: {
    lv1: { "기초 HP": 153, "기초 공격력": 84, "기초 방어력": 69 },
    lv20: { "기초 HP": 299, "기초 공격력": 165, "기초 방어력": 135 },
    lv30: { "기초 HP": 436, "기초 공격력": 241, "기초 방어력": 198 },
    lv40: { "기초 HP": 574, "기초 공격력": 317, "기초 방어력": 260 },
    lv50: { "기초 HP": 712, "기초 공격력": 393, "기초 방어력": 322 },
    lv60: { "기초 HP": 850, "기초 공격력": 469, "기초 방어력": 385 },
    lv70: { "기초 HP": 988, "기초 공격력": 545, "기초 방어력": 447 },
    lv80: { "기초 HP": 1125, "기초 공격력": 621, "기초 방어력": 509 },
    speed: 102,
    taunt: 100,
    energy: 120
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "과거 그림자의 황금 장식", count: "65", rarity: 4 },
      { name: "철위대 배지", count: "15", rarity: 2 },
      { name: "철위대 표식", count: "15", rarity: 3 },
      { name: "철위대 훈장", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "2,197,500", rarity: 3 },
      { name: "운명의 발자취", count: "6", rarity: 5 },
      { name: "파멸자의 말로", count: "9", rarity: 4 },
      { name: "어두운 흑요", count: "12", rarity: 2 },
      { name: "허공의 흑요", count: "53", rarity: 3 },
      { name: "타락의 흑요", count: "101", rarity: 4 },
      { name: "철위대 배지", count: "33", rarity: 2 },
      { name: "철위대 표식", count: "46", rarity: 3 },
      { name: "철위대 훈장", count: "28", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "중력 압박",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 웰트 공격력의 <span class=\"highlight\">100%</span>만큼 허수 속성 피해를 가한다",
      icon: "basic_atk_1"
    },
    {
      name: "허공 단열",
      tag: "전투 스킬 | 바운스",
      energyRegen: "에너지 회복 10",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "-1",
      description: "지정된 단일 적에게 웰트 공격력의 72%만큼 허수 속성 피해를 가하고, 추가로 피해를 2회 가한다. \n피해를 가할 때마다 랜덤 단일 적에게 웰트 공격력의 72%만큼 허수 속성 피해를 가한다. \n공격이 명중하면 75%의 기본 확률로 피격된 적의 속도를 10% 감소시킨다, 지속 시간: 2턴",
      icon: "skill_1"
    },
    {
      name: "유사 블랙홀",
      tag: "필살기 | 범위 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 범위 20",
      description: "모든 적에게 웰트 공격력 150% 만큼의 허수 속성 피해를 주고 100%의 기본 확률로 피격된 적을 속박 상태에 빠트린다. 지속 시간: 1턴\n속박 상태에서 적의 행동 게이지가 40% 감소하고, 속도가 10% 감소한다",
      icon: "ultimate_1"
    },
    {
      name: "시공 왜곡",
      tag: "특성 | 강화",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "감속 상태의 적을 공격 시 추가로 웰트 공격력 60%만큼의 허수 속성 추가 피해를 1회 준다",
      icon: "talent_1"
    },
    {
      name: "범위 제한",
      tag: "비술 | 방해",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "비술 사용 후 15초 동안 지속되는 특수 영역을 하나 만든다. \n특수 영역 안에 있는 적은 이동 속도가 50% 감소한다. 특수 영역 안에 있는 적은 전투 진입 후 100%의 기본 확률로 속박 상태에 빠진다. 지속 시간: 1턴\n속박 상태의 적은 행동 게이지가 20% 감소하고, 속도가 10% 감소한다. 아군이 만든 영역 효과는 최대 1개만 존재할 수 있다",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "징벌", description: "필살기 발동 시 100%의 기본 확률로 목표가 받는 피해가 12% 증가한다. 지속 시간: 2턴", icon: "bonus_1" },
    { name: "심판", description: "필살기 발동 시 추가로 에너지를 10pt 회복한다", icon: "bonus_2" },
    { name: "판결", description: "약점이 격파된 적에게 가하는 피해가 20% 증가한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "공격력", value: "28%", icon: "atk" },
    { type: "허수 속성 피해 증가", value: "14.4%", icon: "imaginary_dmg" },
    { type: "효과 저항", value: "10%", icon: "res" }
  ],
  eidolons: [
    { rank: "E01", name: "명성의 계승", description: "필살기 발동 후 웰트는 강화를 획득하며 다음 2번의 일반 공격 혹은 전투 스킬 발동 시 적에게 1회 추가 피해를 가한다. 일반 공격 발동 시의 추가 피해는 일반 공격 피해 배율의 50%이고, 전투 스킬 발동 시의 추가 피해는 전투 스킬 피해 배율의 80%이다", icon: "eidolon_1" },
    { rank: "E02", name: "별의 응집", description: "특성 발동 시 웰트가 에너지를 3pt 회복한다", icon: "eidolon_2" },
    { rank: "E03", name: "평화의 기도", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "정의의 이름으로", description: "전투 스킬 발동 시 피격된 적의 속도가 감소하는 기본 확률이 35% 증가한다", icon: "eidolon_4" },
    { rank: "E05", name: "선의 힘", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "찬란한 미래", description: "전투 스킬 발동 시 임의의 단일 적에게 추가로 1회 피해를 가한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "기본 확률": "피격자에게 디버프 효과를 부여하는 기본 확률. 최종 확률은 공격자의 효과 명중과 적의 효과 저항의 영향을 받는다.",
    "추가 피해": "피격자에게 추가로 1회 피해를 가한다. 이번 피해는 공격을 1회 가한 것으로 간주하지 않는다.",
    "행동 게이지 감소": "목표의 다음 행동 전 대기 간격을 연장한다."
  },
  hasASBuff: true,
  asBuffData: {
    skills: [
      {
        name: "중력 압박",
        tag: "일반 공격 | 단일 공격",
        energyRegen: "에너지 회복 20",
        toughnessDMG: "약점 격파 단일 10",
        spRecovery: "+1",
        description: "지정된 단일 적에게 웰트 공격력의 <span class=\"highlight\">100%</span>만큼 허수 속성 피해를 가한다",
        icon: "basic_atk_1"
      },
      {
        name: "허공 단열",
        tag: "전투 스킬 | 바운스",
        energyRegen: "에너지 회복 6",
        toughnessDMG: "약점 격파 단일 10",
        spRecovery: "-1",
        description: "지정된 단일 적에게 웰트 공격력의 <span class=\"highlight\">72%</span>만큼 허수 속성 피해를 가하고, 추가로 피해를 <span class=\"highlight\">4</span>회 가한다. 피해당 랜덤 단일 적에게 웰트 공격력의 <span class=\"highlight\">72%</span>만큼 허수 속성 피해를 가한다. 공격이 명중하면 <span class=\"highlight\">75%</span>의 기본 확률로 피격된 적의 속도를 10% 감소시킨다, 지속 시간: 2턴",
        icon: "skill_1"
      },
      {
        name: "유사 블랙홀",
        tag: "필살기 | 범위",
        energyRegen: "에너지 회복 5",
        toughnessDMG: "약점 격파 범위 20",
        spRecovery: "0",
        description: "모든 적에게 웰트 공격력의 <span class=\"highlight\">150%</span>만큼 허수 속성 피해를 가하고, 100%의 기본 확률로 피격된 적을 속박 상태에 빠트린다, 지속 시간: 1턴\n속박 상태의 적은 행동 게이지가 <span class=\"highlight\">12%</span> 감소하고, 속도가 10% 감소한다. 필살기 발동 후 모든 적을 [무중력] 상태에 빠트린다. [무중력] 상태의 적은 피격 시 행동 게이지가 4% 감소하고, 해당 효과는 목표마다 턴당 최대 8회 발동한다, [무중력] 상태 지속 시간: 2턴",
        icon: "ultimate_1"
      },
      {
        name: "시공 왜곡",
        tag: "특성 | 강화",
        energyRegen: "0",
        toughnessDMG: "0",
        spRecovery: "0",
        description: "[무중력] 상태의 적 방어력이 40% 감소하고, 속도가 5% 감소한다. 웰트가 감속 상태의 적 명중 시 추가로 웰트 공격력의 <span class=\"highlight\">100%</span>만큼 허수 속성 추가 피해를 1회 가한다",
        icon: "talent_1"
      },
      {
        name: "범위 제한",
        tag: "비술 | 방해",
        energyRegen: "0",
        toughnessDMG: "0",
        spRecovery: "0",
        description: "비술 사용 후 15초 동안 지속되는 특수 영역을 하나 만든다. 특수 영역 안에 있는 적은 이동 속도가 50% 감소한다. 특수 영역 안에 있는 적은 전투 진입 후 100%의 기본 확률로 속박 상태에 빠진다, 지속 시간: 1턴\n속박 상태의 적은 행동 게이지가 20% 감소하고, 속도가 10% 감소한다. 아군이 만든 영역 효과는 최대 1개만 존재할 수 있다",
        icon: "technique_1"
      }
    ],
    additionalAbilities: [
      { name: "징벌", description: "아군이 [무중력] 상태의 목표 공격 시 가하는 피해가 10% 증가한다, 해당 효과 최대 중첩수: 10스택, 지속 시간: 2턴. 전투 시작 시 웰트는 에너지를 30pt 회복한다", icon: "bonus_1" },
      { name: "심판", description: "일반 공격 또는 전투 스킬 발동 시 추가로 적에게 추가 피해를 1회 가한다. 일반 공격 발동 시 가하는 추가 피해는 일반 공격 피해 배율의 80%고, 전투 스킬 발동 시 가하는 추가 피해는 전투 스킬 피해 배율의 120%다", icon: "bonus_2" },
      { name: "판결", description: "웰트의 효과 명중이 40% 초과 시, 초과한 10%당 공격력이 20% 증가한다(최대 80% 증가). 필살기 발동 시 추가로 에너지를 5pt 회복한다", icon: "bonus_3" }
    ],
    attributeBonuses: [
      { type: "효과 명중", value: "28%", icon: "effect_hit" },
      { type: "효과 저항", value: "10%", icon: "res" },
      { type: "허수 속성 피해 증가", value: "14.4%", icon: "imaginary_dmg" }
    ],
    eidolons: [
      { rank: "E01", name: "명성의 계승", description: "전투 스킬 또는 필살기를 발동해 [무중력] 상태의 목표 명중 시, 추가로 필살기 피해 배율의 40%만큼 허수 속성 추가 피해를 1회 가한다. 해당 효과는 목표당 피격 시마다 최대 1회 발동한다", icon: "eidolon_1" },
      { rank: "E02", name: "별의 응집", description: "특성 발동 시 웰트가 에너지를 3pt 회복한다", icon: "eidolon_2" },
      { rank: "E03", name: "평화의 기도", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
      { rank: "E04", name: "정의의 이름으로", description: "[무중력] 상태인 적의 모든 속성 저항이 30% 감소한다", icon: "eidolon_4" },
      { rank: "E05", name: "선의 힘", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
      { rank: "E06", name: "찬란한 미래", description: "전투 스킬 또는 필살기를 발동해 감속 상태의 적 명중 시, 가하는 피해의 치명타 확률이 30% 증가하고, 치명타 피해가 60% 증가한다", icon: "eidolon_6" }
    ],
    specialTerms: {
      "기본 확률": "피격자에게 디버프 효과를 부여하는 기본 확률.\n최종 확률은 공격자의 효과 명중과 적의 효과 저항의 영향을 받는다",
      "행동 게이지 감소": "목표의 다음 행동 전 대기 간격을 연장한다",
      "추가 피해": "피격자에게 추가로 1회 피해를 가한다. 이번 피해는 1회 공격을 가한 것으로 간주하지 않는다",
      "효과 명중": "효과 명중은 적에게 디버프 효과를 가하는 확률을 높일 수 있다.\n해당 수치가 높을수록 디버프 효과를 가하는 데 성공할 확률이 높아진다"
    },
    materials_v2: {
      ascension: [
        { name: "신용 포인트", count: "308,000", rarity: 3 },
        { name: "과거 그림자의 황금 장식", count: "65", rarity: 4 },
        { name: "철위대 배지", count: "15", rarity: 2 },
        { name: "철위대 표식", count: "15", rarity: 3 },
        { name: "철위대 훈장", count: "15", rarity: 4 }
      ],
      traces: [
        { name: "신용 포인트", count: "2,197,500", rarity: 3 },
        { name: "운명의 발자취", count: "6", rarity: 5 },
        { name: "파멸자의 말로", count: "9", rarity: 4 },
        { name: "어두운 흑요", count: "12", rarity: 2 },
        { name: "허공의 흑요", count: "53", rarity: 3 },
        { name: "타락의 흑요", count: "101", rarity: 4 },
        { name: "철위대 배지", count: "33", rarity: 2 },
        { name: "철위대 표식", count: "46", rarity: 3 },
        { name: "철위대 훈장", count: "28", rarity: 4 }
      ]
    }
  }
};

export default welt;
