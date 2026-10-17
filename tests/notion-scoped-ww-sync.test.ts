import fs from 'node:fs';
import { expect, it } from 'vitest';
const script = fs.readFileSync('scripts/fetch-notion-data.js', 'utf8');
it('keeps scoped WW synchronization fail-closed and preserves existing records', () => {
  expect(script).toContain('--ww-character-names=');
  expect(script).toContain('Requested WW characters were missing or duplicated; refusing to overwrite.');
  expect(script).toContain('if (selectedNames) throw mdErr;');
  expect(script).toContain("item.type === '캐릭터' && byId.has(item.id) ? { ...item, ...byId.get(item.id) } : item");
  expect(script).toContain('Notion token missing; scoped synchronization did not run.');
});
it('does not disable TLS verification for Notion synchronization', () => {
  expect(script).not.toMatch(/NODE_TLS_REJECT_UNAUTHORIZED\s*=\s*['"]0/);
});
