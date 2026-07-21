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
const NOTION_DATABASE_ID = '35595fae3dc780aa8040e41d21d27af4';

async function fetchLucilla() {
  const notion = new Client({ auth: NOTION_TOKEN, notionVersion: '2022-06-28' });
  
  try {
    const response = await notion.request({
      path: `databases/${NOTION_DATABASE_ID}/query`,
      method: 'POST',
      body: {
        filter: {
          property: '이름',
          title: {
            equals: '루실라'
          }
        }
      }
    });

    if (response.results.length > 0) {
      console.log("Lucilla found!");
      console.log("Properties available:");
      const props = response.results[0].properties;
      for (const key in props) {
        console.log(`- ${key} (${props[key].type})`);
      }
      
      // Save raw data to see exact content
      fs.writeFileSync('scratch/lucilla_raw.json', JSON.stringify(response.results[0], null, 2));
      console.log("\nRaw data saved to scratch/lucilla_raw.json");
    } else {
      console.log("Lucilla not found in the database.");
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
}

fetchLucilla();
