"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type WorkspaceModule = {
  id: string;
  icon: string;
  title: string;
  text: string;
  action: string;
};

type WorkspaceRecord = {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  status: string;
  createdBy: string;
  createdAt: string;
};

const citizenPackages = [
  {
    name: "MUFLOW Free",
    badge: "Ücretsiz",
    price: "0 TL",
    color: "green",
    text: "Her vatandaş için temel belediye hizmetleri ücretsizdir.",
    features: [
      "Belediye duyuruları",
      "Etkinlik takvimi",
      "Şehir rehberi",
      "Talep / Şikâyet",
      "Bildirimler",
      "Harita",
      "MU AI günlük sınırlı kullanım",
    ],
  },
  {
    name: "MUFLOW Plus",
    badge: "Kişisel",
    price: "499 TL + KDV / yıl",
    color: "blue",
    text: "Daha fazla kişiselleştirme isteyen kullanıcılar için.",
    features: [
      "Sınırsız MU AI",
      "İlgi alanına göre etkinlik önerileri",
      "Favori işletmeler",
      "Favori rotalar",
      "Gelişmiş bildirim filtreleri",
      "Kişisel şehir takvimi",
      "QR Dijital Kart",
    ],
  },
  {
    name: "MUFLOW Explorer",
    badge: "Turizm",
    price: "899 TL + KDV / yıl",
    color: "purple",
    text: "Turistler ve şehirde aktif zaman geçirmek isteyen kullanıcılar için.",
    features: [
      "Hazır gezi rotaları",
      "Sesli rehber",
      "Çevrimdışı haritalar",
      "Yapay zekâ ile gezi planı",
      "Yerel etkinlik önerileri",
      "İşletme fırsatları ve kampanyaları",
    ],
  },
  {
    name: "MUFLOW Family",
    badge: "Aile",
    price: "699 TL + KDV / yıl",
    color: "yellow",
    text: "Ailelere yönelik şehir yaşamı ve güvenlik destek paketi.",
    features: [
      "Çocuk etkinliği bildirimleri",
      "Aile takvimi",
      "Park ve oyun alanı önerileri",
      "Belediye kursları bildirimleri",
      "Acil durum aile bildirimleri",
    ],
  },
];

const muflowPass = {
  name: "MUFLOW Pass",
  badge: "Dijital Şehir Kartı",
  price: "999 TL + KDV / yıl",
  text: "Vatandaş yalnızca yazılıma değil, şehir ekosistemindeki somut avantajlara ödeme yapar.",
  features: [
    "İşletmelerde özel indirimler",
    "Belediye tesislerinde kampanyalar",
    "Kültürel etkinliklerde öncelikli kayıt",
    "Partner işletmelerde fırsatlar",
    "QR dijital üyelik kartı",
  ],
};

const passRevenueFlow = [
  ["1", "İşletme MUFLOW Partner olur."],
  ["2", "Restoran veya yerel işletme örneğin %10 indirim sağlar."],
  ["3", "Vatandaş MUFLOW Pass QR kartı ile indirimi kullanır."],
  ["4", "İşletme daha fazla müşteri kazanır."],
  ["5", "MUFLOW üyelik veya pazarlama hizmeti geliri elde eder."],
];

const panelModules: Record<string, WorkspaceModule[]> = {
  municipality: [
    { id: "news", icon: "📰", title: "Haber", text: "Haber başlığı, içerik ve yayın durumu oluşturun.", action: "Haber Oluştur" },
    { id: "announcement", icon: "📢", title: "Duyuru", text: "Kategori, yayın tarihi ve öne çıkarma akışı.", action: "Duyuru Yayınla" },
    { id: "event", icon: "🎉", title: "Etkinlik", text: "Tarih, saat, konum ve kısa açıklama yönetin.", action: "Etkinlik Ekle" },
    { id: "report", icon: "📊", title: "Rapor", text: "Temel operasyon raporu ve kullanım özeti oluşturun.", action: "Rapor Başlat" },
  ],
  citizen: [
    { id: "request", icon: "📝", title: "Talep / Şikayet", text: "Kategori, açıklama ve takip kaydı oluşturun.", action: "Talep Oluştur" },
    { id: "profile", icon: "👤", title: "Profil", text: "Vatandaş profil ve iletişim güncelleme süreci.", action: "Profil Kaydı" },
    { id: "event-follow", icon: "📅", title: "Etkinlik Takibi", text: "Katılım ve hatırlatma isteği oluşturun.", action: "Etkinlik Kaydet" },
    { id: "notification", icon: "🔔", title: "Bildirim", text: "Kişisel bildirim tercihi kaydı açın.", action: "Bildirim Ayarla" },
    { id: "packages", icon: "💳", title: "Paketler", text: "Temel hizmetler ücretsiz, ek dijital hizmetler isteğe bağlıdır.", action: "Paket Talebi" },
  ],
  business: [
    { id: "profile", icon: "📋", title: "İşletme Profili", text: "İşletme adı, kategori, adres ve iletişim bilgisi.", action: "Profil Kaydet" },
    { id: "campaign", icon: "📢", title: "Kampanya", text: "Kampanya, son kullanma tarihi ve yayın durumu.", action: "Kampanya Oluştur" },
    { id: "event", icon: "🎉", title: "Etkinlik", text: "İşletme etkinliği ve kapak görseli iş akışı.", action: "Etkinlik Ekle" },
    { id: "qr", icon: "📱", title: "QR Sayfası", text: "QR tanıtım sayfası ve görünürlük kaydı.", action: "QR Kaydı Aç" },
  ],
  guide: [
    { id: "place", icon: "📍", title: "Gezilecek Yer", text: "Konum, açıklama ve kategori bilgisi oluşturun.", action: "Nokta Ekle" },
    { id: "park", icon: "🌳", title: "Park / Plaj", text: "Açık alan ve sezon bilgisi yönetin.", action: "Alan Ekle" },
    { id: "museum", icon: "🏛️", title: "Müze", text: "Ziyaret saati, adres ve iletişim kaydı.", action: "Müze Ekle" },
    { id: "parking", icon: "🅿️", title: "Otopark", text: "Kapasite, ücret ve harita pini kaydı.", action: "Otopark Ekle" },
  ],
  notifications: [
    { id: "municipality", icon: "📢", title: "Belediye Duyurusu", text: "Portal ve mobil duyuru akışı oluşturun.", action: "Duyuru Planla" },
    { id: "event", icon: "🎉", title: "Etkinlik Bildirimi", text: "Yaklaşan etkinlik için hatırlatma hazırlayın.", action: "Hatırlatma Ekle" },
    { id: "emergency", icon: "⚠️", title: "Acil Bilgilendirme", text: "Öncelikli acil durum mesajı oluşturun.", action: "Acil Mesaj Aç" },
    { id: "system", icon: "⚙️", title: "Sistem Bildirimi", text: "Başvuru ve işlem durumu mesajı yönetin.", action: "Sistem Kaydı" },
  ],
  analytics: [
    { id: "users", icon: "👥", title: "Kullanıcı", text: "Rol ve aktif oturum metrik kaydı oluşturun.", action: "Metrik Kaydı" },
    { id: "pageviews", icon: "👁️", title: "Sayfa Görüntüleme", text: "Portal erişimi ve popüler içerik kaydı.", action: "Erişim Kaydı" },
    { id: "events", icon: "🎟️", title: "Etkinlik Katılımı", text: "Kayıt, katılım ve eğilim verisi oluşturun.", action: "Katılım Kaydı" },
    { id: "business", icon: "🏢", title: "İşletme Görünürlüğü", text: "Profil ve QR görüntülenme kaydı oluşturun.", action: "Görünürlük Kaydı" },
  ],
  ai: [
    { id: "qa", icon: "💬", title: "Soru-Cevap", text: "Belediye hizmetleri için yanıt kaynağı ekleyin.", action: "Bilgi Kaydı" },
    { id: "events", icon: "🎉", title: "Etkinlik Önerisi", text: "AI etkinlik öneri senaryosu oluşturun.", action: "Öneri Kaydı" },
    { id: "guide", icon: "🗺️", title: "Şehir Rehberi", text: "AI rehber yanıtı için nokta verisi oluşturun.", action: "Rehber Kaydı" },
    { id: "faq", icon: "❓", title: "SSS", text: "Sık sorulan soru ve cevap kaydı oluşturun.", action: "SSS Kaydı" },
  ],
  admin: [
    { id: "user", icon: "👥", title: "Kullanıcı", text: "Rol, erişim ve hesap durumunu takip edin.", action: "Kullanıcı İşlemi" },
    { id: "package", icon: "✅", title: "Paket Onayı", text: "Satın alınan paket ve özellik API onayı.", action: "Paket İşlemi" },
    { id: "api", icon: "🔗", title: "REST API", text: "Katalog, health, v1 resource ve entegrasyon kontrolü.", action: "API Kaydı" },
    { id: "system", icon: "⚙️", title: "Sistem", text: "Tema, dil, güvenlik ve servis durumu.", action: "Sistem Kaydı" },
  ],
};

export type PanelWorkspaceKey = keyof typeof panelModules;

export function PanelWorkspace({ panel }: { panel: PanelWorkspaceKey }) {
  const modules = panelModules[panel];
  const [activeModuleId, setActiveModuleId] = useState(modules[0].id);
  const [records, setRecords] = useState<WorkspaceRecord[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const activeModule = useMemo(
    () => modules.find((module) => module.id === activeModuleId) || modules[0],
    [activeModuleId, modules],
  );
  const filteredRecords = records.filter((record) => record.moduleId === activeModuleId);

  async function loadRecords() {
    const response = await fetch(`/api/panel/workspace?panel=${panel}`, { cache: "no-store" });

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    setRecords(data.records || []);
  }

  useEffect(() => {
    loadRecords();
    const timer = window.setInterval(loadRecords, 15000);
    return () => window.clearInterval(timer);
  }, [panel]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    const response = await fetch("/api/panel/workspace", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ panel, moduleId: activeModuleId, title, description }),
    });
    const data = await response.json().catch(() => null);
    setLoading(false);

    if (!response.ok) {
      setMessage(data?.message || "Kayıt oluşturulamadı.");
      return;
    }

    setTitle("");
    setDescription("");
    setMessage("Kayıt oluşturuldu ve canlı listeye eklendi.");
    await loadRecords();
  }

  async function selectCitizenPackage(packageName: string, price: string, features: string[]) {
    setMessage("");
    setLoading(true);

    const response = await fetch("/api/panel/workspace", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        panel,
        moduleId: "packages",
        title: packageName,
        description: `${price} / ${features.join(", ")}`,
      }),
    });
    const data = await response.json().catch(() => null);
    setLoading(false);

    if (!response.ok) {
      setMessage(data?.message || "Paket talebi oluşturulamadı.");
      return;
    }

    setMessage(`${packageName} paket talebi canlı kayıt listesine eklendi.`);
    await loadRecords();
  }

  async function selectMuflowPass() {
    await selectCitizenPackage(muflowPass.name, muflowPass.price, muflowPass.features);
  }

  return (
    <section className="panel-workspace">
      <div className="panel-workspace-head">
        <div>
          <p className="eyebrow">MVP Çalışma Paneli</p>
          <h2>Modül seçin, işlem oluşturun, kayıtları canlı izleyin.</h2>
        </div>
        <span>{records.length} kayıt</span>
      </div>

      <div className="workspace-tabs" role="tablist">
        {modules.map((module) => (
          <button
            className={module.id === activeModuleId ? "active" : ""}
            key={module.id}
            onClick={() => setActiveModuleId(module.id)}
            type="button"
          >
            <span>{module.icon}</span>
            {module.title}
          </button>
        ))}
      </div>

      <div className="workspace-body">
        <article className="workspace-action-card">
          <div className="feature-title">
            <span>{activeModule.icon}</span>
            <h3>{activeModule.title}</h3>
          </div>
          <p>{activeModule.text}</p>
          {panel === "citizen" && activeModuleId === "packages" ? (
            <div className="citizen-package-note">
              <strong>Temel belediye hizmetleri ücretsiz olmalıdır.</strong>
              <span>
                Şikâyet oluşturma, duyurular, etkinlik bilgileri, başvuru süreçleri ve belediye hizmetlerine erişim
                ücretli değildir. Ücretli paketler yalnızca isteğe bağlı ek dijital hizmetler içindir.
              </span>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <input onChange={(event) => setTitle(event.target.value)} placeholder="Başlık" value={title} />
              <textarea onChange={(event) => setDescription(event.target.value)} placeholder="Kısa açıklama" value={description} />
              <button className="primary-button" disabled={loading} type="submit">
                {loading ? "Kaydediliyor..." : activeModule.action}
              </button>
            </form>
          )}
          {message ? <p className={message.includes("oluşturuldu") || message.includes("eklendi") ? "checkout-success" : "form-error"}>{message}</p> : null}
        </article>

        <article className="workspace-records">
          <div>
            <strong>Canlı kayıt akışı</strong>
            <span>{activeModule.title}</span>
          </div>
          {filteredRecords.length === 0 ? (
            <p>Bu modülde henüz kayıt yok.</p>
          ) : (
            filteredRecords.map((record) => (
              <div className="workspace-record" key={record.id}>
                <strong>{record.title}</strong>
                <span>{record.description}</span>
                <small>{record.status} / {record.createdBy}</small>
              </div>
            ))
          )}
        </article>
      </div>

      {panel === "citizen" && activeModuleId === "packages" ? (
        <>
          <div className="citizen-package-grid">
            {citizenPackages.map((item) => (
              <article className={`citizen-package-card ${item.color}`} key={item.name}>
                <div>
                  <span>{item.badge}</span>
                  <h3>{item.name}</h3>
                  <strong>{item.price}</strong>
                </div>
                <p>{item.text}</p>
                <ul>
                  {item.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                <button
                  className="primary-button"
                  disabled={loading}
                  onClick={() => selectCitizenPackage(item.name, item.price, item.features)}
                  type="button"
                >
                  {item.price === "0 TL" ? "Ücretsiz Kullan" : "Paketi Seç"}
                </button>
              </article>
            ))}
          </div>

          <div className="muflow-pass-layout">
            <article className="muflow-pass-card">
              <div>
                <span>{muflowPass.badge}</span>
                <h3>{muflowPass.name}</h3>
                <strong>{muflowPass.price}</strong>
              </div>
              <p>{muflowPass.text}</p>
              <ul>
                {muflowPass.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <button className="primary-button" disabled={loading} onClick={selectMuflowPass} type="button">
                Pass Talebi Oluştur
              </button>
            </article>

            <article className="pass-revenue-card">
              <p className="eyebrow">Gelir Paylaşımı Modeli</p>
              <h3>İşletmeler MUFLOW Partner olur.</h3>
              <div className="pass-flow-list">
                {passRevenueFlow.map(([step, text]) => (
                  <div key={step}>
                    <strong>{step}</strong>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </>
      ) : null}
    </section>
  );
}
