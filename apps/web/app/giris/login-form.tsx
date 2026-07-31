"use client";

import { FormEvent, useState } from "react";

type AuthMode = "login" | "register";

export function LoginForm({ nextPath }: { nextPath: string }) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const endpoint = mode === "register" ? "/api/auth/register" : "/api/auth/login";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mode === "register" ? { name, email, password } : { email, password }),
    });
    const result = await response.json().catch(() => null);

    if (!response.ok) {
      setLoading(false);
      setError(result?.message || (mode === "register" ? "Üyelik oluşturulamadı." : "Giriş başarısız."));
      return;
    }

    if (mode === "register") {
      const loginResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      setLoading(false);

      if (!loginResponse.ok) {
        setMode("login");
        setMessage("Vatandaş hesabı oluşturuldu. E-posta ve şifrenizle giriş yapabilirsiniz.");
        return;
      }

      window.location.href = nextPath || "/dashboard/vatandas";
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

      {error ? <p className="form-error">{error}</p> : null}
      {message ? <p className="checkout-success">{message}</p> : null}

      <button className="primary-button" disabled={loading} type="submit">
        {loading ? "İşlem yapılıyor..." : mode === "register" ? "Üye Ol ve Panele Git" : "Giriş Yap"}
      </button>

      <p className="auth-note">
        Kurumsal roller Süper Admin tarafından tanımlanır. Vatandaş demo hesabı kaldırıldı; vatandaşlar kendi hesaplarıyla giriş yapar.
      </p>
    </form>
  );
}
