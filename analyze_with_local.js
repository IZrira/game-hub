import fs from 'fs';
import path from 'path';

const dirsToScan = ['common-hub', 'hsr-hub', 'ww-hub'];
const fileExtensions = ['.ts', '.tsx', '.json', '.html', '.css'];

function getFiles(dir, filesList = []) {
  if (!fs.existsSync(dir)) return filesList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, filesList);
    } else {
      if (fileExtensions.includes(path.extname(fullPath))) {
        filesList.push(fullPath);
      }
    }
  }
  return filesList;
}

async function runAnalysis() {
  console.log(" Gathering files...");
  let allFiles = [];
  for (const dir of dirsToScan) {
    allFiles = getFiles(dir, allFiles);
  }
  
  // Also add some root files
  const rootFiles = ['package.json', 'index.html', 'vite.config.ts', 'tsconfig.json'];
  for (const file of rootFiles) {
    if (fs.existsSync(file)) allFiles.push(file);
  }

  let codeContext = "";
  for (const file of allFiles) {
    // skip heavily large files like lock files or huge json
    if (file.includes('package-lock')) continue;
    try {
      const content = fs.readFileSync(file, 'utf8');
      if (content.length > 50000) {
        codeContext += `\n\n--- FILE: ${file} (Truncated) ---\n`;
        codeContext += content.substring(0, 10000) + '...';
        continue;
      }
      codeContext += `\n\n--- FILE: ${file} ---\n`;
      codeContext += content;
    } catch (e) {}
  }

  const prompt = `지금까지 만든 웹사이트 코드들인데 전부 분석해서 md 파일에 리서치 및 계획을 세우도록 한다.\n\n[코드 컨텍스트]\n${codeContext}`;

  console.log(" Sending request to local model (gemma4:e4b)...");
  
  try {
    const response = await fetch('http://localhost:11434/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gemma4:e4b',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2
      })
    });

    const data = await response.json();
    const result = data.choices[0].message.content;
    
    fs.writeFileSync('local_analysis.md', result);
    console.log("✅ Analysis saved to local_analysis.md");
  } catch (err) {
    console.error("❌ Error fetching from local model:", err.message);
  }
}

runAnalysis();
