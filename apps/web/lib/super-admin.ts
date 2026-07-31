export const superAdminStats = [
  ["Yetki seviyesi", "Tam"],
  ["Rol", "SUPER_ADMIN"],
  ["Panel erişimi", "Tümü"],
  ["API erişimi", "Ready"],
];

export const superAdminPortals = [
  ["🏛️ Belediye Paneli", "Haber, duyuru, etkinlik, sayfa, bildirim ve rapor süreçleri.", "/dashboard/belediye"],
  ["🏢 İşletme Paneli", "İşletme profili, kampanya, etkinlik, QR ve temel istatistikler.", "/dashboard/isletme"],
  ["👥 Vatandaş Paneli", "Profil, talep, duyuru, etkinlik, rehber ve bildirim akışları.", "/dashboard/vatandas"],
  ["🗺️ Şehir Rehberi", "Gezilecek yerler, parklar, plajlar, müzeler, sağlık noktaları ve otopark.", "/dashboard/rehber"],
  ["🔔 Bildirim Merkezi", "Belediye, etkinlik, acil durum ve sistem bildirimleri.", "/dashboard/bildirimler"],
  ["📈 Analitik", "Kullanıcı, sayfa, etkinlik ve işletme görünürlük metrikleri.", "/dashboard/analitik"],
  ["🤖 MU AI", "Soru-cevap, etkinlik önerileri, şehir rehberi desteği ve SSS.", "/dashboard/ai"],
];

export const permissionMatrix = [
  ["Süper Admin", "Tüm paneller", "Tam yetki"],
  ["Belediye Yöneticisi", "Belediye, rehber, bildirim, analitik, AI", "Operasyon yetkisi"],
  ["Belediye Personeli", "Belediye, rehber, bildirim, analitik, AI", "Kısıtlı operasyon"],
  ["İşletme Yetkilisi", "İşletme, analitik, AI", "İşletme yetkisi"],
  ["Vatandaş", "Vatandaş, AI", "Kişisel hizmetler"],
];

export const superAdminModules = [
  {
    icon: "👥",
    title: "Kullanıcı Yönetimi",
    text: "Tüm kullanıcı hesapları ve rol atamaları süper admin kontrolündedir.",
    items: ["Kullanıcı listesi", "Rol atama", "Hesap durumu", "Güvenli giriş takibi"],
  },
  {
    icon: "🔐",
    title: "Yetki Yönetimi",
    text: "Şimdilik tüm yetkiler Super Admin rolünde toplanır.",
    items: ["Tüm panel erişimi", "Tüm API erişimi", "Rol matrisi", "Middleware koruması"],
  },
  {
    icon: "⚙️",
    title: "Sistem Yönetimi",
    text: "Platform ayarları, tema, dil ve servis durumları merkezi yönetilir.",
    items: ["Sistem ayarları", "Dil/tema", "Canlı veri endpointleri", "Cloud durumu"],
  },
  {
    icon: "🔗",
    title: "API Yönetimi",
    text: "Modül, gelir, analitik, AI ve canlı veri endpointleri tek yerden izlenir.",
    items: ["/api/operations/modules", "/api/revenue/model", "/api/live/analytics", "/api/ai/chat"],
  },
];
