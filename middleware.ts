/** @format */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];
const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/verification",
  "/auth/otp-options",
  //   "/auth/welcome",
  "/auth/signup",
  //   "/auth/welcome/@PhoneNumber",
  //   "/auth/welcome/@ChooseImage",
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const userId = request.cookies.get("userId")?.value;
  const isNewUser = request.cookies.get("isNewUser")?.value === "true";
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Redirect to login if no token on protected route
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Redirect to dashboard if already fully logged in
  if (authRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  /// Prevent accessing verification without userId
  if (pathname === "/auth/verification" && !userId) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  //   // Protect welcome — only accessible after signing up
  //   if (pathname.startsWith("/auth/welcome")) {
  //     if (!token || !isNewUser) {
  //       return NextResponse.redirect(new URL("/dashboard", request.url));
  //     }
  //   }

  // Prevent accessing verification without userId
  if (pathname === "/auth/verification" && !userId) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
