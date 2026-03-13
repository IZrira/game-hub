
import { Character } from '../../../types';

const asta: Character = {
  id: "asta",
  gameId: "hsr",
  name: "아스타",
  folderName: "아스타",
  attribute: "화염",
  path: "화합",
  rarity: 4,
  affiliation: "우주정거장 「헤르타」",
  briefInfo: "우주정거장 「헤르타」의 책임자. 명문가 출신의 아가씨. 호기심 넘치는 천문학 연구자로 자기주장이 강한 연구원을 다루는 데 능하다.",
  releaseVersion: "1.0",
  languageNames: "🇰🇷 아스타 / 🇺🇸 Asta / 🇨🇳 艾丝妲 / 🇯🇵 アスター",
  voiceActors: "🇰🇷 김현지 / 🇺🇸 펄리샤 앤절 / 🇨🇳 귀냥 / 🇯🇵 아카사키 치나츠",
  baseStats: {
    lv1: { "기초 HP": 139, "기초 공격력": 70, "기초 방어력": 63 },
    lv20: { "기초 HP": 271, "기초 공격력": 136, "기초 방어력": 123 },
    lv30: { "기초 HP": 396, "기초 공격력": 199, "기초 방어력": 179 },
    lv40: { "기초 HP": 521, "기초 공격력": 262, "기초 방어력": 236 },
    lv50: { "기초 HP": 647, "기초 공격력": 325, "기초 방어력": 292 },
    lv60: { "기초 HP": 772, "기초 공격력": 387, "기초 방어력": 349 },
    lv70: { "기초 HP": 898, "기초 공격력": 450, "기초 방어력": 405 },
    lv80: { "기초 HP": 1023, "기초 공격력": 512, "기초 방어력": 463 },
    speed: 106,
    taunt: 100,
    energy: 120
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "246,400", rarity: 3 },
      { name: "상온 갑각", count: "50", rarity: 4 },
      { name: "철위대 배지", count: "12", rarity: 2 },
      { name: "철위대 표식", count: "13", rarity: 3 },
      { name: "철위대 훈장", count: "12", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "2,400,000", rarity: 3 },
      { name: "운명의 발자취", count: "5", rarity: 5 },
      { name: "파멸자의 말로", count: "12", rarity: 4 },
      { name: "조화의 가락", count: "12", rarity: 2 },
      { name: "가족의 찬가", count: "54", rarity: 3 },
      { name: "별들의 악장", count: "105", rarity: 4 },
      { name: "철위대 배지", count: "28", rarity: 2 },
      { name: "철위대 표식", count: "42", rarity: 3 },
      { name: "철위대 훈장", count: "42", rarity: 4 }
    ]
  },
  skills: [
    { name: "스펙트럼 빔", tag: "일반 공격 | 단일 공격", energyRegen: "에너지 회복 20", toughnessDMG: "약점 격파 단일 공격 10", spRecovery: "+1", description: "지정된 단일 적에게 아스타 공격력 100%만큼의 화염 속성 피해를 가한다", icon: "basic_atk_1" },
    { name: "메테오 스톰", tag: "전투 스킬 | 바운스", energyRegen: "에너지 회복 6", toughnessDMG: "약점 격파 단일 공격 10", spRecovery: "-1", description: "지정된 단일 적에게 아스타 공격력 50%만큼의 화염 속성 피해를 주며, 추가로 피해를 4회 가한다", icon: "skill_1" },
    { name: "별하늘의 축언", tag: "필살기 | 서포트", energyRegen: "에너지 회복 5", toughnessDMG: "0", description: "모든 아군의 속도가 50pt 증가한다. 지속 시간: 2턴", icon: "ultimate_1" },
    { name: "천문학", tag: "특성 | 서포트", energyRegen: "0", toughnessDMG: "0", description: "서로 다른 적을 명중할 때마다 에너지를 1스택 획득한다. 스택당 아군의 공격력이 14% 증가한다", icon: "talent_1" },
    { name: "착각적인 섬광", tag: "비술 | 단일 공격", energyRegen: "0", toughnessDMG: "약점 격파 단일 공격 20", description: "즉시 적을 공격하며, 전투 진입 후 모든 적에게 아스타 공격력 50%만큼의 화염 속성 피해를 가한다", icon: "technique_1" }
  ],
  additionalAbilities: [
    { name: "별자리", description: "아스타가 에너지 충전 1스택을 보유할 때마다 방어력이 6% 증가한다", icon: "bonus_1" },
    { name: "연소", description: "아군이 가하는 화염 속성 피해가 18% 증가한다", icon: "bonus_2" },
    { name: "불꽃", description: "일반 공격 발동 시 80%의 기본 확률로 적을 연소 상태에 빠트린다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "화염 속성 피해 증가", value: "22.4%", icon: "fire_dmg" },
    { type: "방어력", value: "22.5%", icon: "def" },
    { type: "치명타 확률", value: "6.7%", icon: "crit_rate" }
  ],
  eidolons: [
    { rank: "E01", name: "별의 가사 없는 노래", description: "전투 스킬 발동 시 임의의 단일 적에게 추가로 1회 피해를 가한다", icon: "eidolon_1" },
    { rank: "E02", name: "달이 차고 기우는 굴레", description: "필살기 발동 시 아스타는 다음 턴에서 에너지 충전 스택을 소모하지 않는다", icon: "eidolon_2" },
    { rank: "E03", name: "황도 운석의 변", description: "전투 스킬 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_3" },
    { rank: "E04", name: "오로라가 덮인 아름다움", description: "에너지 충전 스택이 2 이상일 때 아스타의 에너지 회복효율이 15% 증가한다", icon: "eidolon_4" },
    { rank: "E05", name: "깊은 우주의 비밀", description: "필살기 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_5" },
    { rank: "E06", name: "은하 아래에서의 단잠", description: "특성의 턴마다 감소하는 에너지 충전 스택 수가 1 감소한다", icon: "eidolon_6" }
  ]
};

export default asta;
