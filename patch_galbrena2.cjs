const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'common-hub/locales/ww/ww_characters_ko.json');
let rawData = fs.readFileSync(filePath, 'utf8');

if (rawData.charCodeAt(0) === 0xFEFF) {
  rawData = rawData.slice(1);
}

let data = JSON.parse(rawData);

if (data["character.galbrena.skillInput.inputs.2"]) {
  data["character.galbrena.skillInput.inputs.2"] = data["character.galbrena.skillInput.inputs.2"].replace("{{KEY_SHIFT}}", "[left shift]");
}

fs.writeFileSync(filePath, '\uFEFF' + JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated ww_characters_ko.json');
