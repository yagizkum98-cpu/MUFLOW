import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../../../lib/current-user";
import { PanelKey } from "../../../../lib/package-control";
import { createWorkspaceRecord, listWorkspaceRecords } from "../../../../lib/panel-workspace-store";
import { getVisibleTenantIds } from "../../../../lib/tenancy";

const panelKeys: PanelKey[] = ["municipality", "business", "citizen", "guide", "notifications", "analytics", "ai", "admin"];

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Panel verisi için giriş gerekir." }, { status: 401 });
  }

  const panel = request.nextUrl.searchParams.get("panel") as PanelKey | null;

  if (!panel || !panelKeys.includes(panel)) {
    return NextResponse.json({ message: "Geçerli panel anahtarı gerekir." }, { status: 400 });
  }

  const visibleTenantIds = getVisibleTenantIds(user);
  const records = listWorkspaceRecords(panel).filter((record) => !record.tenantId || visibleTenantIds.includes(record.tenantId));

  return NextResponse.json(
    {
      generatedAt: new Date().toISOString(),
      panel,
      records,
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Kayıt oluşturmak için giriş gerekir." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const panel = String(body?.panel || "") as PanelKey;
  const moduleId = String(body?.moduleId || "").trim();
  const title = String(body?.title || "").trim();
  const description = String(body?.description || "").trim();

  if (!panelKeys.includes(panel)) {
    return NextResponse.json({ message: "Geçerli panel anahtarı gerekir." }, { status: 400 });
  }

  if (!moduleId || !title || !description) {
    return NextResponse.json({ message: "Modül, başlık ve açıklama zorunludur." }, { status: 400 });
  }

  const record = createWorkspaceRecord({
    panel,
    moduleId,
    title,
    description,
    createdBy: user.email,
    tenantId: user.tenantId,
  });

  return NextResponse.json(
    {
      message: "Panel kaydı oluşturuldu.",
      record,
    },
    { status: 201, headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
