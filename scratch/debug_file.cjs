const fs = require('fs');
const filePath = 'c:/Users/User/Desktop/rira game hub/game-hub/hsr-hub/data/tiers.ts';
const content = fs.readFileSync(filePath, 'utf8');
console.log("File length:", content.length);
console.log("First 100 chars:", JSON.stringify(content.substring(0, 100)));
console.log("Contains 'shadow'?:", content.includes('shadow'));
console.log("Contains '\"shadow\"'?:", content.includes('"shadow"'));
console.log("Contains '정운'?:", content.includes('정운'));
