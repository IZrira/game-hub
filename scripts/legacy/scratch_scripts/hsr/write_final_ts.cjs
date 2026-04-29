const fs = require('fs');
const path = require('path');

const pristine = JSON.parse(fs.readFileSync('scratch/master_pristine_updated.json', 'utf8'));

const groups = {};
pristine.forEach(item => {
    if (!groups[item._filePath]) groups[item._filePath] = [];
    groups[item._filePath].push(item);
});

const dir = 'hsr-hub/data/lightcones';

for (const [fileName, items] of Object.entries(groups)) {
    // Sort items by rarity desc then name
    items.sort((a,b) => ((b.rarity||4) - (a.rarity||4)) || a.name.localeCompare(b.name));
    
    // We export using the filename pattern (e.g. destruction.ts -> destructionLightcones)
    const arrayName = fileName.replace('.ts', '') + 'Lightcones';
    
    const fileContent = `import { LightCone } from '../../../common-hub/types';
import { createLv80Stats } from '../dataFactory';

export const ${arrayName}: LightCone[] = [
${items.map(item => {
    const cleanSkillDesc = (item.skill?.description || item.skillDesc || "").replace(/"/g, '\\"').replace(/\n/g, '\\n');
    const cleanStory = (item.story || "").replace(/"/g, '\\"').replace(/\n/g, '\\n');
    
    // Some basic TS file schema matching
    return `  {
    id: "${item.id}",
    name: "${item.name}",
    folderName: "${item.folderName}",
    rarity: ${item.rarity || 4},
    path: "${item.path}",
    baseStats: createLv80Stats(${item.baseStats?.hp || item.stats?.hp || 0}, ${item.baseStats?.atk || item.stats?.atk || 0}, ${item.baseStats?.def || item.stats?.def || 0}),
    skill: {
      name: "${item.skill?.name || item.skillName || ''}",
      description: "${cleanSkillDesc}"
    },
    story: "${cleanStory}"${item.source ? `,\n    source: "${item.source}"` : ''}
  }`;
}).join(',\n')}
];
`;
    fs.writeFileSync(path.join(dir, fileName), fileContent, 'utf8');
    console.log(`Saved ${items.length} items to ${fileName}`);
}

console.log('All TS files written perfectly!');
