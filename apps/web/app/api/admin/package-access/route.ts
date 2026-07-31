import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../../../lib/current-user";
import { getPackageAccess, updatePackageAccess } from "../../../../lib/package-control";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();

  if (!user || user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ message: "Paket yönetimi için Süper Admin yetkisi gerekir." }, { status: 403 });
  }

  return NextResponse.json(
    {
      generatedAt: new Date().toISOString(),
      packages: getPackageAccess(),
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}

export async function PATCH(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user || user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ message: "Paket açma/onay işlemi için Süper Admin yetkisi gerekir." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const updated = updatePackageAccess({
    packageId: String(body?.packageId || ""),
    purchased: typeof body?.purchased === "boolean" ? body.purchased : undefined,
    approved: typeof body?.approved === "boolean" ? body.approved : undefined,
    opened: typeof body?.opened === "boolean" ? body.opened : undefined,
    featureId: typeof body?.featureId === "string" ? body.featureId : undefined,
    featureApiEnabled: typeof body?.featureApiEnabled === "boolean" ? body.featureApiEnabled : undefined,
  });

  if (!updated) {
    return NextResponse.json({ message: "Paket bulunamadı." }, { status: 404 });
  }

  return NextResponse.json(
    {
      message: "Paket yetki verisi güncellendi.",
      package: updated,
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
