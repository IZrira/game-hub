const fs = require('fs');

const raw = fs.readFileSync('scratch/lc_raw_data_v8.txt', 'utf8');
const blocks = raw.split(/\n\n\n+/);

const result = [];

blocks.forEach((block, idx) => {
    const lines = block.split('\n').map(l => l.trimEnd());
    if (lines.length < 3) return;

    const item = {
        name: lines[0].trim(),
        skillName: lines[1].trim(),
        s1: "",
        s5: "",
        hp: 0, atk: 0, def: 0,
        story: ""
    };

    let stage = 'desc'; // desc, stats, story
    let storyContent = [];

    // Simple heuristic: Line after name/skill is S1. 
    // Then an empty line, then S5.
    // Let's refine based on content patterns.
    
    let descLines = [];
    let foundStats = false;
    let inStory = false;

    for (let i = 2; i < lines.length; i++) {
        const line = lines[i];
        
        if (line.trim() === '스토리') {
            inStory = true;
            continue;
        }

        if (inStory) {
            storyContent.push(line);
            continue;
        }

        if (line.includes('HP ') || line.includes('공격력 ') || line.includes('방어력 ')) {
            foundStats = true;
            const hpMatch = line.match(/HP\s*(?:\d+~)?(\d+)/);
            if (hpMatch) item.hp = parseInt(hpMatch[1]);
            const atkMatch = line.match(/공격력\s*(?:\d+~)?(\d+)/);
            if (atkMatch) item.atk = parseInt(atkMatch[1]);
            const defMatch = line.match(/방어력\s*(?:\d+~)?(\d+)/);
            if (defMatch) item.def = parseInt(defMatch[1]);
            continue;
        }

        if (!foundStats && !inStory) {
            descLines.push(line);
        }
    }

    // Process descLines into S1 and S5
    // Typical pattern: S1_text, empty_line, S5_text
    // Sometimes skill name is repeated at start of S5.
    
    const descText = descLines.join('\n').trim();
    const parts = descText.split(/\n\s*\n/);
    
    if (parts.length >= 2) {
        item.s1 = parts[0].trim();
        item.s5 = parts[1].trim();
    } else {
        item.s1 = parts[0] || "";
    }

    item.story = storyContent.join('\n').trim();

    result.push(item);
});

console.log(`Parsed ${result.size ?? result.length} items from v8.`);
fs.writeFileSync('scratch/v8_verbatim_parsed.json', JSON.stringify(result, null, 2), 'utf8');
