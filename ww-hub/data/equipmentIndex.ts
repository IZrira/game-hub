import recommendationData from './generated/recommendations.json';
import { buildWwEquipmentRecommendations, isIndexableEquipment } from '../../common-hub/utils/equipmentRecommendations.js';

const WW_EQUIPMENT_RECOMMENDATIONS = buildWwEquipmentRecommendations(recommendationData as any);

/** Same rule as the sitemap and prerender: unrecommended equipment is noindex. */
export function isWwEquipmentIndexable(kind: 'weapon' | 'echo', name: string): boolean {
  return isIndexableEquipment(WW_EQUIPMENT_RECOMMENDATIONS[kind], kind, name);
}
