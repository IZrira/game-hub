const fs = require('fs');
const path = require('path');

const koLocales = JSON.parse(fs.readFileSync('common-hub/locales/hsr_lightcones_ko.json', 'utf8'));
const enLocales = JSON.parse(fs.readFileSync('common-hub/locales/hsr_lightcones_en.json', 'utf8'));

// Build reverse map from Korean string to object key
const koToKey = {};
for (const [key, val] of Object.entries(koLocales)) {
    if (key.endsWith('.name')) {
        const baseKey = key.replace('.name', '');
        koToKey[val.normalize('NFC')] = baseKey;
        // also strip " (무명의 공훈)"
        koToKey[val.replace(' (무명의 공훈)', '').normalize('NFC')] = baseKey;
    }
}

const tsDir = 'hsr-hub/data/lightcones';
const files = fs.readdirSync(tsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

const keyToPath = {};

for (const file of files) {
    const content = fs.readFileSync(path.join(tsDir, file), 'utf8');
    const pathMatch = file.replace('.ts', ''); // the filename IS the path in english! e.g. hunt.ts -> hunt!
    
    // Actually we want the Korean path name!
    const pathToKo = {
        "destruction": "파멸",
        "hunt": "수렵",
        "erudition": "지식",
        "harmony": "화합",
        "nihility": "공허",
        "preservation": "보존",
        "abundance": "풍요",
        "remembrance": "기억",
        "mistery": "신비"
    };

    const koreanPath = pathToKo[pathMatch];

    const lines = content.split('\n');
    for(let l of lines) {
        if(l.includes('name: "')) {
            const n = l.match(/name:\s*"([^"]+)"/)[1];
            // n could be something like "lightcone.lc_only_silence_remains.name"
            if (n.startsWith('lightcone.')) {
                const baseKey = n.replace('.name', '');
                keyToPath[baseKey] = koreanPath;
            } else {
                keyToPath[n] = koreanPath; // If it's already key
            }
        }
    }
}

// Read the V4 JSON we had which has 158 items with broken paths
const baseline = JSON.parse(fs.readFileSync('scratch/master_158_perfect_final_v4.json', 'utf8'));

let fixedCount = 0;
baseline.forEach(item => {
    let rawName = item.name.replace(' (무명의 공훈)', '').normalize('NFC');
    const baseKey = koToKey[rawName];
    if (baseKey && keyToPath[baseKey]) {
        item.path = keyToPath[baseKey];
        fixedCount++;
    } else {
        // We couldn't find the key or path. Let's keep it as is (기억)
    }
});

fs.writeFileSync('scratch/master_158_perfect_final_v5.json', JSON.stringify(baseline, null, 2), 'utf8');
console.log(`Successfully mapped ${fixedCount} light cones using locales!`);
