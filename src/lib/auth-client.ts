import { createAuthClient } from "better-auth/react";

/**
 * BetterAuth React Client
 * Configured with baseURL for auth server communication.
 */
export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
    (typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000"),
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

