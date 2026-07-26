-- 1. admin-media 스토리지 버킷 생성
INSERT INTO storage.buckets (id, name, public)
VALUES ('admin-media', 'admin-media', true)
ON CONFLICT (id) DO NOTHING;

-- 2. 누구나 이미지를 볼 수 있도록 Public 조회 권한 부여
CREATE POLICY "Admin Media Public Access"
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'admin-media' );

-- 3. 관리자만 업로드(Insert) 가능하도록 RLS 정책 설정
CREATE POLICY "Admin Media Insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'admin-media' AND (
      (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' OR
      (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin' OR
      (auth.jwt() ->> 'email') LIKE '%@rira.com'
    )
  );

-- 4. 관리자만 수정(Update) 가능하도록 설정
CREATE POLICY "Admin Media Update"
  ON storage.objects FOR UPDATE
  TO authenticated
  WITH CHECK (
    bucket_id = 'admin-media' AND (
      (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' OR
      (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin' OR
      (auth.jwt() ->> 'email') LIKE '%@rira.com'
    )
  );

-- 5. 관리자만 삭제(Delete) 가능하도록 설정
CREATE POLICY "Admin Media Delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'admin-media' AND (
      (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' OR
      (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin' OR
      (auth.jwt() ->> 'email') LIKE '%@rira.com'
    )
  );
