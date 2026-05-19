import * as fs from 'fs';
import * as path from 'path';

const lcDir = 'c:/Users/User/Desktop/rira game hub/game-hub/hsr-hub/data/lightcones';
const files = fs.readdirSync(lcDir).filter(f => f.endsWith('.ts') && f !== 'index.ts' && f !== 'dataFactory.ts');

const existingMapping: Record<string, string> = {};

files.forEach(file => {
    const content = fs.readFileSync(path.join(lcDir, file), 'utf8');
    const pathName = file.replace('.ts', '');
    
    // Simple regex to find names in the file
    const nameMatches = content.match(/name:\s*"([^"]+)"/g);
    if (nameMatches) {
        nameMatches.forEach(m => {
            const name = m.match(/"([^"]+)"/)?.[1];
            if (name) existingMapping[name] = pathName;
        });
    }
    
    // Also check folderName or id if possible
    const idMatches = content.match(/id:\s*"lc_([^"]+)"/g);
    if (idMatches) {
        idMatches.forEach(m => {
            const id = m.match(/"lc_([^"]+)"/)?.[1];
            if (id) {
               // Normalize underscore IDs to names if they look like names
               const potentialName = id.replace(/_/g, ' ');
               existingMapping[potentialName] = pathName;
            }
        });
    }
});

fs.writeFileSync('c:/Users/User/Desktop/rira game hub/game-hub/scratch/hsr/extracted_mapping.json', JSON.stringify(existingMapping, null, 2));
console.log(`Extracted mapping for ${Object.keys(existingMapping).length} items.`);
