import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "./auth";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  return verifySession(cookieStore.get(SESSION_COOKIE)?.value);
}
