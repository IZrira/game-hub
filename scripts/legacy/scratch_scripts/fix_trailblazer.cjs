const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function fixTrailblazerFolders() {
  console.log('개척자 폴더명 점검 시작...');
  
  const { data, error } = await supabase
    .from('characters')
    .select('id, name, folder_name')
    .ilike('name', '%개척자%');

  if (error) {
    console.error('데이터 조회 실패:', error);
    return;
  }

  for (const char of data) {
    let folder = char.folder_name || '';
    
    // 괄호 앞에 공백이 없는 경우 수정
    if (folder.includes('개척자(')) {
      const fixedName = folder.replace('개척자(', '개척자 (');
      console.log(`수정 중: [${char.name}] ${folder} -> ${fixedName}`);
      
      const { error: updateError } = await supabase
        .from('characters')
        .update({ folder_name: fixedName })
        .eq('id', char.id);
        
      if (updateError) {
        console.error(`${char.name} 수정 실패:`, updateError);
      }
    } else {
      console.log(`이미 올바름: [${char.name}] ${folder}`);
    }
  }

  console.log('작업 완료!');
}

fixTrailblazerFolders();
