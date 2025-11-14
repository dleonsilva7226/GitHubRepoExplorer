-- Create FavoriteRepo table
CREATE TABLE IF NOT EXISTS "FavoriteRepo" (
  id BIGSERIAL PRIMARY KEY,
  "userId" BIGINT NOT NULL,
  "githubRepoId" BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  "starCount" INTEGER NOT NULL DEFAULT 0,
  language VARCHAR(100),
  "repoUrl" TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Ensure a user can't favorite the same repo twice
  UNIQUE("userId", "githubRepoId")
);

-- Create index on userId for faster queries
CREATE INDEX IF NOT EXISTS idx_favorite_repo_user_id ON "FavoriteRepo"("userId");

-- Create index on githubRepoId for faster lookups
CREATE INDEX IF NOT EXISTS idx_favorite_repo_github_id ON "FavoriteRepo"("githubRepoId");

-- Add foreign key constraint to User table
ALTER TABLE "FavoriteRepo" 
  ADD CONSTRAINT fk_favorite_repo_user 
  FOREIGN KEY ("userId") 
  REFERENCES "User"(id) 
  ON DELETE CASCADE;

