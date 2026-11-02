import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildHsrEquipmentRecommendations,
  buildWwEquipmentRecommendations,
  isIndexableEquipment,
  recommendationMapFromJson,
} from '../../common-hub/utils/equipmentRecommendations.js';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const readJson = file => JSON.parse(fs.readFileSync(path.join(ROOT_DIR, file), 'utf8'));

/** Recommendation maps from the same generated data the detail pages use. */
export function loadEquipmentRecommendations() {
  const hsr = buildHsrEquipmentRecommendations(
    readJson('hsr-hub/data/generated/public-guide-catalog.json'),
    readJson('hsr-hub/data/generated/character-summary.json'),
  );
  const ww = buildWwEquipmentRecommendations(readJson('ww-hub/data/generated/recommendations.json'));
  const arc = recommendationMapFromJson(readJson('nte-hub/data/generated/arc-recommendations.json'));
  const maps = { lightcone: hsr.lightcone, relic: hsr.relic, ornament: hsr.ornament, weapon: ww.weapon, echo: ww.echo, arc };
  return {
    maps,
    /** @param {keyof typeof maps} kind @param {string} name */
    isIndexable: (kind, name) => isIndexableEquipment(maps[kind], kind, name),
  };
}
