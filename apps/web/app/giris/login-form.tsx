"use client";

import { FormEvent, useState } from "react";

const demoAccounts = [
  ["Super Admin", "admin@muflow.city"],
  ["Belediye", "belediye@muflow.city"],
  ["İşletme", "isletme@muflow.city"],
  ["Vatandaş", "vatandas@muflow.city"],
];

export function LoginForm({ nextPath }: { nextPath: string }) {
  const [email, setEmail] = useState("admin@muflow.city");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!response.ok) {
      const result = await response.json().catch(() => null);
      setError(result?.message || "Giriş başarısız.");
      return;
    }

    window.location.href = nextPath || "/dashboard";
  }

  return (
    <form className="login-card" onSubmit={onSubmit}>
      <div>
        <p className="eyebrow">Güvenli Giriş</p>
        <h1>MUFLOW hesabınıza giriş yapın.</h1>
        <p>JWT tabanlı oturum ve rol bazlı yetkilendirme ile korunan MVP paneli.</p>
      </div>

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
          autoComplete="current-password"
        />
      </label>

      {error ? <p className="form-error">{error}</p> : null}

      <button className="primary-button" disabled={loading} type="submit">
        {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
      </button>

      <div className="demo-accounts">
        {demoAccounts.map(([label, account]) => (
          <button key={account} type="button" onClick={() => setEmail(account)}>
            <strong>{label}</strong>
            <span>{account}</span>
          </button>
        ))}
      </div>
      <p className="auth-note">Admin, Belediye ve İşletme başlangıç şifresi: 1234567890. Panelden sonra değiştirilebilir.</p>
    </form>
  );
}
