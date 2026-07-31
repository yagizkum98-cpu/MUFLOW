export type PanelKey = "municipality" | "business" | "citizen" | "guide" | "notifications" | "analytics" | "ai" | "admin";

export type PackageFeature = {
  id: string;
  label: string;
  apiKey: string;
  panels: PanelKey[];
};

export type PackageDefinition = {
  id: string;
  segment: "Belediye" | "İşletme" | "Vatandaş" | "Enterprise" | "Modül";
  name: string;
  target: string;
  features: PackageFeature[];
};

export type PackageRuntimeState = {
  purchased: boolean;
  approved: boolean;
  opened: boolean;
  featureApi: Record<string, boolean>;
  updatedAt: string;
};

export type PackageAccessItem = PackageDefinition & PackageRuntimeState;

type PackageControlState = {
  packages: Record<string, PackageRuntimeState>;
};

const globalKey = "__muflow_package_control__";

export const packageCatalog: PackageDefinition[] = [
  {
    id: "municipality-starter",
    segment: "Belediye",
    name: "Starter",
    target: "Küçük ilçe belediyeleri",
    features: [
      { id: "news", label: "Haber Yönetimi", apiKey: "municipality.news", panels: ["municipality"] },
      { id: "announcements", label: "Duyuru Yönetimi", apiKey: "municipality.announcements", panels: ["municipality", "notifications"] },
      { id: "notification-center", label: "Bildirim Merkezi", apiKey: "notifications.center", panels: ["notifications"] },
      { id: "events", label: "Etkinlik Yönetimi", apiKey: "municipality.events", panels: ["municipality", "citizen"] },
      { id: "citizen-portal", label: "Vatandaş Portalı", apiKey: "citizen.portal", panels: ["citizen"] },
    ],
  },
  {
    id: "municipality-professional",
    segment: "Belediye",
    name: "Professional",
    target: "İl ve büyük ilçe belediyeleri",
    features: [
      { id: "business-portal", label: "İşletme Portalı", apiKey: "business.portal", panels: ["business"] },
      { id: "mu-ai", label: "MU AI", apiKey: "ai.assistant", panels: ["ai"] },
      { id: "analytics-basic", label: "Temel Raporlama", apiKey: "analytics.basic", panels: ["analytics", "municipality"] },
      { id: "city-guide", label: "Şehir Rehberi", apiKey: "guide.core", panels: ["guide", "citizen"] },
    ],
  },
  {
    id: "municipality-enterprise",
    segment: "Enterprise",
    name: "Enterprise",
    target: "Büyükşehir belediyeleri",
    features: [
      { id: "all-modules", label: "Tüm Modüller", apiKey: "platform.modules.all", panels: ["admin"] },
      { id: "rest-api", label: "REST API", apiKey: "platform.api.rest", panels: ["admin"] },
      { id: "white-label", label: "White Label", apiKey: "platform.branding.whiteLabel", panels: ["admin"] },
      { id: "sla", label: "SLA", apiKey: "platform.sla", panels: ["admin"] },
    ],
  },
  {
    id: "business-free",
    segment: "İşletme",
    name: "Ücretsiz",
    target: "Yerel işletme temel görünürlük",
    features: [
      { id: "business-profile", label: "İşletme Profili", apiKey: "business.profile", panels: ["business"] },
      { id: "map-visibility", label: "Haritada Görünme", apiKey: "business.mapVisibility", panels: ["business", "guide"] },
      { id: "contact-info", label: "İletişim Bilgileri", apiKey: "business.contact", panels: ["business"] },
    ],
  },
  {
    id: "business-premium",
    segment: "İşletme",
    name: "Premium",
    target: "Kampanya ve etkinlik büyümesi",
    features: [
      { id: "campaigns", label: "Kampanya Yayınlama", apiKey: "business.campaigns", panels: ["business"] },
      { id: "business-events", label: "Etkinlik Oluşturma", apiKey: "business.events", panels: ["business"] },
      { id: "featured", label: "Ön Plana Çıkma", apiKey: "business.featured", panels: ["business"] },
      { id: "qr-page", label: "QR İşletme Sayfası", apiKey: "business.qr", panels: ["business"] },
      { id: "business-analytics", label: "Temel Analitik", apiKey: "business.analytics", panels: ["business", "analytics"] },
    ],
  },
  {
    id: "business-premium-plus",
    segment: "İşletme",
    name: "Premium+",
    target: "AI ve gelişmiş görünürlük",
    features: [
      { id: "ai-content", label: "AI İçerik Önerileri", apiKey: "business.aiContent", panels: ["business", "ai"] },
      { id: "advanced-stats", label: "Gelişmiş İstatistikler", apiKey: "business.advancedStats", panels: ["business", "analytics"] },
      { id: "api-connectors", label: "API Bağlantıları", apiKey: "business.apiConnectors", panels: ["business", "admin"] },
    ],
  },
  {
    id: "module-mu-ai",
    segment: "Modül",
    name: "MU AI",
    target: "Yapay zekâ destekli şehir asistanı",
    features: [
      { id: "mu-ai", label: "MU AI", apiKey: "ai.assistant", panels: ["ai"] },
      { id: "ai-faq", label: "SSS Soru-Cevap", apiKey: "ai.faq", panels: ["ai"] },
      { id: "ai-events", label: "Etkinlik Önerileri", apiKey: "ai.events", panels: ["ai"] },
    ],
  },
  {
    id: "module-city-guide",
    segment: "Modül",
    name: "Dijital Şehir Rehberi",
    target: "Harita destekli şehir noktaları ve rota deneyimi",
    features: [
      { id: "city-guide", label: "Şehir Rehberi", apiKey: "guide.core", panels: ["guide", "citizen"] },
      { id: "map-points", label: "Harita Noktaları", apiKey: "guide.mapPoints", panels: ["guide"] },
      { id: "route-support", label: "Rota Desteği", apiKey: "guide.routes", panels: ["guide", "citizen"] },
    ],
  },
  {
    id: "module-notifications",
    segment: "Modül",
    name: "Bildirim Merkezi",
    target: "Portal, mobil ve acil durum bildirim akışı",
    features: [
      { id: "notification-center", label: "Bildirim Merkezi", apiKey: "notifications.center", panels: ["notifications"] },
      { id: "emergency-alerts", label: "Acil Durum Bildirimleri", apiKey: "notifications.emergency", panels: ["notifications"] },
      { id: "scheduled-notifications", label: "Planlı Bildirimler", apiKey: "notifications.scheduled", panels: ["notifications"] },
    ],
  },
  {
    id: "module-analytics",
    segment: "Modül",
    name: "Temel Analitik",
    target: "Canlı performans ve kullanım metrikleri",
    features: [
      { id: "analytics-basic", label: "Temel Analitik", apiKey: "analytics.basic", panels: ["analytics", "municipality"] },
      { id: "business-analytics", label: "İşletme Analitiği", apiKey: "business.analytics", panels: ["business", "analytics"] },
      { id: "live-metrics", label: "Canlı Metrikler", apiKey: "analytics.live", panels: ["analytics", "admin"] },
    ],
  },
  {
    id: "module-rest-api",
    segment: "Modül",
    name: "REST API",
    target: "Kurum ve entegrasyon geliştiricileri için API erişimi",
    features: [
      { id: "rest-api", label: "REST API", apiKey: "platform.api.rest", panels: ["admin"] },
      { id: "webhooks", label: "Webhook Desteği", apiKey: "platform.api.webhooks", panels: ["admin"] },
      { id: "api-keys", label: "API Anahtarı Yönetimi", apiKey: "platform.api.keys", panels: ["admin"] },
    ],
  },
];

function getDefaultPackageState(item: PackageDefinition): PackageRuntimeState {
  return {
    purchased: false,
    approved: false,
    opened: false,
    featureApi: Object.fromEntries(item.features.map((feature) => [feature.id, false])),
    updatedAt: new Date(0).toISOString(),
  };
}

function getStore() {
  const globalState = globalThis as typeof globalThis & { [globalKey]?: PackageControlState };

  if (!globalState[globalKey]) {
    globalState[globalKey] = {
      packages: Object.fromEntries(packageCatalog.map((item) => [item.id, getDefaultPackageState(item)])),
    };
  }

  return globalState[globalKey];
}

export function getPackageAccess() {
  const store = getStore();

  return packageCatalog.map((item) => {
    if (!store.packages[item.id]) {
      store.packages[item.id] = getDefaultPackageState(item);
    }

    return {
      ...item,
      ...store.packages[item.id],
    };
  });
}

export function updatePackageAccess(input: {
  packageId: string;
  purchased?: boolean;
  approved?: boolean;
  opened?: boolean;
  featureId?: string;
  featureApiEnabled?: boolean;
}) {
  const store = getStore();
  const definition = packageCatalog.find((item) => item.id === input.packageId);

  if (!definition) {
    return null;
  }

  const current = store.packages[input.packageId] || getDefaultPackageState(definition);
  const next: PackageRuntimeState = {
    ...current,
    purchased: typeof input.purchased === "boolean" ? input.purchased : current.purchased,
    approved: typeof input.approved === "boolean" ? input.approved : current.approved,
    opened: typeof input.opened === "boolean" ? input.opened : current.opened,
    featureApi: { ...current.featureApi },
    updatedAt: new Date().toISOString(),
  };

  if (input.featureId && definition.features.some((feature) => feature.id === input.featureId)) {
    next.featureApi[input.featureId] = Boolean(input.featureApiEnabled);
  }

  store.packages[input.packageId] = next;
  return getPackageAccess().find((item) => item.id === input.packageId) || null;
}

export function getPanelAccess(panel: PanelKey) {
  return getPackageAccess()
    .map((item) => {
      const packageActive = item.purchased && item.approved && item.opened;
      const features = item.features
        .filter((feature) => feature.panels.includes(panel))
        .map((feature) => ({
          ...feature,
          active: packageActive && Boolean(item.featureApi[feature.id]),
        }));

      return {
        id: item.id,
        segment: item.segment,
        name: item.name,
        target: item.target,
        packageActive,
        purchased: item.purchased,
        approved: item.approved,
        opened: item.opened,
        features,
      };
    })
    .filter((item) => item.features.length > 0);
}

export function hasActivePanelFeature(panel: PanelKey, featureId: string) {
  return getPanelAccess(panel).some((item) =>
    item.features.some((feature) => feature.id === featureId && feature.active),
  );
}
