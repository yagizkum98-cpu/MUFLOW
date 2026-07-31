export type SupabasePostgresStatus = {
  provider: "supabase-postgresql";
  configured: boolean;
  hasDatabaseUrl: boolean;
  hasDirectUrl: boolean;
  hasSupabaseUrl: boolean;
  hasAnonKey: boolean;
  hasServiceRoleKey: boolean;
  mode: "ready" | "missing-env";
};

export function getSupabasePostgresStatus(): SupabasePostgresStatus {
  const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);
  const hasDirectUrl = Boolean(process.env.DIRECT_URL);
  const hasSupabaseUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const hasAnonKey = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const hasServiceRoleKey = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const configured = hasDatabaseUrl && hasDirectUrl && hasSupabaseUrl && hasAnonKey;

  return {
    provider: "supabase-postgresql",
    configured,
    hasDatabaseUrl,
    hasDirectUrl,
    hasSupabaseUrl,
    hasAnonKey,
    hasServiceRoleKey,
    mode: configured ? "ready" : "missing-env",
  };
}

export const supabasePostgresTables = [
  "User",
  "Municipality",
  "Business",
  "CitizenPass",
  "PackageAccess",
  "WorkspaceRecord",
];
