const fs = require('fs');
const path = require('path');
const tsDir = 'hsr-hub/data/lightcones';
const files = fs.readdirSync(tsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

const items = [];

function createLv80Stats(hp, atk, def) {
    return { hp, atk, def };
}

for (const file of files) {
    let content = fs.readFileSync(path.join(tsDir, file), 'utf8');
    
    // Replace typescript features
    content = content.replace(/import .*/g, '');
    content = content.replace(/export const .*?: LightCone\[\] =/g, 'return');
    
    // Use Function constructor
    try {
        const func = new Function('createLv80Stats', content);
        const array = func(createLv80Stats);
        if (array && Array.isArray(array)) {
            array.forEach(i => {
                i._filePath = file;
                items.push(i);
            });
        }
    } catch (e) {
        console.error('Error parsing file', file, e);
    }
}

console.log('Extracted', items.length, 'pristine items!');
fs.writeFileSync('scratch/master_pristine_eval.json', JSON.stringify(items, null, 2), 'utf8');
