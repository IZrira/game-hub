const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.join(__dirname, '../.env');
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
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function inspect() {
  console.log('🧐 Final Inspection for 파이논...');
  const { data, error } = await supabase
    .from('tier_lists')
    .select('*')
    .ilike('character_name', '%파이논%');

  if (error) {
    console.error('❌ Error:', error);
  } else {
    data.forEach(d => {
      console.log(`- [${d.character_name}] in [${d.category_id}] | Tier: [${d.tier}] | Change: [${d.change}]`);
    });
  }
}

inspect();
