const { createClient } = require('@supabase/supabase-js');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Simple .env parser
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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

async function createNotice() {
  console.log('--- 새로운 공지사항 생성기 ---');
  
  const id = `notice-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
  
  console.log(`자동 생성된 공지사항 ID: ${id}`);
  
  const title = await askQuestion('공지사항 제목: ');
  const category = await askQuestion('카테고리 (Update/Notice/Event/System): ');
  const game_id = await askQuestion('대상 게임 (hsr/ww/common): ');
  const version = await askQuestion('버전 정보 (선택, 엔터키로 스킵): ');
  const isCriticalStr = await askQuestion('중요 공지인가요? (y/n): ');
  const is_critical = isCriticalStr.toLowerCase() === 'y';
  
  console.log('내용 (Markdown 작성 가능, 입력을 마치려면 "END"를 입력 후 엔터키):');
  let content = '';
  for await (const line of rl) {
    if (line.trim() === 'END') break;
    content += line + '\n';
  }

  const newNotice = {
    id,
    title,
    category: category || 'Notice',
    game_id: game_id || 'common',
    content: content.trim(),
    created_at: new Date().toISOString(),
    version: version || null,
    is_critical
  };

  console.log('\n--- 전송할 데이터 ---');
  console.log(JSON.stringify(newNotice, null, 2));

  const confirm = await askQuestion('\n위 내용으로 DB에 등록하시겠습니까? (y/n): ');
  if (confirm.toLowerCase() === 'y') {
    const { data, error } = await supabase.from('notices').insert(newNotice);
    if (error) {
      console.error('DB 저장 실패:', error.message);
    } else {
      console.log('✅ 공지사항이 성공적으로 등록되었습니다!');
    }
  } else {
    console.log('등록이 취소되었습니다.');
  }

  rl.close();
}

createNotice();
