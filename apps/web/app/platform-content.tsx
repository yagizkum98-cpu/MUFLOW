import { MuAiDemo } from "./mu-ai-demo";
import { LiveStats } from "./live-stats";
import { LiveDashboardMockup } from "./live-dashboard-mockup";
import { LiveAnalytics } from "./live-analytics";
import {
  businessRevenue,
  citizenRevenue,
  extraRevenueChannels,
  municipalityRevenue,
  productFamily,
  revenueDistribution,
  salesSteps,
} from "../lib/revenue-model";

const reasons = [
  ["Cloud", "Bulut Tabanlı", "Kurulum gerektirmez."],
  ["Grid", "Modüler", "İhtiyacınız kadar kullanın."],
  ["AI", "MU AI", "Yapay zekâ destekli."],
  ["Link", "Entegre", "Mevcut sistemlerle uyumlu."],
];

const platforms = [
  ["🏛", "Belediye", "Duyuru, talep, etkinlik ve operasyon yönetimi tek panelde.", "/dashboard/belediye"],
  ["👥", "Vatandaş", "Başvuru, öneri, bildirim ve şehir rehberine hızlı erişim.", "/dashboard/vatandas"],
  ["🏢", "İşletme", "İşletme profili, kampanya ve yerel ekonomi araçları.", "/dashboard/isletme"],
  ["🌍", "Turizm", "Rota, harita, etkinlik ve destinasyon deneyimi.", "/dashboard/rehber"],
  ["⚙️", "Yönetici", "Rol bazlı yönetim, raporlama ve sistem ayarları.", "/dashboard/admin"],
];

const mvpFeatures = [
  {
    icon: "📊",
    title: "Canlı Dashboard",
    items: ["Genel platform özeti", "Toplam kullanıcı sayısı", "Aktif işletmeler", "Duyurular", "Son etkinlikler", "Son talepler"],
  },
  {
    icon: "👥",
    title: "Rol Bazlı Erişim",
    items: ["Süper Admin", "Belediye Yöneticisi", "Belediye Personeli", "İşletme Yetkilisi", "Vatandaş"],
  },
  {
    icon: "🏛️",
    title: "Belediye Portalı",
    items: ["Haber Yönetimi", "Duyuru Yönetimi", "Etkinlik Yönetimi", "Sayfa Yönetimi", "Bildirim Gönderme", "Temel Raporlar"],
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
    icon: "🔗",
    title: "API Ready",
    items: ["REST API altyapısı", "API anahtarı yönetimi", "Webhook desteği", "Harita servisleri entegrasyonu"],
  },
];

const businessPortal = [
  {
    icon: "📋",
    title: "İşletme Profili",
    text: "İşletme bilgilerini kolayca yönetin.",
    items: ["İşletme adı", "Logo", "Açıklama", "Kategori", "Adres", "Telefon", "E-posta", "Web sitesi", "Sosyal medya bağlantıları", "Çalışma saatleri"],
  },
  {
    icon: "📢",
    title: "Duyuru ve Kampanyalar",
    text: "Müşterilerinize güncel bilgileri paylaşın.",
    items: ["Kampanya oluşturma", "Duyuru yayınlama", "Son kullanma tarihi belirleme", "Yayında / Taslak durumu"],
  },
  {
    icon: "🎉",
    title: "Etkinlik Yönetimi",
    text: "İşletmenizde düzenlediğiniz etkinlikleri duyurun.",
    items: ["Etkinlik oluşturma", "Tarih ve saat", "Konum", "Kısa açıklama", "Kapak görseli"],
  },
  {
    icon: "📱",
    title: "QR İşletme Sayfası",
    text: "Her işletme için otomatik dijital tanıtım sayfası oluşturun.",
    items: ["QR kod", "İşletme bilgileri", "Konum", "Kampanyalar", "Etkinlikler", "İletişim bilgileri"],
  },
  {
    icon: "🔔",
    title: "Bildirim Merkezi",
    text: "Belediye ve sistem duyurularını tek yerden takip edin.",
    items: ["Belediye duyuruları", "Sistem bildirimleri", "Başvuru durumları"],
  },
  {
    icon: "📊",
    title: "Temel İstatistikler",
    text: "İşletmenizin görünürlüğünü takip edin.",
    items: ["Profil görüntülenme sayısı", "QR görüntülenme sayısı", "Aktif kampanya sayısı", "Yaklaşan etkinlik sayısı"],
  },
  {
    icon: "👤",
    title: "Hesap Yönetimi",
    text: "İşletme hesabınızı yönetin.",
    items: ["Profil düzenleme", "Şifre değiştirme", "Bildirim tercihleri"],
  },
];

const municipalityPortal = [
  {
    icon: "📰",
    title: "Haber Yönetimi",
    text: "Belediye haberlerini merkezi panelden hazırlayın ve yayınlayın.",
    items: ["Haber başlığı", "Kapak görseli", "İçerik düzenleme", "Yayın durumu"],
  },
  {
    icon: "📢",
    title: "Duyuru Yönetimi",
    text: "Vatandaşlara hızlı, anlaşılır ve güncel duyurular ulaştırın.",
    items: ["Duyuru oluşturma", "Kategori seçimi", "Öne çıkarma", "Yayın tarihi"],
  },
  {
    icon: "🎉",
    title: "Etkinlik Yönetimi",
    text: "Şehir etkinliklerini takvim, konum ve içerik bilgileriyle yönetin.",
    items: ["Etkinlik oluşturma", "Tarih ve saat", "Konum", "Kısa açıklama"],
  },
  {
    icon: "📄",
    title: "Sayfa Yönetimi",
    text: "Kurumsal sayfaları ve temel şehir bilgilendirme içeriklerini düzenleyin.",
    items: ["Sayfa oluşturma", "İçerik güncelleme", "Yayın / taslak", "Sıralama"],
  },
  {
    icon: "🔔",
    title: "Bildirim Gönderme",
    text: "Önemli bilgileri hedef kitlelere hızlıca iletin.",
    items: ["Belediye duyuruları", "Etkinlik bildirimleri", "Acil bilgilendirme", "Sistem mesajları"],
  },
  {
    icon: "📊",
    title: "Temel Raporlar",
    text: "İçerik, talep ve kullanım verilerini sade raporlarla takip edin.",
    items: ["Duyuru görüntülemeleri", "Etkinlik sayıları", "Talep özeti", "Kullanım göstergeleri"],
  },
];

const citizenPortal = [
  {
    icon: "👤",
    title: "Profil",
    text: "Vatandaş bilgilerini ve temel hesap ayarlarını tek yerden yönetin.",
    items: ["Ad soyad", "İletişim bilgileri", "Adres bilgisi", "Hesap tercihleri"],
  },
  {
    icon: "📝",
    title: "Talep / Şikayet Oluşturma",
    text: "Belediyeye hızlıca talep, öneri veya şikayet iletin.",
    items: ["Yeni talep oluşturma", "Kategori seçimi", "Konum ekleme", "Durum takibi"],
  },
  {
    icon: "📢",
    title: "Duyurular",
    text: "Belediye duyurularını güncel ve düzenli şekilde takip edin.",
    items: ["Güncel duyurular", "Acil bilgilendirmeler", "Kategoriye göre listeleme"],
  },
  {
    icon: "📅",
    title: "Etkinlik Takvimi",
    text: "Şehirdeki etkinlikleri tarih ve kategoriye göre görüntüleyin.",
    items: ["Yaklaşan etkinlikler", "Tarih ve saat", "Konum", "Etkinlik detayı"],
  },
  {
    icon: "🗺️",
    title: "Şehir Rehberi",
    text: "Şehrin önemli noktalarına ve hizmetlerine kolayca ulaşın.",
    items: ["Gezilecek yerler", "Parklar", "Sağlık noktaları", "Otopark bilgileri"],
  },
  {
    icon: "🔔",
    title: "Bildirimler",
    text: "Size özel duyuru, etkinlik ve talep bildirimlerini takip edin.",
    items: ["Talep güncellemeleri", "Etkinlik bildirimleri", "Belediye duyuruları"],
  },
];

const cityGuide = [
  {
    icon: "📍",
    title: "Gezilecek Yerler",
    text: "Şehrin öne çıkan noktalarını tek dijital rehberde listeleyin.",
    items: ["Konum bilgisi", "Kısa açıklama", "Kategori", "Görsel alanı"],
  },
  {
    icon: "🌳",
    title: "Parklar",
    text: "Park ve rekreasyon alanlarını vatandaşlar ve ziyaretçiler için görünür kılın.",
    items: ["Park bilgileri", "Adres", "Harita konumu", "Temel özellikler"],
  },
  {
    icon: "🏖️",
    title: "Plajlar",
    text: "Sahil ve plaj noktalarını sezonsal bilgilerle tanıtın.",
    items: ["Plaj açıklaması", "Konum", "Ulaşım bilgisi", "Durum bilgisi"],
  },
  {
    icon: "🏛️",
    title: "Müzeler",
    text: "Kültür ve tarih noktalarını dijital rehberde düzenli şekilde sunun.",
    items: ["Müze bilgisi", "Ziyaret saatleri", "Adres", "İletişim bilgisi"],
  },
  {
    icon: "🏥",
    title: "Sağlık Noktaları",
    text: "Sağlık hizmet noktalarına hızlı erişim sağlayın.",
    items: ["Nokta adı", "Adres", "Telefon", "Harita konumu"],
  },
  {
    icon: "🅿️",
    title: "Otopark Bilgileri",
    text: "Otopark noktalarını ve temel erişim bilgilerini şehir rehberine ekleyin.",
    items: ["Otopark adı", "Konum", "Kapasite bilgisi", "Ücret / ücretsiz durumu"],
  },
  {
    icon: "🗺️",
    title: "Harita Üzerinde Gösterim",
    text: "Tüm şehir rehberi noktalarını harita üzerinde anlaşılır şekilde gösterin.",
    items: ["Kategori filtreleri", "Konum pinleri", "Yakınımdaki noktalar", "Rota desteği"],
  },
];

const notificationCenter = [
  {
    type: "Belediye duyuruları",
    title: "Su kesintisi bilgilendirmesi",
    text: "Planlı bakım duyurusu vatandaş ve işletme panellerinde yayında.",
    status: "Canlı",
    time: "Şimdi",
    channel: "Portal + Mobil",
  },
  {
    type: "Etkinlik bildirimleri",
    title: "Kent Meydanı etkinlik hatırlatması",
    text: "Yaklaşan etkinlik için ilgili kullanıcılara hatırlatma planlandı.",
    status: "Planlandı",
    time: "18:00",
    channel: "Mobil",
  },
  {
    type: "Acil durum bilgilendirmeleri",
    title: "Kuvvetli yağış uyarısı",
    text: "Riskli bölgeler için öncelikli bildirim akışı hazırlandı.",
    status: "Öncelikli",
    time: "5 dk önce",
    channel: "SMS + Mobil",
  },
  {
    type: "Sistem bildirimleri",
    title: "Başvuru durumu güncellendi",
    text: "Talep, şikayet ve işletme başvurularında durum değişiklikleri otomatik iletilir.",
    status: "Otomatik",
    time: "Anlık",
    channel: "Panel",
  },
];

const analyticsMetrics = [
  {
    title: "Kullanıcı sayıları",
    value: "0",
    change: "0%",
    text: "Vatandaş, işletme ve personel kullanıcıları tek özet panelde takip edilir.",
    bars: [8, 8, 8, 8, 8],
  },
  {
    title: "Sayfa görüntülemeleri",
    value: "0",
    change: "0%",
    text: "Portal sayfalarının toplam erişimi ve en çok görüntülenen içerikler izlenir.",
    bars: [8, 8, 8, 8, 8],
  },
  {
    title: "Etkinlik katılımı",
    value: "0",
    change: "0%",
    text: "Etkinlik ilgisi, kayıt ve katılım eğilimi temel seviyede raporlanır.",
    bars: [8, 8, 8, 8, 8],
  },
  {
    title: "İşletme görüntülenmeleri",
    value: "0",
    change: "0%",
    text: "İşletme profili ve QR sayfası görünürlüğü canlı özet olarak sunulur.",
    bars: [8, 8, 8, 8, 8],
  },
];

const securityFeatures = [
  {
    title: "Güvenli giriş",
    text: "Kullanıcı oturumları HTTP-only çerezde saklanan JWT ile korunur.",
  },
  {
    title: "JWT/OAuth tabanlı kimlik doğrulama",
    text: "MVP JWT altyapısıyla çalışır; OAuth sağlayıcıları aynı auth katmanına bağlanabilir.",
  },
  {
    title: "Rol bazlı yetkilendirme",
    text: "Süper Admin, Belediye Yöneticisi, Personel, İşletme Yetkilisi ve Vatandaş rolleri ayrıştırılır.",
  },
  {
    title: "HTTPS desteği",
    text: "Production ortamında HTTP istekleri middleware seviyesinde HTTPS'e yönlendirilir.",
  },
];

function RevenueModelSection() {
  return (
    <section className="section pricing-section" id="paketler">
      <div className="section-heading">
        <p className="eyebrow">Gelir Modeli</p>
        <h2>Kurumsal lisans, işletme aboneliği ve modüler büyüme.</h2>
        <p>
          MUFLOW gelir altyapısı belediyeyi ana müşteri, işletmeleri abonelik kanalı ve vatandaş hizmetlerini ücretsiz
          temel katman olarak konumlandırır.
        </p>
      </div>

      <div className="revenue-layout">
        <article className="revenue-card wide">
          <p className="plan-label">{municipalityRevenue.title}</p>
          <p>{municipalityRevenue.text}</p>
          <ul>
            {municipalityRevenue.streams.map((stream) => <li key={stream}>{stream}</li>)}
          </ul>
        </article>

        <div className="package-table">
          {municipalityRevenue.packages.map((plan) => (
            <article className={`revenue-card ${plan.featured ? "featured" : ""}`} key={plan.name}>
              <span className="package-name">{plan.name}</span>
              <h3>{plan.target}</h3>
              <p>{plan.content}</p>
            </article>
          ))}
        </div>

        <article className="revenue-card wide">
          <p className="plan-label">{businessRevenue.title}</p>
          <p>{businessRevenue.text}</p>
          <div className="b2b-grid">
            {businessRevenue.packages.map((plan) => (
              <div className={plan.featured ? "featured" : ""} key={plan.name}>
                <h3>{plan.name}</h3>
                <ul>
                  {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <p className="revenue-note">{businessRevenue.note}</p>
        </article>

        <article className="revenue-card">
          <p className="plan-label">{citizenRevenue.title}</p>
          <p>{citizenRevenue.text}</p>
          <ul>
            {citizenRevenue.services.map((service) => <li key={service}>{service}</li>)}
          </ul>
        </article>

        <article className="revenue-card">
          <p className="plan-label">Ek Gelir Kanalları</p>
          <div className="channel-list">
            {extraRevenueChannels.map(([title, text]) => (
              <div key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="revenue-card wide">
          <p className="plan-label">Önerilen Gelir Dağılımı</p>
          <div className="distribution-list">
            {revenueDistribution.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>%{value}</strong>
                <i style={{ width: `${value}%` }} />
              </div>
            ))}
          </div>
        </article>

        <article className="revenue-card">
          <p className="plan-label">Satış Stratejisi</p>
          <ol className="sales-steps">
            {salesSteps.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </article>

        <article className="revenue-card">
          <p className="plan-label">Ürün Ailesi</p>
          <div className="product-family">
            {productFamily.map(([name, text]) => (
              <div key={name}>
                <strong>{name}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
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
        <LiveDashboardMockup />
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
          {platforms.map(([icon, title, text, href]) => (
            <a className="platform-card" href={href} key={title}>
              <span>{icon}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <strong>Panele Git</strong>
            </a>
          ))}
        </div>
      </section>

      <section className="municipality-section">
        <div className="business-hero">
          <p className="eyebrow">🏛️ Belediye Portalı</p>
          <h2>Belediyenin günlük içerik ve iletişim süreçlerini tek panelden yönetin.</h2>
          <p>
            MUFLOW Belediye Portalı; haber, duyuru, etkinlik, sayfa, bildirim ve temel raporlama süreçlerini sade bir
            yönetim deneyimiyle bir araya getirir.
          </p>
        </div>
      </section>

      <section className="citizen-section">
        <div className="business-hero">
          <p className="eyebrow">👥 Vatandaş Portalı</p>
          <h2>Belediye hizmetlerine hızlı ve kolay erişin.</h2>
          <p>
            MUFLOW Vatandaş Portalı; vatandaşların profilini yönetmesini, talep ve şikayet oluşturmasını, duyuru ve
            etkinlikleri takip etmesini sağlayan sade bir şehir deneyimi sunar.
          </p>
        </div>
        <div className="business-grid">
          {citizenPortal.map((feature) => (
            <article className="business-card" key={feature.title}>
              <div className="feature-title">
                <span>{feature.icon}</span>
                <h3>{feature.title}</h3>
              </div>
              <p>{feature.text}</p>
              <ul>
                {feature.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="guide-section">
        <div className="business-hero">
          <p className="eyebrow">🗺️ Şehir Rehberi</p>
          <h2>Şehrin önemli noktalarını tek dijital rehberde toplayın.</h2>
          <p>
            MUFLOW Şehir Rehberi; gezilecek yerler, parklar, plajlar, müzeler, sağlık noktaları ve otopark bilgilerini
            harita destekli sade bir deneyimle sunar.
          </p>
          <a className="primary-button" href="mailto:demo@muflow.city?subject=MUFLOW%20%C5%9Eehir%20Rehberi">
            Konuşalım
          </a>
        </div>
        <div className="business-grid">
          {cityGuide.map((feature) => (
            <article className="business-card" key={feature.title}>
              <div className="feature-title">
                <span>{feature.icon}</span>
                <h3>{feature.title}</h3>
              </div>
              <p>{feature.text}</p>
              <ul>
                {feature.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="notification-section">
        <div className="notification-copy">
          <p className="eyebrow">🔔 Bildirim Merkezi</p>
          <h2>Şehir iletişimini canlı veri akışı gibi yönetin.</h2>
          <p>
            Belediye duyuruları, etkinlik bildirimleri, acil durum bilgilendirmeleri ve sistem bildirimleri tek merkezde
            takip edilir; ilgili kanallara hızlıca iletilir.
          </p>
        </div>
        <div className="notification-feed" aria-label="Canlı bildirim veri akışı">
          {notificationCenter.map((item) => (
            <article className="notification-card" key={item.type}>
              <div>
                <span className="notification-type">{item.type}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <div className="notification-meta">
                <span>{item.status}</span>
                <span>{item.time}</span>
                <span>{item.channel}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mu-ai-section">
        <div className="business-hero">
          <p className="eyebrow">🤖 MU AI (Beta)</p>
          <h2>Belediye hizmetleri için çalışan şehir asistanı altyapısı.</h2>
          <p>
            MU AI; belediye hizmetleri hakkında soru-cevap, etkinlik önerileri, şehir rehberi desteği ve sık sorulan
            sorular için MVP seviyesinde canlı API ve arayüzle hazırlandı.
          </p>
        </div>
        <MuAiDemo />
      </section>

      <section className="analytics-section">
        <div className="section-heading">
          <p className="eyebrow">📈 Analitik (Temel)</p>
          <h2>Platform performansını canlı veriyle izleyin.</h2>
          <p>
            Kullanıcı sayıları, sayfa görüntülemeleri, etkinlik katılımı ve işletme görüntülenmeleri MVP seviyesinde
            anlaşılır metriklerle takip edilir.
          </p>
        </div>
        <LiveAnalytics />
      </section>

      <section className="security-section">
        <div className="security-copy">
          <p className="eyebrow">🔐 Güvenlik</p>
          <h2>Güvenli giriş ve rol bazlı erişim altyapısı.</h2>
          <p>
            MUFLOW MVP; kurum, işletme ve vatandaş kullanıcılarını ayrı rollerle yönetir. Oturumlar JWT ile doğrulanır,
            korumalı sayfalar middleware üzerinden kontrol edilir ve production ortamında HTTPS kullanımı desteklenir.
          </p>
          <a className="primary-button" href="/giris">Giriş Altyapısını Gör</a>
        </div>
        <div className="security-grid">
          {securityFeatures.map((feature) => (
            <article className="security-card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="business-section">
        <div className="business-hero">
          <p className="eyebrow">🏢 İşletme Portalı</p>
          <h2>İşletmenizi dijital olarak yönetin.</h2>
          <p>
            MUFLOW İşletme Portalı; yerel işletmelerin belediye ile iletişim kurmasını, temel bilgilerini yönetmesini
            ve şehir ekosisteminde görünür olmasını sağlayan basit ve kullanışlı bir yönetim panelidir.
          </p>
        </div>
      </section>

      <RevenueModelSection />

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
                {feature.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <LiveStats />

      <section className="cta">
        <h2>Şehrinizi Dijitalleştirin.</h2>
        <p>İhtiyacınız olan modülle başlayın, platform değer gösterdikçe büyütün.</p>
        <a className="primary-button" href="mailto:demo@muflow.city">Demo Talep Et</a>
      </section>
    </main>
  );
}
