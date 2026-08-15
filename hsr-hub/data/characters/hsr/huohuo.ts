import { Character } from '../../../../common-hub/types';
import { createHsrBaseStats, createMaterial, createSkill } from '../../dataFactory';

const huohuo: Character = {
  id: "huohuo",
  name: "곽향",
  folderName: "곽향",
  gameId: "hsr",
  attribute: "바람",
  path: "풍요",
  rarity: 5,
  affiliation: "선주 「나부」",
  briefInfo: "선주 나부 시왕사의 견습 판관, 세양에게 빙의된 여우족 여자아이.\n겁 많은 성격에 연약하고 여러 괴상한 일들을 두려워하지만, 악귀를 처리하는 직책을 맡고 있다",
  version: "1.5",
  releaseVersion: "1.5",
  languageNames: "🇰🇷 곽향 / 🇺🇸 Huohuo / 🇨🇳 藿藿 / 🇯🇵 フォフォ",
  voiceActors: "🇰🇷 김채린 / 🇺🇸  메건 시프먼 / 🇨🇳 커즈레이 / 🇯🇵 나가나와 마리아",
  metadata: {
    name: "곽향",
    language: "🇰🇷 곽향 / 🇺🇸 Huohuo / 🇨🇳 藿藿 / 🇯🇵 フォフォ",
    element: "바람",
    path: "풍요",
    rarity: 5,
    affiliation: "선주 「나부」",
    cv: "🇰🇷 김채린 / 🇺🇸  메건 시프먼 / 🇨🇳 커즈레이 / 🇯🇵 나가나와 마리아",
    releaseVersion: "1.5",
    brief: "선주 나부 시왕사의 견습 판관, 세양에게 빙의된 여우족 여자아이.\n겁 많은 성격에 연약하고 여러 괴상한 일들을 두려워하지만, 악귀를 처리하는 직책을 맡고 있다"
  },
  baseStats: createHsrBaseStats(
    [185, 360, 527, 693, 859, 1026, 1192, 1358],
    [82, 160, 233, 307, 381, 454, 528, 602],
    [69, 135, 198, 260, 322, 385, 447, 509],
    98, 100, 140
  ),
  materials_v2: {
    ascension: [
      createMaterial("신용 포인트", "308,000", 3),
      createMaterial("천인의 유해", 65, 4),
      createMaterial("영생의 새싹", 15, 2),
      createMaterial("영생의 꽃", 15, 3),
      createMaterial("영생의 가지", 15, 4)
    ],
    traces: [
      createMaterial("신용 포인트", "2,197,500", 3),
      createMaterial("운명의 발자취", 8, 5),
      createMaterial("무한한 가짜의 여한", 12, 4),
      createMaterial("풍요의 씨앗", 18, 2),
      createMaterial("생명의 새싹", 69, 3),
      createMaterial("영원의 꽃", 139, 4),
      createMaterial("영생의 새싹", 41, 2),
      createMaterial("영생의 꽃", 56, 3),
      createMaterial("영생의 가지", 58, 4)
    ]
  },
  skills: [
    createSkill("character.huohuo.skill.basic.name", "일반 공격 | 단일 공격", "에너지 회복 20", "약점 격파 단일 공격 10", "+1", "character.huohuo.skill.basic.desc", "basic_atk_1"),
    createSkill("character.huohuo.skill.skill.name", "전투 스킬 | 회복", "에너지 회복 30", "0", "-1", "character.huohuo.skill.skill.desc", "skill_1"),
    createSkill("character.huohuo.skill.ult.name", "필살기 | 회복", "에너지 회복 5", "0", "0", "character.huohuo.skill.ult.desc", "ultimate_1"),
    createSkill("character.huohuo.skill.talent.name", "특성 | 회복", "0", "0", "0", "character.huohuo.skill.talent.desc", "talent_1"),
    createSkill("character.huohuo.skill.tech.name", "비술 | 회복", "0", "0", "0", "character.huohuo.skill.tech.desc", "technique_1")
  ],
  additionalAbilities: [
    { name: "character.huohuo.bonus.1.name", description: "character.huohuo.bonus.1.desc", icon: "bonus_1" },
    { name: "character.huohuo.bonus.2.name", description: "character.huohuo.bonus.2.desc", icon: "bonus_2" },
    { name: "character.huohuo.bonus.3.name", description: "character.huohuo.bonus.3.desc", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "HP", value: "28%", icon: "hp" },
    { type: "효과 저항", value: "18%", icon: "res" },
    { type: "속도", value: "5", icon: "spd" }
  ],
  eidolons: [
    { rank: "E01", name: "character.huohuo.eidolon.1.name", description: "character.huohuo.eidolon.1.desc", icon: "eidolon_1" },
    { rank: "E02", name: "character.huohuo.eidolon.2.name", description: "character.huohuo.eidolon.2.desc", icon: "eidolon_2" },
    { rank: "E03", name: "character.huohuo.eidolon.3.name", description: "character.huohuo.eidolon.3.desc", icon: "eidolon_3" },
    { rank: "E04", name: "character.huohuo.eidolon.4.name", description: "character.huohuo.eidolon.4.desc", icon: "eidolon_4" },
    { rank: "E05", name: "character.huohuo.eidolon.5.name", description: "character.huohuo.eidolon.5.desc", icon: "eidolon_5" },
    { rank: "E06", name: "character.huohuo.eidolon.6.name", description: "character.huohuo.eidolon.6.desc", icon: "eidolon_6" }
  ],
  specialTerms: {
    "기본 확률": "special.base_chance.desc",
    "제어류 디버프": "special.control_debuff.desc",
    "[양명]": "character.huohuo.special.yangming.desc",
    "[백산]": "character.huohuo.special.baishan.desc"
  },
  hasASBuff: true,
  asBuffData: {
    skills: [
      createSkill("깃발•풍우 소환", "일반 공격 | 단일 공격", "에너지 회복 20", "약점 격파 단일 10", "+1", "지정된 단일 적에게 곽향 HP 최대치의 <span class=\"highlight\">50%</span>만큼 바람 속성 피해를 가한다", "basic_atk_1"),
      createSkill("부적•보명호신", "전투 스킬 | 회복", "에너지 회복 30", "0", "-1", "지정된 단일 아군의 디버프 효과를 1개 해제하고, 지정된 단일 아군의 HP를 즉시 곽향 HP 최대치의 <span class=\"highlight\">24%</span>+<span class=\"highlight\">640</span>만큼 회복시킨다. 동시에 인접한 목표의 HP를 곽향 HP 최대치의 <span class=\"highlight\">19.2%</span>+<span class=\"highlight\">512</span>만큼 회복시킨다", "skill_1"),
      createSkill("꼬리•신귀 사역", "필살기 | 서포트", "에너지 회복 5", "0", "0", "자신 이외의 동료에게 각자 에너지 최대치의 <span class=\"highlight\">20%</span>만큼 에너지를 회복시키고, 동시에 공격력을 <span class=\"highlight\">40%</span> 증가시킨다. 지속 시간: 2턴", "ultimate_1"),
      createSkill("빙의•천기합일", "특성 | 회복", "0", "0", "0", "전투 스킬 또는 필살기 발동 후 곽향은 [양명]을 획득한다, 지속 시간: 3턴. 곽향의 턴이 시작될 때마다 지속 턴 수가 1 감소한다. 곽향이 [양명]을 보유하고 있으면 아군 턴 시작 또는 필살기 발동 시, 자신과 HP 백분율이 가장 낮은 아군의 HP를 곽향 HP 최대치의 <span class=\"highlight\">4.5%</span>+<span class=\"highlight\">120</span>만큼 회복한다. 그 후 현재 HP 백분율이 50% 이하인 각 아군의 HP를 곽향 HP 최대치의 <span class=\"highlight\">4.5%</span>+<span class=\"highlight\">120</span>만큼 회복한다.\n[양명]을 발동하여 아군에게 치유 제공 시, 해당 목표의 디버프 효과를 1개 해제한다. 해당 효과는 6회 발동 가능하다. 다시 [양명]을 획득하면 효과 발동 횟수는 갱신된다", "talent_1"),
      createSkill("악귀•귀물 제압", "비술 | 방해", "0", "0", "0", "곽향이 주위의 적을 위협하여 [백산(魄散)] 상태에 빠트린다. [백산] 상태의 적은 곽향에게서 도망친다, 지속 시간: 10초. [백산] 상태의 적과 전투에 진입하면 100%의 기본 확률로 각 단일 적의 공격력을 25% 감소시킨다, 지속 시간: 2턴", "technique_1")
    ],
    additionalAbilities: [
      { name: "나서지 못하는 마음", description: "전투 시작 시, 곽향이 에너지를 30pt 회복하고 [양명]을 획득한다, 지속 시간: 2턴", icon: "bonus_1" },
      { name: "불운의 명", description: "제어류 디버프 상태 저항 확률이 35% 증가한다. 필살기 발동 시 아군의 에너지 최대치가 160 이상일 경우, 해당 아군의 공격력이 추가로 24% 증가한다", icon: "bonus_2" },
      { name: "두려움의 압박", description: "특성을 발동해 아군에게 치유 제공 시 곽향이 에너지를 1pt 회복한다", icon: "bonus_3" }
    ],
    attributeBonuses: [
      { type: "HP", value: "28%", icon: "hp" },
      { type: "효과 저항", value: "18%", icon: "res" },
      { type: "속도", value: "5", icon: "spd" }
    ],
    eidolons: [
      { rank: "E01", name: "세양의 기생, 요괴의 숙주", description: "특성으로 발동한 [양명]의 지속 시간이 1턴 연장되며, 곽향이 [양명] 보유 시 자신의 치유량이 20% 증가하고, 모든 아군의 속도가 12% 증가한다", icon: "eidolon_1" },
      { rank: "E02", name: "판관의 부적, 영혼의 속박", description: "곽향이 [양명] 보유 시, 아군은 치명적인 공격을 받아도 전투 불능 상태에 빠지지 않으며, 즉시 자신의 HP 최대치의 50%만큼 HP를 회복하고 [양명]의 지속 턴 수를 1 감소시킨다. 해당 효과는 단일 전투에서 2회 발동할 수 있다", icon: "eidolon_2" },
      { rank: "E03", name: "불운의 체질, 반딧불이를 부르는 촛불", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_3" },
      { rank: "E04", name: "떠나지 않는 악귀, 불안정한 갈등", description: "전투 스킬 또는 특성을 발동해 아군에게 치유 제공 시, 목표의 현재 HP가 낮을수록 치유량이 증가하며, 곽향이 제공하는 치유량이 최대 80% 증가한다", icon: "eidolon_4" },
      { rank: "E05", name: "요괴 사냥, 시왕의 칙령", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_5" },
      { rank: "E06", name: "동고동락, 언제나 함께", description: "아군에게 치유 제공 시, 목표가 가하는 피해가 50% 증가한다. 지속 시간: 2턴", icon: "eidolon_6" }
    ],
    specialTerms: {
      "디버프 효과": "전투 중 디버프 효과가 있는 모든 지속 상태는 특별 설명이 없다면 해제할 수 있다",
      "기본 확률": "피격자에게 디버프 효과를 부여하는 기본 확률.\n최종 확률은 공격자의 효과 명중과 적의 효과 저항의 영향을 받는다",
      "제어류 디버프 상태": "빙결, 얽힘, 속박, 지배, 노발대발, 강렬한 진탕, 이몽, 감금, 공포, 행동 고정, 행복 꼭두각시",
      "전투 불능 상태": "아군의 현재 HP가 소모되어 0이 됐을 시 진입하는 특수한 상태. 해당 상태에 있으면 목표는 전투를 계속할 수 없다",
      "확정 피해": "어떤 효과에도 영향을 받지 않는 무속성 피해, 이번 피해는 공격을 1회 가한 것으로 간주하지 않는다"
    },
    materials_v2: {
      ascension: [
        createMaterial("신용 포인트", "308,000", 3),
        createMaterial("천인의 유해", 65, 4),
        createMaterial("영생의 새싹", 15, 2),
        createMaterial("영생의 꽃", 15, 3),
        createMaterial("영생의 가지", 15, 4)
      ],
      traces: [
        createMaterial("신용 포인트", "2,197,500", 3),
        createMaterial("운명의 발자취", 6, 5),
        createMaterial("무한한 가짜의 여한", 9, 4),
        createMaterial("풍요의 씨앗", 12, 2),
        createMaterial("생명의 새싹", 53, 3),
        createMaterial("영원의 꽃", 101, 4),
        createMaterial("영생의 새싹", 33, 2),
        createMaterial("영생의 꽃", 46, 3),
        createMaterial("영생의 가지", 28, 4)
      ]
    }
  }
};

export default huohuo;
