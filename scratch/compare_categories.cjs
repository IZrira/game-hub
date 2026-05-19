const fs = require('fs');
const content = fs.readFileSync('c:/Users/User/Desktop/rira game hub/game-hub/hsr-hub/data/tiers.ts', 'utf8');

const getNames = (cat) => {
    const catStarts = [...content.matchAll(new RegExp(`"${cat}":\\s*\\[`, 'g'))];
    if (catStarts.length === 0) return [];
    const start = catStarts[0].index;
    const nextCatMatch = content.substring(start + 10).match(/"(fiction|shadow|divergent|HSR_TIER_CATEGORIES)":/);
    const end = nextCatMatch ? start + 10 + nextCatMatch.index : content.lastIndexOf(']');
    const subContent = content.substring(start, end);
    return [...subContent.matchAll(/"name":\s*"([^"]+)"/g)].map(m => m[1]);
};

const chaosNames = getNames('chaos');
const shadowNames = getNames('shadow');

const missingInShadow = chaosNames.filter(n => !shadowNames.includes(n));

console.log(`Characters in Chaos but missing in Shadow (${missingInShadow.length}):`);
missingInShadow.forEach(n => console.log(`  - ${n}`));
