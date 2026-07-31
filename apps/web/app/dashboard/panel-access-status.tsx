"use client";

import { useEffect, useState } from "react";

type PanelAccessPackage = {
  id: string;
  segment: string;
  name: string;
  packageActive: boolean;
  purchased: boolean;
  approved: boolean;
  opened: boolean;
  features: Array<{
    id: string;
    label: string;
    apiKey: string;
    active: boolean;
  }>;
};

type PanelAccessResponse = {
  packages: PanelAccessPackage[];
  activeFeatureCount: number;
  lockedFeatureCount: number;
};

export function PanelAccessStatus({ panel }: { panel: string }) {
  const [data, setData] = useState<PanelAccessResponse | null>(null);

  useEffect(() => {
    let active = true;

    async function loadAccess() {
      const response = await fetch(`/api/panel/access?panel=${panel}`, { cache: "no-store" });

      if (!response.ok) {
        return;
      }

      const result = await response.json();

      if (active) {
        setData(result);
      }
    }

    loadAccess();
    const timer = window.setInterval(loadAccess, 15000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [panel]);

  if (!data) {
    return null;
  }

  return (
    <section className="panel-access-status">
      <div className="panel-access-head">
        <div>
          <p className="eyebrow">Süper Admin Paket Yetkisi</p>
          <h2>Bu panel merkezi paket verisine bağlıdır.</h2>
        </div>
        <div className="panel-access-counts">
          <span>{data.activeFeatureCount} aktif</span>
          <span>{data.lockedFeatureCount} kilitli</span>
        </div>
      </div>

      <div className="panel-access-grid">
        {data.packages.map((item) => (
          <article className={item.packageActive ? "access-package active" : "access-package"} key={item.id}>
            <div>
              <strong>{item.segment} / {item.name}</strong>
              <small>{item.packageActive ? "Paket açık" : "Satın alma/onay/açma bekliyor"}</small>
            </div>
            <ul>
              {item.features.map((feature) => (
                <li className={feature.active ? "active" : ""} key={feature.id}>
                  <span>{feature.label}</span>
                  <small>{feature.active ? "API aktif" : "API kapalı"}</small>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
