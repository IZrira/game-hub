import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// High-performance candidate finder in PowerShell that safely handles Windows emoji directories
function getCandidateFiles(dir, keywords) {
  if (!fs.existsSync(dir)) return [];
  try {
    // Ensure scratch directory exists
    if (!fs.existsSync('scratch')) {
      fs.mkdirSync('scratch');
    }

    const psKeywords = '@(' + keywords.map(kw => `'${kw.replace(/'/g, "''")}'`).join(', ') + ')';
    const psScriptFile = 'scratch/rag_search.ps1';

    const scriptContent = `
$keywords = ${psKeywords}
$wikiDir = '${dir}'

# 1. Title matches
$files = Get-ChildItem -Path $wikiDir -Filter '*.md' -Recurse
$titleMatches = $files | Where-Object {
    $name = $_.BaseName.ToLower()
    foreach ($kw in $keywords) {
        if ($name.Contains($kw)) { return $true }
    }
    return $false
} | Select-Object -ExpandProperty FullName

# 2. Content matches (ultra-fast regex/simple search using Select-String)
$contentMatches = @()
foreach ($kw in $keywords) {
    $matches = $files | Select-String -Pattern $kw -SimpleMatch
    if ($matches) {
        $contentMatches += $matches | Select-Object -ExpandProperty Path
    }
}

# Merge and deduplicate
$allPaths = ($titleMatches + $contentMatches) | Select-Object -Unique
if ($allPaths) {
    $allPaths | ConvertTo-Json
} else {
    "[]"
}
`;

    // Write ps1 script file in UTF-8
    fs.writeFileSync(psScriptFile, '\uFEFF' + scriptContent, 'utf8');

    // Run PowerShell
    const command = `powershell -NoProfile -ExecutionPolicy Bypass -Command "[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; & '${path.resolve(psScriptFile)}'"`;
    const stdout = execSync(command, { encoding: 'utf8' });
    const cleanJson = stdout.trim().replace(/^\uFEFF/, '');

    if (cleanJson && cleanJson !== "[]") {
      try {
        const parsed = JSON.parse(cleanJson);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch (e) {
        return cleanJson.split('\n').map(p => p.trim()).filter(p => p.length > 0);
      }
    }
    return [];
  } catch (e) {
    console.error("⚠️ PowerShell RAG Search failed:", e.message);
    return [];
  }
}

// Read file via PowerShell bridge to guarantee 100% successful reads inside emoji paths under Windows
function readFileContent(filePath) {
  try {
    const escapedPath = filePath.replace(/'/g, "''");
    const command = `powershell -NoProfile -Command "[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; Get-Content -LiteralPath '${escapedPath}' -Raw -Encoding utf8"`;
    return execSync(command, { encoding: 'utf8' });
  } catch (e) {
    // Fallback standard read
    return fs.readFileSync(filePath, 'utf8');
  }
}

// Simple scoring algorithm based on keywords
function scoreNote(filePath, content, keywords) {
  let score = 0;
  const baseName = path.basename(filePath, '.md').toLowerCase();
  const contentLower = content.toLowerCase();

  for (const kw of keywords) {
    if (!kw) continue;
    // 1. 파일명 매칭 (가장 높은 중요도)
    if (baseName.includes(kw)) {
      score += 150;
    }

    // 2. 본문 키워드 빈도 매칭
    const matches = contentLower.split(kw).length - 1;
    score += matches * 2;

    // 3. 헤더 매칭 (## 헤더 등)
    const lines = content.split('\n');
    for (const line of lines) {
      if (line.trim().startsWith('#') && line.toLowerCase().includes(kw)) {
        score += 30;
      }
    }
  }
  return score;
}

async function runLocalGemma() {
  const prompt = process.argv.slice(2).join(' ');
  if (!prompt) {
    console.log("\n[Gemma 4 RAG] 사용법: node scripts/gemma.js \"질문 내용\"");
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
    const fullUrl = url.includes('/v1') ? `${url}chat/completions` : `${url}v1/chat/completions`;

    // 키워드 파싱 (공백 문자 기준 및 영어/한글 단어 추출 및 한국어 조사 제거 & 접두사 확장)
    const rawKeywords = prompt.toLowerCase()
      .replace(/[^\w\sㄱ-ㅎㅏ-ㅣ가-힣]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length >= 1);

    const keywordsSet = new Set();
    for (const kw of rawKeywords) {
      keywordsSet.add(kw);
      const isKorean = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(kw);
      if (isKorean && kw.length >= 2) {
        let stripped = kw;
        const suffixes = ['에', '는', '은', '를', '을', '의', '이', '가', '과', '와', '로', '으로', '대해', '대해서'];
        for (const suffix of suffixes) {
          if (kw.endsWith(suffix) && kw.length > suffix.length) {
            stripped = kw.slice(0, -suffix.length);
            keywordsSet.add(stripped);
            break;
          }
        }
        if (stripped.length >= 3) {
          keywordsSet.add(stripped.slice(0, -1));
          if (stripped.length >= 4) {
            keywordsSet.add(stripped.slice(0, -2));
          }
        }
      }
    }
    const keywords = Array.from(keywordsSet);

    // 🔍 Local RAG: PowerShell 기반 고성능 하이브리드 지식 베이스 검색
    const wikiDir = '10_Wiki';
    const candidateFiles = getCandidateFiles(wikiDir, keywords);

    const scoredNotes = [];
    for (const filePath of candidateFiles) {
      try {
        const content = readFileContent(filePath);
        const score = scoreNote(filePath, content, keywords);
        if (score > 0) {
          scoredNotes.push({ filePath, content, score });
        }
      } catch (e) {
        // Skip unreadable files
        continue;
      }
    }

    // 점수 높은 순으로 정렬
    scoredNotes.sort((a, b) => b.score - a.score);

    // 최소 점수 임계값 및 상대 임계값 적용하여 필터링
    const maxScore = scoredNotes.length > 0 ? scoredNotes[0].score : 0;
    const filteredNotes = scoredNotes.filter(note => {
      // 절대 임계값 10 이상이면서, 최댓값 대비 15% 이상인 경우만 포함
      return note.score >= 10 && note.score >= maxScore * 0.15;
    });

    // 상위 3개 노트 선택 (컨텍스트로 주입)
    const topNotes = filteredNotes.slice(0, 3);
    let context = '';
    
    if (topNotes.length > 0) {
      console.log(`\n\x1b[1;32m📚 [Gemma 4 RAG] 지식베이스 연동 성공! 검색된 노트:\x1b[0m`);
      topNotes.forEach(note => {
        // Get friendly relative path for printing
        let displayPath = note.filePath;
        if (note.filePath.toLowerCase().includes('10_wiki')) {
          displayPath = note.filePath.slice(note.filePath.toLowerCase().indexOf('10_wiki') + 8);
        }
        console.log(` - 📝 \x1b[1;36m${displayPath}\x1b[0m (연관도 점수: \x1b[1;33m${note.score}\x1b[0m)`);
        context += `\n[출처 파일: ${displayPath}]\n${note.content}\n---`;
      });
      console.log(`\n\x1b[1;35m🤖 로컬 Gemma 4에 질의 중...\x1b[0m\n`);
    } else {
      console.log(`\n\x1b[1;31m📚 [Gemma 4 RAG] 검색어와 일치하는 지식베이스 노트를 찾지 못했습니다.\x1b[0m`);
      console.log(`\x1b[1;33m🤖 일반 모델 모드로 로컬 Gemma 4에 질의 중...\x1b[0m\n`);
    }

    // 최종 프롬프트 구성
    let messages = [];
    if (context) {
      messages.push({
        role: 'system',
        content: '당신은 위키 지식 도우미입니다. 답변할 때 외부의 상식이나 다른 정보는 완전히 배제하고, 제공되는 [참고 자료]에 기재된 내용만을 사용하여 사용자의 질문에 한국어로 정확하게 답변하세요. 지어내거나 추측하여 답변하지 마세요.'
      });
      messages.push({
        role: 'user',
        content: `[참고 자료]
${context}

사용자 질문: ${prompt}`
      });
    } else {
      messages.push({
        role: 'user',
        content: prompt
      });
    }

    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey || 'ollama'}`
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.1
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const result = data.choices[0].message.content;
    
    // 🎨 Force Bright White text output so it is highly legible on dark/black terminals
    process.stdout.write(`\x1b[1;37m${result}\x1b[0m\n\n`);
  } catch (err) {
    console.error('\n\x1b[1;31m❌ 로컬 모델 연결 실패:\x1b[0m', err.message);
    console.log('\x1b[1;33mOllama가 실행 중인지 확인해 주세요. (기본 포트: 11434)\x1b[0m');
    process.exit(1);
  }
}

runLocalGemma();
