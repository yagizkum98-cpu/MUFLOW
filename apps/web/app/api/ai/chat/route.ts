import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../../lib/current-user";
import { answerMuAiWithOpenAi, muAiFirstPhase } from "../../../../lib/mu-ai";
import { hasActivePanelFeature } from "../../../../lib/package-control";

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "MU AI kullanımı için önce giriş yapmalısınız." }, { status: 401 });
  }

  if (user.role !== "SUPER_ADMIN" && !hasActivePanelFeature("ai", "mu-ai") && !hasActivePanelFeature("ai", "ai-content")) {
    return NextResponse.json(
      { message: "MU AI, satın alınmış ve Süper Admin tarafından açılmış paketlerde kullanılabilir." },
      { status: 403 },
    );
  }

  const body = await request.json().catch(() => null);
  const question = String(body?.question || "").trim();

  if (question.length < 3) {
    return NextResponse.json({ message: "Soru en az 3 karakter olmalı." }, { status: 400 });
  }

  const answer = await answerMuAiWithOpenAi(question);

  return NextResponse.json(
    {
      question,
      firstPhase: muAiFirstPhase,
      ...answer,
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
