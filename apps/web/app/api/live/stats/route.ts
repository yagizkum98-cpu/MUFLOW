import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      generatedAt: new Date().toISOString(),
      metrics: [
        {
          id: "portal",
          value: "0",
          label: "Portal",
          status: "Sıfırlandı",
        },
        {
          id: "module",
          value: "0",
          label: "Modül",
          status: "Sıfırlandı",
        },
        {
          id: "api",
          value: "API",
          label: "Ready",
          status: "Canlı",
        },
        {
          id: "cloud",
          value: "Cloud",
          label: "Native",
          status: "Canlı",
        },
      ],
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
