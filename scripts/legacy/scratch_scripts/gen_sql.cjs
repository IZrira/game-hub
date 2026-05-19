const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../hsr-hub/data/tiers.ts');
const content = fs.readFileSync(filePath, 'utf8');

const categories = ['chaos', 'fiction', 'shadow', 'divergent'];
let sql = 'INSERT INTO tier_lists (game_id, category_id, character_name, role, tier, change) VALUES\n';
const inserts = [];

for (const catId of categories) {
  const sectionRegex = new RegExp(`'${catId}':\\s*\\[([\\s\\S]*?)\\],`, 'g');
  const match = sectionRegex.exec(content);
  
  if (match) {
    const groupsStr = match[1];
    const groupMatches = groupsStr.matchAll(/\{\s*"tier":\s*"([^"]+)",[\s\S]*?"characters":\s*\[([\s\S]*?)\]\s*\}/g);
    
    for (const group of groupMatches) {
      const tier = group[1];
      const charsStr = group[2];
      const charMatches = charsStr.matchAll(/\{\s*"id":\s*"[^"]+",\s*"folderName":\s*"[^"]+",\s*"role":\s*"([^"]+)",\s*"name":\s*"([^"]+)",\s*"change":\s*"([^"]+)"/g);
      
      for (const char of charMatches) {
        inserts.push(`('hsr', '${catId}', '${char[2].replace(/'/g, "''")}', '${char[1]}', '${tier}', '${char[3]}')`);
      }
    }
  }
}

const finalSql = sql + inserts.join(',\n') + '\nON CONFLICT (game_id, category_id, character_name) DO UPDATE SET tier = EXCLUDED.tier, change = EXCLUDED.change, role = EXCLUDED.role;';

fs.writeFileSync(path.join(__dirname, 'migrate_tiers.sql'), finalSql);
console.log('✅ SQL file generated successfully at scratch/migrate_tiers.sql');
