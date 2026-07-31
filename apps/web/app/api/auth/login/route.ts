import { NextResponse } from "next/server";
import { SESSION_COOKIE, demoUsers, findDemoUser, signSession } from "../../../../lib/auth";
import { findManagedUser, verifyPasswordOverride } from "../../../../lib/user-store";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = String(body?.email || "").trim().toLowerCase();
  const password = String(body?.password || "");
  const passwordOverrideUser = await verifyPasswordOverride(email, password)
    ? demoUsers.find((item) => item.email === email) || null
    : null;
  const user = await findManagedUser(email, password) || passwordOverrideUser || findDemoUser(email, password);

  if (!user) {
    return NextResponse.json({ message: "E-posta, sifre veya auth ortam degiskeni hatali." }, { status: 401 });
  }

  let token: string;

  try {
    token = await signSession(user);
  } catch {
    return NextResponse.json({ message: "JWT_SECRET ortam degiskeni tanimli degil." }, { status: 503 });
  }

  const response = NextResponse.json({ user });

  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 8,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
