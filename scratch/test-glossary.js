const char = {
  glossary: `섭식 모드\n사키리가 키로마루 위에 올라타 지속적으로 이동이 가능하며, 그동안 약한 적은 앞으로 끌려와 삼켜진다. 삼킬 때마다 소화 시간이 있다`
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
console.log("specialTerms:", specialTerms);

const part = "==「섭식 모드」==";
if (part.startsWith('==') && part.endsWith('==')) {
  const innerText = part.slice(2, -2);
  const cleanText = innerText.replace(/^[「『\[<]+|[」』\]>]+$/g, '');
  console.log("innerText:", innerText);
  console.log("cleanText:", cleanText);
  console.log("is found:", !!specialTerms[cleanText]);
}
