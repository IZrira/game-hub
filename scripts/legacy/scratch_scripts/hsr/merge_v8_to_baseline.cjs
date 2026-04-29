const fs = require('fs');

const baseline = JSON.parse(fs.readFileSync('scratch/master_158_baseline.json', 'utf8'));
const raw = fs.readFileSync('scratch/lc_raw_data_v8.txt', 'utf8');

const masterNames = baseline.map(x => x.name);

const lines = raw.split('\n').map(l => l.trimRight());

// Find boundaries based on known names
const foundItems = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (masterNames.includes(line)) {
        foundItems.push({
            name: line,
            startIdx: i
        });
    } else {
        // sometimes name in V8 has " (무명의 공훈)" suffix or something.
        // Let's check if the line starts with a master name and ends with (무명의 공훈)
        let matched = false;
        for (const mName of masterNames) {
            if (line === mName || line === mName + " (무명의 공훈)") {
                foundItems.push({
                    name: mName,
                    startIdx: i
                });
                matched = true;
                break;
            }
        }
    }
}

console.log(`Found ${foundItems.length} light cone names from baseline in V8 text.`);

// Now extract data for each found item
for (let k = 0; k < foundItems.length; k++) {
    const item = foundItems[k];
    const nextItem = foundItems[k+1];
    const endIdx = nextItem ? nextItem.startIdx : lines.length;
    
    // Everything between startIdx and endIdx belongs to this light cone.
    const block = lines.slice(item.startIdx, endIdx);
    
    // Try to extract S1, S5, stats, and story
    let skillName = '';
    let hp = 0, atk = 0, def = 0;
    
    let storyIdx = -1;
    for(let j=0; j<block.length; j++){
        if (block[j].trim() === '스토리') {
            storyIdx = j;
            break;
        }
    }
    
    if (storyIdx === -1) storyIdx = block.length;
    
    const preStory = block.slice(0, storyIdx);
    const storyLines = block.slice(storyIdx + 1).filter(l => !l.includes('----------------------------------------------------------------'));
    
    // Extract stats
    let statIdx = preStory.findIndex(x => /^HP\s/.test(x.trim()));
    if(statIdx !== -1) {
        const hpLine = preStory[statIdx].trim();
        const atkLine = (preStory[statIdx+1]||'').trim();
        const defLine = (preStory[statIdx+2]||'').trim();
        
        if (hpLine.match(/HP\s*(?:\d+~)?(\d+)/)) hp = parseInt(hpLine.match(/HP\s*(?:\d+~)?(\d+)/)[1]);
        if (atkLine.match(/공격력\s*(?:\d+~)?(\d+)/)) atk = parseInt(atkLine.match(/공격력\s*(?:\d+~)?(\d+)/)[1]);
        if (defLine.match(/방어력\s*(?:\d+~)?(\d+)/)) def = parseInt(defLine.match(/방어력\s*(?:\d+~)?(\d+)/)[1]);
    } else {
        statIdx = preStory.length;
    }
    
    const texts = preStory.slice(0, statIdx).filter(l => l.trim() !== '');
    // texts should contain: name, skillName, s1, s5
    // But they could be backwards (skillName first)
    // The name is item.name. So we remove it.
    let cleanTexts = [];
    for(let t of texts) {
        if (t.trim() === item.name || t.trim() === item.name + " (무명의 공훈)") continue;
        cleanTexts.push(t.trim());
    }
    
    if (cleanTexts.length > 0) {
        skillName = cleanTexts[0]; // Assume first remaining is skillName
    }
    
    let s1 = '', s5 = '';
    if (cleanTexts.length >= 3) {
        s1 = cleanTexts[1];
        s5 = cleanTexts[cleanTexts.length - 1]; // Usually last one is S5
        // if skillname repeated
        if (s5.startsWith(skillName)) s5 = s5.replace(skillName, '').trim();
    }
    
    // Update baseline item
    const baseItem = baseline.find(x => x.name === item.name);
    if(baseItem) {
        baseItem.skillName = skillName || baseItem.skillName;
        // In previous session, they wanted verbatim s1, s5 including "\n" which we replaced with \\n in JS.
        // We can just construct a combined string for skillDesc with [1중첩], [5중첩] like we did before.
        if (s1 && s5) {
            baseItem.skillDesc = `[1중첩] ${s1}\\n[5중첩] ${s5}`;
        }
        if (hp) baseItem.stats = { hp, atk, def };
        if (storyLines.length) baseItem.story = storyLines.join('\\n').replace(/"/g, '\\"');
    }
}

// Dump all master to perfect 158
fs.writeFileSync('scratch/master_158_perfect_final_v3.json', JSON.stringify(baseline, null, 2), 'utf8');
console.log(`Merged V8 data into baseline. Output saved to master_158_perfect_final_v3.json`);
