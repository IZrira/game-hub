import recommendationData from './generated/recommendations.json';
import signatureEquipment from '../../common-hub/data/generated/signature-equipment.json';
import { buildWwEquipmentRecommendations, isIndexableEquipment } from '../../common-hub/utils/equipmentRecommendations.js';

const WW_EQUIPMENT_RECOMMENDATIONS = buildWwEquipmentRecommendations(recommendationData as any);

/** Same rule as the sitemap and prerender (see isIndexableEquipment). */
export function isWwEquipmentIndexable(kind: 'weapon' | 'echo', name: string): boolean {
  return isIndexableEquipment(WW_EQUIPMENT_RECOMMENDATIONS[kind], kind, name, signatureEquipment);
}
