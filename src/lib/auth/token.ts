import { authClient } from "@/lib/auth-client";

interface BetterAuthTokenResponse {
  data?: {
    token?: string;
  } | null;
  error?: {
    message?: string;
    status?: number;
  } | null;
}

/**
 * Centralized utility to retrieve a verified JWT from the BetterAuth client.
 * Calls authClient.token() from the BetterAuth JWT plugin.
 *
 * Rules:
 * - Does not store tokens in localStorage or sessionStorage.
 * - Never logs raw token strings to the console.
 * - Returns null gracefully when unauthenticated or offline.
 */
export async function getAuthToken(): Promise<string | null> {
  try {
    const clientWithToken = authClient as unknown as {
      token?: () => Promise<BetterAuthTokenResponse>;
    };

    if (typeof clientWithToken.token !== "function") {
      return null;
    }

    const response = await clientWithToken.token();

    if (response?.data?.token && typeof response.data.token === "string") {
      return response.data.token;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Retrieves the JWT or throws an Error if the user is not authenticated.
 */
export async function requireAuthToken(): Promise<string> {
  const token = await getAuthToken();
  if (!token) {
    throw new Error("Authentication required. No valid JWT token found.");
  }
  return token;
}

