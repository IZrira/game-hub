import { ItemDetail } from '../../common-hub/types';
import expApiData from './exp_materials_api_result.json';
import ascApiData from './ascension_materials_api_result.json';
import traceApiData from './trace_materials_api_result.json';
import commonApiData from './common_drop_materials_api_result.json';

export type MaterialDetail = ItemDetail & {
  enName?: string;
  enDesc?: string;
  enSources?: string[];
};

const MANUAL_EXP_ITEM_DATA: Record<string, MaterialDetail> = {
  "여행 가이드": { gameId: 'hsr', desc: "캐릭터 경험치 재료. 캐릭터 경험치를 20,000pt 획득한다", type: "캐릭터 경험치 재료", rarity: 4, sources: ["모조 꽃받침 [외곽 설원]", "모조 꽃받침 [구름나루]", "모조 꽃받침 [꿈 건축 경계]", "모조 꽃받침 [「신탁의 성지」 야누소폴리스]", "「망각의 정원」"], enSources: ["Calyx (Golden): Outlying Snow Plains", "Calyx (Golden): Cloudford", "Calyx (Golden): Dream's Edge", "Calyx (Golden): Janusopolis", "Forgotten Hall"] },
  "모험 기록": { gameId: 'hsr', desc: "캐릭터 경험치 재료. 캐릭터 경험치를 5,000pt 획득한다", type: "캐릭터 경험치 재료", rarity: 3, sources: ["모조 꽃받침 [외곽 설원]", "모조 꽃받침 [구름나루]", "모조 꽃받침 [꿈 건축 경계]", "모조 꽃받침 [「신탁의 성지」 야누소폴리스]", "일일 훈련", "잔화 교환"], enSources: ["Calyx (Golden): Outlying Snow Plains", "Calyx (Golden): Cloudford", "Calyx (Golden): Dream's Edge", "Calyx (Golden): Janusopolis", "Daily Training", "Embers Exchange"] },
  "여행 견문": { gameId: 'hsr', desc: "캐릭터 경험치 재료. 캐릭터 경험치를 1,000pt 획득한다", type: "캐릭터 경험치 재료", rarity: 2, sources: ["모조 꽃받침 [외곽 설원]", "모조 꽃받침 [구름나루]", "모조 꽃받침 [꿈 건축 경계]", "모조 꽃받침 [「신탁의 성지」 야누소폴리스]", "의뢰 보상"], enSources: ["Calyx (Golden): Outlying Snow Plains", "Calyx (Golden): Cloudford", "Calyx (Golden): Dream's Edge", "Calyx (Golden): Janusopolis", "Assignment Rewards"] },
  "정제한 에테르": { gameId: 'hsr', desc: "광추 강화 재료. 광추 경험치를 6,000pt 획득한다", type: "광추 경험치 재료", rarity: 4, sources: ["모조 꽃받침 [변방 통로]", "모조 꽃받침 [태복사]", "모조 꽃받침 [어린아이의 꿈]", "모조 꽃받침 [「분쟁의 폐허」 크렘노스성]", "「망각의 정원」"], enSources: ["Calyx (Golden): Backwater Pass", "Calyx (Golden): Divination Commission", "Calyx (Golden): A Child's Dream", "Calyx (Golden): Castrum Kremnos", "Forgotten Hall"] },
  "응축한 에테르": { gameId: 'hsr', desc: "광추 강화 재료. 광추 경험치를 2,000pt 획득한다", type: "광추 경험치 재료", rarity: 3, sources: ["모조 꽃받침 [변방 통로]", "모조 꽃받침 [태복사]", "모조 꽃받침 [어린아이의 꿈]", "모조 꽃받침 [「분쟁의 폐허」 크렘노스성]", "잔화 교환"], enSources: ["Calyx (Golden): Backwater Pass", "Calyx (Golden): Divination Commission", "Calyx (Golden): A Child's Dream", "Calyx (Golden): Castrum Kremnos", "Embers Exchange"] },
  "희박한 에테르": { gameId: 'hsr', desc: "광추 강화 재료. 광추 경험치를 500pt 획득한다", type: "광추 경험치 재료", rarity: 2, sources: ["모조 꽃받침 [변방 통로]", "모조 꽃받침 [태복사]", "모조 꽃받침 [어린아이의 꿈]", "모조 꽃받침 [「분쟁의 폐허」 크렘노스성]", "의뢰 보상"], enSources: ["Calyx (Golden): Backwater Pass", "Calyx (Golden): Divination Commission", "Calyx (Golden): A Child's Dream", "Calyx (Golden): Castrum Kremnos", "Assignment Rewards"] },
  "유실된 수정덩이": { gameId: 'hsr', desc: "유물 강화 재료. 유물 경험치를 1,000pt 획득한다", type: "유물 경험치 재료", rarity: 4, sources: ["「망각의 정원」", "상점 「진실이 된 농담」에서 획득", "작전 브리핑", "HoYoLAB 출석체크", "임무", "이벤트"], enSources: ["Forgotten Hall", "Sold by Jokes Come True", "Operation Briefing", "HoYoLAB Daily Check-In", "Missions", "Events"] },
  "유실된 황금 파편": { gameId: 'hsr', desc: "유물 강화 재료. 유물 경험치를 500pt 획득한다", type: "유물 경험치 재료", rarity: 3, sources: ["일일 훈련", "유물 분해", "잔화 교환", "작전 브리핑", "시뮬레이션 우주 점수 보상", "HoYoLAB 출석체크", "임무", "이벤트"], enSources: ["Daily Training Activity", "Salvage 3/4/5-Star Relics", "Sold by Embers Exchange, Jeweler's Pagoda, and Underground Shop", "Operation Briefing (Parts 2-4)", "Simulated Universe Point Rewards", "HoYoLAB Daily Check-In", "Missions", "Events"] },
  "유실된 라이트더스트": { gameId: 'hsr', desc: "유물 강화 재료. 유물 경험치를 100pt 획득한다", type: "유물 경험치 재료", rarity: 2, sources: ["유물 분해", "시뮬레이션 우주 추가 드랍", "이벤트"], enSources: ["Salvage 2-Star Relics", "Simulated Universe extra drops", "Events"] }
};

export const EXP_ITEM_DATA: Record<string, MaterialDetail> = { ...MANUAL_EXP_ITEM_DATA };

// 위키 데이터(EN)와 인게임 수동 데이터(KO)를 100% 완벽하게 매칭시키는 명시적 사전
const EXP_EN_TO_KO: Record<string, string> = {
  "Traveler's Guide": "여행 가이드",
  "Adventure Log": "모험 기록",
  "Travel Encounters": "여행 견문",
  "Refined Aether": "정제한 에테르",
  "Condensed Aether": "응축한 에테르",
  "Sparse Aether": "희박한 에테르",
  "Lost Crystal": "유실된 수정덩이",
  "Lost Gold Fragment": "유실된 황금 파편",
  "Lost Lightdust": "유실된 라이트더스트"
};

Object.values(expApiData).forEach((item: any) => {
  const koName = EXP_EN_TO_KO[item.nameEn] || item.nameKo;
  if (EXP_ITEM_DATA[koName]) {
    EXP_ITEM_DATA[koName].enName = item.nameEn;
    EXP_ITEM_DATA[koName].enDesc = item.enDesc;
  }
});

const MANUAL_CHARACTER_ASCENSION_DATA: Record<string, MaterialDetail> = {
  "깊은 별의 외형질": { desc: "그윽한 결정, 개척자 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["임무 보상", "레벨 보상"] },
  "강철 늑대의 깨진 이빨": { desc: "자동 기갑병이 남긴 톱니 부품. 물리 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [큰 광산구역]", "「만능 합성기」- 재료 치환"] },
  "상온 갑각": { desc: "화염이 그대로 응고되어버린 듯한 뜨거운 결정. 화염 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [철위대 금지구역]", "「만능 합성기」- 재료 치환"] },
  "눈보라의 뿔": { desc: "혹한의 부랑자의 뿔. 얼음 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [잔향의 회랑]", "「만능 합성기」- 재료 치환"] },
  "과거 그림자의 번개 왕관": { desc: "수호자의 그림자가 착용하는 장신구. 번개 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [잔향의 회랑]", "「만능 합성기」- 재료 치환"] },
  "폭풍의 눈": { desc: "바람 소환사가 남긴 화살촉. 바람 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [리벳 타운]", "「만능 합성기」- 재료 치환"] },
  "환영의 무쇠": { desc: "허졸•유린자의 편자. 양자 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [베이스 캐빈]", "「만능 합성기」- 재료 치환"] },
  "과거 그림자의 황금 장식": { desc: "잠식자의 그림자가 착용하고 다니는 장신구. 허수 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [변방 통로]", "「만능 합성기」- 재료 치환"] },
  "명부 명령": { desc: "금 조각상 저승사자의 무기. 물리 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [유원]", "「만능 합성기」- 재료 치환"] },
  "과열된 강철 칼날": { desc: "화염의 부랑자의 부러진 칼날. 화염 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [큰 광산구역]", "「만능 합성기」- 재료 치환"] },
  "혹한 갑각": { desc: "매서운 한기를 뿜어내는 차가운 결정. 얼음 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [구름나루]", "「만능 합성기」- 재료 치환"] },
  "조형자의 번개 지팡이": { desc: "「약왕의 비전」 조형자가 남긴 뾰족한 지팡이. 번개 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [회성항]", "「만능 합성기」- 재료 치환"] },
  "천인의 유해": { desc: "승로천인이 남긴 재. 바람 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [단정사]", "「만능 합성기」- 재료 치환"] },
  "괴수의 못": { desc: "풍요의 요수 잔재. 양자 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [인연경]", "「만능 합성기」- 재료 치환"] },
  "진령칙부": { desc: "선주 기교술의 부품. 허수 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [공조사]", "「만능 합성기」- 재료 치환"] },
  "스타피스 사원증": { desc: "스타피스 컴퍼니 「베테랑 직원」의 사원증. 물리 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [클락 스튜디오 테마파크]", "「만능 합성기」- 재료 치환"] },
  "격분한 심장": { desc: "「사그라진 분노의 껍데기」의 기억 물질 코어. 화염 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [아침 이슬 공관]", "「만능 합성기」- 재료 치환"] },
  "꿈 아이스박스": { desc: "스위트 고릴라가 소지하는 아이스박스. 얼음 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [「레버리」 호텔-꿈세계]", "「만능 합성기」- 재료 치환"] },
  "수관(獸棺)의 못": { desc: "기갑 바이오닉 척추의 일부분. 번개 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [유폐옥]", "「만능 합성기」- 재료 치환"] },
  "만취의 시대 한잔": { desc: "극단 바텐더의 손에 들린 금잔의 술. 바람 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [페나코니 극장]", "「만능 합성기」- 재료 치환"] },
  "꿈 토치": { desc: "오버쿡의 요리용 토치. 양자 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [꿈 건축 경계]", "「만능 합성기」- 재료 치환"] },
  "한 곡으로 어우러진 환상": { desc: "극단 연주자가 지니고 있는 붉은 바디와 은빛 현의 악기. 허수 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [페나코니 극장]", "「만능 합성기」- 재료 치환"] },
  "침략 응괴": { desc: "검은 물결 창조물의 코어 결정체. 물리 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [「용해 고성」 스틱시아]", "「만능 합성기」- 재료 치환"] },
  "눈부신 홍염": { desc: "정오의 그리핀이 남긴 기이한 형태의 머리 장식. 화염 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [「신탁의 성지」 야누소폴리스]", "「만능 합성기」- 재료 치환"] },
  "세이렌의 지느러미 잔해": { desc: "파도 부인의 가시 모양 꼬리지느러미. 얼음 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [「노래의 해안」 스틱시아]", "「만능 합성기」- 재료 치환"] },
  "광뢰의 스트로크": { desc: "로큰롤 매니악들이 애용하는 악기. 번개 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [폭음의 형체]", "「만능 합성기」- 재료 치환"] },
  "석양에 불탄 꽃봉오리": { desc: "검은 태양의 그리핀 머리에 있는 침식 코어. 바람 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [「천궁 요새」 조석의 눈]", "「만능 합성기」- 재료 치환"] },
  "어두운 장막의 달빛": { desc: "달밤의 페가수스가 떨군 기이한 형태의 머리 장식. 양자 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [「잠꼬대의 밀림」 깨달음의 나무 정원]", "「만능 합성기」- 재료 치환"] },
  "분쟁의 전조": { desc: "천벌의 집정관이 짊어진 황금빛 원형 날. 허수 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영 [「운명의 심연」 야누소폴리스]", "「만능 합성기」- 재료 치환"] },
  "비웃는 광대 가면": { desc: "양자 속성 캐릭터의 승급 소재", type: "캐릭터 승급 재료", rarity: 4, sources: ["정체된 허영", "「만능 합성기」- 재료 치환"] }
};

export const CHARACTER_ASCENSION_DATA: Record<string, MaterialDetail> = { ...MANUAL_CHARACTER_ASCENSION_DATA };

// 위키 데이터(EN)와 인게임 수동 데이터(KO)를 100% 완벽하게 매칭시키는 명시적 사전 (승급 재료 29종)
const ASC_EN_TO_KO: Record<string, string> = {
  "Enigmatic Ectostella": "깊은 별의 외형질",
  "Broken Teeth of Iron Wolf": "강철 늑대의 깨진 이빨",
  "Endotherm Chitin": "상온 갑각",
  "Horn of Snow": "눈보라의 뿔",
  "Lightning Crown of the Past Shadow": "과거 그림자의 번개 왕관",
  "Storm Eye": "폭풍의 눈",
  "Void Cast Iron": "환영의 무쇠",
  "Golden Crown of the Past Shadow": "과거 그림자의 황금 장식",
  "Netherworld Token": "명부 명령",
  "Searing Steel Blade": "과열된 강철 칼날",
  "Gelid Chitin": "혹한 갑각",
  "Shape Shifter's Lightning Staff": "조형자의 번개 지팡이",
  "Ascendant Debris": "천인의 유해",
  "Nail of the Ape": "괴수의 못",
  "Suppressing Edict": "진령칙부",
  "IPC Work Permit": "스타피스 사원증",
  "Raging Heart": "격분한 심장",
  "Dream Fridge": "꿈 아이스박스",
  "Nail of the Beast Coffin": "수관(獸棺)의 못",
  "A Glass of the Besotted Era": "만취의 시대 한잔",
  "Dream Flamer": "꿈 토치",
  "Chordal Mirage": "한 곡으로 어우러진 환상",
  "Invasive Clot": "침략 응괴",
  "Radiant Prominence": "눈부신 홍염",
  "Sea Siren's Torn Fin": "세이렌의 지느러미 잔해",
  "Thunder Strum": "광뢰의 스트로크",
  "Charred Bud of Twilight": "석양에 불탄 꽃봉오리",
  "Darkveil Moonlight": "어두운 장막의 달빛",
  "Harbinger of Strife": "분쟁의 전조"
};

Object.values(ascApiData).forEach((item: any) => {
  const koName = ASC_EN_TO_KO[item.nameEn] || item.nameKo;
  if (CHARACTER_ASCENSION_DATA[koName]) {
    CHARACTER_ASCENSION_DATA[koName].enName = item.nameEn;
    CHARACTER_ASCENSION_DATA[koName].enDesc = item.enDesc;
    if (item.sources && item.sources.length > 0) {
      CHARACTER_ASCENSION_DATA[koName].enSources = item.sources;
    }
  }
});

const MANUAL_TRACE_PATH_DATA: Record<string, MaterialDetail> = {
  "꿈의 눈물": { desc: "봉인된 생각. 운명의 길 재료가 부족할 시 대체할 수 있다. 재료의 희귀도에 따라 필요한 꿈의 눈물의 양이 다르다", type: "행적 재료&광추 승급 재료", rarity: 4, sources: ["무명의 공훈"] },
  "부서진 칼날": { desc: "반물질 군단이 분실한 무기 조각. 파멸 캐릭터의 운명의 길 행적이 소폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 2, sources: ["모조 꽃받침 [보관 캐빈]", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "무생의 칼날": { desc: "반물질 군단이 분실한 무기 잔해. 파멸 캐릭터의 운명의 길 행적이 중폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 3, sources: ["모조 꽃받침 [보관 캐빈]", "「만능 합성기」- 재료 합성", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "정화의 칼날": { desc: "반물질 군단이 파손한 무기. 파멸 캐릭터의 운명의 길 행적이 대폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 4, sources: ["모조 꽃받침 [보관 캐빈]", "「만능 합성기」- 재료 합성", "「만능 합성기」- 재료 치환"] },
  "보리인의 송곳니": { desc: "보리인이 출정할 때 남긴 부서진 이빨. 파멸 캐릭터의 운명의 길 행적이 소폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 2, sources: ["모조 꽃받침 [인연경]", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "늑대 독 송곳니": { desc: "보리인이 출정할 때 남긴 흡혈 송곳니. 파멸 캐릭터의 운명의 길 행적이 중폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 3, sources: ["모조 꽃받침 [인연경]", "「만능 합성기」- 재료 합성", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "달의 광기 이빨": { desc: "보리인이 출정할 때 남긴 무시무시한 긴 이빨. 파멸 캐릭터의 운명의 길 행적이 대폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 4, sources: ["모조 꽃받침 [인연경]", "「만능 합성기」- 재료 합성", "「만능 합성기」- 재료 치환"] },
  "짐승 사냥용 화살": { desc: "선주 장인이 별의 한철로 단조한 화살촉. 수렵 캐릭터의 운명의 길 행적이 소폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 2, sources: ["모조 꽃받침 [외곽 설원]", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "악마 사냥용 화살": { desc: "선주 장인이 별의 천영으로 만든 화살. 수렵 캐릭터의 운명의 길 행적 중폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 3, sources: ["모조 꽃받침 [외곽 설원]", "「만능 합성기」- 재료 합성", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "별 쫓는 화살": { desc: "천궁의 사명이 발사한 화살 비의 조각. 수렵 캐릭터의 운명의 길 행적이 대폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 4, sources: ["모조 꽃받침 [외곽 설원]", "「만능 합성기」- 재료 합성", "「만능 합성기」- 재료 치환"] },
  "운철 탄환": { desc: "몬스터를 사냥하기 위해 만들어진 쇠구슬. 새겨진 자국이 죽인 사냥감의 수를 기록하는 듯하다. 수렵 캐릭터의 운명의 길 행적이 소폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 2, sources: ["모조 꽃받침 [솔글래드™ 뜨거운 모래 오디션장]", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "숙명적인 사인": { desc: "죽은 자의 미간에 박히고, 물체의 틈새를 관통한다. 이 탄환은 언제나 총알구멍이 있어야 할 곳에 있다. 수렵 캐릭터의 운명의 길 행적이 중폭 증가한다", type: "행적 재료&광추 승급 재료", rarity: 3, sources: ["모조 꽃받침 [솔글래드™ 뜨거운 모래 오디션장]", "「만능 합성기」- 재료 합성", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "시간을 역행하는 일격": { desc: "영원히 시간의 화살과 역행하는 나선형 탄두. 마치 시간을 거스르는 불사의 존재를 영원히 쫓는 사냥개 같다. 수렵 캐릭터의 운명의 길 행적이 대폭 증가한다", type: "행적 재료&광추 승급 재료", rarity: 4, sources: ["모조 꽃받침 [솔글래드™ 뜨거운 모래 오디션장]", "「만능 합성기」- 재료 합성", "「만능 합성기」- 재료 치환"] },
  "분쟁의 혈진": { desc: "크렘노스성의 장인들이 무기에 바를 때 사용하는 핏빛 수정 가루. 수렵 캐릭터의 운명의 길 행적이 소폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 2, sources: ["모조 꽃받침 [「기억이 묻힌 저편」 시간의 귀허]", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "전혼의 혈정": { desc: "크렘노스성의 장인들이 무기를 담금질할 때 응결되어 나온 핏빛 수정. 수렵 캐릭터의 운명의 길 행적이 중폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 3, sources: ["모조 꽃받침 [「기억이 묻힌 저편」 시간의 귀허]", "「만능 합성기」- 재료 합성", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "천벌의 혈창": { desc: "크렘노스성의 장인들이 생명과 존엄을 바쳐 주조해 낸 핏빛 장창. 수렵 캐릭터의 운명의 길 행적이 대폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 4, sources: ["모조 꽃받침 [「기억이 묻힌 저편」 시간의 귀허]", "「만능 합성기」- 재료 합성", "「만능 합성기」- 재료 치환"] },
  "영감의 열쇠": { desc: "고민하는 학자들의 손에 나타난 환상의 열쇠. 지식 캐릭터의 운명의 길 행적이 소폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 2, sources: ["모조 꽃받침 [리벳 타운]", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "계몽의 열쇠": { desc: "지혜로운 자들의 손에 나타난 환상의 열쇠. 지식 캐릭터의 운명의 길 행적이 중폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 3, sources: ["모조 꽃받침 [리벳 타운]", "「만능 합성기」- 재료 합성", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "지식의 열쇠": { desc: "은하 최고 천재의 손에 나타난 환상의 열쇠. 지식 캐릭터의 운명의 길 행적이 대폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 4, sources: ["모조 꽃받침 [리벳 타운]", "「만능 합성기」- 재료 합성", "「만능 합성기」- 재료 치환"] },
  "천체 모형": { desc: "천체 궤도를 모형화한 장치. 지식 캐릭터의 운명의 길 행적이 소폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 2, sources: ["모조 꽃받침", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "은하계 프레임": { desc: "은하계의 구조를 프레임으로 짠 모형. 지식 캐릭터의 운명의 길 행적이 중폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 3, sources: ["모조 꽃받침", "「만능 합성기」- 재료 합성", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "은하 모형판": { desc: "은하계 전체를 축소한 정밀한 모형판. 지식 캐릭터의 운명의 길 행적이 대폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 4, sources: ["모조 꽃받침", "「만능 합성기」- 재료 합성", "「만능 합성기」- 재료 치환"] },
  "거친 스케치": { desc: "시계 소년의 캐릭터 초고. 지식 캐릭터의 운명의 길 행적이 소폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 2, sources: ["모조 꽃받침 [페나코니 극장]", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "역동적인 선화": { desc: "시계 소년의 캐릭터 원고. 지식 캐릭터의 운명의 길 행적이 중폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 3, sources: ["모조 꽃받침 [페나코니 극장]", "「만능 합성기」- 재료 합성", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "정교한 컬러 원고": { desc: "시계 소년의 캐릭터 컬러 원고. 지식 캐릭터의 운명의 길 행적이 대폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 4, sources: ["모조 꽃받침 [페나코니 극장]", "「만능 합성기」- 재료 합성", "「만능 합성기」- 재료 치환"] },
  "청동의 집념": { desc: "청동으로 연마한 오래된 손방패. 보존 캐릭터의 운명의 길 행적이 소폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 2, sources: ["모조 꽃받침 [서포트 캐빈]", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "한철의 맹세": { desc: "미지의 합금으로 연마한 실드. 보존 캐릭터의 운명의 길 행적이 중폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 3, sources: ["모조 꽃받침 [서포트 캐빈]", "「만능 합성기」- 재료 합성", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "앰버의 수호": { desc: "기이한 대형 실드. 보존 캐릭터의 운명의 길 행적이 대폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 4, sources: ["모조 꽃받침 [서포트 캐빈]", "「만능 합성기」- 재료 합성", "「만능 합성기」- 재료 치환"] },
  "흩어진 별모래": { desc: "앰버 로드가 망치를 휘두를 때 몸에서 떨어진 모래. 보존 캐릭터의 운명의 길 행적이 소폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 2, sources: ["모조 꽃받침 [클락 스튜디오 테마파크]", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "유성 결정": { desc: "앰버 로드가 망치를 휘두를 때 몸에서 떨어져 나온 결정석. 보존 캐릭터의 운명의 길 행적이 중폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 3, sources: ["모조 꽃받침 [클락 스튜디오 테마파크]", "「만능 합성기」- 재료 합성", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "신성한 앰버": { desc: "앰버 로드가 망치를 휘두를 때 몸에서 떨어진 앰버. 보존 캐릭터의 운명의 길 행적이 대폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 4, sources: ["모조 꽃받침 [클락 스튜디오 테마파크]", "「만능 합성기」- 재료 합성", "「만능 합성기」- 재료 치환"] },
  "어두운 흑요": { desc: "허공에서 얻은 검은 물질 조각. 공허 캐릭터의 운명의 길 행적이 소폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 2, sources: ["모조 꽃받침 [큰 광산구역]", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "허공의 흑요": { desc: "허공에서 얻은 검은 물질 덩어리. 공허 캐릭터의 운명의 길 행적이 중폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 3, sources: ["모조 꽃받침 [큰 광산구역]", "「만능 합성기」- 재료 합성", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "타락의 흑요": { desc: "허공에서 얻은 검은 물질. 공허 캐릭터의 운명의 길 행적이 대폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 4, sources: ["모조 꽃받침 [큰 광산구역]", "「만능 합성기」- 재료 합성", "「만능 합성기」- 재료 치환"] },
  "열렬의 영혼": { desc: "「화겁대전」 후 흩어진 연약한 세양. 공허 캐릭터의 운명의 길 행적이 소폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 2, sources: ["모조 꽃받침 [단정사]", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "불꽃의 정령": { desc: "「화겁대전」 후 도망 다니는 세양. 공허 캐릭터의 운명의 길 행적이 중폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 3, sources: ["모조 꽃받침 [단정사]", "「만능 합성기」- 재료 합성", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "천공을 불태우는 마귀": { desc: "「화겁대전」 후 모인 짐승 형상의 세양. 공허 캐릭터의 운명의 길 행적이 대폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 4, sources: ["모조 꽃받침 [단정사]", "「만능 합성기」- 재료 합성", "「만능 합성기」- 재료 치환"] },
  "파구사의 눈물": { desc: "유리처럼 응결된 물방울. 공허 캐릭터의 운명의 길 행적이 소폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 2, sources: ["모조 꽃받침", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "파구사의 술": { desc: "충만한 잔에서 흘러나오는 파도. 공허 캐릭터의 운명의 길 행적이 중폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 3, sources: ["모조 꽃받침", "잔화 교환", "「만능 합성기」- 재료 합성", "「만능 합성기」- 재료 치환"] },
  "파구사의 심장": { desc: "수많은 파도가 얽히고설켜 만들어진 결정. 공허 캐릭터의 운명의 길 행적이 대폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 4, sources: ["모조 꽃받침", "「만능 합성기」- 재료 합성", "「만능 합성기」- 재료 치환"] },
  "조화의 가락": { desc: "제작자 미상의 정교한 오르골. 화합 캐릭터의 운명의 길 행적이 소폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 2, sources: ["모조 꽃받침 [기계 부락]", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "가족의 찬가": { desc: "제작자 미상의 알 수 없는 정교한 오르골. 화합 캐릭터의 운명의 길 행적이 중폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 3, sources: ["모조 꽃받침 [기계 부락]", "「만능 합성기」- 재료 합성", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "별들의 악장": { desc: "제작자 미상의 정교한 오르골. 구조가 굉장히 복잡하다. 화합 캐릭터의 운명의 길 행적이 대폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 4, sources: ["모조 꽃받침 [기계 부락]", "「만능 합성기」- 재료 합성", "「만능 합성기」- 재료 치환"] },
  "구름 위 음표": { desc: "구름 끝에서 떨어진 음표. 화합 캐릭터의 운명의 길 행적이 소폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 2, sources: ["모조 꽃받침 [「레버리」 호텔-꿈세계]", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "천상의 소절": { desc: "하늘에서 떨어진 악구의 소절. 화합 캐릭터의 운명의 길 행적이 중폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 3, sources: ["모조 꽃받침 [「레버리」 호텔-꿈세계]", "「만능 합성기」- 재료 합성", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "천외의 악장": { desc: "우주에서 들려오는 교향 악장. 화합 캐릭터의 운명의 길 행적이 대폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 4, sources: ["모조 꽃받침 [「레버리」 호텔-꿈세계]", "「만능 합성기」- 재료 합성", "「만능 합성기」- 재료 치환"] },
  "풍요의 씨앗": { desc: "풍요의 신이 뿌린 축복의 씨앗. 풍요 캐릭터의 운명의 길 행적이 소폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 2, sources: ["모조 꽃받침 [변방 통로]", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "생명의 새싹": { desc: "풍요의 씨앗에서 돋아난 새싹. 풍요 캐릭터의 운명의 길 행적이 중폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 3, sources: ["모조 꽃받침 [변방 통로]", "「만능 합성기」- 재료 합성", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "영원의 꽃": { desc: "생명의 새싹에서 피어난 아름다운 꽃. 풍요 캐릭터의 운명의 길 행적이 대폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 4, sources: ["모조 꽃받침 [변방 통로]", "「만능 합성기」- 재료 합성", "「만능 합성기」- 재료 치환"] },
  "이계 나무의 씨앗": { desc: "다양한 종의 유전자를 담고 있는 씨앗. 풍요 캐릭터의 운명의 길 행적이 소폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 2, sources: ["모조 꽃받침 [유원]", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "생장의 꽃꿀": { desc: "생명의 성장을 촉진하는 꿀. 풍요 캐릭터의 운명의 길 행적이 중폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 3, sources: ["모조 꽃받침 [유원]", "「만능 합성기」- 재료 합성", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "만상의 과실": { desc: "중생의 만상을 담고 있는 열매. 풍요 캐릭터의 운명의 길 행적이 대폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 4, sources: ["모조 꽃받침 [유원]", "「만능 합성기」- 재료 합성", "「만능 합성기」- 재료 치환"] },
  "사량의 씨앗": { desc: "기억의 배아. 기억 캐릭터의 운명의 길 행적이 소폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 2, sources: ["모조 꽃받침 [「분쟁의 폐허」 크렘노스성]", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "말나 새싹": { desc: "기억의 세포. 기억 캐릭터의 운명의 길 행적이 중폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 3, sources: ["모조 꽃받침 [「분쟁의 폐허」 크렘노스성]", "「만능 합성기」- 재료 합성", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "아뢰야 꽃": { desc: "기억의 물질. 기억 캐릭터의 운명의 길 행적이 대폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 4, sources: ["모조 꽃받침 [「분쟁의 폐허」 크렘노스성]", "「만능 합성기」- 재료 합성", "「만능 합성기」- 재료 치환"] },
  "≪복슬복슬호≫ 수작업 스토리보드": { desc: "스토리보드 단계의 작품. 환락 캐릭터의 운명의 길 행적이 소폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 2, sources: ["모조 꽃받침 「세상 끝」술집", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "≪복슬복슬호≫ 연재 기념호": { desc: "잡지 연재 중인 작품. 환락 캐릭터의 운명의 길 행적이 중폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 3, sources: ["모조 꽃받침 「세상 끝」술집", "「만능 합성기」- 재료 합성", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "≪복슬복슬호≫ 소장판 합본": { desc: "단행본 발행된 작품. 환락 캐릭터의 운명의 길 행적이 대폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 4, sources: ["모조 꽃받침 「세상 끝」술집", "「만능 합성기」- 재료 합성", "「만능 합성기」- 재료 치환"] },
  "사상, 도하장군": { desc: "파멸 캐릭터의 운명의 길 행적이 소폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 2, sources: ["모조 꽃받침", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "육합, 왕수비차": { desc: "파멸 캐릭터의 운명의 길 행적이 중폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 3, sources: ["모조 꽃받침", "「만능 합성기」- 재료 합성", "잔화 교환", "「만능 합성기」- 재료 치환"] },
  "만색, 풀스 메이트": { desc: "파멸 캐릭터의 운명의 길 행적이 대폭 상승한다", type: "행적 재료&광추 승급 재료", rarity: 4, sources: ["모조 꽃받침", "「만능 합성기」- 재료 합성", "「만능 합성기」- 재료 치환"] }
};

export const TRACE_PATH_DATA: Record<string, MaterialDetail> = { ...MANUAL_TRACE_PATH_DATA };

const MANUAL_ADVANCED_TRACE_DATA: Record<string, MaterialDetail> = {
  "운명의 발자취": { desc: "행적 레벨업의 고급 소재", type: "행적 재료", rarity: 5, sources: ["시뮬레이션 우주 점수 보상", "무명의 공훈", "잔화 교환", "스타라이트 교환", "한정 이벤트 보상"] },
  "파멸자의 말로": { desc: "행적 레벨업의 고급 소재", type: "행적 재료", rarity: 4, sources: ["전쟁의 여운 [서포트 캐빈]"] },
  "수호자의 비원(悲願)": { desc: "행적 레벨업의 고급 소재", type: "행적 재료", rarity: 4, sources: ["전쟁의 여운 [영원한 겨울의 골짜기]"] },
  "무한한 가짜의 여한": { desc: "행적 레벨업의 고급 소재", type: "행적 재료", rarity: 4, sources: ["전쟁의 여운 [인연경]"] },
  "별을 갉아먹고 재앙을 낳는 구악": { desc: "행적 레벨업의 고급 소재", type: "행적 재료", rarity: 4, sources: ["전쟁의 여운 [폐쇄된 캐빈]"] },
  "공동의 염원의 유음": { desc: "행적 레벨업의 고급 소재", type: "행적 재료", rarity: 4, sources: ["전쟁의 여운 [페나코니 극장]"] },
  "길광편우": { desc: "행적 레벨업의 고급 소재", type: "행적 재료", rarity: 4, sources: ["전쟁의 여운 [경기 함선]"] },
  "태양과 번개의 회상": { desc: "행적 레벨업의 고급 소재", type: "행적 재료", rarity: 4, sources: ["전쟁의 여운 [「천궁 요새」 조석의 눈]"] },
  "범람을 끊는 침묵": { desc: "행적 레벨업의 고급 소재", type: "행적 재료", rarity: 4, sources: ["전쟁의 여운 [「기억이 묻힌 저편」 시간의 귀허]"] },
  "거짓 선각자의 기대": {
    desc: "웃음을 잃은 우인은 문명과 끊임없이 게임을 즐긴다. 타인이든 자신이든, 도전하지 않는 자는 환락을 얻을 수 없다.\n어제는 시들고, 영웅은 죽었다. 사악한 악당은 뭇별을 누비며 온갖 악의를 쏟아붓지만, 그러면서도 누군가 마왕을 물리치고 오랫동안 준비해 둔 보상을 가져가기를 기다리고 있다.",
    type: "행적 재료",
    rarity: 4,
    sources: ["전쟁의 여운 [적멸의 향연 데몬 시티]"]
  }
};

export const ADVANCED_TRACE_DATA: Record<string, MaterialDetail> = { ...MANUAL_ADVANCED_TRACE_DATA };

const TRACE_EN_TO_KO: Record<string, string> = {
  "Tears of Dreams": "꿈의 눈물",
  "Shattered Blade": "부서진 칼날", "Lifeless Blade": "무생의 칼날", "Worldbreaker Blade": "정화의 칼날",
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

Object.values(traceApiData).forEach((item: any) => {
  const koName = TRACE_EN_TO_KO[item.nameEn] || item.nameKo;
  if (TRACE_PATH_DATA[koName]) { TRACE_PATH_DATA[koName].enName = item.nameEn; TRACE_PATH_DATA[koName].enDesc = item.enDesc; if (item.sources && item.sources.length > 0) TRACE_PATH_DATA[koName].enSources = item.sources; }
  if (ADVANCED_TRACE_DATA[koName]) { ADVANCED_TRACE_DATA[koName].enName = item.nameEn; ADVANCED_TRACE_DATA[koName].enDesc = item.enDesc; if (item.sources && item.sources.length > 0) ADVANCED_TRACE_DATA[koName].enSources = item.sources; }
});

const MANUAL_COMMON_DROP_DATA: Record<string, MaterialDetail> = {
  "영의 눈물": { desc: "생명의 영을 봉인한 감옥. 적 드랍 재료가 부족할 시 대체할 수 있다. 재료의 희귀도에 따라 필요한 영의 눈물의 양이 다르다", type: "행적 재료&캐릭터 승급 재료", rarity: 4, sources: ["「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍"] },
  "소멸된 코어": { desc: "열계를 배회하는 괴물의 심장. 강화에 필요한 기본 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 2, sources: ["일부 열계 창조물 드랍", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "의뢰 보상", "잔화 교환", "「만능 합성기」- 재료 치환", "모조 꽃받침(금)"] },
  "희미한 빛의 코어": { desc: "열계를 배회하는 괴물의 심장. 강화에 필요한 일반 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 3, sources: ["균형 레벨 Lv.2까지 돌파 후 일부 열계 창조물 드랍", "「만능 합성기」- 재료 합성", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "「만능 합성기」- 재료 치환"] },
  "꿈틀대는 코어": { desc: "열계를 배회하는 괴물의 심장. 강화에 필요한 고급 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 4, sources: ["균형 레벨 Lv.4까지 돌파 후 일부 열계 창조물 드랍", "「만능 합성기」- 재료 합성", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "「만능 합성기」- 재료 치환"] },
  "약탈의 본능": { desc: "미약한 반물질. 강화에 필요한 기본 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 2, sources: ["반물질 군단 드랍", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "의뢰 보상", "잔화 교환", "「만능 합성기」- 재료 치환", "모조 꽃받침(금)"] },
  "변조된 야망": { desc: "희박한 반물질. 강화에 필요한 일반 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 3, sources: ["균형 레벨 Lv.2까지 돌파 후 반물질 군단 드랍", "「만능 합성기」- 재료 합성", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "「만능 합성기」- 재료 치환"] },
  "짓밟힌 의지": { desc: "희박한 반물질. 강화에 필요한 고급 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 4, sources: ["균형 레벨 Lv.4까지 돌파 후 반물질 군단 드랍", "「만능 합성기」- 재료 합성", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "「만능 합성기」- 재료 치환"] },
  "철위대 배지": { desc: "실버메인 철위대 병사가 착용한 배지. 강화에 필요한 기본 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 2, sources: ["실버메인 철위대 드랍", "부랑자 드랍", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "의뢰 보상", "잔화 교환", "「만능 합성기」- 재료 치환", "모조 꽃받침(금)"] },
  "철위대 표식": { desc: "실버메인 철위대 대장이 착용한 계급장. 강화에 필요한 일반 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 3, sources: ["균형 레벨 Lv.2까지 돌파 후 실버메인 철위대 드랍", "균형 레벨 Lv.2까지 돌파 후 부랑자 드랍", "「만능 합성기」- 재료 합성", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "「만능 합성기」- 재료 치환"] },
  "철위대 훈장": { desc: "공훈을 세운 실버메인 철위대의 무공훈장. 강화에 필요한 고급 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 4, sources: ["균형 레벨 Lv.4까지 돌파 후 실버메인 철위대 드랍", "균형 레벨 Lv.4까지 돌파 후 부랑자 드랍", "「만능 합성기」- 재료 합성", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "「만능 합성기」- 재료 치환"] },
  "고대 부속품": { desc: "구세계 시대로부터 남겨진 기계 부속품. 강화에 필요한 기본 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 2, sources: ["자동 기갑병 드랍", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "의뢰 보상", "잔화 교환", "「만능 합성기」- 재료 치환", "모조 꽃받침(금)"] },
  "고대 전동축": { desc: "구세계 시대로부터 남겨진 기계 전동축. 강화에 필요한 일반 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 3, sources: ["균형 레벨 Lv.2까지 돌파 후 자동 기갑병 드랍", "「만능 합성기」- 재료 합성", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "「만능 합성기」- 재료 치환"] },
  "고대 엔진": { desc: "구세계 시대로부터 남겨진 기계 엔진. 강화 시 필요한 고급 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 4, sources: ["균형 레벨 Lv.4까지 돌파 후 자동 기갑병 드랍", "「만능 합성기」- 재료 합성", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "「만능 합성기」- 재료 치환"] },
  "영생의 새싹": { desc: "고대 신물에서 발아한 새싹. 강화에 필요한 기본 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 2, sources: ["풍요의 흉물 드랍", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "의뢰 보상", "잔화 교환", "「만능 합성기」- 재료 치환", "모조 꽃받침(금)"] },
  "영생의 꽃": { desc: "고대 신물에서 피어난 꽃. 강화에 필요한 일반 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 3, sources: ["균형 레벨 Lv.2까지 돌파 후 풍요의 흉물 드랍", "「만능 합성기」- 재료 합성", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "「만능 합성기」- 재료 치환"] },
  "영생의 가지": { desc: "고대 신물에서 뻗어나온 가지. 강화에 필요한 고급 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 4, sources: ["균형 레벨 Lv.4까지 돌파 후 풍요의 흉물 드랍", "「만능 합성기」- 재료 합성", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "「만능 합성기」- 재료 치환"] },
  "공조 기계 부품": { desc: "선주의 기계부품. 강화에 필요한 기본 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 2, sources: ["신들린 기교 드랍", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "의뢰 보상", "잔화 교환", "「만능 합성기」- 재료 치환", "모조 꽃받침(금)"] },
  "공조 톱니바퀴": { desc: "선주의 기계부품. 강화에 필요한 일반 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 3, sources: ["균형 레벨 Lv.2까지 돌파 후 신들린 기교 드랍", "「만능 합성기」- 재료 합성", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "「만능 합성기」- 재료 치환"] },
  "공조 환류 심장": { desc: "선주의 기계부품. 강화에 필요한 고급 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 4, sources: ["균형 레벨 Lv.4까지 돌파 후 신들린 기교 드랍", "「만능 합성기」- 재료 합성", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "「만능 합성기」- 재료 치환"] },
  "꿈 저장 부품": { desc: "꿈세계 창조물의 에너지 저장 장치. 강화에 필요한 기본 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 2, sources: ["나쁜꿈 극단 드랍", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "의뢰 보상", "잔화 교환", "「만능 합성기」- 재료 치환", "모조 꽃받침(금)"] },
  "꿈 흐름 밸브": { desc: "꿈세계 창조물의 제어 부품. 강화에 필요한 일반 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 3, sources: ["균형 레벨 Lv.2까지 돌파 후 나쁜꿈 극단 드랍", "「만능 합성기」- 재료 합성", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "「만능 합성기」- 재료 치환"] },
  "꿈 제조 모터": { desc: "꿈세계 창조물의 동력 코어. 강화에 필요한 고급 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 4, sources: ["균형 레벨 Lv.4까지 돌파 후 나쁜꿈 극단 드랍", "「만능 합성기」- 재료 합성", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "「만능 합성기」- 재료 치환"] },
  "생각의 가루": { desc: "짧은 생각의 기억 물질 조각. 강화에 필요한 기본 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 2, sources: ["기억의 영역 밈 드랍", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "의뢰 보상", "잔화 교환", "「만능 합성기」- 재료 치환", "모조 꽃받침(금)"] },
  "인상의 파편": { desc: "깊게 남은 인상의 기억 물질 조각. 강화에 필요한 일반 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 3, sources: ["균형 레벨 Lv.2까지 돌파 후 기억의 영역 밈 드랍", "「만능 합성기」- 재료 합성", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "「만능 합성기」- 재료 치환"] },
  "욕망의 거울 조각": { desc: "오랜 욕망의 기억 물질 조각. 강화에 필요한 고급 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 4, sources: ["균형 레벨 Lv.4까지 돌파 후 기억의 영역 밈 드랍", "「만능 합성기」- 재료 합성", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "「만능 합성기」- 재료 치환"] },
  "공포에 짓밟힌 육신": { desc: "분쟁의 권속을 구성하는 먼지. 강화에 필요한 기본 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 2, sources: ["티탄 권속 드랍", "조석의 환수 드랍", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "의뢰 보상", "잔화 교환", "「만능 합성기」- 재료 치환", "모조 꽃받침(금)"], enSources: ["Dependents of strife", "Dropped by enemies in Divergent Universe", "Simulated Universe enemies", "Assignment rewards", "Embers Exchange", "Omni-Synthesizer Material Exchange", "Calyx (Golden)"] },
  "용기에 찢긴 가슴": { desc: "분쟁의 권속이 전사한 후 남은 조각. 강화에 필요한 일반 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 3, sources: ["균형 레벨 Lv.2까지 돌파 후 티탄 권속 드랍", "균형 레벨 Lv.2까지 돌파 후 조석의 환수 드랍", "「만능 합성기」- 재료 합성", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "「만능 합성기」- 재료 치환"], enSources: ["Dependents of strife at Equilibrium Level 2 or higher", "Omni-Synthesizer Material Synthesis", "Dropped by enemies in Divergent Universe", "Simulated Universe enemies", "Omni-Synthesizer Material Exchange"] },
  "영광의 세례를 받은 육신": { desc: "분쟁의 권속의 신력으로 가득 찬 심장. 강화에 필요한 고급 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 4, sources: ["균형 레벨 Lv.4까지 돌파 후 티탄 권속 드랍", "균형 레벨 Lv.4까지 돌파 후 조석의 환수 드랍", "「만능 합성기」- 재료 합성", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "「만능 합성기」- 재료 치환"], enSources: ["Dependents of strife at Equilibrium Level 4 or higher", "Omni-Synthesizer Material Synthesis", "Dropped by enemies in Divergent Universe", "Simulated Universe enemies", "Omni-Synthesizer Material Exchange"] },
  "있는 듯 없는 듯한 조짐": { desc: "검은 물결 창조물의 몸에서 떨어진 조각. 강화에 필요한 기본 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 2, sources: ["검은 물결 창조물 드랍", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "의뢰 보상", "잔화 교환", "「만능 합성기」- 재료 치환", "모조 꽃받침(금)"], enSources: ["Black Tide Creations", "Dropped by enemies in Divergent Universe", "Simulated Universe enemies", "Assignment rewards", "Embers Exchange", "Omni-Synthesizer Material Exchange", "Calyx (Golden)"] },
  "점점 가까워지는 비명": { desc: "검은 물결 창조물의 몸을 구성하는 부분. 강화에 필요한 일반 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 3, sources: ["균형 레벨 Lv.2까지 돌파 후 검은 물결 창조물 드랍", "「만능 합성기」- 재료 합성", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "「만능 합성기」- 재료 치환"], enSources: ["Black Tide Creations at Equilibrium Level 2 or higher", "Omni-Synthesizer Material Synthesis", "Dropped by enemies in Divergent Universe", "Simulated Universe enemies", "Omni-Synthesizer Material Exchange"] },
  "끝없는 탄식": { desc: "검은 물결 창조물이 죽은 후 응집된 결정체. 강화에 필요한 고급 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 4, sources: ["균형 레벨 Lv.4까지 돌파 후 검은 물결 창조물 드랍", "「만능 합성기」- 재료 합성", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "「만능 합성기」- 재료 치환"], enSources: ["Black Tide Creations at Equilibrium Level 4 or higher", "Omni-Synthesizer Material Synthesis", "Dropped by enemies in Divergent Universe", "Simulated Universe enemies", "Omni-Synthesizer Material Exchange"] },
  "천진난만 크레파스": { desc: "환조 생물의 원력 조각. 강화에 필요한 기본 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 2, sources: ["환조 생물 드랍", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "의뢰 보상", "잔화 교환", "「만능 합성기」- 재료 치환", "모조 꽃받침(금)"] },
  "꿈을 만드는 딥 펜": { desc: "환조 생물의 원력 조각. 강화에 필요한 일반 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 3, sources: ["균형 레벨 Lv.2까지 돌파 후 환조 생물 드랍", "「만능 합성기」- 재료 합성", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "「만능 합성기」- 재료 치환"] },
  "꿈을 그리는 붓": { desc: "환조 생물의 원력 조각. 강화에 필요한 고급 재료", type: "행적 재료&캐릭터 승급 재료", rarity: 4, sources: ["균형 레벨 Lv.4까지 돌파 후 환조 생물 드랍", "「만능 합성기」- 재료 합성", "「차분화 우주」 적 드랍", "「시뮬레이션 우주」 적 드랍", "「만능 합성기」- 재료 치환"] }
};

export const COMMON_DROP_DATA: Record<string, MaterialDetail> = { ...MANUAL_COMMON_DROP_DATA };

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

Object.values(commonApiData).forEach((item: any) => {
  const koName = COMMON_EN_TO_KO[item.nameEn] || item.nameKo;
  if (COMMON_DROP_DATA[koName]) {
    COMMON_DROP_DATA[koName].enName = item.nameEn;
    COMMON_DROP_DATA[koName].enDesc = item.enDesc;
    if (item.sources && item.sources.length > 0) {
      COMMON_DROP_DATA[koName].enSources = item.sources;
    }
  }
});

export const SYNTHESIS_MATERIAL_DATA: Record<string, ItemDetail> = {
  "고체 정수": { desc: "수소와 산소 두 가지 원소로 이루어진 화합물이며 탄소 기반 생물체의 생명 근원이다.", type: "합성 소재", rarity: 1, sources: ["중입자 등 적 드랍 [보관 캐빈]", "「야릴로-Ⅵ」 파괴 가능한 물체 드랍", "행정구역 상점", "모조 꽃받침(금)"] },
  "기본 식자재": { desc: "먹을 수 있지만 맛이 없는 것을 보통 식자재라고 한다. 가장 기본적인 배를 채우는 수단이다.", type: "합성 소재", rarity: 1, sources: ["「우주정거장 『헤르타』」 파괴 가능한 물체 드랍", "행정구역 상점"] },
  "플로지스톤": { desc: "불꽃을 구성하는 미세한 입자. 지니어스 클럽 멤버들 간의 피비린내 나는 증명 역사가 담겨 있다.", type: "합성 소재", rarity: 1, sources: ["염화 조물 등 적 드랍 [변방 통로]", "「우주정거장 『헤르타』」 파괴 가능한 물체 드랍", "행정구역 상점"] },
  "금속": { desc: "지각과 해양에 널리 존재하는 물질. 용도가 매우 많아서 다양한 곳에 쓰인다.", type: "합성 소재", rarity: 1, sources: ["「우주정거장 『헤르타』」 파괴 가능한 물체 드랍", "행정구역 상점"] },
  "가스성 유체": { desc: "안개 같기도, 비 같기도, 바람 같기도 하다. 뚜껑을 열기 전에는 존재 유무조차 알 수 없다.", type: "합성 소재", rarity: 1, sources: ["「야릴로-Ⅵ」 파괴 가능한 물체 드랍", "잡화 노점", "행정구역 상점", "모조 꽃받침(금)"] },
  "씨앗": { desc: "식물 특유의 번식체. 대부분의 경우 생명의 상징이며, 일부의 경우 맛이 좋다.", type: "합성 소재", rarity: 1, sources: ["「야릴로-Ⅵ」 파괴 가능한 물체 드랍", "잡화 노점", "행정구역 상점"] },
  "폐기된 기교 부속품": { desc: "기교에 통달하고 낭비를 못 참는 자에게만은 활용 가능한 보물로 보인다.", type: "합성 소재", rarity: 1, sources: ["의뢰 보상", "고물 점포", "모조 꽃받침(금)"] },
  "사람 높이의 큰 벼": { desc: "잘 익은 벼. 놀라운 것은 높이가 사람만 하다는 것이다.", type: "합성 소재", rarity: 1, sources: ["의뢰 보상", "장수당", "모조 꽃받침(금)"] },
  "편안함": { desc: "금요일 밤, 집으로 돌아와 냉큼 침대로 뛰어들었고, 앞으로 이틀간 나오지 않을 생각이다.", type: "합성 소재", rarity: 1, sources: ["기억의 영역 밈 등 적 드랍", "「페나코니」 파괴 가능한 물체 드랍", "의뢰 보상", "모조 꽃받침(금)"] },
  "꿈의 파편": { desc: "이런 조각은 페나코니 곳곳에서 찾을 수 있다. 원래 부서진 마음들의 일부였다.", type: "합성 소재", rarity: 1, sources: ["기억의 영역 밈 등 적 드랍", "「페나코니」 파괴 가능한 물체 드랍", "의뢰 보상", "모조 꽃받침(금)"] },
  "녹슨 톱니바퀴": { desc: "톱니바퀴 자체는 흔하지만, 규격에 맞는 것을 구하는 건 쉽지 않다.", type: "합성 소재", rarity: 1, sources: ["나쁜꿈 극단 등 적 드랍", "「페나코니」 파괴 가능한 물체 드랍", "의뢰 보상", "퍼디난드"] },
  "눈에 띄는 깃털": { desc: "아퀼라 티탄의 상징이 새겨진 깃털이다. 하늘과 가까운 절벽에서 발견된다.", type: "합성 소재", rarity: 1, sources: ["천벌의 투사 등 적 드랍", "「앰포리어스」 파괴 가능한 물체 드랍", "의뢰 보상", "모조 꽃받침(금)"] },
  "부속품": { desc: "기계의 중요한 구성 요소. 인류의 모든 발명과 창조의 초석이다.", type: "합성 소재", rarity: 2, sources: ["자동 기갑병 등 적 드랍", "「우주정거장 『헤르타』」 파괴 가능한 물체 드랍", "행정구역 상점", "모조 꽃받침(금)"] },
  "가상 입자": { desc: "우주에 보편적으로 존재하지만, 이론적으로 관측할 수 없는 미세 입자.", type: "합성 소재", rarity: 2, sources: ["중입자 등 적 드랍", "「우주정거장 『헤르타』」 파괴 가능한 물체 드랍", "잡화 노점", "행정구역 상점"] },
  "단백질 쌀": { desc: "문명에게 주는 자연의 선물. 단백질의 윤기와 식감이 풍부한 쌀알이다.", type: "합성 소재", rarity: 2, sources: ["허졸•약탈자 등 적 드랍", "「우주정거장 『헤르타』」 파괴 가능한 물체 드랍", "잡화 노점"] },
  "화염 깃털": { desc: "따스한 검은색 깃털. 마치 불꽃에서 막 꺼낸 것처럼 미약한 불빛이 서려 있다.", type: "합성 소재", rarity: 2, sources: ["마각의 몸 병사 등 적 드랍", "「야릴로-Ⅵ」 파괴 가능한 물체 드랍", "행정구역 상점"] },
  "얼음 코어": { desc: "우주에서 떨어진 얼음 조각. 저온에서 응축된 수증기가 마치 겨울의 한숨 같다.", type: "합성 소재", rarity: 2, sources: ["영원한 겨울의 재난 등 적 드랍", "행정구역 상점"] },
  "번개의 눈": { desc: "뇌광을 포획해서 만든 뇌전 오브. 즉시 동그란 뇌전을 방출한다.", type: "합성 소재", rarity: 2, sources: ["영원한 겨울의 재난 등 적 드랍", "잡화 노점", "행정구역 상점"] },
  "바람의 소용돌이": { desc: "풍안은 고요함을 유지하고 있다. 진공 상태에서도 소용돌이는 멈추지 않는다.", type: "합성 소재", rarity: 2, sources: ["마각의 몸 병사 등 적 드랍", "「야릴로-Ⅵ」 파괴 가능한 물체 드랍", "잡화 노점", "행정구역 상점"] },
  "양자의 물결": { desc: "만물에 존재하는 가장 기초적인 에너지 변동 현상이다.", type: "합성 소재", rarity: 2, sources: ["허수 방직꾼 등 적 드랍", "행정구역 상점"] },
  "허수의 잎": { desc: "추상적인 무언가가 실체화된 것에 가깝다. 사라졌지만 남아있는 힘을 나타낸다.", type: "합성 소재", rarity: 2, sources: ["염화 조물 등 적 드랍", "잡화 노점", "모조 꽃받침(금)"] },
  "운철": { desc: "천외에서 온 이 물건은 커다란 바위조차도 부숴버릴 수 있을 정도로 단단하다.", type: "합성 소재", rarity: 2, sources: ["자동 기갑병 등 적 드랍", "「야릴로-Ⅵ」 파괴 가능한 물체 드랍", "행정구역 상점"] },
  "옥조 유닛": { desc: "가장 기본적인 옥조 부속품. 설치의 마지막 단계에서 많이 사용된다.", type: "합성 소재", rarity: 2, sources: ["의뢰 보상", "고물 점포"] },
  "약초 추출물": { desc: "약초 속의 유효성분을 추출한 것으로, 약효를 더욱 강력하게 해준다.", type: "합성 소재", rarity: 2, sources: ["의뢰 보상", "장수당"] },
  "인연천동": { desc: "파월고해의 얕은 여울에 널리 분포하고 있다. 야생이 약효가 좋다는 미신이 있다.", type: "합성 소재", rarity: 2, sources: ["링링의 약방", "모조 꽃받침(금)"] },
  "아득함": { desc: "당신에게 어떤 말로 내가 생각하는 「아득함」을 설명할지 생각하고 있다.", type: "합성 소재", rarity: 2, sources: ["기억의 영역 밈 등 적 드랍", "「페나코니」 파괴 가능한 물체 드랍", "모조 꽃받침(금)"] },
  "허기": { desc: "페나코니에서 비싼 향료다. 꿈세계 바깥에서 그것은 죽음 입가의 미소다.", type: "합성 소재", rarity: 2, sources: ["기억의 영역 밈 등 적 드랍", "「페나코니」 파괴 가능한 물체 드랍"] },
  "낡은 어금니": { desc: "심하게 낙후된 시대의 이빨. 현대에는 사라진 공예와 반항 정신을 지니고 있다.", type: "합성 소재", rarity: 2, sources: ["나쁜꿈 극단 등 적 드랍", "「페나코니」 파괴 가능한 물체 드랍", "의뢰 보상", "퍼디난드"] },
  "사유가 묻힌 가지": { desc: "곁가지가 제멋대로 뻗은 모습이 자연스레 갈라진 생각 같다.", type: "합성 소재", rarity: 2, sources: ["천벌의 투사 등 적 드랍", "「앰포리어스」 파괴 가능한 물체 드랍", "의뢰 보상"] },
  "심수 암염": { desc: "골짜기 깊은 곳에서 캐낸 소금 결정체. 척박한 땅을 비옥하게 할 수 있다.", type: "합성 소재", rarity: 2, sources: ["천벌의 투사 등 적 드랍", "「앰포리어스」 파괴 가능한 물체 드랍", "모조 꽃받침(금)"] },
  "파멸의 이물질": { desc: "차갑지도 뜨겁지도 않으며 12초 이상 접촉한 다른 물질을 파괴하기도 한다.", type: "합성 소재", rarity: 3, sources: ["허졸•약탈자 등 적 드랍"] },
  "풍요의 향기": { desc: "은은한 향기를 풍기는 젤리 같은 물체. 만져보기만 해도 희망이 생긴다.", type: "합성 소재", rarity: 3, sources: ["마각의 몸 병사 등 적 드랍"] },
  "수렵석": { desc: "사명에 이끌려 계속 어떤 방향으로 천천히 이동하는 돌멩이다.", type: "합성 소재", rarity: 3, sources: ["잡화 노점"] },
  "보존의 건축 자재": { desc: "물과 결합하면 반죽이 되고 공기와 접촉하면 고체로 굳는 자재다.", type: "합성 소재", rarity: 3, sources: ["영원한 겨울의 재난 등 적 드랍"] },
  "공허의 파편": { desc: "표면의 문양이 사라지면서 그 가치도 공허하게 된 쇳조각이다.", type: "합성 소재", rarity: 3, sources: ["허수 방직꾼 등 적 드랍"] },
  "지식의 나무껍질": { desc: "주름 속에 축적된 자연의 지혜를 말해주고 있는 메마른 나무껍질이다.", type: "합성 소재", rarity: 3, sources: ["자동 기갑병 등 적 드랍"] },
  "화합의 점액": { desc: "면이 하나뿐인 원형 고리. 끈적거리는 것이 옥에 티다.", type: "합성 소재", rarity: 3, sources: ["신들린 기교 • 온순한 산예 적 드랍"] },
  "용린산호": { desc: "파월고해 바닥에서 서식하는 가장 가치 있는 산호. 최고의 항생물질을 담고 있다.", type: "합성 소재", rarity: 3, sources: ["링링의 약방"] },
  "음향과 분노": { desc: "세상의 소음이 당신의 판단을 좌우하게 두지 말자.", type: "합성 소재", rarity: 3, sources: ["기억의 영역 밈 등 적 드랍"] },
  "서멀 그리스": { desc: "전통적인 물리 열 배출 방식이 여러 지능 기계 모델에게 가장 적합하기도 한다.", type: "합성 소재", rarity: 3, sources: ["나쁜꿈 극단 등 적 드랍", "퍼디난드"] },
  "비단실이 감긴 방추": { desc: "아글라이아가 만든 첫 실패작이나 사람들은 그 완벽한 재단에 탄복했다.", type: "합성 소재", rarity: 3, sources: ["천벌의 투사 등 적 드랍"] },
  "차원수의 잎": { desc: "지상을 향해 극히 짧은 거리에서의 워프를 반복하며 낙하하는 잎사귀다.", type: "합성 소재", rarity: 4, sources: ["마각의 몸 병사 등 적 드랍"] },
  "위상의 불꽃": { desc: "끊임없이 위상을 바꾸어 각계를 불태우고 곳곳에 불길을 남기는 후예다.", type: "합성 소재", rarity: 4, sources: ["자동 기갑병 등 적 드랍"] },
  "비애의 눈물 결정": { desc: "무너져내린 문명과 죽어간 자들을 향한 비탄이 만들어낸 진주 같은 결정이다.", type: "합성 소재", rarity: 4, sources: ["영원한 겨울의 재난 등 적 드랍"] },
  "미토스 매듭": { desc: "역사를 불확실하게 만들어 확정된 파멸을 피하려는 허구 역사학자들의 매듭이다.", type: "합성 소재", rarity: 4, sources: ["허수 방직꾼 등 적 드랍"] },
  "싫증": { desc: "쓰다가 짜증 나서 더 이상 쓰기 싫다.", type: "합성 소재", rarity: 4, sources: ["기억의 영역 밈 등 적 드랍"] },
  "기계 큐브": { desc: "어떤 지능 기계의 심장이며, 안에는 무기 생명체의 궁극의 소스 코드가 담겨 있다.", type: "합성 소재", rarity: 4, sources: ["나쁜꿈 극단 등 적 드랍", "퍼디난드"] },
  "여명 씨앗": { desc: "사라지는 아름다움을 안타까워하며 키워낸 빛나는 소녀의 마음이 담긴 씨앗이다.", type: "합성 소재", rarity: 4, sources: ["천벌의 투사 등 적 드랍"] }
};