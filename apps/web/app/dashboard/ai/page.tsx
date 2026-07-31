import { redirect } from "next/navigation";
import { getCurrentUser } from "../../../lib/current-user";
import { aiModules } from "../../../lib/operation-modules";
import { MuAiDemo } from "../../mu-ai-demo";
import { PanelSection } from "../panel-section";

export default async function AiDashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/giris?next=/dashboard/ai");
  }

  return (
    <>
      <PanelSection
        eyebrow="🤖 MU AI"
        title="Şehir asistanı altyapısını yönetin."
        text="Belediye hizmetleri soru-cevap, etkinlik önerileri, şehir rehberi desteği ve sık sorulan sorular canlı AI endpointine bağlıdır."
        stats={[["AI endpoint", "Aktif"], ["Intent", "4"], ["Bilgi kaynağı", "MVP"], ["Mod", "Beta"]]}
        modules={aiModules}
        panelKey="ai"
      />
      <section className="mu-ai-section">
        <MuAiDemo />
      </section>
    </>
  );
}
