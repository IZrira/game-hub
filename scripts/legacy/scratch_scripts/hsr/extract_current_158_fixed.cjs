const fs = require('fs');
const path = require('path');

const dir = 'hsr-hub/data/lightcones';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

const master = [];

files.forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Improved regex to find objects within the array
    const itemRegex = /\{[\s\S]*?id:\s*['"](.*?)['"][\s\S]*?name:\s*['"](.*?)['"][\s\S]*?rarity:\s*(\d)[\s\S]*?path:\s*['"](.*?)['"][\s\S]*?skill:\s*\{[\s\S]*?name:\s*['"](.*?)['"][\s\S]*?description:\s*['"]([\s\S]*?)['"][\s\S]*?\}[\s\S]*?story:\s*['"]([\s\S]*?)['"][\s\S]*?\}/g;
    
    let match;
    while ((match = itemRegex.exec(content)) !== null) {
        master.push({
            id: match[1],
            name: match[2],
            rarity: parseInt(match[3]),
            path: match[4],
            skillName: match[5],
            skillDesc: match[6],
            story: match[7]
        });
    }
});

console.log(`Successfully extracted ${master.length} items.`);
if (master.length > 0) {
    console.log('Sample Name:', master[0].name);
}
fs.writeFileSync('scratch/master_158_baseline_fixed.json', JSON.stringify(master, null, 2), 'utf8');
