-- Manual SQL to add a test favorite (for testing purposes)
-- Replace USER_ID with your actual user ID from the User table
-- You can get your user ID by running: SELECT id, email FROM "User";

-- Example: Add a test favorite
-- Replace 1 with your actual userId
INSERT INTO "FavoriteRepo" (
  "userId",
  "githubRepoId",
  name,
  description,
  "starCount",
  language,
  "repoUrl"
) VALUES (
  1,  -- Replace with your userId
  123456789,  -- GitHub repo ID (any number for testing)
  'test-repo',
  'This is a test repository',
  42,
  'TypeScript',
  'https://github.com/test/test-repo'
)
ON CONFLICT ("userId", "githubRepoId") DO NOTHING;

-- Verify it was added
SELECT * FROM "FavoriteRepo" WHERE name = 'test-repo';

