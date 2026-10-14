import type { CharacterGuide } from '../data/guides';
import type { PartyCombination } from '../data/parties';

export interface HsrGuideRuntime {
  guide: CharacterGuide;
  lightcones: Array<{ name: string; path: string; fileName?: string; folderName: string }>;
  relics: Array<{ name: string; type: string }>;
  ornaments: Array<{ name: string; type: string }>;
  parties: PartyCombination[];
}
