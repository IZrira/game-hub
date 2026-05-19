const fs = require('fs');

const raw = fs.readFileSync('scratch/lc_raw_data_v8.txt', 'utf8');

// The file format has blocks. The separator between light cones isn't reliable, 
// BUT we know every light cone has "스토리" followed by some text, and then the next light cone starts.
// Let's split by searching for "HP " backward from "스토리" or something.

const items = [];
const lines = raw.split('\n');

let currentItem = { rawLines: [] };

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.includes('----------------------------------------------------------------')) continue;
    
    // Determine boundary
    // A boundary is when we were in story and we see a short string that is NOT story text but a title,
    // followed by a short string, followed by a description.
    // Actually, V8 has exactly 80 items. Let's just group them by the presence of "HP " or "스토리".
}

// Let's try grouping from bottom up or top down
const blocks = raw.split(/HP\s*(?:\d+~)?\d+/);
// If there are 80 HP matches, there are 81 blocks.
// Wait, no.

function parseV8() {
    let rawText = fs.readFileSync('scratch/lc_raw_data_v8.txt', 'utf8');
    // Remove separators
    rawText = rawText.replace(/----------------------------------------------------------------/g, '');
    
    // We can find all "스토리" occurrences.
    // But what if story contains the word "스토리"? It usually is exactly "스토리".
    const lines = rawText.split('\n');
    let storyIndices = [];
    for(let i=0; i<lines.length; i++) {
        if(lines[i].trim() === '스토리') {
            storyIndices.push(i);
        }
    }
    
    const parsed = [];
    let startIdx = 0;
    
    for (let k = 0; k < storyIndices.length; k++) {
        const storyIdx = storyIndices[k];
        const nextStartIdx = storyIndices[k+1]; // for the last one, it's undefined
        
        let endIdx = lines.length;
        if (nextStartIdx) {
            // Check backwards from nextStartIdx to find HP. 
            // The boundary between current story and next item's name is somewhere between storyIdx and nextStartIdx.
            // Next item has "HP" lines before nextStartIdx.
            // Let's find the HP line for the next item.
            let nextHpIdx = -1;
            for(let j=storyIdx+1; j<nextStartIdx; j++) {
                if (/^HP\s*\d+/.test(lines[j].trim())) {
                    nextHpIdx = j;
                    break;
                }
            }
            
            if (nextHpIdx !== -1) {
                // The name/skill of the next item is before nextHpIdx.
                // Usually it's the first non-empty lines after story end.
                // Actually, story paragraphs end when there are empty lines, but let's just find the first non-empty line before HP.
                // It's much easier: Name is the first non-empty line of the block!
                // So end of current block is right before the Name of the next item.
                // Name of next item is the first non-empty line going backwards from nextHpIdx until we hit the empty line that separates story from Name?
                // No, just go backwards from nextHpIdx. We expect: S5 (multi-line), S1 (multi-line), SkillName (1 line), Name (1 line).
                let ptr = nextHpIdx - 1;
                let nonEmpties = [];
                while(ptr > storyIdx) {
                    if (lines[ptr].trim()) {
                        nonEmpties.unshift({idx: ptr, text: lines[ptr].trim()});
                    }
                    ptr--;
                }
                
                // Usually Name, SkillName, S1, S5 are present. S1/S5 could be multiple lines.
                // Let's say the boundary is at nonEmpties[0].idx.
                // That means current story ends before nonEmpties[0].idx.
                if (nonEmpties.length > 0) {
                    endIdx = nonEmpties[0].idx;
                } else {
                    endIdx = nextStartIdx; // Fallback
                }
            }
        }
        
        // Now parse block from startIdx to endIdx
        const blockLines = lines.slice(startIdx, endIdx);
        const item = extract(blockLines, storyIdx - startIdx);
        parsed.push(item);
        
        startIdx = endIdx;
    }
    
    return parsed;
}

function extract(block, storyRelativeIdx) {
    const item = {name:'', skillName:'', s1:'', s5:'', hp:0, atk:0, def:0, story:''};
    const nonEmpties = [];
    for(let i=0; i<storyRelativeIdx; i++) {
        if(block[i].trim()) nonEmpties.push(block[i].trim());
    }
    
    // Non-empties contains: Name, Skill, S1, S5, HP, Atk, Def
    // Find stats
    let statIdx = nonEmpties.findIndex(x => /^HP\s/.test(x));
    if (statIdx !== -1) {
        const hpLine = nonEmpties[statIdx];
        const atkLine = nonEmpties[statIdx+1] || '';
        const defLine = nonEmpties[statIdx+2] || '';
        if (hpLine.match(/HP\s*(?:\d+~)?(\d+)/)) item.hp = parseInt(hpLine.match(/HP\s*(?:\d+~)?(\d+)/)[1]);
        if (atkLine.match(/공격력\s*(?:\d+~)?(\d+)/)) item.atk = parseInt(atkLine.match(/공격력\s*(?:\d+~)?(\d+)/)[1]);
        if (defLine.match(/방어력\s*(?:\d+~)?(\d+)/)) item.def = parseInt(defLine.match(/방어력\s*(?:\d+~)?(\d+)/)[1]);
        
        nonEmpties.splice(statIdx, 3); // Remove stats
    }
    
    if (nonEmpties.length >= 4) {
        // Here order can be:
        // Name, Skill, S1, S5
        // Or Skill, Name, S1, S5?
        // Let's assume Name and Skill are the first two short strings.
        item.name = nonEmpties[0];
        item.skillName = nonEmpties[1];
        
        // Find split between S1 and S5.
        // S1 is from index 2 to somewhere.
        // Usually there are 2 descriptions. Which one is S5?
        // They are separated by skillname in V8 sometimes.
        let descLines = nonEmpties.slice(2);
        
        // Let's rely on string matching "장착한 캐릭터의"
        item.s1 = descLines.slice(0, Math.ceil(descLines.length/2)).join('\n');
        item.s5 = descLines.slice(Math.ceil(descLines.length/2)).join('\n');
        
        // If s1 and s5 are identically split, let's fix
        if (descLines.length === 2) {
            item.s1 = descLines[0];
            item.s5 = descLines[1];
        } else if (descLines.length === 3 && descLines[1] === item.skillName) {
            item.s1 = descLines[0];
            item.s5 = descLines[2];
        } else if (descLines.length === 3 && descLines[1] === item.name) {
            item.s1 = descLines[0];
            item.s5 = descLines[2];
        }
    } else {
        item.name = nonEmpties[0] || 'Unknown';
        item.skillName = nonEmpties[1] || '';
    }
    
    const storyLines = block.slice(storyRelativeIdx+1).filter(l => l.trim() !== '');
    item.story = storyLines.join('\n');
    return item;
}

const parsed = parseV8();
console.log('Parsed items:', parsed.length);
fs.writeFileSync('scratch/master_v8_only.json', JSON.stringify(parsed, null, 2), 'utf8');
