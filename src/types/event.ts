export const EVENT_CATEGORIES = [
  "Community Support",
  "Donation Drive",
  "Winter Clothes Distribution",
  "Food Distribution",
  "Environmental Cleanup",
  "Tree Plantation",
  "Education",
  "Health & Awareness",
  "Disaster Relief",
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  eventType: EventCategory;
  thumbnail: string;
  location: string;
  eventDate: string;
  organizerEmail: string;
  organizerId: string;
  participantCount: number;
  capacity?: number;
  createdAt?: string;
  updatedAt?: string;
  joinedUsers?: string[]; // IDs of users who have joined
}

export interface CreateEventInput {
  title: string;
  description: string;
  eventType: EventCategory;
  thumbnail: string;
  location: string;
  eventDate: string;
  capacity?: number;
}

export interface UpdateEventInput extends Partial<CreateEventInput> {}

export interface EventFilterParams {
  category?: string;
  search?: string;
  sort?: "upcoming" | "recent";
}

