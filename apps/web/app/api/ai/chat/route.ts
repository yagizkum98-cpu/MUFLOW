import { NextResponse } from "next/server";
import { answerMuAiQuestion } from "../../../../lib/mu-ai";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const question = String(body?.question || "").trim();

  if (question.length < 3) {
    return NextResponse.json({ message: "Soru en az 3 karakter olmalı." }, { status: 400 });
  }

  return NextResponse.json({
    question,
    ...answerMuAiQuestion(question),
    mode: process.env.OPENAI_API_KEY ? "openai-ready" : "rule-based-beta",
  });
}
