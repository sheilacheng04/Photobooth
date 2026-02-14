-- ═══════════════════════════════════════════════════
-- Supabase SQL: Create the guestbook table
-- Run this in the Supabase SQL Editor
-- ═══════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS guestbook (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL,
  title      TEXT,
  message    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read entries
CREATE POLICY "Allow public read" ON guestbook
  FOR SELECT USING (true);

-- Allow anyone to insert entries (for the public guestbook)
CREATE POLICY "Allow public insert" ON guestbook
  FOR INSERT WITH CHECK (true);

-- Optional: Create an index on created_at for faster ordering
CREATE INDEX IF NOT EXISTS idx_guestbook_created_at
  ON guestbook (created_at DESC);
