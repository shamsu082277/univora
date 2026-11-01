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
 * Fetch recently completed or past events
 */
export async function getRecentEvents(): Promise<IEvent[]> {
  return apiClient<IEvent[]>("/events/recent", {
    method: "GET",
  });
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
 * Create a new event (Authenticated)
 */
export async function createEvent(data: CreateEventInput): Promise<IEvent> {
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
 * Fetch events created by the authenticated user
 */
export async function getMyCreatedEvents(): Promise<IEvent[]> {
  return apiClient<IEvent[]>("/events/my-events", {
    method: "GET",
  });
}

/**
 * Fetch events joined by the authenticated user
 */
export async function getMyJoinedEvents(): Promise<IEvent[]> {
  return apiClient<IEvent[]>("/events/my-joined", {
    method: "GET",
  });
}
