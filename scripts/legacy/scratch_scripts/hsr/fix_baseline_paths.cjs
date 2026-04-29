const fs = require('fs');
const path = require('path');

const tsDir = 'hsr-hub/data/lightcones';
const files = fs.readdirSync(tsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

const truePaths = {};

// We can just regex the JS objects out or simply regex `name:` and `path:`
for (const file of files) {
    const content = fs.readFileSync(path.join(tsDir, file), 'utf8');
    
    // A quick hacky regex to find name and path inside blocks
    const blocksMatch = content.match(/{[^}]*name:\s*"([^"]+)"[^}]*path:\s*"([^"]+)"/g) || [];
    blocksMatch.forEach(block => {
        const nameMatch = block.match(/name:\s*"([^"]+)"/);
        const pathMatch = block.match(/path:\s*"([^"]+)"/);
        if (nameMatch && pathMatch) {
            truePaths[nameMatch[1]] = pathMatch[1];
        }
    });

    // Alternatively, just eval the file? No, it has imports.
    // In V7/V6, the items were perfectly mapped in TS files but when we extracted them to JSON we broke them?
    const lines = content.split('\n');
    let currentName = '';
    for(let l of lines) {
        if(l.includes('name: "') && l.trim().startsWith('name:')) {
            currentName = l.match(/name:\s*"([^"]+)"/)[1];
        }
        if(l.includes('path: "') && currentName) {
            let p = l.match(/path:\s*"([^"]+)"/)[1];
            truePaths[currentName] = p;
            currentName = '';
        }
    }
}

const baseline = JSON.parse(fs.readFileSync('scratch/master_158_baseline.json', 'utf8'));

baseline.forEach(item => {
    if (truePaths[item.name]) {
        item.path = truePaths[item.name];
    } else {
        console.warn(`Could not find true path for ${item.name}`);
    }
});

fs.writeFileSync('scratch/master_158_true_baseline.json', JSON.stringify(baseline, null, 2), 'utf8');
console.log('Fixed true baseline paths!');
