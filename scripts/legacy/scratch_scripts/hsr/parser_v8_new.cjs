const fs = require('fs');

const raw = fs.readFileSync('scratch/lc_raw_data_v8.txt', 'utf8');
const lines = raw.split('\n');

const result = [];
let i = 0;
while (i < lines.length) {
    if (!lines[i].trim()) { i++; continue; }
    if (lines[i].includes('----------------------------------------------------------------')) { i++; continue; }

    const item = {
        name: lines[i].trim(),
        skillName: '',
        s1: '',
        s5: '',
        hp: 0, atk: 0, def: 0,
        story: ''
    };
    i++;
    
    // next line is skill
    while (i < lines.length && !lines[i].trim()) i++;
    if (i < lines.length) {
        item.skillName = lines[i].trim();
        i++;
    }

    let inStory = false;
    let storyContent = [];
    let descContent = [];
    let foundStats = false;
    
    while(i < lines.length) {
        const line = lines[i].trim();

        if (line.includes('----------------------------------------------------------------')) {
            break;
        }

        // Detect if this is the start of a next light cone.
        // A new light cone usually starts with "Name" and next line "Skill Name" then S1 description.
        // If we are looking for "스토리", wait till we find it. 
        if (line === '스토리') {
            inStory = true;
            i++;
            continue;
        }

        if (inStory) {
            // How do we know story ended?
            // Next line might be the beginning of the next light cone!
            // But story paragraphs could be empty lines.
            // Let's rely on a heuristic: 
            // If we see a pattern "Name" (1 line), "Skill" (1 line), "Long description" or "HP" very soon.
            // Actually, we can just grep "스토리" for the next light cone. If we see "스토리" within next N lines without finding "HP", it's probably NOT a next light cone. BUT wait! The next light cone HAS HP and 스토리.
            // Let's use a safer check. If line length is short, and next non-empty line is short, and next line has "%" or "HP", it's a new item!
            // Let's look ahead 5 non-empty lines. If one of them has "HP ", it's a new item!
            let lookahead = i;
            let nonEmpties = [];
            while(lookahead < lines.length && nonEmpties.length < 15) {
                if (lines[lookahead].trim()) nonEmpties.push(lines[lookahead].trim());
                lookahead++;
            }
            if (line && !line.includes('HP ') && nonEmpties.some(x => x.match(/HP\s*(?:\d+~)?(\d+)/)) && !line.includes('스토리')) {
                // If it's a short line, could be name.
                // Is this really the next item? Let's check 
                if (line.length < 50 && line !== '이별' && line !== '서약' && line !== '불면') { // "이별" etc are skill names
                    // It might be the next item! Stop inStory loop.
                    // Wait, let's just make it simple: `lines[i]` is not part of story if it's the Name of the next item.
                    if (nonEmpties[0] === line && nonEmpties.some(x=>x.includes('HP '))) {
                        // Is this line an Name?
                        // Yes!
                        break;
                    }
                }
            }
            if (line || lines[i] === '') { // Keep empty lines
                storyContent.push(lines[i].trimEnd());
            }
            i++;
            continue;
        }

        if (line.match(/^HP\s*(?:\d+~)?(\d+)/)) {
            item.hp = parseInt(line.match(/^HP\s*(?:\d+~)?(\d+)/)[1]);
            foundStats = true;
            i++;
            continue;
        }
        if (line.match(/^공격력\s*(?:\d+~)?(\d+)/)) {
            item.atk = parseInt(line.match(/^공격력\s*(?:\d+~)?(\d+)/)[1]);
            foundStats = true;
            i++;
            continue;
        }
        if (line.match(/^방어력\s*(?:\d+~)?(\d+)/)) {
            item.def = parseInt(line.match(/^방어력\s*(?:\d+~)?(\d+)/)[1]);
            foundStats = true;
            i++;
            continue;
        }
        
        if (!foundStats && !inStory) {
            if (line) descContent.push(line);
        }

        i++;
    }

    // Clean up empty lines from story end
    while(storyContent.length && !storyContent[storyContent.length-1].trim()) storyContent.pop();

    item.story = storyContent.join('\n');
    
    // Process descContent
    // Usually it has Two blocks.
    const fullDesc = descContent.join('\n');
    const parts = fullDesc.split(/\n{2,}/);
    if (parts.length >= 2) {
        item.s1 = parts[0].replace(/\n/g, ' ').trim();
        item.s5 = parts[parts.length-1].replace(/\n/g, ' ').trim(); 
        // sometimes skill name is repeated in between, remove it from s5
        if (item.s5.startsWith(item.skillName)) item.s5 = item.s5.replace(item.skillName, '').trim();
    } else {
        item.s1 = parts[0];
    }
    
    // It's possible S1 and S5 are separated by skillname
    // Let's just do a rough extract
    const cleanDescLines = descContent.filter(x => x !== item.skillName);
    if (cleanDescLines.length >= 2) {
        item.s1 = cleanDescLines[0];
        item.s5 = cleanDescLines[cleanDescLines.length-1];
    } else if (cleanDescLines.length === 1) {
        item.s1 = cleanDescLines[0];
        item.s5 = cleanDescLines[0];
    }

    result.push(item);
}

console.log('Parsed:', result.length);
fs.writeFileSync('scratch/v8_parsed_new.json', JSON.stringify(result, null, 2), 'utf8');
