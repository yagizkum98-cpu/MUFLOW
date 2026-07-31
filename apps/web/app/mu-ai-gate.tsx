"use client";

import { useEffect, useMemo, useState } from "react";
import { MuAiDemo } from "./mu-ai-demo";

type AccessResponse = {
  activeFeatureCount: number;
  packages: Array<{
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
      active: boolean;
    }>;
  }>;
};

export function MuAiGate() {
  const [access, setAccess] = useState<AccessResponse | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadAccess() {
      const session = await fetch("/api/auth/session", { cache: "no-store" });

      if (!mounted) {
        return;
      }

      setAuthenticated(session.ok);

      if (!session.ok) {
        return;
      }

      const response = await fetch("/api/panel/access?panel=ai", { cache: "no-store" });

      if (response.ok && mounted) {
        setAccess(await response.json());
      }
    }

    loadAccess();

    return () => {
      mounted = false;
    };
  }, []);

  const muAiActive = useMemo(() => {
    return Boolean(
      access?.packages.some((item) =>
        item.features.some((feature) => (feature.id === "mu-ai" || feature.id === "ai-content") && feature.active),
      ),
    );
  }, [access]);

  if (authenticated && muAiActive) {
    return <MuAiDemo />;
  }

  const selectedPackage = access?.packages.find((item) =>
    item.features.some((feature) => feature.id === "mu-ai" || feature.id === "ai-content"),
  );
  const status = !authenticated
    ? "Giriş gerekli"
    : selectedPackage?.purchased
      ? "Süper Admin onayı bekliyor"
      : "Paket gerekli";

  return (
    <div className="mu-ai-locked-card">
      <div className="locked-badge">Premium Özellik</div>
      <div>
        <p className="eyebrow">MU AI Beta</p>
        <h3>Şehir asistanı paket satın alındıktan sonra açılır.</h3>
        <p>
          Belediye hizmetleri, SSS, şehir rehberi ve etkinlik önerileri için canlı API altyapısı hazırdır. Kullanım,
          Professional veya Premium+ paket satın alımı ve Süper Admin feature onayı sonrası aktifleşir.
        </p>
      </div>
      <div className="locked-feature-grid">
        {["Belediye hizmetleri soru-cevap", "Etkinlik önerileri", "Şehir rehberi desteği", "Sık sorulan sorular"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="locked-actions">
        <strong>{status}</strong>
        <a className="primary-button" href="#paketler">Paketi Seç</a>
        <a className="secondary-button" href="/giris?next=/dashboard/ai">Giriş Yap</a>
      </div>
    </div>
  );
}
