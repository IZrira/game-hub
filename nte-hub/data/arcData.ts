import generatedArcs from './generated/arcs.json';
import { NTE_ARCS, type NTEArc } from './arcs';

type ExtendedNteArc = NTEArc & {
  gameId?: 'nte';
  story?: string;
  weaponStory?: string;
};

const arcMap = new Map<string, ExtendedNteArc>();

NTE_ARCS.forEach(arc => {
  arcMap.set(arc.name.trim(), arc);
});

(generatedArcs as ExtendedNteArc[]).forEach(arc => {
  const key = arc.name.trim();
  if (key) arcMap.set(key, arc);
});

export const NTE_ARC_DATA = Array.from(arcMap.values());
