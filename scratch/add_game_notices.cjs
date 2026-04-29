const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const env = fs.readFileSync(path.resolve(__dirname, '../.env'), 'utf8')
  .split('\n')
  .reduce((acc, line) => {
    const [key, ...values] = line.split('=');
    if (key && values.length > 0) acc[key.trim()] = values.join('=').trim();
    return acc;
  }, {});

const supabase = createClient(env.VITE_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_ANON_KEY);

async function addGameSpecificNotices() {
  const notices = [
    {
      id: 'hsr-update-v42',
      game_id: 'hsr',
      category: 'Update',
      title: '🚀 [HSR] 스타레일 아카이브 v4.0 ~ v4.2 업데이트 완료',
      content: `
# 스타레일 아카이브 데이터 업데이트 안내

스타레일 아카이브의 데이터가 최신 버전인 v4.2에 맞춰 모두 업데이트되었습니다!

## 주요 업데이트 내용
- v4.0 ~ v4.2 신규 캐릭터: 모든 신규 캐릭터의 상세 도감 및 가이드가 추가되었습니다.
- 최신 광추 및 유물: 새롭게 추가된 모든 장비 데이터가 정밀하게 반영되었습니다.
- 메타 반영 티어표: v4.2 환경에 맞춘 혼돈/허구/종말 티어표가 갱신되었습니다.

최신 데이터를 기반으로 최고의 파티를 구성해 보세요!
      `,
      version: '4.2',
      is_critical: true
    },
    {
      id: 'ww-system-status',
      game_id: 'ww',
      category: 'System',
      title: '⚙️ [WW] 명조 아카이브 기본 시스템 구축 안내',
      content: `
# 명조 아카이브 시스템 구축 현황

명조(Wuthering Waves) 아카이브는 현재 기본 시스템 구축 및 데이터 최적화 단계에 있습니다.

## 진행 현황
- 공명자 도감 기초 공사: 모든 공명자의 기본 스탯 및 스킬 정보가 입력되었습니다.
- 에코(Echo) 데이터베이스: 주요 에코들의 데이터 무결성을 검증하고 보강 중입니다.
- 추천 조합 시스템: 명조만의 독특한 전투 메커니즘을 반영한 파티 추천 로직을 구축하고 있습니다.

빠른 시일 내에 완벽한 데이터 가이드를 제공해 드릴 수 있도록 노력하겠습니다.
      `,
      version: '1.0',
      is_critical: false
    }
  ];

  for (const notice of notices) {
    const { error } = await supabase.from('notices').upsert(notice);
    if (error) {
      console.error(`Error adding ${notice.game_id} notice:`, error.message);
    } else {
      console.log(`${notice.game_id} notice successfully added/updated!`);
    }
  }
}

addGameSpecificNotices();
