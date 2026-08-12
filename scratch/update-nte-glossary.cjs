const fs = require('fs');
const envContent = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([^=#\s]+)\s*=\s*(.*)$/);
  if (match) envVars[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, '');
});

async function run() {
  console.log("Fetching NTE characters to update glossary...");
  let hasMore = true;
  let nextCursor = undefined;
  const nteChars = {};

  while (hasMore) {
    const response = await fetch(`https://api.notion.com/v1/databases/${envVars.NOTION_NTE_CHARACTER_DB_ID || '38095fae3dc7802aa4abf9ab1977e687'}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${envVars.NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page_size: 100,
        start_cursor: nextCursor
      })
    });
    
    if (!response.ok) {
        console.log("Failed to fetch:", await response.text());
        break;
    }
    
    const data = await response.json();
    for (const page of data.results) {
        const name = page.properties['이름']?.title?.[0]?.plain_text || '';
        const plain_text = page.properties['용어']?.rich_text?.map(rt => rt.plain_text).join('') || '';
        if (name) {
            nteChars[name.trim()] = plain_text;
        }
    }
    
    hasMore = data.has_more;
    nextCursor = data.next_cursor;
  }

  const jsonPath = './common-hub/data/notion-data.json';
  let data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  let updatedCount = 0;
  
  data = data.map(item => {
      if (item.dbSource === 'nte_characters' && nteChars[item.name]) {
          item.glossary = nteChars[item.name];
          updatedCount++;
      }
      return item;
  });

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
  console.log(`Updated glossary for ${updatedCount} NTE characters.`);
}
run();
