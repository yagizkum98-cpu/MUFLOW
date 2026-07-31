"use client";

import { useEffect, useState } from "react";

type AnalyticsMetric = {
  id: string;
  title: string;
  value: string;
  change: string;
  text: string;
  bars: number[];
  status: string;
};

type AnalyticsResponse = {
  generatedAt: string;
  metrics: AnalyticsMetric[];
};

const initialMetrics: AnalyticsMetric[] = [
  {
    id: "users",
    title: "Kullanıcı sayıları",
    value: "0",
    change: "0%",
    text: "Vatandaş, işletme ve personel kullanıcıları tek özet panelde takip edilir.",
    bars: [8, 8, 8, 8, 8],
    status: "Sıfırlandı",
  },
  {
    id: "pageViews",
    title: "Sayfa görüntülemeleri",
    value: "0",
    change: "0%",
    text: "Portal sayfalarının toplam erişimi ve en çok görüntülenen içerikler izlenir.",
    bars: [8, 8, 8, 8, 8],
    status: "Sıfırlandı",
  },
  {
    id: "eventAttendance",
    title: "Etkinlik katılımı",
    value: "0",
    change: "0%",
    text: "Etkinlik ilgisi, kayıt ve katılım eğilimi temel seviyede raporlanır.",
    bars: [8, 8, 8, 8, 8],
    status: "Sıfırlandı",
  },
  {
    id: "businessViews",
    title: "İşletme görüntülenmeleri",
    value: "0",
    change: "0%",
    text: "İşletme profili ve QR sayfası görünürlüğü canlı özet olarak sunulur.",
    bars: [8, 8, 8, 8, 8],
    status: "Sıfırlandı",
  },
];

export function LiveAnalytics() {
  const [metrics, setMetrics] = useState(initialMetrics);

  useEffect(() => {
    let active = true;

    async function loadMetrics() {
      const response = await fetch("/api/live/analytics", { cache: "no-store" });

      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as AnalyticsResponse;

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

  return (
    <div className="analytics-grid">
      {metrics.map((metric) => (
        <article className="analytics-card" key={metric.id}>
          <div className="analytics-head">
            <span>{metric.title}</span>
            <strong>{metric.change}</strong>
          </div>
          <p className="analytics-value">{metric.value}</p>
          <p>{metric.text}</p>
          <small className="live-status">{metric.status}</small>
          <div className="mini-chart" aria-hidden="true">
            {metric.bars.map((height, index) => (
              <i style={{ height: `${height}%` }} key={`${metric.id}-${index}`} />
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
