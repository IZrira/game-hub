const fs = require('fs');
const filePath = 'c:/Users/User/Desktop/rira game hub/game-hub/hsr-hub/data/tiers.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Find the shadow category start with regex
const shadowMatch = content.match(/"shadow":\s*\[/);
if (!shadowMatch) {
    console.error("Shadow category not found");
    process.exit(1);
}

const shadowStart = shadowMatch.index;
// Find the end of the shadow array - this is tricky because of nested arrays
// But we know it ends before the next category or the end of the object
const nextCatMatch = content.substring(shadowStart + 10).match(/"(divergent|HSR_TIER_CATEGORIES)":/);
const shadowEnd = nextCatMatch ? shadowStart + 10 + nextCatMatch.index : content.lastIndexOf(']');

let shadowContent = content.substring(shadowStart, shadowEnd);

// Regular expression for the Tingyun block - be very flexible with spaces
const tingyunBlock = /\{\s*"id":\s*"char_정운",\s*"name":\s*"정운",\s*"folderName":\s*"정운",\s*"role":\s*"서포터",\s*"change":\s*"stay",\s*"displayOrder":\s*100\s*\},?/g;

// Check how many times it appears in shadowContent
const matches = shadowContent.match(tingyunBlock);
console.log(`Found ${matches ? matches.length : 0} matches in shadow category.`);

if (matches && matches.length > 1) {
    let matchCount = 0;
    shadowContent = shadowContent.replace(tingyunBlock, (match) => {
        matchCount++;
        // Remove the second one
        if (matchCount === 2) {
            console.log("Removing the second Tingyun match.");
            return "";
        }
        return match;
    });
    
    content = content.substring(0, shadowStart) + shadowContent + content.substring(shadowEnd);
    fs.writeFileSync(filePath, content);
    console.log("Successfully removed duplicate Tingyun from Shadow category.");
} else {
    console.log("No duplicate Tingyun found in Shadow category.");
}
