# API Documentation

Complete API reference for GitHub Repo Explorer backend.

## Base URL

- **Development**: `http://localhost:8000`
- **Production**: `https://your-backend.onrender.com`

## Authentication

Most endpoints require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens are obtained through the `/auth/login` or `/auth/register` endpoints and are valid for 2 hours.

## Response Format

### Success Response

All successful responses return HTTP 200 or 201 with JSON body.

### Error Response

Error responses follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (authentication failed)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error

---

## Authentication Endpoints

### Register User

Create a new user account.

**Endpoint:** `POST /auth/register`

**Request:**
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | Valid email address |
| password | string | Yes | Minimum 6 characters |

**Response (201 Created):**
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

`400 Bad Request` - Missing or invalid fields
```json
{
  "success": false,
  "message": "Email or password missing"
}
```

`403 Forbidden` - Email already exists
```json
{
  "success": false,
  "message": "User email already in database"
}
```

**Example:**
```bash
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secure123"}'
```

---

### Login User

Authenticate and receive JWT token.

**Endpoint:** `POST /auth/login`

**Request:**
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | Registered email address |
| password | string | Yes | User password |

**Response (200 OK):**
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

`400 Bad Request` - Missing credentials
```json
{
  "message": "Need to provide email or password"
}
```

`403 Forbidden` - Invalid credentials
```json
{
  "success": false,
  "message": "Email address not in database"
}
```

or

```json
{
  "success": false,
  "message": "Passwords do not match"
}
```

**Example:**
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secure123"}'
```

---

## Favorites Endpoints

All favorites endpoints require authentication.

### Get Favorites

Retrieve all favorite repositories for the authenticated user.

**Endpoint:** `GET /favorite-repos`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
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
  },
  {
    "id": 2,
    "githubRepoId": 987654321,
    "name": "another-repo",
    "description": "Another great repository",
    "starCount": 100,
    "language": "JavaScript",
    "repoUrl": "https://github.com/user/another-repo"
  }
]
```

**Response Fields:**
| Field | Type | Description |
|-------|------|-------------|
| id | number | Database primary key |
| githubRepoId | number | GitHub repository ID |
| name | string | Repository name |
| description | string \| null | Repository description |
| starCount | number | Number of stars |
| language | string \| null | Primary programming language |
| repoUrl | string | Full GitHub URL |

**Empty Response:**
If user has no favorites, returns empty array:
```json
[]
```

**Error Responses:**

`401 Unauthorized` - Missing or invalid token
```json
{
  "success": false,
  "message": "No token provided. Please log in again."
}
```

`500 Internal Server Error`
```json
{
  "message": "Error fetching favorite repositories"
}
```

**Example:**
```bash
curl -X GET http://localhost:8000/favorite-repos \
  -H "Authorization: Bearer your_jwt_token_here"
```

---

### Add Favorite

Add a repository to user's favorites.

**Endpoint:** `POST /favorite-repos`

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

**Request Body Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| githubRepoId | number | Yes | GitHub repository ID |
| name | string | Yes | Repository name |
| description | string | No | Repository description (can be empty string) |
| starCount | number | Yes | Number of stars |
| language | string | No | Programming language (can be empty string) |
| repoUrl | string | Yes | Full GitHub repository URL |

**Response (200 OK):**
Returns updated array of all favorites:
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

`400 Bad Request` - Missing required fields
```json
{
  "success": false,
  "message": "Missing required fields: userId, githubRepoId, name, starCount, or repoUrl"
}
```

`401 Unauthorized` - Missing or invalid token
```json
{
  "success": false,
  "message": "No token provided. Please log in again."
}
```

`409 Conflict` - Repository already in favorites
```json
{
  "success": false,
  "message": "Repository already exists in favorites"
}
```

`500 Internal Server Error`
```json
{
  "success": false,
  "message": "Internal server error"
}
```

**Example:**
```bash
curl -X POST http://localhost:8000/favorite-repos \
  -H "Authorization: Bearer your_jwt_token_here" \
  -H "Content-Type: application/json" \
  -d '{
    "githubRepoId": 123456789,
    "name": "awesome-repo",
    "description": "An awesome repository",
    "starCount": 42,
    "language": "TypeScript",
    "repoUrl": "https://github.com/user/awesome-repo"
  }'
```

---

### Delete Favorite

Remove a repository from user's favorites.

**Endpoint:** `DELETE /favorite-repos/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | number | Yes | GitHub repository ID (not database ID) |

**Response (200 OK):**
Returns updated array of remaining favorites:
```json
[
  {
    "id": 2,
    "githubRepoId": 987654321,
    "name": "another-repo",
    ...
  }
]
```

**Error Responses:**

`400 Bad Request` - Missing or invalid ID
```json
{
  "success": false,
  "message": "Missing githubRepoId or userId"
}
```

`401 Unauthorized` - Missing or invalid token
```json
{
  "success": false,
  "message": "No token provided. Please log in again."
}
```

`404 Not Found` - Repository not in favorites
```json
{
  "success": false,
  "message": "Non-existent repo ID or user does not own favorite repo"
}
```

`500 Internal Server Error`
```json
{
  "message": "Internal server error."
}
```

**Example:**
```bash
curl -X DELETE http://localhost:8000/favorite-repos/123456789 \
  -H "Authorization: Bearer your_jwt_token_here"
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. Consider implementing rate limiting for production to prevent abuse.

**Recommended Limits:**
- Authentication endpoints: 5 requests per minute per IP
- Favorites endpoints: 60 requests per minute per user

## Error Handling

All endpoints follow consistent error handling:

1. **Validation Errors (400)**: Invalid or missing required fields
2. **Authentication Errors (401/403)**: Invalid or missing JWT token
3. **Not Found (404)**: Resource doesn't exist
4. **Conflict (409)**: Duplicate resource (e.g., favorite already exists)
5. **Server Errors (500)**: Internal server errors

Error responses include a `message` field describing the error. In production, avoid exposing sensitive error details.

## Testing the API

### Using cURL

```bash
# Register
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Login (save token)
TOKEN=$(curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}' \
  | jq -r '.token')

# Get favorites
curl -X GET http://localhost:8000/favorite-repos \
  -H "Authorization: Bearer $TOKEN"

# Add favorite
curl -X POST http://localhost:8000/favorite-repos \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "githubRepoId": 123456789,
    "name": "test-repo",
    "description": "Test repository",
    "starCount": 10,
    "language": "TypeScript",
    "repoUrl": "https://github.com/user/test-repo"
  }'

# Delete favorite
curl -X DELETE http://localhost:8000/favorite-repos/123456789 \
  -H "Authorization: Bearer $TOKEN"
```

### Using Postman

1. Import the collection (create manually):
   - Base URL: `http://localhost:8000`
   - Create requests for each endpoint
   - Set up environment variables for token

2. **Authentication Flow:**
   - Register → Save token from response
   - Login → Update token
   - Use token in Authorization header for protected routes

## Versioning

Currently, the API is unversioned. For future updates, consider:

- Adding `/api/v1/` prefix to all endpoints
- Maintaining backward compatibility
- Documenting breaking changes

## Changelog

### Current Version
- Initial API implementation
- JWT authentication
- CRUD operations for favorites
- Supabase integration

