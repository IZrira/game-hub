import { ItemDetail } from '../../common-hub/types';
import apiData from './consumables_api_result.json';

export type ConsumableDetail = ItemDetail & {
  enName?: string;
  enDesc?: string;
  enSources?: string[];
};

const MANUAL_DATA: Record<string, ConsumableDetail> = {
  // --- 특수/기능성 ---
  "연료": { enName: "Fuel", desc: "개척력을 보충하는 아이템. 개척력을 60pt 회복한다", enDesc: "An item that restores Trailblaze Power. Recovers 60 Trailblaze Power.", type: "소모품", rarity: 4, sources: ["레벨 보상"] },
  "유물 잔해": { enName: "Relic Remains", desc: "유물 분해 후 획득하는 물질", enDesc: "Material salvaged from Relics.", type: "소모품", rarity: 5, sources: ["유물 분해"], enSources: ["Salvaging 5-star Relics", "Nameless Honor", "Sold by Jokes Come True", "Events"] },
  "자가 변형성 레진": { enName: "Self-Modeling Resin", desc: "유물을 제작할 때 사용되는 희귀한 재료. 합성 시 유물에 출현할 수 있는 메인 속성 중 1가지를 지정할 수 있으며, 추가 소모 시 보조 속성 중에서도 1~2가지를 지정할 수 있다", enDesc: "Rare material used in Relic Synthesis. Allows you to specify 1 main stat for the relic.", type: "소모품", rarity: 5, sources: ["무명의 공훈", "「만능 합성기」- 유물 잔해로 합성"], fileName: "자가 변형성 레진" },
  "소원 레진": { enName: "Wishful Resin", desc: "유물 커스텀 제작에 사용되는 희귀 재료. 최대 두 가지 보조 속성을 지정 합성할 수 있다", enDesc: "Matchless materials used to customize Relics. Can be used to specify up to 2 Subsidiary Stats when synthesizing.", type: "소모품", rarity: 5, sources: ["무명의 공훈", "「만능 합성기」- 자가 변형성 레진으로 합성", "「만능 합성기」- 유물 잔해로 합성"], enSources: ["Nameless Honor Lv. 50 (1 per version)", "Nameless Glory Lv. 20 (1 per version)", "Omni-Synthesizer — Synthesis using Self-Modeling Resin", "Omni-Synthesizer — Synthesis using Relic Remains", "The Herta Contract: Strategic Cooperation", "The Herta Contract: Strategic Support"] },
  "변수 주사위": { enName: "Variable Dice", desc: "최고 레벨인 ★5 유물의 보조 속성 업그레이드 횟수를 재분배하고 그 수치를 랜덤으로 설정하는 데 사용할 수 있다", enDesc: "Use to re-assign the upgrade counts for Subsidiary Stats of fully-enhanced 5-star Relics and randomize their values.", type: "소모품", rarity: 5, sources: ["무명의 공훈", "「만능 합성기」- 재료 합성"], enSources: ["Nameless Honor", "Omni-Synthesizer - Material Synthesis"] },
  "간섭 암호키": { enName: "Interference Cheat Code", desc: "변수 주사위를 사용하여 ★5 유물의 보조 속성 재설정 시, 1개의 보조 속성을 선택하여 배제할 수 있으며, 배제된 보조 속성은 이번 재설정에서 강화되지 않는다", enDesc: "When resetting 5-star Relic sub-stats using Dice of Variables, you can exclude 1 sub-stat from being upgraded.", type: "소모품", rarity: 5, sources: ["이상 중재"], enSources: ["Anomaly Arbitration"] },

  // --- 1성 소모품 ---
  "배 채울 식량": { enName: "Comfort Food", desc: "사용 후 즉시 지정된 단일 아군의 HP를 자신 HP 최대치의 15%만큼 회복하고, 추가로 HP를 150pt 회복한다.", enDesc: "Upon use, instantly heals one target ally for 15% of their Max HP plus an extra 150 HP.", type: "소모품", rarity: 1, sources: ["「만능 합성기」", "자판기"] },
  "징벌의 식량": { enName: "Punitive Food", desc: "사용 후 즉시 아군의 비술 포인트를 2pt 회복하고, 모든 아군은 각자 HP 최대치 15%만큼의 HP를 소모한다", enDesc: "Upon use, immediately recovers 2 Technique Points for the team, and all allies consume HP equal to 15% of their Max HP.", type: "소모품", rarity: 1, sources: ["「만능 합성기」"] },
  "특이한 간식": { enName: "Trick Snack", desc: "사용 후 즉시 아군의 비술 포인트를 2pt 회복한다", enDesc: "Upon use, immediately recovers 2 Technique Points for the team.", type: "소모품", rarity: 1, sources: ["「만능 합성기」", "자판기"] },
  "간이 소생기": { enName: "Simple First-Aid Device", desc: "사용 후 즉시 전투 불능 상태에 빠진 지정된 단일 아군의 HP를 자신의 HP 최대치의 5%만큼 회복한다", enDesc: "Upon use, immediately revives a single downed ally and restores their HP to 5% of their Max HP.", type: "소모품", rarity: 1, sources: ["「만능 합성기」", "자판기"] },
  "별타로 버블티": { enName: "Startaro Bubble", desc: "사용 후 즉시 아군의 비술 포인트를 2pt 회복하고, 모든 아군은 각자 HP 최대치 15%만큼의 HP를 소모한다", enDesc: "Upon use, immediately recovers 2 Technique Points for the team, and all allies consume HP equal to 15% of their Max HP.", type: "소모품", rarity: 1, sources: ["「만능 합성기」"] },
  "적토 먹이": { enName: "Red", desc: "사용 후 즉시 지정된 단일 아군의 HP를 자신의 HP 최대치의 20%만큼 회복한다", enDesc: "Upon use, instantly heals one target ally for 20% of their Max HP.", type: "소모품", rarity: 1, sources: ["「만능 합성기」", "드로마스 상단(이동 상인)"] },
  "쓰레기": { enName: "Trash", desc: "사용 후 즉시 지정된 단일 아군 HP 최대치 15%만큼의 HP를 소모한다", enDesc: "Upon use, immediately consumes HP equal to 15% of Max HP for a single ally.", type: "소모품", rarity: 1, sources: ["「야릴로-Ⅵ」 파괴 가능한 물체 드랍"] },
  "몽맥 롤빵": { enName: "Tapir Baked Bun", desc: "사용 후 즉시 지정된 단일 아군의 HP를 자신 HP 최대치의 20%만큼 회복한다", enDesc: "Upon use, instantly heals one target ally for 20% of their Max HP.", type: "소모품", rarity: 1, sources: ["선주 「나부」의 포장마차에서 구매"] },
  "열매공작 꼬치": { enName: "Berrypheasant Skewers", desc: "사용 후 즉시 지정된 단일 아군의 HP를 자신 HP 최대치의 15%만큼 회복하고, 추가로 HP를 150pt 회복한다.", enDesc: "Upon use, instantly heals one target ally for 15% of their Max HP plus an extra 150 HP.", type: "소모품", rarity: 1, sources: ["선주 「나부」의 포장마차에서 구매"] },
  "호밀빵 소다 빙수": { enName: "Rye Bread Soda Ice Sand", desc: "사용 후 즉시 지정된 단일 아군의 HP를 자신 HP 최대치의 15%만큼 회복하고, 추가로 HP를 150pt 회복한다.", enDesc: "Upon use, instantly heals one target ally for 15% of their Max HP plus an extra 150 HP.", type: "소모품", rarity: 1, sources: ["선주 「나부」의 포장마차에서 구매"] },
  "석판 산해진미 구이": { enName: "Stone-Grilled Oculus", desc: "사용 후 다음번 전투에서 모든 아군의 HP 최대치가 12% 증가한다", enDesc: "Upon use, increases Max HP of all allies by 12% for the next battle.", type: "소모품", rarity: 1, sources: ["야릴로-Ⅵ의 극지 탐험가•링스에게서 구매"] },
  "군함 행운패": { enName: "Cruisewing Good Luck Charm", desc: "사용 후 즉시 아군의 비술 포인트를 2pt 회복한다", enDesc: "Upon use, immediately recovers 2 Technique Points for the team.", type: "소모품", rarity: 1, sources: ["선주 「나부」의 고물 점포에서 구매"] },
  "대환단": { enName: "Large Healing Pill", desc: "사용 후 즉시 지정된 단일 아군의 HP를 10pt 회복한다", enDesc: "Upon use, instantly heals one target ally for 10 HP.", type: "소모품", rarity: 1, sources: ["선주 「나부」의 영인의 약방에서 구매"] },
  "소환단": { enName: "Small Healing Pill", desc: "사용 후 즉시 지정된 단일 아군의 HP를 1pt 회복한다", enDesc: "Upon use, instantly heals one target ally for 1 HP.", type: "소모품", rarity: 1, sources: ["선주 「나부」의 영인의 약방에서 구매"] },
  "신문": { enName: "Newspaper", desc: "사용 후 즉시 지정된 단일 아군의 HP를 자신의 HP 최대치 15%만큼 회복하고, 추가로 HP를 150pt 회복한다", enDesc: "Upon use, instantly heals one target ally for 15% of their Max HP plus an extra 150 HP.", type: "소모품", rarity: 1, sources: ["페나코니의 신문 카트에서 구매"] },
  "비검 모형": { enName: "Flying Sword Model", desc: "사용 후 다음번 전투에서 모든 아군의 공격력이 100pt 증가한다", enDesc: "Upon use, increases ATK of all allies by 100 for the next battle.", type: "소모품", rarity: 1, sources: ["솔글래드™ 공식 플래그십 스토어(경기 함선 지점)"] },
  "양심": { enName: "Conscience", desc: "사용 후 즉시 전투 불능 상태에 빠진 지정된 단일 아군의 HP를 자신의 HP 최대치의 5%만큼 회복한다", enDesc: "Upon use, immediately revives a single downed ally and restores their HP to 5% of their Max HP.", type: "소모품", rarity: 1, sources: ["그래피아 아카데미 매점"] },

  // --- 2성 소모품 ---
  "대우주 볶음밥": { enName: "Cosmic Fried Rice", desc: "사용 후 즉시 지정된 단일 아군의 HP를 자신의 HP 최대치 24%만큼 회복하고, 추가로 HP를 300pt 회복한다", enDesc: "Upon use, instantly heals one target ally for 24% of their Max HP plus an extra 300 HP.", type: "소모품", rarity: 2, sources: ["「만능 합성기」", "자판기"] },
  "맛없는 볶음밥": { enName: "Nauseating Fried Rice", desc: "사용 후 즉시 모든 아군은 각자 HP 최대치 15%만큼의 HP를 소모하고 다음번 전투에서 모든 아군의 공격력이 200pt 증가한다", enDesc: "Upon use, all allies consume HP equal to 15% of their Max HP, and increases ATK of all allies by 200 for the next battle.", type: "소모품", rarity: 2, sources: ["「만능 합성기」"] },
  "징벌의 에너지": { enName: "Punitive Energy", desc: "사용 후 즉시 아군이 비술 포인트를 4pt 회복하고 모든 아군은 각자 HP 최대치 15%만큼의 HP를 소모한다", enDesc: "Upon use, immediately recovers 4 Technique Points for the team, and all allies consume HP equal to 15% of their Max HP.", type: "소모품", rarity: 2, sources: ["「만능 합성기」"] },
  "에너지 음료": { enName: "Energy Drink", desc: "사용 후 즉시 지정된 단일 아군의 에너지를 자신의 에너지 최대치 30%만큼 회복한다", enDesc: "Upon use, immediately recovers 30% of Max Energy for a single ally.", type: "소모품", rarity: 2, sources: ["「만능 합성기」", "자판기"] },
  "생명 전송기": { enName: "Life Transmitter", desc: "사용 후 즉시 전투 불능 상태에 빠진 지정된 단일 아군의 HP를 자신의 HP 최대치의 10%만큼 회복한다", enDesc: "Upon use, immediately revives a single downed ally and restores their HP to 10% of their Max HP.", type: "소모품", rarity: 2, sources: ["「만능 합성기」"] },
  "해피 워터": { enName: "Bottled Soda", desc: "사용 후 다음번 전투에서 모든 아군의 HP 최대치가 10% 증가하고, 추가로 HP 최대치가 210pt 증가한다", enDesc: "Upon use, increases Max HP of all allies by 10% plus an extra 210 HP for the next battle.", type: "소모품", rarity: 2, sources: ["「만능 합성기」", "자판기"] },
  "간이 방어구": { enName: "Simple Protective Gear", desc: "사용 후 다음번 전투에서 모든 아군의 방어력이 25% 증가한다", enDesc: "Upon use, increases DEF of all allies by 25% for the next battle.", type: "소모품", rarity: 2, sources: ["「만능 합성기」"] },
  "벼꽃": { enName: "Rice Blossom", desc: "사용 후 다음번 전투에서 모든 아군의 회복량이 18% 증가한다", enDesc: "Upon use, increases Outgoing Healing of all allies by 18% for the next battle.", type: "소모품", rarity: 2, sources: ["「만능 합성기」"] },
  "위장 페인트": { enName: "Camo Paint", desc: "사용 후 적에게 발견될 확률이 감소한다. 지속 시간: 75초", enDesc: "After use, reduces the chance of being detected by enemies for 75 seconds.", type: "소모품", rarity: 2, sources: ["「만능 합성기」"] },
  "웰빙 쌀 볶음": { enName: "Healthy Fried Rice", desc: "사용 후 즉시 지정된 단일 아군의 HP를 자신 HP 최대치의 28%만큼 회복하고, 추가로 HP를 250pt 회복한다", enDesc: "Upon use, instantly heals one target ally for 28% of their Max HP plus an extra 250 HP.", type: "소모품", rarity: 2, sources: ["「만능 합성기」"] },
  "분노의 글러브": { enName: "Wrathful Gauntlets", desc: "사용 후 다음번 전투에서 모든 아군의 공격력이 5% 증가하고, 추가로 공격력이 170pt 증가한다", enDesc: "Upon use, increases ATK of all allies by 5% plus an extra 170 ATK for the next battle.", type: "소모품", rarity: 2, sources: ["「만능 합성기」"] },
  "과일나무로 구운 샤타른 모아 날개 구이": { enName: "Fruitwood-Grilled Shatar Moa Wings", desc: "사용 후 다음번 전투에서 모든 아군이 가하는 화염 속성 피해가 16% 증가한다", enDesc: "Upon use, increases Fire DMG of all allies by 16% for the next battle.", type: "소모품", rarity: 2, sources: ["「만능 합성기」", "자미성"] },
  "화염차": { enName: "Flaming Pot", desc: "사용 후 모든 아군은 즉시 각자 HP 최대치 5%만큼의 HP를 소모하고, 다음번 전투에서 빙결 상태 저항 확률이 30% 증가한다", enDesc: "Upon use, all allies consume HP equal to 5% of their Max HP, and increases Freeze RES by 30% for the next battle.", type: "소모품", rarity: 2, sources: ["「만능 합성기」", "두가네 찻집"] },
  "불구인(不求人)": { enName: "Back Scratcher", desc: "사용 후 다음번 전투에서 모든 아군의 공격력이 190pt 증가한다", enDesc: "Upon use, increases ATK of all allies by 190 for the next battle.", type: "소모품", rarity: 2, sources: ["「만능 합성기」"] },
  "말미잘 튀김": { enName: "Deep-Fried Anemone", desc: "사용 후 다음번 전투에서 모든 아군이 가하는 번개 속성 피해가 16% 증가한다", enDesc: "Upon use, increases Lightning DMG of all allies by 16% for the next battle.", type: "소모품", rarity: 2, sources: ["「만능 합성기」"] },
  "호박(琥珀) 화조주": { enName: "Amber Hua-Jiao Wine", desc: "사용 후 즉시 모든 아군은 각자 HP 최대치의 5%만큼 HP를 소모하고, 다음번 전투에서 HP 최대치가 24% 증가한다", enDesc: "Upon use, all allies consume HP equal to 5% of their Max HP, and increases Max HP by 24% for the next battle.", type: "소모품", rarity: 2, sources: ["「만능 합성기」"] },
  "맛있는 얇은 피 만두": { enName: "Delicious Thin-Skin Dumpling", desc: "사용 후 즉시 지정된 단일 아군의 에너지가 30% 회복된다", enDesc: "Upon use, immediately recovers 30% of Max Energy for a single ally.", type: "소모품", rarity: 2, sources: ["「만능 합성기」"] },
  "맛있는 팥앙금 빵": { enName: "Delicious Red Bean Paste Bun", desc: "사용 후 다음번 전투에서 모든 아군이 가하는 허수 속성 피해가 16% 증가한다", enDesc: "Upon use, increases Imaginary DMG of all allies by 16% for the next battle.", type: "소모품", rarity: 2, sources: ["「만능 합성기」"] },
  "시계 피자(한 조각)": { enName: "Clock Pizza (Single Slice)", desc: "사용 후 다음번 전투에서 모든 아군이 가하는 피해가 24% 증가하고, 속도가 5% 감소한다", enDesc: "Upon use, increases DMG of all allies by 24% and decreases SPD by 5% for the next battle.", type: "소모품", rarity: 2, sources: ["「만능 합성기」", "시계 식당"] },
  "조각 케이크 「스타게이지」": { enName: "Sliced Cake 'Stargazer'", desc: "사용 후 즉시 지정된 단일 아군의 에너지를 30% 회복한다", enDesc: "Upon use, immediately recovers 30% of Max Energy for a single ally.", type: "소모품", rarity: 2, sources: ["「만능 합성기」", "시계 식당"] },
  "「청어 씨」 레몬 타르트": { enName: "'Mr. Herring' Lemon Tart", desc: "사용 후 다음번 전투에서 모든 아군의 방어력이 25% 증가한다", enDesc: "Upon use, increases DEF of all allies by 25% for the next battle.", type: "소모품", rarity: 2, sources: ["「만능 합성기」", "시계 식당"] },
  "백 층 선디(제로칼로리)": { enName: "Hundred-Layer Sundae (Zero Calorie)", desc: "사용 후 다음번 전투에서 모든 아군의 HP 최대치가 10% 증가하고, 추가로 HP 최대치가 210pt 증가한다", enDesc: "Upon use, increases Max HP of all allies by 10% plus an extra 210 HP for the next battle.", type: "소모품", rarity: 2, sources: ["「만능 합성기」", "시계 식당"] },
  "클래식 솔글래드": { enName: "Classic SoulGlad", desc: "사용 후 다음번 전투에서 모든 아군의 공격력이 10% 증가하고, 추가로 공격력이 120pt 증가한다", enDesc: "Upon use, increases ATK of all allies by 10% plus an extra 120 ATK for the next battle.", type: "소모품", rarity: 2, sources: ["「만능 합성기」", "앤더슨"] },
  "「새콤한 꿈」 소프트 캔디": { enName: "'Sour Dreams' Soft Candy", desc: "사용 후 즉시 지정된 단일 아군의 HP를 자신의 HP 최대치 24%만큼 회복하고, 추가로 HP를 300pt 회복한다", enDesc: "Upon use, instantly heals one target ally for 24% of their Max HP plus an extra 300 HP.", type: "소모품", rarity: 2, sources: ["「만능 합성기」", "팝콘 푸드트럭"] },
  "「다채로운 꿈」 모둠 캔디": { enName: "'Colorful Dreams' Assorted Candies", desc: "사용 후 다음번 전투에서 턴 시작 시 모든 아군이 일정 확률로 에너지를 소모하거나 회복하며, HP를 소모하거나 회복한다", enDesc: "Upon use, all allies have a chance to consume/recover Energy or consume/recover HP at the start of their turn for the next battle.", type: "소모품", rarity: 2, sources: ["「만능 합성기」", "아이스크림 카트"] },
  "잠깐의 자유": { enName: "Momentary Freedom", desc: "사용 후 다음번 전투에서 모든 아군의 HP 최대치가 15% 증가하고, 추가로 HP 최대치가 100pt 증가한다", enDesc: "Upon use, increases Max HP of all allies by 15% plus an extra 100 HP for the next battle.", type: "소모품", rarity: 2, sources: ["「만능 합성기」", "꿈세계 판매점"] },
  "돌에 박힌 검": { enName: "Sword in the Stone", desc: "사용 후 다음번 전투에서 모든 아군의 공격력이 190pt 증가한다", enDesc: "Upon use, increases ATK of all allies by 190 for the next battle.", type: "소모품", rarity: 2, sources: ["「만능 합성기」"] },
  "우주 맹수 스튜": { enName: "Cosmic Big Swag Stew", desc: "사용 후 높은 확률로 즉시 지정된 단일 아군의 HP를 자신의 HP 최대치의 50%만큼 회복하고, 낮은 확률로 단일 아군이 즉시 각자 HP 최대치의 99%만큼 HP를 소모한다", enDesc: "Upon use, has a high chance to heal 50% of Max HP for a single ally, and a low chance to consume 99% of Max HP for a single ally.", type: "소모품", rarity: 2, sources: ["「만능 합성기」"] },
  "황금 허니 팬케이크": { enName: "Golden Honey Pancake", desc: "사용 후 다음번 전투에서 전투 진입 시 즉시 모든 아군의 HP를 각자 HP 최대치의 24%만큼 회복한다", enDesc: "Upon entering the next battle, instantly heals all allies for 24% of their Max HP.", type: "소모품", rarity: 2, sources: ["「만능 합성기」", "마모리얼 음식점"] },
  "조잡한 암브로시아": { enName: "Crude Ambrosia", desc: "사용 후 다음번 전투에서 모든 아군의 HP 최대치가 20% 증가한다", enDesc: "Upon use, increases Max HP of all allies by 20% for the next battle.", type: "소모품", rarity: 2, sources: ["「만능 합성기」", "마모리얼 음식점"] },
  "말린 교훈 과일": { enName: "Dried Lesson-Fruit", desc: "사용 후 즉시 아군의 비술 포인트를 3pt 회복한다", enDesc: "Upon use, immediately recovers 3 Technique Points for the team.", type: "소모품", rarity: 2, sources: ["「만능 합성기」", "마모리얼 음식점"] },
  "북대륙 투구": { enName: "North Continent Helm", desc: "사용 후 다음번 전투에서 모든 아군이 획득하는 실드량이 18% 증가한다", enDesc: "Upon use, increases Shield Effect of all allies by 18% for the next battle.", type: "소모품", rarity: 2, sources: ["「만능 합성기」"] },
  "꿀 치즈 튀김": { enName: "Honey-Fried Cheese", desc: "사용 후 즉시 지정된 단일 아군의 에너지를 자신의 에너지 최대치 30%만큼 회복한다", enDesc: "Upon use, immediately recovers 30% of Max Energy for a single ally.", type: "소모품", rarity: 2, sources: ["「만능 합성기」"] },
  "메마른 「빵」": { enName: "Dry 'Bread'", desc: "사용 후 즉시 지정된 단일 아군의 HP를 자신의 HP 최대치 24%만큼 회복하고, 추가로 HP를 300pt 회복한다", enDesc: "Upon use, instantly heals one target ally for 24% of their Max HP plus an extra 300 HP.", type: "소모품", rarity: 2, sources: ["「만능 합성기」"] },

  // --- 3성 소모품 ---
  "치유 스프레이": { enName: "Healing Spray", desc: "사용 후 즉시 지정된 단일 아군의 HP를 자신 HP 최대치의 38%만큼 회복하고, 추가로 HP를 400pt 회복한다", enDesc: "Upon use, instantly heals one target ally for 38% of their Max HP plus an extra 400 HP.", type: "소모품", rarity: 3, sources: ["「만능 합성기」"] },
  "일회용 보호벽": { enName: "Disposable Shield", desc: "사용 후 다음번 전투에서 모든 아군의 방어력이 15% 증가하고 효과 저항이 10% 증가한다", enDesc: "Upon use, increases DEF by 15% and Effect RES by 10% for all allies in the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기」"] },
  "에너지 음료(무가당)": { enName: "Energy Drink (Sugar-Free)", desc: "사용 후 즉시 지정된 단일 아군의 에너지를 자신의 에너지 최대치 50%만큼 회복한다", enDesc: "Upon use, immediately recovers 50% of Max Energy for a single ally.", type: "소모품", rarity: 3, sources: ["「만능 합성기」"] },
  "반물질 역장 생성기": { enName: "Antimatter Field Generator", desc: "사용 후 다음번 전투에서 모든 아군의 공격력이 260pt 증가하고 치명타 확률이 8% 증가한다", enDesc: "Upon use, increases ATK by 260 and CRIT Rate by 8% for all allies in the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기」"] },
  "첨단 방어구": { enName: "High-Tech Protective Gear", desc: "사용 후 다음번 전투에서 모든 아군의 방어력이 15% 증가하고 획득하는 실드량이 18% 증가한다", enDesc: "Upon use, increases DEF by 15% and Shield Effect by 18% for all allies in the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기」"] },
  "조잡한 방어구": { enName: "Low-Tech Protective Gear", desc: "사용 후 즉시 모든 아군은 각자 HP 최대치 15%만큼의 HP를 소모하고, 다음번 전투에서 방어력이 15% 증가한다", enDesc: "Upon use, all allies consume 15% of their Max HP, and increases DEF by 15% for the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기」"] },
  "맛있는 에너지바": { enName: "Delicious Energy Bar", desc: "사용 후 다음번 전투에서 모든 아군의 HP 최대치가 14% 증가하고, 추가로 HP 최대치가 360pt 증가한다", enDesc: "Upon use, increases Max HP of all allies by 14% plus an extra 360 HP for the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기」"] },
  "재빠른 먼지": { enName: "Fleetfoot Dust", desc: "사용 후 다음번 전투에서 모든 아군의 속도가 12% 증가한다", enDesc: "Upon use, increases SPD of all allies by 12% for the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기」"] },
  "강화 연고: 물리": { enName: "Enhancement Paste: Physical", desc: "사용 후 다음번 전투에서 모든 아군이 가하는 물리 속성 피해가 24% 증가한다", enDesc: "Upon use, increases Physical DMG of all allies by 24% for the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기」"], fileName: "강화연고_물리" },
  "강화 연고: 바람": { enName: "Enhancement Paste: Wind", desc: "사용 후 다음번 전투에서 모든 아군이 가하는 바람 속성 피해가 24% 증가한다", enDesc: "Upon use, increases Wind DMG of all allies by 24% for the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기」"], fileName: "강화연고_바람" },
  "강화 연고: 화염": { enName: "Enhancement Paste: Fire", desc: "사용 후 다음번 전투에서 모든 아군이 가하는 화염 속성 피해가 24% 증가한다", enDesc: "Upon use, increases Fire DMG of all allies by 24% for the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기」"], fileName: "강화연고_화염" },
  "강화 연고: 얼음": { enName: "Enhancement Paste: Ice", desc: "사용 후 다음번 전투에서 모든 아군이 가하는 얼음 속성 피해가 24% 증가한다", enDesc: "Upon use, increases Ice DMG of all allies by 24% for the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기」"], fileName: "강화연고_얼음" },
  "강화 연고: 번개": { enName: "Enhancement Paste: Lightning", desc: "사용 후 다음번 전투에서 모든 아군이 가하는 번개 속성 피해가 24% 증가한다", enDesc: "Upon use, increases Lightning DMG of all allies by 24% for the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기」"], fileName: "강화연고_번개" },
  "강화 연고: 양자": { enName: "Enhancement Paste: Quantum", desc: "사용 후 다음번 전투에서 모든 아군이 가하는 양자 속성 피해가 24% 증가한다", enDesc: "Upon use, increases Quantum DMG of all allies by 24% for the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기」"], fileName: "강화연고_양자" },
  "강화 연고: 허수": { enName: "Enhancement Paste: Imaginary", desc: "사용 후 다음번 전투에서 모든 아군이 가하는 허수 속성 피해가 24% 증가한다", enDesc: "Upon use, increases Imaginary DMG of all allies by 24% for the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기」"], fileName: "강화연고_허수" },
  "구토제": { enName: "Vomit Inducing Agent", desc: "사용 후 즉시 지정된 단일 아군 HP 최대치 99%만큼의 HP를 소모한다", enDesc: "Upon use, immediately consumes 99% of Max HP for a single ally.", type: "소모품", rarity: 3, sources: ["「만능 합성기」"] },
  "짱짱 포션": { enName: "Invigorating Potion", desc: "사용 후 즉시 지정된 단일 아군의 에너지를 자신의 에너지 최대치의 50%만큼 회복한다", enDesc: "Upon use, immediately recovers 50% of Max Energy for a single ally.", type: "소모품", rarity: 3, sources: ["「만능 합성기」"] },
  "설원 찌개": { enName: "Snowland Stew", desc: "사용 후 다음번 전투에서 모든 아군이 받는 화염 속성 피해가 16% 감소하고, HP 최대치가 20% 증가한다", enDesc: "Upon use, decreases Fire DMG taken by 16% and increases Max HP by 20% for all allies in the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기」"] },
  "독경기": { enName: "Toxic Gu", desc: "사용 후 다음 전투에서 모든 아군과 모든 적은 턴 시작 시 HP를 1,000pt 회복한다. 지속 시간: 5턴", enDesc: "Upon use, all allies and enemies heal 1,000 HP at the start of their turns for 5 turns in the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기」"] },
  "오곡즙": { enName: "Five-Grain Extract", desc: "사용 후 모든 아군은 즉시 각자 HP 최대치 5%만큼의 HP를 소모하고, 다음번 전투에서 가하는 비술 피해가 100% 증가한다", enDesc: "Upon use, all allies consume 5% of their Max HP, and increases Technique DMG by 100% for the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기」", "두가네 찻집"] },
  "기황해독환": { enName: "Qihuang Detox Pill", desc: "사용 후 다음번 전투에서 모든 아군은 3턴 동안 디버프 효과에 빠지지 않는다", enDesc: "Upon use, all allies become immune to debuffs for 3 turns in the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기」", "장수당"] },
  "옥수풍골산": { enName: "Jade Marrow Extract", desc: "사용 후 다음번 전투에서 모든 아군의 효과 저항이 30% 증가한다", enDesc: "Upon use, increases Effect RES of all allies by 30% for the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기」", "장수당"] },
  "폼폼 특제 후라이드": { enName: "Pom-Pom's Fried Fowl", desc: "사용 후 다음번 전투에서 모든 아군이 가하는 화염 속성 피해가 16% 증가하고, 공격력이 18% 증가한다", enDesc: "Upon use, increases Fire DMG by 16% and ATK by 18% for all allies in the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기」"] },
  "아동용 향귤환": { enName: "Children's Fragrant Orange Pill", desc: "사용 후 즉시 지정된 단일 아군의 HP를 자신의 HP 최대치 40%만큼 회복하고, 추가로 HP를 320pt 회복한다", enDesc: "Upon use, instantly heals one target ally for 40% of their Max HP plus an extra 320 HP.", type: "소모품", rarity: 3, sources: ["「만능 합성기」"] },
  "알팔파 샐러드": { enName: "Alfalfa Salad", desc: "사용 후 다음번 전투에서 모든 아군의 치명타 확률이 18% 증가한다", enDesc: "Upon use, increases CRIT Rate of all allies by 18% for the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기」", "시계 식당"] },
  "배반을 선택한 순간": { enName: "The Moment of Betrayal", desc: "사용 후 다음번 전투에서 모든 아군의 치명타 피해가 36% 증가한다", enDesc: "Upon use, increases CRIT DMG of all allies by 36% for the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기」", "꿈세계 판매점"] },

  // --- 2.4+ & 신규 지역 소모품 (한글화) ---
  "걱정하지 말게나나": { desc: "사용 후 즉시 지정된 단일 아군의 에너지를 자신의 에너지 최대치 30%만큼 회복한다", type: "소모품", rarity: 2, sources: ["샬레카"] },
  "동굴 도롱뇽 돌판구이": { desc: "사용 후 즉시 전투 불능 상태에 빠진 지정된 단일 아군의 HP를 자신 HP 최대치의 30%만큼 회복한다", type: "소모품", rarity: 3, sources: ["포장마차"] },
  "「스파키」 언리미티드 컬렉터 에디션 인형": { desc: "사용 후 다음번 전투에서 모든 아군의 치명타 피해가 24% 증가한다", type: "소모품", rarity: 2, sources: ["∞ 11 편의점"] },
  "보물 증정 벨트": { desc: "무한으로 사용할 수 있는 보물 탐지 도구. 사용 후 「『헤르타』 우주정거장」 관련 맵에 일반 전리품 1개의 위치를 표시할 수 있다", type: "소모품", rarity: 5, sources: ["「내부 구매 담당」 점수 보상 획득"] },
  "생물파 탐지기": { desc: "무한으로 사용할 수 있는 보물 탐지 도구. 사용 후 「야릴로-Ⅵ」 관련 맵에 일반 전리품 1개의 위치를 표시할 수 있다", type: "소모품", rarity: 5, sources: ["「지하 상점」 점수 보상 획득"] },
  "보물이 고픈 옥손": { desc: "무한으로 사용할 수 있는 보물 탐지 도구. 사용 후 「선주 『나부』」 관련 맵에 일반 전리품 1개의 위치를 표시할 수 있다", type: "소모품", rarity: 5, sources: ["「속주각」 점수 보상 획득"] },
  "부호가 남긴 꿈": { desc: "무한으로 사용할 수 있는 보물 탐지 도구. 사용 후 「페나코니」 관련 맵에 일반 전리품 1개의 위치를 표시할 수 있다", type: "소모품", rarity: 5, sources: ["「시계 소년 조각상」 레벨 보상 획득"] },
  "하늘을 속이는 눈": { desc: "무한으로 사용할 수 있는 보물 탐지 도구. 사용 후 「앰포리어스」 관련 맵에 일반 전리품 1개의 위치를 표시할 수 있다", type: "소모품", rarity: 5, sources: ["「조수의 선물」 레벨 보상 획득"] },
  "빵빵 너굴": { desc: "무한으로 사용할 수 있는 보물 탐지 도구. 사용 후 「이상 낙원」 관련 맵에 일반 전리품 1개의 위치를 표시할 수 있다", type: "소모품", rarity: 5, sources: ["「너굴 통신」 흥행 레벨 보상으로 획득"] },
  "「공허한 새」 인형": { desc: "사용 후 다음번 전투에서 모든 아군의 속도가 20% 증가하고, 턴이 시작될 때마다 현재 HP의 20%만큼 HP를 소모한다. 지속 시간: 5턴", type: "소모품", rarity: 2, sources: ["커크"] },
  "가정용 즐거움의 천사": { desc: "사용 후 즉시 아군의 비술 포인트를 3pt 회복한다", type: "소모품", rarity: 2, sources: ["∞ 11 편의점"] },
  "강철 발톱 비수": { desc: "사용 후 다음번 전투에서 모든 아군의 공격력이 20% 증가한다. 현재 HP 백분율이 50% 미만이면 공격력이 추가로 20% 증가한다", type: "소모품", rarity: 2, sources: ["칼토너스의 대장간"] },
  "건식 비상등": { desc: "사용 후 즉시 아군의 비술 포인트를 3pt 회복한다", type: "소모품", rarity: 2, sources: ["기한 경과 우편물 인수처"] },
  "나나 에티켓": { desc: "사용 후 즉시 지정된 단일 아군의 HP를 자신의 HP 최대치의 24%만큼 회복하고, 추가로 HP를 300pt 회복한다", type: "소모품", rarity: 2, sources: ["샬레카"] },
  "단꿈 소다수": { desc: "사용 후 다음번 전투에서 모든 아군이 받는 피해가 10% 감소한다", type: "소모품", rarity: 2, sources: ["기한 경과 우편물 인수처"] },
  "대지의 수정 광석": { desc: "사용 후 즉시 지정된 단일 아군의 에너지를 자신의 에너지 최대치 30%만큼 회복한다", type: "소모품", rarity: 2, sources: ["드로마스 상단(이동 상인)"] },
  "따끈 양유": { desc: "사용 후 즉시 전투 불능 상태에 빠진 지정된 단일 아군의 HP를 자신의 HP 최대치의 10%만큼 회복한다", type: "소모품", rarity: 2, sources: ["포장마차"] },
  "망상 블록": { desc: "사용 후 다음번 전투에서 모든 아군의 치명타 확률이 18% 증가하고, 속도가 5% 감소한다", type: "소모품", rarity: 2, sources: ["커크"] },
  "믿음의 증표": { desc: "사용 후 즉시 아군의 비술 포인트를 3pt 회복한다", type: "소모품", rarity: 2, sources: ["간식 가게 사장"] },
  "서리무늬 연어 샌드위치": { desc: "사용 후 다음번 전투에서 모든 아군이 받는 화염 속성 피해가 16% 감소한다", type: "소모품", rarity: 2, sources: ["극지 탐험가•링스"] },
  "석홍잼 생선 전채": { desc: "사용 후 다음번 전투에서 모든 아군의 공격력이 5% 증가하고, 추가로 공격력이 170pt 증가한다", type: "소모품", rarity: 2, sources: ["포장마차"] },
  "소다 두유": { desc: "사용 후 다음번 전투에서 모든 아군의 공격력이 5% 증가하고, 추가로 공격력이 170pt 증가한다", type: "소모품", rarity: 2, sources: ["자판기"] },
  "수뢰 버섯": { desc: "사용 후 다음번 전투에서 모든 아군의 공격력이 5% 증가하고, 추가로 공격력이 170pt 증가한다", type: "소모품", rarity: 2, sources: ["기한 경과 우편물 인수처"] },
  "슈퍼 방송 매트릭스": { desc: "사용 후 즉시 지정된 단일 아군의 에너지를 자신의 에너지 최대치의 30%만큼 회복한다", type: "소모품", rarity: 2, sources: ["∞ 11 편의점"] },
  "시왕환명산": { desc: "사용 후 다음번 전투에서 모든 아군의 HP 최대치가 20% 증가한다", type: "소모품", rarity: 2, sources: ["아르마 철창 그룹 일용 화학품 연구소"] },
  "썰렁 개그": { desc: "사용 후 다음번 전투에서 모든 아군이 가하는 얼음 속성 피해가 16% 증가한다", type: "소모품", rarity: 2, sources: ["그래피아 아카데미 매점"] },
  "쓰레기 소다수": { desc: "사용 후 즉시 지정된 단일 아군의 HP를 자신의 HP 최대치 24%만큼 회복하고, 추가로 HP를 300pt 회복한다", type: "소모품", rarity: 2, sources: ["간식 가게 사장"] },
  "아름다운 미래를 바라보며": { desc: "사용 후 다음번 전투에서 모든 아군의 회복량이 18% 증가한다", type: "소모품", rarity: 2, sources: ["꿈세계 판매점"] },
  "아스다나 백참나무": { desc: "사용 후 즉시 지정된 단일 아군의 에너지를 자신의 에너지 최대치 30%만큼 회복한다", type: "소모품", rarity: 2, sources: ["다프"] },
  "아첨하는 보도 자료": { desc: "사용 후 다음번 전투에서 모든 아군이 전투 진입 시 방어력이 50% 증가하며, 피격된 후까지 지속된다", type: "소모품", rarity: 2, sources: ["≪스포츠 요청≫ 미디어 센터"] },
  "암석 꽃게 튀김": { desc: "사용 후 즉시 아군의 비술 포인트를 3pt 회복한다", type: "소모품", rarity: 2, sources: ["포장마차"] },
  "야채수프": { desc: "사용 후 즉시 모든 아군은 각자 HP 최대치 15%만큼의 HP를 소모하고 다음번 전투에서 모든 아군의 공격력이 200pt 증가한다", type: "소모품", rarity: 2, sources: ["포장마차"] },
  "연근떡": { desc: "사용 후 즉시 지정된 단일 아군의 에너지를 자신의 에너지 최대치 30%만큼 회복한다", type: "소모품", rarity: 2, sources: ["포장마차"] },
  "오로닉스 석판": { desc: "사용 후 즉시 전투 불능 상태에 빠진 지정된 단일 아군의 HP를 자신의 HP 최대치의 10%만큼 회복한다", type: "소모품", rarity: 2, sources: ["세월의 유산"] },
  "요란 인법 군량": { desc: "사용 후 다음번 전투에서 모든 아군 캐릭터의 공격력이 20% 증가한다", type: "소모품", rarity: 2, sources: ["샬레카"] },
  "인연 얼음샘": { desc: "사용 후 즉시 지정된 단일 아군의 에너지를 자신의 에너지 최대치 30%만큼 회복한다", type: "소모품", rarity: 2, sources: ["자판기"] },
  "자그레우스가 엄선한 꿀치즈": { desc: "사용 후 즉시 지정된 단일 아군의 에너지를 자신의 에너지 최대치의 25%만큼 회복한다", type: "소모품", rarity: 2, sources: ["???"] },
  "자그레우스가 엄선한 러스크": { desc: "사용 후 즉시 지정된 단일 아군의 HP를 자신의 HP 최대치의 20%만큼 회복하고, 추가로 HP를 240pt 회복한다", type: "소모품", rarity: 2, sources: ["???"] },
  "전자동 꿈 그리기 스프레이": { desc: "사용 후 다음번 전투에서 모든 아군 캐릭터의 방어력이 25% 증가한다", type: "소모품", rarity: 2, sources: ["부귀"] },
  "정통 소사수": { desc: "사용 후 다음번 전투에서 모든 아군의 공격력이 35% 증가하고, 방어력이 8% 감소한다", type: "소모품", rarity: 2, sources: ["제시 푸드"] },
  "종이접기 케이크": { desc: "사용 후 다음번 전투에서 모든 아군 캐릭터의 속도가 8% 증가한다", type: "소모품", rarity: 2, sources: ["샬레카"] },
  "좋은꿈 시럽": { desc: "사용 후 즉시 아군의 비술 포인트를 3pt 회복한다", type: "소모품", rarity: 2, sources: ["꿈세계 판매점"] },
  "천둥처럼 울리는 식욕": { desc: "사용 후 즉시 지정된 단일 아군의 HP를 자신의 HP 최대치 24%만큼 회복하고, 추가로 HP를 300pt 회복한다", type: "소모품", rarity: 2, sources: ["꿈세계 판매점"] },
  "철창표 바디워시": { desc: "사용 후 다음번 전투에서 모든 아군의 효과 저항이 20% 증가한다", type: "소모품", rarity: 2, sources: ["아르마 철창 그룹"] },
  "청정한 먼지떨이": { desc: "사용 후 즉시 지정된 단일 아군의 에너지를 30% 회복한다", type: "소모품", rarity: 2, sources: ["고물 점포"] },
  "캔배지 전투복": { desc: "사용 후 다음번 전투에서 모든 아군의 방어력이 25% 증가한다", type: "소모품", rarity: 2, sources: ["∞ 11 편의점"] },
  "팝콘": { desc: "사용 후 다음번 전투에서 모든 아군의 격파 특수효과가 30% 증가한다", type: "소모품", rarity: 2, sources: ["팝콘 푸드트럭"] },
  "항밈 장난감 상자": { desc: "사용 후 다음번 전투에서 모든 아군에게 아래 중 1개의 효과가 랜덤으로 적용된다. 공격력 35% 증가. 공격력 10% 감소", type: "소모품", rarity: 2, sources: ["∞ 11 편의점"] },
  "헤일로 윙 버거": { desc: "사용 후 다음번 전투에서 모든 아군의 속도가 12% 증가하고, 공격력이 6% 감소한다", type: "소모품", rarity: 2, sources: ["제시 푸드"] },
  "헬로우 앤 굿바이": { desc: "사용 후 다음번 전투에서 모든 아군의 격파 특수효과가 30% 증가한다", type: "소모품", rarity: 2, sources: ["다프"] },
  "황금의 후예 질항아리": { desc: "사용 후 다음번 전투에서 모든 아군이 가하는 피해가 10% 증가하고, 가하는 기억 정령 스킬 피해가 추가로 10% 증가한다", type: "소모품", rarity: 2, sources: ["세월의 유산"] },

  // --- 3성 & 4성 고성급 소모품 (한글화) ---
  "「스파클」 언리미티드 컬렉터 에디션 인형": { desc: "사용 후 다음번 전투에서 모든 아군의 치명타 피해가 36% 증가한다", type: "소모품", rarity: 3, sources: ["간식 가게 사장"] },
  "감자튀김 선디": { desc: "사용 후 다음번 전투에서 모든 아군이 다음 세트 효과 중 하나를 랜덤으로 획득한다. 1. 가하는 얼음 속성 피해 및 화염 속성 저항 15% 증가 2. 가하는 화염 속성 피해 및 얼음 속성 저항 15% 증가", type: "소모품", rarity: 3, sources: ["시계 식당"] },
  "결투 깃털": { desc: "사용 후 다음번 전투에서 모든 아군의 공격력이 40% 증가한다. 전투 진입 시 랜덤 캐릭터 1명이 적에게 피격될 확률이 대폭 증가한다", type: "소모품", rarity: 3, sources: ["좋은꿈 부티크"] },
  "골드스틸 기사단": { desc: "사용 후 즉시 지정된 단일 아군의 HP를 자신의 HP 최대치 45%만큼 회복한다", type: "소모품", rarity: 3, sources: ["간식 가게 사장"] },
  "광야의 탈": { desc: "사용 후 다음번 전투에서 모든 아군의 공격력이 40% 증가한다. 전투 진입 시 100%의 기본 확률로 랜덤 캐릭터 1명을 노발대발 상태에 빠뜨린다. 지속 시간: 2턴", type: "소모품", rarity: 3, sources: ["좋은꿈 부티크"] },
  "끝없는 원한": { desc: "사용 후 다음번 전투에서 모든 아군이 가하는 피해가 20% 증가한다", type: "소모품", rarity: 3, sources: ["꿈세계 판매점"] },
  "대표 메뉴 고추기름 난도질 소내장탕": { desc: "사용 후 즉시 아군의 비술 포인트를 4pt 회복한다", type: "소모품", rarity: 3, sources: ["미선각"] },
  "범인의 눈빛": { desc: "사용 후 다음번 전투에서 모든 아군의 공격력이 14% 증가하고, 추가로 공격력이 230pt 증가한다", type: "소모품", rarity: 3, sources: ["꿈세계 판매점"] },
  "벨로보그 소시지": { desc: "사용 후 즉시 지정된 단일 아군의 에너지를 자신의 에너지 최대치 50%만큼 회복한다", type: "소모품", rarity: 3, sources: ["포장마차"] },
  "병에 담긴 양자 유령": { desc: "사용 후 다음번 전투에서 모든 적의 속도가 15% 감소한다", type: "소모품", rarity: 3, sources: ["∞ 11 편의점"] },
  "선인의 기쁨차": { desc: "사용 후 다음번 전투에서 모든 아군의 공격력이 14% 증가하고, 추가로 공격력이 230pt 증가한다", type: "소모품", rarity: 3, sources: ["불야후"] },
  "소리 없는 자기만족": { desc: "사용 후 다음번 전투에서 모든 아군이 가하는 일반 공격 피해가 45% 증가하고, 가하는 전투 스킬 피해가 12% 감소한다", type: "소모품", rarity: 3, sources: ["자동 악기점"] },
  "수면 망치": { desc: "사용 후 다음번 전투에서 모든 아군이 받는 피해가 18% 감소한다. 전투 진입 시 10%의 기본 확률로 강렬한 진탕 상태에 빠진다. 지속 시간: 1턴", type: "소모품", rarity: 3, sources: ["기한 경과 우편물 인수처"] },
  "시계 피자(한 판)": { desc: "사용 후 다음번 전투에서 모든 아군의 속도가 16% 증가하고, 가하는 피해가 8% 감소한다", type: "소모품", rarity: 3, sources: ["시계 식당"] },
  "알록달록한 신맛": { desc: "사용 후 다음번 전투에서 모든 아군의 공격력이 24% 증가하고, 치명타 피해가 20% 증가하며, 가하는 필살기 피해가 12% 감소한다", type: "소모품", rarity: 3, sources: ["제시 푸드"] },
  "양심반혼단": { desc: "사용 후 즉시 아군의 비술 포인트를 2pt 회복한다", type: "소모품", rarity: 3, sources: ["보이당"] },
  "영원한 인내": { desc: "사용 후 다음번 전투에서 모든 아군이 획득하는 실드량이 27% 증가한다", type: "소모품", rarity: 3, sources: ["꿈세계 판매점"] },
  "이상한 소프트 캔디": { desc: "사용 후 모든 아군이 다음번 전투에서 아래 중 1개의 효과를 랜덤으로 발동한다. 「햄스터볼 기사 맛」 속도 20% 증가. 「스톤 보스 맛」 속도 5% 감소", type: "소모품", rarity: 3, sources: ["좋은꿈 마을 테마 음식점"] },
  "이즈모 미소": { desc: "사용 후 즉시 지정된 단일 아군의 HP를 자신 HP 최대치의 45%만큼 회복한다", type: "소모품", rarity: 3, sources: ["기한 경과 우편물 인수처"] },
  "자그레우스가 엄선한 시육": { desc: "사용 후 다음번 전투에서 모든 아군이 가하는 얼음 속성 피해가 20% 증가한다", type: "소모품", rarity: 3, sources: ["???"] },
  "자그레우스가 엄선한 팥": { desc: "사용 후 다음번 전투에서 모든 아군의 방어력이 30% 증가한다", type: "소모품", rarity: 3, sources: ["???"] },
  "적어도 이 순간은 함께": { desc: "사용 후 즉시 모든 아군이 각자 에너지 최대치의 30%만큼 에너지를 회복하고, 다음번 전투에서 모든 아군의 공격력이 16% 증가한다", type: "소모품", rarity: 3, sources: ["「닥쳐」의 바 카운터"] },
  "적의 스캔들": { desc: "사용 후 다음번 전투 진입 시 모든 적이 받는 피해가 12% 증가한다, 지속 시간: 5턴", type: "소모품", rarity: 3, sources: ["≪스포츠 요청≫ 미디어 센터"] },
  "종이새 패밀리팩": { desc: "사용 후 모든 아군이 다음번 전투에서 아래 중 1개의 효과를 랜덤으로 발동한다. 「엄격한 부엉이 선생」 가하는 피해 36% 증가. 「짓궂은 종이새」 받는 피해 10% 증가", type: "소모품", rarity: 3, sources: ["좋은꿈 마을 테마 음식점"] },
  "좋은꿈 마을 스페셜 블렌드": { desc: "사용 후 모든 아군이 다음번 전투에서 아래 중 1개의 효과를 랜덤으로 발동한다. 「시계 소년 토네이도 프루트 티」 공격력 36% 증가. 「하누 형제 버블 밀크티」 치명타 확률 18% 증가. 「소다수 씨 귤껍질 라떼」 치명타 피해 36% 증가", type: "소모품", rarity: 3, sources: ["좋은꿈 마을 테마 음식점"] },
  "좋은꿈 홀로그램 티켓": { desc: "사용 후 모든 아군이 다음번 전투에서 아래 중 1개의 효과를 랜덤으로 발동한다. 「거울 공주 티켓」 방어력 36% 증가. 「음표 아가씨 티켓」 HP 최대치 30% 증가", type: "소모품", rarity: 3, sources: ["좋은꿈 마을 테마 음식점"] },
  "참나무 롤케이크": { desc: "사용 후 다음번 전투에서 모든 아군의 격파 특수효과가 45% 증가한다", type: "소모품", rarity: 3, sources: ["시계 식당"] },
  "철창표 약왕 구복액": { desc: "사용 후 다음번 전투에서 모든 아군의 공격력이 45% 증가하고, 방어력이 12% 감소한다", type: "소모품", rarity: 3, sources: ["아르마 철창 그룹 일용 화학품 연구소"] },
  "크렘노스 중검": { desc: "사용 후 다음번 전투에서 모든 아군의 치명타 확률이 8% 증가하고, 치명타 피해가 16% 증가한다", type: "소모품", rarity: 3, sources: ["칼토너스의 대장간"] },
  "태양 팬케이크": { desc: "사용 후 즉시 지정된 단일 아군의 에너지를 자신의 에너지 최대치의 50%만큼 회복한다", type: "소모품", rarity: 3, sources: ["???"] },
  "틀리면 틀린나나 대로": { desc: "사용 후 다음번 전투에서 전투 진입 시 즉시 모든 아군 캐릭터의 HP를 각자 손실한 HP의 50%만큼 회복한다", type: "소모품", rarity: 3, sources: ["부귀"] },
  "풀 수 없는 큐브": { desc: "사용 후 다음번 전투에서 모든 아군이 처음으로 공격 발동 후 피격된 적은 이번 공격에서 잃은 HP를 회복한다. 적이 해당 방식으로 1%의 HP를 회복할 때마다 캐릭터는 HP 최대치의 1%만큼 피해를 상쇄할 수 있는 실드를 획득한다. 해당 실드는 캐릭터 HP 최대치의 100%를 넘지 않는다, 지속 시간: 2턴", type: "소모품", rarity: 3, sources: ["커크"] },
  "피카 백포도 소다수": { desc: "사용 후 다음번 전투에서 모든 아군의 연소 상태 저항 확률이 100% 증가한다. 지속 시간 4턴. 지속 시간 종료 시 에너지를 30pt 소모한다", type: "소모품", rarity: 3, sources: ["앤더슨"] },
  "행운이 가득 담긴 잔": { desc: "사용 후 즉시 모든 아군의 에너지를 30% 회복하고, 다음번 전투에서 가하는 피해가 15% 증가한다", type: "소모품", rarity: 3, sources: ["「만능 합성기」"] },
  "화려한 적멸 의복": { desc: "사용 후 다음번 전투에서 모든 아군의 공격력이 40% 증가한다. 전투 진입 시, 공격 중에는 적을 처치할 수 없다, 지속 시간: 2턴", type: "소모품", rarity: 3, sources: ["좋은꿈 부티크"] },
  "화염 고추소스": { desc: "사용 후 다음번 전투에서 모든 아군의 속도가 8% 증가하고, 공격력이 15% 증가한다", type: "소모품", rarity: 3, sources: ["「만능 합성기」"] },
  "마지막 승부": { desc: "사용 후 다음번에 페나코니의 「행운의 돌림판」을 플레이할 때 「특별 상품」을 뽑는다", type: "소모품", rarity: 4, sources: ["꿈세계 판매점"] },
  "좋은꿈 콘 아이스크림(세 가지 맛)": { desc: "사용 후 다음번 전투에서 모든 아군의 공격력이 60% 증가하고, 적에게 스킬을 발동할 시 낮은 확률로 잘못된 목표를 선택한다", type: "소모품", rarity: 4, sources: ["아이스크림 카트"] },
  "UFO 버거": { desc: "사용 후 다음번 전투에서 모든 아군의 HP 최대치가 14% 증가하고, 추가로 HP 최대치가 360pt 증가한다", type: "소모품", rarity: 3, sources: ["시계 식당"] },
  "(개척자)©바나나 파이": { desc: "사용 후 다음번 전투에서 모든 아군 캐릭터의 속도가 10% 증가하고, 격파 특수효과가 30% 증가한다", type: "소모품", rarity: 4, sources: ["샬레카"] },
  "한순간의 행복": { enName: "Fleeting Happiness", desc: "사용 후 즉시 지정된 단일 아군의 HP를 자신의 HP 최대치 40%만큼 회복하고, 추가로 HP를 320pt 회복한다", enDesc: "Upon use, instantly heals one target ally for 40% of their Max HP plus an extra 320 HP.", type: "소모품", rarity: 3, sources: ["「만능 합성기」", "꿈세계 판매점"] },
  "의심의 먹구름": { enName: "Cloud of Doubts", desc: "사용 후 다음번 전투에서 모든 아군이 받는 피해가 15% 감소한다", enDesc: "Upon use, decreases DMG taken by all allies by 15% for the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기」", "꿈세계 판매점"] },
  "스파클 척수검": { enName: "Sparkling Spinal Blade", desc: "사용 후 다음번 전투에서 모든 아군의 공격력이 100pt 증가하고 치명타 피해가 30% 증가한다", enDesc: "Upon use, increases ATK by 100 and CRIT DMG by 30% for all allies in the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기」"] },
  "드로마스 스테이크": { enName: "Dromas Steak", desc: "사용 후 다음번 전투에서 모든 아군이 가하는 지속 피해가 35% 증가한다", enDesc: "Upon use, increases DoT dealt by all allies by 35% for the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기", "마모리얼 음식점"] },
  "크렘노스 방패": { enName: "Kremnos Shield", desc: "사용 후 다음번 전투에서 모든 아군의 방어력이 15% 증가하고, 획득하는 실드량이 18% 증가한다", enDesc: "Upon use, increases DEF by 15% and Shield Effect by 18% for all allies in the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기」", "칼토너스의 대장간"] },
  "환수의 잔재": { enName: "Remnants of the Phantom Beast", desc: "사용 후 다음번 전투에서 모든 아군의 효과 저항이 30% 증가한다", enDesc: "Upon use, increases Effect RES of all allies by 30% for the next battle.", type: "소모품", rarity: 3, sources: ["「만능 합성기」"] },
  "카포-칼리": { enName: "Kapo-Kali", desc: "사용 후 다음번 전투에서 모든 아군이 가하는 랜덤 속성 피해가 30% 증가한다", enDesc: "Upon use, increases random DMG type of all allies by 30% for the next battle.", type: "소모품", rarity: 3, sources: ["모험 임무 「닿을 수 없는 것」 완료 보상"] },
  "예쁜 쓰레기": { enName: "Pleasant-Looking Trash", desc: "사용 후 즉시 아군의 비술 포인트를 4pt 회복한다", enDesc: "Upon use, immediately recovers 4 Technique Points for the team.", type: "소모품", rarity: 3, sources: ["야릴로-Ⅵ의 쓰레기통과 상호작용"] },
  "쓰레기통의 존엄": { enName: "Dignity of Trash Cans", desc: "사용 후 다음번 전투에서 모든 아군의 방어력이 20% 증가한다", enDesc: "Upon use, increases DEF of all allies by 20% for the next battle.", type: "소모품", rarity: 3, sources: ["야릴로-Ⅵ의 쓰레기통과 상호작용"] },
  "짐•로저의 빵 맛 소다수": { enName: "Jim Roger Bread Soda", desc: "사용 후 즉시 지정된 단일 아군의 HP를 자신 HP 최대치의 100%만큼 회복한다", enDesc: "Upon use, instantly heals one target ally for 100% of their Max HP.", type: "소모품", rarity: 3, sources: ["야릴로-Ⅵ의 자판기에서 구매"] },
  "≪은하열차≫ 게임 CD": { enName: "Astral Express Game Disk", desc: "사용 후 즉시 아군의 비술 포인트를 4pt 회복한다", enDesc: "When used, instantly recovers 4 Technique Points for the team.", type: "소모품", rarity: 3, sources: ["「만능 합성기」"] },
  "도적의 촉수": { enName: "Master Thief's Tentacle", desc: "사용 후 다음번 전투에서 모든 아군의 속도가 10% 증가하고, 일반 맵 내 적과의 전투에서 승리하면 「보너스 서프라이즈」를 획득할 가능성이 있다", enDesc: "Upon use, increases SPD of all allies by 10% for the next battle, and after a victory against an enemy in the overworld, there is a chance to obtain an \"extra surprise.\"", type: "소모품", rarity: 3, sources: ["아르마 철창 그룹"], enSources: ["The Arma Correctional Group"] },
  "렌치 믹스 샐러드": { enName: "Wrench Drenched Salad", desc: "사용 후 즉시 모든 아군이 각자 HP 최대치의 30%만큼 HP를 회복하고, 다음번 전투에서 모든 아군의 방어력이 20% 증가한다", enDesc: "Upon use, immediately recovers HP for all allies equal to 30% of their Max HP, and increases their DEF by 20% for the next battle.", type: "소모품", rarity: 3, sources: ["「닥쳐」의 바 카운터"], enSources: ["Shut Up Bar"] },
  "세이렌의 손길": { enName: "Sea Monster's Touch", desc: "사용 후 즉시 모든 아군이 각자 HP 최대치의 5%만큼 HP를 소모하고, 다음번 전투에서 공격력이 40% 증가한다", enDesc: "Upon use, immediately causes all allies to lose HP equal to 5% of their Max HP, and increases their ATK by 40% for the next battle.", type: "소모품", rarity: 3, sources: ["그래피아 아카데미 매점"], enSources: ["Graphia Academy General Store"] },
  "열차 스페셜 블렌드: 땔감, 쌀 그리고 소금": { enName: "Express Special Blend: Rustic Infusion", desc: "사용 후 즉시 아군의 비술 포인트를 4pt 회복한다", enDesc: "Upon use, instantly recovers 4 Technique Points for the team.", type: "소모품", rarity: 3, sources: ["「닥쳐」의 바 카운터"], enSources: ["Shut Up Bar"], fileName: "열차 스페셜 블렌드_ 땔감, 쌀 그리고 소금" },

  // --- 4성 소모품 ---
  "일회용 동력 팔": { enName: "Disposable Kinetic Arm", desc: "사용 후 다음번 전투에서 모든 아군의 공격력이 325pt 증가하고 치명타 확률이 12% 증가한다", enDesc: "Upon use, increases ATK by 325 and CRIT Rate by 12% for all allies in the next battle.", type: "소모품", rarity: 4, sources: ["「만능 합성기」"] },
  "루비 분말": { enName: "Ruby Dust", desc: "사용 후 다음번 전투에서 모든 아군의 속도가 8% 증가하고 효과 명중이 20% 증가한다", enDesc: "Upon use, increases SPD by 8% and Effect Hit Rate by 20% for all allies in the next battle.", type: "소모품", rarity: 4, sources: ["「만능 합성기」"] },
  "일회용 동력 캐논포": { enName: "Disposable Kinetic Cannon", desc: "사용 후 다음번 전투에서 모든 아군의 공격력이 355pt 증가하고 치명타 피해가 20% 증가한다", enDesc: "Upon use, increases ATK by 355 and CRIT DMG by 20% for all allies in the next battle.", type: "소모품", rarity: 4, sources: ["「만능 합성기」"] },
  "영원한 겨울의 비석": { enName: "Monument of Everlasting Winter", desc: "사용 후 다음 전투에서 모든 아군의 빙결 상태에 대한 저항 확률이 50% 증가한다", enDesc: "Upon use, increases Freeze RES of all allies by 50% in the next battle.", type: "소모품", rarity: 4, sources: ["「만능 합성기」"] },
  "위상 가속 벨트": { enName: "Phase Pacemaker", desc: "사용 후 다음 3회의 전투에서 모든 아군의 속도가 24% 증가한다. 지속 시간: 2턴", enDesc: "Upon use, increases SPD of all allies by 24% for 2 turns in the next 3 battles.", type: "소모품", rarity: 4, sources: ["「만능 합성기」"] },
  "무정의 단약": { enName: "Heartless Pill", desc: "사용 후 다음 3회의 전투에서 모든 아군의 HP 최대치가 20%, 효과 저항이 6% 증가한다.", enDesc: "Upon use, increases Max HP by 20% and Effect RES by 6% for all allies in the next 3 battles.", type: "소모품", rarity: 4, sources: ["「만능 합성기」"] },
  "시육 설탕 구슬 볶음": { enName: "Stir-Fried Meat with Sugar Balls", desc: "사용 후 다음번 전투에서 모든 아군이 가하는 얼음 속성 피해가 35% 증가한다", enDesc: "Upon use, increases Ice DMG of all allies by 35% for the next battle.", type: "소모품", rarity: 4, sources: ["「만능 합성기」", "자미성"] },
  "자동 목인장": { enName: "Automatic Wooden Dummy", desc: "사용 후 다음번 전투에서 자동 전투 상태에 진입하며 해제할 수 없다. 성공적으로 자동 전투 상태에 진입하면 모든 아군이 가하는 피해가 45% 증가한다", enDesc: "Upon use, automatically enters Auto-battle for the next battle and cannot be disabled. If successfully entered, increases DMG of all allies by 45%.", type: "소모품", rarity: 4, sources: ["「만능 합성기」", "고물 점포"] },
  "마지막 순간": { enName: "The Last Moment", desc: "사용 후 다음번 전투에서 모든 아군이 받는 피해가 20% 감소하고, 효과 저항이 6% 증가한다", enDesc: "Upon use, decreases DMG taken by 20% and increases Effect RES by 6% for all allies in the next battle.", type: "소모품", rarity: 4, sources: ["「만능 합성기」", "꿈세계 판매점"] },
  "열렬한 분위기": { enName: "Fervent Atmosphere", desc: "사용 후 다음번 전투에서 모든 아군의 치명타 확률이 12% 증가하고, 치명타 피해가 24% 증가한다", enDesc: "Upon use, increases CRIT Rate by 12% and CRIT DMG by 24% for all allies in the next battle.", type: "소모품", rarity: 4, sources: ["「만능 합성기」", "꿈세계 판매점"] },
  "깜짝 상자": { enName: "Jack-in-the-Box", desc: "사용 후 다음 전투에서 「깜짝 상자」는 랜덤 유닛에게 숨고, 턴이 시작될 때 기폭하며 대량의 피해를 가한다", enDesc: "Upon use, the 'Jack-in-the-Box' hides on a random unit in the next battle, detonating at the start of the turn to deal massive DMG.", type: "소모품", rarity: 4, sources: ["「만능 합성기」", "커크"] },
  "살인 병기 3000": { enName: "Doomsday 3000", desc: "사용 후 즉시 모든 아군의 에너지를 30% 회복한다. 다음번 전투에서 공격력이 100pt 증가하고 가하는 피해가 35% 증가한다. 전투 진입 시 10%의 기본 확률로 강렬한 진탕 상태에 빠진다. 지속 시간: 1턴", enDesc: "Upon use, immediately recovers 30% Energy for all allies. Increases ATK by 100 and DMG by 35% in the next battle. 10% base chance to be Concussed for 1 turn upon entering battle.", type: "소모품", rarity: 4, sources: ["「만능 합성기」"] },
  "장막의 소포": { enName: "Veiled Package", desc: "사용 후 다음번 전투에서 모든 아군에게 아래 중 1개의 효과가 랜덤으로 적용된다. 속도 20% 증가. 격파 특수효과 60% 증가. 효과 명중 60% 증가", enDesc: "Upon use, grants 1 of the following effects to all allies randomly in the next battle: SPD +20%, Break Effect +60%, or Effect Hit Rate +60%.", type: "소모품", rarity: 4, sources: ["「만능 합성기」", "드로마스 상단(이동 상인)"] },
  "군왕의 수": { enName: "Sovereign's Hand", desc: "사용 후 다음번 전투에서 모든 아군의 속도가 16% 증가하고, 공격력이 10% 증가한다", enDesc: "Upon use, increases SPD by 16% and ATK by 10% for all allies in the next battle.", type: "소모품", rarity: 4, sources: ["「만능 합성기」"] },
  "물고기를 부르는 뼈피리": { enName: "Fish-Calling Bone Flute", desc: "사용 후 다음번 전투에서 모든 아군의 공격력이 15% 증가하고, 가하는 지속 피해가 30% 증가한다", enDesc: "Upon use, increases ATK by 15% and DoT dealt by 30% for all allies in the next battle.", type: "소모품", rarity: 4, sources: ["「만능 합성기」"] },
  "강철 코일": { enName: "Steel Coil", desc: "사용 후 모든 아군이 즉시 각자 HP 최대치의 40%만큼 HP를 소모하고, 다음번 전투에서 환락도가 40% 증가한다", enDesc: "Upon use, all allies instantly consume 40% of their Max HP, and increases Elation by 40% for the next battle.", type: "소모품", rarity: 4, sources: ["「만능 합성기」", "∞ 11 편의점"] },
  "≪복슬복슬호≫ 다기능 응원봉": { enName: "The Fluffy Multi-Functional Fan Glowstick", desc: "사용 후 다음번 전투에서 모든 아군의 치명타 피해가 25% 증가하고, 아하 타임이 처음으로 행동 시 치명타 피해가 추가로 25% 증가한다", enDesc: "Upon use, increases all allies' CRIT DMG by 25% for the next battle. When an Aha Instant takes its first action, CRIT DMG is additionally increased by 25%.", type: "소모품", rarity: 4, sources: ["∞ 11 편의점"], enSources: ["∞-Eleven"] }
};

export const CONSUMABLE_DATA: Record<string, ConsumableDetail> = { ...MANUAL_DATA };

// 위키 API에서 추출한 202개 데이터를 기존 수동 데이터베이스와 런타임에 지능적으로 병합
Object.values(apiData).forEach((item: any) => {
  // 위키 API의 비정상적인 공백(Non-breaking space)을 일반 공백으로 치환하여 병합 정확도 향상
  const koName = (item.nameKo || '').replace(/\u00a0/g, ' ').trim();
  const enName = (item.nameEn || '').trim();

  // 위키 카테고리 및 불필요한 메타데이터 필터링
  if (!koName || koName.startsWith('Category:') || koName === '소모품' || koName === '의술 해독환' || koName === '보석 도마뱀 꼬치 조리법' || koName === '원한 수첩') return;

  // 위키 파싱 잔재 정리 및 긴 문장 Truncation 처리
  let rawSources = item.sources || ["Unknown Source"];
  let cleanedSources = rawSources
    .map((s: string) => s.replace(/^(?:Recipe:\s*)?\|source\d+\s*=\s*/i, ''))
    .map((s: string) => s.replace(/^Recipe:\s*/i, ''))
    .map((s: string) => s.replace(/\|.*/, ''))
    .filter((s: string) => {
      if (s.includes('}}\n') || s.includes('\n==') || s.includes('<!--')) return false;
      const trimmed = s.trim();
      if (!trimmed || trimmed.toLowerCase().startsWith('recipe:')) return false;
      return true;
    })
    .map((s: string) => s.length > 50 ? s.substring(0, 50) + '...' : s);

  if (cleanedSources.length === 0) cleanedSources = ["Unknown Source"];
  cleanedSources = Array.from(new Set(cleanedSources)); // 중복 제거

  if (CONSUMABLE_DATA[koName]) {
    // 1. 기존 데이터의 성급(Rarity), 효과(Desc), 획득처(Sources)가 더 정확하므로 절대 덮어쓰지 않습니다!
    CONSUMABLE_DATA[koName].enName = enName;
    if (item.enDesc) CONSUMABLE_DATA[koName].enDesc = item.enDesc;
    if (!CONSUMABLE_DATA[koName].fileName) {
      CONSUMABLE_DATA[koName].fileName = (item.fileName || koName).replace(/\u00a0/g, ' ').trim();
    }
  } else {
    // 2. 신규 소모품 완벽 추가
    CONSUMABLE_DATA[koName] = {
      enName: enName,
      desc: item.enDesc, // Archive Intel 에 Effect 원문 삽입
      enDesc: item.enDesc, // 다국어 EN 번역 매핑용
      type: item.type || "소모품",
      rarity: item.rarity || 3,
      sources: cleanedSources,
      enSources: cleanedSources,
      fileName: (item.fileName || koName).replace(/\u00a0/g, ' ').trim(),
      gameId: "hsr"
    };
  }
});