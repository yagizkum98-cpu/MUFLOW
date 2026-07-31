import { redirect } from "next/navigation";
import { getCurrentUser } from "../../../lib/current-user";
import { cityGuideModules } from "../../../lib/operation-modules";
import { PanelSection } from "../panel-section";

export default async function CityGuideDashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/giris?next=/dashboard/rehber");
  }

  return (
    <PanelSection
      eyebrow="🗺️ Şehir Rehberi"
      title="Şehrin önemli noktalarını harita destekli yönetin."
      text="Gezilecek yerler, parklar, plajlar, müzeler, sağlık noktaları ve otopark bilgileri tek rehber panelinde düzenlenir."
      stats={[["Rehber noktası", "0"], ["Kategori", "7"], ["Harita pini", "0"], ["Aktif rota", "0"]]}
      modules={cityGuideModules}
    />
  );
}
