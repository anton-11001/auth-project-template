# Auth Backend API

Express + TypeScript backend with PostgreSQL, JWT access tokens, HTTP-only refresh-token cookies, Zod validation, Pino logging, and centralized error handling.

## Setup

Install dependencies:

```bash
npm install
```

Create `back-end/.env`:

```env
PORT=8000
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/auth

JWT_ACCESS_SECRET=at_least_32_characters_long_secret
JWT_REFRESH_SECRET=another_32_characters_long_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

CLIENT_URL=http://localhost:3000
NODE_ENV=development
LOG_LEVEL=debug
```

Required variables:

- `DATABASE_URL`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`

Optional variables:

- `PORT`, default `8000`
- `JWT_ACCESS_EXPIRES_IN`, default `15m`
- `JWT_REFRESH_EXPIRES_IN`, default `7d`
- `CLIENT_URL`
- `NODE_ENV`, default `development`
- `LOG_LEVEL`

Run development server:

```bash
npm run dev
```

Build production output:

```bash
npm run build
```

Start built server:

```bash
npm start
```

## Startup Behavior

On startup the backend:

1. validates environment variables;
2. connects to PostgreSQL;
3. creates required database extension and tables if they do not exist;
4. mounts routes under `/api`;
5. starts listening on `PORT`.

The server creates these tables automatically:

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## Auth Model

The API uses two token types:

- Access token: short-lived JWT returned in the JSON response.
- Refresh token: longer-lived JWT stored as an HTTP-only cookie named `refreshToken`.

Refresh tokens are not stored raw in PostgreSQL. The backend stores a SHA-256 hash of each refresh token in `refresh_tokens`.

Use the access token for protected requests:

```txt
Authorization: Bearer ACCESS_TOKEN
```

Refresh cookie options:

```ts
{
  httpOnly: true,
  sameSite: "lax",
  secure: NODE_ENV === "production",
  maxAge: JWT_REFRESH_EXPIRES_IN
}
```

## API Routes

Base URL:

```txt
/api
```

Auth routes:

```txt
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
GET  /api/auth/me
```

## Register

```txt
POST /api/auth/register
```

Creates a new user, creates an access token, creates a refresh token, stores the refresh-token hash, and sets the refresh token cookie.

Request body:

```json
{
  "email": "user@example.com",
  "username": "john",
  "password": "StrongPassword123"
}
```

Validation:

- `email`: valid email, lowercased by validation.
- `username`: 3 to 32 characters.
- `password`: 8 to 32 characters.

Success response:

```txt
201 Created
```

```json
{
  "accessToken": "jwt_access_token",
  "user": {
    "email": "user@example.com",
    "id": "user_uuid",
    "username": "john"
  }
}
```

Response also includes:

```txt
Set-Cookie: refreshToken=...
```

Possible errors:

```txt
400 Validation error
409 Email is already used
409 Username is already used
500 Internal server error
```

## Login

```txt
POST /api/auth/login
```

Authenticates an existing user, creates an access token, creates a refresh token, stores the refresh-token hash, and sets the refresh token cookie.

Request body:

```json
{
  "email": "user@example.com",
  "password": "StrongPassword123"
}
```

Validation:

- `email`: valid email, lowercased by validation.
- `password`: non-empty string.

Success response:

```txt
200 OK
```

```json
{
  "accessToken": "jwt_access_token",
  "user": {
    "email": "user@example.com",
    "id": "user_uuid",
    "username": "john"
  }
}
```

Response also includes:

```txt
Set-Cookie: refreshToken=...
```

Invalid login always returns the same generic message:

```txt
401 Unauthorized
```

```json
{
  "message": "Invalid email or password"
}
```

## Refresh

```txt
POST /api/auth/refresh
```

Creates a new access token from a valid refresh token.

The backend reads the refresh token from the HTTP-only `refreshToken` cookie.

For non-browser clients, the endpoint also accepts:

```json
{
  "refreshToken": "jwt_refresh_token"
}
```

Success response:

```txt
200 OK
```

```json
{
  "accessToken": "new_jwt_access_token"
}
```

Possible errors:

```txt
401 Missing refresh token
401 Invalid refresh token
500 Internal server error
```

## Logout

```txt
POST /api/auth/logout
```

Deletes the current refresh token record from PostgreSQL and clears the `refreshToken` cookie.

The backend reads the refresh token from the HTTP-only cookie, or from the body:

```json
{
  "refreshToken": "jwt_refresh_token"
}
```

Success response:

```txt
200 OK
```

```json
{
  "message": "Logged out"
}
```

Possible errors:

```txt
401 Missing refresh token
500 Internal server error
```

## Me

```txt
GET /api/auth/me
```

Returns the current authenticated user.

Required header:

```txt
Authorization: Bearer ACCESS_TOKEN
```

Success response:

```txt
200 OK
```

```json
{
  "user": {
    "email": "user@example.com",
    "id": "user_uuid",
    "username": "john"
  }
}
```

Possible errors:

```txt
401 Missing access token
401 Invalid access token
500 Internal server error
```

## Error Responses

Validation errors:

```json
{
  "errors": [
    {
      "code": "too_small",
      "message": "String must contain at least 8 character(s)",
      "path": ["body", "password"]
    }
  ],
  "message": "Validation error"
}
```

Application errors:

```json
{
  "message": "Email is already used"
}
```

Unexpected errors:

```json
{
  "message": "Internal server error"
}
```

## Status Codes

```txt
200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
500 Internal Server Error
```

## Request Flow

### Register/Login

```txt
request
  -> express.json
  -> cookie parser
  -> helmet
  -> cors
  -> request logger
  -> route validation
  -> controller
  -> service
  -> PostgreSQL model queries
  -> response DTO
  -> response
```

### Protected Route

```txt
request
  -> auth middleware
  -> verify access token
  -> attach request.user
  -> controller
  -> response
```

### Error Flow

```txt
thrown error
  -> asyncHandler
  -> errorMiddleware
  -> ZodError / ApiError / unexpected fallback
  -> Pino log
  -> JSON response
```

## Project Structure

```txt
src/
  config/
    database.ts
    env.ts
    logger.ts
    status-codes.ts

  errors/
    api-error.ts

  middlewares/
    auth.ts
    error.ts
    logger.ts
    validate.ts

  models/
    refresh-token/

  modules/
    auth/
      controllers/
      services/
      routes.ts
      types.ts
      validation.ts
    user/
      model/
      dto.ts
      types.ts

  routes/
    index.ts

  types/
    auth.ts
    express.ts

  utils/
    async-handler.ts
    hash/
    password/
    time/
    token/
```

## Notes

- User responses never include `password_hash`.
- Refresh tokens are stored only as hashes.
- Access tokens use `sub` as the user id.
- The refresh endpoint currently issues a new access token but does not rotate the refresh token.
- Logout deletes only the current refresh token.
- The database tables are auto-created at startup for local development convenience.
