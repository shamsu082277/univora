import { authClient } from "@/lib/auth-client";
import { IEvent } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/**
 * Retrieves the verified JWT access token from Better Auth client
 */
export async function getAuthToken(): Promise<string | null> {
  try {
    const res = await (authClient as any).token?.();
    if (res?.data?.token) {
      return res.data.token;
    }
  } catch (err) {
    console.error("Failed to retrieve JWT token:", err);
  }
  return null;
}

/**
 * Helper to make authenticated requests with Bearer token
 */
export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = await getAuthToken();
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  return response;
}

// ==========================================
// Public Event APIs
// ==========================================

export interface GetEventsResponse {
  events: IEvent[];
  total: number;
  page: number;
  totalPages: number;
}

export const getEvents = async (params: {
  search?: string;
  category?: string;
  city?: string;
  sort?: string;
  page?: number;
  limit?: number;
} = {}): Promise<GetEventsResponse> => {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.category && params.category !== "All") query.set("category", params.category);
  if (params.city) query.set("city", params.city);
  if (params.sort) query.set("sort", params.sort);
  if (params.page) query.set("page", params.page.toString());
  if (params.limit) query.set("limit", params.limit.toString());

  const response = await fetch(`${API_URL}/events?${query.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return response.json();
};

export const getFeaturedEvents = async (): Promise<IEvent[]> => {
  const response = await fetch(`${API_URL}/featured-events`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch featured events");
  }

  return response.json();
};

export const getEventById = async (id: string): Promise<IEvent> => {
  const response = await fetch(`${API_URL}/events/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Event not found");
  }

  return response.json();
};

export const getEventBySlug = async (slug: string): Promise<IEvent> => {
  const response = await fetch(`${API_URL}/events/slug/${slug}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Event not found");
  }

  return response.json();
};

export const getEventCategories = async (): Promise<{ name: string; count: number }[]> => {
  const response = await fetch(`${API_URL}/event-categories`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch event categories");
  }

  return response.json();
};

// ==========================================
// Protected Event APIs
// ==========================================

export const createEvent = async (eventData: any) => {
  const response = await fetchWithAuth("/events", {
    method: "POST",
    body: JSON.stringify(eventData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to create event");
  }

  return data;
};

export const getMyEvents = async (): Promise<IEvent[]> => {
  const response = await fetchWithAuth("/my-events");

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "Failed to fetch user events");
  }

  return response.json();
};

export const updateEvent = async (id: string, updateData: any) => {
  const response = await fetchWithAuth(`/events/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updateData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update event");
  }

  return data;
};

export const deleteEvent = async (id: string) => {
  const response = await fetchWithAuth(`/events/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete event");
  }

  return data;
};

// ==========================================
// Event Registration APIs
// ==========================================

export const joinEvent = async (eventId: string) => {
  const response = await fetchWithAuth(`/events/${eventId}/join`, {
    method: "POST",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to join event");
  }

  return data;
};

export const cancelJoinEvent = async (eventId: string) => {
  const response = await fetchWithAuth(`/events/${eventId}/join`, {
    method: "DELETE",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to cancel registration");
  }

  return data;
};

export const getEventRegistrations = async (eventId: string) => {
  const response = await fetchWithAuth(`/events/${eventId}/registrations`);

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch registrations");
  }

  return data;
};

export const getMyJoinedEvents = async (): Promise<IEvent[]> => {
  const response = await fetchWithAuth("/my-joined-events");

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "Failed to fetch joined events");
  }

  return response.json();
};

// ==========================================
// User Profile APIs
// ==========================================

export const getUserProfile = async () => {
  const response = await fetchWithAuth("/users/me");

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "Failed to fetch user profile");
  }

  return response.json();
};

export const updateUserProfile = async (profileData: any) => {
  const response = await fetchWithAuth("/users/me", {
    method: "PATCH",
    body: JSON.stringify(profileData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update profile");
  }

  return data;
};
