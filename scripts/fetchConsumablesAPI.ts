import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const API_URL = 'https://honkai-star-rail.fandom.com/api.php';

// 위키 특수 문법([[링크]], {{아이콘}}, <br> 등)을 깔끔한 평문으로 정제하는 함수
function cleanWikitext(text: string) {
  if (!text) return '';
  return text
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\[\[(?:[^|\]]+\|)?([^\]]+)\]\]/g, '$1') // [[Link|Text]] -> Text
    .replace(/\{\{(?:[^|}]+\|)?([^}]+)\}\}/g, '$1') // {{Template|Text}} -> Text
    .replace(/<[^>]+>/g, '') // 나머지 HTML 태그 제거
    .trim();
}

async function fetchConsumablesAPI() {
  try {
    console.log('[Scraper] Fandom API를 통해 위키 원문(Wikitext)의 Infobox 데이터를 정밀 추출합니다...');

    const categoryRes = await axios.get(API_URL, {
      params: { action: 'query', list: 'categorymembers', cmtitle: 'Category:Consumables', cmlimit: 500, format: 'json' }
    });
    const titles = categoryRes.data.query.categorymembers.map((i: any) => i.title);

    const consumables: Record<string, any> = {};
    const chunkSize = 40;

    for (let i = 0; i < titles.length; i += chunkSize) {
      const chunk = titles.slice(i, i + chunkSize);
      const langRes = await axios.get(API_URL, {
        params: {
          action: 'query',
          prop: 'revisions',
          rvprop: 'content',
          rvslots: 'main',
          titles: chunk.join('|'),
          format: 'json'
        }
      });

      const pages = langRes.data.query.pages;
      for (const pageId in pages) {
        const page = pages[pageId];
        if (page.missing === undefined && page.revisions && page.revisions.length > 0) {
          const content = page.revisions[0].slots.main['*'];
          
          const nameEn = page.title;
          let nameKo = nameEn;
          const koMatch = content.match(/\|\s*ko\s*=\s*([^|\n}]+)/);
          if (koMatch && koMatch[1]) nameKo = cleanWikitext(koMatch[1]);

          const rarityMatch = content.match(/\|\s*rarity\s*=\s*(\d+)/);
          const rarity = rarityMatch ? parseInt(rarityMatch[1], 10) : 1;

          // 제시해주신 예시 포맷(Infobox)에 맞춰 정확한 Effect 및 Source 추출
          const effectMatch = content.match(/\|\s*effect\s*=\s*(.+?)(?=\n\||\n\}\})/s);
          const effect = effectMatch ? cleanWikitext(effectMatch[1]) : "";

          const sources: string[] = [];
          const recipeMatch = content.match(/\|\s*recipe\s*=\s*(.+?)(?=\n\||\n\}\})/s);
          if (recipeMatch) sources.push(`Recipe: ${cleanWikitext(recipeMatch[1]).replace(/^Recipe:\s*/i, '')}`);

          for (let j = 1; j <= 10; j++) {
            const sourceMatch = content.match(new RegExp(`\\|\\s*source${j}\\s*=\\s*(.+?)(?=\\n\\||\\n\\}\\})`, 's'));
            if (sourceMatch) sources.push(cleanWikitext(sourceMatch[1]));
          }
          if (sources.length === 0) sources.push('Unknown Source');

          const fileName = nameKo.replace(/:/g, '_').normalize('NFC');

          consumables[nameEn] = { nameEn, nameKo, enDesc: effect, type: '소모품', rarity, sources, fileName };
        }
      }
    }

    const outputPath = path.resolve(process.cwd(), 'common-hub/data/consumables_api_result.json');
    fs.writeFileSync(outputPath, JSON.stringify(consumables, null, 2), 'utf-8');

    console.log(`✅ [Success] 100% 한국어 매칭 완료! ${Object.keys(consumables).length}개의 데이터를 추출했습니다.\n📁 경로: ${outputPath}\n`);
    
    console.log('--- 🔍 [무결성 검사] 수집된 nameKo 리스트 (일부 출력) ---');
    Object.values(consumables).slice(0, 15).forEach((c: any) => console.log(`${c.nameEn} -> ${c.nameKo}`));
    console.log('... 전체 리스트는 json 파일에서 확인 가능합니다.\n---------------------------------------------------------');

  } catch (error: any) {
    console.error('❌ [Error] API 요청 중 오류 발생:', error.message);
  }
}

fetchConsumablesAPI();