import { ItemDetail } from './types';
import { INVENTORY_DB } from './index';
import enTranslation from '../en.json';

export const ITEM_META = INVENTORY_DB;

export const FILTER_CATEGORIES = [
  "전체", "캐릭터 경험치 재료", "캐릭터 승급 재료", "행적 재료&광추 승급 재료", 
  "행적 재료", "광추 경험치 재료", "유물 경험치 재료", "행적 재료&캐릭터 승급 재료", 
  "워프 아이템", "한정 워프 아이템", "소모품", "통용 화폐", "희귀 화폐", "월드 화폐", "합성 소재",
  "시뮬레이션 우주", "화폐 전쟁: 제로 섬 게임"
];

// 영어로 입력된 아이템 명칭을 데이터 조회 및 매핑을 위해 다시 한글(Key)로 변환하는 역매핑 객체
export const REVERSE_ITEM_MAP: Record<string, string> = Object.entries(enTranslation).reduce((acc, [ko, en]) => {
  acc[en as string] = ko;
  return acc;
}, {} as Record<string, string>);

/**
 * 아이템 이름의 키워드를 분석하여 1~5성 등급을 자동으로 반환합니다.
 */
export const getAutoRarity = (name: string): number => {
  const originalName = REVERSE_ITEM_MAP[name] || name;

  // 1. DB에 명시된 Rarity가 있으면 최우선 적용! (위키 데이터 100% 반영)
  const itemDetail = INVENTORY_DB[originalName];
  if (itemDetail && itemDetail.rarity) {
    return itemDetail.rarity;
  }

  // 5성 키워드
  if (/론스타 더스트|꺼지지 않는 스타라이트|여행 가이드|꿈의 눈물|운명의 발자취|별의 궤도 전용 티켓|별의 궤도 전용티켓|별의 궤도 티켓|별의 궤도|성옥|오래된 꿈|빛의 잔재|헤르타 채권|유실된 정수|유물 잔해|자가 변형성 레진|소원 레진|변수 주사위|간섭 암호키/.test(originalName)) return 5;
  // 4성 키워드
  if (/옥 깃털|꺼지지 않은 잔화|영원|별 쫓는|지식의|앰버의|신성한|타락의|별들의|만상의|아뢰야|소장판|천벌의|정화의|시간을 역행|왕관|비원|말로|여한|구악|유음|길광편우|회상|침묵|에테르|수정덩이|가지|심장|칼날|이빨|뿔|낫|지팡이|유해|못|사원증|아이스박스|한잔|토치|환상|응괴|홍염|잔해|꽃봉오리|달빛|전조|붓|끝없는 탄식|연료|일회용 동력|루비 분말|겨울의 비석|가속 벨트|무정의 단약|설탕 구슬|자동 목인장|마지막 순간|열렬한 분위기|깜짝 상자|살인 병기|장막의 소포|군왕의 수|뼈피리|강철 코일|차원수의 잎|위상의 불꽃|비애의 눈물 결정|미토스 매듭|싫증|기계 큐브|여명 씨앗/.test(originalName)) return 4;
  // 3성 키워드
  if (/생명|악마 사냥|계몽의|한철의|허공의|가족의|생장의|말나|연재|무생의|전혼의|숙명적인|코어|야망|의지|배지|표식|전동축|톱니바퀴|밸브|파편|가루|딥 펜|비명|치유 스프레이|보호벽|에너지바|먼지|연고|구토제|짱짱 포션|설원 찌개|독경기|오곡즙|기황해독환|옥수풍골산|후라이드|향귤환|샐러드|순간|행복|먹구름|척수검|스테이크|방패|헤르타 코인|실드|순촉|금시계 크레딧|신주 암브로시아|무질서 암브로시아|낙원 기념 코인|에이딘 코인|액세스 카드|신용 포인트|파멸의 이물질|풍요의 향기|수렵석|보존의 건축 자재|공허의 파편|지식의 나무껍질|화합의 점액|용린산호|음향과 분노|서멀 그리스|비단실이 감긴 방추/.test(originalName)) return 3;
  // 1성 키워드
  if (/쓰레기|식량|간식|버블티|먹이|빙수|구이|행운패|대환단|소환단|신문|모형|양심|고체 정수|기본 식자재|플로지스톤|금속|가스성 유체|씨앗|폐기된 기교 부속품|사람 높이의 큰 벼|편안함|꿈의 파편|녹슨 톱니바퀴|눈에 띄는 깃털/.test(originalName)) return 1;
  // 기본 2성
  return 2;
};

/**
 * 영문/한글 이름에 관계없이 아이템의 메타데이터를 안전하게 반환합니다.
 */
export const getItemMeta = (itemName: string): ItemDetail | undefined => {
  const originalName = REVERSE_ITEM_MAP[itemName] || itemName;
  return INVENTORY_DB[originalName];
};

/**
 * 아이템 이름을 기반으로 깃허브 CDN 이미지 URL을 반환합니다.
 */
export const getItemUrl = (itemName: string, gameId?: string): string => {
  // 1. 입력된 이름이 영어(en.json의 Value)라면 한글(Key)로 되돌림 (없으면 원본 유지)
  const originalName = REVERSE_ITEM_MAP[itemName] || itemName;

  const itemDetail = INVENTORY_DB[originalName];
  const activeGameId = gameId || itemDetail?.gameId || 'hsr';
  
  const BASE_IMAGE_URL = activeGameId === 'ww' 
    ? 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/ww'
    : 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images';
  
  // 2. 한글 원본 명칭을 기준으로 파일명(fileName)을 매핑
  const targetName = (itemDetail?.fileName || originalName.replace(/:/g, '_')).normalize('NFC');
  
  // 3. 변환된 이름으로 URL 조합
  return encodeURI(`${BASE_IMAGE_URL}/items/${targetName}.webp`);
};