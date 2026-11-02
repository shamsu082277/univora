/**
 * Centralized API Client
 * Uses NEXT_PUBLIC_API_URL with real JWT Bearer token and credentials support.
 */
import { authClient } from "@/lib/auth-client";

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

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

/**
 * Retrieve verified JWT access token from BetterAuth client
 */
export async function getAuthToken(): Promise<string | null> {
  try {
    const res = await (authClient as any).token?.();
    if (res?.data?.token) {
      return res.data.token;
    }
  } catch {
    // Graceful handling when offline or unauthenticated
  }
  return null;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, headers, ...restOptions } = options;

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

  // Attach verified JWT Bearer token if available
  const token = await getAuthToken();
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
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
      let errorData;
      try {
        errorData = await response.json();
        if (errorData?.message) {
          errorMessage = errorData.message;
        } else if (errorData?.error) {
          errorMessage = errorData.error;
        }
      } catch {
        // Response was not JSON
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
        : "Failed to connect to the backend API server.";
    throw new ApiError(message, 0);
  }
}
