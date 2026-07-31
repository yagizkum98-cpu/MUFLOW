const trustItems = [
  "Donanım gerektirmez",
  "Bulut tabanlı",
  "API hazır",
  "Modüler yapı",
  "Yapay zeka destekli",
  "Mobil uyumlu",
  "Güvenli",
  "Ölçeklenebilir",
];

const modules = [
  {
    icon: "🏛️",
    title: "Belediye Portalı",
    items: ["Haberler", "Duyurular", "Etkinlik Yönetimi", "Açık Veri", "Projeler", "Afet Yönetimi", "Dashboard", "Raporlama"],
  },
  {
    icon: "👥",
    title: "Vatandaş Portalı",
    items: ["Talep", "Şikayet", "Katılımcı Bütçe", "Öneri", "Etkinlik", "Bildirim", "Dijital Kimlik", "Şehir Rehberi"],
  },
  {
    icon: "🏪",
    title: "İşletme Portalı",
    items: ["İşletme Profili", "Kampanyalar", "QR Menü", "Rezervasyon", "Analitik", "Kupon", "Duyurular"],
  },
  {
    icon: "🌍",
    title: "Turizm Portalı",
    items: ["Dijital Rehber", "Gezi Rotaları", "Etkinlikler", "Sesli Rehber", "Harita", "Yerel Deneyimler"],
  },
  {
    icon: "⚙️",
    title: "Yönetici Portalı",
    items: ["CRM", "Yetkilendirme", "İçerik Yönetimi", "API", "Dashboard", "Kullanıcı Yönetimi"],
  },
];

const ecosystem = [
  "Belediye",
  "Vatandaş",
  "İşletme",
  "Turizm",
  "Kültür",
  "Spor",
  "Afet",
  "Açık Veri",
  "Katılımcı Bütçe",
  "CRM",
  "Mobil",
  "AI",
];

const integrations = [
  "OpenAI",
  "Mapbox",
  "Google Maps",
  "Firebase",
  "PostgreSQL",
  "Next.js",
  "Node.js",
  "Prisma",
  "REST API",
  "GraphQL",
  "Webhook",
  "e-Devlet",
  "Kent Bilgi Sistemleri",
  "ERP",
  "CBS",
];

const reasons = [
  ["Donanım Gerektirmez", "Sadece internet bağlantısıyla çalışır."],
  ["Bulut Tabanlı", "Sunucu kurmadan kullanılabilir."],
  ["Modüler", "İhtiyacınız kadar modül kullanın."],
  ["API Odaklı", "Mevcut sistemlerle kolayca entegre olur."],
  ["Ölçeklenebilir", "İlçeden büyükşehire kadar aynı altyapı."],
  ["Yapay Zeka", "Vatandaş deneyimini geliştirir."],
];

const users = [
  "🏛️ Belediyeler",
  "🏢 Kamu Kurumları",
  "🏨 Turizm Destinasyonları",
  "🎓 Üniversiteler",
  "🏭 Organize Sanayi Bölgeleri",
  "🛍️ AVM Yönetimleri",
  "⚓ Marinalar",
  "🏘️ Akıllı Şehir Projeleri",
];

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Redis",
  "OpenAI",
  "Mapbox",
  "Firebase",
  "Docker",
  "Kubernetes",
];

const roadmap = [
  ["2027", "MVP", "İlk Belediye", "İlk Pilot"],
  ["2028", "10 Belediye", "1000 İşletme", "50.000 Kullanıcı"],
  ["2029", "Türkiye Geneli", "White Label", "API Marketplace"],
  ["2030+", "Uluslararası Açılım", "Municipal Cloud Platform", "Global partner ağı"],
];

function CityMap() {
  const nodes = ["Belediye", "Vatandaş", "İşletme", "Turizm", "AI"];

  return (
    <div className="city-stage" aria-label="Animasyonlu 3D şehir haritası">
      <div className="map-grid" />
      <div className="city-block block-one" />
      <div className="city-block block-two" />
      <div className="city-block block-three" />
      <div className="city-block block-four" />
      <div className="city-core">MUFLOW</div>
      {nodes.map((node, index) => (
        <div className={`flow-node node-${index + 1}`} key={node}>
          <span>{node}</span>
        </div>
      ))}
      <div className="route route-one" />
      <div className="route route-two" />
      <div className="route route-three" />
      <div className="route route-four" />
      <div className="route route-five" />
    </div>
  );
}

function FlowDiagram() {
  return (
    <div className="flow-diagram" aria-label="MUFLOW şehir operasyon akışı">
      {["Şehir", "MUFLOW", "Belediye", "Vatandaş", "İşletme", "Turizm", "AI"].map((item) => (
        <div className="flow-step" key={item}>
          {item}
        </div>
      ))}
    </div>
  );
}

function Ecosystem() {
  return (
    <div className="ecosystem-orbit" aria-label="Dijital ekosistem bağlantıları">
      <div className="ecosystem-center">MUFLOW</div>
      {ecosystem.map((item, index) => (
        <span className="ecosystem-node" style={{ "--i": index } as React.CSSProperties} key={item}>
          {item}
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <section className="hero">
        <nav className="nav">
          <a className="brand" href="#top" aria-label="MUFLOW ana sayfa">
            <img src="/muflow-logo.svg" alt="MUFLOW" />
            <span>
              <strong>MUFLOW</strong>
              <small>Municipal Flow Platform</small>
            </span>
          </a>
          <div className="nav-links">
            <a href="#modules">Modüller</a>
            <a href="#ai">MU AI</a>
            <a href="#roadmap">Roadmap</a>
            <a href="#demo">Demo</a>
          </div>
        </nav>

        <div className="hero-inner" id="top">
          <div className="hero-copy">
            <p className="eyebrow">City Operations Platform</p>
            <h1>Şehrinizin Dijital İşletim Sistemi</h1>
            <p className="hero-text">
              Belediyeler, vatandaşlar, işletmeler ve ziyaretçileri tek bulut platformunda buluşturan yeni nesil City
              Operations Platform.
            </p>
            <p className="hero-statement">Tek Platform. Tek Yönetim. Sınırsız Entegrasyon.</p>
            <div className="hero-actions">
              <a className="button primary" href="#modules">
                Platformu Keşfet
              </a>
              <a className="button secondary" href="#demo">
                Demo Talep Et
              </a>
            </div>
          </div>
          <CityMap />
        </div>
      </section>

      <section className="trust band">
        <p>Şehirlerin dijital dönüşümü için geliştirildi.</p>
        <div className="trust-grid">
          {trustItems.map((item) => (
            <span key={item}>✓ {item}</span>
          ))}
        </div>
      </section>

      <section className="section split">
        <div>
          <p className="eyebrow">MUFLOW Nedir?</p>
          <h2>Municipal Flow Platform</h2>
          <p>
            MUFLOW; şehirlerin dijital operasyonlarını tek merkezden yöneten yeni nesil City Operations Platformudur.
          </p>
          <p>
            Farklı sistemleri tek panel altında birleştirerek belediyeler, vatandaşlar, işletmeler ve ziyaretçiler
            arasında kesintisiz dijital iletişim sağlar.
          </p>
        </div>
        <FlowDiagram />
      </section>

      <section className="section" id="modules">
        <div className="section-heading">
          <p className="eyebrow">Platform Modülleri</p>
          <h2>Her şehir paydaşı için ayrı portal, tek merkezden yönetim</h2>
        </div>
        <div className="module-grid">
          {modules.map((module) => (
            <article className="module-card" key={module.title}>
              <div className="module-icon">{module.icon}</div>
              <h3>{module.title}</h3>
              <ul>
                {module.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section ai-section" id="ai">
        <div className="phone">
          <div className="phone-screen">
            <div className="chat user">Bugün çocuk etkinliği var mı?</div>
            <div className="chat ai">Bugün saat 18.00'de Kent Meydanında Çocuk Bilim Atölyesi bulunmaktadır.</div>
            <div className="chat user">En yakın ücretsiz otopark</div>
            <div className="map-card">Harita → Navigasyon</div>
            <div className="chat user">Bu hafta konser var mı?</div>
            <div className="event-card">Etkinlik Kartı · Cuma 20.30</div>
          </div>
        </div>
        <div>
          <p className="eyebrow">MU AI</p>
          <h2>Şehrinizle Konuşun.</h2>
          <p>
            MU AI; etkinlikleri, duyuruları, rota bilgilerini ve şehir hizmetlerini doğal dilde anlaşılır cevaplara
            dönüştürür.
          </p>
        </div>
      </section>

      <section className="section ecosystem-section">
        <div className="section-heading">
          <p className="eyebrow">Dijital Ekosistem</p>
          <h2>Şehir servisleri birbirine canlı veri akışlarıyla bağlanır</h2>
        </div>
        <Ecosystem />
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Entegrasyonlar</p>
          <h2>Modern şehir altyapısına hazır teknoloji omurgası</h2>
        </div>
        <div className="integration-grid">
          {integrations.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="section reason-section">
        <div className="section-heading">
          <p className="eyebrow">Neden MUFLOW?</p>
          <h2>Kurumsal ölçekte yalın, güvenli ve genişleyebilir</h2>
        </div>
        <div className="reason-grid">
          {reasons.map(([title, text]) => (
            <article className="reason-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section users-section">
        <div className="section-heading">
          <p className="eyebrow">Kimler Kullanabilir?</p>
          <h2>Belediye dışındaki kurumsal şehir ekosistemlerine de uyumlu</h2>
        </div>
        <div className="user-grid">
          {users.map((user) => (
            <span key={user}>{user}</span>
          ))}
        </div>
      </section>

      <section className="section tech-section">
        <div className="code-rain" aria-hidden="true">
          {technologies.slice(0, 8).map((tech) => (
            <span key={tech}>{`const ${tech.replace(".", "").toLowerCase()} = "ready";`}</span>
          ))}
        </div>
        <div className="section-heading">
          <p className="eyebrow">Teknoloji</p>
          <h2>Next.js tabanlı, API odaklı, AI hazır ürün mimarisi</h2>
        </div>
        <div className="tech-grid">
          {technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </section>

      <section className="section" id="roadmap">
        <div className="section-heading">
          <p className="eyebrow">Roadmap</p>
          <h2>2027'den itibaren ölçeklenen municipal cloud vizyonu</h2>
        </div>
        <div className="timeline">
          {roadmap.map(([year, ...items]) => (
            <article className="timeline-card" key={year}>
              <strong>{year}</strong>
              {items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section className="section demo-section" id="demo">
        <div>
          <p className="eyebrow">Demo</p>
          <h2>Canlı dashboard her ekranda şehir yönetimini görünür kılar</h2>
          <p>Bilgisayar, tablet ve telefon ekranları aynı operasyon verisini rol bazlı arayüzlerle taşır.</p>
        </div>
        <div className="device-showcase">
          <div className="desktop-device">Canlı Dashboard</div>
          <div className="tablet-device">Tablet</div>
          <div className="mobile-device">Telefon</div>
        </div>
      </section>

      <section className="cta">
        <h2>Şehrinizi geleceğe taşıyın.</h2>
        <p>MUFLOW ile şehir yönetimini tek platformda birleştirin.</p>
        <div className="hero-actions">
          <a className="button primary" href="mailto:demo@muflow.city">
            Demo Talep Et
          </a>
          <a className="button secondary" href="mailto:hello@muflow.city">
            İletişime Geç
          </a>
        </div>
      </section>
    </main>
  );
}
