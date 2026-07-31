"use client";

import { FormEvent, useState } from "react";

type AiResponse = {
  title: string;
  answer: string;
  suggestions: string[];
  source: string;
  mode: string;
  model?: string;
};

const quickQuestions = [
  "Bugün etkinlik var mı?",
  "En yakın ücretsiz otopark nerede?",
  "Talep nasıl oluşturulur?",
  "İşletme profilimi nereden düzenlerim?",
];

export function MuAiDemo() {
  const [question, setQuestion] = useState(quickQuestions[0]);
  const [response, setResponse] = useState<AiResponse | null>({
    title: "Etkinlik önerileri",
    answer:
      "Şehir etkinlikleri takvim, konum ve kategori bilgilerine göre özetlenir. MVP altyapısı bugün, bu hafta ve kategori bazlı etkinlik sorularını yanıtlayacak şekilde hazırlandı.",
    suggestions: [
      "Bugün saat 18.00'de Kent Meydanında Çocuk Bilim Atölyesi var.",
      "Bu hafta sonu Sahil Amfi'de açık hava konseri planlanıyor.",
      "Pazar günü şehir rehberi yürüyüş rotası için dijital kayıt açılacak.",
    ],
    source: "Etkinlik Takvimi",
    mode: "rule-based-beta",
  });
  const [loading, setLoading] = useState(false);

  async function askMuAi(nextQuestion = question) {
    setLoading(true);
    const result = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: nextQuestion }),
    });
    const data = await result.json();
    setLoading(false);

    if (result.ok) {
      setResponse(data);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    askMuAi();
  }

  function chooseQuestion(nextQuestion: string) {
    setQuestion(nextQuestion);
    askMuAi(nextQuestion);
  }

  return (
    <div className="mu-ai-console">
      <div className="mu-ai-phone">
        <div className="phone-header">MU AI Beta</div>
        <div className="bubble user">{question}</div>
        {response ? (
          <div className="bubble ai">
            <strong>{response.title}</strong>
            <span>{response.answer}</span>
          </div>
        ) : null}
      </div>

      <div className="mu-ai-panel">
        <form onSubmit={onSubmit}>
          <label htmlFor="mu-ai-question">Şehir asistanına sorun</label>
          <div>
            <input
              id="mu-ai-question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Bugün etkinlik var mı?"
            />
            <button className="primary-button" disabled={loading} type="submit">
              {loading ? "Yanıtlanıyor" : "Sor"}
            </button>
          </div>
        </form>

        <div className="quick-question-grid">
          {quickQuestions.map((item) => (
            <button key={item} type="button" onClick={() => chooseQuestion(item)}>
              {item}
            </button>
          ))}
        </div>

        {response ? (
          <div className="ai-result-card">
            <div className="analytics-head">
              <span>{response.source}</span>
              <strong>{response.mode === "openai" ? "OpenAI API" : "Beta"}</strong>
            </div>
            <small className="live-status">
              İlk faz: Belediye hizmetleri, SSS, Şehir rehberi, Etkinlik önerileri
              {response.model ? ` / ${response.model}` : ""}
            </small>
            <h3>{response.title}</h3>
            <p>{response.answer}</p>
            <ul>
              {response.suggestions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
