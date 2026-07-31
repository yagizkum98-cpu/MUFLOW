import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../../lib/current-user";
import { getTenantScopedData, getVisibleTenantIds, tenants } from "../../../../lib/tenancy";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Tenant bağlamı için giriş gerekir." }, { status: 401 });
  }

  const visibleTenantIds = getVisibleTenantIds(user);

  return NextResponse.json(
    {
      user: {
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
      },
      currentTenant: tenants.find((tenant) => tenant.id === user.tenantId) || null,
      visibleTenants: tenants.filter((tenant) => visibleTenantIds.includes(tenant.id)),
      scopedData: getTenantScopedData(user),
      rule: user.role === "SUPER_ADMIN" ? "Süper Admin tüm tenant verisini görür." : "Kullanıcı yalnızca kendi tenant verisini görür.",
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
