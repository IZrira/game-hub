const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://xwhtfrbrykedxgbdclyg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3aHRmcmJyeWtlZHhnYmRjbHlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwOTk1MjIsImV4cCI6MjA5MjY3NTUyMn0.ET0919UvGMvp_RNQ1JMkOAPteVyzUnM-HKBVfPaRQao';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateFolders() {
  const updates = [
    { name: '개척자 (화합)', folder: '개척자 (화합)' },
    { name: '개척자 (보존)', folder: '개척자 (보존)' },
    { name: '개척자 (파멸)', folder: '개척자 (파멸)' },
    { name: '개척자 (기억)', folder: '개척자 (기억)' },
    { name: '개척자 (환락)', folder: '개척자 (환락)' }
  ];

  for (const update of updates) {
    console.log(`Updating ${update.name}...`);
    const { data, error } = await supabase
      .from('characters')
      .update({ folder_name: update.folder })
      .eq('name', update.name);
    
    if (error) {
      console.error(`Error updating ${update.name}:`, error);
    } else {
      console.log(`Successfully updated ${update.name}`);
    }
  }
}

updateFolders();
