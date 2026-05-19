const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manual env parsing to avoid dotenv dependency
function loadEnv() {
  const envPath = path.join(__dirname, '../.env');
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  content.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      env[key.trim()] = valueParts.join('=').trim().replace(/['"]/g, '');
    }
  });
  return env;
}

const env = loadEnv();
const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase URL or Key missing in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log('🚀 Starting Tier List Migration...');
  
  const filePath = path.join(__dirname, '../hsr-hub/data/tiers.ts');
  const content = fs.readFileSync(filePath, 'utf8');
  
  const categories = ['chaos', 'fiction', 'shadow', 'divergent'];
  const allInserts = [];

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
          allInserts.push({
            game_id: 'hsr',
            category_id: catId,
            character_name: char[2],
            role: char[1],
            tier: tier,
            change: char[3]
          });
        }
      }
    }
  }

  console.log(`📊 Found ${allInserts.length} character entries to migrate.`);

  // Insert in chunks of 50 to avoid any potential limits
  const chunkSize = 50;
  for (let i = 0; i < allInserts.length; i += chunkSize) {
    const chunk = allInserts.slice(i, i + chunkSize);
    const { error } = await supabase
      .from('tier_lists')
      .upsert(chunk, { onConflict: 'game_id,category_id,character_name' });

    if (error) {
      console.error(`❌ Chunk ${i/chunkSize + 1} failed:`, error.message);
    } else {
      console.log(`✅ Chunk ${i/chunkSize + 1} migrated.`);
    }
  }

  console.log('🎉 Migration complete!');
}

migrate();
