import { redirect } from "next/navigation";
import { getCurrentUser } from "../../../lib/current-user";
import { aiModules } from "../../../lib/operation-modules";
import { MuAiGate } from "../../mu-ai-gate";
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
        title="OpenAI API destekli şehir asistanı altyapısını yönetin."
        text="İlk faz kapsamı belediye hizmetleri, SSS, şehir rehberi ve etkinlik önerileridir. OPENAI_API_KEY varsa OpenAI API çalışır, yoksa MVP kural tabanlı güvenli yanıt verir."
        stats={[["OpenAI API", "Hazır"], ["Intent", "4"], ["Bilgi kaynağı", "MVP"], ["Mod", "Beta"]]}
        modules={aiModules}
        panelKey="ai"
      />
      <section className="mu-ai-section">
        <MuAiGate />
      </section>
    </>
  );
}
