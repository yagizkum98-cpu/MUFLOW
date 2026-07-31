import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      generatedAt: new Date().toISOString(),
      metrics: [
        { id: "resolutionRate", value: "0%", label: "Talep çözüm oranı", status: "Sıfırlandı" },
        { id: "activeOperations", value: "0", label: "Aktif işlem", status: "Sıfırlandı" },
        { id: "integrations", value: "0", label: "Entegrasyon", status: "Sıfırlandı" },
      ],
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
