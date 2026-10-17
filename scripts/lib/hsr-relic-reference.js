/** Validate named sets or a two-plus-two combination backed by distinct DB sets. */
export function isValidHsrRelicReference(name, relics) {
  if (relics.some(relic => relic.name?.trim() === name)) return true;
  const parts = name.split('+').map(part => part.trim());
  if (parts.length !== 2) return false;
  const candidates = parts.map(part => {
    const match = part.match(/^(.+?)\s+2세트$/);
    if (!match) return [];
    const label = match[1].trim();
    if (label === '속도') {
      return relics.filter(relic => /^속도\s+\d+(?:\.\d+)?%\s*증가$/.test(relic['2piece'] || ''));
    }
    return relics.filter(relic => relic.name?.trim() === label);
  });
  // The same named set cannot provide its two-piece bonus twice.
  return candidates[0].some(first => candidates[1].some(second => first.name !== second.name));
}
