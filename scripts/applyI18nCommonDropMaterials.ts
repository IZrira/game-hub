import fs from 'fs';
import path from 'path';

function applyI18nCommonDropMaterials() {
  const apiDataPath = path.resolve(process.cwd(), 'common-hub/data/common_drop_materials_api_result.json');
  const enJsonPath = path.resolve(process.cwd(), 'common-hub/en.json');

  const apiData = JSON.parse(fs.readFileSync(apiDataPath, 'utf-8'));
  const enJson = JSON.parse(fs.readFileSync(enJsonPath, 'utf-8'));

  const COMMON_EN_TO_KO: Record<string, string> = {
    "Tears of Souls": "영의 눈물",
    "Extinguished Core": "소멸된 코어", "Glimmering Core": "희미한 빛의 코어", "Squirming Core": "꿈틀대는 코어",
    "Thief's Instinct": "약탈의 본능", "Usurper's Scheme": "변조된 야망", "Conqueror's Will": "짓밟힌 의지",
    "Silvermane Badge": "철위대 배지", "Silvermane Insignia": "철위대 표식", "Silvermane Medal": "철위대 훈장",
    "Ancient Part": "고대 부속품", "Ancient Spindle": "고대 전동축", "Ancient Engine": "고대 엔진",
    "Immortal Scion": "영생의 새싹", "Immortal Aeroblossom": "영생의 꽃", "Immortal Lumintwig": "영생의 가지",
    "Artifex's Module": "공조 기계 부품", "Artifex's Cogwheel": "공조 톱니바퀴", "Artifex's Gyreheart": "공조 환류 심장",
    "Dream Collection Component": "꿈 저장 부품", "Dream Flow Valve": "꿈 흐름 밸브", "Dream Making Engine": "꿈 제조 모터",
    "Tatters of Thought": "생각의 가루", "Fragments of Impression": "인상의 파편", "Shards of Desires": "욕망의 거울 조각",
    "Tatters of Terror": "공포에 짓밟힌 육신", "Fragments of Courage": "용기에 찢긴 가슴", "Shards of Glory": "영광의 세례를 받은 육신",
    "Fleeting Sign": "있는 듯 없는 듯한 조짐", "Approaching Howl": "점점 가까워지는 비명", "Endless Sigh": "끝없는 탄식",
    "Whimsy Wax": "천진난만 크레파스", "Dreamweave Steel": "꿈을 만드는 딥 펜", "Lucid Awl": "꿈을 그리는 붓"
  };

  // 위키 API가 누락시키는 최신 신규 재료 6종 수동 삽입 폴백
  const MANUAL_FALLBACK: Record<string, { nameEn: string, enDesc: string, sources: string[] }> = {
    "공포에 짓밟힌 육신": {
      nameEn: "Tatters of Terror",
      enDesc: "Dust that forms the dependents of strife. Crude material used for enhancement.",
      sources: ["Dependents of strife", "Dropped by enemies in Divergent Universe", "Simulated Universe enemies", "Assignment rewards", "Embers Exchange", "Omni-Synthesizer Material Exchange", "Calyx (Golden)"]
    },
    "용기에 찢긴 가슴": {
      nameEn: "Fragments of Courage",
      enDesc: "Remains of a dependent of strife after it died in battle. Normal material used for enhancement.",
      sources: ["Dependents of strife at Equilibrium Level 2 or higher", "Omni-Synthesizer Material Synthesis", "Dropped by enemies in Divergent Universe", "Simulated Universe enemies", "Omni-Synthesizer Material Exchange"]
    },
    "영광의 세례를 받은 육신": {
      nameEn: "Shards of Glory",
      enDesc: "The heart of a dependent of strife, brimming with divine power. Advanced material used for enhancement.",
      sources: ["Dependents of strife at Equilibrium Level 4 or higher", "Omni-Synthesizer Material Synthesis", "Dropped by enemies in Divergent Universe", "Simulated Universe enemies", "Omni-Synthesizer Material Exchange"]
    },
    "있는 듯 없는 듯한 조짐": {
      nameEn: "Fleeting Sign",
      enDesc: "Fragments that fall from the bodies of Black Tide Creations. Crude material used for enhancement.",
      sources: ["Black Tide Creations", "Dropped by enemies in Divergent Universe", "Simulated Universe enemies", "Assignment rewards", "Embers Exchange", "Omni-Synthesizer Material Exchange", "Calyx (Golden)"]
    },
    "점점 가까워지는 비명": {
      nameEn: "Approaching Howl",
      enDesc: "Parts that make up the bodies of Black Tide Creations. Normal material used for enhancement.",
      sources: ["Black Tide Creations at Equilibrium Level 2 or higher", "Omni-Synthesizer Material Synthesis", "Dropped by enemies in Divergent Universe", "Simulated Universe enemies", "Omni-Synthesizer Material Exchange"]
    },
    "끝없는 탄식": {
      nameEn: "Endless Sigh",
      enDesc: "Crystals condensed after the death of Black Tide Creations. Advanced material used for enhancement.",
      sources: ["Black Tide Creations at Equilibrium Level 4 or higher", "Omni-Synthesizer Material Synthesis", "Dropped by enemies in Divergent Universe", "Simulated Universe enemies", "Omni-Synthesizer Material Exchange"]
    }
  };

  // 위키 데이터 파싱 및 다국어 키 매핑
  Object.values(apiData).forEach((item: any) => {
    const koName = COMMON_EN_TO_KO[item.nameEn] || item.nameKo;
    
    // 1. 이름 및 설명 매핑
    enJson[koName] = item.nameEn;
    enJson[`desc_${koName}`] = item.enDesc;
    
    // 2. 획득처(Sources) 정제 및 매핑
    if (item.sources && Array.isArray(item.sources)) {
      item.sources.forEach((src: string) => {
        let cleaned = src
          .replace(/^(?:Recipe:\s*)?\|source\d+\s*=\s*/i, '')
          .replace(/^Recipe:\s*/i, '')
          .replace(/\|.*/, '')
          .trim();
        if (cleaned) enJson[`source_${cleaned}`] = cleaned;
      });
    }
  });

  Object.entries(MANUAL_FALLBACK).forEach(([koName, item]) => {
    enJson[koName] = item.nameEn;
    enJson[`desc_${koName}`] = item.enDesc;
    item.sources.forEach((src) => {
      enJson[`source_${src}`] = src;
    });
  });

  fs.writeFileSync(enJsonPath, JSON.stringify(enJson, null, 2), 'utf-8');
  console.log('✅ [Success] en.json에 공통 드랍 재료 34종의 다국어 매핑이 성공적으로 자동 주입되었습니다!');
}

applyI18nCommonDropMaterials();