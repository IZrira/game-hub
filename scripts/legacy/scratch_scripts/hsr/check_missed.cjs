const fs = require('fs');
const pristine = JSON.parse(fs.readFileSync('scratch/master_pristine_updated.json', 'utf8'));
const raw = fs.readFileSync('scratch/lc_raw_data_v8.txt', 'utf8');

const lines = raw.split('\n').map(l => l.trimRight());

// Count which V8 Names didn't match pristine
const matchedNames = new Set(pristine.map(i => i.folderName));

// A dirty way to find all Light Cone names in V8.
// We know V8 names usually are followed by skillname and have HP blocks.
// Actually, earlier I found 80 items by counting HP blocks.
const missedNames = [];

for(let i=0; i<lines.length - 20; i++) {
   const line = lines[i].trim();
   if (line && !line.includes('HP') && !line.includes('----------------') && !line.includes('스토리')) {
       // Peek ahead to see if it's an item
       let hasHP = false;
       for(let k=i+1; k<i+15; k++) {
          if (lines[k] && lines[k].match(/^HP\s*(?:\d+~)?\d+/)) {
              hasHP = true; break;
          }
       }
       if (hasHP) {
           // Line might be Name or SkillName
           // If the previous non-empty line was 스토리 (or it's start of file), then this is Name!
           let prevEmpty = true;
           for(let j=i-1; j>=0; j--) {
               if (lines[j].trim() === '스토리') { prevEmpty = true; break; }
               if (lines[j].includes('----------------')) { prevEmpty = true; break; }
               if (lines[j].trim() !== '') { prevEmpty = false; break; }
           }
           if (prevEmpty) {
               let nameStr = line;
               if (nameStr.includes('(무명의 공훈)')) nameStr = nameStr.replace(' (무명의 공훈)', '');
               if (!matchedNames.has(nameStr)) {
                   missedNames.push(nameStr);
               }
           }
       }
   }
}

console.log('Missed items in V8:', missedNames);
