import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const env = fs.readFileSync(path.resolve(__dirname, '../.env'), 'utf8')
  .split('\n')
  .reduce((acc, line) => {
    const [key, value] = line.split('=');
    if (key && value) acc[key.trim()] = value.trim();
    return acc;
  }, {});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function check() {
  console.log('Checking table: characters...');
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .limit(1);
    
  if (error) {
    console.error('❌ Table check failed:', error.message);
  } else {
    console.log('✅ Table access successful! Data:', data);
  }
}

check();
