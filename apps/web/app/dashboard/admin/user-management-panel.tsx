"use client";

import { FormEvent, useEffect, useState } from "react";

type ManagedUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  status: string;
};

const roleOptions = [
  ["MUNICIPALITY_ADMIN", "Belediye"],
  ["BUSINESS_OWNER", "İşletme"],
  ["CITIZEN", "Vatandaş"],
  ["MUNICIPALITY_STAFF", "Belediye Personeli"],
  ["SUPER_ADMIN", "Süper Admin"],
];

const rolePanelLinks: Record<string, string> = {
  SUPER_ADMIN: "/dashboard/admin",
  MUNICIPALITY_ADMIN: "/dashboard/belediye",
  MUNICIPALITY_STAFF: "/dashboard/belediye",
  BUSINESS_OWNER: "/dashboard/isletme",
  CITIZEN: "/dashboard/vatandas",
};

export function UserManagementPanel() {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("MUNICIPALITY_ADMIN");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadUsers() {
    const response = await fetch("/api/admin/users", { cache: "no-store" });

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    setUsers(data.users || []);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    const response = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await response.json().catch(() => null);
    setLoading(false);

    if (!response.ok) {
      setMessage(data?.message || "Kullanıcı oluşturulamadı.");
      return;
    }

    setMessage("Kullanıcı oluşturuldu. E-posta ve şifre ile kendi paneline giriş yapabilir.");
    setName("");
    setEmail("");
    setPassword("");
    setRole("MUNICIPALITY_ADMIN");
    await loadUsers();
  }

  return (
    <section className="admin-user-management">
      <div className="section-heading">
        <p className="eyebrow">Kullanıcı ve Giriş Yetkisi</p>
        <h2>Her rol için özel panel erişimini Süper Admin tanımlar.</h2>
        <p>
          Belediye, işletme ve vatandaş hesapları e-posta, şifre ve rol ile oluşturulur. Kullanıcı giriş yaptığında
          yalnızca rolüne ait panele erişir.
        </p>
      </div>

      <div className="admin-user-grid">
        <form className="admin-user-form" onSubmit={onSubmit}>
          <label>
            Ad Soyad / Kurum
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Örn. Bodrum Belediyesi" />
          </label>

          <label>
            E-posta
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="ornek@muflow.city" />
          </label>

          <label>
            Geçici Şifre
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="En az 8 karakter"
            />
          </label>

          <label>
            Rol
            <select value={role} onChange={(event) => setRole(event.target.value)}>
              {roleOptions.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>

          {message ? <p className={message.includes("oluşturuldu") ? "checkout-success" : "form-error"}>{message}</p> : null}

          <button className="primary-button" disabled={loading} type="submit">
            {loading ? "Tanımlanıyor..." : "Kullanıcı Tanımla"}
          </button>
        </form>

        <div className="admin-user-list">
          {users.length === 0 ? (
            <article>
              <strong>Henüz özel kullanıcı yok</strong>
              <span>Süper Admin bu panelden belediye, işletme ve vatandaş hesabı oluşturabilir.</span>
            </article>
          ) : (
            users.map((user) => (
              <article key={user.id}>
                <div>
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </div>
                <small>{roleOptions.find(([value]) => value === user.role)?.[1] || user.role}</small>
                <a href={rolePanelLinks[user.role] || "/dashboard"}>Panel</a>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
