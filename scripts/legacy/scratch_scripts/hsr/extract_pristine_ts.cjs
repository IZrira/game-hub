const fs = require('fs');
const path = require('path');

const tsDir = 'hsr-hub/data/lightcones';
const files = fs.readdirSync(tsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

const items = [];

for (const file of files) {
    const content = fs.readFileSync(path.join(tsDir, file), 'utf8');
    const pathStr = file.replace('.ts', '');
    
    // Quick and dirty TS object array parsing
    // It's formatted like: export const ... = [\n  {\n    id: ...
    const match = content.match(/\[\s*([\s\S]*)\s*\];/);
    if (!match) continue;
    
    const objStrs = match[1].split(/\n\s*},\n\s*\{/g);
    
    objStrs.forEach((str, i) => {
        let cleanStr = str.replace(/^[\s\S]*?\{/, '{').replace(/}[\s\S]*$/, '}');
        if (i===0 && !cleanStr.startsWith('{')) cleanStr = '{' + cleanStr;
        if (i===objStrs.length-1 && !cleanStr.endsWith('}')) cleanStr = cleanStr + '}';

        // parse keys
        const item = { _filePath: file };
        
        const idMatch = cleanStr.match(/id:\s*"([^"]+)"/);
        if(idMatch) item.id = idMatch[1];
        
        const nameMatch = cleanStr.match(/name:\s*"([^"]+)"/);
        if(nameMatch) item.name = nameMatch[1];
        
        const folderNameMatch = cleanStr.match(/folderName:\s*"([^"]+)"/);
        if(folderNameMatch) item.folderName = folderNameMatch[1];
        
        const rarityMatch = cleanStr.match(/rarity:\s*(\d+)/);
        if(rarityMatch) item.rarity = parseInt(rarityMatch[1]);
        
        const pathMatch = cleanStr.match(/path:\s*"([^"]+)"/);
        if(pathMatch) item.path = pathMatch[1];
        
        const sourceMatch = cleanStr.match(/source:\s*"([^"]+)"/);
        if(sourceMatch) item.source = sourceMatch[1];
        
        const statsMatch = cleanStr.match(/createLv80Stats\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (statsMatch) {
            item.stats = {
                hp: parseInt(statsMatch[1]),
                atk: parseInt(statsMatch[2]),
                def: parseInt(statsMatch[3])
            };
        }
        
        // This is the pristine data. We want to preserve English/locale keys for those we DON'T update
        const skillNameMatch = cleanStr.match(/name:\s*"([^"]+)"/g);
        if(skillNameMatch && skillNameMatch.length > 1) {
            item.skillName = skillNameMatch[1].match(/"([^"]+)"/)[1];
        }
        
        const descMatch = cleanStr.match(/description:\s*"([^"]+)"/);
        if(descMatch) item.skillDesc = descMatch[1];
        
        const storyMatch = cleanStr.match(/story:\s*"([^"]+)"/);
        if(storyMatch) item.story = storyMatch[1];
        
        items.push(item);
    });
}
console.log('Extracted', items.length, 'pristine items!');
fs.writeFileSync('scratch/master_pristine.json', JSON.stringify(items, null, 2), 'utf8');
