-- 1. Add parent_id to character_reviews table for nested replies
ALTER TABLE character_reviews 
ADD COLUMN IF NOT EXISTS parent_id uuid REFERENCES character_reviews(id) ON DELETE CASCADE;

-- Create index for faster parent_id lookup
CREATE INDEX IF NOT EXISTS idx_character_reviews_parent_id ON character_reviews(parent_id);

-- 2. Create comment_upvotes table
CREATE TABLE IF NOT EXISTS comment_upvotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id uuid NOT NULL REFERENCES character_reviews(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE (comment_id, user_id)
);

-- Indexes for upvotes table
CREATE INDEX IF NOT EXISTS idx_comment_upvotes_comment_id ON comment_upvotes(comment_id);
CREATE INDEX IF NOT EXISTS idx_comment_upvotes_user_id ON comment_upvotes(user_id);

-- 3. Enable RLS on comment_upvotes
ALTER TABLE comment_upvotes ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for comment_upvotes
DROP POLICY IF EXISTS "Allow public read access to upvotes" ON comment_upvotes;
CREATE POLICY "Allow public read access to upvotes" 
  ON comment_upvotes FOR SELECT 
  TO public 
  USING (true);

DROP POLICY IF EXISTS "Allow users to insert own upvotes" ON comment_upvotes;
CREATE POLICY "Allow users to insert own upvotes" 
  ON comment_upvotes FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Allow users to delete own upvotes" ON comment_upvotes;
CREATE POLICY "Allow users to delete own upvotes" 
  ON comment_upvotes FOR DELETE 
  TO authenticated 
  USING (auth.uid() = user_id);
