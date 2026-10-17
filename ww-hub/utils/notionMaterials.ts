/** Split only the final quantity marker; digits can be part of an item name. */
export const parseWwNotionMaterials = (text?: string): Array<{ name: string; count: number }> =>
  (text || '').split(/\r?\n/).flatMap(raw => {
    const line = raw.trim();
    if (!line) return [];
    const match = line.match(/^(.+?)\s*[x×*]\s*(\d[\d,]*)\s*$/);
    if (!match) return [{ name: line, count: 1 }];
    return [{ name: match[1].trim(), count: Number.parseInt(match[2].replace(/,/g, ''), 10) }];
  });
