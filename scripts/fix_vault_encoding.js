import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const wikiDir = '10_Wiki';

function main() {
  console.log(`🔍 [인코딩 해결사] PowerShell 브릿지를 통해 ${wikiDir} 폴더 스캔 중...`);
  
  try {
    // 1. Get all markdown files using native Unicode PowerShell
    const findCommand = `powershell -NoProfile -Command "[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; Get-ChildItem -Path '${wikiDir}' -Filter '*.md' -Recurse | Select-Object -ExpandProperty FullName | ConvertTo-Json"`;
    const stdout = execSync(findCommand, { encoding: 'utf8' }).trim();
    
    if (!stdout || stdout === "[]") {
      console.log("❌ 변환할 마크다운 파일을 찾지 못했습니다.");
      return;
    }

    let files = [];
    try {
      const parsed = JSON.parse(stdout);
      files = Array.isArray(parsed) ? parsed : [parsed];
    } catch (e) {
      files = stdout.split('\n').map(p => p.trim()).filter(p => p.length > 0);
    }

    console.log(` Found ${files.length} markdown files. Converting to UTF-8 BOM...`);

    let count = 0;
    for (const filePath of files) {
      try {
        const escapedPath = filePath.replace(/'/g, "''");
        
        // 2. Read with UTF-8 and Write with UTF-8 BOM natively in PowerShell
        // In PowerShell 5.1, Out-File -Encoding utf8 ALWAYS writes with UTF-8 BOM (\uFEFF)
        const fixCommand = `powershell -NoProfile -Command "[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; $c = Get-Content -LiteralPath '${escapedPath}' -Raw -Encoding utf8; $c | Out-File -LiteralPath '${escapedPath}' -Encoding utf8"`;
        execSync(fixCommand);
        
        console.log(`✅ UTF-8 BOM 변환 완료: ${path.basename(filePath)}`);
        count++;
      } catch (err) {
        console.error(`⚠️ 파일 변환 실패: ${filePath}`, err.message);
      }
    }

    console.log(`\n🎉 변환 작업 완료! 총 ${count}개 파일의 한글 깨짐 문제를 예방/조치했습니다.`);
  } catch (globalErr) {
    console.error("❌ 인코딩 변환기 실행 실패:", globalErr.message);
  }
}

main();
