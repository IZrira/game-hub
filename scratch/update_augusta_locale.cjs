const fs = require('fs');
const path = 'common-hub/locales/ww/ww_characters_ko.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

data['character.augusta.skillInput.overview'] = `개요

아우구스타는 「전세」를 축적하여 ==파생 강공격==을 발동할 수 있고, 「찬란한 권력」을 축적하여 ==파생 공명 스킬==을 발동할 수 있다

==고유 스킬 · 타오르는 결의==, ==반주 스킬 · 불굴의 군가== 및 ==공명 스킬 · 영원한 불패의 태양 · 습격== 발동을 통해 「위협」을 획득할 수 있다

2스택의 「위협」 보유 시, 아우구스타는 ==공명 해방 · 뜨거운 태양의 강림==을 발동하고 7초 동안 지속되는 ==머리를 숙이는 순간==에 진입하며, 마지막에 ==공명 해방 · 뜨거운 태양의 강림 · 불멸자의 보우==를 발동할 수 있다`;

data['character.augusta.skillInput.inputs.0'] = `스킬 입력 가이드

[공명 회로 게이지.webp]`;

data['character.augusta.skillInput.inputs.1'] = `**조작 입력**

· 「전세」가 가득 찰 시:

· [mouse left] 길게 눌러 ==강공격 · 섬뢰 · 후퇴==를 발동하고, 일정 시간 후 [mouse left] 떼거나 혹은 다시 [mouse left] 짧게 누르면 강공격 · 섬뢰 · 회전 베기를 발동한다.

· 점프를 짧게 누르면 ==강공격 · 섬뢰 · 올려치기==를 발동한다.

· ==강공격 · 철의 울림== 발동 시, 일정 시간 후 [mouse left] 떼거나 혹은 다시 [mouse left] 짧게 누르거나 점프를 짧게 누르면, ==강공격 · 섬뢰 · 올려치기==를 발동한다.

· ==공명 스킬 · 검날 발동== 시 [key e] 혹은 점프를 짧게 누르면 ==강공격 · 섬뢰 · 올려치기==를 발동한다`;

data['character.augusta.skillInput.inputs.2'] = `· 「찬란한 권력」이 가득 찰 시:

[key e] 짧게 누르기+[key e] / [mouse left] 짧게 누르기+[key e] / [mouse left] 짧게 누르기

· ==공명 스킬 · 영원한 불패의 태양 · 신속 공격==, ==공명 스킬 · 영원한 불패의 태양 · 공중 도약== 및 ==공명 스킬 · 영원한 불패의 태양 · 습격==을 순차적으로 발동할 수 있다`;

data['character.augusta.skillInput.inputs.3'] = `· 「위협」이 가득 찰 시:

[key r] 길게 누르기

· ==공명 해방 · 뜨거운 태양의 강림==을 발동할 수 있다`;

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated ww_characters_ko.json');
