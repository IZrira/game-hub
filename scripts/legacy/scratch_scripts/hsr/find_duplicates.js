
import fs from 'fs';
import path from 'path';

const dir = 'c:/Users/User/Desktop/rira game hub/game-hub/hsr-hub/data/lightcones';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'index.ts' && f !== 'dataFactory.ts');

const names = {};

files.forEach(file => {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  // Simple regex to find name fields
  const matches = content.match(/"name":\s*"([^"]+)"/g);
  if (matches) {
    matches.forEach(m => {
      const match = /"name":\s*"([^"]+)"/.exec(m);
      if (match) {
        const name = match[1];
        if (!names[name]) names[name] = [];
        names[name].push(file);
      }
    });
  }
});

const duplicates = Object.entries(names).filter(([name, files]) => files.length > 1);

console.log(JSON.stringify(duplicates, null, 2));
