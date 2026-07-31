export const municipalityRevenue = {
  title: "Belediye (B2G)",
  text: "Belediye, platformun lisansını satın alan ana müşteridir.",
  streams: [
    "Kurulum ve uyarlama hizmeti",
    "Yıllık SaaS lisansı",
    "Destek ve bakım sözleşmesi",
    "İsteğe bağlı özel geliştirme",
    "Eğitim ve danışmanlık",
  ],
  packages: [
    { name: "Starter", target: "Küçük ilçe belediyeleri", content: "Haber, duyuru, etkinlik, vatandaş portalı" },
    {
      name: "Professional",
      target: "İl ve büyük ilçe belediyeleri",
      content: "İşletme portalı, MU AI, raporlama",
      featured: true,
    },
    { name: "Enterprise", target: "Büyükşehir belediyeleri", content: "Tüm modüller, API, beyaz etiket, SLA" },
  ],
};

export const businessRevenue = {
  title: "İşletme (B2B)",
  text: "Belediye platformu aldıktan sonra şehirdeki işletmeler sisteme katılır.",
  note: "Bu model, belediyeye ek maliyet yüklemeden işletmelerden abonelik geliri oluşturur.",
  packages: [
    { name: "Ücretsiz", features: ["İşletme profili", "Haritada görünme", "İletişim bilgileri"] },
    {
      name: "Premium",
      features: ["Kampanya yayınlama", "Etkinlik oluşturma", "Ön plana çıkma", "QR işletme sayfası", "Temel analitik"],
      featured: true,
    },
    { name: "Premium+", features: ["Yapay zekâ destekli içerik önerileri", "Gelişmiş istatistikler", "API bağlantıları"] },
  ],
};

export const citizenRevenue = {
  title: "Vatandaş (B2C)",
  text: "Temel belediye hizmetleri ücretsiz kalmalıdır. Ücretlendirme yalnızca isteğe bağlı ek dijital hizmetlerde düşünülmelidir.",
  services: [
    "Kişiselleştirilmiş şehir bildirimleri",
    "Dijital şehir kartı avantajları",
    "Etkinlik hatırlatmaları",
    "Özel kampanya erişimi",
  ],
};

export const extraRevenueChannels = [
  ["API Lisansı", "Harita, etkinlik veya şehir verilerini kullanmak isteyen kurumlara API erişimi."],
  ["White-label", "Platformun farklı şehir markasıyla sunulması."],
  ["Kurumsal Entegrasyon", "Mevcut belediye yazılımlarıyla entegrasyon projeleri."],
  ["Eğitim", "Belediye personeline kullanıcı ve yönetici eğitimleri."],
  ["Danışmanlık", "Dijital dönüşüm ve süreç tasarımı hizmetleri."],
];

export const revenueDistribution = [
  ["Belediye Lisansları", 55],
  ["İşletme Premium", 25],
  ["Destek ve Danışmanlık", 10],
  ["API ve Entegrasyon", 5],
  ["White-label", 5],
] as const;

export const salesSteps = [
  "Belediye ile pilot uygulama: haber, duyuru, etkinlik ve vatandaş portalı",
  "İşletme Portalı'nı aktif etmek",
  "MU AI ve analitik modüllerini eklemek",
  "API ve ileri seviye entegrasyonları sunmak",
];

export const productFamily = [
  ["MUFLOW Core", "Belediye yönetimi"],
  ["MUFLOW Citizen", "Vatandaş hizmetleri"],
  ["MUFLOW Business", "İşletme portalı"],
  ["MUFLOW Tourism", "Turizm ve şehir rehberi"],
  ["MUFLOW AI", "Yapay zekâ asistanı"],
  ["MUFLOW Analytics", "Raporlama ve analiz"],
];

export const revenueModel = {
  municipalityRevenue,
  businessRevenue,
  citizenRevenue,
  extraRevenueChannels,
  revenueDistribution,
  salesSteps,
  productFamily,
};
