import { normalizeHabitat, OFFICIAL_ANIIMO_HABITATS, OFFICIAL_HABITAT_TARGETS } from '../data/habitats';
import type { AniimoEntry } from '../types';

export const toAniimoLocationSlug = (location: string, regionId?: string) =>
  regionId === '300301'
    ? `wave-archipelago--${location.trim().replace(/\s+/g, '-')}`
    : normalizeHabitat(location.trim()).replace(/\s+/g, '-');

export const getAniimoLocationPath = (location: string, regionId?: string) =>
  `/gallery/aniimo/location/${encodeURIComponent(toAniimoLocationSlug(location, regionId))}`;

export const getAniimoLocationGroups = (entries: AniimoEntry[]) => [
  ...OFFICIAL_ANIIMO_HABITATS.map(name => ({ name, regionId: undefined as string | undefined, regionName: '', count: OFFICIAL_HABITAT_TARGETS[name] })),
  ...[...new Set(entries.filter(entry => entry.regionId === '300301').flatMap(entry => entry.forms.flatMap(form => form.locations || [])))].filter(name => name !== '미확인 구역').map(name => ({
    name, regionId: '300301', regionName: '웨이브 군도',
    count: entries.filter(entry => entry.regionId === '300301' && entry.forms.some(form => form.locations.includes(name))).length
  }))
];

export { normalizeHabitat };
