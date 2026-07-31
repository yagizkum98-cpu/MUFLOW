import { NextResponse } from "next/server";
import { restApiCatalog, restApiResources } from "../../../lib/rest-api-catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      name: "MUFLOW REST API",
      version: "v1",
      status: "ready",
      basePath: "/api",
      resources: restApiResources,
      catalog: restApiCatalog,
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
