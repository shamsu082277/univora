/**
 * Centralized API Client
 * Uses NEXT_PUBLIC_API_URL with real JWT Bearer token and credentials support.
 */
import { getAuthToken } from "@/lib/auth/token";

export { getAuthToken };

const RAW_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
export const API_BASE_URL = RAW_API_URL.replace(/\/+$/, "");

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  requireAuth?: boolean;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, headers, requireAuth, ...restOptions } = options;

  const method = (restOptions.method || "GET").toUpperCase();
  const isMutation = ["POST", "PUT", "PATCH", "DELETE"].includes(method);
  const shouldRequireAuth = requireAuth === true || (isMutation && requireAuth !== false);

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  let url = `${API_BASE_URL}${cleanEndpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Retrieve JWT from centralized token utility
  const token = await getAuthToken();

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  } else if (shouldRequireAuth) {
    throw new ApiError(
      "Authentication required. No valid JWT token found. Please sign in.",
      401
    );
  }

  try {
    const response = await fetch(url, {
      ...restOptions,
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      credentials: "include", // forwards BetterAuth cookies/sessions
    });

    if (!response.ok) {
      let errorMessage = `API request failed with status ${response.status}`;
      let errorData: unknown;
      try {
        errorData = await response.json();
        const obj = errorData as Record<string, unknown> | null;
        if (typeof obj?.message === "string") {
          errorMessage = obj.message;
        } else if (typeof obj?.error === "string") {
          errorMessage = obj.error;
        }
      } catch {
        // Response was not JSON
      }

      if (response.status === 401) {
        errorMessage =
          (typeof (errorData as Record<string, unknown>)?.message === "string"
            ? (errorData as Record<string, unknown>).message as string
            : null) || "Unauthorized: Your session has expired or the token is invalid.";
      } else if (response.status === 403) {
        errorMessage =
          (typeof (errorData as Record<string, unknown>)?.message === "string"
            ? (errorData as Record<string, unknown>).message as string
            : null) || "Forbidden: You do not have permission to perform this action.";
      }

      throw new ApiError(errorMessage, response.status, errorData);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return (await response.json()) as T;
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      throw error;
    }

    const message =
      error instanceof Error
        ? error.message
        : "Network error: Unable to connect to the backend server.";

    throw new ApiError(message, 500);
  }
}
