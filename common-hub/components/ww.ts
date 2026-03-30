export type WuwaCategory = 
  | "전체"
  | "공명자 돌파 재료" | "공명자 경험치 재료" | "무기 경험치 재료" | "스킬 업그레이드 재료"
  | "무기 및 스킬 재료" | "재료" | "소모품" | "특수 화폐" | "튜닝 관련 아이템" 
  | "에코 육성 재료" | "돌파 재료" | "무기 제작 재료" | "요리";

export interface WuwaItem {
  id: string;
  name: string;
  folderName?: string; // 이미지 파일명으로 사용될 수 있는 폴더명 (선택 사항)
  rarity: number;
  category: WuwaCategory; // Use WuwaCategory here
  description: string;
  source?: string;
}
