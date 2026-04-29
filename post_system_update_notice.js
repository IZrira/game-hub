
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xwhtfrbrykedxgbdclyg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3aHRmcmJyeWtlZHhnYmRjbHlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwOTk1MjIsImV4cCI6MjA5MjY3NTUyMn0.ET0919UvGMvp_RNQ1JMkOAPteVyzUnM-HKBVfPaRQao';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const noticeId = `notice-20260429-system-update`;
const noticeData = {
    id: noticeId,
    title: '[시스템 업데이트] 캐릭터 데이터 동기화 및 서비스 안정화 안내',
    category: 'System',
    game_id: 'common',
    content: `안녕하세요, RIRA ARCHIVE입니다.
금일 캐릭터 데이터 안정화 및 서비스 최적화를 위한 업데이트가 진행되었습니다.

### 1. 캐릭터 데이터 및 이미지 경로 최적화
*   **애쉬베일(Ashvale)**: 이미지 경로 정규화를 통해 프로필 이미지가 정상 출력되도록 수정되었습니다.
*   **은랑 LV.999**: 기존 은랑 이미지 리소스를 공유하도록 설정하여 리소스 효율성을 높였습니다.

### 2. 티어표 데이터 무결성 강화
*   티어표 카테고리 내 일부 캐릭터 데이터 중복 오류를 수정하여 더욱 정확한 랭킹 정보를 제공합니다.

더욱 쾌적한 서비스를 위해 노력하겠습니다.
감사합니다.`,
    version: '1.1.2',
    is_critical: false,
    created_at: new Date().toISOString()
};

async function postNotice() {
    const { error } = await supabase.from('notices').upsert([noticeData]);
    if (error) {
        console.error('Error posting notice:', error);
    } else {
        console.log('Notice updated successfully (Admin details removed)!');
    }
}

postNotice();
