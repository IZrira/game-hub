export const waveLocationSlug = name => `wave-archipelago--${name.trim().replace(/\s+/g, '-')}`;

export const aniimoLocationPath = (name, regionId) =>
  `/gallery/aniimo/location/${encodeURIComponent(regionId === '300301' ? waveLocationSlug(name) : name.trim().replace(/\s+/g, '-'))}`;

export const getWaveLocations = entries => [...new Set(entries
  .filter(entry => entry.regionId === '300301')
  .flatMap(entry => (entry.forms || []).flatMap(form => form.locations || [])))].filter(name => name !== '미확인 구역').map(name => ({
    name, regionId: '300301', regionName: '웨이브 군도',
    count: entries.filter(entry => entry.regionId === '300301' && entry.forms.some(form => form.locations.includes(name))).length
  }));
