const DEFAULT_LEVELS = [1, 20, 40, 50, 60, 70, 80, 90];

type GrowthRow = { level: number; atk: number; subStatValue: string };

// Low-rarity weapons store their final stats at Lv.70, not Lv.90.
// Read the existing growth table instead of scaling that endpoint as a Lv.90 value.
export function getWwWeaponLevelOptions(weapon: { rarity: number; growthStats?: string }) {
  if (weapon.rarity > 2 || !weapon.growthStats) return { levels: DEFAULT_LEVELS, rows: null };
  const rows: GrowthRow[] = [];
  for (const line of weapon.growthStats.split('\n')) {
    const match = line.replace(/\*\*/g, '').trim().match(/^(\d+)\s*[:：]\s*(?:기초\s*)?공격력\s+(\d+)\s*\/\s*[^\d]+?\s*([\d.]+%?)\s*$/);
    if (!match) continue;
    const level = Number(match[1]);
    const atk = Number(match[2]);
    if (level < 1 || level > 90 || !Number.isFinite(atk) || atk <= 0 || !Number.isFinite(Number.parseFloat(match[3]))) continue;
    rows.push({ level, atk, subStatValue: match[3] });
  }
  rows.sort((a, b) => a.level - b.level);
  if (rows.length < 2 || rows[0].level !== 1 || new Set(rows.map(row => row.level)).size !== rows.length) {
    return { levels: DEFAULT_LEVELS, rows: null };
  }
  return { levels: rows.map(row => row.level), rows };
}
