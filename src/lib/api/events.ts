import { apiClient } from "./client";
import {
  CreateEventInput,
  EventFilterParams,
  IEvent,
  UpdateEventInput,
} from "@/types/event";

/**
 * Fetch all upcoming events (today or later)
 */
export async function getUpcomingEvents(
  params?: EventFilterParams
): Promise<IEvent[]> {
  return apiClient<IEvent[]>("/events", {
    method: "GET",
    params: {
      category: params?.category,
      search: params?.search,
      sort: params?.sort || "upcoming",
    },
  });
}

/**
 * Fetch featured/recent events for homepage
 */
export async function getRecentEvents(): Promise<IEvent[]> {
  try {
    return await apiClient<IEvent[]>("/events/recent", {
      method: "GET",
    });
  } catch {
    // Fallback to /events with limit
    return apiClient<IEvent[]>("/events", {
      method: "GET",
      params: { limit: 6, sort: "recent" },
    });
  }
}

/**
 * Alias for featured events
 */
export async function getFeaturedEvents(): Promise<IEvent[]> {
  return getRecentEvents();
}

/**
 * Fetch single event details by ID
 */
export async function getEventDetails(id: string): Promise<IEvent> {
  return apiClient<IEvent>(`/events/${id}`, {
    method: "GET",
  });
}

/**
 * Alias for getEventDetails
 */
export async function getEventById(id: string): Promise<IEvent> {
  return getEventDetails(id);
}

/**
 * Create a new event (Authenticated)
 */
export async function createEvent(
  data: CreateEventInput & { organizerId?: string; organizerEmail?: string }
): Promise<IEvent> {
  return apiClient<IEvent>("/events", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Update an existing event (Authenticated, Owner only)
 */
export async function updateEvent(
  id: string,
  data: UpdateEventInput
): Promise<IEvent> {
  return apiClient<IEvent>(`/events/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

/**
 * Delete an event (Authenticated, Owner only)
 */
export async function deleteEvent(id: string): Promise<{ success: boolean }> {
  return apiClient<{ success: boolean }>(`/events/${id}`, {
    method: "DELETE",
  });
}

/**
 * Join an event as a participant (Authenticated)
 */
export async function joinEvent(
  id: string
): Promise<{ success: boolean; event: IEvent; message?: string }> {
  return apiClient<{ success: boolean; event: IEvent; message?: string }>(
    `/events/${id}/join`,
    {
      method: "POST",
    }
  );
}

/**
 * Cancel registration for an event (Authenticated)
 */
export async function cancelJoinEvent(
  id: string
): Promise<{ success: boolean; message?: string }> {
  return apiClient<{ success: boolean; message?: string }>(
    `/events/${id}/join`,
    {
      method: "DELETE",
    }
  );
}

/**
 * Fetch events created by the authenticated user
 */
export async function getMyCreatedEvents(): Promise<IEvent[]> {
  try {
    return await apiClient<IEvent[]>("/events/my-events", {
      method: "GET",
    });
  } catch {
    return apiClient<IEvent[]>("/my-events", {
      method: "GET",
    });
  }
}

/**
 * Fetch events joined by the authenticated user
 */
export async function getMyJoinedEvents(): Promise<IEvent[]> {
  try {
    return await apiClient<IEvent[]>("/events/my-joined", {
      method: "GET",
    });
  } catch {
    return apiClient<IEvent[]>("/my-joined-events", {
      method: "GET",
    });
  }
}
