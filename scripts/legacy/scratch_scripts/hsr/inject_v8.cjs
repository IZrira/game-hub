const fs = require('fs');
const path = require('path');

const parsedData = JSON.parse(fs.readFileSync(path.join(__dirname, 'parsed_lc_v8.json'), 'utf8'));

const PATH_NAME_CONFIG = {
  "기억": { file: "remembrance.ts", var: "remembranceLightcones" },
  "환락": { file: "elation.ts", var: "elationLightcones" },
  "파멸": { file: "destruction.ts", var: "destructionLightcones" },
  "수렵": { file: "hunt.ts", var: "huntLightcones" },
  "지식": { file: "erudition.ts", var: "eruditionLightcones" },
  "화합": { file: "harmony.ts", var: "harmonyLightcones" },
  "공허": { file: "nihility.ts", var: "nihilityLightcones" },
  "보존": { file: "preservation.ts", var: "preservationLightcones" },
  "풍요": { file: "abundance.ts", var: "abundanceLightcones" }
};

const BASE_DIR = path.join(__dirname, '../hsr-hub/data/lightcones');

const grouped = {};
parsedData.forEach(item => {
  if (!grouped[item.path]) grouped[item.path] = [];
  grouped[item.path].push(item);
});

Object.keys(PATH_NAME_CONFIG).forEach(korPath => {
  const config = PATH_NAME_CONFIG[korPath];
  const items = grouped[korPath] || [];
  
  const content = `import { LightCone } from '../../../common-hub/types';
import { createLv80Stats } from '../dataFactory';

export const ${config.var}: LightCone[] = [
${items.map(i => `  {
    id: "${i.id}",
    gameId: "hsr",
    name: "${i.name}",
    folderName: "${i.folderName}",
    rarity: ${i.rarity},
    path: "${i.path}",
    source: "${i.source}",
    baseStats: createLv80Stats(${i.hp}, ${i.atk}, ${i.def}),
    skill: {
      name: "${i.skillName}",
      description: "[1중첩] ${i.s1.replace(/\n/g, '\\n')}\\n[5중첩] ${i.s5.replace(/\n/g, '\\n')}"
    },
    story: ${JSON.stringify(i.story)}
  }`).join(',\n')}
];
`;

  fs.writeFileSync(path.join(BASE_DIR, config.file), content);
  console.log(`Updated ${config.file} with ${items.length} items.`);
});
