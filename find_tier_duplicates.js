
import fs from 'fs';

const tsPath = 'hsr-hub/data/tiers.ts';
const content = fs.readFileSync(tsPath, 'utf8');

// Simple regex-based parser for the Tier Data
const categories = content.match(/const HSR_TIER_DATA: Record<string, TierGroup\[]> = \{([\s\S]*?)\};/);

if (categories) {
    const dataStr = categories[1];
    // Find all category blocks
    const catRegex = /"(\w+)":\s*\[([\s\S]*?)\]\s*(?=,"|\})/g;
    let catMatch;
    while ((catMatch = catRegex.exec(dataStr)) !== null) {
        const catId = catMatch[1];
        const catBody = catMatch[2];
        const names = [];
        const nameRegex = /"name":\s*"([^"]+)"/g;
        let nameMatch;
        while ((nameMatch = nameRegex.exec(catBody)) !== null) {
            names.push(nameMatch[1]);
        }
        
        const counts = {};
        names.forEach(name => {
            counts[name] = (counts[name] || 0) + 1;
            if (counts[name] > 1) {
                console.log(`Duplicate in ${catId}: ${name}`);
            }
        });
    }
} else {
    console.log('HSR_TIER_DATA not found');
}
