import { NextResponse } from "next/server";
import { permissionMatrix, superAdminModules, superAdminPortals, superAdminStats } from "../../../../lib/super-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      generatedAt: new Date().toISOString(),
      activeAuthority: "SUPER_ADMIN",
      note: "Şimdilik tüm yetkiler Süper Admin rolünde toplanır.",
      stats: superAdminStats,
      portals: superAdminPortals,
      permissionMatrix,
      modules: superAdminModules,
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
