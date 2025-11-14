-- Test script to verify favorites are in the database
-- Run this in Supabase SQL Editor

-- 1. Check if FavoriteRepo table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'FavoriteRepo';

-- 2. View all favorites (replace USER_ID with your actual user ID)
SELECT * FROM "FavoriteRepo" ORDER BY created_at DESC;

-- 3. Count favorites per user
SELECT "userId", COUNT(*) as favorite_count 
FROM "FavoriteRepo" 
GROUP BY "userId";

-- 4. View recent favorites
SELECT 
  id,
  "userId",
  "githubRepoId",
  name,
  description,
  "starCount",
  language,
  "repoUrl",
  created_at
FROM "FavoriteRepo"
ORDER BY created_at DESC
LIMIT 10;

