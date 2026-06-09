import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// 1. .env 및 .env.local 파서
function loadEnv() {
  const envFiles = ['.env', '.env.local'];
  for (const envFile of envFiles) {
    const envPath = path.join(ROOT_DIR, envFile);
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split('\n');
      for (const line of lines) {
        const match = line.match(/^\s*([^=#\s]+)\s*=\s*(.*)$/);
        if (match) {
          process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, '');
        }
      }
    }
  }
}
loadEnv();

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

const destDir = path.join(ROOT_DIR, 'common-hub', 'data');
const jsonPath = path.join(destDir, 'notion-data.json');

async function fetchNotionData() {
  // 디렉토리가 없으면 생성
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // 플레이스홀더나 빈 값일 경우 처리
  if (!NOTION_TOKEN || NOTION_TOKEN === 'secret_xxxxxxxxx' || !NOTION_DATABASE_ID || NOTION_DATABASE_ID === 'xxxxxxxxxxxx') {
    console.log('[Notion Sync] Notion token or database ID is a placeholder or empty. Skipping fetch. Writing empty/fallback array to notion-data.json.');
    if (!fs.existsSync(jsonPath)) {
      fs.writeFileSync(jsonPath, JSON.stringify([], null, 2), 'utf8');
    }
    return;
  }

  console.log('[Notion Sync] Connecting to Notion API...');
  const notion = new Client({ auth: NOTION_TOKEN, notionVersion: '2022-06-28' });
  const n2m = new NotionToMarkdown({ notionClient: notion });

  try {
    let results = [];
    let hasMore = true;
    let nextCursor = undefined;

    while (hasMore) {
      const response = await notion.request({
        path: `databases/${NOTION_DATABASE_ID}/query`,
        method: 'POST',
        body: {
          sorts: [{ property: '이름', direction: 'ascending' }],
          start_cursor: nextCursor
        }
      });
      results.push(...response.results);
      hasMore = response.has_more;
      nextCursor = response.next_cursor;
    }

    const itemsMap = new Map();
    for (const page of results) {
      const props = page.properties;
      
      // 무기가 아닌 경우(예: 캐릭터)에는 기존처럼 본문 마크다운을 파싱
      const type = props['종류']?.select?.name || '';
      let contentMarkdown = '';
      if (!['대검', '직검', '권총', '권갑', '증폭기', '무기'].includes(type)) {
        try {
          const mdblocks = await n2m.pageToMarkdown(page.id);
          const mdString = n2m.toMarkdownString(mdblocks);
          contentMarkdown = mdString.parent || '';
        } catch (mdErr) {
          console.error(`[Notion Sync] Failed to fetch markdown content for page ${page.id}:`, mdErr);
        }
      }

      // 속성 매핑 헬퍼 함수
      const extractRichText = (prop) => {
        if (!prop || !prop.rich_text) return '';
        return prop.rich_text.map(rt => rt.plain_text).join('');
      };

      // 속성 매핑
      const name = props['이름']?.title?.[0]?.plain_text || '';
      const rarity = props['성급']?.select?.name || '';
      let releaseVersion = '';
      if (props['출시 버전']?.type === 'select') {
        releaseVersion = props['출시 버전']?.select?.name || '';
      } else if (props['출시 버전']?.type === 'number') {
        releaseVersion = props['출시 버전']?.number?.toString() || '';
      } else {
        releaseVersion = extractRichText(props['출시 버전']);
      }      
      let obtain = '';
      if (props['획득 경로']?.type === 'select') {
        obtain = props['획득 경로']?.select?.name || '';
      } else if (props['획득 경로']?.type === 'multi_select') {
        obtain = props['획득 경로']?.multi_select?.map(s => s.name).join(', ') || '';
      } else {
        obtain = extractRichText(props['획득 경로']);
      }
      
      const growthStats = extractRichText(props['성장 스텟']);
      const skillName = extractRichText(props['스킬명']);
      const skillDescription = extractRichText(props['스킬 설명']);
      const ascensionMaterials = extractRichText(props['돌파 재료']);
      const weaponStory = extractRichText(props['무기 스토리']);

      const normalizedName = name.trim();
      
      if (normalizedName) {
        itemsMap.set(normalizedName, {
          id: page.id,
          name,
          rarity: rarity ? parseInt(rarity.replace(/[^0-9]/g, '')) || 4 : 4,
          type,
          releaseVersion,
          obtain,
          growthStats,
          skillName,
          skillDescription,
          ascensionMaterials,
          weaponStory,
          content: contentMarkdown
        });
      }
    }

    const items = Array.from(itemsMap.values());

    fs.writeFileSync(jsonPath, JSON.stringify(items, null, 2), 'utf8');
    console.log(`[Notion Sync] Successfully fetched ${items.length} items from Notion and updated notion-data.json!`);
  } catch (error) {
    console.error('[Notion Sync] Error connecting to Notion API. Please verify your credentials and network connection:', error.message);
    // 빌드를 중단하지 않도록 캐시 파일이 없는 경우에만 빈 배열을 써줍니다.
    if (!fs.existsSync(jsonPath)) {
      fs.writeFileSync(jsonPath, JSON.stringify([], null, 2), 'utf8');
    }
  }
}

fetchNotionData();
