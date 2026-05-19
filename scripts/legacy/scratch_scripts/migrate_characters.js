import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Simple .env parser
const env = fs.readFileSync(path.resolve(__dirname, '../.env'), 'utf8')
  .split('\n')
  .reduce((acc, line) => {
    const [key, value] = line.split('=');
    if (key && value) acc[key.trim()] = value.trim();
    return acc;
  }, {});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function migrate() {
  console.log('Reading characters.json...');
  const characters = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../hsr-hub/data/characters.json'), 'utf8'));
  
  console.log(`Found ${characters.length} characters. Migrating to DB...`);
  
  for (const char of characters) {
    const { error } = await supabase
      .from('characters')
      .upsert({
        id: char.id,
        name: char.name,
        folder_name: char.folderName || char.name,
        rarity: char.rarity,
        attribute: char.attribute,
        path: char.path,
        image_file: char.imageFile || 'art01.webp',
        version: char.version
      }, { onConflict: 'name' });
      
    if (error) {
      console.error(`❌ Error migrating ${char.name}:`, error.message);
    } else {
      console.log(`✅ Migrated: ${char.name}`);
    }
  }
  
  console.log('Migration complete!');
}

migrate();
