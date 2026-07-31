"use client";

import { useEffect, useState } from "react";

type HeroMetric = {
  id: string;
  value: string;
  label: string;
  status: string;
};

type HeroMetricsResponse = {
  generatedAt: string;
  metrics: HeroMetric[];
};

const initialMetrics: HeroMetric[] = [
  { id: "resolutionRate", value: "0%", label: "Talep çözüm oranı", status: "Sıfırlandı" },
  { id: "activeOperations", value: "0", label: "Aktif işlem", status: "Sıfırlandı" },
  { id: "integrations", value: "0", label: "Entegrasyon", status: "Sıfırlandı" },
];

export function LiveDashboardMockup() {
  const [metrics, setMetrics] = useState(initialMetrics);

  useEffect(() => {
    let active = true;

    async function loadMetrics() {
      const response = await fetch("/api/live/hero", { cache: "no-store" });

      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as HeroMetricsResponse;

      if (active) {
        setMetrics(data.metrics);
      }
    }

    loadMetrics();
    const timer = window.setInterval(loadMetrics, 15000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  const [resolutionRate, activeOperations, integrations] = metrics;

  return (
    <div className="mockup-wrap" aria-label="Canlı dashboard ve telefon mockup">
      <div className="dashboard">
        <div className="dash-top"><span /><span /><span /></div>
        <div className="dash-grid">
          <div className="metric tall">
            <strong>{resolutionRate.value}</strong>
            <small>{resolutionRate.label}</small>
            <em>{resolutionRate.status}</em>
          </div>
          <div className="metric">
            <strong>{activeOperations.value}</strong>
            <small>{activeOperations.label}</small>
            <em>{activeOperations.status}</em>
          </div>
          <div className="metric">
            <strong>{integrations.value}</strong>
            <small>{integrations.label}</small>
            <em>{integrations.status}</em>
          </div>
          <div className="chart"><i /><i /><i /><i /><i /></div>
        </div>
      </div>
      <div className="hero-phone">
        <div className="phone-header">MU AI</div>
        <div className="bubble user">Bugün etkinlik var mı?</div>
        <div className="bubble ai">Bugün 18.00'de Kent Meydanında açık hava konseri var.</div>
      </div>
    </div>
  );
}
