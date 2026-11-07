/**
 * Titles and descriptions for HSR·WW character and guide pages, shared by the initial HTML
 * and the React head. Each one names only content the page actually shows: parties and the
 * RIRA analysis are mentioned only when that page has them.
 */
const extras = ({ hasParties, hasAnalysis }) => [hasParties && '파티 조합', hasAnalysis && '운용 분석'].filter(Boolean);

export function getHsrCharacterSeo({ name, attribute = '', path = '' }) {
  return {
    title: `${name} 캐릭터 공략 및 세팅 정보`,
    description: `붕괴: 스타레일 ${name}의 ${attribute} 속성·${path} 운명의 길 정보, 기본 능력치, 스킬과 행적, 성혼, 육성 재료와 추천 세팅을 확인하세요.`,
  };
}

export function getHsrGuideSeo({ name, hasParties = false, hasAnalysis = false }) {
  const more = extras({ hasParties, hasAnalysis });
  return {
    title: `스타레일 ${name} 공략 | 추천 광추 · 유물 세팅 · 목표 스탯${more.map(item => ` · ${item}`).join('')}`,
    description: `붕괴: 스타레일 ${name}의 추천 광추 순위, 터널 유물과 차원 장신구 세팅, 주옵션·부옵션, 목표 스탯${more.length ? `, ${more.join('과 ')}` : ''}을 정리한 세팅 공략입니다.`,
  };
}

export function getWwGuideSeo({ name, hasParties = false, hasAnalysis = false }) {
  const more = extras({ hasParties, hasAnalysis });
  return {
    title: `명조 ${name} 공략 | 추천 무기 · 에코 세팅 · 목표 스탯${more.map(item => ` · ${item}`).join('')}`,
    description: `명조: 워더링 웨이브 ${name}의 추천 무기 순위, 에코 세트와 메인 에코, 주옵션·부옵션, 스킬 레벨업 우선순위, 목표 스탯${more.length ? `, ${more.join('과 ')}` : ''}을 정리한 세팅 공략입니다.`,
  };
}
