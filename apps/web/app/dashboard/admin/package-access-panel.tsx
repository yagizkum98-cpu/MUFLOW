"use client";

import { useEffect, useState } from "react";

type PackageFeature = {
  id: string;
  label: string;
  apiKey: string;
  panels: string[];
};

type PackageAccessItem = {
  id: string;
  segment: string;
  name: string;
  target: string;
  purchased: boolean;
  approved: boolean;
  opened: boolean;
  featureApi: Record<string, boolean>;
  features: PackageFeature[];
};

export function PackageAccessPanel() {
  const [packages, setPackages] = useState<PackageAccessItem[]>([]);
  const [message, setMessage] = useState("");
  const [loadingKey, setLoadingKey] = useState("");

  async function loadPackages() {
    const response = await fetch("/api/admin/package-access", { cache: "no-store" });

    if (!response.ok) {
      setMessage("Paket yönetimi yalnızca Süper Admin için açıktır.");
      return;
    }

    const data = await response.json();
    setPackages(data.packages || []);
  }

  useEffect(() => {
    loadPackages();
  }, []);

  async function updatePackage(packageId: string, payload: Record<string, unknown>) {
    setLoadingKey(`${packageId}-${JSON.stringify(payload)}`);
    setMessage("");

    const response = await fetch("/api/admin/package-access", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ packageId, ...payload }),
    });
    const data = await response.json().catch(() => null);
    setLoadingKey("");

    if (!response.ok) {
      setMessage(data?.message || "Paket verisi güncellenemedi.");
      return;
    }

    setPackages((current) => current.map((item) => (item.id === packageId ? data.package : item)));
    setMessage("Paket ve API yetki verisi güncellendi.");
  }

  return (
    <section className="admin-package-management">
      <div className="section-heading">
        <p className="eyebrow">Paket Onay ve Modül Açma</p>
        <h2>Satın alınan paketleri Süper Admin onaylar, özellik API'lerini tek tek açar.</h2>
        <p>
          Her paket satın alındı, onaylandı ve paket açık kutularından geçer. Özellik checkbox'ları ilgili panel API
          yetkisini açar; paneller bu veriye bağlı çalışır.
        </p>
      </div>

      {message ? <p className={message.includes("güncellendi") ? "checkout-success" : "form-error"}>{message}</p> : null}

      <div className="admin-package-grid">
        {packages.map((item) => {
          const packageReady = item.purchased && item.approved && item.opened;

          return (
            <article className={packageReady ? "admin-package-card active" : "admin-package-card"} key={item.id}>
              <div className="package-admin-head">
                <div>
                  <span>{item.segment}</span>
                  <h3>{item.name}</h3>
                  <p>{item.target}</p>
                </div>
                <strong>{packageReady ? "Aktif" : "Kapalı"}</strong>
              </div>

              <div className="package-checks">
                <label>
                  <input
                    checked={item.purchased}
                    type="checkbox"
                    onChange={(event) => updatePackage(item.id, { purchased: event.target.checked })}
                  />
                  Satın alındı
                </label>
                <label>
                  <input
                    checked={item.approved}
                    type="checkbox"
                    onChange={(event) => updatePackage(item.id, { approved: event.target.checked })}
                  />
                  Onaylandı
                </label>
                <label>
                  <input
                    checked={item.opened}
                    type="checkbox"
                    onChange={(event) => updatePackage(item.id, { opened: event.target.checked })}
                  />
                  Paketi aç
                </label>
              </div>

              <div className="feature-api-list">
                {item.features.map((feature) => (
                  <label key={feature.id}>
                    <input
                      checked={Boolean(item.featureApi[feature.id])}
                      type="checkbox"
                      onChange={(event) =>
                        updatePackage(item.id, {
                          featureId: feature.id,
                          featureApiEnabled: event.target.checked,
                        })
                      }
                    />
                    <span>
                      <strong>{feature.label}</strong>
                      <small>{feature.apiKey}</small>
                    </span>
                  </label>
                ))}
              </div>

              {loadingKey.startsWith(item.id) ? <small className="live-status">Kaydediliyor...</small> : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
