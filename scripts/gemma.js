import fs from 'fs';

const prompt = process.argv.slice(2).join(' ');
if (!prompt) {
  console.error("No prompt provided.");
  process.exit(1);
}

try {
  const config = JSON.parse(fs.readFileSync('antigravity.config.json', 'utf8'));
  const { baseUrl, model } = config.models.local;

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: model,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
  process.stdout.write(data.choices[0].message.content);
} catch (err) {
  console.error('Error connecting to local model:', err.message);
  process.exit(1);
}
