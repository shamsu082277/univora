import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

/**
 * BetterAuth React Client
 * Configured with baseURL pointing directly to the Express BetterAuth server.
 * Equipped with the JWT plugin for bearer tokens and credentials: "include"
 * for cross-origin session cookies.
 */
const resolvedBaseUrl = (
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
