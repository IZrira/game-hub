
import { Character } from '../../../types';

const danHeng: Character = {
  id: "dan_heng",
  gameId: "hsr",
  name: "단항",
  folderName: "단항",
  attribute: "바람",
  path: "수렵",
  rarity: 4,
  affiliation: "은하열차",
  briefInfo: "과묵한 청년. 창 「격운」을 들고 은하열차의 호위를 맡고 있다. 과거를 숨기기 위해 열차에 탑승했다.",
  releaseVersion: "1.0",
  languageNames: "🇰🇷 단항 / 🇺🇸 Dan Heng / 🇨🇳 丹恒 / 🇯🇵 丹恒",
  voiceActors: "🇰🇷 김혜성 / 🇺🇸 니콜라스 렁 / 🇨🇳 위디 / 🇯🇵 이토 켄토",
  baseStats: {
    lv1: { "기초 HP": 120, "기초 공격력": 74, "기초 방어력": 54 },
    lv20: { "기초 HP": 234, "기초 공격력": 145, "기초 방어력": 105 },
    lv30: { "기초 HP": 342, "기초 공격력": 212, "기초 방어력": 154 },
    lv40: { "기초 HP": 450, "기초 공격력": 279, "기초 방어력": 203 },
    lv50: { "기초 HP": 558, "기초 공격력": 346, "기초 방어력": 251 },
    lv60: { "기초 HP": 666, "기초 공격력": 413, "기초 방어력": 300 },
    lv70: { "기초 HP": 774, "기초 공격력": 480, "기초 방어력": 348 },
    lv80: { "기초 HP": 882, "기초 공격력": 546, "기초 방어력": 397 },
    speed: 110,
    taunt: 75,
    energy: 100
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "246,400", rarity: 3 },
      { name: "폭풍의 눈", count: "50", rarity: 4 },
      { name: "소멸된 코어", count: "12", rarity: 2 },
      { name: "희미한 빛의 코어", count: "13", rarity: 3 },
      { name: "꿈틀대는 코어", count: "12", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "2,400,000", rarity: 3 },
      { name: "운명의 발자취", count: "5", rarity: 5 },
      { name: "파멸자의 말로", count: "12", rarity: 4 },
      { name: "짐승 사냥용 화살", count: "12", rarity: 2 },
      { name: "악마 사냥용 화살", count: "54", rarity: 3 },
      { name: "별 쫓는 화살", count: "105", rarity: 4 },
      { name: "소멸된 코어", count: "28", rarity: 2 },
      { name: "희미한 빛의 코어", count: "42", rarity: 3 },
      { name: "꿈틀대는 코어", count: "42", rarity: 4 }
    ]
  },
  skills: [
    { name: "운기 창술 • 삭풍", tag: "일반 공격 | 단일 공격", energyRegen: "에너지 회복 20", toughnessDMG: "약점 격파 단일 공격 10", spRecovery: "+1", description: "지정된 단일 적에게 단항 공격력 100%만큼의 바람 속성 피해를 가한다", icon: "basic_atk_1" },
    { name: "운기 창술 • 질우", tag: "전투 스킬 | 단일 공격", energyRegen: "에너지 회복 30", toughnessDMG: "약점 격파 단일 공격 20", spRecovery: "-1", description: "지정된 단일 적에게 단항 공격력 260%만큼의 바람 속성 피해를 준다. 전투 스킬 발동 시 피격된 적이 감속 상태일 경우 피해 배율이 120% 증가한다", icon: "skill_1" },
    { name: "동천 환화 • 장몽 일각", tag: "필살기 | 단일 공격", energyRegen: "에너지 회복 5", toughnessDMG: "약점 격파 단일 공격 30", description: "지정된 단일 적에게 단항 공격력 400%만큼의 바람 속성 피해를 준다. 피격된 적이 감속 상태일 경우 피해 배율이 120% 증가한다", icon: "ultimate_1" },
    { name: "촌철", tag: "특성 | 강화", energyRegen: "0", toughnessDMG: "0", description: "단항이 아군 스킬의 목표가 되면 다음번 공격의 바람 속성 저항 관통이 36% 증가한다. 해당 효과는 2턴 후 다시 발동할 수 있다", icon: "talent_1" },
    { name: "파적의 선봉", tag: "비술 | 강화", energyRegen: "0", toughnessDMG: "0", description: "비술 사용 후 다음 전투 시작 시 단항의 공격력이 40% 증가한다. 지속 시간: 3턴", icon: "technique_1" }
  ],
  additionalAbilities: [
    { name: "잠룡", description: "현재 HP 백분율이 50% 이하일 경우, 적에게 피격될 확률이 감소한다", icon: "bonus_1" },
    { name: "절공", description: "일반 공격 발동 시 50%의 고정 확률로 적의 속도가 12% 감소한다. 지속 시간: 2턴", icon: "bonus_2" },
    { name: "강풍", description: "감속 상태의 적에게 가하는 일반 공격 피해가 40% 증가한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "바람 속성 피해 증가", value: "22.4%", icon: "wind_dmg" },
    { type: "공격력", value: "18.0%", icon: "atk" },
    { type: "방어력", value: "12.5%", icon: "def" }
  ],
  eidolons: [
    { rank: "E01", name: "하늘 끝까지 닿은 기세", description: "피격된 적의 현재 HP 백분율이 50% 이상일 경우 치명타 확률이 12% 증가한다", icon: "eidolon_1" },
    { rank: "E02", name: "독을 제압하는 화염", description: "특성의 재발동 대기시간이 1턴 감소한다", icon: "eidolon_2" },
    { rank: "E03", name: "자유자재인 옥", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "분분히 지는 용", description: "필살기로 적을 처치하면 단항은 즉시 행동한다", icon: "eidolon_4" },
    { rank: "E05", name: "한 방울의 빗물", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "체류하는 혼", description: "전투 스킬로 인한 감속 상태의 적의 속도 감소 효과가 8% 추가로 감소한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "저항 관통": "피해를 가할 시 적의 일부 대응 피해 속성의 저항 수치를 무시한다",
    "즉시 행동": "행동 게이지가 100% 증가하여 즉시 턴을 획득한다."
  }
};

export default danHeng;
