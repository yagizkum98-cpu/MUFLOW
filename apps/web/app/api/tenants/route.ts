import { NextResponse } from "next/server";
import { getTenantTree, tenants } from "../../../lib/tenancy";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      mode: "multi-tenant",
      rule: "Her kurum kendi verisini görür.",
      count: tenants.length,
      tree: getTenantTree(),
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
