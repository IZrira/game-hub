import axios from 'axios';
import fs from 'fs';
import path from 'path';

const API_URL = 'https://honkai-star-rail.fandom.com/api.php';

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

async function fetchExpMaterialsAPI() {
  try {
    console.log('[Scraper] Fandom API를 통해 경험치 재료(캐릭터, 광추, 유물) 10종 데이터를 타겟 추출합니다...');

    // 위키 카테고리명(단/복수)에 의존하지 않도록 정확한 영문명 10종을 직접 타겟팅합니다.
    const titles = [
      "Traveler's Guide", "Adventure Log", "Travel Encounters", // 캐릭터 경험치
      "Refined Aether", "Condensed Aether", "Sparse Aether",    // 광추 경험치
      "Lost Crystal", "Lost Gold Fragment", "Lost Lightdust" // 유물 경험치
    ];

    const materials: Record<string, any> = {};
    const foundTitles = new Set<string>();
    const chunkSize = 40;

    // 2. 문서 세부 정보 병렬 조회
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

          // Effect 또는 Description 필드를 유연하게 추출
          let effect = "";
          const effectMatch = content.match(/\|\s*(?:effect|description)\s*=\s*(.+?)(?=\n\||\n\}\})/s);
          if (effectMatch) effect = cleanWikitext(effectMatch[1]);

          let type = "경험치 재료";
          if (["Traveler's Guide", "Adventure Log", "Travel Encounters"].includes(nameEn)) type = "캐릭터 경험치 재료";
          else if (["Refined Aether", "Condensed Aether", "Sparse Aether"].includes(nameEn)) type = "광추 경험치 재료";
          else type = "유물 경험치 재료";

          // 획득처(Sources) 다중 파싱 (source1 ~ source15)
          const sources: string[] = [];
          for (let j = 1; j <= 15; j++) {
            const sourceMatch = content.match(new RegExp(`\\|\\s*source${j}\\s*=\\s*([^\\n]+)`, 'i'));
            if (sourceMatch) {
              let cleanedSource = cleanWikitext(sourceMatch[1]);
              cleanedSource = cleanedSource.split('}}')[0].trim();
              if (cleanedSource) sources.push(cleanedSource);
            }
          }
          if (sources.length === 0) sources.push("게임 내 확인 필요");

          const fileName = nameKo.replace(/:/g, '_').normalize('NFC');

          materials[nameEn] = { nameEn, nameKo, enDesc: effect, type, rarity, sources, fileName };
          foundTitles.add(nameEn);
        }
      }
    }

    const outputPath = path.resolve(process.cwd(), 'common-hub/data/exp_materials_api_result.json');
    fs.writeFileSync(outputPath, JSON.stringify(materials, null, 2), 'utf-8');

    console.log(`\n✅ [Success] ${Object.keys(materials).length}개의 경험치 재료 데이터를 추출했습니다.\n📁 경로: ${outputPath}`);

    console.log(`\n--- 🔍 [추출 완료 리스트] ---`);
    Object.values(materials).forEach((m: any) => {
      console.log(`- [${m.type}] ${m.nameEn} (${m.nameKo})`);
    });

    const missingTitles = titles.filter(t => !foundTitles.has(t));
    if (missingTitles.length > 0) {
      console.log(`\n⚠️ [경고] 다음 ${missingTitles.length}개의 타겟을 위키에서 찾지 못했습니다 (영문명 불일치 등):`);
      missingTitles.forEach(t => console.log(`- ${t}`));
    }
    console.log('\n');
  } catch (error: any) {
    console.error('❌ [Error] API 요청 중 오류 발생:', error.message);
  }
}

fetchExpMaterialsAPI();