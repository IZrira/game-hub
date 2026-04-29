const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Simple .env parser (like in migrate_characters.js)
const env = fs.readFileSync(path.resolve(__dirname, '../.env'), 'utf8')
  .split('\n')
  .reduce((acc, line) => {
    const [key, ...values] = line.split('=');
    if (key && values.length > 0) acc[key.trim()] = values.join('=').trim();
    return acc;
  }, {});

const SUPABASE_URL = env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_KEY';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const GLOBAL_NOTICES = [
  {
    id: 'notice-20260419-01',
    category: 'Update',
    title: '스타레일 아카이브 v4.1 업데이트 안내',
    content: `
# v1.0 업데이트 내역

스타레일 아카이브가 새로운 모습으로 개편되었습니다!

## 주요 변경 사항
- **대시보드 리뉴얼**: 더 직관적이고 아름다운 프리미엄 디자인 적용
- **데이터 로딩 최적화**: 이전보다 2배 빠른 데이터 로딩 속도
- **실시간 통계 기능**: 도감의 전체 상태를 한눈에 확인 가능

많은 이용 부탁드립니다.
    `,
    created_at: new Date('2026-04-19T00:00:00Z').toISOString(),
    version: '4.1.0',
    is_critical: true,
    game_id: 'hsr'
  },
  {
    id: 'notice-20260419-02',
    category: 'Update',
    title: '명조 아카이브 시스템 고도화 완료',
    content: `
# 명조 아카이브 업데이트 정보

명조 섹션의 데이터 무결성과 UI가 개선되었습니다.

## 업데이트 상세
- **공명자 스포트라이트**: 최신 캐릭터를 전면 배치
- **에코 데이터 정밀화**: 누락되었던 에코 정보 보강
- **반응형 대시보드**: 모바일에서도 쾌적한 아카이브 탐색 가능

앞으로도 정확한 정보를 제공하겠습니다.
    `,
    created_at: new Date('2026-04-19T00:00:00Z').toISOString(),
    version: '1.0.1',
    is_critical: false,
    game_id: 'ww'
  },
  {
    id: 'sys-notice-01',
    category: 'System',
    title: '임시 점검 완료 안내',
    content: `시스템 안정화를 위한 임시 점검이 완료되었습니다. 이용에 불편을 드려 죄송합니다.`,
    created_at: new Date('2026-04-18T00:00:00Z').toISOString(),
    game_id: 'common'
  }
];

async function migrateNotices() {
  console.log('Starting notice migration...');

  for (const notice of GLOBAL_NOTICES) {
    const { data, error } = await supabase
      .from('notices')
      .upsert(notice, { onConflict: 'id' });

    if (error) {
      console.error(`Error inserting notice ${notice.id}:`, error.message);
    } else {
      console.log(`Successfully migrated: ${notice.id} - ${notice.title}`);
    }
  }

  console.log('Migration complete!');
}

migrateNotices();
