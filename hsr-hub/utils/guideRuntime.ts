import type { CharacterGuide } from '../data/guides';
import type { PartyCombination } from '../data/parties';

export interface HsrGuideRuntime {
  guide: CharacterGuide;
  lightcones: Array<{ name: string; path: string; fileName?: string; folderName: string; rarity?: number }>;
  relics: Array<{ name: string; type: string; '2piece'?: string; '4piece'?: string }>;
  ornaments: Array<{ name: string; type: string; setEffect?: { '2piece'?: string }; '2piece'?: string }>;
  parties: PartyCombination[];
}
