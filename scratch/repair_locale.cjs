const fs = require('fs');
const path = require('path');

const filePath = 'c:/Users/User/Desktop/rira game hub/game-hub/common-hub/locales/ww/ww_characters_ko.json';
const outPath = 'c:/Users/User/Desktop/rira game hub/game-hub/scratch/ww_characters_ko_fixed.json';

try {
    const data = fs.readFileSync(filePath);
    // Try to detect encoding or just read as buffer
    fs.writeFileSync(outPath, data);
    console.log('File copied to scratch directory.');
} catch (err) {
    console.error(err);
}
