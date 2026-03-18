import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "@/lib/jwtUtils";
import {
  getDefaultRoute,
  isAdminRoute,
  isAuthRoute,
  isCustomerProtectedRoute,
  isTokenExpired,
  UserRole,
} from "./lib/authUtils";

export async function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get("accessToken")?.value;

    let role: UserRole | null = null;
    let isLoggedIn = false;

    if (accessToken) {
      const decoded = jwtUtils.decodedToken(accessToken);

      if (decoded && decoded.exp && !isTokenExpired(decoded.exp)) {
        role = decoded.role as UserRole;
        isLoggedIn = true;
      }
    }

    // rule 1 logged in trying to access auth routes
    if (isLoggedIn && isAuthRoute(pathname)) {
      return NextResponse.redirect(
        new URL(getDefaultRoute(role!), request.url),
      );
    }

    // rule 2 not logged in trying to access protected routes
    if (
      !isLoggedIn &&
      (isCustomerProtectedRoute(pathname) || isAdminRoute(pathname))
    ) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // rule 3 customer trying to access admin routes
    if (isLoggedIn && isAdminRoute(pathname) && role === "CUSTOMER") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // rule 4 admin trying to access customer only routes
    if (isLoggedIn && isCustomerProtectedRoute(pathname) && role === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
