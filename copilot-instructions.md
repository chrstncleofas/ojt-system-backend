Purpose
-------
These instructions are read by the project's Copilot assistant to make code changes that are consistent, safe, and idiomatic for the backend service.

High-level rules (follow these always)
- Always inspect the current codebase before making changes. Open `src/` files, `models/`, `controllers/`, `services/`, and `routes/` related to the task.
- Maintain clean, readable TypeScript. Use explicit types where helpful, avoid any, keep functions small, and preserve existing naming conventions (e.g., `pending*` fields, `Student` vs `PendingApplication`).
- Follow the project's formats: `pnpm` for package management, TypeScript (`tsconfig.json`), and Mongoose models for DB access.
- Never commit secrets. `.env.local` is ignored; do not add credentials to the repo.

Code-change guidelines
- Prefer minimal, focused patches that fix the root cause — do not rearrange files or reformat large sections unless requested.
- When adding or changing endpoints, preserve API contracts (status codes, JSON shape). Update `README.md` or controller comments if the API behaviour changes.
- If a change affects the DB schema, update the corresponding model in `src/models/` and add a migration script under `scripts/`.
- Add or update TypeScript types/interfaces in `src/interfaces/` or `src/dtos/` when introducing new data shapes.

Dev & verification steps
- Run type checks: `pnpm exec tsc --noEmit`.
- Run the app in dev: `pnpm dev` and check console logs.
- Run unit tests (if present) and any seed/migration scripts.
- Build for production: `pnpm build`.

Commit & PR
- Make small commits with descriptive messages. Include a short note about why the change was made.
- Add or update tests when behaviour changes.

If uncertain
- Ask for clarification before making breaking changes to public APIs, DB schemas, or CI configuration.
