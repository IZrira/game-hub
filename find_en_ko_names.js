import fs from 'fs';
import path from 'path';

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      scanDir(full);
    } else if (full.endsWith('.ts')) {
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      for (const line of lines) {
        if (line.includes('name:')) {
          const match = line.match(/name:\s*(['"`])([^'"`]+)\1/);
          if (match) {
            const val = match[2];
            // If it contains english letters and no korean, report it
            if (/[A-Za-z]/.test(val) && !/[가-힣]/.test(val) && !val.includes('character.') && !val.includes('lightcone.')) {
              console.log(`English name found in ${file}: ${val}`);
            }
          }
        }
      }
    }
  }
}

console.log("Scanning Lightcones:");
scanDir('./hsr-hub/data/lightcones');
console.log("Scanning Characters:");
scanDir('./hsr-hub/data/characters');
