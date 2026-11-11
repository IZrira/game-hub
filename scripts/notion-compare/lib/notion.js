// Read-only Notion access for the comparison tool. Nothing here writes to Notion.
import fs from 'node:fs';
import path from 'node:path';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

export function loadEnv(root) {
  for (const file of ['.env', '.env.local']) {
    const p = path.join(root, file);
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = (m[2] || '').trim().replace(/^['"]|['"]$/g, '');
    }
  }
}

export function createNotion() {
  const token = process.env.NOTION_TOKEN;
  if (!token) throw new Error('NOTION_TOKEN is not set (.env.local).');
  const client = new Client({ auth: token, notionVersion: '2022-06-28' });
  return { client, n2m: new NotionToMarkdown({ notionClient: client }) };
}

const plain = rich => (rich || []).map(t => t.plain_text).join('');

/** All rows of a database, each with its title text and edit time. */
export async function listRows({ client }, databaseId) {
  const rows = [];
  let cursor;
  do {
    const res = await client.request({
      path: `databases/${databaseId}/query`,
      method: 'POST',
      body: { start_cursor: cursor, page_size: 100 },
    });
    for (const r of res.results) {
      const titleProp = Object.values(r.properties || {}).find(p => p.type === 'title');
      rows.push({ id: r.id, title: plain(titleProp?.title), edited: r.last_edited_time, created: r.created_time });
    }
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);
  return rows;
}

async function children(client, blockId) {
  const all = [];
  let cursor;
  do {
    const res = await client.blocks.children.list({ block_id: blockId, start_cursor: cursor, page_size: 100 });
    all.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);
  return all;
}

/** A page body as a flat list of {depth, type, text}; nested blocks follow their parent. */
export async function readBlocks({ client }, pageId, depth = 0) {
  const out = [];
  for (const b of await children(client, pageId)) {
    const d = b[b.type] || {};
    let text = d.rich_text ? plain(d.rich_text) : '';
    if (b.type === 'table_row') text = d.cells.map(plain).join(' | ');
    if (b.type === 'child_page' || b.type === 'child_database') text = d.title || '';
    out.push({ depth, type: b.type, text });
    if (b.has_children && b.type !== 'child_page' && b.type !== 'child_database') {
      out.push(...await readBlocks({ client }, b.id, depth + 1));
    }
  }
  return out;
}

/** Short pause between pages; Notion allows about three requests per second per integration. */
export const pause = (ms = 150) => new Promise(resolve => setTimeout(resolve, ms));

/** Rows plus their bodies, read one page at a time to stay inside Notion's rate limit. */
export async function readDatabase(notion, databaseId) {
  const rows = await listRows(notion, databaseId);
  for (const row of rows) {
    await pause();
    row.blocks = await readBlocks(notion, row.id);
  }
  return rows;
}

/** A page body rendered by notion-to-md, the same renderer the sync script uses. */
export async function pageMarkdown({ n2m }, pageId) {
  const blocks = await n2m.pageToMarkdown(pageId);
  return n2m.toMarkdownString(blocks).parent || '';
}
