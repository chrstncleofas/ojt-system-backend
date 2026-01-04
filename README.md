# OJT System — Backend

Node.js + Express + TypeScript backend API for the OJT Management System with MongoDB.

## Prerequisites

- Node.js 18+ and pnpm (preferred). If you don't have `pnpm` installed:
  ```bash
  npm install -g pnpm
  ```
- A MongoDB Atlas cluster or local MongoDB instance

## Quick Start

1. Install dependencies:
   ```bash
   cd backend
   pnpm install
   ```
2. Create `.env.local` (copy from `.env.local.example`):
   ```bash
   cp .env.local.example .env.local
   ```
3. Update `.env.local` with your credentials:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ojtsystem
   JWT_SECRET=your_jwt_secret_here
   ```
4. Run the dev server:
   ```bash
   pnpm dev
   ```

## Features

- 🚀 **Express.js** - Fast, unopinionated web framework
- 🎯 **TypeScript** - Type-safe development
- 🗃️ **MongoDB + Mongoose** - NoSQL database with ODM
- 🔐 **JWT Authentication** - Secure token-based auth
- 📁 **Multer** - File upload handling
- 📝 **Morgan** - HTTP request logging

## Tech Stack

- Node.js 18+
- Express 4.x
- TypeScript 5.x
- Mongoose 7.x
- JWT (jsonwebtoken)
- bcrypt for password hashing

## Project Structure

```
src/
├── controllers/       # Route handlers
│   ├── auth.controller.ts
│   ├── student.controller.ts
│   ├── announcement.controller.ts
│   ├── submission.controller.ts
│   └── timelog.controller.ts
├── interfaces/        # TypeScript interfaces
├── middleware/        # Express middleware
│   └── auth.middleware.ts
├── models/            # Mongoose models
├── routes/            # Route definitions
│   ├── index.ts
│   ├── auth.route.ts
│   ├── student.route.ts
│   └── ...
├── services/          # Business logic
├── utils/             # Utility functions
├── constants/         # App constants & messages
├── scripts/           # DB scripts
│   ├── init-db.ts
│   └── seed.ts
├── app.ts             # Express app setup
└── server.ts          # Server entry point
scripts/
└── migrate-pendingapplications.ts  # DB migration utility
uploads/               # File uploads directory
```

## Developer Workflow

### Code Quality Tools

This project uses **Husky** + **lint-staged** to automatically run checks on every commit:

| Tool | Purpose |
|------|---------|
| **ESLint** | Linting & code quality |
| **Prettier** | Code formatting |
| **Husky** | Git hooks |
| **lint-staged** | Run linters on staged files only |

### Pre-commit Hook

When you run `git commit`, the following happens automatically:
1. **ESLint** checks and auto-fixes staged `.ts` files
2. **Prettier** formats staged files

### Available Scripts

```bash
# Development
pnpm dev            # Start dev server with hot reload

# Production
pnpm build          # Compile TypeScript to JavaScript
pnpm start          # Run compiled JavaScript

# Database
pnpm db:init        # Initialize database
pnpm db:seed        # Seed database with sample data

# Code Quality
pnpm lint           # Run ESLint on src/
pnpm format         # Format all files with Prettier
pnpm typecheck      # Run TypeScript compiler (no emit)
pnpm prettier       # Check formatting (no write)
```

### Manual Checks

```bash
# Type checking
pnpm typecheck

# Lint all files
pnpm lint

# Format all files
pnpm format

# Full check before pushing
pnpm typecheck && pnpm lint && pnpm build
```

## Configuration Files

| File | Purpose |
|------|---------|
| `eslint.config.js` | ESLint 9.x flat config |
| `.prettierrc` | Prettier formatting rules |
| `.prettierignore` | Files to skip formatting |
| `tsconfig.json` | TypeScript configuration |
| `.husky/pre-commit` | Pre-commit hook script |

## Environment Variables

Create `.env.local` from the example:

```bash
cp .env.local.example .env.local
```

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | JWT signing secret | `your-secret-key` |

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Students
- `GET /api/students` - Get all students
- `POST /api/students/register` - Register new student
- `GET /api/students/:id` - Get student by ID

### Announcements
- `GET /api/announcements` - Get all announcements
- `POST /api/announcements` - Create announcement

### Time Logs
- `GET /api/timelogs` - Get time logs
- `POST /api/timelogs` - Create time log

### Submissions
- `GET /api/submissions` - Get submissions
- `POST /api/submissions` - Submit requirement

## Migration Utility

Copy `pendingapplications` from a source database to your target database:

```bash
# Set source database URI
$env:SOURCE_MONGO_URI='mongodb+srv://user:pass@cluster/source_db'

# Run migration
npx ts-node scripts/migrate-pendingapplications.ts
```

## Production Deployment

```bash
# Build TypeScript
pnpm build

# Start production server
pnpm start

# Or use Docker
docker build -t ojt-backend .
docker run -p 3000:3000 --env-file .env.local ojt-backend
```

## Notes

- `.env.local` is ignored by `.gitignore` to avoid leaking secrets.
- New registrations are stored in the `pendingapplications` collection.
- ESLint uses the new flat config format (ESLint 9.x).
- File uploads are stored in the `uploads/` directory.

## License

MIT
