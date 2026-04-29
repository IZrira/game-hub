-- Create characters table
CREATE TABLE IF NOT EXISTS public.characters (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    folder_name TEXT NOT NULL,
    rarity INTEGER DEFAULT 5,
    attribute TEXT,
    path TEXT,
    image_file TEXT DEFAULT 'art01.webp',
    version TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.characters ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to read
CREATE POLICY "Allow public read" ON public.characters
    FOR SELECT USING (true);

-- Policy: Allow authenticated users (admin) to manage
-- Note: Replace '9ba8bfc5-f680-444d-8720-192f471610d3' with actual admin UID if needed,
-- but for now allow any authenticated user to manage (as per previous setup).
CREATE POLICY "Allow admin manage" ON public.characters
    FOR ALL USING (auth.uid() = '9ba8bfc5-f680-444d-8720-192f471610d3')
    WITH CHECK (auth.uid() = '9ba8bfc5-f680-444d-8720-192f471610d3');

-- Function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_characters_updated_at
    BEFORE UPDATE ON public.characters
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
