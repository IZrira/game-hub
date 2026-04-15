import { ItemDetail } from './types';

export const WW_ITEM_DATA: Record<string, ItemDetail> = {
  "클램 코인": { gameId: 'ww', desc: "명조 세계에서 통용되는 주요 화폐.", type: "통용 화폐", rarity: 3, sources: ["임무 보상", "필드 탐사", "적 처치"] },
  "고급 에너지 코어": { gameId: 'ww', desc: "캐릭터 경험치 재료. 캐릭터 경험치를 대폭 획득한다.", type: "캐릭터 경험치 재료", rarity: 4, sources: ["시뮬레이션 훈련", "상점 구매"] },
  "중급 에너지 코어": { gameId: 'ww', desc: "캐릭터 경험치 재료. 캐릭터 경험치를 중폭 획득한다.", type: "캐릭터 경험치 재료", rarity: 3, sources: ["시뮬레이션 훈련", "상점 구매"] },
  "초급 에너지 코어": { gameId: 'ww', desc: "캐릭터 경험치 재료. 캐릭터 경험치를 소폭 획득한다.", type: "캐릭터 경험치 재료", rarity: 2, sources: ["시뮬레이션 훈련", "필드 탐사"] },
  "고급 무기 에너지 코어": { gameId: 'ww', desc: "무기 강화 재료. 무기 경험치를 대폭 획득한다.", type: "광추 경험치 재료", rarity: 4, sources: ["시뮬레이션 훈련", "상점 구매"] },
  "고급 에코 에너지 코어": { gameId: 'ww', desc: "에코 강화 재료. 에코 경험치를 대폭 획득한다.", type: "유물 경험치 재료", rarity: 4, sources: ["무음 구역", "상점 구매"] },
  "결정 용제": { gameId: 'ww', desc: "플레이트(스태미나)를 60pt 회복하는 아이템.", type: "소모품", rarity: 4, sources: ["레벨 보상", "이벤트 보상"] }
};