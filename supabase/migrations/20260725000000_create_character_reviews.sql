CREATE TABLE IF NOT EXISTS character_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  game_id text NOT NULL,
  character_id text NOT NULL,
  nickname text NOT NULL,
  rating smallint NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment_text text NOT NULL
);

-- Basic index for fast querying by character
CREATE INDEX IF NOT EXISTS idx_character_reviews_char ON character_reviews(game_id, character_id);

-- Enable RLS
ALTER TABLE character_reviews ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" 
  ON character_reviews FOR SELECT 
  TO public 
  USING (true);

-- Allow public insert
CREATE POLICY "Allow public insert" 
  ON character_reviews FOR INSERT 
  TO public 
  WITH CHECK (true);

-- Allow public delete
CREATE POLICY "Allow public delete" 
  ON character_reviews FOR DELETE 
  TO public 
  USING (true);
