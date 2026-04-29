
import fs from 'fs';
import path from 'path';

// This is a scratch script to compare characters.json and characters.ts exports
// Since I can't easily import TS files here, I'll just read characters.ts as text and extract IDs

const jsonPath = 'hsr-hub/data/characters.json';
const tsPath = 'hsr-hub/data/characters.ts';

const jsonContent = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const jsonIds = new Set(jsonContent.map(c => c.id));

const tsContent = fs.readFileSync(tsPath, 'utf8');
const tsImports = tsContent.match(/import (\w+) from '\.\/characters\/hsr\/(\w+)';/g) || [];
const tsIds = new Set();

tsImports.forEach(imp => {
    const match = imp.match(/import (\w+) from '\.\/characters\/hsr\/(\w+)';/);
    if (match) {
        tsIds.add(match[2]); // The filename is usually the ID in characters.json
    }
});

console.log('IDs in characters.ts but missing in characters.json:');
tsIds.forEach(id => {
    if (!jsonIds.has(id)) {
        console.log(`- ${id}`);
    }
});

console.log('\nIDs in characters.json but missing in characters.ts:');
jsonIds.forEach(id => {
    if (!tsIds.has(id)) {
        // Special case for trailblazer variants which might be handled differently
        if (!id.startsWith('trailblazer_')) {
             console.log(`- ${id}`);
        }
    }
});
