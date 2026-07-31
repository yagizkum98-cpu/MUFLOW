import { redirect } from "next/navigation";
import { getCurrentUser } from "../../../lib/current-user";
import { notificationModules } from "../../../lib/operation-modules";
import { PanelSection } from "../panel-section";

export default async function NotificationsDashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/giris?next=/dashboard/bildirimler");
  }

  return (
    <PanelSection
      eyebrow="🔔 Bildirim Merkezi"
      title="Şehir iletişimini canlı veri akışı gibi yönetin."
      text="Belediye duyuruları, etkinlik bildirimleri, acil durum bilgilendirmeleri ve sistem bildirimleri tek merkezden yönetilir."
      stats={[["Canlı bildirim", "0"], ["Planlı gönderim", "0"], ["Acil uyarı", "0"], ["Sistem mesajı", "0"]]}
      modules={notificationModules}
      panelKey="notifications"
    />
  );
}
