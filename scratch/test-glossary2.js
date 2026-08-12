const char = {
  glossary: "섭식 모드\n사키리가 키로마루 위에 올라타 지속적으로 이동이 가능하며, 그동안 약한 적은 앞으로 끌려와 삼켜진다. 삼킬 때마다 소화 시간이 있다"
};

const specialTerms = {};
if (char.glossary) {
  const blocks = char.glossary.split('\n\n');
  blocks.forEach((b) => {
    const lines = b.split('\n');
    if (lines.length >= 2) {
      const key = lines[0].replace(/\*\*/g, '').trim();
      const desc = lines.slice(1).join('\n').trim();
      specialTerms[key] = desc;
    }
  });
}
console.log("specialTerms:", Object.keys(specialTerms));

const protectedTerms = ["Mar. 7th", "Mar. 7th (수렵)"]; 
const sortedKeys = [...Object.keys(specialTerms), ...protectedTerms].sort((a, b) => b.length - a.length);

const nteElementKeywords = '주속성 이능력|지속|이능력|물리|화염|얼음|번개|바람|양자|허수|기류|전도|회절|응결|인동|열용|어둠|빛|독';
const combinedRegex = new RegExp(`({icon:[^}]+}|\\*\\*[^*]+\\*\\*|==[^=]+==|${sortedKeys.map(k => k.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')).join('|')}|(?:(?:${nteElementKeywords})\\s*)?피해(?!\\s*보너스)|[+-]?\\d+(?:\\.\\d+)?%?)`, 'g');

const text = "길게 누르면 키로마루가 ==「섭식 모드」==에 들어가고, 사키리가 키로마루 위에 올라탄다.";
const parts = text.split(combinedRegex);
console.log("parts:", parts);

parts.forEach((part, i) => {
  if (!part) return;
  if (part.startsWith('==') && part.endsWith('==')) {
    const innerText = part.slice(2, -2);
    const cleanText = innerText.replace(/^[「『\[<]+|[」』\]>]+$/g, '');
    console.log(`Matched highlight: part='${part}', cleanText='${cleanText}', tooltip='${specialTerms[cleanText]}'`);
  } else if (specialTerms[part]) {
    console.log(`Matched specialTerm: part='${part}', tooltip='${specialTerms[part]}'`);
  }
});
