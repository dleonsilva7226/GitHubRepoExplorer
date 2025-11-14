# GitHub Repo Explorer

A modern, full-stack web application for exploring GitHub repositories and managing favorites. Built with React, TypeScript, Express, and Supabase.

## 🚀 Features

- **Repository Search**: Search and browse GitHub repositories by username
- **User Profiles**: View GitHub user profiles with followers, following, and repository counts
- **Favorites Management**: Save and organize favorite repositories
- **Authentication**: Secure user registration and login with JWT tokens
- **Modern UI**: Beautiful, responsive design with dark mode support
- **Real-time Updates**: Instant UI feedback with optimistic updates

## ⚡ Quick Start

```bash
# Clone and install
git clone https://github.com/yourusername/GitHubRepoExplorer.git
cd GitHubRepoExplorer

# Backend
cd backend && npm install
# Add .env file with Supabase credentials

# Frontend  
cd ../frontend && npm install

# Start dev servers
cd ../backend && npm run dev  # Terminal 1
cd ../frontend && npm run dev # Terminal 2
```

See [Quick Start Guide](./docs/QUICK_START.md) for detailed setup instructions.

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Documentation](#-documentation)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Development](#development)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

## 🏗️ Architecture

### System Overview

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Frontend  │ ──────> │   Backend   │ ──────> │  Supabase  │
│  (Vercel)   │         │   (Render)  │         │  Database  │
└─────────────┘         └─────────────┘         └─────────────┘
      │                        │
      │                        │
      └────────────────────────┘
         GitHub API (Public)
```

### Design Decisions

- **Frontend**: React with TypeScript for type safety and modern development experience
- **State Management**: Custom hooks (Zustand-like pattern) for lightweight, focused state
- **Backend**: Express.js with TypeScript for type-safe API development
- **Database**: Supabase (PostgreSQL) for managed database with built-in auth capabilities
- **Authentication**: JWT tokens stored in localStorage (consider httpOnly cookies for production)
- **Styling**: Tailwind CSS for utility-first, maintainable styling

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

### Backend
- **Express.js 5** - Web framework
- **TypeScript** - Type safety
- **Supabase** - Database and ORM
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

### Infrastructure
- **Supabase** - PostgreSQL database
- **Vercel** - Frontend hosting (recommended)
- **Render** - Backend hosting (recommended)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/GitHubRepoExplorer.git
   cd GitHubRepoExplorer
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables** (see [Environment Variables](#environment-variables))

5. **Set up the database**
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Run the migrations in order:
     - `backend/supabase/migrations/20250727060755_create_users_table.sql`
     - `backend/supabase/migrations/20250727060756_create_favorite_repo_table.sql`

6. **Start development servers**
   ```bash
   # Terminal 1: Backend
   cd backend
   npm run dev

   # Terminal 2: Frontend
   cd frontend
   npm run dev
   ```

The app will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`

## 📖 Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Quick Start Guide](./docs/QUICK_START.md)** - Get running in 5 minutes
- **[Architecture Documentation](./docs/ARCHITECTURE.md)** - System design and patterns
- **[API Documentation](./docs/API.md)** - Complete API reference
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Production deployment instructions
- **[Development Guide](./docs/DEVELOPMENT.md)** - Developer workflow and standards

## 📚 API Documentation

### Base URL
- **Development**: `http://localhost:8000`
- **Production**: `https://your-backend.onrender.com`

> For complete API documentation, see [API.md](./docs/API.md)

### Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Endpoints

#### Authentication

##### `POST /auth/register`
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400` - Missing email or password
- `403` - Email already exists
- `500` - Server error

##### `POST /auth/login`
Authenticate a user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Correct. User Login Happening Now",
  "user": {
    "id": 1,
    "email": "user@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400` - Missing credentials or invalid email format
- `403` - Invalid credentials
- `500` - Server error

#### Favorites (Protected)

##### `GET /favorite-repos`
Get all favorite repositories for the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "id": 1,
    "githubRepoId": 123456789,
    "name": "awesome-repo",
    "description": "An awesome repository",
    "starCount": 42,
    "language": "TypeScript",
    "repoUrl": "https://github.com/user/awesome-repo"
  }
]
```

**Error Responses:**
- `401` - Unauthorized (no token or invalid token)
- `500` - Server error

##### `POST /favorite-repos`
Add a repository to favorites.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "githubRepoId": 123456789,
  "name": "awesome-repo",
  "description": "An awesome repository",
  "starCount": 42,
  "language": "TypeScript",
  "repoUrl": "https://github.com/user/awesome-repo"
}
```

**Response (200):**
```json
[
  {
    "id": 1,
    "githubRepoId": 123456789,
    "name": "awesome-repo",
    "description": "An awesome repository",
    "starCount": 42,
    "language": "TypeScript",
    "repoUrl": "https://github.com/user/awesome-repo"
  }
]
```

**Error Responses:**
- `400` - Missing required fields
- `401` - Unauthorized
- `409` - Repository already in favorites
- `500` - Server error

##### `DELETE /favorite-repos/:id`
Remove a repository from favorites by GitHub repo ID.

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id` - GitHub repository ID (number)

**Response (200):**
```json
[
  {
    "id": 1,
    "githubRepoId": 987654321,
    "name": "another-repo",
    ...
  }
]
```

**Error Responses:**
- `400` - Invalid or missing ID
- `401` - Unauthorized
- `404` - Repository not found in favorites
- `500` - Server error

## 🚢 Deployment

### Frontend (Vercel)

1. **Connect your repository** to Vercel
2. **Configure build settings:**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Set environment variables:**
   - `VITE_API_URL` (optional, if using env-based config)

4. **Update API endpoint:**
   - Edit `frontend/src/api/index.ts`
   - Change `endpointPrefix` to your production backend URL

5. **Deploy**: Vercel will automatically deploy on push to main

### Backend (Render)

1. **Create a new Web Service** on Render
2. **Connect your repository**
3. **Configure build settings:**
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`

4. **Set environment variables:**
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   JWT_SECRET=your_jwt_secret
   PORT=8000
   NODE_ENV=production
   ```

5. **Configure CORS:**
   - Update `backend/src/server.ts` to allow your Vercel domain
   ```typescript
   app.use(cors({
     origin: ['https://your-app.vercel.app', 'http://localhost:5173'],
     credentials: true
   }));
   ```

6. **Deploy**: Render will build and deploy automatically

### Database Setup

1. **Run migrations in Supabase:**
   - Go to Supabase Dashboard → SQL Editor
   - Execute migrations in order:
     - `20250727060755_create_users_table.sql`
     - `20250727060756_create_favorite_repo_table.sql`

2. **Verify tables:**
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```

## 💻 Development

### Project Structure

```
GitHubRepoExplorer/
├── backend/
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Auth middleware
│   ├── routes/          # API route definitions
│   ├── lib/             # Shared utilities (Supabase client)
│   ├── interfaces/      # TypeScript type definitions
│   ├── supabase/        # Database migrations
│   └── src/
│       └── server.ts    # Express server entry point
│
└── frontend/
    ├── src/
    │   ├── api/         # API client functions
    │   ├── components/  # React components
    │   ├── pages/       # Route pages
    │   ├── store/       # State management hooks
    │   └── interfaces/  # TypeScript type definitions
    └── public/          # Static assets
```

### Development Workflow

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and test locally:**
   ```bash
   # Backend
   cd backend && npm run dev
   
   # Frontend
   cd frontend && npm run dev
   ```

3. **Run tests and linting:**
   ```bash
   # Frontend
   cd frontend
   npm run lint
   npm run build
   
   # Backend
   cd backend
   npm test
   ```

4. **Commit and push:**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on GitHub

### Code Style

- **TypeScript**: Strict mode enabled, no `any` types
- **ESLint**: Configured with React and TypeScript rules
- **Naming**: 
  - Components: PascalCase (`UserProfileCard.tsx`)
  - Functions: camelCase (`handleAddFavorite`)
  - Constants: UPPER_SNAKE_CASE (`API_ENDPOINT`)

### Testing

```bash
# Backend tests
cd backend
npm test
npm run test:watch
npm run test:coverage

# Frontend (add tests as needed)
cd frontend
npm test
```

## 🔐 Environment Variables

### Backend

Create a `.env` file in the `backend/` directory:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_min_32_chars

# Server Configuration
PORT=8000
NODE_ENV=development
```

### Frontend

Create a `.env` file in the `frontend/` directory (optional):

```env
VITE_API_URL=http://localhost:8000
```

**Note**: Currently, the API URL is hardcoded in `frontend/src/api/index.ts`. Update this for production.

## 🐛 Troubleshooting

### Common Issues

#### Frontend build fails
- **Issue**: TypeScript errors
- **Solution**: Run `npm run build` to see specific errors, fix type issues

#### Backend can't connect to Supabase
- **Issue**: Connection timeout or authentication error
- **Solution**: 
  - Verify `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are correct
  - Check Supabase project is active
  - Verify network/firewall settings

#### Favorites not saving
- **Issue**: Favorites appear but don't persist
- **Solution**:
  - Check browser console for errors
  - Verify JWT token is valid (check localStorage)
  - Check backend logs for database errors
  - Ensure tables exist in Supabase

#### CORS errors
- **Issue**: Requests blocked by CORS policy
- **Solution**: Update CORS configuration in `backend/src/server.ts` to include your frontend domain

### Debugging

**Frontend:**
- Check browser DevTools → Console for errors
- Check Network tab for failed API requests
- Verify token exists: `localStorage.getItem('token')`

**Backend:**
- Check server logs for errors
- Verify environment variables are set
- Test database connection with Supabase dashboard

## 📝 License

See [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

For questions or issues, please open an issue on GitHub.

---

**Built with ❤️ using React, TypeScript, and Supabase**
