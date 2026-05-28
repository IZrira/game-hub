import { Client } from '@notionhq/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
function loadEnv() {
  const content = fs.readFileSync(path.join(ROOT_DIR, '.env'), 'utf8');
  content.split('\n').forEach(line => {
    const m = line.match(/^\s*([^=#\s]+)\s*=\s*(.*)$/);
    if(m) process.env[m[1]] = m[2].trim().replace(/^['"]|['"]$/g, '');
  });
}
loadEnv();
const notion = new Client({ auth: process.env.NOTION_TOKEN });
notion.request({
  path: 'databases/' + process.env.NOTION_DATABASE_ID + '/query',
  method: 'POST',
  body: {page_size: 1}
}).then(res => console.log(JSON.stringify(res.results[0].properties['출시 버전'], null, 2))).catch(e => console.error(e));
