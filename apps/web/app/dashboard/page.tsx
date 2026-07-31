import { redirect } from "next/navigation";
import { getCurrentUser } from "../../lib/current-user";

const roleLabels = {
  SUPER_ADMIN: "Süper Admin",
  MUNICIPALITY_ADMIN: "Belediye Yöneticisi",
  MUNICIPALITY_STAFF: "Belediye Personeli",
  BUSINESS_OWNER: "İşletme Yetkilisi",
  CITIZEN: "Vatandaş",
};

const accessItems = [
  ["Güvenli giriş", "HTTP-only çerez ile saklanan JWT oturumu."],
  ["JWT/OAuth hazır", "MVP JWT ile çalışır; OAuth sağlayıcıları aynı oturum katmanına bağlanabilir."],
  ["Rol bazlı yetkilendirme", "Süper Admin, Belediye, Personel, İşletme ve Vatandaş rolleri ayrıştırıldı."],
  ["HTTPS desteği", "Production ortamında HTTP istekleri middleware ile HTTPS'e yönlendirilir."],
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
          <p className="eyebrow">🔐 Güvenlik</p>
          <h1>Güvenli operasyon paneli hazır.</h1>
          <p>
            {user.name} hesabı {roleLabels[user.role]} rolü ile oturum açtı. Bu alan JWT doğrulaması ve rol bazlı
            yetkilendirme ile korunur.
          </p>
        </div>
        <form action="/api/auth/logout" method="post">
          <button className="secondary-button" type="submit">Çıkış Yap</button>
        </form>
      </section>

      <section className="security-grid">
        {accessItems.map(([title, text]) => (
          <article className="security-card" key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
