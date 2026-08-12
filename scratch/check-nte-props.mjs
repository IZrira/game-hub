import fs from 'fs';
import { Client } from '@notionhq/client';

const envContent = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) envVars[match[1].trim()] = match[2].trim().replace(/^['"](.*)['"]$/, '$1');
});

const notion = new Client({ auth: envVars.NOTION_API_KEY });
async function run() {
  const response = await notion.databases.query({
    database_id: envVars.NOTION_NTE_CHARACTER_DB_ID,
    page_size: 1
  });
  console.log("NTE Character properties:");
  console.log(Object.keys(response.results[0].properties));
}
run();
