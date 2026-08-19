import { supabase } from './common-hub/lib/supabase';
import data from './common-hub/data/notion-data.json';

const chars = data.filter((i: any) => i.dbSource === 'nte_characters');
const charTasks = chars.map((c: any) => ({
    id: c.id,
    name: c.name,
    folder_name: c.name,
    rarity: c.rarity || 5,
    attribute: c.itemAttribute || c.abilityAttribute || '이능',
    path: c.arc || '결합',
    version: c.releaseVersion || '1.0'
}));

async function testSync() {
    console.log("Upserting", charTasks.length, "characters...");
    const { error } = await supabase
        .from('nte_characters')
        .upsert(charTasks.slice(0, 5), { onConflict: 'id' });
    if (error) {
        console.error("Supabase Error:", error);
    } else {
        console.log("Success!");
    }
}
testSync();
