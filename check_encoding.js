
import fs from 'fs';

const jsonPath = 'hsr-hub/data/characters.json';
const tsPath = 'hsr-hub/data/tiers.ts';

const jsonContent = fs.readFileSync(jsonPath, 'utf8');
const tsContent = fs.readFileSync(tsPath, 'utf8');

const jsonMatch = jsonContent.match(/"name":\s*"애쉬베일"/);
const tsMatch = tsContent.match(/"name":\s*"애쉬베일"/);

if (jsonMatch) {
    const str = jsonMatch[0];
    console.log('JSON "애쉬베일" bytes:', Buffer.from(str).toString('hex'));
} else {
    console.log('JSON "애쉬베일" not found');
}

if (tsMatch) {
    const str = tsMatch[0];
    console.log('TS "애쉬베일" bytes:', Buffer.from(str).toString('hex'));
} else {
    console.log('TS "애쉬베일" not found');
}
