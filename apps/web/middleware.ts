import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, UserRole, verifySession } from "./lib/auth";

const protectedRoutes: Array<{ path: string; roles: UserRole[] }> = [
  { path: "/dashboard/admin", roles: ["SUPER_ADMIN"] },
  { path: "/dashboard/belediye", roles: ["SUPER_ADMIN", "MUNICIPALITY_ADMIN", "MUNICIPALITY_STAFF"] },
  { path: "/dashboard/isletme", roles: ["SUPER_ADMIN", "BUSINESS_OWNER"] },
  { path: "/dashboard/vatandas", roles: ["SUPER_ADMIN", "CITIZEN"] },
  { path: "/dashboard", roles: ["SUPER_ADMIN", "MUNICIPALITY_ADMIN", "MUNICIPALITY_STAFF", "BUSINESS_OWNER", "CITIZEN"] },
];

export async function middleware(request: NextRequest) {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const isLocalhost = request.nextUrl.hostname === "localhost" || request.nextUrl.hostname === "127.0.0.1";

  if (process.env.NODE_ENV === "production" && forwardedProto === "http" && !isLocalhost) {
    const secureUrl = request.nextUrl.clone();
    secureUrl.protocol = "https:";
    return NextResponse.redirect(secureUrl, 308);
  }

  const route = protectedRoutes.find((item) => request.nextUrl.pathname.startsWith(item.path));

  if (!route) {
    return NextResponse.next();
  }

  const user = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);

  if (!user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/giris";
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!route.roles.includes(user.role)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
