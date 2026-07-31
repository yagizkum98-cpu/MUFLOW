import { NextRequest, NextResponse } from "next/server";
import { createManagedUser } from "../../../../lib/user-store";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const name = String(body?.name || "").trim();
  const email = String(body?.email || "").trim().toLowerCase();
  const password = String(body?.password || "");

  if (!name || !email || !password) {
    return NextResponse.json({ message: "Ad soyad, e-posta ve şifre zorunludur." }, { status: 400 });
  }

  if (!email.includes("@")) {
    return NextResponse.json({ message: "Geçerli bir e-posta adresi girin." }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ message: "Şifre en az 8 karakter olmalıdır." }, { status: 400 });
  }

  const result = await createManagedUser({
    name,
    email,
    password,
    role: "CITIZEN",
    tenantId: "tenant_fethiye",
    createdBy: "self-service-citizen-register",
  });

  if ("error" in result) {
    return NextResponse.json({ message: result.error }, { status: 409 });
  }

  return NextResponse.json(
    {
      message: "Vatandaş hesabı oluşturuldu. E-posta ve şifrenizle giriş yapabilirsiniz.",
      user: result.user,
    },
    { status: 201, headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
