-- LOCAL DISPOSABLE DATABASE ONLY. Fixtures roll back; never run against production.
begin;
create extension if not exists pgtap with schema extensions;
set local search_path = public, extensions;
select plan(12);

insert into auth.users(id) values
('11111111-1111-4111-8111-111111111111'),
('22222222-2222-4222-8222-222222222222');
insert into public.character_reviews(id, game_id, character_id, nickname, rating, comment_text, user_id)
values ('33333333-3333-4333-8333-333333333333', 'test', 'test', 'fixture', 5, 'before',
'11111111-1111-4111-8111-111111111111');

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-4111-8111-111111111111","role":"authenticated","user_metadata":{"role":"admin","is_admin":true}}', true);
select lives_ok($$update public.character_reviews set comment_text='after', rating=4, media_urls='{}', updated_at=now()
where id='33333333-3333-4333-8333-333333333333'$$, 'owner can edit content');
select throws_ok($$update public.character_reviews set is_pinned=true where id='33333333-3333-4333-8333-333333333333'$$,
'42501', 'Only administrators can pin reviews', 'user metadata cannot grant pin');
select throws_ok($$update public.character_reviews set author_is_admin=true where id='33333333-3333-4333-8333-333333333333'$$,
'42501', 'Review identity and moderation counters are server managed', 'badge protected');
select throws_ok($$update public.character_reviews set report_count=8 where id='33333333-3333-4333-8333-333333333333'$$,
'42501', 'Review identity and moderation counters are server managed', 'report count protected');
select throws_ok($$update public.character_reviews set like_count=8 where id='33333333-3333-4333-8333-333333333333'$$,
'42501', 'Review identity and moderation counters are server managed', 'like count protected');
select lives_ok($$insert into public.comment_reports(comment_id,user_id) values
('33333333-3333-4333-8333-333333333333','11111111-1111-4111-8111-111111111111')$$, 'report insert/count trigger works');
select is((select report_count from public.character_reviews where id='33333333-3333-4333-8333-333333333333'),1,'server report count updated');
select lives_ok($$insert into public.comment_upvotes(comment_id,user_id) values
('33333333-3333-4333-8333-333333333333','11111111-1111-4111-8111-111111111111')$$, 'upvote insert/count trigger works');
select is((select like_count from public.character_reviews where id='33333333-3333-4333-8333-333333333333'),1,'server like count updated');
select is((select count(*) from public.comment_reports),1::bigint,'reporter can read own report');
select set_config('request.jwt.claims','{"sub":"22222222-2222-4222-8222-222222222222","role":"authenticated"}',true);
select is((select count(*) from public.comment_reports),0::bigint,'other user cannot read reporter relationship');
with changed as (update public.character_reviews set comment_text='unauthorized'
where id='33333333-3333-4333-8333-333333333333' returning id)
select is((select count(*) from changed),0::bigint,'other user cannot edit');
reset role;
select * from finish();
rollback;
