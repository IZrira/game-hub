export const toAniimoLocationSlug = (location: string) => location.trim().replace(/\s+/g, '-');

export const getAniimoLocationPath = (location: string) =>
  `/gallery/aniimo/location/${encodeURIComponent(toAniimoLocationSlug(location))}`;
