import { IEvent } from "@/types";
import EventCard from "../shared/EventCard";
import EmptyState from "./EmptyState";
import { EventGridSkeleton } from "./EventSkeleton";

interface EventGridProps {
  events: IEvent[];
  isLoading: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyActionText?: string;
  emptyActionHref?: string;
}

export default function EventGrid({
  events,
  isLoading,
  emptyTitle,
  emptyDescription,
  emptyActionText,
  emptyActionHref,
}: EventGridProps) {
  if (isLoading) {
    return <EventGridSkeleton count={6} />;
  }

  if (events.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionText={emptyActionText}
        actionHref={emptyActionHref}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}

