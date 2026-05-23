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
    const response = await notion.request({
      path: `databases/${NOTION_DATABASE_ID}/query`,
      method: 'POST',
      body: {
        sorts: [{ property: '이름', direction: 'ascending' }]
      }
    });

    const items = [];
    for (const page of response.results) {
      const props = page.properties;
      
      // 본문 내용을 마크다운으로 변환하여 가져오기
      let contentMarkdown = '';
      try {
        const mdblocks = await n2m.pageToMarkdown(page.id);
        const mdString = n2m.toMarkdownString(mdblocks);
        contentMarkdown = mdString.parent || '';
      } catch (mdErr) {
        console.error(`[Notion Sync] Failed to fetch markdown content for page ${page.id}:`, mdErr);
      }

      // 속성 매핑 (이름, 성급, 종류, 출시 버전, 획득 경로 등)
      // 노션 속성명에 따라 텍스트/셀렉트 유형 처리
      const name = props['이름']?.title[0]?.plain_text || '';
      const rarity = props['성급']?.select?.name || '';
      const type = props['종류']?.select?.name || '';
      const releaseVersion = props['출시 버전']?.rich_text[0]?.plain_text || '';
      const obtain = props['획득 경로']?.rich_text[0]?.plain_text || '';

      items.push({
        id: page.id,
        name,
        rarity: rarity ? parseInt(rarity.replace(/[^0-9]/g, '')) || 4 : 4,
        type,
        releaseVersion,
        obtain,
        content: contentMarkdown
      });
    }

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
