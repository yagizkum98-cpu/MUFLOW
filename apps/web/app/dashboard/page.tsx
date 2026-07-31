import { redirect } from "next/navigation";
import { getCurrentUser } from "../../lib/current-user";

const roleLabels = {
  SUPER_ADMIN: "Süper Admin",
  MUNICIPALITY_ADMIN: "Belediye Yöneticisi",
  MUNICIPALITY_STAFF: "Belediye Personeli",
  BUSINESS_OWNER: "İşletme Yetkilisi",
  CITIZEN: "Vatandaş",
};

const portalLinks = [
  ["🏛️ Belediye Paneli", "Haber, duyuru, etkinlik, sayfa, bildirim ve temel raporlar.", "/dashboard/belediye"],
  ["🏢 İşletme Paneli", "Profil, kampanya, etkinlik, QR sayfası, bildirim ve istatistikler.", "/dashboard/isletme"],
  ["👥 Vatandaş Paneli", "Profil, talep, duyuru, etkinlik, şehir rehberi ve bildirimler.", "/dashboard/vatandas"],
  ["🗺️ Şehir Rehberi", "Gezilecek yerler, parklar, plajlar, müzeler, sağlık noktaları ve otopark.", "/dashboard/rehber"],
  ["🔔 Bildirim Merkezi", "Belediye duyuruları, etkinlik, acil durum ve sistem bildirimleri.", "/dashboard/bildirimler"],
  ["📈 Analitik", "Kullanıcı, sayfa, etkinlik ve işletme görünürlüğü metrikleri.", "/dashboard/analitik"],
  ["🤖 MU AI", "Soru-cevap, etkinlik önerisi, şehir rehberi desteği ve SSS.", "/dashboard/ai"],
  ["⚙️ Yönetici", "Kullanıcı, rol, sistem ayarı ve API yönetimi.", "/dashboard/admin"],
];

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/giris?next=/dashboard");
  }

  return (
    <main className="secure-dashboard">
      <section className="secure-hero">
        <div>
          <p className="eyebrow">🔐 Operasyon Merkezi</p>
          <h1>Modüller gerçek panel rotalarına bağlı.</h1>
          <p>
            {user.name} hesabı {roleLabels[user.role]} rolü ile oturum açtı. Bu alan JWT doğrulaması, rol bazlı
            yetkilendirme ve korumalı dashboard altyapısı ile çalışır.
          </p>
        </div>
        <form action="/api/auth/logout" method="post">
          <button className="secondary-button" type="submit">Çıkış Yap</button>
        </form>
      </section>

      <section className="security-grid">
        {portalLinks.map(([title, text, href]) => (
          <a className="security-card" href={href} key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </a>
        ))}
      </section>
    </main>
  );
}
