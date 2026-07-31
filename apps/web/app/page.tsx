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
  ["⚙️", "Yönetici", "Rol bazlı yönetim, CRM, analitik ve API kontrolü."],
];

const steps = ["Kurulum", "Veri Aktarımı", "Kullanıma Başlayın", "Yönetin"];
const integrations = ["Next.js", "PostgreSQL", "OpenAI", "Mapbox", "Firebase", "REST API"];
const audiences = ["Belediye", "Turizm", "Üniversite", "OSB", "Marina", "AVM"];
const stats = [["5+", "Portal"], ["100+", "Modül"], ["API", "Ready"], ["Cloud", "Native"]];

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

function DashboardMockup() {
  return (
    <div className="mockup-wrap" aria-label="Canlı dashboard ve telefon mockup">
      <div className="dashboard">
        <div className="dash-top">
          <span />
          <span />
          <span />
        </div>
        <div className="dash-grid">
          <div className="metric tall">
            <strong>82%</strong>
            <small>Talep çözüm oranı</small>
          </div>
          <div className="metric">
            <strong>248</strong>
            <small>Aktif işlem</small>
          </div>
          <div className="metric">
            <strong>12</strong>
            <small>Entegrasyon</small>
          </div>
          <div className="chart">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
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

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">MUFLOW v1.0 MVP</p>
          <h1>Şehrinizin Dijital İşletim Sistemi</h1>
          <p>
            Belediyeler, vatandaşlar ve işletmeleri tek bulut platformunda buluşturan yeni nesil City Operations
            Platform.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="/platform">Platformu Keşfet</a>
            <a className="secondary-button" href="/demo-talep">Demo Talep Et</a>
          </div>
        </div>
        <DashboardMockup />
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Neden MUFLOW?</p>
          <h2>İlk faz için sade, hızlı ve yönetilebilir altyapı.</h2>
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

      <section className="section" id="platform">
        <div className="section-heading">
          <p className="eyebrow">Platform</p>
          <h2>Beş temel portal, tek operasyon merkezi.</h2>
        </div>
        <div className="platform-grid">
          {platforms.map(([icon, title, text]) => (
            <article className="platform-card" key={title}>
              <span>{icon}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <a href="/moduller">Daha Fazla</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section pricing-section">
        <div className="section-heading">
          <p className="eyebrow">Freemium Modeli</p>
          <h2>İlk belediyeler için giriş maliyetini düşüren paketler.</h2>
        </div>
        <div className="pricing-grid">
          {packages.map((plan) => (
            <article className={`pricing-card ${plan.featured ? "featured" : ""}`} key={plan.name}>
              <div>
                <p className="plan-label">{plan.name}</p>
                <p>{plan.note}</p>
              </div>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a className={plan.featured ? "primary-button" : "secondary-button"} href={plan.name === "Enterprise" ? "/iletisim" : "/demo-talep"}>
                {plan.cta}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section how">
        <div className="section-heading">
          <p className="eyebrow">Nasıl Çalışır?</p>
          <h2>Başlangıçtan yönetime dört net adım.</h2>
        </div>
        <div className="steps">
          {steps.map((step) => (
            <div className="step" key={step}>{step}</div>
          ))}
        </div>
      </section>

      <section className="section ai-section">
        <div className="ai-phone">
          <div className="phone-header">MU AI</div>
          <div className="bubble user">Bugün etkinlik var mı?</div>
          <div className="bubble ai">Bugün saat 18.00'de Kent Meydanında çocuk etkinliği bulunmaktadır.</div>
        </div>
        <div>
          <p className="eyebrow">MU AI</p>
          <h2>Şehir bilgisine doğal dille ulaşın.</h2>
          <p>
            Vatandaşlar etkinlik, duyuru ve şehir hizmetlerini tek soru ile bulur. Belediye ekipleri tekrar eden
            talepleri daha hızlı karşılar.
          </p>
        </div>
      </section>

      <section className="section integrations">
        <div className="section-heading">
          <p className="eyebrow">Entegrasyonlar</p>
          <h2>İlk sürüm için gerekli temel teknoloji bağlantıları.</h2>
        </div>
        <div className="logo-grid">
          {integrations.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="section audience-section">
        <div>
          <p className="eyebrow">Kimler Kullanıyor?</p>
          <h2>Şehir odaklı kurumlar için tasarlandı.</h2>
        </div>
        <div className="audience-grid">
          {audiences.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="stats">
        {stats.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="cta">
        <h2>Şehrinizi Dijitalleştirin.</h2>
        <p>Demo talep edin.</p>
        <a className="primary-button" href="/demo-talep">Demo Talep Et</a>
      </section>
    </main>
  );
}
