export interface NteGuideArc { name: string; rank: number; note: string }
export interface NteGuideConsole { label: string; name: string; note: string }
export interface NteGuideStatGroup { label: string; items: { label: string; value: string }[] }
export interface NteCharacterGuide {
  arcs: NteGuideArc[];
  consoles: NteGuideConsole[];
  statGroups: NteGuideStatGroup[];
  mainStats: string[];
  subStats: string[];
  skillPriority: string[];
  awakeningPriority: number[];
  party: string[];
  notes: string[];
}

const clean = (value: string) => value.replace(/\*\*|__/g, '').trim();

/** Converts the synced source into presentation data without changing its values. */
export function parseNteCharacterGuide(content: string): NteCharacterGuide {
  const result: NteCharacterGuide = { arcs: [], consoles: [], statGroups: [], mainStats: [], subStats: [], skillPriority: [], awakeningPriority: [], party: [], notes: [] };
  let section = 'intro';
  let consoleSet: NteGuideConsole | undefined;
  let stats: NteGuideStatGroup | undefined;
  for (const rawLine of content.split(/\r?\n/)) {
    const line = clean(rawLine.replace(/^#{1,6}\s*/, ''));
    if (!line || /^[-*_]{3,}$/.test(line)) continue;
    if (line === '아크') { section = 'arcs'; continue; }
    if (/^콘솔\s*세트\s*\d*$/.test(line)) {
      section = 'consoles';
      consoleSet = { label: line, name: '', note: '' };
      result.consoles.push(consoleSet);
      continue;
    }
    if (/^스킬\s*레벨\s*업\s*우선\s*순위$/.test(line)) { section = 'skills'; continue; }
    if (/^각성\s*우선\s*순위$/.test(line)) { section = 'awakenings'; continue; }
    if (/^파티\s*추천$/.test(line)) { section = 'party'; continue; }
    const bullet = rawLine.match(/^(\s*)[-*]\s+(.+)$/);
    if (bullet && bullet[1].length === 0) {
      const label = clean(bullet[2]);
      if (label === '콘솔 주 옵션') section = 'mainStats';
      else if (label === '콘솔 부 옵션') section = 'subStats';
      else {
        section = 'stats';
        stats = { label, items: [] };
        result.statGroups.push(stats);
      }
      continue;
    }
    const value = bullet ? clean(bullet[2]) : line;
    if (section === 'arcs') {
      const arc = line.match(/^(.*?)\s*(\d+)\s*순위\s*[:：]\s*(.*)$/);
      if (arc) result.arcs.push({ name: clean(arc[1]), rank: Number(arc[2]), note: arc[3] });
      else if (result.arcs.length) result.arcs.at(-1)!.note += `\n${line}`;
      else result.notes.push(line);
    } else if (section === 'consoles' && consoleSet) {
      if (!consoleSet.name) consoleSet.name = line;
      else consoleSet.note += `${consoleSet.note ? '\n' : ''}${line.replace(/^이유\s*[:：]\s*/, '')}`;
    } else if (section === 'stats' && stats) {
      const colon = value.search(/[:：]/);
      stats.items.push(colon >= 0 ? { label: value.slice(0, colon).trim(), value: value.slice(colon + 1).trim() } : { label: value, value: '' });
    } else if (section === 'mainStats') result.mainStats.push(value);
    else if (section === 'subStats') result.subStats.push(value);
    else if (section === 'skills') {
      // Space-separated and comma-separated source formats are both used.
      const matches = value.match(/바이레일\s*스킬|울티메이트|일반\s*공격|서포트\s*스킬|패시브\s*스킬\s*[12]/g);
      if (matches) result.skillPriority.push(...matches.map(item => item.replace(/스킬\s+([12])/, '스킬$1')));
      else result.notes.push(value);
    } else if (section === 'awakenings') result.awakeningPriority.push(...(value.match(/\b[1-6]\b/g) || []).map(Number));
    else if (section === 'party') result.party.push(...value.split(/[,，.\n]/).map(item => item.trim()).filter(Boolean));
    else if (section !== 'intro') result.notes.push(value);
  }
  return result;
}
