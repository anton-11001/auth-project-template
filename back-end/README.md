# Back-End Structure Blueprint

## Structure

```txt id="z0f2y9"
back-end/
  src/
    index.ts                 // server bootstrap
    app.ts                   // express app config

    config/                  // env, db config, constants
    routes/                  // route registration
    controllers/             // req/res layer only
    services/                // business logic
    models/                  // mongoose schemas
    middlewares/             // auth/error/etc
    validations/             // validation schemas
    utils/                   // shared helpers
    exceptions/              // custom errors
    dtos/                    // response shaping
    types/                   // global shared TypeScript types
    tokens/                  // jwt logic

    modules/                 // feature-based grouping later
      auth/
      user/
```

## Folder Responsibilities

### controllers/

Request/response layer only.

- Only `request`, `response`, `next`
- No business logic
- Calls services and returns response

All controller request and response types should be explicitly typed.

### services/

Core business logic.

Examples:

- `authService`
- `tokenService`

Should not contain Express-specific logic.

All service inputs and outputs should be fully typed.

### models/

Database schemas and ORM/ODM models.

If using Mongoose, this layer is usually enough without extra database abstraction.

Types/interfaces for models should be separated from schema implementation when possible.

### middlewares/

Reusable Express middlewares.

Examples:

- auth middleware
- error middleware
- validation middleware

Middleware request extensions should be typed globally.

### validations/

Validation schemas and request validation logic.

Example:

```txt id="1h4f4d"
auth.validation.ts
user.validation.ts
```

Validation schemas should infer TypeScript types whenever possible.

### dtos/

Response transformation layer.

Used to control API response shape and hide internal fields.

All API responses should use typed DTOs.

### types/

Global shared TypeScript types.

Examples:

```txt id="m6h9u8"
api.types.ts
express.types.ts
jwt.types.ts
env.types.ts
```

Used for:

- API request/response types
- Express request extensions
- JWT payload types
- shared utility types

### utils/

Pure reusable helpers.

Examples:

- token parsing
- date formatting
- random generators

Avoid mixing helpers into services.

### exceptions/

Custom application errors.

Examples:

- `ApiError`
- `UnauthorizedError`
- `ValidationError`

### config/

Application configuration.

Examples:

- environment variables
- database config
- constants

Environment variables should be validated and typed on startup.

### modules/

Feature-based grouping for scalability.

Recommended once the project starts growing.

Example:

```txt id="kgxg2e"
modules/
  auth/
    auth.controller.ts
    auth.service.ts
    auth.routes.ts
    auth.validation.ts
    auth.model.ts
    auth.types.ts
    auth.dto.ts
```

Feature-based architecture scales better than pure layer-based architecture on large projects.

## TypeScript Guidelines

- Type all API requests and responses
- Avoid `any`
- Prefer inferred types from validation schemas
- Keep DTOs and database models separated
- Share API contracts through reusable types
- Prefer explicit service return types
- Extend Express Request globally for auth/user data
- Centralize shared types inside `types/`

## Recommended Improvements

- Use path aliases

```ts id="0v0teb"
@/services
@/models
@/types
```

- Add central error handler
- Add async wrapper
- Validate environment variables on startup
- Use DTOs for API responses
- Add logger (`pino` or `winston`)
- Configure ESLint and Prettier from the start
- Use strict TypeScript configuration

## Notes

This structure is intentionally minimal while still being scalable.

Good for:

- pet projects
- auth starters
- small fullstack apps
- scalable Express APIs

As the project grows, gradually move toward feature-based architecture instead of keeping everything separated only by technical layers.
