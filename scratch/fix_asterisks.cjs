const fs = require('fs');
let data = JSON.parse(fs.readFileSync('./common-hub/data/notion-data.json', 'utf8'));

const fixAsterisks = (text) => {
    if (!text) return text;
    text = text.replace(/\*\*(Lv\. \d+)\s*\*\*/g, '$1 ');
    text = text.replace(/(Lv\. \d+)\s*\*\*/g, '$1 ');
    text = text.replace(/\*\*(Lv\. \d+)/g, '$1');
    text = text.replace(/^\*\*/, '');
    return text;
};

data = data.map(char => {
    if (char.gameId === 'nte') {
        const fields = ['citySkill', 'virailSkill', 'ultimateSkill', 'supportSkill', 'passiveSkill1', 'passiveSkill2', 'awakenings', 'resonance', 'basicAttack'];
        fields.forEach(f => {
            if (char[f]) {
                char[f] = fixAsterisks(char[f]);
            }
        });
    }
    return char;
});

fs.writeFileSync('./common-hub/data/notion-data.json', JSON.stringify(data, null, 2));
console.log('Fixed asterisks in notion-data.json');
