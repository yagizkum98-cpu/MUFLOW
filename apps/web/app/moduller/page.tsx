const modules = [
  {
    icon: "🏛",
    title: "Belediye Portalı",
    description: "Belediyenin günlük içerik ve iletişim süreçlerini tek panelden yönetin.",
    firstPhase: ["Haber Yönetimi", "Duyuru Yönetimi", "Etkinlik Yönetimi", "Bildirim Gönderme", "Sayfa Yönetimi", "Temel Dashboard"],
    soon: ["Açık Veri", "Katılımcı Bütçe", "Proje Yönetimi"],
  },
  {
    icon: "👤",
    title: "Vatandaş Portalı",
    description: "Vatandaşların belediye hizmetlerine hızlı ve kolay erişmesini sağlayın.",
    firstPhase: ["Profil", "Duyurular", "Etkinlik Takvimi", "Talep / Şikayet", "Şehir Rehberi", "Bildirimler"],
    soon: ["Katılımcı Bütçe", "Anketler", "Proje Takibi"],
  },
  {
    icon: "🏢",
    title: "İşletme Portalı",
    description: "Yerel işletmelerin dijital görünürlüğünü artırın.",
    firstPhase: ["İşletme Profili", "Kampanya Yayınlama", "Etkinlik Oluşturma", "QR Profil Sayfası"],
    soon: ["Rezervasyon", "Dijital Menü", "Analitik", "Kupon Sistemi"],
  },
  {
    icon: "🌍",
    title: "Turizm Portalı",
    description: "Şehrin turizm potansiyelini dijital olarak tanıtın.",
    firstPhase: ["Gezilecek Yerler", "Etkinlikler", "Dijital Rotalar", "Harita"],
    soon: ["Sesli Rehber", "Yerel Deneyimler", "Çoklu Dil"],
  },
  {
    icon: "⚙️",
    title: "Yönetici Portalı",
    description: "Platformun temel yönetim ve yetkilendirme işlemlerini yönetin.",
    firstPhase: ["Kullanıcı Yönetimi", "Rol Bazlı Yetkilendirme", "Sistem Ayarları", "İçerik Yönetimi", "Temel Raporlar"],
    soon: ["CRM", "API Yönetimi", "Gelişmiş Analitik", "Log Yönetimi"],
  },
  {
    icon: "🤖",
    title: "MU AI (Beta)",
    description: "Yapay zekâ destekli şehir asistanı.",
    firstPhase: [
      "Belediye hizmetleri hakkında soru-cevap",
      "Etkinlik önerileri",
      "Şehir rehberi desteği",
      "Sık sorulan sorular",
    ],
    soon: ["Talep oluşturma", "Akıllı yönlendirme", "Sesli asistan", "Çok dilli destek", "Yönetici AI analizi"],
  },
];

export default function ModulesPage() {
  return (
    <main className="modules-page">
      <section className="modules-hero">
        <p className="eyebrow">Modüller</p>
        <h1>İhtiyacınız kadar modül kullanın.</h1>
        <p>
          İlk fazda odak; az menü, hızlı işlem ve belediye ekiplerinin günlük operasyonlarını sadeleştiren temel
          modüllerdir. Her modül bağımsız çalışabilir ve ihtiyaçlara göre genişletilebilir.
        </p>
      </section>

      <section className="module-detail-grid">
        {modules.map((module) => (
          <article className="module-detail-card" key={module.title}>
            <div className="module-detail-head">
              <span>{module.icon}</span>
              <div>
                <h2>{module.title}</h2>
                <p>{module.description}</p>
              </div>
            </div>
            <div className="module-columns">
              <div>
                <h3>İlk Faz Özellikleri</h3>
                <ul>
                  {module.firstPhase.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Yakında</h3>
                <ul className="soon-list">
                  {module.soon.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="module-focus">
        <p className="eyebrow">İlk Fazın Odak Noktası</p>
        <h2>Temel modülleri hızlı ve anlaşılır bir deneyimle kullanıma sunmak.</h2>
        <p>
          İlk sürümde amaç, çok sayıda özelliği aynı anda sunmak değil; belediyelerin günlük operasyonlarını
          kolaylaştıran temel modülleri hızlı ve anlaşılır bir deneyimle kullanıma sunmaktır. Böylece platform kısa
          sürede devreye alınabilir, kullanıcı geri bildirimleriyle geliştirilir ve sonraki sürümlerde yeni modüller
          kademeli olarak eklenebilir. Bu yaklaşım hem teknik geliştirme riskini azaltır hem de ürünün pazara daha hızlı
          ulaşmasını sağlar.
        </p>
      </section>
    </main>
  );
}
