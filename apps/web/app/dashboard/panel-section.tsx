import { PanelAccessStatus } from "./panel-access-status";

type PanelModule = {
  icon: string;
  title: string;
  text: string;
  items: string[];
};

type PanelSectionProps = {
  eyebrow: string;
  title: string;
  text: string;
  stats: string[][];
  modules: PanelModule[];
  panelKey?: string;
};

export function PanelSection({ eyebrow, title, text, stats, modules, panelKey }: PanelSectionProps) {
  return (
    <main className="business-dashboard-page">
      <section className="business-dashboard-hero">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
        <form action="/api/auth/logout" method="post">
          <button className="secondary-button" type="submit">Çıkış Yap</button>
        </form>
      </section>

      <section className="business-live-row" aria-label={`${eyebrow} canlı verileri`}>
        {stats.map(([label, value]) => (
          <article key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
            <small>Canlı veri</small>
          </article>
        ))}
      </section>

      {panelKey ? <PanelAccessStatus panel={panelKey} /> : null}

      <section className="business-panel-grid">
        {modules.map((module) => (
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
