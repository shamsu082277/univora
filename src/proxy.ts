import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/profile",
  "/create-event",
  "/manage-events",
  "/joined-events",
];

const authRoutes = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  const isAuthRoute = authRoutes.some((route) => pathname === route);

  if (!isProtectedRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  // Check for BetterAuth session cookie
  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  let isAuthenticated = false;

  // Validate session against BetterAuth server if token exists
  if (sessionToken) {
    try {
      const rawServerUrl =
        process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
        process.env.NEXT_PUBLIC_API_URL ||
        process.env.BACKEND_API_URL ||
        "http://localhost:5000";
      const authServerUrl = rawServerUrl
        .replace(/\/api\/?$/, "")
        .replace(/\/+$/, "");

      const response = await fetch(
        `${authServerUrl}/api/auth/get-session`,
        {
          headers: {
            cookie: request.headers.get("cookie") || "",
          },
          cache: "no-store",
          signal: AbortSignal.timeout(4000),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data && (data.session || data.user)) {
          isAuthenticated = true;
        }
      }
    } catch {
      isAuthenticated = false;
    }
  }

  // Redirect unauthenticated users from protected routes to login
  if (isProtectedRoute && !isAuthenticated) {
    const callbackUrl = `${pathname}${search}`;
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", callbackUrl);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users from login and register to homepage
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: [
    "/profile/:path*",
    "/create-event/:path*",
    "/manage-events/:path*",
    "/joined-events/:path*",
    "/login",
    "/register",
  ],
};

