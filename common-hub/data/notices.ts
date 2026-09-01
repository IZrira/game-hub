import { Notice } from './types';
import { supabase } from '../lib/supabase';

// 정적 공지사항 데이터 (DB 연동 실패 시 폴백 및 사이드바 뱃지용으로 사용)
export const GLOBAL_NOTICES: Notice[] = [
  {
    id: "update-2026-07-25",
    category: "Update",
    title: "구글 로그인 연동 및 HSR 4.4 / WW 3.5 업데이트 안내",
    content: "Rira Game Hub에 새로운 기능과 데이터가 업데이트되었습니다.\n\n- 소셜 로그인 연동: 이제 구글 및 디스코드 계정으로 로그인하여 본인의 리뷰를 수정하고 관리할 수 있습니다.\n- [붕괴: 스타레일] 4.4 버전 데이터베이스 및 최신 가이드 반영\n- [명조: 워더링 웨이브] 3.5 버전 신규 캐릭터 및 에코 세팅 추가\n\n항상 발전하는 Rira Game Hub가 되겠습니다.",
    createdAt: "2026-07-25",
    version: "2.2.0",
    isCritical: true,
    gameId: "common"
  },
  {
    id: "notice-2026-06-17",
    category: "System",
    title: "Rira Game Hub 시스템 최적화 및 UI 개편 안내",
    content: "안녕하세요, Rira Editor입니다.\n\n메인 화면의 'Rira Daily Hub' 섹션이 새로운 Game Dashboard 테마로 일관성 있게 개편되었습니다. 또한 각 게임 갤러리에서 블로그 및 칼럼으로 진입할 때의 경로 추적 기능이 강화되어, 언제든 원래 보던 게임 페이지로 원활하게 돌아가실 수 있습니다.\n\n앞으로도 더 나은 사용자 경험을 위해 지속적으로 노력하겠습니다.",
    createdAt: "2026-06-17",
    version: "2.1.0",
    isCritical: true,
    gameId: "common"
  },
  {
    id: "update-hsr-4-3",
    category: "Update",
    title: "[붕괴: 스타레일] 4.3 버전 업데이트 반영",
    content: "스타레일 4.3 버전 업데이트가 Rira Game Hub에 반영되었습니다.\n\n- 신규 캐릭터 '천야·블레이드' DB 및 공략 추가\n- 신규 차원 장신구 '적막한 우주의 심연' 데이터 업데이트\n- 최신 혼돈의 기억 티어표 및 파티 조합 가이드 갱신\n\n자세한 내용은 캐릭터 갤러리 및 블로그 칼럼에서 확인해 주시기 바랍니다.",
    createdAt: "2026-06-16",
    version: "4.3.0",
    isCritical: false,
    gameId: "hsr"
  },
  {
    id: "update-ww-3-4",
    category: "Update",
    title: "[명조] 3.4 버전 '선율의 메아리' 데이터베이스 추가",
    content: "명조: 워더링 웨이브 3.4 버전 신규 콘텐츠가 업데이트 되었습니다.\n\n- 신규 공명자 '샤콘(Chaconne)' 콤보 사이클 및 에코 세팅 가이드 추가\n- '크림슨 오페라' 에코 데이터 추가\n- 종결 에코 추천 루트 갱신\n\n이제 명조 갤러리에서 최신 메타를 바로 확인하실 수 있습니다.",
    createdAt: "2026-06-15",
    version: "3.4.0",
    isCritical: false,
    gameId: "ww"
  }
];

/**
 * DB에서 공지사항을 비동기로 불러오는 함수입니다.
 * Supabase DB 조회 실패 시, 정적 배열(GLOBAL_NOTICES)을 반환합니다.
 * @param gameId (선택) 특정 게임에 해당하는 공지사항만 필터링 (common은 항상 포함)
 */
export async function fetchNotices(gameId?: 'hsr' | 'ww'): Promise<Notice[]> {
  try {
    let query = supabase.from('notices').select('*').order('created_at', { ascending: false });
    
    if (gameId) {
      query = query.in('game_id', [gameId, 'common']);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      console.warn('Failed to fetch notices from DB or empty data, falling back to static notices.');
      return GLOBAL_NOTICES.filter(n => !gameId || n.gameId === gameId || n.gameId === 'common');
    }

    console.log(`[Notices] Successfully fetched ${data.length} notices for ${gameId || 'all'}`);

    return data.map((n: any) => ({
      id: n.id,
      category: n.category,
      title: n.title,
      content: n.content,
      createdAt: n.created_at ? n.created_at.split('T')[0] : '',
      updatedAt: n.updated_at ? n.updated_at.split('T')[0] : undefined,
      version: n.version,
      isCritical: n.is_critical,
      images: n.images,
      gameId: n.game_id
    })) as Notice[];
  } catch (err) {
    console.error('Error in fetchNotices:', err);
    return GLOBAL_NOTICES.filter(n => !gameId || n.gameId === gameId || n.gameId === 'common');
  }
}
