import publicGuides from './generated/public-guide-catalog.json';
import characterSummary from './generated/character-summary.json';
import signatureEquipment from '../../common-hub/data/generated/signature-equipment.json';
import { buildHsrEquipmentRecommendations, isIndexableEquipment } from '../../common-hub/utils/equipmentRecommendations.js';

const HSR_EQUIPMENT_RECOMMENDATIONS = buildHsrEquipmentRecommendations(publicGuides as any[], characterSummary as any[]);

/** Same rule as the sitemap and prerender (see isIndexableEquipment). */
export function isHsrEquipmentIndexable(kind: 'lightcone' | 'relic' | 'ornament', name: string): boolean {
  return isIndexableEquipment(HSR_EQUIPMENT_RECOMMENDATIONS[kind], kind, name, signatureEquipment);
}
