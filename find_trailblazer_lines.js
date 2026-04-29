
import fs from 'fs';
const content = fs.readFileSync('hsr-hub/data/tiers.ts', 'utf8');
const lines = content.split('\n');
lines.forEach((line, i) => {
    if (line.includes('개척자 (화합)') || line.includes('개척자 (파멸)') || line.includes('개척자 (보존)') || line.includes('개척자 (기억)')) {
        console.log(`${i + 1}: ${line.trim()}`);
    }
});
