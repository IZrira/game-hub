import fs from 'node:fs';
import path from 'node:path';
import { Client } from '@notionhq/client';

// Read every page before writing, so a partial API failure cannot replace good data.
export async function syncNteGuides(notion, n2m, databaseId, rootDir) {
  const dataClient = new Client({ auth: process.env.NOTION_TOKEN });
  const database = await dataClient.databases.retrieve({ database_id: databaseId });
  const dataSourceId = database.data_sources?.[0]?.id;
  if (!dataSourceId) throw new Error('NTE guide database has no data source.');
  const pages = [];
  let cursor;
  do {
    const response = await dataClient.dataSources.query({ data_source_id: dataSourceId, start_cursor: cursor });
    pages.push(...response.results);
    cursor = response.has_more ? response.next_cursor : undefined;
  } while (cursor);
  if (!pages.length) throw new Error('NTE guide database is empty; existing guides preserved.');

  const characters = JSON.parse(fs.readFileSync(path.join(rootDir, 'nte-hub/data/generated/characters.json'), 'utf8'));
  const articlePath = path.join(rootDir, 'common-hub/data/guideArticles.json');
  const existing = JSON.parse(fs.readFileSync(articlePath, 'utf8'));
  const guides = [];
  const seen = new Set();
  for (const page of pages) {
    const title = (page.properties['이름']?.title || []).map(text => text.plain_text).join('').trim();
    const characterName = title.replace(/\s*세팅\s*공략\s*$/, '').trim();
    const character = characters.find(item => item.name === characterName);
    if (!character) throw new Error(`NTE guide has no matching character: ${title}`);
    if (seen.has(character.id)) throw new Error(`Duplicate NTE guide: ${title}`);
    seen.add(character.id);
    const content = n2m.toMarkdownString(await n2m.pageToMarkdown(page.id)).parent || '';
    if (!content.trim()) throw new Error(`NTE guide is empty: ${title}`);
    const previous = existing.find(item => item.notionPageId === page.id);
    guides.push({
      gameId: 'nte',
      slug: `${character.fileName || character.id}-build-guide`,
      status: 'published',
      title,
      excerpt: `${characterName}의 아크, 콘솔 세팅, 목표 육성치, 스킬·각성 우선순위와 추천 파티를 정리합니다.`,
      publishedAt: previous?.publishedAt || page.created_time.slice(0, 10),
      reviewedAt: page.last_edited_time.slice(0, 10),
      applicableVersion: content.match(/패치\s*버전\s*([^\n]+)/)?.[1]?.trim() || '',
      author: 'Rira',
      content,
      sources: [],
      notionDatabaseId: databaseId,
      notionPageId: page.id,
      characterId: character.id,
    });
    console.log(`[Notion Sync][NTE guide] ${title}: ${content.length} characters`);
  }
  const preserved = existing.filter(item => item.gameId !== 'nte' || item.notionDatabaseId !== databaseId);
  guides.sort((a, b) => a.title.localeCompare(b.title, 'ko'));
  fs.writeFileSync(articlePath, JSON.stringify([...preserved, ...guides], null, 2) + '\n', 'utf8');
  console.log(`[Notion Sync] Successfully synced ${guides.length} NTE character guides. Other guides preserved.`);
}
