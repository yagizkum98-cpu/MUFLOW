import { AuthUser } from "./auth";

export type TenantType = "PLATFORM" | "METROPOLITAN" | "DISTRICT" | "ORGANIZATION";

export type Tenant = {
  id: string;
  name: string;
  slug: string;
  type: TenantType;
  parentTenantId: string | null;
  status: "active";
};

export const tenants: Tenant[] = [
  { id: "tenant_platform", name: "Platform", slug: "platform", type: "PLATFORM", parentTenantId: null, status: "active" },
  { id: "tenant_mugla", name: "Muğla Büyükşehir", slug: "mugla-buyuksehir", type: "METROPOLITAN", parentTenantId: "tenant_platform", status: "active" },
  { id: "tenant_fethiye", name: "Fethiye", slug: "fethiye", type: "DISTRICT", parentTenantId: "tenant_mugla", status: "active" },
  { id: "tenant_marmaris", name: "Marmaris", slug: "marmaris", type: "DISTRICT", parentTenantId: "tenant_mugla", status: "active" },
  { id: "tenant_bodrum", name: "Bodrum", slug: "bodrum", type: "DISTRICT", parentTenantId: "tenant_mugla", status: "active" },
  { id: "tenant_datca", name: "Datça", slug: "datca", type: "DISTRICT", parentTenantId: "tenant_mugla", status: "active" },
];

export const tenantScopedResources = [
  { id: "news_fethiye", tenantId: "tenant_fethiye", type: "Haber", title: "Fethiye sahil bakım duyurusu" },
  { id: "event_marmaris", tenantId: "tenant_marmaris", type: "Etkinlik", title: "Marmaris yaz konseri" },
  { id: "guide_bodrum", tenantId: "tenant_bodrum", type: "Şehir Rehberi", title: "Bodrum müze rotası" },
  { id: "alert_datca", tenantId: "tenant_datca", type: "Bildirim", title: "Datça yol çalışması bilgilendirmesi" },
  { id: "metro_mugla", tenantId: "tenant_mugla", type: "Duyuru", title: "Muğla Büyükşehir genel duyurusu" },
];

export function getTenantChildren(parentTenantId: string) {
  return tenants.filter((tenant) => tenant.parentTenantId === parentTenantId);
}

export function getTenantTree(parentTenantId: string | null = null): Array<Tenant & { children: ReturnType<typeof getTenantTree> }> {
  return tenants
    .filter((tenant) => tenant.parentTenantId === parentTenantId)
    .map((tenant) => ({
      ...tenant,
      children: getTenantTree(tenant.id),
    }));
}

export function getVisibleTenantIds(user: AuthUser) {
  if (user.role === "SUPER_ADMIN") {
    return tenants.map((tenant) => tenant.id);
  }

  const tenantId = user.tenantId;

  if (!tenantId) {
    return [];
  }

  const childIds = getTenantChildren(tenantId).map((tenant) => tenant.id);
  return [tenantId, ...childIds];
}

export function getTenantScopedData(user: AuthUser) {
  const visibleTenantIds = getVisibleTenantIds(user);

  return tenantScopedResources
    .filter((resource) => visibleTenantIds.includes(resource.tenantId))
    .map((resource) => ({
      ...resource,
      tenant: tenants.find((tenant) => tenant.id === resource.tenantId)?.name || "Bilinmeyen kurum",
    }));
}
