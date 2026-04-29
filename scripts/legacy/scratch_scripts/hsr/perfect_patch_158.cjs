const fs = require('fs');

const master = JSON.parse(fs.readFileSync('scratch/master_158_baseline.json', 'utf8'));
const v8 = JSON.parse(fs.readFileSync('scratch/v8_verbatim_parsed.json', 'utf8'));

const v8Map = new Map();
v8.forEach(item => {
    // Normalize name for matching (NFC)
    const normalizedName = item.name.normalize('NFC');
    v8Map.set(normalizedName, item);
});

let updatedCount = 0;

const finalMaster = master.map(m => {
    const normalizedName = m.name.normalize('NFC');
    const v8Match = v8Map.get(normalizedName);
    
    if (v8Match) {
        updatedCount++;
        // Use v8 data (High fidelity)
        // Keep existing ID, Path, Rarity
        return {
            ...m,
            skillName: v8Match.skillName || m.skillName,
            skillDesc: v8Match.s1 + (v8Match.s5 ? "\n" + v8Match.s5 : ""),
            stats: {
                hp: v8Match.hp || m.stats.hp,
                atk: v8Match.atk || m.stats.atk,
                def: v8Match.def || m.stats.def
            },
            story: v8Match.story || m.story
        };
    }
    
    // For non-v8 items, just ensure existing \n are proper
    return {
        ...m,
        skillDesc: m.skillDesc.replace(/\\n/g, '\n'),
        story: m.story.replace(/\\n/g, '\n')
    };
});

console.log(`Merged ${master.length} total items. Updated ${updatedCount} items with high-fidelity v8 data.`);
fs.writeFileSync('scratch/master_158_final.json', JSON.stringify(finalMaster, null, 2), 'utf8');
