const fs = require('fs');

const v8 = JSON.parse(fs.readFileSync('scratch/v8_verbatim_parsed.json', 'utf8'));
const v7 = require('./lc_data_v7.cjs');
const masterBaseline = JSON.parse(fs.readFileSync('scratch/master_158_baseline_robust.json', 'utf8'));
const locale = JSON.parse(fs.readFileSync('common-hub/locales/hsr_lightcones_ko.json', 'utf8'));

const n = (s) => s ? s.normalize('NFC').trim() : "";

const finalPool = new Map(); // name -> object

// Priority 1: v8 (Verbatim)
v8.forEach(v => {
    finalPool.set(n(v.name), {
        id: `lc_${n(v.name).replace(/\s+/g, '_')}`, // Temporary ID, will refine
        ...v,
        source_priority: 1
    });
});

// Priority 2: v7
v7.forEach(item => {
    const name = n(item.name);
    if (!finalPool.has(name)) {
        finalPool.set(name, {
            ...item,
            skillDesc: item.skillDesc || item.s1 + (item.s5 ? "\n" + item.s5 : ""),
            stats: { hp: item.hp, atk: item.atk, def: item.def },
            source_priority: 2
        });
    } else {
        // Recover missing stats from v7 if v8 is missing them
        const existing = finalPool.get(name);
        if (existing.hp === 0 && item.hp > 0) {
            existing.hp = item.hp;
            existing.atk = item.atk;
            existing.def = item.def;
            existing.stats = { hp: item.hp, atk: item.atk, def: item.def };
        }
    }
});

// Priority 3: Baseline (only if name doesn't exist and looks legit)
masterBaseline.forEach(m => {
    const name = n(m.name);
    if (name.length > 1 && name.length < 30 && !name.startsWith('「') && !finalPool.has(name)) {
        finalPool.set(name, {
            ...m,
            source_priority: 3
        });
    }
});

// Map back to IDs using baseline as anchor for existing IDs
const nameToId = new Map();
masterBaseline.forEach(m => nameToId.set(n(m.name), m.id));

const result = Array.from(finalPool.values()).map(item => {
    const name = n(item.name);
    const existingId = nameToId.get(name);
    
    // Resolve ID
    if (existingId) item.id = existingId;
    else if (!item.id) item.id = `lc_${name.replace(/\s+/g, '_')}`;

    // Fix newlines
    item.skillDesc = (item.skillDesc || "").replace(/\\n/g, '\n');
    item.story = (item.story || "").replace(/\\n/g, '\n');

    return item;
});

// Sort by priority and then name
result.sort((a, b) => (a.source_priority - b.source_priority) || a.name.localeCompare(b.name));

// Take Top 158
const final158 = result.slice(0, 158);

console.log(`Final Database Stats:
- Total Unique Pool: ${result.length}
- Items in Final Database: ${final158.length}
- Source v8 count: ${final158.filter(i => i.source_priority === 1).length}
- Source v7 count: ${final158.filter(i => i.source_priority === 2).length}
- Source Baseline count: ${final158.filter(i => i.source_priority === 3).length}
`);

fs.writeFileSync('scratch/master_158_perfect_final.json', JSON.stringify(final158, null, 2), 'utf8');
