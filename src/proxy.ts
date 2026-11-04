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

  // Check for BetterAuth session cookie on the request
  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  // 1. If a session cookie is present on the frontend, validate it against the BetterAuth server
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
        const hasSession = Boolean(data && (data.session || data.user));

        // If authenticated user visits login or register, redirect to homepage
        if (isAuthRoute && hasSession) {
          return NextResponse.redirect(new URL("/", request.url));
        }

        // If cookie is present but explicitly invalid on a protected route, redirect to login
        if (isProtectedRoute && !hasSession) {
          const callbackUrl = `${pathname}${search}`;
          const loginUrl = new URL("/login", request.url);
          loginUrl.searchParams.set("callbackUrl", callbackUrl);
          return NextResponse.redirect(loginUrl);
        }
      }
    } catch {
      // If validation fails or server is offline, pass through to client-side AuthGuard
    }
  }

  // In cross-domain deployments (e.g. frontend on univora-pi.vercel.app and backend on univora-server.vercel.app),
  // Better Auth session cookies are stored on the backend domain and cannot be read by Next.js server middleware.
  // We pass the request to the page so client-side <AuthGuard> verifies the session via CORS credentials.
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

