const reasons = [
  ["Cloud", "Bulut Tabanlı", "Kurulum gerektirmez."],
  ["Grid", "Modüler", "İhtiyacınız kadar kullanın."],
  ["AI", "MU AI", "Yapay zekâ destekli."],
  ["Link", "Entegre", "Mevcut sistemlerle uyumlu."],
];

const platforms = [
  ["🏛", "Belediye", "Duyuru, talep, etkinlik ve operasyon yönetimi tek panelde."],
  ["👥", "Vatandaş", "Başvuru, öneri, bildirim ve şehir rehberine hızlı erişim."],
  ["🏢", "İşletme", "İşletme profili, kampanya ve yerel ekonomi araçları."],
  ["🌍", "Turizm", "Rota, harita, etkinlik ve destinasyon deneyimi."],
  ["⚙️", "Yönetici", "Rol bazlı yönetim, raporlama ve sistem ayarları."],
];

const packages = [
  {
    name: "Ücretsiz",
    note: "İlk belediyeler için giriş maliyetini düşürür.",
    features: ["Haber", "Duyuru", "Etkinlik"],
    cta: "Ücretsiz Başla",
  },
  {
    name: "Pro",
    note: "Operasyon, katılım ve entegrasyon ihtiyacı büyüyen kurumlar için.",
    features: ["CRM", "AI", "Analitik", "API", "Katılımcı bütçe", "İşletme portalı"],
    cta: "Demo Talep Et",
    featured: true,
  },
  {
    name: "Enterprise",
    note: "Kurumsal ölçek, özel entegrasyon ve yüksek erişilebilirlik gerektiren yapılar için.",
    features: ["White Label", "SSO", "e-Devlet entegrasyonu", "Özel geliştirme", "SLA paketleri"],
    cta: "İletişime Geç",
  },
];

const mvpFeatures = [
  ["📊", "Canlı Dashboard", ["Genel platform özeti", "Toplam kullanıcı sayısı", "Aktif işletmeler", "Duyurular", "Son etkinlikler", "Son talepler"]],
  ["👥", "Rol Bazlı Erişim", ["Süper Admin", "Belediye Yöneticisi", "Belediye Personeli", "İşletme Yetkilisi", "Vatandaş"]],
  ["🏛️", "Belediye Portalı", ["Haber Yönetimi", "Duyuru Yönetimi", "Etkinlik Yönetimi", "Sayfa Yönetimi", "Bildirim Gönderme", "Temel Raporlar"]],
  ["👤", "Vatandaş Portalı", ["Profil", "Talep / Şikayet Oluşturma", "Duyurular", "Etkinlik Takvimi", "Şehir Rehberi", "Bildirimler"]],
  ["🏢", "İşletme Portalı", ["İşletme Profili", "Kampanya Yayınlama", "Etkinlik Oluşturma", "İşletme Bilgileri", "QR Profil Sayfası"]],
  ["🤖", "MU AI (Beta)", ["Belediye hizmetleri hakkında soru-cevap", "Etkinlik önerileri", "Şehir rehberi desteği", "Sık sorulan sorular"]],
  ["🔔", "Bildirim Merkezi", ["Belediye duyuruları", "Etkinlik bildirimleri", "Acil durum bilgilendirmeleri", "Sistem bildirimleri"]],
  ["🔗", "API Ready", ["REST API altyapısı", "API anahtarı yönetimi", "Webhook desteği", "Harita servisleri entegrasyonu"]],
];

const excludedFeatures = [
  "Açık Veri Portalı",
  "Çoklu belediye yönetimi",
  "White-label",
  "Çoklu dil",
  "Gelişmiş analitik",
  "API Marketplace",
  "Doküman yönetimi",
  "E-imza",
  "Gelişmiş iş akışı otomasyonları",
];

const stats = [["5+", "Portal"], ["100+", "Modül"], ["API", "Ready"], ["Cloud", "Native"]];

function DashboardMockup() {
  return (
    <div className="mockup-wrap" aria-label="Canlı dashboard ve telefon mockup">
      <div className="dashboard">
        <div className="dash-top"><span /><span /><span /></div>
        <div className="dash-grid">
          <div className="metric tall"><strong>82%</strong><small>Talep çözüm oranı</small></div>
          <div className="metric"><strong>248</strong><small>Aktif işlem</small></div>
          <div className="metric"><strong>12</strong><small>Entegrasyon</small></div>
          <div className="chart"><i /><i /><i /><i /><i /></div>
        </div>
      </div>
      <div className="hero-phone">
        <div className="phone-header">MU AI</div>
        <div className="bubble user">Bugün etkinlik var mı?</div>
        <div className="bubble ai">Bugün 18.00'de Kent Meydanında açık hava konseri var.</div>
      </div>
    </div>
  );
}

export function PlatformContent() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">MUFLOW v1.0 MVP</p>
          <h1>Şehrinizin Dijital İşletim Sistemi</h1>
          <p>
            MUFLOW; belediye, vatandaş, işletme ve yönetici süreçlerini tek bulut altyapısında bir araya getiren
            modüler bir City Operations Platform'dur.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#paketler">Paketleri İncele</a>
            <a className="secondary-button" href="mailto:demo@muflow.city">Demo Talep Et</a>
          </div>
        </div>
        <DashboardMockup />
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Neden MUFLOW?</p>
          <h2>Az menü, hızlı işlem ve tek merkezden yönetim.</h2>
        </div>
        <div className="reason-grid">
          {reasons.map(([icon, title, text]) => (
            <article className="reason-card" key={title}>
              <div className="line-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Platform</p>
          <h2>Tüm temel modüller tek Platform sekmesinde.</h2>
        </div>
        <div className="platform-grid">
          {platforms.map(([icon, title, text]) => (
            <article className="platform-card" key={title}>
              <span>{icon}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section pricing-section" id="paketler">
        <div className="section-heading">
          <p className="eyebrow">Gelir Modeli</p>
          <h2>Freemium model ile düşük giriş maliyeti, kademeli büyüme.</h2>
        </div>
        <div className="pricing-grid">
          {packages.map((plan) => (
            <article className={`pricing-card ${plan.featured ? "featured" : ""}`} key={plan.name}>
              <div>
                <p className="plan-label">{plan.name}</p>
                <p>{plan.note}</p>
              </div>
              <ul>
                {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <a className={plan.featured ? "primary-button" : "secondary-button"} href="mailto:demo@muflow.city">
                {plan.cta}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="platform-block">
        <div className="section-heading">
          <p className="eyebrow">İlk Faz (MVP) Özellikleri</p>
          <h2>Gereken kadar kapsam, hızlı kurulabilir ürün çekirdeği.</h2>
        </div>
        <div className="feature-matrix">
          {mvpFeatures.map(([icon, title, items]) => (
            <article className="feature-card" key={title as string}>
              <div className="feature-title">
                <span>{icon}</span>
                <h3>{title}</h3>
              </div>
              <ul>
                {(items as string[]).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="platform-block excluded-block">
        <div>
          <p className="eyebrow">MVP'de Olmaması Gerekenler</p>
          <h2>İlk sürümü gereksiz yere büyütmeyen net sınırlar.</h2>
          <p>Bu özellikler ikinci faza bırakılarak ürün daha hızlı devreye alınır.</p>
        </div>
        <div className="excluded-grid">
          {excludedFeatures.map((feature) => <span key={feature}>× {feature}</span>)}
        </div>
      </section>

      <section className="stats">
        {stats.map(([value, label]) => (
          <div key={label}><strong>{value}</strong><span>{label}</span></div>
        ))}
      </section>

      <section className="cta">
        <h2>Şehrinizi Dijitalleştirin.</h2>
        <p>Freemium model ile başlayın, ihtiyaç oldukça büyütün.</p>
        <a className="primary-button" href="mailto:demo@muflow.city">Demo Talep Et</a>
      </section>
    </main>
  );
}
