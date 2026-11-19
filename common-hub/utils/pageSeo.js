/**
 * Meta descriptions shared by the initial HTML (scripts/prerender-meta.js) and the React head.
 * Keeping one copy stops the app from swapping in a different, shorter description after load.
 * Each sentence names only content the page shows. Character, guide, WW weapon, NTE party and
 * notice descriptions live in guideSeo.js, wwCharacterSeo.js, nteCharacterSeo.js, wwWeaponSeo.js,
 * ntePartySeo.js and noticeSeo.js.
 */

// Database detail pages
export const hsrLightconeDescription = ({ name, rarity = 5, path = '' }) =>
  `붕괴: 스타레일 ${name}(${rarity || 5}성 ${path || ''}) 광추의 Lv.80 기초 스탯과 광추 스킬 효과, 승급 단계별 필요 재료를 정리했습니다. 광추 스킬의 발동 조건을 확인하고 같은 운명의 길 캐릭터에게 맞는지 비교해 보세요.`;

export const hsrRelicDescription = name =>
  `붕괴: 스타레일 ${name} 터널 유물의 2세트·4세트 효과와 세트 구성 부위, 세트를 고르는 선택 기준을 정리했습니다. 세트 효과의 발동 조건을 확인하고 캐릭터의 역할에 맞는 유물을 고를 때 참고하세요.`;

export const hsrOrnamentDescription = name =>
  `붕괴: 스타레일 ${name} 차원 장신구의 2세트 효과와 차원 구체·연결 매듭 구성 부위를 정리했습니다. 세트 효과의 발동 조건을 확인하고 캐릭터의 속성과 역할에 맞는 장신구를 고를 때 참고하세요.`;

export const wwEchoDescription = name =>
  `명조 ${name} 에코의 코스트, 메인 어빌리티 효과, 장착 가능한 소나타 이펙트와 세팅에서 확인할 점을 정리했습니다. 에코 세트를 맞출 때 코스트 배분과 소나타 효과를 함께 비교해 보세요.`;

export const nteArcDescription = name =>
  `이환(NTE) ${name} 아크의 등급별 능력치, 블록 구성, 고유 스킬 효과와 추천 캐릭터 및 활용 정보를 확인하세요. 아크 효과와 캐릭터 속성을 함께 비교해 육성할 아크를 고를 때 참고할 수 있습니다.`;

export const aniimoCharacterDescription = ({ name, number }) =>
  `애니모 ${name}(NO.${number})의 소개, 능력치, 진화 조건, 형태별 데이터, 출현 지역, 특성과 스킬 정보를 확인하세요. 진화 계보와 형태별 차이를 비교해 육성하거나 포획할 형태를 고를 때 참고할 수 있습니다.`;

export const aniimoLocationDescription = ({ location, count }) =>
  `${location}에서 서식하는 애니모 ${count}종의 이름과 지역별 형태, 원소·포지션 정보를 확인하고 각 애니모 상세 도감으로 이동하세요. 포획할 애니모의 출현 형태를 확인한 뒤 다른 공식 서식지와도 비교할 수 있습니다.`;

// Hubs and lists
// Hub descriptions carry no counts: the app counts every listed item, the initial HTML only indexed pages.
export const hsrHubDescription = () =>
  `붕괴: 스타레일(Honkai: Star Rail)의 캐릭터, 광추, 터널 유물과 차원 장신구 도감과 실전 육성 가이드, 혼돈의 기억 티어표를 확인하세요. 새 버전의 캐릭터와 장비는 공지사항과 함께 순서대로 추가합니다.`;

export const wwHubDescription = () =>
  `명조: 워더링 웨이브(Wuthering Waves)의 공명자, 무기, 에코 도감과 종결 세팅 가이드, 역경의 탑 티어표 및 파티 조합을 확인하세요. 새 버전의 공명자와 장비는 공지사항과 함께 순서대로 추가합니다.`;

export const nteHubDescription = () =>
  `이환: 네버네스 투 에버네스(Neverness to Everness)의 캐릭터 도감, 아크 장비 데이터, 콘솔 카트리지와 이동 수단 정보, 추천 파티 조합 및 육성 가이드를 확인하세요. 새 버전의 캐릭터와 아크는 공지사항과 함께 순서대로 추가합니다.`;

export const aniimoHubDescription = ({ entries, locations }) =>
  `애니모 ${entries}종의 형태별 도감, 능력치 비교, 9원소 상성표와 ${locations}개 공식 서식지별 출현 정보를 한곳에서 확인하세요. 성격 효과와 역할별 추천 파티 조합도 함께 정리되어 있습니다.`;

export const aniimoCharactersDescription = entries =>
  `공식 도감 기준 ${entries}종의 원소, 포지션, 서식지와 능력치를 검색하고, 육성할 애니모를 골라 최대 3종까지 나란히 비교할 수 있습니다. 애니모를 선택하면 형태별 상세 도감으로 이동합니다.`;

export const aniimoLocationsDescription = ({ habitats, waveLocations }) =>
  `애니모의 기존 서식지 ${habitats}곳과 웨이브 군도 출현 지역 ${waveLocations}곳에서 만날 수 있는 애니모 종류와 형태 정보를 확인하세요. 서식지를 선택하면 출현 애니모와 지역 형태, 원소·포지션을 한 번에 볼 수 있습니다.`;

export const guideListDescription = gameLabel =>
  `${gameLabel}의 공식 정보와 Rira 분석을 구분하고 적용 버전과 검수일을 표시한 캐릭터 육성, 전투 및 시스템 공략을 확인하세요. 공략 제목을 선택하면 본문과 관련 도감으로 이어서 이동할 수 있습니다.`;

// Fixed pages
export const PAGE_DESCRIPTIONS = Object.freeze({
  hsrTierlist: '붕괴: 스타레일 캐릭터를 혼돈의 기억, 허구 이야기, 종말의 환영, 이상 중재 등 엔드콘텐츠 기준으로 나누어 역할별 티어를 확인하세요. 콘텐츠마다 OP부터 F까지 등급별 캐릭터와 역할을 함께 정리했습니다.',
  hsrParties: '붕괴: 스타레일의 캐릭터별 추천 파티, 역할 구성, 핵심 시너지와 대체 가능한 딜러·서포터·생존 캐릭터를 확인하세요. 파티마다 주력 캐릭터와 멤버별 역할을 정리하고, 대체 가능한 캐릭터가 있으면 함께 표시합니다.',
  hsrTerminology: '붕괴: 스타레일 공략과 캐릭터 설명에 사용되는 전투 시스템, 상태 이상, 버프·디버프 및 콘텐츠 용어를 검색해 확인하세요. 비슷해 보이는 효과의 계산 방식과 적용 대상 차이도 함께 설명합니다.',
  wwTierlist: '명조: 워더링 웨이브 공명자를 역경의 탑과 죽음의 노래와 바닷속 폐허 기준으로 구분하고 메인 딜러, 서브 딜러, 서포터 역할별 티어를 확인하세요. 콘텐츠마다 등급별 공명자와 역할을 함께 정리했습니다.',
  wwParties: '명조: 워더링 웨이브의 공명자별 추천 파티와 반주 스킬 연결, 협주 에너지 운용과 교대 순서를 확인하세요. 파티마다 조합 분류와 구성 이유, 멤버별 역할을 함께 정리했습니다.',
  aniimoTypeChart: '애니모의 불, 물, 풀, 전기, 얼음, 바위, 바람, 빛, 어둠 상성과 1.6배·1배·0.625배 피해 배율을 확인하고 상대 원소별 추천 공격 원소를 찾으세요. 복합 원소 상대를 확인하는 방법도 함께 정리했습니다.',
  aniimoPersonality: '애니모 성격 8종의 전투 보너스와 E/I·S/N·T/F·J/P 선택법, 딜러·치명타·무력화·지원 역할별 추천 성격을 확인하세요. 성격 축마다 적용되는 능력치와 추천 상황을 비교할 수 있습니다.',
  aniimoPartyBuilder: '애니모의 역할과 형태별 능력, 원소 구성을 반영한 추천 파티와 운용 특징, 핵심 조합 및 대체 애니모를 확인하세요. 상대 원소에 맞춰 공격·지원·방어 역할이 겹치지 않는 조합을 고를 때 참고할 수 있습니다.',
  notices: 'RIRA ARCHIVE의 게임 데이터 갱신, 신규 공략, 기능 개선과 서비스 운영 관련 최신 공지사항을 확인하세요. 붕괴: 스타레일, 명조, 이환, 애니모의 데이터 추가와 수정 내역을 등록 순서대로 정리합니다.',
  about: 'Rira Archive가 제공하는 게임 데이터베이스와 공략의 제작 기준, 정보 검수 방식 및 사이트 운영 원칙을 안내합니다. 붕괴: 스타레일, 명조, 이환, 애니모 허브별 수록 범위와 오류 제보 방법도 확인할 수 있습니다.',
  privacy: 'Rira Archive의 쿠키, 분석 도구, 광고 서비스 이용과 개인정보 수집·처리·보관 및 사용자 권리에 관한 정책을 확인하세요. 로그인, 리뷰·댓글, 방문 통계에서 처리하는 정보와 삭제 요청 방법을 안내합니다.',
  tos: 'Rira Archive가 제공하는 게임 데이터와 공략 정보의 이용 범위, 저작권, 면책 사항 및 서비스 이용 조건을 확인하세요. 비공식 팬 아카이브로서 게임 자료의 권리와 이용자가 지켜야 할 사항을 안내합니다.',
  contact: 'Rira Archive의 게임 데이터 오류 제보, 공략 내용 수정 요청, 저작권 및 사이트 이용 관련 문의 방법을 확인하세요. 제보할 때 함께 보내면 좋은 정보와 문의 이메일 주소를 안내합니다.',
});
