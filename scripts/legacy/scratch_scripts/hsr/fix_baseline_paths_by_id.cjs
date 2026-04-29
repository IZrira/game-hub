const fs = require('fs');
const path = require('path');

const tsDir = 'hsr-hub/data/lightcones';
const files = fs.readdirSync(tsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

const idToPath = {};

for (const file of files) {
    const content = fs.readFileSync(path.join(tsDir, file), 'utf8');
    
    const lines = content.split('\n');
    let currentId = '';
    for(let l of lines) {
        if(l.includes('id: "') && l.trim().startsWith('id:')) {
            currentId = l.match(/id:\s*"([^"]+)"/)[1];
        }
        if(l.includes('path: "') && currentId) {
            let p = l.match(/path:\s*"([^"]+)"/)[1];
            idToPath[currentId] = p;
            currentId = ''; // Reset
        }
    }
}

const baseline = JSON.parse(fs.readFileSync('scratch/master_158_baseline.json', 'utf8'));

baseline.forEach(item => {
    if (idToPath[item.id]) {
        item.path = idToPath[item.id];
    } else {
        console.warn(`Could not find true path for ID ${item.id} (${item.name})`);
    }
});

fs.writeFileSync('scratch/master_158_true_baseline.json', JSON.stringify(baseline, null, 2), 'utf8');
console.log('Fixed true baseline paths by ID!');
