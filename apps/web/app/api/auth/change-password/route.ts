import { NextRequest, NextResponse } from "next/server";
import { demoUsers, findDemoUser } from "../../../../lib/auth";
import { getCurrentUser } from "../../../../lib/current-user";
import { findManagedUser, setPasswordOverride, updateManagedUserPassword, verifyPasswordOverride } from "../../../../lib/user-store";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Şifre değiştirmek için giriş yapmalısınız." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const currentPassword = String(body?.currentPassword || "");
  const newPassword = String(body?.newPassword || "");

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ message: "Mevcut şifre ve yeni şifre zorunludur." }, { status: 400 });
  }

  if (newPassword.length < 8) {
    return NextResponse.json({ message: "Yeni şifre en az 8 karakter olmalıdır." }, { status: 400 });
  }

  const managedMatch = await findManagedUser(user.email, currentPassword);
  const overrideMatch = await verifyPasswordOverride(user.email, currentPassword);
  const demoMatch = findDemoUser(user.email, currentPassword);
  const validCurrentPassword = Boolean(managedMatch || overrideMatch || demoMatch);

  if (!validCurrentPassword) {
    return NextResponse.json({ message: "Mevcut şifre hatalı." }, { status: 403 });
  }

  const managedUpdated = await updateManagedUserPassword(user.email, newPassword);

  if (!managedUpdated && demoUsers.some((item) => item.email === user.email)) {
    await setPasswordOverride(user.email, newPassword);
  }

  return NextResponse.json(
    {
      message: "Şifre güncellendi. Bir sonraki girişte yeni şifrenizi kullanabilirsiniz.",
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
