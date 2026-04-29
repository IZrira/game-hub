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

const SUPABASE_URL = env.VITE_SUPABASE_URL;
const SUPABASE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function updateNotice() {
  const { error } = await supabase
    .from('notices')
    .update({
      title: '🎉 스타레일 아카이브 v1.0 정식 오픈 안내',
      content: `
# RIRA Game Hub v1.0 정식 오픈 안내

오랜 기간의 베타 테스트와 고도화를 거쳐 드디어 RIRA Game Hub가 정식 버전(v1.0)으로 런칭되었습니다! 개척자 및 방랑자 여러분의 여정을 더욱 완벽하게 지원하기 위해 수많은 기능이 추가되었습니다.

---

## 🌟 주요 업데이트 내역

### 1. 강력한 검색 기능 (Search)
이제 갤러리와 도감 어디서든 통합 검색 기능을 통해 원하는 캐릭터, 광추, 유물 등을 1초 만에 찾아볼 수 있습니다. 더 이상 스크롤하며 찾을 필요가 없습니다.

### 2. 북마크 & 즐겨찾기 기능 (Bookmark)
자주 보는 캐릭터 가이드나 나만의 목표 파티 조합을 북마크해 두세요! 언제든 내 프로필과 메인 화면에서 빠르게 다시 꺼내볼 수 있습니다.

### 3. 프리미엄 디자인 UI (Glassmorphism)
웹사이트 전체에 고급스러운 유리 질감(Glassmorphism)과 부드러운 애니메이션을 적용하여, 보는 즐거움과 탐색의 재미를 극대화했습니다. 

### 4. 고도화된 티어표 및 파티 추천
혼돈, 허구, 종말 등 모든 콘텐츠별 맞춤형 티어표와, 마우스를 올리면 대체 캐릭터까지 시각적으로 보여주는 스마트한 추천 파티 조합 가이드가 도입되었습니다.

### 5. 실시간 동적 공지 및 관리 시스템
모든 공지사항과 데이터는 이제 백그라운드 DB와 실시간으로 연동됩니다. 시스템 점검이나 신규 캐릭터 정보가 앱 업데이트 없이도 즉각적으로 반영됩니다.

---

앞으로도 여러분의 쾌적한 게임 플레이를 위해 발전하는 아카이브가 되겠습니다. 많은 이용 부탁드립니다!
      `,
      version: '1.0',
      is_critical: true,
      game_id: 'common'
    })
    .eq('id', 'notice-20260419-01');

  if (error) {
    console.error('Error updating notice:', error.message);
  } else {
    console.log('Notice successfully updated with full features!');
  }
}

updateNotice();
