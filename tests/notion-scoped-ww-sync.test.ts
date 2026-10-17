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
it('keeps Phrolova input tokens recognizable as icons without the image suffix', () => {
  const items = JSON.parse(fs.readFileSync('common-hub/data/notion-data.json', 'utf8'));
  const characters = items.filter((item: { name: string; type: string }) => item.name === '플로로' && item.type === '캐릭터');
  expect(characters).toHaveLength(1);
  expect(characters[0].skillInputGuide).toContain('[mouse left]');
  expect(characters[0].skillInputGuide).not.toMatch(/\[(?:mouse left|key E)\s+이미지\]/i);
});
