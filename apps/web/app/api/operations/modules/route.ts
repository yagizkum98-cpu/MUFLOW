import { NextResponse } from "next/server";
import { businessPortalModules } from "../../../../lib/business-portal";
import { municipalityPortalModules } from "../../../../lib/municipality-portal";
import { operationModules } from "../../../../lib/operation-modules";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      generatedAt: new Date().toISOString(),
      modules: {
        municipality: municipalityPortalModules,
        business: businessPortalModules,
        citizen: operationModules.citizenPortalModules,
        cityGuide: operationModules.cityGuideModules,
        notifications: operationModules.notificationModules,
        analytics: operationModules.analyticsModules,
        ai: operationModules.aiModules,
        admin: operationModules.adminModules,
      },
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
