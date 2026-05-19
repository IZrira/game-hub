import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

async function fetchWikiConsumables() {
  const url = 'https://honkai-star-rail.fandom.com/wiki/Consumable';
  console.log(`[Scraper] Fandom Wiki에서 소모품 데이터를 추출합니다...\nTarget: ${url}`);
  
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const consumables: Record<string, any> = {};

    // 위키 테이블 행(Row) 순회
    $('table.article-table tbody tr').each((_, element) => {
      const tds = $(element).find('td');
      // [0] Name, [1] Rarity, [2] Type, [3] Effect, [4] Source
      if (tds.length < 4) return;

      const enName = $(tds[0]).text().trim();
      if (!enName) return;
      
      // 등급(Rarity) 파싱: 이미지의 alt 텍스트(예: "3 Stars") 또는 텍스트 숫자 추출
      let rarity = 1;
      const rarityImgAlt = $(tds[1]).find('img').attr('alt') || '';
      const rarityMatch = rarityImgAlt.match(/(\d+)\s*Star/i) || $(tds[1]).text().match(/(\d+)/);
      if (rarityMatch) rarity = parseInt(rarityMatch[1], 10);

      const type = $(tds[2]).text().trim() || '소모품';
      const effect = $(tds[3]).text().trim();
      
      // 획득처(Sources) 파싱: 줄바꿈 기준으로 배열화
      let sources = $(tds[4]).text().split('\n').map(s => s.trim()).filter(Boolean);
      if (sources.length === 0) sources = ['Unknown Source'];

      consumables[enName] = { enName, enDesc: effect, type, rarity, sources };
    });

    const totalCount = Object.keys(consumables).length;
    
    const outputPath = path.resolve(__dirname, '../common-hub/data/consumables_wiki.ts');
    const tsContent = `// Fandom Wiki 소모품 자동 추출 데이터\nexport const WIKI_CONSUMABLES: Record<string, any> = ${JSON.stringify(consumables, null, 2)};\n`;
    fs.writeFileSync(outputPath, tsContent, 'utf-8');
    
    console.log(`✅ [Success] 성공적으로 ${totalCount}개의 소모품(EN) 데이터를 추출 및 저장했습니다!\n📁 경로: ${outputPath}`);
  } catch (error) {
    console.error('❌ [Error] 위키 데이터를 가져오는 데 실패했습니다:', error);
  }
}

fetchWikiConsumables();