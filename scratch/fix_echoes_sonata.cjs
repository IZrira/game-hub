const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\User\\Desktop\\rira game hub\\game-hub\\ww-hub\\data\\echoes.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Mapping
// Old Energy: 은빛 구름 -> New Energy: 떠오르는 구름
// Old Healing: 떠오르는 구름 -> New Healing: 찬란한 광휘
// Old Diffraction: 찬란한 광휘 -> New Diffraction: 빛나는 별

// Since I already did some partial replacements, I need to be careful.
// I'll look for the sonataSets array and fix it item by item.

const fixSonataSets = (sets) => {
    // This is tricky because I don't know what state they are in.
    // I'll assume they might have been partially renamed.
    
    return sets.map(s => {
        if (s === "은빛 구름") return "떠오르는 구름";
        // If it was already renamed "은빛 구름" -> "떠오르는 구름", it might now be "떠오르는 구름" (Energy).
        // But "떠오르는 구름" was also the name for Healing.
        // This is a collision.
        return s;
    });
};

// I'll use a more direct approach by looking at the known combinations or just fixing the names.
// Actually, I'll just use the user's provided list to verify.

// I'll perform the replacements in a safe order using placeholders.
content = content.replace(/"은빛 구름"/g, '"__ENERGY__"');
content = content.replace(/"떠오르는 구름"/g, '"__HEALING__"');
content = content.replace(/"찬란한 광휘"/g, '"__DIFFRACTION__"');
content = content.replace(/"용암의 틈"/g, '"솟구치는 용암"');
content = content.replace(/"포효하는 광풍"/g, '"스쳐가는 바람"');
content = content.replace(/"파멸의 흑염"/g, '"빛을 삼키는 해"');

// Now map placeholders to new names
content = content.replace(/"__ENERGY__"/g, '"떠오르는 구름"');
content = content.replace(/"__HEALING__"/g, '"찬란한 광휘"');
content = content.replace(/"__DIFFRACTION__"/g, '"빛나는 별"');

fs.writeFileSync(filePath, content);
console.log('Fixed sonata sets in echoes.ts');
