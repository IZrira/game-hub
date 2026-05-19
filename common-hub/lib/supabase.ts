import { createClient } from '@supabase/supabase-js';

// Vite 환경 변수에서 URL과 Key를 가져옵니다.
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim().replace(/['"]/g, '');
const supabaseKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim().replace(/['"]/g, '');

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    'Supabase URL or Anon Key is missing. Please check your .env file.'
  );
}

// Supabase 클라이언트를 생성합니다. 
// 값이 없을 경우 에러가 발생하므로, 조건부로 생성하거나 기본값을 제공합니다.
export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'rira-game-hub-auth',
        storage: window.localStorage
      }
    })
  : (null as any); 

if (!supabase) {
  console.error('Supabase client could not be initialized. Check your .env file.');
}
