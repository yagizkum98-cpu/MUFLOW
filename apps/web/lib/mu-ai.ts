export type MuAiIntent = "municipality_services" | "event_recommendations" | "city_guide" | "faq";

export type MuAiAnswer = {
  intent: MuAiIntent;
  title: string;
  answer: string;
  suggestions: string[];
  source: string;
  model?: string;
};

export const muAiFirstPhase = [
  {
    intent: "municipality_services",
    title: "Belediye hizmetleri",
    source: "Belediye Portalı",
    scope: "Talep, şikayet, duyuru, başvuru ve belediye hizmet yönlendirmeleri.",
  },
  {
    intent: "faq",
    title: "SSS",
    source: "Sık Sorulan Sorular",
    scope: "Hesap, başvuru, işletme profili ve sık tekrar eden kullanım soruları.",
  },
  {
    intent: "city_guide",
    title: "Şehir rehberi",
    source: "Şehir Rehberi",
    scope: "Gezilecek yerler, parklar, plajlar, müzeler, sağlık noktaları, otopark ve rota desteği.",
  },
  {
    intent: "event_recommendations",
    title: "Etkinlik önerileri",
    source: "Etkinlik Takvimi",
    scope: "Bugün, bu hafta ve kategori bazlı etkinlik önerileri.",
  },
] as const;

const eventSuggestions = [
  "Bugün saat 18.00'de Kent Meydanında Çocuk Bilim Atölyesi var.",
  "Bu hafta sonu Sahil Amfi'de açık hava konseri planlanıyor.",
  "Pazar günü şehir rehberi yürüyüş rotası için dijital kayıt açılacak.",
];

const cityGuideSuggestions = [
  "En yakın ücretsiz otopark için Şehir Rehberi > Otopark Bilgileri alanına bakabilirsiniz.",
  "Gezilecek yerler, parklar, plajlar, müzeler ve sağlık noktaları harita üzerinde filtrelenebilir.",
  "Konuma göre rota desteği MVP'de temel harita görünümüyle sunulur.",
];

const faqSuggestions = [
  "Talep ve şikayetler Vatandaş Portalı üzerinden oluşturulur.",
  "İşletme profili İşletme Portalı'ndan güncellenir.",
  "Belediye duyuruları Bildirim Merkezi üzerinden yayınlanır.",
];

function normalizeQuestion(question: string) {
  return question
    .toLocaleLowerCase("tr")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function detectIntent(question: string): MuAiIntent {
  const text = normalizeQuestion(question);

  if (/(etkinlik|konser|takvim|bugün|hafta sonu|program)/u.test(text)) {
    return "event_recommendations";
  }

  if (/(rehber|otopark|park|plaj|müze|gezilecek|harita|sağlık|rota)/u.test(text)) {
    return "city_guide";
  }

  if (/(nasıl|nasil|nereden|şifre|sifre|hesap|başvuru|basvuru|sık sorulan|sik sorulan|yardım|yardim|işletme profili|isletme profili)/u.test(text)) {
    return "faq";
  }

  return "municipality_services";
}

export function answerMuAiQuestion(question: string): MuAiAnswer {
  const intent = detectIntent(question);

  if (intent === "event_recommendations") {
    return {
      intent,
      title: "Etkinlik önerileri",
      answer:
        "Şehir etkinlikleri takvim, konum ve kategori bilgilerine göre özetlenir. MVP altyapısı bugün, bu hafta ve kategori bazlı etkinlik sorularını yanıtlayacak şekilde hazırlandı.",
      suggestions: eventSuggestions,
      source: "Etkinlik Takvimi",
    };
  }

  if (intent === "city_guide") {
    return {
      intent,
      title: "Şehir rehberi desteği",
      answer:
        "Şehir rehberi verileri gezilecek yerler, parklar, plajlar, müzeler, sağlık noktaları ve otopark bilgileri üzerinden eşleştirilir.",
      suggestions: cityGuideSuggestions,
      source: "Şehir Rehberi",
    };
  }

  if (intent === "faq") {
    return {
      intent,
      title: "Sık sorulan sorular",
      answer:
        "MU AI, sık sorulan belediye, vatandaş ve işletme işlemlerini kısa yanıtlarla yönlendirir. Yanıtlar platform modüllerindeki kayıtlı bilgi alanlarından üretilir.",
      suggestions: faqSuggestions,
      source: "Sık Sorulan Sorular",
    };
  }

  return {
    intent,
    title: "Belediye hizmetleri hakkında soru-cevap",
    answer:
      "Belediye hizmetleriyle ilgili sorular; duyurular, talepler, etkinlikler, bildirimler ve şehir rehberi alanlarına yönlendirilerek yanıtlanır.",
    suggestions: [
      "Talep veya şikayet oluşturmak için Vatandaş Portalı kullanılabilir.",
      "Güncel duyurular Bildirim Merkezi üzerinden takip edilir.",
      "Belediye hizmetleri rol bazlı panelden yönetilir.",
    ],
    source: "Belediye Portalı",
  };
}

export async function answerMuAiWithOpenAi(question: string): Promise<MuAiAnswer & { mode: string }> {
  const fallback = answerMuAiQuestion(question);
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

  if (!apiKey) {
    return { ...fallback, mode: "rule-based-beta" };
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        input: [
          {
            role: "system",
            content:
              "Sen MUFLOW belediye şehir asistanısın. İlk faz kapsamı yalnızca belediye hizmetleri, SSS, şehir rehberi ve etkinlik önerileridir. Kamu hizmetlerini ücretli gösterme. Kısa, net ve Türkçe yanıt ver. Bilgi yoksa ilgili panele yönlendir.",
          },
          {
            role: "user",
            content: `Soru: ${question}\nAlgılanan intent: ${fallback.intent}\nMVP kaynak: ${fallback.source}`,
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "muflow_ai_answer",
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                answer: { type: "string" },
                suggestions: {
                  type: "array",
                  items: { type: "string" },
                  minItems: 2,
                  maxItems: 4,
                },
              },
              required: ["answer", "suggestions"],
            },
          },
        },
      }),
    });

    if (!response.ok) {
      return { ...fallback, mode: "openai-fallback", model };
    }

    const data = await response.json();
    const outputText = data.output_text || data.output?.[0]?.content?.[0]?.text;
    const parsed = outputText ? JSON.parse(outputText) : null;

    return {
      ...fallback,
      answer: String(parsed?.answer || fallback.answer),
      suggestions: Array.isArray(parsed?.suggestions) ? parsed.suggestions.slice(0, 4) : fallback.suggestions,
      mode: "openai",
      model,
    };
  } catch {
    return { ...fallback, mode: "openai-fallback", model };
  }
}
