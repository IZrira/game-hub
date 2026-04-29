import fs from 'fs';

async function testGemma() {
  let config;
  try {
    const configData = fs.readFileSync('antigravity.config.json', 'utf8');
    config = JSON.parse(configData);
    console.log("Loaded configuration from antigravity.config.json");
  } catch (err) {
    console.error("Could not read antigravity.config.json. Using defaults.");
    config = {
      models: {
        local: {
          baseUrl: "http://127.0.0.1:11434/v1",
          model: "gemma4:e2b"
        }
      }
    };
  }

  const localConfig = config.models.local;
  // If baseUrl doesn't end with /v1, and we are using openai-compatible, we might need to append it.
  // But let's try exactly what is in the config first.
  let url = localConfig.baseUrl;
  if (!url.endsWith('/')) url += '/';
  
  // The user's config might have removed /v1. Let's try to detect if we need it.
  const endpoint = url.includes('/v1') ? 'chat/completions' : 'v1/chat/completions';
  const fullUrl = url + endpoint;

  console.log(`Testing connection to: ${fullUrl}`);
  console.log(`Using model: ${localConfig.model}`);

  try {
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localConfig.apiKey || 'ollama'}`
      },
      body: JSON.stringify({
        model: localConfig.model,
        messages: [{ role: 'user', content: '통신 테스트 성공인가요? 한글로 짧게 대답해 주세요.' }],
        temperature: localConfig.temperature || 0.1
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const result = data.choices[0].message.content;
    
    console.log("\n--- Gemma 4 응답 ---");
    console.log(result);
    console.log("--------------------\n");
    console.log("✅ 통신 테스트 완료!");
  } catch (err) {
    console.error("❌ 통신 테스트 실패:", err.message);
    
    // Retry with /v1 if the previous one didn't have it
    if (!url.includes('/v1')) {
      console.log("Retrying with /v1 suffix...");
      const retryUrl = url + 'v1/chat/completions';
      try {
        const response = await fetch(retryUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: localConfig.model,
            messages: [{ role: 'user', content: 'Retry: 통신 테스트 성공인가요?' }]
          })
        });
        if (response.ok) {
          console.log("✅ Connection successful with /v1 suffix added automatically.");
          return;
        }
      } catch (e) {}
    }
  }
}

testGemma();
