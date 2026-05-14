const fs = require('fs');
const path = 'c:\\Users\\User\\Desktop\\rira game hub\\game-hub\\common-hub\\locales\\ww\\ww_characters_ko.json';

const data = JSON.parse(fs.readFileSync(path, 'utf8'));

data["character.xiangli_yao.skillInput.overview"] = "[공명 회로 게이지.webp]\n\n개요\n\n상리요는 「연산력」을 축적하여 ==강공격 · 만물의 근원==을 발동해 피해를 입힐 수 있다.\n==공명 해방 · 생과 사의 한 수== 발동 시 [초기화] 상태에 진입하며, 공명 스킬이 ==공명 스킬 · 규칙 위반==으로 대체된다.\n[초기화] 상태에서 공명 스킬 사용 혹은 기본 공격 적중 시 「데이터」를 축적하며, 「데이터」가 가득 찰 시 공명 스킬이 ==공명 스킬 · 규칙 해독==으로 대체되어 강력한 피해를 입힌다.";
data["character.xiangli_yao.skillInput.inputs.0"] = "· 기본 공격/공명 스킬: [초기화] 상태에서 「데이터」 축적";
data["character.xiangli_yao.skillInput.inputs.1"] = "· 「데이터」가 가득 찰 시: [key e.webp]를 눌러 ==공명 스킬 · 규칙 해독== 발동";
data["character.xiangli_yao.skillInput.inputs.2"] = "· 「연산력」이 가득 찰 시: [mouse left.webp] 길게 눌러 ==강공격 · 만물의 근원== 발동";

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated ww_characters_ko.json');
