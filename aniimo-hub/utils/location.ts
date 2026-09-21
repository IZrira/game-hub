import { normalizeHabitat } from '../data/habitats';

export const toAniimoLocationSlug = (location: string) =>
  normalizeHabitat(location.trim()).replace(/\s+/g, '-');

export const getAniimoLocationPath = (location: string) =>
  `/gallery/aniimo/location/${encodeURIComponent(toAniimoLocationSlug(location))}`;

export { normalizeHabitat };
