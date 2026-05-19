const fs = require('fs');

const raw = fs.readFileSync('c:/Users/User/Desktop/rira game hub/game-hub/scratch/lc_raw_data_v8.txt', 'utf8');

// The new format seems to use ---------------------------------------------------------------- to separate some things?
// Let's print out all lines that match 'HP ', '공격력 ' to count them.
const hpLines = raw.split('\n').filter(l => /HP\s*(?:\d+~)?(\d+)/.test(l));
console.log(`Found ${hpLines.length} HP lines, which implies ${hpLines.length} light cones.`);

const nameMatch = raw.split('\n').filter(l => l.trim() === '스토리');
console.log(`Found ${nameMatch.length} '스토리' lines.`);

