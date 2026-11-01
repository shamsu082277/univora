import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

/**
 * BetterAuth React Client
 * Configured with baseURL pointing to the Express server (port 5000)
 * and equipped with the JWT plugin for bearer tokens.
 */
export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:5000",
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
