import fs from 'fs';

const data = JSON.parse(fs.readFileSync('common-hub/data/notion-data.json', 'utf8'));
const char = data.find(c => c.type === '캐릭터' && c.name === '카멜리아');

function parseMat(text) {
  if (!text) return [];
  const parsed = [];
  const parts = text.split(/,|\n/);
  parts.forEach((p) => {
    const trimmed = p.trim();
    if (trimmed) {
      const nameMatch = trimmed.match(/([^\dx*]+)/);
      const countMatch = trimmed.match(/[\dx*]+$/);
      if (nameMatch) {
        parsed.push({
          name: nameMatch[1].trim(),
          count: countMatch ? parseInt(countMatch[0].replace(/[x*]/g, ''), 10) : 1
        });
      }
    }
  });
  return parsed;
}

console.log('Ascension:', char.ascensionMaterials);
console.log('Parsed Ascension:', parseMat(char.ascensionMaterials));
console.log('Skill:', char.skillMaterials);
console.log('Parsed Skill:', parseMat(char.skillMaterials));
