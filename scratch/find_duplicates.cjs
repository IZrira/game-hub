const fs = require('fs');
const content = fs.readFileSync('c:/Users/User/Desktop/rira game hub/game-hub/hsr-hub/data/tiers.ts', 'utf8');

const categories = ['chaos', 'fiction', 'shadow', 'divergent'];
const categoryRanges = [];
const catStarts = [...content.matchAll(/"(chaos|fiction|shadow|divergent)":\s*\[/g)];

for (let i = 0; i < catStarts.length; i++) {
    const start = catStarts[i].index;
    const end = (i < catStarts.length - 1) ? catStarts[i+1].index : content.length;
    categoryRanges.push({ name: catStarts[i][1], start, end });
}

categoryRanges.forEach(range => {
    const subContent = content.substring(range.start, range.end);
    const names = [...subContent.matchAll(/"name":\s*"([^"]+)"/g)].map(m => m[1]);
    const counts = {};
    names.forEach(n => {
        counts[n] = (counts[n] || 0) + 1;
    });
    
    const duplicates = Object.keys(counts).filter(n => counts[n] > 1);
    if (duplicates.length > 0) {
        console.log(`Duplicates in category "${range.name}":`);
        duplicates.forEach(d => console.log(`  - ${d}: ${counts[d]} times`));
    }
});
