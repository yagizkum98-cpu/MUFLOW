# MUFLOW

Municipal Flow Platform

This is a starter project skeleton for a future Turborepo/Next.js based City Operations Platform.

## Local development

The web app runs on `http://localhost:3000`.

```bash
npm install
npm run prisma:generate
npm run dev
```

## Supabase PostgreSQL

MUFLOW now uses Supabase PostgreSQL through Prisma. Copy `.env.example` to `.env` and fill the Supabase values:

```txt
DATABASE_URL="Supabase pooled PostgreSQL connection string"
DIRECT_URL="Supabase direct PostgreSQL connection string"
NEXT_PUBLIC_SUPABASE_URL="https://PROJECT_REF.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."
```

Then generate Prisma Client and push the schema:

```bash
npm run prisma:generate
npx prisma db push
```

Database health endpoint:

```txt
/api/database/health
```

If Docker is available for local fallback, `docker-compose.yml` defines a PostgreSQL service compatible with Prisma.
