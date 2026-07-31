const mvpFeatures = [
  {
    icon: "📊",
    title: "Canlı Dashboard",
    items: [
      "Genel platform özeti",
      "Toplam kullanıcı sayısı",
      "Aktif işletmeler",
      "Duyurular",
      "Son etkinlikler",
      "Son talepler",
      "Hızlı erişim kartları",
    ],
  },
  {
    icon: "👥",
    title: "Rol Bazlı Erişim",
    items: ["Süper Admin", "Belediye Yöneticisi", "Belediye Personeli", "İşletme Yetkilisi", "Vatandaş"],
    note: "Her kullanıcı yalnızca yetkili olduğu alanları görüntüler.",
  },
  {
    icon: "🏛️",
    title: "Belediye Portalı",
    items: [
      "Haber Yönetimi",
      "Duyuru Yönetimi",
      "Etkinlik Yönetimi",
      "Sayfa Yönetimi",
      "Bildirim Gönderme",
      "Temel Raporlar",
    ],
  },
  {
    icon: "👤",
    title: "Vatandaş Portalı",
    items: ["Profil", "Talep / Şikayet Oluşturma", "Duyurular", "Etkinlik Takvimi", "Şehir Rehberi", "Bildirimler"],
  },
  {
    icon: "🏢",
    title: "İşletme Portalı",
    items: ["İşletme Profili", "Kampanya Yayınlama", "Etkinlik Oluşturma", "İşletme Bilgileri", "QR Profil Sayfası"],
  },
  {
    icon: "🗺️",
    title: "Şehir Rehberi",
    items: [
      "Gezilecek Yerler",
      "Parklar",
      "Plajlar",
      "Müzeler",
      "Sağlık Noktaları",
      "Otopark Bilgileri",
      "Harita Üzerinde Gösterim",
    ],
  },
  {
    icon: "🤖",
    title: "MU AI (Beta)",
    items: ["Belediye hizmetleri hakkında soru-cevap", "Etkinlik önerileri", "Şehir rehberi desteği", "Sık sorulan sorular"],
  },
  {
    icon: "🔔",
    title: "Bildirim Merkezi",
    items: ["Belediye duyuruları", "Etkinlik bildirimleri", "Acil durum bilgilendirmeleri", "Sistem bildirimleri"],
  },
  {
    icon: "📈",
    title: "Analitik (Temel)",
    items: ["Kullanıcı sayıları", "Sayfa görüntülemeleri", "Etkinlik katılımı", "İşletme görüntülenmeleri"],
  },
  {
    icon: "🔗",
    title: "API Ready",
    items: ["REST API altyapısı", "API anahtarı yönetimi", "Webhook desteği (temel)", "Harita servisleri entegrasyonu"],
  },
  {
    icon: "🔐",
    title: "Güvenlik",
    items: ["Güvenli giriş", "JWT/OAuth tabanlı kimlik doğrulama", "Rol bazlı yetkilendirme", "HTTPS desteği"],
  },
];

const excludedFeatures = [
  "CRM",
  "Açık Veri Portalı",
  "Katılımcı Bütçe",
  "Çoklu belediye yönetimi",
  "White-label",
  "Çoklu dil",
  "Gelişmiş analitik",
  "API Marketplace",
  "Doküman yönetimi",
  "E-imza",
  "e-Devlet entegrasyonu",
  "Gelişmiş iş akışı otomasyonları",
];

const phaseGoals = [
  "Tek panelden yönetim",
  "Bulut tabanlı kullanım",
  "Basit ve modern arayüz",
  "Hızlı kurulum",
  "Modüler mimari",
  "Yapay zekâ destekli temel deneyim",
  "Gelecekte genişletilebilir altyapı",
];

export default function PlatformPage() {
  return (
    <main className="platform-page">
      <section className="platform-hero">
        <p className="eyebrow">Platform</p>
        <h1>Tek merkezden şehir operasyon yönetimi.</h1>
        <p>
          MUFLOW; belediye, vatandaş, işletme ve yönetici süreçlerini tek bulut altyapısında bir araya getiren modüler
          bir City Operations Platform'dur.
        </p>
      </section>

      <section className="platform-block">
        <div className="section-heading">
          <p className="eyebrow">İlk Faz (MVP) Özellikleri</p>
          <h2>Gereken kadar kapsam, hızlı kurulabilir ürün çekirdeği.</h2>
        </div>
        <div className="feature-matrix">
          {mvpFeatures.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <div className="feature-title">
                <span>{feature.icon}</span>
                <h3>{feature.title}</h3>
              </div>
              <ul>
                {feature.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {feature.note ? <p>{feature.note}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="platform-block excluded-block">
        <div>
          <p className="eyebrow">MVP'de Olmaması Gerekenler</p>
          <h2>İlk sürümü gereksiz yere büyütmeyen net sınırlar.</h2>
          <p>
            Aşağıdaki özellikleri ikinci faza bırakmak, geliştirme süresini kısa, bakım maliyetini düşük ve ürün
            deneyimini anlaşılır tutar.
          </p>
        </div>
        <div className="excluded-grid">
          {excludedFeatures.map((feature) => (
            <span key={feature}>× {feature}</span>
          ))}
        </div>
      </section>

      <section className="platform-block goal-block">
        <div className="section-heading">
          <p className="eyebrow">İlk Fazın Hedefi</p>
          <h2>MUFLOW'un temel değerini hızlı ve net göstermek.</h2>
          <p>
            İlk sürümün amacı tüm ihtiyaçları karşılamak değil, kurumlara ürünün ana değerini gösterecek güçlü ve
            yönetilebilir bir MVP sunmaktır.
          </p>
        </div>
        <div className="goal-grid">
          {phaseGoals.map((goal) => (
            <span key={goal}>{goal}</span>
          ))}
        </div>
        <p className="platform-summary">
          Bu kapsam, yaklaşık 8-10 sayfalık landing page ve 5 temel portal ile hem teknik olarak yönetilebilir hem de
          potansiyel müşterilere ürünün vizyonunu net şekilde gösterecek güçlü bir MVP oluşturur.
        </p>
      </section>
    </main>
  );
}
