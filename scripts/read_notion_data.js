import fs from 'fs';
const data = JSON.parse(fs.readFileSync('common-hub/data/notion-data.json', 'utf8'));
const char = data.find(c => c.type === '캐릭터' && c.name === '카멜리아');
console.log("Voice Actors:", JSON.stringify(char.voiceActors));
console.log("Locales:", JSON.stringify(char.locales));
console.log("Roles:", JSON.stringify(char.combatRoles));
