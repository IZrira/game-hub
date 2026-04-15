export interface ItemDetail {
  desc: string;
  type: string;
  rarity: number;
  sources: string[];
  enSources?: string[];
  fileName?: string;
  gameId?: 'hsr' | 'ww';
}