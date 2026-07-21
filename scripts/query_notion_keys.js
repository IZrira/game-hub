import fs from 'fs';
import { Client } from '@notionhq/client';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

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

const notion = new Client({ auth: process.env.NOTION_TOKEN });
async function test() {
  console.log("DB ID: ", process.env.NOTION_WW_CHARACTER_DB_ID);
  const response = await notion.request({
    path: `databases/${process.env.NOTION_WW_CHARACTER_DB_ID}/query`,
    method: 'POST',
    body: { page_size: 1 }
  });
  const props = response.results[0].properties;
  console.log(JSON.stringify(Object.keys(props), null, 2));
}
test();
