# Quick Start Guide

Get up and running in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Supabase account (free tier works)

## Setup Steps

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/GitHubRepoExplorer.git
cd GitHubRepoExplorer
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
cat > .env << EOF
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
PORT=8000
NODE_ENV=development
EOF
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Database Setup

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project → SQL Editor
3. Run these migrations in order:

**Migration 1:**
```sql
CREATE TABLE IF NOT EXISTS "User" (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_email ON "User"(email);
```

**Migration 2:**
```sql
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
  UNIQUE("userId", "githubRepoId")
);

CREATE INDEX IF NOT EXISTS idx_favorite_repo_user_id ON "FavoriteRepo"("userId");
CREATE INDEX IF NOT EXISTS idx_favorite_repo_github_id ON "FavoriteRepo"("githubRepoId");

ALTER TABLE "FavoriteRepo" 
  ADD CONSTRAINT fk_favorite_repo_user 
  FOREIGN KEY ("userId") 
  REFERENCES "User"(id) 
  ON DELETE CASCADE;
```

### 5. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 6. Open Application

- Frontend: http://localhost:5173
- Backend: http://localhost:8000

## First Steps

1. **Register a new account:**
   - Click "Sign Up" in the navbar
   - Enter email and password
   - You'll be automatically logged in

2. **Search for repositories:**
   - Enter a GitHub username (e.g., "facebook", "vercel")
   - Click "Search"
   - Browse repositories

3. **Add favorites:**
   - Click the heart icon on any repository
   - See it appear in the favorites sidebar

4. **View favorites:**
   - Click "Favorites" in the navbar
   - See all your saved repositories

## Troubleshooting

**Backend won't start:**
- Check `.env` file exists and has correct values
- Verify Supabase credentials
- Check port 8000 is not in use

**Frontend won't start:**
- Check Node.js version: `node --version` (should be 18+)
- Delete `node_modules` and run `npm install` again

**Database errors:**
- Verify migrations ran successfully
- Check Supabase project is active
- Verify table names match (case-sensitive)

**Can't add favorites:**
- Make sure you're logged in
- Check browser console for errors
- Verify backend is running

## Next Steps

- Read [Development Guide](./DEVELOPMENT.md) for detailed development info
- Check [API Documentation](./API.md) for API reference
- See [Deployment Guide](./DEPLOYMENT.md) for production deployment

