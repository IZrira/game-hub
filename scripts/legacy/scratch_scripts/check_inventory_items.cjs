const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://xwhtfrbrykedxgbdclyg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3aHRmcmJyeWtlZHhnYmRjbHlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwOTk1MjIsImV4cCI6MjA5MjY3NTUyMn0.ET0919UvGMvp_RNQ1JMkOAPteVyzUnM-HKBVfPaRQao';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkItems() {
  // Assuming the table name is 'inventory' or 'items'
  // Let's try 'inventory' first based on common-hub context
  console.log("Fetching items from 'inventory' table...");
  const { data, error } = await supabase.from('inventory').select('name').limit(100);
  
  if (error) {
    console.error("Error fetching from 'inventory':", error);
    console.log("Trying 'items' table...");
    const { data: data2, error: error2 } = await supabase.from('items').select('name').limit(100);
    if (error2) {
      console.error("Error fetching from 'items':", error2);
    } else {
      console.log("Items in 'items' table:", data2.map(i => i.name));
    }
  } else {
    console.log("Items in 'inventory' table:", data.map(i => i.name));
  }
}

checkItems();
