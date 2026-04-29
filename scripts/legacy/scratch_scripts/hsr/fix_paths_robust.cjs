const fs = require('fs');
const path = require('path');

const tsDir = 'hsr-hub/data/lightcones';
const files = fs.readdirSync(tsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

const truePaths = {};

function normalize(str) {
    return str.replace(/['"「」,.!?:\s]/g, '').toLowerCase();
}

for (const file of files) {
    const content = fs.readFileSync(path.join(tsDir, file), 'utf8');
    const lines = content.split('\n');
    let currentName = '';
    for(let l of lines) {
        if(l.includes('name: "') && l.trim().startsWith('name:')) {
            currentName = l.match(/name:\s*"([^"]+)"/)[1];
        }
        if(l.includes('path: "') && currentName) {
            let p = l.match(/path:\s*"([^"]+)"/)[1];
            truePaths[normalize(currentName)] = p;
            currentName = '';
        }
    }
}

const baseline = JSON.parse(fs.readFileSync('scratch/master_158_perfect_final_v3.json', 'utf8'));

baseline.forEach(item => {
    let checkName = normalize(item.name.replace(' (무명의 공훈)',''));
    
    // Some V8 files had wrong names or we need to check ID
    if (truePaths[checkName]) {
        item.path = truePaths[checkName];
    } else {
        // Try id fallback
        let checkId = normalize(item.id.replace('lc_',''));
        if (truePaths[checkId]) item.path = truePaths[checkId];
        else {
           // fallback to rememberance for new ones like 그녀의 불꽃을 잊지 말라
           console.warn('Fallback needed for:', item.name);
           if (!item.path || item.path === '파멸') { // 파멸 was the default fallback buggy value
               item.path = '기억'; 
           }
        }
    }

    if (item.name.includes('(무명의 공훈)')) {
        item.name = item.name.replace(' (무명의 공훈)', '');
        item.source = "무명의 공훈";
    }
});

fs.writeFileSync('scratch/master_158_perfect_final_v4.json', JSON.stringify(baseline, null, 2), 'utf8');
console.log('Fixed true baseline paths robustly!');
