import { redirect } from "next/navigation";
import { businessPortalModules } from "../../../lib/business-portal";
import { getCurrentUser } from "../../../lib/current-user";
import { PanelAccessStatus } from "../panel-access-status";

const liveStats = [
  ["Profil görüntülenme", "0"],
  ["QR görüntülenme", "0"],
  ["Aktif kampanya", "0"],
  ["Yaklaşan etkinlik", "0"],
];

export default async function BusinessDashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/giris?next=/dashboard/isletme");
  }

  return (
    <main className="business-dashboard-page">
      <section className="business-dashboard-hero">
        <div>
          <p className="eyebrow">🏢 İşletme Portalı</p>
          <h1>İşletmenizi dijital olarak yönetin.</h1>
          <p>
            MUFLOW İşletme Portalı; yerel işletmelerin belediye ile iletişim kurmasını, temel bilgilerini yönetmesini ve
            şehir ekosisteminde görünür olmasını sağlayan basit ve kullanışlı bir yönetim panelidir.
          </p>
        </div>
        <form action="/api/auth/logout" method="post">
          <button className="secondary-button" type="submit">Çıkış Yap</button>
        </form>
      </section>

      <section className="business-live-row" aria-label="İşletme canlı verileri">
        {liveStats.map(([label, value]) => (
          <article key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
            <small>Canlı veri</small>
          </article>
        ))}
      </section>

      <PanelAccessStatus panel="business" />

      <section className="business-panel-grid">
        {businessPortalModules.map((module) => (
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
