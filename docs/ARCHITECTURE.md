# Architecture Documentation

## System Architecture

### High-Level Overview

GitHub Repo Explorer follows a **three-tier architecture**:

```
┌─────────────────────────────────────────────────────────────┐
│                        Presentation Layer                    │
│  React Frontend (Vercel) - User Interface & State Management│
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/REST API
┌────────────────────▼────────────────────────────────────────┐
│                      Application Layer                       │
│  Express Backend (Render) - Business Logic & API Endpoints  │
└────────────────────┬────────────────────────────────────────┘
                     │ SQL Queries
┌────────────────────▼────────────────────────────────────────┐
│                         Data Layer                           │
│  Supabase (PostgreSQL) - Persistent Data Storage            │
└─────────────────────────────────────────────────────────────┘
```

### Component Architecture

#### Frontend Architecture

```
App (Router)
├── Pages
│   ├── HomePage (Main Search & Browse)
│   ├── FavoritesPage (Favorites List)
│   ├── LoginPage
│   └── RegisterPage
│
├── Components
│   ├── Layout
│   │   ├── Navbar (Navigation & Theme)
│   │   └── AppLayout (Two-column layout)
│   │
│   ├── Features
│   │   ├── SearchBar (Repository search)
│   │   ├── UserProfileCard (GitHub user info)
│   │   ├── RepoList (Repository grid with sorting/filtering)
│   │   ├── RepoCard (Individual repository card)
│   │   └── FavoritesSidebar (Favorites panel)
│   │
│   └── Shared
│       ├── Loading (Loading states)
│       ├── ErrorMessage (Error display)
│       └── EmptyState (Empty state messages)
│
└── State Management
    ├── authStore (Authentication state)
    └── repoStore (Repository & favorites state)
```

#### Backend Architecture

```
Express Server
├── Routes
│   ├── authRoutes (/auth/*)
│   │   ├── POST /register
│   │   └── POST /login
│   │
│   └── userRoutes (/favorite-repos/*)
│       ├── GET /favorite-repos
│       ├── POST /favorite-repos
│       └── DELETE /favorite-repos/:id
│
├── Middleware
│   └── verifyToken (JWT validation)
│
├── Controllers
│   ├── registerUser
│   ├── loginUser
│   ├── getUserFavRepoData
│   ├── addUserFavRepo
│   └── deleteUserFavRepo
│
└── Services
    └── Supabase Client (Database operations)
```

## Data Flow

### Authentication Flow

```
1. User submits login form
   ↓
2. Frontend: authApi.loginUser()
   ↓
3. POST /auth/login
   ↓
4. Backend: loginUser controller
   ├── Validates credentials
   ├── Verifies password with bcrypt
   ├── Generates JWT token
   └── Returns token + user info
   ↓
5. Frontend: Stores token in localStorage
   ↓
6. Frontend: Updates authStore.isAuthenticated = true
```

### Favorite Repository Flow

```
1. User clicks favorite button
   ↓
2. Frontend: RepoCard → handleToggleFavorite()
   ↓
3. Frontend: AppLayout → onAddFavorite()
   ↓
4. Frontend: HomePage → handleAddRepo()
   ↓
5. Frontend: repoApi.addFavoriteRepo()
   ↓
6. POST /favorite-repos (with JWT token)
   ↓
7. Backend: verifyToken middleware validates JWT
   ↓
8. Backend: addUserFavRepo controller
   ├── Validates request body
   ├── Checks for duplicate
   ├── Inserts into Supabase
   └── Returns updated favorites array
   ↓
9. Frontend: Updates repoStore.favorites
   ↓
10. UI: Favorites sidebar updates automatically
```

## Design Patterns

### State Management Pattern

We use a **custom hook pattern** similar to Zustand for state management:

```typescript
// Store pattern
const useRepoStore = (): RepoStore => {
  const [state, setState] = useState(initialState);
  // ... business logic
  return { state, actions };
};
```

**Benefits:**
- Lightweight (no external dependencies)
- Type-safe with TypeScript
- Easy to test
- Familiar React patterns

### API Client Pattern

Centralized API functions with consistent error handling:

```typescript
// API layer pattern
export const repositoryApi = () => {
  const fetchRepos = async (): Promise<Repo[]> => {
    // Error handling
    // Response transformation
    // Type safety
  };
  return { fetchRepos, ... };
};
```

### Component Composition

- **Container/Presentational**: Pages contain logic, components are presentational
- **Compound Components**: AppLayout composes multiple child components
- **Render Props**: Components accept render functions for flexibility

## Security Considerations

### Authentication

- **JWT Tokens**: Stateless authentication
- **Password Hashing**: bcrypt with 10 salt rounds
- **Token Storage**: localStorage (consider httpOnly cookies for production)
- **Token Expiration**: 2 hours (configurable)

### API Security

- **Input Validation**: All endpoints validate request bodies
- **SQL Injection Prevention**: Supabase client handles parameterization
- **CORS**: Configured to allow only trusted origins
- **Error Messages**: Generic errors to prevent information leakage

### Database Security

- **Row Level Security**: Consider enabling RLS in Supabase for multi-tenant scenarios
- **Service Role Key**: Stored securely, never exposed to frontend
- **Password Storage**: Hashed with bcrypt, never stored in plain text

## Performance Optimizations

### Frontend

- **Code Splitting**: Vite automatically splits code by route
- **Memoization**: React.useMemo for expensive computations
- **Lazy Loading**: Consider lazy loading routes for production
- **Image Optimization**: Use optimized images (future enhancement)

### Backend

- **Database Indexes**: Indexed on userId and githubRepoId for fast queries
- **Connection Pooling**: Supabase handles connection pooling
- **Error Handling**: Prevents unnecessary database queries on errors

## Scalability Considerations

### Current Limitations

- **Single Database**: All users share one database instance
- **No Caching**: Every request hits the database
- **No Rate Limiting**: GitHub API calls are not rate-limited

### Future Enhancements

- **Redis Caching**: Cache GitHub API responses
- **Rate Limiting**: Implement rate limiting for API endpoints
- **Database Sharding**: Consider sharding for large user bases
- **CDN**: Use CDN for static assets
- **Load Balancing**: Multiple backend instances behind a load balancer

## Technology Choices & Rationale

### Why React + TypeScript?

- **Type Safety**: Catch errors at compile time
- **Developer Experience**: Excellent tooling and ecosystem
- **Performance**: Virtual DOM and efficient rendering
- **Community**: Large community and extensive resources

### Why Express.js?

- **Simplicity**: Minimal, unopinionated framework
- **Flexibility**: Easy to customize and extend
- **Ecosystem**: Large middleware ecosystem
- **TypeScript Support**: Excellent TypeScript integration

### Why Supabase?

- **Managed Service**: No database administration needed
- **PostgreSQL**: Robust, feature-rich database
- **Real-time**: Built-in real-time capabilities (future use)
- **Type Safety**: TypeScript client with type generation
- **Free Tier**: Generous free tier for development

### Why Tailwind CSS?

- **Utility-First**: Rapid UI development
- **Consistency**: Design system built-in
- **Performance**: Purges unused CSS automatically
- **Dark Mode**: Built-in dark mode support

## Database Schema

### User Table

```sql
CREATE TABLE "User" (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,  -- bcrypt hashed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes:**
- Primary key on `id`
- Unique constraint on `email`
- Index on `email` for fast lookups

### FavoriteRepo Table

```sql
CREATE TABLE "FavoriteRepo" (
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
  UNIQUE("userId", "githubRepoId")  -- Prevent duplicates
);
```

**Indexes:**
- Primary key on `id`
- Foreign key to `User(id)` with CASCADE delete
- Index on `userId` for fast user queries
- Index on `githubRepoId` for fast lookups
- Unique constraint on `(userId, githubRepoId)`

## API Design Principles

1. **RESTful**: Follow REST conventions where possible
2. **Consistent Responses**: All endpoints return consistent data structures
3. **Error Handling**: Standardized error response format
4. **Versioning**: Consider `/api/v1/` prefix for future versions
5. **Documentation**: Self-documenting with TypeScript types

## Future Enhancements

### Short-term
- [ ] GitHub user profile API integration
- [ ] Repository search (not just by username)
- [ ] Pagination for large repository lists
- [ ] Remove console.log statements for production

### Medium-term
- [ ] Real-time favorites sync (Supabase real-time)
- [ ] Repository tags/categories
- [ ] Export favorites to JSON/CSV
- [ ] Advanced filtering (date ranges, star counts)

### Long-term
- [ ] Multi-user collaboration (shared favorites)
- [ ] Repository analytics and insights
- [ ] GitHub webhook integration
- [ ] Mobile app (React Native)

