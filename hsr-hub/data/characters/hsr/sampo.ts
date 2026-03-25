
import { Character } from '../../../../common-hub/types';

const sampo: Character = {
  id: "sampo",
  gameId: "hsr",
  name: "삼포",
  folderName: "삼포",
  attribute: "바람",
  path: "공허",
  rarity: 4,
  affiliation: "벨로보그",
  briefInfo: "지상 지하를 자유롭게 넘나드는 밀수꾼. 붙임성이 좋고 열정적이며, 유머러스한 성격으로 농담을 잘한다. 돈 냄새를 맡는 탁월한 후각을 가졌으며, 때로는 위험한 거래에도 서슴지 않고 발을 들인다. 그의 웃음 뒤에는 언제나 계산된 이득이 숨어 있다.",
  releaseVersion: "1.0",
  languageNames: "🇰🇷 삼포 / 🇺🇸 Sampo / 🇨🇳 桑博 / 🇯🇵 サンポ",
  voiceActors: "🇰🇷 정재헌 / 🇺🇸 로저 로즈 / 🇨🇳 류샹보 / 🇯🇵 히라카와 다이스케",
  baseStats: {
    lv1: { "기초 HP": 139, "기초 공격력": 84, "기초 방어력": 54 },
    lv20: { "기초 HP": 271, "기초 공격력": 164, "기초 방어력": 105 },
    lv30: { "기초 HP": 397, "기초 공격력": 239, "기초 방어력": 154 },
    lv40: { "기초 HP": 522, "기초 공격력": 315, "기초 방어력": 203 },
    lv50: { "기초 HP": 647, "기초 공격력": 391, "기초 방어력": 251 },
    lv60: { "기초 HP": 773, "기초 공격력": 466, "기초 방어력": 300 },
    lv70: { "기초 HP": 898, "기초 공격력": 542, "기초 방어력": 348 },
    lv80: { "기초 HP": 1023, "기초 공격력": 617, "기초 방어력": 397 },
    speed: 102,
    taunt: 100,
    energy: 120
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "246,400", rarity: 3 },
      { name: "폭풍의 눈", count: "50", rarity: 4 },
      { name: "고대 부속품", count: "12", rarity: 2 },
      { name: "고대 전동축", count: "13", rarity: 3 },
      { name: "고대 엔진", count: "12", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "2,400,000", rarity: 3 },
      { name: "운명의 발자취", count: "5", rarity: 5 },
      { name: "수호자의 비원(悲願)", count: "12", rarity: 4 },
      { name: "어두운 흑요", count: "12", rarity: 2 },
      { name: "허공의 흑요", count: "54", rarity: 3 },
      { name: "타락의 흑요", count: "105", rarity: 4 },
      { name: "고대 부속품", count: "28", rarity: 2 },
      { name: "고대 전동축", count: "42", rarity: 3 },
      { name: "고대 엔진", count: "42", rarity: 4 }
    ]
  },
  skills: [
    { name: "화려한 도흔", tag: "일반 공격 | 단일 공격", energyRegen: "에너지 회복 20", toughnessDMG: "약점 격파 단일 공격 10", spRecovery: "+1", description: "지정된 단일 적에게 삼포 공격력 100%만큼의 바람 속성 피해를 준다.", icon: "basic_atk_1" },
    { name: "변덕스러운 사랑", tag: "전투 스킬 | 바운스", energyRegen: "에너지 회복 6", toughnessDMG: "약점 격파 단일 공격 10", spRecovery: "-1", description: "지정된 단일 적에게 삼포 공격력의 56%만큼 바람 속성 피해를 가하고, 추가로 피해를 4회 가한다. 피해마다 랜덤 단일 적에게 삼포 공격력의 56%만큼 바람 속성 피해를 가한다.", icon: "skill_1" },
    { name: "서프라이즈 선물 상자", tag: "필살기 | 범위 공격", energyRegen: "에너지 회복 5", toughnessDMG: "약점 격파 범위 공격 20", description: "모든 적에게 삼포 공격력 160%만큼의 바람 속성 피해를 주고, 100%의 기본 확률로 피격된 적이 받는 지속 피해가 30% 증가한다. 지속 시간: 2턴.", icon: "ultimate_1" },
    { name: "바람을 찢는 비수", tag: "특성 | 강화", energyRegen: "0", toughnessDMG: "0", description: "삼포는 적 공격 후 65%의 기본 확률로 적을 풍화 상태에 빠트린다. 지속 시간: 3턴\n풍화 상태의 적은 새로운 턴이 시작될 때마다 삼포 공격력 52%만큼의 바람 속성 지속 피해를 받는다. 풍화 상태 최대 중첩수: 5스택.", icon: "talent_1" },
    { name: "네가 가장 빛나", tag: "비술 | 방해", energyRegen: "0", toughnessDMG: "0", description: "비술 사용 후 일정 영역 내의 적을 10초 동안 실명 상태에 빠트린다. 실명 상태에 진입한 적은 아군을 발견할 수 없다.\n실명 상태의 적을 선공하여 전투 진입 시 100%의 고정 확률로 각 단일 적의 행동 게이지가 25% 감소한다.", icon: "technique_1" }
  ],
  additionalAbilities: [
    { name: "올가미", description: "특성으로 적이 풍화 상태에 빠지는 지속 시간이 1턴 증가한다.", icon: "bonus_1" },
    { name: "후공", description: "필살기 발동 시 추가로 에너지를 10pt 회복한다.", icon: "bonus_2" },
    { name: "첨가", description: "풍화 상태의 적이 삼포에게 가하는 피해가 15% 감소한다.", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "공격력", value: "28.0%", icon: "atk" },
    { type: "효과 명중", value: "18.0%", icon: "effect_hit_rate" },
    { type: "효과 저항", value: "10.0%", icon: "effect_res" }
  ],
  eidolons: [
    { rank: "E01", name: "곱절의 사랑", description: "전투 스킬 발동 시 랜덤 단일 적에게 추가로 피해를 1회 가한다.", icon: "eidolon_1" },
    { rank: "E02", name: "전염되는 열정", description: "풍화 상태의 적 처치 시 모든 적은 100%의 기본 확률로 특성만큼의 풍화 상태를 1스택 중첩한다.", icon: "eidolon_2" },
    { rank: "E03", name: "큰 돈!", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10.", icon: "eidolon_3" },
    { rank: "E04", name: "사랑할수록 커지는 증오", description: "전투 스킬이 풍화 상태를 5스택 이상 보유한 적을 명중할 시 보유한 풍화 상태는 즉시 기존 피해의 8%만큼 피해를 가한다.", icon: "eidolon_4" },
    { rank: "E05", name: "엄청난 돈!", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15.", icon: "eidolon_5" },
    { rank: "E06", name: "커진 씀씀이", description: "특성이 부여한 풍화 상태의 피해 배율이 15% 증가한다.", icon: "eidolon_6" }
  ],
  specialTerms: {
    "행동 게이지 감소": "목표의 다음 행동 전 대기 간격을 연장한다."
  }
};

export default sampo;
