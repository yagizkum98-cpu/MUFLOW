import { redirect } from "next/navigation";
import { analyticsModules } from "../../../lib/operation-modules";
import { getCurrentUser } from "../../../lib/current-user";
import { PanelSection } from "../panel-section";

export default async function AnalyticsDashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/giris?next=/dashboard/analitik");
  }

  return (
    <PanelSection
      eyebrow="📈 Analitik"
      title="Platform performansını canlı veriyle izleyin."
      text="Kullanıcı sayıları, sayfa görüntülemeleri, etkinlik katılımı ve işletme görünürlüğü temel raporlama panelinde izlenir."
      stats={[["Kullanıcı", "0"], ["Sayfa görüntüleme", "0"], ["Etkinlik katılımı", "0"], ["İşletme görüntülenme", "0"]]}
      modules={analyticsModules}
      panelKey="analytics"
    />
  );
}
