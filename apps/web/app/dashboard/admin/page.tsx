import { redirect } from "next/navigation";
import { getCurrentUser } from "../../../lib/current-user";
import { adminModules } from "../../../lib/operation-modules";
import { PanelSection } from "../panel-section";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/giris?next=/dashboard/admin");
  }

  return (
    <PanelSection
      eyebrow="⚙️ Yönetici Portalı"
      title="Platformun temel yönetim ve yetkilendirme işlemlerini yönetin."
      text="Kullanıcı, rol, sistem ayarı, içerik ve temel raporlama işlemleri süper admin panelinde toplanır."
      stats={[["Kullanıcı", "0"], ["Rol", "5"], ["API", "Ready"], ["Cloud", "Native"]]}
      modules={adminModules}
    />
  );
}
