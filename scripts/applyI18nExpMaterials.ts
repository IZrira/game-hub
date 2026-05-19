import fs from 'fs';
import path from 'path';

function applyI18nExpMaterials() {
  const apiDataPath = path.resolve(process.cwd(), 'common-hub/data/exp_materials_api_result.json');
  const enJsonPath = path.resolve(process.cwd(), 'common-hub/en.json');

  const apiData = JSON.parse(fs.readFileSync(apiDataPath, 'utf-8'));
  const enJson = JSON.parse(fs.readFileSync(enJsonPath, 'utf-8'));

  // 매칭 딕셔너리
  const EXP_EN_TO_KO: Record<string, string> = {
    "Traveler's Guide": "여행 가이드", "Adventure Log": "모험 기록", "Travel Encounters": "여행 견문",
    "Refined Aether": "정제한 에테르", "Condensed Aether": "응축한 에테르", "Sparse Aether": "희박한 에테르",
    "Lost Crystal": "유실된 수정덩이", "Lost Gold Fragment": "유실된 황금 파편", "Lost Lightdust": "유실된 라이트더스트"
  };

  // 기존 en.json 내 위키 찌꺼기(가비지 데이터) 및 삭제된 오역 데이터 일괄 청소
  Object.keys(enJson).forEach(key => {
    if (key.includes('}}\n') || key.includes('==Other Languages==') || key === '유실된 정수' || key === 'desc_유실된 정수' || key === 'Lost Dust' || key === 'desc_Lost Dust' || key.includes("'''")) {
      delete enJson[key];
    }
  });

  Object.values(apiData).forEach((item: any) => {
    const koName = EXP_EN_TO_KO[item.nameEn] || item.nameKo;
    enJson[koName] = item.nameEn;
    enJson[`desc_${koName}`] = item.enDesc;
    
    if (item.sources && Array.isArray(item.sources)) {
      item.sources.forEach((src: string) => {
        let cleaned = src.replace(/^(?:Recipe:\s*)?\|source\d+\s*=\s*/i, '').replace(/^Recipe:\s*/i, '').replace(/\|.*/, '').trim();
        if (cleaned) enJson[`source_${cleaned}`] = cleaned;
      });
    }
  });

  fs.writeFileSync(enJsonPath, JSON.stringify(enJson, null, 2), 'utf-8');
  console.log('✅ [Success] en.json 파일에 경험치 재료 10종의 다국어(이름, 효과, 획득처) 매핑이 성공적으로 자동 주입되었습니다!');
}

applyI18nExpMaterials();