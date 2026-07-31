import { redirect } from "next/navigation";
import { getCurrentUser } from "../../../lib/current-user";
import { permissionMatrix, superAdminModules, superAdminPortals, superAdminStats } from "../../../lib/super-admin";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/giris?next=/dashboard/admin");
  }

  if (user.role !== "SUPER_ADMIN") {
    redirect("/dashboard");
  }

  return (
    <main className="business-dashboard-page">
      <section className="business-dashboard-hero">
        <div>
          <p className="eyebrow">⚙️ Süper Admin Paneli</p>
          <h1>Tüm yetkiler şimdilik Süper Admin rolünde.</h1>
          <p>
            MUFLOW Süper Admin Paneli; tüm portal geçişleri, kullanıcı/rol yönetimi, sistem ayarları, API durumu ve
            canlı operasyon modüllerini tek merkezde toplar.
          </p>
        </div>
        <form action="/api/auth/logout" method="post">
          <button className="secondary-button" type="submit">Çıkış Yap</button>
        </form>
      </section>

      <section className="business-live-row" aria-label="Süper admin canlı verileri">
        {superAdminStats.map(([label, value]) => (
          <article key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
            <small>Aktif</small>
          </article>
        ))}
      </section>

      <section className="admin-access-grid">
        {superAdminPortals.map(([title, text, href]) => (
          <a className="admin-access-card" href={href} key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
            <strong>Panele Git</strong>
          </a>
        ))}
      </section>

      <section className="admin-matrix">
        <div className="section-heading">
          <p className="eyebrow">Yetki Matrisi</p>
          <h2>Super Admin tüm modülleri yönetir.</h2>
        </div>
        <div className="permission-table">
          {permissionMatrix.map(([role, scope, level]) => (
            <article key={role}>
              <strong>{role}</strong>
              <span>{scope}</span>
              <small>{level}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="business-panel-grid">
        {superAdminModules.map((module) => (
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
