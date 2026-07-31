import { redirect } from "next/navigation";
import { getCurrentUser } from "../../../lib/current-user";
import { municipalityPortalModules } from "../../../lib/municipality-portal";

const liveStats = [
  ["Yayındaki haber", "0"],
  ["Aktif duyuru", "0"],
  ["Yaklaşan etkinlik", "0"],
  ["Açık talep", "0"],
];

export default async function MunicipalityDashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/giris?next=/dashboard/belediye");
  }

  return (
    <main className="business-dashboard-page">
      <section className="business-dashboard-hero">
        <div>
          <p className="eyebrow">🏛️ Belediye Portalı</p>
          <h1>Belediyenin günlük içerik ve iletişim süreçlerini tek panelden yönetin.</h1>
          <p>
            MUFLOW Belediye Portalı; haber, duyuru, etkinlik, sayfa, bildirim ve temel raporlama süreçlerini sade bir
            yönetim deneyimiyle bir araya getirir.
          </p>
        </div>
        <form action="/api/auth/logout" method="post">
          <button className="secondary-button" type="submit">Çıkış Yap</button>
        </form>
      </section>

      <section className="business-live-row" aria-label="Belediye canlı verileri">
        {liveStats.map(([label, value]) => (
          <article key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
            <small>Canlı veri</small>
          </article>
        ))}
      </section>

      <section className="business-panel-grid">
        {municipalityPortalModules.map((module) => (
          <article className="business-panel-card" key={module.title}>
            <div className="feature-title">
              <span>{module.icon}</span>
              <h2>{module.title}</h2>
            </div>
            <p>{module.text}</p>
            <ul>
              {module.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
