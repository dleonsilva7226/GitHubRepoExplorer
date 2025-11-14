# Development Guide

Comprehensive guide for developers working on GitHub Repo Explorer.

## Getting Started

### Initial Setup

1. **Clone and install:**
   ```bash
   git clone https://github.com/yourusername/GitHubRepoExplorer.git
   cd GitHubRepoExplorer
   
   # Backend
   cd backend && npm install
   
   # Frontend
   cd ../frontend && npm install
   ```

2. **Environment setup:**
   ```bash
   # Backend
   cd backend
   cp .env.example .env  # Create if doesn't exist
   # Edit .env with your Supabase credentials
   
   # Frontend
   cd ../frontend
   # No .env needed for local dev (uses hardcoded localhost:8000)
   ```

3. **Database setup:**
   - Run migrations in Supabase SQL Editor (see [Deployment Guide](./DEPLOYMENT.md))

4. **Start development servers:**
   ```bash
   # Terminal 1: Backend
   cd backend
   npm run dev
   
   # Terminal 2: Frontend
   cd frontend
   npm run dev
   ```

## Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `feature/*` - New features
- `fix/*` - Bug fixes
- `refactor/*` - Code refactoring

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: Add dark mode toggle
fix: Resolve favorites not persisting
refactor: Simplify auth store logic
docs: Update API documentation
test: Add unit tests for repo store
chore: Update dependencies
```

### Code Review Process

1. Create feature branch
2. Make changes and test locally
3. Push to remote
4. Create Pull Request
5. Address review comments
6. Merge after approval

## Project Structure

### Frontend Structure

```
frontend/src/
├── api/              # API client functions
│   ├── authApi.tsx   # Authentication API
│   ├── repoApi.tsx   # Repository API
│   └── index.ts      # API configuration
│
├── components/        # React components
│   ├── layout/       # Layout components (Navbar, AppLayout)
│   ├── features/     # Feature components (RepoCard, SearchBar)
│   └── shared/       # Shared components (Loading, ErrorMessage)
│
├── pages/            # Route pages
│   ├── HomePage.tsx
│   ├── FavoritesPage.tsx
│   ├── LoginPage.tsx
│   └── RegisterPage.tsx
│
├── store/            # State management
│   ├── authStore.tsx # Authentication state
│   └── repoStore.tsx # Repository & favorites state
│
└── interfaces/       # TypeScript type definitions
    └── ComponentTypes.tsx
```

### Backend Structure

```
backend/
├── controllers/      # Request handlers (business logic)
│   ├── registerUser.ts
│   ├── loginUser.ts
│   ├── getUserFavRepoData.ts
│   ├── addUserFavRepo.ts
│   └── deleteUserFavRepo.ts
│
├── middleware/       # Express middleware
│   └── verifyToken.ts
│
├── routes/           # Route definitions
│   ├── authRoutes.ts
│   └── userRoutes.ts
│
├── lib/             # Shared utilities
│   └── supabaseClient.ts
│
├── interfaces/      # TypeScript types
│   └── types.ts
│
├── supabase/        # Database migrations
│   └── migrations/
│
└── src/
    └── server.ts    # Application entry point
```

## Coding Standards

### TypeScript

- **Strict mode**: Always enabled
- **No `any` types**: Use proper types or `unknown`
- **Type inference**: Use when types are obvious
- **Explicit types**: Use for function parameters and return types

**Good:**
```typescript
const handleAddFavorite = async (repo: Repo): Promise<void> => {
  // ...
};
```

**Bad:**
```typescript
const handleAddFavorite = async (repo: any) => {
  // ...
};
```

### React Components

- **Functional components**: Always use function components
- **Hooks**: Use hooks for state and side effects
- **Props interface**: Define props with TypeScript interfaces
- **Component organization**: One component per file

**Example:**
```typescript
interface RepoCardProps {
  repo: Repo;
  onSave: (repo: Repo) => void;
  isAuthenticated: boolean;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo, onSave, isAuthenticated }) => {
  // Component logic
};
```

### Error Handling

- **Try-catch**: Always wrap async operations
- **User-friendly messages**: Don't expose technical errors
- **Logging**: Log errors for debugging
- **Type safety**: Use `unknown` and type guards

**Example:**
```typescript
try {
  const data = await fetchData();
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : 'An error occurred';
  console.error('Error:', error);
  setError(message);
}
```

### Naming Conventions

- **Components**: PascalCase (`UserProfileCard`)
- **Functions**: camelCase (`handleAddFavorite`)
- **Variables**: camelCase (`userEmail`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINT`)
- **Types/Interfaces**: PascalCase (`RepoCardProps`)
- **Files**: Match export (component files = PascalCase)

## Testing

### Frontend Testing

Currently, no tests are set up. To add testing:

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Create test file
# frontend/src/components/__tests__/RepoCard.test.tsx
```

**Example test:**
```typescript
import { render, screen } from '@testing-library/react';
import RepoCard from '../RepoCard';

describe('RepoCard', () => {
  it('renders repository name', () => {
    const repo = { id: 1, name: 'test-repo', ... };
    render(<RepoCard repo={repo} onSave={() => {}} isAuthenticated={true} />);
    expect(screen.getByText('test-repo')).toBeInTheDocument();
  });
});
```

### Backend Testing

Tests use Jest:

```bash
cd backend
npm test
npm run test:watch
npm run test:coverage
```

**Example test:**
```typescript
import { registerUser } from '../controllers/registerUser';

describe('registerUser', () => {
  it('should register a new user', async () => {
    // Test implementation
  });
});
```

## Debugging

### Frontend Debugging

1. **Browser DevTools:**
   - Console: Check for errors and logs
   - Network: Inspect API requests/responses
   - React DevTools: Inspect component state

2. **VS Code Debugging:**
   - Add breakpoints
   - Use "Debug: JavaScript Debug Terminal"
   - Attach debugger to running process

3. **Common Issues:**
   - Check `localStorage` for token
   - Verify API endpoint URL
   - Check CORS errors in console

### Backend Debugging

1. **Console Logging:**
   ```typescript
   console.log('Debug info:', { userId, repoId });
   console.error('Error:', error);
   ```

2. **VS Code Debugging:**
   - Set up `launch.json` for Node.js
   - Add breakpoints
   - Step through code

3. **Common Issues:**
   - Check environment variables
   - Verify Supabase connection
   - Check JWT token validation

## Performance Optimization

### Frontend

- **Memoization**: Use `React.useMemo` for expensive computations
- **Code splitting**: Lazy load routes
- **Image optimization**: Use optimized images
- **Bundle analysis**: Run `npm run build -- --analyze` (if configured)

### Backend

- **Database indexes**: Already added for common queries
- **Connection pooling**: Supabase handles this
- **Query optimization**: Monitor slow queries in Supabase

## Common Tasks

### Adding a New Component

1. Create component file: `components/NewComponent.tsx`
2. Define props interface
3. Implement component
4. Export component
5. Import and use in parent

### Adding a New API Endpoint

1. Create controller: `controllers/newEndpoint.ts`
2. Add route: `routes/userRoutes.ts` or `authRoutes.ts`
3. Add middleware if needed
4. Update API client: `frontend/src/api/repoApi.tsx`
5. Test endpoint

### Adding a New Database Table

1. Create migration: `supabase/migrations/YYYYMMDDHHMMSS_table_name.sql`
2. Run migration in Supabase SQL Editor
3. Update TypeScript interfaces if needed
4. Test database operations

## Git Workflow

### Making Changes

```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes
# ... edit files ...

# 3. Stage changes
git add .

# 4. Commit
git commit -m "feat: Add new feature"

# 5. Push
git push origin feature/new-feature

# 6. Create Pull Request on GitHub
```

### Before Committing

- [ ] Code compiles without errors
- [ ] Linting passes (`npm run lint`)
- [ ] Tests pass (if applicable)
- [ ] No console.log statements (or remove before commit)
- [ ] Meaningful commit message

## Dependencies

### Adding Dependencies

**Frontend:**
```bash
cd frontend
npm install package-name
npm install --save-dev dev-package-name
```

**Backend:**
```bash
cd backend
npm install package-name
npm install --save-dev dev-package-name
```

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update all (careful!)
npm update

# Update specific package
npm install package-name@latest
```

## Troubleshooting

### "Module not found" errors

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check import paths (case sensitivity on Linux/Mac)

### TypeScript errors

- Run `npm run build` to see all errors
- Check type definitions
- Verify imports are correct

### Build fails

- Check Node.js version (18+ required)
- Clear build cache: `rm -rf dist node_modules/.vite`
- Check for syntax errors

### Database connection issues

- Verify Supabase credentials
- Check network connectivity
- Verify tables exist
- Check Supabase project status

## Best Practices

### Code Organization

- **Single Responsibility**: Each function/component does one thing
- **DRY**: Don't repeat yourself
- **Separation of Concerns**: UI, business logic, and data access are separate
- **Composition over Inheritance**: Use component composition

### State Management

- **Local state**: Use `useState` for component-specific state
- **Shared state**: Use custom hooks (stores)
- **Server state**: Fetch on mount, cache when appropriate
- **Avoid prop drilling**: Use stores for deeply nested props

### API Design

- **Consistent responses**: Same structure across endpoints
- **Error handling**: Always handle errors gracefully
- **Type safety**: Type request/response bodies
- **Validation**: Validate input on both client and server

### Security

- **Never commit secrets**: Use environment variables
- **Validate input**: Always validate user input
- **Sanitize output**: Prevent XSS attacks
- **Use HTTPS**: Always in production

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

