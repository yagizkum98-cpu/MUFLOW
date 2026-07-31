export type MuAiIntent = "municipality_services" | "event_recommendations" | "city_guide" | "faq";

export type MuAiAnswer = {
  intent: MuAiIntent;
  title: string;
  answer: string;
  suggestions: string[];
  source: string;
};

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

  if (/(nasıl|nereden|şifre|hesap|başvuru|sık sorulan|yardım|işletme profili)/u.test(text)) {
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
