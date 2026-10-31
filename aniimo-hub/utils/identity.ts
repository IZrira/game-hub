import type { AniimoEntry, AniimoEvolutionNode } from '../types';

type AniimoIdentity = Pick<AniimoEntry, 'number' | 'id' | 'regionId'>;

/** Preserve legacy IDs while keeping region-local official numbers independent. */
export const getAniimoId = (entry: AniimoIdentity): string => entry.id || entry.number;

export const isSameAniimo = (left: AniimoIdentity, right: AniimoIdentity): boolean =>
  getAniimoId(left) === getAniimoId(right) && left.regionId === right.regionId;

export const findAniimoEvolutionEntry = <T extends AniimoIdentity & { name: string }>(
  entries: readonly T[], node: AniimoEvolutionNode, regionId?: string,
): T | undefined => entries.find(entry => {
  if (node.id) return getAniimoId(entry) === node.id;
  const nodeRegion = node.regionId || regionId;
  if (entry.regionId !== nodeRegion) return false;
  return node.name ? entry.name === node.name : Boolean(node.number && entry.number === node.number);
});
