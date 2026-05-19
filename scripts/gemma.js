import fs from 'fs';

async function runLocalGemma() {
  const prompt = process.argv.slice(2).join(' ');
  if (!prompt) {
    console.log("\n[Gemma 4] 사용법: local \"질문 내용\"");
    process.exit(0);
  }

  try {
    const configPath = 'antigravity.config.json';
    let config = { models: { local: { baseUrl: "http://127.0.0.1:11434/v1", model: "gemma4:e2b" } } };

    if (fs.existsSync(configPath)) {
      config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }

    const { baseUrl, model, apiKey } = config.models.local;
    let url = baseUrl;
    if (!url.endsWith('/')) url += '/';
    
    // Ensure the endpoint is correct
    const fullUrl = url.includes('/v1') ? `${url}chat/completions` : `${url}v1/chat/completions`;

    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey || 'ollama'}`
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const result = data.choices[0].message.content;
    
    process.stdout.write(result + '\n');
  } catch (err) {
    console.error('\n❌ 로컬 모델 연결 실패:', err.message);
    console.log('Ollama가 실행 중인지 확인해 주세요. (기본 포트: 11434)');
    process.exit(1);
  }
}

runLocalGemma();
