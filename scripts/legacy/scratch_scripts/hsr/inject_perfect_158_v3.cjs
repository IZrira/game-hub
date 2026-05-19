const fs = require('fs');
const path = require('path');

const master = JSON.parse(fs.readFileSync('scratch/master_158_perfect_final_v3.json', 'utf8'));

// Map of Path names to filename
const pathToFile = {
    "파멸": "destruction.ts",
    "수렵": "hunt.ts",
    "지식": "erudition.ts",
    "화합": "harmony.ts",
    "공허": "nihility.ts",
    "보존": "preservation.ts",
    "풍요": "abundance.ts",
    "기억": "remembrance.ts"
};

const groups = {};
Object.keys(pathToFile).forEach(p => groups[p] = []);

master.forEach(item => {
    const p = item.path || "기억"; // Fallback
    if (groups[p]) groups[p].push(item);
    else {
        console.warn(`Unknown path: ${p} for ${item.name}. Putting in 기억.`);
        groups["기억"].push(item);
    }
});

const dir = 'hsr-hub/data/lightcones';

Object.keys(groups).forEach(pName => {
    const fileName = pathToFile[pName];
    const items = groups[pName];
    
    // Sort items by rarity (desc) then name
    items.sort((a,b) => (b.rarity - a.rarity) || a.name.localeCompare(b.name));

    const fileContent = `import { LightCone } from '../../../common-hub/types';
import { createLv80Stats } from '../dataFactory';

export const ${fileName.replace('.ts', '')}Lightcones: LightCone[] = [
${items.map(item => {
    const cleanSkillDesc = (item.skillDesc || "").replace(/"/g, '\\"').replace(/\n/g, '\\n');
    const cleanStory = (item.story || "").replace(/"/g, '\\"').replace(/\n/g, '\\n');
    
    return `  {
    id: "${item.id}",
    gameId: "hsr",
    name: "${item.name}",
    folderName: "${item.name.normalize('NFC')}",
    rarity: ${item.rarity || 4},
    path: "${pName}",
    source: "${item.source || ''}",
    baseStats: createLv80Stats(${item.stats?.hp || 0}, ${item.stats?.atk || 0}, ${item.stats?.def || 0}),
    skill: {
      name: "${item.skillName || ''}",
      description: "${cleanSkillDesc}",
    },
    story: "${cleanStory}"
  }`;
}).join(',\n')}
];
`;

    fs.writeFileSync(path.join(dir, fileName), fileContent, 'utf8');
    console.log(`Injected ${items.length} items into ${fileName}`);
});
