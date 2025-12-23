/*
  # Christmas Wishes Database Schema

  ## Summary
  Creates a public table for storing anonymous Christmas wishes from users.

  ## New Tables
  - `christmas_wishes`
    - `id` (uuid, primary key) - Unique identifier for each wish
    - `wish_text` (text) - The actual wish content (max 200 characters enforced at app level)
    - `is_public` (boolean) - Whether the wish can be displayed on the public wishes wall
    - `created_at` (timestamptz) - Timestamp when the wish was created

  ## Security
  - Enable RLS on `christmas_wishes` table
  - Allow anyone to insert wishes (anonymous submissions)
  - Allow anyone to read public wishes only
  - No update or delete operations allowed (preserve the magic!)

  ## Notes
  - All wishes are anonymous by design
  - Only wishes with `is_public = true` are displayed on the wishes wall
  - Created_at is used for chronological display
*/

CREATE TABLE IF NOT EXISTS christmas_wishes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wish_text text NOT NULL,
  is_public boolean DEFAULT false NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE christmas_wishes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a wish"
  ON christmas_wishes
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view public wishes"
  ON christmas_wishes
  FOR SELECT
  TO anon
  USING (is_public = true);