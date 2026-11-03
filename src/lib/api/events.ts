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
  const res = await apiClient<IEvent[] | { events: IEvent[] }>("/events", {
    method: "GET",
    params: {
      category: params?.category,
      search: params?.search,
      sort: params?.sort || "upcoming",
    },
  });

  if (Array.isArray(res)) return res;
  if (res && Array.isArray((res as { events: IEvent[] }).events)) {
    return (res as { events: IEvent[] }).events;
  }
  return [];
}

/**
 * Fetch featured/recent events for homepage
 */
export async function getRecentEvents(): Promise<IEvent[]> {
  try {
    const res = await apiClient<IEvent[] | { events: IEvent[] }>("/events/recent", {
      method: "GET",
    });
    if (Array.isArray(res)) return res;
    if (res && Array.isArray((res as { events: IEvent[] }).events)) {
      return (res as { events: IEvent[] }).events;
    }
  } catch {
    // Continue to fallback
  }

  try {
    const featured = await apiClient<IEvent[] | { events: IEvent[] }>("/featured-events", {
      method: "GET",
    });
    if (Array.isArray(featured)) return featured;
    if (featured && Array.isArray((featured as { events: IEvent[] }).events)) {
      return (featured as { events: IEvent[] }).events;
    }
  } catch {
    // Continue to fallback
  }

  const fallback = await apiClient<IEvent[] | { events: IEvent[] }>("/events", {
    method: "GET",
    params: { limit: 6, sort: "recent" },
  });
  if (Array.isArray(fallback)) return fallback;
  if (fallback && Array.isArray((fallback as { events: IEvent[] }).events)) {
    return (fallback as { events: IEvent[] }).events;
  }
  return [];
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
  const res = await apiClient<IEvent | { event: IEvent }>(`/events/${id}`, {
    method: "GET",
  });
  if (res && "event" in res && res.event) {
    return res.event;
  }
  return res as IEvent;
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
  const payload = {
    ...data,
    category: data.eventType,
    coverImage: data.thumbnail,
    date: data.eventDate,
  };
  const res = await apiClient<IEvent | { event: IEvent }>("/events", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (res && "event" in res && res.event) {
    return res.event;
  }
  return res as IEvent;
}

/**
 * Update an existing event (Authenticated, Owner only)
 */
export async function updateEvent(
  id: string,
  data: UpdateEventInput
): Promise<IEvent> {
  const payload: Record<string, unknown> = { ...data };
  if (data.eventType) payload.category = data.eventType;
  if (data.thumbnail) payload.coverImage = data.thumbnail;
  if (data.eventDate) payload.date = data.eventDate;

  const res = await apiClient<IEvent | { event: IEvent }>(`/events/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  if (res && "event" in res && res.event) {
    return res.event;
  }
  return res as IEvent;
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
): Promise<{ success: boolean; event?: IEvent; message?: string }> {
  return apiClient<{ success: boolean; event?: IEvent; message?: string }>(
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
    const res = await apiClient<IEvent[] | { events: IEvent[] }>("/events/my-events", {
      method: "GET",
    });
    if (Array.isArray(res)) return res;
    if (res && Array.isArray((res as { events: IEvent[] }).events)) {
      return (res as { events: IEvent[] }).events;
    }
  } catch {
    // Try alias
  }

  const res = await apiClient<IEvent[] | { events: IEvent[] }>("/my-events", {
    method: "GET",
  });
  if (Array.isArray(res)) return res;
  if (res && Array.isArray((res as { events: IEvent[] }).events)) {
    return (res as { events: IEvent[] }).events;
  }
  return [];
}

/**
 * Fetch events joined by the authenticated user
 */
export async function getMyJoinedEvents(): Promise<IEvent[]> {
  try {
    const res = await apiClient<IEvent[] | { events: IEvent[] }>("/events/my-joined", {
      method: "GET",
    });
    if (Array.isArray(res)) return res;
    if (res && Array.isArray((res as { events: IEvent[] }).events)) {
      return (res as { events: IEvent[] }).events;
    }
  } catch {
    // Try alias
  }

  const res = await apiClient<IEvent[] | { events: IEvent[] }>("/my-joined-events", {
    method: "GET",
  });
  if (Array.isArray(res)) return res;
  if (res && Array.isArray((res as { events: IEvent[] }).events)) {
    return (res as { events: IEvent[] }).events;
  }
  return [];
}
