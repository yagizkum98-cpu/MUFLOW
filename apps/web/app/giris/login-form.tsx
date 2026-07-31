"use client";

import { FormEvent, useMemo, useState } from "react";

type AuthMode = "login" | "register";

export function LoginForm({ initialMode, nextPath }: { initialMode: AuthMode; nextPath: string }) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [kvkkApproved, setKvkkApproved] = useState(false);
  const [botAnswer, setBotAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const botCheck = useMemo(() => {
    const first = Math.floor(Math.random() * 6) + 4;
    const second = Math.floor(Math.random() * 5) + 2;
    return { first, second, result: first + second };
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (mode === "register" && !kvkkApproved) {
      setError("Üye olmak için KVKK metnini onaylamalısınız.");
      return;
    }

    if (mode === "register" && Number(botAnswer) !== botCheck.result) {
      setError("Bot kontrolü doğrulanamadı. İşlemin sonucunu doğru girin.");
      return;
    }

    setLoading(true);

    const endpoint = mode === "register" ? "/api/auth/register" : "/api/auth/login";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        mode === "register"
          ? { name, email, password, kvkkApproved, botFirst: botCheck.first, botSecond: botCheck.second, botAnswer }
          : { email, password },
      ),
    });
    const result = await response.json().catch(() => null);

    if (!response.ok) {
      setLoading(false);
      setError(result?.message || (mode === "register" ? "Üyelik oluşturulamadı." : "Giriş başarısız."));
      return;
    }

    if (mode === "register") {
      setLoading(false);
      setMode("login");
      setMessage("Vatandaş hesabı oluşturuldu. E-posta ve şifrenizle giriş yapabilirsiniz.");
      return;
    }

    setLoading(false);
    window.location.href = nextPath || "/dashboard/vatandas";
  }

  return (
    <form className="login-card" onSubmit={onSubmit}>
      <div>
        <p className="eyebrow">Vatandaş Girişi</p>
        <h1>MUFLOW vatandaş panelinize giriş yapın.</h1>
        <p>Vatandaşlar kendi e-posta ve şifreleriyle üye olur, ardından vatandaş paneline erişir.</p>
      </div>

      <div className="auth-mode-tabs" role="tablist" aria-label="Giriş modu">
        <button className={mode === "login" ? "active" : ""} type="button" onClick={() => setMode("login")}>
          Giriş Yap
        </button>
        <button className={mode === "register" ? "active" : ""} type="button" onClick={() => setMode("register")}>
          Üye Ol
        </button>
      </div>

      {mode === "register" ? (
        <label>
          Ad Soyad
          <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
        </label>
      ) : null}

      <label>
        E-posta
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" />
      </label>

      <label>
        Şifre
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          autoComplete={mode === "register" ? "new-password" : "current-password"}
        />
      </label>

      {mode === "register" ? (
        <>
          <label>
            Bot Kontrolü: {botCheck.first} + {botCheck.second} =
            <input
              value={botAnswer}
              onChange={(event) => setBotAnswer(event.target.value)}
              inputMode="numeric"
              placeholder="Sonuç"
            />
          </label>

          <label className="kvkk-register-check">
            <input checked={kvkkApproved} onChange={(event) => setKvkkApproved(event.target.checked)} type="checkbox" />
            <span>
              KVKK ve Gizlilik metnini okudum, vatandaş hesabı oluşturmak için kişisel verilerimin işlenmesini
              onaylıyorum.
            </span>
          </label>
        </>
      ) : null}

      {error ? <p className="form-error">{error}</p> : null}
      {message ? <p className="checkout-success">{message}</p> : null}

      <button className="primary-button" disabled={loading} type="submit">
        {loading ? "İşlem yapılıyor..." : mode === "register" ? "Üye Ol" : "Giriş Yap"}
      </button>

      <p className="auth-note">
        Kurumsal roller Süper Admin tarafından tanımlanır. Vatandaş demo hesabı kaldırıldı; vatandaşlar kendi hesaplarıyla giriş yapar.
      </p>
    </form>
  );
}
