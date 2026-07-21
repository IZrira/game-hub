const fs = require('fs');

const data = JSON.parse(fs.readFileSync('common-hub/data/notion-data.json', 'utf8'));
const char = data.find(c => c.type === '캐릭터' && c.name === '카멜리아');

console.log("=== Basic Attack ===");
console.log(char.basicAttack);

console.log("=== Resonance Liberation ===");
console.log(char.resonanceLiberation);

console.log("=== Inherent Skill 1 ===");
console.log(char.inherentSkill1);
