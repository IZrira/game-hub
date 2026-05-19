const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const env = fs.readFileSync(path.resolve(__dirname, '../.env'), 'utf8')
  .split('\n')
  .reduce((acc, line) => {
    const [key, ...values] = line.split('=');
    if (key && values.length > 0) acc[key.trim()] = values.join('=').trim();
    return acc;
  }, {});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function checkAll() {
  const { data, error } = await supabase.from('notices').select('*');
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('All Notices:', JSON.stringify(data, null, 2));
  }
}

checkAll();
