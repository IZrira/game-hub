ALTER TABLE character_reviews ADD COLUMN IF NOT EXISTS author_is_admin BOOLEAN DEFAULT false;
