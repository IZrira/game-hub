const fs = require('fs');
const path = require('path');

const dir = 'hsr-hub/data/lightcones';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

const master = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // Split by objects in the array
  const itemBlocks = content.split(/\{(?:[^{}]*|\{[^{}]*\})*\}/g);
  // Re-matching properly
  const items = [];
  const regex = /\{[\s\S]*?id:\s*['"](.*?)['"][\s\S]*?\}/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
      const block = match[0];
      
      const id = block.match(/id:\s*['"](.*?)['"]/)?.[1];
      const name = block.match(/name:\s*['"](.*?)['"]/)?.[1];
      const rarity = parseInt(block.match(/rarity:\s*(\d)/)?.[1] || "4");
      const pathValue = block.match(/path:\s*['"](.*?)['"]/)?.[1];
      
      const skillName = block.match(/name:\s*['"](.*?)['"]/g)?.[1]?.match(/['"](.*?)['"]/)?.[1] || ""; // Second 'name' is often skill name
      const skillDesc = block.match(/description:\s*['"]([\s\S]*?)['"]/)?.[1] || "";
      
      const hp = parseInt(block.match(/hp:\s*(\d+)/)?.[1] || "0");
      const atk = parseInt(block.match(/atk:\s*(\d+)/)?.[1] || "0");
      const def = parseInt(block.match(/def:\s*(\d+)/)?.[1] || "0");
      
      const storyMatch = block.match(/story:\s*['"]([\s\S]*?)['"]/);
      const story = storyMatch ? storyMatch[1] : "";

      items.push({
          id, name, rarity, path: pathValue,
          skillName, skillDesc,
          stats: { hp, atk, def },
          story
      });
  }
  master.push(...items);
});

console.log(`Extracted ${master.length} items.`);
fs.writeFileSync('scratch/master_158_baseline.json', JSON.stringify(master, null, 2), 'utf8');
