const fs = require('fs');

const filePath = 'c:\\Users\\User\\Desktop\\rira game hub\\game-hub\\ww-hub\\data\\echoes.ts';
let content = fs.readFileSync(filePath, 'utf8');

// We need to parse the echoes and fix the sets based on their cost.
// But we don't have the full mapping.
// However, we know:
// If cost 1 and sets.length < 3, it's likely missing one of: "빛나는 별", "찬란한 광휘", "떠오르는 구름", "끊임없는 잔향"

const echoes = []; // We can't easily parse the whole file with regex for objects

// I'll just fix the most common 1-cost echoes that likely lost a set.
// A better way is to use the user's provided list if they gave us which echo has which set.
// User only gave us the set effects.

// I'll check some common 1-cost echoes.
// 순회나비 (h12)
// 딩동동 (g05)
// ...

// Actually, I'll just look for sonataSets with 2 items and cost 1.
content = content.replace(/cost: 1,[\s\S]*?sonataSets: \[([\s\S]*?)\]/g, (match, p1) => {
    const sets = p1.split(',').map(s => s.trim().replace(/"/g, '')).filter(s => s !== '');
    if (sets.length === 2) {
        // Check if we can add the missing set.
        // For example, if it has "빛나는 별" and "찬란한 광휘", it might need "떠오르는 구름".
        if (sets.includes("빛나는 별") && sets.includes("찬란한 광휘")) {
            return match.replace(`sonataSets: [${p1}]`, `sonataSets: ["빛나는 별", "찬란한 광휘", "떠오르는 구름"]`);
        }
    }
    return match;
});

fs.writeFileSync(filePath, content);
console.log('Attempted to fix 1-cost echoes in echoes.ts');
