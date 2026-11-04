import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

/**
 * BetterAuth React Client
 * In the browser, baseURL uses window.location.origin so that all /api/auth
 * requests are routed through Next.js rewrites. This guarantees that Better Auth
 * session cookies are saved as first-party cookies on the frontend domain
 * (e.g. https://univora-pi.vercel.app), preventing cross-domain cookie blocks
 * in Next.js proxy.ts and browser privacy engines.
 */
const resolvedBaseUrl =
  typeof window !== "undefined"
    ? window.location.origin
    : (
        process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
        process.env.NEXT_PUBLIC_API_URL ||
        "http://localhost:5000"
      ).replace(/\/api\/?$/, "");

export const authClient = createAuthClient({
  baseURL: resolvedBaseUrl,
  plugins: [jwtClient()],
  fetchOptions: {
    credentials: "include",
  },
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  updateUser,
  changePassword,
  getSession,
} = authClient;
