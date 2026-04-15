import fs from 'fs';
import path from 'path';

function applyI18n() {
  const apiDataPath = path.resolve(process.cwd(), 'common-hub/data/consumables_api_result.json');
  const enJsonPath = path.resolve(process.cwd(), 'common-hub/en.json');

  const apiData = JSON.parse(fs.readFileSync(apiDataPath, 'utf-8'));
  const enJson = JSON.parse(fs.readFileSync(enJsonPath, 'utf-8'));

  // en.json 내 위키 찌꺼기(가비지 데이터) 일괄 청소
  Object.keys(enJson).forEach(key => {
    if (key.includes('}}\n') || key.includes('==Sold By==') || key.includes('==Recipe==') || key.includes("'''")) {
      delete enJson[key];
    }
  });

  Object.values(apiData).forEach((item: any) => {
    enJson[item.nameKo] = item.nameEn;
    enJson[`desc_${item.nameKo}`] = item.enDesc;
    
    // 위키 원본에서 가져온 Source 데이터도 다국어 처리를 위해 등록
    if (item.sources && Array.isArray(item.sources)) {
      item.sources.forEach((src: string) => {
        let cleaned = src
          .replace(/^(?:Recipe:\s*)?\|source\d+\s*=\s*/i, '')
          .replace(/^Recipe:\s*/i, '')
          .replace(/\|.*/, '');
          
        if (cleaned.includes('}}\n') || cleaned.includes('\n==') || cleaned.includes('<!--')) return;
        cleaned = cleaned.trim();
        if (!cleaned || cleaned.toLowerCase() === 'recipe:') return;
        if (cleaned.length > 50) cleaned = cleaned.substring(0, 50) + '...';

        enJson[`source_${cleaned}`] = cleaned;
      });
    }
  });

  fs.writeFileSync(enJsonPath, JSON.stringify(enJson, null, 2), 'utf-8');
  console.log('✅ [Success] en.json 파일에 202개 소모품의 다국어(이름 및 효과) 매핑이 성공적으로 자동 주입되었습니다!');
}

applyI18n();