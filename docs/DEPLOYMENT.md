# Deployment Guide

This guide covers deploying GitHub Repo Explorer to production environments.

## Prerequisites

- [ ] Supabase project created and configured
- [ ] Database migrations executed
- [ ] Environment variables documented
- [ ] Domain names configured (optional)

## Deployment Checklist

### Pre-Deployment

- [ ] All tests passing
- [ ] Build succeeds locally (`npm run build`)
- [ ] Linting passes (`npm run lint`)
- [ ] Environment variables documented
- [ ] Database migrations ready
- [ ] CORS configured for production domains

## Frontend Deployment (Vercel)

### Step 1: Prepare for Deployment

1. **Update API endpoint:**
   ```typescript
   // frontend/src/api/index.ts
   export const endpointPrefix = process.env.VITE_API_URL || "https://your-backend.onrender.com";
   ```

2. **Verify build:**
   ```bash
   cd frontend
   npm run build
   ```

### Step 2: Deploy to Vercel

#### Option A: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? [Your account]
# - Link to existing project? No
# - Project name? github-repo-explorer-frontend
# - Directory? ./
# - Override settings? No
```

#### Option B: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Environment Variables** (if using):
   - `VITE_API_URL` = `https://your-backend.onrender.com`

6. Click "Deploy"

### Step 3: Post-Deployment

1. **Verify deployment:**
   - Visit your Vercel URL
   - Test login/registration
   - Test favorites functionality

2. **Update backend CORS:**
   - Add your Vercel domain to allowed origins

## Backend Deployment (Render)

### Step 1: Prepare for Deployment

1. **Verify environment variables:**
   ```bash
   # Check .env file exists with all required variables
   cat backend/.env
   ```

2. **Test build locally:**
   ```bash
   cd backend
   npm install
   npm run build  # If you have a build script
   ```

### Step 2: Deploy to Render

1. **Create Web Service:**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service:**
   - **Name**: `github-repo-explorer-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your production branch)
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` (or `node dist/server.js` if using build)

3. **Environment Variables:**
   ```
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   JWT_SECRET=your_secure_jwt_secret_min_32_chars
   PORT=8000
   NODE_ENV=production
   ```

4. **Advanced Settings:**
   - **Auto-Deploy**: Yes (deploys on push to main)
   - **Health Check Path**: `/health` (if you add one)

5. **Click "Create Web Service"**

### Step 3: Configure CORS

Update `backend/src/server.ts`:

```typescript
app.use(cors({
  origin: [
    'https://your-app.vercel.app',
    'http://localhost:5173', // Keep for local dev
  ],
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

### Step 4: Database Setup

1. **Run migrations in Supabase:**
   - Go to Supabase Dashboard → SQL Editor
   - Execute:
     ```sql
     -- Run 20250727060755_create_users_table.sql
     -- Run 20250727060756_create_favorite_repo_table.sql
     ```

2. **Verify tables:**
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name IN ('User', 'FavoriteRepo');
   ```

### Step 5: Post-Deployment

1. **Test endpoints:**
   ```bash
   # Test health (if you add a health endpoint)
   curl https://your-backend.onrender.com/health
   
   # Test registration
   curl -X POST https://your-backend.onrender.com/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"test123"}'
   ```

2. **Monitor logs:**
   - Check Render dashboard for deployment logs
   - Monitor for errors in the first few minutes

## Environment Variables Reference

### Backend (.env)

```env
# Required
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT_SECRET=your_super_secret_key_minimum_32_characters_long

# Optional
PORT=8000
NODE_ENV=production
```

### Frontend (.env)

```env
# Optional (if using environment-based config)
VITE_API_URL=https://your-backend.onrender.com
```

## Database Migration Guide

### Manual Migration (Recommended)

1. **Access Supabase SQL Editor:**
   - Go to your Supabase project dashboard
   - Navigate to "SQL Editor"

2. **Run migrations in order:**
   ```sql
   -- Migration 1: Users table
   -- Copy contents of backend/supabase/migrations/20250727060755_create_users_table.sql
   
   -- Migration 2: FavoriteRepo table
   -- Copy contents of backend/supabase/migrations/20250727060756_create_favorite_repo_table.sql
   ```

3. **Verify:**
   ```sql
   SELECT * FROM "User" LIMIT 1;
   SELECT * FROM "FavoriteRepo" LIMIT 1;
   ```

### Using Supabase CLI (Alternative)

```bash
# If you have Supabase CLI set up
cd backend
supabase db push
```

## Post-Deployment Verification

### Frontend Checks

- [ ] Homepage loads correctly
- [ ] Search functionality works
- [ ] Login/Registration works
- [ ] Favorites can be added/removed
- [ ] Dark mode toggle works
- [ ] Responsive design works on mobile

### Backend Checks

- [ ] Health check endpoint responds (if implemented)
- [ ] Registration endpoint works
- [ ] Login endpoint works
- [ ] Favorites endpoints work (GET, POST, DELETE)
- [ ] Error handling returns proper status codes
- [ ] CORS allows frontend domain

### Integration Checks

- [ ] Frontend can communicate with backend
- [ ] Authentication flow works end-to-end
- [ ] Favorites persist across page refreshes
- [ ] Error messages display correctly

## Monitoring & Maintenance

### Logging

**Backend:**
- Monitor Render logs for errors
- Set up error tracking (consider Sentry)
- Log important events (user registration, errors)

**Frontend:**
- Monitor Vercel function logs
- Set up error tracking for client-side errors
- Track user analytics (optional)

### Health Checks

Consider adding a health check endpoint:

```typescript
// backend/src/server.ts
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString() 
  });
});
```

### Database Maintenance

- **Regular Backups**: Supabase handles automatic backups
- **Monitor Performance**: Check slow queries in Supabase dashboard
- **Index Optimization**: Monitor query performance and add indexes as needed

## Rollback Procedure

### Frontend (Vercel)

1. Go to Vercel dashboard
2. Navigate to your project → Deployments
3. Find the previous working deployment
4. Click "..." → "Promote to Production"

### Backend (Render)

1. Go to Render dashboard
2. Navigate to your service → Manual Deploy
3. Select previous commit
4. Deploy

### Database

- **Migrations are additive**: No rollback needed for current migrations
- **For future migrations**: Create rollback scripts before deploying

## Troubleshooting Deployment

### Frontend Issues

**Build fails:**
- Check Vercel build logs
- Verify all dependencies are in package.json
- Check for TypeScript errors locally first

**API calls fail:**
- Verify `endpointPrefix` is correct
- Check CORS configuration on backend
- Verify backend is running and accessible

### Backend Issues

**Service won't start:**
- Check Render logs for errors
- Verify environment variables are set
- Check Node.js version compatibility

**Database connection fails:**
- Verify Supabase credentials
- Check network connectivity
- Verify Supabase project is active

**CORS errors:**
- Update CORS configuration to include frontend domain
- Check allowed methods and headers
- Verify credentials setting if using cookies

## Security Checklist

- [ ] JWT_SECRET is strong (32+ characters, random)
- [ ] SUPABASE_SERVICE_ROLE_KEY is never exposed to frontend
- [ ] CORS is configured to allow only trusted domains
- [ ] Environment variables are set in deployment platform (not in code)
- [ ] Database has proper indexes for performance
- [ ] Error messages don't leak sensitive information
- [ ] Passwords are hashed (bcrypt)
- [ ] HTTPS is enabled (Vercel and Render provide this automatically)

## Performance Optimization

### Frontend

- Enable Vercel's edge caching
- Optimize images (use WebP format)
- Enable compression (Vercel handles this)
- Consider lazy loading for routes

### Backend

- Enable Render's auto-scaling
- Monitor database query performance
- Consider adding Redis for caching (future)
- Implement rate limiting (future)

## Cost Estimation

### Free Tier Limits

**Vercel:**
- 100GB bandwidth/month
- Unlimited deployments
- Sufficient for small to medium apps

**Render:**
- 750 hours/month free tier
- Sleeps after 15 minutes of inactivity (free tier)
- Consider paid tier for always-on service

**Supabase:**
- 500MB database
- 2GB bandwidth
- 50,000 monthly active users
- Sufficient for development and small apps

### Scaling Considerations

- Monitor usage and upgrade before hitting limits
- Consider paid tiers for production workloads
- Implement caching to reduce database queries
- Optimize queries to reduce bandwidth usage

