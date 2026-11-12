// Notices live in the Supabase `notices` table (posted from /admin). The static list in
// common-hub/data/notices.ts is only the app's fallback. Build steps read both: the DB
// snapshot written by scripts/generate-notices.js plus the static list, DB first.
import fs from 'node:fs';
import path from 'node:path';

export const NOTICE_SNAPSHOT_RELATIVE = path.join('common-hub', 'data', 'generated', 'db-notices.json');

export function loadStaticNotices(rootDir) {
  try {
    const content = fs.readFileSync(path.join(rootDir, 'common-hub', 'data', 'notices.ts'), 'utf8');
    const match = content.match(/export const GLOBAL_NOTICES:[^=]+=(\s*\[[\s\S]*?\n\]);/);
    if (!match) return [];
    const notices = new Function(`return ${match[1]}`)();
    return Array.isArray(notices) ? notices : [];
  } catch (error) {
    console.warn(`[Notices] Failed to load static notices: ${error.message}`);
    return [];
  }
}

export function loadNoticeSnapshot(rootDir) {
  try {
    const notices = JSON.parse(fs.readFileSync(path.join(rootDir, NOTICE_SNAPSHOT_RELATIVE), 'utf8'));
    return Array.isArray(notices) ? notices : [];
  } catch {
    return [];
  }
}

/** DB notices plus static ones the DB does not have, newest first. */
export function loadAllNotices(rootDir) {
  const byId = new Map();
  [...loadNoticeSnapshot(rootDir), ...loadStaticNotices(rootDir)].forEach(notice => {
    if (notice?.id && !byId.has(notice.id)) byId.set(notice.id, notice);
  });
  return [...byId.values()].sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
}

/** Map a Supabase row to the app's Notice shape (see fetchNotices in common-hub/data/notices.ts). */
export function noticeFromRow(row) {
  return {
    id: row.id,
    category: row.category,
    title: row.title,
    content: row.content || '',
    createdAt: row.created_at ? String(row.created_at).split('T')[0] : '',
    updatedAt: row.updated_at ? String(row.updated_at).split('T')[0] : undefined,
    version: row.version || undefined,
    gameId: row.game_id || 'common',
  };
}
