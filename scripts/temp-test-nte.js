import { Client } from '@notionhq/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// 1. .env 파서
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
const DB_ID = '38095fae3dc780a29fffe0381071580d';

async function test() {
  const notion = new Client({ auth: NOTION_TOKEN, notionVersion: '2022-06-28' });
  try {
    const db = await notion.databases.retrieve({ database_id: DB_ID });
    console.log('Properties:', Object.keys(db.properties));
    
    const response = await notion.databases.query({ database_id: DB_ID, page_size: 1 });
    if (response.results.length > 0) {
      console.log('First item properties:', JSON.stringify(response.results[0].properties, null, 2));
    }
  } catch(e) {
    console.error(e);
  }
}
test();
