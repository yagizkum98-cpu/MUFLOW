"use client";

import { useEffect, useState } from "react";

type TenantNode = {
  id: string;
  name: string;
  slug: string;
  type: string;
  children: TenantNode[];
};

type TenantResponse = {
  rule: string;
  tree: TenantNode[];
};

function TenantTree({ nodes }: { nodes: TenantNode[] }) {
  return (
    <ul className="tenant-tree-list">
      {nodes.map((node) => (
        <li key={node.id}>
          <div>
            <strong>{node.name}</strong>
            <span>{node.type} / {node.slug}</span>
          </div>
          {node.children.length > 0 ? <TenantTree nodes={node.children} /> : null}
        </li>
      ))}
    </ul>
  );
}

export function TenantPanel() {
  const [data, setData] = useState<TenantResponse | null>(null);

  useEffect(() => {
    async function loadTenants() {
      const response = await fetch("/api/tenants", { cache: "no-store" });

      if (!response.ok) {
        return;
      }

      setData(await response.json());
    }

    loadTenants();
  }, []);

  return (
    <section className="tenant-panel">
      <div className="section-heading">
        <p className="eyebrow">Çoklu Kiracı</p>
        <h2>Platformdan ilçeye kadar tenant hiyerarşisi hazır.</h2>
        <p>
          Platform, Muğla Büyükşehir ve bağlı ilçe tenantları aynı altyapıda tutulur. Süper Admin tüm ağacı görür;
          kurum kullanıcıları yalnızca kendi kurum verisine erişir.
        </p>
      </div>

      <div className="tenant-layout">
        <article className="tenant-rule-card">
          <strong>Veri İzolasyonu</strong>
          <span>{data?.rule || "Her kurum kendi verisini görür."}</span>
          <small>/api/tenant/context</small>
        </article>
        <article className="tenant-tree-card">
          {data ? <TenantTree nodes={data.tree} /> : <p>Tenant ağacı yükleniyor.</p>}
        </article>
      </div>
    </section>
  );
}
