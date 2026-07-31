export const restApiCatalog = [
  {
    group: "Auth",
    endpoints: [
      ["POST", "/api/auth/login", "E-posta/şifre ile JWT oturumu başlatır."],
      ["POST", "/api/auth/logout", "Aktif oturumu kapatır."],
      ["GET", "/api/auth/session", "Giriş yapan kullanıcıyı döndürür."],
      ["POST", "/api/auth/change-password", "Kullanıcının mevcut şifresini doğrulayıp yeni şifre tanımlar."],
    ],
  },
  {
    group: "Super Admin",
    endpoints: [
      ["GET", "/api/admin/users", "Süper Admin kullanıcı listesini döndürür."],
      ["POST", "/api/admin/users", "Rol bazlı kullanıcı oluşturur."],
      ["GET", "/api/admin/package-access", "Paket, onay ve özellik API yetkilerini listeler."],
      ["PATCH", "/api/admin/package-access", "Paket veya özellik API yetkisini günceller."],
    ],
  },
  {
    group: "Panels",
    endpoints: [
      ["GET", "/api/panel/access?panel=business", "Panelin paket/özellik erişim durumunu döndürür."],
      ["GET", "/api/panel/workspace?panel=citizen", "Panel çalışma kayıtlarını listeler."],
      ["POST", "/api/panel/workspace", "Panel içinde yeni MVP çalışma kaydı oluşturur."],
      ["GET", "/api/tenants", "Platform > Büyükşehir > İlçe tenant ağacını döndürür."],
      ["GET", "/api/tenant/context", "Giriş yapan kullanıcının tenant bağlamını ve görebildiği veriyi döndürür."],
    ],
  },
  {
    group: "Live Data",
    endpoints: [
      ["GET", "/api/live/stats", "Canlı platform özet metriklerini döndürür."],
      ["GET", "/api/live/hero", "Hero dashboard canlı verisini döndürür."],
      ["GET", "/api/live/analytics", "Sıfırlanmış canlı analitik metriklerini döndürür."],
      ["GET", "/api/database/health", "Supabase PostgreSQL yapılandırma durumunu döndürür."],
    ],
  },
  {
    group: "AI and Revenue",
    endpoints: [
      ["POST", "/api/ai/chat", "MU AI ilk faz soru-cevap endpointidir."],
      ["GET", "/api/revenue/model", "Gelir modeli ve paket yapısını döndürür."],
      ["POST", "/api/checkout/purchase", "Sepet/KVKK/ödeme talebi oluşturur."],
    ],
  },
] as const;

export const restApiResources = [
  {
    name: "municipalities",
    path: "/api/rest/v1/municipalities",
    description: "Belediye tenant ve temel kurum bilgileri. Multi-tenant yapı her kurumun kendi verisini görmesi üzerine kuruludur.",
    sample: [
      { id: "tenant_mugla", name: "Muğla Büyükşehir", parentTenantId: "tenant_platform", status: "active" },
      { id: "tenant_fethiye", name: "Fethiye", parentTenantId: "tenant_mugla", status: "active" },
      { id: "tenant_marmaris", name: "Marmaris", parentTenantId: "tenant_mugla", status: "active" },
      { id: "tenant_bodrum", name: "Bodrum", parentTenantId: "tenant_mugla", status: "active" },
      { id: "tenant_datca", name: "Datça", parentTenantId: "tenant_mugla", status: "active" },
    ],
  },
  {
    name: "businesses",
    path: "/api/rest/v1/businesses",
    description: "İşletme profili, partner ve kampanya görünürlüğü.",
    sample: [{ id: "biz_demo", name: "MUFLOW Partner İşletme", status: "draft" }],
  },
  {
    name: "citizens",
    path: "/api/rest/v1/citizens",
    description: "Vatandaş hesap, pass ve tercih özeti.",
    sample: [{ id: "cit_demo", name: "Demo Vatandaş", pass: "MUFLOW Free" }],
  },
  {
    name: "events",
    path: "/api/rest/v1/events",
    description: "Etkinlik takvimi ve katılım verileri.",
    sample: [{ id: "evt_demo", title: "Kent Meydanı Etkinliği", status: "planned" }],
  },
] as const;
