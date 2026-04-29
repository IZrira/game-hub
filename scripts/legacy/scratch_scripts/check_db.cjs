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

async function check() {
  console.log('🔍 Detailed DB Check...');
  
  // 1. Check Connection
  const { data: tables, error: tableError } = await supabase
    .from('tier_lists')
    .select('*')
    .limit(1);

  if (tableError) {
    console.error('❌ Table Error:', JSON.stringify(tableError, null, 2));
  } else {
    console.log('✅ Connection Success! Data:', tables);
  }

  // 2. Check Row Count
  const { count, error: countError } = await supabase
    .from('tier_lists')
    .select('*', { count: 'exact', head: true });
    
  console.log('📊 Total Rows:', count);
}

check();
