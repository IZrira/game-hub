import fs from 'fs';
import path from 'path';

async function runAnalysis() {
  console.log("Reading plan.md, research.md, completed_tasks.md...");
  
  const files = ['plan.md', 'research.md', 'completed_tasks.md'];
  let context = '';
  
  for (const file of files) {
    if (fs.existsSync(file)) {
      context += `\n--- [FILE: ${file}] ---\n`;
      context += fs.readFileSync(file, 'utf8');
      context += `\n-----------------------\n`;
    } else {
      console.log(`Warning: ${file} not found.`);
    }
  }

  const prompt = `다음은 'rira game hub'라는 게임 공략 사이트의 개발 문서들입니다. 이 문서들의 세부 사항을 분석하고, 이 사이트를 구성하는 대규모 데이터와 컴포넌트들이 어떻게 유기적으로 동작하는지(동작 원리, 아키텍처, 렌더링 방식 등)를 파악해서 정리해 주세요.\n\n${context}`;

  console.log("Sending prompt to local gemma 4 e2b...");

  try {
    const response = await fetch('http://localhost:11434/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gemma4:e2b',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2
      })
    });

    const data = await response.json();
    const result = data.choices[0].message.content;
    
    fs.writeFileSync('site_principles_analysis.md', result);
    console.log("✅ Analysis saved to site_principles_analysis.md");
  } catch (err) {
    console.error("❌ Error fetching from local model:", err.message);
  }
}

runAnalysis();
