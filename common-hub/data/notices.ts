import { Notice } from './types';

import { supabase } from '../lib/supabase';

// 프론트엔드가 중단되지 않게 하기 위한 빈 기본 배열 (DB 마이그레이션 및 연동 전 임시 대비용)
export const GLOBAL_NOTICES: Notice[] = [];

/**
 * DB에서 공지사항을 비동기로 불러오는 함수입니다.
 * @param gameId (선택) 특정 게임에 해당하는 공지사항만 필터링 (common은 항상 포함)
 */
export async function fetchNotices(gameId?: 'hsr' | 'ww'): Promise<Notice[]> {
  try {
    let query = supabase.from('notices').select('*').order('created_at', { ascending: false });
    
    if (gameId) {
      // 해당 게임 ID 또는 'common'인 공지만
      query = query.in('game_id', [gameId, 'common']);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Failed to fetch notices:', error.message);
      return [];
    }

    console.log(`[Notices] Successfully fetched ${data.length} notices for ${gameId || 'all'}`);

    // DB 스네이크 케이스를 프론트엔드 카멜 케이스로 변환 및 날짜 포맷팅
    return data.map((n: any) => ({
      id: n.id,
      category: n.category,
      title: n.title,
      content: n.content,
      // '2026-04-28T14:06:32.680671+00:00' -> '2026-04-28'
      createdAt: n.created_at ? n.created_at.split('T')[0] : '',
      version: n.version,
      isCritical: n.is_critical,
      images: n.images,
      gameId: n.game_id
    })) as Notice[];
  } catch (err) {
    console.error('Error in fetchNotices:', err);
    return [];
  }
}
