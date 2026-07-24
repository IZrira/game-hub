-- 1. Add user_id column linking to auth.users
ALTER TABLE character_reviews ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id);

-- 2. Drop existing policies
DROP POLICY IF EXISTS "Allow public read access" ON character_reviews;
DROP POLICY IF EXISTS "Allow public insert" ON character_reviews;
DROP POLICY IF EXISTS "Allow public delete" ON character_reviews;

-- 3. Recreate policies with strict Auth rules
-- Public Read (Anyone can read reviews)
CREATE POLICY "Allow public read access" 
  ON character_reviews FOR SELECT 
  TO public 
  USING (true);

-- Authenticated Insert (Only logged-in users can insert, and must use their own user_id)
CREATE POLICY "Allow authenticated insert" 
  ON character_reviews FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

-- Authenticated Update (Only logged-in users can update their own reviews)
CREATE POLICY "Allow users to update own reviews" 
  ON character_reviews FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Authenticated Delete (Only logged-in users can delete their own reviews)
CREATE POLICY "Allow users to delete own reviews" 
  ON character_reviews FOR DELETE 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Ensure RLS is still enabled
ALTER TABLE character_reviews ENABLE ROW LEVEL SECURITY;
