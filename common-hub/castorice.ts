import { Character } from './types';

const castorice_en: Character = {
  id: "castorice",
  name: "Castorice",
  folderName: "카스토리스", // ⚠️ 이미지 매칭을 위해 폴더명 원본 유지 (필요시 "Castorice"로 변경)
  gameId: "hsr",
  attribute: "Quantum",
  path: "Remembrance",
  rarity: 5,
  affiliation: "Amphoreus",
  briefInfo: "The death-revering nation, Aidonia, where snow falls all day, is now deep in slumber. Daughter of the River of the Underworld, Castorice, Golden Offspring seeking the spark of 'Death', set forth. Embrace the wailing souls of the world, and hold the solitude of destiny. — Death and life are both a journey, and when the butterfly lands on the tip of the branch, the withered shall be reborn.",
  version: "3.2",
  releaseVersion: "3.2",
  languageNames: "🇰🇷 카스토리스 / 🇺🇸 Castorice / 🇨🇳 遐蝶 / 🇯🇵 キャストリス ",
  voiceActors: "🇰🇷 이세레나 / 🇺🇸 Melody Muze / 🇨🇳 루안총칭 / 🇯🇵 Chiwa Saito",
  metadata: {
    name: "Castorice",
    language: "🇰🇷 카스토리스 / 🇺🇸 Castorice / 🇨🇳 遐蝶 / 🇯🇵 キャストリス ",
    element: "Quantum",
    path: "Remembrance",
    rarity: 5,
    affiliation: "Amphoreus",
    cv: "🇰🇷 이세레나 / 🇺🇸 Melody Muze / 🇨🇳 루안총칭 / 🇯🇵 Chiwa Saito",
    releaseVersion: "3.2",
    brief: "The death-revering nation, Aidonia, where snow falls all day, is now deep in slumber. Daughter of the River of the Underworld, Castorice, Golden Offspring seeking the spark of 'Death', set forth. Embrace the wailing souls of the world, and hold the solitude of destiny. — Death and life are both a journey, and when the butterfly lands on the tip of the branch, the withered shall be reborn."
  },
  // ✅ 에쉬베일과 마찬가지로 기본 스탯은 KR과 100% 동일하게 유지합니다!
  baseStats: {
    lv1: { "Base HP": 222, "Base ATK": 71, "Base DEF": 66 },
    lv20: { "Base HP": 432, "Base ATK": 139, "Base DEF": 129 },
    lv30: { "Base HP": 632, "Base ATK": 203, "Base DEF": 188 },
    lv40: { "Base HP": 832, "Base ATK": 267, "Base DEF": 248 },
    lv50: { "Base HP": 1031, "Base ATK": 332, "Base DEF": 307 },
    lv60: { "Base HP": 1231, "Base ATK": 396, "Base DEF": 366 },
    lv70: { "Base HP": 1430, "Base ATK": 460, "Base DEF": 426 },
    lv80: { "Base HP": 1630, "Base ATK": 524, "Base DEF": 485 },
    speed: 95,
    taunt: 100,
    energy: 0
  },
  // ✅ 재료 명칭들을 모두 en.json에 있는 영문으로 교체
  materials_v2: {
    ascension: [
      { name: "Credit", count: "308,000", rarity: 3 },
      { name: "Moonlight of the Dark Veil", count: "65", rarity: 4 },
      { name: "Fleeting Sign", count: "15", rarity: 2 },
      { name: "Approaching Howl", count: "15", rarity: 3 },
      { name: "Endless Sigh", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "Credit", count: "3,000,000", rarity: 3 },
      { name: "Tracks of Destiny", count: "8", rarity: 5 },
      { name: "Auspice Sliver", count: "12", rarity: 4 },
      { name: "Seed of Remembrance", count: "18", rarity: 2 },
      { name: "Sprout of Remembrance", count: "69", rarity: 3 },
      { name: "Flower of Remembrance", count: "139", rarity: 4 },
      { name: "Fleeting Sign", count: "41", rarity: 2 },
      { name: "Approaching Howl", count: "56", rarity: 3 },
      { name: "Endless Sigh", count: "58", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "Mourning, Ripples of the Dead Sea",
      tag: "Basic ATK | Single Target",
      energyRegen: "Energy Regeneration 20",
      toughnessDMG: "Weakness Break (Single) 10",
      spRecovery: "+1",
      description: "Deals Quantum DMG equal to 50% of Castorice's Max HP to a single target enemy.",
      icon: "basic_atk_1"
    },
    {
      name: "Silence, Touch of the Butterfly",
      tag: "Skill | Blast",
      energyRegen: "0",
      toughnessDMG: "Weakness Break (Single) 20 (Blast) 10",
      spRecovery: "0",
      description: "Consumes 30% of all allies' current HP to deal Quantum DMG equal to 50% of Castorice's Max HP to a single target enemy, and Quantum DMG equal to 30% of Castorice's Max HP to adjacent targets.\nIf current HP is insufficient, HP is reduced to 1.\nWhen the Nether Dragon is on the field, the Skill changes to [Bone Claws, Embrace of the Nether Dragon].",
      icon: "skill_1"
    },
    {
      name: "Bone Claws, Embrace of the Nether Dragon",
      tag: "Skill | AoE",
      energyRegen: "0",
      toughnessDMG: "Weakness Break (AoE) 20",
      spRecovery: "0",
      description: "Consumes 40% of all allies' current HP (excluding the Nether Dragon) and Castorice and the Nether Dragon launch a coordinated attack, dealing Quantum DMG equal to 30% and 50% of Castorice's Max HP to all enemies.\nIf current HP is insufficient, HP is reduced to 1.",
      icon: "skill_2"
    },
    {
      name: "Roaring Dead, Bell of Revival",
      tag: "Ultimate | Summon",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "Summons the Memokeeper Nether Dragon and Advances its Action by 100%, while deploying the Barrier [Netherworld Forgetting the World] to reduce the All-Type RES of all enemies by 20%. If Castorice has the DMG Boost effect from her Talent, spreads this effect to the Nether Dragon. In its base state, the Nether Dragon has 165 SPD and a fixed Max HP equal to 100% of the [New Pistil] limit.\nThe Nether Dragon disappears after 3 turns or when its HP falls to 0, dispelling the Barrier [Netherworld Forgetting the World].",
      icon: "ultimate_1"
    },
    {
      name: "Wasteland Flowing in the Palm",
      tag: "Talent | Enhance",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "The limit of [New Pistil] is affected by the level of all characters on the field. For every 1 HP an ally loses, Castorice gains 1 pt of [New Pistil]. When [New Pistil] reaches its limit, the Ultimate can be activated. When an ally loses HP, the DMG dealt by Castorice and the Nether Dragon increases by 20%. This effect stacks up to 3 times and lasts for 3 turns.\nWhen the Nether Dragon is on the field, [New Pistil] cannot be gained through the Talent. For every 1 HP all allies (excluding the Nether Dragon) lose, an equal amount is converted into the Nether Dragon's HP.",
      icon: "talent_1"
    },
    {
      name: "Protection of the Moon Cocoon",
      tag: "Talent | Support, Exclusive",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "Upon obtaining Castorice or when Castorice is in the current team, gains the following effect: In battle, if an ally character receives a fatal attack, all ally characters who received a fatal attack during this action gain the [Moon Cocoon] state. Characters in the [Moon Cocoon] state have their Knocked Down status temporarily delayed and can act normally. After acting and before the start of the next turn, if their current HP increases or they gain a Shield, the [Moon Cocoon] state is dispelled; otherwise, they are immediately Knocked Down. This effect can only be triggered up to 1 time per battle.",
      icon: "talent_1"
    },
    {
      name: "Technique",
      tag: "Technique | Enhance",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "After using the Technique, enters the [Profound Darkness] state for 20 seconds. Enemies in the [Profound Darkness] state cannot directly approach Castorice.\nAttacking in the [Profound Darkness] state initiates combat with all enemies in range, immediately summons the Memokeeper Nether Dragon, Advances its Action by 100%, and deploys the Barrier [Netherworld Forgetting the World]. Additionally, the Nether Dragon will have current HP equal to 50% of the [New Pistil] limit. Upon entering battle, consumes 40% of all allies' current HP (excluding the Nether Dragon).\nIf the Nether Dragon is not summoned upon entering battle, Castorice gains [New Pistil] equal to 30% of its limit.",
      icon: "technique_1"
    },
    {
      name: "Nether Dragon Pollux",
      tag: "Memokeeper | Info",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "",
      icon: "memo"
    },
    {
      name: "Claws that Tear the Darkness",
      tag: "Memokeeper Skill | AoE",
      energyRegen: "0",
      toughnessDMG: "Weakness Break (AoE) 10",
      spRecovery: "0",
      description: "Deals Quantum DMG equal to 40% of Castorice's Max HP to all enemies.",
      icon: "memo_skill_1"
    },
    {
      name: "Flame Breath that Burns the Darkness",
      tag: "Memokeeper Skill | AoE",
      energyRegen: "0",
      toughnessDMG: "Weakness Break (AoE) 10",
      spRecovery: "0",
      description: "When casting [Flame Breath that Burns the Darkness], consumes 25% of the Nether Dragon's Max HP and deals Quantum DMG equal to 24% of Castorice's Max HP to all enemies.\n[Flame Breath that Burns the Darkness] can be cast multiple times during a single attack. Each additional cast increases the DMG multiplier to 28%/34% sequentially, capping at 34%. The DMG multiplier increase does not reset until the Nether Dragon disappears.\nIf the Nether Dragon's current HP is at or below 25% of its Max HP, casting this skill reduces its HP to 1 and triggers the same skill effect as the Talent [Dark Wings that Burn the Graveyard].",
      icon: "memo_skill_2"
    },
    {
      name: "Body Shrouded in the Moon Cocoon",
      tag: "Memokeeper Talent | Support",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "While the Nether Dragon is on the field, it provides backup to allies. When an ally takes DMG or consumes HP, their current HP is reduced to a minimum of 1, and the Nether Dragon bears the rest of the cost, but consumes 500% of the original value in HP. This effect lasts until the Nether Dragon disappears.",
      icon: "memo_talent_1"
    },
    {
      name: "Roar that Shakes the Desolate Land",
      tag: "Memokeeper Talent | Support",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "When the Nether Dragon is summoned, the DMG dealt by all allies increases by 10%. Lasts for 3 turns.",
      icon: "memo_talent_1"
    },
    {
      name: "Dark Wings that Burn the Graveyard",
      tag: "Memokeeper Talent | Bounce",
      energyRegen: "0",
      toughnessDMG: "Weakness Break (Bounce) 5",
      spRecovery: "0",
      description: "When the Nether Dragon disappears, it deals DMG 6 times. Each instance deals Quantum DMG equal to 40% of Castorice's Max HP to a random single enemy, and restores HP equal to 6% of Castorice's Max HP + 800 to all allies.",
      icon: "memo_talent_2"
    }
  ],
  additionalAbilities: [
    { name: "Embraced Dark Tide", description: "When allies (excluding the Nether Dragon) receive healing, 100% of the healing amount is converted into [New Pistil]. If the Nether Dragon is on the field, it is converted into the Nether Dragon's HP instead. The cumulative conversion amount for each ally cannot exceed 12% of the [New Pistil] limit. The cumulative conversion amount for all units is reset when any unit acts.", icon: "bonus_1" },
    { name: "Inverted Torch", description: "When Castorice's current HP is at or above 50% of her Max HP, her SPD increases by 40%. When the Nether Dragon casts [Flame Breath that Burns the Darkness] and deals fatal DMG to all enemies on the field or when enemy HP can no longer be reduced, the Nether Dragon's SPD increases by 100%. Lasts for 1 turn.", icon: "bonus_2" },
    { name: "West Wind Tying the Footsteps", description: "Each time the Nether Dragon casts [Flame Breath that Burns the Darkness], its DMG dealt increases by 30%. This effect stacks up to 6 times and lasts until the end of this turn.", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "CRIT Rate", value: "18.7%", icon: "crit_rate" },
    { type: "Quantum DMG Boost", value: "14.4%", icon: "quantum_dmg" },
    { type: "CRIT DMG", value: "13.3%", icon: "crit_dmg" }
  ],
  eidolons: [
    { rank: "E01", name: "Saint of the Snowfield Who Coffins Memories as the Price", description: "When the enemy's current HP is at or below 80%/50% of their Max HP, the DMG dealt to them by [Bone Claws, Embrace of the Nether Dragon], [Claws that Tear the Darkness], [Flame Breath that Burns the Darkness], and [Dark Wings that Burn the Graveyard] becomes 120%/140% of the original DMG.", icon: "eidolon_1" },
    { rank: "E02", name: "Crown Her With Fluttering Flowers", description: "After summoning the Memokeeper Nether Dragon, Castorice gains 2 stacks of [Burning Will]. [Burning Will] can stack up to 2 times and can be used to substitute the HP cost of the Nether Dragon's Memokeeper Skill [Flame Breath that Burns the Darkness]. Additionally, Castorice's Action is Advanced by 100%, and upon casting her next enhanced Skill, Castorice gains [New Pistil] points equal to 30% of the [New Pistil] limit.", icon: "eidolon_2" },
    { rank: "E03", name: "Reverent Traveler Dancing at Death's Door", description: "Ultimate Lv. +2, up to a maximum of Lv. 15. Basic ATK Lv. +1, up to a maximum of Lv. 10. Memokeeper Talent Lv. +1, up to a maximum of Lv. 10.", icon: "eidolon_3" },
    { rank: "E04", name: "Embrace Sorrow and Sleep in Elegy", description: "While Castorice is on the field, the healing received by all allies increases by 20%.", icon: "eidolon_4" },
    { rank: "E05", name: "Dig a Rabbit Hole, Flee Like an Arrow", description: "Skill Lv. +2, up to a maximum of Lv. 15. Talent Lv. +2, up to a maximum of Lv. 15.", icon: "eidolon_5" },
    { rank: "E06", name: "Awaiting the Years to Break the Cocoon", description: "When Castorice and the Nether Dragon deal DMG, their Quantum RES PEN increases by 20%. During attacks, the Nether Dragon can deplete Enemy Toughness regardless of Weakness Types, and triggers Quantum Weakness Break upon Weakness Break. Additionally, the Talent [Dark Wings that Burn the Graveyard] triggers 3 extra Bounce attacks.", icon: "eidolon_6" }
  ],
  specialTerms: {
    "Memokeeper": "An independent entity summoned by a Remembrance Path character. It has its own SPD and skills, and acts on the action order.",
    "Barrier": "A special field created through specific skills. Enhances allies or debuffs enemies within the field.",
    "Action Advance": "Action is Advanced by 100%, moving the action order forward.",
    "[New Pistil]": "Castorice's unique resource. Used as a substitute for Energy and gained whenever an ally loses HP.",
    "[Moon Cocoon]": "A special state granted by Castorice to allies. Temporarily delays Knocked Down status even when receiving a fatal attack.",
    "[Netherworld Forgetting the World]": "A Barrier deployed by Castorice. Reduces the All-Type RES of all enemies."
  }
};

export default castorice_en;