const fs = require('fs');
const path = 'c:/Users/User/Desktop/rira game hub/game-hub/common-hub/locales/ww/ww_characters_ko.json';

try {
    let content = fs.readFileSync(path, 'utf8');
    // Try to find the corruption point.
    // It seems I injected "character.xiangli_yao.name" into the middle of "chisa"
    const badStart = content.indexOf('"character.xiangli_yao.name"');
    if (badStart !== -1) {
        console.log('Found corruption at index:', badStart);
        // The block I injected ends with the closing brace I added.
        // But I need to know what I deleted.
    } else {
        console.log('Corruption not found with simple search. Trying alternative encoding...');
        content = fs.readFileSync(path, 'utf16le');
        if (content.includes('character.xiangli_yao.name')) {
            console.log('Found in UTF-16LE');
        }
    }
} catch (e) {
    console.error(e);
}
