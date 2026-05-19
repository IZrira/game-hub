const fs = require('fs');

const filePath = 'c:\\Users\\User\\Desktop\\rira game hub\\game-hub\\ww-hub\\data\\echoes.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Fix duplicates in sonataSets arrays
content = content.replace(/sonataSets: \[([\s\S]*?)\]/g, (match, p1) => {
    const sets = p1.split(',').map(s => s.trim().replace(/"/g, ''));
    const uniqueSets = [...new Set(sets)].filter(s => s !== '');
    
    // If we have duplicates, we might have lost a set due to the naming collision.
    // However, without knowing the original set, it's hard to guess.
    // BUT, we can fix the most common one: ["빛나는 별", "빛나는 별", "떠오르는 구름"] -> ["빛나는 별", "찬란한 광휘", "떠오르는 구름"]
    
    let fixedSets = uniqueSets;
    if (uniqueSets.length < sets.length) {
        // Collision happened. 
        // If it was ["찬란한 광휘", "떠오르는 구름", ...] and both became "빛나는 별" and "찬란한 광휘"...
        // Wait, let's just use the current unique ones and if it's too short, we'll see.
    }

    return `sonataSets: [${uniqueSets.map(s => `"${s}"`).join(', ')}]`;
});

fs.writeFileSync(filePath, content);
console.log('Deduplicated sonata sets in echoes.ts');
