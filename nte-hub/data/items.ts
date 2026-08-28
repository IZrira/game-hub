export interface NTEItemMeta {
  name: string;
  category: string;
  rarity: number;
  description: string;
  source: string;
  folderName?: string;
  fileName?: string;
  gameId: 'nte';
}

export const NTE_ITEM_META: Record<string, NTEItemMeta> = {
  "비틀 코인": {
    name: "비틀 코인",
    category: "재화/소모품",
    rarity: 1,
    description: "헤테로 시티 전역에서 통용되는 표준 통화. 물품 거래와 아크/캐릭터 육성에 필수적으로 사용된다.",
    source: "임무 완료, 도시 탐색, 상점 판매",
    gameId: "nte"
  },
  "흐릿한 숫자 부호": {
    name: "흐릿한 숫자 부호",
    category: "광추/무기",
    rarity: 2,
    description: "아크의 이능력을 안정화시키는 기초 숫자 암호 부호. 형체가 흐릿하여 초급 조율에 쓰인다.",
    source: "왜곡 토벌, 도시 순찰",
    gameId: "nte"
  },
  "미해독 숫자 부호": {
    name: "미해독 숫자 부호",
    category: "광추/무기",
    rarity: 3,
    description: "복잡한 알고리즘이 얽혀 있는 중급 숫자 부호. 아크의 출력을 한 단계 끌어올린다.",
    source: "왜곡 토벌 중급, 합성",
    gameId: "nte"
  },
  "뒤틀린 숫자 부호": {
    name: "뒤틀린 숫자 부호",
    category: "광추/무기",
    rarity: 4,
    description: "시공간 왜곡 속에서 추출된 고위 숫자 부호. 아크의 잠재력을 극한으로 해방한다.",
    source: "왜곡 토벌 상급, 합성",
    gameId: "nte"
  },
  "철 사과씨": {
    name: "철 사과씨",
    category: "광추/무기",
    rarity: 2,
    description: "결합 및 특수 계열 아크 돌파에 필요한 금속성 종자 재료.",
    source: "도시 필드 채집, 왜곡 구역",
    gameId: "nte"
  },
  "은 사과씨": {
    name: "은 사과씨",
    category: "광추/무기",
    rarity: 3,
    description: "빛을 은은하게 반사하는 중급 아크 승급 재료.",
    source: "정예 왜곡 토벌, 합성",
    gameId: "nte"
  },
  "금 사과씨": {
    name: "금 사과씨",
    category: "광추/무기",
    rarity: 4,
    description: "황금빛 에너지가 깃든 최고급 아크 승급 재료.",
    source: "보스 왜곡 토벌, 합성",
    gameId: "nte"
  }
};
