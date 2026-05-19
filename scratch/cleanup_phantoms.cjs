const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'ww-hub', 'data', 'echoes.ts');
let content = fs.readFileSync(filePath, 'utf8');

// 1. 모든 '이상 ·' 에코 이름 추출
const phantomRegex = /name:\s*"이상 · ([^"]+)"/g;
const phantoms = [];
let match;
while ((match = phantomRegex.exec(content)) !== null) {
  phantoms.push(match[1]);
}

console.log(`Found phantoms: ${phantoms.join(', ')}`);

// 2. 원본 에코에 hasPhantom: true 추가
phantoms.forEach(name => {
  // name: "이름" 을 찾아서 뒤에 hasPhantom: true 추가
  // 이미 추가되어 있는지 확인
  const originalRegex = new RegExp(`name:\\s*"${name}"`, 'g');
  if (originalRegex.test(content)) {
    // 해당 객체 내에 hasPhantom이 없는 경우에만 추가
    // 간단하게 name: "이름" 다음에 추가 (콤마 뒤에)
    content = content.replace(originalRegex, `name: "${name}", hasPhantom: true`);
  }
});

// 3. 이상 에코 항목 삭제
// { ... name: "이상 · ..." ... } 형태의 블록 삭제
// 이 작업은 정규식으로 처리하기 까다로우므로 (중첩 괄호 등), 
// 간단한 패턴 매칭으로 블록을 찾아서 지웁니다.
// 여기서는 각 항목이 { id: ..., name: "이상 · ...", ... } 형태임을 이용합니다.

const lines = content.split('\n');
const newLines = [];
let skipBlock = false;
let braceCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (!skipBlock) {
    if (line.includes('name: "이상 ·')) {
      // 이 줄이 포함된 블록을 찾아야 함.
      // 보통 이전 줄이 { 이거나 현재 줄에 { 가 있음.
      // 만약 이전 줄이 { 였다면 이미 newLines에 들어가 있음.
      
      // 뒤로 가서 { 가 시작된 위치부터 skipBlock 시작
      let j = newLines.length - 1;
      while (j >= 0 && !newLines[j].includes('{')) {
        j--;
      }
      if (j >= 0) {
        newLines.splice(j); // { 가 있는 줄부터 삭제
        skipBlock = true;
        braceCount = 1; // 이미 { 하나 찾음
      }
    } else {
      newLines.push(line);
    }
  } else {
    // skipBlock 중일 때는 중괄호 개수를 맞춰서 블록이 끝날 때까지 스킵
    braceCount += (line.match(/{/g) || []).length;
    braceCount -= (line.match(/}/g) || []).length;
    if (braceCount <= 0) {
      skipBlock = false;
      // 블록 끝난 뒤 쉼표나 빈 줄 처리
      if (i + 1 < lines.length && lines[i+1].trim() === ',') {
        i++;
      }
    }
  }
}

fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
console.log('Cleanup complete!');
