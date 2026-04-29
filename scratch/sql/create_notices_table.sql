-- notices 테이블 생성
create table if not exists public.notices (
  id text primary key,
  category text not null,
  title text not null,
  content text not null,
  created_at timestamptz not null default now(),
  version text,
  is_critical boolean default false,
  images jsonb,
  game_id text not null
);

-- RLS (Row Level Security) 설정
alter table public.notices enable row level security;

-- 기존 정책 안전하게 삭제 (중복 생성 오류 방지)
drop policy if exists "Allow public read access on notices" on public.notices;
drop policy if exists "Allow insert on notices" on public.notices;
drop policy if exists "Allow update on notices" on public.notices;

-- 누구나 공지사항을 읽을 수 있도록 허용
create policy "Allow public read access on notices"
on public.notices
for select
using (true);

-- 스크립트를 통한 데이터 생성을 위해 INSERT 허용
create policy "Allow insert on notices"
on public.notices
for insert
with check (true);

-- 스크립트를 통한 데이터 수정을 위해 UPDATE 허용
create policy "Allow update on notices"
on public.notices
for update
using (true)
with check (true);
