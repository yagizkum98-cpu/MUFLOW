"use client";

import { useEffect, useMemo, useState } from "react";

const notificationCenter = [
  {
    type: "Belediye duyuruları",
    title: "Su kesintisi bilgilendirmesi",
    text: "Planlı bakım duyurusu vatandaş ve işletme panellerinde yayında.",
    status: "Canlı",
    time: "Şimdi",
    channel: "Portal + Mobil",
  },
  {
    type: "Etkinlik bildirimleri",
    title: "Kent Meydanı etkinlik hatırlatması",
    text: "Yaklaşan etkinlik için ilgili kullanıcılara hatırlatma planlandı.",
    status: "Planlandı",
    time: "18:00",
    channel: "Mobil",
  },
  {
    type: "Acil durum bilgilendirmeleri",
    title: "Kuvvetli yağış uyarısı",
    text: "Riskli bölgeler için öncelikli bildirim akışı hazırlandı.",
    status: "Öncelikli",
    time: "5 dk önce",
    channel: "SMS + Mobil",
  },
];

type AccessResponse = {
  packages: Array<{
    purchased: boolean;
    features: Array<{
      id: string;
      active: boolean;
    }>;
  }>;
};

export function NotificationGate() {
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

      const response = await fetch("/api/panel/access?panel=notifications", { cache: "no-store" });

      if (response.ok && mounted) {
        setAccess(await response.json());
      }
    }

    loadAccess();

    return () => {
      mounted = false;
    };
  }, []);

  const notificationsActive = useMemo(() => {
    return Boolean(
      access?.packages.some((item) =>
        item.features.some((feature) =>
          (feature.id === "notification-center" || feature.id === "announcements") && feature.active,
        ),
      ),
    );
  }, [access]);

  if (!authenticated || !notificationsActive) {
    const purchased = Boolean(access?.packages.some((item) => item.purchased));

    return (
      <section className="notification-section locked-section">
        <div className="mu-ai-locked-card">
          <div className="locked-badge">Paketli Özellik</div>
          <div>
            <p className="eyebrow">🔔 Bildirim Merkezi</p>
            <h3>Canlı bildirim akışı paket aktif edildikten sonra görünür.</h3>
            <p>
              Belediye duyuruları, etkinlik bildirimleri, acil durum bilgilendirmeleri ve sistem bildirimleri satın alma,
              Süper Admin onayı ve feature API tiki sonrası açılır.
            </p>
          </div>
          <div className="locked-feature-grid">
            {["Belediye duyuruları", "Etkinlik bildirimleri", "Acil durum bilgilendirmeleri", "Sistem bildirimleri"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="locked-actions">
            <strong>{!authenticated ? "Giriş gerekli" : purchased ? "Süper Admin onayı bekliyor" : "Paket gerekli"}</strong>
            <a className="primary-button" href="#paketler">Paketi Seç</a>
            <a className="secondary-button" href="/giris?next=/dashboard/bildirimler">Giriş Yap</a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="notification-section">
      <div className="notification-copy">
        <p className="eyebrow">🔔 Bildirim Merkezi</p>
        <h2>Şehir iletişimini canlı veri akışı gibi yönetin.</h2>
        <p>
          Belediye duyuruları, etkinlik bildirimleri, acil durum bilgilendirmeleri ve sistem bildirimleri tek merkezde
          takip edilir; ilgili kanallara hızlıca iletilir.
        </p>
      </div>
      <div className="notification-feed" aria-label="Canlı bildirim veri akışı">
        {notificationCenter.map((item) => (
          <article className="notification-card" key={item.type}>
            <div>
              <span className="notification-type">{item.type}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
            <div className="notification-meta">
              <span>{item.status}</span>
              <span>{item.time}</span>
              <span>{item.channel}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
