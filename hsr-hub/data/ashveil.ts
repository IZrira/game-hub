import { Character } from '../../common-hub/types';

export const ashveil_en: Character = {
  id: "ashveil",
  name: "Ashveil",
  folderName: "애쉬베일",
  gameId: "hsr",
  attribute: "Lightning",
  path: "The Hunt",
  rarity: 5,
  affiliation: "Paradise of Ideals — Ashen Detective Agency",
  briefInfo: "He takes cases on a whim, cracks them with hard-core logic, and solves the strangest crimes on sheer instinct. With a monkey for an assistant and his heart set on retirement, the detective sleeps in a refrigerator, waiting for the bait to catch its willing prey. Under the light of the Phantasmoon, the vile beast howls. How will he draw the net on this hunt?",
  version: "4.1",
  releaseVersion: "4.1",
  languageNames: "🇰🇷 애쉬베일 / 🇺🇸 Ashveil / 🇨🇳 亚什维尔 / 🇯🇵 アッシュベイル",
  voiceActors: "🇰🇷 Kang Su-jin / 🇺🇸 Blythe Melin / 🇨🇳 Zhang Fei / 🇯🇵 Kenjiro Tsuda",
  metadata: {
    name: "Ashveil",
    language: "🇰🇷 애쉬베일 / 🇺🇸 Ashveil / 🇨🇳 亚什维尔 / 🇯🇵 アッシュベイル",
    element: "Lightning",
    path: "The Hunt",
    rarity: 5,
    affiliation: "Paradise of Ideals — Ashen Detective Agency",
    cv: "🇰🇷 Kang Su-jin / 🇺🇸 Blythe Melin / 🇨🇳 Zhang Fei / 🇯🇵 Kenjiro Tsuda",
    releaseVersion: "4.1",
    brief: "He takes cases on a whim, cracks them with hard-core logic, and solves the strangest crimes on sheer instinct. With a monkey for an assistant and his heart set on retirement, the detective sleeps in a refrigerator, waiting for the bait to catch its willing prey. Under the light of the Phantasmoon, the vile beast howls. How will he draw the net on this hunt?"
  },
  baseStats: {
    lv1: { "Base HP": 116, "Base ATK": 106, "Base DEF": 53 },
    lv20: { "Base HP": 227, "Base ATK": 206, "Base DEF": 103 },
    lv30: { "Base HP": 331, "Base ATK": 301, "Base DEF": 151 },
    lv40: { "Base HP": 436, "Base ATK": 396, "Base DEF": 198 },
    lv50: { "Base HP": 540, "Base ATK": 491, "Base DEF": 246 },
    lv60: { "Base HP": 645, "Base ATK": 586, "Base DEF": 293 },
    lv70: { "Base HP": 749, "Base ATK": 681, "Base DEF": 341 },
    lv80: { "Base HP": 854, "Base ATK": 776, "Base DEF": 388 },
    speed: 106,
    taunt: 75,
    energy: 150
  },
  materials_v2: {
    ascension: [
      { name: "Credit", count: "308,000", rarity: 3 },
      { name: "Thunder Strum", count: "65", rarity: 4 },
      { name: "Whimsy Wax", count: "15", rarity: 2 },
      { name: "Dreamweave Steel", count: "15", rarity: 3 },
      { name: "Lucid Awl", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "Credit", count: "3,000,000", rarity: 3 },
      { name: "Tracks of Destiny", count: "8", rarity: 5 },
      { name: "Vanquished Flow's Reticence", count: "12", rarity: 4 },
      { name: "Grit of Strife", count: "18", rarity: 2 },
      { name: "Resin of Valor", count: "69", rarity: 3 },
      { name: "Lance of Retribution", count: "139", rarity: 4 },
      { name: "Whimsy Wax", count: "41", rarity: 2 },
      { name: "Dreamweave Steel", count: "56", rarity: 3 },
      { name: "Lucid Awl", count: "58", rarity: 4 }
    ]
  },
  skills: [
    { 
      name: "Talons: Inculcate Decorum", 
      tag: "Basic ATK | Single Target",
      energyRegen: "Energy Regen 20",
      toughnessDMG: "Weakness Break (Single) 10",
      spRecovery: "+1",
      description: "Deals Lightning DMG equal to 100% of Ashveil's ATK to one designated enemy.",
      icon: "basic_atk_1"
    },
    { 
      name: "Flog: Smite Evil", 
      tag: "Skill | Single Target",
      energyRegen: "Energy Regen 30",
      toughnessDMG: "Weakness Break (Single) 20",
      spRecovery: "-1",
      description: "Makes one designated enemy become the \"Bait,\" dealing it Lightning DMG equal to 200% of Ashveil's ATK. If the target is already the \"Bait,\" additionally deals it Lightning DMG equal to 100% of Ashveil's ATK, and recovers 1 Skill Point(s). When the \"Bait\" exists on the field, all enemies' DEF gets reduced by 40%. The \"Bait\" state only takes effect on the most recently applied target.",
      icon: "skill_1"
    },
    { 
      name: "Banquet: Insatiable Appetite", 
      tag: "Ultimate | Single Target",
      energyRegen: "Energy Regen 5",
      toughnessDMG: "Weakness Break (Single) 30",
      spRecovery: "0",
      description: "Makes one designated enemy become the \"Bait,\" dealing it Lightning DMG equal to 400% of ATK. Then, immediately launches 1 instance of enhanced Talent's Follow-Up ATK against the \"Bait,\" and Ashveil gains 3 Charge. This enhanced Follow-Up ATK does not consume Charge. Whenever \"Gluttony\" reaches 4 stack(s) or more, consumes 4 stacks of \"Gluttony\" to additionally deal 1 instance of Lightning DMG equal to 200% of ATK. If this instance of Follow-Up ATK deals a killing blow, it continues to attack a new \"Bait\" until \"Gluttony\" is lower than 4.",
      icon: "ultimate_1"
    },
    { 
      name: "Rancor: Enmity Reprisal", 
      tag: "Talent | Single Target",
      energyRegen: "Energy Regen 5",
      toughnessDMG: "Weakness Break (Single) 5",
      spRecovery: "0",
      description: "Ashveil has an initial Charge of 2 (Max 3). After the \"Bait\" gets attacked by other ally targets, Ashveil regenerates a fixed amount of 8 Energy, then consumes 1 Charge to launch Follow-Up ATK against the \"Bait,\" dealing Lightning DMG equal to 200% of ATK. Afterwards, gains 2 stack(s) of \"Gluttony\" (Max 12).",
      icon: "talent_1"
    },
    { 
      name: "Devour: O Loathsome Hand", 
      tag: "Technique | Impair",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "After using Technique, inflicts Daze on enemies within a set area for 10 second(s). Dazed enemies will not actively attack ally targets.\nWhen entering combat via actively attacking a Dazed enemy, deals Lightning DMG to all enemies equal to 100% of Ashveil's ATK, and grants Ashveil 1 Charge.",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "Damnation Trail", description: "When Ashveil uses Skill/Ultimate, gains 1/2 stacks of \"Gluttony.\" During Ashveil's Follow-Up ATK, for every 1 enemy(ies) suffer a killing blow, Ashveil gains 1 stack(s) of \"Gluttony.\"", icon: "bonus_1" },
    { name: "Phantom Limb", description: "DMG dealt by Ashveil's Follow-Up ATK increases by 80%. And for every 1 stack(s) of \"Gluttony\" in possession, DMG dealt by Follow-Up ATK additionally increases by 10%.", icon: "bonus_2" },
    { name: "First Fang", description: "While Ashveil is on the field, CRIT DMG dealt by ally targets increases by 40%, and CRIT DMG dealt by ally target's Follow-Up ATK additionally increases by 80%.", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "CRIT DMG", value: "37.3%", icon: "crit_dmg" },
    { type: "Lightning DMG Boost", value: "14.4%", icon: "lightning_dmg" },
    { type: "ATK Boost", value: "10%", icon: "atk" }
  ],
  eidolons: [
    { rank: "E01", name: "Beware: Venture Not at Full Moon", description: "While Ashveil is on the field, increases DMG taken by all enemies by 24%. When an enemy target's current HP percentage is 50% or lower, the DMG they take increases to 36%.", icon: "eidolon_1" },
    { rank: "E02", name: "Knock: Where Snickers Echo", description: "The max stack limit of \"Gluttony\" increases to 18. After each time Ashveil launches the enhanced Talent's Follow-Up ATK, refunds 35% of the removed \"Gluttony\" stacks.", icon: "eidolon_2" },
    { rank: "E03", name: "Hush: Unsaid Between Friends", description: "Ultimate Lv. +2, up to a maximum of Lv. 15. Basic ATK Lv. +1, up to a maximum of Lv. 10.", icon: "eidolon_3" },
    { rank: "E04", name: "Heed: Swallow Truth Whole", description: "When Ashveil uses Ultimate, increases ATK by 40% for 3 turn(s).", icon: "eidolon_4" },
    { rank: "E05", name: "Caution: Sleuth Turns Slayer", description: "Skill Lv. +2, up to a maximum of Lv. 15. Talent Lv. +2, up to a maximum of Lv. 15.", icon: "eidolon_5" },
    { rank: "E06", name: "Finale: And Then There Were None", description: "When the \"Bait\" exists on the field, reduces all enemies' All-Type RES by 20%. For every 1 stack of \"Gluttony\" Ashveil has gained, the DMG dealt increases by 4%. This effect can stack up to 30 time(s).", icon: "eidolon_6" }
  ],
  specialTerms: {
    "[Bait]": "A target state designated by Ashveil's Skill and Ultimate. Receiving an attack while in this state triggers a follow-up attack.",
    "[Gluttony]": "Stacks gained when Ashveil uses a skill or follow-up attack. Used as a resource for the Ultimate's additional DMG.",
    "Follow-up Attack": "An attack triggered automatically when conditions are met. Does not consume a turn."
  }
};
