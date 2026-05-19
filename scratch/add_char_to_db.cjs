const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://xwhtfrbrykedxgbdclyg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3aHRmcmJyeWtlZHhnYmRjbHlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwOTk1MjIsImV4cCI6MjA5MjY3NTUyMn0.ET0919UvGMvp_RNQ1JMkOAPteVyzUnM-HKBVfPaRQao';
const supabase = createClient(supabaseUrl, supabaseKey);

async function addSilverWolf999() {
    const newChar = {
        id: 'silver_wolf_999',
        name: '은랑 LV.999',
        folder_name: '은랑 LV.999',
        rarity: 5,
        attribute: '허수',
        path: '환락',
        version: '4.2'
    };

    console.log("Registering Silver Wolf LV.999 to 'characters' table...");
    const { error: charError } = await supabase.from('characters').insert([newChar]);
    
    if (charError) {
        console.error("Error adding character:", charError.message);
        // If it already exists, we continue to tier_lists
    } else {
        console.log("Character registered successfully.");
    }

    const categories = ['chaos', 'fiction', 'shadow', 'divergent'];
    const tierEntries = categories.map(catId => ({
        game_id: 'hsr',
        category_id: catId,
        character_name: newChar.name,
        tier: '?',
        role: '메인 딜러',
        change: 'stay',
        display_order: 100
    }));

    console.log("Registering character to 'tier_lists' table for all categories...");
    const { error: tierError } = await supabase.from('tier_lists').insert(tierEntries);
    
    if (tierError) {
        console.error("Error adding tier entries:", tierError.message);
    } else {
        console.log("Tier entries registered successfully.");
    }
}

addSilverWolf999();
