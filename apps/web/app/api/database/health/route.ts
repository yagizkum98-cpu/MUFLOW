import { NextResponse } from "next/server";
import { getSupabasePostgresStatus, supabasePostgresTables } from "../../../../lib/supabase-postgres";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      service: "MUFLOW Database",
      database: "Supabase PostgreSQL",
      ...getSupabasePostgresStatus(),
      prisma: {
        provider: "postgresql",
        schema: "prisma/schema.prisma",
        tables: supabasePostgresTables,
      },
      timestamp: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
