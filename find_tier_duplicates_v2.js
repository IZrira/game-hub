
import fs from 'fs';

const content = fs.readFileSync('hsr-hub/data/tiers.ts', 'utf8');

// Use a more generic approach: find all "name": "..." within each category block
const categories = ['chaos', 'fiction', 'shadow', 'divergent'];
categories.forEach(cat => {
    const startIdx = content.indexOf(`"${cat}":`);
    if (startIdx === -1) return;
    
    // Find the end of this category's array
    let endIdx = content.indexOf('],', startIdx);
    if (endIdx === -1) endIdx = content.indexOf(']', startIdx);
    
    const body = content.substring(startIdx, endIdx);
    const names = [];
    const nameRegex = /"name":\s*"([^"]+)"/g;
    let match;
    while ((match = nameRegex.exec(body)) !== null) {
        names.push(match[1]);
    }
    
    const counts = {};
    names.forEach(name => {
        counts[name] = (counts[name] || 0) + 1;
        if (counts[name] > 1) {
            console.log(`Duplicate found in ${cat}: ${name} (${counts[name]} times)`);
        }
    });
});
