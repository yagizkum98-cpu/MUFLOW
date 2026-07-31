"use client";

import { useEffect, useState } from "react";

type LiveMetric = {
  id: string;
  value: string;
  label: string;
  status: string;
};

type LiveStatsResponse = {
  generatedAt: string;
  metrics: LiveMetric[];
};

const initialMetrics: LiveMetric[] = [
  { id: "portal", value: "0", label: "Portal", status: "Sıfırlandı" },
  { id: "module", value: "0", label: "Modül", status: "Sıfırlandı" },
  { id: "api", value: "API", label: "Ready", status: "Canlı" },
  { id: "cloud", value: "Cloud", label: "Native", status: "Canlı" },
];

export function LiveStats() {
  const [metrics, setMetrics] = useState(initialMetrics);
  const [updatedAt, setUpdatedAt] = useState("");

  useEffect(() => {
    let active = true;

    async function loadStats() {
      const response = await fetch("/api/live/stats", { cache: "no-store" });

      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as LiveStatsResponse;

      if (active) {
        setMetrics(data.metrics);
        setUpdatedAt(new Date(data.generatedAt).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }));
      }
    }

    loadStats();
    const timer = window.setInterval(loadStats, 15000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <section className="stats" aria-label="Canlı platform verileri">
      <div className="stats-heading">
        <span>Canlı Veri</span>
        <small>{updatedAt ? `Son güncelleme ${updatedAt}` : "Yükleniyor"}</small>
      </div>
      {metrics.map((metric) => (
        <article key={metric.id}>
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
          <small>{metric.status}</small>
        </article>
      ))}
    </section>
  );
}
