import { NextResponse } from "next/server";
import { revenueModel } from "../../../../lib/revenue-model";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      generatedAt: new Date().toISOString(),
      ...revenueModel,
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
