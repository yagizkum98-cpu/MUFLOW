import { NextRequest, NextResponse } from "next/server";
import { restApiResources } from "../../../../../lib/rest-api-catalog";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ resource: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  const { resource } = await context.params;
  const item = restApiResources.find((entry) => entry.name === resource);

  if (!item) {
    return NextResponse.json({ message: "REST resource bulunamadı." }, { status: 404 });
  }

  return NextResponse.json(
    {
      resource: item.name,
      description: item.description,
      data: item.sample,
      meta: {
        count: item.sample.length,
        version: "v1",
        generatedAt: new Date().toISOString(),
      },
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
