const fs = require('fs');
const path = require('path');

const dir = 'hsr-hub/data/lightcones';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

const master = [];

files.forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Find all blocks starting with { and ending with id:
    // A more robust way to find whole objects in the array
    const parts = content.split(/\r?\n\s*\{\s*\n/); 
    // This might be tricky. Let's use a scanning approach.
    
    const items = [];
    let currentPos = content.indexOf('{');
    
    while (currentPos !== -1) {
        // Find matching closing brace
        let braceCount = 0;
        let endPos = -1;
        for (let i = currentPos; i < content.length; i++) {
            if (content[i] === '{') braceCount++;
            if (content[i] === '}') braceCount--;
            if (braceCount === 0) {
                endPos = i;
                break;
            }
        }
        
        if (endPos !== -1) {
            const block = content.substring(currentPos, endPos + 1);
            if (block.includes('id:')) {
                const id = block.match(/id:\s*['"](.*?)['"]/)?.[1];
                const name = block.match(/name:\s*['"](.*?)['"]/)?.[1];
                // Only take the first name as LC name, skip the one inside skill object for now
                const rarity = parseInt(block.match(/rarity:\s*(\d)/)?.[1] || "4");
                const pathValue = block.match(/path:\s*['"](.*?)['"]/)?.[1];
                
                // Get skill object part
                const skillMatch = block.match(/skill:\s*\{([\s\S]*?)\}/);
                const skillName = skillMatch ? skillMatch[1].match(/name:\s*['"](.*?)['"]/)?.[1] : "";
                const skillDesc = skillMatch ? skillMatch[1].match(/description:\s*['"]([\s\S]*?)['"]/)?.[1] : "";
                
                const storyMatch = block.match(/story:\s*['"]([\s\S]*?)['"]/);
                const story = storyMatch ? storyMatch[1] : "";

                if (id) {
                    items.push({ id, name, rarity, path: pathValue, skillName, skillDesc, story, fullBlock: block });
                }
            }
            currentPos = content.indexOf('{', endPos + 1);
        } else {
            break;
        }
    }
    master.push(...items);
});

console.log(`Successfully extracted ${master.length} items using robust scanner.`);
if (master.length > 0) {
    console.log('Sample Name 1:', master[0].name);
}
fs.writeFileSync('scratch/master_158_baseline_robust.json', JSON.stringify(master, null, 2), 'utf8');
