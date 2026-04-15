import fs from 'fs';
import path from 'path';

function applyI18nAscensionMaterials() {
  const apiDataPath = path.resolve(process.cwd(), 'common-hub/data/ascension_materials_api_result.json');
  const enJsonPath = path.resolve(process.cwd(), 'common-hub/en.json');

  const apiData = JSON.parse(fs.readFileSync(apiDataPath, 'utf-8'));
  const enJson = JSON.parse(fs.readFileSync(enJsonPath, 'utf-8'));

  const ASC_EN_TO_KO: Record<string, string> = {
    "Enigmatic Ectostella": "깊은 별의 외형질", "Broken Teeth of Iron Wolf": "강철 늑대의 깨진 이빨", "Endotherm Chitin": "상온 갑각",
    "Horn of Snow": "눈보라의 뿔", "Lightning Crown of the Past Shadow": "과거 그림자의 번개 왕관", "Storm Eye": "폭풍의 눈",
    "Void Cast Iron": "환영의 무쇠", "Golden Crown of the Past Shadow": "과거 그림자의 황금 장식", "Netherworld Token": "명부 명령",
    "Searing Steel Blade": "과열된 강철 칼날", "Gelid Chitin": "혹한 갑각", "Shape Shifter's Lightning Staff": "조형자의 번개 지팡이",
    "Ascendant Debris": "천인의 유해", "Nail of the Ape": "괴수의 못", "Suppressing Edict": "진령칙부", "IPC Work Permit": "스타피스 사원증",
    "Raging Heart": "격분한 심장", "Dream Fridge": "꿈 아이스박스", "Nail of the Beast Coffin": "수관(獸棺)의 못",
    "A Glass of the Besotted Era": "만취의 시대 한잔", "Dream Flamer": "꿈 토치", "Chordal Mirage": "한 곡으로 어우러진 환상",
    "Invasive Clot": "침략 응괴", "Radiant Prominence": "눈부신 홍염", "Sea Siren's Torn Fin": "세이렌의 지느러미 잔해",
    "Thunder Strum": "광뢰의 스트로크", "Charred Bud of Twilight": "석양에 불탄 꽃봉오리", "Darkveil Moonlight": "어두운 장막의 달빛",
    "Harbinger of Strife": "분쟁의 전조"
  };

  // 기존 en.json에 남아있는 위키 찌꺼기(&mdash; 등) 고아 키 일괄 청소
  Object.keys(enJson).forEach(key => {
    if (key.includes('&mdash')) {
      delete enJson[key];
    }
  });

  Object.values(apiData).forEach((item: any) => {
    const koName = ASC_EN_TO_KO[item.nameEn] || item.nameKo;
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
  console.log('✅ [Success] en.json에 캐릭터 승급 재료 29종의 다국어(이름, 효과, 획득처) 매핑이 성공적으로 자동 주입되었습니다!');
}

applyI18nAscensionMaterials();