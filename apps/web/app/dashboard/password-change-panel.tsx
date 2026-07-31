"use client";

import { FormEvent, useState } from "react";

export function PasswordChangePanel() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    const response = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await response.json().catch(() => null);
    setLoading(false);
    setMessage(data?.message || "Şifre güncellenemedi.");

    if (response.ok) {
      setCurrentPassword("");
      setNewPassword("");
    }
  }

  return (
    <section className="password-change-panel">
      <div>
        <p className="eyebrow">Hesap Güvenliği</p>
        <h2>Mevcut şifrenizi değiştirin.</h2>
        <p>Her rol kendi panelinde oturum şifresini güncelleyebilir.</p>
      </div>
      <form onSubmit={onSubmit}>
        <input
          autoComplete="current-password"
          onChange={(event) => setCurrentPassword(event.target.value)}
          placeholder="Mevcut şifre"
          type="password"
          value={currentPassword}
        />
        <input
          autoComplete="new-password"
          onChange={(event) => setNewPassword(event.target.value)}
          placeholder="Yeni şifre"
          type="password"
          value={newPassword}
        />
        <button className="primary-button" disabled={loading} type="submit">
          {loading ? "Güncelleniyor..." : "Şifreyi Değiştir"}
        </button>
      </form>
      {message ? <p className={message.includes("güncellendi") ? "checkout-success" : "form-error"}>{message}</p> : null}
    </section>
  );
}
