import { NextRequest, NextResponse } from "next/server";
import { decrypt, SESSION_COOKIE } from "@/lib/session";

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const session = await decrypt(req.cookies.get(SESSION_COOKIE)?.value);
  const isLoginPage = path === "/admin/login";

  // Optimistic check only — server actions re-verify before touching data.
  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }
  if (session && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
