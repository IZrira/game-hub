export const waveLocationSlug = name => `wave-archipelago--${name.trim().replace(/\s+/g, '-')}`;

/**
 * Location page path. Wave Archipelago places use their own namespace; when `legacyHabitats` is given,
 * a first-region name outside those habitats (e.g. 클라우드폴 폭포 for 래빗배트) is a Wave Archipelago place.
 */
export const aniimoLocationPath = (name, regionId, legacyHabitats = null) => {
  const wave = regionId === '300301' || Boolean(legacyHabitats && !legacyHabitats.includes(name.trim()));
  return `/gallery/aniimo/location/${encodeURIComponent(wave ? waveLocationSlug(name) : name.trim().replace(/\s+/g, '-'))}`;
};

/** Wave Archipelago places; the count includes first-region Aniimo the official dex places there. */
export const getWaveLocations = entries => [...new Set(entries
  .filter(entry => entry.regionId === '300301')
  .flatMap(entry => (entry.forms || []).flatMap(form => form.locations || [])))].filter(name => name !== '미확인 구역').map(name => ({
    name, regionId: '300301', regionName: '웨이브 군도',
    count: entries.filter(entry => (entry.forms || []).some(form => (form.locations || []).includes(name))).length
  }));
