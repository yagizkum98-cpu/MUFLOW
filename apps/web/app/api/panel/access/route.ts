import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../../../lib/current-user";
import { getPanelAccess, PanelKey } from "../../../../lib/package-control";

const panelKeys: PanelKey[] = ["municipality", "business", "citizen", "guide", "notifications", "analytics", "ai", "admin"];

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Panel paket verisi için giriş gerekir." }, { status: 401 });
  }

  const panel = request.nextUrl.searchParams.get("panel") as PanelKey | null;

  if (!panel || !panelKeys.includes(panel)) {
    return NextResponse.json({ message: "Geçerli bir panel anahtarı gerekir." }, { status: 400 });
  }

  const packages = getPanelAccess(panel);

  return NextResponse.json(
    {
      generatedAt: new Date().toISOString(),
      panel,
      packages,
      activeFeatureCount: packages.reduce((total, item) => total + item.features.filter((feature) => feature.active).length, 0),
      lockedFeatureCount: packages.reduce((total, item) => total + item.features.filter((feature) => !feature.active).length, 0),
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
