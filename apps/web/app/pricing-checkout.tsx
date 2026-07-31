"use client";

import { useMemo, useState } from "react";

type MunicipalityPlan = {
  name: string;
  target: string;
  content: string;
  featured?: boolean;
};

type BusinessPlan = {
  name: string;
  features: string[];
  featured?: boolean;
};

type CartItem = {
  id: string;
  segment: "Belediye" | "İşletme";
  name: string;
  summary: string;
  features: string[];
};

type CheckoutStep = "cart" | "kvkk" | "payment" | "done";
type PaymentMethod = "card" | "iban";

const packagePrices: Record<string, string> = {
  "municipality-starter": "Teklif ile",
  "municipality-professional": "Teklif ile",
  "municipality-enterprise": "Özel teklif",
  "business-ücretsiz": "0 TL",
  "business-premium": "Aylık teklif",
  "business-premium+": "Aylık teklif",
};

function normalizeId(value: string) {
  return value.toLocaleLowerCase("tr-TR").replace(/\s+/g, "-");
}

export function PricingCheckout({
  municipalityPackages,
  businessPackages,
}: {
  municipalityPackages: MunicipalityPlan[];
  businessPackages: BusinessPlan[];
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [kvkkApproved, setKvkkApproved] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const cartFeatureCount = useMemo(() => cart.reduce((total, item) => total + item.features.length, 0), [cart]);

  function addItem(item: CartItem) {
    setMessage("");
    setStep("cart");
    setCart((current) => (current.some((cartItem) => cartItem.id === item.id) ? current : [...current, item]));
  }

  function removeItem(id: string) {
    setMessage("");
    setCart((current) => current.filter((item) => item.id !== id));
  }

  async function confirmCart() {
    setMessage("");

    if (cart.length === 0) {
      setMessage("Önce en az bir paket seçmelisiniz.");
      return;
    }

    const session = await fetch("/api/auth/session", { cache: "no-store" });

    if (!session.ok) {
      const next = encodeURIComponent("/platform#paketler");
      setMessage("Paket satın almak için önce sisteme kayıt olup giriş yapmanız gerekir.");
      window.location.href = `/giris?next=${next}`;
      return;
    }

    setStep("kvkk");
  }

  function approveKvkk() {
    if (!kvkkApproved) {
      setMessage("Ödeme ekranına geçmek için KVKK ve gizlilik metnini onaylamalısınız.");
      return;
    }

    setMessage("");
    setStep("payment");
  }

  async function purchase() {
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/checkout/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart,
        kvkkApproved,
        paymentMethod,
      }),
    });
    const result = await response.json().catch(() => null);
    setLoading(false);

    if (!response.ok) {
      setMessage(result?.message || "Satın alma işlemi başlatılamadı.");
      if (response.status === 401) {
        window.location.href = `/giris?next=${encodeURIComponent("/platform#paketler")}`;
      }
      return;
    }

    setStep("done");
    setMessage(result?.message || "Satın alma talebiniz alındı.");
  }

  return (
    <div className="checkout-layout">
      <div className="package-table">
        {municipalityPackages.map((plan) => {
          const id = `municipality-${normalizeId(plan.name)}`;
          return (
            <article className={`revenue-card ${plan.featured ? "featured" : ""}`} key={plan.name}>
              <div className="package-card-head">
                <span className="package-name">{plan.name}</span>
                <button
                  aria-label={`${plan.name} paketini sepete ekle`}
                  className="add-package-button"
                  type="button"
                  onClick={() =>
                    addItem({
                      id,
                      segment: "Belediye",
                      name: plan.name,
                      summary: plan.target,
                      features: plan.content.split(",").map((feature) => feature.trim()),
                    })
                  }
                >
                  +
                </button>
              </div>
              <h3>{plan.target}</h3>
              <p>{plan.content}</p>
              <small>{packagePrices[id]}</small>
            </article>
          );
        })}
      </div>

      <article className="revenue-card wide">
        <p className="plan-label">İşletme Paketleri</p>
        <div className="b2b-grid">
          {businessPackages.map((plan) => {
            const id = `business-${normalizeId(plan.name)}`;
            return (
              <div className={plan.featured ? "featured" : ""} key={plan.name}>
                <div className="package-card-head">
                  <h3>{plan.name}</h3>
                  <button
                    aria-label={`${plan.name} paketini sepete ekle`}
                    className="add-package-button"
                    type="button"
                    onClick={() =>
                      addItem({
                        id,
                        segment: "İşletme",
                        name: plan.name,
                        summary: packagePrices[id],
                        features: plan.features,
                      })
                    }
                  >
                    +
                  </button>
                </div>
                <ul>
                  {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                <small>{packagePrices[id]}</small>
              </div>
            );
          })}
        </div>
      </article>

      <aside className="checkout-cart">
        <div className="cart-head">
          <div>
            <p className="plan-label">Sepet</p>
            <h3>{cart.length} paket seçildi</h3>
          </div>
          <span>{cartFeatureCount} özellik</span>
        </div>

        {cart.length === 0 ? (
          <p className="empty-cart">Paketlerin yanındaki + butonuna basarak sepetinizi oluşturun.</p>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div>
                  <strong>{item.segment} / {item.name}</strong>
                  <span>{item.summary}</span>
                  <ul>
                    {item.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                </div>
                <button type="button" onClick={() => removeItem(item.id)}>Çıkar</button>
              </div>
            ))}
          </div>
        )}

        {step === "kvkk" ? (
          <div className="kvkk-box">
            <strong>KVKK ve Gizlilik Onayı</strong>
            <p>
              Paket talebi, kullanıcı hesabınız ve ödeme tercihiniz satın alma sürecini yürütmek için işlenir.
              KVKK ve Gizlilik metinlerini okudum, onaylıyorum.
            </p>
            <label>
              <input checked={kvkkApproved} onChange={(event) => setKvkkApproved(event.target.checked)} type="checkbox" />
              Onaylıyorum
            </label>
            <button className="primary-button" type="button" onClick={approveKvkk}>Ödeme Ekranına Git</button>
          </div>
        ) : null}

        {step === "payment" ? (
          <div className="payment-box">
            <strong>Ödeme Ekranı</strong>
            <div className="payment-tabs">
              <button className={paymentMethod === "card" ? "active" : ""} type="button" onClick={() => setPaymentMethod("card")}>
                Kredi Kartı
              </button>
              <button className={paymentMethod === "iban" ? "active" : ""} type="button" onClick={() => setPaymentMethod("iban")}>
                IBAN
              </button>
            </div>
            {paymentMethod === "card" ? (
              <div className="payment-panel">
                <p>Kart ödemesi için güvenli ödeme sağlayıcısına yönlendirme altyapısı hazırdır.</p>
                <input placeholder="Kart üzerindeki ad" />
                <input placeholder="Kart numarası ödeme sağlayıcısında girilir" disabled />
              </div>
            ) : (
              <div className="payment-panel">
                <p>IBAN ile ödeme için talep oluşturulur ve dekont kontrolünden sonra paket aktif edilir.</p>
                <strong>TR00 0000 0000 0000 0000 0000 00</strong>
              </div>
            )}
            <button className="primary-button" disabled={loading} type="button" onClick={purchase}>
              {loading ? "İşlem başlatılıyor..." : "Ödemeyi Başlat"}
            </button>
          </div>
        ) : null}

        {step === "done" ? <p className="checkout-success">{message}</p> : null}
        {message && step !== "done" ? <p className="form-error">{message}</p> : null}

        {step === "cart" ? (
          <button className="primary-button" type="button" onClick={confirmCart}>
            Sepeti Onayla
          </button>
        ) : null}
      </aside>
    </div>
  );
}
