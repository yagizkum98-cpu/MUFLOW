import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../../../lib/current-user";
import { createManagedUser, isUserRole, listManagedUsers } from "../../../../lib/user-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();

  if (!user || user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ message: "Bu işlem için Süper Admin yetkisi gerekir." }, { status: 403 });
  }

  return NextResponse.json(
    {
      generatedAt: new Date().toISOString(),
      users: listManagedUsers(),
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}

export async function POST(request: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "SUPER_ADMIN") {
    return NextResponse.json({ message: "Kullanıcı tanımlamak için Süper Admin yetkisi gerekir." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const name = String(body?.name || "").trim();
  const email = String(body?.email || "").trim().toLowerCase();
  const password = String(body?.password || "");
  const role = String(body?.role || "");

  if (!name || !email || !password || !role) {
    return NextResponse.json({ message: "Ad, e-posta, şifre ve rol zorunludur." }, { status: 400 });
  }

  if (!email.includes("@")) {
    return NextResponse.json({ message: "Geçerli bir e-posta adresi girin." }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ message: "Şifre en az 8 karakter olmalıdır." }, { status: 400 });
  }

  if (!isUserRole(role)) {
    return NextResponse.json({ message: "Geçerli bir rol seçin." }, { status: 400 });
  }

  const result = await createManagedUser({
    name,
    email,
    password,
    role,
    createdBy: currentUser.email,
  });

  if ("error" in result) {
    return NextResponse.json({ message: result.error }, { status: 409 });
  }

  return NextResponse.json(
    {
      message: "Kullanıcı oluşturuldu. Tanımlanan e-posta ve şifre ile giriş yapılabilir.",
      user: result.user,
    },
    { status: 201, headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
