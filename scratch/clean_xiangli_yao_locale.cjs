const fs = require('fs');
const path = 'common-hub/locales/ww/ww_characters_ko.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const id = 'xiangli_yao';

// Remove "**조작 입력**\n\n" if it exists
if (data[`character.${id}.skillInput.inputs.1`]) {
  data[`character.${id}.skillInput.inputs.1`] = data[`character.${id}.skillInput.inputs.1`]
    .replace('**조작 입력**\n\n', '')
    .trim();
}

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully removed redundant title from Xiangli Yao locale');
