import { redirect } from "next/navigation";
import { getCurrentUser } from "../../../lib/current-user";
import { citizenPortalModules } from "../../../lib/operation-modules";
import { PanelSection } from "../panel-section";

export default async function CitizenDashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/giris?next=/dashboard/vatandas");
  }

  return (
    <PanelSection
      eyebrow="👥 Vatandaş Portalı"
      title="Belediye hizmetlerine hızlı ve kolay erişin."
      text="Profil, talep, duyuru, etkinlik, şehir rehberi ve bildirim işlemleri vatandaş panelinde tek noktadan yönetilir."
      stats={[["Açık talep", "0"], ["Duyuru", "0"], ["Yaklaşan etkinlik", "0"], ["Bildirim", "0"]]}
      modules={citizenPortalModules}
      panelKey="citizen"
    />
  );
}
