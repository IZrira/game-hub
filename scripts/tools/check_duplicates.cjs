const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../../hsr-hub/data/lightcones');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

const idMap = new Map();
let duplicateFound = false;

files.forEach(file => {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const matches = content.match(/"id":\s*"([^"]+)"/g);
  if (matches) {
    matches.forEach(match => {
      const id = match.match(/"id":\s*"([^"]+)"/)[1];
      if (idMap.has(id)) {
        console.error(`DUPLICATE ID FOUND: ${id}`);
        console.error(`- In ${file}`);
        console.error(`- Also in ${idMap.get(id)}`);
        duplicateFound = true;
      } else {
        idMap.set(id, file);
      }
    });
  }
});

if (!duplicateFound) {
  console.log('No duplicate IDs found across all lightcone files.');
} else {
  process.exit(1);
}
