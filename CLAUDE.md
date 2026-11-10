# Next.js App Context for Claude

Refer to root documentation:
- [`../AGENTS.md`](file:///c:/Users/user/Desktop/kidpreneur-test-project/AGENTS.md)
- [`../docs/ARCHITECTURE.md`](file:///c:/Users/user/Desktop/kidpreneur-test-project/docs/ARCHITECTURE.md)
- [`../docs/DATABASE_SCHEMA.md`](file:///c:/Users/user/Desktop/kidpreneur-test-project/docs/DATABASE_SCHEMA.md)
- [`../docs/API_REFERENCE.md`](file:///c:/Users/user/Desktop/kidpreneur-test-project/docs/API_REFERENCE.md)
- [`../docs/FRONTEND_GUIDE.md`](file:///c:/Users/user/Desktop/kidpreneur-test-project/docs/FRONTEND_GUIDE.md)

### Next-App Specific Notes:
- Framework: Next.js 16 (App Router) + React 19 + Tailwind v4.
- ORM: Drizzle ORM (`src/db/schema.ts`) + Turso libSQL.
- Auth: JWT cookies (`admin_token` for Admin, `auth_token` for students/parents).
- Storage: Cloudflare R2 bucket with fallback base64 in `src/lib/storage.ts`.
- Subdomain Routing: Enforced via `src/middleware.ts`.
