import fs from 'fs';
import path from 'path';

function applyI18nTraceMaterials() {
  const apiDataPath = path.resolve(process.cwd(), 'common-hub/data/trace_materials_api_result.json');
  const enJsonPath = path.resolve(process.cwd(), 'common-hub/en.json');

  const apiData = JSON.parse(fs.readFileSync(apiDataPath, 'utf-8'));
  const enJson = JSON.parse(fs.readFileSync(enJsonPath, 'utf-8'));

  const TRACE_EN_TO_KO: Record<string, string> = {
    "Tears of Dreams": "꿈의 눈물", "Shattered Blade": "부서진 칼날", "Lifeless Blade": "무생의 칼날", "Worldbreaker Blade": "정화의 칼날",
    "Borisin Teeth": "보리인의 송곳니", "Lupitoxin Sawteeth": "늑대 독 송곳니", "Moon Rage Fang": "달의 광기 이빨",
    "Arrow of the Beast Hunter": "짐승 사냥용 화살", "Arrow of the Demon Slayer": "악마 사냥용 화살", "Arrow of the Starchaser": "별 쫓는 화살",
    "Meteoric Bullet": "운철 탄환", "Destined Expiration": "숙명적인 사인", "Countertemporal Shot": "시간을 역행하는 일격",
    "Grit of Strife": "분쟁의 혈진", "Resin of Valor": "전혼의 혈정", "Lance of Retribution": "천벌의 혈창",
    "Key of Inspiration": "영감의 열쇠", "Key of Knowledge": "계몽의 열쇠", "Key of Wisdom": "지식의 열쇠",
    "Rough Sketch": "거친 스케치", "Dynamic Outlining": "역동적인 선화", "Exquisite Colored Draft": "정교한 컬러 원고",
    "Endurance of Bronze": "청동의 집념", "Oath of Steel": "한철의 맹세", "Safeguard of Amber": "앰버의 수호",
    "Scattered Star Sand": "흩어진 별모래", "Meteorite Crystal": "유성 결정", "Divine Amber": "신성한 앰버",
    "Obsidian of Dread": "어두운 흑요", "Obsidian of Desolation": "허공의 흑요", "Obsidian of Obsession": "타락의 흑요",
    "Fiery Spirit": "열렬의 영혼", "Starfire Essence": "불꽃의 정령", "Heaven Incinerator": "천공을 불태우는 마귀",
    "Harmonic Tune": "조화의 가락", "Ancestral Hymn": "가족의 찬가", "Stellaris Symphony": "별들의 악장",
    "Firmament Note": "구름 위 음표", "Celestial Section": "천상의 소절", "Heavenly Melody": "천외의 악장",
    "Seed of Abundance": "풍요의 씨앗", "Sprout of Life": "생명의 새싹", "Flower of Eternity": "영원의 꽃",
    "Alien Tree Seed": "이계 나무의 씨앗", "Nourishing Honey": "생장의 꽃꿀", "Myriad Fruit": "만상의 과실",
    "Bīja of Consciousness": "사량의 씨앗", "Seedling of Manas": "말나 새싹", "Flower of Ālaya": "아뢰야 꽃",
    "The Fluffy Hand-drawn Storyboards": "≪복슬복슬호≫ 수작업 스토리보드", "The Fluffy Serialization Memorial Issue": "≪복슬복슬호≫ 연재 기념호", "The Fluffy Collector's Edition": "≪복슬복슬호≫ 소장판 합본",
    "Tracks of Destiny": "운명의 발자취", "Destroyer's Final Road": "파멸자의 말로", "Guardian's Lament": "수호자의 비원(悲願)",
    "Regret of Infinite Ochema": "무한한 가짜의 여한", "Past Evils of the Borehole Planet Disaster": "별을 갉아먹고 재앙을 낳는 구악",
    "Lost Echo of the Shared Wish": "공동의 염원의 유음", "Auspice Sliver": "길광편우", "Daythunder Anamnesis": "태양과 번개의 회상",
    "Vanquished Flow's Reticence": "범람을 끊는 침묵"
  };

  // 위키 데이터 파싱 및 다국어 키 매핑
  Object.values(apiData).forEach((item: any) => {
    const koName = TRACE_EN_TO_KO[item.nameEn] || item.nameKo;
    
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

  fs.writeFileSync(enJsonPath, JSON.stringify(enJson, null, 2), 'utf-8');
  console.log('✅ [Success] en.json에 행적 재료 62종의 다국어 매핑이 성공적으로 자동 주입되었습니다!');
}

applyI18nTraceMaterials();