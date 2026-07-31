import { NextResponse } from "next/server";
import { answerMuAiWithOpenAi, muAiFirstPhase } from "../../../../lib/mu-ai";

export async function POST(request: Request) {
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
