// What a published guide actually records about its checking: the version it
// applies to and the date it was last reviewed. Shared by the guide pages and
// the prerender script so both state the same, verifiable basis.

const GAME_NAMES = { hsr: '붕괴: 스타레일', ww: '명조', nte: '이환', aniimo: '애니모' };

export const GUIDE_REVIEW_POLICY = '글마다 적용 기준과 최종 검수일을 표시하고, 공식 정보와 Rira의 분석을 구분해 작성합니다.';

/** "1.0" alone reads as a bare number, so name the game and say it is a version. */
export function formatGuideBasis(gameId, applicableVersion) {
  const basis = String(applicableVersion || '').trim();
  if (!basis) return '적용 기준 확인 중';
  return /^\d+(\.\d+)*$/.test(basis) ? `${GAME_NAMES[gameId] || gameId} ${basis} 버전 기준` : basis;
}
