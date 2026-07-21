import { Client } from '@notionhq/client';
import fs from 'fs';
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

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

async function fetchAllNames() {
  const notion = new Client({ auth: NOTION_TOKEN, notionVersion: '2022-06-28' });
  
  try {
    let results = [];
    let hasMore = true;
    let nextCursor = undefined;

    while (hasMore) {
      const response = await notion.request({
        path: `databases/${NOTION_DATABASE_ID}/query`,
        method: 'POST',
        body: {
          start_cursor: nextCursor
        }
      });
      results.push(...response.results);
      hasMore = response.has_more;
      nextCursor = response.next_cursor;
    }

    const names = [];
    for (const page of results) {
      const name = page.properties['이름']?.title?.[0]?.plain_text || 'Unnamed';
      names.push(name);
      
      if (name.includes('루실라') || name.toLowerCase().includes('lucilla')) {
        fs.writeFileSync('scratch/lucilla_found_raw.json', JSON.stringify(page, null, 2));
        console.log(`Found matching name: ${name}`);
        console.log("Properties:");
        for (const key in page.properties) {
          console.log(`- ${key} (${page.properties[key].type})`);
        }
      }
    }
    
    fs.writeFileSync('scratch/all_names.json', JSON.stringify(names, null, 2));
    console.log(`Fetched ${names.length} items. List saved to scratch/all_names.json`);

  } catch (err) {
    console.error("Error:", err.message);
  }
}

fetchAllNames();
