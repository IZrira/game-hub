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
// Use service_role key if available for testing, or stay with anon
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function testUpdate() {
  console.log('🔄 Testing Update for 파이논...');
  
  const { data, error } = await supabase
    .from('tier_lists')
    .update({ tier: 'OP', change: 'up' })
    .match({ game_id: 'hsr', category_id: 'chaos', character_name: '파이논' })
    .select();

  if (error) {
    console.error('❌ Update Failed:', JSON.stringify(error, null, 2));
  } else {
    console.log('✅ Update Success! Result:', data);
  }
}

testUpdate();
