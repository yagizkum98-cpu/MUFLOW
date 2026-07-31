"use client";

import { useEffect, useState } from "react";

type Language = "tr" | "en";

const translations: Record<string, string> = {
  "Giriş Yap": "Login",
  "GiriÅŸ Yap": "Login",
  "Demo Talep Et": "Request Demo",
  "Paketleri İncele": "View Packages",
  "Paketleri Ä°ncele": "View Packages",
  "Gelir Modeli": "Revenue Model",
  "Neden MUFLOW?": "Why MUFLOW?",
  "Canlı Veri": "Live Data",
  "CanlÄ± Veri": "Live Data",
  "Yükleniyor": "Loading",
  "YÃ¼kleniyor": "Loading",
  "Sıfırlandı": "Reset",
  "SÄ±fÄ±rlandÄ±": "Reset",
  "Canlı": "Live",
  "CanlÄ±": "Live",
  "Modül": "Module",
  "ModÃ¼l": "Module",
  "Portal": "Portal",
  "Belediye": "Municipality",
  "Vatandaş": "Citizen",
  "VatandaÅŸ": "Citizen",
  "İşletme": "Business",
  "Ä°ÅŸletme": "Business",
  "Turizm": "Tourism",
  "Yönetici": "Admin",
  "YÃ¶netici": "Admin",
  "Bulut Tabanlı": "Cloud Based",
  "Bulut TabanlÄ±": "Cloud Based",
  "Kurulum gerektirmez.": "No installation required.",
  "Modüler": "Modular",
  "ModÃ¼ler": "Modular",
  "İhtiyacınız kadar kullanın.": "Use only what you need.",
  "Ä°htiyacÄ±nÄ±z kadar kullanÄ±n.": "Use only what you need.",
  "Yapay zekâ destekli.": "AI powered.",
  "Yapay zekÃ¢ destekli.": "AI powered.",
  "Entegre": "Integrated",
  "Mevcut sistemlerle uyumlu.": "Compatible with existing systems.",
  "Şehrinizin Dijital İşletim Sistemi": "Your City's Digital Operating System",
  "Åehrinizin Dijital Ä°ÅŸletim Sistemi": "Your City's Digital Operating System",
  "Az menü, hızlı işlem ve tek merkezden yönetim.": "Fewer menus, faster actions, centralized management.",
  "Az menÃ¼, hÄ±zlÄ± iÅŸlem ve tek merkezden yÃ¶netim.": "Fewer menus, faster actions, centralized management.",
  "Tüm temel modüller tek Platform sekmesinde.": "All core modules in one Platform tab.",
  "TÃ¼m temel modÃ¼ller tek Platform sekmesinde.": "All core modules in one Platform tab.",
  "Belediyenin günlük içerik ve iletişim süreçlerini tek panelden yönetin.": "Manage daily municipal content and communication from one panel.",
  "Belediye hizmetlerine hızlı ve kolay erişin.": "Access municipal services quickly and easily.",
  "Şehrin önemli noktalarını tek dijital rehberde toplayın.": "Collect key city points in one digital guide.",
  "Şehir iletişimini canlı veri akışı gibi yönetin.": "Manage city communication like a live data stream.",
  "Belediye hizmetleri için çalışan şehir asistanı altyapısı.": "A working city assistant infrastructure for municipal services.",
  "Platform performansını canlı veriyle izleyin.": "Monitor platform performance with live data.",
  "Güvenli giriş ve rol bazlı erişim altyapısı.": "Secure login and role-based access infrastructure.",
  "İşletmenizi dijital olarak yönetin.": "Manage your business digitally.",
  "Kurumsal lisans, işletme aboneliği ve modüler büyüme.": "Enterprise licensing, business subscriptions, and modular growth.",
  "İlk Faz (MVP) Özellikleri": "Phase One (MVP) Features",
  "Şehrinizi Dijitalleştirin.": "Digitize Your City.",
  "İhtiyacınız olan modülle başlayın, platform değer gösterdikçe büyütün.": "Start with the module you need, then grow as the platform proves value.",
  "Belediye (B2G)": "Municipality (B2G)",
  "Belediye, platformun lisansını satın alan ana müşteridir.": "The municipality is the primary customer purchasing the platform license.",
  "Kurulum ve uyarlama hizmeti": "Setup and adaptation service",
  "Yıllık SaaS lisansı": "Annual SaaS license",
  "Destek ve bakım sözleşmesi": "Support and maintenance contract",
  "İsteğe bağlı özel geliştirme": "Optional custom development",
  "Eğitim ve danışmanlık": "Training and consulting",
  "Küçük ilçe belediyeleri": "Small district municipalities",
  "İl ve büyük ilçe belediyeleri": "Provincial and large district municipalities",
  "Büyükşehir belediyeleri": "Metropolitan municipalities",
  "Haber, duyuru, etkinlik, vatandaş portalı": "News, announcements, events, citizen portal",
  "İşletme portalı, MU AI, raporlama": "Business portal, MU AI, reporting",
  "Tüm modüller, API, beyaz etiket, SLA": "All modules, API, white label, SLA",
  "İşletme (B2B)": "Business (B2B)",
  "Belediye platformu aldıktan sonra şehirdeki işletmeler sisteme katılır.": "After the municipality adopts the platform, local businesses join the system.",
  "Bu model, belediyeye ek maliyet yüklemeden işletmelerden abonelik geliri oluşturur.": "This model creates subscription revenue from businesses without adding cost to the municipality.",
  "Ücretsiz": "Free",
  "Premium": "Premium",
  "Premium+": "Premium+",
  "İşletme profili": "Business profile",
  "Haritada görünme": "Map visibility",
  "İletişim bilgileri": "Contact information",
  "Kampanya yayınlama": "Campaign publishing",
  "Etkinlik oluşturma": "Event creation",
  "Ön plana çıkma": "Featured placement",
  "QR işletme sayfası": "QR business page",
  "Temel analitik": "Basic analytics",
  "Yapay zekâ destekli içerik önerileri": "AI-powered content suggestions",
  "Gelişmiş istatistikler": "Advanced statistics",
  "API bağlantıları": "API connections",
  "Vatandaş (B2C)": "Citizen (B2C)",
  "Kişiselleştirilmiş şehir bildirimleri": "Personalized city notifications",
  "Dijital şehir kartı avantajları": "Digital city card benefits",
  "Etkinlik hatırlatmaları": "Event reminders",
  "Özel kampanya erişimi": "Exclusive campaign access",
  "Ek Gelir Kanalları": "Additional Revenue Channels",
  "API Lisansı": "API License",
  "White-label": "White Label",
  "Kurumsal Entegrasyon": "Enterprise Integration",
  "Eğitim": "Training",
  "Danışmanlık": "Consulting",
  "Önerilen Gelir Dağılımı": "Recommended Revenue Distribution",
  "Belediye Lisansları": "Municipality Licenses",
  "İşletme Premium": "Business Premium",
  "Destek ve Danışmanlık": "Support and Consulting",
  "API ve Entegrasyon": "API and Integration",
  "Satış Stratejisi": "Sales Strategy",
  "Ürün Ailesi": "Product Family",
  "Belediye yönetimi": "Municipal management",
  "Vatandaş hizmetleri": "Citizen services",
  "İşletme portalı": "Business portal",
  "Turizm ve şehir rehberi": "Tourism and city guide",
  "Yapay zekâ asistanı": "AI assistant",
  "Raporlama ve analiz": "Reporting and analytics",
  "Şehir asistanına sorun": "Ask the city assistant",
  "Bugün etkinlik var mı?": "Are there any events today?",
  "En yakın ücretsiz otopark nerede?": "Where is the nearest free parking?",
  "Talep nasıl oluşturulur?": "How do I create a request?",
  "İşletme profilimi nereden düzenlerim?": "Where can I edit my business profile?",
  "Yanıtlanıyor": "Answering",
  "Sor": "Ask",
  "Etkinlik önerileri": "Event recommendations",
  "Etkinlik Takvimi": "Event Calendar",
};

const originalTextNodes = new WeakMap<Text, string>();

function translateText(text: string, language: Language) {
  if (language === "tr") {
    return text;
  }

  const trimmed = text.trim();

  if (!trimmed) {
    return text;
  }

  if (trimmed.startsWith("Son güncelleme ") || trimmed.startsWith("Son gÃ¼ncelleme ")) {
    return text.replace(/Son güncelleme|Son gÃ¼ncelleme/, "Last update");
  }

  return translations[trimmed] ? text.replace(trimmed, translations[trimmed]) : text;
}

function translateDocument(language: Language) {
  document.documentElement.lang = language;
  document.documentElement.dataset.lang = language;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];

  while (walker.nextNode()) {
    nodes.push(walker.currentNode as Text);
  }

  nodes.forEach((node) => {
    const parent = node.parentElement;

    if (!parent || ["SCRIPT", "STYLE", "TEXTAREA"].includes(parent.tagName)) {
      return;
    }

    const original = originalTextNodes.get(node) || node.nodeValue || "";
    originalTextNodes.set(node, original);
    node.nodeValue = translateText(original, language);
  });

  document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[placeholder]").forEach((input) => {
    const original = input.dataset.originalPlaceholder || input.placeholder;
    input.dataset.originalPlaceholder = original;
    input.placeholder = translateText(original, language);
  });
}

export function LanguageToggle() {
  const [language, setLanguage] = useState<Language>("tr");

  useEffect(() => {
    const saved = window.localStorage.getItem("muflow-language") as Language | null;
    const initial = saved === "en" ? "en" : "tr";
    setLanguage(initial);
    translateDocument(initial);

    const observer = new MutationObserver(() => {
      const current = (window.localStorage.getItem("muflow-language") as Language | null) || initial;
      translateDocument(current === "en" ? "en" : "tr");
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    window.localStorage.setItem("muflow-language", nextLanguage);
    translateDocument(nextLanguage);
  }

  return (
    <div className="language-toggle" aria-label="Dil seçimi">
      <button className={language === "tr" ? "active" : ""} type="button" onClick={() => changeLanguage("tr")}>
        TR
      </button>
      <button className={language === "en" ? "active" : ""} type="button" onClick={() => changeLanguage("en")}>
        EN
      </button>
    </div>
  );
}
