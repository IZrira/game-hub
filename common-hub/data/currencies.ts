import { ItemDetail } from './types';

export const WARP_ITEM_DATA: Record<string, ItemDetail> = {
  "별의 궤도 티켓": { gameId: 'hsr', desc: "은하열차의 통행 티켓. 별의 궤도를 따라 세계를 돌아다닌다", type: "워프 아이템", rarity: 5, sources: ["성옥 교환", "헤르타 상점", "잔화 교환", "레벨 보상"], enSources: ["Sold by Embers Exchange, Herta's Store, and Starlight Exchange", "Simulated Universe Point Rewards", "Mission Rewards", "Event Rewards", "Operation Briefing", "Trial of the Equilibrium"] },
  "별의 궤도 전용티켓": { gameId: 'hsr', desc: "은하열차의 직행 티켓. 특정 세계의 좌표가 기록되어 있어 목표가 확실한 승객에게 적합하다", type: "한정 워프 아이템", rarity: 5, sources: ["성옥 교환", "잔화 교환", "출석 이벤트"], enSources: ["Sold by Embers Exchange and Starlight Exchange", "Mission Rewards", "Event Rewards", "Nameless Glory"] }
};

export const CURRENCY_DATA: Record<string, ItemDetail> = {
  "신용 포인트": { gameId: 'hsr', desc: "스타피스 컴퍼니가 고객과 결산을 위해 사용하던 화폐. 오늘날 우주여행에 널리 쓰이는 경화가 되었다", type: "통용 화폐", rarity: 3, sources: ["모조 꽃받침 [큰 광산구역]", "모조 꽃받침 [공조사]", "모조 꽃받침 [「레버리」 호텔-꿈세계]", "모조 꽃받침 [「잠꼬대의 밀림」 깨달음의 나무 정원]", "임무 보상", "의뢰 보상", "잔화 교환"], enSources: ["Calyx (Golden): Great Mine", "Calyx (Golden): Artisanship Commission", "Calyx (Golden): The Reverie (Dreamscape)", "Calyx (Golden): A Child's Dream", "Mission Rewards", "Assignment Rewards", "Embers Exchange"] },
  "빛의 잔재": { gameId: 'hsr', desc: "상점 「광추 박람」에서 보상으로 교환할 수 있다", type: "통용 화폐", rarity: 5, sources: ["「망각의 정원」", "「허구 이야기」", "「종말의 환영」", "「전쟁의 여운」"], enSources: ["Forgotten Hall", "Pure Fiction", "Apocalyptic Shadow", "Echo of War"] },
  "성옥": { gameId: 'hsr', desc: "유성처럼 밤하늘을 가르는 빛나는 돌. 꺼지기 전에 잡아서 물건을 교환하자?", type: "희귀 화폐", rarity: 5, sources: [
    "오래된 꿈 교환",
    "임무 보상",
    "레벨 보상",
    "일일 훈련 활약도",
    "전리품 오픈",
    "망각의 정원",
    "허구 이야기",
    "업적",
    "이벤트",
    "HoYoLAB 출석체크",
    "교환 코드"
  ] },
  "오래된 꿈": { gameId: 'hsr', desc: "별의 바다에 떠 있는 희미한 빛의 결정은 오래된 괴수의 꿈을 흔들고 있다.", type: "희귀 화폐", rarity: 5, sources: ["꿈 주머니 구매", "열차 보급 허가증"] },
  "꺼지지 않는 스타라이트": { gameId: 'hsr', desc: "땅에 떨어진 유광은 응고되어 찬란한 보석이 되었다.\n「그 가치는 여전히 가늠할 수 없어」", type: "희귀 화폐", rarity: 5, sources: ["워프"] },
  "꺼지지 않은 잔화": { gameId: 'hsr', desc: "땅에 떨어진 유광은 탄식의 잔화가 되었다.\n「이건 불타오른 적이 있기라도 하지」", type: "희귀 화폐", rarity: 4, sources: ["워프"] },
  "옥 깃털": { gameId: 'hsr', desc: "상점 「진실이 된 농담」에서 보상으로 교환할 수 있다", type: "희귀 화폐", rarity: 4, sources: ["망각의 정원", "허구 이야기", "종말의 환영"], enSources: ["Forgotten Hall", "Pure Fiction", "Apocalyptic Shadow"] },
  "론스타 더스트": { gameId: 'hsr', desc: "상점 「스타더스트의 선물」에서 보상으로 교환할 수 있다", type: "희귀 화폐", rarity: 5, sources: ["「이상 중재」", "상점 「진실이 된 농담」에서 획득"] },
  "헤르타 코인": { gameId: 'hsr', desc: "우주정거장 내부에서 유통되는 암호화폐. 특별 상점에서 상품을 구매할 수 있다", type: "월드 화폐", rarity: 3, sources: ["「우주정거장 『헤르타』」 탐사 획득", "모험 임무 획득"] },
  "실드": { gameId: 'hsr', desc: "벨로보그에서 유통되는 공식 화폐. 특별 상점에서 상품을 구매할 수 있다", type: "월드 화폐", rarity: 3, sources: ["「야릴로-Ⅵ」 탐사 획득", "모험 임무 획득"] },
  "순촉": { gameId: 'hsr', desc: "선주 연맹 내부에서 유통되는 「촉」이 단위인 화폐. 특별 상점에서 상품을 구매할 수 있다", type: "월드 화폐", rarity: 3, sources: ["「선주 『나부』」 탐사 획득", "모험 임무 획득"] },
  "금시계 크레딧": { gameId: 'hsr', desc: "「시계공」이 직접 발행한 첫 기념 화폐로 전해진다. 시계 소년 조각상에만 사용할 수 있다", type: "월드 화폐", rarity: 3, sources: ["「페나코니」 탐사 획득", "개척 임무 획득", "모험 임무 획득"] },
  "신주 암브로시아": { gameId: 'hsr', desc: "티탄도 탐낸다고 전해지는 환상적인 음료. 이걸 창세의 소용돌이에 있는 대야 속 조수에 넣어보자", type: "월드 화폐", rarity: 3, sources: ["「앰포리어스」 탐사 획득", "개척 임무 획득", "모험 임무 획득"] },
  "무질서 암브로시아": { gameId: 'hsr', desc: "시간의 질서 밖에 존재하는 액체. 창세의 소용돌이에 있는 대야 속 조수에 넣어보자", type: "월드 화폐", rarity: 3, sources: ["「앰포리어스」 탐사 획득", "개척 임무 획득", "모험 임무 획득"] },
  "낙원 기념 코인": { gameId: 'hsr', desc: "이상 낙원 내부에서 유통되는 기념 코인. 통칭 「원보」라 불리며, 너굴 통신에서 보상으로 교환할 수 있다", type: "월드 화폐", rarity: 3, sources: ["「이상 낙원」 탐사 획득", "개척 임무 획득", "모험 임무 획득"] },
  "에이딘 코인": { gameId: 'hsr', desc: "에이딘 공원에 있는 놀이시설을 즐길 수 있는 코인.", type: "월드 화폐", rarity: 3, sources: ["에이딘 코인 상점", "「페나코니」 탐사 획득"] },
  "액세스 카드": { gameId: 'hsr', desc: "헤르타 정거장의 신비한 컬렉션룸에 있는 「유물 보물상자」를 여는 데 사용할 수 있다", type: "월드 화폐", rarity: 3, sources: ["「기이한 유물 탐사」 이벤트로 획득"] }
};

export const SIMULATED_UNIVERSE_DATA: Record<string, ItemDetail> = {
  "스킬 포인트": { gameId: 'hsr', desc: "설명하기 어려운 재료. 「시뮬레이션 우주」의 스킬 시스템 개방에 사용된다", type: "시뮬레이션 우주", rarity: 3, sources: ["시뮬레이션 우주"] },
  "추측": { gameId: 'hsr', desc: "하나의 데이터. 누적하고 소모해 「시뮬레이션 우주: 인지 불가 영역」의 서포트 시스템을 강화할 수 있다", type: "시뮬레이션 우주", rarity: 3, sources: ["???"] },
  "우주 조각": { gameId: 'hsr', desc: "「시뮬레이션 우주」 탐사 과정에서 획득할 수 있는 독특한 화폐. 시뮬레이션 우주 재시작 후 리셋된다", type: "시뮬레이션 우주", rarity: 3, sources: ["시뮬레이션 우주 파괴 가능한 오브젝트", "시뮬레이션 우주 적", "특정 사건", "특정 기물", "특정 축복"] },
  "헤르타 채권": { gameId: 'hsr', desc: "「시뮬레이션 우주」 보상. 헤르타 상점에서 아이템을 구매할 수 있다", type: "시뮬레이션 우주", rarity: 5, sources: ["시뮬레이션 우주 점수 보상", "「화폐 전쟁」 점수 보상"] },
  "신경 펄스": { gameId: 'hsr', desc: "설명하기 어려운 재료. 「시뮬레이션 우주: 황금과 기계」의 스킬 시스템 개방에 사용된다", type: "시뮬레이션 우주", rarity: 3, sources: ["「시뮬레이션 우주: 황금과 기계」"] },
  "영감": { gameId: 'hsr', desc: "설명하기 어려운 재료. 「차분화 우주」의 스킬 시스템 개방에 사용된다", type: "시뮬레이션 우주", rarity: 3, sources: ["「차분화 우주」"] },
  "적합값": { gameId: 'hsr', desc: "중요한 연구 성과, 「차분화 우주」의 적합 레벨을 올리는 데 사용된다", type: "시뮬레이션 우주", rarity: 3, sources: ["「차분화 우주」"] }
};

export const CURRENCY_WARS_DATA: Record<string, ItemDetail> = {
  "승진 포인트": { gameId: 'hsr', desc: "「화폐 전쟁」 콘텐츠를 통해 획득할 수 있으며, [승진 레벨] 상승에 사용된다", type: "화폐 전쟁: 제로 섬 게임", rarity: 3, sources: ["「화폐 전쟁」"] },
  "등가 다이아 지폐": { gameId: 'hsr', desc: "「화폐 전쟁」 콘텐츠를 통해 획득할 수 있으며, [우위 선점] 활성화에 사용된다", type: "화폐 전쟁: 제로 섬 게임", rarity: 3, sources: ["「화폐 전쟁」"] }
};