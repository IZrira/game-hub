const fs = require('fs');

const pristine = JSON.parse(fs.readFileSync('scratch/master_pristine_eval.json', 'utf8'));
const raw = fs.readFileSync('scratch/lc_raw_data_v8.txt', 'utf8');
const lines = raw.split('\n').map(l => l.trimRight()); // retain trailing spaces? No, let's just use trimRight

let v8Matched = 0;

pristine.forEach(item => {
    let searchName1 = item.folderName;
    let searchName2 = item.folderName + " (무명의 공훈)";
    
    // Find index in V8
    let startIdx = -1;
    let isMuMyeong = false;
    for(let i=0; i<lines.length; i++) {
        if(lines[i].trim() === searchName1) { startIdx = i; break; }
        if(lines[i].trim() === searchName2) { startIdx = i; isMuMyeong = true; break; }
    }
    
    if (startIdx !== -1) {
        v8Matched++;
        
        let i = startIdx + 1;
        while(i < lines.length && !lines[i].trim()) i++;
        if (i < lines.length) {
            item.skill.name = lines[i].trim();
            i++;
        }
        
        let descLines = [];
        let statsMatched = false;
        let hp=0, atk=0, def=0;
        let storyLines = [];
        let inStory = false;
        
        while(i < lines.length) {
            const line = lines[i].trim();
            if (line.includes('----------------------------------------------------------------')) break;
            
            if (!inStory && line === '스토리') {
                inStory = true;
                i++;
                continue;
            }
            
            if (inStory) {
                // Determine if next light cone starts
                // We peek ahead. If line matches ANY pristine folderName, it's definitely the next item.
                let isNextItem = false;
                if (line) {
                    for(let pm of pristine) {
                        if (line === pm.folderName || line === pm.folderName + " (무명의 공훈)") {
                            isNextItem = true; break;
                        }
                    }
                }
                if (isNextItem) {
                    break;
                }
                if (lines[i] || storyLines.length > 0) { // Keep empty lines but avoid leading empty lines
                    storyLines.push(lines[i].trimEnd());
                }
            } else {
                if (line.match(/^HP\s*(?:\d+~)?(\d+)/)) { hp = parseInt(line.match(/^HP\s*(?:\d+~)?(\d+)/)[1]); statsMatched = true; i++; continue; }
                if (line.match(/^공격력\s*(?:\d+~)?(\d+)/)) { atk = parseInt(line.match(/^공격력\s*(?:\d+~)?(\d+)/)[1]); statsMatched = true; i++; continue; }
                if (line.match(/^방어력\s*(?:\d+~)?(\d+)/)) { def = parseInt(line.match(/^방어력\s*(?:\d+~)?(\d+)/)[1]); statsMatched = true; i++; continue; }
                
                if (!statsMatched && line) {
                    descLines.push(line);
                }
            }
            i++;
        }
        
        // Trim trailing empty story lines
        while(storyLines.length && !storyLines[storyLines.length-1].trim()) storyLines.pop();
        
        item.story = storyLines.join('\\n').replace(/"/g, '\\"');
        
        // Parse descLines
        // S1 and S5 separated by skill name possibly, or just two blocks
        let cleanDesc = descLines.filter(x => x !== item.skill.name);
        if (cleanDesc.length >= 2) {
            const s1 = cleanDesc[0].replace(/"/g, '\\"');
            const s5 = cleanDesc[cleanDesc.length-1].replace(/"/g, '\\"');
            item.skill.description = `[1중첩] ${s1}\\n[5중첩] ${s5}`;
        } else if (cleanDesc.length === 1) {
            const s = cleanDesc[0].replace(/"/g, '\\"');
            item.skill.description = `[1중첩] ${s}\\n[5중첩] ${s}`;
        }
        
        if (hp) {
            item.baseStats = { hp, atk, def }; // Actually `createLv80Stats` is mocked, so we just recreate it when writing TS
        }
        
        if (isMuMyeong) {
            item.source = "무명의 공훈";
        }
    }
});

console.log(`Matched and updated ${v8Matched} items from V8 list.`);

fs.writeFileSync('scratch/master_pristine_updated.json', JSON.stringify(pristine, null, 2), 'utf8');

