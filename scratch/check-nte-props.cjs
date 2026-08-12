const fs = require('fs');
const envContent = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([^=#\s]+)\s*=\s*(.*)$/);
  if (match) envVars[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, '');
});

async function run() {
  const response = await fetch(`https://api.notion.com/v1/databases/${envVars.NOTION_NTE_CHARACTER_DB_ID || '38095fae3dc7802aa4abf9ab1977e687'}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${envVars.NOTION_TOKEN}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      page_size: 10,
      filter: {
        property: '이름',
        title: {
          equals: '사키리'
        }
      }
    })
  });
  const data = await response.json();
  if (data.results && data.results.length > 0) {
    const page = data.results[0];
    const plain_text = page.properties['일반 공격']?.rich_text?.map(rt => rt.plain_text).join('') || '';
    console.log("Raw 일반 공격:", plain_text);
  } else {
    console.log('No results', data);
  }
}
run();
