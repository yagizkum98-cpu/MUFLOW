import { redirect } from "next/navigation";
import { UserRole } from "../../lib/auth";
import { getCurrentUser } from "../../lib/current-user";

const roleLabels: Record<UserRole, string> = {
  SUPER_ADMIN: "Süper Admin",
  MUNICIPALITY_ADMIN: "Belediye Yöneticisi",
  MUNICIPALITY_STAFF: "Belediye Personeli",
  BUSINESS_OWNER: "İşletme Yetkilisi",
  CITIZEN: "Vatandaş",
};

const portalLinks: Array<[string, string, string, UserRole[]]> = [
  ["🏛️ Belediye Paneli", "Haber, duyuru, etkinlik, sayfa, bildirim ve temel raporlar.", "/dashboard/belediye", ["SUPER_ADMIN", "MUNICIPALITY_ADMIN", "MUNICIPALITY_STAFF"]],
  ["🏢 İşletme Paneli", "Profil, kampanya, etkinlik, QR sayfası, bildirim ve istatistikler.", "/dashboard/isletme", ["SUPER_ADMIN", "BUSINESS_OWNER"]],
  ["👥 Vatandaş Paneli", "Profil, talep, duyuru, etkinlik, şehir rehberi ve bildirimler.", "/dashboard/vatandas", ["SUPER_ADMIN", "CITIZEN"]],
  ["🗺️ Şehir Rehberi", "Gezilecek yerler, parklar, plajlar, müzeler, sağlık noktaları ve otopark.", "/dashboard/rehber", ["SUPER_ADMIN", "MUNICIPALITY_ADMIN", "MUNICIPALITY_STAFF"]],
  ["🔔 Bildirim Merkezi", "Belediye duyuruları, etkinlik, acil durum ve sistem bildirimleri.", "/dashboard/bildirimler", ["SUPER_ADMIN", "MUNICIPALITY_ADMIN", "MUNICIPALITY_STAFF"]],
  ["📈 Analitik", "Kullanıcı, sayfa, etkinlik ve işletme görünürlüğü metrikleri.", "/dashboard/analitik", ["SUPER_ADMIN", "MUNICIPALITY_ADMIN", "MUNICIPALITY_STAFF", "BUSINESS_OWNER"]],
  ["🤖 MU AI", "Soru-cevap, etkinlik önerisi, şehir rehberi desteği ve SSS.", "/dashboard/ai", ["SUPER_ADMIN", "MUNICIPALITY_ADMIN", "MUNICIPALITY_STAFF", "BUSINESS_OWNER", "CITIZEN"]],
  ["⚙️ Yönetici", "Kullanıcı, rol, sistem ayarı ve API yönetimi.", "/dashboard/admin", ["SUPER_ADMIN"]],
];

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/giris?next=/dashboard");
  }

  const allowedLinks = portalLinks.filter(([, , , roles]) => roles.includes(user.role));

  return (
    <main className="secure-dashboard">
      <section className="secure-hero">
        <div>
          <p className="eyebrow">🔐 Operasyon Merkezi</p>
          <h1>Rolünüze özel panel erişimi hazır.</h1>
          <p>
            {user.name} hesabı {roleLabels[user.role]} rolü ile oturum açtı. Bu alan JWT doğrulaması, rol bazlı
            yetkilendirme ve Süper Admin tarafından tanımlanan e-posta/şifre altyapısı ile çalışır.
          </p>
        </div>
        <form action="/api/auth/logout" method="post">
          <button className="secondary-button" type="submit">Çıkış Yap</button>
        </form>
      </section>

      <section className="security-grid">
        {allowedLinks.map(([title, text, href]) => (
          <a className="security-card" href={href} key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </a>
        ))}
      </section>
    </main>
  );
}
