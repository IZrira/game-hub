import { Character } from '../../../../common-hub/types';

const trailblazerPreservation: Character = {
    id: "trailblazer_fire",
    gameId: "hsr",
    isTrailblazer: true,
    name: "개척자 (보존)",
    // 깃허브 실제 경로인 '캐릭터/개척자 (보존)'를 맞추기 위한 설정
    folderName: "개척자 (보존)", 
    attribute: "화염",
    path: "보존",
    rarity: 5,
    affiliation: "은하열차",
    briefInfo: "은하열차에 탑승한 {F#소녀}{M#소년}. 스텔라론이 가져온 위기를 해결하기 위해, 은하열차와의 동행을 선택한다.",
    version: "1.0",
    releaseVersion: "1.0",
    languageNames: "🇰🇷 개척자 / 🇺🇸 Trailblazer / 🇨🇳 开拓者 / 🇯🇵 開拓者",
    voiceActors: "🇰🇷 김명준·방연지 / 🇺🇸 케일럽 옌 / 🇨🇳 秦且歌 / 🇯🇵 에노키 쥰야·이시카와 유이",
    metadata: {
      name: "개척자 (보존)",
      language: "🇰🇷 개척자 / 🇺🇸 Trailblazer / 🇨🇳 开拓者 / 🇯🇵 開拓者",
      element: "화염",
      path: "보존",
      rarity: 5,
      affiliation: "은하열차",
      cv: "🇰🇷 김명준·방연지 / 🇺🇸 케일럽 옌 / 🇨🇳 秦且歌 / 🇯🇵 에노키 쥰야·이시카와 유이",
      releaseVersion: "1.0",
      brief: "은하열차에 탑승한 {F#소녀}{M#소년}. 스텔라론이 가져온 위기를 해결하기 위해, 은하열차와의 동행을 선택한다."
    },
    baseStats: {
      lv1: { "기초 HP": 169, "기초 공격력": 82, "기초 방어력": 83 },
      lv20: { "기초 HP": 329, "기초 공격력": 160, "기초 방어력": 161 },
      lv30: { "기초 HP": 406, "기초 공격력": 197, "기초 방어력": 198 },
      lv40: { "기초 HP": 482, "기초 공격력": 233, "기초 방어력": 235 },
      lv50: { "기초 HP": 634, "기초 공격력": 307, "기초 방어력": 309 },
      lv60: { "기초 HP": 786, "기초 공격력": 381, "기초 방어력": 384 },
      lv70: { "기초 HP": 938, "기초 공격력": 454, "기초 방어력": 458 },
      lv80: { "기초 HP": 1242, "기초 공격력": 602, "기초 방어력": 606 },
      speed: 95,
      energy: 150,
      taunt: 120
    },
    materials_v2: {
      ascension: [
        { name: "신용 포인트", count: "308,000", rarity: 3 },
        { name: "깊은 별의 외형질", count: "28", rarity: 4 },
        { name: "약탈의 본능", count: "15", rarity: 2 },
        { name: "변조된 야망", count: "15", rarity: 3 },
        { name: "짓밟힌 의지", count: "15", rarity: 4 }
      ],
      traces: [
        { name: "신용 포인트", count: "3,000,000", rarity: 3 },
        { name: "운명의 발자취", count: "8", rarity: 5 },
        { name: "파멸자의 말로", count: "12", rarity: 4 },
        { name: "청동의 집념", count: "18", rarity: 2 },
        { name: "한철의 맹세", count: "69", rarity: 3 },
        { name: "앰버의 수호", count: "139", rarity: 4 },
        { name: "약탈의 본능", count: "41", rarity: 2 },
        { name: "변조된 야망", count: "56", rarity: 3 },
        { name: "짓밟힌 의지", count: "58", rarity: 4 }
      ]
    },
    skills: [
      {
        name: "일반 공격 - 얼음을 관통하는 빛",
        tag: "일반 공격 | 단일 공격",
        energyRegen: "에너지 회복 20",
        toughnessDMG: "약점 격파 단일 공격 10",
        spRecovery: "+1",
        description: "지정된 단일 적에게 개척자 공격력 100%만큼의 화염 속성 피해를 주며, [불타는 의지]를 1스택 중첩한다."
      },
      {
        name: "전투 스킬 - 타오르는 불멸의 앰버",
        tag: "전투 스킬 | 방어",
        energyRegen: "에너지 회복 30",
        toughnessDMG: "없음",
        spRecovery: "-1",
        description: "전투 스킬 발동 후 개척자가 받는 피해가 50% 감소하고 [불타는 의지]를 1스택 중첩한다. 100%의 [기본 확률]로 모든 적이 도발 상태에 빠진다. 지속 시간: 1턴."
      },
      {
        name: "필살기 - 임전무퇴 화염의 랜스",
        tag: "필살기 | 범위 공격",
        energyRegen: "에너지 회복 5",
        toughnessDMG: "약점 격파 범위 공격 20",
        description: "모든 적에게 개척자 공격력 100%+방어력 150%만큼의 화염 속성 피해를 준다. 다음 일반 공격 발동 시 자동으로 강화를 획득하며 [불타는 의지]를 소모하지 않는다."
      },
      {
        name: "특성 - 축성가의 유물",
        tag: "특성 | 강화",
        energyRegen: "없음",
        toughnessDMG: "없음",
        description: "피격될 때마다 [불타는 의지]를 1스택 중첩한다. 최대 중첩수: 8스택. [불타는 의지]가 4스택 이상일 경우 일반 공격이 강화되며, 지정된 단일 적 및 인접한 목표에게 피해를 준다. 개척자가 일반 공격, 전투 스킬, 필살기 발동 후 모든 아군에게 개척자 방어력 6%+80만큼의 피해를 상쇄할 수 있는 실드를 제공한다. 지속 시간: 2턴."
      },
      {
        name: "비술 - 수호자의 부름",
        tag: "비술 | 방어",
        energyRegen: "없음",
        toughnessDMG: "없음",
        description: "비술 발동 후 다음 전투 시작 시 자신에게 개척자 방어력 30%+384만큼의 피해를 상쇄할 수 있는 실드를 제공한다. 지속 시간: 1턴."
      }
    ],
    additionalAbilities: [
      { name: "약자를 돕는 강자", description: "전투 스킬 발동 후 모든 아군이 받는 피해가 15% 감소한다. 지속 시간: 1턴." },
      { name: "죽음 앞의 생", description: "개척자가 일반 공격 강화를 발동하면 자신 HP 최대치의 5%만큼의 HP를 회복한다." },
      { name: "생각보다 행동", description: "턴 시작 시 개척자가 실드의 가호를 지닌 경우, 행동이 끝날 때까지 공격력이 15% 증가하고 에너지를 5pt 회복한다. 행동 종료까지 지속된다." }
    ],
    attributeBonuses: [
      { type: "방어력", value: "35%" },
      { type: "공격력", value: "18%" },
      { type: "HP", value: "10%" }
    ],
    eidolons: [
      { rank: "E01", name: "대지의 울부짖음", description: "일반 공격 발동 시 추가로 개척자 방어력 25%만큼의 화염 속성 피해를 가한다. 일반 공격 강화 발동 시 추가로 개척자 방어력 50%만큼의 화염 속성 피해를 가한다.", icon: "eidolon_1" },
      { rank: "E02", name: "옛 한철의 굳건함", description: "특성 발동 시 모든 아군에게 제공한 실드가 개척자 방어력 2%+27만큼의 피해를 추가로 상쇄할 수 있다.", icon: "eidolon_2" },
      { rank: "E03", name: "미래를 축조하는 청사진", description: "전투 스킬 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15.", icon: "eidolon_3" },
      { rank: "E04", name: "문명에 머무는 맹세", description: "전투 시작 시 [불타는 의지]를 즉시 4스택 획득한다.", icon: "eidolon_4" },
      { rank: "E05", name: "불을 지필 용기", description: "필살기 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10.", icon: "eidolon_5" },
      { rank: "E06", name: "영원토록 굳건한 성벽", description: "일반 공격 강화 혹은 필살기 발동 후 개척자의 방어력이 10% 증가한다. 최대 중첩수: 3스택.", icon: "eidolon_6" }
    ],
    specialTerms: {
      "기본 확률": "피격자에게 디버프 효과를 부여하는 기본 확률. 최종 확률은 공격자의 효과 명중과 적의 효과 저항의 영향을 받는다.",
      "불타는 의지": "개척자(보존) 전용 강화 스택. 4스택 이상 시 일반 공격이 강화된다."
    }
};

export default trailblazerPreservation;