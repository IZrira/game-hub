-- Migration: Full Schema Update and Moderation Support
-- Date: 2026-07-25 03:00:00

-- 1. Add new columns to character_reviews table
ALTER TABLE character_reviews 
  ADD COLUMN IF NOT EXISTS media_urls text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS like_count integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS report_count integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_pinned boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- 2. Create comment_reports table for duplicate report prevention and moderation
CREATE TABLE IF NOT EXISTS comment_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id uuid NOT NULL REFERENCES character_reviews(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(comment_id, user_id)
);

-- Indexes for comment_reports table
CREATE INDEX IF NOT EXISTS idx_comment_reports_comment_id ON comment_reports(comment_id);
CREATE INDEX IF NOT EXISTS idx_comment_reports_user_id ON comment_reports(user_id);

-- 3. Enable RLS on comment_reports table
ALTER TABLE comment_reports ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for comment_reports
DROP POLICY IF EXISTS "Allow public read access to comment_reports" ON comment_reports;
CREATE POLICY "Allow public read access to comment_reports" 
  ON comment_reports FOR SELECT 
  TO public 
  USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert reports" ON comment_reports;
CREATE POLICY "Allow authenticated users to insert reports" 
  ON comment_reports FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admin delete comment_reports" ON comment_reports;
CREATE POLICY "Admin delete comment_reports"
  ON comment_reports FOR DELETE
  TO authenticated
  USING (
    auth.jwt() ->> 'email' LIKE '%admin%' 
    OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' 
    OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean = true
  );

-- 5. RLS Policies for character_reviews updates (Author update vs Admin update)
DROP POLICY IF EXISTS "Allow users to update own reviews or admin pin" ON character_reviews;
DROP POLICY IF EXISTS "Author update own comments" ON character_reviews;
DROP POLICY IF EXISTS "Admin update and pin comments" ON character_reviews;

CREATE POLICY "Author update own comments" 
  ON character_reviews FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id) 
  WITH CHECK (auth.uid() = user_id AND is_pinned = false);

CREATE POLICY "Admin update and pin comments" 
  ON character_reviews FOR UPDATE 
  TO authenticated 
  USING (
    auth.jwt() ->> 'email' LIKE '%admin%' 
    OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' 
    OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean = true
  ) 
  WITH CHECK (true);

-- 6. Trigger functions for automatic count synchronization with SECURITY DEFINER
CREATE OR REPLACE FUNCTION update_comment_report_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    UPDATE character_reviews
    SET report_count = (SELECT COUNT(*) FROM comment_reports WHERE comment_id = NEW.comment_id)
    WHERE id = NEW.comment_id;
    RETURN NEW;
  ELSIF (TG_OP = 'DELETE') THEN
    UPDATE character_reviews
    SET report_count = (SELECT COUNT(*) FROM comment_reports WHERE comment_id = OLD.comment_id)
    WHERE id = OLD.comment_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_comment_report_count ON comment_reports;
CREATE TRIGGER trg_sync_comment_report_count
  AFTER INSERT OR DELETE ON comment_reports
  FOR EACH ROW
  EXECUTE FUNCTION update_comment_report_count();

CREATE OR REPLACE FUNCTION update_comment_upvote_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    UPDATE character_reviews
    SET like_count = (SELECT COUNT(*) FROM comment_upvotes WHERE comment_id = NEW.comment_id)
    WHERE id = NEW.comment_id;
    RETURN NEW;
  ELSIF (TG_OP = 'DELETE') THEN
    UPDATE character_reviews
    SET like_count = (SELECT COUNT(*) FROM comment_upvotes WHERE comment_id = OLD.comment_id)
    WHERE id = OLD.comment_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_comment_upvote_count ON comment_upvotes;
CREATE TRIGGER trg_sync_comment_upvote_count
  AFTER INSERT OR DELETE ON comment_upvotes
  FOR EACH ROW
  EXECUTE FUNCTION update_comment_upvote_count();

