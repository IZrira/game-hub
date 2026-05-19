const fs = require('fs');
const filePath = 'c:/Users/User/Desktop/rira game hub/game-hub/hsr-hub/data/tiers.ts';
let content = fs.readFileSync(filePath, 'utf8');

const getCharacterBlocks = (cat) => {
    const catStarts = [...content.matchAll(new RegExp(`"${cat}":\\s*\\[`, 'g'))];
    if (catStarts.length === 0) return [];
    const start = catStarts[0].index;
    const nextCatMatch = content.substring(start + 10).match(/"(fiction|shadow|divergent|HSR_TIER_CATEGORIES)":/);
    const end = nextCatMatch ? start + 10 + nextCatMatch.index : content.lastIndexOf(']');
    const subContent = content.substring(start, end);
    
    const blocks = [];
    const blockRegex = /\{\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"[\s\S]*?\}/g;
    let match;
    while ((match = blockRegex.exec(subContent)) !== null) {
        blocks.push({ id: match[1], name: match[2], full: match[0] });
    }
    return blocks;
};

const chaosBlocks = getCharacterBlocks('chaos');
const shadowBlocks = getCharacterBlocks('shadow');
const shadowNames = shadowBlocks.map(b => b.name);

const missingBlocks = chaosBlocks.filter(b => !shadowNames.includes(b.name));

if (missingBlocks.length > 0) {
    console.log(`Adding ${missingBlocks.length} characters to Shadow F tier...`);
    
    // Find Shadow F tier
    const shadowStart = content.indexOf('"shadow": [');
    const shadowEnd = content.indexOf('],', shadowStart);
    let shadowContent = content.substring(shadowStart, shadowEnd);
    
    const fTierMatch = shadowContent.match(/"tier":\s*"F"[\s\S]*?"characters":\s*\[/);
    if (fTierMatch) {
        const insertPos = fTierMatch.index + fTierMatch[0].length;
        const newCharacters = missingBlocks.map(b => b.full).join(',\n        ');
        shadowContent = shadowContent.substring(0, insertPos) + '\n        ' + newCharacters + ',\n        ' + shadowContent.substring(insertPos);
        
        content = content.substring(0, shadowStart) + shadowContent + content.substring(shadowEnd);
        fs.writeFileSync(filePath, content);
        console.log("Successfully added missing characters to Shadow F.");
    } else {
        console.error("Shadow F tier not found");
    }
} else {
    console.log("No characters missing in Shadow.");
}
