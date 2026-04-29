export interface ItemDetail {
  desc: string;
  type: string;
  rarity: number;
  sources: string[];
  enSources?: string[];
  fileName?: string;
  gameId?: 'hsr' | 'ww';
}

export interface Notice {
  id: string;
  category: 'Update' | 'Notice' | 'Event' | 'System';
  title: string;
  content: string; // Markdown string
  createdAt: string;
  version?: string;
  isCritical?: boolean;
  images?: string[];
  gameId: 'hsr' | 'ww' | 'common';
}